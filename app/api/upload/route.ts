/**
 * API para upload de arquivos
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { uploadAndSaveFile } from "@/lib/file-service"

export async function POST(req: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter o formulário
    const formData = await req.formData()
    const file = formData.get("file") as File
    const category = formData.get("category") as string
    const description = formData.get("description") as string

    // Validar o arquivo
    if (!file) {
      return NextResponse.json({ error: "Arquivo não fornecido" }, { status: 400 })
    }

    // Fazer upload do arquivo
    const result = await uploadAndSaveFile(file, session.user.id, category, description)

    // Retornar o resultado
    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro na API de upload:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
