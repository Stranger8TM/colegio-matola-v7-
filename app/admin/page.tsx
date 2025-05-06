"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Settings,
  Bell,
  FileText,
  BarChart3,
  Home,
  LogOut,
  Search,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Activity,
} from "lucide-react"
import Admin3DBackground from "@/components/admin-3d-background"
import AdminEntranceAnimation from "@/components/admin-entrance-animation"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAnimation, setShowAnimation] = useState(true)

  // Dados simulados
  const stats = {
    totalStudents: 1250,
    totalTeachers: 68,
    totalCourses: 24,
    activeClasses: 42,
    pendingAdmissions: 78,
    monthlyRevenue: "1.245.000 MZN",
  }

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      description: "Novo aluno matriculado: Ana Maria Silva",
      time: "Há 2 horas",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      id: 2,
      type: "payment",
      description: "Pagamento de propina recebido: Carlos Mendes",
      time: "Há 3 horas",
      icon: <DollarSign className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 3,
      type: "document",
      description: "Novo documento carregado: Calendário Escolar 2023",
      time: "Há 5 horas",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 4,
      type: "alert",
      description: "Alerta: Reunião de professores amanhã às 14h",
      time: "Há 6 horas",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 5,
      type: "system",
      description: "Backup do sistema realizado com sucesso",
      time: "Há 12 horas",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
  ]

  const students = [
    { id: 1, name: "Ana Maria Silva", class: "10ª Classe", status: "Ativo", photo: "/avatar-1.jpg" },
    { id: 2, name: "Carlos Mendes", class: "12ª Classe", status: "Ativo", photo: "/avatar-2.jpg" },
    { id: 3, name: "Beatriz Fonseca", class: "9ª Classe", status: "Ativo", photo: "/avatar-3.jpg" },
    { id: 4, name: "Daniel Machava", class: "11ª Classe", status: "Ativo", photo: "/avatar-4.jpg" },
    { id: 5, name: "Eduardo Tembe", class: "8ª Classe", status: "Pendente", photo: "/avatar-5.jpg" },
  ]

  const upcomingEvents = [
    { id: 1, name: "Reunião de Professores", date: "15/05/2023", time: "14:00", location: "Sala de Conferências" },
    { id: 2, name: "Feira de Ciências", date: "22/05/2023", time: "09:00", location: "Pátio Central" },
    { id: 3, name: "Entrega de Notas", date: "30/05/2023", time: "13:00", location: "Salas de Aula" },
  ]

  useEffect(() => {
    // Simulação de carregamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Simulação da animação de entrada
    const animationTimer = setTimeout(() => {
      setShowAnimation(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(animationTimer)
    }
  }, [])

  if (loading || showAnimation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        {showAnimation ? (
          <AdminEntranceAnimation />
        ) : (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
            <p className="text-gray-700 dark:text-gray-300">Carregando painel administrativo...</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <Admin3DBackground />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10">
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 px-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded" />
              <div>
                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400">Colégio Matola</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Painel Administrativo</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "dashboard" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "students" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "students" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("students")}
              >
                <Users className="mr-2 h-5 w-5" />
                Alunos
              </Button>
              <Button
                variant={activeTab === "teachers" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "teachers" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("teachers")}
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Professores
              </Button>
              <Button
                variant={activeTab === "courses" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "courses" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("courses")}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Cursos
              </Button>
              <Button
                variant={activeTab === "calendar" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "calendar" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("calendar")}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Calendário
              </Button>
              <Button
                variant={activeTab === "documents" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "documents" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("documents")}
              >
                <FileText className="mr-2 h-5 w-5" />
                Documentos
              </Button>
              <Button
                variant={activeTab === "reports" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "reports" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Relatórios
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "settings" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-5 w-5" />
                Configurações
              </Button>
              <Button
                variant={activeTab === "logs" ? "default" : "ghost"}
                className={`w-full justify-start rounded-lg py-2.5 ${
                  activeTab === "logs" ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => setActiveTab("logs")}
              >
                <Activity className="mr-2 h-5 w-5" />
                Logs do Sistema
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-yellow-500 text-white rounded">Beta</span>
              </Button>
            </nav>
            <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/")}>
                <LogOut className="mr-2 h-5 w-5" />
                Sair
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
              <div className="flex items-center lg:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </Button>
                <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded lg:hidden" />
              </div>
              <div className="flex-1 px-2 mx-2 lg:ml-6 lg:mr-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="search"
                    placeholder="Pesquisar..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
                </Button>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar-1.jpg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="ml-2 hidden md:block">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Administrador</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">admin@escolaprivada.co.mz</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-900">
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                  <div className="flex items-center space-x-2">
                    <Button className="bg-blue-800 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Admissão
                    </Button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Total de Alunos</span>
                        <Users className="h-5 w-5 text-blue-600" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-800 dark:text-blue-400">{stats.totalStudents}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="text-green-600 dark:text-green-400">↑ 12%</span> desde o último mês
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Total de Professores</span>
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-800 dark:text-purple-400">
                        {stats.totalTeachers}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="text-green-600 dark:text-green-400">↑ 5%</span> desde o último mês
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Admissões Pendentes</span>
                        <Clock className="h-5 w-5 text-amber-600" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-amber-800 dark:text-amber-400">
                        {stats.pendingAdmissions}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="text-red-600 dark:text-red-400">↑ 18%</span> desde a semana passada
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Turmas Ativas</span>
                        <BookOpen className="h-5 w-5 text-green-600" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-800 dark:text-green-400">{stats.activeClasses}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="text-green-600 dark:text-green-400">↑ 3%</span> desde o último trimestre
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Cursos Oferecidos</span>
                        <BookOpen className="h-5 w-5 text-indigo-600" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-indigo-800 dark:text-indigo-400">
                        {stats.totalCourses}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="text-blue-600 dark:text-blue-400">→ Estável</span> desde o último ano
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Receita Mensal</span>
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-emerald-800 dark:text-emerald-400">
                        {stats.monthlyRevenue}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="text-green-600 dark:text-green-400">↑ 8%</span> desde o mês anterior
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activities and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-md lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Atividades Recentes</CardTitle>
                      <CardDescription>Últimas ações realizadas no sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {activity.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="link" className="text-blue-600 dark:text-blue-400">
                          Ver todas as atividades
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Próximos Eventos</CardTitle>
                      <CardDescription>Eventos agendados para os próximos dias</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                          <div
                            key={event.id}
                            className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.name}</h4>
                              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                                {event.date}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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
                </div>

                {/* Students and Teachers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Alunos Recentes</CardTitle>
                        <CardDescription>Últimos alunos matriculados</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Todos
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {students.slice(0, 4).map((student) => (
                          <div key={student.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{student.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{student.class}</p>
                              </div>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                student.status === "Ativo"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                              }`}
                            >
                              {student.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Professores</CardTitle>
                        <CardDescription>Corpo docente da escola</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("teachers")}>
                        Ver Todos
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: 1, name: "Prof. Gabriel Matola", subject: "Matemática", photo: "/teacher-gabriel.jpg" },
                          { id: 2, name: "Profa. Maria Joaquim", subject: "Português", photo: "/teacher-maria.jpg" },
                          { id: 3, name: "Prof. António Mabjaia", subject: "Física", photo: "/avatar-3.jpg" },
                          { id: 4, name: "Profa. Carla Sitoe", subject: "Biologia", photo: "/avatar-4.jpg" },
                        ].map((teacher) => (
                          <div key={teacher.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={teacher.photo || "/placeholder.svg"} alt={teacher.name} />
                                <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{teacher.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{teacher.subject}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Ver perfil</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === "students" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gestão de Alunos</h1>
                  <div className="flex items-center space-x-2">
                    <Button className="bg-blue-800 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Al\
