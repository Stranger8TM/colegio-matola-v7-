// Função para testar o sistema de notificação de erros
export function testErrorHandler() {
  if (typeof window === "undefined") return

  // Simular múltiplos erros em um curto período
  console.log("Testando o sistema de notificação de erros...")

  // Simular um erro JavaScript
  setTimeout(() => {
    try {
      // @ts-ignore - Erro proposital para teste
      const test = undefined.property
    } catch (e) {
      console.error("Erro simulado 1:", e)
      window.dispatchEvent(new ErrorEvent("error", { error: e }))
    }
  }, 100)

  // Simular uma promessa rejeitada
  setTimeout(() => {
    const promise = new Promise((_, reject) => {
      reject(new Error("Promessa rejeitada para teste"))
    })

    promise.catch((e) => {
      console.error("Erro simulado 2:", e)
      window.dispatchEvent(new ErrorEvent("error", { error: e }))
    })
  }, 200)

  // Simular outro erro JavaScript
  setTimeout(() => {
    try {
      // @ts-ignore - Erro proposital para teste
      const test = [].find.xyz()
    } catch (e) {
      console.error("Erro simulado 3:", e)
      window.dispatchEvent(new ErrorEvent("error", { error: e }))
    }
  }, 300)

  // Mostrar uma mensagem de manutenção diretamente
  setTimeout(() => {
    const event = new CustomEvent("maintenanceRequired", {
      detail: {
        message: "Este é um teste do sistema de notificação. Você pode fechar esta mensagem.",
        type: "info",
      },
    })
    window.dispatchEvent(event)
  }, 5000)
}
