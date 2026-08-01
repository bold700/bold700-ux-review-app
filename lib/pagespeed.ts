import type { ReviewCheck } from "@/lib/modules"
import type { Score } from "@/lib/types"

// Gratis Google PageSpeed Insights API v5. Levert echte performance-metingen
// (Lighthouse-lab + CrUX-velddata) i.p.v. AI-inschattingen. Principe uit het
// researchdocument: deterministische tools meten, de LLM synthetiseert.
const PSI_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
const PSI_KEY = process.env.NEXT_PUBLIC_PSI_API_KEY

export interface PsiField {
  lcpMs?: number
  clsScore?: number
  inpMs?: number
  fcpMs?: number
  ttfbMs?: number
  overall?: string
}

export interface PsiAudit {
  score: number | null
  numericValue?: number
  displayValue?: string
  title?: string
}

export interface PsiResult {
  score: number | null // performance-score 0-100
  strategy: string
  audits: Record<string, PsiAudit>
  field: PsiField | null // CrUX-velddata (echte gebruikers), indien beschikbaar
}

export interface PsiCheckResult {
  id: string
  score: Score
  note: string
}

/**
 * Roept PSI aan met een ruime timeout. Faalt netjes (retourneert null) bij een
 * fout of timeout, zodat de scan gewoon doorgaat zonder performancedata.
 */
export async function fetchPageSpeed(
  url: string,
  opts: { strategy?: "mobile" | "desktop"; timeoutMs?: number } = {},
): Promise<PsiResult | null> {
  const strategy = opts.strategy ?? "mobile"
  const timeoutMs = opts.timeoutMs ?? 30000
  const clean = (url ?? "").trim()
  if (!clean) return null

  const params = new URLSearchParams({
    url: clean,
    strategy,
    category: "performance",
  })
  if (PSI_KEY) params.set("key", PSI_KEY)

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const resp = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
      signal: ctrl.signal,
    })
    if (!resp.ok) return null
    const j = await resp.json()

    const lh = j?.lighthouseResult
    const rawAudits = (lh?.audits ?? {}) as Record<string, unknown>
    const audits: Record<string, PsiAudit> = {}
    for (const [id, a] of Object.entries(rawAudits)) {
      const au = a as {
        score?: number | null
        numericValue?: number
        displayValue?: string
        title?: string
      }
      audits[id] = {
        score: au?.score ?? null,
        numericValue: au?.numericValue,
        displayValue: au?.displayValue,
        title: au?.title,
      }
    }

    const score =
      typeof lh?.categories?.performance?.score === "number"
        ? Math.round(lh.categories.performance.score * 100)
        : null

    const m = j?.loadingExperience?.metrics as
      | Record<string, { percentile?: number }>
      | undefined
    let field: PsiField | null = null
    if (m) {
      field = {
        lcpMs: m.LARGEST_CONTENTFUL_PAINT_MS?.percentile,
        clsScore:
          m.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile != null
            ? m.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
            : undefined,
        inpMs: m.INTERACTION_TO_NEXT_PAINT?.percentile,
        fcpMs: m.FIRST_CONTENTFUL_PAINT_MS?.percentile,
        ttfbMs: m.EXPERIENCE_TIME_TO_FIRST_BYTE?.percentile,
        overall: j?.loadingExperience?.overall_category,
      }
    }

    return { score, strategy, audits, field }
  } catch {
    return null // timeout of netwerkfout: scan gaat door zonder PSI
  } finally {
    clearTimeout(timer)
  }
}

function sec(ms?: number): string {
  if (ms == null) return "?"
  return (ms / 1000).toFixed(1).replace(".", ",") + " s"
}
function ms(v?: number): string {
  if (v == null) return "?"
  return Math.round(v) + " ms"
}
function auditScore(s: number | null): Score {
  if (s == null) return "nvt"
  if (s >= 0.9) return "good"
  if (s >= 0.5) return "ok"
  return "bad"
}

