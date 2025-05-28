import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { BookLoanSchema } from "@/lib/api-schemas"

// GET /api/v1/library/loans/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const loan = await prisma.bookLoan.findUnique({
      where: { id },
      include: {
        book: true,
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

    if (!loan) {
      return errorResponse("Empréstimo não encontrado", 404)
    }

    return successResponse(loan)
  } catch (error) {
    console.error("Erro ao buscar empréstimo:", error)
    return errorResponse("Erro ao buscar empréstimo", 500)
  }
}

// PUT /api/v1/library/loans/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verificar se o empréstimo existe
    const existingLoan = await prisma.bookLoan.findUnique({
      where: { id },
      include: {
        book: true,
      },
    })

    if (!existingLoan) {
      return errorResponse("Empréstimo não encontrado", 404)
    }

    const validation = await validateRequest(req, BookLoanSchema.partial())

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const loanData = validation.data

    // Verificar se está tentando atualizar o status para "returned"
    const isReturning = loanData.status === "returned" && existingLoan.status !== "returned"

    // Atualizar o empréstimo e, se necessário, a quantidade disponível do livro
    const loan = await prisma.$transaction(async (tx) => {
      // Atualizar o empréstimo
      const updatedLoan = await tx.bookLoan.update({
        where: { id },
        data: {
          ...loanData,
          returnDate: isReturning ? new Date() : loanData.returnDate,
        },
      })

      // Se o livro está sendo devolvido, incrementar a quantidade disponível
      if (isReturning) {
        await tx.book.update({
          where: { id: existingLoan.bookId },
          data: { quantity: { increment: 1 } },
        })
      }

      return updatedLoan
    })

    return successResponse(loan)
  } catch (error) {
    console.error("Erro ao atualizar empréstimo:", error)
    return errorResponse("Erro ao atualizar empréstimo", 500)
  }
}

// DELETE /api/v1/library/loans/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verificar se o empréstimo existe
    const existingLoan = await prisma.bookLoan.findUnique({
      where: { id },
    })

    if (!existingLoan) {
      return errorResponse("Empréstimo não encontrado", 404)
    }

    // Verificar se o empréstimo está ativo
    if (existingLoan.status === "active" || existingLoan.status === "overdue") {
      return errorResponse("Não é possível excluir um empréstimo ativo", 400)
    }

    // Excluir o empréstimo
    await prisma.bookLoan.delete({
      where: { id },
    })

    return successResponse({ message: "Empréstimo excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir empréstimo:", error)
    return errorResponse("Erro ao excluir empréstimo", 500)
  }
}
