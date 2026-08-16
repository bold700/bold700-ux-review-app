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

// Leads uit de qualifier-tool op bold700.com (collectie bold700Leads).
export type WebsiteLead = {
  id: string
  name: string
  email: string
  answers: { intentId: string; question: string; answer: string }[]
  headline: string
  diagnosis: string
  advice: string[]
  recommendedType: string
  status: LeadStatus
  createdAtMs: number
}

export type LeadStatus = "nieuw" | "opgevolgd" | "klant" | "afgevallen"

export const STATUS_LABELS: Record<LeadStatus, string> = {
  nieuw: "Nieuw",
  opgevolgd: "Opgevolgd",
  klant: "Klant",
  afgevallen: "Afgevallen",
}

const COL = "bold700Leads"

export function subscribeWebsiteLeads(
  cb: (items: WebsiteLead[]) => void,
  onError?: (e: Error) => void,
) {
  const q = query(collection(getDb(), COL), orderBy("createdAtMs", "desc"))
  return onSnapshot(
    q,
    (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          name: data.name ?? "",
          email: data.email ?? "",
          answers: Array.isArray(data.answers) ? data.answers : [],
          headline: data.headline ?? "",
          diagnosis: data.diagnosis ?? "",
          advice: Array.isArray(data.advice) ? data.advice : [],
          recommendedType: data.recommendedType ?? "",
          status: (data.status as LeadStatus) ?? "nieuw",
          createdAtMs: data.createdAtMs ?? 0,
        }
      }),
    )
    },
    (e) => {
      console.error("[websiteLeads]", e)
      onError?.(e)
    },
  )
}

export async function setWebsiteLeadStatus(id: string, status: LeadStatus) {
  await updateDoc(doc(getDb(), COL, id), { status })
}

export async function deleteWebsiteLead(id: string) {
  await deleteDoc(doc(getDb(), COL, id))
}
