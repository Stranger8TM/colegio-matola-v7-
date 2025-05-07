"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar nosso valor
  // Passe a função de estado inicial para useState para que a lógica seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      // Obter do localStorage pelo key
      const item = window.localStorage.getItem(key)
      // Analisar o item armazenado ou retornar initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Se ocorrer um erro, retorne initialValue
      console.log(error)
      return initialValue
    }
  })

  // Retorna uma versão encapsulada da função setter do useState que ...
  // ... persiste o novo valor no localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que o valor seja uma função para que tenhamos a mesma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Salvar estado
      setStoredValue(valueToStore)
      // Salvar no localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // Uma implementação mais avançada lidaria com o caso de erro
      console.log(error)
    }
  }

  // Sincronizar com localStorage quando a janela estiver disponível
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key && e.newValue) {
          setStoredValue(JSON.parse(e.newValue))
        }
      }

      // Adicionar event listener
      window.addEventListener("storage", handleStorageChange)

      // Remover event listener ao desmontar
      return () => {
        window.removeEventListener("storage", handleStorageChange)
      }
    }
  }, [key])

  return [storedValue, setValue]
}
