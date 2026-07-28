"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  Loader2,
  Monitor,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

import { useProject } from "@/hooks/use-project"
import { fetchPageText } from "@/lib/page-fetch"
import { runAiReview } from "@/lib/ai-review"
import {
  buildReviewSteps,
  getDefaultModuleConfig,
  type ReviewCheck,
  type ReviewStep,
} from "@/lib/modules"
import type { Answer } from "@/lib/types"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ScreenshotStrip } from "@/components/review/screenshot-strip"
import { FreeFormReview } from "@/components/review/free-form-review"
import { ScoreButtons, SeverityRow } from "@/components/review/score-controls"
import { LivePreview } from "@/components/review/live-preview"
import { cn } from "@/lib/utils"

export function ReviewScreen({ id }: { id: string }) {
  const router = useRouter()
  const { project, setAnswer, mutate, saving } = useProject(id)
  const [focus, setFocus] = useState(0)
  const [aiBusy, setAiBusy] = useState(false)
  const [mobilePreview, setMobilePreview] = useState(false)

  const steps: ReviewStep[] = useMemo(() => {
    if (!project || project.reviewType === "free-form") return []
    try {
      return buildReviewSteps(project.moduleConfig ?? getDefaultModuleConfig())
    } catch {
      return []
    }
  }, [project])

  // Platte lijst van alle vragen met hun stap, voor focus-navigatie
  const flat = useMemo(
    () =>
      steps.flatMap((s, si) =>
        s.questions.map((q, qi) => ({ step: s, q, si, qi })),
      ),
    [steps],
  )

  if (project === undefined) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }
  if (project === null) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-muted-foreground">Review niet gevonden.</p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Terug naar dashboard
        </Button>
      </div>
    )
  }

  const answers = project.answers ?? {}

  async function autoReview() {
    if (!project) return
    const qs = steps
      .flatMap((s) =>
        s.questions.map((q) => ({
          id: q.id,
          text: q.text,
          category: s.shortTitle,
        })),
      )
      .filter((q) => {
        const a = answers[q.id]
        // sla handmatig beantwoorde vragen over
        return !(a?.score && !a.autoScanned && !a.aiFilled)
      })
    if (qs.length === 0) {
      toast.info("Alles is al beantwoord")
      return
    }
    setAiBusy(true)
    const t = toast.loading("AI Auto-Review — pagina ophalen…")
    try {
      const cleanUrl = (project.url ?? "").trim()
      const pageText = await fetchPageText(cleanUrl)
      if (!pageText || pageText.trim().length < 40) {
        toast.error("Pagina kon niet worden opgehaald", {
          id: t,
          description:
            "Controleer de URL — zonder pagina-inhoud kan de AI niet beoordelen (alles wordt dan N.v.t.).",
        })
        setAiBusy(false)
        return
      }
      const results = await runAiReview(
        cleanUrl,
        pageText,
        qs,
        (done, total) =>
          toast.loading(
            total > 1
              ? `AI beoordeelt deel ${Math.min(done + 1, total)}/${total}…`
              : "AI beoordeelt…",
            { id: t },
          ),
      )
      const valid = new Set(["good", "ok", "bad", "nvt"])
      let filled = 0
      mutate((a) => {
        const next = { ...a }
        for (const r of results) {
          if (!r?.id || !valid.has(r.score)) continue
          const cur = next[r.id]
          if (cur?.score && !cur.autoScanned && !cur.aiFilled) continue
          next[r.id] = {
            ...(cur ?? {}),
            score: r.score,
            notes: r.note ? "[AI] " + r.note : (cur?.notes ?? ""),
            aiFilled: true,
            autoScanned: true,
          }
          filled++
        }
        return next
      })
      if (filled) {
        const d = { good: 0, ok: 0, bad: 0, nvt: 0 }
        for (const r of results)
          if (valid.has(r.score)) d[r.score as keyof typeof d]++
        toast.success(`${filled} vragen vooraf ingevuld`, {
          id: t,
          description: `${d.good} goed · ${d.ok} matig · ${d.bad} niet ok · ${d.nvt} nvt. Loop ze na.`,
        })
      } else toast.error("Geen bruikbaar AI-antwoord ontvangen", { id: t })
    } catch (e) {
      toast.error("AI Auto-Review mislukt", {
        id: t,
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setAiBusy(false)
    }
  }

  const previewUrl =
    project.url && project.sourceType !== "figma" ? project.url : null

  const shell = (children: React.ReactNode) => (
    <AppShell
      title={project.name ?? project.url ?? "Review"}
      actions={
        <>
          <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            {saving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" /> Opslaan…
              </>
            ) : (
              <>
                <Cloud className="h-3 w-3" /> Opgeslagen
              </>
            )}
          </span>
          {previewUrl && (
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobilePreview(true)}
            >
              <Monitor className="mr-1 h-4 w-4" /> Site
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => router.push(`/review/${id}/scorecard`)}
          >
            Resultaten
          </Button>
        </>
      }
    >
      <div className="flex flex-1">
        <main
          className={cn(
            "flex min-w-0 flex-1 flex-col",
            previewUrl ? "lg:max-w-2xl" : "mx-auto w-full max-w-3xl",
          )}
        >
          {children}
        </main>
        {previewUrl && (
          <aside className="hidden flex-1 border-l lg:block">
            <div className="sticky top-0 h-svh">
              <LivePreview url={previewUrl} />
            </div>
          </aside>
        )}
      </div>

      {/* Mobiele preview als sluitbare fullscreen-overlay */}
      {previewUrl && mobilePreview && (
        <div className="fixed inset-0 z-50 bg-background pt-[env(safe-area-inset-top)] lg:hidden">
          <LivePreview
            url={previewUrl}
            onClose={() => setMobilePreview(false)}
          />
        </div>
      )}
    </AppShell>
  )

  if (project.reviewType === "free-form") {
    return shell(
      <div className="px-4 py-6">
        <FreeFormReview
          projectId={id}
          answers={answers}
          setAnswer={setAnswer}
          mutate={mutate}
        />
      </div>,
    )
  }

  const total = flat.length
  const answered = flat.filter(({ q }) => answers[q.id]?.score).length
  const pct = total ? Math.round((answered / total) * 100) : 0
  const idx = Math.min(focus, Math.max(0, total - 1))
  const current = flat[idx]

  return shell(
    <div className="flex h-[calc(100dvh-var(--header-height)-env(safe-area-inset-top))] flex-col">
      {/* Vaste kop: AI-balk, voortgang, stap-chips */}
      <div className="shrink-0 space-y-3 px-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/30 p-2.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> Vul de checklist in één
            klik vooraf in
          </div>
          <Button size="sm" onClick={autoReview} disabled={aiBusy}>
            {aiBusy ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Bezig…
              </>
            ) : (
              <>
                <Sparkles className="mr-1 h-4 w-4" /> AI Auto-Review
              </>
            )}
          </Button>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {answered} / {total} beoordeeld
            </span>
            <span>{pct}%</span>
          </div>
          <Progress value={pct} />
        </div>

        {/* Stap-chips */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {steps.map((s, si) => {
            const done = s.questions.every((q) => answers[q.id]?.score)
            const firstIndex = flat.findIndex((f) => f.si === si)
            return (
              <button
                key={s.id}
                onClick={() => setFocus(firstIndex)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                  current?.si === si
                    ? "border-primary bg-primary text-primary-foreground"
                    : done
                      ? "border-emerald-500/40 text-emerald-500"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s.shortTitle}
              </button>
            )
          })}
        </div>
      </div>

      {/* Vraag-kaart vult de resterende ruimte */}
      {current && (
        <div className="flex min-h-0 flex-1 flex-col px-4 pt-3 pb-3">
          <div className="mb-2 shrink-0 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {current.step.title} · vraag {current.qi + 1}/
            {current.step.questions.length}
          </div>
          <QuestionCard
            projectId={id}
            question={current.q}
            answer={answers[current.q.id] ?? {}}
            setAnswer={setAnswer}
          />
        </div>
      )}

      {/* Sticky navigatie onderaan */}
      <div className="sticky bottom-0 z-10 flex shrink-0 items-center justify-between gap-2 border-t bg-background/95 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur">
        <Button
          variant="outline"
          onClick={() => setFocus((f) => Math.max(0, f - 1))}
          disabled={idx === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Vorige
        </Button>
        <div className="text-xs text-muted-foreground">
          {idx + 1} / {total}
        </div>
        <Button
          onClick={() => setFocus((f) => Math.min(total - 1, f + 1))}
          disabled={idx >= total - 1}
        >
          Volgende <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>,
  )
}

function QuestionCard({
  projectId,
  question,
  answer,
  setAnswer,
}: {
  projectId: string
  question: ReviewCheck
  answer: Answer
  setAnswer: (qId: string, patch: Partial<Answer>) => void
}) {
  const images = answer.screenshotUrls ?? answer.screenshots ?? []
  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4 py-5">
        <div className="flex shrink-0 items-start gap-2">
          <div className="flex-1 text-base font-medium">{question.text}</div>
          {answer.aiFilled && (
            <Badge variant="secondary" className="shrink-0 gap-1 text-[10px]">
              <Sparkles className="h-3 w-3" /> AI
            </Badge>
          )}
        </div>
        {question.business_impact_nl &&
          (answer.score === "bad" || answer.score === "ok") && (
            <p className="shrink-0 text-xs text-muted-foreground">
              {question.business_impact_nl}
            </p>
          )}
        <div className="shrink-0">
          <ScoreButtons
            value={answer.score}
            onChange={(s) => setAnswer(question.id, { score: s })}
          />
        </div>
        <SeverityRow
          score={answer.score}
          value={answer.severity}
          onChange={(sev) => setAnswer(question.id, { severity: sev })}
        />
        <Textarea
          value={answer.notes ?? ""}
          onChange={(e) => setAnswer(question.id, { notes: e.target.value })}
          placeholder="Notities, bevindingen, aanbevelingen…"
          className="min-h-24 flex-1 resize-none overflow-y-auto"
        />
        <div className="shrink-0">
          <ScreenshotStrip
            projectId={projectId}
            itemKey={question.id}
            images={images}
            onChange={(next) =>
              setAnswer(question.id, { screenshotUrls: next, screenshots: [] })
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}


