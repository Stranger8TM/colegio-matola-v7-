"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfessoresRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/painel")
  }, [router])

  return null
}
