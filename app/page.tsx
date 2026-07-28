"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { useAuth } from "@/components/providers/auth-provider"
import { LoginForm } from "@/components/login-form"
import { Landing } from "@/components/landing"
import { Dashboard } from "@/components/dashboard"

export default function Page() {
  const { authed, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (authed) return <Dashboard />
  return showLogin ? (
    <LoginForm onBack={() => setShowLogin(false)} />
  ) : (
    <Landing onLogin={() => setShowLogin(true)} />
  )
}
