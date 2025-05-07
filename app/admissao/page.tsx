"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function AdmissaoPage() {
  const [activeTab, setActiveTab] = useState("processo")

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Processo de Admissão</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Saiba como matricular seu filho no Colégio Matola e fazer parte da nossa comunidade educacional de excelência.
        </p>
      </div>

      <Tabs defaultValue="processo" className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="processo">Processo</TabsTrigger>
          <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
          <TabsTrigger value="mensalidades">Mensalidades</TabsTrigger>
        </TabsList>

        <TabsContent value="processo" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Como funciona o processo de admissão</h2>
                  <ol className="space-y-4 list-decimal pl-5">
                    <li className="text-gray-700">
                      <span className="font-medium">Pré-inscrição online:</span> Preencha o formulário de pré-inscrição
                      disponível no nosso site.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Agendamento de visita:</span> Nossa equipe entrará em contato para
                      agendar uma visita à escola.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Avaliação diagnóstica:</span> O aluno realizará uma avaliação
                      diagnóstica de acordo com o ano pretendido.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Entrevista familiar:</span> Realizamos uma entrevista com os pais ou
                      responsáveis e o aluno.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Resultado:</span> O resultado do processo seletivo será comunicado
                      em até 7 dias úteis.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Matrícula:</span> Em caso de aprovação, a família receberá as
                      instruções para efetuar a matrícula.
                    </li>
                  </ol>
                  <div className="mt-6">
                    <Link
                      href="/contacto"
                      className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors inline-block"
                    >
                      Iniciar Pré-inscrição
                    </Link>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image src="/professores.jpg" alt="Processo de admissão" fill className="object-cover" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requisitos" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image src="/curriculo.jpg" alt="Requisitos para admissão" fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Documentos necessários</h2>
                  <ul className="space-y-4 list-disc pl-5">
                    <li className="text-gray-700">
                      <span className="font-medium">Documento de identificação:</span> Cópia do documento de identidade
                      ou certidão de nascimento do aluno.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Documentos dos responsáveis:</span> Cópia do documento de identidade
                      e CPF dos pais ou responsáveis.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Comprovante de residência:</span> Cópia de conta de luz, água ou
                      telefone recente.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Histórico escolar:</span> Documento oficial da escola anterior com
                      notas e frequência.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Declaração de transferência:</span> Para alunos que estão mudando de
                      escola durante o ano letivo.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Foto 3x4:</span> 2 fotos recentes do aluno.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Atestado médico:</span> Informando que o aluno está apto para
                      atividades físicas.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-medium">Carteira de vacinação:</span> Cópia atualizada (para alunos do
                      Ensino Fundamental I).
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mensalidades" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Investimento na Educação do seu Filho</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">Ensino Fundamental I</h3>
                  <p className="text-gray-500 mb-4">1º ao 5º ano</p>
                  <p className="text-3xl font-bold text-blue-600 mb-4">R$ 1.200,00</p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Material didático incluído
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Atividades extracurriculares
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Plataforma digital de aprendizagem
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-6 text-center bg-blue-50 shadow-lg border-blue-200">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    MAIS POPULAR
                  </div>
                  <h3 className="text-xl font-bold mb-2">Ensino Fundamental II</h3>
                  <p className="text-gray-500 mb-4">6º ao 9º ano</p>
                  <p className="text-3xl font-bold text-blue-600 mb-4">R$ 1.500,00</p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Material didático incluído
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Atividades extracurriculares
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Plataforma digital de aprendizagem
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Laboratório de ciências
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">Ensino Médio</h3>
                  <p className="text-gray-500 mb-4">1º ao 3º ano</p>
                  <p className="text-3xl font-bold text-blue-600 mb-4">R$ 1.800,00</p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Material didático incluído
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Atividades extracurriculares
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Plataforma digital de aprendizagem
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Laboratórios completos
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Preparação para vestibular
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Informações adicionais</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Desconto de 10% para pagamento até o dia 5 de cada mês.
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Desconto de 5% para irmãos matriculados.
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Taxa de matrícula: valor de uma mensalidade.
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Possibilidade de parcelamento da taxa de matrícula em até 3x sem juros.
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/contacto"
                  className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors inline-block"
                >
                  Agendar Visita
                </Link>
                <p className="mt-4 text-gray-600">
                  Para mais informações sobre bolsas de estudo e descontos especiais, entre em contato com nossa equipe.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
