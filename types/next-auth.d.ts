import type { Role, AdminType } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    role: Role
    adminType?: AdminType | null
  }

  interface Session {
    user: User & {
      id: string
      role: Role
      adminType?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
    adminType?: AdminType | null
  }
}
