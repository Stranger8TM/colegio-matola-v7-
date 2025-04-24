# Colégio Privado da Matola - Site Institucional

Este projeto é um site responsivo moderno para o Colégio Privado da Matola, desenvolvido com Next.js e React.

## Como iniciar o projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

### Instalação

1. Crie um novo projeto Next.js:

\`\`\`bash
npx create-next-app@latest colegio-matola
\`\`\`

Selecione as seguintes opções:
- Would you like to use TypeScript? **Yes**
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes**
- Would you like to use `src/` directory? **No**
- Would you like to use App Router? **Yes**
- Would you like to customize the default import alias? **No**

2. Navegue até o diretório do projeto:

\`\`\`bash
cd colegio-matola
\`\`\`

3. Instale as dependências adicionais:

\`\`\`bash
npm install @radix-ui/react-slot class-variance-authority clsx lucide-react tailwind-merge tailwindcss-animate framer-motion next-themes @radix-ui/react-tabs @radix-ui/react-avatar
\`\`\`

4. Copie todos os arquivos do projeto para a pasta correspondente.

5. Inicie o servidor de desenvolvimento:

\`\`\`bash
npm run dev
\`\`\`

6. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

\`\`\`
/colegio-matola
  /app
    /admissao
      page.tsx
    /contacto
      page.tsx
    /cursos
      page.tsx
    /portal
      /dashboard
        page.tsx
      page.tsx
    globals.css
    layout.tsx
    manifest.ts
    page.tsx
  /components
    /ui (componentes padrão shadcn/ui)
    footer.tsx
    hero-section.tsx
    navbar.tsx
    features-section.tsx
    testimonials-section.tsx
    cta-section.tsx
    theme-provider.tsx
  /lib
    db.ts
    utils.ts
  /public
    biblioteca.jpg
    biblioteca1.jpg
    campo.jpg
    galerary1.png
    lab.jpg
    laboratorio.jpg
  tailwind.config.ts
  next.config.js
  package.json
\`\`\`

## Possíveis Problemas e Soluções

### Problema com import de componentes shadcn/ui
Se você encontrar erros relacionados aos componentes da UI, certifique-se de instalar os componentes do shadcn/ui:

\`\`\`bash
npx shadcn@latest init
\`\`\`

E então instale os componentes necessários:

\`\`\`bash
npx shadcn@latest add button card tabs avatar
\`\`\`

### Problema com imagens
Se as imagens não carregarem, verifique se todos os arquivos de imagem estão na pasta `/public`.

## Personalização

- As cores principais do site estão configuradas no arquivo `tailwind.config.ts`
- Os textos podem ser editados diretamente nos componentes
- As imagens podem ser substituídas na pasta `/public` (mantenha os mesmos nomes)
