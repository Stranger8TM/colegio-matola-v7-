import { PrismaClient, Role, AdminType } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Criar o administrador supremo
  const adminPassword = await hash("Gabriel", 10)
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

  // Criar um professor
  const teacherPassword = await hash("Gabriel", 10)
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

  // Criar um estudante
  const studentPassword = await hash("Gabriel", 10)
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

  console.log("Seed concluído com sucesso!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
