"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, setDoc } from "firebase/firestore"
import { ArrowLeft, ArrowRight, Check, Frame, Globe, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { getDb } from "@/lib/firebase"
import {
  getBundleConfig,
  getDefaultModuleConfig,
  MODULE_REGISTRY,
  quickScanBundles,
} from "@/lib/modules"
import { normalizeUrl, projectNameFromUrl } from "@/lib/url"
import { useAuth } from "@/components/providers/auth-provider"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type Source = "url" | "figma"
const FULL_AUDIT = "__full__"

export function NewProjectWizard() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [source, setSource] = useState<Source>("url")
  const [template, setTemplate] = useState<string>(FULL_AUDIT)
  const [url, setUrl] = useState("")
  const [nameEdited, setNameEdited] = useState(false)
  const [name, setName] = useState("")
  const [busy, setBusy] = useState(false)

  const bundles = useMemo(() => quickScanBundles(source), [source])

  function onUrlChange(v: string) {
    setUrl(v)
    if (!nameEdited) setName(projectNameFromUrl(v))
  }

  async function create() {
    if (!user) return
    if (!url.trim()) {
      toast.error("Vul een URL in")
      return
    }
    setBusy(true)
    try {
      const id = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const bundleId = template === FULL_AUDIT ? null : template
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
      toast.success("Project aangemaakt", { description: project.name as string })
      router.push("/")
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
    <div className="min-h-svh bg-background">
      <header className="border-b pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2">
            <BrandLogo className="h-6 w-auto" />
            <span className="text-sm font-semibold">Nieuw project</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            Annuleren
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <Stepper step={step} />

        {step === 1 && (
          <Section title="Wat wil je reviewen?" desc="Kies de bron.">
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceCard
                active={source === "url"}
                onClick={() => {
                  setSource("url")
                  setTemplate(FULL_AUDIT)
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

        {step === 2 && (
          <Section title="Type review" desc="Volledige audit of een gerichte Quick Scan.">
            <div className="grid gap-3">
              <ChoiceCard
                active={template === FULL_AUDIT}
                onClick={() => setTemplate(FULL_AUDIT)}
                title="Volledige Audit"
                desc="Alle modules — de complete checklist"
              />
              {bundles.map((b) => (
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
        )}

        {step === 3 && (
          <Section title="Details" desc="Vul de details in om te starten.">
            <div className="grid gap-4">
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
            </div>
          </Section>
        )}

        <div className="mt-8 flex items-center justify-between">
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
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Aanmaken…
                </>
              ) : (
                <>
                  <Check className="mr-1 h-4 w-4" /> Project aanmaken
                </>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex flex-1 items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
              n < step
                ? "bg-primary text-primary-foreground"
                : n === step
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
}: {
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
  title: string
  desc?: string
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
      )}
    >
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-primary">{icon}</div>}
        <div className="min-w-0">
          <div className="font-medium">{title}</div>
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
