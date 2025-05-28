import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { validateRequest, errorResponse, successResponse } from "@/lib/api-validators"
import { BookSchema } from "@/lib/api-schemas"

// GET /api/v1/library/books
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parâmetros de paginação
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Parâmetros de filtro
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const available = searchParams.get("available") === "true"

    // Construir o filtro
    const filter: any = {}

    if (category) {
      filter.category = category
    }

    if (search) {
      filter.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { isbn: { contains: search, mode: "insensitive" } },
      ]
    }

    if (available) {
      filter.quantity = { gt: 0 }
    }

    // Buscar livros com paginação
    const books = await prisma.book.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { title: "asc" },
    })

    // Contar total de livros para paginação
    const total = await prisma.book.count({ where: filter })

    return successResponse({
      data: books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar livros:", error)
    return errorResponse("Erro ao buscar livros", 500)
  }
}

// POST /api/v1/library/books
export async function POST(req: NextRequest) {
  try {
    const validation = await validateRequest(req, BookSchema)

    if (!validation.success) {
      return errorResponse(validation.error || "Dados inválidos")
    }

    const bookData = validation.data

    // Verificar se já existe um livro com o mesmo ISBN
    if (bookData.isbn) {
      const existingBook = await prisma.book.findFirst({
        where: { isbn: bookData.isbn },
      })

      if (existingBook) {
        return errorResponse("Já existe um livro cadastrado com este ISBN", 409)
      }
    }

    // Criar o livro
    const book = await prisma.book.create({
      data: bookData,
    })

    return successResponse(book, 201)
  } catch (error) {
    console.error("Erro ao criar livro:", error)
    return errorResponse("Erro ao criar livro", 500)
  }
}
