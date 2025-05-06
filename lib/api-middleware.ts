import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import type { ApiResponse } from "@/types/api"

// Middleware para verificar autenticação
export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, decodedToken: any) => Promise<NextResponse>,
) {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Não autorizado",
        message: "Token de autenticação não fornecido",
      }

      return NextResponse.json(response, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Verificar o token
    const decoded = verify(token, process.env.JWT_SECRET || "secret")

    // Chamar o handler com o token decodificado
    return handler(request, decoded)
  } catch (error) {
    console.error("Authentication error:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Não autorizado",
      message: "Token de autenticação inválido ou expirado",
    }

    return NextResponse.json(response, { status: 401 })
  }
}

// Middleware para verificar permissões de administrador
export async function withAdminAuth(
  request: NextRequest,
  handler: (req: NextRequest, decodedToken: any) => Promise<NextResponse>,
) {
  return withAuth(request, async (req, decoded) => {
    // Verificar se o usuário é um administrador
    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      const response: ApiResponse<null> = {
        success: false,
        error: "Acesso negado",
        message: "Você não tem permissão para acessar este recurso",
      }

      return NextResponse.json(response, { status: 403 })
    }

    // Chamar o handler com o token decodificado
    return handler(req, decoded)
  })
}
