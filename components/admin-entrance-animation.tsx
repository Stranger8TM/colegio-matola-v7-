"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function AdminEntranceAnimation() {
  const [showAnimation, setShowAnimation] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!showAnimation) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900">
      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Painel Administrativo
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-xl text-yellow-300"
          >
            Colégio Privado da Matola
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="h-1 bg-yellow-400 mt-6"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 text-center text-white"
        >
          Carregando recursos...
        </motion.div>

        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.5, duration: 1 }}
          className="h-1 bg-blue-400 mt-4"
        />
      </div>
    </div>
  )
}
