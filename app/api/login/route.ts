import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    // Verificar se o usuário existe
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || !user.hashedPassword) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    // Em produção, você deve usar bcrypt.compare
    const passwordMatch = password === user.hashedPassword

    if (!passwordMatch) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    // Não retorne a senha no objeto de resposta
    const { hashedPassword, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("LOGIN_ERROR", error)
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 })
  }
}
