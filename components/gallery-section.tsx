import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GallerySection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nossa Galeria</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Conheça nossas instalações e atividades através de nossa galeria de fotos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="/gallery-1.jpg"
                  alt="Biblioteca"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Biblioteca Moderna</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Nossa biblioteca conta com mais de 10.000 livros e espaços de estudo.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="/gallery-2.jpg"
                  alt="Laboratório"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Laboratório de Ciências</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Equipamentos modernos para aulas práticas de química, física e biologia.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="/gallery-3.jpg"
                  alt="Sala de Informática"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Sala de Informática</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Computadores de última geração para aulas de informática e programação.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%283%29.jpg-erNTWXgCr3QsqLWfBleiLrbFdIlybl.jpeg"
                  alt="Campeonato de Xadrez"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Campeonato de Xadrez</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Nossos alunos participam de competições de xadrez, desenvolvendo raciocínio lógico e estratégia.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%281%29.jpg-G4A4gVrMeCBNslDymsqf5mNXXxUtwo.jpeg"
                  alt="Peças de Xadrez Gigantes"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Xadrez Gigante</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Atividades lúdicas com peças de xadrez gigantes para estimular o interesse pelo jogo.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%284%29.jpg-btgay9SDBGfuYV2tSpjAMBSlrIENEW.jpeg"
                  alt="Torneio de Xadrez"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Torneio Interclasses</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Competições entre turmas promovem o espírito esportivo e a concentração.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%282%29.jpg-cH213qLG5gbHaRMayT8SJpajRApSA3.jpeg"
                  alt="Alunos jogando xadrez"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Concentração e Estratégia</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  O xadrez ajuda nossos alunos a desenvolverem foco e pensamento estratégico.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xadres%20%285%29.jpg-ZVI4VCGOlqkGFUzOpJ4N64og44501R.jpeg"
                  alt="Professor ensinando xadrez"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Mentoria e Ensino</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Professores dedicados ensinam técnicas avançadas de xadrez para nossos alunos.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src="/gallery-4.jpg"
                  alt="Quadra Esportiva"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">Quadra Poliesportiva</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Espaço para prática de diversos esportes e atividades físicas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mr-2">
            <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          <Button variant="outline">
            Próximo <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
