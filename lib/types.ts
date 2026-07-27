// Datamodel — spiegelt de bestaande Firestore-structuur (v1) zodat oud en
// nieuw dezelfde data delen. Alleen uitbreiden, nooit id's/velden hernoemen.

export type Score = "good" | "ok" | "bad" | "nvt"
export type Severity = "high" | "low"
export type Role = "admin" | "auditor" | null

export interface Answer {
  score?: Score | null
  severity?: Severity | null
  notes?: string
  screenshots?: string[] // lokale base64 (huidige sessie)
  screenshotUrls?: string[] // Firebase Storage URL's (blijven na herladen)
  screenshot?: string // legacy
  autoScanned?: boolean
  aiFilled?: boolean
  // free-form velden
  findingTitle?: string
  findingCategory?: string | null
  findingCategories?: string[]
  findingOrder?: number
}

export interface Project {
  id: string
  name?: string
  url?: string
  urls?: string[]
  client?: string
  mode?: "self-service" | "professional"
  package?: string
  sourceType?: "url" | "figma"
  reviewType?: "free-form"
  selectedTemplate?: string | null
  moduleConfig?: unknown
  answers?: Record<string, Answer>
  currentStep?: number
  userId?: string | null
  leadEmail?: string
  createdAt?: string
  updatedAt?: string
  aiPlan?: string
  aiPlanDate?: string
  // delen
  public?: boolean
  sharedAt?: string
  shareExpiresAtMs?: number
  // professional/audit
  auditStatus?: string
  assignedTo?: string | null
  assignedToName?: string | null
}

export interface UserProfile {
  role?: Role
  plan?: string
  email?: string
}
