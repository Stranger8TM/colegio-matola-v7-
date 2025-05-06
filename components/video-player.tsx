"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, Settings } from "lucide-react"
import { formatVideoDuration } from "@/lib/video-service"
import { updateLessonProgress } from "@/lib/db-service"
import { motion } from "framer-motion"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  lessonId: string
  userId?: string
  initialProgress?: number
  onProgressUpdate?: (progress: number, completed: boolean) => void
  autoPlay?: boolean
  className?: string
}

export function VideoPlayer({
  videoUrl,
  title,
  lessonId,
  userId,
  initialProgress = 0,
  onProgressUpdate,
  autoPlay = false,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [loading, setLoading] = useState(true)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastProgressUpdateRef = useRef<number>(0)

  // Inicializar o vídeo
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setLoading(false)

      // Definir o tempo inicial com base no progresso salvo
      if (initialProgress > 0 && initialProgress < 0.98) {
        video.currentTime = video.duration * initialProgress
        setCurrentTime(video.currentTime)
      }

      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay foi bloqueado pelo navegador
          setIsPlaying(false)
        })
      }
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [videoUrl, initialProgress, autoPlay])

  // Configurar o intervalo de atualização de progresso
  useEffect(() => {
    if (!userId || !lessonId) return

    progressUpdateIntervalRef.current = setInterval(() => {
      const video = videoRef.current
      if (!video || video.paused) return

      const currentProgress = video.currentTime / video.duration

      // Só atualizar se o progresso mudou significativamente (mais de 1%)
      if (Math.abs(currentProgress - lastProgressUpdateRef.current) > 0.01) {
        lastProgressUpdateRef.current = currentProgress

        const completed = currentProgress >= 0.98

        // Atualizar o progresso no banco de dados
        updateLessonProgress({
          userId,
          lessonId,
          progress: currentProgress,
          completed,
        }).catch(console.error)

        if (onProgressUpdate) {
          onProgressUpdate(currentProgress, completed)
        }
      }
    }, 5000) // Atualizar a cada 5 segundos

    return () => {
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current)
      }
    }
  }, [userId, lessonId, onProgressUpdate])

  // Configurar o timeout para esconder os controles
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(console.error)
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return

    video.volume = newVolume
    setVolume(newVolume)

    if (newVolume === 0) {
      video.muted = true
      setIsMuted(true)
    } else if (isMuted) {
      video.muted = false
      setIsMuted(false)
    }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return

    setCurrentTime(video.currentTime)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return

    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleFullscreen = () => {
    const videoContainer = document.getElementById("video-container")
    if (!videoContainer) return

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error)
    } else {
      videoContainer.requestFullscreen().catch(console.error)
    }
  }

  const skipForward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.min(video.duration, video.currentTime + 10)
  }

  const skipBackward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, video.currentTime - 10)
  }

  const handlePlaybackRateChange = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)

    if (userId && lessonId) {
      // Marcar como concluído quando o vídeo terminar
      updateLessonProgress({
        userId,
        lessonId,
        progress: 1,
        completed: true,
      }).catch(console.error)

      if (onProgressUpdate) {
        onProgressUpdate(1, true)
      }
    }
  }

  return (
    <div
      id="video-container"
      className={`relative w-full bg-black rounded-lg overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playsInline
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-white font-medium truncate">{title}</div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-white text-xs">
            <div>{formatVideoDuration(currentTime)}</div>
            <div>{formatVideoDuration(duration)}</div>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #9ca3af ${(currentTime / (duration || 1)) * 100}%)`,
            }}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={skipBackward}
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Voltar 10 segundos"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={skipForward}
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Avançar 10 segundos"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowVolumeControl(!showVolumeControl)}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label={isMuted ? "Ativar som" : "Desativar som"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>

                {showVolumeControl && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 rounded-lg p-2 w-32">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 ${volume * 100}%, #9ca3af ${volume * 100}%)`,
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="Configurações"
                >
                  <Settings className="h-5 w-5" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg p-2 w-48">
                    <div className="text-white text-xs font-medium mb-1">Velocidade de reprodução</div>
                    <div className="grid grid-cols-3 gap-1">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handlePlaybackRateChange(rate)}
                          className={`text-xs py-1 px-2 rounded ${
                            playbackRate === rate
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                        >
                          {rate === 1 ? "Normal" : `${rate}x`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleFullscreen}
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Tela cheia"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
