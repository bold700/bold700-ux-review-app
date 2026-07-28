"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ExternalLink, Loader2, MessageSquare, RefreshCw } from "lucide-react"
import { toast } from "sonner"

import {
  fetchLeads,
  updateLead,
  runLeadScan,
  FOLLOWUP_LABELS,
  SCAN_LABELS,
  type Lead,
  type LeadFollowUp,
  type ScanStatus,
} from "@/lib/leads"
import { scoreTone } from "@/lib/score"
import { useAuth } from "@/components/providers/auth-provider"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const toneClass: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

const scanClass: Record<ScanStatus, string> = {
  queued: "bg-muted text-muted-foreground",
  scanning: "bg-blue-500/15 text-blue-500",
  done: "bg-emerald-500/15 text-emerald-500",
  failed: "bg-red-500/15 text-red-500",
  sent: "bg-primary/15 text-primary",
}

const FOLLOWUPS: LeadFollowUp[] = [
  "nieuw",
  "opgevolgd",
  "gesprek",
  "klant",
  "afgevallen",
]

// Actie nodig: nog niet opgevolgd (nieuw), of scan verstuurd zonder opvolging.
function needsAction(l: Lead) {
  return l.status === "nieuw"
}

export function LeadsDashboard() {
  const router = useRouter()
  const { user, role } = useAuth()
  const [leads, setLeads] = useState<Lead[] | null>(null)
  const [noteLead, setNoteLead] = useState<Lead | null>(null)

  async function load() {
    try {
      setLeads(await fetchLeads())
    } catch (e) {
      console.error("[leads] load", e)
      setLeads([])
    }
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  const sorted = useMemo(() => {
    const list = [...(leads ?? [])]
    return list.sort((a, b) => {
      const aa = needsAction(a) ? 0 : 1
      const bb = needsAction(b) ? 0 : 1
      if (aa !== bb) return aa - bb
      return (b.createdAtMs ?? 0) - (a.createdAtMs ?? 0)
    })
  }, [leads])

  const stats = useMemo(() => {
    const list = leads ?? []
    return {
      total: list.length,
      action: list.filter(needsAction).length,
      klant: list.filter((l) => l.status === "klant").length,
    }
  }, [leads])

  async function setStatus(l: Lead, status: LeadFollowUp) {
    setLeads((prev) =>
      (prev ?? []).map((x) => (x.id === l.id ? { ...x, status } : x)),
    )
    try {
      await updateLead(l.id, { status })
    } catch {
      toast.error("Opslaan mislukt")
      load()
    }
  }

  async function rescan(l: Lead) {
    if (!user) return
    toast.info("Scan opnieuw gestart")
    await runLeadScan({ ...l }, l.userId ?? user.uid)
    load()
  }

  if (role !== "admin") {
    return (
      <AppShell title="Leads">
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          Alleen voor beheerders.
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell
      title="Leads"
      actions={
        <Button size="sm" variant="outline" onClick={load}>
          <RefreshCw className="mr-1 h-4 w-4" /> Vernieuwen
        </Button>
      }
    >
      <div className="px-4 py-6 sm:py-8 lg:px-6">
        <div className="mb-6 grid grid-cols-3 gap-4 sm:max-w-lg">
          <Stat label="Leads" value={leads ? stats.total : null} />
          <Stat
            label="Actie nodig"
            value={leads ? stats.action : null}
            className="text-primary"
          />
          <Stat
            label="Klant"
            value={leads ? stats.klant : null}
            className="text-emerald-500"
          />
        </div>

        {!leads ? (
          <Skeleton className="h-64 w-full rounded-xl" />
        ) : sorted.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Nog geen leads. Aanmeldingen via de landingspagina verschijnen hier.
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naam</TableHead>
                  <TableHead className="hidden md:table-cell">E-mail</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Aangevraagd
                  </TableHead>
                  <TableHead>Scan</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Noot</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((l) => (
                  <TableRow
                    key={l.id}
                    className={cn(needsAction(l) && "bg-primary/5")}
                  >
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      <a href={`mailto:${l.email}`} className="hover:underline">
                        {l.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-[160px] truncate">
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground hover:underline"
                      >
                        {l.url.replace(/^https?:\/\//, "")}
                      </a>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {new Date(l.createdAtMs).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-[10px]", scanClass[l.scanStatus])}>
                        {l.scanStatus === "scanning" && (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        )}
                        {SCAN_LABELS[l.scanStatus]}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-bold tabular-nums",
                        toneClass[scoreTone(l.score ?? null)],
                      )}
                    >
                      {l.score == null ? "—" : l.score.toFixed(1)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-full border px-2.5 py-1 text-xs font-medium hover:bg-muted">
                            {FOLLOWUP_LABELS[l.status]}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {FOLLOWUPS.map((s) => (
                            <DropdownMenuItem
                              key={s}
                              onClick={() => setStatus(l, s)}
                            >
                              {FOLLOWUP_LABELS[s]}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          l.note
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                        onClick={() => setNoteLead(l)}
                        aria-label="Persoonlijke noot"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {l.projectId ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => router.push(`/review/${l.projectId}/scorecard`)}
                          aria-label="Bekijk rapport"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      ) : l.scanStatus === "failed" ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => rescan(l)}
                          aria-label="Opnieuw scannen"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <NoteDialog
        lead={noteLead}
        onClose={() => setNoteLead(null)}
        onSaved={(id, note) => {
          setLeads((prev) =>
            (prev ?? []).map((x) => (x.id === id ? { ...x, note } : x)),
          )
        }}
      />
    </AppShell>
  )
}

function NoteDialog({
  lead,
  onClose,
  onSaved,
}: {
  lead: Lead | null
  onClose: () => void
  onSaved: (id: string, note: string) => void
}) {
  const [note, setNote] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setNote(lead?.note ?? "")
  }, [lead])

  async function save() {
    if (!lead) return
    setBusy(true)
    try {
      await updateLead(lead.id, { note })
      onSaved(lead.id, note)
      onClose()
    } catch {
      toast.error("Opslaan mislukt")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog open={!!lead} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Persoonlijke noot</DialogTitle>
          <DialogDescription>
            Deze regel wordt persoonlijk meegenomen in de scan-mail naar{" "}
            {lead?.name}. Laat leeg voor de neutrale standaardmail.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Bijv. 'Leuke site, vooral je casestudies vielen me op — één ding dat je conversie flink kan helpen…'"
          className="min-h-28"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={busy}>
            Annuleren
          </Button>
          <Button onClick={save} disabled={busy}>
            {busy ? "Opslaan…" : "Opslaan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Stat({
  label,
  value,
  className,
}: {
  label: string
  value: number | null
  className?: string
}) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className={cn("text-2xl font-bold", className)}>
          {value == null ? <Skeleton className="h-7 w-10" /> : value}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}
