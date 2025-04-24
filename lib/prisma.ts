import { PrismaClient } from "@prisma/client"

// PrismaClient é anexado ao objeto global em desenvolvimento para evitar
// múltiplas instâncias do Prisma Client em desenvolvimento
declare global {
  var prisma: PrismaClient | undefined
}

// Verificar se estamos no lado do servidor
const isServer = typeof window === "undefined"

// Criar o cliente Prisma apenas no lado do servidor
const prismaClient = isServer ? global.prisma || new PrismaClient() : (null as unknown as PrismaClient)

// Salvar o cliente no objeto global em desenvolvimento
if (isServer && process.env.NODE_ENV !== "production") {
  global.prisma = prismaClient
}

export default prismaClient
