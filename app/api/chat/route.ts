import { type NextRequest, NextResponse } from "next/server"
import { groqService, type ChatMessage } from "@/lib/groq-service"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "O campo 'messages' deve ser um array" }, { status: 400 })
    }

    // Validar o formato das mensagens
    const validMessages = messages.every(
      (msg: any) =>
        typeof msg === "object" &&
        (msg.role === "user" || msg.role === "assistant" || msg.role === "system" || msg.role === "function") &&
        typeof msg.content === "string",
    )

    if (!validMessages) {
      return NextResponse.json({ error: "Formato de mensagens inválido" }, { status: 400 })
    }

    // Chamar a API do Groq
    const response = await groqService.chat(messages as ChatMessage[])

    // Verificar se há uma chamada de função
    const assistantMessage = response.choices[0].message
    if (assistantMessage.function_call) {
      // Extrair a chamada de função
      const functionCall = {
        name: assistantMessage.function_call.name,
        arguments: JSON.parse(assistantMessage.function_call.arguments),
      }

      // Processar a chamada de função
      const functionResult = await groqService.processFunction(functionCall)

      // Adicionar o resultado da função às mensagens
      const updatedMessages: ChatMessage[] = [
        ...messages,
        assistantMessage,
        {
          role: "function",
          name: functionCall.name,
          content: functionResult,
        },
      ]

      // Obter uma resposta final com base no resultado da função
      const finalResponse = await groqService.chat(updatedMessages)
      return NextResponse.json(finalResponse)
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error("Erro na API de chat:", error)
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 })
  }
}
