/**
 * API para excluir arquivos
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { deleteAndRemoveFile } from "@/lib/file-service"
import prisma from "@/lib/prisma"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter o arquivo
    const file = await prisma.file.findUnique({
      where: {
        id: params.id,
      },
    })

    // Verificar se o arquivo existe
    if (!file) {
      return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 })
    }

    // Verificar se o usuário tem permissão para excluir o arquivo
    if (file.uploadedBy !== session.user.email && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado a excluir este arquivo" }, { status: 403 })
    }

    // Excluir o arquivo
    await deleteAndRemoveFile(file.url)

    // Retornar sucesso
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro na API de exclusão de arquivo:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
