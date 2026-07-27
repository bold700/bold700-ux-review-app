"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Loader2,
} from "lucide-react"

import { useProject } from "@/hooks/use-project"
import {
  buildReviewSteps,
  getDefaultModuleConfig,
  type ReviewStep,
} from "@/lib/modules"
import type { Score, Severity } from "@/lib/types"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function ReviewScreen({ id }: { id: string }) {
  const router = useRouter()
  const { project, setAnswer, saving } = useProject(id)
  const [stepIdx, setStepIdx] = useState(0)

  const steps: ReviewStep[] = useMemo(() => {
    if (!project || project.reviewType === "free-form") return []
    try {
      return buildReviewSteps(project.moduleConfig ?? getDefaultModuleConfig())
    } catch {
      return []
    }
  }, [project])

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

  if (project.reviewType === "free-form") {
    return (
      <Shell title={project.name ?? "Vrije review"} onBack={() => router.push("/")}>
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            De vrije-review-modus komt in een volgende stap. Deze review is wel
            aangemaakt en zichtbaar op je dashboard.
          </CardContent>
        </Card>
      </Shell>
    )
  }

  const allQ = steps.flatMap((s) => s.questions)
  const answered = allQ.filter((q) => answers[q.id]?.score).length
  const pct = allQ.length ? Math.round((answered / allQ.length) * 100) : 0
  const step = steps[Math.min(stepIdx, Math.max(0, steps.length - 1))]

  return (
    <Shell
      title={project.name ?? project.url ?? "Review"}
      subtitle={project.url}
      onBack={() => router.push("/")}
      saving={saving}
    >
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {answered} / {allQ.length} beoordeeld
          </span>
          <span>{pct}%</span>
        </div>
        <Progress value={pct} />
      </div>

      {/* Stap-navigatie */}
      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1">
        {steps.map((s, i) => {
          const done = s.questions.every((q) => answers[q.id]?.score)
          return (
            <button
              key={s.id}
              onClick={() => setStepIdx(i)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                i === stepIdx
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

      {step && (
        <div>
          <h2 className="mb-1 text-lg font-semibold">{step.title}</h2>
          {step.desc && (
            <p className="mb-4 text-sm text-muted-foreground">{step.desc}</p>
          )}
          <div className="grid gap-3">
            {step.questions.map((q, qi) => {
              const a = answers[q.id] ?? {}
              return (
                <Card key={q.id}>
                  <CardContent className="space-y-3 py-4">
                    <div className="flex gap-2 text-sm font-medium">
                      <span className="text-muted-foreground">{qi + 1}.</span>
                      <span>{q.text}</span>
                    </div>
                    {q.type === "auto" && (
                      <Badge variant="outline" className="text-[10px]">
                        auto-check
                      </Badge>
                    )}
                    <ScoreButtons
                      value={a.score}
                      onChange={(s) => setAnswer(q.id, { score: s })}
                    />
                    <SeverityRow
                      score={a.score}
                      value={a.severity}
                      onChange={(sev) => setAnswer(q.id, { severity: sev })}
                    />
                    <Textarea
                      value={a.notes ?? ""}
                      onChange={(e) =>
                        setAnswer(q.id, { notes: e.target.value })
                      }
                      placeholder="Notities, bevindingen, aanbevelingen…"
                      className="min-h-20"
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
              disabled={stepIdx === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Vorige
            </Button>
            <Button
              onClick={() =>
                setStepIdx((s) => Math.min(steps.length - 1, s + 1))
              }
              disabled={stepIdx >= steps.length - 1}
            >
              Volgende <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Shell>
  )
}

function Shell({
  title,
  subtitle,
  onBack,
  saving,
  children,
}: {
  title: string
  subtitle?: string
  onBack: () => void
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
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
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
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
    </div>
  )
}

const SCORE_OPTS: { v: Score; label: string; on: string }[] = [
  { v: "bad", label: "Niet OK", on: "bg-red-500 text-white border-red-500" },
  { v: "ok", label: "Matig", on: "bg-amber-500 text-white border-amber-500" },
  {
    v: "good",
    label: "Goed",
    on: "bg-emerald-500 text-white border-emerald-500",
  },
  { v: "nvt", label: "N.v.t.", on: "bg-muted-foreground text-white" },
]

function ScoreButtons({
  value,
  onChange,
}: {
  value?: Score | null
  onChange: (s: Score) => void
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {SCORE_OPTS.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "rounded-md border py-2 text-xs font-medium transition-colors",
            value === o.v ? o.on : "hover:bg-muted",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function SeverityRow({
  score,
  value,
  onChange,
}: {
  score?: Score | null
  value?: Severity | null
  onChange: (s: Severity) => void
}) {
  if (score !== "ok" && score !== "bad") return null
  const opts: { v: Severity; label: string }[] =
    score === "ok"
      ? [
          { v: "high", label: "Quick Win" },
          { v: "low", label: "Opvuller" },
        ]
      : [
          { v: "high", label: "Strategisch" },
          { v: "low", label: "Niet Nu" },
        ]
  return (
    <div className="grid grid-cols-2 gap-2">
      {opts.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "rounded-md border py-1.5 text-xs font-medium transition-colors",
            value === o.v
              ? "border-primary bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