// Nette Nederlandse labels + streefwaarden voor bekende Lighthouse-audits.
const METRIC_LABEL: Record<string, string> = {
  "largest-contentful-paint": "LCP",
  "cumulative-layout-shift": "CLS",
  "total-blocking-time": "Blokkeringstijd (TBT)",
  "first-contentful-paint": "FCP",
  "server-response-time": "Serverreactietijd (TTFB)",
  "speed-index": "Speed Index",
  "render-blocking-resources": "Render-blokkerende bronnen",
  "unused-css-rules": "Ongebruikte CSS",
  interactive: "Tijd tot interactief",
}
const METRIC_TARGET: Record<string, string> = {
  "largest-contentful-paint": "streef < 2,5 s",
  "cumulative-layout-shift": "streef < 0,1",
  "total-blocking-time": "streef < 200 ms",
  "first-contentful-paint": "streef < 1,8 s",
  "server-response-time": "streef < 0,6 s",
  "speed-index": "streef < 3,4 s",
}

/**
 * Mapt PSI-resultaten naar de bijbehorende performance-checks (auto_tool
 * "lighthouse"). Geeft per check een échte meting terug (good/ok/bad + cijfer
 * in de notitie). Checks die niet uit PSI te bepalen zijn, worden overgeslagen.
 */
export function mapPsiToChecks(
  psi: PsiResult,
  checks: ReviewCheck[],
): PsiCheckResult[] {
  const out: PsiCheckResult[] = []
  const f = psi.field

  for (const c of checks) {
    if (c.auto_tool !== "lighthouse") continue

    // 1) Core Web Vitals gecombineerd (perf-002)
    if (c.auto_metric === "core-web-vitals") {
      const lcp = f?.lcpMs ?? psi.audits["largest-contentful-paint"]?.numericValue
      const cls =
        f?.clsScore ?? psi.audits["cumulative-layout-shift"]?.numericValue
      const inp = f?.inpMs // INP alleen betrouwbaar uit velddata
      if (lcp == null && cls == null) continue
      const lcpBad = lcp != null && lcp > 4000
      const clsBad = cls != null && cls > 0.25
      const inpBad = inp != null && inp > 500
      const lcpOk = lcp != null && lcp > 2500
      const clsOk = cls != null && cls > 0.1
      const inpOk = inp != null && inp > 200
      const score: Score =
        lcpBad || clsBad || inpBad
          ? "bad"
          : lcpOk || clsOk || inpOk
            ? "ok"
            : "good"
      const parts = [
        `LCP ${sec(lcp)}`,
        `CLS ${cls != null ? cls.toFixed(2).replace(".", ",") : "?"}`,
        inp != null ? `INP ${ms(inp)}` : null,
      ].filter(Boolean)
      out.push({
        id: c.id,
        score,
        note: `${f ? "Velddata" : "Labdata"}: ${parts.join(", ")} (streef LCP<2,5s, CLS<0,1, INP<200ms).`,
      })
      continue
    }

    // 2) Field- vs labdata beschikbaar (perf-009)
    if (c.auto_metric === "crux-data") {
      out.push(
        f
          ? { id: c.id, score: "good", note: "Echte gebruikersdata (CrUX) beschikbaar." }
          : { id: c.id, score: "ok", note: "Geen CrUX-velddata; alleen labmeting beschikbaar." },
      )
      continue
    }

    // 3) Laadtijd algemeen (perf-001) — LCP als maat
    if (c.auto_metric === "first-contentful-paint") {
      const lcp = f?.lcpMs ?? psi.audits["largest-contentful-paint"]?.numericValue
      if (lcp == null) continue
      const score: Score = lcp < 2000 ? "good" : lcp < 3000 ? "ok" : "bad"
      out.push({
        id: c.id,
        score,
        note: `Laadtijd (LCP) is ${sec(lcp)} — streef onder 3 s (liefst 2 s).`,
      })
      continue
    }

    // 4) Generieke Lighthouse-audit via auto_rule
    const auditId = c.auto_rule ?? undefined
    const audit = auditId ? psi.audits[auditId] : undefined
    if (!audit || audit.score == null) continue
    const label = auditId ? METRIC_LABEL[auditId] ?? audit.title ?? auditId : ""
    const target = auditId ? METRIC_TARGET[auditId] : undefined
    const value = audit.displayValue ?? sec(audit.numericValue)
    out.push({
      id: c.id,
      score: auditScore(audit.score),
      note: `${label}: ${value}${target ? ` (${target})` : ""}.`,
    })
  }

  return out
}
