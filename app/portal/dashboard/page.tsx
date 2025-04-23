"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Book,
  Clock,
  Settings,
  MessageSquare,
  FileText,
  User,
  Calendar,
  BarChart,
  CheckCircle,
  Bell,
} from "lucide-react"
import Link from "next/link"
import {
  getUserById,
  getMaterials,
  getTasks,
  getNotifications,
  markNotificationAsRead,
  getGradesByStudent,
} from "@/lib/db"
import type { Notification } from "@/lib/db"

// Simulando autenticação - em um ambiente real, isso seria feito com autenticação adequada
const currentUser = getUserById("1")
const materials = getMaterials()
const tasks = getTasks()

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("perfil")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [grades, setGrades] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (currentUser) {
      // Carregar notificações
      const userNotifications = getNotifications(currentUser.class)
      setNotifications(userNotifications)

      // Contar notificações não lidas
      const unread = userNotifications.filter((n) => !n.isRead).length
      setUnreadCount(unread)

      // Carregar notas
      const userGrades = getGradesByStudent(currentUser.id)
      setGrades(userGrades)
    }
  }, [])

  // Função para marcar notificação como lida
  const handleMarkAsRead = (id: string) => {
    const updated = markNotificationAsRead(id)
    if (updated) {
      setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
      setUnreadCount((prev) => prev - 1)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Você precisa estar logado para acessar esta página.</p>
          <Button asChild>
            <Link href="/portal">Voltar para o Login</Link>
          </Button>
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
              <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white">
                  <AvatarImage src={currentUser.profileImage || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback className="bg-blue-600">{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">{currentUser.name}</CardTitle>
                <CardDescription className="text-blue-100">
                  {currentUser.class} - Turma {currentUser.grade}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="p-4 space-y-1">
                  <Button
                    variant={activeTab === "perfil" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "perfil" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("perfil")}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Perfil
                  </Button>
                  <Button
                    variant={activeTab === "material" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "material" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("material")}
                  >
                    <Book className="mr-2 h-5 w-5" />
                    Material do Aluno
                  </Button>
                  <Button
                    variant={activeTab === "calendario" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "calendario" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("calendario")}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Calendário
                  </Button>
                  <Button
                    variant={activeTab === "notas" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "notas" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("notas")}
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Notas e Boletins
                  </Button>
                  <Button
                    variant={activeTab === "notificacoes" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "notificacoes" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("notificacoes")}
                  >
                    <Bell className="mr-2 h-5 w-5" />
                    Notificações
                    {unreadCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                  <Button
                    variant={activeTab === "ferramentas" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "ferramentas" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("ferramentas")}
                  >
                    <Clock className="mr-2 h-5 w-5" />
                    Ferramentas Auxiliares
                  </Button>
                  <Button
                    variant={activeTab === "chatbot" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "chatbot" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("chatbot")}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chatbot IA
                  </Button>
                  <Button
                    variant={activeTab === "configuracoes" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "configuracoes" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("configuracoes")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Configurações
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "perfil" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Perfil do Aluno</CardTitle>
                      <CardDescription>Visualize e edite suas informações pessoais</CardDescription>
                    </div>
                    <Button className="bg-blue-800 hover:bg-blue-700">Editar Perfil</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white dark:border-gray-700">
                            <AvatarImage src={currentUser.profileImage || "/placeholder.svg"} alt={currentUser.name} />
                            <AvatarFallback className="bg-blue-600 text-3xl">
                              {currentUser.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-1">
                            {currentUser.name}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">{currentUser.email}</p>
                          <Button variant="outline" className="w-full">
                            Alterar Foto
                          </Button>
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Nome Completo
                            </label>
                            <input
                              type="text"
                              defaultValue={currentUser.name}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Nome de Usuário
                            </label>
                            <input
                              type="text"
                              defaultValue={currentUser.username}
                              readOnly
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              defaultValue={currentUser.email}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Classe
                            </label>
                            <input
                              type="text"
                              defaultValue={currentUser.class}
                              readOnly
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Telefone
                            </label>
                            <input
                              type="tel"
                              defaultValue="+258 84 567 8901"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Data de Nascimento
                            </label>
                            <input
                              type="date"
                              defaultValue="2006-05-12"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="mt-8">
                          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-4">
                            Informações Adicionais
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nome do Responsável
                              </label>
                              <input
                                type="text"
                                defaultValue="Maria Silva"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Telefone do Responsável
                              </label>
                              <input
                                type="tel"
                                defaultValue="+258 84 123 4567"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      <Button className="bg-blue-800 hover:bg-blue-700 text-white">Salvar Alterações</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "material" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle>Material do Aluno</CardTitle>
                  <CardDescription>Acesse os materiais disponibilizados pelos professores</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Pesquisar materiais..."
                        className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {materials.map((material) => (
                      <div
                        key={material.id}
                        className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full mr-2">
                                {material.subject}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Adicionado em {material.uploadDate}
                              </span>
                            </div>
                            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-2">
                              {material.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">{material.description}</p>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notificacoes" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle>Notificações e Avisos</CardTitle>
                  <CardDescription>Comunicados importantes dos professores e da escola</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">Nenhuma notificação disponível</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`bg-white dark:bg-gray-800 p-5 rounded-xl border ${
                            notification.isRead
                              ? "border-gray-200 dark:border-gray-700"
                              : "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10"
                          } hover:shadow-md transition-shadow`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center mb-2">
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full mr-2">
                                  {notification.teacherName}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{notification.date}</span>
                                {!notification.isRead && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                              </div>
                              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-2">
                                {notification.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300">{notification.content}</p>
                            </div>
                            {!notification.isRead && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                Marcar como lida
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notas" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle>Notas e Boletins</CardTitle>
                  <CardDescription>Acompanhe seu desempenho acadêmico</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Resumo das notas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-blue-50 dark:bg-blue-900/10 border-0">
                        <CardContent className="p-4 text-center">
                          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-1">Média Geral</h3>
                          <p className="text-3xl font-bold text-blue-900 dark:text-blue-300">
                            {grades.length > 0
                              ? (grades.reduce((sum, grade) => sum + grade.value, 0) / grades.length).toFixed(1)
                              : "N/A"}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-green-50 dark:bg-green-900/10 border-0">
                        <CardContent className="p-4 text-center">
                          <h3 className="text-lg font-medium text-green-800 dark:text-green-400 mb-1">Melhor Nota</h3>
                          <p className="text-3xl font-bold text-green-900 dark:text-green-300">
                            {grades.length > 0 ? Math.max(...grades.map((grade) => grade.value)) : "N/A"}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-0">
                        <CardContent className="p-4 text-center">
                          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-400 mb-1">Disciplinas</h3>
                          <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-300">
                            {new Set(grades.map((grade) => grade.subject)).size}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Tabela de notas */}
                    <div className="overflow-x-auto">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        Notas por Disciplina
                      </h3>

                      {grades.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 dark:text-gray-400">Nenhuma nota registrada ainda</p>
                        </div>
                      ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Disciplina
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Nota
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Trimestre
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Data
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Comentários
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            {grades.map((grade) => (
                              <tr key={grade.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {grade.subject}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div
                                    className={`text-sm font-medium ${
                                      grade.value >= 14
                                        ? "text-green-600 dark:text-green-400"
                                        : grade.value >= 10
                                          ? "text-blue-600 dark:text-blue-400"
                                          : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {grade.value} / 20
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 dark:text-gray-300">{grade.term}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 dark:text-gray-300">{grade.date}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-700 dark:text-gray-300">{grade.comments}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>

                    {/* Botão para baixar boletim */}
                    <div className="flex justify-end">
                      <Button className="bg-blue-800 hover:bg-blue-700">
                        <FileText className="mr-2 h-4 w-4" />
                        Baixar Boletim Completo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "ferramentas" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle>Ferramentas Auxiliares</CardTitle>
                  <CardDescription>Ferramentas para ajudar nos seus estudos</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Tabs defaultValue="pomodoro" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="pomodoro" className="text-base py-3">
                        Técnica Pomodoro
                      </TabsTrigger>
                      <TabsTrigger value="tarefas" className="text-base py-3">
                        Gerenciador de Tarefas
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="pomodoro" className="mt-6">
                      <PomodoroTimer />
                    </TabsContent>
                    <TabsContent value="tarefas" className="mt-6">
                      <TaskManager initialTasks={tasks} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "chatbot" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle>Chatbot IA</CardTitle>
                  <CardDescription>Tire suas dúvidas com nosso assistente virtual</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ChatbotInterface />
                </CardContent>
              </Card>
            )}

            {activeTab === "configuracoes" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>Personalize sua experiência no portal</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        Preferências de Notificação
                      </h3>
                      <div className="space-y-4">
                        {[
                          { label: "Notificações por email", defaultChecked: true },
                          { label: "Notificações de novos materiais", defaultChecked: true },
                          { label: "Lembretes de tarefas", defaultChecked: true },
                          { label: "Alertas de provas", defaultChecked: false },
                          { label: "Comunicados da escola", defaultChecked: true },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-xl"
                          >
                            <label className="text-gray-700 dark:text-gray-300">{item.label}</label>
                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                              <input
                                type="checkbox"
                                id={`toggle-${index}`}
                                defaultChecked={item.defaultChecked}
                                className="absolute w-0 h-0 opacity-0"
                              />
                              <label
                                htmlFor={`toggle-${index}`}
                                className={`absolute inset-0 cursor-pointer rounded-full transition-colors duration-300 ${
                                  item.defaultChecked ? "bg-blue-800" : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              >
                                <span
                                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                                    item.defaultChecked ? "transform translate-x-6" : ""
                                  }`}
                                ></span>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Segurança</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">Alterar Senha</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Última atualização: Nunca</p>
                            </div>
                            <Button variant="outline">Alterar</Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                Autenticação de Dois Fatores
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Adicione uma camada extra de segurança
                              </p>
                            </div>
                            <Button variant="outline">Configurar</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Aparência</h3>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">Tema Escuro</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Alternar entre tema claro e escuro
                            </p>
                          </div>
                          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                            <input
                              type="checkbox"
                              id="theme-toggle"
                              defaultChecked={false}
                              className="absolute w-0 h-0 opacity-0"
                            />
                            <label
                              htmlFor="theme-toggle"
                              className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 dark:bg-blue-800"
                            >
                              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 dark:transform dark:translate-x-6"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      <Button className="bg-blue-800 hover:bg-blue-700 text-white">Salvar Configurações</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

// Componente do Timer Pomodoro
function PomodoroTimer() {
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutos em segundos
  const [isActive, setIsActive] = useState(false)
  const [task, setTask] = useState("")
  const [focusLevel, setFocusLevel] = useState<"low" | "medium" | "high">("medium")

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleModeChange = (newMode: "work" | "shortBreak" | "longBreak") => {
    setIsActive(false)
    setMode(newMode)

    if (newMode === "work") {
      setTimeLeft(25 * 60) // 25 minutos
    } else if (newMode === "shortBreak") {
      setTimeLeft(5 * 60) // 5 minutos
    } else {
      setTimeLeft(15 * 60) // 15 minutos
    }
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    if (mode === "work") {
      setTimeLeft(25 * 60)
    } else if (mode === "shortBreak") {
      setTimeLeft(5 * 60)
    } else {
      setTimeLeft(15 * 60)
    }
  }

  // Efeito para decrementar o tempo
  // Em um componente real, usaríamos useEffect com setInterval

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex rounded-xl shadow-sm mb-8" role="group">
          <button
            type="button"
            className={`px-6 py-3 text-sm font-medium rounded-l-xl ${
              mode === "work"
                ? "bg-blue-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleModeChange("work")}
          >
            Trabalho
          </button>
          <button
            type="button"
            className={`px-6 py-3 text-sm font-medium ${
              mode === "shortBreak"
                ? "bg-blue-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleModeChange("shortBreak")}
          >
            Pausa Curta
          </button>
          <button
            type="button"
            className={`px-6 py-3 text-sm font-medium rounded-r-xl ${
              mode === "longBreak"
                ? "bg-blue-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleModeChange("longBreak")}
          >
            Pausa Longa
          </button>
        </div>

        <div className="text-8xl font-bold mb-8 text-blue-800 dark:text-blue-400">{formatTime(timeLeft)}</div>

        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={toggleTimer}
            className={`px-8 py-6 rounded-xl text-lg ${
              isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isActive ? "Pausar" : "Iniciar"}
          </Button>
          <Button variant="outline" onClick={resetTimer} className="px-8 py-6 rounded-xl text-lg">
            Reiniciar
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tarefa Atual</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Em que você está trabalhando?"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nível de Foco</label>
          <div className="flex space-x-3">
            <Button
              variant={focusLevel === "low" ? "default" : "outline"}
              onClick={() => setFocusLevel("low")}
              className={`flex-1 rounded-xl ${focusLevel === "low" ? "bg-blue-800" : ""}`}
            >
              Baixo
            </Button>
            <Button
              variant={focusLevel === "medium" ? "default" : "outline"}
              onClick={() => setFocusLevel("medium")}
              className={`flex-1 rounded-xl ${focusLevel === "medium" ? "bg-blue-800" : ""}`}
            >
              Médio
            </Button>
            <Button
              variant={focusLevel === "high" ? "default" : "outline"}
              onClick={() => setFocusLevel("high")}
              className={`flex-1 rounded-xl ${focusLevel === "high" ? "bg-blue-800" : ""}`}
            >
              Alto
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 dark:bg-gray-800 rounded-xl">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Sobre a Técnica Pomodoro</h3>
        <p className="text-gray-700 dark:text-gray-300">
          A Técnica Pomodoro é um método de gerenciamento de tempo que utiliza períodos de trabalho focado (geralmente
          25 minutos) seguidos por pequenas pausas. Após completar quatro "pomodoros", faça uma pausa mais longa para
          descansar a mente.
        </p>
      </div>
    </div>
  )
}

// Componente do Gerenciador de Tarefas
function TaskManager({ initialTasks }: { initialTasks: any[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" })

  const addTask = () => {
    if (!newTask.title) return

    const task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      completed: false,
    }

    setTasks([...tasks, task])
    setNewTask({ title: "", description: "", dueDate: "" })
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Adicionar Nova Tarefa</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título da Tarefa</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Adicione uma nova tarefa"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Descreva a tarefa"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data de Entrega</label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <Button onClick={addTask} className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-xl">
            Adicionar Tarefa
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Suas Tarefas</h3>

        {tasks.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-blue-800 dark:text-blue-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhuma tarefa pendente</h4>
            <p className="text-gray-500 dark:text-gray-400">Adicione uma nova tarefa para começar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-5 rounded-xl transition-all duration-300 ${
                  task.completed
                    ? "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-grow">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4
                        className={`font-medium ${
                          task.completed
                            ? "text-gray-500 dark:text-gray-400 line-through"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {task.title}
                      </h4>
                      <p
                        className={`text-sm mt-1 ${
                          task.completed
                            ? "text-gray-400 dark:text-gray-500 line-through"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {task.description}
                      </p>
                      {task.dueDate && (
                        <div className="flex items-center mt-2">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500 dark:text-gray-400">Data de entrega: {task.dueDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ml-2"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Componente do Chatbot IA
function ChatbotInterface() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Olá! Sou o assistente virtual do Colégio Privado da Matola. Como posso ajudar você hoje?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Adiciona a mensagem do usuário
    const userMessage = { role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simula resposta do chatbot após um pequeno delay
    setTimeout(() => {
      const botResponses = [
        "Posso ajudar você com informações sobre as matérias, horários de aula ou atividades extracurriculares.",
        "Se você está com dificuldades em alguma matéria, posso sugerir alguns recursos de estudo.",
        "Lembre-se que você pode acessar todos os materiais de estudo na seção 'Material do Aluno'.",
        "Você sabia que a técnica Pomodoro pode ajudar a melhorar sua concentração nos estudos?",
        "Se precisar de ajuda com alguma tarefa específica, me diga qual é a matéria.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const assistantMessage = { role: "assistant", content: randomResponse }

      setMessages((prevMessages) => [...prevMessages, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-blue-800 dark:bg-blue-900 text-white p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">Assistente Virtual</h3>
            <p className="text-xs text-blue-100">Online • Responde em segundos</p>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-4 rounded-xl ${
                message.role === "user"
                  ? "bg-blue-800 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-4 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-grow px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Button onClick={handleSendMessage} className="bg-blue-800 hover:bg-blue-700 text-white rounded-xl">
            Enviar
          </Button>
        </div>
      </div>
    </div>
  )
}
