"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PainelPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [step, setStep] = useState(1) // 1: código de acesso, 2: escolha do painel
  const [panelType, setPanelType] = useState("professores") // professores ou admin

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      if (code === "Gabriel") {
        setError("")
        setStep(2)
      } else {
        setError("Código de acesso inválido")
      }
    } else {
      // Redirecionar para o painel escolhido
      if (panelType === "professores") {
        router.push("/professores/dashboard")
      } else {
        router.push("/admin")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-6 text-center">
                <Image
                  src="/logo.png"
                  alt="Colégio Privado da Matola"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-white mb-2">
                  {step === 1 ? "Acesso Restrito" : "Escolha o Painel"}
                </h1>
                <p className="text-blue-100 text-sm">
                  {step === 1
                    ? "Digite o código de acesso para continuar"
                    : "Selecione o tipo de painel que deseja acessar"}
                </p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <>
                      <div className="mb-4">
                        <Label htmlFor="code">Código de Acesso</Label>
                        <Input
                          id="code"
                          type="password"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Digite o código de acesso"
                          className="mt-1"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                      </div>

                      <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
                        Verificar
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <RadioGroup value={panelType} onValueChange={setPanelType}>
                          <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="professores" id="professores" />
                            <Label htmlFor="professores" className="cursor-pointer">
                              Painel de Professores
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="admin" id="admin" />
                            <Label htmlFor="admin" className="cursor-pointer">
                              Painel de Administradores
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
                        Acessar
                      </Button>
                    </>
                  )}
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
