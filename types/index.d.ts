import type { Role, AdminType } from "@prisma/client"

declare global {
  interface User {
    id: string
    name: string
    email: string
    image?: string
    role: Role
    adminType?: AdminType
    class?: string
    grade?: string
    subject?: string
  }
}
