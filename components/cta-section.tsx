"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/pattern.png" alt="Background Pattern" fill className="object-cover opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-emerald-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Pronto para Oferecer o Melhor Futuro para seu Filho?
                </h2>
                <p className="text-xl text-emerald-100 mb-8">
                  Agende uma visita ao nosso campus e descubra como o Colégio Matola pode transformar a jornada
                  educacional do seu filho.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50 transition-colors"
                  >
                    Agendar Visita
                  </Link>
                  <Link
                    href="/admissao"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-emerald-700 transition-colors"
                  >
                    Processo de Admissão
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="relative h-64 lg:h-auto">
              <Image src="/global.jpg" alt="Estudantes do Colégio Matola" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
