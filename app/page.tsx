import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section Simples */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Colégio Privado da Matola</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Educação de Excelência desde 2017</p>
            <div className="space-x-4">
              <a
                href="/admissao"
                className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
              >
                Matricule-se Agora
              </a>
              <a
                href="/portal"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                Portal do Aluno
              </a>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Alunos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Professores</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
                <div className="text-gray-600">Anos de Experiência</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Taxa de Aprovação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cursos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Cursos</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Ensino Primário</h3>
                <p className="text-gray-600 mb-4">Base sólida para o desenvolvimento educacional das crianças.</p>
                <a href="/cursos" className="text-blue-600 font-semibold hover:underline">
                  Saiba mais →
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Ensino Secundário</h3>
                <p className="text-gray-600 mb-4">Preparação completa para o ensino superior e mercado de trabalho.</p>
                <a href="/cursos" className="text-blue-600 font-semibold hover:underline">
                  Saiba mais →
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Pré-Universitário</h3>
                <p className="text-gray-600 mb-4">Preparação especializada para ingresso nas universidades.</p>
                <a href="/cursos" className="text-blue-600 font-semibold hover:underline">
                  Saiba mais →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Sobre o Colégio</h2>
              <p className="text-lg text-gray-600 mb-8">
                Localizado na Rua da Mozal, o Colégio Privado da Matola oferece educação de qualidade desde 2017. Nossa
                missão é formar cidadãos preparados para os desafios do futuro, combinando excelência acadêmica com
                valores humanos.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📚</span>
                  </div>
                  <h3 className="font-semibold mb-2">Ensino de Qualidade</h3>
                  <p className="text-gray-600 text-sm">Metodologias modernas e professores qualificados</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🏫</span>
                  </div>
                  <h3 className="font-semibold mb-2">Infraestrutura Moderna</h3>
                  <p className="text-gray-600 text-sm">Laboratórios, biblioteca e espaços esportivos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold mb-2">Foco no Futuro</h3>
                  <p className="text-gray-600 text-sm">Preparação para universidades e mercado de trabalho</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="text-xl mb-8 opacity-90">Faça parte da nossa comunidade educacional</p>
            <a
              href="/contacto"
              className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
            >
              Entre em Contacto
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
