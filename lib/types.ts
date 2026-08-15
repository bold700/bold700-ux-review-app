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
  // herkomst van het oordeel: "measured" = deterministische tool (auto-scan/
  // PageSpeed), "ai" = LLM-inschatting (hypothese tot gevalideerd)
  source?: "measured" | "ai"
  // zekerheid van de AI-inschatting (alleen bij source "ai")
  confidence?: "high" | "medium" | "low"
  // resultaat-loop: was de inschatting correct? (lib/outcomes.ts)
  outcome?: string
  outcomeNote?: string
  outcomeAt?: string
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
  // automatisch aangemaakt door de feedback-pins (Worker POST /pin): het
  // project hoort bij één domein, id is "site-<domein>"
  site?: string
  source?: "pins"
  selectedTemplate?: string | null
  // branche/sector uit de vaste taxonomie (lib/branche.ts) — voor benchmarks
  branche?: string
  brancheAuto?: boolean // true = door AI gezet, false = handmatig bevestigd
  // reviewcontext (lib/review-context.ts) — doel/fase/doelgroep/apparaat
  pageGoal?: string
  journeyStage?: string
  audience?: string
  device?: string
  contextAuto?: boolean // true = door AI voorgesteld, false = handmatig bevestigd
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
  // developer-handoff: per bevinding/verbeterpunt de verwerk-status
  devStatus?: Record<string, { done: boolean; at?: string }>
  devMode?: boolean
  // Engelse vertaling van vrije-review-bevindingen (voor de developer-link)
  findingTranslations?: Record<string, { title?: string; note?: string }>
  // Verbeterpunten in gewone taal (zonder jargon) voor het klant-rapport
  plainActions?: Record<
    string,
    { title: string; action: string; impact?: string; uitleg?: string }
  >
  // professional/audit
  auditStatus?: string
  assignedTo?: string | null
  assignedToName?: string | null
  // herscan-vergelijking
  rescanOf?: string
  previousScore?: number | null
  previousAt?: string
  previousScores?: Record<string, Score>
  // multi-agent scan (scanVersion 2, uit de Worker-pijplijn)
  scanVersion?: number
  score?: number | null
  pages?: string[]
  briefing?: ScanBriefing
  measurements?: ScanMeasurement[]
  findings?: ScanFinding[]
  teamLog?: TeamLogEntry[]
  geschrapt?: number
  // Korte samenvatting in klantentaal (optioneel; door de Worker gegenereerd).
  samenvatting?: string
}

export interface ScanBriefing {
  branche?: string
  aanbod?: string
  doelgroep?: string
  doel?: string
  belangrijkstePagina?: string
  bron?: string // "aanname"
}

export interface ScanMeasurement {
  id: string
  label: string
  score: Score
  note: string
  source?: "measured"
  page?: string
}

export interface ScanFinding {
  agent?: string
  page?: string
  issue?: string
  bewijs?: string
  severity?: number
  confidence?: "high" | "medium" | "low"
  aanbeveling?: string
  ice?: { impact: number; confidence: number; effort: number; score: number }
  // door Lot herschreven klantentaal
  titel?: string
  watWeZagen?: string
  waaromKost?: string
  watJeDoet?: string
  source?: "ai"
  nietGevalideerd?: boolean
}

export interface TeamLogEntry {
  stap: string
  status: "bezig" | "klaar" | "overgeslagen" | "fout"
  samenvatting?: string
  ms?: number
}

export interface UserProfile {
  role?: Role
  plan?: string
  email?: string
}
