"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ThumbsUp, Flag, Share2, MoreHorizontal, Clock, Tag, Send } from "lucide-react"
import { motion } from "framer-motion"

// Dados simulados para o tópico
const topic = {
  id: "1",
  title: "Como resolver equações de segundo grau?",
  category: "matematica",
  categoryName: "Matemática",
  author: "Ana Silva",
  authorAvatar: "/avatar-1.jpg",
  authorRole: "Aluno",
  date: "2023-05-10T14:30:00",
  content: `Olá pessoal,

Estou com dificuldade em resolver equações de segundo grau. Especificamente, não estou conseguindo entender como aplicar a fórmula de Bhaskara em alguns casos.

Por exemplo, como resolver: 2x² - 5x + 3 = 0?

Tentei usar a fórmula x = (-b ± √(b² - 4ac)) / 2a, mas estou confuso com os sinais.

Alguém poderia me ajudar com um passo a passo detalhado?

Obrigado!`,
  replies: [
    {
      id: "r1",
      author: "Prof. Gabriel",
      authorAvatar: "/teacher-gabriel.jpg",
      authorRole: "Professor",
      date: "2023-05-10T15:45:00",
      content: `Olá Ana,

Vou te ajudar com o passo a passo para resolver essa equação usando a fórmula de Bhaskara.

Para a equação 2x² - 5x + 3 = 0, temos:
- a = 2
- b = -5
- c = 3

Aplicando a fórmula:
x = (-b ± √(b² - 4ac)) / 2a
x = (5 ± √((-5)² - 4×2×3)) / 2×2
x = (5 ± √(25 - 24)) / 4
x = (5 ± √1) / 4
x = (5 ± 1) / 4

Portanto:
x₁ = (5 + 1) / 4 = 6/4 = 1,5
x₂ = (5 - 1) / 4 = 4/4 = 1

Você pode verificar substituindo esses valores na equação original.

Espero que isso ajude! Se tiver mais dúvidas, é só perguntar.`,
      likes: 8,
      isAnswer: true,
    },
    {
      id: "r2",
      author: "Carlos Mendes",
      authorAvatar: "/avatar-2.jpg",
      authorRole: "Aluno",
      date: "2023-05-10T16:20:00",
      content: `Obrigado pela explicação, professor! Só para complementar, uma dica que me ajudou muito foi visualizar graficamente as equações de segundo grau.

Ana, quando você tem uma equação como 2x² - 5x + 3 = 0, o gráfico é uma parábola, e as soluções são os pontos onde a parábola cruza o eixo x.

Existem vários aplicativos gratuitos que podem te ajudar a visualizar isso, como o GeoGebra.`,
      likes: 3,
      isAnswer: false,
    },
    {
      id: "r3",
      author: "Ana Silva",
      authorAvatar: "/avatar-1.jpg",
      authorRole: "Aluno",
      date: "2023-05-11T09:15:00",
      content: `Muito obrigada, Prof. Gabriel e Carlos! 

Agora entendi como aplicar a fórmula corretamente. Vou praticar com mais alguns exemplos e também experimentar o GeoGebra para visualizar os gráficos.

Realmente ajuda muito ver o passo a passo detalhado.`,
      likes: 2,
      isAnswer: false,
    },
  ],
  likes: 12,
  views: 78,
}

export default function TopicPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [newReply, setNewReply] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likedReplies, setLikedReplies] = useState<string[]>([])
  const [hasLikedTopic, setHasLikedTopic] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Verificar autenticação
    const studentId = localStorage.getItem("studentId")
    if (!studentId && isMounted) {
      router.push("/painel")
    }
  }, [router, isMounted])

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

  // Manipular envio de resposta
  const handleSubmitReply = () => {
    if (!newReply.trim()) return

    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setNewReply("")
      setIsSubmitting(false)

      // Feedback para o usuário
      alert("Resposta enviada com sucesso!")
    }, 1000)
  }

  // Manipular curtida em resposta
  const handleLikeReply = (replyId: string) => {
    if (likedReplies.includes(replyId)) {
      setLikedReplies(likedReplies.filter((id) => id !== replyId))
    } else {
      setLikedReplies([...likedReplies, replyId])
    }
  }

  // Manipular curtida no tópico
  const handleLikeTopic = () => {
    setHasLikedTopic(!hasLikedTopic)
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando tópico...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* Navegação */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            onClick={() => router.push("/portal/dashboard/forum")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Fórum
          </Button>
        </div>

        {/* Tópico Principal */}
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} alt={topic.author} />
                <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{topic.title}</h1>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center font-medium text-gray-900 dark:text-gray-100">
                    {topic.author}
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {topic.authorRole}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatRelativeDate(topic.date)}
                  </span>
                  <span className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    {topic.categoryName}
                  </span>
                </div>

                <div className="prose dark:prose-invert max-w-none mb-6">
                  {topic.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < paragraph.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-1 ${
                      hasLikedTopic
                        ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                        : ""
                    }`}
                    onClick={handleLikeTopic}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{hasLikedTopic ? topic.likes + 1 : topic.likes}</span>
                  </Button>

                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>Compartilhar</span>
                  </Button>

                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Flag className="h-4 w-4" />
                    <span>Reportar</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Respostas */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Respostas ({topic.replies.length})</h2>

          <div className="space-y-4">
            {topic.replies.map((reply) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={`border-0 shadow-md rounded-xl overflow-hidden ${
                    reply.isAnswer ? "border-l-4 border-l-green-500 dark:border-l-green-600" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={reply.authorAvatar || "/placeholder.svg"} alt={reply.author} />
                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900 dark:text-gray-100 mr-2">{reply.author}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {reply.authorRole}
                            </span>
                            {reply.isAnswer && (
                              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Resposta Verificada
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatRelativeDate(reply.date)}
                          </span>
                        </div>

                        <div className="prose dark:prose-invert max-w-none mb-4">
                          {reply.content.split("\n\n").map((paragraph, index) => (
                            <p key={index} className="mb-4">
                              {paragraph.split("\n").map((line, i) => (
                                <span key={i}>
                                  {line}
                                  {i < paragraph.split("\n").length - 1 && <br />}
                                </span>
                              ))}
                            </p>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`flex items-center gap-1 ${
                              likedReplies.includes(reply.id) ? "text-purple-700 dark:text-purple-400" : ""
                            }`}
                            onClick={() => handleLikeReply(reply.id)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{likedReplies.includes(reply.id) ? reply.likes + 1 : reply.likes}</span>
                          </Button>

                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formulário de Resposta */}
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sua Resposta</h3>

            <div className="mb-4">
              <textarea
                placeholder="Escreva sua resposta aqui..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-purple-700 hover:bg-purple-600 text-white"
                onClick={handleSubmitReply}
                disabled={!newReply.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Resposta
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
