"use client"

import { useState } from "react"
import { File, ImageIcon, FileText, Video, Music, Package, Trash2, Download, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"

interface FileData {
  id: string
  url: string
  filename: string
  contentType: string
  size: number
  category: string
  description?: string
  type: string
  createdAt: Date
  uploadedBy: {
    name: string
    email: string
  }
}

interface FileListProps {
  files: FileData[]
  onDelete?: (id: string) => void
}

export function FileList({ files, onDelete }: FileListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)

  // Filtrar arquivos
  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.uploadedBy.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType ? file.type === filterType : true

    return matchesSearch && matchesType
  })

  // Função para formatar o tamanho do arquivo
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB"
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB"
  }

  // Função para obter o ícone do tipo de arquivo
  const getFileIcon = (type: string, contentType: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "document":
        return <FileText className="h-5 w-5 text-green-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "audio":
        return <Music className="h-5 w-5 text-purple-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  // Função para lidar com a exclusão de um arquivo
  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este arquivo?")) {
      try {
        const response = await fetch(`/api/files/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Erro ao excluir o arquivo")
        }

        if (onDelete) {
          onDelete(id)
        } else {
          // Recarregar a página se não houver callback
          window.location.reload()
        }
      } catch (error) {
        console.error("Erro ao excluir o arquivo:", error)
        alert("Erro ao excluir o arquivo. Tente novamente.")
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar arquivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {filterType ? filterType.charAt(0).toUpperCase() + filterType.slice(1) : "Todos os tipos"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterType(null)}>Todos os tipos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("image")}>Imagens</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("document")}>Documentos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("video")}>Vídeos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("audio")}>Áudios</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("other")}>Outros</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredFiles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <File className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium">Nenhum arquivo encontrado</p>
          <p className="text-sm">Tente ajustar seus filtros ou fazer upload de novos arquivos.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Enviado por</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-24 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {file.type === "image" ? (
                        <div className="relative h-8 w-8 rounded overflow-hidden">
                          <Image
                            src={file.url || "/placeholder.svg"}
                            alt={file.filename}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        getFileIcon(file.type, file.contentType)
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium truncate max-w-[200px]" title={file.filename}>
                      {file.filename.split("/").pop()}
                    </div>
                    {file.description && (
                      <div className="text-xs text-gray-500 truncate max-w-[200px]" title={file.description}>
                        {file.description}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {file.category}
                    </span>
                  </TableCell>
                  <TableCell>{formatFileSize(file.size)}</TableCell>
                  <TableCell>
                    <div className="truncate max-w-[150px]" title={file.uploadedBy.email}>
                      {file.uploadedBy.name || file.uploadedBy.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(file.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(file.url, "_blank")}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(file.id)}
                        title="Excluir"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
