// Função para detectar erros e mostrar o popup de manutenção
export function setupErrorHandler() {
  if (typeof window === "undefined") return

  // Contador de erros para evitar mostrar o popup para erros isolados
  let errorCount = 0

  // Tempo do último erro para agrupar erros próximos
  let lastErrorTime = 0

  // Função para mostrar o popup de manutenção
  const showMaintenancePopup = (message: string, errorDetails?: string) => {
    // Definir uma variável global para indicar que estamos em modo de manutenção
    window.MAINTENANCE_MODE = true

    // Registrar detalhes do erro no console para depuração
    if (errorDetails) {
      console.error("Detalhes do erro:", errorDetails)
    }

    // Disparar um evento personalizado que o componente MaintenancePopup pode escutar
    const event = new CustomEvent("maintenanceRequired", {
      detail: {
        message,
        type: "error",
      },
    })

    window.dispatchEvent(event)

    // Enviar informações de diagnóstico para o servidor (se necessário)
    try {
      const diagnosticInfo = {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        errorDetails,
      }

      // Comentado para não enviar dados reais sem consentimento
      // fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(diagnosticInfo),
      // })
    } catch (e) {
      // Ignorar erros ao enviar diagnóstico
      console.error("Erro ao enviar diagnóstico:", e)
    }
  }

  // Interceptar erros não tratados
  window.addEventListener("error", (event) => {
    const now = Date.now()
    const errorMessage = event.error?.message || event.message
    const errorStack = event.error?.stack || ""

    // Se o último erro foi há menos de 5 segundos, incrementar o contador
    if (now - lastErrorTime < 5000) {
      errorCount++
    } else {
      // Caso contrário, resetar o contador
      errorCount = 1
    }

    lastErrorTime = now

    // Se tivermos mais de 3 erros em um curto período, mostrar o popup
    if (errorCount >= 3) {
      showMaintenancePopup(
        "Estamos enfrentando algumas dificuldades técnicas. Nossa equipe já foi notificada e está trabalhando para resolver o problema.",
        `${errorMessage}\n${errorStack}`,
      )

      // Evitar que o mesmo erro seja contado várias vezes
      errorCount = 0
    }
  })

  // Interceptar promessas rejeitadas não tratadas
  window.addEventListener("unhandledrejection", (event) => {
    const now = Date.now()
    const reason = event.reason?.toString() || "Promessa rejeitada sem motivo"
    const stack = event.reason?.stack || ""

    if (now - lastErrorTime < 5000) {
      errorCount++
    } else {
      errorCount = 1
    }

    lastErrorTime = now

    if (errorCount >= 3) {
      showMaintenancePopup(
        "Estamos enfrentando algumas dificuldades técnicas. Nossa equipe já foi notificada e está trabalhando para resolver o problema.",
        `${reason}\n${stack}`,
      )
      errorCount = 0
    }
  })

  // Verificar se estamos em modo de manutenção via variável de ambiente
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    console.log("Site em modo de manutenção")
    // O popup será mostrado pelo componente MaintenancePopup
  }
}
