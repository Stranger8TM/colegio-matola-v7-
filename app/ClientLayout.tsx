"use client"

import type React from "react"

import { useEffect } from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MaintenancePopup } from "@/components/maintenance-popup"
import { setupErrorHandler } from "@/lib/error-handler"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Inicializar o detector de erros quando o componente for montado
  useEffect(() => {
    setupErrorHandler()
  }, [])

  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <MaintenancePopup
            show={process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"}
            message="Estamos realizando melhorias em nosso site. Alguns recursos podem estar temporariamente indisponíveis."
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
