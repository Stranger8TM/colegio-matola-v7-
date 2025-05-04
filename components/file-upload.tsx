"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, X, FileText, File, ImageIcon, CheckCircle, AlertCircle } from "lucide-react"
import { uploadFile, getFileIcon, formatFileSize } from "@/lib/upload-service"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploadProps {
  onUploadComplete: (fileData: any) => void
  folder?: string
  allowedTypes?: string
  maxSize?: number // em bytes
  className?: string
}

export function FileUpload({
  onUploadComplete,
  folder = "general",
  allowedTypes = "*",
  maxSize = 10 * 1024 * 1024, // 10MB por padrão
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    setError(null)

    // Verificar tipo de arquivo
    if (allowedTypes !== "*" && !file.type.match(allowedTypes)) {
      setError(`Tipo de arquivo não permitido. Por favor, envie ${allowedTypes.replace("*", "")}.`)
      return
    }

    // Verificar tamanho do arquivo
    if (file.size > maxSize) {
      setError(`Arquivo muito grande. O tamanho máximo permitido é ${formatFileSize(maxSize)}.`)
      return
    }

    setFile(file)
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)
    setError(null)
    setSuccess(false)

    // Simular progresso de upload
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + 5
      })
    }, 100)

    try {
      const result = await uploadFile(file, folder)

      if (result.success) {
        setProgress(100)
        setSuccess(true)
        onUploadComplete(result)
      } else {
        setError(result.error || "Falha ao fazer upload do arquivo")
      }
    } catch (error) {
      setError("Ocorreu um erro durante o upload. Tente novamente.")
    } finally {
      setUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setProgress(0)
    setError(null)
    setSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFilePreview = () => {
    if (!file) return null

    const fileType = file.type

    if (fileType.includes("image")) {
      return (
        <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={URL.createObjectURL(file) || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </div>
      )
    }

    const icon = getFileIcon(fileType)
    let IconComponent = File

    if (icon === "pdf") IconComponent = FileText
    if (icon === "image") IconComponent = ImageIcon

    return (
      <div className="flex items-center justify-center w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <IconComponent className="h-16 w-16 text-gray-400" />
      </div>
    )
  }

  return (
    <Card
      className={`border border-dashed ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" : "border-gray-300 dark:border-gray-700"} ${className}`}
    >
      <CardContent className="p-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="focus:outline-none"
        >
          {!file ? (
            <div className="flex flex-col items-center justify-center py-6">
              <Upload className="h-10 w-10 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
                <span className="font-medium text-blue-600 dark:text-blue-400">Clique para fazer upload</span> ou
                arraste e solte
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {allowedTypes === "*"
                  ? "Qualquer tipo de arquivo"
                  : `${allowedTypes.replace("*", "").replace("/", "").toUpperCase()}`}{" "}
                (Máx. {formatFileSize(maxSize)})
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept={allowedTypes}
              />
              <Button variant="outline" size="sm" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                Selecionar arquivo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {getFilePreview()}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{formatFileSize(file.size)}</p>
                  </div>

                  <Button variant="ghost" size="sm" onClick={resetUpload} disabled={uploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {(uploading || success) && <Progress value={progress} className="h-2" />}

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-red-600 text-xs"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {error}
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-green-600 text-xs"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Upload concluído com sucesso!
                    </motion.div>
                  )}
                </AnimatePresence>

                {!success && (
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-blue-800 hover:bg-blue-700"
                    >
                      {uploading ? "Enviando..." : "Enviar arquivo"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
