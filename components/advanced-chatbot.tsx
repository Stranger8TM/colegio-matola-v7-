"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Search, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AdvancedChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou a IA avançada do Colégio Privado da Matola. Posso pesquisar informações na internet para ajudar com suas dúvidas. Como posso ajudar você hoje?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Função para simular pesquisa na internet
  const simulateInternetSearch = async (query: string) => {
    setIsSearching(true)

    // Simular tempo de pesquisa
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Respostas baseadas em palavras-chave
    if (query.toLowerCase().includes("matemática") || query.toLowerCase().includes("matematica")) {
      return "Encontrei vários recursos sobre matemática! Recomendo o Khan Academy (khanacademy.org) que tem excelentes explicações sobre álgebra, geometria e cálculo. Também há o Wolfram Alpha (wolframalpha.com) que pode resolver problemas matemáticos passo a passo."
    } else if (query.toLowerCase().includes("história") || query.toLowerCase().includes("historia")) {
      return "Sobre história, recomendo o site História Digital (historiadigital.org) e o canal de YouTube 'Nerdologia História'. Para história de Moçambique especificamente, o Portal do Governo de Moçambique tem uma seção dedicada à história do país."
    } else if (query.toLowerCase().includes("física") || query.toLowerCase().includes("fisica")) {
      return "Para física, o site HyperPhysics (hyperphysics.gsu.edu) é excelente para consultas. O canal 'Física e Afins' no YouTube também tem ótimas explicações em português. Para experimentos práticos, o PhET (phet.colorado.edu) oferece simulações interativas."
    } else if (query.toLowerCase().includes("química") || query.toLowerCase().includes("quimica")) {
      return "Para química, recomendo o site Química em Ação (quimicaemacao.com.br) e o Royal Society of Chemistry (edu.rsc.org) que tem recursos educacionais gratuitos. O canal 'Manual do Mundo' também tem experimentos interessantes de química."
    } else if (query.toLowerCase().includes("biologia")) {
      return "Para biologia, o site Khan Academy tem excelentes recursos. O BioMania (biomania.com.br) também é muito bom para estudantes. Para visualizações 3D de células e organismos, recomendo o BioDigital Human (biodigital.com)."
    } else if (query.toLowerCase().includes("literatura")) {
      return "Para literatura, o site Domínio Público (dominiopublico.gov.br) tem milhares de obras em português para download gratuito. O LitCharts (litcharts.com) é excelente para análises literárias, embora seja em inglês."
    } else if (query.toLowerCase().includes("geografia")) {
      return "Para geografia, o site GeoEdu (geoedu.com.br) tem bons recursos. O Google Earth (earth.google.com) é uma ferramenta incrível para explorar a geografia mundial. O National Geographic (nationalgeographic.com) também tem conteúdo educacional excelente."
    } else if (query.toLowerCase().includes("programação") || query.toLowerCase().includes("programacao")) {
      return "Para aprender programação, recomendo o Codecademy (codecademy.com), o freeCodeCamp (freecodecamp.org) e o W3Schools (w3schools.com). São plataformas gratuitas com cursos interativos para iniciantes e avançados."
    } else {
      return `Pesquisei sobre "${query}" e encontrei algumas informações relevantes. Recomendo consultar fontes confiáveis como enciclopédias online, sites educacionais e artigos acadêmicos para obter informações mais detalhadas sobre este tema.`
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Adiciona a mensagem do usuário
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simular pesquisa na internet
      const response = await simulateInternetSearch(input)

      // Adicionar resposta do assistente
      const assistantMessage = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      // Em caso de erro
      const errorMessage = {
        role: "assistant",
        content:
          "Desculpe, tive um problema ao pesquisar essa informação. Poderia tentar novamente com uma pergunta diferente?",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsSearching(false)
    }
  }

  // Rolar para a mensagem mais recente
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-blue-800 dark:bg-blue-900 text-white p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">IA Avançada</h3>
            <p className="text-xs text-blue-100">Pesquisa na internet • Responde perguntas complexas</p>
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
                  : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-4 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-blue-500 animate-pulse" />
                  <span>Pesquisando na internet...</span>
                </div>
              ) : (
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
              )}
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
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Pergunte algo..."
            className="flex-grow px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Button onClick={handleSendMessage} className="bg-blue-800 hover:bg-blue-700 text-white rounded-xl">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
