"use client"

import { AdvancedChatbot } from "./advanced-chatbot"

export function AIAssistantSection() {
  return (
    <section id="ai-assistant" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Assistente de IA Avançado
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nosso assistente de IA avançado está disponível 24/7 para responder perguntas, fornecer informações e ajudar
            com dúvidas sobre o Colégio Privado da Matola.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AdvancedChatbot />

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Alimentado por tecnologia de IA avançada da Groq. O assistente pode pesquisar informações, analisar textos e
            resolver problemas passo a passo para fornecer respostas precisas e úteis.
          </div>
        </div>
      </div>
    </section>
  )
}
