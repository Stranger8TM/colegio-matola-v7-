/**
 * Serviço para gerenciar as conversas do chatbot
 * Desenvolvido por Gabriel Vieira
 */

import prisma from "@/lib/prisma"
import { generateChatResponse, type Message, SYSTEM_PROMPTS } from "@/lib/groq"
import type { Role } from "@prisma/client"

// Número máximo de mensagens a serem mantidas por sessão
const MAX_MESSAGES_PER_SESSION = 20

// Interface para a resposta do chatbot
export interface ChatResponse {
  message: string
  sessionId: string
}

// Função para criar uma nova sessão de chat
export async function createChatSession(userId: string, title?: string) {
  return prisma.chatSession.create({
    data: {
      userId,
      title: title || "Nova conversa",
    },
  })
}

// Função para obter todas as sessões de chat de um usuário
export async function getUserChatSessions(userId: string) {
  return prisma.chatSession.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  })
}

// Função para obter uma sessão de chat específica
export async function getChatSession(sessionId: string) {
  return prisma.chatSession.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  })
}

// Função para enviar uma mensagem e obter resposta
export async function sendMessage(
  userId: string,
  sessionId: string,
  content: string,
  userRole: Role,
): Promise<ChatResponse> {
  // Obter ou criar uma sessão de chat
  let session
  if (sessionId) {
    session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    })
  }

  if (!session) {
    session = await createChatSession(userId)
    sessionId = session.id
  }

  // Salvar a mensagem do usuário
  await prisma.chatMessage.create({
    data: {
      sessionId,
      userId,
      role: "user",
      content,
    },
  })

  // Preparar as mensagens para o Groq
  const messages: Message[] = session.messages.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }))

  // Adicionar a mensagem atual
  messages.push({
    role: "user",
    content,
  })

  // Determinar o prompt do sistema com base no papel do usuário
  let systemPrompt
  switch (userRole) {
    case "ADMIN":
      systemPrompt = SYSTEM_PROMPTS.ADMIN
      break
    case "TEACHER":
      systemPrompt = SYSTEM_PROMPTS.TEACHER
      break
    default:
      systemPrompt = SYSTEM_PROMPTS.STUDENT
  }

  // Gerar resposta usando o Groq
  const response = await generateChatResponse(messages, systemPrompt)

  // Salvar a resposta do assistente
  await prisma.chatMessage.create({
    data: {
      sessionId,
      userId,
      role: "assistant",
      content: response,
    },
  })

  // Limitar o número de mensagens por sessão
  const messageCount = await prisma.chatMessage.count({
    where: {
      sessionId,
    },
  })

  if (messageCount > MAX_MESSAGES_PER_SESSION * 2) {
    // Obter as mensagens mais antigas para excluir
    const oldMessages = await prisma.chatMessage.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: messageCount - MAX_MESSAGES_PER_SESSION * 2,
    })

    // Excluir as mensagens mais antigas
    if (oldMessages.length > 0) {
      await prisma.chatMessage.deleteMany({
        where: {
          id: {
            in: oldMessages.map((msg) => msg.id),
          },
        },
      })
    }
  }

  // Atualizar o título da sessão se for a primeira mensagem
  if (session.messages.length === 0) {
    // Gerar um título baseado na primeira mensagem
    const title = content.length > 30 ? content.substring(0, 30) + "..." : content
    await prisma.chatSession.update({
      where: {
        id: sessionId,
      },
      data: {
        title,
      },
    })
  }

  return {
    message: response,
    sessionId,
  }
}

// Função para excluir uma sessão de chat
export async function deleteChatSession(sessionId: string) {
  return prisma.chatSession.delete({
    where: {
      id: sessionId,
    },
  })
}
