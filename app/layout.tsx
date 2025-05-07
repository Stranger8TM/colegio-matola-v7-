import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Colégio Privado da Matola | Educação de Excelência desde 2017",
  description:
    "O Colégio Privado da Matola oferece educação de excelência em Moçambique desde 2017. Conheça nossos cursos, professores e instalações de alta qualidade.",
  keywords: [
    "colégio privado",
    "matola",
    "moçambique",
    "educação",
    "ensino de qualidade",
    "escola privada",
    "admissão escolar",
  ],
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientLayout>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
