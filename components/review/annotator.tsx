"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  Check,
  Pen,
  Square,
  Trash2,
  Type,
  Undo2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Tool = "pen" | "arrow" | "rect" | "text"
type Pt = { x: number; y: number }
type Shape =
  | { type: "pen"; color: string; width: number; points: Pt[] }
  | { type: "arrow"; color: string; width: number; a: Pt; b: Pt }
  | { type: "rect"; color: string; width: number; a: Pt; b: Pt }
  | { type: "text"; color: string; size: number; at: Pt; text: string }

const COLORS = ["#ef4444", "#22c55e", "#eab308", "#3b82f6", "#ffffff", "#111111"]
const MAX = 1600

export function Annotator({
  src,
  onSave,
  onCancel,
}: {
  src: string
  onSave: (dataUrl: string) => void
  onCancel: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [ready, setReady] = useState(false)
  const [tool, setTool] = useState<Tool>("pen")
  const [color, setColor] = useState("#ef4444")
  const [shapes, setShapes] = useState<Shape[]>([])
  const draft = useRef<Shape | null>(null)
  const drawing = useRef(false)
  const [err, setErr] = useState<string | null>(null)
  const [textBox, setTextBox] = useState<{
    left: number
    top: number
    at: Pt
    value: string
  } | null>(null)

  // Laad de afbeelding en zet het canvas op ware grootte (gecapt op MAX).
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      let { naturalWidth: w, naturalHeight: h } = img
      const longest = Math.max(w, h)
      if (longest > MAX) {
        const s = MAX / longest
        w = Math.round(w * s)
        h = Math.round(h * s)
      }
      canvas.width = w
      canvas.height = h
      imgRef.current = img
      setReady(true)
    }
    img.onerror = () => setReady(false)
    img.src = src
  }, [src])

  const lineWidth = () => {
    const c = canvasRef.current
    return c ? Math.max(3, Math.round(c.width / 320)) : 4
  }

  function redraw() {
    const canvas = canvasRef.current
    const img = imgRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !img || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const list = draft.current ? [...shapes, draft.current] : shapes
    for (const s of list) drawShape(ctx, s)
  }

  useEffect(redraw, [shapes, ready])

  function drawShape(ctx: CanvasRenderingContext2D, s: Shape) {
    ctx.strokeStyle = s.type === "text" ? s.color : s.color
    ctx.fillStyle = s.color
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    if (s.type === "pen") {
      ctx.lineWidth = s.width
      ctx.beginPath()
      s.points.forEach((p, i) =>
        i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y),
      )
      ctx.stroke()
    } else if (s.type === "rect") {
      ctx.lineWidth = s.width
      ctx.strokeRect(s.a.x, s.a.y, s.b.x - s.a.x, s.b.y - s.a.y)
    } else if (s.type === "arrow") {
      ctx.lineWidth = s.width
      const { a, b } = s
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
      const ang = Math.atan2(b.y - a.y, b.x - a.x)
      const head = s.width * 4 + 6
      ctx.beginPath()
      ctx.moveTo(b.x, b.y)
      ctx.lineTo(
        b.x - head * Math.cos(ang - Math.PI / 6),
        b.y - head * Math.sin(ang - Math.PI / 6),
      )
      ctx.lineTo(
        b.x - head * Math.cos(ang + Math.PI / 6),
        b.y - head * Math.sin(ang + Math.PI / 6),
      )
      ctx.closePath()
      ctx.fill()
    } else if (s.type === "text") {
      ctx.font = `bold ${s.size}px system-ui, sans-serif`
      ctx.textBaseline = "top"
      // leesbare rand
      ctx.lineWidth = Math.max(2, s.size / 8)
      ctx.strokeStyle = "rgba(0,0,0,0.55)"
      ctx.strokeText(s.text, s.at.x, s.at.y)
      ctx.fillStyle = s.color
      ctx.fillText(s.text, s.at.x, s.at.y)
    }
  }

  function toCanvas(e: React.PointerEvent): Pt {
    const c = canvasRef.current!
    const rect = c.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * c.width,
      y: ((e.clientY - rect.top) / rect.height) * c.height,
    }
  }

  function onDown(e: React.PointerEvent) {
    if (!ready || textBox) return
    const p = toCanvas(e)
    if (tool === "text") {
      const rect = canvasRef.current!.getBoundingClientRect()
      setTextBox({
        left: e.clientX - rect.left,
        top: e.clientY - rect.top,
        at: p,
        value: "",
      })
      return
    }
    drawing.current = true
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    const w = lineWidth()
    if (tool === "pen") draft.current = { type: "pen", color, width: w, points: [p] }
    else if (tool === "arrow")
      draft.current = { type: "arrow", color, width: w, a: p, b: p }
    else draft.current = { type: "rect", color, width: w, a: p, b: p }
    redraw()
  }

  function onMove(e: React.PointerEvent) {
    if (!drawing.current || !draft.current) return
    const p = toCanvas(e)
    const d = draft.current
    if (d.type === "pen") d.points.push(p)
    else if (d.type === "arrow" || d.type === "rect") d.b = p
    redraw()
  }

  function onUp() {
    if (!drawing.current) return
    drawing.current = false
    if (draft.current) {
      const d = draft.current
      const keep =
        d.type === "pen"
          ? d.points.length > 1
          : d.type === "arrow" || d.type === "rect"
            ? Math.hypot(d.b.x - d.a.x, d.b.y - d.a.y) > 4
            : true
      if (keep) setShapes((s) => [...s, d])
    }
    draft.current = null
    redraw()
  }

  function commitText() {
    if (textBox && textBox.value.trim()) {
      const size = Math.max(18, Math.round((canvasRef.current?.width ?? 800) / 32))
      setShapes((s) => [
        ...s,
        { type: "text", color, size, at: textBox.at, text: textBox.value.trim() },
      ])
    }
    setTextBox(null)
  }

  function save() {
    const c = canvasRef.current
    if (!c) return
    try {
      onSave(c.toDataURL("image/jpeg", 0.9))
    } catch {
      setErr(
        "Deze afbeelding kan niet opnieuw worden geannoteerd (beveiliging). Voeg 'm opnieuw toe als nieuwe screenshot.",
      )
    }
  }

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: "pen", icon: <Pen className="h-4 w-4" />, label: "Tekenen" },
    { id: "arrow", icon: <ArrowUpRight className="h-4 w-4" />, label: "Pijl" },
    { id: "rect", icon: <Square className="h-4 w-4" />, label: "Kader" },
    { id: "text", icon: <Type className="h-4 w-4" />, label: "Tekst" },
  ]

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/90 pt-[env(safe-area-inset-top)]">
      {/* Werkbalk */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-black/60 px-3 py-2">
        <div className="flex items-center gap-1 rounded-lg bg-white/10 p-0.5">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              aria-label={t.label}
              title={t.label}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                tool === t.id
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white",
              )}
            >
              {t.icon}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              aria-label={`Kleur ${c}`}
              className={cn(
                "h-7 w-7 rounded-full border-2 transition-transform",
                color === c
                  ? "border-white scale-110"
                  : "border-white/30",
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 hover:text-white"
            onClick={() => setShapes((s) => s.slice(0, -1))}
            disabled={!shapes.length}
          >
            <Undo2 className="mr-1 h-4 w-4" /> Ongedaan
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 hover:text-white"
            onClick={() => setShapes([])}
            disabled={!shapes.length}
          >
            <Trash2 className="mr-1 h-4 w-4" /> Wissen
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex flex-1 items-center justify-center overflow-auto p-3">
        <div className="relative">
          <canvas
            ref={canvasRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            className="max-h-[calc(100dvh-9rem)] max-w-full touch-none rounded-lg bg-white shadow-2xl"
            style={{ cursor: tool === "text" ? "text" : "crosshair" }}
          />
          {textBox && (
            <input
              autoFocus
              value={textBox.value}
              onChange={(e) =>
                setTextBox((t) => (t ? { ...t, value: e.target.value } : t))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") commitText()
                if (e.key === "Escape") setTextBox(null)
              }}
              onBlur={commitText}
              placeholder="Typ tekst, Enter…"
              className="absolute z-10 rounded border-2 bg-white/95 px-1 py-0.5 text-sm text-black outline-none"
              style={{
                left: textBox.left,
                top: textBox.top,
                borderColor: color,
              }}
            />
          )}
        </div>
      </div>

      {/* Onderbalk */}
      <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-black/60 px-3 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        {err ? (
          <p className="mr-2 flex-1 text-xs text-red-400">{err}</p>
        ) : (
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-white"
            onClick={onCancel}
          >
            <X className="mr-1 h-4 w-4" /> Annuleren
          </Button>
        )}
        <Button onClick={save} disabled={!ready}>
          <Check className="mr-1 h-4 w-4" /> Opslaan
        </Button>
      </div>
    </div>
  )
}
