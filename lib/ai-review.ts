import type { Score } from "@/lib/types"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export interface AiAnswer {
  id: string
  score: Score
  note: string
}

export interface AiQuestion {
  id: string
  text: string
  category: string
}

function parseJsonArray(text: string): AiAnswer[] | null {
  if (!text) return null
  const t = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim()
  try {
    const d = JSON.parse(t)
    if (Array.isArray(d)) return d
    if (d && Array.isArray(d.answers)) return d.answers
  } catch {}
  const m = t.match(/\[[\s\S]*\]/)
  if (m) {
    try {
      const d = JSON.parse(m[0])
      if (Array.isArray(d)) return d
    } catch {}
  }
  // fallback: losse {…} objecten (bestand tegen afgekapte JSON)
  const objs = t.match(/\{[^{}]*\}/g)
  if (objs) {
    const out: AiAnswer[] = []
    for (const o of objs) {
      try {
        const d = JSON.parse(o)
        if (d && d.id) out.push(d)
      } catch {}
    }
    if (out.length) return out
  }
  return null
}

// Vult de checklist vooraf in via OpenAI (in blokken, zodat het antwoord
// nooit wordt afgekapt). Geeft per vraag { id, score, note } terug.
export async function runAiReview(
  url: string,
  pageText: string,
  questions: AiQuestion[],
  onProgress?: (done: number, total: number) => void,
): Promise<AiAnswer[]> {
  if (!PROXY) throw new Error("AI is niet beschikbaar (proxy niet ingesteld).")

  const system = `Je bent een senior UX/CRO/SEO-reviewer van BOLD700. Je beoordeelt een webpagina op een checklist. Voor ELKE vraag geef je een score en een korte onderbouwing in het Nederlands.
Scores: "good" = goed/voldoet, "ok" = matig/kan beter, "bad" = niet OK/probleem, "nvt" = niet te beoordelen op basis van de aangeleverde info.
Wees eerlijk en concreet. Als je iets echt niet kunt zien, gebruik "nvt". Houd elke notitie kort (1 zin).`

  const CHUNK = 30
  const chunks: AiQuestion[][] = []
  for (let i = 0; i < questions.length; i += CHUNK)
    chunks.push(questions.slice(i, i + CHUNK))

  const all: AiAnswer[] = []
  for (let ci = 0; ci < chunks.length; ci++) {
    onProgress?.(ci, chunks.length)
    const qList = chunks[ci]
      .map((q, i) => `${i + 1}. [id:${q.id}] (${q.category}) ${q.text}`)
      .join("\n")
    const user = `URL: ${url || "(onbekend)"}

PAGINA-INHOUD (ingekort):
"""
${pageText.slice(0, 7000)}
"""

CHECKLIST — beantwoord ELKE vraag hieronder:
${qList}

Antwoord UITSLUITEND met een JSON-array, geen tekst eromheen. Gebruik exact de meegegeven id's. Formaat:
[{"id":"<id>","score":"good|ok|bad|nvt","note":"<korte onderbouwing>"}]`

    try {
      const resp = await fetch(PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 4000,
          system,
          messages: [{ role: "user", content: [{ type: "text", text: user }] }],
        }),
      })
      if (!resp.ok) continue
      const j = await resp.json()
      const arr = parseJsonArray(j?.content?.[0]?.text || "")
      if (arr) all.push(...arr)
    } catch {
      // blok overslaan, rest gaat door
    }
  }
  onProgress?.(chunks.length, chunks.length)
  return all
}
