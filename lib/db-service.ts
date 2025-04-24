/**
 * Serviço de acesso ao banco de dados
 * Desenvolvido por Gabriel Vieira
 *
 * Este arquivo contém funções que devem ser chamadas apenas do servidor
 */

import { prisma } from "./prisma"

// Funções de usuário
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      adminType: true,
      class: true,
      grade: true,
      subject: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

// Funções de chat
export async function getChatSessions(userId: string) {
  return prisma.chatSession.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  })
}

export async function getChatSessionById(id: string) {
  return prisma.chatSession.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  })
}

export async function createChatSession(userId: string, title: string) {
  return prisma.chatSession.create({
    data: {
      userId,
      title,
    },
  })
}

export async function addChatMessage(sessionId: string, role: string, content: string) {
  return prisma.chatMessage.create({
    data: {
      sessionId,
      role,
      content,
    },
  })
}

// Funções de arquivo
export async function getFiles(type?: string, category?: string, uploadedBy?: string) {
  return prisma.file.findMany({
    where: {
      type: type ? type : undefined,
      category: category ? category : undefined,
      uploadedBy: uploadedBy ? { email: uploadedBy } : undefined,
    },
    include: {
      uploadedBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function createFile(data: {
  url: string
  filename: string
  contentType: string
  size: number
  category: string
  description: string
  type: string
  userEmail: string
}) {
  return prisma.file.create({
    data: {
      url: data.url,
      filename: data.filename,
      contentType: data.contentType,
      size: data.size,
      category: data.category,
      description: data.description,
      type: data.type,
      uploadedBy: {
        connect: {
          email: data.userEmail,
        },
      },
    },
  })
}

export async function deleteFile(id: string) {
  return prisma.file.delete({
    where: { id },
  })
}
