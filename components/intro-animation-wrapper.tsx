"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Importar a animação de forma dinâmica para evitar erros de SSR
const IntroAnimation = dynamic(() => import("@/components/intro-animation"), {
  ssr: false,
})

export function IntroAnimationWrapper() {
  return (
    <Suspense fallback={null}>
      <IntroAnimation />
    </Suspense>
  )
}
