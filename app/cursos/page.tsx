import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Award, GraduationCap, Clock } from "lucide-react"
import Link from "next/link"

export default function CursosPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-6">Nossos Cursos</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              O Colégio Privado da Matola oferece uma educação completa, seguindo o currículo nacional de Moçambique com
              excelência e inovação.
            </p>
          </div>

          <Tabs defaultValue="primario" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="primario">Ensino Primário</TabsTrigger>
              <TabsTrigger value="secundario">Ensino Secundário</TabsTrigger>
              <TabsTrigger value="pre-universitario">Pré-Universitário</TabsTrigger>
            </TabsList>

            <TabsContent value="primario" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ensino Primário (1ª a 7ª classe)</CardTitle>
                  <CardDescription>Base sólida para o desenvolvimento integral da criança</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%281%29.jpg-PTHHuwhDkpOT26jn9urVlorMWOY10e.jpeg"
                        alt="Ensino Primário"
                        width={500}
                        height={300}
                        className="rounded-lg object-cover w-full h-64"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-blue-800 dark:text-blue-400 mb-4">
                        Sobre o Ensino Primário
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        No Ensino Primário, focamos no desenvolvimento das habilidades fundamentais de leitura, escrita,
                        matemática e ciências, seguindo o currículo nacional de Moçambique com metodologias inovadoras.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Nossas turmas têm número reduzido de alunos, permitindo um acompanhamento personalizado e
                        atenção às necessidades individuais de cada criança.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <BookOpen className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Disciplinas</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Português</li>
                        <li>• Matemática</li>
                        <li>• Ciências Naturais</li>
                        <li>• Ciências Sociais</li>
                        <li>• Educação Física</li>
                        <li>• Educação Visual</li>
                        <li>• Inglês</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <Clock className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Horários</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Período da Manhã: 7h00 às 12h40</li>
                        <li>• Atividades Extracurriculares: 14h00 às 16h00 (opcional)</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <Users className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Estrutura</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Máximo de 25 alunos por turma</li>
                        <li>• Professores especializados</li>
                        <li>• Salas climatizadas</li>
                        <li>• Biblioteca infantil</li>
                        <li>• Laboratório de informática</li>
                        <li>• Áreas de recreação</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-2">
                      Diferenciais do Nosso Ensino Primário
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Acompanhamento psicopedagógico para identificar e atender necessidades específicas</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Projetos interdisciplinares que estimulam a criatividade e o trabalho em equipe</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Iniciação à informática e tecnologia educacional desde as primeiras classes</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 text-center">
                    <Button asChild className="bg-blue-800 hover:bg-blue-700 text-white">
                      <Link href="/admissao">Processo de Admissão</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="secundario" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ensino Secundário (8ª a 10ª classe)</CardTitle>
                  <CardDescription>Preparação para os desafios acadêmicos e profissionais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%286%29.jpg-AW4dpVszTS6olBGzEDrg7FxM5ffEd1.jpeg"
                        alt="Ensino Secundário"
                        width={500}
                        height={300}
                        className="rounded-lg object-cover w-full h-64"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-blue-800 dark:text-blue-400 mb-4">
                        Sobre o Ensino Secundário
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        No Ensino Secundário, aprofundamos o conhecimento nas diversas áreas do saber, preparando os
                        alunos para os desafios acadêmicos futuros e desenvolvendo o pensamento crítico.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Nosso currículo segue as diretrizes nacionais de Moçambique, com ênfase em atividades práticas
                        em laboratórios e projetos de pesquisa que estimulam a autonomia e o protagonismo dos
                        estudantes.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <BookOpen className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Disciplinas</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Português</li>
                        <li>• Matemática</li>
                        <li>• Física</li>
                        <li>• Química</li>
                        <li>• Biologia</li>
                        <li>• História</li>
                        <li>• Geografia</li>
                        <li>• Inglês</li>
                        <li>• Informática</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <Clock className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Horários</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Período da Tarde: 12h55 às 18h00</li>
                        <li>• Aulas de Laboratório: Conforme cronograma</li>
                        <li>• Atividades Extracurriculares: Conforme cronograma</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <Users className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Estrutura</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Máximo de 30 alunos por turma</li>
                        <li>• Professores especialistas</li>
                        <li>• Laboratórios de Ciências</li>
                        <li>• Laboratório de Informática</li>
                        <li>• Biblioteca</li>
                        <li>• Quadra poliesportiva</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-2">
                      Diferenciais do Nosso Ensino Secundário
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Aulas práticas em laboratórios modernos e bem equipados</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Projetos de iniciação científica com orientação especializada</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Preparação para exames nacionais e competições acadêmicas</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 text-center">
                    <Button asChild className="bg-blue-800 hover:bg-blue-700 text-white">
                      <Link href="/admissao">Processo de Admissão</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pre-universitario" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pré-Universitário (11ª e 12ª classe)</CardTitle>
                  <CardDescription>Preparação intensiva para o ingresso no ensino superior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%285%29.jpg-gz6YswteTIL3LzuoolcX2ipvDOSQgT.jpeg"
                        alt="Pré-Universitário"
                        width={500}
                        height={300}
                        className="rounded-lg object-cover w-full h-64"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-blue-800 dark:text-blue-400 mb-4">
                        Sobre o Pré-Universitário
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        No ciclo Pré-Universitário, preparamos os alunos para os exames de admissão às universidades,
                        com foco no desenvolvimento de competências específicas e aprofundamento dos conteúdos.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Oferecemos orientação vocacional e preparação específica para as áreas de interesse dos alunos,
                        com simulados e materiais complementares.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <BookOpen className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Disciplinas</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Português</li>
                        <li>• Matemática</li>
                        <li>• Física</li>
                        <li>• Química</li>
                        <li>• Biologia</li>
                        <li>• História</li>
                        <li>• Geografia</li>
                        <li>• Inglês</li>
                        <li>• Filosofia</li>
                        <li>• Informática</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <Clock className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Horários</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Período da Tarde: 12h55 às 18h00</li>
                        <li>• Aulas de Reforço: Conforme cronograma</li>
                        <li>• Simulados: Conforme cronograma</li>
                        <li>• Plantões de Dúvidas: Sábados (8h00 às 12h00)</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-3">
                        <GraduationCap className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Preparação</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Material didático específico</li>
                        <li>• Simulados de exames de admissão</li>
                        <li>• Orientação vocacional</li>
                        <li>• Visitas a universidades</li>
                        <li>• Palestras com profissionais</li>
                        <li>• Preparação para bolsas de estudo</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-2">
                      Diferenciais do Nosso Pré-Universitário
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Alto índice de aprovação nas principais universidades de Moçambique</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Programa de mentoria com ex-alunos que estão na universidade</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-800 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>Preparação para bolsas de estudo nacionais e internacionais</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 text-center">
                    <Button asChild className="bg-blue-800 hover:bg-blue-700 text-white">
                      <Link href="/admissao">Processo de Admissão</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-400 mb-8 text-center">
              Atividades Extracurriculares
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Esportes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%287%29.jpg-Do5TcvdtaxKrkLBBQztFcnVIFm52yX.jpeg"
                    alt="Esportes"
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-40 mb-4"
                  />
                  <p className="text-gray-700 dark:text-gray-300">
                    Oferecemos diversas modalidades esportivas como futebol, basquete, vôlei e atletismo, com
                    treinadores especializados.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Artes e Cultura</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%284%29.jpg-Z26vQP95rejo4qWjEucwVwmQ8wRJUU.jpeg"
                    alt="Artes e Cultura"
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-40 mb-4"
                  />
                  <p className="text-gray-700 dark:text-gray-300">
                    Atividades de música, teatro, dança e artes visuais que estimulam a criatividade e valorizam a
                    cultura moçambicana.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ciência e Tecnologia</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nossocolegio%20%283%29.jpg-jvcvYomNVXFSMasZM5TWbAulHGVl8J.jpeg"
                    alt="Ciência e Tecnologia"
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-40 mb-4"
                  />
                  <p className="text-gray-700 dark:text-gray-300">
                    Clubes de robótica, programação e iniciação científica, com participação em feiras e competições
                    nacionais.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
