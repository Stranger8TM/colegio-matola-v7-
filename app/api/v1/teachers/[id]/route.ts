import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, Teacher } from "@/types/api"
import prisma from "@/lib/prisma"
import { withAuth, withAdminAuth } from "@/lib/api-middleware"

// GET /api/v1/teachers/:id - Obter um professor específico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Buscar o professor
    const teacher = await prisma.user.findUnique({
      where: {
        id,
        role: "teacher",
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        subject: true,
        bio: true,
        qualifications: true,
        hireDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!teacher) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Professor não encontrado",
        message: "O professor solicitado não foi encontrado",
      }

      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<Teacher> = {
      success: true,
      data: teacher as Teacher,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching teacher:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao buscar professor",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// PUT /api/v1/teachers/:id - Atualizar um professor (apenas admin ou o próprio professor)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (req, decodedToken) => {
    try {
      const id = params.id
      const body = await req.json()

      // Verificar se o usuário tem permissão (admin ou o próprio professor)
      if (decodedToken.role !== "admin" && decodedToken.role !== "superadmin" && decodedToken.id !== id) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Acesso negado",
          message: "Você não tem permissão para atualizar este professor",
        }

        return NextResponse.json(response, { status: 403 })
      }

      // Verificar se o professor existe
      const existingTeacher = await prisma.user.findUnique({
        where: {
          id,
          role: "teacher",
        },
      })

      if (!existingTeacher) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Professor não encontrado",
          message: "O professor que você está tentando atualizar não foi encontrado",
        }

        return NextResponse.json(response, { status: 404 })
      }

      // Verificar se o email já está em uso por outro usuário
      if (body.email && body.email !== existingTeacher.email) {
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

      // Definir os campos que podem ser atualizados
      const updateData: any = {}

      // Campos que qualquer professor pode atualizar sobre si mesmo
      if (body.name) updateData.name = body.name
      if (body.email) updateData.email = body.email
      if (body.profileImage) updateData.profileImage = body.profileImage
      if (body.bio) updateData.bio = body.bio

      // Campos que apenas administradores podem atualizar
      if (decodedToken.role === "admin" || decodedToken.role === "superadmin") {
        if (body.subject) updateData.subject = body.subject
        if (body.qualifications) updateData.qualifications = body.qualifications
        if (body.hireDate) updateData.hireDate = new Date(body.hireDate)
        if (body.status) updateData.status = body.status
      }

      // Atualizar o professor
      const updatedTeacher = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
          subject: true,
          bio: true,
          qualifications: true,
          hireDate: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      const response: ApiResponse<Teacher> = {
        success: true,
        data: updatedTeacher as Teacher,
        message: "Professor atualizado com sucesso",
      }

      return NextResponse.json(response)
    } catch (error) {
      console.error("Error updating teacher:", error)

      const response: ApiResponse<null> = {
        success: false,
        error: "Falha ao atualizar professor",
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      }

      return NextResponse.json(response, { status: 500 })
    }
  })
}

// DELETE /api/v1/teachers/:id - Excluir um professor (apenas admin)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return withAdminAuth(request, async (req, decodedToken) => {
    try {
      const id = params.id

      // Verificar se o professor existe
      const existingTeacher = await prisma.user.findUnique({
        where: {
          id,
          role: "teacher",
        },
      })

      if (!existingTeacher) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Professor não encontrado",
          message: "O professor que você está tentando excluir não foi encontrado",
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
        message: "Professor excluído com sucesso",
      }

      return NextResponse.json(response)
    } catch (error) {
      console.error("Error deleting teacher:", error)

      const response: ApiResponse<null> = {
        success: false,
        error: "Falha ao excluir professor",
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      }

      return NextResponse.json(response, { status: 500 })
    }
  })
}
