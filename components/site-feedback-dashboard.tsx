"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Eye,
  Globe,
  Loader2,
  Trash2,
} from "lucide-react"

import {
  deleteSiteFeedback,
  deviceOf,
  feedbackAllPageUrl,
  feedbackPageUrl,
  allSeen,
  markSeen,
  originOf,
  setSiteFeedbackStatus,
  siteOf,
  subscribeSiteFeedback,
  type SiteFeedback,
} from "@/lib/site-feedback"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SiteGroup = {
  site: string
  pins: SiteFeedback[]
  open: number
  pages: number
  newest: number
  fresh: number // binnengekomen sinds je er voor het laatst keek
  projectId?: string
}

export function SiteFeedbackDashboard() {
  const [items, setItems] = useState<SiteFeedback[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState<"open" | "all">("open")
  const [openSite, setOpenSite] = useState<string | null>(null)
  // Momentopname bij het laden: anders verdwijnt "nieuw" terwijl je kijkt.
  const [seen, setSeen] = useState<Record<string, number>>({})

  useEffect(() => {
    // Wat je al gezien had, vastgelegd op het moment van abonneren. Anders
    // verdwijnt de "nieuw"-markering terwijl je ernaar kijkt.
    const wasSeen = allSeen()
    return subscribeSiteFeedback((list) => {
      setItems(list)
      setSeen(wasSeen)
      setLoaded(true)
    })
  }, [])

  const shown = filter === "open" ? items.filter((i) => i.status === "open") : items

  const groups: SiteGroup[] = useMemo(() => {
    const by = new Map<string, SiteFeedback[]>()
    for (const it of shown) {
      const s = siteOf(it)
      const arr = by.get(s) ?? []
      arr.push(it)
      by.set(s, arr)
    }
    return [...by.entries()]
      .map(([site, pins]) => {
        const since = seen[site] ?? 0
        return {
          site,
          pins,
          open: pins.filter((p) => p.status === "open").length,
          pages: new Set(pins.map((p) => p.path)).size,
          newest: Math.max(...pins.map((p) => p.createdAtMs), 0),
          fresh: pins.filter((p) => p.createdAtMs > since).length,
          projectId: pins.find((p) => p.projectId)?.projectId,
        }
      })
      .sort((a, b) => b.fresh - a.fresh || b.newest - a.newest)
  }, [shown, seen])

  const actions = (
    <div className="flex overflow-hidden rounded-lg border">
      {(["open", "all"] as const).map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={cn(
            "min-h-9 px-3 py-1.5 text-sm transition-colors",
            filter === f
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {f === "open" ? "Open" : "Alles"}
        </button>
      ))}
    </div>
  )

  const current = openSite ? groups.find((g) => g.site === openSite) : null

  // Bij het openen van een site is die feedback gezien.
  function openGroup(g: SiteGroup) {
    markSeen(g.site, g.newest)
    setOpenSite(g.site)
  }

  function back() {
    // Pas bij het teruggaan de "nieuw"-telling bijwerken, niet tijdens het lezen.
    setSeen((s) => ({ ...s, [openSite!]: current?.newest ?? s[openSite!] }))
    setOpenSite(null)
  }

  if (!loaded) {
    return (
      <AppShell title="Site-feedback" actions={actions}>
        <div className="flex justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    )
  }

  if (current) {
    return (
      <AppShell title={current.site} actions={actions}>
        <div className="mx-auto w-full max-w-3xl px-4 py-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Button variant="ghost" size="sm" onClick={back}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Alle websites
            </Button>
            <span className="text-sm text-muted-foreground">
              {current.open} open · {current.pins.length} getoond ·{" "}
              {current.pages} {current.pages === 1 ? "pagina" : "pagina's"}
            </span>
            {current.projectId && (
              <Button variant="outline" size="sm" asChild className="ml-auto">
                <Link href={`/review/${current.projectId}`}>Naar review</Link>
              </Button>
            )}
          </div>
          <PageGroups pins={current.pins} />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Site-feedback" actions={actions}>
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <p className="mb-6 text-sm text-muted-foreground">
          Websites waar feedback-pins op staan, de nieuwste bovenaan. Klik een
          website om de pins per pagina te zien.
        </p>

        {groups.length === 0 ? (
          <div className="rounded-xl border border-dashed py-16 text-center">
            <Globe className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
            <p className="text-sm font-medium">
              {filter === "open" ? "Geen open feedback 🎉" : "Nog geen feedback."}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Zet de pins aan met de Chrome-extensie of de script-tag, en klik met
              de rechtermuisknop op een site.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {groups.map((g) => (
              <li key={g.site}>
                <button
                  onClick={() => openGroup(g)}
                  className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-medium">{g.site}</span>
                      {g.fresh > 0 && (
                        <Badge className="shrink-0">{g.fresh} nieuw</Badge>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {g.open} open · {g.pages}{" "}
                      {g.pages === 1 ? "pagina" : "pagina's"} · laatste{" "}
                      {new Date(g.newest).toLocaleString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>
                  <Badge variant="secondary" className="shrink-0">
                    {g.pins.length}
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  )
}

// ── Pins van één website, gegroepeerd per pagina ────────────
function PageGroups({ pins }: { pins: SiteFeedback[] }) {
  const groups = useMemo(() => {
    const by = new Map<string, SiteFeedback[]>()
    for (const it of pins) {
      const arr = by.get(it.path) ?? []
      arr.push(it)
      by.set(it.path, arr)
    }
    return [...by.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [pins])

  return (
    <div className="space-y-8">
      {groups.map(([path, list]) => (
        <div key={path}>
          <div className="mb-3 flex flex-wrap items-center gap-2 border-b pb-2">
            <h2 className="font-mono text-sm">{path}</h2>
            <a
              href={`${originOf(list[0])}${path}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Open pagina"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <span className="text-xs text-muted-foreground">({list.length})</span>
            {list.length > 1 && (
              <Button variant="outline" size="sm" asChild className="ml-auto h-8">
                <a href={feedbackAllPageUrl(list)} target="_blank" rel="noreferrer">
                  <Eye className="h-3.5 w-3.5" /> Bekijk alle op de pagina
                </a>
              </Button>
            )}
          </div>
          <ul className="space-y-2.5">
            {list.map((f, i) => (
              <PinRow key={f.id} pin={f} href={feedbackPageUrl(list, i)} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function PinRow({ pin, href }: { pin: SiteFeedback; href: string }) {
  const done = pin.status === "done"
  const d = deviceOf(pin)
  return (
    <li
      className={cn(
        "flex items-start gap-3 rounded-xl border bg-card p-4",
        done && "opacity-55",
      )}
    >
      <button
        onClick={() => setSiteFeedbackStatus(pin.id, done ? "open" : "done")}
        aria-label={done ? "Heropenen" : "Afvinken"}
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
        <p className={cn("text-sm", done && "line-through")}>{pin.text}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="gap-1 font-normal">
            {d.emoji} {d.label}
            {d.width ? ` · ${d.width}px` : ""}
          </Badge>
          <span>
            {pin.name ? `${pin.name} · ` : ""}
            {new Date(pin.createdAtMs).toLocaleString("nl-NL", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            <Eye className="h-3.5 w-3.5" /> Bekijk op de pagina
          </a>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteSiteFeedback(pin.id)}
        aria-label="Verwijderen"
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  )
}
