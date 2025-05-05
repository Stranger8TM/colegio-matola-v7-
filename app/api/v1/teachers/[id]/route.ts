import { type NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/api-middleware"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Simulação de busca de professor por ID
    const teacher = {
      id,
      name: "Gabriel Silva",
      subject: "Matemática",
      email: "gabriel.silva@colegiomatola.com",
      bio: "Professor de Matemática com 10 anos de experiência",
      education: "Mestrado em Matemática Aplicada",
      joinedAt: "2018-03-15",
    }

    // Verificar se o professor existe
    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 })
    }

    return NextResponse.json({ data: teacher })
  } catch (error) {
    console.error(`Error fetching teacher with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Validar token para endpoints que precisam de autenticação
    const tokenValidation = await validateToken(request)
    if (!tokenValidation.valid) {
      return NextResponse.json({ error: tokenValidation.error }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    const body = await request.json()

    // Simulação de atualização de professor
    const updatedTeacher = {
      id,
      name: body.name || "Gabriel Silva",
      subject: body.subject || "Matemática",
      email: body.email || "gabriel.silva@colegiomatola.com",
      bio: body.bio || "Professor de Matemática com 10 anos de experiência",
      education: body.education || "Mestrado em Matemática Aplicada",
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ data: updatedTeacher })
  } catch (error) {
    console.error(`Error updating teacher with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Validar token para endpoints que precisam de autenticação
    const tokenValidation = await validateToken(request)
    if (!tokenValidation.valid) {
      return NextResponse.json({ error: tokenValidation.error }, { status: 401 })
    }

    const id = Number.parseInt(params.id)

    // Simulação de exclusão de professor
    // Em um ambiente real, você verificaria se o professor existe antes de excluir

    return NextResponse.json({
      success: true,
      message: `Teacher with ID ${id} has been deleted`,
    })
  } catch (error) {
    console.error(`Error deleting teacher with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
