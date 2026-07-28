"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import {
  ArrowLeft,
  Globe,
  LayoutGrid,
  Plus,
  Search,
  Table as TableIcon,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import { getDb } from "@/lib/firebase"
import { MODULE_REGISTRY } from "@/lib/modules"
import type { Project } from "@/lib/types"
import { projectScore, scoreTone } from "@/lib/score"
import { normalizeUrl } from "@/lib/url"
import { useAuth } from "@/components/providers/auth-provider"
import { AppShell } from "@/components/app-shell"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

function isStarted(p: Project) {
  const ans = p.answers ?? {}
  return Object.values(ans).some((a) => a.score)
}

function statusOf(p: Project): { label: string; tone: string } {
  if (isDone(p)) return { label: "Afgerond", tone: "done" }
  if (isStarted(p)) return { label: "Bezig", tone: "busy" }
  return { label: "Niet gestart", tone: "idle" }
}

function typeLabel(p: Project): string {
  if (p.reviewType === "free-form") return "Vrije Review"
  if (p.selectedTemplate) {
    const b = MODULE_REGISTRY.bundles[p.selectedTemplate]
    return (b?.name_nl ?? "Quick Scan").replace(" Quick Scan", "")
  }
  return "Volledige Audit"
}

function domainOf(p: Project) {
  return normalizeUrl(p.url ?? "") || "onbekend"
}

