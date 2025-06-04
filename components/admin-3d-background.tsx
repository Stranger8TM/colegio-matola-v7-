"use client"

export function Admin3DBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradiente de fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"></div>

      {/* Círculos decorativos */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-green-200 dark:bg-green-800 rounded-full opacity-25 animate-bounce"></div>

      {/* Padrão de pontos */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-blue-500 rounded-full"
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: "pulse 3s infinite",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin3DBackground
