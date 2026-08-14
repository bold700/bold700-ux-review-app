import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"

import { getDb } from "@/lib/firebase"

// Feedback-pins die op bold700.com achtergelaten worden (collectie siteFeedback).
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

// URL naar de site die ALLE pins van die pagina tegelijk toont. Met een
// optionele focus-index licht die ene pin extra op en scrollt de site ernaartoe.
export function feedbackPageUrl(
  list: SiteFeedback[],
  focus?: number,
): string {
  const path = list[0]?.path || "/"
  const compact = list.map((f) => ({
    x: Number(f.xPct.toFixed(2)),
    y: Math.round(f.yPx),
    t: f.text,
  }))
  const payload =
    focus == null ? { p: compact } : { p: compact, f: focus }
  const bytes = new TextEncoder().encode(JSON.stringify(payload))
  let bin = ""
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return `${SITE_ORIGIN}${path}#fball=${btoa(bin)}`
}

// Alias: alle pins zonder focus.
export function feedbackAllPageUrl(list: SiteFeedback[]): string {
  return feedbackPageUrl(list)
}

const COL = "siteFeedback"

export function subscribeSiteFeedback(cb: (items: SiteFeedback[]) => void) {
  const q = query(collection(getDb(), COL), orderBy("createdAtMs", "desc"))
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          path: data.path ?? "/",
          xPct: data.xPct ?? 50,
          yPx: data.yPx ?? 0,
          docWidth: data.docWidth ?? 0,
          docHeight: data.docHeight ?? 0,
          viewportW: data.viewportW ?? 0,
          viewportH: data.viewportH ?? 0,
          text: data.text ?? "",
          name: data.name ?? "",
          status: (data.status as "open" | "done") ?? "open",
          createdAtMs: data.createdAtMs ?? 0,
        }
      }),
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
