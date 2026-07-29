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
    <div className="min-h-svh bg-background text-foreground">
      {/* Topbar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-semibold">
          <BrandLogo className="h-6 w-auto" /> BOLD700
        </div>
        <button
          onClick={onLogin}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Inloggen
        </button>
      </header>

      {/* Hero + inline formulier */}
      <section className="mx-auto max-w-3xl px-5 pt-10 pb-6 text-center sm:pt-16">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Gratis UX-review voor je website
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Weet binnen 24 uur wat er beter kan aan je website
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Een snelle scan geeft je een heldere UX-score en een concreet rapport.
          Een specialist met enterprise-ervaring valideert de bevindingen. Geen
          vragenlijsten, geen gedoe.
        </p>
        <SignupForm />
      </section>

      {/* Scorecard-voorbeelden — mobiel: swipebare stapel, desktop: rij */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="sm:hidden">
          <ScorecardDeck images={cards} />
        </div>
        <div className="hidden gap-4 sm:grid sm:grid-cols-3">
          {(cards.length ? cards : [null, null, null]).map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="Voorbeeld scorecard" className="w-full" />
              ) : (
                <div className="aspect-[4/5] animate-pulse bg-muted" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Voorbeelden van scorecards zoals je die ontvangt.
        </p>
      </section>

      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
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
        description: "Probeer het zo nog eens.",
      })
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-4 text-left">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="h-5 w-5" />
        </div>
        <p className="text-sm text-muted-foreground">
          Bedankt, we gaan aan de slag. Je ontvangt je score en rapport binnen 24
          uur op <span className="font-medium text-foreground">{email}</span>.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-7 flex w-full max-w-2xl flex-col gap-2 sm:flex-row"
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Je naam"
        autoComplete="name"
        aria-label="Naam"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="jij@bedrijf.nl"
        autoComplete="email"
        aria-label="E-mailadres"
      />
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="jouwwebsite.nl"
        inputMode="url"
        aria-label="Website-URL"
      />
      <Button type="submit" disabled={busy} className="shrink-0 sm:w-auto">
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
