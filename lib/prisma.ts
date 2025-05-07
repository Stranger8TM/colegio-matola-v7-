import { PrismaClient } from "@prisma/client"

// Evitar múltiplas instâncias do Prisma Client em desenvolvimento
declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient | undefined

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma as PrismaClient
}

export default prisma
