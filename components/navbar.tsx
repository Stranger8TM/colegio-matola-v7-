"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Phone, ChevronDown } from "lucide-react"

// Atualizar o array menuItems para mudar "Painel de Professores" para "Painel"
const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Sobre Nós",
    path: "#",
    submenu: [
      { name: "Nossa História", path: "/sobre/historia" },
      { name: "Equipe", path: "/sobre/equipe" },
      { name: "Infraestrutura", path: "/sobre/infraestrutura" },
    ],
  },
  {
    name: "Cursos",
    path: "/cursos",
  },
  {
    name: "Admissão",
    path: "/admissao",
  },
  {
    name: "Portal do Aluno",
    path: "/portal",
  },
  {
    name: "Painel",
    path: "/painel",
  },
  {
    name: "Contacto",
    path: "/contacto",
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  // Não renderize nada até que o componente esteja montado no cliente
  if (!mounted) {
    return null
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 z-10">
            <div className="w-[50px] h-[50px] relative">
              <div className="w-[50px] h-[50px] bg-yellow-500 rounded-xl flex items-center justify-center text-blue-900 font-bold text-xl shadow-md">
                CPM
              </div>
            </div>
            <div>
              <span className="text-blue-900 dark:text-white font-bold text-xl block leading-tight">
                Colégio Privado
              </span>
              <span className="text-blue-700 dark:text-blue-400 text-sm block leading-tight">da Matola</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}

                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                    <div className="py-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.path}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-blue-400"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+258841234567"
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400"
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>+258 84 039 3525 </span>
            </a>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-800" />
              )}
            </Button>

            <Button className="bg-blue-800 hover:bg-blue-700 text-white rounded-xl">
              <Link href="/admissao">Matricule-se</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-800" />
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isOpen ? (
                <X className="h-6 w-6 text-blue-800 dark:text-blue-400" />
              ) : (
                <Menu className="h-6 w-6 text-blue-800 dark:text-blue-400" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pt-4 pb-6 space-y-2 transition-all duration-300 ease-in-out">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className="flex items-center justify-between w-full py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openSubmenu === item.name ? "rotate-180" : ""}`}
                      />
                    </button>

                    {openSubmenu === item.name && (
                      <div className="pl-6 mt-1 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.path}
                            className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <a href="tel:+258841234567" className="flex items-center py-2 px-4 text-gray-700 dark:text-gray-200">
                <Phone className="h-5 w-5 mr-2" />
                <span>+258 84 123 4567</span>
              </a>

              <Button className="w-full mt-4 bg-blue-800 hover:bg-blue-700 text-white">
                <Link href="/admissao" onClick={() => setIsOpen(false)}>
                  Matricule-se
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
