"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X } from "lucide-react"

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    {
      src: "/gallery-1.jpg",
      alt: "Sala de aula moderna",
      caption: "Nossas salas de aula são equipadas com tecnologia de ponta",
    },
    {
      src: "/gallery-2.jpg",
      alt: "Laboratório de ciências",
      caption: "Laboratório de ciências para aulas práticas",
    },
    {
      src: "/gallery-3.jpg",
      alt: "Biblioteca",
      caption: "Biblioteca com vasto acervo de livros e recursos digitais",
    },
    {
      src: "/gallery-4.jpg",
      alt: "Quadra esportiva",
      caption: "Espaços para atividades físicas e esportes",
    },
    {
      src: "/gallery-5.jpg",
      alt: "Sala de informática",
      caption: "Laboratório de informática com equipamentos modernos",
    },
    {
      src: "/gallery-6.jpg",
      alt: "Área de convivência",
      caption: "Espaços de convivência para momentos de lazer",
    },
  ]

  const openModal = (src: string) => {
    setSelectedImage(src)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

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
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conheça Nossa Estrutura</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Oferecemos instalações modernas e completas para proporcionar a melhor experiência educacional.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              variants={itemVariants}
              onClick={() => openModal(image.src)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent">
                  <p className="font-medium">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Fechar"
          >
            <X size={32} />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Imagem ampliada"
              width={1200}
              height={800}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default GallerySection
