"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

// Estatísticas atualizadas com base na fundação em 2017
const stats = [
  { value: 7, label: "Anos de Excelência", suffix: "+" },
  { value: 95, label: "Taxa de Aprovação", suffix: "%" },
  { value: 850, label: "Alunos Formados", suffix: "+" },
  { value: 45, label: "Professores Qualificados", suffix: "" },
]

export default function StatisticsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (!isInView) return

    const intervals = stats.map((stat, index) => {
      const duration = 2000 // 2 segundos para a animação
      const steps = 30 // número de passos para a animação
      const increment = stat.value / steps
      let count = 0

      return setInterval(() => {
        count += increment
        if (count >= stat.value) {
          count = stat.value
          clearInterval(intervals[index])
        }

        setCounts((prev) => {
          const newCounts = [...prev]
          newCounts[index] = Math.floor(count)
          return newCounts
        })
      }, duration / steps)
    })

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [isInView])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-950 dark:to-blue-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-800 dark:bg-blue-700 text-white text-2xl font-bold">
                {index + 1}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {counts[index]}
                {stat.suffix}
              </div>
              <p className="text-blue-200">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
