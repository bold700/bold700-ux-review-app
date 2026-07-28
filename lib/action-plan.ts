import {
  buildReviewSteps,
  getDefaultModuleConfig,
  type ReviewCheck,
} from "@/lib/modules"
import type { Project } from "@/lib/types"

export interface PlanItem {
  id: string
  title: string
  category: string
  score: "bad" | "ok"
  severity: string
  severityLabel: string
  effort: string
  effortLabel: string
  fix: string
  businessImpact?: string
  notes?: string
  priority: number
  quickWin: boolean
}

export interface ActionPlan {
  total: number
  quickWins: PlanItem[]
  priorities: PlanItem[]
}

const SEV_LABEL: Record<string, string> = {
  critical: "Kritiek",
  important: "Belangrijk",
  minor: "Klein",
}
const SEV_WEIGHT: Record<string, number> = {
  critical: 3,
  important: 2,
  minor: 1,
}
const EFFORT_LABEL: Record<string, string> = {
  low: "Klein",
  medium: "Middel",
  high: "Groot",
}
const EFFORT_ORDER: Record<string, number> = { low: 0, medium: 1, high: 2 }

/**
 * Bouwt een geprioriteerd actieplan uit onze eigen check-metadata
 * (fix-suggestie, severity, effort) voor alle checks die "matig" of
 * "niet ok" scoorden. Geen AI nodig — deterministisch en herleidbaar.
 */
export function buildActionPlan(project: Project): ActionPlan {
  const answers = project.answers ?? {}
  if (project.reviewType === "free-form") {
    return { total: 0, quickWins: [], priorities: [] }
  }

  let checks: { check: ReviewCheck; category: string }[] = []
  try {
    const steps = buildReviewSteps(
      project.moduleConfig ?? getDefaultModuleConfig(),
    )
    checks = steps.flatMap((s) =>
      s.questions.map((q) => ({ check: q, category: s.shortTitle })),
    )
  } catch {
    checks = []
  }

  const items: PlanItem[] = []
  for (const { check, category } of checks) {
    const a = answers[check.id]
    if (!a?.score || (a.score !== "bad" && a.score !== "ok")) continue

    const severity = check.severity || "important"
    const effort = check.effort || "medium"
    const reviewerHigh = a.severity === "high"
    const scoreWeight = a.score === "bad" ? 3 : 1
    const priority =
      scoreWeight * 3 + (SEV_WEIGHT[severity] ?? 2) * 2 + (reviewerHigh ? 2 : 0)
    const quickWin =
      effort === "low" && (a.score === "bad" || severity !== "minor")

    items.push({
      id: check.id,
      title: check.text,
      category,
      score: a.score,
      severity,
      severityLabel: SEV_LABEL[severity] ?? severity,
      effort,
      effortLabel: EFFORT_LABEL[effort] ?? effort,
      fix: check.fix_suggestion_nl ?? "",
      businessImpact: check.business_impact_nl,
      notes: (a.notes ?? "").replace(/\[(Auto|AI|Auto-scan)\]\s*/g, "").trim(),
      priority,
      quickWin,
    })
  }

  items.sort(
    (a, b) =>
      b.priority - a.priority ||
      (EFFORT_ORDER[a.effort] ?? 1) - (EFFORT_ORDER[b.effort] ?? 1),
  )

  const quickWins = items.filter((i) => i.quickWin).slice(0, 6)

  return { total: items.length, quickWins, priorities: items }
}
