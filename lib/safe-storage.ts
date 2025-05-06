// Implementação segura de localStorage que funciona tanto no servidor quanto no cliente
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") {
      return null
    }
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return null
    }
  },

  setItem: (key: string, value: string): void => {
    if (typeof window === "undefined") {
      return
    }
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error("Error setting localStorage:", error)
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === "undefined") {
      return
    }
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing localStorage item:", error)
    }
  },
}
