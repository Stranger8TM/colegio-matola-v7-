"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth({ required = true, redirectTo = "/login" } = {}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const loading = status === "loading"
  const authenticated = status === "authenticated"
  const user = session?.user

  useEffect(() => {
    if (loading) return

    if (required && !authenticated) {
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.href)}`)
    }
  }, [loading, authenticated, required, redirectTo, router])

  return { user, loading, authenticated }
}
