import prisma from "./prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

export interface AuthResponse {
  success: boolean
  user?: AuthUser
  token?: string
  message?: string
}

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key"
  private static readonly JWT_EXPIRES_IN = "7d"

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { email, password } = credentials

      // Buscar usuário no banco de dados (mock)
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return {
          success: false,
          message: "Credenciais inválidas",
        }
      }

      // Verificar senha (para dados mock, comparação direta)
      const isValidPassword =
        password === user.password || (await bcrypt.compare(password, user.password).catch(() => false))

      if (!isValidPassword) {
        return {
          success: false,
          message: "Credenciais inválidas",
        }
      }

      // Gerar token JWT
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        this.JWT_SECRET,
        { expiresIn: this.JWT_EXPIRES_IN },
      )

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      }
    } catch (error) {
      console.error("Erro no login:", error)
      return {
        success: false,
        message: "Erro interno do servidor",
      }
    }
  }

  static async verifyToken(token: string): Promise<AuthUser | null> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    } catch (error) {
      console.error("Erro na verificação do token:", error)
      return null
    }
  }

  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 12)
    } catch (error) {
      console.error("Erro ao hash da senha:", error)
      return password // Fallback para desenvolvimento
    }
  }
}
