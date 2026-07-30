"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Loader2,
  Megaphone,
  RefreshCw,
  Share2,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { toast } from "sonner"

import { getDb } from "@/lib/firebase"
import type { Project } from "@/lib/types"
import { buildReport } from "@/lib/report"
import { buildActionPlan } from "@/lib/action-plan"
import { translateFindings } from "@/lib/translate"
import { generatePlainActions } from "@/lib/plain-language"
import { rescanProject, scanDiff } from "@/lib/scan"
import { SocialShareDialog } from "@/components/scorecard/social-share"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  const [social, setSocial] = useState(false)
  const [rescanning, setRescanning] = useState(false)
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
  const quickWins = useMemo(
    () => (project ? buildActionPlan(project).quickWins.length : 0),
    [project],
  )
  const diff = useMemo(() => (project ? scanDiff(project) : null), [project])
  const devDone = data
    ? data.issues.filter((f) => devStateOf(devStatus[f.id]) === "done").length
    : 0

  // Vrije review: vertaal (nieuwe) bevindingen naar Engels voor de developer-link.
  const translating = useRef(false)
  useEffect(() => {
    if (!project || project.reviewType !== "free-form" || !data) return
    const tr = project.findingTranslations ?? {}
    const missing = data.issues.some((f) => !tr[f.id]?.title)
    if (!missing || translating.current) return
    translating.current = true
    translateFindings(project)
      .then((res) => {
        if (Object.keys(res).length) {
          setProject((p) => (p ? { ...p, findingTranslations: res } : p))
        }
      })
      .finally(() => {
        translating.current = false
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, data])

  // AI-samenvatting automatisch genereren als die er nog niet is.
  const autoGen = useRef(false)
  useEffect(() => {
    if (!project || !data || genBusy || autoGen.current) return
    if (project.aiPlan) return
    autoGen.current = true
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, data])

  // Verbeterpunten naar gewone taal herschrijven (voor het klant-rapport).
  const plainGen = useRef(false)
  useEffect(() => {
    if (!project || project.reviewType === "free-form" || !data) return
    const plain = project.plainActions ?? {}
    const missing = data.issues.some((f) => !plain[f.id])
    if (!missing || plainGen.current) return
    plainGen.current = true
    generatePlainActions(project)
      .then((res) => {
        if (Object.keys(res).length) {
          setProject((p) => (p ? { ...p, plainActions: res } : p))
        }
      })
      .finally(() => {
        plainGen.current = false
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, data])

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

      // Vrije review: (opnieuw) vertalen zodat ook nieuwe bevindingen meegaan.
      if (project.reviewType === "free-form") {
        const tr = await translateFindings(project)
        if (Object.keys(tr).length) {
          setProject((p) => (p ? { ...p, findingTranslations: tr } : p))
        }
      }
    } catch (e) {
      toast.error("Delen mislukt", {
        description: e instanceof Error ? e.message : undefined,
      })
    }
  }

  async function rescan() {
    if (!project || project.reviewType === "free-form") return
    setRescanning(true)
    const t = toast.loading("Herscan — pagina ophalen en beoordelen…")
    try {
      const newId = await rescanProject(project, (d, total) =>
        toast.loading(
          total > 1
            ? `Beoordeelt deel ${Math.min(d + 1, total)}/${total}…`
            : "Beoordeelt…",
          { id: t },
        ),
      )
      toast.success("Herscan klaar", { id: t })
      router.push(`/review/${newId}/scorecard`)
    } catch (e) {
      toast.error("Herscan mislukt", {
        id: t,
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setRescanning(false)
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
            {project.reviewType !== "free-form" && (
              <Button
                variant="outline"
                size="sm"
                onClick={rescan}
                disabled={rescanning}
                title="Opnieuw scannen en met deze vergelijken"
              >
                {rescanning ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-1 h-4 w-4" />
                )}
                Herscan
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  <Share2 className="mr-1 h-4 w-4" /> Deel
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={publish}>
                  <Share2 className="mr-2 h-4 w-4" /> Deel link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSocial(true)}>
                  <Megaphone className="mr-2 h-4 w-4" /> Social (LinkedIn)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.print()}>
                  <FileText className="mr-2 h-4 w-4" /> PDF / print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      >
        <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Voor/na-vergelijking (herscan) */}
        {diff && project.previousScore != null && (
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="py-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <RefreshCw className="h-4 w-4 text-primary" /> Vergelijking met de
                vorige scan
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground">
                      {project.previousScore.toFixed(1)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      vorige
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="text-center">
                    <div
                      className={cn(
                        "text-3xl font-bold",
                        scoreColor[scoreTone(data.score)],
                      )}
                    >
                      {data.score == null ? "—" : data.score.toFixed(1)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">nu</div>
                  </div>
                </div>
                {diff.delta != null && (
                  <div
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold",
                      diff.delta >= 0
                        ? "bg-emerald-500/15 text-emerald-500"
                        : "bg-red-500/15 text-red-500",
                    )}
                  >
                    {diff.delta >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {diff.delta >= 0 ? "+" : ""}
                    {diff.delta.toFixed(1)}
                  </div>
                )}
                <div className="ml-auto text-sm">
                  <span className="font-medium text-emerald-500">
                    {diff.improved} verbeterd
                  </span>
                  {diff.worsened > 0 && (
                    <span className="text-red-500">
                      {" "}
                      · {diff.worsened} verslechterd
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    {" "}
                    · {diff.same} gelijk
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stat-tegels (score staat in de samenvatting hieronder) */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <Stat
            label="Verbeterpunten"
            value={data.issues.length}
            sub={
              data.issues.length
                ? `${devDone}/${data.issues.length} verwerkt door dev`
                : undefined
            }
          />
          <Stat
            label="Quick wins"
            value={quickWins}
            className="text-emerald-500"
          />
          <Stat label="Sterke punten" value={data.strengths.length} />
        </div>

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

      {social && (
        <SocialShareDialog
          project={project}
          data={data}
          onClose={() => setSocial(false)}
        />
      )}
    </>
  )
}

function Stat({
  label,
  value,
  className,
  sub,
}: {
  label: string
  value: string | number
  className?: string
  sub?: string
}) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className={cn("text-2xl font-bold", className)}>{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
        {sub && (
          <div className="mt-0.5 text-[11px] text-emerald-500">{sub}</div>
        )}
      </CardContent>
    </Card>
  )
}
