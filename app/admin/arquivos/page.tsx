import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { FileUpload } from "@/components/file-upload"
import { FileList } from "@/components/file-list"

export default async function FilesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Verificar se o usuário é um administrador
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    include: { admin: true },
  })

  if (!user?.admin) {
    redirect("/unauthorized")
  }

  // Buscar arquivos do banco de dados
  const files = await prisma.file.findMany({
    include: {
      uploadedBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gerenciamento de Arquivos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FileUpload category="admin" />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Arquivos Enviados</h2>
          <FileList files={files} />
        </div>
      </div>
    </div>
  )
}
