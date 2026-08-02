"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Check,
  ChevronDown,
  CircleDashed,
  Info,
  Loader2,
  MinusCircle,
  TrendingUp,
  XCircle,
} from "lucide-react"

import type {
  Project,
  ScanFinding,
  ScanMeasurement,
  TeamLogEntry,
} from "@/lib/types"
import { scoreTone } from "@/lib/score"
import { deJargon } from "@/lib/de-jargon"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const toneText: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}
const dot: Record<string, string> = {
  good: "bg-emerald-500",
  ok: "bg-amber-500",
  bad: "bg-red-500",
  nvt: "bg-muted-foreground",
}
const rank: Record<string, number> = { good: 3, ok: 2, bad: 1 }

// AI-analyseteam: elke rol heeft een naam, zodat de samenwerking van
// verschillende expertises zichtbaar is. Bewust gelabeld als AI (geen suggestie
// van menselijke reviewers); de menselijke controle is de BOLD700-specialist.
const TEAM: { name: string; role: string }[] = [
  { name: "Teun", role: "Performance-analist" },
  { name: "Bram", role: "Business-analist" },
  { name: "Sofie", role: "UX-designer" },
  { name: "Ruben", role: "SEO-specialist" },
  { name: "Nora", role: "Conversie-specialist" },
  { name: "Timo", role: "Toegankelijkheidsexpert" },
  { name: "Ans", role: "User researcher" },
  { name: "Vera", role: "Kwaliteitsexpert" },
  { name: "Stef", role: "Strateeg" },
  { name: "Lot", role: "Copywriter" },
  { name: "Kenny", role: "Team lead" },
]
// Koppelt de teamLog-stap (rol) aan de naam.
const ROLE_NAME: Record<string, string> = {
  "Site-analyse": "Teun",
  Snelheidsmeting: "Teun",
  Metingen: "Teun",
  Bedrijfsprofiel: "Bram",
  "UX-analyse": "Sofie",
  "SEO & content": "Ruben",
  Conversie: "Nora",
  Toegankelijkheid: "Timo",
  "Doelgroep-blik": "Ans",
  Kwaliteitscontrole: "Vera",
  Prioritering: "Stef",
  "Rapport-tekst": "Lot",
}

// Waar de "laat valideren / plan gesprek"-CTA's heen gaan (aanvraag expert-
// review als extra dienst). TODO: vervangen door de echte productpagina-URL.
const EXPERT_URL = "/"

function verdictLine(doel: string | undefined, n: number): string {
  if (n === 0) return "Je website staat er op de belangrijkste punten goed voor."
  const d = doel ? doel.toLowerCase() : "klanten"
  return `Je loopt waarschijnlijk ${d} mis door ${Math.min(n, 3)} dingen. Hieronder leggen we ze uit.`
}

/** Ontdubbelt metingen per label; het slechtste oordeel wint. */
function dedupeMeasurements(ms: ScanMeasurement[]): ScanMeasurement[] {
  const by = new Map<string, ScanMeasurement>()
  for (const m of ms) {
    const cur = by.get(m.label)
    if (!cur || (rank[m.score] ?? 9) < (rank[cur.score] ?? 9)) by.set(m.label, m)
  }
  return [...by.values()]
}

function FindingLabel({ f }: { f: ScanFinding }) {
  const validate = f.confidence === "low" || f.nietGevalideerd
  return (
    <span className="inline-flex items-center gap-1.5">
      <Badge
        variant="outline"
        className="gap-1 text-[10px] text-muted-foreground"
      >
        AI-analyse
      </Badge>
      {validate && (
        <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
          te valideren
        </span>
      )}
    </span>
  )
}

