import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadFile(file: File, folder = "general") {
  try {
    // Gerar um nome de arquivo único
    const fileExtension = file.name.split(".").pop()
    const fileName = `${folder}/${nanoid()}.${fileExtension}`

    // Upload para o Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
    })

    return {
      success: true,
      url: blob.url,
      fileName: blob.pathname,
      size: file.size,
      type: file.type,
    }
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error)
    return {
      success: false,
      error: "Falha ao fazer upload do arquivo",
    }
  }
}

export function getFileIcon(fileType: string) {
  if (fileType.includes("pdf")) {
    return "pdf"
  } else if (fileType.includes("word") || fileType.includes("doc")) {
    return "doc"
  } else if (fileType.includes("excel") || fileType.includes("sheet") || fileType.includes("xls")) {
    return "xls"
  } else if (fileType.includes("powerpoint") || fileType.includes("presentation") || fileType.includes("ppt")) {
    return "ppt"
  } else if (fileType.includes("image")) {
    return "image"
  } else if (fileType.includes("text")) {
    return "txt"
  } else if (fileType.includes("zip") || fileType.includes("rar") || fileType.includes("compressed")) {
    return "zip"
  } else {
    return "file"
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
