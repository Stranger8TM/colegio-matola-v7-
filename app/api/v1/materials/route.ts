import { type NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/lib/api-config"
import { validateToken } from "@/lib/api-middleware"

export async function GET(request: NextRequest) {
  try {
    // Simulação de dados de materiais
    const materials = [
      {
        id: 1,
        title: "Matemática Básica",
        subject: "Matemática",
        grade: "8º Ano",
        type: "PDF",
        url: "/materials/matematica-basica.pdf",
        uploadedBy: "Gabriel Silva",
        uploadedAt: "2023-05-10",
      },
      {
        id: 2,
        title: "Gramática Portuguesa",
        subject: "Português",
        grade: "9º Ano",
        type: "PDF",
        url: "/materials/gramatica-portuguesa.pdf",
        uploadedBy: "Maria Oliveira",
        uploadedAt: "2023-06-15",
      },
      {
        id: 3,
        title: "Biologia Celular",
        subject: "Ciências",
        grade: "10º Ano",
        type: "Apresentação",
        url: "/materials/biologia-celular.pptx",
        uploadedBy: "João Santos",
        uploadedAt: "2023-07-20",
      },
    ]

    // Implementar paginação
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || apiConfig.pagination.defaultLimit.toString())

    // Implementar filtros
    const subject = url.searchParams.get("subject")
    const grade = url.searchParams.get("grade")

    let filteredMaterials = materials
    if (subject) {
      filteredMaterials = filteredMaterials.filter((m) => m.subject.toLowerCase() === subject.toLowerCase())
    }
    if (grade) {
      filteredMaterials = filteredMaterials.filter((m) => m.grade.toLowerCase() === grade.toLowerCase())
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedMaterials = filteredMaterials.slice(startIndex, endIndex)

    return NextResponse.json({
      data: paginatedMaterials,
      pagination: {
        total: filteredMaterials.length,
        page,
        limit,
        pages: Math.ceil(filteredMaterials.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching materials:", error)
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
    if (!body.title || !body.subject || !body.grade || !body.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulação de criação de material
    const newMaterial = {
      id: Date.now(),
      title: body.title,
      subject: body.subject,
      grade: body.grade,
      type: body.type,
      url: body.url || null,
      uploadedBy: tokenValidation.user?.name || "Sistema",
      uploadedAt: new Date().toISOString(),
    }

    return NextResponse.json({ data: newMaterial }, { status: 201 })
  } catch (error) {
    console.error("Error creating material:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
