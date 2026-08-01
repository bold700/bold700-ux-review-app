import {
  buildReviewSteps,
  FF_CAT_LABELS,
  getDefaultModuleConfig,
  type ReviewStep,
} from "@/lib/modules"
import type { Answer, Project, Score, Severity } from "@/lib/types"
import { projectScore } from "@/lib/score"

export type FindingSource = "measured" | "ai" | undefined

/** Herkomst van een oordeel, met terugval op de oude autoScanned/aiFilled-vlaggen. */
export function sourceOf(a: Answer): FindingSource {
  return a.source ?? (a.autoScanned ? "measured" : a.aiFilled ? "ai" : undefined)
}

export interface Finding {
  id: string
  category: string
  question: string
  score: Score
  severity?: Severity | null
  notes: string
  images: string[]
  source?: FindingSource
  confidence?: "high" | "medium" | "low"
}

export interface ReportData {
  score: number | null
  totalQuestions: number
  counts: {
    total: number
    bad: number
    ok: number
    good: number
    nvt: number
    quickWins: number
  }
  issues: Finding[]
  strengths: Finding[]
}

function imagesOf(a: {
  screenshotUrls?: string[]
  screenshots?: string[]
  screenshot?: string
}): string[] {
  if (a.screenshotUrls?.length) return a.screenshotUrls
  if (a.screenshots?.length) return a.screenshots
  if (a.screenshot) return [a.screenshot]
  return []
}

export function buildReport(project: Project): ReportData {
  const answers = project.answers ?? {}
  const issues: Finding[] = []
  const strengths: Finding[] = []
  const counts = { total: 0, bad: 0, ok: 0, good: 0, nvt: 0, quickWins: 0 }
  let totalQuestions = 0

  const push = (f: Finding) => {
    counts.total++
    if (f.score === "bad") counts.bad++
    else if (f.score === "ok") {
      counts.ok++
      if (f.severity === "high") counts.quickWins++
    } else if (f.score === "good") counts.good++
    else if (f.score === "nvt") counts.nvt++
    if (f.score === "good") strengths.push(f)
    else if (f.score === "bad" || f.score === "ok") issues.push(f)
  }

  if (project.reviewType === "free-form") {
    const keys = Object.keys(answers)
      .filter((k) => k.startsWith("ff-"))
      .sort(
        (a, b) =>
          (answers[a].findingOrder ?? 0) - (answers[b].findingOrder ?? 0),
      )
    totalQuestions = keys.length
    for (const id of keys) {
      const a = answers[id]
      if (!a?.score) continue
      const cats = a.findingCategories ?? (a.findingCategory ? [a.findingCategory] : [])
      const category =
        cats.map((c) => FF_CAT_LABELS[c] ?? c).join(", ") || "Overig"
      const question =
        a.findingTitle || (a.notes ?? "").split("\n")[0].slice(0, 80) || "Bevinding"
      push({
        id,
        category,
        question,
        score: a.score,
        severity: a.severity,
        notes: a.notes ?? "",
        images: imagesOf(a),
        source: sourceOf(a),
        confidence: a.confidence,
      })
    }
  } else {
    let steps: ReviewStep[]
    try {
      steps = buildReviewSteps(project.moduleConfig ?? getDefaultModuleConfig())
    } catch {
      steps = []
    }
    for (const step of steps) {
      for (const q of step.questions) {
        totalQuestions++
        const a = answers[q.id]
        if (!a?.score || a.score === "nvt") {
          if (a?.score === "nvt") push({ id: q.id, category: step.shortTitle, question: q.text, score: "nvt", notes: "", images: [] })
          continue
        }
        push({
          id: q.id,
          category: step.shortTitle,
          question: q.text,
          score: a.score,
          severity: a.severity,
          notes: (a.notes ?? "")
            .replace(/\[(Auto|Auto-scan|AI|Meting)\]\s*/g, "")
            .trim(),
          images: imagesOf(a),
          source: sourceOf(a),
          confidence: a.confidence,
        })
      }
    }
  }

  // hoge impact eerst
  issues.sort((a, b) => (a.severity === "high" ? 0 : 1) - (b.severity === "high" ? 0 : 1))

  return {
    score: projectScore(project),
    totalQuestions,
    counts,
    issues,
    strengths,
  }
}
