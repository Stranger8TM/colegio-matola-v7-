import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { BookSchema } from "@/lib/api-schemas"

// GET /api/v1/library/books/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        loans: {
          where: { status: { in: ["active", "overdue"] } },
          select: {
            id: true,
            loanDate: true,
            dueDate: true,
            status: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!book) {
      return errorResponse("Livro não encontrado", 404)
    }

    return successResponse(book)
  } catch (error) {
    console.error("Erro ao buscar livro:", error)
    return errorResponse("Erro ao buscar livro", 500)
  }
}

// PUT /api/v1/library/books/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verificar se o livro existe
    const existingBook = await prisma.book.findUnique({
      where: { id },
    })

    if (!existingBook) {
      return errorResponse("Livro não encontrado", 404)
    }

    const validation = await validateRequest(req, BookSchema.partial())

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const bookData = validation.data

    // Verificar se está tentando atualizar o ISBN para um que já existe
    if (bookData.isbn && bookData.isbn !== existingBook.isbn) {
      const bookWithSameISBN = await prisma.book.findFirst({
        where: { isbn: bookData.isbn },
      })

      if (bookWithSameISBN) {
        return errorResponse("Já existe um livro cadastrado com este ISBN", 409)
      }
    }

    // Atualizar o livro
    const book = await prisma.book.update({
      where: { id },
      data: bookData,
    })

    return successResponse(book)
  } catch (error) {
    console.error("Erro ao atualizar livro:", error)
    return errorResponse("Erro ao atualizar livro", 500)
  }
}

// DELETE /api/v1/library/books/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verificar se o livro existe
    const existingBook = await prisma.book.findUnique({
      where: { id },
      include: {
        loans: {
          where: { status: { in: ["active", "overdue"] } },
        },
      },
    })

    if (!existingBook) {
      return errorResponse("Livro não encontrado", 404)
    }

    // Verificar se há empréstimos ativos
    if (existingBook.loans.length > 0) {
      return errorResponse("Não é possível excluir um livro com empréstimos ativos", 400)
    }

    // Excluir o livro
    await prisma.book.delete({
      where: { id },
    })

    return successResponse({ message: "Livro excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir livro:", error)
    return errorResponse("Erro ao excluir livro", 500)
  }
}
