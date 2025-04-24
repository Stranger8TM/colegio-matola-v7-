"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X } from "lucide-react"

// Categorias da galeria conforme solicitado
const categories = ["Todos", "Nosso Colégio", "Finalistas", "Cultura", "Informática e Tecnologia", "Momentos", "Xadrez"]

// Imagens da galeria organizadas por categoria
const galleryImages = [
  {
    src: "/gallery-1.jpg",
    alt: "Biblioteca do colégio com mesas e estantes de livros",
    category: "Nosso Colégio",
  },
  {
    src: "/gallery-2.jpg",
    alt: "Laboratório de ciências com equipamentos modernos",
    category: "Nosso Colégio",
  },
  {
    src: "/gallery-3.jpg",
    alt: "Sala de informática com computadores",
    category: "Informática e Tecnologia",
  },
  {
    src: "/gallery-4.jpg",
    alt: "Quadra poliesportiva coberta",
    category: "Nosso Colégio",
  },
  {
    src: "/gallery-5.jpg",
    alt: "Apresentação cultural dos alunos",
    category: "Cultura",
  },
  {
    src: "/gallery-6.jpg",
    alt: "Cerimônia de formatura dos finalistas",
    category: "Finalistas",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%283%29.jpg-erNTWXgCr3QsqLWfBleiLrbFdIlybl.jpeg",
    alt: "Menina concentrada jogando xadrez em torneio escolar",
    category: "Xadrez",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%281%29.jpg-G4A4gVrMeCBNslDymsqf5mNXXxUtwo.jpeg",
    alt: "Dois alunos segurando peças grandes de xadrez",
    category: "Xadrez",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%284%29.jpg-btgay9SDBGfuYV2tSpjAMBSlrIENEW.jpeg",
    alt: "Menina de uniforme amarelo jogando xadrez em torneio",
    category: "Xadrez",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%282%29.jpg-cH213qLG5gbHaRMayT8SJpajRApSA3.jpeg",
    alt: "Aluno concentrado analisando jogada de xadrez",
    category: "Xadrez",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%285%29.jpg-ZVI4VCGOlqkGFUzOpJ4N64og44501R.jpeg",
    alt: "Professor orientando alunos durante torneio de xadrez",
    category: "Xadrez",
  },
]

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState("Todos")

  const filteredImages = filter === "Todos" ? galleryImages : galleryImages.filter((img) => img.category === filter)

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
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
            Nossa Galeria
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-4"
          >
            Conheça Nosso Colégio em Imagens
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Explore as instalações, eventos e momentos especiais do Colégio Privado da Matola através da nossa galeria
            de imagens.
          </motion.p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? "bg-blue-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Galeria */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-2xl cursor-pointer group h-64"
              onClick={() => setSelectedImage(index)}
            >
              <div className="h-full w-full relative">
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-blue-800 rounded-full text-xs font-medium mb-2">
                    {image.category}
                  </span>
                  <p className="font-medium">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal de visualização */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="relative max-w-4xl w-full max-h-[80vh]">
              <Image
                src={filteredImages[selectedImage].src || "/placeholder.svg"}
                alt={filteredImages[selectedImage].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-auto mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
                <p className="font-medium text-lg">{filteredImages[selectedImage].alt}</p>
                <p className="text-sm text-gray-300">{filteredImages[selectedImage].category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
