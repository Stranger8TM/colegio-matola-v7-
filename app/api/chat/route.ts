/**
 * API para o chatbot do Colégio Privado da Matola
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { sendMessage } from "@/lib/chat-service"

export async function POST(req: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter os dados da requisição
    const { content, sessionId } = await req.json()

    // Validar os dados
    if (!content) {
      return NextResponse.json({ error: "Conteúdo da mensagem é obrigatório" }, { status: 400 })
    }

    // Enviar a mensagem e obter a resposta
    const response = await sendMessage(session.user.id, sessionId, content, session.user.role)

    // Retornar a resposta
    return NextResponse.json(response)
  } catch (error) {
    console.error("Erro na API de chat:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
