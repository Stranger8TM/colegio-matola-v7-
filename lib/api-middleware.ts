import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { apiConfig } from "./api-config"

interface TokenPayload {
  id: number
  name: string
  email: string
  role: string
  iat: number
  exp: number
}

export async function validateToken(request: NextRequest) {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { valid: false, error: "Authorization token is required" }
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
      return { valid: false, error: "Invalid token format" }
    }

    // Verificar o token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || apiConfig.jwt.secret) as TokenPayload

      // Verificar se o token expirou
      const currentTime = Math.floor(Date.now() / 1000)
      if (decoded.exp < currentTime) {
        return { valid: false, error: "Token expired" }
      }

      // Token válido, retornar informações do usuário
      return {
        valid: true,
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        },
      }
    } catch (error) {
      return { valid: false, error: "Invalid token" }
    }
  } catch (error) {
    console.error("Error validating token:", error)
    return { valid: false, error: "Error validating token" }
  }
}

export function checkRole(allowedRoles: string[]) {
  return async (request: NextRequest) => {
    const tokenValidation = await validateToken(request)
    if (!tokenValidation.valid) {
      return { valid: false, error: tokenValidation.error }
    }

    const userRole = tokenValidation.user?.role
    if (!userRole || !allowedRoles.includes(userRole)) {
      return { valid: false, error: "Insufficient permissions" }
    }

    return { valid: true, user: tokenValidation.user }
  }
}

export function rateLimiter() {
  // Implementação simples de rate limiting
  // Em produção, use uma solução mais robusta como Redis
  const requests: Record<string, { count: number; timestamp: number }> = {}

  return (request: NextRequest) => {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const now = Date.now()
    const windowMs = apiConfig.rateLimit.windowMs

    // Limpar entradas antigas
    for (const key in requests) {
      if (now - requests[key].timestamp > windowMs) {
        delete requests[key]
      }
    }

    // Verificar e atualizar contagem
    if (!requests[ip]) {
      requests[ip] = { count: 1, timestamp: now }
      return { limited: false }
    }

    if (requests[ip].count >= apiConfig.rateLimit.max) {
      return {
        limited: true,
        error: "Too many requests, please try again later",
        resetTime: requests[ip].timestamp + windowMs,
      }
    }

    requests[ip].count++
    return { limited: false }
  }
}
