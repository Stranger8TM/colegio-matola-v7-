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
import { Lock, ShieldAlert, GraduationCap, X } from "lucide-react"

export default function PainelPage() {
  const router = useRouter()
  const [accessCode, setAccessCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [codeVerified, setCodeVerified] = useState(false)
  const [selectedPanel, setSelectedPanel] = useState<"admin" | "teacher" | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [adminPasswordError, setAdminPasswordError] = useState("")
  const [isAdminPasswordLoading, setIsAdminPasswordLoading] = useState(false)

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
      if (accessCode === "Gabriel") {
        setShowRoleModal(true)
      } else {
        setError("Código de acesso inválido. Tente novamente.")
      }
    } catch (error) {
      setError("Ocorreu um erro ao verificar o código. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectRole = (role: "teacher" | "admin") => {
    if (role === "teacher") {
      // Se for professor, redirecionar diretamente
      localStorage.setItem("teacherId", "teacher-123")
      localStorage.setItem("teacherName", "Gabriel Vieira")
      router.push("/professores/dashboard")
    } else if (role === "admin") {
      // Se for admin, mostrar modal de senha
      setShowRoleModal(false)
      setShowAdminPasswordModal(true)
    }
  }

  const handleVerifyAdminPassword = () => {
    setIsAdminPasswordLoading(true)
    setAdminPasswordError("")

    // Simulando verificação de senha
    setTimeout(() => {
      if (adminPassword === "Gabriel") {
        localStorage.setItem("adminToken", "admin-token-123")
        router.push("/admin")
      } else {
        setAdminPasswordError("Senha incorreta. Tente novamente.")
      }
      setIsAdminPasswordLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white p-8">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldAlert className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-white text-3xl mb-2">Área Restrita</CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Esta área é exclusiva para professores e administradores
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
                      Se você é professor ou administrador e não possui o código de acesso, entre em contato com a
                      administração da escola.
                    </p>
                    <p className="mt-2 text-xs">
                      <strong>Dica:</strong> Use "Gabriel" para acessar o sistema.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Modal para selecionar o tipo de usuário */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Selecione seu perfil</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowRoleModal(false)} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Olá, Gabriel! Por favor, selecione seu tipo de perfil para continuar:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  className="bg-green-700 hover:bg-green-600 h-auto py-4 flex flex-col items-center"
                  onClick={() => handleSelectRole("teacher")}
                >
                  <GraduationCap className="h-8 w-8 mb-2" />
                  <span className="text-lg">Professor</span>
                </Button>

                <Button
                  className="bg-blue-800 hover:bg-blue-700 h-auto py-4 flex flex-col items-center"
                  onClick={() => handleSelectRole("admin")}
                >
                  <ShieldAlert className="h-8 w-8 mb-2" />
                  <span className="text-lg">Administrador</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal para senha de administrador */}
      {showAdminPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Autenticação de Administrador</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAdminPasswordModal(false)}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-blue-800 dark:text-blue-300">
                <p className="text-sm">Por favor, digite a senha de administrador para continuar.</p>
              </div>

              <div>
                <label
                  htmlFor="adminPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Senha de Administrador
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="password"
                    id="adminPassword"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Digite a senha de administrador"
                    required
                  />
                </div>
              </div>

              {adminPasswordError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-800 dark:text-red-300 text-sm"
                >
                  {adminPasswordError}
                </motion.div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAdminPasswordModal(false)
                    setShowRoleModal(true)
                  }}
                >
                  Voltar
                </Button>
                <Button
                  className="bg-blue-800 hover:bg-blue-700 text-white"
                  onClick={handleVerifyAdminPassword}
                  disabled={isAdminPasswordLoading || !adminPassword}
                >
                  {isAdminPasswordLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verificando...
                    </>
                  ) : (
                    "Entrar como Administrador"
                  )}
                </Button>
              </div>

              <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
                <p>
                  <strong>Dica:</strong> A senha padrão é "Gabriel"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  )
}
