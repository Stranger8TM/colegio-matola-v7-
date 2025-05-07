import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { ExamSchema } from "@/lib/api-schemas"

// GET /api/v1/exams
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const classId = searchParams.get("classId")
    const teacherId = searchParams.get("teacherId")
    const subject = searchParams.get("subject")
    const status = searchParams.get("status")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    // Construir o filtro
    const filter: any = {}

    if (classId) {
      filter.classId = classId
    }

    if (teacherId) {
      filter.teacherId = teacherId
    }

    if (subject) {
      filter.subject = subject
    }

    if (status) {
      filter.status = status
    }

    // Filtro de intervalo de datas
    if (startDate || endDate) {
      filter.date = {}

      if (startDate) {
        filter.date.gte = new Date(startDate)
      }

      if (endDate) {
        filter.date.lte = new Date(endDate)
      }
    }

    // Buscar exames com paginação
    const exams = await prisma.exam.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { date: "asc" },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            subject: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            grade: true,
          },
        },
        results: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    })

    // Contar total de exames para paginação
    const total = await prisma.exam.count({ where: filter })

    // Adicionar estatísticas a cada exame
    const examsWithStats = exams.map((exam) => {
      const totalResults = exam.results.length
      const pendingResults = exam.results.filter((r) => r.status === "pending").length
      const gradedResults = exam.results.filter((r) => r.status === "graded").length

      return {
        ...exam,
        stats: {
          totalStudents: totalResults,
          pendingGrades: pendingResults,
          gradedCount: gradedResults,
        },
        results: undefined, // Remover a lista completa de resultados
      }
    })

    return successResponse({
      data: examsWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar exames:", error)
    return errorResponse("Erro ao buscar exames", 500)
  }
}

// POST /api/v1/exams
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, ExamSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const examData = validation.data

    // Verificar se o professor existe
    const teacher = await prisma.teacher.findUnique({
      where: { id: examData.teacherId },
    })

    if (!teacher) {
      return errorResponse("Professor não encontrado", 404)
    }

    // Verificar se a turma existe
    const classExists = await prisma.class.findUnique({
      where: { id: examData.classId },
    })

    if (!classExists) {
      return errorResponse("Turma não encontrada", 404)
    }

    // Criar o exame e inicializar resultados para todos os alunos da turma
    const exam = await prisma.$transaction(async (tx) => {
      // Criar o exame
      const newExam = await tx.exam.create({
        data: examData,
      })

      // Buscar todos os alunos da turma
      const students = await tx.user.findMany({
        where: {
          role: "student",
          class: classExists.name,
        },
      })

      // Criar resultados iniciais para cada aluno
      for (const student of students) {
        await tx.examResult.create({
          data: {
            examId: newExam.id,
            studentId: student.id,
            score: 0,
            status: "pending",
            gradedBy: examData.teacherId,
          },
        })
      }

      return newExam
    })

    return successResponse(exam, 201)
  } catch (error) {
    console.error("Erro ao criar exame:", error)
    return errorResponse("Erro ao criar exame", 500)
  }
}
