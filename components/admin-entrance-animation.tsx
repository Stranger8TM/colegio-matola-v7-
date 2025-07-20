"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const loadingSteps = [
  { text: "Inicializando sistema...", progress: 0 },
  { text: "Conectando ao servidor...", progress: 20 },
  { text: "Carregando dados de usuário...", progress: 40 },
  { text: "Preparando interface...", progress: 60 },
  { text: "Configurando permissões...", progress: 80 },
  { text: "Finalizando...", progress: 95 },
  { text: "Pronto!", progress: 100 },
]

export function AdminEntranceAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setShowLogo(true)

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 600)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center text-blue-900 font-bold text-4xl shadow-2xl mb-8">
            CPM
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Colégio Privado da Matola</h1>
          <p className="text-xl text-blue-200">Painel Administrativo</p>
        </div>
      </div>
    )
  }

  const logoVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 1.2,
      },
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden"
    >
      {/* Partículas de fundo */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1920,
              y: typeof window !== "undefined" ? Math.random() * window.innerHeight : Math.random() * 1080,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Círculos decorativos */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border-2 border-yellow-400 rounded-full opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 border-2 border-blue-400 rounded-full opacity-30"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-md mx-auto px-6"
      >
        {/* Logo animado */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate={showLogo ? ["visible", "pulse"] : "hidden"}
          className="mb-8 relative"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center text-blue-900 font-bold text-4xl shadow-2xl relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            CPM
          </div>

          {/* Anéis orbitais */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-yellow-400 rounded-full opacity-20"
              style={{
                width: `${140 + i * 20}px`,
                height: `${140 + i * 20}px`,
                left: `${-10 - i * 10}px`,
                top: `${-10 - i * 10}px`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Título principal */}
        <motion.div variants={itemVariants} className="mb-2">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Colégio Privado da Matola
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-xl text-blue-200 font-medium">Painel Administrativo</p>
        </motion.div>

        {/* Barra de progresso */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative w-full bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full relative overflow-hidden"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                animate={{ x: [-100, 300] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-blue-200">
            <span>0%</span>
            <motion.span
              key={progress}
              initial={{ scale: 1.2, color: "#FCD34D" }}
              animate={{ scale: 1, color: "#BFDBFE" }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(progress)}%
            </motion.span>
            <span>100%</span>
          </div>
        </motion.div>

        {/* Status de carregamento */}
        <motion.div variants={itemVariants} className="mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-blue-200 text-lg font-medium"
            >
              {loadingSteps[currentStep]?.text}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Indicadores de carregamento */}
        <motion.div variants={itemVariants} className="flex justify-center space-x-3">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Texto de crédito */}
        <motion.div variants={itemVariants} className="mt-8 text-xs text-blue-300/70 font-medium">
          Desenvolvido por Gabriel Vieira
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AdminEntranceAnimation
