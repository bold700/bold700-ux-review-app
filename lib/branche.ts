import { fetchPageText } from "@/lib/page-fetch"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export interface BrancheOption {
  slug: string
  label: string
}

/**
 * Vaste branche-taxonomie (~20 sectoren, MKB-gericht). Bewust een gesloten
 * lijst: vrije tekst maakt de data over 2 jaar onbruikbaar voor benchmarks.
 * Slugs NOOIT hernoemen (ze staan opgeslagen op projecten); alleen toevoegen.
 */
export const BRANCHES: BrancheOption[] = [
  { slug: "installatie", label: "Installatietechniek" },
  { slug: "bouw", label: "Bouw & aannemerij" },
  { slug: "dak-isolatie", label: "Dak & isolatie" },
  { slug: "schilder-afwerking", label: "Schilder & afwerking" },
  { slug: "hovenier-groen", label: "Hovenier & groen" },
  { slug: "auto-garage", label: "Auto & garage" },
  { slug: "horeca", label: "Horeca & catering" },
  { slug: "retail", label: "Retail & winkels" },
  { slug: "ecommerce", label: "E-commerce & webshop" },
  { slug: "zorg", label: "Zorg & welzijn" },
  { slug: "beauty-wellness", label: "Beauty & wellness" },
  { slug: "sport-fitness", label: "Sport & fitness" },
  { slug: "zakelijke-dienstverlening", label: "Zakelijke dienstverlening" },
  { slug: "marketing-creatief", label: "Marketing & creatief" },
  { slug: "it-software", label: "IT & software" },
  { slug: "onderwijs", label: "Onderwijs & training" },
  { slug: "vastgoed", label: "Vastgoed & makelaardij" },
  { slug: "transport-logistiek", label: "Transport & logistiek" },
  { slug: "non-profit", label: "Non-profit & vereniging" },
  { slug: "overig", label: "Overig" },
]

const BY_SLUG = new Map(BRANCHES.map((b) => [b.slug, b]))

export function brancheLabel(slug?: string | null): string {
  if (!slug) return "Onbekend"
  return BY_SLUG.get(slug)?.label ?? "Overig"
}

export function isBranche(slug?: string | null): slug is string {
  return !!slug && BY_SLUG.has(slug)
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
 * Laat de AI de branche bepalen op basis van de pagina-inhoud. Geeft een geldige
 * slug terug of null (dan valt de UI terug op handmatig kiezen / "overig").
 * Geef pageText mee als je die al hebt (bespaart een fetch).
 */
export async function detectBranche(
  url: string,
  pageText?: string,
): Promise<string | null> {
  if (!PROXY) return null
  let text = pageText
  if (!text) {
    try {
      text = await fetchPageText(url)
    } catch {
      text = ""
    }
  }
  if (!text || text.trim().length < 40) return null

  const list = BRANCHES.map((b) => `${b.slug} = ${b.label}`).join("\n")
  const system = `Je bepaalt in welke branche/sector een Nederlands MKB-bedrijf zit op basis van de website-inhoud. Kies UITSLUITEND een slug uit de vaste lijst. Antwoord uitsluitend met JSON.`
  const user = `URL: ${url}

PAGINA-INHOUD (ingekort):
"""
${text.slice(0, 5000)}
"""

BRANCHES (kies precies één slug uit deze lijst):
${list}

Antwoord UITSLUITEND met JSON: {"branche":"<slug>"}. Kies de best passende branche. Gebruik alleen "overig" als echt geen enkele branche past.`

  try {
    const resp = await fetch(PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 60,
        temperature: 0,
        system,
        messages: [{ role: "user", content: [{ type: "text", text: user }] }],
      }),
    })
    if (!resp.ok) throw new Error(String(resp.status))
    const j = await resp.json()
    const obj = parseObj(j?.content?.[0]?.text || "")
    const slug = obj?.branche as string | undefined
    return isBranche(slug) ? slug : null
  } catch {
    return null
  }
}
