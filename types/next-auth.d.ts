import type { Role, AdminType } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    role: Role
    adminType?: AdminType | null
    class?: string | null
    grade?: string | null
    subject?: string | null
  }

  interface Session {
    user: User & {
      id: string
      role: Role
      adminType?: string | null
      class?: string | null
      grade?: string | null
      subject?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
    adminType?: AdminType | null
    class?: string | null
    grade?: string | null
    subject?: string | null
  }
}
