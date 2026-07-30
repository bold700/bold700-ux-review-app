"use client"

import { useEffect, useMemo, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { Loader2, RefreshCw, Sparkles, TrendingDown } from "lucide-react"
import { toast } from "sonner"

import { getDb } from "@/lib/firebase"
import type { Project } from "@/lib/types"
import { scoreTone } from "@/lib/score"
import {
  computeInsights,
  generateInsightsSummary,
  loadInsightsSummary,
  saveBenchmark,
  type StoredInsight,
} from "@/lib/insights"
import { useAuth } from "@/components/providers/auth-provider"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

  useEffect(() => {
    if (!user || role !== "admin") return
    ;(async () => {
      try {
        const snap = await getDocs(
          query(collection(getDb(), "projects"), orderBy("createdAt", "desc")),
        )
        setProjects(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project),
        )
      } catch (e) {
        console.error("[insights] load", e)
        setProjects([])
      }
      setStored(await loadInsightsSummary())
    })()
  }, [user, role])

  const insights = useMemo(
    () => (projects ? computeInsights(projects) : null),
    [projects],
  )

  // Benchmark publiek opslaan zodat rapporten 'm kunnen tonen.
  useEffect(() => {
    if (insights && insights.scoredCount > 0) {
      saveBenchmark(insights).catch(() => {})
    }
  }, [insights])

  async function refresh() {
    if (!insights) return
    setGen(true)
    try {
      const summary = await generateInsightsSummary(insights)
      setStored({
        summary,
        generatedAt: new Date().toISOString(),
        siteCount: insights.scoredCount,
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
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 lg:px-6">
        {!insights ? (
          <div className="space-y-4">
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        ) : (
          <div className="space-y-6">
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
                        <TableCell className="max-w-[380px]">
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
                    <div className="w-40 shrink-0 truncate text-sm">
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
