"use client"

import { Clock } from "lucide-react"

import type { PlanItem } from "@/lib/action-plan"
import { buildActionPlan, planPhases } from "@/lib/action-plan"
import type { Benchmark } from "@/lib/insights"
import type { Project } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const sevClass: Record<string, string> = {
  Kritiek: "bg-red-500/15 text-red-500",
  Belangrijk: "bg-amber-500/15 text-amber-500",
  Klein: "bg-muted text-muted-foreground",
}

const effortMeta: Record<string, { label: string; cls: string }> = {
  Klein: {
    label: "Snel te doen",
    cls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  Middel: {
    label: "Wat werk",
    cls: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  Groot: {
    label: "Groter project",
    cls: "bg-red-500/15 text-red-500",
  },
}

function EffortBadge({ effort }: { effort: string }) {
  const e = effortMeta[effort] ?? {
    label: effort,
    cls: "bg-muted text-muted-foreground",
  }
  return (
    <Badge className={cn("gap-1 text-[10px] font-medium", e.cls)}>
      <Clock className="h-3 w-3" /> {e.label}
    </Badge>
  )
}

const phaseTone: Record<string, { dot: string; text: string; border: string }> = {
  good: {
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
  },
  ok: {
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/30",
  },
  bad: {
    dot: "bg-red-500",
    text: "text-red-500",
    border: "border-red-500/30",
  },
}

export function ActionPlanView({
  project,
  benchmark,
}: {
  project: Project
  benchmark?: Benchmark | null
}) {
  const plan = buildActionPlan(project)
  const plain = project.plainActions ?? {}

  if (plan.total === 0) return null

  const phases = planPhases(plan)

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Het plan</h2>
        <p className="text-sm text-muted-foreground">
          {plan.total} kans{plan.total !== 1 ? "en" : ""} om meer uit je website
          te halen, in fases van snelste winst naar grootste project. Begin
          bovenaan. Per punt zie je wat het oplevert en wat je moet doen.
        </p>
      </div>

      {phases.map((phase) => {
        const tone = phaseTone[phase.tone]
        return (
          <div key={phase.key} className="space-y-2">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2",
                tone.border,
              )}
            >
              <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", tone.dot)} />
              <span className="text-sm font-semibold">
                Fase {phase.num}: {phase.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {phase.subtitle}
              </span>
              <Badge variant="outline" className="ml-auto shrink-0 text-[10px]">
                {phase.items.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {phase.items.map((it, i) => (
                <PlanRow
                  key={it.id}
                  item={it}
                  rank={i + 1}
                  benchmark={benchmark}
                  plain={plain[it.id]}
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

function PlanRow({
  item,
  rank,
  benchmark,
  plain,
}: {
  item: PlanItem
  rank: number
  benchmark?: Benchmark | null
  plain?: { title: string; action: string }
}) {
  const bm = benchmark?.checks?.[item.id]
  const alsoPct = bm && bm.r > 0 ? Math.round(bm.r * 100) : null
  const title = plain?.title || item.title
  const fix = plain?.action || item.fix
  return (
    <Card>
      <CardContent className="py-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            {rank}
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{title}</span>
              <Badge
                className={cn(
                  "text-[10px]",
                  sevClass[item.severityLabel] ?? "bg-muted",
                )}
              >
                {item.severityLabel}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {item.score === "bad" ? "Niet OK" : "Matig"}
              </Badge>
              <EffortBadge effort={item.effortLabel} />
              {alsoPct != null && (
                <Badge
                  variant="outline"
                  className="text-[10px] text-muted-foreground"
                >
                  {alsoPct}% van de sites heeft dit ook
                </Badge>
              )}
            </div>
            {item.businessImpact && (
              <p className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-sm text-emerald-700 dark:text-emerald-300">
                <span className="font-semibold">Wat het oplevert: </span>
                {item.businessImpact}
              </p>
            )}
            {fix && (
              <p className="text-sm">
                <span className="font-medium text-foreground">Doe dit: </span>
                <span className="text-muted-foreground">{fix}</span>
              </p>
            )}
            {item.notes && (
              <p className="text-xs text-muted-foreground">
                Reviewer: {item.notes}
              </p>
            )}
            <p className="text-[11px] text-muted-foreground">{item.category}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
