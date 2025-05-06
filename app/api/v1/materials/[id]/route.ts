import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, Material } from "@/types/api"
import prisma from "@/lib/prisma"
import { withAuth } from "@/lib/api-middleware"

// GET /api/v1/materials/:id - Obter um material específico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Buscar o material
    const material = await prisma.material.findUnique({
      where: { id },
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!material) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Material não encontrado",
        message: "O material solicitado não foi encontrado",
      }

      return NextResponse.json(response, { status: 404 })
    }

    // Formatar a resposta
    const formattedMaterial = {
      id: material.id,
      title: material.title,
      description: material.description,
      subject: material.subject,
      fileUrl: material.fileUrl,
      classTarget: material.classTarget,
      teacherId: material.teacherId,
      teacherName: material.teacher.name,
      uploadDate: material.uploadDate,
      downloads: material.downloads,
    }

    const response: ApiResponse<Material> = {
      success: true,
      data: formattedMaterial as Material,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching material:", error)

    const response: ApiResponse<null> = {
      success: false,
      error: "Falha ao buscar material",
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// PUT /api/v1/materials/:id - Atualizar um material (apenas o professor que criou ou admin)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (req, decodedToken) => {
    try {
      const id = params.id
      const body = await req.json()

      // Verificar se o material existe
      const existingMaterial = await prisma.material.findUnique({
        where: { id },
      })

      if (!existingMaterial) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Material não encontrado",
          message: "O material que você está tentando atualizar não foi encontrado",
        }

        return NextResponse.json(response, { status: 404 })
      }

      // Verificar se o usuário tem permissão (professor que criou ou admin)
      if (
        decodedToken.role !== "admin" &&
        decodedToken.role !== "superadmin" &&
        decodedToken.id !== existingMaterial.teacherId
      ) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Acesso negado",
          message: "Você não tem permissão para atualizar este material",
        }

        return NextResponse.json(response, { status: 403 })
      }

      // Atualizar o material
      const updatedMaterial = await prisma.material.update({
        where: { id },
        data: {
          title: body.title,
          description: body.description,
          subject: body.subject,
          fileUrl: body.fileUrl,
          classTarget: body.classTarget,
        },
        include: {
          teacher: {
            select: {
              name: true,
            },
          },
        },
      })

      // Formatar a resposta
      const formattedMaterial = {
        id: updatedMaterial.id,
        title: updatedMaterial.title,
        description: updatedMaterial.description,
        subject: updatedMaterial.subject,
        fileUrl: updatedMaterial.fileUrl,
        classTarget: updatedMaterial.classTarget,
        teacherId: updatedMaterial.teacherId,
        teacherName: updatedMaterial.teacher.name,
        uploadDate: updatedMaterial.uploadDate,
        downloads: updatedMaterial.downloads,
      }

      const response: ApiResponse<Material> = {
        success: true,
        data: formattedMaterial as Material,
        message: "Material atualizado com sucesso",
      }

      return NextResponse.json(response)
    } catch (error) {
      console.error("Error updating material:", error)

      const response: ApiResponse<null> = {
        success: false,
        error: "Falha ao atualizar material",
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      }

      return NextResponse.json(response, { status: 500 })
    }
  })
}

// DELETE /api/v1/materials/:id - Excluir um material (apenas o professor que criou ou admin)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (req, decodedToken) => {
    try {
      const id = params.id

      // Verificar se o material existe
      const existingMaterial = await prisma.material.findUnique({
        where: { id },
      })

      if (!existingMaterial) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Material não encontrado",
          message: "O material que você está tentando excluir não foi encontrado",
        }

        return NextResponse.json(response, { status: 404 })
      }

      // Verificar se o usuário tem permissão (professor que criou ou admin)
      if (
        decodedToken.role !== "admin" &&
        decodedToken.role !== "superadmin" &&
        decodedToken.id !== existingMaterial.teacherId
      ) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Acesso negado",
          message: "Você não tem permissão para excluir este material",
        }

        return NextResponse.json(response, { status: 403 })
      }

      // Excluir o material
      await prisma.material.delete({
        where: { id },
      })

      const response: ApiResponse<null> = {
        success: true,
        message: "Material excluído com sucesso",
      }

      return NextResponse.json(response)
    } catch (error) {
      console.error("Error deleting material:", error)

      const response: ApiResponse<null> = {
        success: false,
        error: "Falha ao excluir material",
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      }

      return NextResponse.json(response, { status: 500 })
    }
  })
}
