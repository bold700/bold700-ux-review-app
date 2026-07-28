"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, Loader2, Pen, X } from "lucide-react"
import { toast } from "sonner"

import { fileToDataUrl, uploadScreenshot } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Annotator } from "@/components/review/annotator"

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
  const [preview, setPreview] = useState<string | null>(null)
  // Annotatie: nieuwe afbeelding (replaceIndex undefined) of bestaande bijwerken.
  const [annotate, setAnnotate] = useState<{
    src: string
    replaceIndex?: number
  } | null>(null)

  useEffect(() => {
    if (!preview) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreview(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [preview])

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    const file = files[0]
    if (inputRef.current) inputRef.current.value = ""
    if (!file.type.startsWith("image/")) return
    try {
      const dataUrl = await fileToDataUrl(file)
      setAnnotate({ src: dataUrl })
    } catch {
      toast.error("Kon afbeelding niet verwerken", { description: file.name })
    }
  }

  async function saveAnnotated(dataUrl: string) {
    const target = annotate
    setAnnotate(null)
    setBusy(true)
    try {
      const key = `${itemKey}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
      const url = await uploadScreenshot(projectId, key, dataUrl)
      if (!url) {
        toast.error("Upload mislukt")
        return
      }
      const next = [...images]
      if (target?.replaceIndex != null) next[target.replaceIndex] = url
      else next.push(url)
      onChange(next)
    } finally {
      setBusy(false)
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
        <div key={i} className="group relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            onClick={() => setPreview(src)}
            className="h-16 w-16 cursor-zoom-in rounded-md border object-cover"
          />
          <button
            onClick={() => setAnnotate({ src, replaceIndex: i })}
            aria-label="Annoteren"
            title="Annoteren"
            className="absolute -bottom-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full border bg-background text-muted-foreground hover:text-foreground"
          >
            <Pen className="h-3 w-3" />
          </button>
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

      {annotate && (
        <Annotator
          src={annotate.src}
          onSave={saveAnnotated}
          onCancel={() => setAnnotate(null)}
        />
      )}

      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Screenshot"
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          />
          <button
            onClick={() => setPreview(null)}
            aria-label="Sluiten"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
