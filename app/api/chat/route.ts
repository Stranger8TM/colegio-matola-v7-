/**
 * API para o chatbot do Colégio Privado da Matola
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Groq } from "groq-sdk"
import { getChatSessionById, addChatMessage, createChatSession } from "@/lib/db-service"

// Inicializar o cliente Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

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

    // Obter ou criar a sessão de chat
    let chatSession
    if (sessionId) {
      chatSession = await getChatSessionById(sessionId)
      if (!chatSession || chatSession.userId !== session.user.id) {
        return NextResponse.json({ error: "Sessão de chat não encontrada" }, { status: 404 })
      }
    } else {
      // Criar uma nova sessão
      chatSession = await createChatSession(session.user.id, "Nova conversa")
    }

    // Adicionar a mensagem do usuário
    await addChatMessage(chatSession.id, "user", content)

    // Preparar o contexto para o modelo
    const messages = chatSession.messages
      ? [
          {
            role: "system",
            content: `Você é um assistente virtual do Colégio Privado da Matola. 
                 O usuário é um ${
                   session.user.role === "STUDENT"
                     ? "aluno"
                     : session.user.role === "TEACHER"
                       ? "professor"
                       : "administrador"
                 } da escola.
                 Seja educado, prestativo e forneça informações precisas sobre a escola.
                 Desenvolvido por Gabriel Vieira.`,
          },
          ...chatSession.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: "user",
            content,
          },
        ]
      : [
          {
            role: "system",
            content: `Você é um assistente virtual do Colégio Privado da Matola. 
                 O usuário é um ${
                   session.user.role === "STUDENT"
                     ? "aluno"
                     : session.user.role === "TEACHER"
                       ? "professor"
                       : "administrador"
                 } da escola.
                 Seja educado, prestativo e forneça informações precisas sobre a escola.
                 Desenvolvido por Gabriel Vieira.`,
          },
          {
            role: "user",
            content,
          },
        ]

    // Enviar a mensagem para o modelo
    const completion = await groq.chat.completions.create({
      messages,
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1024,
    })

    // Obter a resposta
    const responseContent =
      completion.choices[0]?.message?.content || "Desculpe, não consegui processar sua solicitação."

    // Adicionar a resposta do assistente
    await addChatMessage(chatSession.id, "assistant", responseContent)

    // Retornar a resposta
    return NextResponse.json({
      id: chatSession.id,
      response: responseContent,
    })
  } catch (error) {
    console.error("Erro na API de chat:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
