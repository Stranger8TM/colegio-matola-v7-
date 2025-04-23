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

    // Buscar tarefas do aluno
    const tasks = await db.task.findMany({
      where: {
        userId: session.user.id as string,
      },
      orderBy: {
        dueDate: "asc",
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, dueDate } = body

    // Criar nova tarefa
    const task = await db.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        userId: session.user.id as string,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar tarefa:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
