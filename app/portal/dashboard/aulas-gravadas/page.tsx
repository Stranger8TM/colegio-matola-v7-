"use client"

import { AvatarFallback } from "@/components/ui/avatar"

import { AvatarImage } from "@/components/ui/avatar"

import { Avatar } from "@/components/ui/avatar"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"
import { Search, Play, Clock, CheckCircle, BookOpen, Filter, SortAsc, SortDesc } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getUserById, getAllRecordedLessons, getLessonProgress, updateLessonProgress } from "@/lib/db-service"
import { formatDate } from "@/lib/utils"
import { formatVideoDuration } from "@/lib/video-service"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function StudentRecordedLessonsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [lessonProgress, setLessonProgress] = useState<Record<string, { progress: number; completed: boolean }>>({})
  const [sortBy, setSortBy] = useState<"date" | "title">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterSubject, setFilterSubject] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Verificar se o aluno está logado
    const userId = localStorage.getItem("userId")
    if (!userId) {
      router.push("/portal")
      return
    }

    // Carregar dados do aluno
    const loadUserData = async () => {
      try {
        const userData = await getUserById(userId)
        if (userData) {
          setUser(userData)

          // Carregar aulas gravadas para a classe do aluno
          const userLessons = await getAllRecordedLessons(userData.class)
          setLessons(userLessons)

          // Carregar progresso das aulas
          const progressMap: Record<string, { progress: number; completed: boolean }> = {}

          for (const lesson of userLessons) {
            try {
              const progress = await getLessonProgress(userId, lesson.id)
              if (progress) {
                progressMap[lesson.id] = {
                  progress: progress.progress,
                  completed: progress.completed,
                }
              } else {
                progressMap[lesson.id] = {
                  progress: 0,
                  completed: false,
                }
              }
            } catch (error) {
              console.error(`Erro ao carregar progresso da aula ${lesson.id}:`, error)
              progressMap[lesson.id] = {
                progress: 0,
                completed: false,
              }
            }
          }

          setLessonProgress(progressMap)
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados. Tente novamente.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  // Função para atualizar o progresso da aula
  const handleProgressUpdate = async (lessonId: string, progress: number, completed: boolean) => {
    if (!user) return

    try {
      await updateLessonProgress({
        userId: user.id,
        lessonId,
        progress,
        completed,
      })

      setLessonProgress({
        ...lessonProgress,
        [lessonId]: { progress, completed },
      })
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error)
    }
  }

  // Obter lista de disciplinas únicas
  const subjects = [...new Set(lessons.map((lesson) => lesson.subject))]

  // Filtrar e ordenar aulas
  let filteredLessons = lessons.filter(
    (lesson) =>
      (lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!filterSubject || lesson.subject === filterSubject),
  )

  // Ordenar aulas
  filteredLessons = filteredLessons.sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.uploadDate).getTime()
      const dateB = new Date(b.uploadDate).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    } else {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Você precisa estar logado para acessar esta página.</p>
          <Button onClick={() => router.push("/portal")}>Voltar para o Login</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Aulas Gravadas</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Assista às aulas gravadas pelos seus professores</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="flex items-center"
              >
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
                {sortBy === "date" ? "Data" : "Título"}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Ordenar por
                        </label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as "date" | "title")}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="date">Data de publicação</option>
                          <option value="title">Título</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Disciplina
                        </label>
                        <select
                          value={filterSubject || ""}
                          onChange={(e) => setFilterSubject(e.target.value || null)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">Todas as disciplinas</option>
                          {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setFilterSubject(null)
                            setSortBy("date")
                            setSortOrder("desc")
                          }}
                        >
                          Limpar filtros
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Barra de pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar aulas gravadas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Lista de aulas */}
          <div className="space-y-4">
            {selectedLesson ? (
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedLesson.title}</CardTitle>
                      <CardDescription>
                        {selectedLesson.subject} • {formatDate(new Date(selectedLesson.uploadDate))}
                      </CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedLesson(null)}>
                      Voltar para a lista
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <VideoPlayer
                      videoUrl={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      lessonId={selectedLesson.id}
                      userId={user.id}
                      initialProgress={lessonProgress[selectedLesson.id]?.progress || 0}
                      onProgressUpdate={(progress, completed) =>
                        handleProgressUpdate(selectedLesson.id, progress, completed)
                      }
                      className="w-full rounded-lg overflow-hidden"
                    />

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Descrição da Aula</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedLesson.description || "Nenhuma descrição disponível para esta aula."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={selectedLesson.teacher?.profileImage || "/placeholder.svg?height=32&width=32"}
                          />
                          <AvatarFallback>{selectedLesson.teacher?.name?.charAt(0) || "P"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {selectedLesson.teacher?.name || "Professor"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Professor de {selectedLesson.subject}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Material complementar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {filteredLessons.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchQuery || filterSubject
                        ? "Nenhuma aula encontrada para esta pesquisa"
                        : "Nenhuma aula disponível para sua turma ainda"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredLessons.map((lesson) => {
                      const progress = lessonProgress[lesson.id] || { progress: 0, completed: false }

                      return (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div
                            className="relative h-40 bg-gray-200 dark:bg-gray-700 cursor-pointer"
                            onClick={() => setSelectedLesson(lesson)}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/50 rounded-full p-3">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {formatVideoDuration(lesson.duration)}
                            </div>
                            {progress.progress > 0 && (
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600">
                                <div
                                  className={`h-full ${progress.completed ? "bg-green-500" : "bg-blue-500"}`}
                                  style={{ width: `${progress.progress * 100}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
                                  {lesson.subject}
                                </span>
                                {progress.completed && (
                                  <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs font-medium rounded-full">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Concluído
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(new Date(lesson.uploadDate))}
                              </span>
                            </div>
                            <h3
                              className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-2 cursor-pointer hover:underline"
                              onClick={() => setSelectedLesson(lesson)}
                            >
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
                              {lesson.description || "Sem descrição"}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatVideoDuration(lesson.duration)}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => setSelectedLesson(lesson)}
                              >
                                {progress.progress > 0 && !progress.completed
                                  ? "Continuar"
                                  : progress.completed
                                    ? "Rever"
                                    : "Assistir"}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Estatísticas */}
          <Card className="border-0 shadow-md mt-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
              <CardTitle>Seu Progresso</CardTitle>
              <CardDescription>Acompanhe seu progresso nas aulas gravadas</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total de Aulas</p>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-400">{lessons.length}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Aulas Concluídas</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-400">
                        {Object.values(lessonProgress).filter((p) => p.completed).length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Progresso Geral</p>
                      <p className="text-2xl font-bold text-purple-800 dark:text-purple-400">
                        {lessons.length > 0
                          ? `${Math.round((Object.values(lessonProgress).filter((p) => p.completed).length / lessons.length) * 100)}%`
                          : "0%"}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Produzido por Gabriel Vieira - Versão 2.1.0</p>
                <p className="mt-1">Continue assistindo às aulas para melhorar seu desempenho!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <Toaster />
    </main>
  )
}
