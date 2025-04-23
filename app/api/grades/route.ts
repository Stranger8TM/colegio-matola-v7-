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

    // Buscar notas do aluno
    const grades = await db.grade.findMany({
      where: {
        studentId: session.user.id as string,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(grades)
  } catch (error) {
    console.error("Erro ao buscar notas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
