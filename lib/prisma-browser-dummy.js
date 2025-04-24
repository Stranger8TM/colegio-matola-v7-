// Este arquivo é um substituto vazio para o Prisma Client no navegador
// Isso evita erros de compilação quando o Next.js tenta importar o Prisma Client no lado do cliente

module.exports = {
  PrismaClient: () => ({
    $connect: () => Promise.resolve(),
    $disconnect: () => Promise.resolve(),
  }),
}
