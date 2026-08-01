"use client"

import { useEffect, useState } from "react"
import { Check, HelpCircle, MessageSquarePlus, X } from "lucide-react"

import type { Project } from "@/lib/types"
import type { DevEntry, DevStatusMap } from "@/lib/dev-status"
import { devStateOf } from "@/lib/dev-status"
import type { Finding, ReportData } from "@/lib/report"
import { brancheOf, loadBenchmark, siteTypeOf, type Benchmark } from "@/lib/insights"
import { brancheLabel } from "@/lib/branche"
import {
  audienceLabel,
  deviceLabel,
  pageGoalLabel,
} from "@/lib/review-context"
import { scoreTone } from "@/lib/score"
import { markdownToHtml } from "@/lib/markdown"
import { ActionPlanView, type PlainPatch } from "@/components/report/action-plan-view"
import { ReportSummary } from "@/components/report/report-summary"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const dot: Record<string, string> = {
  good: "bg-emerald-500",
  ok: "bg-amber-500",
  bad: "bg-red-500",
  nvt: "bg-muted-foreground",
}

function scoreColorText(s: number | null): string {
  const t = scoreTone(s)
  return t === "good"
    ? "text-emerald-500"
    : t === "ok"
      ? "text-amber-500"
      : t === "bad"
        ? "text-red-500"
        : "text-muted-foreground"
}

