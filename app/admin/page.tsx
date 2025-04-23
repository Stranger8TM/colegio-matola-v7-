"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { AuthGuard } from "@/components/auth-guard"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Book,
  FileText,
  Bell,
  BarChart,
  Users,
  Calendar,
  School,
  Clock,
  Shield,
  DollarSign,
  MessageSquare,
  FileCheck,
  UserPlus,
  Key,
  PieChart,
  Download,
  Send,
  Save,
  Plus,
  Trash2,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <AuthGuard role="ADMIN">
      <AdminDashboardContent />
    </AuthGuard>
  )
}

function AdminDashboardContent() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const user = session?.user

  // Verificar se o usuário é um administrador
  const isSupremeAdmin = user?.adminType === "SUPREME"
  const isGeneralAdmin = user?.adminType === "GENERAL" || isSupremeAdmin
  const isPedagogicalAdmin = user?.adminType === "PEDAGOGICAL" || isGeneralAdmin
  const isSecretaryAdmin = user?.adminType === "SECRETARY" || isGeneralAdmin
  const isTechnicalAdmin = user?.adminType === "TECHNICAL" || isGeneralAdmin

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white">
                  <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name || ""} />
                  <AvatarFallback className="bg-blue-600">{user?.name?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">{user?.name}</CardTitle>
                <CardDescription className="text-blue-100">
                  {user?.adminType === "SUPREME"
                    ? "Administrador Supremo"
                    : user?.adminType === "GENERAL"
                      ? "Administrador Geral"
                      : user?.adminType === "PEDAGOGICAL"
                        ? "Coordenador Pedagógico"
                        : user?.adminType === "SECRETARY"
                          ? "Secretaria"
                          : "Administrador Técnico"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="p-4 space-y-1">
                  <Button
                    variant={activeTab === "dashboard" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "dashboard" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Dashboard
                  </Button>

                  {/* Gestão Acadêmica - Coordenador Pedagógico ou superior */}
                  {isPedagogicalAdmin && (
                    <Button
                      variant={activeTab === "academic" ? "default" : "ghost"}
                      className={`w-full justify-start rounded-xl py-3 ${
                        activeTab === "academic" ? "bg-blue-800 text-white" : ""
                      }`}
                      onClick={() => setActiveTab("academic")}
                    >
                      <School className="mr-2 h-5 w-5" />
                      Gestão Acadêmica
                    </Button>
                  )}

                  {/* Gestão de Usuários - Secretaria ou superior */}
                  {isSecretaryAdmin && (
                    <Button
                      variant={activeTab === "users" ? "default" : "ghost"}
                      className={`w-full justify-start rounded-xl py-3 ${
                        activeTab === "users" ? "bg-blue-800 text-white" : ""
                      }`}
                      onClick={() => setActiveTab("users")}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Gestão de Usuários
                    </Button>
                  )}

                  {/* Relatórios e Estatísticas - Todos os admins */}
                  <Button
                    variant={activeTab === "reports" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "reports" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("reports")}
                  >
                    <FileCheck className="mr-2 h-5 w-5" />
                    Relatórios
                  </Button>

                  {/* Comunicação - Todos os admins */}
                  <Button
                    variant={activeTab === "communication" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "communication" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("communication")}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Comunicação
                  </Button>

                  {/* Financeiro - Admin Geral ou superior */}
                  {isGeneralAdmin && (
                    <Button
                      variant={activeTab === "financial" ? "default" : "ghost"}
                      className={`w-full justify-start rounded-xl py-3 ${
                        activeTab === "financial" ? "bg-blue-800 text-white" : ""
                      }`}
                      onClick={() => setActiveTab("financial")}
                    >
                      <DollarSign className="mr-2 h-5 w-5" />
                      Financeiro
                    </Button>
                  )}

                  {/* Sistema e Segurança - Admin Técnico ou superior */}
                  {isTechnicalAdmin && (
                    <Button
                      variant={activeTab === "system" ? "default" : "ghost"}
                      className={`w-full justify-start rounded-xl py-3 ${
                        activeTab === "system" ? "bg-blue-800 text-white" : ""
                      }`}
                      onClick={() => setActiveTab("system")}
                    >
                      <Shield className="mr-2 h-5 w-5" />
                      Sistema e Segurança
                    </Button>
                  )}

                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "profile" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Meu Perfil
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-center mt-4"
                    onClick={() => {
                      // Logout
                      router.push("/login")
                    }}
                  >
                    Sair
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === "dashboard" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Dashboard</CardTitle>
                      <CardDescription>Visão geral do sistema escolar</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-blue-50 dark:bg-blue-900/10 border-0">
                      <CardContent className="p-6 flex items-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total de Alunos</p>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,248</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/10 border-0">
                      <CardContent className="p-6 flex items-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4">
                          <School className="h-6 w-6 text-green-600 dark:text-green-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total de Professores</p>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">87</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/10 border-0">
                      <CardContent className="p-6 flex items-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-4">
                          <Book className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total de Turmas</p>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">42</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Atividades Recentes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              icon: <UserPlus className="h-4 w-4 text-green-500" />,
                              title: "Novo aluno registrado",
                              description: "Ana Silva foi adicionada à 9ª Classe",
                              time: "Há 2 horas",
                            },
                            {
                              icon: <FileText className="h-4 w-4 text-blue-500" />,
                              title: "Material didático adicionado",
                              description: "Prof. Carlos adicionou material de Física",
                              time: "Há 3 horas",
                            },
                            {
                              icon: <Bell className="h-4 w-4 text-yellow-500" />,
                              title: "Notificação enviada",
                              description: "Aviso sobre reunião de pais enviado",
                              time: "Há 5 horas",
                            },
                            {
                              icon: <BarChart className="h-4 w-4 text-purple-500" />,
                              title: "Notas atualizadas",
                              description: "Notas do 2º trimestre publicadas",
                              time: "Há 1 dia",
                            },
                          ].map((activity, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
                                {activity.icon}
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                              </div>
                              <div className="text-xs text-gray-400">{activity.time}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Calendário Acadêmico</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              date: "15 Maio",
                              title: "Provas do 2º Trimestre",
                              type: "Avaliação",
                              classes: "Todas as turmas",
                            },
                            {
                              date: "22 Maio",
                              title: "Reunião de Pais e Mestres",
                              type: "Evento",
                              classes: "8ª e 9ª Classes",
                            },
                            {
                              date: "1 Junho",
                              title: "Dia da Criança",
                              type: "Feriado",
                              classes: "Todas as turmas",
                            },
                            {
                              date: "10 Junho",
                              title: "Feira de Ciências",
                              type: "Evento",
                              classes: "Todas as turmas",
                            },
                          ].map((event, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-16 text-center mr-4">
                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg p-2 text-sm font-medium">
                                  {event.date}
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{event.title}</p>
                                <div className="flex items-center mt-1">
                                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded mr-2">
                                    {event.type}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{event.classes}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Desempenho Acadêmico</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { subject: "Matemática", average: 14.2, color: "bg-blue-500" },
                            { subject: "Português", average: 15.8, color: "bg-green-500" },
                            { subject: "Ciências", average: 13.5, color: "bg-yellow-500" },
                          ].map((subject, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">{subject.subject}</h4>
                                <span className="text-sm font-bold">{subject.average}/20</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div
                                  className={`${subject.color} h-2.5 rounded-full`}
                                  style={{ width: `${(subject.average / 20) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <Button variant="outline" className="mr-2">
                            <PieChart className="mr-2 h-4 w-4" />
                            Ver Estatísticas Detalhadas
                          </Button>
                          <Button className="bg-blue-800 hover:bg-blue-700">
                            <Download className="mr-2 h-4 w-4" />
                            Exportar Relatório
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}

            {activeTab === "academic" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestão Acadêmica</CardTitle>
                      <CardDescription>Gerencie turmas, disciplinas, horários e avaliações</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Turmas</CardTitle>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-1" /> Nova Turma
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "8ª Classe - A", students: 32, teacher: "Maria Fernandes" },
                            { name: "9ª Classe - B", students: 28, teacher: "João Silva" },
                            { name: "10ª Classe - A", students: 30, teacher: "Gabriel Vieira" },
                            { name: "11ª Classe - C", students: 25, teacher: "Ana Oliveira" },
                          ].map((classItem, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{classItem.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {classItem.students} alunos • Prof. {classItem.teacher}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                Gerenciar
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Disciplinas</CardTitle>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-1" /> Nova Disciplina
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "Matemática", teachers: 5, classes: "Todas" },
                            { name: "Português", teachers: 4, classes: "Todas" },
                            { name: "Física", teachers: 3, classes: "9ª-12ª" },
                            { name: "Biologia", teachers: 2, classes: "8ª-12ª" },
                          ].map((discipline, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{discipline.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {discipline.teachers} professores • Classes: {discipline.classes}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Horários</CardTitle>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-1" /> Novo Horário
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { class: "8ª Classe - A", updated: "10/05/2023", status: "Ativo" },
                            { class: "9ª Classe - B", updated: "15/05/2023", status: "Ativo" },
                            { class: "10ª Classe - A", updated: "12/05/2023", status: "Ativo" },
                            { class: "11ª Classe - C", updated: "08/05/2023", status: "Pendente" },
                          ].map((schedule, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{schedule.class}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Atualizado em {schedule.updated} •{" "}
                                  <span
                                    className={
                                      schedule.status === "Ativo"
                                        ? "text-green-500 dark:text-green-400"
                                        : "text-yellow-500 dark:text-yellow-400"
                                    }
                                  >
                                    {schedule.status}
                                  </span>
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                Visualizar
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Avaliações</CardTitle>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-1" /> Nova Avaliação
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              title: "Prova de Matemática",
                              date: "20/05/2023",
                              classes: "10ª Classe",
                              status: "Agendada",
                            },
                            {
                              title: "Teste de Português",
                              date: "22/05/2023",
                              classes: "8ª e 9ª Classes",
                              status: "Agendada",
                            },
                            {
                              title: "Exame de Física",
                              date: "15/05/2023",
                              classes: "11ª Classe",
                              status: "Concluída",
                            },
                            {
                              title: "Avaliação de Biologia",
                              date: "10/05/2023",
                              classes: "9ª Classe",
                              status: "Concluída",
                            },
                          ].map((exam, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{exam.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {exam.date} • {exam.classes} •{" "}
                                  <span
                                    className={
                                      exam.status === "Agendada"
                                        ? "text-blue-500 dark:text-blue-400"
                                        : "text-green-500 dark:text-green-400"
                                    }
                                  >
                                    {exam.status}
                                  </span>
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                {exam.status === "Agendada" ? "Editar" : "Ver Notas"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Notas</CardTitle>
                        <div>
                          <Button variant="outline" size="sm" className="mr-2">
                            <Download className="h-4 w-4 mr-1" /> Exportar
                          </Button>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-1" /> Adicionar Notas
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Aluno
                              </th>
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
                                Professor
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Ações
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            {[
                              {
                                student: "Ana Silva",
                                subject: "Matemática",
                                grade: 18,
                                term: "2º Trimestre",
                                teacher: "Gabriel Vieira",
                              },
                              {
                                student: "Pedro Santos",
                                subject: "Português",
                                grade: 16,
                                term: "2º Trimestre",
                                teacher: "Maria Fernandes",
                              },
                              {
                                student: "Carla Oliveira",
                                subject: "Física",
                                grade: 14,
                                term: "2º Trimestre",
                                teacher: "João Silva",
                              },
                              {
                                student: "Miguel Costa",
                                subject: "Biologia",
                                grade: 17,
                                term: "2º Trimestre",
                                teacher: "Ana Oliveira",
                              },
                            ].map((grade, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {grade.student}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 dark:text-gray-300">{grade.subject}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div
                                    className={`text-sm font-medium ${
                                      grade.grade >= 14
                                        ? "text-green-600 dark:text-green-400"
                                        : grade.grade >= 10
                                          ? "text-blue-600 dark:text-blue-400"
                                          : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {grade.grade} / 20
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 dark:text-gray-300">{grade.term}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 dark:text-gray-300">{grade.teacher}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                    Editar
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}

            {activeTab === "users" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestão de Usuários</CardTitle>
                      <CardDescription>Gerencie alunos, professores e administradores</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-blue-50 dark:bg-blue-900/10 border-0">
                      <CardContent className="p-6 flex items-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Alunos</p>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,248</h3>
                          <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                            Gerenciar Alunos
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/10 border-0">
                      <CardContent className="p-6 flex items-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4">
                          <School className="h-6 w-6 text-green-600 dark:text-green-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Professores</p>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">87</h3>
                          <Button variant="link" size="sm" className="p-0 h-auto text-green-600 dark:text-green-400">
                            Gerenciar Professores
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/10 border-0">
                      <CardContent className="p-6 flex items-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-4">
                          <Shield className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Administradores</p>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</h3>
                          <Button variant="link" size="sm" className="p-0 h-auto text-purple-600 dark:text-purple-400">
                            Gerenciar Admins
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Usuários Recentes</h3>
                    <Button className="bg-blue-800 hover:bg-blue-700">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Adicionar Usuário
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Nome
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Tipo
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Data de Registro
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {[
                          {
                            name: "Ana Silva",
                            type: "Aluno",
                            email: "ana.silva@aluno.colegiomatola.co.mz",
                            status: "Ativo",
                            date: "15/05/2023",
                          },
                          {
                            name: "Carlos Santos",
                            type: "Professor",
                            email: "carlos.santos@colegiomatola.co.mz",
                            status: "Ativo",
                            date: "10/05/2023",
                          },
                          {
                            name: "Marta Oliveira",
                            type: "Admin",
                            email: "marta.oliveira@colegiomatola.co.mz",
                            status: "Ativo",
                            date: "05/05/2023",
                          },
                          {
                            name: "Pedro Costa",
                            type: "Aluno",
                            email: "pedro.costa@aluno.colegiomatola.co.mz",
                            status: "Inativo",
                            date: "01/05/2023",
                          },
                        ].map((user, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <Avatar>
                                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {user.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.type === "Aluno"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                    : user.type === "Professor"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                }`}
                              >
                                {user.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700 dark:text-gray-300">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.status === "Ativo"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {user.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                  Editar
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                  {user.status === "Ativo" ? "Desativar" : "Ativar"}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                                  <Key className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Atribuição de Turmas</CardTitle>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-1" /> Nova Atribuição
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { teacher: "Gabriel Vieira", subject: "Matemática", classes: "10ª A, 11ª B, 12ª A" },
                            { teacher: "Maria Fernandes", subject: "Biologia", classes: "9ª A, 9ª B, 10ª C" },
                            { teacher: "João Silva", subject: "Física", classes: "11ª A, 11ª C, 12ª B" },
                            { teacher: "Ana Oliveira", subject: "Português", classes: "8ª A, 8ª B, 9ª C" },
                          ].map((assignment, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{assignment.teacher}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {assignment.subject} • Turmas: {assignment.classes}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "reports" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Relatórios e Estatísticas</CardTitle>
                      <CardDescription>Visualize e exporte dados sobre o desempenho escolar</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-blue-50 dark:bg-blue-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Média Geral</h3>
                        <div className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-2">14.8</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-green-500">↑ 0.5</span> em relação ao trimestre anterior
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Taxa de Aprovação</h3>
                        <div className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">92%</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-green-500">↑ 3%</span> em relação ao ano anterior
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Frequência</h3>
                        <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-400 mb-2">95%</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-green-500">↑ 1%</span> em relação ao mês anterior
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Desempenho por Disciplina</CardTitle>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Exportar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { subject: "Matemática", average: 14.2, trend: "up" },
                            { subject: "Português", average: 15.8, trend: "up" },
                            { subject: "Física", average: 13.5, trend: "down" },
                            { subject: "Biologia", average: 16.2, trend: "up" },
                            { subject: "História", average: 14.9, trend: "neutral" },
                          ].map((subject, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex-grow">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {subject.subject}
                                  </span>
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {subject.average}/20{" "}
                                    {subject.trend === "up" ? (
                                      <span className="text-green-500">↑</span>
                                    ) : subject.trend === "down" ? (
                                      <span className="text-red-500">↓</span>
                                    ) : (
                                      <span className="text-gray-500">→</span>
                                    )}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div
                                    className={`h-2.5 rounded-full ${
                                      subject.average >= 16
                                        ? "bg-green-500"
                                        : subject.average >= 14
                                          ? "bg-blue-500"
                                          : subject.average >= 10
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                    style={{ width: `${(subject.average / 20) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Desempenho por Turma</CardTitle>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Exportar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { class: "8ª Classe - A", average: 15.2, trend: "up" },
                            { class: "9ª Classe - B", average: 14.8, trend: "up" },
                            { class: "10ª Classe - A", average: 13.5, trend: "down" },
                            { class: "11ª Classe - C", average: 16.2, trend: "up" },
                            { class: "12ª Classe - B", average: 14.9, trend: "neutral" },
                          ].map((classItem, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex-grow">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {classItem.class}
                                  </span>
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {classItem.average}/20{" "}
                                    {classItem.trend === "up" ? (
                                      <span className="text-green-500">↑</span>
                                    ) : classItem.trend === "down" ? (
                                      <span className="text-red-500">↓</span>
                                    ) : (
                                      <span className="text-gray-500">→</span>
                                    )}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div
                                    className={`h-2.5 rounded-full ${
                                      classItem.average >= 16
                                        ? "bg-green-500"
                                        : classItem.average >= 14
                                          ? "bg-blue-500"
                                          : classItem.average >= 10
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                    style={{ width: `${(classItem.average / 20) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Frequência de Alunos</CardTitle>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Exportar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { month: "Janeiro", attendance: 94 },
                            { month: "Fevereiro", attendance: 92 },
                            { month: "Março", attendance: 95 },
                            { month: "Abril", attendance: 93 },
                            { month: "Maio", attendance: 96 },
                          ].map((month, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex-grow">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {month.month}
                                  </span>
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {month.attendance}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div
                                    className={`h-2.5 rounded-full ${
                                      month.attendance >= 95
                                        ? "bg-green-500"
                                        : month.attendance >= 90
                                          ? "bg-blue-500"
                                          : month.attendance >= 85
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                    style={{ width: `${month.attendance}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Engajamento de Professores</CardTitle>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Exportar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { teacher: "Gabriel Vieira", logins: 45, materials: 12 },
                            { teacher: "Maria Fernandes", logins: 38, materials: 8 },
                            { teacher: "João Silva", logins: 42, materials: 10 },
                            { teacher: "Ana Oliveira", logins: 36, materials: 7 },
                            { teacher: "Carlos Santos", logins: 30, materials: 5 },
                          ].map((teacher, index) => (
                            <div
                              key={index}
                              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="flex justify-between mb-1">
                                <span className="font-medium text-gray-900 dark:text-gray-100">{teacher.teacher}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {teacher.logins} acessos este mês
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {teacher.materials} materiais publicados
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Relatórios Disponíveis</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {
                            title: "Boletim de Notas",
                            description: "Notas de todos os alunos por turma e disciplina",
                            icon: <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                          },
                          {
                            title: "Relatório de Frequência",
                            description: "Registro de presença de alunos e professores",
                            icon: <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />,
                          },
                          {
                            title: "Desempenho Acadêmico",
                            description: "Análise detalhada do desempenho por turma",
                            icon: <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
                          },
                          {
                            title: "Relatório de Professores",
                            description: "Atividade e desempenho dos professores",
                            icon: <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
                          },
                          {
                            title: "Histórico Escolar",
                            description: "Histórico completo de alunos selecionados",
                            icon: <FileCheck className="h-6 w-6 text-red-600 dark:text-red-400" />,
                          },
                          {
                            title: "Relatório Anual",
                            description: "Resumo completo do ano letivo",
                            icon: <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
                          },
                        ].map((report, index) => (
                          <Card key={index} className="border border-gray-200 dark:border-gray-700">
                            <CardContent className="p-4 flex flex-col h-full">
                              <div className="mb-4">{report.icon}</div>
                              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{report.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                                {report.description}
                              </p>
                              <div className="flex space-x-2 mt-auto">
                                <Button variant="outline" size="sm" className="flex-1">
                                  Visualizar
                                </Button>
                                <Button size="sm" className="flex-1 bg-blue-800 hover:bg-blue-700">
                                  Exportar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}

            {activeTab === "communication" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Comunicação</CardTitle>
                      <CardDescription>Envie mensagens e anúncios para alunos e professores</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Nova Mensagem</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Destinatários
                            </label>
                            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                              <option value="all">Todos os usuários</option>
                              <option value="students">Todos os alunos</option>
                              <option value="teachers">Todos os professores</option>
                              <option value="class-8">8ª Classe</option>
                              <option value="class-9">9ª Classe</option>
                              <option value="class-10">10ª Classe</option>
                              <option value="class-11">11ª Classe</option>
                              <option value="class-12">12ª Classe</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Título
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Digite o título da mensagem"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Conteúdo
                            </label>
                            <textarea
                              rows={5}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Digite o conteúdo da mensagem"
                            ></textarea>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="urgent"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="urgent" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Marcar como urgente
                            </label>
                          </div>

                          <div className="flex justify-end">
                            <Button className="bg-blue-800 hover:bg-blue-700">
                              <Send className="mr-2 h-4 w-4" />
                              Enviar Mensagem
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Anúncios Pendentes</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              title: "Feira de Ciências",
                              author: "Maria Fernandes",
                              date: "15/05/2023",
                              status: "Pendente",
                            },
                            {
                              title: "Campeonato de Xadrez",
                              author: "João Silva",
                              date: "14/05/2023",
                              status: "Pendente",
                            },
                            {
                              title: "Palestra sobre Universidades",
                              author: "Ana Oliveira",
                              date: "12/05/2023",
                              status: "Pendente",
                            },
                          ].map((announcement, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="flex justify-between mb-2">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">{announcement.title}</h3>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    announcement.status === "Pendente"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  }`}
                                >
                                  {announcement.status}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <span>Por: {announcement.author}</span>
                                <span className="mx-2">•</span>
                                <span>{announcement.date}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                  Ver Detalhes
                                </Button>
                                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                                  Aprovar
                                </Button>
                                <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                                  Recusar
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Mensagens Enviadas</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Reunião de Pais e Mestres",
                            content:
                              "Informamos que a reunião de pais e mestres será realizada no dia 22 de maio, às 18h, no auditório da escola.",
                            recipients: "Todos os pais e alunos",
                            date: "10/05/2023",
                            status: "Enviado",
                          },
                          {
                            title: "Alteração no Horário de Aulas",
                            content:
                              "Informamos que a partir do dia 15 de maio, as aulas começarão às 7h30 em vez de 7h.",
                            recipients: "Todos os usuários",
                            date: "08/05/2023",
                            status: "Enviado",
                          },
                          {
                            title: "Calendário de Provas",
                            content: "O calendário de provas do 2º trimestre já está disponível no portal do aluno.",
                            recipients: "Todos os alunos",
                            date: "05/05/2023",
                            status: "Enviado",
                          },
                        ].map((message, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex justify-between mb-2">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">{message.title}</h3>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  message.status === "Enviado"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                }`}
                              >
                                {message.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{message.content}</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <span>Para: {message.recipients}</span>
                              <span className="mx-2">•</span>
                              <span>{message.date}</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                Ver Detalhes
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                Reenviar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}

            {activeTab === "financial" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestão Financeira</CardTitle>
                      <CardDescription>Gerencie mensalidades, faturas e pagamentos</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-green-50 dark:bg-green-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Receita Mensal</h3>
                        <div className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">1.245.000 MT</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-green-500">↑ 5%</span> em relação ao mês anterior
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 dark:bg-blue-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Taxa de Pagamento</h3>
                        <div className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-2">92%</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-green-500">↑ 3%</span> em relação ao mês anterior
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-red-50 dark:bg-red-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Pagamentos Pendentes</h3>
                        <div className="text-3xl font-bold text-red-800 dark:text-red-400 mb-2">98.500 MT</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-red-500">↓ 2%</span> em relação ao mês anterior
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Mensalidades Recentes</CardTitle>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-1" /> Nova Mensalidade
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              student: "Ana Silva",
                              amount: "12.500 MT",
                              dueDate: "15/05/2023",
                              status: "Pago",
                              paymentDate: "10/05/2023",
                            },
                            {
                              student: "Pedro Santos",
                              amount: "12.500 MT",
                              dueDate: "15/05/2023",
                              status: "Pendente",
                              paymentDate: "-",
                            },
                            {
                              student: "Carla Oliveira",
                              amount: "12.500 MT",
                              dueDate: "15/05/2023",
                              status: "Pago",
                              paymentDate: "12/05/2023",
                            },
                            {
                              student: "Miguel Costa",
                              amount: "12.500 MT",
                              dueDate: "15/05/2023",
                              status: "Atrasado",
                              paymentDate: "-",
                            },
                          ].map((payment, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{payment.student}</p>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <span>{payment.amount}</span>
                                  <span className="mx-2">•</span>
                                  <span>Vencimento: {payment.dueDate}</span>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full mr-3 ${
                                    payment.status === "Pago"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : payment.status === "Pendente"
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                  }`}
                                >
                                  {payment.status}
                                </span>
                                <Button variant="ghost" size="sm">
                                  Detalhes
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Histórico de Pagamentos</CardTitle>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Exportar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              month: "Maio 2023",
                              total: "1.245.000 MT",
                              paid: "1.146.500 MT",
                              pending: "98.500 MT",
                              rate: "92%",
                            },
                            {
                              month: "Abril 2023",
                              total: "1.245.000 MT",
                              paid: "1.120.500 MT",
                              pending: "124.500 MT",
                              rate: "90%",
                            },
                            {
                              month: "Março 2023",
                              total: "1.245.000 MT",
                              paid: "1.182.750 MT",
                              pending: "62.250 MT",
                              rate: "95%",
                            },
                            {
                              month: "Fevereiro 2023",
                              total: "1.245.000 MT",
                              paid: "1.157.850 MT",
                              pending: "87.150 MT",
                              rate: "93%",
                            },
                          ].map((month, index) => (
                            <div
                              key={index}
                              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="flex justify-between mb-2">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">{month.month}</h3>
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                  Taxa: {month.rate}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Total</p>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">{month.total}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Pago</p>
                                  <p className="font-medium text-green-600 dark:text-green-400">{month.paid}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Pendente</p>
                                  <p className="font-medium text-red-600 dark:text-red-400">{month.pending}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Alunos com Pagamentos Pendentes</CardTitle>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-1" /> Enviar Lembretes
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Aluno
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Classe
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Valor Pendente
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Vencimento
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Ações
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            {[
                              {
                                student: "Pedro Santos",
                                class: "9ª Classe - B",
                                amount: "12.500 MT",
                                dueDate: "15/05/2023",
                                status: "Pendente",
                                days: 0,
                              },
                              {
                                student: "Miguel Costa",
                                class: "10ª Classe - A",
                                amount: "12.500 MT",
                                dueDate: "15/04/2023",
                                status: "Atrasado",
                                days: 30,
                              },
                              {
                                student: "Sofia Mendes",
                                class: "8ª Classe - C",
                                amount: "12.500 MT",
                                dueDate: "15/05/2023",
                                status: "Pendente",
                                days: 0,
                              },
                              {
                                student: "Lucas Ferreira",
                                class: "11ª Classe - A",
                                amount: "12.500 MT",
                                dueDate: "15/03/2023",
                                status: "Atrasado",
                                days: 60,
                              },
                            ].map((student, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <Avatar>
                                        <AvatarImage
                                          src={`/placeholder.svg?height=40&width=40`}
                                          alt={student.student}
                                        />
                                        <AvatarFallback>{student.student.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {student.student}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 dark:text-gray-300">{student.class}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {student.amount}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 dark:text-gray-300">{student.dueDate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      student.status === "Pendente"
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                    }`}
                                  >
                                    {student.status}
                                    {student.days > 0 ? ` (${student.days} dias)` : ""}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                      Detalhes
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                                      Registrar
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}

            {activeTab === "system" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sistema e Segurança</CardTitle>
                      <CardDescription>Gerencie configurações do sistema, logs e backups</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-blue-50 dark:bg-blue-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Usuários Ativos</h3>
                        <div className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-2">42</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nas últimas 24 horas</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Último Backup</h3>
                        <div className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">15/05/2023</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Há 2 dias</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Versão do Sistema</h3>
                        <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-400 mb-2">v2.5.3</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Atualizado em 10/05/2023</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Logs de Acesso</CardTitle>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Exportar Logs
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              user: "Gabriel Vieira",
                              action: "Login",
                              ip: "192.168.1.105",
                              time: "15/05/2023 14:32",
                              status: "Sucesso",
                            },
                            {
                              user: "Maria Fernandes",
                              action: "Alteração de Nota",
                              ip: "192.168.1.110",
                              time: "15/05/2023 13:45",
                              status: "Sucesso",
                            },
                            {
                              user: "admin@colegiomatola.co.mz",
                              action: "Login",
                              ip: "192.168.1.1",
                              time: "15/05/2023 12:20",
                              status: "Sucesso",
                            },
                            {
                              user: "joao.silva@colegiomatola.co.mz",
                              action: "Login",
                              ip: "192.168.1.120",
                              time: "15/05/2023 11:15",
                              status: "Falha",
                            },
                            {
                              user: "Ana Oliveira",
                              action: "Upload de Material",
                              ip: "192.168.1.115",
                              time: "15/05/2023 10:30",
                              status: "Sucesso",
                            },
                          ].map((log, index) => (
                            <div
                              key={index}
                              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="flex justify-between mb-1">
                                <span className="font-medium text-gray-900 dark:text-gray-100">{log.user}</span>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    log.status === "Sucesso"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                  }`}
                                >
                                  {log.status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                <span>{log.action}</span>
                                <span className="mx-2">•</span>
                                <span>IP: {log.ip}</span>
                                <span className="mx-2">•</span>
                                <span>{log.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Backups do Sistema</CardTitle>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            <Save className="h-4 w-4 mr-1" /> Novo Backup
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              date: "15/05/2023",
                              time: "02:00",
                              size: "1.2 GB",
                              type: "Automático",
                              status: "Sucesso",
                            },
                            {
                              date: "14/05/2023",
                              time: "02:00",
                              size: "1.2 GB",
                              type: "Automático",
                              status: "Sucesso",
                            },
                            {
                              date: "13/05/2023",
                              time: "02:00",
                              size: "1.1 GB",
                              type: "Automático",
                              status: "Sucesso",
                            },
                            { date: "12/05/2023", time: "15:30", size: "1.1 GB", type: "Manual", status: "Sucesso" },
                            { date: "12/05/2023", time: "02:00", size: "1.1 GB", type: "Automático", status: "Falha" },
                          ].map((backup, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  Backup de {backup.date} {backup.time}
                                </p>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <span>{backup.size}</span>
                                  <span className="mx-2">•</span>
                                  <span>{backup.type}</span>
                                  <span className="mx-2">•</span>
                                  <span
                                    className={
                                      backup.status === "Sucesso"
                                        ? "text-green-500 dark:text-green-400"
                                        : "text-red-500 dark:text-red-400"
                                    }
                                  >
                                    {backup.status}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" /> Baixar
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Configurações do Sistema</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Nome da Escola
                            </label>
                            <input
                              type="text"
                              defaultValue="Colégio Privado da Matola"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Ano Letivo Atual
                            </label>
                            <input
                              type="text"
                              defaultValue="2023"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Email de Contato
                            </label>
                            <input
                              type="email"
                              defaultValue="contato@colegiomatola.co.mz"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Tema do Sistema
                            </label>
                            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                              <option value="light">Claro</option>
                              <option value="dark">Escuro</option>
                              <option value="system">Sistema</option>
                            </select>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="autoBackup"
                              defaultChecked={true}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="autoBackup" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Backup automático diário
                            </label>
                          </div>

                          <div className="flex justify-end">
                            <Button className="bg-blue-800 hover:bg-blue-700">Salvar Configurações</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Integrações</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "Google Workspace", status: "Conectado", lastSync: "15/05/2023 10:30" },
                            { name: "Microsoft 365", status: "Desconectado", lastSync: "-" },
                            { name: "Sistema de Pagamentos", status: "Conectado", lastSync: "15/05/2023 08:15" },
                            { name: "Biblioteca Digital", status: "Conectado", lastSync: "14/05/2023 16:45" },
                          ].map((integration, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{integration.name}</p>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <span
                                    className={
                                      integration.status === "Conectado"
                                        ? "text-green-500 dark:text-green-400"
                                        : "text-red-500 dark:text-red-400"
                                    }
                                  >
                                    {integration.status}
                                  </span>
                                  {integration.lastSync !== "-" && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span>Última sincronização: {integration.lastSync}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className={
                                  integration.status === "Conectado"
                                    ? "text-red-600 hover:text-red-800"
                                    : "text-green-600 hover:text-green-800"
                                }
                              >
                                {integration.status === "Conectado" ? "Desconectar" : "Conectar"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "profile" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Meu Perfil</CardTitle>
                      <CardDescription>Visualize e edite suas informações pessoais</CardDescription>
                    </div>
                    <Button className="bg-blue-800 hover:bg-blue-700">Editar Perfil</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                        <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white dark:border-gray-700">
                          <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name} />
                          <AvatarFallback className="bg-blue-600 text-3xl">{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-1">{user?.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{user?.email}</p>
                        <Button variant="outline" className="w-full">
                          Alterar Foto
                        </Button>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mt-6">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Informações de Acesso</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Último acesso</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">15/05/2023 14:32</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">IP</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">192.168.1.105</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Tipo de Conta</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {user?.adminType === "SUPREME"
                                ? "Administrador Supremo"
                                : user?.adminType === "GENERAL"
                                  ? "Administrador Geral"
                                  : user?.adminType === "PEDAGOGICAL"
                                    ? "Coordenador Pedagógico"
                                    : user?.adminType === "SECRETARY"
                                      ? "Secretaria"
                                      : "Administrador Técnico"}
                            </p>
                          </div>
                        </div>
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
                            defaultValue={user?.name}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={user?.email}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            defaultValue="+258 84 123 4567"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cargo
                          </label>
                          <input
                            type="text"
                            defaultValue={
                              user?.adminType === "SUPREME"
                                ? "Administrador Supremo"
                                : user?.adminType === "GENERAL"
                                  ? "Administrador Geral"
                                  : user?.adminType === "PEDAGOGICAL"
                                    ? "Coordenador Pedagógico"
                                    : user?.adminType === "SECRETARY"
                                      ? "Secretaria"
                                      : "Administrador Técnico"
                            }
                            readOnly
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          />
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-4">Segurança</h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Senha Atual
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Digite sua senha atual"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nova Senha
                              </label>
                              <input
                                type="password"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Digite a nova senha"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirmar Nova Senha
                              </label>
                              <input
                                type="password"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Confirme a nova senha"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-4">Preferências</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">Notificações por Email</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Receber alertas e notificações por email
                              </p>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                              <input
                                type="checkbox"
                                id="emailNotifications"
                                defaultChecked={true}
                                className="absolute w-0 h-0 opacity-0"
                              />
                              <label
                                htmlFor="emailNotifications"
                                className="absolute inset-0 cursor-pointer rounded-full bg-blue-800"
                              >
                                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform translate-x-6"></span>
                              </label>
                            </div>
                          </div>

                          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">Tema Escuro</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Alternar entre tema claro e escuro
                              </p>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                              <input
                                type="checkbox"
                                id="darkMode"
                                defaultChecked={false}
                                className="absolute w-0 h-0 opacity-0"
                              />
                              <label
                                htmlFor="darkMode"
                                className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 dark:bg-blue-800"
                              >
                                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 dark:transform dark:translate-x-6"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-8 flex justify-end">
                        <Button className="bg-blue-800 hover:bg-blue-700 text-white">Salvar Alterações</Button>
                      </div>
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
