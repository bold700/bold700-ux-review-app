"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

import type { Project } from "@/lib/types"
import type { ReportData } from "@/lib/report"
import { drawScorecard } from "@/lib/scorecard-image"
import { createLead, runLeadScan } from "@/lib/leads"
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
    <div className="flex min-h-svh flex-col bg-[#1728C8] text-white lg:h-svh lg:overflow-hidden">
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
          Gratis UX-review voor je website
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
          className="rise order-3 mt-8 text-center sm:order-2 lg:mt-4"
          style={{ animationDelay: "160ms" }}
        >
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Weet binnen 24 uur wat er beter kan aan je website
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Een snelle scan geeft je een heldere UX-score en een concreet
            rapport. Een specialist met enterprise-ervaring valideert de
            bevindingen. Geen vragenlijsten, geen gedoe.
          </p>
        </div>

        {/* Formulier */}
        <div
          className="rise order-4 sm:order-3"
          style={{ animationDelay: "240ms" }}
        >
          <SignupForm />
        </div>

        {/* Scorecard-rij — alleen desktop, onder de hero */}
        <div
          className="rise order-5 mt-10 hidden sm:order-4 sm:block lg:mt-6"
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
            Voorbeelden van scorecards zoals je die ontvangt.
          </p>
        </div>
      </main>

      <footer className="shrink-0 border-t border-white/15 py-6 text-center text-xs text-white/60">
        BOLD700 · uxreviews.bold700.com
      </footer>
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
      void runLeadScan(lead, uid)
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
          Bedankt, we gaan aan de slag. Je ontvangt je score en rapport binnen 24
          uur op <span className="font-medium text-white">{email}</span>.
        </p>
      </div>
    )
  }

  const field =
    "border-white/20 bg-white/10 text-white placeholder:text-white/55 focus-visible:border-white/50 focus-visible:ring-white/20"

  return (
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
  )
}
