import type React from "react"
// Declarações globais para TypeScript

// Extensão da interface Window para incluir variáveis globais
interface Window {
  MAINTENANCE_MODE?: boolean
}

// Declaração para módulos CSS
declare module "*.module.css" {
  const classes: { [key: string]: string }
  export default classes
}

// Declaração para módulos SCSS
declare module "*.module.scss" {
  const classes: { [key: string]: string }
  export default classes
}

// Declaração para arquivos de imagem
declare module "*.png" {
  const content: string
  export default content
}

declare module "*.jpg" {
  const content: string
  export default content
}

declare module "*.jpeg" {
  const content: string
  export default content
}

declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGSVGElement>>
  export default content
}

// Declaração para variáveis de ambiente
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_MAINTENANCE_MODE?: string
    GROQ_API_KEY?: string
    DATABASE_URL?: string
    NEXTAUTH_SECRET?: string
    NEXTAUTH_URL?: string
    BLOB_READ_WRITE_TOKEN?: string
    [key: string]: string | undefined
  }
}
