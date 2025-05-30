import { type NextRequest, NextResponse } from "next/server"

// GET /api/v1/attendance
export async function GET(req: NextRequest) {
  try {
    // Retornar dados mock durante o desenvolvimento
    const mockData = {
      data: [
        {
          id: "1",
          studentId: "student-1",
          status: "present",
          date: new Date().toISOString(),
          student: {
            id: "student-1",
            name: "João Silva",
            class: "10A",
            grade: "10º Ano",
          },
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    }

    return NextResponse.json({
      success: true,
      ...mockData,
    })
  } catch (error) {
    console.error("Erro ao buscar registros de presença:", error)
    return NextResponse.json({ success: false, error: "Erro ao buscar registros de presença" }, { status: 500 })
  }
}

// POST /api/v1/attendance
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validação básica
    if (!body.studentId || !body.status) {
      return NextResponse.json({ success: false, error: "Dados obrigatórios não fornecidos" }, { status: 400 })
    }

    // Retornar sucesso mock
    const mockResponse = {
      id: "new-attendance-" + Date.now(),
      studentId: body.studentId,
      status: body.status,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        data: mockResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao criar registro de presença:", error)
    return NextResponse.json({ success: false, error: "Erro ao criar registro de presença" }, { status: 500 })
  }
}
