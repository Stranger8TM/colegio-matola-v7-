import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/db"

// Função simples para comparar senhas (substitui bcrypt.compare)
async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  // Em produção, você deve usar bcrypt, mas para fins de demonstração
  // estamos usando uma comparação simples
  return plainPassword === hashedPassword
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas")
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.hashedPassword) {
          throw new Error("Usuário não encontrado")
        }

        // Usando nossa função simples em vez de bcrypt
        const isPasswordValid = await comparePasswords(credentials.password, user.hashedPassword)

        if (!isPasswordValid) {
          throw new Error("Senha incorreta")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          adminType: user.adminType,
          image: user.image,
          class: user.class,
          grade: user.grade,
          subject: user.subject,
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role as string
        session.user.adminType = token.adminType as string
        session.user.image = token.picture
        session.user.class = token.class as string
        session.user.grade = token.grade as string
        session.user.subject = token.subject as string
      }
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        adminType: dbUser.adminType,
        picture: dbUser.image,
        class: dbUser.class,
        grade: dbUser.grade,
        subject: dbUser.subject,
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
