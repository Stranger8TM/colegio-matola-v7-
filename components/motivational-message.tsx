"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Star, Target, Heart } from "lucide-react"

const messages = [
  {
    text: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
    author: "Nelson Mandela",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    color: "from-yellow-400 to-orange-500",
  },
  {
    text: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    author: "Eleanor Roosevelt",
    icon: <Star className="h-6 w-6 text-blue-500" />,
    color: "from-blue-400 to-purple-500",
  },
  {
    text: "Educar não é encher um balde, mas acender um fogo.",
    author: "William Butler Yeats",
    icon: <Target className="h-6 w-6 text-red-500" />,
    color: "from-red-400 to-pink-500",
  },
  {
    text: "A educação é o passaporte para o futuro, pois o amanhã pertence àqueles que se preparam hoje.",
    author: "Malcolm X",
    icon: <Heart className="h-6 w-6 text-green-500" />,
    color: "from-green-400 to-teal-500",
  },
]

export function MotivationalMessage() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
        setIsVisible(true)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const message = messages[currentMessage]

  return (
    <Card className="max-w-2xl mx-auto mb-8 overflow-hidden">
      <CardContent className="p-0">
        <div className={`bg-gradient-to-r ${message.color} p-6 text-white`}>
          <div
            className={`transition-all duration-500 ${isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">{message.icon}</div>
              <div className="flex-1">
                <blockquote className="text-lg font-medium mb-3 leading-relaxed">"{message.text}"</blockquote>
                <cite className="text-sm opacity-90 font-semibold">— {message.author}</cite>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores de progresso */}
        <div className="flex justify-center space-x-2 py-3 bg-gray-50 dark:bg-gray-800">
          {messages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMessage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentMessage ? "bg-blue-500 w-6" : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default MotivationalMessage
