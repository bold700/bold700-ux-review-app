import type { Project } from "@/lib/types"
import type { ReportData } from "@/lib/report"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

type Block =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: "url"; url: string } }
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } }

// Genereert een klantgericht AI-actieplan (Markdown) op basis van de review.
export async function generateActionPlan(
  project: Project,
  data: ReportData,
): Promise<string> {
  if (!PROXY) throw new Error("AI is niet beschikbaar (proxy niet ingesteld).")

  const hasIssues = data.issues.length > 0

  const issuesSummary = data.issues
    .map((i) => {
      const sl = i.score === "bad" ? "Niet OK" : "Matig"
      const im = i.severity === "high" ? "Hoog" : "Laag"
      let line = `- [${sl}] [Impact: ${im}] ${i.question}`
      if (i.notes) line += ` | Notitie reviewer: "${i.notes}"`
      line += ` (${i.category})`
      return line
    })
    .join("\n")

  const strengthsSummary =
    data.strengths
      .map((s) => {
        let line = `- ${s.question}`
        if (s.notes) line += ` | Notitie reviewer: "${s.notes}"`
        line += ` (${s.category})`
        return line
      })
      .join("\n") || "- (geen expliciet benoemd)"

  const system = `Je bent een senior UX consultant van BOLD700. Je schrijft in het Nederlands, direct en to-the-point. Geen vakjargon — schrijf alsof je tegen een ondernemer of marketing manager praat. Maak een compleet, helder rapport op basis van ALLES wat de reviewer heeft vastgelegd (sterke punten én verbeterpunten, inclusief notities en bijgevoegde screenshots). Focus op RESULTAAT en BUSINESS IMPACT. Ook wanneer alles goed is schrijf je een volwaardig positief rapport.
GROUNDING (strikt): baseer je op de aangeleverde bevindingen en notities. Verzin GEEN concrete knop-/linkteksten, cijfers, elementen of feiten over de website die niet in de input staan. Blijf algemeen als je de exacte tekst niet kent.`

  const user = `Hier zijn de resultaten van een UX review van ${project.url || "een website"}${project.name ? " (" + project.name + ")" : ""}${project.client ? " voor " + project.client : ""}.

Van de ${data.totalQuestions} beoordeelde punten zijn er ${data.issues.length} verbeterpunten en ${data.strengths.length} sterke punten.

STERKE PUNTEN (${data.strengths.length}):
${strengthsSummary}

${hasIssues ? `VERBETERPUNTEN (${data.issues.length}):\n${issuesSummary}` : "VERBETERPUNTEN: geen — alle beoordeelde punten zijn positief."}

Maak een klantgericht rapport met deze structuur:

## Samenvatting
2-3 zinnen over de staat van de website. Begin positief${hasIssues ? ", benoem daarna wat er beter kan" : ""}.

## Wat gaat goed
Benoem de sterke punten concreet en koppel ze aan wat het de business oplevert.
${hasIssues ? `
## Top Prioriteiten
De 3-5 belangrijkste acties. Per actie:
### [Korte titel]
**Wat:** (1 zin)
**Waarom:** (business impact)
**Impact:** Hoog/Midden/Laag
**Effort:** Klein/Middel/Groot

## Quick Wins
Snel te fixen met groot effect. Max 5 bullets.

## Overige Aanbevelingen
De rest, gegroepeerd en kort.`
    : `
## Kansen om nog beter te worden
2-4 optionele, subtiele suggesties. Houd het licht en positief.`}

Regels: Schrijf in het Nederlands, geen technische termen, focus op wat het OPLEVERT, wees concreet maar kort, gebruik Markdown.`

  const imageBlocks: Block[] = []
  for (const it of [...data.issues, ...data.strengths]) {
    for (const src of it.images) {
      if (imageBlocks.filter((b) => b.type === "image").length >= 8) break
      if (/^https?:\/\//.test(src)) {
        imageBlocks.push({ type: "text", text: `Screenshot bij: "${it.question}"` })
        imageBlocks.push({ type: "image", source: { type: "url", url: src } })
      } else {
        const m = /^data:(image\/[a-z]+);base64,(.+)$/.exec(src)
        if (m) {
          imageBlocks.push({ type: "text", text: `Screenshot bij: "${it.question}"` })
          imageBlocks.push({
            type: "image",
            source: { type: "base64", media_type: m[1], data: m[2] },
          })
        }
      }
    }
  }

  const resp = await fetch(PROXY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 2000,
      temperature: 0.3,
      system,
      messages: [{ role: "user", content: [{ type: "text", text: user }, ...imageBlocks] }],
    }),
  })
  if (!resp.ok) {
    const e = await resp.json().catch(() => ({}))
    throw new Error(e?.error?.message || `API fout (${resp.status})`)
  }
  const j = await resp.json()
  return j?.content?.[0]?.text || ""
}
