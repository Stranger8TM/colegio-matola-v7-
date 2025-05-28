import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, Student } from "@/types/api"
import prisma from "@/lib/prisma"

// GET /api/v1/students - Listar todos os alunos
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
    const className = searchParams.get("class") || ""
    const status = searchParams.get("status") || ""

    // Construir a consulta
    const skip = (page - 1) * limit
    const where: any = {
      role: "student",
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    if (className) {
      where.class = className
    }

    if (status) {
      where.status = status
    }

    // Executar a consulta
    const [students, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
          class: true,
          grade: true,
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
      students: Student[]
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
        students: students as Student[],
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
    console.error("Error fetching students:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao buscar alunos",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/v1/students - Criar um novo aluno
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados obrigatórios
    if (!body.name || !body.email || !body.class) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Dados inválidos",
        message: "Nome, email e classe são obrigatórios",
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

    // Criar o aluno
    const student = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        class: body.class,
        grade: body.grade || "",
        profileImage: body.profileImage,
        parentName: body.parentName,
        parentContact: body.parentContact,
        status: body.status || "active",
        role: "student",
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        class: true,
        grade: true,
        parentName: true,
        parentContact: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    const response: ApiResponse<Student> = {
      success: true,
      data: student as Student,
      message: "Aluno criado com sucesso",
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("Error creating student:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao criar aluno",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
