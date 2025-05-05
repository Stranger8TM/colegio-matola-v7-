"use client"

import { motion } from "framer-motion"
import { Users, Award, BookOpen, GraduationCap } from "lucide-react"

export function StatisticsSection() {
  const stats = [
    {
      icon: <Users className="h-10 w-10 text-emerald-600" />,
      value: "1200+",
      label: "Alunos",
      description: "Estudantes ativos em todos os níveis de ensino",
    },
    {
      icon: <Award className="h-10 w-10 text-emerald-600" />,
      value: "25+",
      label: "Anos de Excelência",
      description: "Tradição e inovação na educação moçambicana",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-emerald-600" />,
      value: "98%",
      label: "Taxa de Aprovação",
      description: "Sucesso acadêmico consistente em exames nacionais",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-emerald-600" />,
      value: "95%",
      label: "Ingresso Universitário",
      description: "Alunos que ingressam em universidades de prestígio",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Números</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            Resultados que demonstram nosso compromisso com a excelência educacional.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-xl font-semibold text-emerald-400 mb-2">{stat.label}</p>
              <p className="text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatisticsSection
