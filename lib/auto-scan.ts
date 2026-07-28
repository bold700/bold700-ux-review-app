import type { Score } from "@/lib/types"
import type { ReviewCheck } from "@/lib/modules"

export interface AutoResult {
  id: string
  score: Score
  note: string
}

type Ruled = { score: Score; note: string } | null
type RuleFn = (doc: Document, url: string) => Ruled

const txt = (el: Element | null) => (el?.textContent || "").replace(/\s+/g, " ").trim()

function accessibleName(el: Element): string {
  const aria = el.getAttribute("aria-label")?.trim()
  if (aria) return aria
  const labelledby = el.getAttribute("aria-labelledby")
  if (labelledby) {
    const ref = labelledby
      .split(/\s+/)
      .map((idr) => txt(el.ownerDocument.getElementById(idr)))
      .join(" ")
      .trim()
    if (ref) return ref
  }
  const t = txt(el)
  if (t) return t
  const title = el.getAttribute("title")?.trim()
  if (title) return title
  const img = el.querySelector("img[alt]")
  const alt = img?.getAttribute("alt")?.trim()
  return alt || ""
}

function hasLabel(el: Element): boolean {
  if (accessibleName(el)) return true
  const id = el.getAttribute("id")
  if (id) {
    const esc =
      typeof CSS !== "undefined" && CSS.escape
        ? CSS.escape(id)
        : id.replace(/"/g, '\\"')
    if (el.ownerDocument.querySelector(`label[for="${esc}"]`)) return true
  }
  if (el.closest("label")) return true
  return false
}

function metaContent(doc: Document, sel: string): string | null {
  const el = doc.querySelector(sel)
  return el ? (el.getAttribute("content") || "").trim() : null
}

const FORM_SELECTOR =
  'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]), select, textarea'

const RULES: Record<string, RuleFn> = {
  // ---- Toegankelijkheid (uit de DOM) ----
  "image-alt": (doc) => {
    const imgs = [...doc.querySelectorAll("img")]
    if (!imgs.length) return { score: "nvt", note: "Geen afbeeldingen op de pagina." }
    const missing = imgs.filter((i) => i.getAttribute("alt") === null).length
    return missing === 0
      ? { score: "good", note: `Alle ${imgs.length} afbeeldingen hebben een alt-attribuut.` }
      : { score: "bad", note: `${missing} van ${imgs.length} afbeeldingen missen een alt-attribuut.` }
  },
  "document-title": (doc) => {
    const t = txt(doc.querySelector("title"))
    return t
      ? { score: "good", note: `Titel aanwezig: "${t.slice(0, 60)}".` }
      : { score: "bad", note: "Pagina heeft geen <title>." }
  },
  "title-length": (doc) => {
    const t = txt(doc.querySelector("title"))
    if (!t) return { score: "bad", note: "Geen <title> gevonden." }
    const n = t.length
    if (n >= 30 && n <= 60)
      return { score: "good", note: `Titellengte is ${n} tekens (ideaal 30-60).` }
    return { score: "ok", note: `Titellengte is ${n} tekens (ideaal 30-60).` }
  },
  "html-has-lang": (doc) => {
    const lang = doc.documentElement.getAttribute("lang")?.trim()
    return lang
      ? { score: "good", note: `lang-attribuut aanwezig: "${lang}".` }
      : { score: "bad", note: "De <html> mist een lang-attribuut." }
  },
  "html-lang-valid": (doc) => {
    const lang = doc.documentElement.getAttribute("lang")?.trim()
    if (!lang) return { score: "bad", note: "Geen lang-attribuut om te valideren." }
    return /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(lang)
      ? { score: "good", note: `lang="${lang}" heeft een geldig formaat.` }
      : { score: "bad", note: `lang="${lang}" heeft geen geldig formaat.` }
  },
  "h1-present": (doc) => {
    const n = doc.querySelectorAll("h1").length
    return n >= 1
      ? { score: "good", note: `${n} H1 gevonden.` }
      : { score: "bad", note: "Geen H1 op de pagina." }
  },
  "single-h1": (doc) => {
    const n = doc.querySelectorAll("h1").length
    if (n === 1) return { score: "good", note: "Precies één H1." }
    if (n === 0) return { score: "bad", note: "Geen H1 gevonden." }
    return { score: "ok", note: `${n} H1's gevonden (idealiter één).` }
  },
  "heading-order": (doc) => {
    const hs = [...doc.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
      Number(h.tagName[1]),
    )
    if (!hs.length) return { score: "bad", note: "Geen koppen gevonden." }
    let skips = 0
    for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skips++
    return skips === 0
      ? { score: "good", note: "Koppenniveaus lopen logisch op zonder oversprongen." }
      : { score: "ok", note: `${skips}× een oversprongen koppenniveau (bijv. H2 naar H4).` }
  },
  "link-name": (doc) => {
    const links = [...doc.querySelectorAll("a[href]")]
    if (!links.length) return { score: "nvt", note: "Geen links gevonden." }
    const empty = links.filter((a) => !accessibleName(a)).length
    return empty === 0
      ? { score: "good", note: `Alle ${links.length} links hebben een leesbare tekst.` }
      : { score: "bad", note: `${empty} links hebben geen leesbare linktekst.` }
  },
  "descriptive-anchors": (doc) => {
    const generic = /^(lees meer|klik hier|hier|meer|read more|click here|more|link)$/i
    const links = [...doc.querySelectorAll("a[href]")]
    const vague = links.filter((a) => generic.test(accessibleName(a))).length
    return vague === 0
      ? { score: "good", note: "Geen vage linkteksten zoals 'lees meer' of 'klik hier'." }
      : { score: "ok", note: `${vague} vage linkteksten (bijv. 'lees meer', 'klik hier').` }
  },
  "button-name": (doc) => {
    const btns = [...doc.querySelectorAll("button")]
    if (!btns.length) return { score: "nvt", note: "Geen <button>-elementen." }
    const empty = btns.filter((b) => !accessibleName(b)).length
    return empty === 0
      ? { score: "good", note: `Alle ${btns.length} knoppen hebben een toegankelijke naam.` }
      : { score: "bad", note: `${empty} knoppen missen een toegankelijke naam.` }
  },
  label: (doc) => {
    const ctrls = [...doc.querySelectorAll(FORM_SELECTOR)]
    if (!ctrls.length) return { score: "nvt", note: "Geen formuliervelden gevonden." }
    const missing = ctrls.filter((c) => !hasLabel(c)).length
    return missing === 0
      ? { score: "good", note: `Alle ${ctrls.length} formuliervelden hebben een label.` }
      : { score: "bad", note: `${missing} van ${ctrls.length} formuliervelden missen een gekoppeld label.` }
  },
  "select-name": (doc) => {
    const sel = [...doc.querySelectorAll("select")]
    if (!sel.length) return { score: "nvt", note: "Geen keuzemenu's gevonden." }
    const missing = sel.filter((s) => !hasLabel(s) && !s.getAttribute("name")).length
    return missing === 0
      ? { score: "good", note: "Alle keuzemenu's hebben een naam/label." }
      : { score: "bad", note: `${missing} keuzemenu's missen een naam/label.` }
  },
  viewport: (doc) => {
    const v = metaContent(doc, 'meta[name="viewport"]')
    if (!v) return { score: "bad", note: "Geen viewport-meta-tag (slecht voor mobiel)." }
    return /width\s*=\s*device-width/i.test(v)
      ? { score: "good", note: "Viewport ingesteld op device-width." }
      : { score: "ok", note: `Viewport aanwezig maar zonder device-width: "${v}".` }
  },
  "content-width": (doc) => RULES.viewport(doc, ""),
  "landmark-one-main": (doc) => {
    const n = doc.querySelectorAll('main, [role="main"]').length
    if (n === 1) return { score: "good", note: "Eén <main>-landmark aanwezig." }
    if (n === 0) return { score: "ok", note: "Geen <main>-landmark gevonden." }
    return { score: "ok", note: `${n} main-landmarks (idealiter één).` }
  },
  region: (doc) => RULES["landmark-one-main"](doc, ""),
  "frame-title": (doc) => {
    const frames = [...doc.querySelectorAll("iframe")]
    if (!frames.length) return { score: "nvt", note: "Geen iframes." }
    const missing = frames.filter((f) => !f.getAttribute("title")?.trim()).length
    return missing === 0
      ? { score: "good", note: "Alle iframes hebben een title." }
      : { score: "bad", note: `${missing} iframes missen een title.` }
  },
  "duplicate-id-active": (doc) => {
    const ids = [...doc.querySelectorAll("[id]")].map((e) => e.id)
    const seen = new Set<string>()
    const dup = new Set<string>()
    for (const id of ids) (seen.has(id) ? dup : seen).add(id)
    return dup.size === 0
      ? { score: "good", note: "Geen dubbele id's gevonden." }
      : { score: "bad", note: `${dup.size} dubbele id-waarden gevonden.` }
  },
  tabindex: (doc) => {
    const pos = [...doc.querySelectorAll("[tabindex]")].filter(
      (e) => Number(e.getAttribute("tabindex")) > 0,
    ).length
    return pos === 0
      ? { score: "good", note: "Geen positieve tabindex-waarden (anti-patroon)." }
      : { score: "ok", note: `${pos} elementen met tabindex > 0 (verstoort tab-volgorde).` }
  },

  // ---- SEO / meta (uit de DOM) ----
  "canonical-present": (doc) => {
    const c = doc.querySelector('link[rel="canonical"]')?.getAttribute("href")
    return c
      ? { score: "good", note: "Canonical-tag aanwezig." }
      : { score: "ok", note: "Geen canonical-tag gevonden." }
  },
  "canonical-self-ref": (doc, url) => {
    const c = doc.querySelector('link[rel="canonical"]')?.getAttribute("href")
    if (!c) return { score: "nvt", note: "Geen canonical-tag." }
    const norm = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "")
    return norm(c) === norm(url)
      ? { score: "good", note: "Canonical verwijst naar de pagina zelf." }
      : { score: "ok", note: `Canonical wijst naar een andere URL: ${c}.` }
  },
  "meta-desc-length": (doc) => {
    const d = metaContent(doc, 'meta[name="description"]')
    if (!d) return { score: "bad", note: "Geen meta-description." }
    const n = d.length
    if (n >= 50 && n <= 160)
      return { score: "good", note: `Meta-description is ${n} tekens (ideaal 50-160).` }
    return { score: "ok", note: `Meta-description is ${n} tekens (ideaal 50-160).` }
  },
  "meta-robots-valid": (doc) => {
    const r = metaContent(doc, 'meta[name="robots"]')
    if (!r) return { score: "good", note: "Geen robots-meta die indexering blokkeert." }
    return /noindex/i.test(r)
      ? { score: "bad", note: `Pagina staat op noindex: "${r}".` }
      : { score: "good", note: `Robots-meta oké: "${r}".` }
  },
  "no-accidental-noindex": (doc) => RULES["meta-robots-valid"](doc, ""),
  "json-ld-present": (doc) => {
    const n = doc.querySelectorAll('script[type="application/ld+json"]').length
    return n > 0
      ? { score: "good", note: `${n} JSON-LD structured-data-blok(ken) gevonden.` }
      : { score: "ok", note: "Geen JSON-LD structured data gevonden." }
  },
  "json-ld-valid": (doc) => {
    const blocks = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    if (!blocks.length) return { score: "nvt", note: "Geen JSON-LD aanwezig." }
    let bad = 0
    for (const b of blocks) {
      try {
        JSON.parse(b.textContent || "")
      } catch {
        bad++
      }
    }
    return bad === 0
      ? { score: "good", note: "Alle JSON-LD-blokken zijn geldige JSON." }
      : { score: "bad", note: `${bad} JSON-LD-blok(ken) bevatten ongeldige JSON.` }
  },
  "org-schema": (doc) => {
    const has = [...doc.querySelectorAll('script[type="application/ld+json"]')].some(
      (b) => /"@type"\s*:\s*"(Organization|LocalBusiness|Corporation)"/i.test(b.textContent || ""),
    )
    return has
      ? { score: "good", note: "Organization-schema aanwezig." }
      : { score: "ok", note: "Geen Organization-schema gevonden." }
  },
  "breadcrumb-schema": (doc) => {
    const has = [...doc.querySelectorAll('script[type="application/ld+json"]')].some(
      (b) => /BreadcrumbList/i.test(b.textContent || ""),
    )
    return has
      ? { score: "good", note: "BreadcrumbList-schema aanwezig." }
      : { score: "ok", note: "Geen BreadcrumbList-schema gevonden." }
  },
  "og-title": (doc) => ogRule(doc, "og:title", "Open Graph titel"),
  "og-description": (doc) => ogRule(doc, "og:description", "Open Graph beschrijving"),
  "og-image": (doc) => ogRule(doc, "og:image", "Open Graph afbeelding"),
  "twitter-card": (doc) =>
    metaContent(doc, 'meta[name="twitter:card"]')
      ? { score: "good", note: "Twitter Card-tag aanwezig." }
      : { score: "ok", note: "Geen Twitter Card-tag." },
  "hreflang-present": (doc) => {
    const n = doc.querySelectorAll('link[rel="alternate"][hreflang]').length
    return n > 0
      ? { score: "good", note: `${n} hreflang-varianten gedefinieerd.` }
      : { score: "nvt", note: "Geen hreflang (alleen relevant bij meertalige site)." }
  },
  "img-dimensions": (doc) => {
    const imgs = [...doc.querySelectorAll("img")]
    if (!imgs.length) return { score: "nvt", note: "Geen afbeeldingen." }
    const sized = imgs.filter(
      (i) => i.getAttribute("width") && i.getAttribute("height"),
    ).length
    if (sized === imgs.length)
      return { score: "good", note: "Alle afbeeldingen hebben width/height (voorkomt layout shift)." }
    return { score: "ok", note: `${imgs.length - sized}/${imgs.length} afbeeldingen missen width/height.` }
  },
  "noopener-links": (doc) => {
    const blanks = [...doc.querySelectorAll('a[target="_blank"]')]
    if (!blanks.length) return { score: "nvt", note: "Geen target=_blank links." }
    const unsafe = blanks.filter(
      (a) => !/noopener|noreferrer/i.test(a.getAttribute("rel") || ""),
    ).length
    return unsafe === 0
      ? { score: "good", note: "Alle nieuwe-tab-links gebruiken rel=noopener." }
      : { score: "ok", note: `${unsafe} links openen in nieuw tabblad zonder rel=noopener.` }
  },
  "is-on-https": (_doc, url) => httpsRule(url),
  "urls-https": (_doc, url) => httpsRule(url),
  "https-redirect": (_doc, url) => httpsRule(url),
}

