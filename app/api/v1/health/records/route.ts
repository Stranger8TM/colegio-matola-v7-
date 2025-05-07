import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { HealthRecordSchema } from "@/lib/api-schemas"

// GET /api/v1/health/records
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const studentId = searchParams.get("studentId")
    const bloodType = searchParams.get("bloodType")

    // Construir o filtro
    const filter: any = {}

    if (studentId) {
      filter.studentId = studentId
    }

    if (bloodType) {
      filter.bloodType = bloodType
    }

    // Buscar registros de saúde com paginação
    const healthRecords = await prisma.healthRecord.findMany({
      where: filter,
      skip,
      take: limit,
      include: {
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

    // Contar total de registros para paginação
    const total = await prisma.healthRecord.count({ where: filter })

    return successResponse({
      data: healthRecords,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar registros de saúde:", error)
    return errorResponse("Erro ao buscar registros de saúde", 500)
  }
}

// POST /api/v1/health/records
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, HealthRecordSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const recordData = validation.data

    // Verificar se o estudante existe
    const student = await prisma.user.findUnique({
      where: {
        id: recordData.studentId,
        role: "student",
      },
    })

    if (!student) {
      return errorResponse("Estudante não encontrado", 404)
    }

    // Verificar se já existe um registro para este estudante
    const existingRecord = await prisma.healthRecord.findUnique({
      where: { studentId: recordData.studentId },
    })

    if (existingRecord) {
      return errorResponse("Já existe um registro de saúde para este estudante", 409)
    }

    // Criar o registro de saúde
    const healthRecord = await prisma.healthRecord.create({
      data: recordData,
    })

    return successResponse(healthRecord, 201)
  } catch (error) {
    console.error("Erro ao criar registro de saúde:", error)
    return errorResponse("Erro ao criar registro de saúde", 500)
  }
}
