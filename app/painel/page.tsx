"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, ShieldAlert, GraduationCap } from "lucide-react"

export default function PainelPage() {
  const router = useRouter()
  const [accessCode, setAccessCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [codeVerified, setCodeVerified] = useState(false)

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Verificar o código de acesso
    setTimeout(() => {
      if (accessCode === "Gabriel") {
        setCodeVerified(true)
      } else {
        setError("Código de acesso inválido. Tente novamente.")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleSelectPanel = (type: "admin" | "teacher") => {
    if (type === "admin") {
      router.push("/admin")
    } else {
      router.push("/professores/dashboard")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white p-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">Área Restrita</CardTitle>
              <CardDescription className="text-blue-100">
                Esta área é exclusiva para professores e administradores
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {!codeVerified ? (
                <div className="space-y-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-yellow-800 dark:text-yellow-300">
                    <p className="text-sm">
                      Para acessar o painel, você precisa inserir o código de acesso fornecido pela administração.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div>
                      <label
                        htmlFor="accessCode"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Código de Acesso
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
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
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-800 dark:text-red-300 text-sm">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-xl"
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
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-800 dark:text-green-300">
                    <p className="text-sm">
                      Código verificado com sucesso! Selecione o tipo de painel que deseja acessar.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <Button
                      onClick={() => handleSelectPanel("admin")}
                      className="w-full bg-blue-800 hover:bg-blue-700 text-white py-6 rounded-xl flex flex-col items-center justify-center"
                    >
                      <ShieldAlert className="h-8 w-8 mb-2" />
                      <span className="text-lg">Painel de Administradores</span>
                      <span className="text-xs text-blue-200 mt-1">Acesso à gestão completa do sistema</span>
                    </Button>

                    <Button
                      onClick={() => handleSelectPanel("teacher")}
                      className="w-full bg-green-700 hover:bg-green-600 text-white py-6 rounded-xl flex flex-col items-center justify-center"
                    >
                      <GraduationCap className="h-8 w-8 mb-2" />
                      <span className="text-lg">Painel de Professores</span>
                      <span className="text-xs text-green-200 mt-1">Acesso à gestão de turmas e materiais</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
