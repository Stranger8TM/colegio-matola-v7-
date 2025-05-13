import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.png" alt="Colégio Matola" width={50} height={50} className="rounded" />
              <div className="ml-3">
                <h2 className="text-xl font-bold text-blue-400">Colégio Matola</h2>
                <p className="text-xs text-gray-400">Educação de Excelência</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Formando líderes e inovadores para o futuro de Moçambique e do mundo, com uma educação de qualidade e
              valores sólidos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre/historia" className="text-gray-400 hover:text-white transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-gray-400 hover:text-white transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/admissao/processo" className="text-gray-400 hover:text-white transition-colors">
                  Admissões
                </Link>
              </li>
              <li>
                <Link href="/professores" className="text-gray-400 hover:text-white transition-colors">
                  Professores
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Portais</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portal" className="text-gray-400 hover:text-white transition-colors">
                  Portal do Aluno
                </Link>
              </li>
              <li>
                <Link href="/professores" className="text-gray-400 hover:text-white transition-colors">
                  Portal do Professor
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Administração
                </Link>
              </li>
              <li>
                <Link href="/biblioteca" className="text-gray-400 hover:text-white transition-colors">
                  Biblioteca Digital
                </Link>
              </li>
              <li>
                <Link href="/calendario" className="text-gray-400 hover:text-white transition-colors">
                  Calendário Escolar
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-gray-400 hover:text-white transition-colors">
                  Notícias e Eventos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-400">Av. Principal, 123, Matola, Maputo, Moçambique</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <a href="tel:+258841234567" className="text-gray-400 hover:text-white transition-colors">
                  +258 84 123 4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <a href="mailto:info@colegiomatola.co.mz" className="text-gray-400 hover:text-white transition-colors">
                  info@colegiomatola.co.mz
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-300">Aplicativo Móvel</h4>
              <div className="flex space-x-2">
                <a href="#" className="block">
                  <Image src="/app-store.png" alt="App Store" width={120} height={40} />
                </a>
                <a href="#" className="block">
                  <Image src="/google-play.png" alt="Google Play" width={120} height={40} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Colégio Matola. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="text-gray-400 hover:text-white text-sm transition-colors">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
