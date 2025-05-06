"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, Download, FileText, Calendar, Users } from "lucide-react"

// Componente para exibir quando não há dados
function NoDataState({ message = "Nenhum dado disponível para exibir" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
        <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Sem dados</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">{message}</p>
    </div>
  )
}

export default function ReportsComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedClass, setSelectedClass] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)

  // Dados simulados para os gráficos
  const hasAttendanceData = true
  const hasPerformanceData = true
  const hasFinancialData = false
  const hasEnrollmentData = true

  const handleGenerateReport = (type: string) => {
    setIsGenerating(true)

    // Simular geração de relatório
    setTimeout(() => {
      setIsGenerating(false)

      // Simular download de PDF
      const link = document.createElement("a")
      link.href = "#"
      link.download = `relatorio-${type}-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 2000)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Relatórios</CardTitle>
        <CardDescription>Visualize e exporte relatórios do sistema escolar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Período</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            >
              <option value="week">Semanal</option>
              <option value="month">Mensal</option>
              <option value="trimester">Trimestral</option>
              <option value="semester">Semestral</option>
              <option value="year">Anual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ano</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Turma</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            >
              <option value="all">Todas as Turmas</option>
              <option value="8">8ª Classe</option>
              <option value="9">9ª Classe</option>
              <option value="10">10ª Classe</option>
              <option value="11">11ª Classe</option>
              <option value="12">12ª Classe</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="attendance">
              <Calendar className="h-4 w-4 mr-2" />
              Frequência
            </TabsTrigger>
            <TabsTrigger value="performance">
              <BarChart className="h-4 w-4 mr-2" />
              Desempenho
            </TabsTrigger>
            <TabsTrigger value="financial">
              <LineChart className="h-4 w-4 mr-2" />
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="enrollment">
              <Users className="h-4 w-4 mr-2" />
              Matrículas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-6">
            {hasAttendanceData ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-4">Taxa de Frequência por Turma</h3>
                  <div className="h-64 flex items-center justify-center">
                    {/* Aqui seria renderizado um gráfico real */}
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Visualização do gráfico de frequência
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Faltas por Dia da Semana</h3>
                    <div className="h-48 flex items-center justify-center">
                      {/* Aqui seria renderizado um gráfico real */}
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Visualização do gráfico de faltas</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Tendência de Frequência</h3>
                    <div className="h-48 flex items-center justify-center">
                      {/* Aqui seria renderizado um gráfico real */}
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Visualização do gráfico de tendência
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleGenerateReport("frequencia")}
                    disabled={isGenerating}
                    className="bg-blue-800 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Relatório
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <NoDataState message="Não há dados de frequência disponíveis para o período selecionado." />
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {hasPerformanceData ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-4">Desempenho por Disciplina</h3>
                  <div className="h-64 flex items-center justify-center">
                    {/* Aqui seria renderizado um gráfico real */}
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Visualização do gráfico de desempenho
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Distribuição de Notas</h3>
                    <div className="h-48 flex items-center justify-center">
                      {/* Aqui seria renderizado um gráfico real */}
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Visualização do gráfico de distribuição
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Evolução do Desempenho</h3>
                    <div className="h-48 flex items-center justify-center">
                      {/* Aqui seria renderizado um gráfico real */}
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Visualização do gráfico de evolução
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleGenerateReport("desempenho")}
                    disabled={isGenerating}
                    className="bg-blue-800 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Relatório
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <NoDataState message="Não há dados de desempenho disponíveis para o período selecionado." />
            )}
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            {hasFinancialData ? (
              <div className="space-y-6">{/* Conteúdo para relatórios financeiros */}</div>
            ) : (
              <NoDataState message="Não há dados financeiros disponíveis para o período selecionado. Entre em contato com o departamento financeiro para mais informações." />
            )}
          </TabsContent>

          <TabsContent value="enrollment" className="space-y-6">
            {hasEnrollmentData ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-4">Matrículas por Classe</h3>
                  <div className="h-64 flex items-center justify-center">
                    {/* Aqui seria renderizado um gráfico real */}
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Visualização do gráfico de matrículas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Distribuição por Gênero</h3>
                    <div className="h-48 flex items-center justify-center">
                      {/* Aqui seria renderizado um gráfico real */}
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Visualização do gráfico de distribuição
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Tendência de Matrículas</h3>
                    <div className="h-48 flex items-center justify-center">
                      {/* Aqui seria renderizado um gráfico real */}
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Visualização do gráfico de tendência
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleGenerateReport("matriculas")}
                    disabled={isGenerating}
                    className="bg-blue-800 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Relatório
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <NoDataState message="Não há dados de matrículas disponíveis para o período selecionado." />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
