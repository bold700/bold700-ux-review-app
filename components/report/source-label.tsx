import { Gauge, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Maakt zichtbaar waar een oordeel vandaan komt: "Gemeten" (deterministische
 * tool, feit) vs "AI-inschatting" (hypothese). Bij lage zekerheid een expliciete
 * waarschuwing om het te laten valideren. Sluit aan op het researchprincipe:
 * label alles als gemeten feit vs AI-hypothese.
 */
export function SourceLabel({
  source,
  confidence,
  className,
}: {
  source?: "measured" | "ai"
  confidence?: "high" | "medium" | "low"
  className?: string
}) {
  if (source === "measured") {
    return (
      <Badge
        variant="outline"
        className={cn(
          "gap-1 text-[10px] text-emerald-600 dark:text-emerald-400",
          className,
        )}
      >
        <Gauge className="h-3 w-3" /> Gemeten
      </Badge>
    )
  }
  if (source === "ai") {
    return (
      <span className={cn("inline-flex items-center gap-1.5", className)}>
        <Badge
          variant="outline"
          className="gap-1 text-[10px] text-muted-foreground"
        >
          <Sparkles className="h-3 w-3" /> AI-inschatting
        </Badge>
        {confidence === "low" && (
          <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
            onzeker — laat dit valideren
          </span>
        )}
      </span>
    )
  }
  return null
}
