"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"

interface IntroAnimationWrapperProps {
  children: React.ReactNode
}

export function IntroAnimationWrapper({ children }: IntroAnimationWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Verificar se a animação já foi mostrada nesta sessão
    const hasSeenAnimation = sessionStorage.getItem("hasSeenIntroAnimation")

    if (hasSeenAnimation) {
      // Pular animação se já foi vista
      setIsLoading(false)
      setShowContent(true)
    } else {
      // Mostrar animação e salvar na sessão
      const timer = setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => {
          setShowContent(true)
          sessionStorage.setItem("hasSeenIntroAnimation", "true")
        }, 1000)
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-blue-800 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="mb-4"
                >
                  <Logo size="lg" variant="white" withText={false} />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                >
                  Colégio Privado da Matola
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-blue-200"
                >
                  Educação de excelência desde 2017
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ delay: 0.9, duration: 1 }}
                  className="h-1 bg-yellow-500 mt-4 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {!showContent && !isLoading && <div className="fixed inset-0 bg-blue-800 z-40" />}
    </>
  )
}

// Também exportamos como uma exportação nomeada para compatibilidade com código existente
export default IntroAnimationWrapper
