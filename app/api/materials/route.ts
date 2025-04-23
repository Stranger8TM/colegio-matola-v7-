import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id as string },
    })

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Buscar materiais para a classe do aluno
    const materials = await db.material.findMany({
      where: {
        classTarget: user.class,
      },
      orderBy: {
        uploadDate: "desc",
      },
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(materials)
  } catch (error) {
    console.error("Erro ao buscar materiais:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
