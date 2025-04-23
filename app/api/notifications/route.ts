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

    // Buscar notificações para a classe do aluno ou para todas as classes
    const notifications = await db.notification.findMany({
      where: {
        OR: [
          { targetClass: user.class },
          { targetClass: null }, // Notificações para todas as classes
        ],
      },
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Erro ao buscar notificações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
