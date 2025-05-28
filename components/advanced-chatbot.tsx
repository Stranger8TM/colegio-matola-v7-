"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Search,
  Send,
  Lightbulb,
  FileText,
  Brain,
  Sparkles,
  X,
  RotateCw,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import type { ChatMessage } from "@/lib/groq-service"
import { motion, AnimatePresence } from "framer-motion"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface Message {
  id: string
  role: "user" | "assistant" | "system" | "function" | "thinking"
  content: string
  name?: string
  timestamp: Date
  feedback?: "positive" | "negative"
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

const SUGGESTED_QUESTIONS = [
  "Quais são os horários de funcionamento da escola?",
  "Como funciona o processo de admissão?",
  "Quais atividades extracurriculares são oferecidas?",
  "Qual é o currículo acadêmico da escola?",
  "Como posso agendar uma visita à escola?",
  "Quais são as mensalidades e taxas?",
  "Quais são os diferenciais do Colégio Privado da Matola?",
  "Como funciona o transporte escolar?",
]

export function AdvancedChatbot() {
  // Estado para mensagens da conversa atual
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Olá! Sou a IA do Colégio Privado da Matola. Posso pesquisar informações, analisar textos e resolver problemas passo a passo. Como posso ajudar você hoje?",
      timestamp: new Date(),
    },
  ])

  // Estado para entrada do usuário
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentFunction, setCurrentFunction] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Estado para histórico de conversas
  const [conversations, setConversations] = useLocalStorage<Conversation[]>("chatbot-conversations", [])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true)

  // Efeito para criar uma nova conversa ao iniciar
  useEffect(() => {
    if (!currentConversationId) {
      createNewConversation()
    }
  }, [currentConversationId])

  // Função para criar nova conversa
  const createNewConversation = useCallback(() => {
    const newId = `conv-${Date.now()}`
    const newConversation: Conversation = {
      id: newId,
      title: "Nova Conversa",
      messages: [...messages],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setConversations((prev) => [...prev, newConversation])
    setCurrentConversationId(newId)
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Olá! Sou a IA do Colégio Privado da Matola. Posso pesquisar informações, analisar textos e resolver problemas passo a passo. Como posso ajudar você hoje?",
        timestamp: new Date(),
      },
    ])
  }, [messages, setConversations])

  // Função para carregar uma conversa existente
  const loadConversation = (id: string) => {
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      setMessages(conversation.messages)
      setCurrentConversationId(id)
      setIsHistoryOpen(false)
    }
  }

  // Função para atualizar o título da conversa baseado no conteúdo
  const updateConversationTitle = useCallback(
    (msgs: Message[]) => {
      if (!currentConversationId) return

      const userMessages = msgs.filter((m) => m.role === "user")
      if (userMessages.length > 0) {
        const firstUserMessage = userMessages[0].content
        const title = firstUserMessage.length > 30 ? `${firstUserMessage.substring(0, 30)}...` : firstUserMessage

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === currentConversationId ? { ...conv, title, messages: msgs, updatedAt: new Date() } : conv,
          ),
        )
      }
    },
    [currentConversationId, setConversations],
  )

  // Função para enviar mensagem para a API
  const sendMessageToAPI = async (chatMessages: ChatMessage[]) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatMessages }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao comunicar com a API")
      }

      return await response.json()
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      throw error
    }
  }

  // Função para enviar mensagem
  const handleSendMessage = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Adicionar mensagem de "pensando"
      const thinkingId = `thinking-${Date.now()}`
      setMessages((prev) => [
        ...prev,
        {
          id: thinkingId,
          role: "thinking",
          content: "Pensando...",
          timestamp: new Date(),
        },
      ])

      // Preparar mensagens para a API (excluindo as de "thinking")
      const apiMessages = updatedMessages
        .filter((msg) => msg.role !== "thinking")
        .map((msg) => ({
          role: msg.role === "function" ? "assistant" : msg.role,
          content: msg.content,
          name: msg.name,
        })) as ChatMessage[]

      // Enviar mensagens para a API
      const response = await sendMessageToAPI(apiMessages)

      // Remover mensagem de "pensando"
      setMessages((prev) => prev.filter((msg) => msg.id !== thinkingId))

      // Verificar se há uma chamada de função
      const assistantMessage = response.choices[0].message
      if (assistantMessage.function_call) {
        // Extrair nome da função
        const functionName = assistantMessage.function_call.name

        // Atualizar estado para mostrar qual função está sendo executada
        setCurrentFunction(functionName)

        // Adicionar mensagem indicando a função que está sendo chamada
        let functionMessage = ""
        switch (functionName) {
          case "search_internet":
            functionMessage = "🔍 Pesquisando na internet..."
            break
          case "analyze_text":
            functionMessage = "📝 Analisando texto..."
            break
          case "think_step_by_step":
            functionMessage = "💭 Pensando passo a passo..."
            break
          default:
            functionMessage = `⚙️ Executando função: ${functionName}...`
        }

        const functionId = `func-${Date.now()}`
        setMessages((prev) => [
          ...prev,
          {
            id: functionId,
            role: "function",
            name: functionName,
            content: functionMessage,
            timestamp: new Date(),
          },
        ])

        // Aguardar um pouco para simular o processamento
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      // Adicionar resposta do assistente
      const assistantResponse = response.choices[0].message.content
      const newMessages = [
        ...messages.filter((msg) => msg.role !== "thinking" && msg.id !== thinkingId),
        userMessage,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: assistantResponse,
          timestamp: new Date(),
        },
      ]

      setMessages(newMessages)
      updateConversationTitle(newMessages)

      // Limpar função atual
      setCurrentFunction(null)
    } catch (error) {
      console.error("Erro:", error)
      // Remover mensagem de "pensando"
      setMessages((prev) => prev.filter((msg) => msg.role !== "thinking"))

      // Em caso de erro
      const errorMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Desculpe, tive um problema ao processar sua mensagem. Poderia tentar novamente com uma pergunta diferente?",
        timestamp: new Date(),
      }
      const newMessages = [...messages, userMessage, errorMessage]
      setMessages(newMessages)
      updateConversationTitle(newMessages)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para dar feedback em uma mensagem
  const handleMessageFeedback = (id: string, feedback: "positive" | "negative") => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, feedback } : msg)))

    // Atualizar a conversa no histórico
    if (currentConversationId) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messages: messages.map((msg) => (msg.id === id ? { ...msg, feedback } : msg)) }
            : conv,
        ),
      )
    }
  }

  // Rolar para a mensagem mais recente
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Função para renderizar ícones baseados no tipo de mensagem
  const renderMessageIcon = (message: Message) => {
    if (message.role === "thinking") {
      return <Lightbulb className="h-4 w-4 text-yellow-500" />
    } else if (message.role === "function") {
      if (message.name === "search_internet") {
        return <Search className="h-4 w-4 text-blue-500" />
      } else if (message.name === "analyze_text") {
        return <FileText className="h-4 w-4 text-green-500" />
      } else if (message.name === "think_step_by_step") {
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
      }
    } else if (message.role === "assistant") {
      return <Sparkles className="h-4 w-4 text-blue-500" />
    } else if (message.role === "user") {
      return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
    return null
  }

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Cabeçalho */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium">IA do Colégio Matola</h3>
              <p className="text-xs text-blue-100">Powered by Groq • Pesquisa • Análise • Raciocínio</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700"
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            >
              <Clock className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Histórico</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={createNewConversation}>
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Nova Conversa</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Histórico de conversas (painel lateral) */}
      <AnimatePresence>
        {isHistoryOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700"
          >
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Histórico de Conversas</h4>
                <Button variant="ghost" size="sm" onClick={() => setIsHistoryOpen(false)} className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {conversations.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                    Nenhuma conversa encontrada
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {conversations
                      .slice()
                      .reverse()
                      .map((conv) => (
                        <li key={conv.id}>
                          <Button
                            variant={currentConversationId === conv.id ? "secondary" : "ghost"}
                            size="sm"
                            className="w-full justify-start text-left truncate"
                            onClick={() => loadConversation(conv.id)}
                          >
                            <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
                            <span className="truncate">{conv.title || "Nova Conversa"}</span>
                            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                              {new Date(conv.updatedAt).toLocaleDateString()}
                            </span>
                          </Button>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Área de mensagens */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`max-w-[80%] p-4 rounded-xl ${
                message.role === "user"
                  ? "bg-blue-800 text-white"
                  : message.role === "thinking" || message.role === "function"
                    ? "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                    : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {renderMessageIcon(message) && (
                <div className="flex items-center mb-2">
                  {renderMessageIcon(message)}
                  <span className="ml-2 text-sm font-medium">
                    {message.role === "function" && message.name === "search_internet" && "Pesquisa na Internet"}
                    {message.role === "function" && message.name === "analyze_text" && "Análise de Texto"}
                    {message.role === "function" && message.name === "think_step_by_step" && "Raciocínio Passo a Passo"}
                    {message.role === "thinking" && "Pensando..."}
                    {message.role === "assistant" && "Assistente"}
                    {message.role === "user" && "Você"}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              )}
              <div className={message.role === "thinking" ? "animate-pulse" : ""}>{message.content}</div>

              {/* Botões de feedback para mensagens do assistente */}
              {message.role === "assistant" && message.id !== "welcome" && (
                <div className="flex justify-end mt-2 space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-6 w-6 p-0 ${message.feedback === "positive" ? "text-green-500" : "text-gray-400"}`}
                    onClick={() => handleMessageFeedback(message.id, "positive")}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-6 w-6 p-0 ${message.feedback === "negative" ? "text-red-500" : "text-gray-400"}`}
                    onClick={() => handleMessageFeedback(message.id, "negative")}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && !messages.some((msg) => msg.role === "thinking") && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-4 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
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
        <div ref={messagesEndRef} />
      </div>

      {/* Sugestões de perguntas */}
      <AnimatePresence>
        {isSuggestionsOpen && messages.length <= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Perguntas sugeridas</h4>
              <Button variant="ghost" size="sm" onClick={() => setIsSuggestionsOpen(false)} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.slice(0, 4).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-white dark:bg-gray-700"
                  onClick={() => handleSendMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Área de entrada */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            placeholder="Pergunte algo..."
            disabled={isLoading}
            className="flex-grow px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-70"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="bg-blue-800 hover:bg-blue-700 text-white rounded-xl disabled:opacity-70"
          >
            {isLoading ? <RotateCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>

        {/* Botão para mostrar sugestões se estiverem fechadas */}
        {!isSuggestionsOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSuggestionsOpen(true)}
            className="mt-2 text-xs text-gray-500"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            Mostrar sugestões
          </Button>
        )}
      </div>
    </div>
  )
}