export function Dashboard() {
  const { user, role } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [q, setQ] = useState("")
  const [sort, setSort] = useState<Sort>("recent")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [view, setView] = useState<"cards" | "table">("cards")
  const [openDomain, setOpenDomain] = useState<string | null>(null)
  const [toDelete, setToDelete] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState(false)

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

  async function confirmDelete() {
    if (!toDelete) return
    setDeleting(true)
    try {
      await deleteDoc(doc(getDb(), "projects", toDelete.id))
      setProjects((prev) => (prev ?? []).filter((p) => p.id !== toDelete.id))
      toast.success("Review verwijderd", {
        description: toDelete.name || toDelete.url || undefined,
      })
      setToDelete(null)
    } catch (e) {
      console.error("[dashboard] delete", e)
      toast.error("Verwijderen mislukt", {
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setDeleting(false)
    }
  }

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

  // Groepeer per domein — één kaart per domein
  const groups = useMemo(() => {
    const map = new Map<string, Project[]>()
    for (const p of visible) {
      const d = domainOf(p)
      if (!map.has(d)) map.set(d, [])
      map.get(d)!.push(p)
    }
    return [...map.entries()].sort((a, b) => {
      if (b[1].length !== a[1].length) return b[1].length - a[1].length
      return (b[1][0]?.createdAt ?? "").localeCompare(a[1][0]?.createdAt ?? "")
    })
  }, [visible])

  // Reviews binnen het geopende domein (los van filters, altijd recent)
  const openItems = useMemo(() => {
    if (!openDomain) return []
    return (projects ?? [])
      .filter((p) => domainOf(p) === openDomain)
      .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
  }, [projects, openDomain])

  const detail = openDomain != null

  return (
    <AppShell
      title={detail ? openDomain! : "Dashboard"}
      actions={
        detail ? (
          <Button size="sm" onClick={() => router.push("/new")}>
            <Plus className="mr-1 h-4 w-4" /> Nieuwe scan
          </Button>
        ) : (
          <Button size="sm" onClick={() => router.push("/new")}>
            <Plus className="mr-1 h-4 w-4" /> Nieuw project
          </Button>
        )
      }
    >
      <div className="px-4 py-6 sm:py-8 lg:px-6">
        {detail ? (
          <DomainDetail
            domain={openDomain!}
            items={openItems}
            onBack={() => setOpenDomain(null)}
            onOpen={(id) => router.push(`/review/${id}`)}
            onDelete={setToDelete}
          />
        ) : (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:max-w-md">
              <StatCard label="Reviews" value={projects ? stats.total : null} />
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
                <div className="ml-1 inline-flex rounded-lg border p-0.5">
                  <button
                    onClick={() => setView("cards")}
                    aria-label="Kaarten"
                    className={cn(
                      "rounded-md p-1.5 transition-colors",
                      view === "cards"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setView("table")}
                    aria-label="Tabel"
                    className={cn(
                      "rounded-md p-1.5 transition-colors",
                      view === "table"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <TableIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {!projects ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-56 rounded-xl" />
                ))}
              </div>
            ) : groups.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  Geen projecten gevonden.
                </CardContent>
              </Card>
            ) : view === "table" ? (
              <ProjectsTable
                rows={visible}
                showDomain
                onOpen={(id) => router.push(`/review/${id}`)}
                onDelete={setToDelete}
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groups.map(([domain, items]) => (
                  <DomainCard
                    key={domain}
                    domain={domain}
                    items={items}
                    onOpen={() => setOpenDomain(domain)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <AlertDialog
        open={toDelete != null}
        onOpenChange={(o) => !o && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Review verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{toDelete?.name || toDelete?.url}&rdquo; wordt permanent
              verwijderd. Dit kan niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                confirmDelete()
              }}
              disabled={deleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting ? "Verwijderen…" : "Verwijderen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  )
}

function DomainCard({
  domain,
  items,
  onOpen,
}: {
  domain: string
  items: Project[]
  onOpen: () => void
}) {
  const scores = items
    .map((p) => projectScore(p))
    .filter((s): s is number => s != null)
  const avg = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : null
  const done = items.filter(isDone).length
  const active = items.length - done
  const users = new Set(items.map((p) => p.userId ?? "")).size
  const last = items
    .map((p) => p.createdAt ?? "")
    .sort()
    .at(-1)

  // type-chips met counts
  const counts = new Map<string, number>()
  for (const p of items) {
    const l = typeLabel(p)
    counts.set(l, (counts.get(l) ?? 0) + 1)
  }
  const chips = [...counts.entries()].sort((a, b) => b[1] - a[1])

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      className="flex cursor-pointer flex-col gap-0 py-0 outline-none transition-colors hover:border-ring focus-visible:border-ring"
    >
      <CardHeader className="gap-0 border-b p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate font-semibold">{domain}</span>
          </div>
          <Badge className="shrink-0 rounded-full">{items.length}</Badge>
        </div>
        <p className="mt-0.5 pl-6 text-xs text-muted-foreground">
          {items.length} review{items.length !== 1 ? "s" : ""} · {users}{" "}
          gebruiker{users !== 1 ? "s" : ""}
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          <Stat
            value={avg == null ? "—" : avg.toFixed(1)}
            label="gem. score"
            tone={avg == null ? undefined : toneClass[scoreTone(avg)]}
          />
          <Stat value={done} label="afgerond" tone="text-emerald-500" />
          <Stat value={active} label="actief" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {chips.map(([label, n]) => (
            <Badge key={label} variant="secondary" className="font-normal">
              {label}
              {n > 1 ? ` ×${n}` : ""}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-1 text-xs">
          <span className="text-muted-foreground">
            {last ? `Laatste: ${new Date(last).toLocaleDateString("nl-NL")}` : ""}
          </span>
          <span className="font-medium text-primary">Bekijk reviews →</span>
        </div>
      </CardContent>
    </Card>
  )
}

function Stat({
  value,
  label,
  tone,
}: {
  value: React.ReactNode
  label: string
  tone?: string
}) {
  return (
    <div>
      <div className={cn("text-xl font-bold tabular-nums", tone)}>{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  )
}

function DomainDetail({
  domain,
  items,
  onBack,
  onOpen,
  onDelete,
}: {
  domain: string
  items: Project[]
  onBack: () => void
  onOpen: (id: string) => void
  onDelete: (p: Project) => void
}) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Terug
        </Button>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{domain}</h2>
          <Badge variant="secondary">
            {items.length} review{items.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </div>
      <ProjectsTable rows={items} onOpen={onOpen} onDelete={onDelete} />
    </div>
  )
}

function ProjectsTable({
  rows,
  showDomain,
  onOpen,
  onDelete,
}: {
  rows: Project[]
  showDomain?: boolean
  onOpen: (id: string) => void
  onDelete: (p: Project) => void
}) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            {showDomain && (
              <TableHead className="hidden md:table-cell">Domein</TableHead>
            )}
            <TableHead>Status</TableHead>
            <TableHead>Scan type</TableHead>
            <TableHead className="hidden sm:table-cell">Datum</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => {
            const score = projectScore(p)
            const tone = scoreTone(score)
            const st = statusOf(p)
            return (
              <TableRow
                key={p.id}
                onClick={() => onOpen(p.id)}
                className="cursor-pointer"
              >
                <TableCell className="max-w-[260px] font-medium">
                  <div className="truncate">
                    {p.name || p.url || "Naamloos project"}
                  </div>
                  {showDomain && (
                    <div className="truncate text-xs text-muted-foreground md:hidden">
                      {domainOf(p)}
                    </div>
                  )}
                </TableCell>
                {showDomain && (
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {domainOf(p)}
                  </TableCell>
                )}
                <TableCell>
                  {st.tone === "done" ? (
                    <Badge className="bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/15">
                      Afgerond
                    </Badge>
                  ) : st.tone === "busy" ? (
                    <Badge className="bg-amber-500/15 text-amber-500 hover:bg-amber-500/15">
                      Bezig
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Niet gestart
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {typeLabel(p)}
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {p.createdAt
                    ? new Date(p.createdAt).toLocaleDateString("nl-NL")
                    : ""}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-bold tabular-nums",
                    toneClass[tone],
                  )}
                >
                  {score == null ? "—" : score.toFixed(1)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    aria-label="Verwijderen"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(p)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
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
