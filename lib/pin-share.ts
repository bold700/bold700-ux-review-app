import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"

import { getDb } from "@/lib/firebase"
import type { SiteFeedback } from "@/lib/site-feedback"
import type { Project } from "@/lib/types"

// Pins delen met de eigenaar van de site: dezelfde deel-link als bij een
// rapport (public), maar met een eigen pagina die de pins per pagina toont in
// plaats van een scorecard. Afvinken loopt via `devStatus`, precies zoals de
// developer-checklist, dus zonder login.
//
// Geen vervaldatum: aan de andere kant zit iemand die de hele lijst moet
// afwerken. Delen stopt met `stopSharingPins`, dat zet public terug op false.

export function pinShareUrl(projectId: string, origin?: string): string {
  const base = (
    origin ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://uxreviews.bold700.com")
  ).replace(/\/+$/, "")
  return `${base}/pins?id=${encodeURIComponent(projectId)}`
}

/** Zet het project op gedeeld en geeft de link terug. */
export async function sharePins(projectId: string): Promise<string> {
  await updateDoc(doc(getDb(), "projects", projectId), {
    public: true,
    sharedAt: new Date().toISOString(),
    // Een eerder gezette vervaldatum weghalen, anders sterft de link alsnog.
    shareExpiresAtMs: deleteField(),
  })
  return pinShareUrl(projectId)
}

export async function stopSharingPins(projectId: string): Promise<void> {
  await updateDoc(doc(getDb(), "projects", projectId), { public: false })
}

export type SharedPins = {
  project: Project
  pins: SiteFeedback[]
}

/** Leest een gedeeld pin-rapport. Werkt zonder login zolang de link geldig is. */
export async function loadSharedPins(projectId: string): Promise<SharedPins | null> {
  const snap = await getDoc(doc(getDb(), "projects", projectId))
  if (!snap.exists()) return null
  const project = { id: snap.id, ...snap.data() } as Project
  if (!project.public) return null
  if (project.shareExpiresAtMs && Date.now() > project.shareExpiresAtMs) return null

  const rows = await getDocs(
    query(collection(getDb(), "siteFeedback"), where("projectId", "==", projectId)),
  )
  const pins = rows.docs
    .map((d) => ({ id: d.id, ...d.data() }) as unknown as SiteFeedback)
    .sort((a, b) => (a.createdAtMs ?? 0) - (b.createdAtMs ?? 0))

  return { project, pins }
}

/** De schermopname van één pin. Apart opgeslagen, dus apart opgehaald. */
export async function loadPinShot(pinId: string): Promise<string | null> {
  try {
    const snap = await getDoc(doc(getDb(), "pinShots", pinId))
    const img = snap.exists() ? (snap.data().image as unknown) : null
    return typeof img === "string" ? img : null
  } catch {
    return null
  }
}
