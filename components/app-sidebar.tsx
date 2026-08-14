"use client"

import * as React from "react"
import {
  BarChart3Icon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navMain = [
  { title: "Dashboard", url: "/", icon: <LayoutDashboardIcon /> },
  { title: "Leads", url: "/leads", icon: <UsersIcon /> },
  { title: "Website-leads", url: "/website-leads", icon: <SparklesIcon /> },
  { title: "Site-feedback", url: "/site-feedback", icon: <MessageSquareIcon /> },
  { title: "Insights", url: "/insights", icon: <BarChart3Icon /> },
]

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
              <BrandLogo className="size-5!" />
              <span className="text-base font-semibold">BOLD700 · UX Review</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
