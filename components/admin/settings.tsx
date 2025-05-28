"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Check, Save, RefreshCw, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Adicionar importação para a função de teste
import { testErrorHandler } from "@/lib/test-error-handler"

export default function SettingsComponent() {
  // Configurações gerais
  const [schoolName, setSchoolName] = useState("Colégio Privado da Matola")
  const [schoolEmail, setSchoolEmail] = useState("info@colegiomatola.co.mz")
  const [schoolPhone, setSchoolPhone] = useState("+258 21 123 456")
  const [schoolAddress, setSchoolAddress] = useState("Av. da Namaacha, Matola, Moçambique")

  // Configurações de aparência
  const [darkMode, setDarkMode] = useState(false)
  const [colorTheme, setColorTheme] = useState("blue")
  const [fontSize, setFontSize] = useState(16)
  const [animations, setAnimations] = useState(true)

  // Configurações de notificações
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  // Configurações de segurança
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [passwordExpiry, setPasswordExpiry] = useState(90)
  const [sessionTimeout, setSessionTimeout] = useState(30)

  // Estado para simular salvamento
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSaveSettings = () => {
    setSaving(true)

    // Simular uma operação de salvamento
    setTimeout(() => {
      setSaving(false)
      setSaveSuccess(true)

      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram atualizadas com sucesso.",
        variant: "default",
      })

      // Resetar o estado de sucesso após alguns segundos
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleResetSettings = () => {
    // Confirmar reset
    if (window.confirm("Tem certeza que deseja restaurar as configurações padrão? Esta ação não pode ser desfeita.")) {
      setSchoolName("Colégio Privado da Matola")
      setSchoolEmail("info@colegiomatola.co.mz")
      setSchoolPhone("+258 21 123 456")
      setSchoolAddress("Av. da Namaacha, Matola, Moçambique")
      setDarkMode(false)
      setColorTheme("blue")
      setFontSize(16)
      setAnimations(true)
      setEmailNotifications(true)
      setSmsNotifications(false)
      setPushNotifications(true)
      setTwoFactorAuth(false)
      setPasswordExpiry(90)
      setSessionTimeout(30)

      toast({
        title: "Configurações restauradas",
        description: "Todas as configurações foram restauradas para os valores padrão.",
        variant: "default",
      })
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Configurações do Sistema</CardTitle>
        <CardDescription>Personalize o funcionamento do sistema escolar</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="school-name">Nome da Escola</Label>
                <Input id="school-name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school-email">Email de Contato</Label>
                <Input
                  id="school-email"
                  type="email"
                  value={schoolEmail}
                  onChange={(e) => setSchoolEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school-phone">Telefone</Label>
                <Input id="school-phone" value={schoolPhone} onChange={(e) => setSchoolPhone(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school-address">Endereço</Label>
                <Input id="school-address" value={schoolAddress} onChange={(e) => setSchoolAddress(e.target.value)} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Modo Escuro</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ativar tema escuro para o painel administrativo
                  </p>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-theme">Tema de Cores</Label>
                <div className="grid grid-cols-4 gap-2">
                  {["blue", "green", "purple", "orange"].map((color) => (
                    <button
                      key={color}
                      className={`h-10 rounded-md border-2 transition-all ${
                        colorTheme === color
                          ? "border-black dark:border-white scale-105"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      style={{
                        backgroundColor:
                          color === "blue"
                            ? "#1e40af"
                            : color === "green"
                              ? "#15803d"
                              : color === "purple"
                                ? "#7e22ce"
                                : "#c2410c",
                      }}
                      onClick={() => setColorTheme(color)}
                      aria-label={`Tema ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Tamanho da Fonte: {fontSize}px</Label>
                </div>
                <Slider
                  id="font-size"
                  min={12}
                  max={20}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Animações</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ativar animações na interface</p>
                </div>
                <Switch id="animations" checked={animations} onCheckedChange={setAnimations} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receber notificações por email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receber notificações por SMS</p>
                </div>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Notificações Push</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receber notificações push no navegador</p>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Aumentar a segurança com verificação adicional
                  </p>
                </div>
                <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-expiry">Expiração de Senha: {passwordExpiry} dias</Label>
                </div>
                <Slider
                  id="password-expiry"
                  min={30}
                  max={180}
                  step={30}
                  value={[passwordExpiry]}
                  onValueChange={(value) => setPasswordExpiry(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="session-timeout">Tempo Limite da Sessão: {sessionTimeout} minutos</Label>
                </div>
                <Slider
                  id="session-timeout"
                  min={5}
                  max={60}
                  step={5}
                  value={[sessionTimeout]}
                  onValueChange={(value) => setSessionTimeout(value[0])}
                />
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Aviso de Segurança</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                      Alterar configurações de segurança pode afetar todos os usuários do sistema. Certifique-se de
                      informar os usuários sobre quaisquer mudanças.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={handleResetSettings} className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Restaurar Padrões
          </Button>

          <Button
            onClick={handleSaveSettings}
            disabled={saving}
            className="bg-blue-800 hover:bg-blue-700 flex items-center"
          >
            {saving ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Salvando...
              </>
            ) : saveSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Salvo!
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </>
            )}
          </Button>
        </div>
        {/* Adicionar um botão de teste no componente de configurações */}
        <Button
          onClick={() => {
            if (typeof window !== "undefined") {
              testErrorHandler()
            }
          }}
          className="mt-4 bg-amber-600 hover:bg-amber-700"
        >
          Testar Sistema de Notificação
        </Button>
      </CardContent>
    </Card>
  )
}
