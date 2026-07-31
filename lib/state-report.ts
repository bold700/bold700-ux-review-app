import { doc, getDoc, setDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"
import type { Insights, Segments } from "@/lib/insights"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export interface StateReportProblem {
  title: string // gewone-taal-omschrijving, geen jargon
  sharePct: number // % van de websites met dit probleem
  sites: number // aantal websites waarop dit is beoordeeld
}

export interface StateReport {
  generatedAt: string
  siteCount: number
  avgScore: number | null
  distribution: { good: number; ok: number; bad: number }
  intro: string
  problems: StateReportProblem[]
  branches: { label: string; avgScore: number; count: number }[]
}

function parseObj(text: string): Record<string, unknown> | null {
  if (!text) return null
  const t = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim()
  try {
    return JSON.parse(t)
  } catch {}
  const m = t.match(/\{[\s\S]*\}/)
  if (m) {
    try {
      return JSON.parse(m[0])
    } catch {}
  }
  return null
}

const DOC = { col: "benchmarks", id: "state-report" }

/** Publiek rapport ophalen (leesbaar zonder login). */
export async function loadStateReport(): Promise<StateReport | null> {
  try {
    const snap = await getDoc(doc(getDb(), DOC.col, DOC.id))
    return snap.exists() ? (snap.data() as StateReport) : null
  } catch {
    return null
  }
}

/**
 * Bouwt het publieke rapport: de AI schrijft de intro + probleem-titels in
 * gewone taal (geen vakjargon zoals "UX", "review", "CTA"), alle CIJFERS komen
 * uit de eigen data (niet uit de AI). Slaat het op in een publiek doc.
 */
export async function generateStateReport(
  ins: Insights,
  seg: Segments,
): Promise<StateReport> {
  if (!PROXY) throw new Error("AI is niet beschikbaar (proxy niet ingesteld).")

  const top = ins.problems.slice(0, 8)
  const branches = seg.branches
    .filter((b) => b.count >= 3)
    .sort((a, b) => b.avgScore - a.avgScore)
    .map((b) => ({ label: b.label, avgScore: b.avgScore, count: b.count }))

  const problemLines = top
    .map(
      (p, i) =>
        `${i}. "${p.text}" — ${Math.round(p.failRate * 100)}% van ${p.samples} websites`,
    )
    .join("\n")

  const system = `Je schrijft in het Nederlands voor ondernemers zonder technische kennis. Vermijd ALLE vakjargon en Engelse woorden (UX, review, CTA, above the fold, conversie, bounce rate). Gebruik gewone, alledaagse taal, bijvoorbeeld "je website verbeteren" of "bezoekers helpen". Ga er NIET vanuit dat alle websites uit Nederland komen. Antwoord uitsluitend met JSON.`

  const user = `We bekeken ${ins.scoredCount} websites van ondernemers en gaven ze een cijfer (gemiddeld ${ins.avgScore != null ? ins.avgScore.toFixed(1) : "?"} op 10) voor hoe goed ze bezoekers helpen.

DE MEEST VOORKOMENDE PROBLEMEN (met nummer):
${problemLines || "- (te weinig data)"}

Schrijf:
1. "intro": 2 tot 3 zinnen in gewone taal die samenvatten hoe goed of slecht websites het gemiddeld doen en wat het belangrijkste patroon is. Geen jargon.
2. "problems": voor ELK nummer hierboven een korte titel in gewone taal (max ~9 woorden) die uitlegt wat er mis is, zonder jargon. Behoud de betekenis, verzin geen cijfers.

Antwoord UITSLUITEND met JSON:
{"intro":"...","problems":{"0":"...","1":"...", ...}}`

  const resp = await fetch(PROXY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 900,
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
  const obj = parseObj(j?.content?.[0]?.text || "") ?? {}
  const intro = typeof obj.intro === "string" ? obj.intro : ""
  const plain = (obj.problems ?? {}) as Record<string, string>

  const problems: StateReportProblem[] = top.map((p, i) => ({
    title: plain[String(i)] || p.text,
    sharePct: Math.round(p.failRate * 100),
    sites: p.samples,
  }))

  const report: StateReport = {
    generatedAt: new Date().toISOString(),
    siteCount: ins.scoredCount,
    avgScore: ins.avgScore,
    distribution: ins.distribution,
    intro,
    problems,
    branches,
  }

  await setDoc(doc(getDb(), DOC.col, DOC.id), report)
  return report
}
