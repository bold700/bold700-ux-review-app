import { buildActionPlan } from "@/lib/action-plan"
import { buildReport } from "@/lib/report"
import type { Project } from "@/lib/types"

export interface DevItem {
  id: string
  title: string // korte context / originele check (EN)
  fix: string // wat er moet gebeuren (EN)
  severity: string // English label: Critical | Important | Minor
  effort: string // English label: Low | Medium | High | ""
  category: string
}

const SEV_EN: Record<string, string> = {
  Kritiek: "Critical",
  Belangrijk: "Important",
  Klein: "Minor",
}
const EFFORT_EN: Record<string, string> = {
  Klein: "Low",
  Middel: "Medium",
  Groot: "High",
}

/**
 * Bouwt de Engelse developer-actielijst. Checklist-reviews gebruiken de
 * ingebouwde Engelse checkteksten; vrije reviews gebruiken de opgeslagen
 * AI-vertaling (findingTranslations), met terugval op de NL-tekst.
 */
export function buildDevItems(project: Project): DevItem[] {
  if (project.reviewType === "free-form") {
    const tr = project.findingTranslations ?? {}
    const report = buildReport(project)
    return report.issues.map((f) => ({
      id: f.id,
      title: tr[f.id]?.title || f.question,
      fix: tr[f.id]?.note || f.notes || f.question,
      severity: f.severity === "high" ? "Important" : "Minor",
      effort: "",
      category: f.category,
    }))
  }

  return buildActionPlan(project).priorities.map((it) => ({
    id: it.id,
    title: it.titleEn,
    fix: it.fixEn || it.titleEn,
    severity: SEV_EN[it.severityLabel] ?? it.severityLabel,
    effort: EFFORT_EN[it.effortLabel] ?? it.effortLabel,
    category: it.category,
  }))
}
