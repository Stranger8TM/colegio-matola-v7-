import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, Grade } from "@/types/api"
import prisma from "@/lib/prisma"

// GET /api/v1/students/:id/grades - Obter as notas de um aluno
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { searchParams } = new URL(request.url)

    // Parâmetros de filtro
    const term = searchParams.get("term") || ""
    const subject = searchParams.get("subject") || ""

    // Verificar se o aluno existe
    const student = await prisma.user.findUnique({
      where: {
        id,
        role: "student",
      },
    })

    if (!student) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Aluno não encontrado",
        message: "O aluno solicitado não foi encontrado",
      }

      return NextResponse.json(response, { status: 404 })
    }

    // Construir a consulta
    const where: any = {
      studentId: id,
    }

    if (term) {
      where.term = term
    }

    if (subject) {
      where.subject = subject
    }

    // Buscar as notas
    const grades = await prisma.grade.findMany({
      where,
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ term: "asc" }, { subject: "asc" }],
    })

    // Formatar os dados
    const formattedGrades = grades.map((grade) => ({
      id: grade.id,
      studentId: grade.studentId,
      teacherId: grade.teacherId,
      teacherName: grade.teacher.name,
      subject: grade.subject,
      value: grade.value,
      term: grade.term,
      comments: grade.comments,
      date: grade.date,
    }))

    const response: ApiResponse<Grade[]> = {
      success: true,
      data: formattedGrades as Grade[],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching student grades:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao buscar notas",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
