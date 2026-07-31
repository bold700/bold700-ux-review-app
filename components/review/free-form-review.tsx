"use client"

import { useEffect, useState } from "react"
import { AlertCircle, Plus, Trash2 } from "lucide-react"

import { FF_CATEGORIES } from "@/lib/modules"
import type { Answer } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScreenshotStrip } from "@/components/review/screenshot-strip"
import { ScoreButtons, SeverityRow } from "@/components/review/score-controls"
import { cn } from "@/lib/utils"

export function FreeFormReview({
  projectId,
  answers,
  setAnswer,
  mutate,
}: {
  projectId: string
  answers: Record<string, Answer>
  setAnswer: (qId: string, patch: Partial<Answer>) => void
  mutate: (fn: (a: Record<string, Answer>) => Record<string, Answer>) => void
}) {
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [pendingScroll, setPendingScroll] = useState<string | null>(null)
  const findings = Object.keys(answers)
    .filter((k) => k.startsWith("ff-"))
    .sort(
      (a, b) => (answers[a].findingOrder ?? 0) - (answers[b].findingOrder ?? 0),
    )

  // Scroll naar (en focus) een net toegevoegde bevinding.
  useEffect(() => {
    if (!pendingScroll) return
    const el = document.querySelector(
      `[data-finding="${pendingScroll}"]`,
    ) as HTMLElement | null
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      const input = el.querySelector("input") as HTMLInputElement | null
      input?.focus({ preventScroll: true })
      setPendingScroll(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findings.length, pendingScroll])

  function addFinding() {
    const id = `ff-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    mutate((a) => {
      const order = Object.keys(a).filter((k) => k.startsWith("ff-")).length
      return {
        ...a,
        [id]: {
          score: null,
          severity: null,
          notes: "",
          findingTitle: "",
          findingCategories: [],
          findingOrder: order,
          screenshotUrls: [],
        },
      }
    })
    setPendingScroll(id)
  }

  function removeFinding(id: string) {
    mutate((a) => {
      const next = { ...a }
      delete next[id]
      return next
    })
  }

  function toggleCategory(id: string, cat: string) {
    const cur = answers[id]?.findingCategories ?? []
    const next = cur.includes(cat)
      ? cur.filter((c) => c !== cat)
      : [...cur, cat]
    setAnswer(id, { findingCategories: next })
  }

  return (
    <div className="relative space-y-4 pb-4">
      <h2 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        Bevindingen ({findings.length})
        {(() => {
          const missing = findings.filter((id) => !answers[id]?.score).length
          return missing > 0 ? (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              {missing} zonder score
            </span>
          ) : null
        })()}
      </h2>

      {findings.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Nog geen bevindingen. Klik op “Nieuwe bevinding” om te starten.
          </CardContent>
        </Card>
      )}

      {findings.map((id, i) => {
        const a = answers[id] ?? {}
        const cats = a.findingCategories ?? []
        const images = a.screenshotUrls ?? a.screenshots ?? []
        const activePaste = focusedId ? focusedId === id : i === 0
        const missingScore = !a.score
        return (
          <Card
            key={id}
            data-finding={id}
            onFocusCapture={() => setFocusedId(id)}
            className={cn(missingScore && "border-amber-500/50")}
          >
            <CardContent className="space-y-4 py-5">
              <div className="flex items-start gap-2">
                <span className="mt-2 text-sm font-medium text-muted-foreground">
                  {i + 1}.
                </span>
                <Input
                  value={a.findingTitle ?? ""}
                  onChange={(e) => setAnswer(id, { findingTitle: e.target.value })}
                  placeholder="Titel van de bevinding"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFinding(id)}
                  aria-label="Verwijder bevinding"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {FF_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggleCategory(id, c.id)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                      cats.includes(c.id)
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div>
                <ScoreButtons
                  value={a.score}
                  onChange={(s) => setAnswer(id, { score: s })}
                />
                {missingScore && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Kies een score, anders telt deze bevinding niet mee in het
                    rapport en de developer-link.
                  </p>
                )}
              </div>
              <SeverityRow
                score={a.score}
                value={a.severity}
                onChange={(sev) => setAnswer(id, { severity: sev })}
              />
              <Textarea
                value={a.notes ?? ""}
                onChange={(e) => setAnswer(id, { notes: e.target.value })}
                placeholder="Beschrijving, observatie, aanbeveling…"
                className="min-h-24"
              />
              <ScreenshotStrip
                projectId={projectId}
                itemKey={id}
                images={images}
                active={activePaste}
                onChange={(next) =>
                  setAnswer(id, { screenshotUrls: next, screenshots: [] })
                }
              />
            </CardContent>
          </Card>
        )
      })}

      {/* Sticky knop: altijd zichtbaar tijdens het werken */}
      <div className="sticky bottom-0 -mx-4 border-t bg-background/95 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur">
        <Button className="w-full" onClick={addFinding}>
          <Plus className="mr-1 h-4 w-4" /> Nieuwe bevinding
        </Button>
      </div>
    </div>
  )
}
