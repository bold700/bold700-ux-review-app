"use client"

import { useRef, useState } from "react"

import { cn } from "@/lib/utils"

// Swipebare kaartenstapel (Tinder-stijl) voor mobiel.
export function ScorecardDeck({ images }: { images: string[] }) {
  const [stack, setStack] = useState<number[]>(() => images.map((_, i) => i))
  const [dx, setDx] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const [leaving, setLeaving] = useState(false)

  if (!images.length) {
    return (
      <div className="mx-auto aspect-[4/5] max-w-[280px] animate-pulse rounded-2xl bg-muted" />
    )
  }

  function onDown(e: React.PointerEvent) {
    if (leaving) return
    dragging.current = true
    startX.current = e.clientX
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }
  function onMove(e: React.PointerEvent) {
    if (!dragging.current) return
    setDx(e.clientX - startX.current)
  }
  function onUp() {
    if (!dragging.current) return
    dragging.current = false
    if (Math.abs(dx) > 100) {
      setLeaving(true)
      setDx(dx > 0 ? 620 : -620)
      setTimeout(() => {
        setStack((s) => [...s.slice(1), s[0]])
        setDx(0)
        setLeaving(false)
      }, 220)
    } else {
      setDx(0)
    }
  }

  const advance = () => {
    if (leaving) return
    setLeaving(true)
    setDx(-620)
    setTimeout(() => {
      setStack((s) => [...s.slice(1), s[0]])
      setDx(0)
      setLeaving(false)
    }, 220)
  }

  return (
    <div>
      <div className="relative mx-auto aspect-[4/5] max-w-[280px] touch-none select-none">
        {stack.map((imgIdx, i) => {
          const isTop = i === 0
          return (
            <div
              key={imgIdx}
              onPointerDown={isTop ? onDown : undefined}
              onPointerMove={isTop ? onMove : undefined}
              onPointerUp={isTop ? onUp : undefined}
              onPointerCancel={isTop ? onUp : undefined}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-2xl border bg-card shadow-xl",
                isTop && "cursor-grab active:cursor-grabbing",
                i > 2 && "opacity-0",
              )}
              style={{
                transform: isTop
                  ? `translateX(${dx}px) rotate(${dx / 18}deg)`
                  : `translateY(${i * 10}px) scale(${1 - i * 0.05})`,
                zIndex: stack.length - i,
                transition:
                  isTop && dragging.current
                    ? "none"
                    : "transform 0.22s ease-out",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[imgIdx]}
                alt="Voorbeeld scorecard"
                draggable={false}
                className="pointer-events-none h-full w-full object-cover"
              />
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Kaart ${i + 1}`}
            onClick={advance}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === stack[0] ? "w-5 bg-primary" : "w-1.5 bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  )
}
