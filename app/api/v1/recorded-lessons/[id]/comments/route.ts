import { type NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/api-middleware"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const lessonId = Number.parseInt(params.id)

    // Simulação de busca de comentários para uma aula específica
    const comments = [
      { id: 1, lessonId, user: "Estudante 1", text: "Excelente aula, professor!", date: "2023-08-11" },
      { id: 2, lessonId, user: "Estudante 2", text: "Consegui entender tudo, obrigado!", date: "2023-08-12" },
      {
        id: 3,
        lessonId,
        user: "Estudante 3",
        text: "Poderia explicar novamente a parte sobre o discriminante?",
        date: "2023-08-13",
      },
      {
        id: 4,
        lessonId,
        user: "Professor Gabriel",
        text: "Claro! O discriminante é o valor de delta na fórmula de Bhaskara. Ele determina quantas raízes reais a equação terá.",
        date: "2023-08-14",
      },
    ]

    return NextResponse.json({ data: comments })
  } catch (error) {
    console.error(`Error fetching comments for lesson ID ${params.id}:`, error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Validar token para endpoints que precisam de autenticação
    const tokenValidation = await validateToken(request)
    if (!tokenValidation.valid) {
      return NextResponse.json({ error: tokenValidation.error }, { status: 401 })
    }

    const lessonId = Number.parseInt(params.id)
    const body = await request.json()

    // Validar dados
    if (!body.text) {
      return NextResponse.json({ error: "Comment text is required" }, { status: 400 })
    }

    // Simulação de criação de comentário
    const newComment = {
      id: Date.now(),
      lessonId,
      user: tokenValidation.user?.name || "Usuário Anônimo",
      text: body.text,
      date: new Date().toISOString(),
    }

    return NextResponse.json({ data: newComment }, { status: 201 })
  } catch (error) {
    console.error(`Error creating comment for lesson ID ${params.id}:`, error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
