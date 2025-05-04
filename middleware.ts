import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Este middleware não faz nada específico, mas garante que
  // o Next.js entenda que estamos usando funcionalidades do servidor
  return NextResponse.next()
}

// Configurar para executar apenas em rotas específicas que usam o Prisma
export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/professores/dashboard/:path*", "/portal/dashboard/:path*"],
}
