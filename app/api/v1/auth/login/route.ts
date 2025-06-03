import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse } from "@/types/api"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

// Dados mock para autenticação (sempre disponíveis)
const MOCK_USERS = [
  {
    id: "admin-001",
    name: "Administrador",
    email: "admin@colegiomatola.com",
    username: "admin",
    password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "admin123"
    profileImage: "/avatar-1.jpg",
    role: "admin",
    status: "active",
  },
  {
    id: "teacher-001",
    name: "Gabriel Vieira",
    email: "gabriel@colegiomatola.com",
    username: "teacher",
    password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "teacher123"
    profileImage: "/teacher-gabriel.jpg",
    role: "teacher",
    status: "active",
    subject: "Matemática",
  },
  {
    id: "student-001",
    name: "João Silva",
    email: "joao@colegiomatola.com",
    username: "student",
    password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "student123"
    profileImage: "/avatar-2.jpg",
    role: "student",
    status: "active",
    class: "10A",
    grade: "10",
  },
]

// POST /api/v1/auth/login - Autenticar usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados obrigatórios
    if (!body.username || !body.password) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Dados inválidos",
        message: "Nome de usuário e senha são obrigatórios",
      }

      return NextResponse.json(response, { status: 400 })
    }

    // Buscar o usuário nos dados mock
    const user = MOCK_USERS.find((u) => u.username === body.username)

    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Credenciais inválidas",
        message: "Nome de usuário ou senha incorretos",
      }

      return NextResponse.json(response, { status: 401 })
    }

    // Verificar a senha
    const passwordMatch = await compare(body.password, user.password)

    if (!passwordMatch) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Credenciais inválidas",
        message: "Nome de usuário ou senha incorretos",
      }

      return NextResponse.json(response, { status: 401 })
    }

    // Verificar se o usuário está ativo
    if (user.status === "inactive") {
      const response: ApiResponse<null> = {
        success: false,
        error: "Conta inativa",
        message: "Sua conta está inativa. Entre em contato com a administração.",
      }

      return NextResponse.json(response, { status: 403 })
    }

    // Gerar token JWT
    const token = sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "escola-matola-secret-key",
      { expiresIn: "1d" },
    )

    // Dados do usuário para retornar
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      ...(user.role === "student" && {
        class: (user as any).class,
        grade: (user as any).grade,
      }),
      ...(user.role === "teacher" && {
        subject: (user as any).subject,
      }),
    }

    const response: ApiResponse<{
      user: typeof userData
      token: string
    }> = {
      success: true,
      data: {
        user: userData,
        token,
      },
      message: "Login realizado com sucesso",
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
