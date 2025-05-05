"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  const navItems = [
    { name: "Início", href: "/" },
    {
      name: "Sobre",
      href: "#",
      dropdown: [
        { name: "Nossa História", href: "/sobre" },
        { name: "Missão e Valores", href: "/sobre#missao" },
        { name: "Instalações", href: "/sobre#instalacoes" },
      ],
    },
    { name: "Cursos", href: "/cursos" },
    { name: "Admissão", href: "/admissao" },
    { name: "Professores", href: "/professores" },
    { name: "Contacto", href: "/contacto" },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/logo.png" alt="Colégio Matola Logo" width={50} height={50} className="h-12 w-auto" />
              <span className="ml-3 text-xl font-bold text-gray-900">Colégio Matola</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium flex items-center"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} className="px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <Link
              href="/portal"
              className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded-md hover:bg-emerald-50 transition-colors"
            >
              Portal do Aluno
            </Link>
            <Link
              href="/painel"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Área Administrativa
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium flex items-center justify-between"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={toggleMenu}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-2">
              <Link
                href="/portal"
                className="w-full px-4 py-2 text-center text-emerald-600 border border-emerald-600 rounded-md hover:bg-emerald-50 transition-colors"
                onClick={toggleMenu}
              >
                Portal do Aluno
              </Link>
            </div>
            <div className="mt-3 px-5">
              <Link
                href="/painel"
                className="w-full block px-4 py-2 text-center bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                onClick={toggleMenu}
              >
                Área Administrativa
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
