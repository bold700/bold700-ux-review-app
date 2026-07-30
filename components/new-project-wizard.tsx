"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, setDoc } from "firebase/firestore"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Frame,
  Globe,
  Loader2,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

import { getDb } from "@/lib/firebase"
import {
  getBundleConfig,
  getDefaultModuleConfig,
  MODULE_REGISTRY,
  quickScanBundles,
} from "@/lib/modules"
import { BRANCHES, detectBranche } from "@/lib/branche"
import { fetchPageText } from "@/lib/page-fetch"
import { suggestReview } from "@/lib/suggest-review"
import { normalizeUrl, projectNameFromUrl } from "@/lib/url"
import { useAuth } from "@/components/providers/auth-provider"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Source = "url" | "figma"
const FULL_AUDIT = "__full__"
const AUTO = "__auto__"

export function NewProjectWizard() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [source, setSource] = useState<Source>("url")
  const [template, setTemplate] = useState<string>(AUTO)
  const [url, setUrl] = useState("")
  const [nameEdited, setNameEdited] = useState(false)
  const [name, setName] = useState("")
  const [branche, setBranche] = useState("")
  const [brancheEdited, setBrancheEdited] = useState(false)
  const [brancheBusy, setBrancheBusy] = useState(false)
  const [busy, setBusy] = useState(false)

  const bundles = useMemo(() => quickScanBundles(source), [source])

  // Pagina-tekst cachen per URL zodat branche-detectie én de slimme scan
  // dezelfde fetch hergebruiken (geen dubbele calls).
  const pageCache = useRef<{ url: string; text: string } | null>(null)
  async function getPageText(u: string): Promise<string> {
    const key = u.trim()
    if (pageCache.current?.url === key) return pageCache.current.text
    const text = await fetchPageText(key)
    pageCache.current = { url: key, text }
    return text
  }

  function onUrlChange(v: string) {
    setUrl(v)
    if (!nameEdited) setName(projectNameFromUrl(v))
  }

  // Branche automatisch voorstellen zodra stap 3 in beeld komt met een URL.
  const detectedFor = useRef<string>("")
  useEffect(() => {
    if (source !== "url") return
    if (step !== 3) return
    const key = url.trim()
    if (!key || brancheEdited || detectedFor.current === key) return
    detectedFor.current = key
    setBrancheBusy(true)
    ;(async () => {
      try {
        const text = await getPageText(key)
        const slug = await detectBranche(key, text)
        if (slug && !brancheEdited) setBranche(slug)
      } catch {
        // stil: gebruiker kiest desnoods handmatig
      } finally {
        setBrancheBusy(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, url, source, brancheEdited])

  async function create() {
    if (!user) return
    if (!url.trim()) {
      toast.error("Vul een URL in")
      return
    }
    setBusy(true)
    try {
      const id = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

      // Slimme scan: laat AI de pagina herkennen en de juiste scan kiezen.
      let effectiveTemplate = template
      let autoRun = false
      let brancheSlug = branche
      if (template === AUTO) {
        const t = toast.loading("AI analyseert de pagina…")
        const pageText = await getPageText(url.trim())
        const sug = await suggestReview(url.trim(), pageText)
        effectiveTemplate = sug.bundleId
        autoRun = true
        // Branche nog niet bekend? Detecteer 'm nu op dezelfde pagina-tekst.
        if (!brancheSlug) {
          brancheSlug = (await detectBranche(url.trim(), pageText)) ?? ""
        }
        const b = MODULE_REGISTRY.bundles[sug.bundleId]
        toast.success(`Herkend: ${b?.name_nl ?? "Review"}`, {
          id: t,
          description: sug.reason || undefined,
        })
      }
      if (!brancheSlug) brancheSlug = "overig"

      const bundleId = effectiveTemplate === FULL_AUDIT ? null : effectiveTemplate
      const bundle = bundleId ? MODULE_REGISTRY.bundles[bundleId] : null
      const isFreeForm = !!bundle?.is_free_form

      const project: Record<string, unknown> = {
        id,
        name: name.trim() || projectNameFromUrl(url) || url.trim(),
        url: url.trim(),
        urls: [url.trim()],
        client: "",
        mode: "self-service",
        sourceType: source,
        userId: user.uid,
        leadEmail: user.email ?? "",
        answers: {},
        currentStep: 0,
        createdAt: new Date().toISOString(),
        selectedTemplate: bundleId,
        branche: brancheSlug,
        brancheAuto: !brancheEdited,
        moduleConfig: bundleId
          ? getBundleConfig(bundleId)
          : getDefaultModuleConfig(),
      }

      if (isFreeForm) {
        project.reviewType = "free-form"
        const fId = `ff-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        ;(project.answers as Record<string, unknown>)[fId] = {
          score: null,
          severity: null,
          notes: "",
          findingTitle: "",
          findingCategory: null,
          findingOrder: 0,
          screenshots: [],
        }
      }

      await setDoc(doc(getDb(), "projects", id), project)
      router.push(`/review/${id}${autoRun ? "?auto=1" : ""}`)
    } catch (e) {
      console.error(e)
      toast.error("Aanmaken mislukt", {
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <AppShell
      title="Nieuw project"
      actions={
        <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
          Annuleren
        </Button>
      }
    >
      <div className="flex min-h-[calc(100svh-var(--header-height))] flex-col">
        <div className="flex-1 px-4 py-8 lg:px-6">
          <Stepper step={step} />

        {step === 1 && (
          <Section title="Wat wil je reviewen?" desc="Kies de bron.">
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceCard
                active={source === "url"}
                onClick={() => {
                  setSource("url")
                  setTemplate(AUTO)
                }}
                icon={<Globe className="h-5 w-5" />}
                title="Website URL"
                desc="Live website reviewen"
              />
              <ChoiceCard
                active={source === "figma"}
                onClick={() => {
                  setSource("figma")
                  setTemplate(FULL_AUDIT)
                }}
                icon={<Frame className="h-5 w-5" />}
                title="Figma Design"
                desc="Design file reviewen"
              />
            </div>
          </Section>
        )}

        {step === 2 &&
          (() => {
            const freeForm = bundles.find((b) => b.is_free_form)
            const scans = bundles.filter((b) => !b.is_free_form)
            return (
              <Section
                title="Type review"
                desc="Laat AI de pagina herkennen, of kies zelf een review."
              >
                {source === "url" && (
                  <ChoiceCard
                    active={template === AUTO}
                    onClick={() => setTemplate(AUTO)}
                    icon={<Sparkles className="h-5 w-5" />}
                    title="Slimme scan"
                    badge="Aanbevolen"
                    desc="AI herkent de pagina en kiest automatisch de juiste review + vragen"
                    className="mb-3"
                  />
                )}
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {freeForm && (
                    <ChoiceCard
                      active={template === freeForm.id}
                      onClick={() => setTemplate(freeForm.id)}
                      title="Vrije Review"
                      desc="Zelf bevindingen toevoegen, zonder checklist"
                    />
                  )}
                  <ChoiceCard
                    active={template === FULL_AUDIT}
                    onClick={() => setTemplate(FULL_AUDIT)}
                    title="Volledige Audit"
                    desc="Alle modules — de complete checklist"
                  />
                  {scans.map((b) => (
                    <ChoiceCard
                      key={b.id}
                      active={template === b.id}
                      onClick={() => setTemplate(b.id)}
                      title={b.name_nl.replace(" Quick Scan", "")}
                      desc={b.description_nl ?? b.estimated_duration_nl}
                    />
                  ))}
                </div>
              </Section>
            )
          })()}

        {step === 3 && (
          <Section title="Details" desc="Vul de details in om te starten.">
            <div className="grid max-w-2xl gap-4">
              <div className="grid gap-2">
                <Label htmlFor="np-url">
                  {source === "figma" ? "Figma URL" : "Website URL"} *
                </Label>
                <Input
                  id="np-url"
                  type="url"
                  placeholder={
                    source === "figma"
                      ? "https://www.figma.com/design/…"
                      : "https://jouwwebsite.nl"
                  }
                  value={url}
                  onChange={(e) => onUrlChange(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="np-name">Projectnaam</Label>
                <Input
                  id="np-name"
                  value={name}
                  onChange={(e) => {
                    setNameEdited(true)
                    setName(e.target.value)
                  }}
                  placeholder="Wordt ingevuld op basis van de URL"
                />
                {url && normalizeUrl(url) && (
                  <p className="text-xs text-muted-foreground">
                    Domein: {normalizeUrl(url)}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="np-branche" className="flex items-center gap-2">
                  Branche
                  {brancheBusy ? (
                    <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" /> AI herkent…
                    </span>
                  ) : branche && !brancheEdited ? (
                    <span className="flex items-center gap-1 text-xs font-normal text-primary">
                      <Sparkles className="h-3 w-3" /> AI-voorstel
                    </span>
                  ) : null}
                </Label>
                <Select
                  value={branche}
                  onValueChange={(v) => {
                    setBranche(v)
                    setBrancheEdited(true)
                  }}
                >
                  <SelectTrigger id="np-branche" className="w-full">
                    <SelectValue placeholder="Kies een branche…" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map((b) => (
                      <SelectItem key={b.slug} value={b.slug}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Waar het bedrijf in zit. Gebruikt voor de branche-benchmark.
                </p>
              </div>
            </div>
          </Section>
        )}

        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-between gap-2 border-t bg-background/90 px-4 py-3 backdrop-blur lg:px-6">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1 || busy}
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Vorige
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)}>
              Volgende <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={create} disabled={busy || !url.trim()}>
              {busy ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />{" "}
                  {template === AUTO ? "Analyseren…" : "Aanmaken…"}
                </>
              ) : template === AUTO ? (
                <>
                  <Sparkles className="mr-1 h-4 w-4" /> Analyseren &amp; starten
                </>
              ) : (
                <>
                  <Check className="mr-1 h-4 w-4" /> Project aanmaken
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </AppShell>
  )
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-8 flex w-full items-center gap-2">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className={cn(
            "flex items-center gap-2",
            n < 3 && "flex-1",
          )}
        >
          <div
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
              n <= step
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {n < step ? <Check className="h-4 w-4" /> : n}
          </div>
          {n < 3 && (
            <div
              className={cn(
                "h-0.5 flex-1 rounded",
                n < step ? "bg-primary" : "bg-muted",
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function Section({
  title,
  desc,
  children,
}: {
  title: string
  desc?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      {desc && <p className="mb-5 text-sm text-muted-foreground">{desc}</p>}
      {children}
    </div>
  )
}

function ChoiceCard({
  active,
  onClick,
  icon,
  title,
  desc,
  badge,
  className,
}: {
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
  title: string
  desc?: string
  badge?: string
  className?: string
}) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      className={cn(
        "cursor-pointer p-4 transition-colors outline-none",
        active
          ? "border-primary ring-2 ring-primary/30"
          : "hover:border-ring focus-visible:border-ring",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-primary">{icon}</div>}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium">{title}</span>
            {badge && (
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {badge}
              </span>
            )}
          </div>
          {desc && (
            <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {desc}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
