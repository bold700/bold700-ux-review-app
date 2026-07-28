"use client"

import { useState } from "react"
import {
  ExternalLink,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
  X,
} from "lucide-react"

import { ensureProtocol } from "@/lib/url"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Device = "desktop" | "tablet" | "mobile"
const WIDTHS: Record<Device, number | null> = {
  desktop: null, // volle breedte
  tablet: 820,
  mobile: 400,
}

export function LivePreview({
  url,
  onClose,
}: {
  url: string
  onClose?: () => void
}) {
  const src = ensureProtocol(url)
  const [device, setDevice] = useState<Device>("desktop")
  const [reloadKey, setReloadKey] = useState(0)
  const width = WIDTHS[device]

  return (
    <div className="flex h-full flex-col bg-muted/40">
      <div className="flex items-center gap-1.5 border-b bg-background px-2 py-1.5">
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            title="Preview sluiten"
            aria-label="Preview sluiten"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <div className="flex items-center rounded-md border p-0.5">
          <DevBtn
            active={device === "desktop"}
            onClick={() => setDevice("desktop")}
            label="Desktop"
          >
            <Monitor className="h-3.5 w-3.5" />
          </DevBtn>
          <DevBtn
            active={device === "tablet"}
            onClick={() => setDevice("tablet")}
            label="Tablet"
          >
            <Tablet className="h-3.5 w-3.5" />
          </DevBtn>
          <DevBtn
            active={device === "mobile"}
            onClick={() => setDevice("mobile")}
            label="Mobiel"
          >
            <Smartphone className="h-3.5 w-3.5" />
          </DevBtn>
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md border bg-muted px-2 py-1 text-xs text-muted-foreground">
          {src}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          title="Herladen"
          onClick={() => setReloadKey((k) => k + 1)}
        >
          <RotateCw className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          title="Open in tabblad"
          onClick={() => window.open(src, "_blank")}
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="relative flex-1 overflow-auto">
        <div
          className={cn(
            "mx-auto h-full",
            width && "my-2 border bg-white shadow-sm",
          )}
          style={width ? { width, maxWidth: "100%" } : undefined}
        >
          <iframe
            key={reloadKey}
            src={src}
            title="Live preview"
            className="h-full w-full"
            style={width ? { minHeight: "100%" } : undefined}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
        <div className="pointer-events-none absolute right-2 bottom-2 rounded-md bg-background/90 px-2 py-1 text-[11px] text-muted-foreground shadow">
          Site niet zichtbaar?{" "}
          <button
            className="pointer-events-auto font-medium text-primary underline"
            onClick={() => window.open(src, "_blank")}
          >
            Open in tabblad
          </button>
        </div>
      </div>
    </div>
  )
}

function DevBtn({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "flex h-6 w-7 items-center justify-center rounded transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
