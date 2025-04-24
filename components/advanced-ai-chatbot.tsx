/**
 * Componente de chatbot avançado com IA real
 * Desenvolvido por Gabriel Vieira
 */

"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Plus, Trash2, BrainCircuit, Clock, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Tipos para as mensagens e sessões
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: string
}

interface ChatSession {
  id: string
  title: string
  updatedAt: string
  messages: Message[]
}

export default function AdvancedAIChatbot() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<"chat" | "sessions">("chat")
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Carregar as sessões do usuário
  useEffect(() => {
    if (session?.user) {
      fetchSessions()
    }
  }, [session])

  // Carregar mensagens quando a sessão ativa mudar
  useEffect(() => {
    if (activeSessionId) {
      fetchMessages(activeSessionId)
    } else {
      setMessages([])
    }
  }, [activeSessionId])

  // Rolar para a mensagem mais recente
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Buscar as sessões do usuário
  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/chat/sessions")
      if (!response.ok) {
        throw new Error("Falha ao carregar sessões")
      }
      const data = await response.json()
      setSessions(data)

      // Se não houver sessão ativa e existirem sessões, ativar a primeira
      if (!activeSessionId && data.length > 0) {
        setActiveSessionId(data[0].id)
      }
    } catch (error) {
      console.error("Erro ao carregar sessões:", error)
      setError("Não foi possível carregar suas conversas anteriores.")
    }
  }

  // Buscar as mensagens de uma sessão
  const fetchMessages = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat/sessions/${sessionId}`)
      if (!response.ok) {
        throw new Error("Falha ao carregar mensagens")
      }
      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error)
      setError("Não foi possível carregar as mensagens desta conversa.")
    }
  }

  // Criar uma nova sessão
  const createNewSession = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/chat/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "Nova conversa" }),
      })

      if (!response.ok) {
        throw new Error("Falha ao criar nova sessão")
      }

      const newSession = await response.json()
      setSessions([newSession, ...sessions])
      setActiveSessionId(newSession.id)
      setMessages([])
      setActiveTab("chat")
    } catch (error) {
      console.error("Erro ao criar nova sessão:", error)
      setError("Não foi possível criar uma nova conversa.")
    } finally {
      setIsLoading(false)
    }
  }

  // Excluir uma sessão
  const deleteSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat/sessions/${sessionId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Falha ao excluir sessão")
      }

      setSessions(sessions.filter((session) => session.id !== sessionId))

      // Se a sessão excluída for a ativa, ativar outra ou nenhuma
      if (activeSessionId === sessionId) {
        const remainingSessions = sessions.filter((session) => session.id !== sessionId)
        if (remainingSessions.length > 0) {
          setActiveSessionId(remainingSessions[0].id)
        } else {
          setActiveSessionId(null)
          setMessages([])
        }
      }
    } catch (error) {
      console.error("Erro ao excluir sessão:", error)
      setError("Não foi possível excluir esta conversa.")
    }
  }

  // Enviar uma mensagem
  const sendMessage = async () => {
    if (!input.trim()) return
    if (!session?.user) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      createdAt: new Date().toISOString(),
    }

    // Adicionar a mensagem do usuário localmente
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: input,
          sessionId: activeSessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar mensagem")
      }

      const data = await response.json()

      // Se não houver sessão ativa, usar a retornada pela API
      if (!activeSessionId) {
        setActiveSessionId(data.sessionId)
        fetchSessions() // Atualizar a lista de sessões
      }

      // Adicionar a resposta do assistente
      const assistantMessage = {
        id: Date.now().toString() + "-assistant",
        role: "assistant" as const,
        content: data.message,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      setError("Não foi possível enviar sua mensagem. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Formatar a data
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM, HH:mm", { locale: ptBR })
    } catch (error) {
      return dateString
    }
  }

  return (
    <Card className="w-full h-[700px] border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-white">Assistente Virtual Avançado</CardTitle>
            <CardDescription className="text-blue-100">
              Powered by Groq AI • Desenvolvido por Gabriel Vieira
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={createNewSession}
            disabled={isLoading}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <div className="flex h-[calc(700px-64px)]">
        {/* Sidebar com as sessões */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "sessions")}>
            <TabsList className="w-full grid grid-cols-2 p-1 m-2">
              <TabsTrigger value="chat" className="rounded-lg">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="sessions" className="rounded-lg">
                <Clock className="h-4 w-4 mr-2" />
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="p-0 m-0">
              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start mb-2"
                  onClick={createNewSession}
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova conversa
                </Button>

                {activeSessionId && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10"
                    onClick={() => deleteSession(activeSessionId)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir conversa
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="p-0 m-0">
              <div className="p-4 space-y-2">
                {sessions.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">Nenhuma conversa encontrada</div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
                        activeSessionId === session.id
                          ? "bg-blue-100 dark:bg-blue-900/20"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700/30"
                      }`}
                      onClick={() => {
                        setActiveSessionId(session.id)
                        setActiveTab("chat")
                      }}
                    >
                      <div className="truncate">
                        <div className="font-medium truncate">{session.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(session.updatedAt)}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteSession(session.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Área principal do chat */}
        <div className="flex-1 flex flex-col">
          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <BrainCircuit className="h-8 w-8 text-blue-800 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Assistente Virtual Avançado
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                  Olá! Sou o assistente virtual avançado do Colégio Privado da Matola. Como posso ajudar você hoje?
                </p>
                <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setInput("Como posso melhorar meus estudos?")
                      setTimeout(() => sendMessage(), 100)
                    }}
                  >
                    Como melhorar meus estudos?
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setInput("Quais são os próximos eventos da escola?")
                      setTimeout(() => sendMessage(), 100)
                    }}
                  >
                    Próximos eventos da escola
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setInput("Explique o teorema de Pitágoras")
                      setTimeout(() => sendMessage(), 100)
                    }}
                  >
                    Explique o teorema de Pitágoras
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setInput("Como funciona o sistema de avaliação?")
                      setTimeout(() => sendMessage(), 100)
                    }}
                  >
                    Sistema de avaliação
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-4 rounded-xl ${
                        message.role === "user"
                          ? "bg-blue-800 text-white"
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div
                        className={`text-xs mt-2 ${
                          message.role === "user" ? "text-blue-200" : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {formatDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
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

                {error && (
                  <div className="flex justify-center">
                    <div className="max-w-[80%] p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-center">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {error}
                      <Button
                        variant="link"
                        className="ml-2 text-red-800 dark:text-red-300"
                        onClick={() => setError(null)}
                      >
                        Tentar novamente
                      </Button>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input para enviar mensagem */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex space-x-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-grow px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-blue-800 hover:bg-blue-700 text-white rounded-xl"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Card>
  )
}
