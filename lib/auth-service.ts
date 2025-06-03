import { compare } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import PrismaService from "./prisma-service"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  profileImage?: string
  class?: string
  grade?: string
  subject?: string
}

export interface LoginResult {
  success: boolean
  user?: AuthUser
  token?: string
  error?: string
  message?: string
  isMock?: boolean
}

export class AuthService {
  static async login(username: string, password: string): Promise<LoginResult> {
    try {
      // Validar dados obrigatórios
      if (!username || !password) {
        return {
          success: false,
          error: "Dados inválidos",
          message: "Nome de usuário e senha são obrigatórios",
        }
      }

      let user = null
      let isMock = false

      // Tentar obter o prisma client
      const prisma = PrismaService.getInstance()

      // Se o prisma estiver disponível, buscar o usuário no banco
      if (prisma) {
        try {
          user = await prisma.user.findUnique({
            where: { username },
          })
        } catch (dbError) {
          console.error("Erro ao buscar usuário no banco:", dbError)
          // Fallback para dados mock em caso de erro
          user = this.getMockUser(username)
          isMock = true
        }
      } else {
        // Se o prisma não estiver disponível, usar dados mock
        user = this.getMockUser(username)
        isMock = true
      }

      if (!user) {
        return {
          success: false,
          error: "Credenciais inválidas",
          message: "Nome de usuário ou senha incorretos",
        }
      }

      // Verificar a senha
      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        return {
          success: false,
          error: "Credenciais inválidas",
          message: "Nome de usuário ou senha incorretos",
        }
      }

      // Verificar se o usuário está ativo
      if (user.status === "inactive") {
        return {
          success: false,
          error: "Conta inativa",
          message: "Sua conta está inativa. Entre em contato com a administração.",
        }
      }

      // Gerar token JWT
      const token = sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1d" },
      )

      // Dados do usuário para retornar
      const userData: AuthUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      }

      // Se for aluno, adicionar dados específicos
      if (user.role === "student") {
        userData.class = user.class
        userData.grade = user.grade
      }

      // Se for professor, adicionar dados específicos
      if (user.role === "teacher" && !isMock && prisma) {
        try {
          const teacher = await prisma.teacher.findUnique({
            where: { id: user.id },
          })

          if (teacher) {
            userData.subject = teacher.subject
          }
        } catch (error) {
          console.error("Erro ao buscar dados do professor:", error)
          // Continuar sem os dados adicionais
        }
      } else if (user.role === "teacher" && isMock) {
        userData.subject = "Matemática"
      }

      return {
        success: true,
        user: userData,
        token,
        message: "Login realizado com sucesso",
        ...(isMock && { isMock: true }),
      }
    } catch (error) {
      console.error("Error during login:", error)
      return {
        success: false,
        error: "Falha na autenticação",
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      }
    }
  }

  static verifyToken(token: string): AuthUser | null {
    try {
      const decoded = verify(token, process.env.JWT_SECRET || "secret")
      return decoded as AuthUser
    } catch (error) {
      return null
    }
  }

  private static getMockUser(username: string) {
    if (username === "admin") {
      return {
        id: "mock-admin-id",
        name: "Admin User",
        email: "admin@colegiomatola.com",
        username: "admin",
        password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "admin123"
        profileImage: "/avatar-1.jpg",
        role: "admin",
        status: "active",
      }
    } else if (username === "teacher") {
      return {
        id: "mock-teacher-id",
        name: "Teacher User",
        email: "teacher@colegiomatola.com",
        username: "teacher",
        password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "teacher123"
        profileImage: "/teacher-gabriel.jpg",
        role: "teacher",
        status: "active",
      }
    } else if (username === "student") {
      return {
        id: "mock-student-id",
        name: "Student User",
        email: "student@colegiomatola.com",
        username: "student",
        password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // hash para "student123"
        profileImage: "/avatar-2.jpg",
        role: "student",
        status: "active",
        class: "10A",
        grade: "10",
      }
    }

    return null
  }
}
