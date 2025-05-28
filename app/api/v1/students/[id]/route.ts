import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, Student } from "@/types/api"
import prisma from "@/lib/prisma"

// GET /api/v1/students/:id - Obter um aluno específico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Buscar o aluno
    const student = await prisma.user.findUnique({
      where: {
        id,
        role: "student",
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        class: true,
        grade: true,
        parentName: true,
        parentContact: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!student) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Aluno não encontrado",
        message: "O aluno solicitado não foi encontrado",
      }

      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<Student> = {
      success: true,
      data: student as Student,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching student:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao buscar aluno",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// PUT /api/v1/students/:id - Atualizar um aluno
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Verificar se o aluno existe
    const existingStudent = await prisma.user.findUnique({
      where: {
        id,
        role: "student",
      },
    })

    if (!existingStudent) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Aluno não encontrado",
        message: "O aluno que você está tentando atualizar não foi encontrado",
      }

      return NextResponse.json(response, { status: 404 })
    }

    // Verificar se o email já está em uso por outro usuário
    if (body.email && body.email !== existingStudent.email) {
      const emailInUse = await prisma.user.findUnique({
        where: { email: body.email },
      })

      if (emailInUse && emailInUse.id !== id) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Email já cadastrado",
          message: "Este email já está sendo utilizado por outro usuário",
        }

        return NextResponse.json(response, { status: 409 })
      }
    }

    // Atualizar o aluno
    const updatedStudent = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        profileImage: body.profileImage,
        class: body.class,
        grade: body.grade,
        parentName: body.parentName,
        parentContact: body.parentContact,
        status: body.status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        class: true,
        grade: true,
        parentName: true,
        parentContact: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    const response: ApiResponse<Student> = {
      success: true,
      data: updatedStudent as Student,
      message: "Aluno atualizado com sucesso",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error updating student:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao atualizar aluno",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE /api/v1/students/:id - Excluir um aluno
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verificar se o aluno existe
    const existingStudent = await prisma.user.findUnique({
      where: {
        id,
        role: "student",
      },
    })

    if (!existingStudent) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Aluno não encontrado",
        message: "O aluno que você está tentando excluir não foi encontrado",
      }

      return NextResponse.json(response, { status: 404 })
    }

    // Em vez de excluir permanentemente, podemos marcar como inativo
    await prisma.user.update({
      where: { id },
      data: { status: "inactive" },
    })

    const response: ApiResponse<null> = {
      success: true,
      message: "Aluno excluído com sucesso",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error deleting student:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao excluir aluno",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
