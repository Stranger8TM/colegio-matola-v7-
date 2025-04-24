/**
 * API para excluir arquivos
 * Desenvolvido por Gabriel Vieira
 */

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/prisma"
import { deleteFile } from "@/lib/db-service"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Obter o arquivo
    const file = await prisma.file.findUnique({
      where: { id: params.id },
      include: {
        uploadedBy: {
          select: {
            email: true,
          },
        },
      },
    })

    // Verificar se o arquivo existe
    if (!file) {
      return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 })
    }

    // Verificar se o usuário tem permissão para excluir o arquivo
    const isOwner = file.uploadedBy.email === session.user.email
    const isAdmin = session.user.role === "ADMIN"

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Não autorizado a excluir este arquivo" }, { status: 403 })
    }

    // Excluir o arquivo do Blob Storage
    await del(file.url)

    // Excluir o registro do arquivo do banco de dados
    await deleteFile(params.id)

    // Retornar sucesso
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro na API de exclusão de arquivo:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
