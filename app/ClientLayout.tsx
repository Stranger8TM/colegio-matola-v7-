"use client"

import type React from "react"

import { useEffect } from "react"
import { MaintenancePopup } from "@/components/maintenance-popup"
import { setupErrorHandler } from "@/lib/error-handler"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar o detector de erros
    setupErrorHandler()
  }, [])

  return (
    <>
      {children}
      <MaintenancePopup />
    </>
  )
}
