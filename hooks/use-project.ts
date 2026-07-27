"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"

import { getDb } from "@/lib/firebase"
import type { Answer, Project } from "@/lib/types"

type State = Project | null | undefined // undefined = laden, null = niet gevonden

export function useProject(id: string) {
  const [project, setProject] = useState<State>(undefined)
  const [saving, setSaving] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const snap = await getDoc(doc(getDb(), "projects", id))
        if (!cancelled)
          setProject(
            snap.exists() ? ({ id: snap.id, ...snap.data() } as Project) : null,
          )
      } catch (e) {
        console.error("[useProject]", e)
        if (!cancelled) setProject(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  const persist = useCallback(
    (answers: Record<string, Answer>) => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      setSaving(true)
      saveTimer.current = setTimeout(async () => {
        try {
          await updateDoc(doc(getDb(), "projects", id), {
            answers,
            updatedAt: new Date().toISOString(),
          })
        } catch (e) {
          console.error("[useProject:save]", e)
        } finally {
          setSaving(false)
        }
      }, 600)
    },
    [id],
  )

  const setAnswer = useCallback(
    (qId: string, patch: Partial<Answer>) => {
      setProject((p) => {
        if (!p) return p
        const answers = { ...(p.answers ?? {}) }
        answers[qId] = { ...(answers[qId] ?? {}), ...patch }
        persist(answers)
        return { ...p, answers }
      })
    },
    [persist],
  )

  return { project, setAnswer, saving }
}
