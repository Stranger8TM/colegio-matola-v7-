import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { CalendarEventSchema } from "@/lib/api-schemas"

// GET /api/v1/calendar/events
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const type = searchParams.get("type")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const targetClass = searchParams.get("targetClass")

    // Construir o filtro
    const filter: any = {}

    if (type) {
      filter.type = type
    }

    if (targetClass) {
      filter.targetClass = targetClass
    }

    // Filtro de intervalo de datas
    if (startDate || endDate) {
      filter.OR = []

      if (startDate && endDate) {
        // Eventos que começam ou terminam dentro do intervalo
        filter.OR.push({
          startDate: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        })

        filter.OR.push({
          endDate: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        })

        // Eventos que englobam todo o intervalo
        filter.OR.push({
          startDate: { lte: new Date(startDate) },
          endDate: { gte: new Date(endDate) },
        })
      } else if (startDate) {
        filter.startDate = { gte: new Date(startDate) }
      } else if (endDate) {
        filter.startDate = { lte: new Date(endDate) }
      }
    }

    // Buscar eventos com paginação
    const events = await prisma.calendarEvent.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { startDate: "asc" },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Contar total de eventos para paginação
    const total = await prisma.calendarEvent.count({ where: filter })

    return successResponse({
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar eventos do calendário:", error)
    return errorResponse("Erro ao buscar eventos do calendário", 500)
  }
}

// POST /api/v1/calendar/events
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, CalendarEventSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const eventData = validation.data

    // Verificar se o criador existe
    const creator = await prisma.user.findUnique({
      where: { id: eventData.createdBy },
    })

    if (!creator) {
      return errorResponse("Criador não encontrado", 404)
    }

    // Verificar se a turma alvo existe, se especificada
    if (eventData.targetClass) {
      const classExists = await prisma.class.findUnique({
        where: { id: eventData.targetClass },
      })

      if (!classExists) {
        return errorResponse("Turma alvo não encontrada", 404)
      }
    }

    // Criar o evento
    const event = await prisma.calendarEvent.create({
      data: eventData,
    })

    return successResponse(event, 201)
  } catch (error) {
    console.error("Erro ao criar evento do calendário:", error)
    return errorResponse("Erro ao criar evento do calendário", 500)
  }
}
