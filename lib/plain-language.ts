import { doc, updateDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"
import { buildActionPlan } from "@/lib/action-plan"
import type { Project } from "@/lib/types"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export type PlainActions = Record<
  string,
  { title: string; action: string; impact?: string; uitleg?: string }
>

function parseObj(text: string): PlainActions | null {
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
 * Herschrijft de verbeterpunten naar heldere, jargon-vrije taal voor een
 * ondernemer ("jip en janneke"), en slaat het op in project.plainActions.
 * Doet alleen de punten die nog geen gewone-taal-versie hebben.
 */
export async function generatePlainActions(
  project: Project,
): Promise<PlainActions> {
  if (project.reviewType === "free-form" || !PROXY) return project.plainActions ?? {}
  const existing = project.plainActions ?? {}
  // Herschrijf punten die nog geen gewone-taal-versie hebben, of die nog de
  // oude versie zonder "impact" hebben (upgrade naar jargon-vrije opbrengst).
  const items = buildActionPlan(project).priorities.filter(
    (p) =>
      !existing[p.id] ||
      existing[p.id].impact === undefined ||
      existing[p.id].uitleg === undefined,
  )
  if (items.length === 0) return existing

  const list = items
    .map(
      (p) =>
        `[id:${p.id}]\nPUNT: ${p.title}\nOPLEVERT: ${p.businessImpact ?? ""}\nFIX: ${p.fix}\nREVIEWER: ${p.notes ?? ""}`,
    )
    .join("\n\n")

  const system = `Je herschrijft verbeterpunten voor een website naar heldere, simpele taal voor een ondernemer zonder technische kennis (jip-en-janneke). Vermijd ALLE vakjargon en Engelse termen (bijv. CTA, conversie, bounce, bounce rate, above the fold, hero, viewport, Flesch-Kincaid). Zeg bijvoorbeeld "meer aanvragen/aankopen" in plaats van "conversie", en "bezoekers haken af" in plaats van "bounce". Antwoord uitsluitend met JSON.`

  const user = `Herschrijf elk punt hieronder naar gewone taal, alsof je het aan een ondernemer uitlegt die net binnenloopt. Geef per id:
- "title": kort wat er aan de hand is (max ~8 woorden, geen jargon)
- "uitleg": 1 tot 2 zinnen die uitleggen wat een bezoeker nu ervaart of mist op de site, in gewone taal en menselijk verwoord. Beschrijf het probleem concreet vanuit de bezoeker, niet vanuit de techniek. Verwerk de observatie van REVIEWER als die er is.
- "impact": waarom dit belangrijk is voor de ondernemer, concreet en in gewone taal (bv. minder aanvragen, minder vertrouwen). Neem percentages uit OPLEVERT over als die er staan, maar zonder vakwoorden.
- "action": het advies in 1 tot 2 zinnen, begin met een werkwoord.

Behoud de betekenis, verzin geen cijfers. Schrijf warm en helder, geen opsomming van vakwoorden. Antwoord UITSLUITEND als JSON met exact deze id's:
{"<id>": {"title": "<titel>", "uitleg": "<wat de bezoeker ervaart>", "impact": "<waarom dit belangrijk is>", "action": "<advies>"}}

${list}`

  try {
    const resp = await fetch(PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 2000,
        temperature: 0.3,
        system,
        messages: [{ role: "user", content: [{ type: "text", text: user }] }],
      }),
    })
    if (!resp.ok) throw new Error(String(resp.status))
    const j = await resp.json()
    const obj = parseObj(j?.content?.[0]?.text || "")
    if (!obj) return existing
    const merged = { ...existing, ...obj }
    await updateDoc(doc(getDb(), "projects", project.id), {
      plainActions: merged,
    })
    return merged
  } catch {
    return existing
  }
}
