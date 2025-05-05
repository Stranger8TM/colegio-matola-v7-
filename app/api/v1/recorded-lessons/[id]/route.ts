import { type NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/api-middleware"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Simulação de busca de aula gravada por ID
    const lesson = {
      id,
      title: "Equações do 2º Grau",
      subject: "Matemática",
      grade: "9º Ano",
      teacher: "Gabriel Silva",
      duration: "45:30",
      url: "/videos/equacoes-2-grau.mp4",
      thumbnail: "/thumbnails/equacoes-2-grau.jpg",
      description:
        "Nesta aula, o professor Gabriel explica como resolver equações do segundo grau usando a fórmula de Bhaskara e outros métodos.",
      uploadedAt: "2023-08-10",
      views: 256,
      likes: 45,
      comments: [
        { id: 1, user: "Estudante 1", text: "Excelente aula, professor!", date: "2023-08-11" },
        { id: 2, user: "Estudante 2", text: "Consegui entender tudo, obrigado!", date: "2023-08-12" },
      ],
    }

    // Verificar se a aula existe
    if (!lesson) {
      return NextResponse.json({ error: "Recorded lesson not found" }, { status: 404 })
    }

    // Incrementar visualizações (em um ambiente real, isso seria feito no banco de dados)
    lesson.views += 1

    return NextResponse.json({ data: lesson })
  } catch (error) {
    console.error(`Error fetching recorded lesson with ID ${params.id}:`, error)
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

    // Simulação de atualização de aula gravada
    const updatedLesson = {
      id,
      title: body.title || "Equações do 2º Grau",
      subject: body.subject || "Matemática",
      grade: body.grade || "9º Ano",
      teacher: body.teacher || "Gabriel Silva",
      duration: body.duration || "45:30",
      url: body.url || "/videos/equacoes-2-grau.mp4",
      thumbnail: body.thumbnail || "/thumbnails/equacoes-2-grau.jpg",
      description:
        body.description ||
        "Nesta aula, o professor Gabriel explica como resolver equações do segundo grau usando a fórmula de Bhaskara e outros métodos.",
      updatedBy: tokenValidation.user?.name || "Sistema",
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ data: updatedLesson })
  } catch (error) {
    console.error(`Error updating recorded lesson with ID ${params.id}:`, error)
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

    // Simulação de exclusão de aula gravada
    // Em um ambiente real, você verificaria se a aula existe antes de excluir

    return NextResponse.json({
      success: true,
      message: `Recorded lesson with ID ${id} has been deleted`,
    })
  } catch (error) {
    console.error(`Error deleting recorded lesson with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
