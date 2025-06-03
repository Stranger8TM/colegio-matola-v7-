// Mock Prisma Client para evitar erros durante o build
// Este arquivo simula a interface do Prisma sem usar o banco de dados real

interface MockUser {
  id: string
  email: string
  name: string
  role: string
  password: string
  createdAt: Date
  updatedAt: Date
}

interface MockStudent {
  id: string
  name: string
  email: string
  grade: string
  class: string
  enrollmentDate: Date
}

interface MockTeacher {
  id: string
  name: string
  email: string
  subject: string
  department: string
  hireDate: Date
}

interface MockAttendance {
  id: string
  studentId: string
  date: Date
  status: string
  notes?: string
}

// Dados mock
const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "admin@colegiomatola.co.mz",
    name: "Administrador",
    role: "ADMIN",
    password: "admin123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "teacher@colegiomatola.co.mz",
    name: "Professor Silva",
    role: "TEACHER",
    password: "teacher123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    email: "student@colegiomatola.co.mz",
    name: "João Santos",
    role: "STUDENT",
    password: "student123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockStudents: MockStudent[] = [
  {
    id: "1",
    name: "João Santos",
    email: "joao@colegiomatola.co.mz",
    grade: "10ª Classe",
    class: "A",
    enrollmentDate: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Maria Silva",
    email: "maria@colegiomatola.co.mz",
    grade: "11ª Classe",
    class: "B",
    enrollmentDate: new Date("2024-01-15"),
  },
]

const mockTeachers: MockTeacher[] = [
  {
    id: "1",
    name: "Prof. Gabriel Vieira",
    email: "gabriel@colegiomatola.co.mz",
    subject: "Matemática",
    department: "Ciências Exatas",
    hireDate: new Date("2023-08-01"),
  },
  {
    id: "2",
    name: "Prof. Maria Santos",
    email: "maria.prof@colegiomatola.co.mz",
    subject: "Português",
    department: "Línguas",
    hireDate: new Date("2023-08-01"),
  },
]

// Mock Prisma Client
const mockPrismaClient = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email) {
        return mockUsers.find((user) => user.email === where.email) || null
      }
      if (where.id) {
        return mockUsers.find((user) => user.id === where.id) || null
      }
      return null
    },
    findMany: async () => mockUsers,
    create: async ({ data }: { data: Partial<MockUser> }) => {
      const newUser: MockUser = {
        id: String(mockUsers.length + 1),
        email: data.email || "",
        name: data.name || "",
        role: data.role || "STUDENT",
        password: data.password || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockUsers.push(newUser)
      return newUser
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<MockUser> }) => {
      const userIndex = mockUsers.findIndex((user) => user.id === where.id)
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...data, updatedAt: new Date() }
        return mockUsers[userIndex]
      }
      throw new Error("User not found")
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const userIndex = mockUsers.findIndex((user) => user.id === where.id)
      if (userIndex !== -1) {
        const deletedUser = mockUsers[userIndex]
        mockUsers.splice(userIndex, 1)
        return deletedUser
      }
      throw new Error("User not found")
    },
  },
  student: {
    findMany: async () => mockStudents,
    findUnique: async ({ where }: { where: { id: string } }) => {
      return mockStudents.find((student) => student.id === where.id) || null
    },
    create: async ({ data }: { data: Partial<MockStudent> }) => {
      const newStudent: MockStudent = {
        id: String(mockStudents.length + 1),
        name: data.name || "",
        email: data.email || "",
        grade: data.grade || "",
        class: data.class || "",
        enrollmentDate: data.enrollmentDate || new Date(),
      }
      mockStudents.push(newStudent)
      return newStudent
    },
  },
  teacher: {
    findMany: async () => mockTeachers,
    findUnique: async ({ where }: { where: { id: string } }) => {
      return mockTeachers.find((teacher) => teacher.id === where.id) || null
    },
    create: async ({ data }: { data: Partial<MockTeacher> }) => {
      const newTeacher: MockTeacher = {
        id: String(mockTeachers.length + 1),
        name: data.name || "",
        email: data.email || "",
        subject: data.subject || "",
        department: data.department || "",
        hireDate: data.hireDate || new Date(),
      }
      mockTeachers.push(newTeacher)
      return newTeacher
    },
  },
  attendance: {
    findMany: async () => [],
    create: async ({ data }: { data: Partial<MockAttendance> }) => {
      return {
        id: "1",
        studentId: data.studentId || "",
        date: data.date || new Date(),
        status: data.status || "PRESENT",
        notes: data.notes,
      }
    },
  },
  $connect: async () => {
    console.log("Mock Prisma: Connected")
  },
  $disconnect: async () => {
    console.log("Mock Prisma: Disconnected")
  },
}

// Exportar o mock como default
const prisma = mockPrismaClient

export default prisma
export { prisma }
