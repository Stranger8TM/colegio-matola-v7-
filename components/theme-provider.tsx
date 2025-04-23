"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
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
  storageKey = "theme",
  attribute = "data-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    // Aplicar o tema imediatamente ao montar o componente
    const root = window.document.documentElement
    const initialTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme

    if (initialTheme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", initialTheme === "dark")
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove the old attribute if it exists
    root.removeAttribute(attribute)

    // Initialize with the stored or default theme
    const initialTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme
    setTheme(initialTheme)

    // Add the attribute with the current theme
    if (initialTheme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
      root.setAttribute(attribute, systemTheme)
    } else {
      root.classList.toggle("dark", initialTheme === "dark")
      root.setAttribute(attribute, initialTheme)
    }

    // Listen for system theme changes
    if (enableSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => {
        if (theme === "system") {
          const newTheme = mediaQuery.matches ? "dark" : "light"
          root.classList.toggle("dark", newTheme === "dark")
          root.setAttribute(attribute, newTheme)
        }
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [attribute, defaultTheme, enableSystem, storageKey, theme])

  useEffect(() => {
    const root = window.document.documentElement

    // Disable transitions during theme changes if specified
    if (disableTransitionOnChange) {
      root.classList.add("no-transitions")
      window.setTimeout(() => {
        root.classList.remove("no-transitions")
      }, 0)
    }

    // Update the theme in storage and in the DOM
    localStorage.setItem(storageKey, theme)

    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
      root.setAttribute(attribute, systemTheme)
    } else {
      root.classList.toggle("dark", theme === "dark")
      root.setAttribute(attribute, theme)
    }
  }, [theme, attribute, storageKey, disableTransitionOnChange, enableSystem])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
