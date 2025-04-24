# Colégio Privado Matola

Este é o repositório do site do Colégio Privado Matola, uma instituição de ensino moderna e inovadora.

## Configuração do Ambiente

### Pré-requisitos

- Node.js 16 ou superior
- npm ou pnpm
- Banco de dados PostgreSQL (pode ser local ou na nuvem)

### Configuração Inicial

1. Clone o repositório:
   \`\`\`bash
   git clone https://github.com/seu-usuario/colegio-matola.git
   cd colegio-matola
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   # ou
   pnpm install
   \`\`\`

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
   \`\`\`
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/colegio_matola?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="seu-segredo-aqui"
   GOOGLE_CLIENT_ID="seu-client-id-aqui"
   GOOGLE_CLIENT_SECRET="seu-client-secret-aqui"
   \`\`\`

4. Execute o script de configuração automatizado:
   \`\`\`bash
   npm run setup
   \`\`\`

   Este script irá:
   - Gerar o Prisma Client
   - Criar as tabelas no banco de dados
   - Inicializar o banco de dados com dados iniciais

5. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Acesse o site em [http://localhost:3000](http://localhost:3000)

### Credenciais Padrão

- **Administrador**:
  - Email: gabriel@colegiomatola.co.mz
  - Senha: Gabriel123

- **Professor**:
  - Email: gabriel.vieira@colegiomatola.co.mz
  - Senha: Professor123

- **Aluno**:
  - Email: gabriel.silva@aluno.colegiomatola.co.mz
  - Senha: Aluno123

## Configuração no Ambiente Vercel

Se você estiver implantando o projeto na Vercel, siga estas etapas:

1. Configure as variáveis de ambiente no painel da Vercel:
   - DATABASE_URL
   - NEXTAUTH_URL
   - NEXTAUTH_SECRET
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET

2. Após o deploy, acesse o console da Vercel e execute:
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   node scripts/vercel-setup.js
   \`\`\`

## Estrutura do Projeto

- `/app` - Rotas e páginas da aplicação (Next.js App Router)
- `/components` - Componentes React reutilizáveis
- `/lib` - Utilitários e configurações
- `/prisma` - Schema do Prisma e migrações
- `/public` - Arquivos estáticos
- `/scripts` - Scripts de configuração e inicialização

## Tecnologias Utilizadas

- Next.js 13 (App Router)
- React 18
- Prisma ORM
- NextAuth.js
- Tailwind CSS
- Three.js / React Three Fiber
- TypeScript
