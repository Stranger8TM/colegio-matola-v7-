import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, Material } from "@/types/api"
import prisma from "@/lib/prisma"
import { withAuth } from "@/lib/api-middleware"

// GET /api/v1/materials - Listar todos os materiais
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
    const [materials, total] = await Promise.all([
      prisma.material.findMany({
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
      prisma.material.count({ where }),
    ])

    // Formatar os dados
    const formattedMaterials = materials.map((material) => ({
      id: material.id,
      title: material.title,
      description: material.description,
      subject: material.subject,
      fileUrl: material.fileUrl,
      classTarget: material.classTarget,
      teacherId: material.teacherId,
      teacherName: material.teacher.name,
      uploadDate: material.uploadDate,
      downloads: material.downloads,
    }))

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    const response: ApiResponse<{
      materials: Material[]
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
        materials: formattedMaterials as Material[],
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
    console.error("Error fetching materials:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao buscar materiais",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/v1/materials - Criar um novo material (apenas professores e admin)
export async function POST(request: NextRequest) {
  return withAuth(request, async (req, decodedToken) => {
    try {
      // Verificar se o usuário é professor ou admin
      if (decodedToken.role !== "teacher" && decodedToken.role !== "admin" && decodedToken.role !== "superadmin") {
        const response: ApiResponse<null> = {
          success: false,
          error: "Acesso negado",
          message: "Apenas professores e administradores podem adicionar materiais",
        }

        return NextResponse.json(response, { status: 403 })
      }

      const body = await req.json()

      // Validar dados obrigatórios
      if (!body.title || !body.subject || !body.fileUrl || !body.classTarget) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Dados inválidos",
          message: "Título, disciplina, URL do arquivo e classe alvo são obrigatórios",
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

      // Criar o material
      const material = await prisma.material.create({
        data: {
          title: body.title,
          description: body.description || "",
          subject: body.subject,
          fileUrl: body.fileUrl,
          classTarget: body.classTarget,
          teacherId: teacherId,
          uploadDate: new Date(),
          downloads: 0,
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
      const formattedMaterial = {
        id: material.id,
        title: material.title,
        description: material.description,
        subject: material.subject,
        fileUrl: material.fileUrl,
        classTarget: material.classTarget,
        teacherId: material.teacherId,
        teacherName: material.teacher.name,
        uploadDate: material.uploadDate,
        downloads: material.downloads,
      }

      const response: ApiResponse<Material> = {
        success: true,
        data: formattedMaterial as Material,
        message: "Material criado com sucesso",
      }

      return NextResponse.json(response, { status: 201 })
    } catch (error) {
      console.error("Error creating material:", error)

      const response: ApiResponse<null> = {
        success: false,
        error: "Falha ao criar material",
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      }

      return NextResponse.json(response, { status: 500 })
    }
  })
}
