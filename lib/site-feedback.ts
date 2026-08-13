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
  text: string
  name?: string
  status: "open" | "done"
  createdAtMs: number
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
