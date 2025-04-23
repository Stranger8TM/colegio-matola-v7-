import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

// Simulação de banco de dados para o portal do aluno e painel de professores
// Em um ambiente de produção, isso seria substituído por um banco de dados real

export interface User {
  id: string
  username: string
  password: string
  name: string
  email: string
  profileImage: string
  class: string
  grade: string
}

export interface Material {
  id: string
  title: string
  description: string
  subject: string
  fileUrl: string
  uploadDate: string
  teacherId: string
  classTarget: string
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
}

export interface Teacher {
  id: string
  password: string
  name: string
  email: string
  profileImage: string
  subject: string
  bio: string
}

export interface Notification {
  id: string
  title: string
  content: string
  date: string
  teacherId: string
  teacherName: string
  targetClass: string | null // null significa para todas as turmas
  isRead: boolean
}

export interface Grade {
  id: string
  studentId: string
  studentName: string
  subject: string
  teacherId: string
  value: number
  term: string
  date: string
  comments: string
}

// Usuário padrão conforme solicitado
const users: User[] = [
  {
    id: "1",
    username: "Gabriel",
    password: "Gabriel",
    name: "Gabriel Silva",
    email: "gabriel.silva@aluno.colegiomatola.co.mz",
    profileImage: "/placeholder.svg?height=200&width=200",
    class: "10ª Classe",
    grade: "A",
  },
]

const materials: Material[] = [
  {
    id: "1",
    title: "Matemática - Funções Quadráticas",
    description: "Material de estudo sobre funções quadráticas e suas aplicações",
    subject: "Matemática",
    fileUrl: "#",
    uploadDate: "2023-05-15",
    teacherId: "1",
    classTarget: "10ª Classe",
  },
  {
    id: "2",
    title: "Biologia - Sistema Circulatório",
    description: "Apostila sobre o sistema circulatório humano",
    subject: "Biologia",
    fileUrl: "#",
    uploadDate: "2023-05-10",
    teacherId: "2",
    classTarget: "9ª Classe",
  },
  {
    id: "3",
    title: "História - Moçambique Colonial",
    description: "Texto sobre o período colonial em Moçambique",
    subject: "História",
    fileUrl: "#",
    uploadDate: "2023-05-05",
    teacherId: "1",
    classTarget: "10ª Classe",
  },
]

const tasks: Task[] = [
  {
    id: "1",
    title: "Trabalho de Matemática",
    description: "Resolver os exercícios da página 45 do livro",
    dueDate: "2023-06-10",
    completed: false,
  },
  {
    id: "2",
    title: "Redação de Português",
    description: "Escrever uma redação sobre o tema 'Meio Ambiente'",
    dueDate: "2023-06-15",
    completed: false,
  },
]

// Professor padrão conforme solicitado
const teachers: Teacher[] = [
  {
    id: "12345678",
    password: "Gabriel",
    name: "Gabriel Vieira",
    email: "gabriel.vieira@colegiomatola.co.mz",
    profileImage: "/teacher-gabriel.jpg",
    subject: "Matemática",
    bio: "Professor de Matemática com 8 anos de experiência. Especialista em Álgebra e Geometria.",
  },
  {
    id: "23456789",
    password: "Maria123",
    name: "Maria Fernandes",
    email: "maria.fernandes@colegiomatola.co.mz",
    profileImage: "/teacher-maria.jpg",
    subject: "Biologia",
    bio: "Professora de Biologia com mestrado em Ciências Naturais. Apaixonada por ensinar sobre o mundo natural.",
  },
]

const notifications: Notification[] = [
  {
    id: "1",
    title: "Prova de Matemática",
    content: "A prova de Matemática será realizada na próxima segunda-feira. Estudem o capítulo 5 do livro.",
    date: "2023-05-20",
    teacherId: "12345678",
    teacherName: "Gabriel Vieira",
    targetClass: "10ª Classe",
    isRead: false,
  },
  {
    id: "2",
    title: "Trabalho de Biologia",
    content: "O trabalho sobre o Sistema Circulatório deve ser entregue até sexta-feira.",
    date: "2023-05-18",
    teacherId: "23456789",
    teacherName: "Maria Fernandes",
    targetClass: "9ª Classe",
    isRead: false,
  },
]

const grades: Grade[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Gabriel Silva",
    subject: "Matemática",
    teacherId: "12345678",
    value: 18,
    term: "1º Trimestre",
    date: "2023-04-15",
    comments: "Excelente desempenho nos exercícios de álgebra.",
  },
  {
    id: "2",
    studentId: "1",
    studentName: "Gabriel Silva",
    subject: "Biologia",
    teacherId: "23456789",
    value: 16,
    term: "1º Trimestre",
    date: "2023-04-10",
    comments: "Bom trabalho sobre células, mas precisa melhorar na parte de genética.",
  },
]

// Funções para simular operações de banco de dados
export const getUser = (username: string, password: string): User | null => {
  return users.find((user) => user.username === username && user.password === password) || null
}

export const getUserById = (id: string): User | null => {
  return users.find((user) => user.id === id) || null
}

export const updateUserProfile = (id: string, data: Partial<User>): User | null => {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  users[userIndex] = { ...users[userIndex], ...data }
  return users[userIndex]
}

