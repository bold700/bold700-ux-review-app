"use client"

import { TrendingUp } from "lucide-react"

import type { Project } from "@/lib/types"
import type { ReportData } from "@/lib/report"
import { buildActionPlan } from "@/lib/action-plan"
import { scoreTone } from "@/lib/score"
import { cn } from "@/lib/utils"

const toneText: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

function verdict(score: number | null): string {
  if (score == null) return "Nog geen score"
  if (score >= 8.5) return "een uitstekende basis"
  if (score >= 7) return "een sterke basis"
  if (score >= 5.5) return "een solide basis met duidelijke kansen"
  if (score >= 4) return "ruimte voor flinke verbetering"
  return "veel te winnen"
}

/**
 * Korte samenvatting bovenaan het rapport: score, oordeel en de grootste winst.
 * Volledig deterministisch, geen AI nodig.
 */
export function ReportSummary({
  project,
  data,
}: {
  project: Project
  data: ReportData
}) {
  const name = project.name || project.url || "Deze website"
  const tone = scoreTone(data.score)

  // Belangrijkste kans: checklist gebruikt het geprioriteerde actieplan,
  // vrije review pakt het eerste verbeterpunt.
  const plan = buildActionPlan(project)
  const plain = project.plainActions ?? {}
  const top = plan.priorities[0]
  const topFallback = data.issues[0]
  const topTitle =
    (top && plain[top.id]?.title) || top?.title || topFallback?.question
  const topImpact = top?.businessImpact || topFallback?.notes

  const issues = data.issues.length
  const quick = plan.quickWins.length
  const strengths = data.strengths.length

  return (
    <section className="rounded-2xl border bg-muted/30 p-5">
      <div className="flex items-start gap-4">
        {data.score != null && (
          <div className="shrink-0 text-center">
            <div className={cn("text-4xl font-bold", toneText[tone])}>
              {data.score.toFixed(1)}
            </div>
            <div className="text-[11px] tracking-wide text-muted-foreground uppercase">
              / 10
            </div>
          </div>
        )}
        <div className="min-w-0 space-y-2 text-sm">
          <p>
            <span className="font-semibold">{name}</span> heeft{" "}
            <span className="font-medium">{verdict(data.score)}</span>.{" "}
            {issues > 0 ? (
              <>
                We vonden{" "}
                <span className="font-medium text-foreground">
                  {issues} kans{issues !== 1 ? "en" : ""}
                </span>{" "}
                om meer uit je website te halen
                {quick > 0 ? (
                  <>
                    , waarvan{" "}
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {quick} quick win{quick !== 1 ? "s" : ""}
                    </span>{" "}
                    (kleine moeite, direct effect)
                  </>
                ) : null}
                . Daarnaast staan er {strengths} dingen al sterk.
              </>
            ) : (
              <>Er zijn geen directe verbeterpunten — netjes.</>
            )}
          </p>

          {topTitle && (
            <div className="flex items-start gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-emerald-700 dark:text-emerald-300">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                <span className="font-semibold">Grootste winst: </span>
                {topTitle}
                {topImpact ? (
                  <span className="text-emerald-700/80 dark:text-emerald-300/80">
                    {". "}
                    {topImpact}
                  </span>
                ) : null}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
