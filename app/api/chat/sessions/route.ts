/**
 * API para gerenciar as sessões de chat
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getUserChatSessions, createChatSession } from "@/lib/chat-service"

export async function GET() {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter as sessões de chat do usuário
    const chatSessions = await getUserChatSessions(session.user.id)

    // Retornar as sessões
    return NextResponse.json(chatSessions)
  } catch (error) {
    console.error("Erro na API de sessões de chat:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter os dados da requisição
    const { title } = await req.json()

    // Criar uma nova sessão de chat
    const chatSession = await createChatSession(session.user.id, title)

    // Retornar a sessão criada
    return NextResponse.json(chatSession)
  } catch (error) {
    console.error("Erro na API de sessões de chat:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
