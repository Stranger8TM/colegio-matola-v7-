/**
 * Configuração do Prisma Client
 * Desenvolvido por Gabriel Vieira
 */

import { PrismaClient } from "@prisma/client"

// Definir o tipo global para o Prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Criar ou reutilizar a instância do Prisma
export const prisma = globalForPrisma.prisma || new PrismaClient()

// Em desenvolvimento, salvar a instância no objeto global
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Exportação padrão para compatibilidade com código existente
export default prisma
