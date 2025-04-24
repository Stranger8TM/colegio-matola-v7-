/**
 * Serviço para gerenciar arquivos no Blob Storage
 * Desenvolvido por Gabriel Vieira
 */

import { uploadFile, deleteFile, type FileMetadata } from "@/lib/blob"
import prisma from "@/lib/prisma"

// Interface para o resultado do upload
export interface UploadResult {
  url: string
  filename: string
  metadata: FileMetadata
}

// Função para fazer upload de um arquivo e salvar no banco de dados
export async function uploadAndSaveFile(
  file: File,
  userId: string,
  category?: string,
  description?: string,
): Promise<UploadResult> {
  try {
    // Fazer upload do arquivo para o Blob Storage
    const result = await uploadFile(file, category, description)

    // Salvar os metadados do arquivo no banco de dados
    await prisma.file.create({
      data: {
        url: result.url,
        filename: result.metadata.filename,
        contentType: result.metadata.contentType,
        size: result.metadata.size,
        uploadedBy: result.metadata.uploadedBy,
        category: result.metadata.category,
        description: result.metadata.description,
        type: result.metadata.type,
        createdAt: result.metadata.createdAt,
      },
    })

    // Retornar o resultado
    return {
      url: result.url,
      filename: result.metadata.filename,
      metadata: result.metadata,
    }
  } catch (error) {
    console.error("Erro ao fazer upload e salvar arquivo:", error)
    throw error
  }
}

// Função para excluir um arquivo e remover do banco de dados
export async function deleteAndRemoveFile(url: string): Promise<void> {
  try {
    // Excluir o arquivo do Blob Storage
    await deleteFile(url)

    // Remover os metadados do arquivo do banco de dados
    await prisma.file.delete({
      where: {
        url,
      },
    })
  } catch (error) {
    console.error("Erro ao excluir e remover arquivo:", error)
    throw error
  }
}

// Função para listar arquivos do banco de dados
export async function listFilesFromDatabase(type?: string, category?: string, uploadedBy?: string): Promise<any[]> {
  try {
    // Construir a consulta
    const where: any = {}
    if (type) where.type = type
    if (category) where.category = category
    if (uploadedBy) where.uploadedBy = uploadedBy

    // Buscar os arquivos no banco de dados
    const files = await prisma.file.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    })

    return files
  } catch (error) {
    console.error("Erro ao listar arquivos do banco de dados:", error)
    throw error
  }
}
