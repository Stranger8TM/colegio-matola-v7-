import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

// Interface para o token decodificado
interface DecodedToken {
  id: string
  name: string
  email: string
  role: string
  iat: number
  exp: number
}

// Middleware para verificar autenticação
export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, decodedToken: DecodedToken) => Promise<NextResponse>,
) {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "Não autorizado",
          message: "Token de autenticação não fornecido",
        },
        { status: 401 },
      )
    }

    const token = authHeader.split(" ")[1]

    // Verificar o token
    const decodedToken = verify(token, process.env.JWT_SECRET || "secret") as DecodedToken

    // Chamar o handler com o token decodificado
    return handler(request, decodedToken)
  } catch (error) {
    console.error("Erro de autenticação:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Não autorizado",
        message: "Token de autenticação inválido ou expirado",
      },
      { status: 401 },
    )
  }
}

// Middleware para verificar se o usuário é admin
export async function withAdminAuth(
  request: NextRequest,
  handler: (req: NextRequest, decodedToken: DecodedToken) => Promise<NextResponse>,
) {
  return withAuth(request, async (req, decodedToken) => {
    // Verificar se o usuário é admin
    if (decodedToken.role !== "admin" && decodedToken.role !== "superadmin") {
      return NextResponse.json(
        {
          success: false,
          error: "Acesso negado",
          message: "Você não tem permissão para acessar este recurso",
        },
        { status: 403 },
      )
    }

    // Chamar o handler com o token decodificado
    return handler(req, decodedToken)
  })
}

// Middleware para verificar se o usuário é professor
export async function withTeacherAuth(
  request: NextRequest,
  handler: (req: NextRequest, decodedToken: DecodedToken) => Promise<NextResponse>,
) {
  return withAuth(request, async (req, decodedToken) => {
    // Verificar se o usuário é professor ou admin
    if (decodedToken.role !== "teacher" && decodedToken.role !== "admin" && decodedToken.role !== "superadmin") {
      return NextResponse.json(
        {
          success: false,
          error: "Acesso negado",
          message: "Você não tem permissão para acessar este recurso",
        },
        { status: 403 },
      )
    }

    // Chamar o handler com o token decodificado
    return handler(req, decodedToken)
  })
}
