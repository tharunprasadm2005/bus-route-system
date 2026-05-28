import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"

// In a real app, you would check for authentication here
const isAuthenticated = true

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </div>
  )
}