function ogRule(doc: Document, prop: string, label: string): Ruled {
  const c = metaContent(doc, `meta[property="${prop}"]`)
  return c
    ? { score: "good", note: `${label} aanwezig.` }
    : { score: "ok", note: `${label} ontbreekt (minder goede social-preview).` }
}

function httpsRule(url: string): Ruled {
  return /^https:\/\//i.test(url)
    ? { score: "good", note: "Pagina wordt via HTTPS geserveerd." }
    : { score: "bad", note: "Pagina is niet via HTTPS bereikbaar." }
}

/** Aantal checks dat de deterministische engine kan beoordelen. */
export function autoScannableCount(checks: ReviewCheck[]): number {
  return checks.filter((c) => c.auto_rule && RULES[c.auto_rule]).length
}

/**
 * Beoordeelt de checks die deterministisch uit de opgehaalde HTML te bepalen
 * zijn. Retourneert per check { id, score, note }. Checks zonder bekende
 * regel (Lighthouse, headers, rendering) worden overgeslagen.
 */
export function runAutoScan(
  doc: Document,
  url: string,
  checks: ReviewCheck[],
): AutoResult[] {
  const out: AutoResult[] = []
  for (const c of checks) {
    const rule = c.auto_rule ? RULES[c.auto_rule] : undefined
    if (!rule) continue
    try {
      const r = rule(doc, url)
      if (r) out.push({ id: c.id, score: r.score, note: r.note })
    } catch {
      // regel overslaan bij fout
    }
  }
  return out
}
