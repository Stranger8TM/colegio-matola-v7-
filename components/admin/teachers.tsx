"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Pencil, Trash2, Check, X, Mail, Phone, BookOpen, Calendar, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

// Função para buscar professores da API
async function fetchTeachers() {
  try {
    // Em um ambiente real, isso seria uma chamada de API
    // Por enquanto, retornamos dados simulados
    return [
      {
        id: "1",
        name: "Prof. Gabriel Matola",
        email: "gabriel.matola@colegiomatola.co.mz",
        phone: "+258 84 123 4567",
        subject: "Matemática",
        photo: "/teacher-gabriel.jpg",
        bio: "Licenciado em Matemática pela Universidade Eduardo Mondlane, com mais de 10 anos de experiência no ensino.",
        classes: ["10ª A", "11ª B", "12ª A"],
        joinDate: "2018-03-15",
      },
      {
        id: "2",
        name: "Profa. Maria Joaquim",
        email: "maria.joaquim@colegiomatola.co.mz",
        phone: "+258 84 765 4321",
        subject: "Português",
        photo: "/teacher-maria.jpg",
        bio: "Mestre em Letras pela Universidade Pedagógica, especialista em literatura moçambicana.",
        classes: ["8ª A", "9ª B", "10ª C"],
        joinDate: "2019-01-10",
      },
      {
        id: "3",
        name: "Prof. António Mabjaia",
        email: "antonio.mabjaia@colegiomatola.co.mz",
        phone: "+258 84 111 2222",
        subject: "Física",
        photo: "/avatar-3.jpg",
        bio: "Doutor em Física pela Universidade de Lisboa, com experiência em projetos de pesquisa científica.",
        classes: ["11ª A", "11ª B", "12ª A", "12ª B"],
        joinDate: "2020-02-05",
      },
      {
        id: "4",
        name: "Profa. Carla Sitoe",
        email: "carla.sitoe@colegiomatola.co.mz",
        phone: "+258 84 333 4444",
        subject: "Biologia",
        photo: "/avatar-4.jpg",
        bio: "Licenciada em Biologia pela Universidade Eduardo Mondlane, especialista em educação ambiental.",
        classes: ["8ª B", "9ª A", "10ª B"],
        joinDate: "2021-03-01",
      },
      {
        id: "5",
        name: "Prof. Dinis Cossa",
        email: "dinis.cossa@colegiomatola.co.mz",
        phone: "+258 84 555 6666",
        subject: "História",
        photo: "/avatar-5.jpg",
        bio: "Mestre em História de África pela Universidade Pedagógica, pesquisador de história moçambicana.",
        classes: ["9ª C", "10ª A", "11ª C"],
        joinDate: "2019-08-15",
      },
    ]
  } catch (error) {
    console.error("Erro ao buscar professores:", error)
    return []
  }
}

