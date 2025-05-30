import { PrismaClient } from "@prisma/client"

// Função para criar uma instância segura do Prisma
function createPrismaClient(): PrismaClient | null {
  try {
    // Verificar se temos uma URL de banco de dados
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL não encontrada, usando modo mock")
      return null
    }

    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })
  } catch (error) {
    console.error("Erro ao criar Prisma Client:", error)
    return null
  }
}

// Singleton pattern para evitar múltiplas conexões
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | null | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export default prisma
