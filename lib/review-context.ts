import { doc, updateDoc } from "firebase/firestore"

import { BRANCHES, isBranche } from "@/lib/branche"
import { getDb } from "@/lib/firebase"
import { fetchPageText } from "@/lib/page-fetch"
import type { Project } from "@/lib/types"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export interface Taxo {
  slug: string
  label: string
}

/** Wat moet de pagina bereiken? (doel) */
export const PAGE_GOALS: Taxo[] = [
  { slug: "leads", label: "Leads genereren" },
  { slug: "verkopen", label: "Verkopen (webshop)" },
  { slug: "afspraak", label: "Afspraak of offerte" },
  { slug: "aanmelden", label: "Aanmelden of inschrijven" },
  { slug: "contact", label: "Contact leggen" },
  { slug: "informeren", label: "Informeren of uitleggen" },
  { slug: "anders", label: "Anders" },
]

/** In welke fase zit de bezoeker? */
export const JOURNEY_STAGES: Taxo[] = [
  { slug: "orienteren", label: "Oriënteren" },
  { slug: "vergelijken", label: "Vergelijken" },
  { slug: "beslissen", label: "Beslissen" },
  { slug: "na-aankoop", label: "Na aankoop of gebruik" },
]

/** Voor wie is de pagina? */
export const AUDIENCES: Taxo[] = [
  { slug: "consument", label: "Consument (B2C)" },
  { slug: "zakelijk", label: "Zakelijk (B2B)" },
  { slug: "beide", label: "Beide" },
]

/** Op welk apparaat bekeken? (handmatig; niet uit de pagina af te leiden) */
export const DEVICES: Taxo[] = [
  { slug: "mobiel", label: "Mobiel" },
  { slug: "desktop", label: "Desktop" },
  { slug: "beide", label: "Beide" },
]

function makeMap(list: Taxo[]) {
  return new Map(list.map((t) => [t.slug, t]))
}
const GOAL_MAP = makeMap(PAGE_GOALS)
const STAGE_MAP = makeMap(JOURNEY_STAGES)
const AUD_MAP = makeMap(AUDIENCES)
const DEV_MAP = makeMap(DEVICES)

export function pageGoalLabel(s?: string | null) {
  return s ? (GOAL_MAP.get(s)?.label ?? "Anders") : ""
}
export function journeyStageLabel(s?: string | null) {
  return s ? (STAGE_MAP.get(s)?.label ?? "") : ""
}
export function audienceLabel(s?: string | null) {
  return s ? (AUD_MAP.get(s)?.label ?? "") : ""
}
export function deviceLabel(s?: string | null) {
  return s ? (DEV_MAP.get(s)?.label ?? "") : ""
}

export function isPageGoal(s?: string | null): s is string {
  return !!s && GOAL_MAP.has(s)
}
export function isJourneyStage(s?: string | null): s is string {
  return !!s && STAGE_MAP.has(s)
}
export function isAudience(s?: string | null): s is string {
  return !!s && AUD_MAP.has(s)
}

export interface PageAnalysis {
  branche: string | null
  pageGoal: string | null
  journeyStage: string | null
  audience: string | null
}

function parseObj(text: string): Record<string, unknown> | null {
  if (!text) return null
  const t = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim()
  try {
    return JSON.parse(t)
  } catch {}
  const m = t.match(/\{[\s\S]*\}/)
  if (m) {
    try {
      return JSON.parse(m[0])
    } catch {}
  }
  return null
}

/**
 * Analyseert een pagina in één AI-call: branche + doel + fase + doelgroep.
 * Alle waarden komen uit de vaste taxonomieën (of null). Bespaart t.o.v.
 * losse calls per veld. Apparaat wordt NIET bepaald (handmatig).
 */
