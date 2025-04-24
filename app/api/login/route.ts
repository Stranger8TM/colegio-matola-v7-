import { NextResponse } from "next/server"
import { createHash } from "crypto"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Buscar o usuário pelo email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || !user.hashedPassword) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    // Verificar a senha
    const hashedInputPassword = createHash("sha256").update(password).digest("hex")
    const isPasswordValid = hashedInputPassword === user.hashedPassword

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    // Retornar os dados do usuário (sem a senha)
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      adminType: user.adminType,
    })
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
