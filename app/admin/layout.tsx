import type React from "react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import {
  Users,
  BookOpen,
  Calendar,
  Bell,
  Settings,
  Home,
  FileText,
  BarChart,
  MessageSquare,
  LogOut,
} from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Verificar se o usuário é um administrador
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    include: { admin: true },
  })

  if (!user?.admin) {
    redirect("/unauthorized")
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400">Painel Admin</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.name}</p>
        </div>

        <nav className="mt-6">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Principal</div>
          <Link
            href="/admin"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <Home className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Dashboard
          </Link>
          <Link
            href="/admin/usuarios"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <Users className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Usuários
          </Link>
          <Link
            href="/admin/cursos"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <BookOpen className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Cursos
          </Link>
          <Link
            href="/admin/eventos"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <Calendar className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Eventos
          </Link>
          <Link
            href="/admin/arquivos"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <FileText className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Arquivos
          </Link>

          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Sistema</div>
          <Link
            href="/admin/notificacoes"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <Bell className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Notificações
          </Link>
          <Link
            href="/admin/relatorios"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <BarChart className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Relatórios
          </Link>
          <Link
            href="/admin/mensagens"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <MessageSquare className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Mensagens
          </Link>
          <Link
            href="/admin/configuracoes"
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <Settings className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Configurações
          </Link>

          <div className="px-6 py-4 mt-6">
            <LogoutButton>
              <div className="flex items-center text-red-500 hover:text-red-700">
                <LogOut className="h-5 w-5 mr-3" />
                Sair
              </div>
            </LogoutButton>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
