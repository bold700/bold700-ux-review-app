"use client"

import { SlidersHorizontal } from "lucide-react"

import type { Project } from "@/lib/types"
import { BRANCHES } from "@/lib/branche"
import {
  AUDIENCES,
  DEVICES,
  JOURNEY_STAGES,
  PAGE_GOALS,
} from "@/lib/review-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Field({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: { slug: string; label: string }[]
  placeholder?: string
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.slug} value={o.slug}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

/**
 * Bewerk de reviewcontext (branche, doel, doelgroep, fase, apparaat) tijdens
 * de review. Wijzigingen worden direct opgeslagen via setFields.
 */
export function ContextEditor({
  project,
  setFields,
}: {
  project: Project
  setFields: (patch: Partial<Project>) => void
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="mr-1 h-4 w-4" /> Context
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reviewcontext</DialogTitle>
          <DialogDescription>
            Waartegen beoordeel je? Dit maakt je review scherper en de
            benchmarks waardevoller.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            id="ctx-branche"
            label="Branche"
            value={project.branche ?? ""}
            onChange={(v) => setFields({ branche: v, brancheAuto: false })}
            options={BRANCHES}
            placeholder="Kies…"
          />
          <Field
            id="ctx-goal"
            label="Doel van de pagina"
            value={project.pageGoal ?? ""}
            onChange={(v) => setFields({ pageGoal: v, contextAuto: false })}
            options={PAGE_GOALS}
            placeholder="Wat moet de pagina doen?"
          />
          <Field
            id="ctx-audience"
            label="Doelgroep"
            value={project.audience ?? ""}
            onChange={(v) => setFields({ audience: v, contextAuto: false })}
            options={AUDIENCES}
            placeholder="Voor wie?"
          />
          <Field
            id="ctx-stage"
            label="Fase van de bezoeker"
            value={project.journeyStage ?? ""}
            onChange={(v) => setFields({ journeyStage: v, contextAuto: false })}
            options={JOURNEY_STAGES}
            placeholder="Waar in de reis?"
          />
          <Field
            id="ctx-device"
            label="Bekeken op"
            value={project.device ?? ""}
            onChange={(v) => setFields({ device: v })}
            options={DEVICES}
            placeholder="Apparaat"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
