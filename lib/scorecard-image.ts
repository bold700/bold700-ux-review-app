import type { ReportData } from "@/lib/report"
import type { Project } from "@/lib/types"
import { scoreTone } from "@/lib/score"

const TONE: Record<string, string> = {
  good: "#10b981",
  ok: "#f59e0b",
  bad: "#ef4444",
  na: "#a1a1aa",
}

function verdict(score: number | null): string {
  if (score == null) return "UX Review"
  if (score >= 8.5) return "Uitstekend"
  if (score >= 7) return "Sterk"
  if (score >= 5.5) return "Solide, met kansen"
  if (score >= 4) return "Ruimte voor groei"
  return "Werk aan de winkel"
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * Tekent een merkgerichte scorecard (1080x1350, 4:5 — LinkedIn feed) en geeft
 * een PNG data-URL terug. Puur canvas, geen externe libraries.
 */
export function drawScorecard(project: Project, data: ReportData): string {
  const W = 1080
  const H = 1350
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!
  const accent = "#ff5003"
  const tone = TONE[scoreTone(data.score)]

  // Achtergrond
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, "#131316")
  g.addColorStop(1, "#0a0a0c")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  const PAD = 90
  let y = 110

  // Merk: oranje B + naam
  roundRect(ctx, PAD, y, 76, 76, 18)
  ctx.fillStyle = accent
  ctx.fill()
  ctx.fillStyle = "#ffffff"
  ctx.font = "800 46px system-ui, sans-serif"
  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
  ctx.fillText("B", PAD + 38, y + 40)
  ctx.textAlign = "left"
  ctx.fillStyle = "#ffffff"
  ctx.font = "700 34px system-ui, sans-serif"
  ctx.textBaseline = "alphabetic"
  ctx.fillText("BOLD700", PAD + 96, y + 30)
  ctx.fillStyle = "#8b8b93"
  ctx.font = "600 22px system-ui, sans-serif"
  ctx.fillText("UX REVIEW", PAD + 96, y + 60)

  // Label
  y = 340
  ctx.fillStyle = accent
  ctx.font = "700 26px system-ui, sans-serif"
  ctx.fillText("UX SCORECARD", PAD, y)

  // Sitenaam
  y += 60
  ctx.fillStyle = "#ffffff"
  ctx.font = "800 64px system-ui, sans-serif"
  const name = project.name || project.url || "Website"
  wrapText(ctx, name, PAD, y, W - PAD * 2, 68, 2)

  // URL
  y += 96
  ctx.fillStyle = "#8b8b93"
  ctx.font = "500 30px system-ui, sans-serif"
  ctx.fillText(cleanUrl(project.url), PAD, y)

  // Grote score
  const cy = 760
  ctx.textAlign = "left"
  ctx.fillStyle = tone
  ctx.font = "800 240px system-ui, sans-serif"
  const scoreTxt = data.score == null ? "—" : data.score.toFixed(1)
  ctx.textBaseline = "alphabetic"
  ctx.fillText(scoreTxt, PAD, cy)
  const sw = ctx.measureText(scoreTxt).width
  ctx.fillStyle = "#5b5b63"
  ctx.font = "700 64px system-ui, sans-serif"
  ctx.fillText("/10", PAD + sw + 24, cy)

  // Verdict
  ctx.fillStyle = tone
  ctx.font = "700 40px system-ui, sans-serif"
  ctx.fillText(verdict(data.score), PAD, cy + 66)

  // Stat-pillen
  const stats = [
    { label: "Verbeterpunten", value: data.issues.length },
    { label: "Quick wins", value: data.counts.quickWins },
    { label: "Sterke punten", value: data.strengths.length },
  ]
  const py = 970
  const gap = 24
  const pw = (W - PAD * 2 - gap * 2) / 3
  const ph = 150
  stats.forEach((s, i) => {
    const px = PAD + i * (pw + gap)
    roundRect(ctx, px, py, pw, ph, 22)
    ctx.fillStyle = "#1c1c21"
    ctx.fill()
    ctx.textAlign = "center"
    ctx.fillStyle = "#ffffff"
    ctx.font = "800 58px system-ui, sans-serif"
    ctx.fillText(String(s.value), px + pw / 2, py + 76)
    ctx.fillStyle = "#8b8b93"
    ctx.font = "600 24px system-ui, sans-serif"
    ctx.fillText(s.label, px + pw / 2, py + 116)
  })
  ctx.textAlign = "left"

  // Voettekst
  ctx.fillStyle = "#5b5b63"
  ctx.font = "600 26px system-ui, sans-serif"
  ctx.fillText("uxreviews.bold700.com", PAD, H - 90)
  const d = new Date(project.createdAt ?? Date.now()).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  ctx.textAlign = "right"
  ctx.fillText(d, W - PAD, H - 90)
  ctx.textAlign = "left"

  return canvas.toDataURL("image/png")
}

function cleanUrl(url?: string): string {
  return (url ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "")
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
  maxLines: number,
) {
  const words = text.split(" ")
  let line = ""
  let lines = 0
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + " " + words[i] : words[i]
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y)
      line = words[i]
      lines++
      y += lineH
      if (lines >= maxLines - 1) {
        // laatste regel: rest samenvoegen en evt. afkappen
        let rest = words.slice(i).join(" ")
        while (ctx.measureText(rest + "…").width > maxW && rest.length > 1)
          rest = rest.slice(0, -1)
        ctx.fillText(
          rest + (i < words.length ? "" : ""),
          x,
          y,
        )
        return
      }
    } else {
      line = test
    }
  }
  ctx.fillText(line, x, y)
}
