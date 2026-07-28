"use client"

import { useEffect, useRef, useState } from "react"
import {
  Camera,
  ClipboardPaste,
  Loader2,
  Monitor,
  Pen,
  X,
} from "lucide-react"
import { toast } from "sonner"

import { fileToDataUrl, uploadScreenshot } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Annotator } from "@/components/review/annotator"

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = () => reject(new Error("lees-fout"))
    r.readAsDataURL(blob)
  })
}

export function ScreenshotStrip({
  projectId,
  itemKey,
  images,
  onChange,
  active,
}: {
  projectId: string
  itemKey: string
  images: string[]
  onChange: (next: string[]) => void
  // true = luister naar Cmd/Ctrl+V op deze strip (huidige/gefocuste bevinding)
  active?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  // Annotatie: nieuwe afbeelding (replaceIndex undefined) of bestaande bijwerken.
  const [annotate, setAnnotate] = useState<{
    src: string
    replaceIndex?: number
  } | null>(null)

  const canCapture =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getDisplayMedia

  useEffect(() => {
    if (!preview) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreview(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [preview])

  // Cmd/Ctrl+V plakken van een gekopieerde afbeelding (alleen op de actieve strip)
  useEffect(() => {
    if (!active) return
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) =>
        i.type.startsWith("image/"),
      )
      const file = item?.getAsFile()
      if (!file) return
      e.preventDefault()
      fileToDataUrl(file)
        .then((d) => setAnnotate({ src: d }))
        .catch(() => toast.error("Kon geplakte afbeelding niet lezen"))
    }
    window.addEventListener("paste", onPaste)
    return () => window.removeEventListener("paste", onPaste)
  }, [active])

  // Leg het huidige tabblad/scherm vast (desktop). Op mobiel niet beschikbaar:
  // val terug op de fotokiezer (waar de OS-screenshot in staat).
  async function capture() {
    if (!canCapture) {
      inputRef.current?.click()
      return
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      })
      const video = document.createElement("video")
      video.srcObject = stream
      await video.play()
      await new Promise((r) => requestAnimationFrame(() => r(null)))
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext("2d")?.drawImage(video, 0, 0)
      stream.getTracks().forEach((t) => t.stop())
      setAnnotate({ src: canvas.toDataURL("image/jpeg", 0.92) })
    } catch {
      // gebruiker annuleerde de tab-keuze
    }
  }

  // Plakken via knop (leest het klembord expliciet uit).
  async function pasteFromClipboard() {
    try {
      const items = await navigator.clipboard.read()
      for (const it of items) {
        const type = it.types.find((t) => t.startsWith("image/"))
        if (type) {
          const blob = await it.getType(type)
          setAnnotate({ src: await blobToDataUrl(blob) })
          return
        }
      }
      toast.info("Geen afbeelding op het klembord")
    } catch {
      toast.error("Kon klembord niet lezen", {
        description: "Gebruik Cmd/Ctrl+V of de knop Screenshot.",
      })
    }
  }

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
      <Button
        variant="outline"
        size="sm"
        onClick={capture}
        disabled={busy}
        title={canCapture ? "Tabblad/scherm vastleggen" : "Kies een screenshot"}
      >
        <Monitor className="mr-1 h-4 w-4" /> Capture
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={pasteFromClipboard}
        disabled={busy}
        title="Plakken (Cmd/Ctrl+V)"
      >
        <ClipboardPaste className="mr-1 h-4 w-4" /> Plakken
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
