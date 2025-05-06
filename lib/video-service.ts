import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"

/**
 * Faz upload de um vídeo para o Vercel Blob
 * @param file Arquivo de vídeo
 * @param folder Pasta para armazenar o vídeo
 * @returns Informações do upload
 */
export async function uploadVideo(file: File, folder = "videos") {
  try {
    // Gerar um nome único para o arquivo
    const filename = `${folder}/${uuidv4()}-${file.name.replace(/\s+/g, "-")}`

    // Fazer upload para o Vercel Blob
    const { url } = await put(filename, file, {
      access: "public",
      contentType: file.type,
    })

    return {
      success: true,
      url,
      filename,
      size: file.size,
      type: file.type,
    }
  } catch (error) {
    console.error("Erro ao fazer upload do vídeo:", error)
    return {
      success: false,
      error: "Falha ao fazer upload do vídeo. Tente novamente.",
    }
  }
}

/**
 * Formata o tamanho do arquivo para exibição
 * @param bytes Tamanho em bytes
 * @returns String formatada do tamanho
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Obtém o ícone apropriado para o tipo de arquivo
 * @param fileType Tipo MIME do arquivo
 * @returns Nome do ícone
 */
export function getFileIcon(fileType: string): string {
  if (fileType.includes("video")) return "video"
  if (fileType.includes("audio")) return "audio"
  if (fileType.includes("image")) return "image"
  if (fileType.includes("pdf")) return "pdf"
  if (fileType.includes("word") || fileType.includes("document")) return "doc"
  if (fileType.includes("excel") || fileType.includes("sheet")) return "excel"
  if (fileType.includes("powerpoint") || fileType.includes("presentation")) return "ppt"
  if (fileType.includes("zip") || fileType.includes("compressed")) return "zip"

  return "file"
}

/**
 * Obtém a duração de um vídeo
 * @param videoUrl URL do vídeo
 * @returns Promessa com a duração em segundos
 */
export function getVideoDuration(videoUrl: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.src = videoUrl
    video.onloadedmetadata = () => {
      resolve(video.duration)
    }
    video.onerror = () => {
      reject(new Error("Erro ao carregar metadados do vídeo"))
    }
  })
}

/**
 * Formata a duração do vídeo para exibição
 * @param seconds Duração em segundos
 * @returns String formatada da duração
 */
export function formatVideoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return `${minutes}:${secs.toString().padStart(2, "0")}`
}
