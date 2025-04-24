/**
 * API para upload de arquivos
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { put } from "@vercel/blob"
import { createFile } from "@/lib/db-service"

export async function POST(req: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
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

    // Fazer upload do arquivo para o Blob Storage
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    })

    // Salvar os metadados do arquivo no banco de dados
    const fileRecord = await createFile({
      url: blob.url,
      filename: blob.pathname,
      contentType: file.type,
      size: file.size,
      category: category || "uncategorized",
      description: description || "",
      type: file.type.split("/")[0] || "other",
      userEmail: session.user.email,
    })

    // Retornar o resultado
    return NextResponse.json(fileRecord)
  } catch (error) {
    console.error("Erro na API de upload:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
