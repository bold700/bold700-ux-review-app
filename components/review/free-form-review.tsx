"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

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
  const findings = Object.keys(answers)
    .filter((k) => k.startsWith("ff-"))
    .sort(
      (a, b) => (answers[a].findingOrder ?? 0) - (answers[b].findingOrder ?? 0),
    )

  function addFinding() {
    mutate((a) => {
      const order = Object.keys(a).filter((k) => k.startsWith("ff-")).length
      const id = `ff-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">
          Bevindingen ({findings.length})
        </h2>
        <Button size="sm" onClick={addFinding}>
          <Plus className="mr-1 h-4 w-4" /> Nieuwe bevinding
        </Button>
      </div>

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
        return (
          <Card key={id} onFocusCapture={() => setFocusedId(id)}>
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

              <ScoreButtons
                value={a.score}
                onChange={(s) => setAnswer(id, { score: s })}
              />
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
    </div>
  )
}
