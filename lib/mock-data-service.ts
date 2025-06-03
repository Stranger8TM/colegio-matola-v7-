import type { Student, Teacher, Material } from "@/types/api"

// Dados mock para estudantes
export const MOCK_STUDENTS: Student[] = [
  {
    id: "student-001",
    name: "João Silva",
    email: "joao@colegiomatola.com",
    class: "10A",
    grade: "10",
    profileImage: "/avatar-2.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "student-002",
    name: "Maria Santos",
    email: "maria@colegiomatola.com",
    class: "10A",
    grade: "10",
    profileImage: "/avatar-3.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Dados mock para professores
export const MOCK_TEACHERS: Teacher[] = [
  {
    id: "teacher-001",
    name: "Gabriel Vieira",
    email: "gabriel@colegiomatola.com",
    subject: "Matemática",
    profileImage: "/teacher-gabriel.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "teacher-002",
    name: "Maria Fernandes",
    email: "maria.fernandes@colegiomatola.com",
    subject: "Português",
    profileImage: "/teacher-maria.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Dados mock para materiais
export const MOCK_MATERIALS: Material[] = [
  {
    id: "material-001",
    title: "Álgebra Linear - Capítulo 1",
    description: "Introdução aos conceitos básicos de álgebra linear",
    type: "pdf",
    url: "/materials/algebra-cap1.pdf",
    teacherId: "teacher-001",
    subject: "Matemática",
    grade: "10",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "material-002",
    title: "Aula de Gramática",
    description: "Vídeo explicativo sobre classes gramaticais",
    type: "video",
    url: "/materials/gramatica-aula1.mp4",
    teacherId: "teacher-002",
    subject: "Português",
    grade: "10",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Serviço para gerenciar dados mock
export class MockDataService {
  static getStudents(): Student[] {
    return MOCK_STUDENTS
  }

  static getStudentById(id: string): Student | null {
    return MOCK_STUDENTS.find((student) => student.id === id) || null
  }

  static getTeachers(): Teacher[] {
    return MOCK_TEACHERS
  }

  static getTeacherById(id: string): Teacher | null {
    return MOCK_TEACHERS.find((teacher) => teacher.id === id) || null
  }

  static getMaterials(): Material[] {
    return MOCK_MATERIALS
  }

  static getMaterialById(id: string): Material | null {
    return MOCK_MATERIALS.find((material) => material.id === id) || null
  }

  static getMaterialsByTeacher(teacherId: string): Material[] {
    return MOCK_MATERIALS.filter((material) => material.teacherId === teacherId)
  }

  static getMaterialsBySubject(subject: string): Material[] {
    return MOCK_MATERIALS.filter((material) => material.subject === subject)
  }
}
