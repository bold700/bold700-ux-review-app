import { doc, setDoc } from "firebase/firestore"

import { getDb, getFirebaseAuth } from "@/lib/firebase"
import { buildReviewSteps } from "@/lib/modules"
import { fetchPage, type FetchedPage } from "@/lib/page-fetch"
import { runAutoScan } from "@/lib/auto-scan"
import { runAiReview } from "@/lib/ai-review"
import { fetchPageSpeed, mapPsiToChecks } from "@/lib/pagespeed"
import { projectScore } from "@/lib/score"
import type { Answer, Project, Score } from "@/lib/types"

const valid = new Set<Score>(["good", "ok", "bad", "nvt"])

/**
 * Vult een checklist headless in op basis van een opgehaalde pagina: eerst de
 * deterministische scan, dan AI voor de rest. Herbruikt door leads en herscan.
 */
export async function scanToAnswers(
  moduleConfig: unknown,
  page: FetchedPage,
  onProgress?: (done: number, total: number) => void,
): Promise<Record<string, Answer>> {
  if (!page.doc || !page.text) return {}
  const steps = buildReviewSteps(moduleConfig)
  const checks = steps.flatMap((s) =>
    s.questions.map((q) => ({ q, category: s.shortTitle })),
  )
  const answers: Record<string, Answer> = {}

  // Echte performancemeting parallel starten (faalt netjes, geen await-blokkade
  // op de deterministische scan).
  const psiPromise = fetchPageSpeed(page.url, { strategy: "mobile" }).catch(
    () => null,
  )

  const auto = runAutoScan(
    page.doc,
    page.url,
    checks.map((c) => c.q),
  )
  const covered = new Set(auto.map((r) => r.id))
  for (const r of auto) {
    if (!valid.has(r.score)) continue
    answers[r.id] = {
      score: r.score,
      notes: r.note ? "[Auto] " + r.note : "",
      autoScanned: true,
      source: "measured",
    }
  }

  // PageSpeed-metingen invullen (echte cijfers i.p.v. AI-inschatting).
  const psi = await psiPromise
  if (psi) {
    const psiResults = mapPsiToChecks(
      psi,
      checks.map((c) => c.q),
    )
    for (const r of psiResults) {
      if (!valid.has(r.score) || covered.has(r.id)) continue
      answers[r.id] = {
        score: r.score,
        notes: "[Meting] " + r.note,
        autoScanned: true,
        source: "measured",
      }
      covered.add(r.id)
    }
  }

  // AI beoordeelt de rest — maar niet wat al gemeten is (auto-scan/PSI).
  const qs = checks
    .filter((c) => !covered.has(c.q.id))
    .map((c) => ({ id: c.q.id, text: c.q.text, category: c.category }))
  const ai = await runAiReview(page.url, page.text, qs, onProgress)
  for (const r of ai) {
    if (!r?.id || !valid.has(r.score)) continue
    answers[r.id] = {
      score: r.score,
      notes: r.note ? "[AI] " + r.note : "",
      aiFilled: true,
      source: "ai",
      confidence: r.confidence,
    }
  }
  return answers
}

function scoreMap(answers?: Record<string, Answer>): Record<string, Score> {
  const out: Record<string, Score> = {}
  for (const [id, a] of Object.entries(answers ?? {})) {
    if (a.score) out[id] = a.score
  }
  return out
}

/**
 * Draait opnieuw een scan op dezelfde URL met dezelfde checklist en maakt een
 * nieuw project aan dat naar het vorige verwijst (voor de voor/na-vergelijking).
 */
export async function rescanProject(
  project: Project,
  onProgress?: (done: number, total: number) => void,
): Promise<string> {
  const url = (project.url ?? "").trim()
  const page = await fetchPage(url)
  if (!page.doc || !page.text || page.text.trim().length < 40) {
    throw new Error("Pagina kon niet worden opgehaald")
  }
  const answers = await scanToAnswers(project.moduleConfig, page, onProgress)

  const uid = getFirebaseAuth().currentUser?.uid ?? project.userId ?? null
  const now = Date.now()
  const newId = `proj_${now}_${Math.random().toString(36).slice(2, 8)}`

  const newProject: Project = {
    id: newId,
    name: project.name,
    url: project.url,
    urls: project.urls,
    client: project.client,
    mode: project.mode,
    sourceType: project.sourceType,
    userId: uid,
    leadEmail: project.leadEmail,
    answers,
    currentStep: 0,
    createdAt: new Date(now).toISOString(),
    selectedTemplate: project.selectedTemplate,
    moduleConfig: project.moduleConfig,
    rescanOf: project.id,
    previousScore: projectScore(project),
    previousAt: project.createdAt,
    previousScores: scoreMap(project.answers),
  }
  await setDoc(doc(getDb(), "projects", newId), newProject)
  return newId
}

const RANK: Record<string, number> = { good: 3, ok: 2, bad: 1, nvt: 0 }

export interface ScanDiff {
  improved: number
  worsened: number
  same: number
  delta: number | null
}

/** Vergelijkt de huidige antwoorden met de vorige scan-scores. */
export function scanDiff(project: Project): ScanDiff | null {
  if (!project.previousScores || project.previousScore == null) return null
  const answers = project.answers ?? {}
  let improved = 0
  let worsened = 0
  let same = 0
  for (const [id, prev] of Object.entries(project.previousScores)) {
    const now = answers[id]?.score
    if (!now) continue
    const a = RANK[now] ?? 0
    const b = RANK[prev] ?? 0
    if (a > b) improved++
    else if (a < b) worsened++
    else same++
  }
  const cur = projectScore(project)
  return {
    improved,
    worsened,
    same,
    delta: cur != null ? cur - project.previousScore : null,
  }
}
