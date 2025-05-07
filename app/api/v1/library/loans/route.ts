import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { BookLoanSchema } from "@/lib/api-schemas"

// GET /api/v1/library/loans
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    // Construir o filtro
    const filter: any = {}

    if (status) {
      filter.status = status
    }

    if (userId) {
      filter.userId = userId
    }

    // Buscar empréstimos com paginação
    const loans = await prisma.bookLoan.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { loanDate: "desc" },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            isbn: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    })

    // Contar total de empréstimos para paginação
    const total = await prisma.bookLoan.count({ where: filter })

    return successResponse({
      data: loans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar empréstimos:", error)
    return errorResponse("Erro ao buscar empréstimos", 500)
  }
}

// POST /api/v1/library/loans
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, BookLoanSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const loanData = validation.data

    // Verificar se o livro existe e está disponível
    const book = await prisma.book.findUnique({
      where: { id: loanData.bookId },
    })

    if (!book) {
      return errorResponse("Livro não encontrado", 404)
    }

    if (book.quantity <= 0) {
      return errorResponse("Livro não disponível para empréstimo", 400)
    }

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: loanData.userId },
    })

    if (!user) {
      return errorResponse("Usuário não encontrado", 404)
    }

    // Verificar se o usuário já tem empréstimos ativos do mesmo livro
    const existingLoan = await prisma.bookLoan.findFirst({
      where: {
        bookId: loanData.bookId,
        userId: loanData.userId,
        status: { in: ["active", "overdue"] },
      },
    })

    if (existingLoan) {
      return errorResponse("Usuário já possui um empréstimo ativo deste livro", 400)
    }

    // Criar o empréstimo e atualizar a quantidade disponível do livro
    const loan = await prisma.$transaction(async (tx) => {
      // Criar o empréstimo
      const newLoan = await tx.bookLoan.create({
        data: loanData,
      })

      // Atualizar a quantidade disponível do livro
      await tx.book.update({
        where: { id: loanData.bookId },
        data: { quantity: { decrement: 1 } },
      })

      return newLoan
    })

    return successResponse(loan, 201)
  } catch (error) {
    console.error("Erro ao criar empréstimo:", error)
    return errorResponse("Erro ao criar empréstimo", 500)
  }
}
