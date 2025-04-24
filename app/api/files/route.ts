/**
 * API para listar arquivos
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { listFilesFromDatabase } from "@/lib/file-service"

export async function GET(req: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter os parâmetros da consulta
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") || undefined
    const category = searchParams.get("category") || undefined
    const uploadedBy = searchParams.get("uploadedBy") || undefined

    // Listar os arquivos
    const files = await listFilesFromDatabase(type, category, uploadedBy)

    // Retornar os arquivos
    return NextResponse.json(files)
  } catch (error) {
    console.error("Erro na API de arquivos:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