function FindingCard({
  f,
  rankNum,
  open: openInit,
}: {
  f: ScanFinding
  rankNum: number
  open?: boolean
}) {
  const [open, setOpen] = useState(!!openInit)
  const titel = deJargon(f.titel || f.issue || "Verbeterpunt")
  return (
    <Card>
      <CardContent className="py-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start gap-3 text-left"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            {rankNum}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{titel}</span>
              <FindingLabel f={f} />
            </span>
          </span>
          <ChevronDown
            className={cn(
              "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open && (
          <div className="mt-3 space-y-2 pl-9 text-sm">
            {(f.watWeZagen || f.bewijs) && (
              <p>
                <span className="font-medium text-foreground">
                  Wat we zagen:{" "}
                </span>
                <span className="text-muted-foreground">
                  {deJargon(f.watWeZagen || f.bewijs)}
                </span>
              </p>
            )}
            {f.waaromKost && (
              <p className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-emerald-700 dark:text-emerald-300">
                <span className="font-semibold">Waarom dit klanten kost: </span>
                {deJargon(f.waaromKost)}
              </p>
            )}
            {(f.watJeDoet || f.aanbeveling) && (
              <p>
                <span className="font-medium text-foreground">Wat je doet: </span>
                <span className="text-muted-foreground">
                  {deJargon(f.watJeDoet || f.aanbeveling)}
                </span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const statusIcon: Record<string, React.ReactNode> = {
  klaar: <Check className="h-4 w-4 text-emerald-500" />,
  bezig: <Loader2 className="h-4 w-4 animate-spin text-primary" />,
  overgeslagen: <MinusCircle className="h-4 w-4 text-muted-foreground" />,
  fout: <XCircle className="h-4 w-4 text-red-500" />,
}

function TeamLog({ log }: { log: TeamLogEntry[] }) {
  return (
    <ul className="space-y-1.5 text-sm">
      {log.map((s, i) => (
        <li key={i} className="flex items-start gap-2">
          {statusIcon[s.status] ?? <CircleDashed className="h-4 w-4" />}
          <span className="min-w-0">
            <span className="font-medium">
              {ROLE_NAME[s.stap] ? `${ROLE_NAME[s.stap]} · ${s.stap}` : s.stap}
            </span>
            {s.samenvatting ? (
              <span className="text-muted-foreground"> — {s.samenvatting}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function AgentReportView({ project }: { project: Project }) {
  const findings = (project.findings ?? []).filter(
    (f) => f.titel || f.issue,
  )
  const log = project.teamLog ?? []
  const scanning = findings.length === 0 && log.length > 0

  // Nog bezig: toon het team live.
  if (scanning) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Loader2 className="h-4 w-4 animate-spin text-primary" /> We zijn je
          website aan het bekijken…
        </div>
        <Card>
          <CardContent className="py-4">
            <TeamLog log={log} />
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground">
          Dit venster ververst automatisch. Je krijgt het volledige rapport ook
          per e-mail.
        </p>
      </div>
    )
  }

  return (
    <AgentReport
      project={project}
      findings={findings}
      measurements={dedupeMeasurements(project.measurements ?? [])}
      log={log}
    />
  )
}

function AgentReport({
  project,
  findings,
  measurements,
  log,
}: {
  project: Project
  findings: ScanFinding[]
  measurements: ScanMeasurement[]
  log: TeamLogEntry[]
}) {
  const [restOpen, setRestOpen] = useState(false)
  const [bijlageOpen, setBijlageOpen] = useState(false)
  const score = project.score ?? null
  const tone = scoreTone(score)
  const briefing = project.briefing
  const top = findings.slice(0, 3)
  const rest = findings.slice(3)
  const date = new Date(
    project.createdAt ?? Date.now(),
  ).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      {/* Krantenkop */}
      <div className="border-b pb-4">
        <div className="text-xs tracking-wide text-muted-foreground uppercase">
          Website-check
        </div>
        <h1 className="truncate text-2xl font-semibold">
          {project.name || project.url}
        </h1>
        <div className="mt-1 truncate text-sm text-muted-foreground">
          {project.url} · {date}
        </div>
      </div>

      <div className="flex items-start gap-4 rounded-2xl border bg-muted/30 p-5">
        {score != null && (
          <div className="shrink-0 text-center">
            <div className={cn("text-4xl font-bold", toneText[tone])}>
              {score.toFixed(1)}
            </div>
            <div className="text-[11px] tracking-wide text-muted-foreground uppercase">
              / 10
            </div>
          </div>
        )}
        <p className="text-sm">{verdictLine(briefing?.doel, findings.length)}</p>
      </div>

      {/* Wat we over je bedrijf zagen (aanname) */}
      {briefing && (briefing.branche || briefing.aanbod || briefing.doel) && (
        <div className="rounded-xl border bg-background p-4">
          <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
            Wat we over je bedrijf zagen
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              aanname
            </Badge>
          </div>
          <ul className="space-y-0.5 text-sm text-muted-foreground">
            {briefing.branche && <li>Branche: {briefing.branche}</li>}
            {briefing.aanbod && <li>Aanbod: {briefing.aanbod}</li>}
            {briefing.doelgroep && <li>Doelgroep: {briefing.doelgroep}</li>}
            {briefing.doel && <li>Belangrijkste doel: {briefing.doel}</li>}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Klopt dit niet? Zeg het in het gesprek, dan wordt de review scherper.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      {findings.length > 0 && (
        <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p>
            De metingen zijn feiten. De{" "}
            <span className="font-medium text-foreground">AI-analyses</span> zijn
            onderbouwde hypotheses, geen zekerheden.{" "}
            <a
              href={EXPERT_URL}
              className="font-medium text-primary hover:underline"
            >
              Laat een specialist ze valideren →
            </a>
          </p>
        </div>
      )}

      {/* Top-3 */}
      {top.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">De 3 grootste kansen</h2>
          </div>
          {top.map((f, i) => (
            <FindingCard key={i} f={f} rankNum={i + 1} open={i === 0} />
          ))}
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
              className={cn("h-4 w-4 transition-transform", restOpen && "rotate-180")}
            />
          </button>
          {restOpen &&
            rest.map((f, i) => (
              <FindingCard key={i} f={f} rankNum={top.length + i + 1} />
            ))}
        </section>
      )}

      {/* Bijlage: metingen */}
      {measurements.length > 0 && (
        <section className="space-y-2">
          <button
            onClick={() => setBijlageOpen((o) => !o)}
            className="flex items-center gap-1 text-sm font-medium text-primary"
          >
            {bijlageOpen ? "Verberg" : "Bijlage voor je websitebouwer"} (
            {measurements.length} metingen)
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", bijlageOpen && "rotate-180")}
            />
          </button>
          {bijlageOpen && (
            <Card>
              <CardContent className="space-y-1.5 py-3">
                {measurements.map((m, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        dot[m.score],
                      )}
                    />
                    <span>
                      <span className="font-medium">{m.label}: </span>
                      <span className="text-muted-foreground">
                        {deJargon(m.note)}
                      </span>
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </section>
      )}

      {/* Hoe deze review is gemaakt */}
      <section className="rounded-xl border bg-muted/20 p-4">
        <h2 className="mb-2 text-sm font-semibold">Hoe deze review is gemaakt</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Dit rapport is opgesteld door ons <span className="font-medium text-foreground">AI-analyseteam</span>:
          gespecialiseerde AI-analyses met elk een eigen focus, gecombineerd met{" "}
          {measurements.length} echte metingen.
          {typeof project.geschrapt === "number" && project.geschrapt > 0
            ? ` De kwaliteitscontrole schrapte ${project.geschrapt} bevindingen die het bewijs niet doorstonden.`
            : ""}{" "}
          Een <span className="font-medium text-foreground">specialist van BOLD700</span> controleert het geheel voordat je het gesprek in gaat.
        </p>

        {/* Team-overzicht: namen + rollen (AI-team) */}
        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="flex items-center gap-2 rounded-lg border bg-background px-2.5 py-1.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {m.name.slice(0, 1)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {m.name}
                </span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {m.role}
                </span>
              </span>
            </div>
          ))}
        </div>

        {log.length > 0 && <TeamLog log={log} />}
      </section>

      {/* CTA */}
      <section className="rounded-2xl border bg-primary/5 p-6 text-center">
        <h2 className="text-xl font-semibold">
          Wil je weten wat je het eerst moet aanpakken?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Een specialist neemt het rapport met je door, valideert de analyses en
          geeft je de volgorde die het meeste oplevert.
        </p>
        <Button asChild size="lg" className="mt-5">
          <Link href={EXPERT_URL}>Plan een gesprek →</Link>
        </Button>
      </section>
    </div>
  )
}
