import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Acesso Negado</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Você não tem permissão para acessar esta página. Por favor, faça login com uma conta que tenha as permissões
            necessárias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/">Voltar para Home</Link>
            </Button>
            <Button asChild className="bg-blue-800 hover:bg-blue-700">
              <Link href="/login">Fazer Login</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
