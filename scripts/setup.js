const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Cores para o console
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },

  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  },
}

// Função para executar comandos com tratamento de erros
function runCommand(command, description) {
  console.log(`\n${colors.fg.cyan}${colors.bright}► ${description}...${colors.reset}\n`)
  try {
    execSync(command, { stdio: "inherit" })
    console.log(`\n${colors.fg.green}✓ ${description} concluído com sucesso!${colors.reset}\n`)
    return true
  } catch (error) {
    console.error(`\n${colors.fg.red}✗ Erro ao ${description.toLowerCase()}:${colors.reset}\n`)
    console.error(error.message)
    return false
  }
}

// Função para verificar se o arquivo .env.local existe
function checkEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local")
  if (!fs.existsSync(envPath)) {
    console.log(
      `\n${colors.fg.yellow}⚠ Arquivo .env.local não encontrado. Criando um modelo básico...${colors.reset}\n`,
    )

    const envContent = `DATABASE_URL="postgresql://postgres:password@localhost:5432/colegio_matola?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-segredo-aqui"
GOOGLE_CLIENT_ID="seu-client-id-aqui"
GOOGLE_CLIENT_SECRET="seu-client-secret-aqui"
`

    fs.writeFileSync(envPath, envContent)
    console.log(
      `\n${colors.fg.green}✓ Arquivo .env.local criado. Por favor, atualize-o com suas credenciais reais.${colors.reset}\n`,
    )
    return false
  }
  return true
}

// Função principal
async function setup() {
  console.log(`\n${colors.fg.blue}${colors.bright}=== Configuração do Colégio Matola ====${colors.reset}\n`)

  // Verificar o arquivo .env.local
  const envOk = checkEnvFile()
  if (!envOk) {
    console.log(
      `\n${colors.fg.yellow}⚠ Por favor, atualize o arquivo .env.local com suas credenciais e execute este script novamente.${colors.reset}\n`,
    )
    return
  }

  // Instalar dependências
  if (!runCommand("npm install", "Instalando dependências")) return

  // Gerar o Prisma Client
  if (!runCommand("npx prisma generate", "Gerando o Prisma Client")) return

  // Criar as tabelas no banco de dados
  if (!runCommand("npx prisma db push", "Criando as tabelas no banco de dados")) return

  // Inicializar o banco de dados com dados iniciais
  if (!runCommand("node -e \"require('./scripts/init-db-simple.js')\"", "Inicializando o banco de dados")) return

  console.log(`\n${colors.fg.green}${colors.bright}✅ Configuração concluída com sucesso!${colors.reset}\n`)
  console.log(`\n${colors.fg.cyan}Para iniciar o servidor de desenvolvimento, execute:${colors.reset}\n`)
  console.log(`  ${colors.fg.white}npm run dev${colors.reset}\n`)
  console.log(`\n${colors.fg.cyan}Credenciais padrão:${colors.reset}\n`)
  console.log(`  ${colors.fg.white}Admin: gabriel@colegiomatola.co.mz / Gabriel123${colors.reset}`)
  console.log(`  ${colors.fg.white}Professor: gabriel.vieira@colegiomatola.co.mz / Professor123${colors.reset}`)
  console.log(`  ${colors.fg.white}Aluno: gabriel.silva@aluno.colegiomatola.co.mz / Aluno123${colors.reset}\n`)
}

// Executar a função principal
setup().catch((error) => {
  console.error(`\n${colors.fg.red}${colors.bright}Erro fatal durante a configuração:${colors.reset}\n`)
  console.error(error)
  process.exit(1)
})
