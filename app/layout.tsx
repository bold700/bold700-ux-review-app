import type { Metadata, Viewport } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "BOLD700 — UX Review Platform",
  description: "Professionele UX-reviews van BOLD700.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BOLD700 UX",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0d0d0f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" suppressHydrationWarning className="antialiased">
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
