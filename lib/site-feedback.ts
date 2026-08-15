import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore"

import { getDb } from "@/lib/firebase"

// Feedback-pins (collectie siteFeedback). Twee herkomsten, hetzelfde model:
//  • zonder projectId → pins op bold700.com zelf (components/feedback-pins.tsx
//    in de repo bold700-site) → dashboard /site-feedback
//  • met projectId → pins op een KLANTSITE, geplaatst via public/pin.js en
//    opgeslagen door de Worker (POST /pin) → paneel bij de review
export type SiteFeedback = {
  id: string
  path: string
  xPct: number
  yPx: number
  docWidth: number
  docHeight: number
  viewportW: number
  viewportH: number
  text: string
  name?: string
  status: "open" | "done"
  createdAtMs: number
  // alleen bij pins van een klantsite
  projectId?: string
  origin?: string
  url?: string
  title?: string
  selector?: string
  elementText?: string
  // het domein los, voor "alle pins van deze website"
  site?: string
  // wie de pin plaatste: authorId is stabiel per browser/extensie, userId
  // wordt gevuld zodra de plaatser een account heeft
  authorId?: string
  userId?: string
}

// Apparaat afleiden uit de viewport-breedte (val terug op de documentbreedte
// voor oudere pins zonder viewport-veld).
export function deviceOf(f: SiteFeedback): {
  label: "Mobiel" | "Tablet" | "Desktop"
  emoji: string
  width: number
} {
  const w = f.viewportW || f.docWidth || 0
  if (w > 0 && w < 768) return { label: "Mobiel", emoji: "📱", width: w }
  if (w > 0 && w < 1024) return { label: "Tablet", emoji: "◲", width: w }
  return { label: "Desktop", emoji: "🖥", width: w }
}

// Waar de pin vandaan komt. Pins van een klantsite dragen hun eigen origin;
// oude bold700-pins hebben dat veld niet en vallen terug op SITE_ORIGIN.
export function originOf(f: SiteFeedback): string {
  return (f.origin || SITE_ORIGIN).replace(/\/+$/, "")
}

// URL naar de site die ALLE pins van die pagina tegelijk toont. Met een
// optionele focus-index licht die ene pin extra op en scrollt de site ernaartoe.
export function feedbackPageUrl(list: SiteFeedback[], focus?: number): string {
  const first = list[0]
  const path = first?.path || "/"
  const compact = list.map((f) => ({
    x: Number(f.xPct.toFixed(2)),
    y: Math.round(f.yPx),
    t: f.text,
  }))
  const payload = focus == null ? { p: compact } : { p: compact, f: focus }
  const bytes = new TextEncoder().encode(JSON.stringify(payload))
  let bin = ""
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return `${originOf(first)}${path}#fball=${btoa(bin)}`
}

// Alias: alle pins zonder focus.
export function feedbackAllPageUrl(list: SiteFeedback[]): string {
  return feedbackPageUrl(list)
}

// Klantsite-pins openen we via de bekijkmodus van pin.js: het script laadt de
// pins zelf op bij de Worker, dus de URL blijft kort.
export function pinViewUrl(f: SiteFeedback): string {
  const base = f.url || `${originOf(f)}${f.path || "/"}`
  return `${base.split("#")[0]}#uxpins`
}

const COL = "siteFeedback"

function toFeedback(id: string, data: Record<string, unknown>): SiteFeedback {
  const num = (v: unknown, fallback = 0) =>
    typeof v === "number" ? v : fallback
  const str = (v: unknown) => (typeof v === "string" ? v : undefined)
  return {
    id,
    path: str(data.path) ?? "/",
    xPct: num(data.xPct, 50),
    yPx: num(data.yPx),
    docWidth: num(data.docWidth),
    docHeight: num(data.docHeight),
    viewportW: num(data.viewportW),
    viewportH: num(data.viewportH),
    text: str(data.text) ?? "",
    name: str(data.name) ?? "",
    status: data.status === "done" ? "done" : "open",
    createdAtMs: num(data.createdAtMs),
    projectId: str(data.projectId),
    origin: str(data.origin),
    url: str(data.url),
    title: str(data.title),
    selector: str(data.selector),
    elementText: str(data.elementText),
    site: str(data.site),
    authorId: str(data.authorId),
    userId: str(data.userId),
  }
}

