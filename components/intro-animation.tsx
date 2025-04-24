"use client"

import { useEffect, useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function Logo() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[2, 2, 0.2]} />
        <meshStandardMaterial color="#EAB308" />
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.8}
          color="#1E3A8A"
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          CPM
        </Text>
      </mesh>
    </Float>
  )
}

function DeveloperText() {
  return (
    <Text
      position={[0, -1.5, 0]}
      fontSize={0.2}
      color="#FFFFFF"
      font="/fonts/Inter-Medium.woff"
      anchorX="center"
      anchorY="middle"
      maxWidth={4}
      textAlign="center"
    >
      Desenvolvido por Gabriel Vieira
    </Text>
  )
}

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000) // 3 segundos

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-blue-900 flex items-center justify-center">
      <div className="w-full h-full">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Logo />
          <DeveloperText />
        </Canvas>
      </div>
    </div>
  )
}
