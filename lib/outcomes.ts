import type { Answer, Project } from "@/lib/types"

export interface OutcomeVerdict {
  slug: string
  label: string
  /** telt als "raak": bevinding was terecht */
  hit: boolean
  /** telt als bewezen waarde (aantoonbaar resultaat) */
  proven?: boolean
  tone: "good" | "ok" | "bad" | "na"
}

/**
 * "Was mijn inschatting correct?" — de leerlus. Bewust een gesloten lijst zodat
 * je jezelf over reviews heen kunt vergelijken.
 */
export const OUTCOME_VERDICTS: OutcomeVerdict[] = [
  {
    slug: "aantoonbaar-resultaat",
    label: "Aantoonbaar resultaat",
    hit: true,
    proven: true,
    tone: "good",
  },
  {
    slug: "correct-belangrijk",
    label: "Correct en belangrijk",
    hit: true,
    tone: "good",
  },
  {
    slug: "correct-lage-impact",
    label: "Correct, lage impact",
    hit: true,
    tone: "ok",
  },
  {
    slug: "niet-getest",
    label: "Niet getest",
    hit: false,
    tone: "na",
  },
  {
    slug: "niet-relevant",
    label: "Niet relevant voor doelgroep",
    hit: false,
    tone: "bad",
  },
  {
    slug: "klant-oneens",
    label: "Klant was het oneens",
    hit: false,
    tone: "bad",
  },
]

const BY_SLUG = new Map(OUTCOME_VERDICTS.map((v) => [v.slug, v]))

export function outcomeVerdict(slug?: string | null): OutcomeVerdict | null {
  return slug ? (BY_SLUG.get(slug) ?? null) : null
}

export function isOutcome(slug?: string | null): slug is string {
  return !!slug && BY_SLUG.has(slug)
}

/** Alleen de echte bevindingen (met score matig/slecht), niet vrije velden zonder score. */
export function findingEntries(
  answers: Record<string, Answer>,
): { id: string; answer: Answer }[] {
  return Object.entries(answers)
    .filter(([, a]) => a.score === "ok" || a.score === "bad")
    .map(([id, answer]) => ({ id, answer }))
}

export interface OutcomeStats {
  evaluated: number
  total: number
  hits: number
  proven: number
  /** trefkans over de geëvalueerde bevindingen (0..1), null als niks geëvalueerd */
  hitRate: number | null
}

/** Statistieken over de leerlus voor één project. */
export function outcomeStats(project: Project): OutcomeStats {
  const entries = findingEntries(project.answers ?? {})
  let evaluated = 0
  let hits = 0
  let proven = 0
  for (const { answer } of entries) {
    const v = outcomeVerdict(answer.outcome)
    if (!v) continue
    evaluated++
    if (v.hit) hits++
    if (v.proven) proven++
  }
  return {
    evaluated,
    total: entries.length,
    hits,
    proven,
    hitRate: evaluated ? hits / evaluated : null,
  }
}
