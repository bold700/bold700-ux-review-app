"use client"

import { useEffect, useState } from "react"
import {
  Check,
  ChevronDown,
  HelpCircle,
  MessageSquarePlus,
  X,
} from "lucide-react"

import type { Project } from "@/lib/types"
import { buildDevItems, type DevItem } from "@/lib/dev-items"
import {
  devStateOf,
  type DevEntry,
  type DevStatusMap,
} from "@/lib/dev-status"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const sevClass: Record<string, string> = {
  Critical: "bg-red-500/15 text-red-500",
  Important: "bg-amber-500/15 text-amber-500",
  Minor: "bg-muted text-muted-foreground",
}

const effortCls: Record<string, string> = {
  Low: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Medium: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  High: "bg-red-500/15 text-red-500",
}

export function DevChecklist({
  project,
  devStatus,
  onDevUpdate,
}: {
  project: Project
  devStatus: DevStatusMap
  onDevUpdate: (id: string, entry: DevEntry) => void
}) {
  const items = buildDevItems(project)
  // Afgevinkte items uit de openstaande lijst halen: open bovenaan (in
  // prioriteitsvolgorde), afgeronde apart onderin een inklapbaar blok.
  const openItems = items.filter((i) => devStateOf(devStatus[i.id]) !== "done")
  const doneItems = items.filter((i) => devStateOf(devStatus[i.id]) === "done")
  const done = doneItems.length
  const [preview, setPreview] = useState<string | null>(null)
  const [doneOpen, setDoneOpen] = useState(false)

  useEffect(() => {
    if (!preview) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreview(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [preview])

  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p className="text-lg font-medium text-foreground">All clear</p>
        <p className="text-sm">No action items in this review.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">Action items</h1>
        <p className="text-sm text-muted-foreground">
          {project.name || project.url} · {items.length} item
          {items.length !== 1 ? "s" : ""} to fix, ordered by priority.
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5 rounded-[3px] border border-current p-px" />
          Tick the box on the left when a fix is shipped.
        </p>
      </div>

      <div className="rounded-xl border bg-muted/30 p-3 text-sm">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-medium">
            Done: {done} / {items.length}
          </span>
          <span className="text-muted-foreground">Check off what you shipped</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${(done / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Openstaande items */}
      {openItems.length > 0 ? (
        <div className="space-y-2.5">
          {openItems.map((it, i) => (
            <DevRow
              key={it.id}
              item={it}
              rank={i + 1}
              entry={devStatus[it.id]}
              onDevUpdate={onDevUpdate}
              onImage={setPreview}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 py-10 text-center">
          <p className="text-lg font-medium text-emerald-600 dark:text-emerald-400">
            All items shipped 🎉
          </p>
          <p className="text-sm text-muted-foreground">
            Nothing left on the list.
          </p>
        </div>
      )}

      {/* Afgeronde items — ingeklapt onderaan */}
      {doneItems.length > 0 && (
        <div className="space-y-2.5">
          <button
            onClick={() => setDoneOpen((o) => !o)}
            className="flex w-full items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                doneOpen && "rotate-180",
              )}
            />
            Completed ({doneItems.length})
          </button>
          {doneOpen &&
            doneItems.map((it, i) => (
              <DevRow
                key={it.id}
                item={it}
                rank={i + 1}
                entry={devStatus[it.id]}
                onDevUpdate={onDevUpdate}
                onImage={setPreview}
              />
            ))}
        </div>
      )}

      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Screenshot"
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          />
          <button
            onClick={() => setPreview(null)}
            aria-label="Sluiten"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

function DevRow({
  item,
  rank,
  entry,
  onDevUpdate,
  onImage,
}: {
  item: DevItem
  rank: number
  entry?: DevEntry
  onDevUpdate: (id: string, entry: DevEntry) => void
  onImage: (src: string) => void
}) {
  const state = devStateOf(entry)
  const done = state === "done"
  const question = state === "question"
  const [noteOpen, setNoteOpen] = useState(!!entry?.note)
  const [note, setNote] = useState(entry?.note ?? "")

  useEffect(() => {
    setNote(entry?.note ?? "")
    if (entry?.note) setNoteOpen(true)
  }, [entry?.note])

  const update = (patch: Partial<DevEntry>) =>
    onDevUpdate(item.id, { status: state, note, ...patch })

  const sevEn = item.severity
  const effEn = item.effort

  return (
    <Card
      className={cn(
        done && "border-emerald-500/40 bg-emerald-500/5",
        question && "border-amber-500/40 bg-amber-500/5",
      )}
    >
      <CardContent className="py-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() => update({ status: done ? "open" : "done" })}
            aria-label={done ? "Mark as open" : "Mark as done"}
            title={done ? "Mark as open" : "Mark as done"}
            className={cn(
              "group/cb mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
              done
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-input hover:border-emerald-500 hover:bg-emerald-500/10",
            )}
          >
            <Check
              className={cn(
                "h-4 w-4 transition-opacity",
                done
                  ? "opacity-100"
                  : "text-emerald-500 opacity-0 group-hover/cb:opacity-60",
              )}
            />
          </button>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {rank}.
              </span>
              <span
                className={cn(
                  "font-medium",
                  done && "text-muted-foreground line-through",
                )}
              >
                {item.fix || item.title}
              </span>
              <Badge className={cn("text-[10px]", sevClass[sevEn] ?? "bg-muted")}>
                {sevEn}
              </Badge>
              {effEn && (
                <Badge
                  className={cn(
                    "text-[10px] font-medium",
                    effortCls[effEn] ?? "bg-muted text-muted-foreground",
                  )}
                >
                  Effort: {effEn}
                </Badge>
              )}
              {question && (
                <Badge className="bg-amber-500/15 text-[10px] text-amber-600 dark:text-amber-400">
                  Question
                </Badge>
              )}
            </div>
            {item.title && item.title !== item.fix && (
              <p className="text-xs text-muted-foreground">
                Context: {item.title}
              </p>
            )}

            {item.images.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {item.images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt="Screenshot"
                    onClick={() => onImage(src)}
                    className="h-24 w-32 cursor-zoom-in rounded-md border object-cover"
                  />
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => update({ status: question ? "open" : "question" })}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors",
                  question
                    ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground hover:border-amber-500 hover:text-foreground",
                )}
              >
                <HelpCircle className="h-3.5 w-3.5" />
                {question ? "Question asked" : "I don't get this"}
              </button>
              {!noteOpen && (
                <button
                  onClick={() => setNoteOpen(true)}
                  className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MessageSquarePlus className="h-3.5 w-3.5" /> Note
                </button>
              )}
            </div>
            {noteOpen && (
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => {
                  if ((entry?.note ?? "") !== note) update({ note })
                }}
                placeholder="Note for the reviewer (e.g. 'fixed in commit abc123' or 'what do you mean here?')"
                className="min-h-16"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
