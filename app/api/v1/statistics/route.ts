import { type NextRequest, NextResponse } from "next/server"
import { checkRole } from "@/lib/api-middleware"

export async function GET(request: NextRequest) {
  try {
    // Este endpoint requer autenticação e permissão de administrador
    const roleCheck = await checkRole(["admin", "director"])(request)
    if (!roleCheck.valid) {
      return NextResponse.json({ error: roleCheck.error }, { status: 401 })
    }

    // Simulação de estatísticas do sistema
    const statistics = {
      students: {
        total: 850,
        byGrade: {
          "1º Ano": 65,
          "2º Ano": 72,
          "3º Ano": 68,
          "4º Ano": 70,
          "5º Ano": 75,
          "6º Ano": 80,
          "7º Ano": 85,
          "8º Ano": 82,
          "9º Ano": 78,
          "10º Ano": 90,
          "11º Ano": 85,
          "12º Ano": 80,
        },
        gender: {
          male: 430,
          female: 420,
        },
        newEnrollments: {
          lastMonth: 15,
          lastYear: 120,
        },
      },
      teachers: {
        total: 45,
        bySubject: {
          Matemática: 8,
          Português: 7,
          Ciências: 6,
          História: 5,
          Geografia: 5,
          Inglês: 4,
          "Educação Física": 3,
          Artes: 3,
          Física: 2,
          Química: 2,
        },
        gender: {
          male: 22,
          female: 23,
        },
      },
      content: {
        recordedLessons: 156,
        materials: 320,
        mostViewedLessons: [
          { id: 1, title: "Equações do 2º Grau", views: 256 },
          { id: 3, title: "Sistema Solar", views: 312 },
          { id: 5, title: "História de Moçambique", views: 289 },
        ],
        mostDownloadedMaterials: [
          { id: 2, title: "Gramática Portuguesa", downloads: 185 },
          { id: 1, title: "Matemática Básica", downloads: 128 },
          { id: 7, title: "Guia de Estudo para Exames", downloads: 210 },
        ],
      },
      performance: {
        averageGrades: {
          Matemática: 14.2,
          Português: 15.5,
          Ciências: 16.1,
          História: 15.8,
          Geografia: 16.3,
          Inglês: 14.9,
        },
        passRate: 92.5,
        topPerformingClass: "10º Ano",
        improvementAreas: ["Matemática", "Inglês"],
      },
      system: {
        activeUsers: {
          daily: 320,
          weekly: 720,
          monthly: 820,
        },
        peakUsageTimes: ["10:00", "14:00", "19:00"],
        deviceUsage: {
          desktop: 45,
          mobile: 40,
          tablet: 15,
        },
      },
    }

    return NextResponse.json({ data: statistics })
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
