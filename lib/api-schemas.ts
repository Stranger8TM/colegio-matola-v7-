import { z } from "zod"

// Schemas para validação de dados

// Biblioteca
export const BookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  publicationYear: z.number().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  quantity: z.number().int().min(0).default(1),
  location: z.string().optional(),
})

export const BookLoanSchema = z.object({
  bookId: z.string().uuid("ID do livro inválido"),
  userId: z.string().uuid("ID do usuário inválido"),
  loanDate: z.date().default(() => new Date()),
  dueDate: z.date(),
  returnDate: z.date().optional(),
  status: z.enum(["active", "returned", "overdue", "lost"]).default("active"),
  notes: z.string().optional(),
})

// Atividades Extracurriculares
export const ExtracurricularActivitySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  dayOfWeek: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  location: z.string().optional(),
  maxParticipants: z.number().int().positive().optional(),
  teacherId: z.string().uuid("ID do professor inválido"),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.enum(["active", "inactive", "upcoming"]).default("active"),
})

export const ActivityEnrollmentSchema = z.object({
  activityId: z.string().uuid("ID da atividade inválido"),
  studentId: z.string().uuid("ID do estudante inválido"),
  enrollmentDate: z.date().default(() => new Date()),
  status: z.enum(["active", "inactive", "waitlist"]).default("active"),
  notes: z.string().optional(),
})

// Presença
export const AttendanceRecordSchema = z.object({
  classId: z.string().uuid(),
  teacherId: z.string().uuid(),
  date: z.date(),
  studentId: z.string().uuid(),
  status: z.enum(["present", "absent", "late", "excused"]),
  justification: z.string().optional(),
})

// Calendário Acadêmico
export const CalendarEventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  allDay: z.boolean().default(false),
  location: z.string().optional(),
  type: z.enum(["academic", "holiday", "event", "exam", "other"]),
  targetClass: z.string().optional(),
  createdBy: z.string().uuid("ID do criador inválido"),
})

export const AcademicTermSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  startDate: z.date(),
  endDate: z.date(),
  type: z.enum(["semester", "trimester", "quarter", "year"]),
  academicYear: z.string().min(1, "Ano acadêmico é obrigatório"),
  status: z.enum(["upcoming", "current", "past"]).default("upcoming"),
})

// Comunicação
export const MessageSchema = z.object({
  senderId: z.string().uuid("ID do remetente inválido"),
  receiverId: z.string().uuid("ID do destinatário inválido"),
  subject: z.string().min(1, "Assunto é obrigatório"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  isRead: z.boolean().default(false),
  attachments: z.array(z.string()).optional(),
})

export const AnnouncementSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  startDate: z.date().default(() => new Date()),
  endDate: z.date().optional(),
  targetAudience: z.enum(["all", "students", "teachers", "parents", "staff"]).default("all"),
  targetClass: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  createdBy: z.string().uuid("ID do criador inválido"),
})

// Transporte
export const TransportRouteSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  vehicleId: z.string().uuid("ID do veículo inválido"),
  driverId: z.string().uuid("ID do motorista inválido"),
  morningDeparture: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)")
    .optional(),
  afternoonDeparture: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)")
    .optional(),
  status: z.enum(["active", "inactive"]).default("active"),
})

export const TransportVehicleSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.string(),
  licensePlate: z.string().min(1, "Placa é obrigatória"),
  capacity: z.number().int().positive(),
  status: z.enum(["active", "maintenance", "inactive"]).default("active"),
})

export const TransportStopSchema = z.object({
  routeId: z.string().uuid("ID da rota inválido"),
  name: z.string().min(1, "Nome é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  morningTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)")
    .optional(),
  afternoonTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)")
    .optional(),
  order: z.number().int().nonnegative(),
})

export const StudentRouteSchema = z.object({
  studentId: z.string().uuid("ID do estudante inválido"),
  routeId: z.string().uuid("ID da rota inválido"),
  stopId: z.string().uuid("ID do ponto inválido"),
  useMorning: z.boolean().default(true),
  useAfternoon: z.boolean().default(true),
  startDate: z.date().default(() => new Date()),
  endDate: z.date().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
})

// Saúde
export const HealthRecordSchema = z.object({
  studentId: z.string().uuid("ID do estudante inválido"),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  allergies: z.array(z.string()).optional(),
  chronicConditions: z.array(z.string()).optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  notes: z.string().optional(),
})

export const MedicationSchema = z.object({
  studentId: z.string().uuid("ID do estudante inválido"),
  name: z.string().min(1, "Nome é obrigatório"),
  dosage: z.string().min(1, "Dosagem é obrigatória"),
  frequency: z.string().min(1, "Frequência é obrigatória"),
  startDate: z.date(),
  endDate: z.date().optional(),
  instructions: z.string().optional(),
  authorizedBy: z.string().optional(),
  status: z.enum(["active", "completed", "discontinued"]).default("active"),
})

export const HealthIncidentSchema = z.object({
  studentId: z.string().uuid("ID do estudante inválido"),
  date: z.date().default(() => new Date()),
  type: z.enum(["injury", "illness", "allergic_reaction", "other"]),
  description: z.string().min(1, "Descrição é obrigatória"),
  actionTaken: z.string().optional(),
  reportedBy: z.string().uuid("ID do relator inválido"),
  parentNotified: z.boolean().default(false),
  followUpRequired: z.boolean().default(false),
  followUpNotes: z.string().optional(),
})

// Finanças
export const PaymentSchema = z.object({
  studentId: z.string().uuid("ID do estudante inválido"),
  invoiceId: z.string().uuid("ID da fatura inválido").optional(),
  amount: z.number().positive("Valor deve ser positivo"),
  paymentDate: z.date().default(() => new Date()),
  paymentMethod: z.enum(["credit_card", "debit_card", "bank_transfer", "cash", "check", "other"]),
  status: z.enum(["pending", "completed", "failed", "refunded"]).default("pending"),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
})

export const InvoiceSchema = z.object({
  studentId: z.string().uuid("ID do estudante inválido"),
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.number().positive("Valor deve ser positivo"),
  dueDate: z.date(),
  issueDate: z.date().default(() => new Date()),
  status: z.enum(["pending", "paid", "overdue", "cancelled"]).default("pending"),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Descrição é obrigatória"),
        amount: z.number().positive("Valor deve ser positivo"),
      }),
    )
    .optional(),
})

export const ScholarshipSchema = z.object({
  studentId: z.string().uuid("ID do estudante inválido"),
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(["full", "partial", "merit", "need_based", "other"]),
  percentage: z.number().min(0).max(100),
  startDate: z.date(),
  endDate: z.date().optional(),
  criteria: z.string().optional(),
  sponsorName: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).default("active"),
  notes: z.string().optional(),
})

// Exames
export const ExamSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  subject: z.string().min(1, "Disciplina é obrigatória"),
  classId: z.string().uuid("ID da turma inválido"),
  teacherId: z.string().uuid("ID do professor inválido"),
  date: z.date(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  duration: z.number().int().positive("Duração deve ser positiva"),
  totalPoints: z.number().positive("Pontuação total deve ser positiva"),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
})

export const ExamResultSchema = z.object({
  examId: z.string().uuid("ID do exame inválido"),
  studentId: z.string().uuid("ID do estudante inválido"),
  score: z.number().nonnegative("Pontuação não pode ser negativa"),
  feedback: z.string().optional(),
  submissionDate: z.date().optional(),
  gradedBy: z.string().uuid("ID do avaliador inválido"),
  gradedDate: z.date().optional(),
  status: z.enum(["pending", "graded", "absent", "incomplete"]).default("pending"),
})
