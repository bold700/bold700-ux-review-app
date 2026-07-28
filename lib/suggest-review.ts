import { MODULE_REGISTRY, quickScanBundles } from "@/lib/modules"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export interface ReviewSuggestion {
  bundleId: string
  pageType: string
  reason: string
}

/** Kandidaat-bundels: page-type Quick Scans voor URL's. */
export function suggestionCandidates() {
  return quickScanBundles("url").filter(
    (b) => !b.is_free_form && !!b.page_type,
  )
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
 * Laat de AI de pagina herkennen en de best passende Quick Scan kiezen.
 * Valt terug op de Homepage Quick Scan als er geen bruikbaar antwoord komt.
 */
export async function suggestReview(
  url: string,
  pageText: string,
): Promise<ReviewSuggestion> {
  const candidates = suggestionCandidates()
  const fallback =
    candidates.find((c) => c.page_type === "homepage")?.id ??
    candidates[0]?.id ??
    "qs-homepage"

  if (!PROXY || !pageText || pageText.trim().length < 40) {
    return {
      bundleId: fallback,
      pageType: "homepage",
      reason: "Geen pagina-inhoud beschikbaar, terugval op Homepage-scan.",
    }
  }

  const list = candidates
    .map(
      (c) =>
        `- id:${c.id} | type:${c.page_type} | ${c.name_nl} — ${c.description_nl ?? ""}`,
    )
    .join("\n")

  const system = `Je bent een senior UX/CRO-reviewer van BOLD700. Je herkent op basis van pagina-inhoud (titel, meta, koppen, teksten, knoppen) welk soort pagina dit is en kiest de best passende review-scan uit een vaste lijst. Antwoord uitsluitend met JSON.`

  const user = `URL: ${url || "(onbekend)"}

PAGINA-INHOUD (ingekort):
"""
${pageText.slice(0, 6000)}
"""

BESCHIKBARE SCANS (kies er precies één):
${list}

Kies de scan die het beste past bij deze pagina. Antwoord UITSLUITEND met JSON, exact dit formaat en een geldig id uit de lijst:
{"bundleId":"<id>","pageType":"<type>","reason":"<één korte zin in het Nederlands waarom deze past>"}`

  try {
    const resp = await fetch(PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 300,
        system,
        messages: [{ role: "user", content: [{ type: "text", text: user }] }],
      }),
    })
    if (!resp.ok) throw new Error(String(resp.status))
    const j = await resp.json()
    const obj = parseObj(j?.content?.[0]?.text || "")
    const bundleId = obj?.bundleId as string | undefined
    if (bundleId && MODULE_REGISTRY.bundles[bundleId]) {
      return {
        bundleId,
        pageType: (obj?.pageType as string) || "",
        reason: (obj?.reason as string) || "",
      }
    }
  } catch {
    // val terug
  }
  return {
    bundleId: fallback,
    pageType: "homepage",
    reason: "AI kon het type niet bepalen, terugval op Homepage-scan.",
  }
}
