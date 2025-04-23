"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
}

export function LogoutButton({ variant = "outline", className }: LogoutButtonProps) {
  return (
    <Button variant={variant} className={className} onClick={() => signOut({ callbackUrl: "/" })}>
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </Button>
  )
}
