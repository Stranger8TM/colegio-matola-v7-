import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { MessageSchema } from "@/lib/api-schemas"

// GET /api/v1/communication/messages
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const userId = searchParams.get("userId")
    const isRead = searchParams.get("isRead") === "true"
    const folder = searchParams.get("folder") // inbox, sent

    // Construir o filtro
    const filter: any = {}

    if (userId && folder === "inbox") {
      filter.receiverId = userId
    } else if (userId && folder === "sent") {
      filter.senderId = userId
    } else if (userId) {
      filter.OR = [{ senderId: userId }, { receiverId: userId }]
    }

    if (searchParams.has("isRead")) {
      filter.isRead = isRead
    }

    // Buscar mensagens com paginação
    const messages = await prisma.message.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    })

    // Contar total de mensagens para paginação
    const total = await prisma.message.count({ where: filter })

    return successResponse({
      data: messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error)
    return errorResponse("Erro ao buscar mensagens", 500)
  }
}

// POST /api/v1/communication/messages
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, MessageSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const messageData = validation.data

    // Verificar se o remetente existe
    const sender = await prisma.user.findUnique({
      where: { id: messageData.senderId },
    })

    if (!sender) {
      return errorResponse("Remetente não encontrado", 404)
    }

    // Verificar se o destinatário existe
    const receiver = await prisma.user.findUnique({
      where: { id: messageData.receiverId },
    })

    if (!receiver) {
      return errorResponse("Destinatário não encontrado", 404)
    }

    // Criar a mensagem
    const message = await prisma.message.create({
      data: messageData,
    })

    return successResponse(message, 201)
  } catch (error) {
    console.error("Erro ao criar mensagem:", error)
    return errorResponse("Erro ao criar mensagem", 500)
  }
}
