/**
 * API para gerenciar uma sessão de chat específica
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getChatSessionById } from "@/lib/db-service"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter a sessão de chat
    const chatSession = await getChatSessionById(params.id)

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
    const chatSession = await getChatSessionById(params.id)

    // Verificar se a sessão existe e pertence ao usuário
    if (!chatSession || chatSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Sessão não encontrada" }, { status: 404 })
    }

    // Excluir a sessão (usando prisma diretamente aqui porque precisamos excluir mensagens relacionadas)
    await prisma.chatMessage.deleteMany({
      where: { sessionId: params.id },
    })

    await prisma.chatSession.delete({
      where: { id: params.id },
    })

    // Retornar sucesso
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro na API de sessão de chat:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
