"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Loader2,
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
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ScreenshotStrip } from "@/components/review/screenshot-strip"
import { FreeFormReview } from "@/components/review/free-form-review"
import { ScoreButtons, SeverityRow } from "@/components/review/score-controls"
import { cn } from "@/lib/utils"

export function ReviewScreen({ id }: { id: string }) {
  const router = useRouter()
  const { project, setAnswer, mutate, saving } = useProject(id)
  const [focus, setFocus] = useState(0)
  const [aiBusy, setAiBusy] = useState(false)

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
      const pageText = await fetchPageText(project.url ?? "")
      const results = await runAiReview(
        project.url ?? "",
        pageText || "(geen pagina-inhoud opgehaald)",
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
      if (filled)
        toast.success(`${filled} vragen vooraf ingevuld`, {
          id: t,
          description: "Loop ze na en pas aan waar nodig.",
        })
      else toast.error("Geen bruikbaar AI-antwoord ontvangen", { id: t })
    } catch (e) {
      toast.error("AI Auto-Review mislukt", {
        id: t,
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setAiBusy(false)
    }
  }

  const shell = (children: React.ReactNode) => (
    <Shell
      title={project.name ?? project.url ?? "Review"}
      subtitle={project.url}
      onBack={() => router.push("/")}
      onResults={() => router.push(`/review/${id}/scorecard`)}
      saving={saving}
    >
      {children}
    </Shell>
  )

  if (project.reviewType === "free-form") {
    return shell(
      <FreeFormReview
        projectId={id}
        answers={answers}
        setAnswer={setAnswer}
        mutate={mutate}
      />,
    )
  }

  const total = flat.length
  const answered = flat.filter(({ q }) => answers[q.id]?.score).length
  const pct = total ? Math.round((answered / total) * 100) : 0
  const idx = Math.min(focus, Math.max(0, total - 1))
  const current = flat[idx]

  return shell(
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/30 p-2.5">
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

      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {answered} / {total} beoordeeld
          </span>
          <span>{pct}%</span>
        </div>
        <Progress value={pct} />
      </div>

      {/* Stap-chips */}
      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1">
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

      {current && (
        <div>
          <div className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {current.step.title} · vraag {current.qi + 1}/
            {current.step.questions.length}
          </div>
          <QuestionCard
            projectId={id}
            question={current.q}
            answer={answers[current.q.id] ?? {}}
            setAnswer={setAnswer}
          />

          <div className="mt-6 flex items-center justify-between">
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
        </div>
      )}
    </>,
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
    <Card>
      <CardContent className="space-y-4 py-5">
        <div className="flex items-start gap-2">
          <div className="flex-1 text-base font-medium">{question.text}</div>
          {answer.aiFilled && (
            <Badge variant="secondary" className="shrink-0 gap-1 text-[10px]">
              <Sparkles className="h-3 w-3" /> AI
            </Badge>
          )}
        </div>
        {question.business_impact_nl &&
          (answer.score === "bad" || answer.score === "ok") && (
            <p className="text-xs text-muted-foreground">
              {question.business_impact_nl}
            </p>
          )}
        <ScoreButtons
          value={answer.score}
          onChange={(s) => setAnswer(question.id, { score: s })}
        />
        <SeverityRow
          score={answer.score}
          value={answer.severity}
          onChange={(sev) => setAnswer(question.id, { severity: sev })}
        />
        <Textarea
          value={answer.notes ?? ""}
          onChange={(e) => setAnswer(question.id, { notes: e.target.value })}
          placeholder="Notities, bevindingen, aanbevelingen…"
          className="min-h-24"
        />
        <ScreenshotStrip
          projectId={projectId}
          itemKey={question.id}
          images={images}
          onChange={(next) =>
            setAnswer(question.id, { screenshotUrls: next, screenshots: [] })
          }
        />
      </CardContent>
    </Card>
  )
}

function Shell({
  title,
  subtitle,
  onBack,
  onResults,
  saving,
  children,
}: {
  title: string
  subtitle?: string
  onBack: () => void
  onResults?: () => void
  saving?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <BrandLogo className="h-5 w-auto" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{title}</div>
            {subtitle && (
              <div className="truncate text-xs text-muted-foreground">
                {subtitle}
              </div>
            )}
          </div>
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
          {onResults && (
            <Button size="sm" onClick={onResults}>
              Resultaten
            </Button>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
    </div>
  )
}

