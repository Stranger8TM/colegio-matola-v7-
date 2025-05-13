"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Colégio Matola" width={50} height={50} className="rounded" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-blue-900 dark:text-blue-400">Colégio Matola</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Educação de Excelência</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-sm font-medium"
            >
              Início
            </Link>
            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-sm font-medium flex items-center">
                Sobre Nós
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  href="/sobre/historia"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Nossa História
                </Link>
                <Link
                  href="/sobre/missao"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Missão e Valores
                </Link>
                <Link
                  href="/sobre/equipe"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Nossa Equipe
                </Link>
              </div>
            </div>
            <Link
              href="/cursos"
              className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-sm font-medium"
            >
              Cursos
            </Link>
            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-sm font-medium flex items-center">
                Admissões
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  href="/admissao/processo"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Processo de Admissão
                </Link>
                <Link
                  href="/admissao/requisitos"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Requisitos
                </Link>
                <Link
                  href="/admissao/taxas"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Taxas e Propinas
                </Link>
              </div>
            </div>
            <Link
              href="/professores"
              className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-sm font-medium"
            >
              Professores
            </Link>
            <Link
              href="/contacto"
              className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-sm font-medium"
            >
              Contacto
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/portal">
              <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white">
                Portal do Aluno
              </Button>
            </Link>
            <Link href="/admissao">
              <Button className="bg-blue-800 hover:bg-blue-700">Inscreva-se</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <div className="space-y-1 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
              <Link
                href="/sobre/historia"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Nossa História
              </Link>
              <Link
                href="/sobre/missao"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Missão e Valores
              </Link>
              <Link
                href="/sobre/equipe"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Nossa Equipe
              </Link>
            </div>
            <Link
              href="/cursos"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Cursos
            </Link>
            <div className="space-y-1 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
              <Link
                href="/admissao/processo"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Processo de Admissão
              </Link>
              <Link
                href="/admissao/requisitos"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Requisitos
              </Link>
              <Link
                href="/admissao/taxas"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Taxas e Propinas
              </Link>
            </div>
            <Link
              href="/professores"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Professores
            </Link>
            <Link
              href="/contacto"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4 px-4">
              <Link href="/portal" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                >
                  Portal do Aluno
                </Button>
              </Link>
              <Link href="/admissao" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-blue-800 hover:bg-blue-700">Inscreva-se</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
