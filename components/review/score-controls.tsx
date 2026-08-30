"use client"

import type { Score, Severity } from "@/lib/types"
import { cn } from "@/lib/utils"

const SCORE_OPTS: { v: Score; label: string; on: string }[] = [
  { v: "bad", label: "Niet OK", on: "bg-red-500 text-white border-red-500" },
  { v: "ok", label: "Matig", on: "bg-amber-500 text-white border-amber-500" },
  {
    v: "good",
    label: "Goed",
    on: "bg-emerald-500 text-white border-emerald-500",
  },
  { v: "nvt", label: "N.v.t.", on: "bg-muted-foreground text-white" },
]

export function ScoreButtons({
  value,
  onChange,
  compact,
}: {
  value?: Score | null
  onChange: (s: Score) => void
  compact?: boolean
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {SCORE_OPTS.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "rounded-md border text-xs font-medium transition-colors",
            compact ? "py-1.5" : "py-2",
            value === o.v ? o.on : "hover:bg-muted",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function SeverityRow({
  score,
  value,
  onChange,
}: {
  score?: Score | null
  value?: Severity | null
  onChange: (s: Severity) => void
}) {
  // Alleen bij "Matig" nog een keuze. Bij "Niet OK" stonden hier Strategisch en
  // Niet Nu, maar die werden niet gebruikt: iets dat niet OK is, is gewoon
  // belangrijk. Dat leidt de developer-lijst nu zelf af uit de score.
  if (score !== "ok") return null
  const opts: { v: Severity; label: string }[] = [
    { v: "high", label: "Quick Win" },
    { v: "low", label: "Opvuller" },
  ]
  return (
    <div className="grid grid-cols-2 gap-2">
      {opts.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "rounded-md border py-1.5 text-xs font-medium transition-colors",
            value === o.v
              ? "border-primary bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
