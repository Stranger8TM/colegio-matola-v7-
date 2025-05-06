import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, RecordedLesson } from "@/types/api"
import prisma from "@/lib/prisma"
import { withAuth } from "@/lib/api-middleware"

// GET /api/v1/recorded-lessons - Listar todas as aulas gravadas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "uploadDate"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Parâmetros de filtro
    const search = searchParams.get("search") || ""
    const subject = searchParams.get("subject") || ""
    const classTarget = searchParams.get("class") || ""
    const teacherId = searchParams.get("teacherId") || ""

    // Construir a consulta
    const skip = (page - 1) * limit
    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (subject) {
      where.subject = subject
    }

    if (classTarget) {
      where.classTarget = classTarget
    }

    if (teacherId) {
      where.teacherId = teacherId
    }

    // Executar a consulta
    const [lessons, total] = await Promise.all([
      prisma.recordedLesson.findMany({
        where,
        include: {
          teacher: {
            select: {
              name: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.recordedLesson.count({ where }),
    ])

    // Formatar os dados
    const formattedLessons = lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      subject: lesson.subject,
      videoUrl: lesson.videoUrl,
      thumbnailUrl: lesson.thumbnailUrl,
      duration: lesson.duration,
      classTarget: lesson.classTarget,
      teacherId: lesson.teacherId,
      teacherName: lesson.teacher.name,
      uploadDate: lesson.uploadDate,
      views: lesson.views,
    }))

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    const response: ApiResponse<{
      lessons: RecordedLesson[]
      pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
      }
    }> = {
      success: true,
      data: {
        lessons: formattedLessons as RecordedLesson[],
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching recorded lessons:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao buscar aulas gravadas",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/v1/recorded-lessons - Criar uma nova aula gravada (apenas professores e admin)
export async function POST(request: NextRequest) {
  return withAuth(request, async (req, decodedToken) => {
    try {
      // Verificar se o usuário é professor ou admin
      if (decodedToken.role !== "teacher" && decodedToken.role !== "admin" && decodedToken.role !== "superadmin") {
        const response: ApiResponse<null> = {
          success: false,
          error: "Acesso negado",
          message: "Apenas professores e administradores podem adicionar aulas gravadas",
        }

        return NextResponse.json(response, { status: 403 })
      }

      const body = await req.json()

      // Validar dados obrigatórios
      if (!body.title || !body.subject || !body.videoUrl || !body.classTarget || !body.duration) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Dados inválidos",
          message: "Título, disciplina, URL do vídeo, classe alvo e duração são obrigatórios",
        }

        return NextResponse.json(response, { status: 400 })
      }

      // Definir o ID do professor (se for admin, usar o teacherId fornecido)
      const teacherId = decodedToken.role === "teacher" ? decodedToken.id : body.teacherId

      // Se for admin e não forneceu teacherId
      if (decodedToken.role !== "teacher" && !teacherId) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Dados inválidos",
          message: "ID do professor é obrigatório",
        }

        return NextResponse.json(response, { status: 400 })
      }

      // Verificar se o professor existe
      if (decodedToken.role !== "teacher") {
        const teacher = await prisma.user.findUnique({
          where: {
            id: teacherId,
            role: "teacher",
          },
        })

        if (!teacher) {
          const response: ApiResponse<null> = {
            success: false,
            error: "Professor não encontrado",
            message: "O professor especificado não foi encontrado",
          }

          return NextResponse.json(response, { status: 404 })
        }
      }

      // Criar a aula gravada
      const lesson = await prisma.recordedLesson.create({
        data: {
          title: body.title,
          description: body.description || "",
          subject: body.subject,
          videoUrl: body.videoUrl,
          thumbnailUrl: body.thumbnailUrl || "",
          duration: body.duration,
          classTarget: body.classTarget,
          teacherId: teacherId,
          uploadDate: new Date(),
          views: 0,
        },
        include: {
          teacher: {
            select: {
              name: true,
            },
          },
        },
      })

      // Formatar a resposta
      const formattedLesson = {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        subject: lesson.subject,
        videoUrl: lesson.videoUrl,
        thumbnailUrl: lesson.thumbnailUrl,
        duration: lesson.duration,
        classTarget: lesson.classTarget,
        teacherId: lesson.teacherId,
        teacherName: lesson.teacher.name,
        uploadDate: lesson.uploadDate,
        views: lesson.views,
      }

      const response: ApiResponse<RecordedLesson> = {
        success: true,
        data: formattedLesson as RecordedLesson,
        message: "Aula gravada criada com sucesso",
      }

      return NextResponse.json(response, { status: 201 })
    } catch (error) {
      console.error("Error creating recorded lesson:", error)

      const response: ApiResponse<null> = {
        success: false,
        error: "Falha ao criar aula gravada",
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      }

      return NextResponse.json(response, { status: 500 })
    }
  })
}
