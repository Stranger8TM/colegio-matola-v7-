import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse } from "@/types/api"

// Dados mock para presença
const MOCK_ATTENDANCE = [
  {
    id: "att-001",
    studentId: "student-001",
    date: new Date().toISOString().split("T")[0],
    status: "present",
    notes: "",
  },
  {
    id: "att-002",
    studentId: "student-002",
    date: new Date().toISOString().split("T")[0],
    status: "absent",
    notes: "Doente",
  },
]

// GET /api/v1/attendance - Listar registros de presença
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")
    const date = searchParams.get("date")

    let filteredAttendance = MOCK_ATTENDANCE

    if (studentId) {
      filteredAttendance = filteredAttendance.filter((att) => att.studentId === studentId)
    }

    if (date) {
      filteredAttendance = filteredAttendance.filter((att) => att.date === date)
    }

    const response: ApiResponse<typeof filteredAttendance> = {
      success: true,
      data: filteredAttendance,
      message: "Registros de presença obtidos com sucesso",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching attendance:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Erro interno do servidor",
      message: "Não foi possível obter os registros de presença",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/v1/attendance - Criar registro de presença
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados obrigatórios
    if (!body.studentId || !body.date || !body.status) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Dados inválidos",
        message: "studentId, date e status são obrigatórios",
      }

      return NextResponse.json(response, { status: 400 })
    }

    // Criar novo registro mock
    const newAttendance = {
      id: `att-${Date.now()}`,
      studentId: body.studentId,
      date: body.date,
      status: body.status,
      notes: body.notes || "",
    }

    MOCK_ATTENDANCE.push(newAttendance)

    const response: ApiResponse<typeof newAttendance> = {
      success: true,
      data: newAttendance,
      message: "Registro de presença criado com sucesso",
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("Error creating attendance:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Erro interno do servidor",
      message: "Não foi possível criar o registro de presença",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
