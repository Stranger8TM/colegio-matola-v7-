"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface FileUploadProps {
  onUploadComplete?: (file: any) => void
  allowedTypes?: string[]
  maxSize?: number // em bytes
  category?: string
}

export function FileUpload({
  onUploadComplete,
  allowedTypes = ["image/*", "application/pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"],
  maxSize = 5 * 1024 * 1024, // 5MB por padrão
  category = "general",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)
    setSuccess(false)

    if (!selectedFile) {
      setFile(null)
      setPreview(null)
      return
    }

    // Verificar o tipo de arquivo
    const fileType = selectedFile.type
    const isAllowedType = allowedTypes.some((type) => {
      if (type.includes("*")) {
        return fileType.startsWith(type.split("/")[0])
      }
      return type === fileType || selectedFile.name.endsWith(type)
    })

    if (!isAllowedType) {
      setError(`Tipo de arquivo não permitido. Tipos permitidos: ${allowedTypes.join(", ")}`)
      return
    }

    // Verificar o tamanho do arquivo
    if (selectedFile.size > maxSize) {
      setError(`Arquivo muito grande. Tamanho máximo: ${maxSize / (1024 * 1024)}MB`)
      return
    }

    setFile(selectedFile)

    // Criar preview para imagens
    if (fileType.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Nenhum arquivo selecionado")
      return
    }

    setIsUploading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", category)
      formData.append("description", description)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao fazer upload do arquivo")
      }

      const data = await response.json()
      setSuccess(true)

      if (onUploadComplete) {
        onUploadComplete(data)
      }

      // Limpar o formulário
      setFile(null)
      setPreview(null)
      setDescription("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer upload do arquivo")
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setFile(null)
    setPreview(null)
    setDescription("")
    setError(null)
    setSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Upload de Arquivo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!file ? (
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Clique para selecionar ou arraste um arquivo aqui
            </p>
            <p className="text-xs text-gray-400 mt-2">Tipos permitidos: {allowedTypes.join(", ")}</p>
            <p className="text-xs text-gray-400">Tamanho máximo: {maxSize / (1024 * 1024)}MB</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={allowedTypes.join(",")}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {preview ? (
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCancel} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Adicione uma descrição para o arquivo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
        )}

        {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

        {success && (
          <div className="flex items-center text-sm text-green-500 mt-2">
            <Check className="h-4 w-4 mr-1" />
            Arquivo enviado com sucesso!
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {file && (
          <>
            <Button variant="outline" onClick={handleCancel} disabled={isUploading}>
              Cancelar
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
