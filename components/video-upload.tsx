"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  X,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { uploadVideo, formatFileSize, getVideoDuration, formatVideoDuration } from "@/lib/video-service"
import { motion, AnimatePresence } from "framer-motion"

interface VideoUploadProps {
  onUploadComplete: (videoData: any) => void
  folder?: string
  maxSize?: number // em bytes
  className?: string
}

export function VideoUpload({
  onUploadComplete,
  folder = "videos",
  maxSize = 500 * 1024 * 1024, // 500MB por padrão
  className,
}: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [videoDuration, setVideoDuration] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

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
    if (!file.type.includes("video/")) {
      setError(`Tipo de arquivo não permitido. Por favor, envie um arquivo de vídeo.`)
      return
    }

    // Verificar tamanho do arquivo
    if (file.size > maxSize) {
      setError(`Arquivo muito grande. O tamanho máximo permitido é ${formatFileSize(maxSize)}.`)
      return
    }

    setFile(file)
    const url = URL.createObjectURL(file)
    setVideoPreviewUrl(url)

    // Obter duração do vídeo
    getVideoDuration(url)
      .then((duration) => {
        setVideoDuration(duration)
      })
      .catch((err) => {
        console.error("Erro ao obter duração do vídeo:", err)
      })
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
    }, 500)

    try {
      const result = await uploadVideo(file, folder)

      if (result.success) {
        setProgress(100)
        setSuccess(true)
        onUploadComplete({
          ...result,
          duration: videoDuration || 0,
        })
      } else {
        setError(result.error || "Falha ao fazer upload do vídeo")
      }
    } catch (error) {
      setError("Ocorreu um erro durante o upload. Tente novamente.")
    } finally {
      setUploading(false)
    }
  }

  const resetUpload = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl)
    }
    setFile(null)
    setVideoPreviewUrl(null)
    setVideoDuration(null)
    setProgress(0)
    setError(null)
    setSuccess(false)
    setIsPlaying(false)
    setCurrentTime(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  useEffect(() => {
    return () => {
      // Limpar URL do objeto quando o componente for desmontado
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl)
      }
    }
  }, [videoPreviewUrl])

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
              <Video className="h-10 w-10 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
                <span className="font-medium text-blue-600 dark:text-blue-400">Clique para fazer upload</span> ou
                arraste e solte
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Arquivos de vídeo (MP4, WebM, MOV) (Máx. {formatFileSize(maxSize)})
              </p>
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="video/*" />
              <Button variant="outline" size="sm" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                Selecionar vídeo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {videoPreviewUrl && (
                <div className="relative w-full bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    src={videoPreviewUrl}
                    className="w-full h-auto max-h-[300px] object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-white text-xs">
                        {formatVideoDuration(currentTime)} /{" "}
                        {videoDuration ? formatVideoDuration(videoDuration) : "00:00"}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={toggleMute} className="text-white hover:text-blue-400 transition-colors">
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                        <button onClick={handleFullscreen} className="text-white hover:text-blue-400 transition-colors">
                          <Maximize className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max={videoDuration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 ${(currentTime / (videoDuration || 1)) * 100}%, #9ca3af ${(currentTime / (videoDuration || 1)) * 100}%)`,
                      }}
                    />

                    <div className="flex items-center justify-center mt-2 space-x-4">
                      <button onClick={skipBackward} className="text-white hover:text-blue-400 transition-colors">
                        <SkipBack className="h-5 w-5" />
                      </button>
                      <button
                        onClick={togglePlay}
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                      >
                        {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                      </button>
                      <button onClick={skipForward} className="text-white hover:text-blue-400 transition-colors">
                        <SkipForward className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {formatFileSize(file.size)} •{" "}
                      {videoDuration ? formatVideoDuration(videoDuration) : "Carregando..."}
                    </p>
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
                      {uploading ? "Enviando..." : "Enviar vídeo"}
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
