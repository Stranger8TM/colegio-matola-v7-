/**
 * Este arquivo é um substituto para o Prisma Client no navegador
 * Desenvolvido por Gabriel Vieira
 */

// Criar um objeto vazio que simula a API do Prisma Client
const dummyPrismaClient = {
  $connect: () => Promise.resolve(),
  $disconnect: () => Promise.resolve(),
  $on: () => {},
  $transaction: (cb) => Promise.resolve([]),
  $use: () => {},
  $extends: () => dummyPrismaClient,
  // Adicione outros métodos conforme necessário
}

// Criar um proxy para lidar com qualquer acesso a propriedades
const handler = {
  get: (target, prop) => {
    // Se a propriedade já existe no objeto, retorne-a
    if (prop in target) return target[prop]

    // Caso contrário, retorne um objeto vazio que também é um proxy
    return new Proxy({}, handler)
  },
}

// Criar o proxy final
const prismaClientProxy = new Proxy(dummyPrismaClient, handler)

// Exportar o PrismaClient como uma função que retorna o proxy
const PrismaClient = () => prismaClientProxy

// Exportar o módulo
module.exports = {
  PrismaClient,
  Prisma: {
    // Adicione propriedades do Prisma namespace conforme necessário
  },
  // Exportar o cliente diretamente para importações nomeadas
  prisma: prismaClientProxy,
}
