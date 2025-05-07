// Configuração para a integração com o Groq
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

// Modelos disponíveis
export const GROQ_MODELS = {
  LLAMA3_8B: "llama3-8b-8192",
  LLAMA3_70B: "llama3-70b-8192",
  MIXTRAL: "mixtral-8x7b-32768",
  GEMMA: "gemma-7b-it",
} as const

// Modelo padrão
export const DEFAULT_MODEL = GROQ_MODELS.LLAMA3_8B

// Configurações padrão
export const DEFAULT_TEMPERATURE = 0.7
export const DEFAULT_MAX_TOKENS = 1024

// Funções do sistema
export type SystemFunction = {
  name: string
  description: string
  parameters: Record<string, any>
}

// Funções disponíveis para o assistente
export const SYSTEM_FUNCTIONS: SystemFunction[] = [
  {
    name: "search_internet",
    description: "Pesquisa informações na internet sobre um tópico específico",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "A consulta de pesquisa",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "analyze_text",
    description: "Analisa um texto para extrair informações importantes",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "O texto a ser analisado",
        },
        focus: {
          type: "string",
          description: "O foco da análise (ex: 'gramática', 'conteúdo', 'sentimento')",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "think_step_by_step",
    description: "Pensa passo a passo sobre um problema complexo",
    parameters: {
      type: "object",
      properties: {
        problem: {
          type: "string",
          description: "O problema a ser resolvido",
        },
        context: {
          type: "string",
          description: "Contexto adicional sobre o problema",
        },
      },
      required: ["problem"],
    },
  },
]

// Prompt do sistema para o assistente
export const SYSTEM_PROMPT = `Você é o assistente virtual do Colégio Privado da Matola, uma escola de excelência fundada em 2017 em Moçambique.

Seu papel é:
1. Fornecer informações precisas sobre a escola, cursos, professores e atividades
2. Ajudar estudantes com dúvidas acadêmicas
3. Orientar pais e visitantes sobre o processo de admissão e políticas da escola
4. Ser sempre educado, paciente e útil

Quando não souber a resposta, você pode usar a função search_internet para buscar informações.
Para análises de textos ou documentos, use a função analyze_text.
Para problemas complexos, use a função think_step_by_step para mostrar seu raciocínio.

Responda sempre em português, de forma clara e concisa.`
