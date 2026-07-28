"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

import type { Project } from "@/lib/types"
import type { Finding, ReportData } from "@/lib/report"
import { scoreTone } from "@/lib/score"
import { markdownToHtml } from "@/lib/markdown"
import { ActionPlanView } from "@/components/report/action-plan-view"
import { cn } from "@/lib/utils"

const dot: Record<string, string> = {
  good: "bg-emerald-500",
  ok: "bg-amber-500",
  bad: "bg-red-500",
  nvt: "bg-muted-foreground",
}
const scoreColor: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

export function ReportView({
  project,
  data,
  aiPlan,
}: {
  project: Project
  data: ReportData
  aiPlan?: string
}) {
  const [preview, setPreview] = useState<string | null>(null)
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
      <div className="flex items-start justify-between gap-4 border-b pb-4">
        <div className="min-w-0">
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
        </div>
        {data.score != null && (
          <div className="text-center">
            <div
              className={cn(
                "text-4xl font-bold",
                scoreColor[scoreTone(data.score)],
              )}
            >
              {data.score.toFixed(1)}
            </div>
            <div className="text-xs tracking-wide text-muted-foreground uppercase">
              Score
            </div>
          </div>
        )}
      </div>

      {aiPlan && (
        <section>
          <h2 className="mb-2 text-sm font-semibold tracking-wide uppercase">
            ✨ AI-samenvatting
          </h2>
          <div
            className="report-prose rounded-xl border bg-muted/30 p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(aiPlan) }}
          />
        </section>
      )}

      <ActionPlanView project={project} />

      <FindingSection
        title={`Sterke punten (${data.strengths.length})`}
        color="text-emerald-500"
        findings={data.strengths}
        empty="Geen expliciete sterke punten genoteerd."
        onImage={setPreview}
      />
      <FindingSection
        title={`Verbeterpunten (${data.issues.length})`}
        color="text-red-500"
        findings={data.issues}
        empty="Geen verbeterpunten — netjes!"
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
}: {
  title: string
  color: string
  findings: Finding[]
  empty: string
  onImage: (src: string) => void
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
            <div key={f.id} className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn("h-2.5 w-2.5 shrink-0 rounded-full", dot[f.score])}
                />
                <span className="text-sm font-medium">{f.question}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  {f.category}
                </span>
              </div>
              {f.notes && (
                <p className="mt-1.5 text-sm whitespace-pre-wrap text-muted-foreground">
                  {f.notes}
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
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
