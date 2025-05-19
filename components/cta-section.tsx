"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Calendar, Phone } from "lucide-react"
import Image from "next/image"

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background com gradiente e padrão */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-950 dark:to-blue-900">
        <div className="absolute inset-0 opacity-10">
          <Image src="/pattern.png" alt="Background pattern" fill className="object-cover" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-1 rounded-2xl inline-block mb-6">
              <div className="bg-white/10 rounded-xl px-4 py-2 text-white font-medium">Matrículas Abertas 2025</div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Garanta o Futuro do Seu Filho com uma Educação de Excelência
            </h2>

            <p className="text-xl text-blue-100 mb-8">
              No Colégio Privado da Matola, acreditamos que cada aluno tem um potencial único. Nossa missão é
              desenvolver esse potencial através de uma educação completa, que combina excelência acadêmica, valores
              éticos e preparação para os desafios do mundo moderno.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-white text-blue-800 hover:bg-blue-50 rounded-xl py-6 px-8 text-lg"
              >
                <Link href="/admissao">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agende uma Visita
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white/10 rounded-xl py-6 px-8 text-lg"
              >
                <Link href="/contacto">
                  <Phone className="mr-2 h-5 w-5" />
                  Fale Conosco
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-500 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-600 rounded-full"></div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 relative z-10">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-6">
                Processo de Admissão Simplificado
              </h3>

              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Agendamento de Visita",
                    description: "Conheça nossas instalações e converse com nossa equipe pedagógica.",
                  },
                  {
                    step: "02",
                    title: "Avaliação Diagnóstica",
                    description: "Identificamos o nível de conhecimento e necessidades específicas do aluno.",
                  },
                  {
                    step: "03",
                    title: "Entrevista com os Pais",
                    description: "Alinhamos expectativas e conhecemos melhor a família.",
                  },
                  {
                    step: "04",
                    title: "Matrícula",
                    description: "Finalize a matrícula com a documentação necessária.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-800 dark:text-blue-400 font-bold text-lg mr-4">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button asChild className="w-full bg-blue-800 hover:bg-blue-700 text-white rounded-xl py-6">
                  <Link href="/admissao">
                    Iniciar Processo de Admissão
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
