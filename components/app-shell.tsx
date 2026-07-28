"use client"

import * as React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// Onthoud de open/dicht-staat van de sidebar (cookie die SidebarProvider zelf zet).
function readSidebarOpen(): boolean {
  if (typeof document === "undefined") return true
  const m = document.cookie.match(/(?:^|;\s*)sidebar_state=([^;]+)/)
  return m ? m[1] !== "false" : true
}

export function AppShell({
  title,
  actions,
  children,
}: {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      defaultOpen={readSidebarOpen()}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={title} actions={actions} />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
