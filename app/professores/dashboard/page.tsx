"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MotivationalMessage from "@/components/motivational-message"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  updateTeacherProfile,
  addMaterial,
  deleteMaterial,
  getStudentsByClass,
  addGrade,
  addNotification,
  updateGrade,
  deleteGrade,
} from "@/lib/db-service"
import { generateReportCard, generateClassPerformanceReport } from "@/lib/pdf-service"
import { toast } from "@/components/ui/use-toast"

export default function TeacherDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [teacher, setTeacher] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [materials, setMaterials] = useState<any[]>([])
  const [grades, setGrades] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("perfil")
  const [editingProfile, setEditingProfile] = useState(false)
  const [editedEmail, setEditedEmail] = useState("")
  const [editedBio, setEditedBio] = useState("")
  const [selectedClass, setSelectedClass] = useState("8ª Classe")
  const [students, setStudents] = useState<any[]>([])
  const [editingGrade, setEditingGrade] = useState<string | null>(null)
  const [uploadingMaterial, setUploadingMaterial] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTerm, setFilterTerm] = useState("Todos")

  // Estados para o formulário de material
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    subject: "",
    fileUrl: "",
    classTarget: "8ª Classe",
  })

  // Estados para o formulário de notas
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

  // Referência para o formulário de upload
  const fileUploadRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true)

    // Verificar se o professor está logado
    const checkAuth = () => {
      const teacherId = localStorage.getItem("teacherId")
      const teacherName = localStorage.getItem("teacherName")

      if (!teacherId) {
        router.push("/painel")
        return
      }

      // Simular dados do professor
      setTeacher({
        id: teacherId,
        name: teacherName || "Gabriel Vieira",
        email: "gabriel.vieira@escolaprivada.co.mz",
        subject: "Matemática",
        profileImage: "/teacher-gabriel.jpg",
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

  // useEffect(() => {
  //   // Verificar se o professor está logado
  //   const teacherId = localStorage.getItem("teacherId")
  //   if (!teacherId) {
  //     router.push("/professores")
  //     return
  //   }

  //   // Carregar dados do professor
  //   const loadTeacherData = async () => {
  //     try {
  //       const teacherData = await getTeacherById(teacherId)
  //       if (teacherData) {
  //         setTeacher(teacherData)
  //         setEditedEmail(teacherData.email)
  //         setEditedBio(teacherData.bio || "")

  //         // Carregar materiais do professor
  //         const teacherMaterials = await getMaterialsByTeacher(teacherId)
  //         setMaterials(teacherMaterials)

  //         // Carregar notas do professor
  //         const teacherGrades = await getGradesByTeacher(teacherId)
  //         setGrades(teacherGrades)

  //         // Carregar alunos da classe selecionada
  //         const classStudents = await getStudentsByClass(selectedClass)
  //         setStudents(classStudents)
  //       }
  //     } catch (error) {
  //       console.error("Erro ao carregar dados:", error)
  //       toast({
  //         title: "Erro",
  //         description: "Não foi possível carregar os dados. Tente novamente.",
  //         variant: "destructive",
  //       })
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   loadTeacherData()
  // }, [router, selectedClass])

  // Função para atualizar o perfil do professor
  const handleUpdateProfile = async () => {
    if (!teacher) return

    try {
      const updatedTeacher = await updateTeacherProfile(teacher.id, {
        email: editedEmail,
        bio: editedBio,
      })

      if (updatedTeacher) {
        setTeacher(updatedTeacher)
        setEditingProfile(false)
        toast({
          title: "Perfil atualizado",
          description: "Suas informações foram atualizadas com sucesso.",
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para adicionar novo material
  const handleAddMaterial = async () => {
    if (!teacher || !newMaterial.fileUrl) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos e faça upload do arquivo.",
        variant: "destructive",
      })
      return
    }

    try {
      const material = await addMaterial({
        title: newMaterial.title,
        description: newMaterial.description,
        subject: teacher.subject,
        fileUrl: newMaterial.fileUrl,
        classTarget: newMaterial.classTarget,
        teacherId: teacher.id,
      })

      setMaterials([material, ...materials])
      setUploadingMaterial(false)

      // Limpar formulário
      setNewMaterial({
        title: "",
        description: "",
        subject: "",
        fileUrl: "",
        classTarget: "8ª Classe",
      })

      toast({
        title: "Material adicionado",
        description: "O material foi adicionado com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao adicionar material:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o material. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para excluir material
  const handleDeleteMaterial = async (id: string) => {
    try {
      await deleteMaterial(id)
      setMaterials(materials.filter((material) => material.id !== id))
      toast({
        title: "Material excluído",
        description: "O material foi excluído com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao excluir material:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o material. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para adicionar nova nota
  const handleAddGrade = async () => {
    if (!teacher || !newGrade.studentId) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um aluno e preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    try {
      const grade = await addGrade({
        studentId: newGrade.studentId,
        teacherId: teacher.id,
        subject: teacher.subject,
        value: newGrade.value,
        term: newGrade.term,
        comments: newGrade.comments,
      })

      setGrades([grade, ...grades])

      // Limpar formulário
      setNewGrade({
        studentId: "",
        studentName: "",
        value: 0,
        term: "1º Trimestre",
        comments: "",
      })

      toast({
        title: "Nota adicionada",
        description: "A nota foi adicionada com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao adicionar nota:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a nota. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para atualizar nota
  const handleUpdateGrade = async (id: string, updatedData: any) => {
    try {
      const updatedGrade = await updateGrade(id, updatedData)
      setGrades(grades.map((grade) => (grade.id === id ? updatedGrade : grade)))
      setEditingGrade(null)
      toast({
        title: "Nota atualizada",
        description: "A nota foi atualizada com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao atualizar nota:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a nota. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para excluir nota
  const handleDeleteGrade = async (id: string) => {
    try {
      await deleteGrade(id)
      setGrades(grades.filter((grade) => grade.id !== id))
      toast({
        title: "Nota excluída",
        description: "A nota foi excluída com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao excluir nota:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a nota. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para enviar notificação
  const handleSendNotification = async () => {
    if (!teacher || !newNotification.title || !newNotification.content) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    try {
      const targetClass = newNotification.targetClass === "Todas as turmas" ? null : newNotification.targetClass

      // Obter IDs dos alunos da turma alvo
      const targetStudents = await getStudentsByClass(targetClass || "")
      const userIds = targetStudents.map((student) => student.id)

      await addNotification({
        title: newNotification.title,
        content: newNotification.content,
        targetClass,
        teacherId: teacher.id,
        userIds,
      })

      // Limpar formulário
      setNewNotification({
        title: "",
        content: "",
        targetClass: "Todas as turmas",
      })

      toast({
        title: "Notificação enviada",
        description: "A notificação foi enviada com sucesso.",
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao enviar notificação:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar a notificação. Tente novamente.",
        variant: "destructive",
      })
    }
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

  // Função para lidar com o upload de arquivo
  const handleFileUploadComplete = (fileData: any) => {
    if (fileData.success) {
      setNewMaterial({
        ...newMaterial,
        fileUrl: fileData.url,
      })
      toast({
        title: "Upload concluído",
        description: "O arquivo foi enviado com sucesso.",
        variant: "default",
      })
    }
  }

  // Função para gerar boletim
  const handleGenerateReportCard = (studentId: string, studentName: string) => {
    // Filtrar notas do aluno
    const studentGrades = grades.filter((grade) => grade.studentId === studentId)

    if (studentGrades.length === 0) {
      toast({
        title: "Sem dados",
        description: "Não há notas registradas para este aluno.",
        variant: "destructive",
      })
      return
    }

    // Dados do aluno
    const studentData = {
      id: studentId,
      name: studentName,
      class: selectedClass,
      grade: "A", // Exemplo
    }

    // Gerar PDF
    const doc = generateReportCard(studentData, studentGrades)

    // Salvar o PDF
    doc.save(`Boletim_${studentName.replace(/\s+/g, "_")}.pdf`)

    toast({
      title: "Boletim gerado",
      description: "O boletim foi gerado e baixado com sucesso.",
      variant: "default",
    })
  }

  // Função para gerar relatório de desempenho
  const handleGeneratePerformanceReport = () => {
    // Exemplo de dados de desempenho
    const subjects = ["Matemática", "Português", "Física", "Biologia", "História"]
    const performanceData = subjects.map((subject) => {
      // Filtrar notas da disciplina
      const subjectGrades = grades.filter(
        (grade) => grade.subject === subject && grade.student?.class === selectedClass,
      )

      // Calcular estatísticas
      const values = subjectGrades.map((grade) => grade.value)
      const average = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0
      const highest = values.length > 0 ? Math.max(...values) : 0
      const lowest = values.length > 0 ? Math.min(...values) : 0
      const passRate =
        values.length > 0 ? Math.round((values.filter((val) => val >= 10).length / values.length) * 100) : 0

      return {
        subject,
        average,
        highest,
        lowest,
        passRate,
        term: "1º Trimestre", // Exemplo
      }
    })

    // Gerar PDF
    const doc = generateClassPerformanceReport(selectedClass, subjects, performanceData)

    // Salvar o PDF
    doc.save(`Relatório_Desempenho_${selectedClass.replace(/\s+/g, "_")}.pdf`)

    toast({
      title: "Relatório gerado",
      description: "O relatório de desempenho foi gerado e baixado com sucesso.",
      variant: "default",
    })
  }

  // Filtrar materiais com base na pesquisa
  const filteredMaterials = materials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filtrar notas com base no termo selecionado
  const filteredGrades = grades.filter((grade) => filterTerm === "Todos" || grade.term === filterTerm)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando painel do professor...</p>
        </div>
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Você precisa estar logado como professor para acessar esta página.
          </p>
          <Button onClick={() => router.push("/painel")}>Voltar para o Login</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        {/* Mensagem Motivacional */}
        <MotivationalMessage type="teacher" userName={teacher.name} />

        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bem-vindo, Professor {teacher.name}!</h1>
            <p className="mb-6">
              Este é o painel principal do professor. Utilize o menu lateral para navegar entre as diferentes seções.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="bg-blue-800 hover:bg-blue-700 h-auto py-4"
                onClick={() => router.push("/professores/dashboard/aulas-gravadas")}
              >
                Gerenciar Aulas Gravadas
              </Button>
              <Button className="bg-green-700 hover:bg-green-600 h-auto py-4">Gerenciar Notas e Boletins</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
