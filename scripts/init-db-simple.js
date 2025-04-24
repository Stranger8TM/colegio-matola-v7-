const { PrismaClient } = require("@prisma/client")
const crypto = require("crypto")

const prisma = new PrismaClient()

// Função simples para hash de senha
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex")
}

async function main() {
  try {
    console.log("Iniciando seed do banco de dados...")

    // Criar o administrador supremo
    const adminPassword = hashPassword("Gabriel123")
    await prisma.user.upsert({
      where: { email: "gabriel@colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel@colegiomatola.co.mz",
        name: "Gabriel",
        hashedPassword: adminPassword,
        role: "ADMIN",
        adminType: "SUPREME",
        image: "/admin-gabriel.jpg",
      },
    })
    console.log("Administrador criado com sucesso!")

    // Criar um professor
    const teacherPassword = hashPassword("Professor123")
    await prisma.user.upsert({
      where: { email: "gabriel.vieira@colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel.vieira@colegiomatola.co.mz",
        name: "Gabriel Vieira",
        hashedPassword: teacherPassword,
        role: "TEACHER",
        subject: "Matemática",
        bio: "Professor de Matemática com 8 anos de experiência. Especialista em Álgebra e Geometria.",
        image: "/teacher-gabriel.jpg",
      },
    })
    console.log("Professor criado com sucesso!")

    // Criar um estudante
    const studentPassword = hashPassword("Aluno123")
    await prisma.user.upsert({
      where: { email: "gabriel.silva@aluno.colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel.silva@aluno.colegiomatola.co.mz",
        name: "Gabriel Silva",
        hashedPassword: studentPassword,
        role: "STUDENT",
        class: "10ª Classe",
        grade: "A",
        image: "/placeholder.svg?height=200&width=200",
      },
    })
    console.log("Estudante criado com sucesso!")

    console.log("Seed concluído com sucesso!")
  } catch (error) {
    console.error("Erro durante o seed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
