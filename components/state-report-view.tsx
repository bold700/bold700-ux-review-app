"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, TrendingDown } from "lucide-react"

import { loadStateReport, type StateReport } from "@/lib/state-report"
import { scoreTone } from "@/lib/score"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const toneText: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

function toneBar(s: number): string {
  const t = scoreTone(s)
  return t === "good"
    ? "bg-emerald-500"
    : t === "ok"
      ? "bg-amber-500"
      : "bg-red-500"
}

export function StateReportView() {
  const [report, setReport] = useState<StateReport | null | undefined>(undefined)

  useEffect(() => {
    loadStateReport().then((r) => setReport(r))
  }, [])

  if (report === undefined) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 px-5 py-16">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    )
  }

  if (report === null) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <BrandLogo className="mx-auto mb-6 h-8 w-auto" />
        <h1 className="text-2xl font-semibold">
          Dit onderzoek komt eraan
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          We zijn nog volop websites aan het bekijken. Zodra we genoeg data
          hebben, verschijnen de resultaten hier.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Doe de gratis check</Link>
        </Button>
      </div>
    )
  }

  const date = new Date(report.generatedAt).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const dist = report.distribution
  const distTotal = dist.good + dist.ok + dist.bad || 1
  const worst = report.branches.length
    ? report.branches[report.branches.length - 1]
    : null

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
        {/* Kop */}
        <header className="mb-10">
          <BrandLogo className="mb-8 h-7 w-auto" />
          <p className="text-sm font-medium text-primary">
            Onderzoek onder {report.siteCount} Nederlandse MKB-websites
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hoe goed zijn websites van Nederlandse ondernemers?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We bekeken {report.siteCount} websites en gaven ze een rapportcijfer
            voor hoe goed ze bezoekers helpen. Dit kwam eruit.
          </p>
        </header>

        {/* Cijfer + verdeling */}
        <section className="mb-10 rounded-2xl border bg-muted/30 p-6">
          <div className="flex items-end gap-4">
            <div
              className={cn(
                "text-6xl font-bold tabular-nums",
                report.avgScore != null
                  ? toneText[scoreTone(report.avgScore)]
                  : "text-muted-foreground",
              )}
            >
              {report.avgScore != null ? report.avgScore.toFixed(1) : "—"}
            </div>
            <div className="pb-2 text-sm text-muted-foreground">
              gemiddeld rapportcijfer
              <br />
              (op een schaal van 10)
            </div>
          </div>

          <div className="mt-6">
            <div className="flex h-3 overflow-hidden rounded-full bg-muted">
              {(["good", "ok", "bad"] as const).map((k) => {
                const n = dist[k]
                const pct = (n / distTotal) * 100
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
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <Legend cls="bg-emerald-500" label="goed" n={dist.good} />
              <Legend cls="bg-amber-500" label="kan beter" n={dist.ok} />
              <Legend cls="bg-red-500" label="zwak" n={dist.bad} />
            </div>
          </div>
        </section>

        {/* Intro / samenvatting */}
        {report.intro && (
          <p className="mb-10 text-lg leading-relaxed">{report.intro}</p>
        )}

        {/* Wat gaat er het vaakst mis */}
        {report.problems.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-1 text-xl font-semibold">
              Wat gaat er het vaakst mis?
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              De dingen die we op de meeste websites tegenkwamen.
            </p>
            <ol className="space-y-3">
              {report.problems.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border p-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{p.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Speelt bij{" "}
                      <span className="font-semibold text-foreground">
                        {p.sharePct}%
                      </span>{" "}
                      van de bekeken websites.
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-red-500/70"
                        style={{ width: `${p.sharePct}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Per sector */}
        {report.branches.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-1 text-xl font-semibold">
              Welke sectoren doen het goed?
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Gemiddeld rapportcijfer per soort bedrijf. Van hoog naar laag.
            </p>
            <div className="space-y-2">
              {report.branches.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <div className="w-32 shrink-0 truncate text-sm sm:w-44">
                    {b.label}
                  </div>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", toneBar(b.avgScore))}
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
                </div>
              ))}
            </div>
            {worst && (
              <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                <TrendingDown className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Vooral <span className="font-medium text-foreground">
                    {worst.label.toLowerCase()}
                  </span>{" "}
                  laat nog de meeste kansen liggen.
                </span>
              </p>
            )}
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl border bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-semibold">
            Benieuwd hoe jouw website scoort?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Doe de gratis check. Je krijgt een helder rapportcijfer en concrete
            tips om je website te verbeteren.
          </p>
          <Button asChild size="lg" className="mt-5">
            <Link href="/">
              Gratis check aanvragen <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </section>

        <footer className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          Op basis van {report.siteCount} bekeken websites. Laatst bijgewerkt op{" "}
          {date}. Onderzoek door BOLD700.
        </footer>
      </div>
    </div>
  )
}

function Legend({ cls, label, n }: { cls: string; label: string; n: number }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("h-2 w-2 rounded-full", cls)} />
      {label} <span className="font-medium text-foreground">{n}</span>
    </span>
  )
}
