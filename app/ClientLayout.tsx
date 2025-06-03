// app/ClientLayout.tsx
"use client"

import type React from "react"

import { IntroAnimationWrapper } from "@/components/intro-animation-wrapper"
import { MaintenancePopup } from "@/components/maintenance-popup"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <IntroAnimationWrapper>{children}</IntroAnimationWrapper>
      <MaintenancePopup />
    </>
  )
}