export async function analyzePage(
  url: string,
  pageText?: string,
): Promise<PageAnalysis> {
  const empty: PageAnalysis = {
    branche: null,
    pageGoal: null,
    journeyStage: null,
    audience: null,
  }
  if (!PROXY) return empty
  let text = pageText
  if (!text) {
    try {
      text = await fetchPageText(url)
    } catch {
      text = ""
    }
  }
  if (!text || text.trim().length < 40) return empty

  const branches = BRANCHES.map((b) => `${b.slug} = ${b.label}`).join("\n")
  const goals = PAGE_GOALS.map((g) => `${g.slug} = ${g.label}`).join("\n")
  const stages = JOURNEY_STAGES.map((s) => `${s.slug} = ${s.label}`).join("\n")
  const auds = AUDIENCES.map((a) => `${a.slug} = ${a.label}`).join("\n")

  const system = `Je analyseert een website-pagina voor een reviewer. Bepaal de branche, het doel van de pagina, de fase van de bezoeker en de doelgroep. Kies UITSLUITEND slugs uit de gegeven lijsten. Antwoord uitsluitend met JSON.`
  const user = `URL: ${url}

PAGINA-INHOUD (ingekort):
"""
${text.slice(0, 5000)}
"""

BRANCHE (kies één slug):
${branches}

DOEL VAN DE PAGINA (kies één slug):
${goals}

FASE VAN DE BEZOEKER (kies één slug):
${stages}

DOELGROEP (kies één slug):
${auds}

Antwoord UITSLUITEND met JSON:
{"branche":"<slug>","pageGoal":"<slug>","journeyStage":"<slug>","audience":"<slug>"}`

  try {
    const resp = await fetch(PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 120,
        temperature: 0,
        system,
        messages: [{ role: "user", content: [{ type: "text", text: user }] }],
      }),
    })
    if (!resp.ok) throw new Error(String(resp.status))
    const j = await resp.json()
    const o = parseObj(j?.content?.[0]?.text || "")
    return {
      branche: isBranche(o?.branche as string) ? (o!.branche as string) : null,
      pageGoal: isPageGoal(o?.pageGoal as string)
        ? (o!.pageGoal as string)
        : null,
      journeyStage: isJourneyStage(o?.journeyStage as string)
        ? (o!.journeyStage as string)
        : null,
      audience: isAudience(o?.audience as string)
        ? (o!.audience as string)
        : null,
    }
  } catch {
    return empty
  }
}

/**
 * Projecten die nog geen volledige basis-context hebben (branche of doel
 * ontbreekt) en een URL. Fase en doelgroep zijn optioneel en tellen niet mee
 * voor "ontbrekend", zodat onbereikbare pagina's niet elke keer opnieuw worden
 * geprobeerd.
 */
export function projectsMissingContext(projects: Project[]): Project[] {
  return projects.filter(
    (p) =>
      !!(p.url ?? "").trim() &&
      (!isBranche(p.branche) || !isPageGoal(p.pageGoal)),
  )
}

/**
 * Vult branche + reviewcontext aan voor bestaande reviews (één AI-call per
 * site). Overschrijft nooit al ingevulde velden. Zet branche "overig" en doel
 * "anders" als de AI niks bruikbaars geeft, zodat een project daarna niet meer
 * als "ontbrekend" telt.
 */
export async function backfillContext(
  projects: Project[],
  onProgress?: (done: number, total: number) => void,
): Promise<{ updated: number; total: number }> {
  const todo = projectsMissingContext(projects)
  let updated = 0
  for (let i = 0; i < todo.length; i++) {
    const p = todo[i]
    try {
      const a = await analyzePage((p.url ?? "").trim())
      const patch: Partial<Project> = {}
      if (!isBranche(p.branche)) {
        patch.branche = a.branche ?? "overig"
        patch.brancheAuto = true
      }
      if (!isPageGoal(p.pageGoal)) {
        patch.pageGoal = a.pageGoal ?? "anders"
      }
      if (!isJourneyStage(p.journeyStage) && a.journeyStage) {
        patch.journeyStage = a.journeyStage
      }
      if (!isAudience(p.audience) && a.audience) {
        patch.audience = a.audience
      }
      if (Object.keys(patch).length > 0) {
        patch.contextAuto = true
        await updateDoc(doc(getDb(), "projects", p.id), patch)
        updated++
      }
    } catch {
      // sla dit project over; blijft in de volgende run staan
    }
    onProgress?.(i + 1, todo.length)
  }
  return { updated, total: todo.length }
}
