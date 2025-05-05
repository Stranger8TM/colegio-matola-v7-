// Tipos comuns para a API

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationResponse {
  total: number
  page: number
  limit: number
  pages: number
}

export interface ApiResponse<T> {
  data: T
  pagination?: PaginationResponse
  message?: string
  error?: string
}

// Tipos para estudantes
export interface Student {
  id: number
  name: string
  email: string
  grade: string
  enrollmentDate: string
  parentName?: string
  contactNumber?: string
  address?: string
  dateOfBirth?: string
}

export interface StudentGrade {
  id: number
  studentId: number
  subject: string
  grade: number
  term: string
  date: string
  teacherName: string
  comments?: string
}

// Tipos para professores
export interface Teacher {
  id: number
  name: string
  email: string
  subject: string
  bio?: string
  education?: string
  joinedAt: string
}

// Tipos para materiais
export interface Material {
  id: number
  title: string
  subject: string
  grade: string
  type: string
  url: string
  description?: string
  pages?: number
  uploadedBy: string
  uploadedAt: string
  downloads?: number
}

// Tipos para aulas gravadas
export interface RecordedLesson {
  id: number
  title: string
  subject: string
  grade: string
  teacher: string
  duration: string
  url: string
  thumbnail?: string
  description?: string
  uploadedAt: string
  views: number
  likes?: number
}

export interface Comment {
  id: number
  lessonId: number
  user: string
  text: string
  date: string
}

// Tipos para autenticação
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    role: string
  }
}

// Tipos para estatísticas
export interface Statistics {
  students: {
    total: number
    byGrade: Record<string, number>
    gender: {
      male: number
      female: number
    }
    newEnrollments: {
      lastMonth: number
      lastYear: number
    }
  }
  teachers: {
    total: number
    bySubject: Record<string, number>
    gender: {
      male: number
      female: number
    }
  }
  content: {
    recordedLessons: number
    materials: number
    mostViewedLessons: Array<{
      id: number
      title: string
      views: number
    }>
    mostDownloadedMaterials: Array<{
      id: number
      title: string
      downloads: number
    }>
  }
  performance: {
    averageGrades: Record<string, number>
    passRate: number
    topPerformingClass: string
    improvementAreas: string[]
  }
  system: {
    activeUsers: {
      daily: number
      weekly: number
      monthly: number
    }
    peakUsageTimes: string[]
    deviceUsage: {
      desktop: number
      mobile: number
      tablet: number
    }
  }
}
