"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, FlaskRoundIcon as Flask, Users, Award, GraduationCap, Globe } from "lucide-react"

const features = [
  {
    title: "Biblioteca Moderna",
    description:
      "Espaço amplo com acervo diversificado para pesquisa e estudo, incluindo recursos digitais e impressos.",
    icon: <BookOpen className="h-10 w-10 text-blue-800 dark:text-blue-400" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%286%29.jpg-AW4dpVszTS6olBGzEDrg7FxM5ffEd1.jpeg",
  },
  {
    title: "Laboratórios Equipados",
    description: "Laboratórios de ciências com equipamentos modernos para aulas práticas e experimentos científicos.",
    icon: <Flask className="h-10 w-10 text-blue-800 dark:text-blue-400" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%283%29.jpg-jvcvYomNVXFSMasZM5TWbAulHGVl8J.jpeg",
  },
  {
    title: "Corpo Docente Qualificado",
    description: "Professores com formação superior, mestrado e doutorado, com vasta experiência no ensino.",
    icon: <Users className="h-10 w-10 text-blue-800 dark:text-blue-400" />,
    image: "/professores.jpg",
  },
  {
    title: "Currículo Nacional",
    description:
      "Seguimos o currículo nacional de Moçambique com excelência, preparando os alunos para os desafios acadêmicos.",
    icon: <Award className="h-10 w-10 text-blue-800 dark:text-blue-400" />,
    image: "/curriculo.jpg",
  },
  {
    title: "Instalações Esportivas",
    description: "Espaços modernos para prática de esportes e atividades físicas, incluindo quadras poliesportivas.",
    icon: <GraduationCap className="h-10 w-10 text-blue-800 dark:text-blue-400" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%287%29.jpg-Do5TcvdtaxKrkLBBQztFcnVIFm52yX.jpeg",
  },
  {
    title: "Educação Global",
    description:
      "Preparamos os alunos para os desafios do mundo moderno com foco em tecnologia, idiomas e pensamento crítico.",
    icon: <Globe className="h-10 w-10 text-blue-800 dark:text-blue-400" />,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%284%29.jpg-Z26vQP95rejo4qWjEucwVwmQ8wRJUU.jpeg",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
            Nossa Infraestrutura
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-4"
          >
            Por Que Escolher o Colégio Privado da Matola?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Oferecemos uma educação completa, com infraestrutura moderna e foco no desenvolvimento integral dos nossos
            alunos, preparando-os para os desafios do século XXI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 rounded-2xl">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg?height=300&width=400"}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 text-base">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
