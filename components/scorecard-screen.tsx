"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Loader2,
  Share2,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

import { getDb } from "@/lib/firebase"
import type { Project } from "@/lib/types"
import { buildReport } from "@/lib/report"
import {
  devStateOf,
  saveDevStatus,
  type DevEntry,
  type DevStatusMap,
} from "@/lib/dev-status"
import { generateActionPlan } from "@/lib/ai"
import { scoreTone } from "@/lib/score"
import { AppShell } from "@/components/app-shell"
import { ReportView } from "@/components/report/report-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const scoreColor: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

export function ScorecardScreen({ id }: { id: string }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null | undefined>(undefined)
  const [genBusy, setGenBusy] = useState(false)
  const [shareLink, setShareLink] = useState<string | null>(null)
  const [devStatus, setDevStatus] = useState<DevStatusMap>({})

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const snap = await getDoc(doc(getDb(), "projects", id))
        if (!cancelled) {
          const p = snap.exists()
            ? ({ id: snap.id, ...snap.data() } as Project)
            : null
          setProject(p)
          setDevStatus(p?.devStatus ?? {})
        }
      } catch {
        if (!cancelled) setProject(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  const data = useMemo(() => (project ? buildReport(project) : null), [project])
  const devDone = data
    ? data.issues.filter((f) => devStateOf(devStatus[f.id]) === "done").length
    : 0

  async function devUpdate(findingId: string, entry: DevEntry) {
    const prev = devStatus
    const merged: DevEntry = {
      status: entry.status ?? "open",
      done: (entry.status ?? "open") === "done",
      note: entry.note ?? "",
      at: new Date().toISOString(),
    }
    setDevStatus((s) => ({ ...s, [findingId]: merged }))
    try {
      await saveDevStatus(id, findingId, entry)
    } catch (e) {
      setDevStatus(prev)
      toast.error("Kon status niet opslaan", {
        description: e instanceof Error ? e.message : undefined,
      })
    }
  }

  async function generate() {
    if (!project || !data) return
    setGenBusy(true)
    try {
      const plan = await generateActionPlan(project, data)
      if (!plan) throw new Error("Geen resultaat ontvangen")
      await updateDoc(doc(getDb(), "projects", id), {
        aiPlan: plan,
        aiPlanDate: new Date().toISOString(),
      })
      setProject((p) => (p ? { ...p, aiPlan: plan } : p))
      toast.success("AI-actieplan gegenereerd")
    } catch (e) {
      toast.error("AI-actieplan mislukt", {
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setGenBusy(false)
    }
  }

  async function publish() {
    if (!project) return
    const exp = Date.now() + 7 * 24 * 60 * 60 * 1000
    try {
      await updateDoc(doc(getDb(), "projects", id), {
        public: true,
        sharedAt: new Date().toISOString(),
        shareExpiresAtMs: exp,
      })
      setProject((p) => (p ? { ...p, public: true, shareExpiresAtMs: exp } : p))
      const link = `${location.origin}/report?id=${encodeURIComponent(id)}`
      await navigator.clipboard.writeText(link).catch(() => {})
      setShareLink(link)
    } catch (e) {
      toast.error("Delen mislukt", {
        description: e instanceof Error ? e.message : undefined,
      })
    }
  }

  async function unpublish() {
    if (!project) return
    await updateDoc(doc(getDb(), "projects", id), { public: false })
    setProject((p) => (p ? { ...p, public: false } : p))
    setShareLink(null)
    toast.success("Delen gestopt")
  }

  if (project === undefined) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }
  if (project === null || !data) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-muted-foreground">Review niet gevonden.</p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Terug
        </Button>
      </div>
    )
  }

  return (
    <>
      <AppShell
        title="Resultaten"
        actions={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/review/${id}`)}
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Review
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <FileText className="mr-1 h-4 w-4" /> PDF
            </Button>
            <Button size="sm" onClick={publish}>
              <Share2 className="mr-1 h-4 w-4" /> Deel link
            </Button>
          </>
        }
      >
        <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Stat-tegels */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            label="Totaalscore"
            value={data.score == null ? "—" : data.score.toFixed(1)}
            className={scoreColor[scoreTone(data.score)]}
          />
          <Stat label="Verbeterpunten" value={data.issues.length} />
          <Stat
            label="Verwerkt door dev"
            value={
              data.issues.length ? `${devDone}/${data.issues.length}` : "—"
            }
            className="text-emerald-500"
          />
          <Stat label="Sterke punten" value={data.strengths.length} />
        </div>

        {/* AI-samenvatting (optioneel, naast het vaste actieplan hieronder) */}
        <Card className="mb-6 print:hidden">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">AI-samenvatting</span>
              <span className="text-muted-foreground">
                — optionele klantgerichte tekst bovenop het actieplan
              </span>
            </div>
            <Button onClick={generate} disabled={genBusy} size="sm" variant="outline">
              {genBusy ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Genereren…
                </>
              ) : project.aiPlan ? (
                "Opnieuw genereren"
              ) : (
                "Genereer AI-samenvatting"
              )}
            </Button>
          </CardContent>
        </Card>

        <ReportView
          project={project}
          data={data}
          aiPlan={project.aiPlan}
          devStatus={devStatus}
          onDevUpdate={devUpdate}
        />
        </div>
      </AppShell>

      {/* Deel-venster */}
      {shareLink && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setShareLink(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 print:hidden"
        >
          <Card className="w-full max-w-md">
            <CardContent className="space-y-4 py-5">
              <div className="flex items-center gap-2 font-semibold">
                <Share2 className="h-4 w-4 text-emerald-500" /> Rapport gedeeld
              </div>
              <p className="text-sm text-muted-foreground">
                Twee links, beide zonder login en 7 dagen geldig. Wijzigingen van
                de developer zie je hier live terug.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Klant / volledig rapport (NL)
                </label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={shareLink}
                    onClick={(e) => e.currentTarget.select()}
                    className="flex-1 rounded-md border bg-muted px-3 py-2 font-mono text-xs"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(shareLink)
                      toast.success("Link gekopieerd")
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Developer — alleen actiepunten (EN)
                </label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={`${shareLink}&dev=1`}
                    onClick={(e) => e.currentTarget.select()}
                    className="flex-1 rounded-md border bg-muted px-3 py-2 font-mono text-xs"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`${shareLink}&dev=1`)
                      toast.success("Developer-link gekopieerd")
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(shareLink, "_blank")}
                >
                  <ExternalLink className="mr-1 h-4 w-4" /> Openen
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                    onClick={unpublish}
                  >
                    Stop met delen
                  </Button>
                  <Button size="sm" onClick={() => setShareLink(null)}>
                    <Check className="mr-1 h-4 w-4" /> Klaar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

function Stat({
  label,
  value,
  className,
}: {
  label: string
  value: string | number
  className?: string
}) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className={cn("text-2xl font-bold", className)}>{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}
