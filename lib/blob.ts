import { put, del, list, type PutBlobResult } from "@vercel/blob"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Tipos para os arquivos
export type FileType = "image" | "document" | "video" | "audio" | "other"

export interface FileMetadata {
  filename: string
  contentType: string
  size: number
  uploadedBy: string
  category?: string
  description?: string
  type: FileType
  createdAt: Date
}

// Função para fazer upload de um arquivo para o Blob Storage
export async function uploadFile(
  file: File,
  category?: string,
  description?: string,
): Promise<PutBlobResult & { metadata: FileMetadata }> {
  try {
    // Obter a sessão do usuário
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      throw new Error("Usuário não autenticado")
    }

    // Determinar o tipo de arquivo
    const fileType = getFileType(file.type)

    // Gerar um nome de arquivo único
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    // Fazer upload do arquivo para o Blob Storage
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
      metadata: {
        uploadedBy: session.user.email,
        category: category || "uncategorized",
        description: description || "",
        type: fileType,
        originalName: file.name,
        size: file.size.toString(),
        createdAt: new Date().toISOString(),
      },
    })

    // Retornar o resultado com metadados
    return {
      ...blob,
      metadata: {
        filename: blob.pathname,
        contentType: file.type,
        size: file.size,
        uploadedBy: session.user.email,
        category,
        description,
        type: fileType,
        createdAt: new Date(),
      },
    }
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error)
    throw error
  }
}

// Função para excluir um arquivo do Blob Storage
export async function deleteFile(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Erro ao excluir o arquivo:", error)
    throw error
  }
}

// Função para listar arquivos do Blob Storage
export async function listFiles(prefix?: string): Promise<PutBlobResult[]> {
  try {
    const { blobs } = await list({ prefix })
    return blobs
  } catch (error) {
    console.error("Erro ao listar arquivos:", error)
    throw error
  }
}

// Função auxiliar para determinar o tipo de arquivo
function getFileType(mimeType: string): FileType {
  if (mimeType.startsWith("image/")) {
    return "image"
  } else if (mimeType.startsWith("video/")) {
    return "video"
  } else if (mimeType.startsWith("audio/")) {
    return "audio"
  } else if (
    mimeType === "application/pdf" ||
    mimeType.includes("document") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("presentation")
  ) {
    return "document"
  } else {
    return "other"
  }
}
