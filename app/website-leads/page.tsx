"use client"

import { Loader2 } from "lucide-react"

import { useAuth } from "@/components/providers/auth-provider"
import { LoginForm } from "@/components/login-form"
import { WebsiteLeadsDashboard } from "@/components/website-leads-dashboard"

export default function WebsiteLeadsPage() {
  const { authed, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return authed ? <WebsiteLeadsDashboard /> : <LoginForm />
}
