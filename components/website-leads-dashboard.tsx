"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Loader2, Mail, Trash2 } from "lucide-react"

import {
  STATUS_LABELS,
  deleteWebsiteLead,
  setWebsiteLeadStatus,
  subscribeWebsiteLeads,
  type LeadStatus,
  type WebsiteLead,
} from "@/lib/website-leads"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STATUS_ORDER: LeadStatus[] = ["nieuw", "opgevolgd", "klant", "afgevallen"]

export function WebsiteLeadsDashboard() {
  const [items, setItems] = useState<WebsiteLead[]>([])
  const [loaded, setLoaded] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return subscribeWebsiteLeads(
      (list) => {
        setItems(list)
        setError(null)
        setLoaded(true)
      },
      (e) => {
        setError(e.message)
        setLoaded(true)
      },
    )
  }, [])

  const sorted = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) ||
          b.createdAtMs - a.createdAtMs,
      ),
    [items],
  )
  const nieuw = items.filter((i) => i.status === "nieuw").length

  return (
    <AppShell title="Website-leads">
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <p className="mb-6 text-sm text-muted-foreground">
          Aanvragen uit de advies-tool op bold700.com. {nieuw} nieuw ·{" "}
          {items.length} totaal.
        </p>

        {!loaded ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium">Leads konden niet geladen worden</p>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Staat er &quot;permission&quot; in? Dan mist de collectie{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                bold700Leads
              </code>{" "}
              in je Firestore-regels. De juiste blokken staan in
              FIRESTORE_RULES.md.
            </p>
          </div>
        ) : sorted.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            Nog geen leads.
          </p>
        ) : (
          <ul className="space-y-3">
            {sorted.map((lead) => (
              <li
                key={lead.id}
                className={cn(
                  "rounded-xl border bg-card",
                  lead.status === "afgevallen" && "opacity-60",
                )}
              >
                <div className="flex items-start gap-3 p-4">
                  <button
                    onClick={() =>
                      setOpenId((o) => (o === lead.id ? null : lead.id))
                    }
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">
                        {lead.name || "Onbekend"}
                      </span>
                      <Badge variant="outline" className="font-normal">
                        {lead.recommendedType || "—"}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {lead.headline}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {lead.email} ·{" "}
                      {new Date(lead.createdAtMs).toLocaleString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </button>
                  <div className="flex shrink-0 items-center gap-1">
                    <a
                      href={`mailto:${lead.email}`}
                      aria-label="Mailen"
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => deleteWebsiteLead(lead.id)}
                      aria-label="Verwijderen"
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        openId === lead.id && "rotate-180",
                      )}
                    />
                  </div>
                </div>

                {openId === lead.id && (
                  <div className="space-y-4 border-t px-4 py-4 text-sm">
                    <div className="flex flex-wrap gap-1.5">
                      {STATUS_ORDER.map((s) => (
                        <button
                          key={s}
                          onClick={() => setWebsiteLeadStatus(lead.id, s)}
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                            lead.status === s
                              ? "border-primary bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:border-primary",
                          )}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>

                    <div>
                      <p className="font-medium">Advies</p>
                      <p className="mt-1 text-muted-foreground">
                        {lead.diagnosis}
                      </p>
                      <ul className="mt-2 list-inside list-disc text-muted-foreground">
                        {lead.advice.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium">Antwoorden</p>
                      <dl className="mt-1 space-y-2">
                        {lead.answers.map((a, i) => (
                          <div key={i}>
                            <dt className="text-muted-foreground">{a.question}</dt>
                            <dd className="font-medium">{a.answer}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <Button asChild size="sm">
                      <a href={`mailto:${lead.email}`}>
                        <Mail className="h-4 w-4" /> Mail {lead.name || "lead"}
                      </a>
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  )
}
