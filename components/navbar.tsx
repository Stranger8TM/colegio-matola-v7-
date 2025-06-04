"use client"
import { useState } from "react"
import Link from "next/link"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              CPM
            </div>
            <span className="font-bold text-gray-900">Colégio Privado da Matola</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Início
            </Link>
            <Link href="/cursos" className="text-gray-700 hover:text-blue-600">
              Cursos
            </Link>
            <Link href="/professores" className="text-gray-700 hover:text-blue-600">
              Professores
            </Link>
            <Link href="/admissao" className="text-gray-700 hover:text-blue-600">
              Admissão
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-blue-600">
              Contacto
            </Link>
            <Link href="/portal" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Portal
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            <div className="w-6 h-6 flex flex-col justify-center">
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all ${isOpen ? "rotate-45 translate-y-1" : ""}`}
              ></span>
              <span className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-all ${isOpen ? "opacity-0" : ""}`}></span>
              <span
                className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-all ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="py-2 text-gray-700" onClick={() => setIsOpen(false)}>
                Início
              </Link>
              <Link href="/cursos" className="py-2 text-gray-700" onClick={() => setIsOpen(false)}>
                Cursos
              </Link>
              <Link href="/professores" className="py-2 text-gray-700" onClick={() => setIsOpen(false)}>
                Professores
              </Link>
              <Link href="/admissao" className="py-2 text-gray-700" onClick={() => setIsOpen(false)}>
                Admissão
              </Link>
              <Link href="/contacto" className="py-2 text-gray-700" onClick={() => setIsOpen(false)}>
                Contacto
              </Link>
              <Link
                href="/portal"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center mt-4"
                onClick={() => setIsOpen(false)}
              >
                Portal do Aluno
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
