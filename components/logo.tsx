"use client"
import { motion } from "framer-motion"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "white"
  withText?: boolean
  className?: string
}

export function Logo({ size = "md", variant = "default", withText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  }

  const colorClasses = {
    default: "bg-blue-600 text-white",
    white: "bg-white text-blue-600",
  }

  const textColorClasses = {
    default: "text-gray-900",
    white: "text-white",
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} ${colorClasses[variant]} rounded-lg flex items-center justify-center font-bold shadow-lg`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        CPM
      </motion.div>
      {withText && (
        <div className={`${textColorClasses[variant]} font-bold ${textSizeClasses[size]}`}>
          Colégio Privado da Matola
        </div>
      )}
    </div>
  )
}

export default Logo
