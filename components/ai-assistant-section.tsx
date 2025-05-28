"use client"

import { useState, useEffect } from "react"
import { AdvancedChatbot } from "./advanced-chatbot"
import { motion } from "framer-motion"
import { MessageSquare, Brain, Sparkles, Zap, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiAssistantSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Efeito para controlar a visibilidade em dispositivos móveis
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    // Inicializar
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section
      id="ai-assistant"
      className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
            <Brain className="h-4 w-4 mr-2" />
            Tecnologia Avançada
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Assistente de IA Inteligente
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nosso assistente de IA avançado está disponível 24/7 para responder perguntas, fornecer informações e ajudar
            com dúvidas sobre o Colégio Privado da Matola.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AdvancedChatbot />
            </motion.div>
          )}

          {!isVisible && (
            <div className="text-center">
              <Button size="lg" className="bg-blue-800 hover:bg-blue-700 text-white" onClick={() => setIsVisible(true)}>
                <MessageSquare className="mr-2 h-5 w-5" />
                Abrir Assistente de IA
              </Button>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Sparkles className="h-8 w-8 text-blue-600" />,
                title: "Respostas Inteligentes",
                description: "Obtenha respostas precisas e contextualizadas sobre o colégio, cursos e processos.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-500" />,
                title: "Pesquisa Avançada",
                description: "Nosso assistente pode pesquisar informações e fornecer dados atualizados sobre a escola.",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-green-600" />,
                title: "Suporte Educacional",
                description: "Tire dúvidas sobre o currículo, atividades e recursos educacionais disponíveis.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-blue-50 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            Alimentado por tecnologia de IA avançada da Groq. O assistente pode pesquisar informações, analisar textos e
            resolver problemas passo a passo para fornecer respostas precisas e úteis.
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Também exportamos como uma exportação nomeada para compatibilidade com código existente
