import { type NextRequest, NextResponse } from "next/server"
import type { z } from "zod"

export type ValidationResult<T> = {
  success: boolean
  data?: T
  error?: string
}

export async function validateRequest<T>(req: NextRequest, schema: z.ZodType<T>): Promise<ValidationResult<T>> {
  try {
    let body: any

    // Tenta analisar o corpo da requisição como JSON
    try {
      body = await req.json()
    } catch (e) {
      return {
        success: false,
        error: "Corpo da requisição inválido. JSON esperado.",
      }
    }

    // Valida o corpo da requisição contra o schema
    const result = schema.safeParse(body)

    if (!result.success) {
      const formattedErrors = result.error.format()
      return {
        success: false,
        error: `Dados inválidos: ${JSON.stringify(formattedErrors)}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Erro de validação:", error)
    return {
      success: false,
      error: "Erro ao processar a requisição",
    }
  }
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status },
  )
}

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  )
}
