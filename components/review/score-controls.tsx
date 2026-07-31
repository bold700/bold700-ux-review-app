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
  if (score !== "ok" && score !== "bad") return null
  const opts: { v: Severity; label: string }[] =
    score === "ok"
      ? [
          { v: "high", label: "Quick Win" },
          { v: "low", label: "Opvuller" },
        ]
      : [
          { v: "high", label: "Strategisch" },
          { v: "low", label: "Niet Nu" },
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

/** Hoe zeker is de reviewer van de inschatting (1-5). Traint bewijs boven gevoel. */
export function ConfidenceRow({
  score,
  value,
  onChange,
}: {
  score?: Score | null
  value?: number | null
  onChange: (n: number) => void
}) {
  if (!score || score === "nvt") return null
  return (
    <div>
      <div className="mb-1 text-xs text-muted-foreground">
        Hoe zeker ben je van deze inschatting?
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={cn(
              "rounded-md border py-1.5 text-xs font-medium transition-colors",
              value === n
                ? "border-primary bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>gok</span>
        <span>heel zeker</span>
      </div>
    </div>
  )
}
