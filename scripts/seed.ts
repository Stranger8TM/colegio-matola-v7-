import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Limpar banco de dados existente
  await prisma.grade.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.material.deleteMany()
  await prisma.task.deleteMany()
  await prisma.document.deleteMany()
  await prisma.event.deleteMany()
  await prisma.course.deleteMany()
  await prisma.statistic.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.user.deleteMany()

  console.log("Banco de dados limpo")

  // Criar administrador
  const adminPassword = await hash("admin123", 10)
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: adminPassword,
      name: "Administrador",
      email: "admin@colegiomatola.co.mz",
      role: "admin",
    },
  })

  console.log("Administrador criado:", admin.name)

  // Criar professores
  const teacherPassword = await hash("Gabriel", 10)
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        id: "12345678",
        password: teacherPassword,
        name: "Gabriel Vieira",
        email: "gabriel.vieira@colegiomatola.co.mz",
        profileImage: "/teacher-gabriel.jpg",
        subject: "Matemática",
        bio: "Professor de Matemática com 8 anos de experiência. Especialista em Álgebra e Geometria.",
      },
    }),
    prisma.teacher.create({
      data: {
        id: "23456789",
        password: await hash("Maria123", 10),
        name: "Maria Fernandes",
        email: "maria.fernandes@colegiomatola.co.mz",
        profileImage: "/teacher-maria.jpg",
        subject: "Biologia",
        bio: "Professora de Biologia com mestrado em Ciências Naturais. Apaixonada por ensinar sobre o mundo natural.",
      },
    }),
    prisma.teacher.create({
      data: {
        id: "34567890",
        password: await hash("Antonio123", 10),
        name: "António Mabjaia",
        email: "antonio.mabjaia@colegiomatola.co.mz",
        profileImage: "/avatar-3.jpg",
        subject: "Física",
        bio: "Professor de Física com doutorado em Física Quântica. Pesquisador e educador há 12 anos.",
      },
    }),
  ])

  console.log(`${teachers.length} professores criados`)

  // Criar alunos
  const studentPassword = await hash("Gabriel", 10)
  const students = await Promise.all([
    prisma.user.create({
      data: {
        id: "1",
        username: "Gabriel",
        password: studentPassword,
        name: "Gabriel Silva",
        email: "gabriel.silva@aluno.colegiomatola.co.mz",
        profileImage: "/avatar-1.jpg",
        class: "10ª Classe",
        grade: "A",
        role: "student",
      },
    }),
    prisma.user.create({
      data: {
        username: "carlos",
        password: await hash("carlos123", 10),
        name: "Carlos Mendes",
        email: "carlos.mendes@aluno.colegiomatola.co.mz",
        profileImage: "/avatar-2.jpg",
        class: "12ª Classe",
        grade: "B",
        role: "student",
      },
    }),
    prisma.user.create({
      data: {
        username: "beatriz",
        password: await hash("beatriz123", 10),
        name: "Beatriz Fonseca",
        email: "beatriz.fonseca@aluno.colegiomatola.co.mz",
        profileImage: "/avatar-3.jpg",
        class: "9ª Classe",
        grade: "A",
        role: "student",
      },
    }),
  ])

  console.log(`${students.length} alunos criados`)

  // Criar materiais
  const materials = await Promise.all([
    prisma.material.create({
      data: {
        title: "Matemática - Funções Quadráticas",
        description: "Material de estudo sobre funções quadráticas e suas aplicações",
        subject: "Matemática",
        fileUrl: "#",
        classTarget: "10ª Classe",
        teacherId: teachers[0].id,
      },
    }),
    prisma.material.create({
      data: {
        title: "Biologia - Sistema Circulatório",
        description: "Apostila sobre o sistema circulatório humano",
        subject: "Biologia",
        fileUrl: "#",
        classTarget: "9ª Classe",
        teacherId: teachers[1].id,
      },
    }),
  ])

  console.log(`${materials.length} materiais criados`)

  // Criar tarefas
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: "Trabalho de Matemática",
        description: "Resolver os exercícios da página 45 do livro",
        dueDate: new Date("2023-06-10"),
        userId: students[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Redação de Português",
        description: 'Escrever uma redação sobre o tema "Meio Ambiente"',
        dueDate: new Date("2023-06-15"),
        userId: students[0].id,
      },
    }),
  ])

  console.log(`${tasks.length} tarefas criadas`)

  // Criar notificações
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        title: "Prova de Matemática",
        content: "A prova de Matemática será realizada na próxima segunda-feira. Estudem o capítulo 5 do livro.",
        targetClass: "10ª Classe",
        teacherId: teachers[0].id,
        users: {
          connect: [{ id: students[0].id }],
        },
      },
    }),
    prisma.notification.create({
      data: {
        title: "Trabalho de Biologia",
        content: "O trabalho sobre o Sistema Circulatório deve ser entregue até sexta-feira.",
        targetClass: "9ª Classe",
        teacherId: teachers[1].id,
        users: {
          connect: [{ id: students[2].id }],
        },
      },
    }),
  ])

  console.log(`${notifications.length} notificações criadas`)

  // Criar notas
  const grades = await Promise.all([
    prisma.grade.create({
      data: {
        studentId: students[0].id,
        teacherId: teachers[0].id,
        subject: "Matemática",
        value: 18,
        term: "1º Trimestre",
        comments: "Excelente desempenho nos exercícios de álgebra.",
      },
    }),
    prisma.grade.create({
      data: {
        studentId: students[0].id,
        teacherId: teachers[1].id,
        subject: "Biologia",
        value: 16,
        term: "1º Trimestre",
        comments: "Bom trabalho sobre células, mas precisa melhorar na parte de genética.",
      },
    }),
  ])

  console.log(`${grades.length} notas criadas`)

  // Criar cursos
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        name: "Ensino Primário",
        description: "Curso de ensino primário do 1º ao 7º ano",
        students: 450,
        classes: 15,
      },
    }),
    prisma.course.create({
      data: {
        name: "Ensino Secundário Geral",
        description: "Curso de ensino secundário geral da 8ª à 12ª classe",
        students: 580,
        classes: 18,
      },
    }),
    prisma.course.create({
      data: {
        name: "Ensino Técnico-Profissional",
        description: "Curso técnico-profissional com foco em tecnologia e administração",
        students: 220,
        classes: 9,
      },
    }),
  ])

  console.log(`${courses.length} cursos criados`)

  // Criar eventos
  const events = await Promise.all([
    prisma.event.create({
      data: {
        name: "Reunião de Professores",
        description: "Reunião para discutir o planejamento do próximo trimestre",
        date: new Date("2023-05-15"),
        time: "14:00",
        location: "Sala de Conferências",
      },
    }),
    prisma.event.create({
      data: {
        name: "Feira de Ciências",
        description: "Apresentação de projetos científicos dos alunos",
        date: new Date("2023-05-22"),
        time: "09:00",
        location: "Pátio Central",
      },
    }),
    prisma.event.create({
      data: {
        name: "Entrega de Notas",
        description: "Entrega de boletins e reunião com pais",
        date: new Date("2023-05-30"),
        time: "13:00",
        location: "Salas de Aula",
      },
    }),
  ])

  console.log(`${events.length} eventos criados`)

  // Criar documentos
  const documents = await Promise.all([
    prisma.document.create({
      data: {
        name: "Calendário Escolar 2023",
        type: "PDF",
        size: "2.4 MB",
        fileUrl: "#",
      },
    }),
    prisma.document.create({
      data: {
        name: "Regulamento Interno",
        type: "DOCX",
        size: "1.8 MB",
        fileUrl: "#",
      },
    }),
    prisma.document.create({
      data: {
        name: "Plano Curricular",
        type: "PDF",
        size: "3.2 MB",
        fileUrl: "#",
      },
    }),
  ])

  console.log(`${documents.length} documentos criados`)

  // Criar estatísticas
  await prisma.statistic.create({
    data: {
      totalStudents: 1250,
      totalTeachers: 68,
      totalCourses: 24,
      activeClasses: 42,
      pendingAdmissions: 78,
      monthlyRevenue: "1.245.000 MZN",
    },
  })

  console.log("Estatísticas criadas")

  console.log("Banco de dados inicializado com sucesso!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
