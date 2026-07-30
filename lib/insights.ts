import { doc, getDoc, setDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"
import { buildReviewSteps, getDefaultModuleConfig } from "@/lib/modules"
import { projectScore } from "@/lib/score"
import type { Project, Score } from "@/lib/types"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL
const RANK: Record<string, number> = { good: 10, ok: 6, bad: 3 }

export interface ProblemStat {
  id: string
  text: string
  category: string
  module?: string
  severity?: string
  businessImpact?: string
  samples: number // aantal sites waar deze check is beoordeeld
  failing: number // aantal sites met matig/slecht
  failRate: number // 0..1
}

export interface ModuleStat {
  module: string
  avg: number
  count: number
}

export interface Insights {
  siteCount: number
  scoredCount: number
  avgScore: number | null
  distribution: { good: number; ok: number; bad: number }
  modules: ModuleStat[]
  problems: ProblemStat[]
  // alle checks (ook zonder min. steekproef), voor de per-site benchmark
  checkRates: Record<string, { failRate: number; samples: number }>
}

/**
 * Aggregeert alle reviews: benchmark-score, gemiddelde per module, en de
 * meest voorkomende problemen (faal-% per check). Puur client-side.
 */
export function computeInsights(projects: Project[], minSample = 5): Insights {
  let scoreSum = 0
  let scoredCount = 0
  const dist = { good: 0, ok: 0, bad: 0 }

  type C = {
    text: string
    category: string
    module?: string
    severity?: string
    businessImpact?: string
    good: number
    notGood: number
  }
  const checks = new Map<string, C>()
  const mods = new Map<string, { sum: number; count: number }>()

  for (const p of projects) {
    const s = projectScore(p)
    if (s != null) {
      scoreSum += s
      scoredCount++
      if (s >= 7.5) dist.good++
      else if (s >= 5) dist.ok++
      else dist.bad++
    }
    if (p.reviewType === "free-form") continue

    let steps
    try {
      steps = buildReviewSteps(p.moduleConfig ?? getDefaultModuleConfig())
    } catch {
      continue
    }
    const answers = p.answers ?? {}
    for (const step of steps) {
      const moduleName = step.moduleName ?? step.shortTitle
      for (const q of step.questions) {
        const a = answers[q.id]
        const sc = a?.score as Score | undefined
        if (!sc || sc === "nvt") continue

        const m = mods.get(moduleName) ?? { sum: 0, count: 0 }
        m.sum += RANK[sc] ?? 6
        m.count++
        mods.set(moduleName, m)

        const c =
          checks.get(q.id) ??
          ({
            text: q.text,
            category: step.shortTitle,
            module: moduleName,
            severity: q.severity,
            businessImpact: q.business_impact_nl,
            good: 0,
            notGood: 0,
          } as C)
        if (sc === "good") c.good++
        else c.notGood++
        checks.set(q.id, c)
      }
    }
  }

  const modules: ModuleStat[] = [...mods.entries()]
    .map(([module, v]) => ({ module, avg: v.sum / v.count, count: v.count }))
    .sort((a, b) => a.avg - b.avg)

  const allProblems: ProblemStat[] = [...checks.entries()].map(([id, c]) => {
    const samples = c.good + c.notGood
    return {
      id,
      text: c.text,
      category: c.category,
      module: c.module,
      severity: c.severity,
      businessImpact: c.businessImpact,
      samples,
      failing: c.notGood,
      failRate: samples ? c.notGood / samples : 0,
    }
  })

  const checkRates: Record<string, { failRate: number; samples: number }> = {}
  for (const p of allProblems) {
    checkRates[p.id] = { failRate: p.failRate, samples: p.samples }
  }

  const problems = allProblems
    .filter((p) => p.samples >= minSample)
    .sort((a, b) => b.failRate - a.failRate || b.failing - a.failing)

  return {
    siteCount: projects.length,
    scoredCount,
    avgScore: scoredCount ? scoreSum / scoredCount : null,
    distribution: dist,
    modules,
    problems,
    checkRates,
  }
}

export interface Benchmark {
  avgScore: number | null
  siteCount: number
  generatedAt: string
  checks: Record<string, { r: number; s: number }>
}

/** Slaat de benchmark op in een publiek leesbaar doc (voor in het rapport). */
export async function saveBenchmark(ins: Insights): Promise<void> {
  const checks: Record<string, { r: number; s: number }> = {}
  for (const [id, v] of Object.entries(ins.checkRates)) {
    if (v.samples >= 3) checks[id] = { r: v.failRate, s: v.samples }
  }
  await setDoc(doc(getDb(), "benchmarks", "global"), {
    avgScore: ins.avgScore,
    siteCount: ins.scoredCount,
    generatedAt: new Date().toISOString(),
    checks,
  })
}

export async function loadBenchmark(): Promise<Benchmark | null> {
  try {
    const snap = await getDoc(doc(getDb(), "benchmarks", "global"))
    return snap.exists() ? (snap.data() as Benchmark) : null
  } catch {
    return null
  }
}

export interface StoredInsight {
  summary: string
  generatedAt: string
  siteCount: number
}

export async function loadInsightsSummary(): Promise<StoredInsight | null> {
  try {
    const snap = await getDoc(doc(getDb(), "config", "insights"))
    return snap.exists() ? (snap.data() as StoredInsight) : null
  } catch {
    return null
  }
}

/** Genereert (en bewaart) een korte AI-analyse over alle sites. */
export async function generateInsightsSummary(ins: Insights): Promise<string> {
  if (!PROXY) throw new Error("AI is niet beschikbaar (proxy niet ingesteld).")

  const top = ins.problems
    .slice(0, 10)
    .map(
      (p) =>
        `- ${p.text} — ${Math.round(p.failRate * 100)}% van ${p.samples} sites (${p.category})`,
    )
    .join("\n")
  const mods = ins.modules
    .slice(0, 4)
    .map((m) => `- ${m.module}: gemiddeld ${m.avg.toFixed(1)}/10`)
    .join("\n")

  const system = `Je bent een UX/CRO-analist van BOLD700. Je vat patronen samen over veel gereviewde websites, in het Nederlands, zakelijk en concreet. Baseer je UITSLUITEND op de meegegeven cijfers, verzin niks.`
  const user = `Op basis van ${ins.scoredCount} gereviewde websites (gemiddelde UX-score ${ins.avgScore != null ? ins.avgScore.toFixed(1) : "n.v.t."}/10):

MEEST VOORKOMENDE PROBLEMEN:
${top || "- (te weinig data)"}

ZWAKSTE CATEGORIEËN:
${mods || "- (te weinig data)"}

Schrijf een korte analyse (4-6 zinnen, één alinea, geen opsomming): waar lopen websites structureel op vast, welk patroon valt op, en waar zit de grootste collectieve kans om resultaat te verbeteren. Concreet en to-the-point.`

  const resp = await fetch(PROXY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 500,
      temperature: 0.3,
      system,
      messages: [{ role: "user", content: [{ type: "text", text: user }] }],
    }),
  })
  if (!resp.ok) {
    const e = await resp.json().catch(() => ({}))
    throw new Error(e?.error?.message || `API fout (${resp.status})`)
  }
  const j = await resp.json()
  const summary = (j?.content?.[0]?.text || "").trim()

  await setDoc(
    doc(getDb(), "config", "insights"),
    { summary, generatedAt: new Date().toISOString(), siteCount: ins.scoredCount },
    { merge: true },
  )
  return summary
}
