"use client"

import { useState } from "react"
import { Check, Download, Link2, Loader2 } from "lucide-react"

import { useAuth } from "@/components/providers/auth-provider"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"

// Vast id, mogelijk doordat het manifest een vaste sleutel bevat. Zonder dat
// krijgt een uitgepakte extensie per computer een ander id en kan deze pagina
// hem niet aanspreken.
const EXTENSION_ID = "hndmchajmgjegglfehkphlimpmehnlff"

type Chromish = {
  runtime?: {
    sendMessage: (
      id: string,
      msg: unknown,
      cb: (res?: { ok?: boolean; email?: string; error?: string }) => void,
    ) => void
    lastError?: { message?: string }
  }
}

export function ExtensionLink() {
  const { user, authed } = useAuth()
  const [state, setState] = useState<"idle" | "busy" | "ok">("idle")
  const [error, setError] = useState<string | null>(null)

  async function link() {
    setError(null)
    setState("busy")
    try {
      const chromish = (window as unknown as { chrome?: Chromish }).chrome
      if (!chromish?.runtime?.sendMessage) {
        throw new Error(
          "Deze browser kan geen extensies aanspreken. Gebruik Chrome, en installeer de extensie eerst.",
        )
      }
      if (!user) throw new Error("Je bent niet ingelogd.")

      // Het vernieuwingstoken hoort bij jouw account, niet bij dit apparaat.
      // De extensie wisselt het zelf in voor een vers token bij elke pin.
      const refreshToken = user.refreshToken
      const idToken = await user.getIdToken()

      const res = await new Promise<{ ok?: boolean; error?: string } | undefined>(
        (resolve) => {
          chromish.runtime!.sendMessage(
            EXTENSION_ID,
            {
              type: "uxpins:link",
              refreshToken,
              idToken,
              uid: user.uid,
              email: user.email ?? "",
            },
            (r) => resolve(r),
          )
          // Reageert de extensie niet, dan staat hij er waarschijnlijk niet.
          setTimeout(() => resolve(undefined), 3000)
        },
      )

      if (!res?.ok) {
        throw new Error(
          res?.error ??
            "De extensie reageerde niet. Staat hij geïnstalleerd en aan in chrome://extensions?",
        )
      }
      setState("ok")
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setState("idle")
    }
  }

  return (
    <AppShell title="Extensie koppelen">
      <div className="mx-auto w-full max-w-lg px-4 py-8">
        <h1 className="text-xl font-semibold tracking-tight">
          Pins plaatsen op elke website
        </h1>
        <p className="mt-2 text-muted-foreground">
          De extensie zet de rechtermuisknop aan op elke site. Koppel hem één
          keer per browser aan je account, dan komen je pins overal bij elkaar,
          op welke computer je ook zit.
        </p>

        <ol className="mt-8 space-y-6">
          <li>
            <p className="font-medium">1. Installeer de extensie</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Download hem, pak het bestand uit, en laad de map via{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                chrome://extensions
              </code>{" "}
              met Ontwikkelaarsmodus aan. Sla dit over als je hem al hebt.
            </p>
            <Button variant="outline" size="sm" asChild className="mt-2">
              <a href="/uxpins-extensie.zip" download>
                <Download className="mr-1 h-4 w-4" /> Extensie downloaden
              </a>
            </Button>
          </li>

          <li>
            <p className="font-medium">2. Koppel je account</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {authed
                ? `Je bent ingelogd als ${user?.email}. Eén klik en de extensie weet wie je bent.`
                : "Log eerst in, dan kan de extensie weten wie je bent."}
            </p>

            {state === "ok" ? (
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <Check className="h-4 w-4" /> Gekoppeld. Je kunt dit tabblad
                sluiten.
              </p>
            ) : (
              <Button
                className="mt-3"
                onClick={link}
                disabled={!authed || state === "busy"}
              >
                {state === "busy" ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Link2 className="mr-1 h-4 w-4" />
                )}
                Koppel de extensie
              </Button>
            )}

            {error && (
              <p className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
                {error}
              </p>
            )}
          </li>

          <li>
            <p className="font-medium">3. Pinnen</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Open een site, klik op het extensie-icoon, en klik met de
              rechtermuisknop waar iets opvalt. Alt ingedrukt houden geeft je
              het gewone browsermenu terug.
            </p>
          </li>
        </ol>

        <p className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          Koppelen kan per browser. Doe je dit op een tweede computer, dan komen
          die pins bij dezelfde gebruiker terecht: bij jou. Ontkoppelen kan
          altijd vanuit de popup van de extensie.
        </p>
      </div>
    </AppShell>
  )
}
