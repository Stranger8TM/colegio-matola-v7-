"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Lock, ShieldAlert, GraduationCap, ArrowRight, CheckCircle, UserCircle } from "lucide-react"

export default function PainelPage() {
  const router = useRouter()
  const [accessCode, setAccessCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [codeVerified, setCodeVerified] = useState(false)
  const [selectedPanel, setSelectedPanel] = useState<"admin" | "teacher" | "student" | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Limpar qualquer token de autenticação existente ao entrar na página de painel
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken")
      localStorage.removeItem("teacherId")
      localStorage.removeItem("teacherName")
      localStorage.removeItem("studentId")
      localStorage.removeItem("studentName")
    }
  }, [])

  // Se não estiver montado no cliente, não renderize nada que use localStorage
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Em um ambiente real, isso seria uma chamada de API
      // Simulando uma verificação de código
      if (accessCode === "admin123") {
        setCodeVerified(true)
        setSelectedPanel("admin")
      } else if (accessCode === "Gabriel") {
        setCodeVerified(true)
        setSelectedPanel("teacher")
      } else if (accessCode === "aluno123") {
        setCodeVerified(true)
        setSelectedPanel("student")
      } else {
        setError("Código de acesso inválido. Tente novamente.")
      }
    } catch (error) {
      setError("Ocorreu um erro ao verificar o código. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectPanel = (type: "admin" | "teacher" | "student") => {
    setSelectedPanel(type)

    // Simular autenticação
    if (type === "admin") {
      localStorage.setItem("adminToken", "admin-token-123")
      router.push("/admin")
    } else if (type === "teacher") {
      localStorage.setItem("teacherId", "teacher-123")
      localStorage.setItem("teacherName", "Gabriel Vieira")
      router.push("/professores/dashboard")
    } else if (type === "student") {
      localStorage.setItem("studentId", "student-123")
      localStorage.setItem("studentName", "Ana Silva")
      router.push("/portal/dashboard")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          {!codeVerified ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white p-8">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white text-3xl mb-2">Área Restrita</CardTitle>
                  <CardDescription className="text-blue-100 text-lg">
                    Esta área é exclusiva para alunos, professores e administradores
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-yellow-800 dark:text-yellow-300">
                      <p className="text-sm">
                        Para acessar o painel, você precisa inserir o código de acesso fornecido pela administração.
                      </p>
                    </div>

                    <form onSubmit={handleVerifyCode} className="space-y-6">
                      <div>
                        <label
                          htmlFor="accessCode"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Código de Acesso
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            type="password"
                            id="accessCode"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Digite o código de acesso"
                            required
                          />
                        </div>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-800 dark:text-red-300 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-xl text-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Verificando...
                          </>
                        ) : (
                          "Verificar Código"
                        )}
                      </Button>
                    </form>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        Se você é aluno, professor ou administrador e não possui o código de acesso, entre em contato
                        com a administração da escola.
                      </p>
                      <p className="mt-2 text-xs">
                        <strong>Dica:</strong> Use "admin123" para administrador, "Gabriel" para professor ou "aluno123"
                        para aluno.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Acesso Verificado</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Selecione o tipo de painel que deseja acessar
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Card
                    className={`border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden ${
                      selectedPanel === "admin" ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => handleSelectPanel("admin")}
                  >
                    <div className="bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 p-6">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                        <ShieldAlert className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Painel Administrativo</h3>
                      <p className="text-blue-100">Acesso completo ao sistema de gestão escolar</p>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Gerenciamento de alunos e professores
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Controle financeiro e matrículas
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Relatórios e estatísticas
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Configurações do sistema
                        </li>
                      </ul>
                      <Button className="w-full mt-6 bg-blue-800 hover:bg-blue-700">
                        Acessar Painel Administrativo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Card
                    className={`border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden ${
                      selectedPanel === "teacher" ? "ring-2 ring-green-500" : ""
                    }`}
                    onClick={() => handleSelectPanel("teacher")}
                  >
                    <div className="bg-gradient-to-r from-green-700 to-green-600 dark:from-green-800 dark:to-green-700 p-6">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Painel do Professor</h3>
                      <p className="text-green-100">Gerencie suas turmas, materiais e avaliações</p>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Gerenciamento de notas e frequência
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Upload de materiais didáticos
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Comunicação com alunos
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Geração de relatórios de desempenho
                        </li>
                      </ul>
                      <Button className="w-full mt-6 bg-green-700 hover:bg-green-600">
                        Acessar Painel do Professor
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Card
                    className={`border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden ${
                      selectedPanel === "student" ? "ring-2 ring-purple-500" : ""
                    }`}
                    onClick={() => handleSelectPanel("student")}
                  >
                    <div className="bg-gradient-to-r from-purple-700 to-purple-600 dark:from-purple-800 dark:to-purple-700 p-6">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                        <UserCircle className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Portal do Aluno</h3>
                      <p className="text-purple-100">Acesse suas notas, materiais e aulas</p>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Visualização de notas e boletins
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Acesso a materiais didáticos
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Aulas gravadas e exercícios
                        </li>
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Comunicação com professores
                        </li>
                      </ul>
                      <Button className="w-full mt-6 bg-purple-700 hover:bg-purple-600">
                        Acessar Portal do Aluno
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                <p>Desenvolvido por Gabriel Vieira | Versão 2.0.1 | Última atualização: 04/05/2023</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
