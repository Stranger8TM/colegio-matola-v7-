"use client"

import { useEffect, useState } from "react"

export function AdminEntranceAnimation() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Logo animado */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 bg-yellow-500 rounded-2xl flex items-center justify-center text-blue-900 font-bold text-3xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
          CPM
        </div>
        <div className="absolute -inset-4 bg-yellow-400 rounded-3xl opacity-20 animate-ping"></div>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold text-white mb-2 text-center">Colégio Privado da Matola</h1>
      <p className="text-xl text-blue-200 mb-8 text-center">Painel Administrativo</p>

      {/* Barra de progresso */}
      <div className="w-80 bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-yellow-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Texto de carregamento */}
      <p className="text-blue-200 text-sm">
        {progress < 30 && "Inicializando sistema..."}
        {progress >= 30 && progress < 60 && "Carregando dados..."}
        {progress >= 60 && progress < 90 && "Preparando interface..."}
        {progress >= 90 && "Quase pronto!"}
      </p>

      {/* Indicadores de carregamento */}
      <div className="flex space-x-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default AdminEntranceAnimation
