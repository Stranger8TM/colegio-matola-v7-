"use client"

import { useSession } from "next-auth/react"
import { Role } from "@prisma/client"

export function useAuth() {
  const { data: session, status } = useSession()

  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

  const isAdmin = isAuthenticated && session?.user?.role === Role.ADMIN
  const isTeacher = isAuthenticated && session?.user?.role === Role.TEACHER
  const isStudent = isAuthenticated && session?.user?.role === Role.STUDENT

  return {
    session,
    status,
    isAuthenticated,
    isLoading,
    isAdmin,
    isTeacher,
    isStudent,
    user: session?.user,
  }
}