export const getMaterials = (classTarget?: string): Material[] => {
  if (classTarget) {
    return materials.filter((material) => material.classTarget === classTarget)
  }
  return materials
}

export const getMaterialsByTeacher = (teacherId: string): Material[] => {
  return materials.filter((material) => material.teacherId === teacherId)
}

export const addMaterial = (material: Omit<Material, "id">): Material => {
  const newMaterial = {
    id: Math.random().toString(36).substr(2, 9),
    ...material,
  }
  materials.push(newMaterial)
  return newMaterial
}

export const updateMaterial = (id: string, data: Partial<Material>): Material | null => {
  const materialIndex = materials.findIndex((material) => material.id === id)
  if (materialIndex === -1) return null

  materials[materialIndex] = { ...materials[materialIndex], ...data }
  return materials[materialIndex]
}

export const deleteMaterial = (id: string): boolean => {
  const materialIndex = materials.findIndex((material) => material.id === id)
  if (materialIndex === -1) return false

  materials.splice(materialIndex, 1)
  return true
}

export const getTasks = (): Task[] => {
  return tasks
}

export const addTask = (task: Omit<Task, "id">): Task => {
  const newTask = {
    id: Math.random().toString(36).substr(2, 9),
    ...task,
  }
  tasks.push(newTask)
  return newTask
}

export const updateTask = (id: string, data: Partial<Task>): Task | null => {
  const taskIndex = tasks.findIndex((task) => task.id === id)
  if (taskIndex === -1) return null

  tasks[taskIndex] = { ...tasks[taskIndex], ...data }
  return tasks[taskIndex]
}

// Funções para professores
export const getTeacher = (id: string, password: string): Teacher | null => {
  return teachers.find((teacher) => teacher.id === id && teacher.password === password) || null
}

export const getTeacherById = (id: string): Teacher | null => {
  return teachers.find((teacher) => teacher.id === id) || null
}

export const updateTeacherProfile = (id: string, data: Partial<Teacher>): Teacher | null => {
  const teacherIndex = teachers.findIndex((teacher) => teacher.id === id)
  if (teacherIndex === -1) return null

  // Apenas permitir atualização de email e bio
  const allowedUpdates: (keyof Teacher)[] = ["email", "bio"]
  const filteredData: Partial<Teacher> = {}

  for (const key of allowedUpdates) {
    if (key in data) {
      filteredData[key] = data[key]
    }
  }

  teachers[teacherIndex] = { ...teachers[teacherIndex], ...filteredData }
  return teachers[teacherIndex]
}

// Funções para notificações
export const getNotifications = (studentClass?: string): Notification[] => {
  if (studentClass) {
    return notifications.filter(
      (notification) => notification.targetClass === studentClass || notification.targetClass === null,
    )
  }
  return notifications
}

export const addNotification = (notification: Omit<Notification, "id">): Notification => {
  const newNotification = {
    id: Math.random().toString(36).substr(2, 9),
    ...notification,
  }
  notifications.push(newNotification)
  return newNotification
}

export const markNotificationAsRead = (id: string): Notification | null => {
  const notificationIndex = notifications.findIndex((notification) => notification.id === id)
  if (notificationIndex === -1) return null

  notifications[notificationIndex] = { ...notifications[notificationIndex], isRead: true }
  return notifications[notificationIndex]
}

// Funções para notas
export const getGradesByStudent = (studentId: string): Grade[] => {
  return grades.filter((grade) => grade.studentId === studentId)
}

export const getGradesByTeacher = (teacherId: string): Grade[] => {
  return grades.filter((grade) => grade.teacherId === teacherId)
}

export const addGrade = (grade: Omit<Grade, "id">): Grade => {
  const newGrade = {
    id: Math.random().toString(36).substr(2, 9),
    ...grade,
  }
  grades.push(newGrade)
  return newGrade
}

export const updateGrade = (id: string, data: Partial<Grade>): Grade | null => {
  const gradeIndex = grades.findIndex((grade) => grade.id === id)
  if (gradeIndex === -1) return null

  grades[gradeIndex] = { ...grades[gradeIndex], ...data }
  return grades[gradeIndex]
}

export const deleteGrade = (id: string): boolean => {
  const gradeIndex = grades.findIndex((grade) => grade.id === id)
  if (gradeIndex === -1) return false

  grades.splice(gradeIndex, 1)
  return true
}

// Função para obter todos os alunos (simulação)
export const getAllStudents = (): { id: string; name: string; class: string; grade: string }[] => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    class: user.class,
    grade: user.grade,
  }))
}

// Função para obter alunos por classe
export const getStudentsByClass = (className: string): { id: string; name: string; class: string; grade: string }[] => {
  return users
    .filter((user) => user.class === className)
    .map((user) => ({
      id: user.id,
      name: user.name,
      class: user.class,
      grade: user.grade,
    }))
}

// Função para criptografar senha (simulação)
export const encryptPassword = (password: string): string => {
  // Em um ambiente real, usaríamos bcrypt ou similar
  // Esta é apenas uma simulação básica
  return Buffer.from(password).toString("base64")
}

// Função para verificar senha (simulação)
export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  // Em um ambiente real, usaríamos bcrypt ou similar
  return Buffer.from(password).toString("base64") === hashedPassword
}
