const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

function extractText(doc: Document): string {
  const parts: string[] = []
  const title = doc.querySelector("title")?.textContent?.trim()
  if (title) parts.push("TITEL: " + title)
  const md = doc
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim()
  if (md) parts.push("META-DESCRIPTION: " + md)
  for (const tag of ["h1", "h2", "h3"]) {
    doc.querySelectorAll(tag).forEach((h) => {
      const t = h.textContent?.trim()
      if (t) parts.push(tag.toUpperCase() + ": " + t)
    })
  }
  const ctas: string[] = []
  doc.querySelectorAll("a, button").forEach((el) => {
    const t = el.textContent?.trim()
    if (t && t.length < 40) ctas.push(t)
  })
  if (ctas.length)
    parts.push("KNOPPEN/LINKS: " + [...new Set(ctas)].slice(0, 30).join(" | "))
  const imgs = doc.querySelectorAll("img")
  const noAlt = [...imgs].filter(
    (i) => !(i.getAttribute("alt") || "").trim(),
  ).length
  parts.push(`AFBEELDINGEN: ${imgs.length} totaal, ${noAlt} zonder alt-tekst`)
  const body = (doc.body?.textContent || "").replace(/\s+/g, " ").trim()
  parts.push("ZICHTBARE TEKST: " + body.slice(0, 5000))
  return parts.join("\n")
}

export interface FetchedPage {
  url: string
  html: string
  text: string
  doc: Document | null
}

// Haalt de pagina op via de Worker (/fetch): ruwe HTML, geparste DOM en tekst.
export async function fetchPage(url: string): Promise<FetchedPage> {
  const withProto = /^https?:\/\//.test(url) ? url : "https://" + url
  const empty: FetchedPage = { url: withProto, html: "", text: "", doc: null }
  if (!PROXY || !url) return empty
  const base = PROXY.replace(/\/$/, "")
  try {
    const resp = await fetch(`${base}/fetch?url=${encodeURIComponent(withProto)}`)
    if (!resp.ok) return empty
    const html = await resp.text()
    const doc = new DOMParser().parseFromString(html, "text/html")
    return { url: withProto, html, doc, text: extractText(doc) }
  } catch {
    return empty
  }
}

// Haalt de pagina op via de Worker (/fetch) en geeft de uitgelezen tekst terug.
export async function fetchPageText(url: string): Promise<string> {
  return (await fetchPage(url)).text
}
