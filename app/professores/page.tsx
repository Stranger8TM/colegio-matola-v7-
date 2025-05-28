import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfessoresPage() {
  // Dados dos professores
  const professores = [
    {
      id: 1,
      nome: "Gabriel Vieira",
      disciplina: "Matemática",
      imagem: "/teacher-gabriel.jpg",
      bio: "Professor de Matemática com 10 anos de experiência. Especialista em ensino de álgebra e geometria.",
    },
    {
      id: 2,
      nome: "Maria Silva",
      disciplina: "Português",
      imagem: "/teacher-maria.jpg",
      bio: "Professora de Português com foco em literatura e redação. Mestre em Letras.",
    },
    {
      id: 3,
      nome: "Carlos Mendes",
      disciplina: "Ciências",
      imagem: "/avatar-3.jpg",
      bio: "Professor de Ciências com especialização em Biologia. Doutor em Ciências Naturais.",
    },
    {
      id: 4,
      nome: "Ana Oliveira",
      disciplina: "História",
      imagem: "/avatar-2.jpg",
      bio: "Professora de História com foco em História Mundial. Mestre em História Contemporânea.",
    },
    {
      id: 5,
      nome: "Pedro Santos",
      disciplina: "Geografia",
      imagem: "/avatar-1.jpg",
      bio: "Professor de Geografia com especialização em Geografia Humana. Mestre em Estudos Ambientais.",
    },
    {
      id: 6,
      nome: "Luísa Costa",
      disciplina: "Inglês",
      imagem: "/avatar-4.jpg",
      bio: "Professora de Inglês com certificação internacional. Experiência em escolas bilíngues.",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nossa Equipe de Professores</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Conheça os profissionais dedicados que fazem parte do Colégio Matola, comprometidos com a excelência acadêmica
          e o desenvolvimento integral dos nossos alunos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professores.map((professor) => (
          <Card key={professor.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64 w-full">
              <Image src={professor.imagem || "/placeholder.svg"} alt={professor.nome} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">{professor.nome}</h3>
              <p className="text-blue-600 font-medium mb-4">{professor.disciplina}</p>
              <p className="text-gray-600 mb-4">{professor.bio}</p>
              <Link href={`/professores/${professor.id}`} className="text-blue-600 font-medium hover:underline">
                Ver perfil completo
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Junte-se à Nossa Equipe</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Estamos sempre à procura de professores talentosos e dedicados para se juntarem à nossa equipe. Se você é
          apaixonado pelo ensino e deseja fazer parte de uma instituição comprometida com a excelência educacional,
          entre em contato conosco.
        </p>
        <Link
          href="/contacto"
          className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Entre em Contato
        </Link>
      </div>
    </div>
  )
}
