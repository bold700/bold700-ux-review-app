"use client"

import { useEffect, useState } from "react"
import { Check, Clock, ExternalLink, ImageOff, Loader2, SearchX } from "lucide-react"

import {
  loadPinShot,
  loadSharedPins,
  type SharedPins,
} from "@/lib/pin-share"
import { deviceOf, originOf, type SiteFeedback } from "@/lib/site-feedback"
import { devStateOf, isDone, saveDevStatus } from "@/lib/dev-status"
import type { DevStatusMap } from "@/lib/dev-status"
import { BrandLogo } from "@/components/brand-logo"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Publiek pin-rapport: wat er op jouw site is opgevallen, per pagina, met een
// schermopname en een vinkje per punt. Geen login, precies zoals de
// developer-checklist van een gewoon rapport.
export function PinReportView({ id }: { id: string }) {
  const [data, setData] = useState<SharedPins | null | undefined>(undefined)
  const [status, setStatus] = useState<DevStatusMap>({})

  useEffect(() => {
    let cancelled = false
    loadSharedPins(id)
      .then((res) => {
        if (cancelled) return
        setData(res)
        setStatus((res?.project.devStatus as DevStatusMap) ?? {})
      })
      .catch(() => {
        if (!cancelled) setData(null)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (data === undefined) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-3 p-6 text-center">
        <SearchX className="h-7 w-7 text-muted-foreground" />
        <p className="font-medium">Deze link werkt niet meer</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Hij is verlopen of ingetrokken. Vraag degene die hem stuurde om een
          nieuwe.
        </p>
      </div>
    )
  }

  const { project, pins } = data
  const done = pins.filter((p) => isDone(status[p.id])).length

  // Per pagina groeperen: zo loopt de ontvanger zijn site langs.
  const groups = new Map<string, SiteFeedback[]>()
  for (const p of pins) {
    const arr = groups.get(p.path) ?? []
    arr.push(p)
    groups.set(p.path, arr)
  }

  async function toggle(pin: SiteFeedback) {
    const next = isDone(status[pin.id]) ? "open" : "done"
    setStatus((s) => ({ ...s, [pin.id]: { status: next, at: new Date().toISOString() } }))
    try {
      await saveDevStatus(id, pin.id, { status: next })
    } catch {
      // Terugdraaien als het niet opgeslagen kon worden.
      setStatus((s) => ({ ...s, [pin.id]: { status: next === "done" ? "open" : "done" } }))
    }
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-4">
          <BrandLogo />
          <span className="text-xs text-muted-foreground">
            {done} van {pins.length} verwerkt
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Wat ons opviel op {project.site ?? project.name ?? "je site"}
        </h1>
        <p className="mt-2 max-w-prose text-muted-foreground">
          {pins.length} {pins.length === 1 ? "punt" : "punten"}, gegroepeerd per
          pagina. Vink af wat je hebt opgepakt; dat zien wij meteen. Je hoeft
          nergens voor in te loggen.
        </p>

        {project.shareExpiresAtMs && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Deze link vervalt op{" "}
            {new Date(project.shareExpiresAtMs).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        <div className="mt-10 space-y-10">
          {[...groups.entries()].map(([path, list]) => (
            <section key={path}>
              <div className="mb-4 flex flex-wrap items-center gap-2 border-b pb-2">
                <h2 className="font-mono text-sm">{path}</h2>
                <a
                  href={`${originOf(list[0])}${path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  open pagina <ExternalLink className="h-3 w-3" />
                </a>
                <span className="ml-auto text-xs text-muted-foreground">
                  {list.filter((p) => isDone(status[p.id])).length} / {list.length}
                </span>
              </div>

              <ul className="space-y-4">
                {list.map((pin, i) => (
                  <PinCard
                    key={pin.id}
                    pin={pin}
                    index={i + 1}
                    done={devStateOf(status[pin.id]) === "done"}
                    onToggle={() => toggle(pin)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

function PinCard({
  pin,
  index,
  done,
  onToggle,
}: {
  pin: SiteFeedback
  index: number
  done: boolean
  onToggle: () => void
}) {
  // undefined = nog aan het laden, null = geen opname
  const [shot, setShot] = useState<string | null | undefined>(undefined)
  const device = deviceOf(pin)

  useEffect(() => {
    let cancelled = false
    if (!pin.hasShot) {
      // Ook dit via de belofte-keten, zodat er niets synchroon in de effect
      // gebeurt (React 19 klaagt daar terecht over).
      Promise.resolve().then(() => {
        if (!cancelled) setShot(null)
      })
      return () => {
        cancelled = true
      }
    }
    loadPinShot(pin.id).then((img) => {
      if (!cancelled) setShot(img)
    })
    return () => {
      cancelled = true
    }
  }, [pin.id, pin.hasShot])

  return (
    <li
      className={cn(
        "overflow-hidden rounded-xl border bg-card transition-opacity",
        done && "opacity-60",
      )}
    >
      <div className="flex gap-3 p-4">
        <button
          onClick={onToggle}
          aria-label={done ? "Markeer als open" : "Markeer als opgelost"}
          aria-pressed={done}
          className={cn(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors",
            done
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-input hover:border-emerald-500",
          )}
        >
          {done && <Check className="h-4 w-4" />}
        </button>

        <div className="min-w-0 flex-1">
          <p className={cn("leading-snug", done && "line-through")}>
            <span className="mr-2 text-xs font-bold text-primary">{index}.</span>
            {pin.text}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {pin.elementText && (
              <Badge variant="outline" className="max-w-full font-normal">
                <span className="truncate">bij &ldquo;{pin.elementText}&rdquo;</span>
              </Badge>
            )}
            <span>
              {device.emoji} {device.label}
              {device.width ? ` · ${device.width}px` : ""}
            </span>
          </div>
        </div>
      </div>

      {pin.hasShot && (
        <div className="border-t bg-muted/30">
          {shot === undefined ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : shot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={shot}
              alt={`Schermafbeelding bij punt ${index}: ${pin.text}`}
              className="w-full"
              loading="lazy"
            />
          ) : (
            <p className="flex items-center justify-center gap-2 py-8 text-xs text-muted-foreground">
              <ImageOff className="h-4 w-4" /> Schermafbeelding niet beschikbaar
            </p>
          )}
        </div>
      )}
    </li>
  )
}
