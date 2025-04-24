import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { Role } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password, role, class: userClass, grade, subject } = body

    // Verificar se o usuário já existe
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email já está em uso" }, { status: 400 })
    }

    // Em produção, você deve usar bcrypt para hash da senha
    const hashedPassword = password // Simplificado para demonstração

    // Criar o usuário
    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: role as Role,
        class: userClass,
        grade,
        subject,
      },
    })

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    console.error("REGISTRATION_ERROR", error)
    return NextResponse.json({ error: "Erro ao registrar usuário" }, { status: 500 })
  }
}
