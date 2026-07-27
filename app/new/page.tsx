"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { useAuth } from "@/components/providers/auth-provider"
import { NewProjectWizard } from "@/components/new-project-wizard"

export default function NewProjectPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace("/")
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return <NewProjectWizard />
}
