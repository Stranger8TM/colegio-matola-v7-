import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Colégio Privado da Matola - Educação de Excelência desde 2017",
  description:
    "Formando cidadãos preparados para os desafios do mundo moderno com valores éticos e competências globais.",
  keywords: "colégio, escola, matola, moçambique, educação, ensino de qualidade, ensino primário, ensino secundário",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
