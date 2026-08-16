"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

import { PinReportView } from "@/components/pin-report-view"

function Inner() {
  const id = useSearchParams().get("id")
  if (!id) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6 text-center text-muted-foreground">
        Geen rapport opgegeven.
      </div>
    )
  }
  return <PinReportView id={id} />
}

export default function PinsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <Inner />
    </Suspense>
  )
}
