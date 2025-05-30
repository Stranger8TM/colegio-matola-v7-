import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export function withSafePrisma<T extends any[]>(handler: (req: NextRequest, ...args: T) => Promise<NextResponse>) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Verificar se o Prisma está disponível
      if (!prisma) {
        console.warn("Prisma não disponível, usando dados mock")
        return NextResponse.json(
          {
            success: false,
            error: "Banco de dados não disponível",
            mock: true,
          },
          { status: 503 },
        )
      }

      return await handler(req, ...args)
    } catch (error) {
      console.error("Erro na API:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Erro interno do servidor",
        },
        { status: 500 },
      )
    }
  }
}

export function createMockResponse(data: any, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      mock: true,
      message: "Dados simulados - banco de dados não disponível",
    },
    { status },
  )
}
