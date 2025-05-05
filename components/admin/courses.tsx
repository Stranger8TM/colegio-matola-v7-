"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Clock, Plus, Pencil, Trash2, Check, X, Search } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

// Dados iniciais de cursos
const initialCourses = [
  {
    id: "1",
    name: "Ensino Primário",
    description: "Educação básica para crianças de 6 a 12 anos",
    students: 450,
    classes: 15,
    subjects: ["Português", "Matemática", "Ciências Naturais", "Ciências Sociais", "Educação Física", "Artes"],
    duration: "7 anos",
  },
  {
    id: "2",
    name: "Ensino Secundário Geral",
    description: "Formação geral para jovens de 13 a 18 anos",
    students: 580,
    classes: 18,
    subjects: [
      "Português",
      "Matemática",
      "Física",
      "Química",
      "Biologia",
      "História",
      "Geografia",
      "Inglês",
      "Filosofia",
    ],
    duration: "5 anos",
  },
  {
    id: "3",
    name: "Ensino Técnico-Profissional",
    description: "Formação técnica e profissional para jovens",
    students: 220,
    classes: 9,
    subjects: ["Português", "Matemática", "Informática", "Empreendedorismo", "Disciplinas Técnicas"],
    duration: "3 anos",
  },
]

export default function CoursesComponent() {
  const [courses, setCourses] = useState(initialCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingCourse, setIsAddingCourse] = useState(false)
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  // Estado para novo curso
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    duration: "",
    subjects: "",
  })

  // Estado para curso em edição
  const [editCourse, setEditCourse] = useState({
    id: "",
    name: "",
    description: "",
    duration: "",
    subjects: "",
  })

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.description || !newCourse.duration) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const newId = (courses.length + 1).toString()
    const subjectsArray = newCourse.subjects.split(",").map((subject) => subject.trim())

    const courseToAdd = {
      id: newId,
      name: newCourse.name,
      description: newCourse.description,
      duration: newCourse.duration,
      subjects: subjectsArray,
      students: 0,
      classes: 0,
    }

    setCourses([...courses, courseToAdd])
    setNewCourse({
      name: "",
      description: "",
      duration: "",
      subjects: "",
    })
    setIsAddingCourse(false)

    toast({
      title: "Curso adicionado",
      description: "O curso foi adicionado com sucesso.",
      variant: "default",
    })
  }

  const handleEditCourse = () => {
    if (!editCourse.name || !editCourse.description || !editCourse.duration) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const subjectsArray =
      typeof editCourse.subjects === "string"
        ? editCourse.subjects.split(",").map((subject) => subject.trim())
        : editCourse.subjects

    const updatedCourses = courses.map((course) => {
      if (course.id === editCourse.id) {
        return {
          ...course,
          name: editCourse.name,
          description: editCourse.description,
          duration: editCourse.duration,
          subjects: subjectsArray,
        }
      }
      return course
    })

    setCourses(updatedCourses)
    setEditingCourseId(null)

    toast({
      title: "Curso atualizado",
      description: "O curso foi atualizado com sucesso.",
      variant: "default",
    })
  }

  const handleDeleteCourse = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita.")) {
      setCourses(courses.filter((course) => course.id !== id))

      toast({
        title: "Curso excluído",
        description: "O curso foi excluído com sucesso.",
        variant: "default",
      })
    }
  }

  const startEditing = (course: any) => {
    setEditingCourseId(course.id)
    setEditCourse({
      id: course.id,
      name: course.name,
      description: course.description,
      duration: course.duration,
      subjects: Array.isArray(course.subjects) ? course.subjects.join(", ") : course.subjects,
    })
  }

  const viewCourseDetails = (course: any) => {
    setSelectedCourse(course)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Cursos</CardTitle>
            <CardDescription>Gerencie os cursos oferecidos pela instituição</CardDescription>
          </div>
          <Button onClick={() => setIsAddingCourse(!isAddingCourse)} className="bg-blue-800 hover:bg-blue-700">
            {isAddingCourse ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Novo Curso
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingCourse && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20"
          >
            <h3 className="text-lg font-medium mb-4">Adicionar Novo Curso</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course-name">Nome do Curso *</Label>
                  <Input
                    id="course-name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    placeholder="Ex: Ensino Médio"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-duration">Duração *</Label>
                  <Input
                    id="course-duration"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    placeholder="Ex: 3 anos"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-description">Descrição *</Label>
                <Input
                  id="course-description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Breve descrição do curso"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-subjects">Disciplinas (separadas por vírgula)</Label>
                <Input
                  id="course-subjects"
                  value={newCourse.subjects}
                  onChange={(e) => setNewCourse({ ...newCourse, subjects: e.target.value })}
                  placeholder="Ex: Matemática, Português, História"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingCourse(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddCourse} className="bg-green-600 hover:bg-green-700">
                  <Check className="mr-2 h-4 w-4" />
                  Adicionar Curso
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Pesquisar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="list">Lista de Cursos</TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedCourse}>
              Detalhes do Curso
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`p-4 bg-white dark:bg-gray-800 rounded-lg border ${
                    editingCourseId === course.id
                      ? "border-blue-300 dark:border-blue-700"
                      : "border-gray-200 dark:border-gray-700"
                  } hover:border-blue-300 dark:hover:border-blue-700 transition-colors`}
                >
                  {editingCourseId === course.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edit-name-${course.id}`}>Nome do Curso</Label>
                          <Input
                            id={`edit-name-${course.id}`}
                            value={editCourse.name}
                            onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-duration-${course.id}`}>Duração</Label>
                          <Input
                            id={`edit-duration-${course.id}`}
                            value={editCourse.duration}
                            onChange={(e) => setEditCourse({ ...editCourse, duration: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-description-${course.id}`}>Descrição</Label>
                        <Input
                          id={`edit-description-${course.id}`}
                          value={editCourse.description}
                          onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-subjects-${course.id}`}>Disciplinas</Label>
                        <Input
                          id={`edit-subjects-${course.id}`}
                          value={editCourse.subjects}
                          onChange={(e) => setEditCourse({ ...editCourse, subjects: e.target.value })}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setEditingCourseId(null)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleEditCourse} className="bg-green-600 hover:bg-green-700">
                          <Check className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{course.name}</h3>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditing(course)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.description}</p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                          <span className="text-sm">{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                          <span className="text-sm">{course.students} alunos</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                          <span className="text-sm">{course.classes} turmas</span>
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2 text-blue-600 dark:text-blue-400"
                        onClick={() => viewCourseDetails(course)}
                      >
                        Ver detalhes
                      </Button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhum curso encontrado</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? "Nenhum curso corresponde à sua pesquisa. Tente outros termos."
                    : "Nenhum curso foi adicionado ainda. Clique em 'Novo Curso' para começar."}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {selectedCourse && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>
                    <Button variant="outline" size="sm" onClick={() => startEditing(selectedCourse)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</h3>
                      <p className="mt-1">{selectedCourse.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duração</h3>
                        <p className="mt-1 flex items-center">
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                          {selectedCourse.duration}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Alunos Matriculados</h3>
                        <p className="mt-1 flex items-center">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                          {selectedCourse.students}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Turmas</h3>
                        <p className="mt-1 flex items-center">
                          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                          {selectedCourse.classes}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Disciplinas</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.subjects.map((subject: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Estatísticas do Curso</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Taxa de Aprovação</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Taxa de Frequência</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Satisfação dos Alunos</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Coordenadores</h3>
                    {selectedCourse.id === "1" ? (
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 overflow-hidden">
                            <img src="/teacher-maria.jpg" alt="Coordenadora" className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">Profa. Maria Joaquim</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Coordenadora Pedagógica</p>
                          </div>
                        </div>
                      </div>
                    ) : selectedCourse.id === "2" ? (
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 overflow-hidden">
                            <img src="/teacher-gabriel.jpg" alt="Coordenador" className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">Prof. Gabriel Matola</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Coordenador Pedagógico</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500 dark:text-gray-400">Nenhum coordenador designado</p>
                      </div>
                    )}
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
