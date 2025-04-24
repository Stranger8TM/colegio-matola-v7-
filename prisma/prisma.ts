/**
 * Configuração do Prisma Client
 * Desenvolvido por Gabriel Vieira
 */

import { PrismaClient } from "@prisma/client"

// Declarar o prisma global
declare global {
  var prisma: PrismaClient | undefined
}

// Criar uma instância do PrismaClient
let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
