import { type NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/api-middleware"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Simulação de busca de material por ID
    const material = {
      id,
      title: "Matemática Básica",
      subject: "Matemática",
      grade: "8º Ano",
      type: "PDF",
      url: "/materials/matematica-basica.pdf",
      description: "Material completo sobre operações básicas de matemática",
      pages: 45,
      uploadedBy: "Gabriel Silva",
      uploadedAt: "2023-05-10",
      downloads: 128,
    }

    // Verificar se o material existe
    if (!material) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 })
    }

    return NextResponse.json({ data: material })
  } catch (error) {
    console.error(`Error fetching material with ID ${params.id}:`, error)
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

    // Simulação de atualização de material
    const updatedMaterial = {
      id,
      title: body.title || "Matemática Básica",
      subject: body.subject || "Matemática",
      grade: body.grade || "8º Ano",
      type: body.type || "PDF",
      url: body.url || "/materials/matematica-basica.pdf",
      description: body.description || "Material completo sobre operações básicas de matemática",
      pages: body.pages || 45,
      updatedBy: tokenValidation.user?.name || "Sistema",
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ data: updatedMaterial })
  } catch (error) {
    console.error(`Error updating material with ID ${params.id}:`, error)
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

    // Simulação de exclusão de material
    // Em um ambiente real, você verificaria se o material existe antes de excluir

    return NextResponse.json({
      success: true,
      message: `Material with ID ${id} has been deleted`,
    })
  } catch (error) {
    console.error(`Error deleting material with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
