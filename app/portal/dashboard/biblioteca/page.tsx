"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Video,
  Music,
  ImageIcon,
  Filter,
  BookMarked,
  Star,
  Eye,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import {
  FileIcon as FilePdf,
  FileSpreadsheet,
  FileIcon as FilePresentation,
  FileAudio,
  FileVideo,
  FileIcon,
} from "lucide-react"

// Dados simulados para a biblioteca
const materialTypes = [
  { id: "todos", name: "Todos", icon: BookOpen },
  { id: "livros", name: "Livros", icon: BookMarked },
  { id: "documentos", name: "Documentos", icon: FileText },
  { id: "videos", name: "Vídeos", icon: Video },
  { id: "audio", name: "Áudio", icon: Music },
  { id: "imagens", name: "Imagens", icon: ImageIcon },
]

const subjects = [
  { id: "todos", name: "Todas as Disciplinas" },
  { id: "matematica", name: "Matemática" },
  { id: "portugues", name: "Português" },
  { id: "fisica", name: "Física" },
  { id: "quimica", name: "Química" },
  { id: "biologia", name: "Biologia" },
  { id: "historia", name: "História" },
  { id: "geografia", name: "Geografia" },
  { id: "ingles", name: "Inglês" },
]

const materials = [
  {
    id: "1",
    title: "Álgebra Linear - Livro Completo",
    description: "Livro completo de Álgebra Linear com exercícios resolvidos",
    type: "livros",
    subject: "matematica",
    author: "Prof. Gabriel Vieira",
    uploadDate: "2023-04-15T10:30:00",
    fileSize: "8.5 MB",
    fileType: "PDF",
    thumbnail: "/placeholder.svg?key=algebra",
    downloads: 145,
    views: 320,
    rating: 4.8,
    featured: true,
  },
  {
    id: "2",
    title: "Gramática Portuguesa - Guia Prático",
    description: "Guia prático de gramática portuguesa para estudantes do ensino médio",
    type: "documentos",
    subject: "portugues",
    author: "Profa. Maria Joaquim",
    uploadDate: "2023-03-22T14:45:00",
    fileSize: "3.2 MB",
    fileType: "PDF",
    thumbnail: "/placeholder.svg?key=gramatica",
    downloads: 210,
    views: 450,
    rating: 4.5,
    featured: true,
  },
  {
    id: "3",
    title: "Leis de Newton - Videoaula",
    description: "Videoaula explicativa sobre as três leis de Newton e suas aplicações",
    type: "videos",
    subject: "fisica",
    author: "Prof. António Mabjaia",
    uploadDate: "2023-05-05T09:15:00",
    fileSize: "250 MB",
    fileType: "MP4",
    thumbnail: "/placeholder.svg?key=newton",
    downloads: 98,
    views: 310,
    rating: 4.9,
    featured: true,
  },
  {
    id: "4",
    title: "Tabela Periódica Interativa",
    description: "Tabela periódica interativa com informações detalhadas sobre cada elemento",
    type: "imagens",
    subject: "quimica",
    author: "Departamento de Química",
    uploadDate: "2023-02-18T11:20:00",
    fileSize: "4.1 MB",
    fileType: "PNG",
    thumbnail: "/placeholder.svg?key=tabela",
    downloads: 320,
    views: 780,
    rating: 4.7,
    featured: false,
  },
  {
    id: "5",
    title: "Podcast - História de Moçambique",
    description: "Série de podcasts sobre a história de Moçambique desde o período colonial até a independência",
    type: "audio",
    subject: "historia",
    author: "Prof. João Machel",
    uploadDate: "2023-04-30T16:40:00",
    fileSize: "120 MB",
    fileType: "MP3",
    thumbnail: "/placeholder.svg?key=historia",
    downloads: 75,
    views: 180,
    rating: 4.6,
    featured: false,
  },
  {
    id: "6",
    title: "Exercícios de Geometria",
    description: "Coletânea de exercícios de geometria plana e espacial com gabaritos",
    type: "documentos",
    subject: "matematica",
    author: "Prof. Gabriel Vieira",
    uploadDate: "2023-05-12T13:10:00",
    fileSize: "2.8 MB",
    fileType: "PDF",
    thumbnail: "/placeholder.svg?key=geometria",
    downloads: 110,
    views: 240,
    rating: 4.4,
    featured: false,
  },
  {
    id: "7",
    title: "Atlas Geográfico Mundial",
    description: "Atlas completo com mapas detalhados de todos os continentes e países",
    type: "livros",
    subject: "geografia",
    author: "Departamento de Geografia",
    uploadDate: "2023-03-05T10:00:00",
    fileSize: "15.2 MB",
    fileType: "PDF",
    thumbnail: "/placeholder.svg?key=atlas",
    downloads: 95,
    views: 210,
    rating: 4.3,
    featured: false,
  },
  {
    id: "8",
    title: "Vocabulário Inglês-Português",
    description: "Dicionário com vocabulário essencial para estudantes de inglês",
    type: "documentos",
    subject: "ingles",
    author: "Profa. Luísa Cossa",
    uploadDate: "2023-04-20T09:30:00",
    fileSize: "1.5 MB",
    fileType: "PDF",
    thumbnail: "/placeholder.svg?key=ingles",
    downloads: 180,
    views: 320,
    rating: 4.2,
    featured: false,
  },
]

