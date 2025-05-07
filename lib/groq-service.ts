import {
  DEFAULT_MAX_TOKENS,
  DEFAULT_MODEL,
  DEFAULT_TEMPERATURE,
  GROQ_API_URL,
  SYSTEM_FUNCTIONS,
  SYSTEM_PROMPT,
  type SystemFunction,
} from "./groq-config"

// Tipos para a API do Groq
export type ChatMessage = {
  role: "system" | "user" | "assistant" | "function"
  content: string
  name?: string
  function_call?: {
    name: string
    arguments: string
  }
}

export type ChatCompletionRequest = {
  model: string
  messages: ChatMessage[]
  temperature?: number
  max_tokens?: number
  functions?: SystemFunction[]
  function_call?: "auto" | "none" | { name: string }
  stream?: boolean
}

export type FunctionCall = {
  name: string
  arguments: Record<string, any>
}

export type ChatCompletionResponse = {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: ChatMessage
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// Classe para interagir com a API do Groq
export class GroqService {
  private apiKey: string
  private model: string
  private temperature: number
  private maxTokens: number

  constructor(
    apiKey: string = process.env.GROQ_API_KEY || "",
    model: string = DEFAULT_MODEL,
    temperature: number = DEFAULT_TEMPERATURE,
    maxTokens: number = DEFAULT_MAX_TOKENS,
  ) {
    this.apiKey = apiKey
    this.model = model
    this.temperature = temperature
    this.maxTokens = maxTokens
  }

  // Método para enviar uma solicitação de chat para a API do Groq
  async chat(
    messages: ChatMessage[],
    functions: SystemFunction[] = SYSTEM_FUNCTIONS,
    functionCall: "auto" | "none" | { name: string } = "auto",
  ): Promise<ChatCompletionResponse> {
    // Adicionar o prompt do sistema se não estiver presente
    if (!messages.some((msg) => msg.role === "system")) {
      messages = [{ role: "system", content: SYSTEM_PROMPT }, ...messages]
    }

    const requestBody: ChatCompletionRequest = {
      model: this.model,
      messages,
      temperature: this.temperature,
      max_tokens: this.maxTokens,
      functions,
      function_call: functionCall,
    }

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Erro na API do Groq: ${response.status} - ${errorText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erro ao chamar a API do Groq:", error)
      throw error
    }
  }

  // Método para processar uma chamada de função
  async processFunction(functionCall: FunctionCall): Promise<string> {
    const { name, arguments: args } = functionCall

    switch (name) {
      case "search_internet":
        return await this.searchInternet(args.query)
      case "analyze_text":
        return await this.analyzeText(args.text, args.focus)
      case "think_step_by_step":
        return await this.thinkStepByStep(args.problem, args.context)
      default:
        return `Função '${name}' não implementada.`
    }
  }

  // Implementação da função de pesquisa na internet
  private async searchInternet(query: string): Promise<string> {
    try {
      // Aqui você poderia integrar com uma API de pesquisa real como Google Custom Search, Bing, etc.
      // Por enquanto, vamos simular uma resposta baseada em palavras-chave

      // Simulação de pesquisa
      if (
        query.toLowerCase().includes("colégio privado da matola") ||
        query.toLowerCase().includes("colegio privado da matola")
      ) {
        return `Resultados da pesquisa para "${query}":
        
1. Colégio Privado da Matola - Instituição de ensino de excelência fundada em 2017 em Moçambique.
2. Oferece educação desde o ensino primário até o secundário com foco em qualidade e inovação.
3. Localizado na cidade da Matola, província de Maputo, Moçambique.
4. Reconhecido por sua abordagem pedagógica moderna e resultados acadêmicos excepcionais.
5. Site oficial: escolaprivadadamatola.co.mz`
      }

      if (
        query.toLowerCase().includes("educação em moçambique") ||
        query.toLowerCase().includes("educacao em mocambique")
      ) {
        return `Resultados da pesquisa para "${query}":
        
1. O sistema educacional de Moçambique é estruturado em ensino primário (7 anos), secundário (5 anos) e superior.
2. O Ministério da Educação e Desenvolvimento Humano (MINEDH) é responsável pela administração do sistema educacional.
3. Desafios incluem acesso limitado em áreas rurais e necessidade de melhorias na qualidade do ensino.
4. Existem instituições públicas e privadas, com as escolas privadas geralmente oferecendo melhores recursos.
5. A taxa de alfabetização em Moçambique tem melhorado nas últimas décadas, mas ainda enfrenta desafios.`
      }

      // Resposta genérica para outras consultas
      return `Resultados da pesquisa para "${query}":
      
Foram encontrados vários resultados relevantes. As informações indicam que este é um tópico importante no contexto educacional. Recomendo consultar fontes especializadas para obter informações mais detalhadas e atualizadas sobre este assunto.`
    } catch (error) {
      console.error("Erro na função searchInternet:", error)
      return `Não foi possível realizar a pesquisa para "${query}" devido a um erro técnico.`
    }
  }

  // Implementação da função de análise de texto
  private async analyzeText(text: string, focus = "geral"): Promise<string> {
    try {
      // Aqui você poderia usar NLP ou outras técnicas de análise de texto
      // Por enquanto, vamos simular uma análise básica

      const wordCount = text.split(/\s+/).length
      const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length
      const averageWordLength = text.replace(/[^\w]/g, "").length / wordCount

      let analysis = `Análise de texto (${wordCount} palavras, ${sentenceCount} frases):\n\n`

      switch (focus.toLowerCase()) {
        case "gramática":
        case "gramatica":
          analysis += `Análise gramatical:
- O texto contém aproximadamente ${sentenceCount} frases.
- A estrutura das frases parece ${sentenceCount > 5 ? "variada" : "simples"}.
- Recomenda-se revisar a pontuação e concordância verbal.`
          break

        case "conteúdo":
        case "conteudo":
          analysis += `Análise de conteúdo:
- O texto aborda temas relacionados a ${text.includes("educação") ? "educação" : "diversos assuntos"}.
- A profundidade do conteúdo parece ${wordCount > 100 ? "adequada" : "limitada"}.
- Recomenda-se expandir os pontos principais com exemplos ou evidências.`
          break

        case "sentimento":
          const positiveWords = ["bom", "excelente", "ótimo", "maravilhoso", "positivo", "feliz"]
          const negativeWords = ["ruim", "péssimo", "negativo", "triste", "problema", "difícil"]

          let positiveCount = 0
          let negativeCount = 0

          positiveWords.forEach((word) => {
            const regex = new RegExp(`\\b${word}\\b`, "gi")
            const matches = text.match(regex)
            if (matches) positiveCount += matches.length
          })

          negativeWords.forEach((word) => {
            const regex = new RegExp(`\\b${word}\\b`, "gi")
            const matches = text.match(regex)
            if (matches) negativeCount += matches.length
          })

          const sentiment =
            positiveCount > negativeCount ? "positivo" : negativeCount > positiveCount ? "negativo" : "neutro"

          analysis += `Análise de sentimento:
- O texto apresenta um tom predominantemente ${sentiment}.
- Foram identificadas ${positiveCount} palavras positivas e ${negativeCount} palavras negativas.
- A linguagem emocional é ${positiveCount + negativeCount > 5 ? "expressiva" : "contida"}.`
          break

        default:
          analysis += `Análise geral:
- O texto contém ${wordCount} palavras em ${sentenceCount} frases.
- O comprimento médio das palavras é de ${averageWordLength.toFixed(1)} caracteres.
- A complexidade do texto é ${averageWordLength > 5 ? "acima da média" : "média ou abaixo da média"}.
- Recomenda-se revisar o texto para clareza e coesão.`
      }

      return analysis
    } catch (error) {
      console.error("Erro na função analyzeText:", error)
      return `Não foi possível analisar o texto devido a um erro técnico.`
    }
  }

  // Implementação da função de pensamento passo a passo
  private async thinkStepByStep(problem: string, context = ""): Promise<string> {
    try {
      // Aqui você poderia usar a própria IA para gerar um raciocínio passo a passo
      // Por enquanto, vamos simular uma resposta estruturada

      return `Pensando passo a passo sobre: "${problem}"
      
${context ? `Contexto: ${context}\n\n` : ""}

Passo 1: Entendendo o problema
- O problema apresentado é: "${problem}"
- Precisamos identificar os elementos principais e o objetivo final.

Passo 2: Analisando os componentes
- Quais são as variáveis envolvidas?
- Quais são as restrições ou limitações?
- Quais conhecimentos prévios são necessários?

Passo 3: Explorando possíveis abordagens
- Abordagem 1: Aplicar conhecimentos básicos diretamente
- Abordagem 2: Dividir em problemas menores
- Abordagem 3: Buscar analogias com problemas similares

Passo 4: Selecionando a melhor abordagem
- Considerando o contexto e a complexidade, a Abordagem 2 parece mais adequada.

Passo 5: Desenvolvendo a solução
- Dividindo o problema em partes menores...
- Resolvendo cada parte individualmente...
- Integrando as soluções parciais...

Passo 6: Verificando a solução
- A solução atende a todos os requisitos do problema?
- Existem casos especiais ou exceções a considerar?
- A solução é eficiente e prática?

Conclusão:
Após analisar o problema "${problem}" passo a passo, podemos concluir que uma abordagem estruturada e metódica é essencial para sua resolução. Recomendo focar nos elementos fundamentais e construir a solução gradualmente.`
    } catch (error) {
      console.error("Erro na função thinkStepByStep:", error)
      return `Não foi possível analisar o problema "${problem}" devido a um erro técnico.`
    }
  }
}

// Instância padrão do serviço
export const groqService = new GroqService()
