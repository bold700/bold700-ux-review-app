"use client"

import { useEffect, useState } from "react"
import { Check, ChevronDown, Lightbulb, ShieldCheck, ThumbsUp, X } from "lucide-react"

import type { Project } from "@/lib/types"
import type { Finding, ReportData } from "@/lib/report"
import { brancheOf, loadBenchmark, type Benchmark } from "@/lib/insights"
import { brancheLabel } from "@/lib/branche"
import { scoreTone } from "@/lib/score"
import { deJargon } from "@/lib/de-jargon"
import { Card, CardContent } from "@/components/ui/card"
import { ContactButtons } from "@/components/report/contact-buttons"
import { cn } from "@/lib/utils"

const toneText: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}
const toneLabel: Record<string, string> = {
  good: "Sterk",
  ok: "Redelijk",
  bad: "Kan beter",
  na: "",
}
// Bad-punten eerst, daarbinnen hoge severity eerst.
const scoreRank: Record<string, number> = { bad: 0, ok: 1, good: 2, nvt: 3 }
const sevRank: Record<string, number> = { high: 0, medium: 1, low: 2 }

// Kort, geruststellend oordeel op basis van de score.
function verdictLine(score: number | null, n: number): string {
  if (score != null && score >= 7.5)
    return "Je website staat er goed voor. Met een paar aanpassingen haal je er nog meer klanten uit."
  if (n === 0) return "Je website staat er op de belangrijkste punten goed voor."
  if (score != null && score < 5)
    return "Je website laat op dit moment klanten liggen. Het goede nieuws: er valt flink wat te winnen."
  return "Je website doet het redelijk, maar laat nog klanten liggen. Hieronder zie je waar de winst zit."
}

// "a, b en c"
function listNL(items: string[]): string {
  const a = items.slice(0, 3)
  if (a.length <= 1) return a[0] ?? ""
  return a.slice(0, -1).join(", ") + " en " + a[a.length - 1]
}

// Samenvatting in gewone taal, uit de score en de belangrijkste punten.
function buildSamenvatting(
  project: Project,
  data: ReportData,
  issues: Finding[],
): string {
  if (project.samenvatting && project.samenvatting.trim())
    return project.samenvatting.trim()

  const score = data.score
  const plain = project.plainActions ?? {}
  const themes = issues
    .slice(0, 3)
    .map((f) => deJargon(plain[f.id]?.title || f.question || "").toLowerCase())
    .filter(Boolean)

  const parts: string[] = []
  if (score != null && score >= 7.5) {
    parts.push(
      "Je website maakt een sterke indruk: bezoekers snappen wat je doet en vinden makkelijk hun weg.",
    )
  } else if (score != null && score < 5) {
    parts.push(
      "Bezoekers haken op je website nu waarschijnlijk af voordat ze contact opnemen.",
    )
  } else {
    parts.push(
      "Je website is op de goede weg, maar een paar dingen houden bezoekers tegen om de stap te zetten.",
    )
  }
  if (issues.length > 0) {
    parts.push(
      `We zien ${issues.length} ${
        issues.length === 1 ? "punt" : "punten"
      } om te verbeteren. De grootste kansen zitten ${
        themes.length ? "in " + listNL(themes) : "hieronder"
      }.`,
    )
  }
  if (data.strengths.length > 0) {
    parts.push(
      `Er gaat ook al ${data.strengths.length} ${
        data.strengths.length === 1 ? "ding" : "dingen"
      } goed.`,
    )
  }
  parts.push(
    "Pak je de punten hieronder op, dan haal je meer uit dezelfde bezoekers.",
  )
  return parts.join(" ")
}

