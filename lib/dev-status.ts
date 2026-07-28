import { doc, updateDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"

export type DevState = "open" | "done" | "question"

export interface DevEntry {
  status?: DevState
  done?: boolean // legacy, blijft voor oude data
  note?: string
  at?: string
}

export type DevStatusMap = Record<string, DevEntry>

export function devStateOf(e?: DevEntry): DevState {
  if (!e) return "open"
  if (e.status) return e.status
  return e.done ? "done" : "open"
}

export function isDone(e?: DevEntry): boolean {
  return devStateOf(e) === "done"
}
export function isQuestion(e?: DevEntry): boolean {
  return devStateOf(e) === "question"
}

/**
 * Schrijft de volledige verwerk-status van één verbeterpunt weg (status +
 * notitie). Werkt alleen het `devStatus`-veld bij, zodat de Firestore-regels
 * dit ook zonder login toestaan op een gedeeld (public) project.
 */
export async function saveDevStatus(
  projectId: string,
  findingId: string,
  entry: DevEntry,
): Promise<void> {
  await updateDoc(doc(getDb(), "projects", projectId), {
    [`devStatus.${findingId}`]: {
      status: entry.status ?? "open",
      done: (entry.status ?? "open") === "done",
      note: entry.note ?? "",
      at: new Date().toISOString(),
    },
  })
}
