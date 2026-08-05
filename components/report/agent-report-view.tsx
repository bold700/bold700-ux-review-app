"use client"

import { useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDashed,
  Lightbulb,
  Loader2,
  MinusCircle,
  ShieldCheck,
  XCircle,
} from "lucide-react"

import type { Project, ScanFinding, TeamLogEntry } from "@/lib/types"
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

// AI-analyseteam: elke rol heeft een naam, zodat de samenwerking van
// verschillende expertises zichtbaar is. Bewust gelabeld als AI (geen suggestie
// van menselijke reviewers); de menselijke controle is de BOLD700-specialist.
const TEAM: { name: string; role: string; foto?: string }[] = [
  { name: "Teun", role: "Performance-analist", foto: "/team/teun.jpg" },
  { name: "Bram", role: "Business-analist", foto: "/team/bram.jpg" },
  { name: "Sofie", role: "UX-designer", foto: "/team/sofie.jpg" },
  { name: "Ruben", role: "SEO-specialist", foto: "/team/ruben.jpg" },
  { name: "Nora", role: "Conversie-specialist", foto: "/team/nora.jpg" },
  { name: "Timo", role: "Toegankelijkheidsexpert", foto: "/team/timo.jpg" },
  { name: "Ans", role: "User researcher", foto: "/team/ans.jpg" },
  { name: "Vera", role: "Kwaliteitsexpert", foto: "/team/vera.jpg" },
  { name: "Stef", role: "Strateeg", foto: "/team/stef.jpg" },
  { name: "Lot", role: "Copywriter", foto: "/team/lot.jpg" },
  { name: "Kenny", role: "Team lead", foto: "/team/kenny.jpg" },
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

// Kort, geruststellend oordeel op basis van de score.
function verdictLine(score: number | null, n: number): string {
  if (score != null && score >= 7.5)
    return "Je website staat er goed voor. Met een paar aanpassingen haal je er nog meer klanten uit."
  if (n === 0)
    return "Je website staat er op de belangrijkste punten goed voor."
  if (score != null && score < 5)
    return "Je website laat op dit moment klanten liggen. Het goede nieuws: er valt flink wat te winnen."
  return "Je website doet het redelijk, maar laat nog klanten liggen. Hieronder zie je waar de winst zit."
}

// Samenvatting in gewone taal: gebruik die van de Worker als die er is,
// anders bouwen we er zelf een uit de score en de belangrijkste punten.
function buildSamenvatting(
  project: Project,
  findings: ScanFinding[],
): string {
  if (project.samenvatting && project.samenvatting.trim())
    return project.samenvatting.trim()

  const score = project.score ?? null
  const top = findings.slice(0, 3)
  const themes = top
    .map((f) => deJargon(f.titel || f.issue || "").toLowerCase())
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
  if (top.length > 0) {
    parts.push(
      `We zien ${findings.length} ${
        findings.length === 1 ? "punt" : "punten"
      } om te verbeteren. De grootste kansen zitten ${
        themes.length ? "in " + listNL(themes) : "hieronder"
      }.`,
    )
  }
  parts.push("Pak je de punten hieronder op, dan haal je meer uit dezelfde bezoekers.")
  return parts.join(" ")
}

// "a, b en c"
function listNL(items: string[]): string {
  const a = items.slice(0, 3)
  if (a.length <= 1) return a[0] ?? ""
  return a.slice(0, -1).join(", ") + " en " + a[a.length - 1]
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
            {(f.watWeZagen || f.bewijs) && (
              <p>
                <span className="font-medium text-foreground">
                  Wat er speelt:{" "}
                </span>
                <span className="text-muted-foreground">
                  {deJargon(f.watWeZagen || f.bewijs)}
                </span>
              </p>
            )}
            {f.waaromKost && (
              <p className="rounded-md bg-amber-500/10 px-2.5 py-1.5 text-amber-700 dark:text-amber-300">
                <span className="font-semibold">Waarom dit belangrijk is: </span>
                {deJargon(f.waaromKost)}
              </p>
            )}
            {(f.watJeDoet || f.aanbeveling) && (
              <p className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-emerald-700 dark:text-emerald-300">
                <span className="font-semibold">Wat je kunt doen: </span>
                {deJargon(f.watJeDoet || f.aanbeveling)}
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

// Live team-voortgang tijdens de scan: wie klaar is (vinkje), wie bezig is
// (pulserende ring) en wie nog wacht (gedimd).
function ScanProgress({ log }: { log: TeamLogEntry[] }) {
  const done = new Set<string>()
  for (const e of log) {
    const n = ROLE_NAME[e.stap]
    if (n && e.status !== "fout" && e.status !== "bezig") done.add(n)
  }
  const workers = TEAM.filter((m) => m.name !== "Kenny")
  const activeName = workers.find((m) => !done.has(m.name))?.name ?? null

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {TEAM.map((m) => {
          const isDone = done.has(m.name)
          const isActive = m.name === activeName
          return (
            <div
              key={m.name}
              className="flex flex-col items-center gap-1 text-center"
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.foto}
                  alt={m.name}
                  className={cn(
                    "h-12 w-12 rounded-full object-cover transition-all duration-300",
                    isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                    !isDone && !isActive && "opacity-40 grayscale",
                  )}
                />
                {isDone && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-background">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-primary ring-2 ring-background motion-safe:animate-pulse" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] leading-tight",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {m.name}
              </span>
            </div>
          )
        })}
      </div>
      {activeName && (
        <p className="text-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{activeName}</span> is
          bezig…
        </p>
      )}
    </div>
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
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Loader2 className="h-4 w-4 animate-spin text-primary" /> We zijn je
          website aan het bekijken…
        </div>
        <ScanProgress log={log} />
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

  return <AgentReport project={project} findings={findings} />
}

function AgentReport({
  project,
  findings,
}: {
  project: Project
  findings: ScanFinding[]
}) {
  const [restOpen, setRestOpen] = useState(false)
  const score = project.score ?? null
  const tone = scoreTone(score)
  const toneLabel: Record<string, string> = {
    good: "Sterk",
    ok: "Redelijk",
    bad: "Kan beter",
    na: "",
  }
  const top = findings.slice(0, 3)
  const rest = findings.slice(3)
  const samenvatting = buildSamenvatting(project, findings)
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
          {project.name || project.url}
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
          {verdictLine(score, findings.length)}
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
              <FindingCard key={i} f={f} rankNum={i + 1} open={i === 0} />
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
              className={cn("h-4 w-4 transition-transform", restOpen && "rotate-180")}
            />
          </button>
          {restOpen &&
            rest.map((f, i) => (
              <FindingCard key={i} f={f} rankNum={top.length + i + 1} />
            ))}
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
        <button
          onClick={() =>
            document
              .querySelector("section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Terug naar boven <ArrowRight className="h-3.5 w-3.5 -rotate-90" />
        </button>
      </section>
    </div>
  )
}
