"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Star, Award, Sparkles, Zap, Heart, Target, BookOpen } from "lucide-react"

const teacherMessages = [
  {
    message: "Você está moldando o futuro de Moçambique, um aluno de cada vez.",
    author: "Nelson Mandela",
    quote: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
    icon: <Lightbulb className="h-6 w-6" />,
    gradient: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    message: "Seu impacto vai muito além da sala de aula. Você inspira sonhos e transforma vidas.",
    author: "Malala Yousafzai",
    quote: "Um professor, um livro, uma caneta podem mudar o mundo.",
    icon: <Star className="h-6 w-6" />,
    gradient: "from-blue-400 to-purple-500",
    bgGradient: "from-blue-50 to-purple-50",
  },
  {
    message: "Cada aula que você ministra é uma oportunidade de inspirar uma mente jovem a alcançar grandeza.",
    author: "William Arthur Ward",
    quote:
      "O professor medíocre conta. O bom professor explica. O professor superior demonstra. O grande professor inspira.",
    icon: <Award className="h-6 w-6" />,
    gradient: "from-green-400 to-teal-500",
    bgGradient: "from-green-50 to-teal-50",
  },
  {
    message:
      "Seu trabalho hoje está construindo o Moçambique de amanhã. Continue acreditando no potencial de cada aluno.",
    author: "Samora Machel",
    quote: "A educação é a base para o desenvolvimento da nossa nação.",
    icon: <Target className="h-6 w-6" />,
    gradient: "from-red-400 to-pink-500",
    bgGradient: "from-red-50 to-pink-50",
  },
]

const studentMessages = [
  {
    message:
      "Cada página que você lê, cada problema que resolve, cada desafio que enfrenta está construindo seu futuro brilhante.",
    author: "Nelson Mandela",
    quote: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
    icon: <BookOpen className="h-6 w-6" />,
    gradient: "from-indigo-400 to-blue-500",
    bgGradient: "from-indigo-50 to-blue-50",
  },
  {
    message: "Seu potencial é ilimitado. Continue aprendendo, questionando e crescendo todos os dias.",
    author: "Mia Couto",
    quote: "O que faz andar a estrada? É o sonho. Enquanto a gente sonhar, a estrada permanecerá viva.",
    icon: <Sparkles className="h-6 w-6" />,
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    message: "Cada esforço de hoje é uma vitória garantida no seu amanhã. Persista!",
    author: "Paulina Chiziane",
    quote: "Não há nada impossível para quem persiste.",
    icon: <Zap className="h-6 w-6" />,
    gradient: "from-emerald-400 to-green-500",
    bgGradient: "from-emerald-50 to-green-50",
  },
  {
    message:
      "Você tem o poder de transformar não apenas sua vida, mas também a de sua família e comunidade através da educação.",
    author: "Malala Yousafzai",
    quote: "Um livro, uma caneta, uma criança e um professor podem mudar o mundo.",
    icon: <Heart className="h-6 w-6" />,
    gradient: "from-rose-400 to-red-500",
    bgGradient: "from-rose-50 to-red-50",
  },
]

interface MotivationalMessageProps {
  type: "teacher" | "student"
  userName?: string
}

export function MotivationalMessage({ type, userName }: MotivationalMessageProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const messages = type === "teacher" ? teacherMessages : studentMessages
  const currentMessage = messages[currentIndex]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length)
        setIsVisible(true)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [messages.length, isPaused])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: { duration: 0.4 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Card className="overflow-hidden shadow-xl border-0 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`bg-gradient-to-br ${currentMessage.bgGradient} dark:from-gray-800 dark:to-gray-900 relative overflow-hidden`}
            >
              {/* Partículas de fundo */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                      scale: 0,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 p-8">
                <motion.div variants={itemVariants} className="flex items-start space-x-6">
                  {/* Ícone animado */}
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${currentMessage.gradient} flex items-center justify-center text-white shadow-lg cursor-pointer`}
                  >
                    {currentMessage.icon}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    {/* Saudação */}
                    <motion.h3
                      variants={itemVariants}
                      className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4"
                    >
                      {userName ? `Olá, ${userName}!` : type === "teacher" ? "Olá, Professor!" : "Olá, Estudante!"}
                    </motion.h3>

                    {/* Mensagem principal */}
                    <motion.p
                      variants={itemVariants}
                      className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-medium"
                    >
                      {currentMessage.message}
                    </motion.p>

                    {/* Citação */}
                    <motion.div
                      variants={itemVariants}
                      className="relative pl-6 border-l-4 border-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"
                    >
                      <blockquote className="text-gray-600 dark:text-gray-300 italic text-lg mb-2 font-medium">
                        "{currentMessage.quote}"
                      </blockquote>
                      <cite className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                        — {currentMessage.author}
                      </cite>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Barra de progresso */}
              <motion.div
                className={`h-1 bg-gradient-to-r ${currentMessage.gradient}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPaused ? 0 : 1 }}
                transition={{ duration: 8, ease: "linear" }}
                style={{ originX: 0 }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Indicadores de navegação */}
          <div className="flex justify-center items-center space-x-3 py-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 h-3" : "w-3 h-3"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`w-full h-full rounded-full ${
                    index === currentIndex
                      ? `bg-gradient-to-r ${messages[index].gradient}`
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  layoutId={index === currentIndex ? "activeIndicator" : undefined}
                />
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default MotivationalMessage
