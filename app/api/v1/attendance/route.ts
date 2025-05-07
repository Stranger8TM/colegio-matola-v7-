import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { AttendanceRecordSchema } from "@/lib/api-schemas"

// GET /api/v1/attendance
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const classId = searchParams.get("classId")
    const studentId = searchParams.get("studentId")
    const date = searchParams.get("date")
    const status = searchParams.get("status")

    // Construir o filtro
    const filter: any = {}

    if (classId) {
      filter.classId = classId
    }

    if (studentId) {
      filter.studentId = studentId
    }

    if (date) {
      const dateObj = new Date(date)
      filter.date = {
        gte: new Date(dateObj.setHours(0, 0, 0, 0)),
        lt: new Date(dateObj.setHours(23, 59, 59, 999)),
      }
    }

    if (status) {
      filter.status = status
    }

    // Buscar registros de presença com paginação
    const attendanceRecords = await prisma.attendanceRecord.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: [{ date: "desc" }, { studentId: "asc" }],
      include: {
        student: {
          select: {
            id: true,
            name: true,
            class: true,
            grade: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            grade: true,
          },
        },
      },
    })

    // Contar total de registros para paginação
    const total = await prisma.attendanceRecord.count({ where: filter })

    return successResponse({
      data: attendanceRecords,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar registros de presença:", error)
    return errorResponse("Erro ao buscar registros de presença", 500)
  }
}

// POST /api/v1/attendance
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, AttendanceRecordSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const attendanceData = validation.data

    // Verificar se o estudante existe
    const student = await prisma.user.findUnique({
      where: {
        id: attendanceData.studentId,
        role: "student",
      },
    })

    if (!student) {
      return errorResponse("Estudante não encontrado", 404)
    }

    // Verificar se a turma existe
    const classExists = await prisma.class.findUnique({
      where: { id: attendanceData.classId },
    })

    if (!classExists) {
      return errorResponse("Turma não encontrada", 404)
    }

    // Verificar se já existe um registro para este estudante, turma e data
    const existingRecord = await prisma.attendanceRecord.findFirst({
      where: {
        studentId: attendanceData.studentId,
        classId: attendanceData.classId,
        date: {
          gte: new Date(attendanceData.date.setHours(0, 0, 0, 0)),
          lt: new Date(attendanceData.date.setHours(23, 59, 59, 999)),
        },
      },
    })

    if (existingRecord) {
      return errorResponse("Já existe um registro de presença para este estudante, turma e data", 409)
    }

    // Criar o registro de presença
    const attendanceRecord = await prisma.attendanceRecord.create({
      data: attendanceData,
    })

    return successResponse(attendanceRecord, 201)
  } catch (error) {
    console.error("Erro ao criar registro de presença:", error)
    return errorResponse("Erro ao criar registro de presença", 500)
  }
}
