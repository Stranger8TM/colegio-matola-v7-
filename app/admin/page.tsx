"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { motion, AnimatePresence } from "framer-motion"
import NextDynamic from "next/dynamic"

// Componentes carregados dinamicamente para evitar problemas de SSR
const Admin3DBackground = NextDynamic(() => import("@/components/admin-3d-background"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900" />
  ),
})

const AdminEntranceAnimation = NextDynamic(() => import("@/components/admin-entrance-animation"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center text-blue-900 font-bold text-4xl shadow-2xl mb-8">
          CPM
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Colégio Privado da Matola</h1>
        <p className="text-xl text-blue-200">Painel Administrativo</p>
      </div>
    </div>
  ),
})

const MotivationalMessage = NextDynamic(() => import("@/components/motivational-message"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto mb-8 h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg animate-pulse" />
  ),
})

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAnimation, setShowAnimation] = useState(true)
  const [mounted, setMounted] = useState(false)

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

  const upcomingEvents = [
    { id: 1, name: "Reunião de Professores", date: "15/05/2023", time: "14:00", location: "Sala de Conferências" },
    { id: 2, name: "Feira de Ciências", date: "22/05/2023", time: "09:00", location: "Pátio Central" },
    { id: 3, name: "Entrega de Notas", date: "30/05/2023", time: "13:00", location: "Salas de Aula" },
  ]

  useEffect(() => {
    setMounted(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    const animationTimer = setTimeout(() => {
      setShowAnimation(false)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearTimeout(animationTimer)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center text-blue-900 font-bold text-4xl shadow-2xl mb-8">
            CPM
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Colégio Privado da Matola</h1>
          <p className="text-xl text-blue-200">Painel Administrativo</p>
        </div>
      </div>
    )
  }

  if (loading || showAnimation) {
    return (
      <AnimatePresence>
        {showAnimation ? (
          <AdminEntranceAnimation />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full mx-auto mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 dark:text-gray-300"
              >
                Carregando painel administrativo...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 relative"
    >
      <Admin3DBackground />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden lg:flex lg:flex-col w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 px-4"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-blue-900 font-bold shadow-lg"
              >
                CPM
              </motion.div>
              <div>
                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400">Colégio Matola</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Painel Administrativo</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <motion.nav variants={containerVariants} initial="hidden" animate="visible" className="flex-1 space-y-1">
              {[
                { id: "dashboard", icon: Home, label: "Dashboard" },
                { id: "students", icon: Users, label: "Alunos" },
                { id: "teachers", icon: GraduationCap, label: "Professores" },
                { id: "courses", icon: BookOpen, label: "Cursos" },
                { id: "calendar", icon: Calendar, label: "Calendário" },
                { id: "documents", icon: FileText, label: "Documentos" },
                { id: "reports", icon: BarChart3, label: "Relatórios" },
                { id: "settings", icon: Settings, label: "Configurações" },
                { id: "logs", icon: Activity, label: "Logs do Sistema" },
              ].map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start rounded-lg py-2.5 transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                    {item.id === "logs" && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-yellow-500 text-white rounded">Beta</span>
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 bg-transparent"
                onClick={() => router.push("/")}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sair
              </Button>
            </motion.div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm z-10"
          >
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
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-blue-900 font-bold text-sm lg:hidden">
                  CPM
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex-1 px-2 mx-2 lg:ml-6 lg:mr-6"
              >
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="search"
                    placeholder="Pesquisar..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"
                  />
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
              </motion.div>
            </div>
          </motion.header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100/50 dark:bg-gray-900/50">
            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <MotivationalMessage type="teacher" userName="Administrador" />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Dashboard
                    </h1>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Admissão
                    </Button>
                  </motion.div>

                  {/* Stats Cards */}
                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {[
                      {
                        title: "Total de Alunos",
                        value: stats.totalStudents,
                        icon: Users,
                        color: "blue",
                        change: "+12%",
                        gradient: "from-blue-500 to-blue-600",
                      },
                      {
                        title: "Total de Professores",
                        value: stats.totalTeachers,
                        icon: GraduationCap,
                        color: "purple",
                        change: "+5%",
                        gradient: "from-purple-500 to-purple-600",
                      },
                      {
                        title: "Admissões Pendentes",
                        value: stats.pendingAdmissions,
                        icon: Clock,
                        color: "amber",
                        change: "+18%",
                        gradient: "from-amber-500 to-amber-600",
                      },
                      {
                        title: "Turmas Ativas",
                        value: stats.activeClasses,
                        icon: BookOpen,
                        color: "green",
                        change: "+3%",
                        gradient: "from-green-500 to-green-600",
                      },
                      {
                        title: "Cursos Oferecidos",
                        value: stats.totalCourses,
                        icon: BookOpen,
                        color: "indigo",
                        change: "Estável",
                        gradient: "from-indigo-500 to-indigo-600",
                      },
                      {
                        title: "Receita Mensal",
                        value: stats.monthlyRevenue,
                        icon: DollarSign,
                        color: "emerald",
                        change: "+8%",
                        gradient: "from-emerald-500 to-emerald-600",
                      },
                    ].map((stat, index) => (
                      <motion.div key={stat.title} variants={cardVariants} whileHover="hover">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center justify-between">
                              <span className="text-gray-700 dark:text-gray-200">{stat.title}</span>
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} text-white shadow-lg`}>
                                <stat.icon className="h-5 w-5" />
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.div
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                            >
                              {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                            </motion.div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <span className="text-green-600 dark:text-green-400">{stat.change}</span> desde o último
                              período
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Recent Activities and Events */}
                  <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={cardVariants} whileHover="hover">
                      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                            <span>Atividades Recentes</span>
                          </CardTitle>
                          <CardDescription>Últimas ações realizadas no sistema</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                              <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
                              >
                                <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {activity.description}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-purple-600" />
                            <span>Próximos Eventos</span>
                          </CardTitle>
                          <CardDescription>Eventos agendados para os próximos dias</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {upcomingEvents.map((event, index) => (
                              <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.name}</h4>
                                  <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full">
                                    {event.date}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{event.time}</span>
                                  <span className="mx-2">•</span>
                                  <span>{event.location}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Outras abas */}
              {activeTab !== "dashboard" && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center justify-between"
                  >
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">
                      {activeTab === "students" && "Gestão de Alunos"}
                      {activeTab === "teachers" && "Gestão de Professores"}
                      {activeTab === "courses" && "Gestão de Cursos"}
                      {activeTab === "calendar" && "Calendário Escolar"}
                      {activeTab === "documents" && "Documentos"}
                      {activeTab === "reports" && "Relatórios"}
                      {activeTab === "settings" && "Configurações"}
                      {activeTab === "logs" && "Logs do Sistema"}
                    </h1>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <CardContent className="p-12 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                        >
                          <FileText className="h-12 w-12 text-white" />
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                        >
                          Em Desenvolvimento
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                          className="text-gray-500 dark:text-gray-400 text-lg"
                        >
                          Esta seção será implementada em breve com funcionalidades avançadas.
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                          className="mt-6"
                        >
                          <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200 bg-transparent">
                            Notificar quando estiver pronto
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
