import { PrismaClient, Role, AdminType } from "@prisma/client"
import { hash } from "crypto"

const prisma = new PrismaClient()

// Função simples para hash de senha (em produção, use bcrypt)
async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve) => {
    // Usando crypto em vez de bcrypt para compatibilidade com Edge Runtime
    const hashedPassword = hash("sha256").update(password).digest("hex")
    resolve(hashedPassword)
  })
}

async function main() {
  try {
    console.log("Iniciando seed do banco de dados...")

    // Criar o administrador supremo
    const adminPassword = await hashPassword("Gabriel123")
    await prisma.user.upsert({
      where: { email: "gabriel@colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel@colegiomatola.co.mz",
        name: "Gabriel",
        hashedPassword: adminPassword,
        role: Role.ADMIN,
        adminType: AdminType.SUPREME,
        image: "/admin-gabriel.jpg",
      },
    })
    console.log("Administrador criado com sucesso!")

    // Criar um professor
    const teacherPassword = await hashPassword("Professor123")
    await prisma.user.upsert({
      where: { email: "gabriel.vieira@colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel.vieira@colegiomatola.co.mz",
        name: "Gabriel Vieira",
        hashedPassword: teacherPassword,
        role: Role.TEACHER,
        subject: "Matemática",
        bio: "Professor de Matemática com 8 anos de experiência. Especialista em Álgebra e Geometria.",
        image: "/teacher-gabriel.jpg",
      },
    })
    console.log("Professor criado com sucesso!")

    // Criar um estudante
    const studentPassword = await hashPassword("Aluno123")
    await prisma.user.upsert({
      where: { email: "gabriel.silva@aluno.colegiomatola.co.mz" },
      update: {},
      create: {
        email: "gabriel.silva@aluno.colegiomatola.co.mz",
        name: "Gabriel Silva",
        hashedPassword: studentPassword,
        role: Role.STUDENT,
        class: "10ª Classe",
        grade: "A",
        image: "/placeholder.svg?height=200&width=200",
      },
    })
    console.log("Estudante criado com sucesso!")

    // Criar disciplinas básicas
    const disciplines = [
      { name: "Matemática", description: "Álgebra, Geometria e Cálculo" },
      { name: "Português", description: "Gramática, Literatura e Redação" },
      { name: "Ciências", description: "Física, Química e Biologia" },
      { name: "História", description: "História de Moçambique e Mundial" },
      { name: "Geografia", description: "Geografia Física e Humana" },
      { name: "Inglês", description: "Inglês como Segunda Língua" },
    ]

    for (const discipline of disciplines) {
      await prisma.discipline.upsert({
        where: {
          id: `${discipline.name.toLowerCase().replace(/\s+/g, "-")}`,
        },
        update: {},
        create: {
          id: `${discipline.name.toLowerCase().replace(/\s+/g, "-")}`,
          name: discipline.name,
          description: discipline.description,
          createdById:
            (
              await prisma.user.findFirst({
                where: { role: Role.ADMIN },
              })
            )?.id || "",
        },
      })
    }
    console.log("Disciplinas criadas com sucesso!")

    // Criar classes básicas
    const classes = [
      { name: "10ª A", grade: "10ª", year: 2023 },
      { name: "10ª B", grade: "10ª", year: 2023 },
      { name: "11ª A", grade: "11ª", year: 2023 },
      { name: "11ª B", grade: "11ª", year: 2023 },
      { name: "12ª A", grade: "12ª", year: 2023 },
      { name: "12ª B", grade: "12ª", year: 2023 },
    ]

    const adminId = (
      await prisma.user.findFirst({
        where: { role: Role.ADMIN },
      })
    )?.id

    if (adminId) {
      for (const classItem of classes) {
        await prisma.class.upsert({
          where: {
            id: `${classItem.name.toLowerCase().replace(/\s+/g, "-")}`,
          },
          update: {},
          create: {
            id: `${classItem.name.toLowerCase().replace(/\s+/g, "-")}`,
            name: classItem.name,
            grade: classItem.grade,
            year: classItem.year,
            adminId: adminId,
          },
        })
      }
      console.log("Classes criadas com sucesso!")
    }

    console.log("Seed concluído com sucesso!")
  } catch (error) {
    console.error("Erro durante o seed:", error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