export function ClientReportView({
  project,
  data,
}: {
  project: Project
  data: ReportData
}) {
  const [preview, setPreview] = useState<string | null>(null)
  const [restOpen, setRestOpen] = useState(false)
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

  const score = data.score
  const tone = scoreTone(score)
  const issues = [...data.issues].sort(
    (a, b) =>
      (scoreRank[a.score] ?? 9) - (scoreRank[b.score] ?? 9) ||
      (sevRank[a.severity ?? "low"] ?? 9) - (sevRank[b.severity ?? "low"] ?? 9),
  )
  const top = issues.slice(0, 3)
  const rest = issues.slice(3)
  const samenvatting = buildSamenvatting(project, data, issues)
  const date = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : ""

  return (
    <div className="space-y-6">
      {/* Kop */}
      <div className="border-b pb-4">
        <div className="text-xs tracking-wide text-muted-foreground uppercase">
          Website-check
        </div>
        <h1 className="truncate text-2xl font-semibold">
          {project.name || project.url || "Website-check"}
        </h1>
        <div className="mt-1 truncate text-sm text-muted-foreground">
          {project.url}
          {date && ` · ${date}`}
        </div>
      </div>

      {/* Score + oordeel */}
      <div className="flex items-center gap-5 rounded-2xl border bg-muted/30 p-5">
        {score != null && (
          <div className="shrink-0 text-center">
            <div className={cn("text-5xl font-bold leading-none", toneText[tone])}>
              {score.toFixed(1)}
            </div>
            <div className="mt-1 text-[11px] tracking-wide text-muted-foreground uppercase">
              / 10 {toneLabel[tone] && `· ${toneLabel[tone]}`}
            </div>
          </div>
        )}
        <p className="text-sm leading-relaxed">
          {verdictLine(score, issues.length)}
        </p>
      </div>

      {/* Samenvatting in gewone taal */}
      <section className="rounded-2xl border bg-background p-5">
        <div className="mb-2 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold">In het kort</h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {samenvatting}
        </p>
      </section>

      {/* Benchmark: hoe verhoudt de score zich tot vergelijkbare sites */}
      {score != null &&
        (() => {
          const brSlug = brancheOf(project)
          const br = bench?.branches?.[brSlug]
          const useBranche = brSlug !== "overig" && !!br && br.n >= 3
          const avg = useBranche ? br!.avg : bench?.avgScore
          const n = useBranche ? br!.n : bench?.siteCount
          if (avg == null || n == null) return null
          const above = score >= avg
          return (
            <div className="rounded-xl border bg-muted/20 px-4 py-3 text-sm">
              {useBranche ? (
                <>
                  Vergeleken met andere{" "}
                  <span className="font-medium text-foreground">
                    {brancheLabel(brSlug).toLowerCase()}
                  </span>{" "}
                  ({n} {n === 1 ? "site" : "sites"}): gemiddeld{" "}
                </>
              ) : (
                <>
                  Gemiddeld over{" "}
                  <span className="font-medium text-foreground">{n}</span>{" "}
                  gecheckte sites:{" "}
                </>
              )}
              <span className="font-medium text-foreground">{avg.toFixed(1)}</span>.
              Jouw{" "}
              <span className={cn("font-semibold", toneText[tone])}>
                {score.toFixed(1)}
              </span>{" "}
              ligt daar{" "}
              {above ? (
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  boven
                </span>
              ) : (
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  onder
                </span>
              )}
              .
            </div>
          )
        })()}

      {/* De belangrijkste punten */}
      {top.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Wat je het eerst kunt oppakken</h2>
          <p className="text-sm text-muted-foreground">
            De belangrijkste punten, met wat je eraan kunt doen. Tik een punt aan
            voor de uitleg.
          </p>
          <div className="space-y-2 pt-1">
            {top.map((f, i) => (
              <ClientFindingCard
                key={f.id}
                f={f}
                rankNum={i + 1}
                plain={project.plainActions?.[f.id]}
                open={i === 0}
                onImage={setPreview}
              />
            ))}
          </div>
        </section>
      )}

      {/* Overige punten */}
      {rest.length > 0 && (
        <section className="space-y-2">
          <button
            onClick={() => setRestOpen((o) => !o)}
            className="flex items-center gap-1 text-sm font-medium text-primary"
          >
            {restOpen ? "Verberg" : `Toon ${rest.length} overige punten`}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                restOpen && "rotate-180",
              )}
            />
          </button>
          {restOpen &&
            rest.map((f, i) => (
              <ClientFindingCard
                key={f.id}
                f={f}
                rankNum={top.length + i + 1}
                plain={project.plainActions?.[f.id]}
                onImage={setPreview}
              />
            ))}
        </section>
      )}

      {/* Wat al goed gaat */}
      {data.strengths.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-emerald-500" />
            <h2 className="text-lg font-semibold">Wat al goed gaat</h2>
          </div>
          <div className="space-y-1.5">
            {data.strengths.map((f) => (
              <div
                key={f.id}
                className="flex items-start gap-2.5 rounded-lg border bg-emerald-500/[0.06] px-3 py-2.5 text-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                  {deJargon(project.plainActions?.[f.id]?.title || f.question)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Geruststelling: één regel, geen technisch AI-verhaal */}
      <div className="flex items-start gap-2.5 rounded-xl border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          Deze check is gemaakt door het BOLD700-analyseteam en nagekeken door een
          specialist. Wil je de technische details? Vraag je websitebouwer om de
          developer-versie.
        </p>
      </div>

      {/* CTA */}
      <section className="rounded-2xl border bg-primary/5 p-6 text-center">
        <h2 className="text-xl font-semibold">
          Samen kijken wat het meeste oplevert?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Kenny neemt het rapport met je door en geeft je de volgorde die het
          snelst nieuwe klanten oplevert. Kies hoe je contact opneemt:
        </p>
        <div className="mt-5">
          <ContactButtons />
        </div>
      </section>

      {/* Lightbox voor screenshots */}
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

function ClientFindingCard({
  f,
  rankNum,
  plain,
  open: openInit,
  onImage,
}: {
  f: Finding
  rankNum: number
  plain?: { title: string; action: string; impact?: string; uitleg?: string }
  open?: boolean
  onImage: (src: string) => void
}) {
  const [open, setOpen] = useState(!!openInit)
  const titel = deJargon(plain?.title || f.question || "Verbeterpunt")
  const uitleg = deJargon(plain?.uitleg || f.notes)
  const waarom = deJargon(plain?.impact || "")
  const actie = deJargon(plain?.action || "")
  return (
    <Card>
      <CardContent className="py-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start gap-3 text-left"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {rankNum}
          </span>
          <span className="min-w-0 flex-1 font-medium">{titel}</span>
          <ChevronDown
            className={cn(
              "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open && (
          <div className="mt-3 space-y-2 pl-9 text-sm">
            {uitleg && (
              <p>
                <span className="font-medium text-foreground">
                  Wat er speelt:{" "}
                </span>
                <span className="text-muted-foreground">{uitleg}</span>
              </p>
            )}
            {waarom && (
              <p className="rounded-md bg-amber-500/10 px-2.5 py-1.5 text-amber-700 dark:text-amber-300">
                <span className="font-semibold">Waarom dit belangrijk is: </span>
                {waarom}
              </p>
            )}
            {actie && (
              <p className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-emerald-700 dark:text-emerald-300">
                <span className="font-semibold">Wat je kunt doen: </span>
                {actie}
              </p>
            )}
            {f.images.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
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
        )}
      </CardContent>
    </Card>
  )
}
