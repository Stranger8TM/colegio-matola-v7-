"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { safeLocalStorage } from "@/lib/safe-storage"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // Sempre inicialize com o defaultTheme para evitar problemas no servidor
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Efeito para carregar o tema do localStorage apenas no cliente
  useEffect(() => {
    const storedTheme = safeLocalStorage.getItem(storageKey) as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
    setMounted(true)
  }, [storageKey])

  // Efeito para aplicar o tema ao documento
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      safeLocalStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  // Renderize os filhos imediatamente para evitar problemas de hidratação
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (!context) {
    return {
      theme: "system",
      setTheme: () => console.warn("useTheme must be used within a ThemeProvider"),
    }
  }

  return context
}
