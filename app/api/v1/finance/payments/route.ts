import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { PaymentSchema } from "@/lib/api-schemas"

// GET /api/v1/finance/payments
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const studentId = searchParams.get("studentId")
    const invoiceId = searchParams.get("invoiceId")
    const status = searchParams.get("status")
    const paymentMethod = searchParams.get("paymentMethod")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    // Construir o filtro
    const filter: any = {}

    if (studentId) {
      filter.studentId = studentId
    }

    if (invoiceId) {
      filter.invoiceId = invoiceId
    }

    if (status) {
      filter.status = status
    }

    if (paymentMethod) {
      filter.paymentMethod = paymentMethod
    }

    // Filtro de intervalo de datas
    if (startDate || endDate) {
      filter.paymentDate = {}

      if (startDate) {
        filter.paymentDate.gte = new Date(startDate)
      }

      if (endDate) {
        filter.paymentDate.lte = new Date(endDate)
      }
    }

    // Buscar pagamentos com paginação
    const payments = await prisma.payment.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { paymentDate: "desc" },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            class: true,
            grade: true,
          },
        },
        invoice: {
          select: {
            id: true,
            description: true,
            amount: true,
            dueDate: true,
          },
        },
      },
    })

    // Contar total de pagamentos para paginação
    const total = await prisma.payment.count({ where: filter })

    return successResponse({
      data: payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error)
    return errorResponse("Erro ao buscar pagamentos", 500)
  }
}

// POST /api/v1/finance/payments
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, PaymentSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const paymentData = validation.data

    // Verificar se o estudante existe
    const student = await prisma.user.findUnique({
      where: {
        id: paymentData.studentId,
        role: "student",
      },
    })

    if (!student) {
      return errorResponse("Estudante não encontrado", 404)
    }

    // Verificar se a fatura existe, se especificada
    if (paymentData.invoiceId) {
      const invoice = await prisma.invoice.findUnique({
        where: { id: paymentData.invoiceId },
      })

      if (!invoice) {
        return errorResponse("Fatura não encontrada", 404)
      }

      // Verificar se a fatura pertence ao estudante
      if (invoice.studentId !== paymentData.studentId) {
        return errorResponse("Esta fatura não pertence ao estudante especificado", 400)
      }

      // Verificar se a fatura já foi paga
      if (invoice.status === "paid") {
        return errorResponse("Esta fatura já foi paga", 400)
      }
    }

    // Criar o pagamento e atualizar a fatura, se especificada
    const payment = await prisma.$transaction(async (tx) => {
      // Criar o pagamento
      const newPayment = await tx.payment.create({
        data: paymentData,
      })

      // Atualizar a fatura, se especificada e o pagamento for bem-sucedido
      if (paymentData.invoiceId && paymentData.status === "completed") {
        await tx.invoice.update({
          where: { id: paymentData.invoiceId },
          data: { status: "paid" },
        })
      }

      return newPayment
    })

    return successResponse(payment, 201)
  } catch (error) {
    console.error("Erro ao criar pagamento:", error)
    return errorResponse("Erro ao criar pagamento", 500)
  }
}
