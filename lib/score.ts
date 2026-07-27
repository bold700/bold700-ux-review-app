import type { Project } from "@/lib/types"

// Eenvoudige gemiddelde score (0–10) over beantwoorde vragen (nvt telt niet mee).
export function projectScore(p: Project): number | null {
  const ans = p.answers ?? {}
  const ids = Object.keys(ans)
  const nvt = ids.filter((k) => ans[k].score === "nvt").length
  const scored = ids.filter((k) => ans[k].score && ans[k].score !== "nvt")
  const effective = ids.length - nvt
  if (effective === 0) return null
  const sum = scored.reduce(
    (s, k) =>
      s + (ans[k].score === "good" ? 10 : ans[k].score === "ok" ? 6 : 3),
    0,
  )
  return sum / effective
}

export function scoreTone(score: number | null): "good" | "ok" | "bad" | "na" {
  if (score == null) return "na"
  if (score >= 7.5) return "good"
  if (score >= 5) return "ok"
  return "bad"
}
