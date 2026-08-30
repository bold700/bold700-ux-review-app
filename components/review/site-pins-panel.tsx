"use client"

import { useEffect, useRef, useState } from "react"
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  ListPlus,
  Loader2,
  MapPin,
  Share2,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import {
  deleteSiteFeedback,
  deviceOf,
  pinBookmarklet,
  pinConsoleSnippet,
  pinSnippet,
  pinViewUrl,
  setSiteFeedbackStatus,
  subscribeProjectPins,
  type SiteFeedback,
} from "@/lib/site-feedback"
import { sharePins } from "@/lib/pin-share"
import type { Answer } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Feedback-pins op de site van de klant. Het script (public/pin.js) laad je op
// die site via de bookmarklet (jij), een script-tag (de klant) of de console
// (sites met een strikte CSP). Alles komt hier live binnen.
export function SitePinsPanel({
  projectId,
  mutate,
}: {
  projectId: string
  mutate?: (fn: (a: Record<string, Answer>) => Record<string, Answer>) => void
}) {
  const [pins, setPins] = useState<SiteFeedback[]>([])
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(
    () =>
      subscribeProjectPins(
        projectId,
        (list) => {
          setPins(list)
          setError(null)
        },
        (e) => setError(e.message),
      ),
    [projectId],
  )

  const openPins = pins.filter((p) => p.status === "open")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MapPin className="mr-1 h-4 w-4" />
          Pins
          {openPins.length > 0 && (
            <Badge variant="secondary" className="ml-1.5 px-1.5">
              {openPins.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Feedback-pins op de site</DialogTitle>
          <DialogDescription>
            Klik met de rechtermuisknop op de site en laat een opmerking achter.
            Die verschijnt hier meteen.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={pins.length ? "pins" : "start"}>
          <TabsList className="w-full">
            <TabsTrigger value="start" className="flex-1">
              Aanzetten
            </TabsTrigger>
            <TabsTrigger value="pins" className="flex-1">
              Pins ({pins.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="start" className="mt-4">
            <InstallOptions projectId={projectId} />
          </TabsContent>

          <TabsContent value="pins" className="mt-4">
            {pins.length > 0 && <SharePins projectId={projectId} />}
            {error && (
              <p className="mb-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
                Pins konden niet geladen worden: {error}
              </p>
            )}
            <PinList
              pins={pins}
              mutate={mutate}
              onConverted={() => setOpen(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// ── Aanzetten ───────────────────────────────────────────────
// Een project dat bij één domein hoort heeft een id dat uit dat domein volgt.
// De Worker vraagt daar dus om een sleutel, en die kun je niet in een
// bookmarklet of een script-tag zetten zonder hem weg te geven.
function InstallOptions({ projectId }: { projectId: string }) {
  if (projectId.startsWith("site-")) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border bg-muted/30 p-3">
          <h3 className="mb-1 text-sm font-medium">Dit project hoort bij een domein</h3>
          <p className="text-sm text-muted-foreground">
            De pins komen hier binnen via de Chrome-extensie. Open de site, klik
            op het extensie-icoon en laat het reviewveld leeg.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Wil je de klant zelf laten pinnen, maak dan een gewone review aan voor
          die site. Daar krijg je wel een script-tag, want zo&apos;n review heeft
          een willekeurig id dat op zichzelf geheim is.
        </p>
        <ExtensionDownload />
      </div>
    )
  }
  return <EmbedOptions projectId={projectId} />
}

// De extensie werkt per machine: Chrome synchroniseert uitgepakte extensies
// niet. Dit zipje is dezelfde map, zodat je hem op een andere computer binnen
// kunt halen zonder de repo te klonen.
function ExtensionDownload() {
  return (
    <div className="rounded-lg border border-dashed p-3">
      <p className="text-sm font-medium">Op een andere computer?</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Download de extensie, pak hem uit, en laad de map via{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          chrome://extensions
        </code>{" "}
        met Ontwikkelaarsmodus aan. Je sleutel vul je daar één keer opnieuw in.
      </p>
      <Button variant="outline" size="sm" asChild className="mt-2">
        <a href="/uxpins-extensie.zip" download>
          <Download className="mr-1 h-4 w-4" /> Extensie downloaden
        </a>
      </Button>
    </div>
  )
}

function EmbedOptions({ projectId }: { projectId: string }) {
  const linkRef = useRef<HTMLAnchorElement | null>(null)

  // Dit paneel mount pas als de dialog opengaat, dus altijd in de browser:
  // de helpers kunnen window.location.origin zelf gebruiken.
  const bookmarklet = pinBookmarklet(projectId)
  const snippet = pinSnippet(projectId)
  const consoleSnippet = pinConsoleSnippet(projectId)

  // React weigert een javascript:-URL in href, dus zetten we hem direct op het
  // DOM-element. De link is bedoeld om naar je favorietenbalk te slepen.
  useEffect(() => {
    linkRef.current?.setAttribute("href", bookmarklet)
  }, [bookmarklet])

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-medium">1. Voor jezelf</h3>
          <span className="text-xs text-muted-foreground">werkt op de meeste sites</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Sleep deze knop naar je favorietenbalk. Open daarna de site van de
          klant en klik erop. Werkt de knop niet, dan blokkeert die site extern
          script: gebruik dan de Chrome-extensie of stap 3.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <a
            ref={linkRef}
            href="#"
            draggable
            onClick={(e) => e.preventDefault()}
            className="inline-flex min-h-11 cursor-grab items-center gap-2 rounded-md border border-dashed border-primary bg-primary/5 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:cursor-grabbing"
          >
            <MapPin className="h-4 w-4" /> Pin op deze site
          </a>
          <CopyButton
            value={bookmarklet}
            label="Kopieer bookmarklet"
          />
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-medium">2. Voor de klant</h3>
          <span className="text-xs text-muted-foreground">werkt overal</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Laat de klant deze regel in de site plakken, vlak voor de sluitende
          body-tag. Dan kan iedereen op de site pins plaatsen.
        </p>
        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={snippet}
            onFocus={(e) => e.currentTarget.select()}
            className="font-mono text-xs"
            aria-label="Script-tag voor de klantsite"
          />
          <CopyButton value={snippet} icon />
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-medium">3. Als de bookmarklet niets doet</h3>
          <span className="text-xs text-muted-foreground">strikte CSP</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Sommige sites blokkeren extern script. Open dan de console van je
          browser en plak dit.
        </p>
        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={consoleSnippet}
            onFocus={(e) => e.currentTarget.select()}
            className="font-mono text-xs"
            aria-label="Console-snippet"
          />
          <CopyButton value={consoleSnippet} icon />
        </div>
      </section>

      <ExtensionDownload />
    </div>
  )
}

// Pins delen met de eigenaar van de site: publieke, aflopende link met een
// vinkje per punt. Zelfde mechanisme als de developer-checklist.
function SharePins({ projectId }: { projectId: string }) {
  const [url, setUrl] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function share() {
    setBusy(true)
    try {
      setUrl(await sharePins(projectId))
      toast.success("Link klaar, zonder vervaldatum")
    } catch {
      toast.error("Delen lukte niet")
    } finally {
      setBusy(false)
    }
  }

  if (!url) {
    return (
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/30 p-3">
        <p className="text-sm text-muted-foreground">
          Deel deze punten met de eigenaar van de site.
        </p>
        <Button size="sm" onClick={share} disabled={busy}>
          {busy ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <Share2 className="mr-1 h-4 w-4" />
          )}
          Deel link
        </Button>
      </div>
    )
  }

  return (
    <div className="mb-4 space-y-2 rounded-lg border bg-muted/30 p-3">
      <p className="text-sm font-medium">Link staat klaar, zonder vervaldatum</p>
      <div className="flex items-center gap-2">
        <Input readOnly value={url} onFocus={(e) => e.currentTarget.select()} className="text-xs" />
        <CopyButton value={url} icon />
        <Button size="icon" variant="outline" asChild aria-label="Openen">
          <a href={url} target="_blank" rel="noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        De ontvanger ziet de punten per pagina met schermafbeelding en kan
        afvinken, zonder in te loggen. Jij ziet dat live terug.
      </p>
    </div>
  )
}

function CopyButton({
  value,
  label,
  icon,
}: {
  value: string
  label?: string
  icon?: boolean
}) {
  const [done, setDone] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      toast.error("Kopiëren lukte niet, selecteer de tekst handmatig")
    }
  }

  return (
    <Button
      variant="outline"
      size={icon ? "icon" : "sm"}
      onClick={copy}
      aria-label={label ?? "Kopieer"}
      title={label ?? "Kopieer"}
    >
      {done ? (
        <Check className="h-4 w-4 text-emerald-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {!icon && <span className="ml-1">{done ? "Gekopieerd" : label}</span>}
    </Button>
  )
}

// ── De binnengekomen pins ───────────────────────────────────
function PinList({
  pins,
  mutate,
  onConverted,
}: {
  pins: SiteFeedback[]
  mutate?: (fn: (a: Record<string, Answer>) => Record<string, Answer>) => void
  onConverted: () => void
}) {
  if (pins.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-12 text-center">
        <MapPin className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
        <p className="text-sm font-medium">Nog geen pins</p>
        <p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">
          Zet de pins aan op de site en klik met de rechtermuisknop waar iets
          opvalt.
        </p>
      </div>
    )
  }

  // Pins horen bij een pagina, dus groeperen we ze zo.
  const groups = new Map<string, SiteFeedback[]>()
  for (const p of pins) {
    const arr = groups.get(p.path) ?? []
    arr.push(p)
    groups.set(p.path, arr)
  }

  return (
    <div className="space-y-6">
      {[...groups.entries()].map(([path, list]) => (
        <div key={path}>
          <div className="mb-2 flex items-center justify-between gap-2 border-b pb-1.5">
            <span className="truncate font-mono text-xs text-muted-foreground">
              {path}
            </span>
            <a
              href={pinViewUrl(list[0])}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-xs text-primary hover:underline"
              title="Opent de pagina in bekijkmodus. De pins verschijnen zodra het script er draait (script-tag of extensie)."
            >
              Open pagina <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <ul className="space-y-2">
            {list.map((p, i) => (
              <PinRow
                key={p.id}
                pin={p}
                index={i + 1}
                mutate={mutate}
                onConverted={onConverted}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function PinRow({
  pin,
  index,
  mutate,
  onConverted,
}: {
  pin: SiteFeedback
  index: number
  mutate?: (fn: (a: Record<string, Answer>) => Record<string, Answer>) => void
  onConverted: () => void
}) {
  const [busy, setBusy] = useState(false)
  const device = deviceOf(pin)
  const done = pin.status === "done"

  // De pin wordt een bevinding in de review, met de pagina en het element als
  // context in de notitie. De pin zelf vinken we af zodat hij niet dubbel telt.
  async function toFinding() {
    if (!mutate) return
    setBusy(true)
    const id = `ff-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const context = [
      pin.url || pin.path,
      pin.elementText ? `bij "${pin.elementText}"` : "",
      pin.name ? `gemeld door ${pin.name}` : "",
    ]
      .filter(Boolean)
      .join(" · ")
    mutate((a) => {
      const order = Object.keys(a).filter((k) => k.startsWith("ff-")).length
      return {
        ...a,
        [id]: {
          score: null,
          severity: null,
          findingTitle: pin.text.slice(0, 80),
          notes: `${pin.text}\n\n[Pin] ${context}`,
          findingCategories: [],
          findingOrder: order,
          screenshotUrls: [],
        },
      }
    })
    try {
      await setSiteFeedbackStatus(pin.id, "done")
    } catch {
      /* de bevinding staat er al, de status is bijzaak */
    }
    setBusy(false)
    toast.success("Bevinding toegevoegd aan de review")
    onConverted()
  }

  return (
    <li
      className={cn(
        "rounded-lg border p-3 transition-opacity",
        done && "opacity-60",
      )}
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <p className={cn("text-sm", done && "line-through")}>{pin.text}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span title={`${device.width}px`}>
              {device.emoji} {device.label}
            </span>
            {pin.name && <span>· {pin.name}</span>}
            {pin.createdAtMs > 0 && (
              <span>
                ·{" "}
                {new Date(pin.createdAtMs).toLocaleString("nl-NL", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {mutate && !done && (
          <Button size="sm" variant="secondary" onClick={toFinding} disabled={busy}>
            <ListPlus className="mr-1 h-4 w-4" /> Naar bevinding
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setSiteFeedbackStatus(pin.id, done ? "open" : "done")}
        >
          <Check className="mr-1 h-4 w-4" />
          {done ? "Heropen" : "Afvinken"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => deleteSiteFeedback(pin.id)}
          aria-label="Pin verwijderen"
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}
