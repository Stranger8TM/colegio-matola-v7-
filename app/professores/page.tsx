"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { getTeacher } from "@/lib/db"

export default function ProfessoresPage() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Verificar credenciais
    const teacher = getTeacher(id, password)

    if (teacher) {
      // Em um ambiente real, usaríamos cookies/JWT para autenticação
      // Aqui, apenas simulamos com localStorage
      localStorage.setItem("teacherId", teacher.id)
      localStorage.setItem("teacherName", teacher.name)

      // Redirecionar para o dashboard
      router.push("/professores/dashboard")
    } else {
      setError("ID ou senha incorretos. Tente novamente.")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="mb-6 inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
              Área Restrita
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-6">
              Painel de Professores
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Acesse o painel exclusivo para professores do Colégio Privado da Matola. Gerencie materiais didáticos,
              notas, comunicados e muito mais.
            </p>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">Recursos disponíveis:</h2>
              <ul className="space-y-3">
                {[
                  "Gerenciamento de materiais didáticos por turma",
                  "Lançamento e edição de notas e boletins",
                  "Envio de comunicados e avisos aos alunos",
                  "Acompanhamento do desempenho das turmas",
                  "Perfil profissional personalizável",
                  "Sistema seguro e protegido",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5 mr-3">
                      <svg
                        className="w-3 h-3 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 p-8 text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Acesso Seguro</h2>
                <p className="text-blue-100 mt-2">Entre com seu ID e senha de professor</p>
              </div>

              <div className="p-8">
                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ID de Professor
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="id"
                        name="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite seu ID"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Sua senha"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Lembrar-me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        Esqueceu a senha?
                      </a>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 text-white py-6 rounded-xl">
                      Entrar
                    </Button>
                  </div>
                </form>

                <div className="mt-6">
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Problemas com o acesso?{" "}
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      Contacte o suporte
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Sistema protegido com criptografia avançada</p>
              <div className="flex justify-center space-x-4 mt-3">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Lock className="h-4 w-4 mr-1" />
                  <span className="text-xs">Conexão Segura</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Shield className="h-4 w-4 mr-1" />
                  <span className="text-xs">Dados Protegidos</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
