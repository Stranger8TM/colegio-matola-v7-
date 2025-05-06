// Tipos para a API

// Usuário base
export interface BaseUser {
  id: string
  name: string
  email: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

// Aluno
export interface Student extends BaseUser {
  class: string
  grade: string
  parentName?: string
  parentContact?: string
  enrollmentDate: Date
  status: "active" | "inactive" | "suspended"
}

// Professor
export interface Teacher extends BaseUser {
  subject: string
  bio?: string
  qualifications?: string[]
  hireDate: Date
  status: "active" | "inactive"
}

// Administrador
export interface Admin extends BaseUser {
  role: "admin" | "superadmin"
  permissions: string[]
}

// Material de estudo
export interface Material {
  id: string
  title: string
  description?: string
  subject: string
  fileUrl: string
  classTarget: string
  teacherId: string
  uploadDate: Date
  downloads: number
}

// Aula gravada
export interface RecordedLesson {
  id: string
  title: string
  description?: string
  subject: string
  videoUrl: string
  thumbnailUrl?: string
  duration: number
  classTarget: string
  teacherId: string
  uploadDate: Date
  views: number
}

// Nota
export interface Grade {
  id: string
  studentId: string
  teacherId: string
  subject: string
  value: number
  term: string
  comments?: string
  date: Date
}

// Notificação
export interface Notification {
  id: string
  title: string
  content: string
  targetClass: string | null
  teacherId: string
  date: Date
  isRead: boolean
  userIds: string[]
}

// Curso
export interface Course {
  id: string
  name: string
  description: string
  level: string
  duration: number
  startDate: Date
  endDate: Date
  status: "active" | "inactive" | "upcoming"
}

// Evento
export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  type: "academic" | "cultural" | "sports" | "other"
  targetClass?: string
}

// Documento
export interface Document {
  id: string
  title: string
  description?: string
  fileUrl: string
  category: "policy" | "form" | "report" | "other"
  uploadDate: Date
}

// Estatísticas
export interface Statistics {
  id: string
  totalStudents: number
  totalTeachers: number
  totalCourses: number
  activeClasses: number
  pendingAdmissions: number
  monthlyRevenue: string
  updatedAt: Date
}

// Progresso de aula
export interface LessonProgress {
  userId: string
  lessonId: string
  progress: number
  completed: boolean
  lastWatched: Date
  updatedAt: Date
}

// Resposta padrão da API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Parâmetros de paginação
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// Parâmetros de filtro
export interface FilterParams {
  search?: string
  class?: string
  subject?: string
  startDate?: Date
  endDate?: Date
  status?: string
}
