"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GallerySection() {
  const [activeTab, setActiveTab] = useState("all")

  const galleryItems = [
    {
      id: 1,
      image: "/gallery-1.jpg",
      category: "campus",
      title: "Biblioteca Central",
    },
    {
      id: 2,
      image: "/gallery-2.jpg",
      category: "campus",
      title: "Laboratório de Ciências",
    },
    {
      id: 3,
      image: "/gallery-3.jpg",
      category: "eventos",
      title: "Feira de Ciências 2023",
    },
    {
      id: 4,
      image: "/gallery-4.jpg",
      category: "eventos",
      title: "Formatura 2023",
    },
    {
      id: 5,
      image: "/gallery-5.jpg",
      category: "esportes",
      title: "Campeonato de Futebol",
    },
    {
      id: 6,
      image: "/gallery-6.jpg",
      category: "esportes",
      title: "Aula de Educação Física",
    },
    {
      id: 7,
      image: "/gallery-1.jpg",
      category: "xadrez",
      title: "Campeonato de Xadrez",
    },
  ]

  const filteredItems = activeTab === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeTab)

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Galeria de Fotos</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Conheça nossas instalações, eventos e atividades através de nossa galeria de imagens.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-12">
          <TabsList className="grid grid-cols-4 max-w-3xl mx-auto">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")} className="data-[state=active]:bg-primary">
              Todos
            </TabsTrigger>
            <TabsTrigger
              value="campus"
              onClick={() => setActiveTab("campus")}
              className="data-[state=active]:bg-primary"
            >
              Campus
            </TabsTrigger>
            <TabsTrigger
              value="eventos"
              onClick={() => setActiveTab("eventos")}
              className="data-[state=active]:bg-primary"
            >
              Eventos
            </TabsTrigger>
            <TabsTrigger
              value="esportes"
              onClick={() => setActiveTab("esportes")}
              className="data-[state=active]:bg-primary"
            >
              Esportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-300 text-sm capitalize">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campus" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-300 text-sm capitalize">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eventos" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-300 text-sm capitalize">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="esportes" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-300 text-sm capitalize">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default GallerySection
