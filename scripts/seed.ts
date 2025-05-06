import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Iniciando seed...")

  // Limpar dados existentes
  await prisma.grade.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.material.deleteMany()
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.course.deleteMany()
  await prisma.event.deleteMany()
  await prisma.document.deleteMany()
  await prisma.statistic.deleteMany()

  console.log("Dados existentes removidos")

  // Criar professores
  const teacherGabriel = await prisma.teacher.create({
    data: {
      name: "Gabriel Vieira",
      email: "gabriel.vieira@escolamatola.com",
      password: await hash("senha123", 10),
      profileImage: "/teacher-gabriel.jpg",
      subject: "Matemática",
      bio: "Professor de Matemática com 10 anos de experiência. Especialista em ensino de álgebra e geometria.",
    },
  })

  const teacherMaria = await prisma.teacher.create({
    data: {
      name: "Maria Silva",
      email: "maria.silva@escolamatola.com",
      password: await hash("senha123", 10),
      profileImage: "/teacher-maria.jpg",
      subject: "Português",
      bio: "Professora de Português com foco em literatura e redação. Mestre em Letras.",
    },
  })

  console.log("Professores criados")

  // Criar alunos
  const student1 = await prisma.user.create({
    data: {
      username: "joao.silva",
      password: await hash("senha123", 10),
      name: "João Silva",
      email: "joao.silva@aluno.escolamatola.com",
      profileImage: "/avatar-1.jpg",
      class: "10A",
      grade: "10",
      role: "student",
    },
  })

  const student2 = await prisma.user.create({
    data: {
      username: "ana.santos",
      password: await hash("senha123", 10),
      name: "Ana Santos",
      email: "ana.santos@aluno.escolamatola.com",
      profileImage: "/avatar-2.jpg",
      class: "10A",
      grade: "10",
      role: "student",
    },
  })

  const student3 = await prisma.user.create({
    data: {
      username: "pedro.costa",
      password: await hash("senha123", 10),
      name: "Pedro Costa",
      email: "pedro.costa@aluno.escolamatola.com",
      profileImage: "/avatar-3.jpg",
      class: "11B",
      grade: "11",
      role: "student",
    },
  })

  // Criar admin
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: await hash("admin123", 10),
      name: "Administrador",
      email: "admin@escolamatola.com",
      profileImage: "/avatar-5.jpg",
      role: "admin",
    },
  })

  console.log("Usuários criados")

  // Criar materiais
  await prisma.material.createMany({
    data: [
      {
        title: "Apostila de Álgebra",
        description: "Material completo sobre equações de primeiro e segundo grau",
        subject: "Matemática",
        fileUrl: "/materials/algebra.pdf",
        classTarget: "10A",
        teacherId: teacherGabriel.id,
        uploadDate: new Date(),
      },
      {
        title: "Exercícios de Geometria",
        description: "Lista de exercícios sobre triângulos e círculos",
        subject: "Matemática",
        fileUrl: "/materials/geometria.pdf",
        classTarget: "10A",
        teacherId: teacherGabriel.id,
        uploadDate: new Date(Date.now() - 86400000), // 1 dia atrás
      },
      {
        title: "Análise de Texto - Machado de Assis",
        description: "Material para análise de obras de Machado de Assis",
        subject: "Português",
        fileUrl: "/materials/machado.pdf",
        classTarget: "11B",
        teacherId: teacherMaria.id,
        uploadDate: new Date(Date.now() - 172800000), // 2 dias atrás
      },
    ],
  })

  console.log("Materiais criados")

  // Criar tarefas
  await prisma.task.createMany({
    data: [
      {
        title: "Exercícios de Álgebra",
        description: "Resolver os exercícios 1 a 10 da apostila",
        dueDate: new Date(Date.now() + 604800000), // 7 dias no futuro
        completed: false,
        userId: student1.id,
      },
      {
        title: "Redação sobre Machado de Assis",
        description: "Escrever uma redação sobre a obra Dom Casmurro",
        dueDate: new Date(Date.now() + 1209600000), // 14 dias no futuro
        completed: false,
        userId: student1.id,
      },
      {
        title: "Trabalho de Geometria",
        description: "Preparar apresentação sobre teorema de Pitágoras",
        dueDate: new Date(Date.now() + 432000000), // 5 dias no futuro
        completed: false,
        userId: student2.id,
      },
    ],
  })

  console.log("Tarefas criadas")

  // Criar notificações
  const notification1 = await prisma.notification.create({
    data: {
      title: "Prova de Matemática",
      content: "A prova de matemática será realizada na próxima semana",
      date: new Date(),
      targetClass: "10A",
      isRead: false,
      teacherId: teacherGabriel.id,
      users: {
        connect: [{ id: student1.id }, { id: student2.id }],
      },
    },
  })

  const notification2 = await prisma.notification.create({
    data: {
      title: "Trabalho de Português",
      content: "O prazo para entrega do trabalho de português foi estendido",
      date: new Date(Date.now() - 86400000), // 1 dia atrás
      targetClass: "11B",
      isRead: false,
      teacherId: teacherMaria.id,
      users: {
        connect: [{ id: student3.id }],
      },
    },
  })

  console.log("Notificações criadas")

  // Criar notas
  await prisma.grade.createMany({
    data: [
      {
        studentId: student1.id,
        teacherId: teacherGabriel.id,
        subject: "Matemática",
        value: 85,
        term: "1º Trimestre",
        comments: "Bom desempenho em álgebra, precisa melhorar em geometria",
        date: new Date(Date.now() - 2592000000), // 30 dias atrás
      },
      {
        studentId: student1.id,
        teacherId: teacherMaria.id,
        subject: "Português",
        value: 78,
        term: "1º Trimestre",
        comments: "Boa redação, precisa melhorar gramática",
        date: new Date(Date.now() - 2505600000), // 29 dias atrás
      },
      {
        studentId: student2.id,
        teacherId: teacherGabriel.id,
        subject: "Matemática",
        value: 92,
        term: "1º Trimestre",
        comments: "Excelente desempenho em todos os tópicos",
        date: new Date(Date.now() - 2592000000), // 30 dias atrás
      },
      {
        studentId: student3.id,
        teacherId: teacherMaria.id,
        subject: "Português",
        value: 88,
        term: "1º Trimestre",
        comments: "Ótima análise literária",
        date: new Date(Date.now() - 2505600000), // 29 dias atrás
      },
    ],
  })

  console.log("Notas criadas")

  // Criar cursos
  await prisma.course.createMany({
    data: [
      {
        name: "Ensino Fundamental I",
        description: "Do 1º ao 5º ano",
        imageUrl: "/curriculo.jpg",
      },
      {
        name: "Ensino Fundamental II",
        description: "Do 6º ao 9º ano",
        imageUrl: "/curriculo.jpg",
      },
      {
        name: "Ensino Médio",
        description: "Do 10º ao 12º ano",
        imageUrl: "/curriculo.jpg",
      },
    ],
  })

  console.log("Cursos criados")

  // Criar eventos
  await prisma.event.createMany({
    data: [
      {
        title: "Feira de Ciências",
        description: "Apresentação de projetos científicos dos alunos",
        date: new Date(Date.now() + 1209600000), // 14 dias no futuro
        location: "Pátio da Escola",
        imageUrl: "/news-1.jpg",
      },
      {
        title: "Reunião de Pais",
        description: "Reunião para discutir o desempenho dos alunos",
        date: new Date(Date.now() + 604800000), // 7 dias no futuro
        location: "Auditório",
        imageUrl: "/news-2.jpg",
      },
      {
        title: "Torneio Esportivo",
        description: "Competições esportivas entre turmas",
        date: new Date(Date.now() + 1814400000), // 21 dias no futuro
        location: "Quadra Poliesportiva",
        imageUrl: "/news-3.jpg",
      },
    ],
  })

  console.log("Eventos criados")

  // Criar documentos
  await prisma.document.createMany({
    data: [
      {
        title: "Calendário Escolar 2023",
        description: "Calendário oficial com datas importantes",
        fileUrl: "/documents/calendario.pdf",
        category: "Institucional",
        uploadDate: new Date(Date.now() - 7776000000), // 90 dias atrás
      },
      {
        title: "Regimento Interno",
        description: "Normas e regras da instituição",
        fileUrl: "/documents/regimento.pdf",
        category: "Institucional",
        uploadDate: new Date(Date.now() - 15552000000), // 180 dias atrás
      },
      {
        title: "Formulário de Matrícula",
        description: "Documento para matrícula de novos alunos",
        fileUrl: "/documents/matricula.pdf",
        category: "Formulários",
        uploadDate: new Date(Date.now() - 2592000000), // 30 dias atrás
      },
    ],
  })

  console.log("Documentos criados")

  // Criar estatísticas
  await prisma.statistic.create({
    data: {
      totalStudents: 450,
      totalTeachers: 35,
      totalCourses: 3,
      activeClasses: 15,
      pendingAdmissions: 28,
      monthlyRevenue: "125000",
      updatedAt: new Date(),
    },
  })

  console.log("Estatísticas criadas")

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
