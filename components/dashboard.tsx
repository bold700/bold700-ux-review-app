"use client"

import { useEffect, useMemo, useState } from "react"
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { LogOut } from "lucide-react"

import { getDb } from "@/lib/firebase"
import type { Project } from "@/lib/types"
import { projectScore, scoreTone } from "@/lib/score"
import { useAuth } from "@/components/providers/auth-provider"
import { BrandLogo } from "@/components/brand-logo"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

const toneClass: Record<string, string> = {
  good: "text-emerald-500",
  ok: "text-amber-500",
  bad: "text-red-500",
  na: "text-muted-foreground",
}

export function Dashboard() {
  const { user, role, logout } = useAuth()
  const [projects, setProjects] = useState<Project[] | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!user) return
      try {
        const col = collection(getDb(), "projects")
        const q =
          role === "admin"
            ? query(col, orderBy("createdAt", "desc"))
            : query(col, where("userId", "==", user.uid))
        const snap = await getDocs(q)
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
    const done = list.filter((p) => {
      const ans = p.answers ?? {}
      const total = Object.keys(ans).length
      return total > 0 && Object.values(ans).every((a) => a.score)
    }).length
    return { total: list.length, done }
  }, [projects])

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2">
            <BrandLogo className="h-6 w-auto" />
            <span className="text-sm font-semibold">UX Review Platform</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {(user?.email ?? "?").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="max-w-[220px] truncate font-normal">
                {user?.email}
                {role ? ` · ${role}` : ""}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" /> Uitloggen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Projecten" value={projects ? stats.total : null} />
          <StatCard label="Afgerond" value={projects ? stats.done : null} />
        </div>

        <h2 className="mb-4 text-lg font-semibold">Projecten</h2>
        {!projects ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Nog geen projecten gevonden.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const score = projectScore(p)
              const tone = scoreTone(score)
              return (
                <Card key={p.id} className="transition-colors hover:border-ring">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="truncate text-base">
                        {p.name || p.url || "Naamloos project"}
                      </CardTitle>
                      <span className={`text-lg font-bold ${toneClass[tone]}`}>
                        {score == null ? "—" : score.toFixed(1)}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.url}
                    </p>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    {p.reviewType === "free-form" ? (
                      <Badge variant="secondary">Vrije review</Badge>
                    ) : p.selectedTemplate ? (
                      <Badge variant="secondary">Quick Scan</Badge>
                    ) : (
                      <Badge variant="outline">Audit</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
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
      </main>
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
