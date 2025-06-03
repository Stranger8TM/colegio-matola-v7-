import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse } from "@/types/api"
import { AuthService } from "@/lib/auth-service"

// Função para obter dados mock quando o Prisma não está disponível
function getMockUser(username: string) {
  if (username === "admin") {
    return {
      id: "mock-admin-id",
      name: "Admin User",
      email: "admin@colegiomatola.com",
      username: "admin",
      password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "admin123"
      profileImage: "/avatar-1.jpg",
      role: "admin",
      status: "active",
    }
  } else if (username === "teacher") {
    return {
      id: "mock-teacher-id",
      name: "Teacher User",
      email: "teacher@colegiomatola.com",
      username: "teacher",
      password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "teacher123"
      profileImage: "/teacher-gabriel.jpg",
      role: "teacher",
      status: "active",
    }
  } else if (username === "student") {
    return {
      id: "mock-student-id",
      name: "Student User",
      email: "student@colegiomatola.com",
      username: "student",
      password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "student123"
      profileImage: "/avatar-2.jpg",
      role: "student",
      status: "active",
      class: "10A",
      grade: "10",
    }
  }

  return null
}

// POST /api/v1/auth/login - Autenticar usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    const result = await AuthService.login(username, password)

    if (!result.success) {
      const response: ApiResponse<null> = {
        success: false,
        error: result.error,
        message: result.message,
      }

      return NextResponse.json(response, { status: result.error === "Credenciais inválidas" ? 401 : 400 })
    }

    const response: ApiResponse<{
      user: typeof result.user
      token: string
      isMock?: boolean
    }> = {
      success: true,
      data: {
        user: result.user!,
        token: result.token!,
        ...(result.isMock && { isMock: true }),
      },
      message: result.message,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error during login:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha na autenticação",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
