import prisma from "./prisma"
import { compare } from "bcrypt"

// Autenticação
export async function authenticateUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) return null

  const passwordMatch = await compare(password, user.password)
  if (!passwordMatch) return null

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    class: user.class,
    grade: user.grade,
    role: user.role,
  }
}

export async function authenticateTeacher(id: string, password: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { id },
  })

  if (!teacher) return null

  const passwordMatch = await compare(password, teacher.password)
  if (!passwordMatch) return null

  return {
    id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    profileImage: teacher.profileImage,
    subject: teacher.subject,
    bio: teacher.bio,
  }
}

// Usuários
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      profileImage: true,
      class: true,
      grade: true,
      role: true,
    },
  })
}

export async function getAllStudents() {
  return prisma.user.findMany({
    where: { role: "student" },
    select: {
      id: true,
      name: true,
      email: true,
      profileImage: true,
      class: true,
      grade: true,
    },
    orderBy: { name: "asc" },
  })
}

export async function getStudentsByClass(className: string) {
  return prisma.user.findMany({
    where: {
      role: "student",
      class: className,
    },
    select: {
      id: true,
      name: true,
      class: true,
      grade: true,
    },
  })
}

// Professores
export async function getTeacherById(id: string) {
  return prisma.teacher.findUnique({
    where: { id },
  })
}

export async function getAllTeachers() {
  return prisma.teacher.findMany({
    orderBy: { name: "asc" },
  })
}

// Materiais
export async function getMaterials(classTarget?: string) {
  if (classTarget) {
    return prisma.material.findMany({
      where: { classTarget },
      include: {
        teacher: {
          select: {
            name: true,
            subject: true,
          },
        },
      },
      orderBy: { uploadDate: "desc" },
    })
  }

  return prisma.material.findMany({
    include: {
      teacher: {
        select: {
          name: true,
          subject: true,
        },
      },
    },
    orderBy: { uploadDate: "desc" },
  })
}

export async function getMaterialsByTeacher(teacherId: string) {
  return prisma.material.findMany({
    where: { teacherId },
    orderBy: { uploadDate: "desc" },
  })
}

export async function addMaterial(data: {
  title: string
  description?: string
  subject: string
  fileUrl: string
  classTarget: string
  teacherId: string
}) {
  return prisma.material.create({
    data,
  })
}

export async function deleteMaterial(id: string) {
  await prisma.material.delete({
    where: { id },
  })
  return true
}

// Tarefas
export async function getTasks(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { dueDate: "asc" },
  })
}

export async function addTask(data: {
  title: string
  description?: string
  dueDate: Date
  userId: string
}) {
  return prisma.task.create({
    data,
  })
}

export async function updateTask(
  id: string,
  data: {
    title?: string
    description?: string
    dueDate?: Date
    completed?: boolean
  },
) {
  return prisma.task.update({
    where: { id },
    data,
  })
}

// Notificações
export async function getNotifications(userId: string) {
  return prisma.notification.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      teacher: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { date: "desc" },
  })
}

export async function addNotification(data: {
  title: string
  content: string
  targetClass: string | null
  teacherId: string
  userIds: string[]
}) {
  const { userIds, ...notificationData } = data

  return prisma.notification.create({
    data: {
      ...notificationData,
      users: {
        connect: userIds.map((id) => ({ id })),
      },
    },
  })
}

export async function markNotificationAsRead(id: string, userId: string) {
  // Como não temos um campo isRead na relação, precisaríamos de uma tabela intermediária
  // Para simplificar, vamos apenas atualizar o campo isRead da notificação
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  })
}

// Notas
export async function getGradesByStudent(studentId: string) {
  return prisma.grade.findMany({
    where: { studentId },
    include: {
      teacher: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { date: "desc" },
  })
}

export async function getGradesByTeacher(teacherId: string) {
  return prisma.grade.findMany({
    where: { teacherId },
    include: {
      student: {
        select: {
          name: true,
          class: true,
          grade: true,
        },
      },
    },
    orderBy: { date: "desc" },
  })
}

export async function addGrade(data: {
  studentId: string
  teacherId: string
  subject: string
  value: number
  term: string
  comments?: string
}) {
  return prisma.grade.create({
    data,
  })
}

// Cursos
export async function getAllCourses() {
  return prisma.course.findMany({
    orderBy: { name: "asc" },
  })
}

// Eventos
export async function getUpcomingEvents() {
  return prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: { date: "asc" },
    take: 5,
  })
}

// Documentos
export async function getAllDocuments() {
  return prisma.document.findMany({
    orderBy: { uploadDate: "desc" },
  })
}

// Estatísticas
export async function getStatistics() {
  const stats = await prisma.statistic.findFirst({
    orderBy: { updatedAt: "desc" },
  })

  if (!stats) {
    // Fallback para estatísticas calculadas
    const totalStudents = await prisma.user.count({ where: { role: "student" } })
    const totalTeachers = await prisma.teacher.count()
    const totalCourses = await prisma.course.count()

    return {
      totalStudents,
      totalTeachers,
      totalCourses,
      activeClasses: 0,
      pendingAdmissions: 0,
      monthlyRevenue: "0",
    }
  }

  return stats
}
