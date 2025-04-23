"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

export default function PortalPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de autenticação
    // Por enquanto, vamos apenas redirecionar para o dashboard
    window.location.href = "/portal/dashboard"
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
              Portal do Aluno
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400 mb-6">
              Acesse sua conta e acompanhe seu progresso
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              No Portal do Aluno, você tem acesso a notas, materiais de estudo, calendário escolar e ferramentas para
              otimizar seu aprendizado.
            </p>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">Recursos disponíveis:</h2>
              <ul className="space-y-3">
                {[
                  "Acesso às notas e boletins",
                  "Materiais de estudo e exercícios",
                  "Calendário de provas e eventos",
                  "Comunicação com professores",
                  "Ferramentas de estudo (Pomodoro, Flashcards)",
                  "Assistente de estudos com IA",
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
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-blue-900 font-bold text-xl">
                    CPM
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white">Portal do Aluno</h2>
                <p className="text-blue-100 mt-2">Acesse sua conta para ver notas, materiais e ferramentas</p>
              </div>

              <div className="p-8">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Nome de Usuário
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Seu nome de usuário"
                      required
                    />
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Sua senha"
                        required
                      />
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
                    Aluno novo?{" "}
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      Fale com a secretaria
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Acesse também pelo aplicativo móvel</p>
              <div className="flex justify-center space-x-4 mt-3">
                <Image src="/app-store.png" alt="App Store" width={120} height={40} />
                <Image src="/google-play.png" alt="Google Play" width={120} height={40} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
