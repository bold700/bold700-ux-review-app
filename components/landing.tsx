"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, BarChart3, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

import type { Project } from "@/lib/types"
import type { ReportData } from "@/lib/report"
import { drawScorecard } from "@/lib/scorecard-image"
import { createLead, requestWorkerScan, runLeadScan } from "@/lib/leads"
import { loadBenchmark, type Benchmark } from "@/lib/insights"
import { BRANCHES } from "@/lib/branche"
import { ensureProtocol } from "@/lib/url"
import { BrandLogo } from "@/components/brand-logo"
import { ScorecardDeck } from "@/components/scorecard-deck"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function scrollToSignup() {
  document
    .getElementById("aanmelden")
    ?.scrollIntoView({ behavior: "smooth", block: "center" })
}

const BLUE = "#1728C8"

function sample(
  name: string,
  url: string,
  score: number,
  issues: number,
  quickWins: number,
  strengths: number,
): { project: Project; data: ReportData } {
  const fill = (n: number) =>
    Array.from({ length: n }, (_, i) => ({
      id: String(i),
      category: "",
      question: "",
      score: "ok" as const,
      notes: "",
      images: [],
    }))
  return {
    project: { id: name, name, url, createdAt: new Date().toISOString() },
    data: {
      score,
      totalQuestions: issues + strengths,
      counts: { total: 0, bad: 0, ok: 0, good: 0, nvt: 0, quickWins },
      issues: fill(issues),
      strengths: fill(strengths),
    },
  }
}

const SAMPLES = [
  sample("Vanaspersonaltraining.nl", "vanaspersonaltraining.nl", 8.5, 4, 0, 9),
  sample("Kennytimmer.nl", "kennytimmer.nl", 6.4, 8, 3, 5),
  sample("Cvhreiniging.nl", "cvhreiniging.nl", 7.2, 5, 2, 7),
]

