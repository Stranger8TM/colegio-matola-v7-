/**
 * Configuração do Prisma Client
 * Desenvolvido por Gabriel Vieira
 */

import { PrismaClient } from "@prisma/client"

// Declarar o prisma global
declare global {
  var prisma: PrismaClient | undefined
}

// Verificar se estamos no lado do servidor
const isServer = typeof window === "undefined"

// Criar o cliente Prisma apenas no lado do servidor
const prismaInstance = isServer ? global.prisma || new PrismaClient() : (null as any as PrismaClient)

// Salvar o cliente no objeto global em desenvolvimento
if (isServer && process.env.NODE_ENV !== "production") {
  global.prisma = prismaInstance
}

// Exportar como exportação padrão e nomeada
export default prismaInstance
export const prisma = prismaInstance
