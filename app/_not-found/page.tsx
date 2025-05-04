import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">Desculpe, a página que você está procurando não existe ou foi movida.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
            Voltar para a página inicial
          </Link>
          <Link href="/contacto" className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md">
            Entrar em contacto
          </Link>
        </div>
      </div>
    </div>
  )
}
