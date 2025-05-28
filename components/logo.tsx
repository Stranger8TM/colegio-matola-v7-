"use client"
import Link from "next/link"
import { motion } from "framer-motion"

interface LogoProps {
  variant?: "default" | "white" | "compact"
  size?: "sm" | "md" | "lg"
  withText?: boolean
}

export function Logo({ variant = "default", size = "md", withText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const textColorClasses = {
    default: "text-blue-800 dark:text-blue-400",
    white: "text-white",
    compact: "text-blue-800 dark:text-blue-400",
  }

  return (
    <Link href="/" className="flex items-center">
      <motion.div
        className={`relative ${sizeClasses[size]} bg-yellow-500 rounded-xl flex items-center justify-center text-blue-900 font-bold overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-bold">CPM</span>
      </motion.div>

      {withText && (
        <motion.span
          className={`ml-2 font-bold ${textSizeClasses[size]} ${textColorClasses[variant]}`}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Colégio Privado da Matola
        </motion.span>
      )}
    </Link>
  )
}