// Alle pins, van elke website. Het dashboard groepeert ze zelf per site.
export function subscribeSiteFeedback(cb: (items: SiteFeedback[]) => void) {
  const q = query(collection(getDb(), COL), orderBy("createdAtMs", "desc"))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => toFeedback(d.id, d.data())))
  })
}

// Het domein waar een pin bij hoort. Nieuwe pins hebben `site`; oudere pins van
// bold700.com hebben dat veld niet en vallen terug op hun origin.
export function siteOf(f: SiteFeedback): string {
  if (f.site) return f.site
  try {
    return new URL(originOf(f)).hostname.replace(/^www\./, "")
  } catch {
    return "onbekend"
  }
}

// Welke pins zijn nieuw sinds je voor het laatst naar deze site keek. Bewust in
// localStorage: het is een leeshulp per persoon, geen gedeelde status.
const SEEN_KEY = "sitefeedback.seen"

export function allSeen(): Record<string, number> {
  if (typeof window === "undefined") return {}
  try {
    const all = JSON.parse(localStorage.getItem(SEEN_KEY) || "{}")
    return typeof all === "object" && all ? all : {}
  } catch {
    return {}
  }
}

export function markSeen(site: string, atMs: number) {
  if (typeof window === "undefined") return
  try {
    const all = JSON.parse(localStorage.getItem(SEEN_KEY) || "{}")
    all[site] = Math.max(atMs, all[site] ?? 0)
    localStorage.setItem(SEEN_KEY, JSON.stringify(all))
  } catch {
    /* privémodus: dan maar geen "nieuw"-markering */
  }
}

// Pins die op de klantsite van dit review-project zijn geplaatst. Bewust
// zonder orderBy: een filter plus sortering op een ander veld vraagt om een
// samengestelde index in Firestore, en dit zijn er hooguit een paar honderd.
export function subscribeProjectPins(
  projectId: string,
  cb: (items: SiteFeedback[]) => void,
) {
  const q = query(collection(getDb(), COL), where("projectId", "==", projectId))
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs
        .map((d) => toFeedback(d.id, d.data()))
        .sort((a, b) => a.createdAtMs - b.createdAtMs),
    )
  })
}

export async function setSiteFeedbackStatus(id: string, status: "open" | "done") {
  await updateDoc(doc(getDb(), COL, id), { status })
}

export async function deleteSiteFeedback(id: string) {
  await deleteDoc(doc(getDb(), COL, id))
}

// Basis-URL van de site waar de feedback vandaan komt (voor "open pagina").
// Voorlopig de Vercel-URL; wijzig naar https://bold700.com zodra dat domein live is.
export const SITE_ORIGIN = "https://bold700-site.vercel.app"

// ── Insluiten op een klantsite ──────────────────────────────
// Het script staat in public/pin.js en wordt door de app zelf geserveerd.
export function pinScriptUrl(projectId: string, origin?: string): string {
  const base = (
    origin ||
    (typeof window !== "undefined" ? window.location.origin : "https://uxreviews.bold700.com")
  ).replace(/\/+$/, "")
  return `${base}/pin.js?p=${encodeURIComponent(projectId)}`
}

// Script-tag die de klant in zijn site plakt.
export function pinSnippet(projectId: string, origin?: string): string {
  return `<script src="${pinScriptUrl(projectId, origin)}" defer></script>`
}

// Bookmarklet: laadt hetzelfde script op de pagina waar je op dat moment staat.
// Werkt zonder medewerking van de klant, behalve op sites met een strikte
// Content-Security-Policy (die blokkeert het inladen van extern script).
export function pinBookmarklet(projectId: string, origin?: string): string {
  const src = pinScriptUrl(projectId, origin)
  return `javascript:(function(){var s=document.createElement('script');s.src='${src}&t='+Date.now();document.body.appendChild(s);})();`
}

// Failsafe voor sites met een strikte CSP: dit plak je in de DevTools-console.
export function pinConsoleSnippet(projectId: string, origin?: string): string {
  return `fetch('${pinScriptUrl(projectId, origin)}').then(r=>r.text()).then(eval)`
}
