"use client"

import { useEffect, useState } from "react"
import { AlertCircle, GripVertical, Plus, Trash2 } from "lucide-react"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

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
          findingOrder: order,
          screenshotUrls: [],
        },
      }
    })
    setPendingScroll(id)
  }

  // Slepen start pas na 5px, anders slikt de greep gewone klikken op.
  // De toetsenbordsensor geeft dezelfde volgorde via de pijltjestoetsen.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  // Na het slepen krijgt elke bevinding zijn nieuwe positie als findingOrder,
  // aaneengesloten vanaf 0. Rapport en developer-lijst lezen datzelfde veld.
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const from = findings.indexOf(String(active.id))
    const to = findings.indexOf(String(over.id))
    if (from < 0 || to < 0) return
    const next = arrayMove(findings, from, to)
    mutate((a) => {
      const copy = { ...a }
      next.forEach((fid, idx) => {
        if (copy[fid]) copy[fid] = { ...copy[fid], findingOrder: idx }
      })
      return copy
    })
  }

  function removeFinding(id: string) {
    mutate((a) => {
      const next = { ...a }
      delete next[id]
      return next
    })
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

      {findings.length > 1 && (
        <p className="-mt-2 text-xs text-muted-foreground">
          Sleep aan de greep om de volgorde te bepalen. De developer werkt de
          lijst van boven naar beneden af.
        </p>
      )}

      {findings.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Nog geen bevindingen. Klik op “Nieuwe bevinding” om te starten.
          </CardContent>
        </Card>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={findings} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {findings.map((id, i) => (
              <SortableFinding
                key={id}
                id={id}
                index={i}
                answer={answers[id] ?? {}}
                projectId={projectId}
                activePaste={focusedId ? focusedId === id : i === 0}
                setAnswer={setAnswer}
                onFocus={() => setFocusedId(id)}
                onRemove={() => removeFinding(id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Sticky knop: altijd zichtbaar tijdens het werken */}
      <div className="sticky bottom-0 -mx-4 border-t bg-background/95 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur">
        <Button className="w-full" onClick={addFinding}>
          <Plus className="mr-1 h-4 w-4" /> Nieuwe bevinding
        </Button>
      </div>
    </div>
  )
}

/**
 * Eén bevinding als sleepbare kaart. De sleeplisteners hangen alleen aan de
 * greep, niet aan de kaart: anders kun je geen tekst meer selecteren in de
 * titel of de beschrijving.
 */
function SortableFinding({
  id,
  index,
  answer,
  projectId,
  activePaste,
  setAnswer,
  onFocus,
  onRemove,
}: {
  id: string
  index: number
  answer: Partial<Answer>
  projectId: string
  activePaste: boolean
  setAnswer: (qId: string, patch: Partial<Answer>) => void
  onFocus: () => void
  onRemove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const images = answer.screenshotUrls ?? answer.screenshots ?? []
  const missingScore = !answer.score

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      data-finding={id}
      onFocusCapture={onFocus}
      className={cn(
        missingScore && "border-amber-500/50",
        isDragging && "relative z-10 shadow-lg",
      )}
    >
      <CardContent className="space-y-4 py-5">
        <div className="flex items-start gap-2">
          <button
            type="button"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            aria-label={`Bevinding ${index + 1} verplaatsen`}
            title="Sleep om te ordenen"
            className="flex h-11 w-11 shrink-0 cursor-grab touch-none items-center justify-center gap-0.5 rounded-md text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4" />
            <span className="text-sm font-medium tabular-nums">{index + 1}</span>
          </button>
          <Input
            value={answer.findingTitle ?? ""}
            onChange={(e) => setAnswer(id, { findingTitle: e.target.value })}
            placeholder="Titel van de bevinding"
            className="mt-1 flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            aria-label="Verwijder bevinding"
            className="mt-1"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        <div>
          <ScoreButtons
            value={answer.score}
            onChange={(s) => setAnswer(id, { score: s })}
          />
          {missingScore && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-3.5 w-3.5" />
              Kies een score, anders telt deze bevinding niet mee in het rapport
              en de developer-link.
            </p>
          )}
        </div>
        <SeverityRow
          score={answer.score}
          value={answer.severity}
          onChange={(sev) => setAnswer(id, { severity: sev })}
        />
        <Textarea
          value={answer.notes ?? ""}
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
}
