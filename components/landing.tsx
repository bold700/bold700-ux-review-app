"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

import type { Project } from "@/lib/types"
import type { ReportData } from "@/lib/report"
import { drawScorecard } from "@/lib/scorecard-image"
import { createLead, requestWorkerScan, runLeadScan } from "@/lib/leads"
import { ensureProtocol } from "@/lib/url"
import { BrandLogo } from "@/components/brand-logo"
import { ScorecardDeck } from "@/components/scorecard-deck"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <div className="flex min-h-svh flex-col bg-[#1728C8] text-white">
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
          className="rise order-4 sm:order-4"
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
          <p className="mt-4 text-center text-xs text-white/60">
            Voorbeelden van het rapport dat je ontvangt.
          </p>
        </div>
      </main>

      <TeamFlow />

      <footer className="shrink-0 border-t border-white/15 py-6 text-center text-xs text-white/60">
        <a
          href="/rapport"
          className="underline transition-colors hover:text-white/90"
        >
          Bekijk het onderzoek: hoe goed zijn websites van ondernemers?
        </a>
        <div className="mt-2">BOLD700 · uxreviews.bold700.com</div>
      </footer>
    </div>
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
  { naam: "Teun", rol: "Metingen", tekst: "Ik pak 'm op! Ik doe eerst een goede meting: snelheid, techniek en toegankelijkheid. Even de harde cijfers erbij, geen giswerk. Zo terug." },
  { naam: "Bram", rol: "Bedrijfsprofiel", tekst: "Top, Teun. Ik lees me even in: wie zijn ze, wat verkopen ze en wat willen ze bereiken? Dan weet iedereen waar we het voor doen." },
  { naam: "Sofie", rol: "UX", tekst: "Ik duik in het gebruiksgemak. Vinden bezoekers makkelijk hun weg, of lopen ze ergens vast?" },
  { naam: "Ruben", rol: "Vindbaarheid & content", tekst: "Ik kijk naar de teksten en de vindbaarheid. Is de boodschap meteen helder, zonder moeilijke woorden?" },
  { naam: "Nora", rol: "Conversie", tekst: "Ik focus op de knoppen en het vertrouwen. Zou ik hier zelf die stap durven zetten?" },
  { naam: "Timo", rol: "Toegankelijkheid", tekst: "Ik check of iedereen mee kan komen: goed leesbaar en bruikbaar, ook met een beperking." },
  { naam: "Ans", rol: "Doelgroep-blik", tekst: "Ik kijk als jullie bezoeker. Snap ik binnen 5 seconden wat dit is, en voel ik me op mijn gemak?" },
  { naam: "Vera", rol: "Kwaliteitscontrole", tekst: "Ik loop alles na en leg elk punt naast het bewijs op de site. Klopt iets niet? Dan haal ik het eruit." },
  { naam: "Stef", rol: "Prioritering", tekst: "Ik zet alles op een rij. Wat het meeste oplevert voor jullie doel, zet ik bovenaan." },
  { naam: "Lot", rol: "Heldere taal", tekst: "En ik maak er gewone taal van: wat we zagen, waarom het klanten kost, en wat je eraan doet." },
  { naam: "Kenny", rol: "Eindcontrole", tekst: "Mooi werk, team. Ik ben Kenny en ik doe de eindcontrole: ik kijk het geheel nog even na en bespreek het samen met je.", mens: true, foto: "/team/kenny.jpg" },
]

function TeamFlow() {
  const ref = useRef<HTMLDivElement | null>(null)
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
      { threshold: 0.2 },
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
          timer = setTimeout(step, 900)
        }, 500)
        return
      }
      // Persoon: eerst "typt…", dan de bubbel, dan even leestijd.
      setTyping(true)
      timer = setTimeout(() => {
        if (cancelled) return
        setTyping(false)
        setRevealed(i + 1)
        i += 1
        timer = setTimeout(step, 1100)
      }, 1200)
    }
    step()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [shown])

  return (
    <section className="px-5 py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-3xl">
        <div
          className={
            "text-center transition-all duration-700 ease-out motion-reduce:transition-none " +
            (shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")
          }
        >
          <span className="text-sm font-semibold text-white/70">
            Zo komen we tot je resultaat
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Geen zwarte doos, maar een team
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/70">
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
        </div>

        <p className="mt-8 text-center text-sm text-white/55">
          Elke AI-bevinding is een onderbouwde hypothese, gelabeld en
          gecontroleerd. De metingen zijn feiten.
        </p>
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
          <span className="text-[11px] text-white/60">{s.naam} typt</span>
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
    "border-white/20 bg-white/10 text-white placeholder:text-white/55 focus-visible:border-white/50 focus-visible:ring-white/20"

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
    <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-white/55">
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
