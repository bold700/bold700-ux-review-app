import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { signInAnonymously } from "firebase/auth"

import { getDb, getFirebaseAuth } from "@/lib/firebase"
import {
  buildReviewSteps,
  getBundleConfig,
  MODULE_REGISTRY,
} from "@/lib/modules"
import { fetchPage } from "@/lib/page-fetch"
import { suggestReview } from "@/lib/suggest-review"
import { runAutoScan } from "@/lib/auto-scan"
import { runAiReview } from "@/lib/ai-review"
import { projectScore } from "@/lib/score"
import { normalizeUrl, projectNameFromUrl } from "@/lib/url"
import type { Answer, Project, Score } from "@/lib/types"

const PROXY = process.env.NEXT_PUBLIC_AI_PROXY_URL
const DELAY_MS = 6 * 60 * 60 * 1000 // 6 uur (binnen een werkdag)
const REPORT_TTL_MS = 60 * 24 * 60 * 60 * 1000 // 60 dagen

export type LeadFollowUp =
  | "nieuw"
  | "opgevolgd"
  | "gesprek"
  | "klant"
  | "afgevallen"

export type ScanStatus = "queued" | "scanning" | "done" | "failed" | "sent"

export interface Lead {
  id: string
  name: string
  email: string
  url: string
  userId?: string
  createdAt: string
  createdAtMs: number
  deliverAtMs: number
  status: LeadFollowUp
  scanStatus: ScanStatus
  score?: number | null
  projectId?: string | null
  reportUrl?: string | null
  note?: string
  emailedAtMs?: number
  kennyNotifiedAtMs?: number
}

export const FOLLOWUP_LABELS: Record<LeadFollowUp, string> = {
  nieuw: "Nieuw",
  opgevolgd: "Opgevolgd",
  gesprek: "In gesprek",
  klant: "Klant",
  afgevallen: "Afgevallen",
}

export const SCAN_LABELS: Record<ScanStatus, string> = {
  queued: "In wachtrij",
  scanning: "Bezig",
  done: "Klaar",
  failed: "Gefaald",
  sent: "Verstuurd",
}

