import { PrismaClient } from "@prisma/client"

class PrismaService {
  private static instance: PrismaClient | null = null

  static getInstance(): PrismaClient | null {
    try {
      if (!PrismaService.instance) {
        // Verificar se estamos em ambiente de produção ou desenvolvimento
        if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
          PrismaService.instance = new PrismaClient({
            log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
          })
        }
      }
      return PrismaService.instance
    } catch (error) {
      console.error("Erro ao inicializar Prisma Client:", error)
      return null
    }
  }

  static async disconnect() {
    if (PrismaService.instance) {
      await PrismaService.instance.$disconnect()
      PrismaService.instance = null
    }
  }
}

export default PrismaService
