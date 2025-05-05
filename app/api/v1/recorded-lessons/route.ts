import { type NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/lib/api-config"
import { validateToken } from "@/lib/api-middleware"

export async function GET(request: NextRequest) {
  try {
    // Simulação de dados de aulas gravadas
    const lessons = [
      {
        id: 1,
        title: "Equações do 2º Grau",
        subject: "Matemática",
        grade: "9º Ano",
        teacher: "Gabriel Silva",
        duration: "45:30",
        url: "/videos/equacoes-2-grau.mp4",
        thumbnail: "/thumbnails/equacoes-2-grau.jpg",
        uploadedAt: "2023-08-10",
        views: 256,
      },
      {
        id: 2,
        title: "Análise de Texto",
        subject: "Português",
        grade: "8º Ano",
        teacher: "Maria Oliveira",
        duration: "38:15",
        url: "/videos/analise-texto.mp4",
        thumbnail: "/thumbnails/analise-texto.jpg",
        uploadedAt: "2023-09-05",
        views: 189,
      },
      {
        id: 3,
        title: "Sistema Solar",
        subject: "Ciências",
        grade: "7º Ano",
        teacher: "João Santos",
        duration: "52:20",
        url: "/videos/sistema-solar.mp4",
        thumbnail: "/thumbnails/sistema-solar.jpg",
        uploadedAt: "2023-10-12",
        views: 312,
      },
    ]

    // Implementar paginação
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || apiConfig.pagination.defaultLimit.toString())

    // Implementar filtros
    const subject = url.searchParams.get("subject")
    const grade = url.searchParams.get("grade")
    const teacher = url.searchParams.get("teacher")

    let filteredLessons = lessons
    if (subject) {
      filteredLessons = filteredLessons.filter((l) => l.subject.toLowerCase() === subject.toLowerCase())
    }
    if (grade) {
      filteredLessons = filteredLessons.filter((l) => l.grade.toLowerCase() === grade.toLowerCase())
    }
    if (teacher) {
      filteredLessons = filteredLessons.filter((l) => l.teacher.toLowerCase().includes(teacher.toLowerCase()))
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedLessons = filteredLessons.slice(startIndex, endIndex)

    return NextResponse.json({
      data: paginatedLessons,
      pagination: {
        total: filteredLessons.length,
        page,
        limit,
        pages: Math.ceil(filteredLessons.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching recorded lessons:", error)
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
    if (!body.title || !body.subject || !body.grade || !body.url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulação de criação de aula gravada
    const newLesson = {
      id: Date.now(),
      title: body.title,
      subject: body.subject,
      grade: body.grade,
      teacher: tokenValidation.user?.name || "Professor",
      duration: body.duration || "00:00",
      url: body.url,
      thumbnail: body.thumbnail || null,
      uploadedAt: new Date().toISOString(),
      views: 0,
    }

    return NextResponse.json({ data: newLesson }, { status: 201 })
  } catch (error) {
    console.error("Error creating recorded lesson:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
