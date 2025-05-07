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
      filter.attendanceRecord = {
        classId,
      }
    }

    if (studentId) {
      filter.studentId = studentId
    }

    if (date) {
      const dateObj = new Date(date)
      filter.attendanceRecord = {
        ...filter.attendanceRecord,
        date: {
          gte: new Date(dateObj.setHours(0, 0, 0, 0)),
          lt: new Date(dateObj.setHours(23, 59, 59, 999)),
        },
      }
    }

    if (status) {
      filter.status = status
    }

    // Buscar registros de presença com paginação
    const attendance = await prisma.attendance.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: [
        {
          attendanceRecord: {
            date: "desc",
          },
        },
        { studentId: "asc" },
      ],
      include: {
        student: {
          select: {
            id: true,
            name: true,
            class: true,
            grade: true,
          },
        },
        attendanceRecord: {
          include: {
            class: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    // Contar total de registros para paginação
    const total = await prisma.attendance.count({ where: filter })

    return successResponse({
      data: attendance,
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

    // Criar ou encontrar o registro de presença para a data e turma
    const attendanceRecord = await prisma.attendanceRecord.upsert({
      where: {
        classId_date: {
          classId: attendanceData.classId,
          date: new Date(attendanceData.date),
        },
      },
      update: {},
      create: {
        classId: attendanceData.classId,
        date: new Date(attendanceData.date),
        teacherId: attendanceData.teacherId,
      },
    })

    // Verificar se já existe um registro para este estudante neste registro de presença
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        attendanceRecordId: attendanceRecord.id,
        studentId: attendanceData.studentId,
      },
    })

    if (existingAttendance) {
      return errorResponse("Já existe um registro de presença para este estudante nesta data e turma", 409)
    }

    // Criar o registro de presença individual
    const attendance = await prisma.attendance.create({
      data: {
        studentId: attendanceData.studentId,
        attendanceRecordId: attendanceRecord.id,
        status: attendanceData.status,
        justification: attendanceData.justification,
      },
    })

    return successResponse(attendance, 201)
  } catch (error) {
    console.error("Erro ao criar registro de presença:", error)
    return errorResponse("Erro ao criar registro de presença", 500)
  }
}
