"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      content:
        "O Colégio Matola transformou a vida do meu filho. Os professores são excepcionais e o ambiente de aprendizagem é estimulante. Ele desenvolveu não apenas conhecimentos acadêmicos, mas também valores importantes para a vida.",
      author: "Ana Silva",
      role: "Mãe de aluno do 9º ano",
      avatar: "/avatar-1.jpg",
    },
    {
      id: 2,
      content:
        "Como ex-aluno, posso dizer que os anos que passei no Colégio Matola foram fundamentais para minha formação. A educação de qualidade que recebi abriu portas para minha carreira universitária e profissional.",
      author: "Carlos Mendes",
      role: "Ex-aluno, agora Engenheiro",
      avatar: "/avatar-2.jpg",
    },
    {
      id: 3,
      content:
        "A abordagem pedagógica do Colégio Matola é inovadora e eficaz. Minha filha adora ir para a escola todos os dias e tem demonstrado um progresso notável em todas as disciplinas. Estamos muito satisfeitos com nossa escolha.",
      author: "Marta Oliveira",
      role: "Mãe de aluna do 5º ano",
      avatar: "/avatar-3.jpg",
    },
    {
      id: 4,
      content:
        "O que mais me impressiona no Colégio Matola é o equilíbrio entre excelência acadêmica e desenvolvimento pessoal. Meus dois filhos estudam lá e ambos estão florescendo de maneiras diferentes, respeitando suas individualidades.",
      author: "Paulo Machado",
      role: "Pai de alunos do 4º e 7º anos",
      avatar: "/avatar-4.jpg",
    },
    {
      id: 5,
      content:
        "A infraestrutura do colégio é impressionante, mas o que realmente faz a diferença é a dedicação do corpo docente. Os professores vão além do currículo para garantir que cada aluno alcance seu potencial máximo.",
      author: "Luísa Ferreira",
      role: "Mãe de aluno do 11º ano",
      avatar: "/avatar-5.jpg",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O Que Dizem Sobre Nós</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Conheça as experiências de pais, alunos e ex-alunos com o Colégio Matola.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="absolute -top-6 left-8 text-emerald-500">
              <Quote size={48} />
            </div>

            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-6"
            >
              <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div className="flex items-center">
                <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonials[currentIndex].author}</p>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-emerald-50 transition-colors"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-6 w-6 text-emerald-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-emerald-50 transition-colors"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-6 w-6 text-emerald-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
