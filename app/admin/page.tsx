"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart2,
  MessageSquare,
  DollarSign,
  Shield,
  Settings,
  Bell,
  LogOut,
  Plus,
  Trash2,
  Download,
  Upload,
  Search,
  Edit,
  Eye,
  Lock,
  UserPlus,
  Database,
  FileSpreadsheet,
  Clock,
} from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("academic")

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <div>
              <h2 className="font-bold text-blue-800 dark:text-blue-400">Colégio Privado</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Painel Administrativo</p>
            </div>
          </Link>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative">
              <Image
                src="/admin-gabriel.jpg"
                alt="Admin"
                width={40}
                height={40}
                className="rounded-full border-2 border-blue-500"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-medium text-sm">Gabriel</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin Supremo</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("academic")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm ${
                activeTab === "academic"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
              }`}
            >
              <BookOpen size={18} />
              <span>Gestão Acadêmica</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm ${
                activeTab === "users"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
              }`}
            >
              <Users size={18} />
              <span>Gestão de Usuários</span>
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm ${
                activeTab === "reports"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
              }`}
            >
              <BarChart2 size={18} />
              <span>Relatórios</span>
            </button>

            <button
              onClick={() => setActiveTab("communication")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm ${
                activeTab === "communication"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
              }`}
            >
              <MessageSquare size={18} />
              <span>Comunicação</span>
            </button>

            <button
              onClick={() => setActiveTab("financial")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm ${
                activeTab === "financial"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
              }`}
            >
              <DollarSign size={18} />
              <span>Financeiro</span>
            </button>

            <button
              onClick={() => setActiveTab("system")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm ${
                activeTab === "system"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
              }`}
            >
              <Shield size={18} />
              <span>Sistema e Segurança</span>
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200 dark:border-gray-700">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700">
              <LogOut size={18} className="mr-2" />
              Sair do Painel
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {activeTab === "academic" && "Gestão Acadêmica"}
            {activeTab === "users" && "Gestão de Usuários"}
            {activeTab === "reports" && "Relatórios e Estatísticas"}
            {activeTab === "communication" && "Comunicação"}
            {activeTab === "financial" && "Financeiro"}
            {activeTab === "system" && "Sistema e Segurança"}
          </h1>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="md:hidden">
              <Button variant="outline" size="sm">
                Menu
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Academic Management */}
          {activeTab === "academic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total de Turmas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-gray-500 mt-1">8 turmas por nível</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total de Disciplinas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-gray-500 mt-1">Ativas no currículo</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avaliações Agendadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-gray-500 mt-1">Próximos 30 dias</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.8</div>
                    <p className="text-xs text-gray-500 mt-1">Todas as turmas</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Turmas</CardTitle>
                      <Button size="sm">
                        <Plus size={16} className="mr-1" /> Nova Turma
                      </Button>
                    </div>
                    <CardDescription>Gerencie todas as turmas da escola</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Turma
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Nível
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Alunos
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">8ª A</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">Ensino Fundamental</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">32</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye size={14} className="mr-1" /> Ver
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit size={14} className="mr-1" /> Editar
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">9ª B</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">Ensino Fundamental</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">28</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye size={14} className="mr-1" /> Ver
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit size={14} className="mr-1" /> Editar
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">10ª C</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">Ensino Médio</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">30</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye size={14} className="mr-1" /> Ver
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit size={14} className="mr-1" /> Editar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Próximas Avaliações</CardTitle>
                    <CardDescription>Calendário de provas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-lg p-2 text-center min-w-[60px]">
                          <div className="text-xs">JUN</div>
                          <div className="text-xl font-bold">15</div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Matemática - 10ª Classe</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Álgebra e Funções</p>
                          <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} className="mr-1" /> 08:00 - 10:00
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-lg p-2 text-center min-w-[60px]">
                          <div className="text-xs">JUN</div>
                          <div className="text-xl font-bold">16</div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Português - 9ª Classe</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Literatura Africana</p>
                          <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} className="mr-1" /> 10:30 - 12:30
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-lg p-2 text-center min-w-[60px]">
                          <div className="text-xs">JUN</div>
                          <div className="text-xl font-bold">17</div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Ciências - 8ª Classe</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Biologia Celular</p>
                          <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} className="mr-1" /> 08:00 - 10:00
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-2">
                        <Calendar size={14} className="mr-2" /> Ver Calendário Completo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Disciplinas</CardTitle>
                      <Button size="sm">
                        <Plus size={16} className="mr-1" /> Nova Disciplina
                      </Button>
                    </div>
                    <CardDescription>Gerencie o currículo escolar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Matemática</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Ensino Fundamental e Médio</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Português</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Ensino Fundamental e Médio</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">História</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Ensino Fundamental e Médio</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Geografia</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Ensino Fundamental e Médio</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notas Recentes</CardTitle>
                    <CardDescription>Últimas avaliações registradas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full p-2">
                            <FileText size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Matemática - 10ª A</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Prof. Gabriel Vieira</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">Média: 7.5</div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">12/06/2023</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full p-2">
                            <FileText size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Português - 9ª B</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Profa. Maria Santos</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">Média: 8.2</div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">10/06/2023</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full p-2">
                            <FileText size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Ciências - 8ª C</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Prof. João Oliveira</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">Média: 6.8</div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">08/06/2023</p>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-2">
                        <Eye size={14} className="mr-2" /> Ver Todas as Notas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">720</div>
                    <p className="text-xs text-gray-500 mt-1">Ativos no sistema</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total de Professores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-gray-500 mt-1">Em todas as disciplinas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Coordenadores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6</div>
                    <p className="text-xs text-gray-500 mt-1">Pedagógicos e de área</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Administradores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-gray-500 mt-1">Com diferentes níveis</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Gerenciar Usuários</CardTitle>
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <UserPlus size={16} className="mr-1" /> Novo Usuário
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload size={16} className="mr-1" /> Importar
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Adicione, edite ou remova usuários do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Buscar usuários..."
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800">
                        <option value="">Todos os tipos</option>
                        <option value="student">Alunos</option>
                        <option value="teacher">Professores</option>
                        <option value="admin">Administradores</option>
                      </select>
                      <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800">
                        <option value="">Todas as turmas</option>
                        <option value="8">8ª Classe</option>
                        <option value="9">9ª Classe</option>
                        <option value="10">10ª Classe</option>
                        <option value="11">11ª Classe</option>
                        <option value="12">12ª Classe</option>
                      </select>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Nome
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Turma/Disciplina
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="/teacher-gabriel.jpg" alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">Gabriel Vieira</div>
                                <div className="text-xs text-gray-500">Ativo desde 2020</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Professor
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">gabriel.vieira@colegiomatola.co.mz</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Matemática</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit size={14} className="mr-1" /> Editar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Lock size={14} className="mr-1" /> Redefinir Senha
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="/teacher-maria.jpg" alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">Maria Santos</div>
                                <div className="text-xs text-gray-500">Ativa desde 2019</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Professora
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">maria.santos@colegiomatola.co.mz</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Português</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit size={14} className="mr-1" /> Editar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Lock size={14} className="mr-1" /> Redefinir Senha
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="/avatar-1.jpg" alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">Ana Silva</div>
                                <div className="text-xs text-gray-500">Ativa desde 2022</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Aluna
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">ana.silva@aluno.colegiomatola.co.mz</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">10ª A</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit size={14} className="mr-1" /> Editar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Lock size={14} className="mr-1" /> Redefinir Senha
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">Mostrando 3 de 766 usuários</div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" disabled>
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      >
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        Próximo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reports and Statistics */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Relatórios Acadêmicos</CardTitle>
                    <CardDescription>Desempenho e estatísticas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <BarChart2 className="text-blue-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Desempenho por Turma</h4>
                          <p className="text-xs text-gray-500">Médias e aprovações</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <BarChart2 className="text-green-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Desempenho por Disciplina</h4>
                          <p className="text-xs text-gray-500">Médias e aprovações</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <BarChart2 className="text-purple-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Evolução de Notas</h4>
                          <p className="text-xs text-gray-500">Comparativo trimestral</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <BarChart2 className="text-orange-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Ranking de Alunos</h4>
                          <p className="text-xs text-gray-500">Top 10 por turma</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Relatórios de Frequência</CardTitle>
                    <CardDescription>Presenças e faltas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Calendar className="text-blue-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Frequência de Alunos</h4>
                          <p className="text-xs text-gray-500">Por turma e período</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Calendar className="text-green-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Frequência de Professores</h4>
                          <p className="text-xs text-gray-500">Por disciplina</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Calendar className="text-red-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Alunos em Risco</h4>
                          <p className="text-xs text-gray-500">Faltas excessivas</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Relatórios de Sistema</CardTitle>
                    <CardDescription>Uso e atividade</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Users className="text-blue-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Atividade de Usuários</h4>
                          <p className="text-xs text-gray-500">Logins e acessos</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Database className="text-purple-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Uso do Sistema</h4>
                          <p className="text-xs text-gray-500">Recursos e acessos</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Shield className="text-green-500" size={20} />
                        <div>
                          <h4 className="text-sm font-medium">Logs de Segurança</h4>
                          <p className="text-xs text-gray-500">Tentativas de acesso</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-1" /> Exportar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Gerar Relatório Personalizado</CardTitle>
                    <Button size="sm">
                      <FileSpreadsheet size={16} className="mr-1" /> Novo Relatório
                    </Button>
                  </div>
                  <CardDescription>Crie relatórios personalizados com os dados que você precisa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800">
                        <option value="">Selecione um tipo</option>
                        <option value="academic">Acadêmico</option>
                        <option value="attendance">Frequência</option>
                        <option value="financial">Financeiro</option>
                        <option value="system">Sistema</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Período</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800">
                        <option value="">Selecione um período</option>
                        <option value="trimester1">1º Trimestre</option>
                        <option value="trimester2">2º Trimestre</option>
                        <option value="trimester3">3º Trimestre</option>
                        <option value="year">Ano Letivo Completo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Formato</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800">
                        <option value="">Selecione um formato</option>
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                        <option value="csv">CSV</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      <Download size={16} className="mr-1" /> Gerar Relatório
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Communication */}
          {activeTab === "communication" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-gray-500 mt-1">Nos últimos 30 dias</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Anúncios Publicados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-gray-500 mt-1">Nos últimos 30 dias</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-gray-500 mt-1">Média de visualizações</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Mensagens Pendentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-gray-500 mt-1">Aguardando aprovação</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Enviar Mensagem</CardTitle>
                    </div>
                    <CardDescription>Envie mensagens para alunos, professores ou turmas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Destinatários</label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800">
                          <option value="">Selecione os destinatários</option>
                          <option value="all">Todos os usuários</option>
                          <option value="students">Todos os alunos</option>
                          <option value="teachers">Todos os professores</option>
                          <option value="class8">8ª Classe</option>
                          <option value="class9">9ª Classe</option>
                          <option value="class10">10ª Classe</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Assunto</label>
                        <input
                          type="text"
                          placeholder="Digite o assunto da mensagem"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Mensagem</label>
                        <textarea
                          rows={5}
                          placeholder="Digite sua mensagem aqui..."
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        ></textarea>
                      </div>

                      <div className="flex justify-end">
                        <Button>
                          <MessageSquare size={16} className="mr-1" /> Enviar Mensagem
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Mensagens Pendentes</CardTitle>
                    </div>
                    <CardDescription>Aprove ou rejeite mensagens enviadas pelos professores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Aviso sobre Olimpíada de Matemática</h4>
                            <p className="text-xs text-gray-500">De: Gabriel Vieira (Professor de Matemática)</p>
                            <p className="text-xs text-gray-500">Para: 10ª Classe</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-green-500 hover:text-green-700">
                              Aprovar
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              Rejeitar
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm">
                          Caros alunos, informo que as inscrições para a Olimpíada de Matemática estão abertas até o dia
                          15/06. Interessados devem procurar-me após a aula.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Alteração na data da prova de Português</h4>
                            <p className="text-xs text-gray-500">De: Maria Santos (Professora de Português)</p>
                            <p className="text-xs text-gray-500">Para: 9ª Classe B</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-green-500 hover:text-green-700">
                              Aprovar
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              Rejeitar
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm">
                          Informo que a prova de Português agendada para o dia 10/06 foi transferida para o dia 12/06
                          devido a ajustes no calendário escolar.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Convite para Feira de Ciências</h4>
                            <p className="text-xs text-gray-500">De: João Oliveira (Professor de Ciências)</p>
                            <p className="text-xs text-gray-500">Para: Todos os alunos</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-green-500 hover:text-green-700">
                              Aprovar
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              Rejeitar
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm">
                          Convido todos os alunos para participarem da Feira de Ciências que acontecerá no dia 20/06 no
                          pátio da escola. Venham conhecer os projetos desenvolvidos pelos colegas!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Financial */}
          {activeTab === "financial" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Mensalidades Pagas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-gray-500 mt-1">Do mês atual</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Mensalidades Pendentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">108</div>
                    <p className="text-xs text-gray-500 mt-1">Alunos com pagamento atrasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">MZN 720.000</div>
                    <p className="text-xs text-gray-500 mt-1">Mês de Junho</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Receita Anual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">MZN 8.64M</div>
                    <p className="text-xs text-gray-500 mt-1">Projeção para 2023</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Gestão de Mensalidades</CardTitle>
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Plus size={16} className="mr-1" /> Novo Pagamento
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> Exportar
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Acompanhe o status de pagamento dos alunos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Buscar alunos..."
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800">
                        <option value="">Todas as turmas</option>
                        <option value="8">8ª Classe</option>
                        <option value="9">9ª Classe</option>
                        <option value="10">10ª Classe</option>
                        <option value="11">11ª Classe</option>
                        <option value="12">12ª Classe</option>
                      </select>
                      <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800">
                        <option value="">Todos os status</option>
                        <option value="paid">Pago</option>
                        <option value="pending">Pendente</option>
                        <option value="late">Atrasado</option>
                      </select>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Aluno
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Turma
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Valor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Vencimento
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="/avatar-1.jpg" alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">Ana Silva</div>
                                <div className="text-xs text-gray-500">ID: 2022001</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">10ª A</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">MZN 1.200</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Pago
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">05/06/2023</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye size={14} className="mr-1" /> Detalhes
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download size={14} className="mr-1" /> Recibo
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="/avatar-2.jpg" alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">Pedro Santos</div>
                                <div className="text-xs text-gray-500">ID: 2022015</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">9ª B</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">MZN 1.200</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                              Pendente
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">10/06/2023</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye size={14} className="mr-1" /> Detalhes
                              </Button>
                              <Button variant="outline" size="sm" className="text-blue-500 hover:text-blue-700">
                                <DollarSign size={14} className="mr-1" /> Registrar
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="/avatar-3.jpg" alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">Carla Mendes</div>
                                <div className="text-xs text-gray-500">ID: 2022042</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">11ª C</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">MZN 1.200</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                              Atrasado
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">01/06/2023</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye size={14} className="mr-1" /> Detalhes
                              </Button>
                              <Button variant="outline" size="sm" className="text-blue-500 hover:text-blue-700">
                                <DollarSign size={14} className="mr-1" /> Registrar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">Mostrando 3 de 720 alunos</div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" disabled>
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      >
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        Próximo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* System and Security */}
          {activeTab === "system" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-gray-500 mt-1">Nas últimas 24 horas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Tentativas de Login</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-gray-500 mt-1">Nas últimas 24 horas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Último Backup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12h atrás</div>
                    <p className="text-xs text-gray-500 mt-1">Realizado automaticamente</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Uso do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32%</div>
                    <p className="text-xs text-gray-500 mt-1">Capacidade do servidor</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Logs de Acesso</CardTitle>
                    <CardDescription>Últimos acessos ao sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full p-2">
                            <Users size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Gabriel Vieira</h4>
                            <p className="text-xs text-gray-500">Professor de Matemática</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">Login bem-sucedido</div>
                          <p className="text-xs text-gray-500">Hoje, 10:15</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full p-2">
                            <Users size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Maria Santos</h4>
                            <p className="text-xs text-gray-500">Professora de Português</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">Login bem-sucedido</div>
                          <p className="text-xs text-gray-500">Hoje, 09:45</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-full p-2">
                            <Users size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Usuário Desconhecido</h4>
                            <p className="text-xs text-gray-500">IP: 192.168.1.45</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">Tentativa falha</div>
                          <p className="text-xs text-gray-500">Hoje, 08:30</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full p-2">
                            <Users size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">Ana Silva</h4>
                            <p className="text-xs text-gray-500">Aluna - 10ª A</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">Login bem-sucedido</div>
                          <p className="text-xs text-gray-500">Ontem, 16:20</p>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-2">
                        <Eye size={14} className="mr-2" /> Ver Todos os Logs
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configurações do Sistema</CardTitle>
                    <CardDescription>Gerenciar configurações gerais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Backup Automático</h4>
                          <p className="text-xs text-gray-500">Backup diário do banco de dados</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            <Settings size={14} className="mr-1" /> Configurar
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Ano Letivo</h4>
                          <p className="text-xs text-gray-500">Configurar datas e períodos</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            <Settings size={14} className="mr-1" /> Configurar
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Segurança</h4>
                          <p className="text-xs text-gray-500">Políticas de senha e acesso</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            <Settings size={14} className="mr-1" /> Configurar
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Notificações</h4>
                          <p className="text-xs text-gray-500">Configurar emails e alertas</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            <Settings size={14} className="mr-1" /> Configurar
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Tema Visual</h4>
                          <p className="text-xs text-gray-500">Personalizar aparência do sistema</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            <Settings size={14} className="mr-1" /> Configurar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
