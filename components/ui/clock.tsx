"use client"

import { useState, useEffect } from "react"

export function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatTime(time)}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(time)}</div>
    </div>
  )
}
