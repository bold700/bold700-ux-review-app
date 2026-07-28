"use client"

import { useEffect, useState } from "react"
import {
  Copy,
  Download,
  Loader2,
  RefreshCw,
  Share2,
  Sparkles,
  X,
} from "lucide-react"
import { toast } from "sonner"

import type { Project } from "@/lib/types"
import type { ReportData } from "@/lib/report"
import { drawScorecard } from "@/lib/scorecard-image"
import { generateLinkedInPost } from "@/lib/social"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function SocialShareDialog({
  project,
  data,
  onClose,
}: {
  project: Project
  data: ReportData
  onClose: () => void
}) {
  const [image, setImage] = useState<string | null>(null)
  const [post, setPost] = useState("")
  const [gen, setGen] = useState(false)

  // Scorecard-afbeelding lokaal renderen zodra het venster opent.
  useEffect(() => {
    try {
      setImage(drawScorecard(project, data))
    } catch (e) {
      console.error("[scorecard-image]", e)
    }
  }, [project, data])

  async function generatePost() {
    setGen(true)
    try {
      const text = await generateLinkedInPost(project, data)
      setPost(text)
    } catch (e) {
      toast.error("Post genereren mislukt", {
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setGen(false)
    }
  }

  // Meteen een eerste post genereren.
  useEffect(() => {
    generatePost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function downloadImage() {
    if (!image) return
    const a = document.createElement("a")
    a.href = image
    a.download = `bold700-scorecard-${(project.name || project.url || "review")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase()}.png`
    a.click()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 print:hidden"
    >
      <Card className="max-h-[90svh] w-full max-w-lg overflow-y-auto">
        <CardContent className="space-y-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <Share2 className="h-4 w-4 text-[#0a66c2]" /> Deel op LinkedIn
            </div>
            <button
              onClick={onClose}
              aria-label="Sluiten"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scorecard-afbeelding */}
          {image && (
            <div className="overflow-hidden rounded-xl border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="Scorecard" className="w-full" />
            </div>
          )}
          <Button variant="outline" size="sm" onClick={downloadImage} className="w-full">
            <Download className="mr-1 h-4 w-4" /> Download afbeelding
          </Button>

          {/* Post-tekst */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Post-tekst
              </span>
              <button
                onClick={generatePost}
                disabled={gen}
                className="flex items-center gap-1 text-xs font-medium text-primary disabled:opacity-50"
              >
                {gen ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                Opnieuw
              </button>
            </div>
            <Textarea
              value={gen && !post ? "" : post}
              onChange={(e) => setPost(e.target.value)}
              placeholder={gen ? "AI schrijft de post…" : "Post-tekst"}
              className="min-h-40 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(post)
                toast.success("Tekst gekopieerd")
              }}
              disabled={!post}
            >
              <Copy className="mr-1 h-4 w-4" /> Kopieer tekst
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/feed/?shareActive=true",
                  "_blank",
                )
              }
              className="bg-[#0a66c2] text-white hover:bg-[#0a66c2]/90"
            >
              <Share2 className="mr-1 h-4 w-4" /> Open LinkedIn
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Download de afbeelding, kopieer de tekst, open LinkedIn en plak +
            voeg de afbeelding toe.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
