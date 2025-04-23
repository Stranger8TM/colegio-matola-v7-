"use client"

import { useAuth } from "@/hooks/use-auth"
import type { ReactNode } from "react"

interface AuthGuardProps {
  children: ReactNode
  role?: "STUDENT" | "TEACHER" | "ADMIN"
}

export function AuthGuard({ children, role }: AuthGuardProps) {
  const { user, loading } = useAuth({ required: true })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  if (role && user?.role !== role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
