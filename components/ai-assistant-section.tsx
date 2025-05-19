"use client"

import type React from "react"
import { useState } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const AIAssistantSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! Como posso ajudar você hoje?" },
  ])
  const [input, setInput] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage: Message = { role: "user", content: input }
      setMessages([...messages, newMessage])
      setInput("")

      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "Eu não tenho certeza sobre isso.",
          "Que pergunta interessante!",
          "Deixe-me pensar sobre isso...",
          "Eu preciso de mais informações.",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const assistantMessage = { role: "assistant", content: randomResponse }
        setMessages([...messages, newMessage, assistantMessage])
      }, 500)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Assistente de IA</h2>
      <div className="space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${message.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}

export default AIAssistantSection
