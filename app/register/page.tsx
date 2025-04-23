"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User, School } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // Formulário de estudante
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const [studentClass, setStudentClass] = useState("")
  const [studentGrade, setStudentGrade] = useState("")

  // Formulário de professor
  const [teacherName, setTeacherName] = useState("")
  const [teacherEmail, setTeacherEmail] = useState("")
  const [teacherPassword, setTeacherPassword] = useState("")
  const [teacherSubject, setTeacherSubject] = useState("")

  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: studentName,
          email: studentEmail,
          password: studentPassword,
          role: "STUDENT",
          class: studentClass,
          grade: studentGrade,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao registrar")
      }

      // Redirecionar para a página de login
      router.push("/login?registered=true")
    } catch (error) {
      console.error("Erro ao registrar:", error)
      setError(error instanceof Error ? error.message : "Erro ao registrar")
      setLoading(false)
    }
  }

  const handleTeacherRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teacherName,
          email: teacherEmail,
          password: teacherPassword,
          role: "TEACHER",
          subject: teacherSubject,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao registrar")
      }

      // Redirecionar para a página de login
      router.push("/login?registered=true")
    } catch (error) {
      console.error("Erro ao registrar:", error)
      setError(error instanceof Error ? error.message : "Erro ao registrar")
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
              <CardTitle className="text-white text-2xl">Criar uma conta</CardTitle>
              <CardDescription className="text-blue-100">Registre-se para acessar o portal</CardDescription>
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
                  <form onSubmit={handleStudentRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="student-name">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="student-name"
                          type="text"
                          placeholder="Seu nome completo"
                          className="pl-10"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

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
                          placeholder="Crie uma senha"
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="student-class">Classe</Label>
                        <Select value={studentClass} onValueChange={setStudentClass} required>
                          <SelectTrigger id="student-class">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8ª Classe">8ª Classe</SelectItem>
                            <SelectItem value="9ª Classe">9ª Classe</SelectItem>
                            <SelectItem value="10ª Classe">10ª Classe</SelectItem>
                            <SelectItem value="11ª Classe">11ª Classe</SelectItem>
                            <SelectItem value="12ª Classe">12ª Classe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="student-grade">Turma</Label>
                        <Select value={studentGrade} onValueChange={setStudentGrade} required>
                          <SelectTrigger id="student-grade">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-800 hover:bg-blue-700 text-white py-6 rounded-xl"
                      disabled={loading}
                    >
                      {loading ? "Registrando..." : "Registrar"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="teacher">
                  <form onSubmit={handleTeacherRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="teacher-name">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="teacher-name"
                          type="text"
                          placeholder="Seu nome completo"
                          className="pl-10"
                          value={teacherName}
                          onChange={(e) => setTeacherName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="teacher-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="teacher-email"
                          type="email"
                          placeholder="seu.email@exemplo.com"
                          className="pl-10"
                          value={teacherEmail}
                          onChange={(e) => setTeacherEmail(e.target.value)}
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
                          placeholder="Crie uma senha"
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

                    <div>
                      <Label htmlFor="teacher-subject">Disciplina</Label>
                      <Select value={teacherSubject} onValueChange={setTeacherSubject} required>
                        <SelectTrigger id="teacher-subject">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Matemática">Matemática</SelectItem>
                          <SelectItem value="Português">Português</SelectItem>
                          <SelectItem value="Biologia">Biologia</SelectItem>
                          <SelectItem value="Física">Física</SelectItem>
                          <SelectItem value="Química">Química</SelectItem>
                          <SelectItem value="História">História</SelectItem>
                          <SelectItem value="Geografia">Geografia</SelectItem>
                          <SelectItem value="Inglês">Inglês</SelectItem>
                          <SelectItem value="Educação Física">Educação Física</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-800 hover:bg-blue-700 text-white py-6 rounded-xl"
                      disabled={loading}
                    >
                      {loading ? "Registrando..." : "Registrar"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>
                  Já tem uma conta?{" "}
                  <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Faça login
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
