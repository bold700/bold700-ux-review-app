"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import {
  ExternalLink,
  FileText,
  Loader2,
  RefreshCw,
  Sparkles,
  Tags,
  Target,
  TrendingDown,
} from "lucide-react"
import { toast } from "sonner"

import { getDb } from "@/lib/firebase"
import type { Project } from "@/lib/types"
import {
  backfillContext,
  projectsMissingContext,
} from "@/lib/review-context"
import { scoreTone } from "@/lib/score"
import {
  brancheOf,
  computeInsights,
  computeSegments,
  generateInsightsSummary,
  loadInsightsSummary,
  pageGoalOf,
  saveBenchmark,
  siteTypeOf,
  type StoredInsight,
} from "@/lib/insights"
import { generateStateReport } from "@/lib/state-report"
import { outcomeStats } from "@/lib/outcomes"
import { useAuth } from "@/components/providers/auth-provider"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const toneText: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

export function InsightsDashboard() {
  const { user, role } = useAuth()
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [stored, setStored] = useState<StoredInsight | null>(null)
  const [gen, setGen] = useState(false)
  const [brancheF, setBrancheF] = useState("all")
  const [siteF, setSiteF] = useState("all")
  const [goalF, setGoalF] = useState("all")
  const [backfilling, setBackfilling] = useState(false)
  const [genReport, setGenReport] = useState(false)

  const loadProjects = useCallback(async () => {
    try {
      const snap = await getDocs(
        query(collection(getDb(), "projects"), orderBy("createdAt", "desc")),
      )
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project))
    } catch (e) {
      console.error("[insights] load", e)
      setProjects([])
    }
  }, [])

  useEffect(() => {
    if (!user || role !== "admin") return
    ;(async () => {
      await loadProjects()
      setStored(await loadInsightsSummary())
    })()
  }, [user, role, loadProjects])

  const missing = useMemo(
    () => (projects ? projectsMissingContext(projects) : []),
    [projects],
  )

  async function runBackfill() {
    if (!projects || missing.length === 0) return
    setBackfilling(true)
    const t = toast.loading(`Context herkennen… 0/${missing.length}`)
    try {
      const res = await backfillContext(projects, (done, total) => {
        toast.loading(`Context herkennen… ${done}/${total}`, { id: t })
      })
      await loadProjects()
      toast.success(`${res.updated} van ${res.total} reviews getagd`, { id: t })
    } catch (e) {
      toast.error("Bijwerken mislukt", {
        id: t,
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setBackfilling(false)
    }
  }

  // Volledige aggregatie (alle projecten) — voor benchmark, segmenten en de
  // globale AI-analyse.
  const fullInsights = useMemo(
    () => (projects ? computeInsights(projects) : null),
    [projects],
  )
  const segments = useMemo(
    () => (projects ? computeSegments(projects) : null),
    [projects],
  )

  // Gefilterde subset voor de weergave (branche + sitetype).
  const filtered = useMemo(() => {
    if (!projects) return null
    return projects.filter(
      (p) =>
        (brancheF === "all" || brancheOf(p) === brancheF) &&
        (siteF === "all" || siteTypeOf(p).key === siteF) &&
        (goalF === "all" || pageGoalOf(p) === goalF),
    )
  }, [projects, brancheF, siteF, goalF])

  const insights = useMemo(
    () => (filtered ? computeInsights(filtered) : null),
    [filtered],
  )

  const isFiltered = brancheF !== "all" || siteF !== "all" || goalF !== "all"

  // Leerlus: hoe vaak was mijn inschatting raak, over alle reviews.
  const learn = useMemo(() => {
    const list = projects ?? []
    let evaluated = 0
    let hits = 0
    let proven = 0
    for (const p of list) {
      const s = outcomeStats(p)
      evaluated += s.evaluated
      hits += s.hits
      proven += s.proven
    }
    return {
      evaluated,
      hits,
      proven,
      hitRate: evaluated ? hits / evaluated : null,
    }
  }, [projects])

  // Benchmark + segmenten publiek opslaan zodat rapporten 'm kunnen tonen.
  useEffect(() => {
    if (fullInsights && fullInsights.scoredCount > 0) {
      saveBenchmark(fullInsights, segments ?? undefined).catch(() => {})
    }
  }, [fullInsights, segments])

  async function buildPublicReport() {
    if (!fullInsights || !segments) return
    setGenReport(true)
    const t = toast.loading("Publiek rapport genereren…")
    try {
      await generateStateReport(fullInsights, segments)
      toast.success("Publiek rapport bijgewerkt", { id: t })
    } catch (e) {
      toast.error("Genereren mislukt", {
        id: t,
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setGenReport(false)
    }
  }

  async function refresh() {
    if (!fullInsights) return
    setGen(true)
    try {
      const summary = await generateInsightsSummary(fullInsights)
      setStored({
        summary,
        generatedAt: new Date().toISOString(),
        siteCount: fullInsights.scoredCount,
      })
      toast.success("AI-analyse vernieuwd")
    } catch (e) {
      toast.error("Vernieuwen mislukt", {
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setGen(false)
    }
  }

  if (role !== "admin") {
    return (
      <AppShell title="Insights">
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          Alleen voor beheerders.
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Insights">
      <div className="mx-auto w-full max-w-5xl min-w-0 overflow-x-hidden px-4 py-6 sm:py-8 lg:px-6">
        {!insights ? (
          <div className="space-y-4">
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filters: branche + sitetype */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Select value={brancheF} onValueChange={setBrancheF}>
                <SelectTrigger size="sm" className="w-full sm:w-56">
                  <SelectValue placeholder="Alle branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle branches</SelectItem>
                  {segments?.branches.map((b) => (
                    <SelectItem key={b.key} value={b.key}>
                      {b.label} ({b.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={siteF} onValueChange={setSiteF}>
                <SelectTrigger size="sm" className="w-full sm:w-56">
                  <SelectValue placeholder="Alle sitetypes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle sitetypes</SelectItem>
                  {segments?.siteTypes.map((t) => (
                    <SelectItem key={t.key} value={t.key}>
                      {t.label} ({t.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={goalF} onValueChange={setGoalF}>
                <SelectTrigger size="sm" className="w-full sm:w-56">
                  <SelectValue placeholder="Alle doelen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle doelen</SelectItem>
                  {segments?.pageGoals.map((g) => (
                    <SelectItem key={g.key} value={g.key}>
                      {g.label} ({g.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isFiltered && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setBrancheF("all")
                    setSiteF("all")
                    setGoalF("all")
                  }}
                  className="text-muted-foreground"
                >
                  Filters wissen
                </Button>
              )}
              <div className="flex items-center gap-3 sm:ml-auto">
                {missing.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={runBackfill}
                    disabled={backfilling}
                  >
                    {backfilling ? (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <Tags className="mr-1 h-4 w-4" />
                    )}
                    {missing.length} zonder context taggen
                  </Button>
                )}
                <span className="text-xs text-muted-foreground">
                  {insights.scoredCount} van {fullInsights?.scoredCount ?? 0}{" "}
                  sites{isFiltered ? " (gefilterd)" : ""}
                </span>
              </div>
            </div>

            {insights.scoredCount === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  Geen gescoorde sites in deze selectie.
                </CardContent>
              </Card>
            ) : null}

            {/* Benchmark */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="py-5">
                  <div
                    className={cn(
                      "text-4xl font-bold",
                      toneText[scoreTone(insights.avgScore)],
                    )}
                  >
                    {insights.avgScore == null
                      ? "—"
                      : insights.avgScore.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Gemiddelde UX-score
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-5">
                  <div className="text-4xl font-bold">
                    {insights.scoredCount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Gereviewde websites
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-5">
                  <div className="mb-2 flex h-3 overflow-hidden rounded-full bg-muted">
                    {(["good", "ok", "bad"] as const).map((k) => {
                      const n = insights.distribution[k]
                      const pct = insights.scoredCount
                        ? (n / insights.scoredCount) * 100
                        : 0
                      const cls =
                        k === "good"
                          ? "bg-emerald-500"
                          : k === "ok"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      return n ? (
                        <div key={k} className={cls} style={{ width: `${pct}%` }} />
                      ) : null
                    })}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Legend cls="bg-emerald-500" label="goed" n={insights.distribution.good} />
                    <Legend cls="bg-amber-500" label="matig" n={insights.distribution.ok} />
                    <Legend cls="bg-red-500" label="zwak" n={insights.distribution.bad} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI-analyse */}
            <Card>
              <CardContent className="space-y-3 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-primary" /> AI-analyse
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={refresh}
                    disabled={gen}
                  >
                    {gen ? (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-1 h-4 w-4" />
                    )}
                    Vernieuwen
                  </Button>
                </div>
                {stored?.summary ? (
                  <>
                    <p className="text-sm leading-relaxed">{stored.summary}</p>
                    <p className="text-[11px] text-muted-foreground">
                      Bijgewerkt{" "}
                      {new Date(stored.generatedAt).toLocaleString("nl-NL")} ·{" "}
                      {stored.siteCount} sites
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nog geen analyse. Klik op “Vernieuwen” om de AI de patronen
                    over alle sites te laten samenvatten.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Publiek rapport */}
            <Card>
              <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">Publiek rapport</div>
                    <p className="text-sm text-muted-foreground">
                      Deelbare pagina in gewone taal (“Hoe goed zijn websites
                      van ondernemers?”). Genereer opnieuw na nieuwe reviews.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={buildPublicReport}
                    disabled={genReport}
                  >
                    {genReport ? (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-1 h-4 w-4" />
                    )}
                    Genereren
                  </Button>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href="/rapport" target="_blank">
                      Bekijk <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leerlus */}
            {learn.evaluated > 0 && (
              <Card>
                <CardContent className="py-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Target className="h-4 w-4 text-primary" /> Jouw leerlus
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold tabular-nums">
                        {learn.evaluated}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        bevindingen geëvalueerd
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold tabular-nums text-emerald-500">
                        {learn.hitRate != null
                          ? `${Math.round(learn.hitRate * 100)}%`
                          : "—"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        was raak (terecht)
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold tabular-nums text-emerald-500">
                        {learn.proven}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        met aantoonbaar resultaat
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benchmark per branche */}
            {segments && segments.branches.length > 0 && (
              <div>
                <h2 className="mb-1 text-lg font-semibold">
                  Benchmark per branche
                </h2>
                <p className="mb-3 text-sm text-muted-foreground">
                  Gemiddelde UX-score per sector. Klik om te filteren. Sectoren
                  met minder dan 3 sites zijn indicatief (te weinig data).
                </p>
                <div className="space-y-1.5">
                  {segments.branches.map((b) => {
                    const active = brancheF === b.key
                    const thin = b.count < 3
                    return (
                      <button
                        key={b.key}
                        onClick={() =>
                          setBrancheF(active ? "all" : b.key)
                        }
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors hover:border-ring",
                          active && "border-primary bg-primary/5",
                        )}
                      >
                        <div className="w-24 shrink-0 truncate text-sm font-medium sm:w-40">
                          {b.label}
                        </div>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              scoreTone(b.avgScore) === "good"
                                ? "bg-emerald-500"
                                : scoreTone(b.avgScore) === "ok"
                                  ? "bg-amber-500"
                                  : "bg-red-500",
                            )}
                            style={{ width: `${(b.avgScore / 10) * 100}%` }}
                          />
                        </div>
                        <div
                          className={cn(
                            "w-9 shrink-0 text-right text-sm font-semibold tabular-nums",
                            toneText[scoreTone(b.avgScore)],
                          )}
                        >
                          {b.avgScore.toFixed(1)}
                        </div>
                        <div
                          className={cn(
                            "w-14 shrink-0 text-right text-xs tabular-nums text-muted-foreground",
                            thin && "italic",
                          )}
                        >
                          {b.count} {b.count === 1 ? "site" : "sites"}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Meest voorkomende problemen */}
            <div>
              <h2 className="mb-1 text-lg font-semibold">
                Meest voorkomende problemen
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">
                Waar websites structureel op vastlopen, gesorteerd op faal-%
                (alleen checks die op ≥5 sites zijn beoordeeld).
              </p>
              <div className="overflow-x-auto rounded-xl border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Probleem</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Categorie
                      </TableHead>
                      <TableHead className="text-right">Faalt</TableHead>
                      <TableHead className="hidden text-right md:table-cell">
                        Sites
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insights.problems.slice(0, 10).map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="max-w-[180px] sm:max-w-[380px]">
                          <div className="truncate font-medium">{p.text}</div>
                          {p.businessImpact && (
                            <div className="truncate text-xs text-muted-foreground">
                              {p.businessImpact}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">
                          {p.category}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={cn(
                              "font-bold tabular-nums",
                              p.failRate >= 0.6
                                ? "text-red-500"
                                : p.failRate >= 0.3
                                  ? "text-amber-500"
                                  : "text-muted-foreground",
                            )}
                          >
                            {Math.round(p.failRate * 100)}%
                          </span>
                        </TableCell>
                        <TableCell className="hidden text-right text-muted-foreground md:table-cell">
                          {p.failing}/{p.samples}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Gemiddelde per module */}
            <div>
              <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
                <TrendingDown className="h-4 w-4 text-muted-foreground" />{" "}
                Gemiddelde per categorie
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">
                Zwakste categorieën eerst.
              </p>
              <div className="space-y-2">
                {insights.modules.slice(0, 12).map((m) => (
                  <div key={m.module} className="flex items-center gap-3">
                    <div className="w-28 shrink-0 truncate text-sm sm:w-40">
                      {m.module}
                    </div>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          scoreTone(m.avg) === "good"
                            ? "bg-emerald-500"
                            : scoreTone(m.avg) === "ok"
                              ? "bg-amber-500"
                              : "bg-red-500",
                        )}
                        style={{ width: `${(m.avg / 10) * 100}%` }}
                      />
                    </div>
                    <div
                      className={cn(
                        "w-10 shrink-0 text-right text-sm font-semibold tabular-nums",
                        toneText[scoreTone(m.avg)],
                      )}
                    >
                      {m.avg.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Op basis van {insights.siteCount} projecten. Vrije reviews tellen
              mee voor de score, niet voor de per-check-analyse.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  )
}

function Legend({ cls, label, n }: { cls: string; label: string; n: number }) {
  return (
    <span className="flex items-center gap-1">
      <span className={cn("h-2 w-2 rounded-full", cls)} />
      {label} <span className="font-medium text-foreground">{n}</span>
    </span>
  )
}
