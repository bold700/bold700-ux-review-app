"use client"

import { useRef, useState } from "react"
import { Camera, Loader2, X } from "lucide-react"
import { toast } from "sonner"

import { fileToDataUrl, uploadScreenshot } from "@/lib/storage"
import { Button } from "@/components/ui/button"

export function ScreenshotStrip({
  projectId,
  itemKey,
  images,
  onChange,
}: {
  projectId: string
  itemKey: string
  images: string[]
  onChange: (next: string[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setBusy(true)
    try {
      const next = [...images]
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue
        try {
          const dataUrl = await fileToDataUrl(file)
          const key = `${itemKey}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
          const url = await uploadScreenshot(projectId, key, dataUrl)
          if (url) next.push(url)
          else toast.error("Upload mislukt", { description: file.name })
        } catch {
          toast.error("Kon afbeelding niet verwerken", { description: file.name })
        }
      }
      onChange(next)
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  function remove(i: number) {
    const next = [...images]
    next.splice(i, 1)
    onChange(next)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {images.map((src, i) => (
        <div key={i} className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            onClick={() => window.open(src, "_blank")}
            className="h-16 w-16 cursor-zoom-in rounded-md border object-cover"
          />
          <button
            onClick={() => remove(i)}
            aria-label="Verwijder screenshot"
            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border bg-background text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
      >
        {busy ? (
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        ) : (
          <Camera className="mr-1 h-4 w-4" />
        )}
        Screenshot
      </Button>
    </div>
  )
}
