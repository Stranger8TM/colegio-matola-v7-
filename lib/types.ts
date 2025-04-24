// Interfaces para o sistema
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

export enum Role {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

export enum AdminType {
  SUPREME = "SUPREME",
  GENERAL = "GENERAL",
  PEDAGOGICAL = "PEDAGOGICAL",
  SECRETARY = "SECRETARY",
  TECHNICAL = "TECHNICAL",
}