export default function TeachersComponent() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingTeacher, setIsAddingTeacher] = useState(false)
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null)
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)

  // Estado para novo professor
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    bio: "",
    classes: "",
  })

  // Estado para professor em edição
  const [editTeacher, setEditTeacher] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    bio: "",
    classes: "",
  })

  useEffect(() => {
    const loadTeachers = async () => {
      setLoading(true)
      const data = await fetchTeachers()
      setTeachers(data)
      setLoading(false)
    }

    loadTeachers()
  }, [])

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.subject) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const newId = (teachers.length + 1).toString()
    const classesArray = newTeacher.classes.split(",").map((cls) => cls.trim())

    const teacherToAdd = {
      id: newId,
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone,
      subject: newTeacher.subject,
      bio: newTeacher.bio,
      classes: classesArray,
      photo: "/placeholder.svg",
      joinDate: new Date().toISOString().split("T")[0],
    }

    setTeachers([...teachers, teacherToAdd])
    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      subject: "",
      bio: "",
      classes: "",
    })
    setIsAddingTeacher(false)

    toast({
      title: "Professor adicionado",
      description: "O professor foi adicionado com sucesso.",
      variant: "default",
    })
  }

  const handleEditTeacher = () => {
    if (!editTeacher.name || !editTeacher.email || !editTeacher.subject) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const classesArray =
      typeof editTeacher.classes === "string"
        ? editTeacher.classes.split(",").map((cls) => cls.trim())
        : editTeacher.classes

    const updatedTeachers = teachers.map((teacher) => {
      if (teacher.id === editTeacher.id) {
        return {
          ...teacher,
          name: editTeacher.name,
          email: editTeacher.email,
          phone: editTeacher.phone,
          subject: editTeacher.subject,
          bio: editTeacher.bio,
          classes: classesArray,
        }
      }
      return teacher
    })

    setTeachers(updatedTeachers)
    setEditingTeacherId(null)

    // Se o professor que está sendo editado é o selecionado, atualize-o também
    if (selectedTeacher && selectedTeacher.id === editTeacher.id) {
      const updatedTeacher = updatedTeachers.find((t) => t.id === editTeacher.id)
      setSelectedTeacher(updatedTeacher)
    }

    toast({
      title: "Professor atualizado",
      description: "As informações do professor foram atualizadas com sucesso.",
      variant: "default",
    })
  }

  const handleDeleteTeacher = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este professor? Esta ação não pode ser desfeita.")) {
      setTeachers(teachers.filter((teacher) => teacher.id !== id))

      // Se o professor excluído é o selecionado, limpe a seleção
      if (selectedTeacher && selectedTeacher.id === id) {
        setSelectedTeacher(null)
      }

      toast({
        title: "Professor excluído",
        description: "O professor foi excluído com sucesso.",
        variant: "default",
      })
    }
  }

  const startEditing = (teacher: any) => {
    setEditingTeacherId(teacher.id)
    setEditTeacher({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
      bio: teacher.bio,
      classes: Array.isArray(teacher.classes) ? teacher.classes.join(", ") : teacher.classes,
    })
  }

  const viewTeacherDetails = (teacher: any) => {
    setSelectedTeacher(teacher)
  }

  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Professores</CardTitle>
          <CardDescription>Carregando dados dos professores...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Professores</CardTitle>
            <CardDescription>Gerencie o corpo docente da instituição</CardDescription>
          </div>
          <Button onClick={() => setIsAddingTeacher(!isAddingTeacher)} className="bg-blue-800 hover:bg-blue-700">
            {isAddingTeacher ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Novo Professor
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingTeacher && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20"
          >
            <h3 className="text-lg font-medium mb-4">Adicionar Novo Professor</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-name">Nome Completo *</Label>
                  <Input
                    id="teacher-name"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    placeholder="Ex: Prof. João Silva"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher-subject">Disciplina *</Label>
                  <Input
                    id="teacher-subject"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    placeholder="Ex: Matemática"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email *</Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    placeholder="Ex: professor@colegiomatola.co.mz"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher-phone">Telefone</Label>
                  <Input
                    id="teacher-phone"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    placeholder="Ex: +258 84 123 4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher-bio">Biografia</Label>
                <Input
                  id="teacher-bio"
                  value={newTeacher.bio}
                  onChange={(e) => setNewTeacher({ ...newTeacher, bio: e.target.value })}
                  placeholder="Breve biografia do professor"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher-classes">Turmas (separadas por vírgula)</Label>
                <Input
                  id="teacher-classes"
                  value={newTeacher.classes}
                  onChange={(e) => setNewTeacher({ ...newTeacher, classes: e.target.value })}
                  placeholder="Ex: 10ª A, 11ª B, 12ª A"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingTeacher(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddTeacher} className="bg-green-600 hover:bg-green-700">
                  <Check className="mr-2 h-4 w-4" />
                  Adicionar Professor
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Pesquisar professores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="list">Lista de Professores</TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedTeacher}>
              Detalhes do Professor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className={`p-4 bg-white dark:bg-gray-800 rounded-lg border ${
                    editingTeacherId === teacher.id
                      ? "border-blue-300 dark:border-blue-700"
                      : "border-gray-200 dark:border-gray-700"
                  } hover:border-blue-300 dark:hover:border-blue-700 transition-colors`}
                >
                  {editingTeacherId === teacher.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edit-name-${teacher.id}`}>Nome Completo</Label>
                          <Input
                            id={`edit-name-${teacher.id}`}
                            value={editTeacher.name}
                            onChange={(e) => setEditTeacher({ ...editTeacher, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-subject-${teacher.id}`}>Disciplina</Label>
                          <Input
                            id={`edit-subject-${teacher.id}`}
                            value={editTeacher.subject}
                            onChange={(e) => setEditTeacher({ ...editTeacher, subject: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edit-email-${teacher.id}`}>Email</Label>
                          <Input
                            id={`edit-email-${teacher.id}`}
                            value={editTeacher.email}
                            onChange={(e) => setEditTeacher({ ...editTeacher, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-phone-${teacher.id}`}>Telefone</Label>
                          <Input
                            id={`edit-phone-${teacher.id}`}
                            value={editTeacher.phone}
                            onChange={(e) => setEditTeacher({ ...editTeacher, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-bio-${teacher.id}`}>Biografia</Label>
                        <Input
                          id={`edit-bio-${teacher.id}`}
                          value={editTeacher.bio}
                          onChange={(e) => setEditTeacher({ ...editTeacher, bio: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-classes-${teacher.id}`}>Turmas</Label>
                        <Input
                          id={`edit-classes-${teacher.id}`}
                          value={editTeacher.classes}
                          onChange={(e) => setEditTeacher({ ...editTeacher, classes: e.target.value })}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setEditingTeacherId(null)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleEditTeacher} className="bg-green-600 hover:bg-green-700">
                          <Check className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={teacher.photo || "/placeholder.svg"} alt={teacher.name} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">{teacher.name}</h3>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditing(teacher)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTeacher(teacher.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{teacher.subject}</p>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">{teacher.email}</span>
                          </div>
                          {teacher.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                              <span className="text-sm text-gray-500 dark:text-gray-400">{teacher.phone}</span>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="link"
                          className="p-0 h-auto mt-2 text-blue-600 dark:text-blue-400"
                          onClick={() => viewTeacherDetails(teacher)}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mx-auto w-20 h-20 flex items-center justify-center mb-4">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Nenhum professor encontrado
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? "Nenhum professor corresponde à sua pesquisa. Tente outros termos."
                    : "Nenhum professor foi adicionado ainda. Clique em 'Novo Professor' para começar."}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {selectedTeacher && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={selectedTeacher.photo || "/placeholder.svg"} alt={selectedTeacher.name} />
                        <AvatarFallback>{selectedTeacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedTeacher.name}</h2>
                        <p className="text-lg text-blue-600 dark:text-blue-400">{selectedTeacher.subject}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => startEditing(selectedTeacher)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Biografia</h3>
                        <p className="mt-1">{selectedTeacher.bio}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Turmas</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedTeacher.classes.map((cls: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                            >
                              {cls}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Informações de Contato</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                            <span>{selectedTeacher.email}</span>
                          </div>
                          {selectedTeacher.phone && (
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                              <span>{selectedTeacher.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Admissão</h3>
                        <div className="flex items-center mt-2">
                          <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{new Date(selectedTeacher.joinDate).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Desempenho das Turmas</h3>
                    <div className="space-y-4">
                      {selectedTeacher.classes.map((cls: string, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{cls}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Média: {Math.floor(Math.random() * 5) + 14}/20
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Documentos Recentes</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                          <div>
                            <p className="font-medium">Plano de Aulas - {selectedTeacher.subject}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Atualizado há 2 dias</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                          <div>
                            <p className="font-medium">Relatório de Avaliação - 1º Trimestre</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Atualizado há 1 semana</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                          <div>
                            <p className="font-medium">Material Didático - {selectedTeacher.subject}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Atualizado há 2 semanas</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
