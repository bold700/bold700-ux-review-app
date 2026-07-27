// Getypte facade rond de geporte v1 module-data (400+ checks, quick-scan-bundels).
// De ruwe data/logica staat in ./module-data.js (verbatim uit v1, ongewijzigd).
import * as data from "./module-data.js"

export interface ReviewCheck {
  id: string
  legacy_id?: string
  text: string
  text_en?: string
  type?: string
  severity?: string
  business_impact_nl?: string
  fix_suggestion_nl?: string
  effort?: string
  auto_tool?: string | null
  auto_rule?: string | null
  auto_metric?: string | null
  hasContrastChecker?: boolean
}

export interface ReviewStep {
  id: string
  moduleId: string
  subcategory: string
  title: string
  shortTitle: string
  desc?: string
  impact?: string
  moduleColor?: string
  moduleIcon?: string
  moduleName?: string
  weight?: number
  questions: ReviewCheck[]
}

export interface Bundle {
  name_nl: string
  name_en?: string
  description_nl?: string
  icon_lucide?: string
  estimated_duration_nl?: string
  is_quick_scan?: boolean
  is_free_form?: boolean
  source_type?: "url" | "figma"
  page_type?: string
  modules: unknown
  include_checks?: string[]
}

export interface ModuleDef {
  id: string
  name_nl: string
  enabled_by_default?: boolean
  color?: string
  icon?: string
  subcategories?: string[]
  default_weight?: number
  description_nl?: string
}

export const MODULE_REGISTRY = data.MODULE_REGISTRY as unknown as {
  modules: ModuleDef[]
  bundles: Record<string, Bundle>
}

export const buildReviewSteps = data.buildReviewSteps as unknown as (
  config: unknown,
) => ReviewStep[]
export const getBundleConfig = data.getBundleConfig as unknown as (
  id: string,
) => unknown
export const getDefaultModuleConfig =
  data.getDefaultModuleConfig as unknown as () => unknown
export const migrateLegacyAnswers = data.migrateLegacyAnswers as unknown as (
  answers: Record<string, unknown>,
) => Record<string, unknown>
export const LEGACY_ID_MAP = data.LEGACY_ID_MAP as unknown as Record<
  string,
  string
>

// Vrije-review-categorieën (kwamen in v1 uit index.html, niet uit module-data)
export const FF_CATEGORIES = [
  { id: "usability", label: "Usability" },
  { id: "visual", label: "Visueel Design" },
  { id: "content", label: "Content & Copy" },
  { id: "conversion", label: "Conversie" },
  { id: "technical", label: "Technisch" },
  { id: "ia", label: "Navigatie & IA" },
  { id: "trust", label: "Vertrouwen" },
  { id: "other", label: "Overig" },
] as const

export const FF_CAT_LABELS: Record<string, string> = Object.fromEntries(
  FF_CATEGORIES.map((c) => [c.id, c.label]),
)

/** Quick-scan-bundels voor een bron ('url' of 'figma'), inclusief vrije review. */
export function quickScanBundles(source: "url" | "figma" = "url") {
  return Object.entries(MODULE_REGISTRY.bundles)
    .filter(([, b]) => b.is_quick_scan && (b.source_type ?? "url") === source)
    .map(([id, b]) => ({ id, ...b }))
}
