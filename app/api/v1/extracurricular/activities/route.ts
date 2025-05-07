import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { ExtracurricularActivitySchema } from "@/lib/api-schemas"

// GET /api/v1/extracurricular/activities
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const status = searchParams.get("status")
    const dayOfWeek = searchParams.get("dayOfWeek")
    const teacherId = searchParams.get("teacherId")

    // Construir o filtro
    const filter: any = {}

    if (status) {
      filter.status = status
    }

    if (dayOfWeek) {
      filter.dayOfWeek = dayOfWeek
    }

    if (teacherId) {
      filter.teacherId = teacherId
    }

    // Buscar atividades com paginação
    const activities = await prisma.extracurricularActivity.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            subject: true,
          },
        },
        enrollments: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    })

    // Contar total de atividades para paginação
    const total = await prisma.extracurricularActivity.count({ where: filter })

    // Adicionar contagem de participantes a cada atividade
    const activitiesWithCounts = activities.map((activity) => ({
      ...activity,
      currentParticipants: activity.enrollments.filter((e) => e.status === "active").length,
      enrollments: undefined, // Remover a lista completa de inscrições
    }))

    return successResponse({
      data: activitiesWithCounts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar atividades extracurriculares:", error)
    return errorResponse("Erro ao buscar atividades extracurriculares", 500)
  }
}

// POST /api/v1/extracurricular/activities
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, ExtracurricularActivitySchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const activityData = validation.data

    // Verificar se o professor existe
    const teacher = await prisma.teacher.findUnique({
      where: { id: activityData.teacherId },
    })

    if (!teacher) {
      return errorResponse("Professor não encontrado", 404)
    }

    // Verificar se o professor já tem uma atividade no mesmo horário
    const conflictingActivity = await prisma.extracurricularActivity.findFirst({
      where: {
        teacherId: activityData.teacherId,
        dayOfWeek: activityData.dayOfWeek,
        OR: [
          {
            startTime: { lte: activityData.startTime },
            endTime: { gt: activityData.startTime },
          },
          {
            startTime: { lt: activityData.endTime },
            endTime: { gte: activityData.endTime },
          },
          {
            startTime: { gte: activityData.startTime },
            endTime: { lte: activityData.endTime },
          },
        ],
      },
    })

    if (conflictingActivity) {
      return errorResponse("Professor já tem uma atividade agendada neste horário", 409)
    }

    // Criar a atividade
    const activity = await prisma.extracurricularActivity.create({
      data: activityData,
    })

    return successResponse(activity, 201)
  } catch (error) {
    console.error("Erro ao criar atividade extracurricular:", error)
    return errorResponse("Erro ao criar atividade extracurricular", 500)
  }
}
