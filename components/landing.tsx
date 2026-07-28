"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, Check, Loader2, ShieldCheck, Zap } from "lucide-react"
import { toast } from "sonner"

import type { Project } from "@/lib/types"
import type { ReportData } from "@/lib/report"
import { drawScorecard } from "@/lib/scorecard-image"
import { createLead, runLeadScan } from "@/lib/leads"
import { ensureProtocol, normalizeUrl } from "@/lib/url"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      setCards(SAMPLES.map((s) => drawScorecard(s.project, s.data)))
    } catch {
      setCards([])
    }
  }, [])

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })

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

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-5 pt-10 pb-8 text-center sm:pt-16">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
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
        <div className="mt-7 flex justify-center">
          <Button size="lg" onClick={scrollToForm}>
            Meld je website aan <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Scorecard-voorbeelden */}
      <section className="mx-auto max-w-5xl px-5 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
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
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Voorbeelden van scorecards zoals je die ontvangt.
        </p>
      </section>

      {/* Twee stappen */}
      <section className="mx-auto max-w-4xl px-5 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="space-y-2 py-6">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="h-5 w-5" />
                <span className="text-sm font-semibold">1 · Snelle scan</span>
              </div>
              <h3 className="text-lg font-semibold">Gratis eerste scan</h3>
              <p className="text-sm text-muted-foreground">
                We scannen je pagina en sturen binnen 24 uur je UX-score en een
                scorecard met de belangrijkste punten naar je inbox.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 py-6">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  2 · Expert-review
                </span>
              </div>
              <h3 className="text-lg font-semibold">
                Nagelopen door een specialist
              </h3>
              <p className="text-sm text-muted-foreground">
                Een UX-specialist loopt het rapport met je door, corrigeert
                interpretaties en geeft context. Zo weet je precies wat prioriteit
                heeft.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Aanmeldformulier */}
      <section ref={formRef} className="mx-auto max-w-md px-5 py-10">
        <SignupForm />
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
      // Scan draait op de achtergrond; blokkeert de bevestiging niet.
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
      <Card className="border-primary/30">
        <CardContent className="space-y-3 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Check className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Bedankt, we gaan aan de slag</h3>
          <p className="text-sm text-muted-foreground">
            Je ontvangt je UX-score en rapport binnen 24 uur op{" "}
            <span className="font-medium text-foreground">{email}</span>. Daarna
            neemt een specialist contact op om het rapport door te nemen.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="py-6">
        <h2 className="text-xl font-semibold">Meld je website aan</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Gratis, vrijblijvend. Score + rapport binnen 24 uur.
        </p>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="l-name">Naam</Label>
            <Input
              id="l-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Je naam"
              autoComplete="name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="l-email">E-mailadres</Label>
            <Input
              id="l-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jij@bedrijf.nl"
              autoComplete="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="l-url">Website-URL</Label>
            <Input
              id="l-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="jouwwebsite.nl"
              inputMode="url"
            />
            {url && normalizeUrl(url) && (
              <p className="text-xs text-muted-foreground">
                {normalizeUrl(url)}
              </p>
            )}
          </div>
          <Button type="submit" size="lg" disabled={busy}>
            {busy ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Versturen…
              </>
            ) : (
              <>
                Vraag gratis scan aan <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