// Stuurt Kenny direct een notificatie via de Worker (fire-and-forget).
function notifyKenny(lead: Lead) {
  if (!PROXY) return
  const base = PROXY.replace(/\/$/, "")
  fetch(`${base}/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      url: lead.url,
      time: lead.createdAt,
    }),
  }).catch(() => {})
}

/**
 * Maakt een lead aan (en logt anoniem in zodat de Firestore-regels de aanmaak
 * toestaan). Notificeert Kenny direct. Retourneert de lead + uid.
 */
export async function createLead(input: {
  name: string
  email: string
  url: string
}): Promise<{ lead: Lead; uid: string }> {
  const auth = getFirebaseAuth()
  if (!auth.currentUser) await signInAnonymously(auth)
  const uid = auth.currentUser!.uid

  const now = Date.now()
  const id = `lead_${now}_${Math.random().toString(36).slice(2, 8)}`
  const lead: Lead = {
    id,
    name: input.name.trim(),
    email: input.email.trim(),
    url: input.url.trim(),
    userId: uid,
    createdAt: new Date(now).toISOString(),
    createdAtMs: now,
    deliverAtMs: now + DELAY_MS,
    status: "nieuw",
    scanStatus: "queued",
    score: null,
    projectId: null,
    reportUrl: null,
    note: "",
  }
  await setDoc(doc(getDb(), "leads", id), lead)
  notifyKenny(lead)
  return { lead, uid }
}

// Vult de checklist headless in: eerst deterministische scan, dan AI voor de rest.
async function computeAnswers(
  project: Project,
  doc0: Document,
  url: string,
  pageText: string,
): Promise<Record<string, Answer>> {
  const steps = buildReviewSteps(project.moduleConfig)
  const checks = steps.flatMap((s) =>
    s.questions.map((q) => ({ q, category: s.shortTitle })),
  )
  const valid = new Set<Score>(["good", "ok", "bad", "nvt"])
  const answers: Record<string, Answer> = {}

  const auto = runAutoScan(doc0, url, checks.map((c) => c.q))
  const autoIds = new Set(auto.map((r) => r.id))
  for (const r of auto) {
    if (!valid.has(r.score)) continue
    answers[r.id] = {
      score: r.score,
      notes: r.note ? "[Auto] " + r.note : "",
      autoScanned: true,
    }
  }

  const qs = checks
    .filter((c) => !autoIds.has(c.q.id))
    .map((c) => ({ id: c.q.id, text: c.q.text, category: c.category }))
  const ai = await runAiReview(url, pageText, qs)
  for (const r of ai) {
    if (!r?.id || !valid.has(r.score)) continue
    answers[r.id] = {
      score: r.score,
      notes: r.note ? "[AI] " + r.note : "",
      aiFilled: true,
    }
  }
  return answers
}

/**
 * Draait de scan voor een lead: herkent het paginatype, maakt een publiek
 * project aan, vult de checklist en slaat score + rapport-link op de lead op.
 * Bij een fout wordt de lead op "failed" gezet (failsafe: cron mailt dan Kenny).
 */
export async function runLeadScan(
  lead: Lead,
  uid: string,
): Promise<void> {
  const db = getDb()
  const leadRef = doc(db, "leads", lead.id)
  try {
    await updateDoc(leadRef, { scanStatus: "scanning" })
    const url = lead.url.trim()
    const page = await fetchPage(url)
    if (!page.doc || !page.text || page.text.trim().length < 40) {
      throw new Error("Pagina onbereikbaar")
    }
    const sug = await suggestReview(url, page.text)
    const bundleId = sug.bundleId
    const bundle = MODULE_REGISTRY.bundles[bundleId]

    const now = Date.now()
    const projectId = `proj_${now}_${Math.random().toString(36).slice(2, 8)}`
    const project: Project = {
      id: projectId,
      name: projectNameFromUrl(url) || url,
      url,
      urls: [url],
      client: "",
      mode: "self-service",
      sourceType: "url",
      userId: uid,
      leadEmail: lead.email,
      answers: {},
      currentStep: 0,
      createdAt: new Date(now).toISOString(),
      selectedTemplate: bundleId,
      moduleConfig: getBundleConfig(bundleId),
      public: true,
      sharedAt: new Date(now).toISOString(),
      shareExpiresAtMs: now + REPORT_TTL_MS,
    }
    project.answers = await computeAnswers(project, page.doc, page.url, page.text)
    const score = projectScore(project)
    const projectDoc = {
      ...project,
      leadId: lead.id,
      bundleName: bundle?.name_nl ?? "",
    }
    await setDoc(doc(db, "projects", projectId), projectDoc)
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://uxreviews.bold700.com"
    const reportUrl = `${origin}/report?id=${encodeURIComponent(projectId)}`

    await updateDoc(leadRef, {
      scanStatus: "done",
      score,
      projectId,
      reportUrl,
    })
  } catch (e) {
    console.error("[runLeadScan]", e)
    await updateDoc(leadRef, { scanStatus: "failed" }).catch(() => {})
  }
}

export function domainOfLead(l: Lead): string {
  return normalizeUrl(l.url) || l.url
}

/** Haalt alle leads op (voor het dashboard, admin/ingelogd). */
export async function fetchLeads(): Promise<Lead[]> {
  const snap = await getDocs(
    query(collection(getDb(), "leads"), orderBy("createdAtMs", "desc")),
  )
  return snap.docs.map((d) => d.data() as Lead)
}

export async function updateLead(
  id: string,
  patch: Partial<Lead>,
): Promise<void> {
  await updateDoc(doc(getDb(), "leads", id), patch)
}

/**
 * Verstuurt handmatig de resultaten-mail naar de aanvrager (via de Worker) en
 * markeert de lead als verstuurd. Gebruik dit vanuit het leads-dashboard.
 */
export async function sendLeadResult(lead: Lead): Promise<void> {
  if (!PROXY) throw new Error("Mailservice niet ingesteld (proxy ontbreekt).")
  const base = PROXY.replace(/\/$/, "")
  const resp = await fetch(`${base}/send-result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: lead.email,
      name: lead.name,
      url: lead.url,
      score: lead.score,
      reportUrl: lead.reportUrl,
      note: lead.note ?? "",
    }),
  })
  if (!resp.ok) throw new Error(`Verzenden mislukt (${resp.status})`)
  await updateLead(lead.id, { scanStatus: "sent", emailedAtMs: Date.now() })
}

/** Verwijdert een lead (recht op vergetelheid) én het bijbehorende scan-project. */
export async function deleteLead(
  id: string,
  projectId?: string | null,
): Promise<void> {
  const db = getDb()
  await deleteDoc(doc(db, "leads", id))
  if (projectId) {
    await deleteDoc(doc(db, "projects", projectId)).catch(() => {})
  }
}
