"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X } from "lucide-react"

// Categorias da galeria conforme solicitado
const categories = ["Nosso Colégio", "Finalistas", "Cultura", "Informática e Tecnologia", "Momentos"]

// Imagens da galeria organizadas por categoria
const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%2810%29.jpg-92ZvRMQZT3rb6QK76LnvEqocA6w6rj.jpeg",
    alt: "Refeitório do colégio com mesas e bancos laranja",
    category: "Nosso Colégio",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%281%29.jpg-PTHHuwhDkpOT26jn9urVlorMWOY10e.jpeg",
    alt: "Berçário com camas infantis e decoração colorida",
    category: "Nosso Colégio",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%289%29.jpg-tfmWkgoC22VUlUavCXPtNI07cKWrOe.jpeg",
    alt: "Sala de descanso infantil com decoração de árvore",
    category: "Nosso Colégio",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%284%29.jpg-Z26vQP95rejo4qWjEucwVwmQ8wRJUU.jpeg",
    alt: "Corredor com quadros de pontos turísticos mundiais",
    category: "Cultura",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%286%29.jpg-AW4dpVszTS6olBGzEDrg7FxM5ffEd1.jpeg",
    alt: "Biblioteca com mesas e estantes de livros",
    category: "Nosso Colégio",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%285%29.jpg-gz6YswteTIL3LzuoolcX2ipvDOSQgT.jpeg",
    alt: "Sala de estudos com mesas e cadeiras verdes",
    category: "Nosso Colégio",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%287%29.jpg-Do5TcvdtaxKrkLBBQztFcnVIFm52yX.jpeg",
    alt: "Ginásio poliesportivo coberto",
    category: "Nosso Colégio",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%288%29.jpg-uQD4AZdCnCAhb8JvGg9C4kFeIrhSRZ.jpeg",
    alt: "Cesta de basquete no ginásio",
    category: "Nosso Colégio",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%283%29.jpg-jvcvYomNVXFSMasZM5TWbAulHGVl8J.jpeg",
    alt: "Laboratório de ciências com banquetas e equipamentos",
    category: "Informática e Tecnologia",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%282%29.jpg-tK9dPECcPaWVM7NlHSzglUJMgnTOMt.jpeg",
    alt: "Modelo anatômico de olho no laboratório",
    category: "Informática e Tecnologia",
  },
  {
    src: "/gallery-finalistas-1.jpg",
    alt: "Cerimônia de formatura dos finalistas",
    category: "Finalistas",
  },
  {
    src: "/gallery-finalistas-2.jpg",
    alt: "Alunos finalistas com diplomas",
    category: "Finalistas",
  },
  {
    src: "/gallery-cultura-1.jpg",
    alt: "Apresentação cultural dos alunos",
    category: "Cultura",
  },
  {
    src: "/gallery-cultura-2.jpg",
    alt: "Festival cultural da escola",
    category: "Cultura",
  },
  {
    src: "/gallery-informatica-1.jpg",
    alt: "Laboratório de informática",
    category: "Informática e Tecnologia",
  },
  {
    src: "/gallery-momentos-1.jpg",
    alt: "Celebração do Dia da Criança",
    category: "Momentos",
  },
  {
    src: "/gallery-momentos-2.jpg",
    alt: "Atividade ao ar livre com alunos",
    category: "Momentos",
  },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState("Nosso Colégio")

  const filteredImages = filter === "Todos" ? galleryImages : galleryImages.filter((img) => img.category === filter)

  return (
    <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-blue-800 text-white shadow-lg"
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
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                z: 50,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="relative overflow-hidden rounded-2xl cursor-pointer group h-64"
              onClick={() => setSelectedImage(index)}
            >
              <div className="h-full w-full relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[80vh]"
            >
              <Image
                src={filteredImages[selectedImage].src || "/placeholder.svg"}
                alt={filteredImages[selectedImage].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-auto mx-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white rounded-b-lg">
                <p className="font-medium text-lg">{filteredImages[selectedImage].alt}</p>
                <p className="text-sm text-gray-300">{filteredImages[selectedImage].category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Exportação padrão para compatibilidade
export default GallerySection
