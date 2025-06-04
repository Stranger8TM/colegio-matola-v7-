"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-blue-900 font-bold">
                CPM
              </div>
              <span className="font-bold text-xl">Colégio Privado da Matola</span>
            </div>
            <p className="text-gray-300 mb-4">
              Educação de excelência desde 2017. Formando cidadãos preparados para o futuro.
            </p>
            <p className="text-gray-400 text-sm">📍 Rua da Mozal, Matola, Moçambique</p>
            <p className="text-gray-400 text-sm">📞 +258 84 039 3525</p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <Link href="/cursos" className="block text-gray-300 hover:text-white">
                Cursos
              </Link>
              <Link href="/professores" className="block text-gray-300 hover:text-white">
                Professores
              </Link>
              <Link href="/admissao" className="block text-gray-300 hover:text-white">
                Admissão
              </Link>
              <Link href="/contacto" className="block text-gray-300 hover:text-white">
                Contacto
              </Link>
            </div>
          </div>

          {/* Portal */}
          <div>
            <h3 className="font-semibold mb-4">Portal</h3>
            <div className="space-y-2">
              <Link href="/portal" className="block text-gray-300 hover:text-white">
                Portal do Aluno
              </Link>
              <Link href="/professores" className="block text-gray-300 hover:text-white">
                Portal do Professor
              </Link>
              <Link href="/painel" className="block text-gray-300 hover:text-white">
                Painel Administrativo
              </Link>
            </div>
          </div>

          {/* Coluna 4 - Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-3 mt-1" />
                <span className="text-gray-700 dark:text-gray-300">
                  Rua da Mozal, Parcela Nº 6096
                  <br />
                  Matola Rio, Maputo, Moçambique
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">+258 84 039 3525</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">info@colegiomatola.co.mz</span>
              </li>
              <li>
                <Button className="mt-2 bg-blue-800 hover:bg-blue-700 text-white">
                  <Link href="/contacto">Entre em Contacto</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 Colégio Privado da Matola. Todos os direitos reservados.</p>
          <p className="text-gray-500 text-sm mt-2">
            Desenvolvido por <span className="text-yellow-500 font-semibold">Gabriel Vieira</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

// Adicionando exportação padrão para compatibilidade
export default Footer