export function Landing({ onLogin }: { onLogin: () => void }) {
  const [cards, setCards] = useState<string[]>([])

  useEffect(() => {
    try {
      setCards(SAMPLES.map((s) => drawScorecard(s.project, s.data)))
    } catch {
      setCards([])
    }
  }, [])

  return (
    <div className="flex min-h-svh flex-col bg-gradient-to-b from-[#1c2ee0] via-[#1728C8] to-[#101d94] text-white">
      {/* Topbar */}
      <header className="mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between px-5 pb-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
        <div className="rise">
          <BrandLogo fill="#ffffff" className="h-7 w-auto" />
        </div>
        <button
          onClick={onLogin}
          className="rise text-sm text-white/80 transition-colors hover:text-white"
        >
          Inloggen
        </button>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-10 lg:min-h-0 lg:justify-center lg:pb-4">
        {/* Badge */}
        <div
          className="rise order-1 mx-auto mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-3 py-1 text-xs text-white/85 sm:mt-6"
          style={{ animationDelay: "80ms" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Gratis check voor je website
        </div>

        {/* Scorecard-stapel — mobiel boven de hero */}
        <div
          className="rise order-2 mt-7 sm:hidden"
          style={{ animationDelay: "320ms" }}
        >
          <ScorecardDeck images={cards} />
        </div>

        {/* Hero */}
        <div
          className="rise order-3 mt-8 text-center sm:order-3 lg:mt-6"
          style={{ animationDelay: "160ms" }}
        >
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Weet binnen 24 uur wat er beter kan aan je website
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Een snelle check geeft je een helder rapportcijfer en concrete tips
            om je website te verbeteren. Een specialist met enterprise-ervaring
            kijkt het na. Geen vragenlijsten, geen gedoe.
          </p>
        </div>

        {/* Formulier */}
        <div
          id="aanmelden"
          className="rise order-4 scroll-mt-24 sm:order-4"
          style={{ animationDelay: "240ms" }}
        >
          <SignupForm />
        </div>

        {/* Scorecard-rij — alleen desktop, boven de hero */}
        <div
          className="rise order-5 mt-8 hidden sm:order-2 sm:block lg:mt-6"
          style={{ animationDelay: "320ms" }}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {(cards.length ? cards : [null, null, null]).map((src, i) => (
              <div
                key={i}
                className="mx-auto overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1"
              >
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt="Voorbeeld scorecard"
                    className="w-full lg:max-h-[38vh] lg:w-auto lg:object-contain"
                  />
                ) : (
                  <div className="aspect-[4/5] animate-pulse bg-white/10" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-white/80">
            Voorbeelden van het rapport dat je ontvangt.
          </p>
        </div>
      </main>

      <WhatYouGet />
      <BenchmarkBlock />
      <RealCompany />
      <TeamFlow />
      <SocialProof />
      <SecondCta />
      <Faq />
      <SiteFooter />
      <StickyCta />
    </div>
  )
}

// ── Dit krijg je: verteld door het teamlid dat het levert (foto + bubbel) ───
const DELIVERABLES: {
  naam: string
  rol: string
  foto: string
  tekst: string
}[] = [
  {
    naam: "Teun",
    rol: "Performance-analist",
    foto: "/team/teun.jpg",
    tekst:
      "Ik meet je laadtijd en techniek met echte data (Core Web Vitals). Geen giswerk, gewoon de cijfers.",
  },
  {
    naam: "Ruben",
    rol: "SEO-specialist",
    foto: "/team/ruben.jpg",
    tekst:
      "Ik kijk of je goed vindbaar bent in Google en of je boodschap meteen duidelijk is.",
  },
  {
    naam: "Nora",
    rol: "Conversie-specialist",
    foto: "/team/nora.jpg",
    tekst:
      "Ik zoek uit waar bezoekers afhaken bij de knop, en wat ze wél over de streep trekt.",
  },
  {
    naam: "Timo",
    rol: "Toegankelijkheidsexpert",
    foto: "/team/timo.jpg",
    tekst:
      "Ik check of iedereen je site kan gebruiken, ook op een klein scherm of met een beperking.",
  },
  {
    naam: "Stef",
    rol: "Strateeg",
    foto: "/team/stef.jpg",
    tekst:
      "Ik zet alles op volgorde: je rapportcijfer plus de top 3 die het meeste oplevert.",
  },
  {
    naam: "Lot",
    rol: "Copywriter",
    foto: "/team/lot.jpg",
    tekst:
      "Ik schrijf het rapport in gewone taal: wat we zagen, waarom het klanten kost, en wat je doet.",
  },
]

function WhatYouGet() {
  return (
    <Reveal as="section" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-sm font-semibold text-white/85">
            Wat je terugkrijgt
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Geen los cijfer, maar een compleet beeld
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/85">
            Elk teamlid levert zijn stukje aan, binnen 24 uur in je inbox.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d) => (
            <div
              key={d.naam}
              className="group relative overflow-hidden rounded-3xl ring-1 ring-white/15"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.foto}
                alt={d.naam}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
              />
              {/* Donker verloop onderaan voor leesbaarheid van de bubbel */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              {/* Spraakbubbel op de afbeelding */}
              <div className="absolute inset-x-3.5 bottom-3.5">
                <div className="relative rounded-2xl rounded-bl-sm bg-white p-4 text-[#1728C8] shadow-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">{d.naam}</span>
                    <span className="rounded-full bg-[#1728C8]/10 px-1.5 py-0.5 text-[10px] font-medium">
                      {d.rol}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-[#1728C8]/85">
                    {d.tekst}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

// ── Branche-benchmark: live uit onze eigen data (benchmarks/global) ────────
const BRANCHE_LABEL: Record<string, string> = Object.fromEntries(
  BRANCHES.map((b) => [b.slug, b.label]),
)

function BenchmarkBlock() {
  const [bench, setBench] = useState<Benchmark | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    loadBenchmark()
      .then(setBench)
      .finally(() => setLoaded(true))
  }, [])

  const rows = Object.entries(bench?.branches ?? {})
    .filter(([, v]) => v.n >= 3 && v.avg != null)
    .sort((a, b) => b[1].n - a[1].n)
    .slice(0, 6)
    .map(([slug, v]) => ({
      label: BRANCHE_LABEL[slug] ?? slug,
      avg: v.avg,
      n: v.n,
    }))

  const hasData = loaded && (bench?.siteCount ?? 0) > 0
  const siteCount = bench?.siteCount ?? 0
  const avg = bench?.avgScore

  return (
    <Reveal as="section" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-sm font-semibold text-white/85">
            Wat niemand anders je kan vertellen
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Je score, afgezet tegen je eigen branche
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/85">
            {hasData ? (
              <>
                We hebben al{" "}
                <span className="font-semibold text-white">{siteCount}</span>{" "}
                websites doorgelicht
                {avg != null && (
                  <>
                    {" "}
                    (gemiddeld cijfer{" "}
                    <span className="font-semibold text-white">
                      {avg.toFixed(1)}
                    </span>
                    )
                  </>
                )}
                . Zo weet je niet alleen je cijfer, maar ook of je voor- of
                achterloopt op je concurrenten.
              </>
            ) : (
              <>
                Elke review die we doen maakt onze benchmark scherper. Zo weet je
                niet alleen je cijfer, maar ook of je voor- of achterloopt op je
                concurrenten.
              </>
            )}
          </p>
        </div>

        {rows.length > 0 && (
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white/[0.05] p-6 ring-1 ring-inset ring-white/10">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <BarChart3 className="h-4 w-4" /> Gemiddeld cijfer per branche
            </div>
            <div className="mt-5 space-y-3">
              {rows.map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="w-40 shrink-0 truncate text-sm text-white/80">
                    {r.label}
                  </span>
                  <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-[#ff5003]"
                      style={{ width: `${Math.max(4, (r.avg / 10) * 100)}%` }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums">
                    {r.avg.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/85">
              Live uit onze eigen reviews, wordt bijgewerkt bij elke nieuwe
              check.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/rapport"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Bekijk het volledige onderzoek <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

// ── Echt bedrijf: eerlijk over hoe we werken ───────────────────────────────
function RealCompany() {
  const points = [
    {
      titel: "Een echt bedrijf",
      tekst:
        "BOLD700 is een echt bedrijf, gerund door Kenny Timmer. Je hebt een vast aanspreekpunt, geen anoniem platform.",
    },
    {
      titel: "Mensen én techniek",
      tekst:
        "We werken met externe specialisten (freelancers) en laten het speurwerk ondersteunen door AI-agents. Zo gaat het snel én blijft het scherp.",
    },
    {
      titel: "Altijd een mens die nakijkt",
      tekst:
        "Elk punt wordt naast het bewijs op je site gelegd en Kenny neemt de eindbeslissing voordat jij het ziet.",
    },
  ]
  return (
    <Reveal as="section" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-sm font-semibold text-white/85">
            Hoe we werken
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Geen zwarte doos, geen AI-praatje
          </h2>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {points.map((p, i) => (
            <div key={p.titel}>
              <span className="text-3xl font-semibold tabular-nums text-[#ff5003]">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {p.titel}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                {p.tekst}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

// ── Social proof + gezicht (placeholders tot echte input) ──────────────────
const QUOTES: { tekst: string; naam: string; bedrijf: string }[] = [
  {
    tekst:
      "Binnen een dag wist ik precies wat er beter kon. Concreet en zonder wollig verhaal.",
    naam: "Voorbeeldklant",
    bedrijf: "Installatiebedrijf",
  },
  {
    tekst:
      "Eindelijk feedback in gewone taal. We hebben de top 3 meteen doorgevoerd.",
    naam: "Voorbeeldklant",
    bedrijf: "Webshop",
  },
]

function SocialProof() {
  return (
    <Reveal as="section" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Kenny, het gezicht (open, geen kader) */}
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/team/kenny.jpg"
            alt="Kenny Timmer"
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-[#ff5003]"
          />
          <div>
            <p className="text-xl font-semibold tracking-tight">Kenny Timmer</p>
            <p className="text-sm text-white/80">Oprichter BOLD700</p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/90">
              Ik neem elke review persoonlijk met je door. Geen verkooppraatje,
              gewoon eerlijk advies over wat je website oplevert en wat beter
              kan.
            </p>
          </div>
        </div>

        {/* Quotes (placeholder) */}
        <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {QUOTES.map((q, i) => (
            <figure key={i} className="relative">
              <span
                aria-hidden
                className="font-serif text-5xl leading-none text-[#ff5003]"
              >
                “
              </span>
              <blockquote className="mt-1 text-lg font-medium leading-relaxed tracking-tight text-white/90">
                {q.tekst}
              </blockquote>
              <figcaption className="mt-3 text-sm text-white/80">
                {q.naam} · {q.bedrijf}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

// ── Tweede CTA na de chat, precies waar iemand overtuigd is ────────────────
function SecondCta() {
  return (
    <Reveal as="section" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Klaar om te weten wat je website{" "}
          <span className="text-[#ff5003]">oplevert</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/90">
          Meld je website aan en ontvang je rapportcijfer met concrete tips
          binnen 24 uur.
        </p>
        <Button
          onClick={scrollToSignup}
          size="lg"
          className="mt-8 bg-[#ff5003] text-white hover:bg-[#ff5003]/90"
        >
          Doe de gratis check <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-sm text-white/80">
          {["Echt gratis", "Binnen 24 uur", "Geen verplichtingen"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5" /> {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

// ── Korte FAQ: laatste twijfels weg ────────────────────────────────────────
const FAQS: { q: string; a: string }[] = [
  {
    q: "Is het echt gratis?",
    a: "Ja. De snelle check en het rapport kosten je niks. Bevalt het en wil je dat we samen aan de slag gaan, dan bespreken we dat pas daarna.",
  },
  {
    q: "Wat gebeurt er na de scan?",
    a: "Je krijgt je rapportcijfer en tips per e-mail. Kenny neemt daarna persoonlijk contact op om de belangrijkste punten door te nemen. Hoor je niks, dan bellen we je binnen een paar dagen zelf.",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Meestal heb je je rapport binnen 24 uur. Geen vragenlijsten, je hoeft alleen je website-URL door te geven.",
  },
  {
    q: "Wat doen jullie met mijn gegevens?",
    a: "We gebruiken je gegevens alleen voor deze check en het contact daarover. Niks meer, niks anders.",
  },
]

function Faq() {
  return (
    <Reveal as="section" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Veelgestelde vragen
        </h2>
        <div className="mt-10 border-t border-white/12">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group border-b border-white/12 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-lg font-medium tracking-tight">
                {f.q}
                <ArrowRight className="h-4 w-4 shrink-0 text-[#ff5003] transition-transform duration-200 group-open:rotate-90" />
              </summary>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/85">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

// ── Footer, verzorgd ───────────────────────────────────────────────────────
function SiteFooter() {
  return (
    <footer className="mt-4 border-t border-white/15 px-5 pb-[calc(env(safe-area-inset-bottom)+6rem)] pt-12 sm:pb-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <BrandLogo fill="#ffffff" className="h-7 w-auto" />
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Gratis UX-check voor ondernemers. Eerlijk advies over wat je
              website oplevert, gerund door Kenny Timmer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-semibold text-white/80">Bekijk</p>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <a href="/rapport" className="transition-colors hover:text-white">
                    Het onderzoek
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="transition-colors hover:text-white">
                    Privacyverklaring
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white/80">Contact</p>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <a
                    href="https://wa.me/31614802802"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@bold700.com"
                    className="transition-colors hover:text-white"
                  >
                    support@bold700.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} BOLD700</span>
          <span>uxreviews.bold700.com</span>
        </div>
      </div>
    </footer>
  )
}

// ── Sticky mobiele CTA: verschijnt na de hero ──────────────────────────────
function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-[#1728C8]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur transition-transform duration-300 sm:hidden " +
        (show ? "translate-y-0" : "translate-y-full")
      }
    >
      <Button
        onClick={scrollToSignup}
        style={{ color: BLUE }}
        className="w-full bg-white hover:bg-white/90"
      >
        Doe de gratis check <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  )
}

// Sectie die zachtjes inscrollt (zelfde patroon als de team-chat).
function Reveal({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "section" | "div"
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement>}
      className={
        className +
        " transition-all duration-700 ease-out motion-reduce:transition-none " +
        (shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")
      }
    >
      {children}
    </Tag>
  )
}

// Het team als chatgesprek: elke specialist geeft het werk door aan de
// volgende, links-rechts als een groepschat. Bewust als AI-team (geen suggestie
// van menselijke reviewers); de mens is de eindcontrole.
const TEAM_CHAT: {
  naam: string
  rol: string
  tekst: string
  mens?: boolean
  system?: boolean
  foto?: string // pad naar avatar-foto (in /public); anders initiaal
}[] = [
  { naam: "", rol: "", tekst: "Er is een nieuwe website-check binnen", system: true },
  { naam: "Teun", rol: "Performance-analist", foto: "/team/teun.jpg", tekst: "Ik pak 'm op! Ik doe eerst een goede meting: snelheid, techniek en toegankelijkheid. Even de harde cijfers erbij, geen giswerk. Zo terug." },
  { naam: "Bram", rol: "Business-analist", foto: "/team/bram.jpg", tekst: "Top, Teun. Ik lees me even in: wie zijn ze, wat verkopen ze en wat willen ze bereiken? Dan weet iedereen waar we het voor doen." },
  { naam: "Sofie", rol: "UX-designer", foto: "/team/sofie.jpg", tekst: "Ik duik in het gebruiksgemak. Vinden bezoekers makkelijk hun weg, of lopen ze ergens vast?" },
  { naam: "Ruben", rol: "SEO-specialist", foto: "/team/ruben.jpg", tekst: "Ik kijk naar de teksten en de vindbaarheid. Is de boodschap meteen helder, zonder moeilijke woorden?" },
  { naam: "Nora", rol: "Conversie-specialist", foto: "/team/nora.jpg", tekst: "Ik focus op de knoppen en het vertrouwen. Zou ik hier zelf die stap durven zetten?" },
  { naam: "Timo", rol: "Toegankelijkheidsexpert", foto: "/team/timo.jpg", tekst: "Ik check of iedereen mee kan komen: goed leesbaar en bruikbaar, ook met een beperking." },
  { naam: "Ans", rol: "User researcher", foto: "/team/ans.jpg", tekst: "Ik kijk als jullie bezoeker. Snap ik binnen 5 seconden wat dit is, en voel ik me op mijn gemak?" },
  { naam: "Vera", rol: "Kwaliteitsexpert", foto: "/team/vera.jpg", tekst: "Ik loop alles na en leg elk punt naast het bewijs op de site. Klopt iets niet? Dan haal ik het eruit." },
  { naam: "Stef", rol: "Strateeg", foto: "/team/stef.jpg", tekst: "Ik zet alles op een rij. Wat het meeste oplevert voor jullie doel, zet ik bovenaan." },
  { naam: "Lot", rol: "Copywriter", foto: "/team/lot.jpg", tekst: "En ik maak er gewone taal van: wat we zagen, waarom het klanten kost, en wat je eraan doet." },
  { naam: "Kenny", rol: "Team lead", foto: "/team/kenny.jpg", tekst: "Top, team! Ik pak het van hier over: ik neem contact op met de klant om de resultaten persoonlijk door te nemen." },
]

function TeamFlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)
  const [revealed, setRevealed] = useState(0)
  const [typing, setTyping] = useState(false)

  // Start pas als de sectie in beeld komt.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          obs.disconnect()
        }
      },
      // Pas vuren als de sectie echt in beeld staat (niet al bij de eerste
      // pixel onderin): de onderkant van de root 25% inkorten.
      { threshold: 0.25, rootMargin: "0px 0px -25% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Speel het als een echte chat af: typt-indicator → bubbel, één voor één.
  useEffect(() => {
    if (!shown) return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setRevealed(TEAM_CHAT.length)
      setTyping(false)
      return
    }
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    let i = 0
    const step = () => {
      if (cancelled) return
      if (i >= TEAM_CHAT.length) {
        setTyping(false)
        return
      }
      const item = TEAM_CHAT[i]
      if (item.system) {
        // Systeem-melding: geen "typt", meteen tonen.
        timer = setTimeout(() => {
          if (cancelled) return
          setRevealed(i + 1)
          i += 1
          timer = setTimeout(step, 550)
        }, 350)
        return
      }
      // Persoon: eerst "typt…", dan de bubbel, dan even leestijd.
      setTyping(true)
      timer = setTimeout(() => {
        if (cancelled) return
        setTyping(false)
        setRevealed(i + 1)
        i += 1
        timer = setTimeout(step, 750)
      }, 800)
    }
    step()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [shown])

  // Laat de pagina meescrollen met de nieuwste bubbel/typt-indicator, zodat de
  // chat in beeld blijft. block:"nearest" beweegt alleen als het anker onder de
  // rand zakt — geen schokkerig terugspringen naar boven.
  useEffect(() => {
    if (!shown) return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    endRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
    })
  }, [shown, revealed, typing])

  return (
    <section className="px-5 py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-3xl">
        <div
          className={
            "text-center transition-all duration-700 ease-out motion-reduce:transition-none " +
            (shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")
          }
        >
          <span className="text-sm font-semibold text-white/85">
            Zo komen we tot je resultaat
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Geen zwarte doos, maar een team
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/85">
            Een AI-analyseteam met elk een eigen expertise geeft het werk aan
            elkaar door. Een mens neemt de eindbeslissing.
          </p>
        </div>

        <div className="mt-10 min-h-[560px] space-y-3">
          {TEAM_CHAT.slice(0, revealed).map((s, i) =>
            s.system ? (
              <SystemRow key="sys" s={s} />
            ) : (
              <ChatRow key={s.naam} s={s} right={(i - 1) % 2 === 1} />
            ),
          )}
          {typing && revealed < TEAM_CHAT.length && (
            <TypingRow
              s={TEAM_CHAT[revealed]}
              right={(revealed - 1) % 2 === 1}
            />
          )}
          {/* Scroll-anker: houdt de nieuwste bubbel met wat lucht in beeld. */}
          <div ref={endRef} aria-hidden className="h-16" />
        </div>
      </div>
    </section>
  )
}

type ChatItem = (typeof TEAM_CHAT)[number]

function Avatar({ s }: { s: ChatItem }) {
  if (s.foto) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={s.foto}
        alt={s.naam}
        className={
          "h-10 w-10 shrink-0 rounded-full object-cover ring-2 " +
          (s.mens ? "ring-[#ff5003]" : "ring-white/40")
        }
      />
    )
  }
  return (
    <span
      className={
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
        (s.mens ? "bg-[#ff5003] text-white" : "bg-white text-[#1728C8]")
      }
    >
      {s.mens ? "K" : s.naam.slice(0, 1)}
    </span>
  )
}

function SystemRow({ s }: { s: ChatItem }) {
  return (
    <div className="flex justify-center py-1">
      <div className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-[#1728C8] shadow-lg ring-1 ring-black/5 duration-500 ease-out animate-in fade-in-0 zoom-in-90 slide-in-from-top-4">
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff5003]/15 text-sm">
          🔔
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#ff5003] ring-2 ring-white motion-safe:animate-ping" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#ff5003] ring-2 ring-white" />
        </span>
        <span className="text-sm font-semibold">{s.tekst}</span>
      </div>
    </div>
  )
}

function ChatRow({ s, right }: { s: ChatItem; right: boolean }) {
  return (
    <div
      className={
        "flex items-end gap-2.5 duration-300 ease-out animate-in fade-in-0 " +
        (right
          ? "flex-row-reverse slide-in-from-right-3"
          : "flex-row slide-in-from-left-3")
      }
    >
      <Avatar s={s} />
      <div
        className={
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transform-none sm:max-w-[75%] " +
          (s.mens
            ? "bg-[#ff5003]/20 ring-1 ring-[#ff5003]/40 hover:bg-[#ff5003]/25"
            : "bg-white/10 ring-1 ring-white/15 hover:bg-white/15") +
          (right ? " rounded-br-sm" : " rounded-bl-sm")
        }
      >
        <div
          className={
            "flex items-center gap-2 " +
            (right ? "flex-row-reverse text-right" : "")
          }
        >
          <span className="text-sm font-semibold">{s.naam}</span>
          <span
            className={
              "rounded-full px-1.5 py-0.5 text-[10px] font-medium " +
              (s.mens
                ? "bg-[#ff5003]/30 text-white"
                : "bg-white/15 text-white/80")
            }
          >
            {s.mens ? "mens" : s.rol}
          </span>
        </div>
        <p className={"mt-1 text-sm text-white/85 " + (right ? "text-right" : "")}>
          {s.tekst}
        </p>
      </div>
    </div>
  )
}

function TypingRow({ s, right }: { s: ChatItem; right: boolean }) {
  return (
    <div
      className={
        "flex items-end gap-2.5 duration-200 animate-in fade-in-0 " +
        (right ? "flex-row-reverse" : "flex-row")
      }
    >
      <Avatar s={s} />
      <div
        className={
          "rounded-2xl bg-white/10 px-3.5 py-3 ring-1 ring-white/15 " +
          (right ? "rounded-br-sm" : "rounded-bl-sm")
        }
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/80">{s.naam} typt</span>
          <span className="flex gap-1">
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70 motion-reduce:animate-none"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [url, setUrl] = useState("")
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !url.trim()) {
      toast.error("Vul je naam, e-mail en website-URL in")
      return
    }
    setBusy(true)
    try {
      const { lead, uid } = await createLead({
        name,
        email,
        url: ensureProtocol(url),
      })
      setDone(true)
      // Nieuwe headless multi-agent Worker-scan (overleeft dichte browser).
      // Valt terug op de browser-scan als de Worker /scan onverhoopt niet
      // antwoordt, zodat er nooit een lead blijft hangen.
      void requestWorkerScan(lead).then((ok) => {
        if (!ok) void runLeadScan(lead, uid)
      })
    } catch (e) {
      console.error(e)
      toast.error("Aanmelden mislukt", {
        description: e instanceof Error ? e.message : "Probeer het zo nog eens.",
      })
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-4 py-4 text-left">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
          <Check className="h-5 w-5" />
        </div>
        <p className="text-sm text-white/85">
          Bedankt, we gaan aan de slag. Je ontvangt je rapportcijfer en tips
          binnen 24 uur op{" "}
          <span className="font-medium text-white">{email}</span>.
        </p>
      </div>
    )
  }

  const field =
    "border-white/20 bg-white/10 text-white placeholder:text-white/80 focus-visible:border-white/50 focus-visible:ring-white/20"

  return (
    <>
    <form
      onSubmit={submit}
      className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-2.5 sm:flex-row sm:gap-2"
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Je naam"
        autoComplete="name"
        aria-label="Naam"
        className={field}
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="jij@bedrijf.nl"
        autoComplete="email"
        aria-label="E-mailadres"
        className={field}
      />
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="jouwwebsite.nl"
        inputMode="url"
        aria-label="Website-URL"
        className={field}
      />
      <Button
        type="submit"
        disabled={busy}
        style={{ color: BLUE }}
        className="shrink-0 bg-white hover:bg-white/90 sm:w-auto"
      >
        {busy ? (
          <>
            <Loader2 className="mr-1 h-4 w-4 animate-spin" /> …
          </>
        ) : (
          <>
            Meld je website aan <ArrowRight className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
    <PrivacyNote />
    </>
  )
}

function PrivacyNote() {
  return (
    <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-white/80">
      Door te versturen ga je akkoord met onze{" "}
      <a
        href="/privacy"
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-white/80"
      >
        privacyverklaring
      </a>
      . We gebruiken je gegevens alleen voor deze check en het contact daarover.
    </p>
  )
}
