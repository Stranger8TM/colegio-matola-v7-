import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { db } from "@/lib/db"
import { z } from "zod"

const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["STUDENT", "TEACHER"]).default("STUDENT"),
  class: z.string().optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password, role, class: className, grade, subject } = userSchema.parse(body)

    // Verificar se o email já está em uso
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email já está em uso" }, { status: 400 })
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10)

    // Criar o usuário
    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role,
        class: className,
        grade,
        subject,
      },
    })

    // Remover a senha do objeto retornado
    const { hashedPassword: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Erro ao registrar usuário:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dados inválidos", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
