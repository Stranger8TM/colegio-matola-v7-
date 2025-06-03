export const config = {
  app: {
    name: "Colégio Matola",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    customKey: process.env.CUSTOM_KEY,
  },
  database: {
    url: process.env.DATABASE_URL,
    enabled: !!process.env.DATABASE_URL,
  },
  features: {
    chatbot: true,
    animations: true,
    maintenance: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true",
    mockData: !process.env.DATABASE_URL,
  },
  school: {
    name: "Colégio Matola",
    address: "Rua da Mozal, Matola, Moçambique",
    phone: "+258 21 123 456",
    email: "info@colegiomatola.co.mz",
    website: "https://colegiomatola.co.mz",
  },
  developer: {
    name: "Gabriel Vieira",
    website: "https://gabrielvieira.dev",
    year: new Date().getFullYear(),
  },
}

export default config
