"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight, Calendar, Phone } from "lucide-react"

// Imagens para o slider
const sliderImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%2810%29.jpg-92ZvRMQZT3rb6QK76LnvEqocA6w6rj.jpeg",
    alt: "Refeitório do colégio",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%286%29.jpg-AW4dpVszTS6olBGzEDrg7FxM5ffEd1.jpeg",
    alt: "Biblioteca moderna",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%287%29.jpg-Do5TcvdtaxKrkLBBQztFcnVIFm52yX.jpeg",
    alt: "Ginásio poliesportivo",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Efeito para alternar os slides automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background com efeito parallax */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-blue-900/10 dark:bg-blue-900/30 z-10"></div>
        {sliderImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1.05 : 1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Indicadores de slide */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-10" : "bg-white/50"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-4 pt-40 pb-32 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
              Matrículas Abertas 2025
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 dark:text-white mb-6 leading-tight">
              Educação que <span className="text-yellow-500">transforma</span> o futuro
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-xl">
              No Colégio Privado da Matola, formamos líderes com excelência acadêmica, valores éticos e preparação para
              os desafios globais desde 2017.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl">
                <Calendar className="mr-2 h-5 w-5" />
                Agende uma Visita
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-800 text-blue-800 dark:text-white dark:border-white hover:bg-blue-800/10 px-8 py-6 text-lg rounded-xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Fale Conosco
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Card flutuante com logo e informações */}
        <div className="lg:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-blue-900 font-bold text-2xl">CPM</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-4">
                Por que escolher o Colégio Privado da Matola?
              </h3>

              <ul className="space-y-4 mb-6">
                {[
                  "Corpo docente altamente qualificado",
                  "Infraestrutura moderna e segura",
                  "Metodologia de ensino inovadora",
                  "Formação bilíngue (Português e Inglês)",
                  "Atividades extracurriculares diversificadas",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5 mr-3">
                      <ChevronRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/admissao">
                <Button className="w-full bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white rounded-xl py-6">
                  Processo de Admissão
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Parceiros e reconhecimentos */}
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-4 md:mb-0">Reconhecido por:</p>
            <div className="flex flex-wrap justify-center gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={`/partner-${i}.png`}
                    alt={`Parceiro ${i}`}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
