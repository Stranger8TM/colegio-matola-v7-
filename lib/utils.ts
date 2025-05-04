import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata uma data para exibição no formato local
 * @param date Data a ser formatada
 * @param includeTime Se deve incluir o horário
 * @returns String formatada da data
 */
export function formatDate(date: Date | string, includeTime = false): string {
  if (!date) return "Data inválida"

  const dateObj = typeof date === "string" ? new Date(date) : date

  if (isNaN(dateObj.getTime())) return "Data inválida"

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }

  if (includeTime) {
    options.hour = "2-digit"
    options.minute = "2-digit"
  }

  return dateObj.toLocaleDateString("pt-BR", options)
}
