import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { TransportRouteSchema } from "@/lib/api-schemas"

// GET /api/v1/transportation/routes
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const status = searchParams.get("status")
    const vehicleId = searchParams.get("vehicleId")
    const driverId = searchParams.get("driverId")

    // Construir o filtro
    const filter: any = {}

    if (status) {
      filter.status = status
    }

    if (vehicleId) {
      filter.vehicleId = vehicleId
    }

    if (driverId) {
      filter.driverId = driverId
    }

    // Buscar rotas com paginação
    const routes = await prisma.transportRoute.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { name: "asc" },
      include: {
        vehicle: {
          select: {
            id: true,
            name: true,
            licensePlate: true,
            capacity: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
          },
        },
        stops: {
          orderBy: { order: "asc" },
        },
        studentRoutes: {
          where: { status: "active" },
          include: {
            student: {
              select: {
                id: true,
                name: true,
                class: true,
              },
            },
            stop: true,
          },
        },
      },
    })

    // Contar total de rotas para paginação
    const total = await prisma.transportRoute.count({ where: filter })

    // Adicionar contagem de estudantes a cada rota
    const routesWithCounts = routes.map((route) => ({
      ...route,
      studentCount: route.studentRoutes.length,
    }))

    return successResponse({
      data: routesWithCounts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar rotas de transporte:", error)
    return errorResponse("Erro ao buscar rotas de transporte", 500)
  }
}

// POST /api/v1/transportation/routes
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, TransportRouteSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const routeData = validation.data

    // Verificar se o veículo existe
    const vehicle = await prisma.transportVehicle.findUnique({
      where: { id: routeData.vehicleId },
    })

    if (!vehicle) {
      return errorResponse("Veículo não encontrado", 404)
    }

    // Verificar se o motorista existe
    const driver = await prisma.user.findUnique({
      where: { id: routeData.driverId },
    })

    if (!driver) {
      return errorResponse("Motorista não encontrado", 404)
    }

    // Criar a rota
    const route = await prisma.transportRoute.create({
      data: routeData,
    })

    return successResponse(route, 201)
  } catch (error) {
    console.error("Erro ao criar rota de transporte:", error)
    return errorResponse("Erro ao criar rota de transporte", 500)
  }
}
