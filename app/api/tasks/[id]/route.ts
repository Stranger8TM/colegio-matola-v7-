import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const taskId = params.id
    const body = await req.json()

    // Verificar se a tarefa pertence ao usuário
    const task = await db.task.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 })
    }

    if (task.userId !== session.user.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Atualizar a tarefa
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: body,
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const taskId = params.id

    // Verificar se a tarefa pertence ao usuário
    const task = await db.task.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 })
    }

    if (task.userId !== session.user.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Excluir a tarefa
    await db.task.delete({
      where: { id: taskId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
