"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { Clock, Loader2, Lock, SearchX } from "lucide-react"

import { getDb } from "@/lib/firebase"
import type { Project } from "@/lib/types"
import { buildReport } from "@/lib/report"
import { BrandLogo } from "@/components/brand-logo"
import { ReportView } from "@/components/report/report-view"
import { Button } from "@/components/ui/button"

type Status = "loading" | "ok" | "notfound" | "private" | "expired" | "error"

function ReportContent() {
  const id = useSearchParams().get("id")
  const [status, setStatus] = useState<Status>("loading")
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!id) {
      setStatus("notfound")
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const snap = await getDoc(doc(getDb(), "projects", id))
        if (cancelled) return
        if (!snap.exists()) return setStatus("notfound")
        const p = { id: snap.id, ...snap.data() } as Project
        if (!p.public) return setStatus("private")
        if (p.shareExpiresAtMs && Date.now() > p.shareExpiresAtMs)
          return setStatus("expired")
        setProject(p)
        setStatus("ok")
      } catch {
        if (!cancelled) setStatus("error")
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="flex items-center justify-between gap-4 border-b bg-background px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BrandLogo className="h-6 w-auto" /> UX Review
        </Link>
        <Button size="sm" onClick={() => (location.href = "/")}>
          Zelf een review doen →
        </Button>
      </header>

      {status === "loading" && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {status === "ok" && project && (
        <main className="mx-auto max-w-2xl px-4 py-8">
          <div className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
            <ReportView project={project} data={buildReport(project)} aiPlan={project.aiPlan} />
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
