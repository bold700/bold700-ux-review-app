"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { Plus, Search } from "lucide-react"

import { getDb } from "@/lib/firebase"
import type { Project } from "@/lib/types"
import { projectScore, scoreTone } from "@/lib/score"
import { normalizeUrl } from "@/lib/url"
import { useAuth } from "@/components/providers/auth-provider"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const toneClass: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

type Sort = "recent" | "score" | "name"
type StatusFilter = "all" | "open" | "done"

function isDone(p: Project) {
  const ans = p.answers ?? {}
  const total = Object.keys(ans).length
  return total > 0 && Object.values(ans).every((a) => a.score)
}

export function Dashboard() {
  const { user, role } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [q, setQ] = useState("")
  const [sort, setSort] = useState<Sort>("recent")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!user) return
      try {
        const col = collection(getDb(), "projects")
        const qy =
          role === "admin"
            ? query(col, orderBy("createdAt", "desc"))
            : query(col, where("userId", "==", user.uid))
        const snap = await getDocs(qy)
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project)
        if (!cancelled) setProjects(rows)
      } catch (e) {
        console.error("[dashboard] load", e)
        if (!cancelled) setProjects([])
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user, role])

  const stats = useMemo(() => {
    const list = projects ?? []
    return { total: list.length, done: list.filter(isDone).length }
  }, [projects])

  const visible = useMemo(() => {
    let list = projects ?? []
    const term = q.trim().toLowerCase()
    if (term) {
      list = list.filter(
        (p) =>
          (p.name ?? "").toLowerCase().includes(term) ||
          (p.url ?? "").toLowerCase().includes(term) ||
          normalizeUrl(p.url ?? "").includes(term),
      )
    }
    if (statusFilter !== "all") {
      list = list.filter((p) =>
        statusFilter === "done" ? isDone(p) : !isDone(p),
      )
    }
    const sorted = [...list]
    if (sort === "recent") {
      sorted.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    } else if (sort === "score") {
      sorted.sort((a, b) => (projectScore(b) ?? -1) - (projectScore(a) ?? -1))
    } else {
      sorted.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
    }
    return sorted
  }, [projects, q, sort, statusFilter])

  return (
    <AppShell
      title="Dashboard"
      actions={
        <Button size="sm" onClick={() => router.push("/new")}>
          <Plus className="mr-1 h-4 w-4" /> Nieuw project
        </Button>
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Projecten" value={projects ? stats.total : null} />
          <StatCard label="Afgerond" value={projects ? stats.done : null} />
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:max-w-xs">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Zoek project of URL…"
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <SegGroup
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { v: "all", label: "Alle" },
                { v: "open", label: "Open" },
                { v: "done", label: "Afgerond" },
              ]}
            />
            <SegGroup
              value={sort}
              onChange={setSort}
              options={[
                { v: "recent", label: "Recent" },
                { v: "score", label: "Score" },
                { v: "name", label: "Naam" },
              ]}
            />
          </div>
        </div>

        {!projects ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/new"
              className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
            >
              <Plus className="h-6 w-6" />
              <span className="text-sm font-medium">Nieuw project</span>
            </Link>

            {visible.length === 0 && (
              <Card className="sm:col-span-2">
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  Geen projecten gevonden.
                </CardContent>
              </Card>
            )}

            {visible.map((p) => {
              const score = projectScore(p)
              const tone = scoreTone(score)
              const done = isDone(p)
              return (
                <Card
                  key={p.id}
                  onClick={() => router.push(`/review/${p.id}`)}
                  className="flex cursor-pointer flex-col justify-between transition-colors hover:border-ring"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="truncate text-base">
                        {p.name || p.url || "Naamloos project"}
                      </CardTitle>
                      <span className={cn("text-lg font-bold", toneClass[tone])}>
                        {score == null ? "—" : score.toFixed(1)}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.url}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center gap-2">
                    {p.reviewType === "free-form" ? (
                      <Badge variant="secondary">Vrije review</Badge>
                    ) : p.selectedTemplate ? (
                      <Badge variant="secondary">Quick Scan</Badge>
                    ) : (
                      <Badge variant="outline">Audit</Badge>
                    )}
                    {done && (
                      <Badge className="bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/15">
                        Afgerond
                      </Badge>
                    )}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString("nl-NL")
                        : ""}
                    </span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </AppShell>
  )
}

function SegGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (v: T) => void
  options: { v: T; label: string }[]
}) {
  return (
    <div className="inline-flex rounded-lg border p-0.5">
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            value === o.v
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number | null }) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="text-2xl font-bold">
          {value == null ? <Skeleton className="h-7 w-10" /> : value}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}
