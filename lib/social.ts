import type { Project } from "@/lib/types"
import type { ReportData } from "@/lib/report"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

/**
 * Genereert een korte, pakkende LinkedIn-post (NL) over een UX-review,
 * op basis van de review-insights. Bedoeld om BOLD700-reviews te promoten.
 */
export async function generateLinkedInPost(
  project: Project,
  data: ReportData,
): Promise<string> {
  if (!PROXY) throw new Error("AI is niet beschikbaar (proxy niet ingesteld).")

  const topIssues = data.issues
    .slice(0, 3)
    .map((i) => `- ${i.question}`)
    .join("\n")

  const system = `Je bent de social media manager van BOLD700, een studio die scherpe UX-reviews doet. Schrijf een korte, pakkende LinkedIn-post in het Nederlands.
Regels: max ~90 woorden. Begin met een sterke haak. Noem de website en de score (op 10). Noem 1-2 concrete inzichten kort. Toon expertise, geen opschepperij. Eindig met een subtiele call-to-action richting BOLD700. Hooguit 1-2 emoji als accent. Sluit af met 3-4 relevante hashtags op één regel. Geen markdown-koppen, gewoon platte tekst met regelafbrekingen.`

  const user = `Website: ${project.name || project.url}
URL: ${project.url}
Totaalscore: ${data.score == null ? "n.v.t." : data.score.toFixed(1)}/10
Aantal verbeterpunten: ${data.issues.length}
Aantal sterke punten: ${data.strengths.length}
Belangrijkste verbeterpunten:
${topIssues || "- (geen)"}

Schrijf de LinkedIn-post.`

  const resp = await fetch(PROXY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 500,
      system,
      messages: [{ role: "user", content: [{ type: "text", text: user }] }],
    }),
  })
  if (!resp.ok) {
    const e = await resp.json().catch(() => ({}))
    throw new Error(e?.error?.message || `API fout (${resp.status})`)
  }
  const j = await resp.json()
  return (j?.content?.[0]?.text || "").trim()
}
