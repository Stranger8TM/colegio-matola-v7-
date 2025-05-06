import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"

export default function AdmissaoPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-6">
              Processo de Admissão
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Conheça os passos para matricular seu filho no Colégio Privado da Matola e proporcionar a ele uma educação
              de excelência.
            </p>
          </div>

          <Tabs defaultValue="processo" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="processo">Processo</TabsTrigger>
              <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
              <TabsTrigger value="mensalidades">Mensalidades</TabsTrigger>
            </TabsList>

            <TabsContent value="processo" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Etapas do Processo de Admissão</CardTitle>
                  <CardDescription>Siga estas etapas para matricular seu filho em nossa escola</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-bold">
                        1
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400">Agendamento de Visita</h3>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          Entre em contacto conosco para agendar uma visita à escola. Você poderá conhecer nossas
                          instalações e conversar com nossa equipe pedagógica.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-bold">
                        2
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400">
                          Preenchimento do Formulário
                        </h3>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          Preencha o formulário de inscrição com os dados do aluno e dos responsáveis. O formulário pode
                          ser preenchido presencialmente ou online.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-bold">
                        3
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400">Avaliação Diagnóstica</h3>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          O aluno participará de uma avaliação diagnóstica para identificarmos seu nível de conhecimento
                          e necessidades específicas.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-bold">
                        4
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400">Entrevista com os Pais</h3>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          Realizamos uma entrevista com os pais ou responsáveis para conhecer melhor a família e alinhar
                          expectativas.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-bold">
                        5
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400">Matrícula</h3>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          Após a aprovação, você receberá as instruções para finalizar a matrícula, incluindo a lista de
                          documentos necessários e informações sobre pagamento.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Button className="bg-blue-800 hover:bg-blue-900 text-white">Agendar Visita</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requisitos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Necessários</CardTitle>
                  <CardDescription>Documentação exigida para a matrícula</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-3">
                          Documentos do Aluno
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Certidão de nascimento (original e cópia)
                            </span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Cartão de vacinação atualizado (original e cópia)
                            </span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">4 fotografias recentes (3x4)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Histórico escolar (para transferências)
                            </span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Declaração de transferência (para transferências)
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-3">
                          Documentos dos Responsáveis
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Documento de identidade (original e cópia)
                            </span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">NUIT (original e cópia)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Comprovante de residência (original e cópia)
                            </span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">2 fotografias recentes (3x4)</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
                      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-2">
                        Observações Importantes
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• Todos os documentos devem ser apresentados em bom estado de conservação.</li>
                        <li>
                          • A matrícula só será efetivada após a entrega de todos os documentos e pagamento da taxa de
                          matrícula.
                        </li>
                        <li>• O uniforme escolar é obrigatório e pode ser adquirido na secretaria da escola.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mensalidades" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investimento na Educação</CardTitle>
                  <CardDescription>Valores e formas de pagamento para o ano letivo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-50 dark:bg-blue-900/20">
                            <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 dark:text-blue-400 border border-gray-200 dark:border-gray-700">
                              Nível de Ensino
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 dark:text-blue-400 border border-gray-200 dark:border-gray-700">
                              Matrícula
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 dark:text-blue-400 border border-gray-200 dark:border-gray-700">
                              Mensalidade
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 dark:text-blue-400 border border-gray-200 dark:border-gray-700">
                              Material Didático
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              Ensino Primário (1ª a 7ª classe)
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              15.000 MZN
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              8.500 MZN
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              5.000 MZN
                            </td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              Ensino Secundário (8ª a 10ª classe)
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              18.000 MZN
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              10.000 MZN
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              6.000 MZN
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              Pré-Universitário (11ª e 12ª classe)
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              20.000 MZN
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              12.000 MZN
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                              7.000 MZN
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-3">
                          Formas de Pagamento
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>Pagamento mensal: até o dia 10 de cada mês</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>Pagamento trimestral: 5% de desconto</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>Pagamento semestral: 8% de desconto</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>Pagamento anual: 10% de desconto</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-3">
                          Descontos Adicionais
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>
                              Irmãos: 5% de desconto na mensalidade do segundo filho e 10% a partir do terceiro
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>
                              Alunos com excelente desempenho acadêmico: até 15% de desconto (consulte regulamento)
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Nota:</strong> Os valores apresentados são referentes ao ano letivo atual e podem sofrer
                        reajustes. Para mais informações, entre em contacto com nossa secretaria.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
