import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse } from "@/types/api"
import prisma from "@/lib/prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

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

    // Buscar o usuário
    const user = await prisma.user.findUnique({
      where: { username: body.username },
    })

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
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" },
    )

    // Dados do usuário para retornar
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
    }

    // Se for aluno, adicionar dados específicos
    if (user.role === "student") {
      Object.assign(userData, {
        class: user.class,
        grade: user.grade,
      })
    }

    // Se for professor, adicionar dados específicos
    if (user.role === "teacher") {
      const teacher = await prisma.teacher.findUnique({
        where: { id: user.id },
      })

      if (teacher) {
        Object.assign(userData, {
          subject: teacher.subject,
        })
      }
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
