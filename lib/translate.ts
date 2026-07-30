import { doc, updateDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"
import { buildReport } from "@/lib/report"
import type { Project } from "@/lib/types"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export type Translations = Record<string, { title?: string; note?: string }>

function parseObj(text: string): Record<string, { title?: string; note?: string }> | null {
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
 * Vertaalt de bevindingen van een vrije review naar het Engels (titel + notitie)
 * en slaat het resultaat op in project.findingTranslations, zodat de publieke
 * developer-link het zonder AI/login kan tonen.
 */
export async function translateFindings(
  project: Project,
): Promise<Translations> {
  if (project.reviewType !== "free-form" || !PROXY) return {}
  const existing = project.findingTranslations ?? {}
  const report = buildReport(project)
  // Alleen bevindingen die nog GEEN vertaling hebben (elke bevinding 1x).
  const items = report.issues.filter((f) => !existing[f.id]?.title)
  if (items.length === 0) return existing

  const list = items
    .map(
      (f) =>
        `[id:${f.id}] TITEL: ${f.question}\nNOTITIE: ${(f.notes ?? "").replace(/\n/g, " ")}`,
    )
    .join("\n\n")

  const system = `Je bent een professionele NL→EN vertaler voor UX-feedback. Vertaal beknopt en zakelijk naar het Engels. Behoud de betekenis, maak van de notitie een concrete actie-instructie voor een developer. Antwoord uitsluitend met JSON.`

  const user = `Vertaal deze bevindingen naar het Engels. Geef per id een korte Engelse titel en een Engelse actie-notitie.
Antwoord UITSLUITEND als JSON-object met dit formaat, exact deze id's:
{"<id>": {"title": "<English title>", "note": "<English action note>"}}

${list}`

  try {
    const resp = await fetch(PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 1500,
        system,
        messages: [{ role: "user", content: [{ type: "text", text: user }] }],
      }),
    })
    if (!resp.ok) throw new Error(String(resp.status))
    const j = await resp.json()
    const obj = parseObj(j?.content?.[0]?.text || "")
    if (!obj) return existing
    // Samenvoegen met bestaande vertalingen (bestaande blijven staan).
    const merged = { ...existing, ...obj }
    await updateDoc(doc(getDb(), "projects", project.id), {
      findingTranslations: merged,
    })
    return merged
  } catch {
    return existing
  }
}
