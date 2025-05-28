import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { AcademicTermSchema } from "@/lib/api-schemas"

// GET /api/v1/calendar/terms
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const type = searchParams.get("type")

    const academicYear = searchParams.get("academicYear")
    const status = searchParams.get("status")

    // Construir o filtro
    const filter: any = {}

    if (type) {
      filter.type = type
    }

    if (academicYear) {
      filter.academicYear = academicYear
    }

    if (status) {
      filter.status = status
    }

    // Buscar períodos acadêmicos com paginação
    const terms = await prisma.academicTerm.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: [{ academicYear: "desc" }, { startDate: "asc" }],
    })

    // Contar total de períodos para paginação
    const total = await prisma.academicTerm.count({ where: filter })

    return successResponse({
      data: terms,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar períodos acadêmicos:", error)
    return errorResponse("Erro ao buscar períodos acadêmicos", 500)
  }
}

// POST /api/v1/calendar/terms
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, AcademicTermSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const termData = validation.data

    // Verificar se já existe um período com o mesmo nome no mesmo ano acadêmico
    const existingTerm = await prisma.academicTerm.findFirst({
      where: {
        name: termData.name,
        academicYear: termData.academicYear,
      },
    })

    if (existingTerm) {
      return errorResponse("Já existe um período com este nome no mesmo ano acadêmico", 409)
    }

    // Criar o período acadêmico
    const term = await prisma.academicTerm.create({
      data: termData,
    })

    return successResponse(term, 201)
  } catch (error) {
    console.error("Erro ao criar período acadêmico:", error)
    return errorResponse("Erro ao criar período acadêmico", 500)
  }
}
