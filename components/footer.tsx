import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter */}
        <div className="bg-blue-800 dark:bg-blue-900 rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700 dark:bg-blue-800 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-700 dark:bg-blue-800 rounded-full translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-white mb-4">Receba Nossas Novidades</h3>
              <p className="text-blue-100 text-lg mb-0">
                Inscreva-se em nossa newsletter para receber atualizações sobre eventos, notícias e informações
                importantes do colégio.
              </p>
            </div>

            <div className="md:w-1/2 w-full">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-grow px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Seu email"
                />
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-medium px-6 py-3 rounded-xl">
                  Inscrever-se
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Coluna 1 - Sobre */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-[40px] h-[40px] bg-yellow-500 rounded-xl flex items-center justify-center text-blue-900 font-bold text-sm">
                CPM
              </div>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 ml-2">Colégio Privado da Matola</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Educação de excelência para o futuro de Moçambique, formando cidadãos preparados para os desafios do mundo
              moderno com valores éticos e competências globais.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Youtube className="h-5 w-5" />, label: "Youtube" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-full bg-blue-100 dark:bg-gray-800 flex items-center justify-center text-blue-800 dark:text-blue-400 hover:bg-blue-800 hover:text-white dark:hover:bg-blue-700 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Sobre Nós", path: "/sobre" },
                { name: "Cursos", path: "/cursos" },
                { name: "Admissão", path: "/admissao" },
                { name: "Portal do Aluno", path: "/portal" },
                { name: "Painel de Professores", path: "/professores" },
                { name: "Notícias", path: "/noticias" },
                { name: "Galeria", path: "/galeria" },
                { name: "Contacto", path: "/contacto" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-800 dark:bg-blue-400 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Cursos */}
          <div>
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-6">Nossos Cursos</h3>
            <ul className="space-y-3">
              {[
                { name: "Ensino Primário", path: "/cursos#primario" },
                { name: "Ensino Secundário", path: "/cursos#secundario" },
                { name: "Pré-Universitário", path: "/cursos#pre-universitario" },
                { name: "Atividades Extracurriculares", path: "/cursos#atividades" },
                { name: "Reforço Escolar", path: "/cursos#reforco" },
                { name: "Idiomas", path: "/cursos#idiomas" },
              ].map((course, index) => (
                <li key={index}>
                  <Link
                    href={course.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-800 dark:bg-blue-400 rounded-full mr-2"></span>
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Contacto */}
          <div>
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
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Colégio Privado da Matola. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/politica-privacidade" className="hover:text-blue-800 dark:hover:text-blue-400">
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="hover:text-blue-800 dark:hover:text-blue-400">
                Termos de Uso
              </Link>
              <span>
                Desenvolvido por{" "}
                <a href="#" className="text-blue-800 dark:text-blue-400 font-bold">
                  Gabriel Vieira
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
