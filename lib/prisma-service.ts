import { PrismaClient } from "@prisma/client"

class PrismaService {
  private static instance: PrismaClient | null = null
  private static isInitialized = false
  private static initializationError: Error | null = null

  static getInstance(): PrismaClient | null {
    // Se já tentamos inicializar e falhou, não tente novamente
    if (PrismaService.isInitialized && PrismaService.initializationError) {
      console.warn("Prisma Client initialization previously failed:", PrismaService.initializationError.message)
      return null
    }

    try {
      if (!PrismaService.instance) {
        PrismaService.isInitialized = true

        // Verificar se estamos em ambiente de produção ou desenvolvimento
        if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
          PrismaService.instance = new PrismaClient({
            log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
          })
          console.log("Prisma Client initialized successfully")
        } else {
          console.warn("DATABASE_URL not found, using mock mode")
        }
      }
      return PrismaService.instance
    } catch (error) {
      PrismaService.initializationError = error instanceof Error ? error : new Error(String(error))
      console.error("Error initializing Prisma Client:", PrismaService.initializationError)
      return null
    }
  }

  static async disconnect() {
    if (PrismaService.instance) {
      try {
        await PrismaService.instance.$disconnect()
        PrismaService.instance = null
        PrismaService.isInitialized = false
        PrismaService.initializationError = null
        console.log("Prisma Client disconnected successfully")
      } catch (error) {
        console.error("Error disconnecting Prisma Client:", error)
      }
    }
  }

  static resetInitializationState() {
    PrismaService.isInitialized = false
    PrismaService.initializationError = null
  }
}

export default PrismaService
