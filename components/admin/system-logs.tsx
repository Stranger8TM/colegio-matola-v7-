"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, AlertTriangle, Info, AlertCircle, CheckCircle, X, Filter } from "lucide-react"
import { motion } from "framer-motion"

// Tipos de logs
type LogLevel = "info" | "warning" | "error" | "success"
type LogType = "auth" | "system" | "user" | "admin" | "teacher" | "student"

interface Log {
  id: string
  timestamp: string
  level: LogLevel
  type: LogType
  message: string
  user?: string
  details?: string
  ip?: string
}

// Dados simulados de logs
const generateLogs = (count: number): Log[] => {
  const levels: LogLevel[] = ["info", "warning", "error", "success"]
  const types: LogType[] = ["auth", "system", "user", "admin", "teacher", "student"]
  const authMessages = [
    "Login bem-sucedido",
    "Tentativa de login falhou",
    "Senha redefinida",
    "Conta bloqueada após múltiplas tentativas",
    "Logout realizado",
  ]
  const systemMessages = [
    "Sistema iniciado",
    "Backup automático concluído",
    "Atualização de software disponível",
    "Manutenção programada",
    "Erro de conexão com o banco de dados",
  ]
  const userMessages = [
    "Perfil atualizado",
    "Documento enviado",
    "Nota adicionada",
    "Comentário publicado",
    "Arquivo excluído",
  ]

  const logs: Log[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)]
    const type = types[Math.floor(Math.random() * types.length)]

    let message = ""
    if (type === "auth") {
      message = authMessages[Math.floor(Math.random() * authMessages.length)]
    } else if (type === "system") {
      message = systemMessages[Math.floor(Math.random() * systemMessages.length)]
    } else {
      message = userMessages[Math.floor(Math.random() * userMessages.length)]
    }

    // Gerar timestamp aleatório nas últimas 24 horas
    const timestamp = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000).toISOString()

    // Gerar usuário com base no tipo
    let user = ""
    if (type === "admin") {
      user = "Administrador"
    } else if (type === "teacher") {
      const teachers = ["Prof. Gabriel Matola", "Profa. Maria Joaquim", "Prof. António Mabjaia"]
      user = teachers[Math.floor(Math.random() * teachers.length)]
    } else if (type === "student") {
      const students = ["Ana Silva", "Carlos Mendes", "Beatriz Fonseca", "Daniel Machava"]
      user = students[Math.floor(Math.random() * students.length)]
    }

    logs.push({
      id: `log-${i}`,
      timestamp,
      level,
      type,
      message,
      user,
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      details: level === "error" ? "Detalhes técnicos do erro..." : undefined,
    })
  }

  // Ordenar por timestamp (mais recente primeiro)
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export default function SystemLogsComponent() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLog, setSelectedLog] = useState<Log | null>(null)
  const [activeTab, setActiveTab] = useState<LogType | "all">("all")
  const [levelFilter, setLevelFilter] = useState<LogLevel | "all">("all")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Simular carregamento de logs
    setLoading(true)
    setTimeout(() => {
      setLogs(generateLogs(50))
      setLoading(false)
    }, 1000)
  }, [])

  const filteredLogs = logs.filter((log) => {
    // Filtrar por tipo
    if (activeTab !== "all" && log.type !== activeTab) return false

    // Filtrar por nível
    if (levelFilter !== "all" && log.level !== levelFilter) return false

    // Filtrar por pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        log.message.toLowerCase().includes(query) ||
        (log.user && log.user.toLowerCase().includes(query)) ||
        log.type.toLowerCase().includes(query) ||
        log.level.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleExportLogs = () => {
    // Criar um objeto Blob com os logs filtrados
    const logsJson = JSON.stringify(filteredLogs, null, 2)
    const blob = new Blob([logsJson], { type: "application/json" })

    // Criar um link para download
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `system-logs-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case "info":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800"
          >
            Info
          </Badge>
        )
      case "warning":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800"
          >
            Aviso
          </Badge>
        )
      case "error":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
          >
            Erro
          </Badge>
        )
      case "success":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
          >
            Sucesso
          </Badge>
        )
    }
  }

  const getTypeBadge = (type: LogType) => {
    switch (type) {
      case "auth":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800"
          >
            Autenticação
          </Badge>
        )
      case "system":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600"
          >
            Sistema
          </Badge>
        )
      case "user":
        return (
          <Badge
            variant="outline"
            className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
          >
            Usuário
          </Badge>
        )
      case "admin":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800"
          >
            Admin
          </Badge>
        )
      case "teacher":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
          >
            Professor
          </Badge>
        )
      case "student":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
          >
            Aluno
          </Badge>
        )
    }
  }

  return (
    <Card className="border-0 shadow-lg relative">
      <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
        BETA
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Logs do Sistema</CardTitle>
            <CardDescription>Monitore atividades e eventos do sistema</CardDescription>
          </div>
          <Button onClick={handleExportLogs} variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar Logs
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Pesquisar logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Filtrar por Nível</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value as LogLevel | "all")}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                >
                  <option value="all">Todos os Níveis</option>
                  <option value="info">Info</option>
                  <option value="warning">Aviso</option>
                  <option value="error">Erro</option>
                  <option value="success">Sucesso</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Ordenar por</label>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option value="newest">Mais Recentes</option>
                  <option value="oldest">Mais Antigos</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as LogType | "all")}>
          <TabsList className="grid grid-cols-7 mb-6">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="auth">Autenticação</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="teacher">Professores</TabsTrigger>
            <TabsTrigger value="student">Alunos</TabsTrigger>
            <TabsTrigger value="user">Usuários</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
              </div>
            ) : filteredLogs.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Nível
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Mensagem
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Usuário
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredLogs.map((log) => (
                        <tr
                          key={log.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() => setSelectedLog(log)}
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {getLevelIcon(log.level)}
                              <span className="ml-2 text-sm">{getLevelBadge(log.level)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-sm">{getTypeBadge(log.type)}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{log.message}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {log.user || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedLog && (
                  <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Detalhes do Log</h3>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedLog(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</p>
                        <p className="mt-1">{selectedLog.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</p>
                        <p className="mt-1">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nível</p>
                        <p className="mt-1 flex items-center">
                          {getLevelIcon(selectedLog.level)}
                          <span className="ml-2">{selectedLog.level}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</p>
                        <p className="mt-1">{selectedLog.type}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Mensagem</p>
                        <p className="mt-1">{selectedLog.message}</p>
                      </div>
                      {selectedLog.user && (
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuário</p>
                          <p className="mt-1">{selectedLog.user}</p>
                        </div>
                      )}
                      {selectedLog.ip && (
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Endereço IP</p>
                          <p className="mt-1">{selectedLog.ip}</p>
                        </div>
                      )}
                      {selectedLog.details && (
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Detalhes</p>
                          <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md overflow-x-auto text-xs">
                            {selectedLog.details}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mx-auto w-20 h-20 flex items-center justify-center mb-4">
                  <Info className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhum log encontrado</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery || levelFilter !== "all" || activeTab !== "all"
                    ? "Nenhum log corresponde aos filtros selecionados. Tente outros critérios."
                    : "Não há logs registrados no sistema."}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
