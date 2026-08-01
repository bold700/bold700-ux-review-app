"use client"

import { useEffect, useState } from "react"
import {
  Check,
  Clock,
  HelpCircle,
  MessageSquarePlus,
  Pencil,
  X,
} from "lucide-react"

import type { PlanItem } from "@/lib/action-plan"
import { buildActionPlan, planPhases } from "@/lib/action-plan"
import type { Benchmark } from "@/lib/insights"
import type { DevEntry, DevStatusMap } from "@/lib/dev-status"
import { devStateOf } from "@/lib/dev-status"
import { deJargon } from "@/lib/de-jargon"
import type { Project } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type PlainPatch = { title?: string; impact?: string; action?: string }

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
  editPlain,
  devStatus,
  onDevUpdate,
  onImage,
}: {
  project: Project
  benchmark?: Benchmark | null
  editPlain?: (id: string, patch: PlainPatch) => void
  devStatus?: DevStatusMap
  onDevUpdate?: (id: string, entry: DevEntry) => void
  onImage?: (src: string) => void
}) {
  const plan = buildActionPlan(project)
  const plain = project.plainActions ?? {}
  const answers = project.answers ?? {}

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
              {phase.items.map((it) => (
                <PlanRow
                  key={it.id}
                  item={it}
                  benchmark={benchmark}
                  plain={plain[it.id]}
                  images={
                    answers[it.id]?.screenshotUrls ??
                    answers[it.id]?.screenshots ??
                    []
                  }
                  onImage={onImage}
                  entry={devStatus?.[it.id]}
                  onDevUpdate={onDevUpdate}
                  onEdit={
                    editPlain ? (patch) => editPlain(it.id, patch) : undefined
                  }
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
  benchmark,
  plain,
  images = [],
  onImage,
  entry,
  onDevUpdate,
  onEdit,
}: {
  item: PlanItem
  benchmark?: Benchmark | null
  plain?: { title: string; action: string; impact?: string }
  images?: string[]
  onImage?: (src: string) => void
  entry?: DevEntry
  onDevUpdate?: (id: string, entry: DevEntry) => void
  onEdit?: (patch: PlainPatch) => void
}) {
  const bm = benchmark?.checks?.[item.id]
  const alsoPct = bm && bm.r > 0 ? Math.round(bm.r * 100) : null
  const title = deJargon(plain?.title || item.title)
  const fix = deJargon(plain?.action || item.fix)
  const impact = deJargon(plain?.impact || item.businessImpact)

  const [editing, setEditing] = useState(false)
  const [dTitle, setDTitle] = useState(title)
  const [dImpact, setDImpact] = useState(impact ?? "")
  const [dAction, setDAction] = useState(fix ?? "")

  const state = devStateOf(entry)
  const done = state === "done"
  const question = state === "question"
  const [noteOpen, setNoteOpen] = useState(!!entry?.note)
  const [note, setNote] = useState(entry?.note ?? "")
  useEffect(() => {
    setNote(entry?.note ?? "")
    if (entry?.note) setNoteOpen(true)
  }, [entry?.note])
  const dev = (patch: Partial<DevEntry>) =>
    onDevUpdate?.(item.id, { status: state, note, ...patch })

  function openEdit() {
    setDTitle(title)
    setDImpact(impact ?? "")
    setDAction(fix ?? "")
    setEditing(true)
  }
  function save() {
    onEdit?.({ title: dTitle, impact: dImpact, action: dAction })
    setEditing(false)
  }

  return (
    <Card
      className={cn(
        done && "border-emerald-500/40 bg-emerald-500/5",
        question && "border-amber-500/40 bg-amber-500/5",
      )}
    >
      <CardContent className="py-3">
        <div className="flex items-start gap-3">
          {onDevUpdate && (
            <Checkbox
              checked={done}
              onCheckedChange={() =>
                dev({ status: done ? "open" : "done" })
              }
              aria-label={done ? "Markeer als open" : "Markeer als verwerkt"}
              className="mt-0.5 size-5 shrink-0"
            />
          )}
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "font-medium",
                  done && "text-muted-foreground line-through",
                )}
              >
                {title}
              </span>
              <Badge
                className={cn(
                  "text-[10px]",
                  sevClass[item.severityLabel] ?? "bg-muted",
                )}
              >
                {item.severityLabel}
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
              {onEdit && !editing && (
                <button
                  onClick={openEdit}
                  aria-label="Teksten aanpassen"
                  className="ml-auto shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground print:hidden"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">Titel</Label>
                  <Textarea
                    value={dTitle}
                    onChange={(e) => setDTitle(e.target.value)}
                    className="min-h-9"
                    rows={1}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">
                    Wat het oplevert
                  </Label>
                  <Textarea
                    value={dImpact}
                    onChange={(e) => setDImpact(e.target.value)}
                    className="min-h-14"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">Advies</Label>
                  <Textarea
                    value={dAction}
                    onChange={(e) => setDAction(e.target.value)}
                    className="min-h-14"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditing(false)}
                  >
                    <X className="mr-1 h-4 w-4" /> Annuleren
                  </Button>
                  <Button size="sm" onClick={save}>
                    <Check className="mr-1 h-4 w-4" /> Opslaan
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {impact && (
                  <p className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-sm text-emerald-700 dark:text-emerald-300">
                    <span className="font-semibold">Wat het oplevert: </span>
                    {impact}
                  </p>
                )}
                {fix && (
                  <p className="text-sm">
                    <span className="font-medium text-foreground">
                      Advies:{" "}
                    </span>
                    <span className="text-muted-foreground">{fix}</span>
                  </p>
                )}
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {images.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={src}
                        alt=""
                        onClick={() => onImage?.(src)}
                        className="h-20 w-28 cursor-zoom-in rounded-md border object-cover"
                      />
                    ))}
                  </div>
                )}
                <p className="text-[11px] text-muted-foreground">
                  {item.category}
                </p>

                {onDevUpdate && (
                  <div className="mt-1 space-y-2 print:hidden">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() =>
                          dev({ status: question ? "open" : "question" })
                        }
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors",
                          question
                            ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "text-muted-foreground hover:border-amber-500 hover:text-foreground",
                        )}
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        {question ? "Vraag gesteld" : "Ik snap dit niet"}
                      </button>
                      {!noteOpen && (
                        <button
                          onClick={() => setNoteOpen(true)}
                          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <MessageSquarePlus className="h-3.5 w-3.5" /> Notitie
                        </button>
                      )}
                    </div>
                    {noteOpen && (
                      <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        onBlur={() => {
                          if ((entry?.note ?? "") !== note) dev({ note })
                        }}
                        placeholder="Notitie voor de reviewer (bijv. 'opgelost in commit abc123' of 'wat bedoel je hier precies?')"
                        className="min-h-16"
                      />
                    )}
                  </div>
                )}

                {/* opgeslagen developer-notitie read-only tonen (reviewer) */}
                {!onDevUpdate && entry?.note && (
                  <div className="mt-1 rounded-md border-l-2 border-primary bg-muted/40 px-3 py-1.5 text-sm">
                    <span className="font-medium">Developer: </span>
                    <span className="whitespace-pre-wrap text-muted-foreground">
                      {entry.note}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
