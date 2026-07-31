"use client"

import { useState } from "react"
import { ChevronDown, Target } from "lucide-react"

import type { Answer } from "@/lib/types"
import type { Finding } from "@/lib/report"
import { OUTCOME_VERDICTS, outcomeVerdict } from "@/lib/outcomes"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const toneText: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

/**
 * Interne leerlus (alleen reviewer): markeer per verbeterpunt of je inschatting
 * klopte. Voedt "was mijn hoge inschatting ook vaker raak?".
 */
export function OutcomePanel({
  issues,
  answers,
  onSet,
}: {
  issues: Finding[]
  answers: Record<string, Answer>
  onSet: (id: string, patch: Partial<Answer>) => void
}) {
  const [open, setOpen] = useState(false)
  if (issues.length === 0) return null

  const evaluated = issues.filter((f) => outcomeVerdict(answers[f.id]?.outcome))
    .length
  const proven = issues.filter(
    (f) => outcomeVerdict(answers[f.id]?.outcome)?.proven,
  ).length

  return (
    <Card className="print:hidden">
      <CardContent className="py-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 text-left"
        >
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">
              Evaluatie: was mijn inschatting correct?
            </span>
            <span className="text-xs text-muted-foreground">
              {evaluated}/{issues.length} beoordeeld
              {proven > 0 ? ` · ${proven} met resultaat` : ""}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              Alleen voor jou. Vul dit (bijvoorbeeld na een herscan of
              klantreactie) in om jezelf scherper te maken.
            </p>
            {issues.map((f) => {
              const a = answers[f.id] ?? {}
              const v = outcomeVerdict(a.outcome)
              return (
                <div key={f.id} className="rounded-lg border p-3">
                  <div className="mb-2 flex items-start gap-2">
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        f.score === "bad" ? "bg-red-500" : "bg-amber-500",
                      )}
                    />
                    <span className="text-sm font-medium">{f.question}</span>
                    {v && (
                      <Badge
                        variant="outline"
                        className={cn("ml-auto shrink-0 text-[10px]", toneText[v.tone])}
                      >
                        {v.label}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Select
                      value={a.outcome ?? ""}
                      onValueChange={(val) =>
                        onSet(f.id, {
                          outcome: val,
                          outcomeAt: new Date().toISOString(),
                        })
                      }
                    >
                      <SelectTrigger size="sm" className="w-full sm:w-64">
                        <SelectValue placeholder="Was mijn inschatting correct?" />
                      </SelectTrigger>
                      <SelectContent>
                        {OUTCOME_VERDICTS.map((o) => (
                          <SelectItem key={o.slug} value={o.slug}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Textarea
                      value={a.outcomeNote ?? ""}
                      onChange={(e) =>
                        onSet(f.id, { outcomeNote: e.target.value })
                      }
                      placeholder="Wat gebeurde er? (optioneel)"
                      className="min-h-9 flex-1"
                      rows={1}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
