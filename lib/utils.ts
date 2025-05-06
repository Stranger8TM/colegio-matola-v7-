import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata uma data para exibição
 * @param date Data a ser formatada
 * @param showTime Se deve mostrar o horário
 * @returns String formatada da data
 */
export function formatDate(date: Date, showTime = false): string {
  try {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()

    if (showTime) {
      const hours = date.getHours().toString().padStart(2, "0")
      const minutes = date.getMinutes().toString().padStart(2, "0")
      return `${day}/${month}/${year} ${hours}:${minutes}`
    }

    return `${day}/${month}/${year}`
  } catch (error) {
    console.error("Erro ao formatar data:", error)
    return "Data inválida"
  }
}
