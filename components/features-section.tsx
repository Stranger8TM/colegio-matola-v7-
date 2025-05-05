"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Globe, Award, Lightbulb, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-emerald-600" />,
      title: "Currículo Abrangente",
      description:
        "Oferecemos um currículo completo que combina disciplinas acadêmicas tradicionais com habilidades práticas para o século XXI.",
    },
    {
      icon: <Users className="h-10 w-10 text-emerald-600" />,
      title: "Turmas Reduzidas",
      description:
        "Nossas turmas têm número limitado de alunos para garantir atenção personalizada e melhor acompanhamento do progresso.",
    },
    {
      icon: <Globe className="h-10 w-10 text-emerald-600" />,
      title: "Perspectiva Global",
      description:
        "Preparamos nossos alunos para serem cidadãos globais, com foco em idiomas e compreensão de diferentes culturas.",
    },
    {
      icon: <Award className="h-10 w-10 text-emerald-600" />,
      title: "Excelência Acadêmica",
      description:
        "Nossos alunos consistentemente alcançam resultados excepcionais em exames nacionais e admissões universitárias.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-emerald-600" />,
      title: "Inovação Tecnológica",
      description:
        "Integramos tecnologia de ponta em nossas salas de aula para enriquecer a experiência de aprendizagem.",
    },
    {
      icon: <Shield className="h-10 w-10 text-emerald-600" />,
      title: "Ambiente Seguro",
      description:
        "Priorizamos a segurança física e emocional de nossos alunos, criando um ambiente acolhedor para todos.",
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por Que Escolher o Colégio Matola?</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Nosso compromisso é oferecer uma educação transformadora que prepara os alunos para os desafios do futuro.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
