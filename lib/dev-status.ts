import { doc, updateDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"

export type DevStatusMap = Record<string, { done: boolean; at?: string }>

/**
 * Schrijft de verwerk-status van één verbeterpunt weg. Werkt alleen het
 * `devStatus`-veld bij, zodat de Firestore-regels dit ook zonder login
 * toestaan op een gedeeld (public) project.
 */
export async function setDevDone(
  projectId: string,
  findingId: string,
  done: boolean,
): Promise<void> {
  await updateDoc(doc(getDb(), "projects", projectId), {
    [`devStatus.${findingId}`]: done
      ? { done: true, at: new Date().toISOString() }
      : { done: false },
  })
}
