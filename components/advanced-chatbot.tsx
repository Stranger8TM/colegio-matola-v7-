"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Search, Send, Lightbulb, FileText } from "lucide-react"
import type { ChatMessage } from "@/lib/groq-service"

interface Message {
  role: "user" | "assistant" | "system" | "function" | "thinking"
  content: string
  name?: string
}

export function AdvancedChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou a IA avançada do Colégio Privado da Matola. Posso pesquisar informações, analisar textos e resolver problemas passo a passo. Como posso ajudar você hoje?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentFunction, setCurrentFunction] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Adiciona a mensagem do usuário
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Adicionar mensagem de "pensando"
      setMessages((prev) => [...prev, { role: "thinking", content: "Pensando..." }])

      // Preparar mensagens para a API (excluindo as de "thinking")
      const apiMessages = messages.filter((msg) => msg.role !== "thinking").concat(userMessage) as ChatMessage[]

      // Enviar mensagens para a API
      const response = await sendMessageToAPI(apiMessages)

      // Remover mensagem de "pensando"
      setMessages((prev) => prev.filter((msg) => msg.role !== "thinking"))

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

        setMessages((prev) => [...prev, { role: "function", name: functionName, content: functionMessage }])

        // Aguardar um pouco para simular o processamento
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      // Adicionar resposta do assistente
      const assistantResponse = response.choices[0].message.content
      setMessages((prev) => [
        ...prev.filter((msg) => !(msg.role === "function" && msg.name === currentFunction)),
        { role: "assistant", content: assistantResponse },
      ])

      // Limpar função atual
      setCurrentFunction(null)
    } catch (error) {
      console.error("Erro:", error)
      // Remover mensagem de "pensando"
      setMessages((prev) => prev.filter((msg) => msg.role !== "thinking"))

      // Em caso de erro
      const errorMessage = {
        role: "assistant",
        content:
          "Desculpe, tive um problema ao processar sua mensagem. Poderia tentar novamente com uma pergunta diferente?",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
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
    }
    return null
  }

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="bg-blue-800 dark:bg-blue-900 text-white p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">IA Avançada</h3>
            <p className="text-xs text-blue-100">Powered by Groq • Pesquisa • Análise • Raciocínio</p>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
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
                  </span>
                </div>
              )}
              <div className={message.role === "thinking" ? "animate-pulse" : ""}>{message.content}</div>
            </div>
          </div>
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
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-800 hover:bg-blue-700 text-white rounded-xl disabled:opacity-70"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
