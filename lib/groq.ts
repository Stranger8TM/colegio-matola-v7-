/**
 * Configuração do Groq para o chatbot do Colégio Privado da Matola
 * Desenvolvido por Gabriel Vieira
 */

import { GroqChat } from "groq-sdk"

// Inicializar o cliente Groq
export const groq = new GroqChat({
  apiKey: process.env.GROQ_API_KEY!,
})

// Tipos para as mensagens
export type Role = "user" | "assistant" | "system"

export interface Message {
  role: Role
  content: string
}

// Função para gerar resposta usando o Groq
export async function generateChatResponse(messages: Message[], systemPrompt?: string): Promise<string> {
  try {
    // Adicionar o prompt do sistema se fornecido
    const allMessages = systemPrompt ? [{ role: "system" as const, content: systemPrompt }, ...messages] : messages

    // Chamar a API do Groq
    const completion = await groq.chat.completions.create({
      messages: allMessages,
      model: "llama3-70b-8192", // Usando o modelo Llama 3 70B
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    })

    // Retornar a resposta
    return completion.choices[0]?.message?.content || "Desculpe, não consegui gerar uma resposta."
  } catch (error) {
    console.error("Erro ao gerar resposta com Groq:", error)
    return "Desculpe, ocorreu um erro ao processar sua solicitação."
  }
}

// Prompts do sistema para diferentes contextos
export const SYSTEM_PROMPTS = {
  STUDENT: `Você é o assistente virtual do Colégio Privado da Matola, especializado em ajudar estudantes.
Seja amigável, paciente e educativo. Forneça respostas claras e adaptadas ao nível educacional do aluno.
Você pode ajudar com dúvidas sobre matérias escolares, organização de estudos, e informações sobre a escola.
Não forneça respostas para perguntas inapropriadas ou que violem as políticas da escola.
Desenvolvido por Gabriel Vieira.`,

  TEACHER: `Você é o assistente virtual do Colégio Privado da Matola, especializado em ajudar professores.
Seja profissional, eficiente e útil. Forneça informações sobre metodologias de ensino, gestão de sala de aula, e recursos pedagógicos.
Você pode ajudar com planejamento de aulas, avaliações, e estratégias para engajar os alunos.
Mantenha um tom respeitoso e considere as melhores práticas educacionais em suas respostas.
Desenvolvido por Gabriel Vieira.`,

  ADMIN: `Você é o assistente virtual do Colégio Privado da Matola, especializado em ajudar administradores.
Seja preciso, eficiente e estratégico. Forneça informações sobre gestão escolar, políticas educacionais, e melhores práticas administrativas.
Você pode ajudar com planejamento estratégico, análise de dados, e tomada de decisões baseadas em evidências.
Mantenha um tom profissional e considere as implicações legais e éticas em suas respostas.
Desenvolvido por Gabriel Vieira.`,
}
