"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface IntroAnimationWrapperProps {
  children: React.ReactNode
}

export function IntroAnimationWrapper({ children }: IntroAnimationWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se a animação já foi mostrada nesta sessão
    const hasSeenAnimation = sessionStorage.getItem("hasSeenIntroAnimation")

    if (hasSeenAnimation) {
      setIsLoading(false)
      return
    }

    // Mostrar a animação por 2.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Marcar que a animação já foi vista nesta sessão
      sessionStorage.setItem("hasSeenIntroAnimation", "true")
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-32 h-32 bg-yellow-500 rounded-2xl flex items-center justify-center text-blue-900 font-bold text-4xl mx-auto mb-6 shadow-lg">
                CPM
              </div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Colégio Privado da Matola
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-blue-200"
              >
                Educação de excelência desde 2017
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
