import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { ActivityEnrollmentSchema } from "@/lib/api-schemas"

// GET /api/v1/extracurricular/enrollments
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const status = searchParams.get("status")
    const activityId = searchParams.get("activityId")
    const studentId = searchParams.get("studentId")

    // Construir o filtro
    const filter: any = {}

    if (status) {
      filter.status = status
    }

    if (activityId) {
      filter.activityId = activityId
    }

    if (studentId) {
      filter.studentId = studentId
    }

    // Buscar inscrições com paginação
    const enrollments = await prisma.activityEnrollment.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { enrollmentDate: "desc" },
      include: {
        activity: {
          select: {
            id: true,
            name: true,
            dayOfWeek: true,
            startTime: true,
            endTime: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            class: true,
            grade: true,
          },
        },
      },
    })

    // Contar total de inscrições para paginação
    const total = await prisma.activityEnrollment.count({ where: filter })

    return successResponse({
      data: enrollments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar inscrições:", error)
    return errorResponse("Erro ao buscar inscrições", 500)
  }
}

// POST /api/v1/extracurricular/enrollments
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, ActivityEnrollmentSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const enrollmentData = validation.data

    // Verificar se a atividade existe
    const activity = await prisma.extracurricularActivity.findUnique({
      where: { id: enrollmentData.activityId },
      include: {
        enrollments: {
          where: { status: "active" },
        },
      },
    })

    if (!activity) {
      return errorResponse("Atividade não encontrada", 404)
    }

    // Verificar se a atividade está ativa
    if (activity.status !== "active") {
      return errorResponse("Não é possível se inscrever em uma atividade inativa", 400)
    }

    // Verificar se o estudante existe
    const student = await prisma.user.findUnique({
      where: {
        id: enrollmentData.studentId,
        role: "student",
      },
    })

    if (!student) {
      return errorResponse("Estudante não encontrado", 404)
    }

    // Verificar se o estudante já está inscrito na atividade
    const existingEnrollment = await prisma.activityEnrollment.findFirst({
      where: {
        activityId: enrollmentData.activityId,
        studentId: enrollmentData.studentId,
      },
    })

    if (existingEnrollment) {
      return errorResponse("Estudante já está inscrito nesta atividade", 409)
    }

    // Verificar se há vagas disponíveis
    if (activity.maxParticipants && activity.enrollments.length >= activity.maxParticipants) {
      // Inscrever na lista de espera
      const enrollment = await prisma.activityEnrollment.create({
        data: {
          ...enrollmentData,
          status: "waitlist",
        },
      })

      return successResponse(
        {
          ...enrollment,
          message: "Inscrição realizada na lista de espera devido ao limite de participantes",
        },
        201,
      )
    }

    // Criar a inscrição
    const enrollment = await prisma.activityEnrollment.create({
      data: enrollmentData,
    })

    return successResponse(enrollment, 201)
  } catch (error) {
    console.error("Erro ao criar inscrição:", error)
    return errorResponse("Erro ao criar inscrição", 500)
  }
}
