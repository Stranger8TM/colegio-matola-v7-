"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Info, X, CheckCircle } from "lucide-react"

type MaintenancePopupProps = {
  message?: string
  type?: "error" | "maintenance" | "info" | "success"
  position?: "top" | "bottom"
  autoHide?: boolean
  hideAfter?: number // em milissegundos
}

export function MaintenancePopup({
  message = "O site está em manutenção. Algumas funcionalidades podem estar indisponíveis.",
  type = "maintenance",
  position = "top",
  autoHide = false,
  hideAfter = 5000,
}: MaintenancePopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [popupMessage, setPopupMessage] = useState(message)
  const [popupType, setPopupType] = useState(type)

  useEffect(() => {
    // Verificar se estamos em modo de manutenção via variável de ambiente
    if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
      setIsVisible(true)
      setPopupType("maintenance")
      setPopupMessage("O site está em manutenção programada. Algumas funcionalidades podem estar indisponíveis.")
    }

    // Escutar eventos de manutenção
    const handleMaintenanceEvent = (event: CustomEvent) => {
      setIsVisible(true)
      setPopupMessage(event.detail.message || message)
      setPopupType(event.detail.type || type)
    }

    window.addEventListener("maintenanceRequired", handleMaintenanceEvent as EventListener)

    return () => {
      window.removeEventListener("maintenanceRequired", handleMaintenanceEvent as EventListener)
    }
  }, [message, type])

  // Auto-esconder após o tempo especificado
  useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, hideAfter)

      return () => clearTimeout(timer)
    }
  }, [autoHide, hideAfter, isVisible])

  if (!isVisible) return null

  // Definir ícone com base no tipo
  const getIcon = () => {
    switch (popupType) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "maintenance":
        return <Info className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  // Definir cores com base no tipo
  const getColors = () => {
    switch (popupType) {
      case "error":
        return "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200"
      case "maintenance":
        return "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-200"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200"
      case "success":
        return "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200"
    }
  }

  return (
    <div
      className={`fixed ${
        position === "top" ? "top-4" : "bottom-4"
      } left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 maintenance-popup-animation`}
    >
      <div className={`rounded-lg shadow-lg border p-4 flex items-start space-x-3 ${getColors()}`}>
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 pt-0.5">{popupMessage}</div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default MaintenancePopup
