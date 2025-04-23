"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Book, FileText, Bell, BarChart, Settings, Upload, Plus, Trash2, Edit, Save, X } from "lucide-react"
import {
  getTeacherById,
  updateTeacherProfile,
  getMaterialsByTeacher,
  addMaterial,
  deleteMaterial,
  getStudentsByClass,
  addGrade,
  getGradesByTeacher,
  addNotification,
} from "@/lib/db"
import type { Teacher, Material, Grade } from "@/lib/db"

export default function TeacherDashboard() {
  const router = useRouter()
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [materials, setMaterials] = useState<Material[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [activeTab, setActiveTab] = useState("perfil")
  const [loading, setLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [editedEmail, setEditedEmail] = useState("")
  const [editedBio, setEditedBio] = useState("")

  // Estados para o formulário de material
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    subject: "",
    fileUrl: "#", // Em um ambiente real, isso seria um upload de arquivo
    classTarget: "8ª Classe",
  })

  // Estados para o formulário de notas
  const [selectedClass, setSelectedClass] = useState("8ª Classe")
  const [students, setStudents] = useState<{ id: string; name: string; class: string; grade: string }[]>([])
  const [newGrade, setNewGrade] = useState({
    studentId: "",
    studentName: "",
    value: 0,
    term: "1º Trimestre",
    comments: "",
  })

  // Estados para o formulário de notificações
  const [newNotification, setNewNotification] = useState({
    title: "",
    content: "",
    targetClass: "Todas as turmas",
  })

  useEffect(() => {
    // Verificar se o professor está logado
    const teacherId = localStorage.getItem("teacherId")
    if (!teacherId) {
      router.push("/professores")
      return
    }

    // Carregar dados do professor
    const teacherData = getTeacherById(teacherId)
    if (teacherData) {
      setTeacher(teacherData)
      setEditedEmail(teacherData.email)
      setEditedBio(teacherData.bio)

      // Carregar materiais do professor
      const teacherMaterials = getMaterialsByTeacher(teacherId)
      setMaterials(teacherMaterials)

      // Carregar notas do professor
      const teacherGrades = getGradesByTeacher(teacherId)
      setGrades(teacherGrades)

      // Carregar alunos da classe selecionada
      const classStudents = getStudentsByClass(selectedClass)
      setStudents(classStudents)
    }

    setLoading(false)
  }, [router, selectedClass])

  // Função para atualizar o perfil do professor
  const handleUpdateProfile = () => {
    if (!teacher) return

    const updatedTeacher = updateTeacherProfile(teacher.id, {
      email: editedEmail,
      bio: editedBio,
    })

    if (updatedTeacher) {
      setTeacher(updatedTeacher)
      setEditingProfile(false)
    }
  }

  // Função para adicionar novo material
  const handleAddMaterial = () => {
    if (!teacher) return

    const material = addMaterial({
      title: newMaterial.title,
      description: newMaterial.description,
      subject: teacher.subject,
      fileUrl: newMaterial.fileUrl,
      uploadDate: new Date().toISOString().split("T")[0],
      teacherId: teacher.id,
      classTarget: newMaterial.classTarget,
    })

    setMaterials([...materials, material])

    // Limpar formulário
    setNewMaterial({
      title: "",
      description: "",
      subject: "",
      fileUrl: "#",
      classTarget: "8ª Classe",
    })
  }

  // Função para excluir material
  const handleDeleteMaterial = (id: string) => {
    if (deleteMaterial(id)) {
      setMaterials(materials.filter((material) => material.id !== id))
    }
  }

  // Função para adicionar nova nota
  const handleAddGrade = () => {
    if (!teacher || !newGrade.studentId) return

    const grade = addGrade({
      studentId: newGrade.studentId,
      studentName: newGrade.studentName,
      subject: teacher.subject,
      teacherId: teacher.id,
      value: newGrade.value,
      term: newGrade.term,
      date: new Date().toISOString().split("T")[0],
      comments: newGrade.comments,
    })

    setGrades([...grades, grade])

    // Limpar formulário
    setNewGrade({
      studentId: "",
      studentName: "",
      value: 0,
      term: "1º Trimestre",
      comments: "",
    })
  }

  // Função para enviar notificação
  const handleSendNotification = () => {
    if (!teacher) return

    const targetClass = newNotification.targetClass === "Todas as turmas" ? null : newNotification.targetClass

    const notification = addNotification({
      title: newNotification.title,
      content: newNotification.content,
      date: new Date().toISOString().split("T")[0],
      teacherId: teacher.id,
      teacherName: teacher.name,
      targetClass,
      isRead: false,
    })

    // Limpar formulário
    setNewNotification({
      title: "",
      content: "",
      targetClass: "Todas as turmas",
    })

    // Mostrar confirmação
    alert("Notificação enviada com sucesso!")
  }

  // Função para selecionar aluno
  const handleSelectStudent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentId = e.target.value
    const student = students.find((s) => s.id === studentId)

    if (student) {
      setNewGrade({
        ...newGrade,
        studentId: student.id,
        studentName: student.name,
      })
    }
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white">
                  <AvatarImage src={teacher.profileImage || "/placeholder.svg"} alt={teacher.name} />
                  <AvatarFallback className="bg-blue-600">{teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">{teacher.name}</CardTitle>
                <CardDescription className="text-blue-100">Professor de {teacher.subject}</CardDescription>
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
                    variant={activeTab === "materiais" ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-3 ${
                      activeTab === "materiais" ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("materiais")}
                  >
                    <Book className="mr-2 h-5 w-5" />
                    Materiais Didáticos
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
                    Enviar Notificações
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
                <div className="p-4 pt-0">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => {
                      localStorage.removeItem("teacherId")
                      localStorage.removeItem("teacherName")
                      router.push("/professores")
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
            {activeTab === "perfil" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Perfil do Professor</CardTitle>
                      <CardDescription>Visualize e edite suas informações profissionais</CardDescription>
                    </div>
                    {!editingProfile ? (
                      <Button className="bg-blue-800 hover:bg-blue-700" onClick={() => setEditingProfile(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Perfil
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setEditingProfile(false)}>
                          <X className="mr-2 h-4 w-4" />
                          Cancelar
                        </Button>
                        <Button className="bg-blue-800 hover:bg-blue-700" onClick={handleUpdateProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white dark:border-gray-700">
                            <AvatarImage src={teacher.profileImage || "/placeholder.svg"} alt={teacher.name} />
                            <AvatarFallback className="bg-blue-600 text-3xl">{teacher.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-1">{teacher.name}</h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">{teacher.email}</p>
                          <Button variant="outline" className="w-full" disabled={true}>
                            Alterar Foto
                          </Button>
                          <p className="text-xs text-gray-500 mt-2">
                            Para alterar sua foto, contacte o administrador do sistema
                          </p>
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
                              value={teacher.name}
                              disabled
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">O nome não pode ser alterado</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              ID de Professor
                            </label>
                            <input
                              type="text"
                              value={teacher.id}
                              disabled
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={editingProfile ? editedEmail : teacher.email}
                              onChange={(e) => setEditedEmail(e.target.value)}
                              disabled={!editingProfile}
                              className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm ${
                                editingProfile
                                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Disciplina
                            </label>
                            <input
                              type="text"
                              value={teacher.subject}
                              disabled
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            />
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Biografia Profissional
                          </label>
                          <textarea
                            value={editingProfile ? editedBio : teacher.bio}
                            onChange={(e) => setEditedBio(e.target.value)}
                            disabled={!editingProfile}
                            rows={5}
                            className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm ${
                              editingProfile
                                ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            }`}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "materiais" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Materiais Didáticos</CardTitle>
                      <CardDescription>Gerencie os materiais disponibilizados para os alunos</CardDescription>
                    </div>
                    <Button className="bg-blue-800 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Material
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Formulário para adicionar novo material */}
                    <Card className="border border-blue-100 dark:border-blue-900/20">
                      <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-3">
                        <CardTitle className="text-lg">Adicionar Novo Material</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Título do Material
                            </label>
                            <input
                              type="text"
                              value={newMaterial.title}
                              onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Ex: Apostila de Funções Quadráticas"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Turma Alvo
                            </label>
                            <select
                              value={newMaterial.classTarget}
                              onChange={(e) => setNewMaterial({ ...newMaterial, classTarget: e.target.value })}
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
                            value={newMaterial.description}
                            onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Breve descrição do material..."
                          ></textarea>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Arquivo
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PDF, DOCX, PPTX ou ZIP (MAX. 10MB)
                                </p>
                              </div>
                              <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-800 hover:bg-blue-700" onClick={handleAddMaterial}>
                            Adicionar Material
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Lista de materiais */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Materiais Publicados</h3>

                      {materials.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Book className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 dark:text-gray-400">Nenhum material publicado ainda</p>
                        </div>
                      ) : (
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
                                      {material.classTarget}
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
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Ver
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDeleteMaterial(material.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notas" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Notas e Boletins</CardTitle>
                      <CardDescription>Gerencie as notas dos alunos e gere boletins</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Seletor de turma */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Selecione a Turma
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["8ª Classe", "9ª Classe", "10ª Classe", "11ª Classe", "12ª Classe"].map((className) => (
                          <button
                            key={className}
                            onClick={() => setSelectedClass(className)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedClass === className
                                ? "bg-blue-800 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                            }`}
                          >
                            {className}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Formulário para adicionar notas */}
                    <Card className="border border-blue-100 dark:border-blue-900/20">
                      <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-3">
                        <CardTitle className="text-lg">Adicionar Nova Nota</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Aluno
                            </label>
                            <select
                              value={newGrade.studentId}
                              onChange={handleSelectStudent}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="">Selecione um aluno</option>
                              {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                  {student.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Trimestre
                            </label>
                            <select
                              value={newGrade.term}
                              onChange={(e) => setNewGrade({ ...newGrade, term: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="1º Trimestre">1º Trimestre</option>
                              <option value="2º Trimestre">2º Trimestre</option>
                              <option value="3º Trimestre">3º Trimestre</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Nota (0-20)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={newGrade.value}
                              onChange={(e) => setNewGrade({ ...newGrade, value: Number(e.target.value) })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Comentários
                          </label>
                          <textarea
                            value={newGrade.comments}
                            onChange={(e) => setNewGrade({ ...newGrade, comments: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          ></textarea>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-800 hover:bg-blue-700" onClick={handleAddGrade}>
                            Adicionar Nota
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Lista de notas */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Notas Registradas</h3>

                      {grades.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 dark:text-gray-400">Nenhuma nota registrada ainda</p>
                        </div>
                      ) : (
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
                                  Ações
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                              {grades.map((grade) => (
                                <tr key={grade.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      {grade.studentName}
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
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                        Editar
                                      </Button>
                                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                        Excluir
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Exportar boletins */}
                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-3">Exportar Boletins</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Gere e exporte boletins para todos os alunos da turma selecionada.
                      </p>
                      <div className="flex space-x-3">
                        <Button className="bg-blue-800 hover:bg-blue-700">
                          <FileText className="mr-2 h-4 w-4" />
                          Gerar Boletins
                        </Button>
                        <Button variant="outline">Exportar para PDF</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notificacoes" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Enviar Notificações</CardTitle>
                      <CardDescription>Envie avisos e comunicados para os alunos</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Formulário para enviar notificação */}
                    <Card className="border border-blue-100 dark:border-blue-900/20">
                      <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-3">
                        <CardTitle className="text-lg">Nova Notificação</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Título da Notificação
                            </label>
                            <input
                              type="text"
                              value={newNotification.title}
                              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Ex: Prova de Matemática"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Turma Alvo
                            </label>
                            <select
                              value={newNotification.targetClass}
                              onChange={(e) => setNewNotification({ ...newNotification, targetClass: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="Todas as turmas">Todas as turmas</option>
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
                            Conteúdo da Notificação
                          </label>
                          <textarea
                            value={newNotification.content}
                            onChange={(e) => setNewNotification({ ...newNotification, content: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Digite o conteúdo da notificação..."
                          ></textarea>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-800 hover:bg-blue-700" onClick={handleSendNotification}>
                            <Bell className="mr-2 h-4 w-4" />
                            Enviar Notificação
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Dicas para notificações eficazes */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-3">
                        Dicas para Notificações Eficazes
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5 mr-3">
                            <svg
                              className="w-3 h-3 text-green-600 dark:text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Seja claro e conciso no título e conteúdo</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5 mr-3">
                            <svg
                              className="w-3 h-3 text-green-600 dark:text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Inclua todas as informações importantes (data, local, requisitos)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5 mr-3">
                            <svg
                              className="w-3 h-3 text-green-600 dark:text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Envie com antecedência suficiente para que os alunos possam se preparar</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5 mr-3">
                            <svg
                              className="w-3 h-3 text-green-600 dark:text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Direcione as notificações apenas para as turmas relevantes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "configuracoes" && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>Personalize suas preferências no painel</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    <div>
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
                                Verificação em Duas Etapas
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

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Notificações</h3>
                      <div className="space-y-4">
                        {[
                          { label: "Notificações por email", defaultChecked: true },
                          { label: "Lembretes de eventos", defaultChecked: true },
                          { label: "Atualizações do sistema", defaultChecked: false },
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
