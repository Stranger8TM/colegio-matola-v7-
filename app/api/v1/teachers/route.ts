import { type NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/lib/api-config"
import { validateToken } from "@/lib/api-middleware"

export async function GET(request: NextRequest) {
  try {
    // Opcional: validar token para endpoints que precisam de autenticação
    // const tokenValidation = await validateToken(request);
    // if (!tokenValidation.valid) {
    //   return NextResponse.json({ error: tokenValidation.error }, { status: 401 });
    // }

    // Simulação de dados de professores
    const teachers = [
      { id: 1, name: "Gabriel Silva", subject: "Matemática", email: "gabriel.silva@colegiomatola.com" },
      { id: 2, name: "Maria Oliveira", subject: "Português", email: "maria.oliveira@colegiomatola.com" },
      { id: 3, name: "João Santos", subject: "Ciências", email: "joao.santos@colegiomatola.com" },
    ]

    // Implementar paginação
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || apiConfig.pagination.defaultLimit.toString())
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedTeachers = teachers.slice(startIndex, endIndex)

    return NextResponse.json({
      data: paginatedTeachers,
      pagination: {
        total: teachers.length,
        page,
        limit,
        pages: Math.ceil(teachers.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validar token para endpoints que precisam de autenticação
    const tokenValidation = await validateToken(request)
    if (!tokenValidation.valid) {
      return NextResponse.json({ error: tokenValidation.error }, { status: 401 })
    }

    const body = await request.json()

    // Validar dados
    if (!body.name || !body.subject || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulação de criação de professor
    const newTeacher = {
      id: Date.now(),
      name: body.name,
      subject: body.subject,
      email: body.email,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ data: newTeacher }, { status: 201 })
  } catch (error) {
    console.error("Error creating teacher:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
