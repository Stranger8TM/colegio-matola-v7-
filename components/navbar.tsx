"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  BookOpen,
  Users,
  Phone,
  Home,
  GraduationCap,
  ImageIcon,
  FileText,
  LogIn,
} from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Efeito para detectar rolagem
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Efeito para montar o tema
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fechar menu ao navegar
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Links de navegação
  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    {
      name: "Cursos",
      href: "/cursos",
      icon: <BookOpen className="h-4 w-4" />,
      submenu: [
        { name: "Ensino Primário", href: "/cursos#primario" },
        { name: "Ensino Secundário", href: "/cursos#secundario" },
        { name: "Pré-Universitário", href: "/cursos#pre-universitario" },
        { name: "Atividades Extracurriculares", href: "/cursos#atividades" },
      ],
    },
    { name: "Professores", href: "/professores", icon: <Users className="h-4 w-4" /> },
    { name: "Admissão", href: "/admissao", icon: <GraduationCap className="h-4 w-4" /> },
    { name: "Galeria", href: "/galeria", icon: <ImageIcon className="h-4 w-4" /> },
    { name: "Notícias", href: "/noticias", icon: <FileText className="h-4 w-4" /> },
    { name: "Contacto", href: "/contacto", icon: <Phone className="h-4 w-4" /> },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant={isScrolled ? "default" : "white"} withText />

          {/* Links de navegação - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                    pathname === link.href
                      ? "text-blue-800 dark:text-blue-400"
                      : isScrolled
                        ? "text-gray-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-blue-400"
                        : "text-white hover:text-blue-100"
                  }`}
                >
                  {link.icon && <span className="mr-1">{link.icon}</span>}
                  {link.name}
                  {link.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {/* Submenu */}
                {link.submenu && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Botões de ação - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Alternador de tema */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`rounded-full ${isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white"}`}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {/* Botão de login */}
            <Button
              asChild
              variant="ghost"
              className={`${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Link href="/portal">
                <LogIn className="mr-2 h-4 w-4" />
                Portal
              </Link>
            </Button>

            {/* Botão de contato */}
            <Button asChild className="bg-blue-800 hover:bg-blue-700 text-white">
              <Link href="/contacto">
                <Phone className="mr-2 h-4 w-4" />
                Contacte-nos
              </Link>
            </Button>
          </div>

          {/* Botão do menu - Mobile */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white"}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                        pathname === link.href
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {link.icon && <span className="mr-2">{link.icon}</span>}
                      {link.name}
                    </Link>

                    {/* Submenu no mobile */}
                    {link.submenu && (
                      <div className="ml-6 mt-1 space-y-1">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                          >
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-4 flex flex-col space-y-2">
                {/* Alternador de tema - Mobile */}
                {mounted && (
                  <Button
                    variant="outline"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full justify-start"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Modo Claro
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Modo Escuro
                      </>
                    )}
                  </Button>
                )}

                {/* Botão de login - Mobile */}
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/portal">
                    <LogIn className="mr-2 h-4 w-4" />
                    Portal do Aluno
                  </Link>
                </Button>

                {/* Botão de contato - Mobile */}
                <Button asChild className="w-full justify-start bg-blue-800 hover:bg-blue-700 text-white">
                  <Link href="/contacto">
                    <Phone className="mr-2 h-4 w-4" />
                    Contacte-nos
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Adicionando exportação padrão para compatibilidade
export default Navbar
