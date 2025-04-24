import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Tentar conectar ao banco de dados
    await prisma.$connect()
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso!")

    // Verificar se as tabelas existem
    const tables = [
      "User",
      "Account",
      "Session",
      "VerificationToken",
      "Material",
      "Task",
      "Notification",
      "Grade",
      "Class",
      "StudentClass",
      "Discipline",
      "Schedule",
      "Exam",
      "FinancialRecord",
      "SystemLog",
    ]

    for (const table of tables) {
      try {
        // @ts-ignore - Verificação dinâmica de tabelas
        const count = await prisma[table.toLowerCase()].count()
        console.log(`✅ Tabela ${table}: ${count} registros`)
      } catch (error) {
        console.error(`❌ Erro ao verificar tabela ${table}:`, error)
      }
    }

    // Verificar se o usuário admin existe
    const adminUser = await prisma.user.findUnique({
      where: {
        email: "gabriel@colegiomatola.co.mz",
      },
    })

    if (adminUser) {
      console.log("✅ Usuário administrador encontrado:", adminUser.name)
    } else {
      console.error("❌ Usuário administrador não encontrado!")
    }

    console.log("\n✅ Verificação concluída!")
  } catch (error) {
    console.error("❌ Erro durante a verificação:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
