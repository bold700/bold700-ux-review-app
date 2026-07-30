"use client"

import { useState } from "react"
import { ChevronDown, Wrench, Zap } from "lucide-react"

import type { PlanItem } from "@/lib/action-plan"
import { buildActionPlan } from "@/lib/action-plan"
import type { Project } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const sevClass: Record<string, string> = {
  Kritiek: "bg-red-500/15 text-red-500",
  Belangrijk: "bg-amber-500/15 text-amber-500",
  Klein: "bg-muted text-muted-foreground",
}

export function ActionPlanView({ project }: { project: Project }) {
  const plan = buildActionPlan(project)
  const [open, setOpen] = useState(false)

  if (plan.total === 0) return null

  const rest = open ? plan.priorities : plan.priorities.slice(0, 6)

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Wat je hiermee wint</h2>
        <p className="text-sm text-muted-foreground">
          {plan.total} kans{plan.total !== 1 ? "en" : ""} om meer uit je website
          te halen — geprioriteerd op wat het oplevert versus de moeite. Per punt
          zie je wat je ermee wint en hoe je het aanpakt.
        </p>
      </div>

      {plan.quickWins.length > 0 && (
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="space-y-3 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <Zap className="h-4 w-4" /> Quick wins ({plan.quickWins.length})
              <span className="font-normal text-muted-foreground">
                — kleine moeite, direct effect
              </span>
            </div>
            <ul className="space-y-2">
              {plan.quickWins.map((it) => (
                <li key={it.id} className="flex items-start gap-2 text-sm">
                  <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  <span>
                    <span className="font-medium">{it.title}</span>{" "}
                    <span className="text-muted-foreground">— {it.fix}</span>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {rest.map((it, i) => (
          <PlanRow key={it.id} item={it} rank={i + 1} />
        ))}
      </div>

      {plan.priorities.length > 6 && (
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 text-sm font-medium text-primary print:hidden"
        >
          {open
            ? "Toon minder"
            : `Toon alle ${plan.priorities.length} punten`}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        </button>
      )}
    </section>
  )
}

function PlanRow({ item, rank }: { item: PlanItem; rank: number }) {
  return (
    <Card>
      <CardContent className="py-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            {rank}
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{item.title}</span>
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
              <Badge variant="outline" className="text-[10px] text-muted-foreground">
                Inspanning: {item.effortLabel}
              </Badge>
            </div>
            {item.businessImpact && (
              <p className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-sm text-emerald-700 dark:text-emerald-300">
                <span className="font-semibold">Wat het oplevert: </span>
                {item.businessImpact}
              </p>
            )}
            {item.fix && (
              <p className="text-sm">
                <span className="font-medium text-foreground">Aanpak: </span>
                <span className="text-muted-foreground">{item.fix}</span>
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
