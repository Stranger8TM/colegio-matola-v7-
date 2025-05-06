"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Search, PlusCircle, BookOpen, Clock, ThumbsUp, MessageCircle, Filter } from "lucide-react"
import { motion } from "framer-motion"

// Dados simulados para o fórum
const forumCategories = [
  {
    id: "geral",
    name: "Geral",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "matematica",
    name: "Matemática",
    icon: BookOpen,
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    id: "portugues",
    name: "Português",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    id: "ciencias",
    name: "Ciências",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    id: "historia",
    name: "História",
    icon: BookOpen,
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    id: "ajuda",
    name: "Ajuda",
    icon: MessageCircle,
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
]

const forumTopics = [
  {
    id: "1",
    title: "Como resolver equações de segundo grau?",
    category: "matematica",
    author: "Ana Silva",
    authorAvatar: "/avatar-1.jpg",
    date: "2023-05-10T14:30:00",
    replies: 12,
    likes: 8,
    views: 45,
    isPinned: true,
    lastReply: {
      author: "Prof. Gabriel",
      date: "2023-05-11T09:15:00",
    },
    excerpt:
      "Estou com dificuldade em resolver equações de segundo grau. Alguém poderia me ajudar com exemplos práticos?",
  },
  {
    id: "2",
    title: "Dicas para redação do exame nacional",
    category: "portugues",
    author: "Carlos Mendes",
    authorAvatar: "/avatar-2.jpg",
    date: "2023-05-08T10:20:00",
    replies: 8,
    likes: 15,
    views: 67,
    isPinned: false,
    lastReply: {
      author: "Profa. Maria",
      date: "2023-05-09T16:45:00",
    },
    excerpt: "Quais são as melhores estratégias para conseguir uma boa nota na redação do exame nacional?",
  },
  {
    id: "3",
    title: "Dúvida sobre o trabalho de História",
    category: "historia",
    author: "Pedro Nunes",
    authorAvatar: "/avatar-3.jpg",
    date: "2023-05-07T08:45:00",
    replies: 5,
    likes: 3,
    views: 28,
    isPinned: false,
    lastReply: {
      author: "Joana Machava",
      date: "2023-05-07T14:20:00",
    },
    excerpt: "Alguém pode me explicar melhor o que é esperado no trabalho sobre a história de Moçambique?",
  },
  {
    id: "4",
    title: "Problemas com acesso às aulas gravadas",
    category: "ajuda",
    author: "Fátima Costa",
    authorAvatar: "/avatar-4.jpg",
    date: "2023-05-06T16:10:00",
    replies: 3,
    likes: 0,
    views: 15,
    isPinned: false,
    lastReply: {
      author: "Suporte Técnico",
      date: "2023-05-06T17:30:00",
    },
    excerpt: "Não estou conseguindo acessar as aulas gravadas de Física. Alguém mais está com esse problema?",
  },
  {
    id: "5",
    title: "Grupo de estudos para o exame final",
    category: "geral",
    author: "Lucas Simango",
    authorAvatar: "/avatar-5.jpg",
    date: "2023-05-05T11:25:00",
    replies: 18,
    likes: 22,
    views: 94,
    isPinned: true,
    lastReply: {
      author: "Ana Silva",
      date: "2023-05-12T10:05:00",
    },
    excerpt: "Estou organizando um grupo de estudos para o exame final. Quem estiver interessado, por favor, comente!",
  },
]

export default function ForumPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("todos")
  const [sortBy, setSortBy] = useState("recent")
  const [isMounted, setIsMounted] = useState(false)
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false)
  const [newTopic, setNewTopic] = useState({
    title: "",
    category: "geral",
    content: "",
  })

  useEffect(() => {
    setIsMounted(true)

    // Verificar autenticação
    const studentId = localStorage.getItem("studentId")
    if (!studentId && isMounted) {
      router.push("/painel")
    }
  }, [router, isMounted])

  // Filtrar e ordenar tópicos
  const filteredTopics = forumTopics
    .filter(
      (topic) =>
        (activeCategory === "todos" || topic.category === activeCategory) &&
        (searchQuery === "" ||
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      // Primeiro os fixados
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1

      // Depois ordenar conforme selecionado
      if (sortBy === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "popular") {
        return b.replies - a.replies
      } else if (sortBy === "likes") {
        return b.likes - a.likes
      }
      return 0
    })

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

  // Manipular criação de novo tópico
  const handleCreateTopic = () => {
    // Aqui seria implementada a lógica para salvar o novo tópico
    console.log("Novo tópico:", newTopic)
    setIsNewTopicModalOpen(false)
    setNewTopic({
      title: "",
      category: "geral",
      content: "",
    })
    // Feedback para o usuário
    alert("Tópico criado com sucesso!")
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando fórum...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fórum de Discussão</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Participe das discussões, tire dúvidas e compartilhe conhecimento
            </p>
          </div>
          <Button onClick={() => setIsNewTopicModalOpen(true)} className="bg-purple-700 hover:bg-purple-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Tópico
          </Button>
        </div>

        {/* Barra de pesquisa e filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar no fórum..."
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
                <option value="popular">Mais Comentados</option>
                <option value="likes">Mais Curtidos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categorias e Tópicos */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categorias */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md rounded-xl overflow-hidden">
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20 border-b border-gray-100 dark:border-gray-800 pb-3">
                <CardTitle className="text-lg">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  <button
                    className={`flex items-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      activeCategory === "todos" ? "bg-purple-50 dark:bg-purple-900/20 font-medium" : ""
                    }`}
                    onClick={() => setActiveCategory("todos")}
                  >
                    <span className="flex-1 text-left">Todos os Tópicos</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                      {forumTopics.length}
                    </span>
                  </button>

                  {forumCategories.map((category) => {
                    const CategoryIcon = category.icon
                    const topicCount = forumTopics.filter((t) => t.category === category.id).length

                    return (
                      <button
                        key={category.id}
                        className={`flex items-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          activeCategory === category.id ? "bg-purple-50 dark:bg-purple-900/20 font-medium" : ""
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${category.color}`}>
                          <CategoryIcon className="h-4 w-4" />
                        </div>
                        <span className="flex-1 text-left">{category.name}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          {topicCount}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Tópicos */}
          <div className="lg:col-span-3">
            {filteredTopics.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhum tópico encontrado</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Não encontramos tópicos que correspondam aos seus critérios de busca.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("todos")
                  }}
                  variant="outline"
                >
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTopics.map((topic) => {
                  const category = forumCategories.find((c) => c.id === topic.category)

                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href={`/portal/dashboard/forum/${topic.id}`}>
                        <Card className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer rounded-xl overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-4 md:p-6">
                              <div className="flex items-start gap-4">
                                <Avatar className="hidden md:flex h-10 w-10 border">
                                  <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} alt={topic.author} />
                                  <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    {topic.isPinned && (
                                      <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs px-2 py-0.5 rounded-full">
                                        Fixado
                                      </span>
                                    )}
                                    {category && (
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${category.color}`}>
                                        {category.name}
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1 truncate">
                                    {topic.title}
                                  </h3>

                                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                    {topic.excerpt}
                                  </p>

                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center">
                                      Por <span className="font-medium ml-1">{topic.author}</span>
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {formatRelativeDate(topic.date)}
                                    </span>
                                    <span className="flex items-center">
                                      <MessageCircle className="h-3.5 w-3.5 mr-1" />
                                      {topic.replies} respostas
                                    </span>
                                    <span className="flex items-center">
                                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                      {topic.likes} curtidas
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {topic.lastReply && (
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <span className="mr-2">Última resposta:</span>
                                    <span className="font-medium mr-2">{topic.lastReply.author}</span>
                                    <span>{formatRelativeDate(topic.lastReply.date)}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal para criar novo tópico */}
      {isNewTopicModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Criar Novo Tópico</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
                <Input
                  type="text"
                  placeholder="Digite o título do seu tópico"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                <select
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3"
                >
                  {forumCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conteúdo</label>
                <textarea
                  placeholder="Digite o conteúdo do seu tópico"
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 min-h-[150px]"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewTopicModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-purple-700 hover:bg-purple-600 text-white"
                onClick={handleCreateTopic}
                disabled={!newTopic.title || !newTopic.content}
              >
                Publicar Tópico
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
