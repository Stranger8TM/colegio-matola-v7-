// Função para testar o sistema de notificação de erros
export function testErrorHandler() {
  if (typeof window === "undefined") return

  // Função para mostrar o popup de manutenção
  const showMaintenancePopup = (message: string, type: "error" | "maintenance" | "info" | "success") => {
    const event = new CustomEvent("maintenanceRequired", {
      detail: {
        message,
        type,
      },
    })

    window.dispatchEvent(event)
  }

  // Testar diferentes tipos de notificações
  const testTypes = [
    {
      type: "error" as const,
      message: "Erro: Não foi possível conectar ao servidor. Tente novamente mais tarde.",
    },
    {
      type: "maintenance" as const,
      message: "Manutenção programada: O sistema estará indisponível das 22h às 00h para atualizações.",
    },
    {
      type: "info" as const,
      message: "Informação: Novas funcionalidades foram adicionadas ao sistema.",
    },
    {
      type: "success" as const,
      message: "Sucesso: Suas alterações foram salvas com sucesso.",
    },
  ]

  // Mostrar cada tipo de notificação com um intervalo
  let index = 0
  const showNext = () => {
    if (index < testTypes.length) {
      const { type, message } = testTypes[index]
      showMaintenancePopup(message, type)
      index++
      setTimeout(showNext, 3000)
    }
  }

  showNext()
}
