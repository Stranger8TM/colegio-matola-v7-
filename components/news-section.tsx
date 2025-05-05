"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

export function NewsSection() {
  const news = [
    {
      id: 1,
      title: "Alunos do Colégio Matola conquistam medalhas na Olimpíada de Matemática",
      excerpt:
        "Nossos estudantes alcançaram resultados excepcionais na competição nacional, trazendo orgulho para toda a comunidade escolar.",
      date: "15 de Maio, 2023",
      image: "/news-1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Nova biblioteca digital amplia acesso a recursos educacionais",
      excerpt:
        "Investimos em tecnologia para oferecer aos nossos alunos acesso a milhares de livros e materiais de pesquisa de qualidade.",
      date: "3 de Abril, 2023",
      image: "/news-2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Programa de intercâmbio cultural enriquece experiência educacional",
      excerpt:
        "Parceria com escolas internacionais proporciona aos nossos alunos a oportunidade de expandir horizontes e vivenciar novas culturas.",
      date: "22 de Março, 2023",
      image: "/news-3.jpg",
      link: "#",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Últimas Notícias</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Fique por dentro das novidades e conquistas da nossa comunidade escolar.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {news.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="relative h-48 w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link
                  href={item.link}
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Ler mais <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/noticias"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            Ver Todas as Notícias
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
