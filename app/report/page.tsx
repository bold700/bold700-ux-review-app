"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { doc, onSnapshot } from "firebase/firestore"
import { Clock, ListChecks, Loader2, Lock, SearchX } from "lucide-react"
import { toast } from "sonner"

import { getDb } from "@/lib/firebase"
import type { Project } from "@/lib/types"
import { buildReport } from "@/lib/report"
import {
  saveDevStatus,
  notifyDevEvent,
  devStateOf,
  type DevEntry,
  type DevStatusMap,
} from "@/lib/dev-status"
import { buildDevItems } from "@/lib/dev-items"
import { BrandLogo } from "@/components/brand-logo"
import { ReportView } from "@/components/report/report-view"
import { DevChecklist } from "@/components/report/dev-checklist"
import { Button } from "@/components/ui/button"

type Status = "loading" | "ok" | "notfound" | "private" | "expired" | "error"

function ReportContent() {
  const params = useSearchParams()
  const id = params.get("id")
  const devView = params.get("dev") === "1"
  const [status, setStatus] = useState<Status>("loading")
  const [project, setProject] = useState<Project | null>(null)
  const [devStatus, setDevStatus] = useState<DevStatusMap>({})
  const devInited = useRef(false)

  useEffect(() => {
    if (!id) {
      setStatus("notfound")
      return
    }
    // Live meeluisteren: nieuwe/aangepaste bevindingen verschijnen direct.
    const unsub = onSnapshot(
      doc(getDb(), "projects", id),
      (snap) => {
        if (!snap.exists()) return setStatus("notfound")
        const p = { id: snap.id, ...snap.data() } as Project
        if (!p.public) return setStatus("private")
        if (p.shareExpiresAtMs && Date.now() > p.shareExpiresAtMs)
          return setStatus("expired")
        setProject(p)
        // devStatus alleen bij de eerste keer overnemen, daarna lokaal
        // beheren zodat het afvinken door de developer niet wordt overschreven.
        if (!devInited.current) {
          setDevStatus(p.devStatus ?? {})
          devInited.current = true
        }
        setStatus("ok")
      },
      () => setStatus("error"),
    )
    return () => unsub()
  }, [id])

  async function devUpdate(findingId: string, entry: DevEntry) {
    if (!id) return
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

      // Kenny op de hoogte stellen bij vraag / notitie / alles verwerkt.
      if (project) {
        const items = buildDevItems(project)
        const title =
          items.find((x) => x.id === findingId)?.fix ||
          items.find((x) => x.id === findingId)?.title ||
          ""
        const base = {
          projectName: project.name ?? project.url ?? "",
          url: project.url ?? "",
          reportUrl: `${location.origin}/report?id=${encodeURIComponent(id)}`,
          findingTitle: title,
        }
        const newStatus = entry.status ?? "open"
        const noteChanged =
          (entry.note ?? "").trim() && (entry.note ?? "") !== (prev[findingId]?.note ?? "")

        if (newStatus === "question" && devStateOf(prev[findingId]) !== "question") {
          notifyDevEvent({ type: "question", text: entry.note, ...base })
        } else if (noteChanged) {
          notifyDevEvent({ type: "note", text: entry.note, ...base })
        }

        const next = { ...prev, [findingId]: merged }
        if (
          items.length > 0 &&
          items.every((it) => devStateOf(next[it.id]) === "done")
        ) {
          notifyDevEvent({ type: "all-done", ...base })
        }
      }
    } catch {
      setDevStatus(prev)
      toast.error("Kon status niet opslaan", {
        description: "Mogelijk zijn de rechten nog niet ingesteld.",
      })
    }
  }

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="flex items-center justify-between gap-4 border-b bg-background px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BrandLogo className="h-6 w-auto" /> UX Review
        </Link>
        {!devView && (
          <Button size="sm" onClick={() => (location.href = "/")}>
            Zelf een review doen →
          </Button>
        )}
      </header>

      {status === "loading" && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {status === "ok" && project && devView && (
        <main className="mx-auto max-w-2xl px-4 py-8">
          <div className="mb-4 flex items-start gap-3 rounded-xl border bg-background p-4 text-sm shadow-sm">
            <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <div className="font-medium">Developer checklist</div>
              <p className="text-muted-foreground">
                Only the action items. Check off what you shipped, flag anything
                unclear, and leave a note. The reviewer sees it live — no login.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
            <DevChecklist
              project={project}
              devStatus={devStatus}
              onDevUpdate={devUpdate}
            />
          </div>
        </main>
      )}

      {status === "ok" && project && !devView && (
        <main className="mx-auto max-w-2xl px-4 py-8">
          <div className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
            <ReportView
              project={project}
              data={buildReport(project)}
              aiPlan={project.aiPlan}
            />
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Dit rapport is live op het BOLD700-platform en altijd actueel.
          </p>
        </main>
      )}

      {status !== "loading" && status !== "ok" && (
        <StateMsg status={status} />
      )}
    </div>
  )
}

function StateMsg({ status }: { status: Status }) {
  const map: Record<string, { icon: React.ReactNode; title: string; msg: string }> = {
    notfound: {
      icon: <SearchX className="h-10 w-10" />,
      title: "Rapport niet gevonden",
      msg: "Dit rapport bestaat niet of is verwijderd.",
    },
    private: {
      icon: <Lock className="h-10 w-10" />,
      title: "Rapport niet gedeeld",
      msg: "De eigenaar heeft dit rapport (nog) niet openbaar gemaakt.",
    },
    expired: {
      icon: <Clock className="h-10 w-10" />,
      title: "Deellink verlopen",
      msg: "De deelperiode is voorbij. Vraag de eigenaar om een nieuwe link.",
    },
    error: {
      icon: <Clock className="h-10 w-10" />,
      title: "Rapport niet (meer) beschikbaar",
      msg: "De deellink is mogelijk verlopen of ingetrokken.",
    },
  }
  const s = map[status] ?? map.error
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 px-4 text-center text-muted-foreground">
      {s.icon}
      <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
      <p className="text-sm">{s.msg}</p>
      <Button className="mt-2" onClick={() => (location.href = "/")}>
        Naar het platform →
      </Button>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  )
}
