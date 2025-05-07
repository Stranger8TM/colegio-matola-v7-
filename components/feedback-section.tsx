"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Send, Lightbulb, ThumbsUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FeedbackSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("feedback") // feedback ou sugestão

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para enviar o feedback ou sugestão
    console.log({ name, email, message, rating, type: activeTab })
    setSubmitted(true)

    // Reset form
    setTimeout(() => {
      setName("")
      setEmail("")
      setMessage("")
      setRating(0)
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
            Sua Opinião é Importante
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-4"
          >
            Feedback e Sugestões
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Ajude-nos a melhorar ainda mais! Compartilhe sua experiência ou sugira novos serviços e melhorias para o
            Colégio Privado da Matola.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de Feedback/Sugestão */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center">
                  {activeTab === "feedback" ? (
                    <>
                      <ThumbsUp className="h-6 w-6 mr-2 text-blue-800 dark:text-blue-400" />
                      Deixe seu Feedback
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
                      Envie uma Sugestão
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {activeTab === "feedback" ? "Obrigado pelo seu feedback!" : "Obrigado pela sua sugestão!"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">Sua opinião é muito importante para nós.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Tabs defaultValue="feedback" value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        <TabsTrigger value="sugestao">Sugestão</TabsTrigger>
                      </TabsList>

                      <TabsContent value="feedback" className="mt-0">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Compartilhe sua experiência com o Colégio Privado da Matola. Seu feedback nos ajuda a melhorar
                          nossos serviços.
                        </div>
                      </TabsContent>

                      <TabsContent value="sugestao" className="mt-0">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Tem uma ideia para melhorar nossa escola? Compartilhe sua sugestão conosco!
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Seu nome"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="seu.email@exemplo.com"
                          required
                        />
                      </div>
                    </div>

                    {activeTab === "feedback" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Avaliação
                        </label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 transition-transform hover:scale-110"
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  star <= (hoverRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {activeTab === "feedback" ? "Seu Feedback" : "Sua Sugestão"}
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder={
                          activeTab === "feedback"
                            ? "Conte-nos sobre sua experiência..."
                            : "Compartilhe suas ideias para melhorarmos..."
                        }
                        required
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-xl">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar {activeTab === "feedback" ? "Feedback" : "Sugestão"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Informações e Benefícios */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-0">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-4">
                Por que sua opinião é importante?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                No Colégio Privado da Matola, valorizamos a opinião de pais, alunos e toda a comunidade escolar. Seu
                feedback nos ajuda a:
              </p>
              <ul className="space-y-4">
                {[
                  "Melhorar continuamente nossos serviços educacionais",
                  "Identificar áreas que precisam de mais atenção",
                  "Implementar novas ideias e sugestões",
                  "Manter um diálogo aberto com nossa comunidade",
                  "Garantir a satisfação de alunos e famílias",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5 mr-3">
                      <svg
                        className="h-4 w-4 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-800 text-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Novidades em Breve</h3>
              <p className="mb-6">
                Estamos sempre buscando inovar e melhorar. Com base no feedback de nossa comunidade, estamos
                considerando:
              </p>
              <ul className="space-y-3">
                {[
                  "Implementação de currículo internacional complementar",
                  "Novas atividades extracurriculares",
                  "Ampliação das instalações esportivas",
                  "Programas de intercâmbio cultural",
                  "Mais recursos tecnológicos para o aprendizado",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Também exportamos como uma exportação nomeada para compatibilidade com código existente