export default function BibliotecaPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeType, setActiveType] = useState("todos")
  const [activeSubject, setActiveSubject] = useState("todos")
  const [sortBy, setSortBy] = useState("recent")
  const [isMounted, setIsMounted] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("todos")

  useEffect(() => {
    setIsMounted(true)

    // Verificar autenticação
    const studentId = localStorage.getItem("studentId")
    if (!studentId && isMounted) {
      router.push("/painel")
    }

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

  // Filtrar e ordenar materiais
  const filteredMaterials = materials.filter(
    (material) =>
      (activeType === "todos" || material.type === activeType) &&
      (activeSubject === "todos" || material.subject === activeSubject) &&
      (searchQuery === "" ||
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Ordenar materiais com base na aba ativa
  const sortedMaterials = [...filteredMaterials]
    .sort((a, b) => {
      if (activeTab === "recentes") {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      } else if (activeTab === "populares") {
        return b.downloads - a.downloads
      } else if (activeTab === "destacados") {
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1
      }
      return 0
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      } else if (sortBy === "popular") {
        return b.downloads - a.downloads
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      }
      return 0
    })

  // Materiais em destaque
  const featuredMaterials = materials.filter((material) => material.featured)

  // Formatar data relativa
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} segundos atrás`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutos atrás`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} horas atrás`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} dias atrás`

    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  // Obter ícone para tipo de material
  const getTypeIcon = (type: string) => {
    const materialType = materialTypes.find((t) => t.id === type)
    if (materialType) {
      const Icon = materialType.icon
      return <Icon className="h-5 w-5" />
    }
    return <FileText className="h-5 w-5" />
  }

  // Obter cor para tipo de material
  const getTypeColor = (type: string) => {
    switch (type) {
      case "livros":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "documentos":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "videos":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "audio":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "imagens":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  // Obter ícone com base no tipo de arquivo
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FilePdf className="h-6 w-6 text-red-500" />
      case "pptx":
        return <FilePresentation className="h-6 w-6 text-orange-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-6 w-6 text-green-500" />
      case "mp3":
        return <FileAudio className="h-6 w-6 text-blue-500" />
      case "mp4":
        return <FileVideo className="h-6 w-6 text-purple-500" />
      case "zip":
        return <FileIcon className="h-6 w-6 text-amber-500" />
      default:
        return <FileText className="h-6 w-6 text-gray-500" />
    }
  }

  // Se não estiver montado no cliente, não renderize nada que use localStorage
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando biblioteca...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando biblioteca...</p>
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
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Navbar />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Biblioteca Digital</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Acesse materiais didáticos, livros, vídeos e muito mais
            </p>
          </div>
        </div>

        {/* Barra de pesquisa e filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar na biblioteca..."
                className="pl-10 py-6 rounded-xl border-gray-300 dark:border-gray-700 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="pl-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Mais Recentes</option>
                <option value="popular">Mais Baixados</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
            <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Filtros móveis */}
        {showFilters && (
          <div className="md:hidden mb-6 space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Material</h3>
              <div className="flex flex-wrap gap-2">
                {materialTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={activeType === type.id ? "default" : "outline"}
                    size="sm"
                    className={activeType === type.id ? "bg-purple-700" : ""}
                    onClick={() => setActiveType(type.id)}
                  >
                    <type.icon className="h-4 w-4 mr-1" />
                    {type.name}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Disciplina</h3>
              <select
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3"
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="hidden md:block lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-md rounded-xl overflow-hidden">
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20 border-b border-gray-100 dark:border-gray-800 pb-3">
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-6">
                  {/* Tipo de Material */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tipo de Material</h3>
                    <div className="space-y-2">
                      {materialTypes.map((type) => (
                        <button
                          key={type.id}
                          className={`flex items-center w-full px-3 py-2 rounded-lg text-sm ${
                            activeType === type.id
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 font-medium"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setActiveType(type.id)}
                        >
                          <type.icon className="h-4 w-4 mr-2" />
                          <span>{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Disciplina */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Disciplina</h3>
                    <select
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3"
                      value={activeSubject}
                      onChange={(e) => setActiveSubject(e.target.value)}
                    >
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Materiais */}
          <div className="lg:col-span-3">
            {/* Materiais em Destaque */}
            {featuredMaterials.length > 0 &&
              activeType === "todos" &&
              activeSubject === "todos" &&
              searchQuery === "" && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Em Destaque</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredMaterials.map((material) => (
                      <Card
                        key={material.id}
                        className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer rounded-xl overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row h-full">
                          <div className="md:w-1/3 relative">
                            <div className="aspect-[3/4] relative">
                              <Image
                                src={material.thumbnail || "/placeholder.svg"}
                                alt={material.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute top-2 left-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(material.type)}`}>
                                {materialTypes.find((t) => t.id === material.type)?.name}
                              </span>
                            </div>
                          </div>
                          <div className="md:w-2/3 p-4 flex flex-col justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                                {material.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                {material.description}
                              </p>
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                                <span className="mr-2">{material.author}</span>
                                <span>•</span>
                                <span className="mx-2">{material.fileType}</span>
                                <span>•</span>
                                <span className="ml-2">{material.fileSize}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(material.rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : i < material.rating
                                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                                          : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                                <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                                  ({material.rating.toFixed(1)})
                                </span>
                              </div>
                              <Button className="w-full bg-purple-700 hover:bg-purple-600 text-white">
                                <Download className="mr-2 h-4 w-4" />
                                Baixar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            {/* Todos os Materiais */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {activeType === "todos" && activeSubject === "todos"
                  ? "Todos os Materiais"
                  : `Materiais Filtrados (${filteredMaterials.length})`}
              </h2>

              {filteredMaterials.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Nenhum material encontrado
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Não encontramos materiais que correspondam aos seus critérios de busca.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setActiveType("todos")
                      setActiveSubject("todos")
                    }}
                    variant="outline"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredMaterials.map((material) => (
                    <motion.div
                      key={material.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer rounded-xl overflow-hidden h-full">
                        <div className="p-4 flex flex-col h-full">
                          <div className="relative mb-3">
                            <div className="aspect-video relative rounded-lg overflow-hidden">
                              <Image
                                src={material.thumbnail || "/placeholder.svg"}
                                alt={material.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(material.type)}`}>
                                {materialTypes.find((t) => t.id === material.type)?.name}
                              </span>
                            </div>
                          </div>

                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                            {material.title}
                          </h3>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 flex-grow">
                            {material.description}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <span>{material.author}</span>
                            <span>{formatRelativeDate(material.uploadDate)}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <span className="flex items-center">
                              <Download className="h-3.5 w-3.5 mr-1" />
                              {material.downloads} downloads
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              {material.views} visualizações
                            </span>
                            <span className="flex items-center">
                              <Star className="h-3.5 w-3.5 mr-1 text-yellow-400 fill-yellow-400" />
                              {material.rating.toFixed(1)}
                            </span>
                          </div>

                          <Button className="w-full bg-purple-700 hover:bg-purple-600 text-white mt-auto">
                            <Download className="mr-2 h-4 w-4" />
                            Baixar {material.fileType}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
