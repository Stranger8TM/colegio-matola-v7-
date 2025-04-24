// Este script é projetado para ser executado no console da Vercel
// Ele configura o banco de dados e cria os usuários iniciais

const { PrismaClient } = require("@prisma/client")
const crypto = require("crypto")

async function setup() {
  console.log("Iniciando configuração no ambiente Vercel...")

  // Criar cliente Prisma
  const prisma = new PrismaClient()

  try {
    // Verificar conexão com o banco de dados
    console.log("Verificando conexão com o banco de dados...")
    await prisma.$connect()
    console.log("Conexão estabelecida com sucesso!")

    // Função para hash de senha
    function hashPassword(password) {
      return crypto.createHash("sha256").update(password).digest("hex")
    }

    // Criar usuários
    console.log("Criando usuários iniciais...")

    // Admin
    await prisma.user.upsert({
      where: { email: "gabriel@colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel@colegiomatola.co.mz",
        name: "Gabriel",
        hashedPassword: hashPassword("Gabriel123"),
        role: "ADMIN",
        adminType: "SUPREME",
        image: "/admin-gabriel.jpg",
      },
    })

    // Professor
    await prisma.user.upsert({
      where: { email: "gabriel.vieira@colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel.vieira@colegiomatola.co.mz",
        name: "Gabriel Vieira",
        hashedPassword: hashPassword("Professor123"),
        role: "TEACHER",
        subject: "Matemática",
        bio: "Professor de Matemática com 8 anos de experiência.",
        image: "/teacher-gabriel.jpg",
      },
    })

    // Aluno
    await prisma.user.upsert({
      where: { email: "gabriel.silva@aluno.colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel.silva@aluno.colegiomatola.co.mz",
        name: "Gabriel Silva",
        hashedPassword: hashPassword("Aluno123"),
        role: "STUDENT",
        class: "10ª Classe",
        grade: "A",
        image: "/placeholder.svg?height=200&width=200",
      },
    })

    console.log("Usuários criados com sucesso!")
    console.log("Configuração concluída!")
  } catch (error) {
    console.error("Erro durante a configuração:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar a função
setup()
