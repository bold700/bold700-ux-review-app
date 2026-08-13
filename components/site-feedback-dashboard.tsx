"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, ExternalLink, Loader2, Trash2 } from "lucide-react"

import {
  SITE_ORIGIN,
  deleteSiteFeedback,
  setSiteFeedbackStatus,
  subscribeSiteFeedback,
  type SiteFeedback,
} from "@/lib/site-feedback"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteFeedbackDashboard() {
  const [items, setItems] = useState<SiteFeedback[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState<"open" | "all">("open")

  useEffect(() => {
    return subscribeSiteFeedback((list) => {
      setItems(list)
      setLoaded(true)
    })
  }, [])

  const shown = filter === "open" ? items.filter((i) => i.status === "open") : items
  const openCount = items.filter((i) => i.status === "open").length

  const groups = useMemo(() => {
    const by = new Map<string, SiteFeedback[]>()
    for (const it of shown) {
      const arr = by.get(it.path) ?? []
      arr.push(it)
      by.set(it.path, arr)
    }
    return [...by.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [shown])

  const actions = (
    <div className="flex overflow-hidden rounded-lg border">
      {(["open", "all"] as const).map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={cn(
            "px-3 py-1.5 text-sm",
            filter === f
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground",
          )}
        >
          {f === "open" ? "Open" : "Alles"}
        </button>
      ))}
    </div>
  )

  return (
    <AppShell title="Site-feedback" actions={actions}>
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <p className="mb-6 text-sm text-muted-foreground">
          Feedback-pins die bezoekers op bold700.com achterlaten (rechtermuisknop
          op de site). {openCount} open · {items.length} totaal.
        </p>

        {!loaded ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : shown.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            {filter === "open" ? "Geen open feedback 🎉" : "Nog geen feedback."}
          </p>
        ) : (
          <div className="space-y-8">
            {groups.map(([path, list]) => (
              <div key={path}>
                <div className="mb-3 flex items-center gap-2 border-b pb-2">
                  <h2 className="font-mono text-sm">{path}</h2>
                  <a
                    href={`${SITE_ORIGIN}${path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Open pagina"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <span className="text-xs text-muted-foreground">
                    ({list.length})
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {list.map((f) => (
                    <li
                      key={f.id}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border bg-card p-4",
                        f.status === "done" && "opacity-55",
                      )}
                    >
                      <button
                        onClick={() =>
                          setSiteFeedbackStatus(
                            f.id,
                            f.status === "done" ? "open" : "done",
                          )
                        }
                        aria-label={f.status === "done" ? "Heropenen" : "Afvinken"}
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                          f.status === "done"
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-input hover:border-emerald-500",
                        )}
                      >
                        {f.status === "done" && <Check className="h-4 w-4" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "text-sm",
                            f.status === "done" && "line-through",
                          )}
                        >
                          {f.text}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {f.name ? `${f.name} · ` : ""}
                          {new Date(f.createdAtMs).toLocaleString("nl-NL", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {" · "}
                          {Math.round(f.xPct)}% breed, {Math.round(f.yPx)}px hoog
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSiteFeedback(f.id)}
                        aria-label="Verwijderen"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
