"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

const newsItems = [
  {
    title: "Alunos do Colégio Privado da Matola conquistam medalhas na Olimpíada de Matemática",
    excerpt: "Nossos estudantes brilharam na competição nacional, trazendo 5 medalhas para a escola.",
    date: "15 de Maio, 2024",
    image: "/news-1.jpg",
    category: "Conquistas",
    url: "#",
  },
  {
    title: "Nova parceria com universidade internacional oferecerá bolsas de estudo",
    excerpt: "Firmamos acordo com universidade portuguesa para oferecer oportunidades exclusivas aos nossos formandos.",
    date: "3 de Maio, 2024",
    image: "/news-2.jpg",
    category: "Parcerias",
    url: "#",
  },
  {
    title: "Feira de Ciências 2024: Inovação e sustentabilidade em destaque",
    excerpt: "Evento anual apresentou projetos impressionantes desenvolvidos pelos alunos de todas as séries.",
    date: "28 de Abril, 2024",
    image: "/news-3.jpg",
    category: "Eventos",
    url: "#",
  },
]

export function NewsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
              Últimas Notícias
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-4"
            >
              Acontece no Colégio
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl"
            >
              Fique por dentro das últimas novidades, eventos e conquistas da nossa comunidade escolar.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <Button variant="outline" className="border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400">
              Ver Todas as Notícias
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-56">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-blue-800 text-white text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.date}
                </div>

                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-3">{item.title}</h3>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{item.excerpt}</p>

                <Link
                  href={item.url}
                  className="inline-flex items-center text-blue-800 dark:text-blue-400 font-medium hover:underline"
                >
                  Ler mais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
