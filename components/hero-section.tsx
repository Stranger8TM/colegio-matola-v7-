"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, CheckCircle } from "lucide-react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: "/hero-1.jpg",
      title: "Educação de Excelência para o Futuro",
      description: "Formando cidadãos globais com valores, conhecimento e habilidades para os desafios do século XXI.",
      cta: "Conheça Nossos Cursos",
      link: "/cursos",
    },
    {
      image: "/hero-2.jpg",
      title: "Professores Qualificados e Dedicados",
      description: "Nossa equipe de educadores é comprometida com o desenvolvimento integral de cada aluno.",
      cta: "Conheça Nossa Equipe",
      link: "/professores",
    },
    {
      image: "/hero-3.jpg",
      title: "Infraestrutura Moderna e Completa",
      description: "Oferecemos instalações de ponta para proporcionar a melhor experiência de aprendizagem.",
      cta: "Visite Nossa Escola",
      link: "/contacto",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{slide.title}</h1>
                <p className="text-xl text-white/90 mb-8">{slide.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={slide.link}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    {slide.cta}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/admissao"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                  >
                    Processo de Admissão
                  </Link>
                </div>
                <div className="mt-8 flex items-center space-x-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="ml-2 text-white">Ensino de Qualidade</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="ml-2 text-white">Tecnologia Avançada</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="ml-2 text-white">Ambiente Seguro</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
