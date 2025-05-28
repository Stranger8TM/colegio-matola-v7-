import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, Teacher } from "@/types/api"
import prisma from "@/lib/prisma"
import { withAdminAuth } from "@/lib/api-middleware"

// GET /api/v1/teachers - Listar todos os professores
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "name"
    const sortOrder = searchParams.get("sortOrder") || "asc"

    // Parâmetros de filtro
    const search = searchParams.get("search") || ""
    const subject = searchParams.get("subject") || ""
    const status = searchParams.get("status") || ""

    // Construir a consulta
    const skip = (page - 1) * limit
    const where: any = {
      role: "teacher",
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    if (subject) {
      where.subject = subject
    }

    if (status) {
      where.status = status
    }

    // Executar a consulta
    const [teachers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
          subject: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.user.count({ where }),
    ])

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    const response: ApiResponse<{
      teachers: Teacher[]
      pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
      }
    }> = {
      success: true,
      data: {
        teachers: teachers as Teacher[],
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching teachers:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao buscar professores",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/v1/teachers - Criar um novo professor (apenas admin)
export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, decodedToken) => {
    try {
      const body = await req.json()

      // Validar dados obrigatórios
      if (!body.name || !body.email || !body.subject) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Dados inválidos",
          message: "Nome, email e disciplina são obrigatórios",
        }

        return NextResponse.json(response, { status: 400 })
      }

      // Verificar se o email já está em uso
      const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
      })

      if (existingUser) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Email já cadastrado",
          message: "Este email já está sendo utilizado por outro usuário",
        }

        return NextResponse.json(response, { status: 409 })
      }

      // Criar o professor
      const teacher = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          subject: body.subject,
          profileImage: body.profileImage,
          bio: body.bio || "",
          qualifications: body.qualifications || [],
          hireDate: body.hireDate ? new Date(body.hireDate) : new Date(),
          status: body.status || "active",
          role: "teacher",
        },
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
          subject: true,
          bio: true,
          qualifications: true,
          hireDate: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      const response: ApiResponse<Teacher> = {
        success: true,
        data: teacher as Teacher,
        message: "Professor criado com sucesso",
      }

      return NextResponse.json(response, { status: 201 })
    } catch (error) {
      console.error("Error creating teacher:", error)

      const response: ApiResponse<null> = {
        success: false,
        error: "Falha ao criar professor",
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      }

      return NextResponse.json(response, { status: 500 })
    }
  })
}
