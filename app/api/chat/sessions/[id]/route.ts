/**
 * API para gerenciar uma sessão de chat específica
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getChatSession, deleteChatSession } from "@/lib/chat-service"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter a sessão de chat
    const chatSession = await getChatSession(params.id)

    // Verificar se a sessão existe e pertence ao usuário
    if (!chatSession || chatSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Sessão não encontrada" }, { status: 404 })
    }

    // Retornar a sessão
    return NextResponse.json(chatSession)
  } catch (error) {
    console.error("Erro na API de sessão de chat:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter a sessão de chat
    const chatSession = await getChatSession(params.id)

    // Verificar se a sessão existe e pertence ao usuário
    if (!chatSession || chatSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Sessão não encontrada" }, { status: 404 })
    }

    // Excluir a sessão
    await deleteChatSession(params.id)

    // Retornar sucesso
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro na API de sessão de chat:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
