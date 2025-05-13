"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MaintenancePopup } from "@/components/maintenance-popup"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showMaintenancePopup, setShowMaintenancePopup] = useState(false)

  useEffect(() => {
    // Check if maintenance mode is enabled
    const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"
    setShowMaintenancePopup(maintenanceMode)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      {showMaintenancePopup && <MaintenancePopup />}
    </ThemeProvider>
  )
}
