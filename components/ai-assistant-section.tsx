"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, Send, User, Loader2 } from "lucide-react"

export function AiAssistantSection() {
  const [messages, setMessages] = useState<Array<{ type: "user" | "bot"; content: string }>>([
    { type: "bot", content: "Olá! Sou o assistente virtual do Colégio Matola. Como posso ajudar você hoje?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage = input.trim()
    setMessages((prev) => [...prev, { type: "user", content: userMessage }])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (
        userMessage.toLowerCase().includes("matrícula") ||
        userMessage.toLowerCase().includes("matricula") ||
        userMessage.toLowerCase().includes("inscrição")
      ) {
        response =
          "Para realizar a matrícula, você precisa visitar nossa secretaria com os documentos do aluno (certidão de nascimento, comprovante de residência e histórico escolar). Também é possível iniciar o processo online através da página de Admissão em nosso site."
      } else if (
        userMessage.toLowerCase().includes("horário") ||
        userMessage.toLowerCase().includes("horario") ||
        userMessage.toLowerCase().includes("aulas")
      ) {
        response =
          "Nossas aulas funcionam de segunda a sexta-feira, das 7h às 17h30. O ensino fundamental tem aulas pela manhã (7h às 12h) e o ensino médio à tarde (13h às 17h30). Algumas atividades extracurriculares ocorrem após o horário regular."
      } else if (
        userMessage.toLowerCase().includes("preço") ||
        userMessage.toLowerCase().includes("preco") ||
        userMessage.toLowerCase().includes("valor") ||
        userMessage.toLowerCase().includes("mensalidade")
      ) {
        response =
          "Os valores das mensalidades variam de acordo com o nível de ensino. Para informações detalhadas sobre preços, por favor entre em contato com nossa equipe financeira pelo telefone (123) 456-7890 ou visite a página de Admissão em nosso site."
      } else if (
        userMessage.toLowerCase().includes("contato") ||
        userMessage.toLowerCase().includes("telefone") ||
        userMessage.toLowerCase().includes("email")
      ) {
        response =
          "Você pode entrar em contato conosco pelo telefone +258 12 345 6789 ou pelo email info@colegiomatola.co.mz. Nossa equipe está disponível para atendimento de segunda a sexta-feira, das 8h às 18h."
      } else if (
        userMessage.toLowerCase().includes("localização") ||
        userMessage.toLowerCase().includes("localizacao") ||
        userMessage.toLowerCase().includes("endereço") ||
        userMessage.toLowerCase().includes("endereco")
      ) {
        response =
          "O Colégio Matola está localizado na Av. Principal, 123, Matola, Moçambique. Estamos próximos ao centro comercial e temos fácil acesso por transporte público."
      } else {
        response =
          "Obrigado pela sua mensagem. Para informações mais detalhadas sobre este assunto, recomendo entrar em contato com nossa secretaria pelo telefone +258 12 345 6789 ou visitar a seção correspondente em nosso site."
      }

      setMessages((prev) => [...prev, { type: "bot", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Assistente Virtual</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Tire suas dúvidas instantaneamente com nosso assistente virtual inteligente.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="bg-emerald-600 p-4 text-white flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            <h3 className="font-semibold">Assistente do Colégio Matola</h3>
          </div>

          <div className="h-96 overflow-y-auto p-4 flex flex-col space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <div className="flex items-start">
                    {message.type === "bot" && <Bot className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />}
                    <p>{message.content}</p>
                    {message.type === "user" && <User className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] p-3">
                  <div className="flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta aqui..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-70"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Enviar</span>
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Este assistente virtual utiliza inteligência artificial para responder perguntas comuns. Para questões
              mais específicas, entre em contato com nossa equipe.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AiAssistantSection
