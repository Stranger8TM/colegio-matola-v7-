"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User, School } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")

  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Formulário de estudante
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  // Formulário de professor
  const [teacherId, setTeacherId] = useState("")
  const [teacherPassword, setTeacherPassword] = useState("")

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: studentEmail,
        password: studentPassword,
      })

      if (result?.error) {
        console.error("Login error:", result.error)
        setLoading(false)
        return
      }

      router.push("/portal/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setLoading(false)
    }
  }

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aqui precisaríamos de uma rota específica para professores
      // Por enquanto, vamos simular o comportamento anterior
      if (teacherId === "12345678" && teacherPassword === "Gabriel") {
        localStorage.setItem("teacherId", teacherId)
        localStorage.setItem("teacherName", "Gabriel Vieira")
        router.push("/professores/dashboard")
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error("Login error:", error)
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await signIn("google", { callbackUrl })
    } catch (error) {
      console.error("Google login error:", error)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white p-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-blue-900 font-bold text-xl">
                  CPM
                </div>
              </div>
              <CardTitle className="text-white text-2xl">Bem-vindo de volta</CardTitle>
              <CardDescription className="text-blue-100">Faça login para acessar sua conta</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs
                defaultValue="student"
                className="w-full"
                onValueChange={(value) => setUserType(value as "student" | "teacher")}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="student" className="text-base py-3">
                    <User className="mr-2 h-4 w-4" />
                    Aluno
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="text-base py-3">
                    <School className="mr-2 h-4 w-4" />
                    Professor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="student">
                  <form onSubmit={handleStudentLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="student-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="seu.email@exemplo.com"
                          className="pl-10"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="student-password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="student-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha"
                          className="pl-10"
                          value={studentPassword}
                          onChange={(e) => setStudentPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
                        <Link
                          href="/forgot-password"
                          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                          Esqueceu a senha?
                        </Link>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-800 hover:bg-blue-700 text-white py-6 rounded-xl"
                      disabled={loading}
                    >
                      {loading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="teacher">
                  <form onSubmit={handleTeacherLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="teacher-id">ID de Professor</Label>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="teacher-id"
                          type="text"
                          placeholder="Seu ID de professor"
                          className="pl-10"
                          value={teacherId}
                          onChange={(e) => setTeacherId(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="teacher-password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="teacher-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha"
                          className="pl-10"
                          value={teacherPassword}
                          onChange={(e) => setTeacherPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me-teacher"
                          name="remember-me-teacher"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me-teacher"
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Lembrar-me
                        </label>
                      </div>

                      <div className="text-sm">
                        <Link
                          href="/forgot-password"
                          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                          Esqueceu a senha?
                        </Link>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-800 hover:bg-blue-700 text-white py-6 rounded-xl"
                      disabled={loading}
                    >
                      {loading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Ou continue com
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 py-6 rounded-xl"
                    disabled={loading}
                  >
                    <Image src="/google-logo.svg" alt="Google" width={20} height={20} className="mr-2" />
                    Google
                  </Button>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm rounded-lg">
                  {error === "CredentialsSignin" ? "Credenciais inválidas" : "Ocorreu um erro ao fazer login"}
                </div>
              )}

              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>
                  {userType === "student" ? "Aluno novo?" : "Novo professor?"}{" "}
                  <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Fale com a secretaria
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
