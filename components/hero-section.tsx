"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Award, BookOpen, Star } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero3DBackground from "./hero-3d-background"

const heroImages = ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"]

const stats = [
  { icon: Users, value: "1200+", label: "Alunos" },
  { icon: Award, value: "15+", label: "Anos de Excelência" },
  { icon: BookOpen, value: "50+", label: "Cursos" },
  { icon: Star, value: "98%", label: "Taxa de Aprovação" },
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Fundo 3D */}
      <Hero3DBackground />

      {/* Imagem de fundo com parallax */}
      <motion.div className="absolute inset-0 z-10" style={{ y }}>
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <motion.div
              key={image}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentImageIndex ? 0.3 : 0,
                scale: index === currentImageIndex ? 1.05 : 1,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Hero ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
      </motion.div>

      {/* Conteúdo principal */}
      <motion.div className="relative z-20 container mx-auto px-4 text-center text-white" style={{ opacity }}>
        <div className="max-w-4xl mx-auto">
          {/* Título principal com animação */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Colégio Privado Matola
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-4 text-blue-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Excelência em Educação desde 2008
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Formando líderes do futuro com educação de qualidade, tecnologia avançada e valores sólidos na Rua da
              Mozal, Matola.
            </motion.p>
          </motion.div>

          {/* Botões de ação */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold px-8 py-4 text-lg shadow-2xl"
              >
                <Link href="/admissao">
                  Inscreva-se Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg backdrop-blur-sm"
              >
                <Link href="/cursos">
                  <Play className="mr-2 h-5 w-5" />
                  Conheça Nossos Cursos
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Estatísticas animadas */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                <motion.div initial={{ rotateY: 0 }} whileHover={{ rotateY: 360 }} transition={{ duration: 0.6 }}>
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                </motion.div>
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Indicadores de imagem */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-yellow-400 scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
