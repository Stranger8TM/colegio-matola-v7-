"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VideoUpload } from "@/components/video-upload"
import { VideoPlayer } from "@/components/video-player"
import { Video, Plus, Trash2, Edit, Search, Eye, Users, X, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  getTeacherById,
  getRecordedLessonsByTeacher,
  addRecordedLesson,
  deleteRecordedLesson,
  updateRecordedLesson,
} from "@/lib/db-service"
import { formatDate } from "@/lib/utils"
import { formatVideoDuration } from "@/lib/video-service"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function RecordedLessonsPage() {
  const router = useRouter()
  const [teacher, setTeacher] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadingLesson, setUploadingLesson] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [editingLesson, setEditingLesson] = useState<string | null>(null)

  // Estados para o formulário de aula
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: 0,
    classTarget: "8ª Classe",
  })

  // Estados para edição de aula
  const [editedLesson, setEditedLesson] = useState({
    title: "",
    description: "",
    classTarget: "",
  })

  useEffect(() => {
    // Verificar se o professor está logado
    const teacherId = localStorage.getItem("teacherId")
    if (!teacherId) {
      router.push("/professores")
      return
    }

    // Carregar dados do professor
    const loadTeacherData = async () => {
      try {
        const teacherData = await getTeacherById(teacherId)
        if (teacherData) {
          setTeacher(teacherData)

          // Carregar aulas gravadas do professor
          const teacherLessons = await getRecordedLessonsByTeacher(teacherId)
          setLessons(teacherLessons)
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

    loadTeacherData()
  }, [router])

  // Função para adicionar nova aula gravada
  const handleAddLesson = async () => {
    if (!teacher || !newLesson.videoUrl) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos e faça upload do vídeo.",
        variant: "destructive",
      })
      return
    }

    try {
      const lesson = await addRecordedLesson({
        title: newLesson.title,
        description: newLesson.description,
        subject: teacher.subject,
        videoUrl: newLesson.videoUrl,
        thumbnailUrl: newLesson.thumbnailUrl,
        duration: newLesson.duration,
        classTarget: newLesson.classTarget,
        teacherId: teacher.id,
      })

      setLessons([lesson, ...lessons])
      setUploadingLesson(false)

      // Limpar formulário
      setNewLesson({
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        duration: 0,
        classTarget: "8ª Classe",
      })

      toast({
        title: "Aula adicionada",
        description: "A aula foi adicionada com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao adicionar aula:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a aula. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para excluir aula
  const handleDeleteLesson = async (id: string) => {
    try {
      await deleteRecordedLesson(id)
      setLessons(lessons.filter((lesson) => lesson.id !== id))
      toast({
        title: "Aula excluída",
        description: "A aula foi excluída com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao excluir aula:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a aula. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para atualizar aula
  const handleUpdateLesson = async (id: string) => {
    try {
      const updatedLesson = await updateRecordedLesson(id, editedLesson)
      setLessons(lessons.map((lesson) => (lesson.id === id ? { ...lesson, ...updatedLesson } : lesson)))
      setEditingLesson(null)
      toast({
        title: "Aula atualizada",
        description: "A aula foi atualizada com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao atualizar aula:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a aula. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para lidar com o upload de vídeo
  const handleVideoUploadComplete = (videoData: any) => {
    if (videoData.success) {
      setNewLesson({
        ...newLesson,
        videoUrl: videoData.url,
        duration: videoData.duration,
      })
      toast({
        title: "Upload concluído",
        description: "O vídeo foi enviado com sucesso.",
        variant: "default",
      })
    }
  }

  // Filtrar aulas com base na pesquisa
  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Você precisa estar logado para acessar esta página.</p>
          <Button onClick={() => router.push("/professores")}>Voltar para o Login</Button>
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
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gerencie suas aulas gravadas e disponibilize para os alunos
              </p>
            </div>
            <Button className="bg-blue-800 hover:bg-blue-700" onClick={() => setUploadingLesson(!uploadingLesson)}>
              {uploadingLesson ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Aula
                </>
              )}
            </Button>
          </div>

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

          {/* Formulário para adicionar nova aula */}
          <AnimatePresence>
            {uploadingLesson && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-blue-100 dark:border-blue-900/20">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-3">
                    <CardTitle className="text-lg">Adicionar Nova Aula Gravada</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Título da Aula
                        </label>
                        <input
                          type="text"
                          value={newLesson.title}
                          onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Ex: Introdução à Álgebra Linear"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Turma Alvo
                        </label>
                        <select
                          value={newLesson.classTarget}
                          onChange={(e) => setNewLesson({ ...newLesson, classTarget: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="8ª Classe">8ª Classe</option>
                          <option value="9ª Classe">9ª Classe</option>
                          <option value="10ª Classe">10ª Classe</option>
                          <option value="11ª Classe">11ª Classe</option>
                          <option value="12ª Classe">12ª Classe</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição
                      </label>
                      <textarea
                        value={newLesson.description}
                        onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Breve descrição da aula..."
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Vídeo da Aula
                      </label>
                      <VideoUpload onUploadComplete={handleVideoUploadComplete} folder="recorded-lessons" />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        className="bg-blue-800 hover:bg-blue-700"
                        onClick={handleAddLesson}
                        disabled={!newLesson.videoUrl || !newLesson.title}
                      >
                        Adicionar Aula
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lista de aulas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Aulas Publicadas</h3>

            {filteredLessons.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery ? "Nenhuma aula encontrada para esta pesquisa" : "Nenhuma aula publicada ainda"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLessons.map((lesson) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {selectedLesson?.id === lesson.id ? (
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400">{lesson.title}</h3>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedLesson(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <VideoPlayer
                          videoUrl={lesson.videoUrl}
                          title={lesson.title}
                          lessonId={lesson.id}
                          className="mb-3"
                        />
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{lesson.description}</p>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => setSelectedLesson(null)}>
                            Fechar
                          </Button>
                        </div>
                      </div>
                    ) : editingLesson === lesson.id ? (
                      <div className="p-4">
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Título
                            </label>
                            <input
                              type="text"
                              value={editedLesson.title}
                              onChange={(e) => setEditedLesson({ ...editedLesson, title: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Descrição
                            </label>
                            <textarea
                              value={editedLesson.description}
                              onChange={(e) => setEditedLesson({ ...editedLesson, description: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            ></textarea>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Turma Alvo
                            </label>
                            <select
                              value={editedLesson.classTarget}
                              onChange={(e) => setEditedLesson({ ...editedLesson, classTarget: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="8ª Classe">8ª Classe</option>
                              <option value="9ª Classe">9ª Classe</option>
                              <option value="10ª Classe">10ª Classe</option>
                              <option value="11ª Classe">11ª Classe</option>
                              <option value="12ª Classe">12ª Classe</option>
                            </select>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setEditingLesson(null)}>
                              Cancelar
                            </Button>
                            <Button
                              className="bg-blue-800 hover:bg-blue-700"
                              size="sm"
                              onClick={() => handleUpdateLesson(lesson.id)}
                            >
                              Salvar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
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
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
                                {lesson.classTarget}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(new Date(lesson.uploadDate))}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Eye className="h-3 w-3 mr-1" />0
                              </span>
                            </div>
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => {
                                setEditingLesson(lesson.id)
                                setEditedLesson({
                                  title: lesson.title,
                                  description: lesson.description || "",
                                  classTarget: lesson.classTarget,
                                })
                              }}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteLesson(lesson.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Estatísticas */}
          <Card className="border-0 shadow-md mt-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
              <CardTitle>Estatísticas de Aulas</CardTitle>
              <CardDescription>Visão geral do engajamento dos alunos com suas aulas</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total de Aulas</p>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-400">{lessons.length}</p>
                    </div>
                    <Video className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Visualizações</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-400">0</p>
                    </div>
                    <Eye className="h-8 w-8 text-green-500 dark:text-green-400" />
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Alunos Alcançados</p>
                      <p className="text-2xl font-bold text-purple-800 dark:text-purple-400">0</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Produzido por Gabriel Vieira - Versão 2.1.0</p>
                <p className="mt-1">Funcionalidade de estatísticas detalhadas em breve</p>
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
