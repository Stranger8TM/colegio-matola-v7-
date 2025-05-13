"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Send, User } from "lucide-react"

export function AiAssistantSection() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Olá! Sou o assistente virtual do Colégio Privado da Matola. Como posso ajudar você hoje?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Adicionar mensagem do usuário
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simular resposta do assistente após um pequeno delay
    setTimeout(() => {
      const responses = [
        "O Colégio Privado da Matola foi fundado em 2017 e oferece educação de qualidade desde o ensino primário até o pré-universitário.",
        "Nossas matrículas para 2025 já estão abertas! Você pode agendar uma visita através do nosso site ou entrar em contato pelo telefone +258 84 039 3525.",
        "Nossa equipe pedagógica é composta por 45 professores altamente qualificados, todos com formação superior e especializações em suas áreas.",
        "O processo de admissão inclui uma avaliação diagnóstica e entrevista com os pais. Recomendamos agendar com antecedência devido à alta demanda.",
        "Oferecemos atividades extracurriculares como esportes, música, teatro e robótica para o desenvolvimento integral dos nossos alunos.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const assistantMessage = { role: "assistant", content: randomResponse }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <section className="py-24 bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
            Assistente Virtual
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-4"
          >
            Tire Suas Dúvidas Instantaneamente
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Nosso assistente virtual está disponível 24/7 para responder suas perguntas sobre o Colégio Privado da
            Matola, processo de admissão, cursos e muito mais.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-blue-800 dark:bg-blue-900 p-4 flex items-center">
                <Bot className="h-6 w-6 text-white mr-2" />
                <h3 className="text-white font-medium">Assistente do Colégio Matola</h3>
              </div>

              <div className="h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.role === "assistant" ? (
                          <Bot className="h-4 w-4 mr-1" />
                        ) : (
                          <User className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs font-medium">
                          {message.role === "assistant" ? "Assistente" : "Você"}
                        </span>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 max-w-[80%] text-gray-800 dark:text-gray-200">
                      <div className="flex items-center mb-1">
                        <Bot className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">Assistente</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSend}
                className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <div className="flex">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua pergunta aqui..."
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-blue-800 hover:bg-blue-700 text-white rounded-r-md"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Experimente perguntar sobre nosso processo de admissão, cursos oferecidos, atividades extracurriculares ou
              qualquer outra dúvida sobre o Colégio Privado da Matola.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
