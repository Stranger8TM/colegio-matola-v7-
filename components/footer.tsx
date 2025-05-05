import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/logo.png" alt="Colégio Matola Logo" width={50} height={50} className="h-12 w-auto" />
              <span className="ml-3 text-xl font-bold">Colégio Matola</span>
            </div>
            <p className="text-gray-400 mb-4">
              Educação de qualidade para formar cidadãos do mundo, preparados para os desafios do futuro.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-gray-400 hover:text-white transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/admissao" className="text-gray-400 hover:text-white transition-colors">
                  Admissão
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
            <h3 className="text-lg font-semibold mb-4">Portais</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portal" className="text-gray-400 hover:text-white transition-colors">
                  Portal do Aluno
                </Link>
              </li>
              <li>
                <Link href="/professores/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Portal do Professor
                </Link>
              </li>
              <li>
                <Link href="/painel" className="text-gray-400 hover:text-white transition-colors">
                  Área Administrativa
                </Link>
              </li>
              <li>
                <Link href="/portal/dashboard/biblioteca" className="text-gray-400 hover:text-white transition-colors">
                  Biblioteca Digital
                </Link>
              </li>
              <li>
                <Link
                  href="/portal/dashboard/aulas-gravadas"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Aulas Gravadas
                </Link>
              </li>
              <li>
                <Link href="/portal/dashboard/forum" className="text-gray-400 hover:text-white transition-colors">
                  Fórum de Discussão
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Av. Principal, 123
                  <br />
                  Matola, Moçambique
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-emerald-500 flex-shrink-0" />
                <a href="tel:+258123456789" className="text-gray-400 hover:text-white transition-colors">
                  +258 12 345 6789
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-emerald-500 flex-shrink-0" />
                <a href="mailto:info@colegiomatola.co.mz" className="text-gray-400 hover:text-white transition-colors">
                  info@colegiomatola.co.mz
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Aplicativo Móvel</h4>
              <div className="flex space-x-2">
                <a href="#" className="block">
                  <Image
                    src="/app-store.png"
                    alt="Download na App Store"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>
                <a href="#" className="block">
                  <Image
                    src="/google-play.png"
                    alt="Download no Google Play"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
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
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <Link href="/termos" className="text-gray-400 hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                    Política de Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
