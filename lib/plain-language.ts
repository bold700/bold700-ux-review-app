import { doc, updateDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"
import { buildActionPlan } from "@/lib/action-plan"
import type { Project } from "@/lib/types"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export type PlainActions = Record<string, { title: string; action: string }>

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
  const items = buildActionPlan(project).priorities.filter((p) => !existing[p.id])
  if (items.length === 0) return existing

  const list = items
    .map((p) => `[id:${p.id}] PUNT: ${p.title}\nFIX: ${p.fix}`)
    .join("\n\n")

  const system = `Je herschrijft UX-verbeterpunten naar heldere, simpele taal voor een ondernemer zonder technische kennis (jip-en-janneke). Vermijd ALLE vakjargon en Engelse termen (bijv. Flesch-Kincaid, CTA, above the fold, hero, viewport, bounce rate) — leg het uit in gewone woorden. Antwoord uitsluitend met JSON.`

  const user = `Herschrijf elk punt hieronder. Geef per id:
- "title": in gewone taal wat er aan de hand is (max ~8 woorden, geen jargon)
- "action": één concrete "doe dit"-zin die begint met een werkwoord

Behoud de betekenis, verzin niks. Antwoord UITSLUITEND als JSON met exact deze id's:
{"<id>": {"title": "<gewone titel>", "action": "<doe dit-zin>"}}

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
