"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MaintenancePopupProps {
  show?: boolean
  message?: string
  type?: "error" | "maintenance" | "info"
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center"
  autoHide?: boolean
  autoHideDelay?: number
}

export function MaintenancePopup({
  show = false,
  message = "Estamos realizando manutenção em nosso site. Alguns recursos podem estar temporariamente indisponíveis.",
  type = "maintenance",
  position = "bottom-right",
  autoHide = false,
  autoHideDelay = 10000,
}: MaintenancePopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [popupMessage, setPopupMessage] = useState(message)
  const [popupType, setPopupType] = useState(type)

  useEffect(() => {
    // Verificar se deve mostrar o popup
    const shouldShow = show || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"

    if (shouldShow) {
      // Pequeno delay para garantir que o popup apareça após o carregamento da página
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }

    // Escutar eventos de manutenção
    const handleMaintenanceEvent = (event: CustomEvent) => {
      const { message, type } = event.detail
      setPopupMessage(message)
      setPopupType(type)
      setIsVisible(true)
    }

    window.addEventListener("maintenanceRequired", handleMaintenanceEvent as EventListener)

    return () => {
      window.removeEventListener("maintenanceRequired", handleMaintenanceEvent as EventListener)
    }
  }, [show, message, type])

  // Auto-esconder o popup após um tempo
  useEffect(() => {
    if (isVisible && autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, autoHideDelay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHide, autoHideDelay])

  if (!isVisible) return null

  const bgColor = {
    error: "bg-red-600",
    maintenance: "bg-amber-600",
    info: "bg-blue-600",
  }[popupType]

  const icon = {
    error: <AlertTriangle className="w-6 h-6 text-white" />,
    maintenance: <Settings className="w-6 h-6 text-white" />,
    info: <Info className="w-6 h-6 text-white" />,
  }[popupType]

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  }[position]

  return (
    <div className={`fixed ${positionClasses} z-50 max-w-md`}>
      <div className={`${bgColor} rounded-lg shadow-lg overflow-hidden animate-fade-in`}>
        <div className="p-4 flex items-start">
          <div className="flex-shrink-0 mr-3">{icon}</div>
          <div className="flex-1">
            <h3 className="text-white font-medium">
              {popupType === "error" ? "Erro" : popupType === "maintenance" ? "Manutenção" : "Informação"}
            </h3>
            <p className="text-white/90 mt-1">{popupMessage}</p>
            <div className="mt-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                Entendi
              </Button>
            </div>
          </div>
          <button onClick={() => setIsVisible(false)} className="flex-shrink-0 ml-2 text-white/80 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
