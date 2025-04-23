"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Escolher o Colégio Privado da Matola para meu filho foi a melhor decisão. O desenvolvimento acadêmico e pessoal dele tem sido notável. Os professores são atenciosos e a metodologia de ensino é excelente.",
    author: "Ana Silva",
    role: "Mãe de aluno do 8º ano",
    avatar: "/avatar-1.jpg",
    rating: 5,
  },
  {
    quote:
      "Os professores são extremamente dedicados e a infraestrutura da escola proporciona um ambiente ideal para o aprendizado. Minha filha adora ir para a escola todos os dias e tem apresentado um progresso incrível.",
    author: "Carlos Machava",
    role: "Pai de aluna do 5º ano",
    avatar: "/avatar-2.jpg",
    rating: 5,
  },
  {
    quote:
      "Minha filha adora as aulas práticas nos laboratórios. A escola realmente incentiva o aprendizado prático e a curiosidade científica. Além disso, as atividades extracurriculares são diversificadas e enriquecedoras.",
    author: "Fátima Mondlane",
    role: "Mãe de aluna do 10º ano",
    avatar: "/avatar-3.jpg",
    rating: 5,
  },
  {
    quote:
      "Como ex-aluno, posso dizer que o Colégio Privado da Matola me preparou muito bem para a universidade. A formação que recebi foi fundamental para meu sucesso acadêmico e profissional.",
    author: "João Matsinhe",
    role: "Ex-aluno, agora estudante de Medicina",
    avatar: "/avatar-4.jpg",
    rating: 5,
  },
  {
    quote:
      "A abordagem pedagógica do colégio é excepcional. Meu filho desenvolveu habilidades de pensamento crítico e autonomia nos estudos que o destacam entre seus colegas. Estamos muito satisfeitos.",
    author: "Teresa Cossa",
    role: "Mãe de aluno do 11º ano",
    avatar: "/avatar-5.jpg",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
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
            Depoimentos
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-4"
          >
            O Que Dizem as Famílias
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            A confiança das famílias é nosso maior reconhecimento. Veja o que os pais e ex-alunos têm a dizer sobre
            nossa escola.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controles de navegação */}
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
            <button
              onClick={prev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-blue-800 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
            <button
              onClick={next}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-blue-800 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Carrossel de depoimentos */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-2xl overflow-hidden">
                    <CardContent className="p-8">
                      <Quote className="h-12 w-12 text-blue-100 dark:text-blue-900 mb-6" />

                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-8">"{testimonial.quote}"</p>

                      <div className="flex items-center">
                        <Avatar className="h-14 w-14 border-2 border-blue-100 dark:border-blue-900">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                          <AvatarFallback className="bg-blue-800 text-white">
                            {testimonial.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-bold text-blue-900 dark:text-blue-400">{testimonial.author}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-blue-800 w-8" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
