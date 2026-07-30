import { doc, updateDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL

export type DevEventType = "question" | "note" | "all-done"

/**
 * Stuurt de reviewer (Kenny) een mail als de developer een vraag stelt, een
 * notitie achterlaat of alles heeft verwerkt. Fire-and-forget via de Worker.
 */
export function notifyDevEvent(payload: {
  type: DevEventType
  projectName: string
  url: string
  reportUrl: string
  findingTitle?: string
  text?: string
}) {
  if (!PROXY) return
  const base = PROXY.replace(/\/$/, "")
  fetch(`${base}/dev-event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {})
}

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
