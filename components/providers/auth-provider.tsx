"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

import { getDb, getFirebaseAuth } from "@/lib/firebase"
import type { Role } from "@/lib/types"

interface AuthContextValue {
  user: User | null
  // Echt ingelogd (Kenny). Anonieme sessies (van landingspagina-aanmeldingen)
  // tellen NIET als ingelogd, anders zou een bezoeker de tool te zien krijgen.
  authed: boolean
  role: Role
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(getFirebaseAuth(), async (u) => {
      setUser(u)
      if (u) {
        try {
          const snap = await getDoc(doc(getDb(), "users", u.uid))
          setRole(snap.exists() ? ((snap.data().role as Role) ?? null) : null)
        } catch {
          setRole(null)
        }
      } else {
        setRole(null)
      }
      setLoading(false)
    })
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
  }

  const logout = async () => {
    await signOut(getFirebaseAuth())
  }

  const authed = !!user && !user.isAnonymous

  return (
    <AuthContext.Provider value={{ user, authed, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>")
  return ctx
}