export function ReportView({
  project,
  data,
  aiPlan,
  devStatus,
  onDevUpdate,
  editPlain,
}: {
  project: Project
  data: ReportData
  aiPlan?: string
  devStatus?: DevStatusMap
  onDevUpdate?: (id: string, entry: DevEntry) => void
  editPlain?: (id: string, patch: PlainPatch) => void
}) {
  const doneCount = onDevUpdate
    ? data.issues.filter((f) => devStateOf(devStatus?.[f.id]) === "done").length
    : 0
  const questionCount = onDevUpdate
    ? data.issues.filter((f) => devStateOf(devStatus?.[f.id]) === "question")
        .length
    : 0
  const [preview, setPreview] = useState<string | null>(null)
  const [bench, setBench] = useState<Benchmark | null>(null)
  useEffect(() => {
    loadBenchmark().then(setBench)
  }, [])
  useEffect(() => {
    if (!preview) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreview(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [preview])

  const date = new Date(
    project.createdAt ?? project.updatedAt ?? Date.now(),
  ).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <div className="text-xs tracking-wide text-muted-foreground uppercase">
          UX Review rapport
        </div>
        <h1 className="truncate text-2xl font-semibold">
          {project.name || project.url || "UX Review"}
        </h1>
        <div className="mt-1 truncate text-sm text-muted-foreground">
          {project.url}
          {project.client ? ` · ${project.client}` : ""} · {date}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            project.branche && brancheLabel(project.branche),
            siteTypeOf(project).label,
            pageGoalLabel(project.pageGoal),
            audienceLabel(project.audience),
            deviceLabel(project.device),
          ]
            .filter(Boolean)
            .map((label, i) => (
              <span
                key={i}
                className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {label}
              </span>
            ))}
        </div>
      </div>

      <ReportSummary project={project} data={data} />

      {data.score != null &&
        (() => {
          // Voorkeur: vergelijk met de eigen branche (als er genoeg data is),
          // anders met het algemene gemiddelde over alle sites.
          const brSlug = brancheOf(project)
          const br = bench?.branches?.[brSlug]
          // "overig" is een restgroep, geen zinvolle vergelijking → algemeen.
          const useBranche = brSlug !== "overig" && !!br && br.n >= 3
          const avg = useBranche ? br!.avg : bench?.avgScore
          const n = useBranche ? br!.n : bench?.siteCount
          if (avg == null || n == null) return null
          const above = data.score >= avg
          return (
            <div className="rounded-lg border bg-muted/30 px-4 py-2.5 text-sm">
              {useBranche ? (
                <>
                  Vergeleken met{" "}
                  <span className="font-medium text-foreground">
                    {brancheLabel(brSlug).toLowerCase()}
                  </span>{" "}
                  ({n} {n === 1 ? "site" : "sites"}): gemiddeld{" "}
                </>
              ) : (
                <>
                  Gemiddeld over{" "}
                  <span className="font-medium text-foreground">{n}</span>{" "}
                  gereviewde sites:{" "}
                </>
              )}
              <span className="font-medium text-foreground">
                {avg.toFixed(1)}
              </span>
              . Jouw score{" "}
              <span className={cn("font-semibold", scoreColorText(data.score))}>
                {data.score.toFixed(1)}
              </span>{" "}
              ligt{" "}
              {above ? (
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  hierboven
                </span>
              ) : (
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  hieronder
                </span>
              )}
              .
            </div>
          )
        })()}

      {aiPlan && (
        <section>
          <h2 className="mb-2 text-sm font-semibold tracking-wide uppercase">
            Samenvatting
          </h2>
          <div
            className="report-prose rounded-xl border bg-muted/30 p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(aiPlan) }}
          />
        </section>
      )}

      <ActionPlanView
        project={project}
        benchmark={bench}
        editPlain={editPlain}
        devStatus={devStatus}
        onDevUpdate={onDevUpdate}
        onImage={setPreview}
      />

      {onDevUpdate && data.issues.length > 0 && (
        <div className="rounded-xl border bg-muted/30 p-3 text-sm">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="font-medium">
              Verwerkt: {doneCount} / {data.issues.length}
            </span>
            <span className="text-muted-foreground">
              {questionCount > 0
                ? `${questionCount} met een vraag`
                : "Vink af wat je hebt opgepakt"}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{
                width: `${data.issues.length ? (doneCount / data.issues.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Vrije reviews hebben geen actieplan → toon hier de verbeterpunten.
          Bij checklists staan die al in "Het plan" (geen dubbele lijst). */}
      {project.reviewType === "free-form" && (
        <FindingSection
          title={`Verbeterpunten (${data.issues.length})`}
          color="text-red-500"
          findings={data.issues}
          empty="Geen verbeterpunten, netjes!"
          onImage={setPreview}
          devStatus={devStatus}
          onDevUpdate={onDevUpdate}
          plain={project.plainActions}
        />
      )}
      <FindingSection
        title={`Sterke punten (${data.strengths.length})`}
        color="text-emerald-500"
        findings={data.strengths}
        empty="Geen expliciete sterke punten genoteerd."
        onImage={setPreview}
      />

      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm print:hidden"
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

function FindingSection({
  title,
  color,
  findings,
  empty,
  onImage,
  devStatus,
  onDevUpdate,
  plain,
}: {
  title: string
  color: string
  findings: Finding[]
  empty: string
  onImage: (src: string) => void
  devStatus?: DevStatusMap
  onDevUpdate?: (id: string, entry: DevEntry) => void
  plain?: Record<string, { title: string; action: string }>
}) {
  return (
    <section>
      <h2 className={cn("mb-3 text-sm font-semibold tracking-wide uppercase", color)}>
        {title}
      </h2>
      {findings.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <div className="space-y-2.5">
          {findings.map((f) => (
            <FindingItem
              key={f.id}
              f={f}
              onImage={onImage}
              entry={devStatus?.[f.id]}
              onDevUpdate={onDevUpdate}
              plainTitle={plain?.[f.id]?.title}
              plainAction={plain?.[f.id]?.action}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function FindingItem({
  f,
  onImage,
  entry,
  onDevUpdate,
  plainTitle,
  plainAction,
}: {
  f: Finding
  onImage: (src: string) => void
  entry?: DevEntry
  onDevUpdate?: (id: string, entry: DevEntry) => void
  plainTitle?: string
  plainAction?: string
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
    onDevUpdate?.(f.id, {
      status: state,
      note,
      ...patch,
    })

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-colors",
        done && "border-emerald-500/40 bg-emerald-500/5",
        question && "border-amber-500/40 bg-amber-500/5",
      )}
    >
      <div className="flex items-start gap-2">
        {onDevUpdate && (
          <button
            onClick={() => update({ status: done ? "open" : "done" })}
            aria-label={done ? "Markeer als open" : "Markeer als verwerkt"}
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
              done
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-input hover:border-emerald-500",
            )}
          >
            {done && <Check className="h-3.5 w-3.5" />}
          </button>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {!onDevUpdate && (
              <span
                className={cn("h-2.5 w-2.5 shrink-0 rounded-full", dot[f.score])}
              />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                done && "text-muted-foreground line-through",
              )}
            >
              {plainTitle || f.question}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {f.category}
            </span>
            {done && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                Verwerkt
              </span>
            )}
            {question && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                Vraag
              </span>
            )}
          </div>
          {f.notes && (
            <p className="mt-1.5 text-sm whitespace-pre-wrap text-muted-foreground">
              {f.notes}
            </p>
          )}
          {plainAction && (
            <p className="mt-1.5 text-sm">
              <span className="font-medium text-foreground">Doe dit: </span>
              <span className="text-muted-foreground">{plainAction}</span>
            </p>
          )}
          {f.images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {f.images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  onClick={() => onImage(src)}
                  className="h-20 w-28 cursor-zoom-in rounded-md border object-cover"
                />
              ))}
            </div>
          )}

          {onDevUpdate && (
            <div className="mt-2.5 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    update({ status: question ? "open" : "question" })
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
                    if ((entry?.note ?? "") !== note) update({ note })
                  }}
                  placeholder="Notitie voor de reviewer (bijv. 'opgelost in commit abc123' of 'wat bedoel je hier precies?')"
                  className="min-h-16"
                />
              )}
            </div>
          )}

          {/* Toon een opgeslagen developer-notitie ook read-only (bijv. voor de reviewer) */}
          {!onDevUpdate && entry?.note && (
            <div className="mt-2 rounded-md border-l-2 border-primary bg-muted/40 px-3 py-1.5 text-sm">
              <span className="font-medium">Developer: </span>
              <span className="whitespace-pre-wrap text-muted-foreground">
                {entry.note}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
