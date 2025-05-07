import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { AnnouncementSchema } from "@/lib/api-schemas"

// GET /api/v1/communication/announcements
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const targetAudience = searchParams.get("targetAudience")
    const targetClass = searchParams.get("targetClass")
    const priority = searchParams.get("priority")
    const active = searchParams.get("active") === "true"

    // Construir o filtro
    const filter: any = {}

    if (targetAudience) {
      filter.targetAudience = targetAudience
    }

    if (targetClass) {
      filter.targetClass = targetClass
    }

    if (priority) {
      filter.priority = priority
    }

    if (active) {
      const now = new Date()
      filter.startDate = { lte: now }
      filter.OR = [{ endDate: { gte: now } }, { endDate: null }]
    }

    // Buscar anúncios com paginação
    const announcements = await prisma.announcement.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: [{ priority: "desc" }, { startDate: "desc" }],
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    })

    // Contar total de anúncios para paginação
    const total = await prisma.announcement.count({ where: filter })

    return successResponse({
      data: announcements,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar anúncios:", error)
    return errorResponse("Erro ao buscar anúncios", 500)
  }
}

// POST /api/v1/communication/announcements
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, AnnouncementSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const announcementData = validation.data

    // Verificar se o criador existe
    const creator = await prisma.user.findUnique({
      where: { id: announcementData.createdBy },
    })

    if (!creator) {
      return errorResponse("Criador não encontrado", 404)
    }

    // Verificar se a turma alvo existe, se especificada
    if (announcementData.targetClass) {
      const classExists = await prisma.class.findUnique({
        where: { id: announcementData.targetClass },
      })

      if (!classExists) {
        return errorResponse("Turma alvo não encontrada", 404)
      }
    }

    // Criar o anúncio
    const announcement = await prisma.announcement.create({
      data: announcementData,
    })

    return successResponse(announcement, 201)
  } catch (error) {
    console.error("Erro ao criar anúncio:", error)
    return errorResponse("Erro ao criar anúncio", 500)
  }
}
