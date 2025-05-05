"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  FileText,
  BarChart,
  Clock,
  CheckCircle,
  Video,
  Download,
  ExternalLink,
  MessageSquare,
  Library,
} from "lucide-react"
import { motion } from "framer-motion"

export default function StudentDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [student, setStudent] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Verificar se o aluno está logado
    const checkAuth = () => {
      const studentId = localStorage.getItem("studentId")
      const studentName = localStorage.getItem("studentName")

      if (!studentId) {
        router.push("/painel")
        return
      }

      // Simular dados do aluno
      setStudent({
        id: studentId,
        name: studentName || "Ana Silva",
        email: "ana.silva@aluno.escolaprivada.co.mz",
        class: "10ª Classe",
        profileImage: "/avatar-1.jpg",
      })

      setLoading(false)
    }

    if (isMounted) {
      checkAuth()
    }
  }, [router, isMounted])

  // Se não estiver montado no cliente, não renderize nada que use localStorage
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando portal do aluno...</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Você precisa estar logado para acessar esta página.</p>
          <Button onClick={() => router.push("/painel")}>Voltar para o Login</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-r from-purple-700 to-purple-600 dark:from-purple-800 dark:to-purple-700 text-white p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white">
                  <AvatarImage src={student.profileImage || "/placeholder.svg?height=96&width=96"} alt={student.name} />
                  <AvatarFallback className="bg-purple-600">{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">{student.name}</CardTitle>
                <CardDescription className="text-purple-100">{student.class}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="p-4 space-y-1">
                  <Button
                    variant="default"
                    className="w-full justify-start rounded-xl py-3 bg-purple-700 hover:bg-purple-600 text-white"
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl py-3"
                    onClick={() => router.push("/portal/dashboard/aulas-gravadas")}
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Aulas Gravadas
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl py-3"
                    onClick={() => router.push("/portal/dashboard/biblioteca")}
                  >
                    <Library className="mr-2 h-5 w-5" />
                    Biblioteca Digital
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl py-3"
                    onClick={() => router.push("/portal/dashboard/forum")}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Fórum de Discussão
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-xl py-3">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Materiais
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-xl py-3">
                    <FileText className="mr-2 h-5 w-5" />
                    Notas e Boletins
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-xl py-3">
                    <Calendar className="mr-2 h-5 w-5" />
                    Calendário
                  </Button>
                </nav>
                <div className="p-4 pt-0">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => {
                      localStorage.removeItem("studentId")
                      localStorage.removeItem("studentName")
                      router.push("/painel")
                    }}
                  >
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {/* Boas-vindas */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-purple-700 to-purple-600 dark:from-purple-800 dark:to-purple-700 p-6 text-white">
                  <h1 className="text-2xl font-bold mb-2">Bem-vindo(a) ao Portal do Aluno, {student.name}!</h1>
                  <p className="text-purple-100">
                    Aqui você pode acompanhar seu desempenho, acessar materiais e interagir com seus professores.
                  </p>
                </div>
              </Card>

              {/* Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Média Geral</span>
                      <BarChart className="h-5 w-5 text-purple-600" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-800 dark:text-purple-400">16.5</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="text-green-600 dark:text-green-400">↑ 2.3</span> desde o último trimestre
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Frequência</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-800 dark:text-green-400">98%</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="text-green-600 dark:text-green-400">↑ 1%</span> desde o mês passado
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Próxima Avaliação</span>
                      <Clock className="h-5 w-5 text-amber-600" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-800 dark:text-amber-400">2 dias</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Matemática - 15/05/2023</p>
                  </CardContent>
                </Card>
              </div>

              {/* Novas Seções */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card
                  className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer rounded-xl overflow-hidden"
                  onClick={() => router.push("/portal/dashboard/forum")}
                >
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold">Fórum de Discussão</h2>
                        <MessageSquare className="h-8 w-8 text-white/80" />
                      </div>
                      <p className="text-blue-100 mb-4">
                        Participe de discussões, tire dúvidas e compartilhe conhecimento com colegas e professores.
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span>5 novos tópicos</span>
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                          Acessar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer rounded-xl overflow-hidden"
                  onClick={() => router.push("/portal/dashboard/biblioteca")}
                >
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-green-600 to-green-500 dark:from-green-800 dark:to-green-700 p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold">Biblioteca Digital</h2>
                        <Library className="h-8 w-8 text-white/80" />
                      </div>
                      <p className="text-green-100 mb-4">
                        Acesse livros, documentos, vídeos e outros materiais didáticos para seus estudos.
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span>12 novos materiais</span>
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                          Acessar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Aulas Recentes */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden mb-6">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Aulas Recentes</CardTitle>
                      <CardDescription>Últimas aulas gravadas disponíveis</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push("/portal/dashboard/aulas-gravadas")}>
                      Ver Todas
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        title: "Funções Quadráticas",
                        subject: "Matemática",
                        teacher: "Prof. Gabriel Matola",
                        duration: "45 min",
                        thumbnail: "/placeholder.svg?key=tjvjp",
                        progress: 75,
                      },
                      {
                        id: 2,
                        title: "Literatura Moçambicana",
                        subject: "Português",
                        teacher: "Profa. Maria Joaquim",
                        duration: "38 min",
                        thumbnail: "/placeholder.svg?key=j9v9k",
                        progress: 100,
                      },
                      {
                        id: 3,
                        title: "Leis de Newton",
                        subject: "Física",
                        teacher: "Prof. António Mabjaia",
                        duration: "52 min",
                        thumbnail: "/placeholder.svg?key=phqyt",
                        progress: 30,
                      },
                    ].map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex flex-col md:flex-row gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="md:w-1/4 flex-shrink-0">
                          <div className="relative rounded-lg overflow-hidden">
                            <Image
                              src={lesson.thumbnail || "/placeholder.svg"}
                              alt={lesson.title}
                              width={200}
                              height={120}
                              className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/60 rounded-full p-2">
                                <Video className="h-8 w-8 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-3/4 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{lesson.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.subject} • {lesson.teacher} • {lesson.duration}
                            </p>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {lesson.progress === 100 ? "Concluído" : `${lesson.progress}% completo`}
                              </span>
                              {lesson.progress === 100 && <CheckCircle className="h-4 w-4 text-green-500" />}
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  lesson.progress === 100 ? "bg-green-500" : "bg-purple-600"
                                }`}
                                style={{ width: `${lesson.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Continuar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Baixar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Próximos Eventos */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle>Próximos Eventos</CardTitle>
                  <CardDescription>Calendário de atividades e avaliações</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        title: "Avaliação de Matemática",
                        date: "15/05/2023",
                        time: "10:00",
                        type: "Avaliação",
                        location: "Sala 12",
                      },
                      {
                        id: 2,
                        title: "Entrega de Trabalho de Português",
                        date: "20/05/2023",
                        time: "23:59",
                        type: "Trabalho",
                        location: "Online",
                      },
                      {
                        id: 3,
                        title: "Feira de Ciências",
                        date: "25/05/2023",
                        time: "14:00",
                        type: "Evento",
                        location: "Pátio Central",
                      },
                    ].map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              event.type === "Avaliação"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                : event.type === "Trabalho"
                                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{event.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.time}</span>
                          <span className="mx-2">•</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Ver Calendário Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
