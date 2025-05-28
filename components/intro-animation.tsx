"use client"

import { useEffect, useState, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Float, Environment, Sparkles } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

function AnimatedLogo() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Rotação suave e contínua
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.2

      // Movimento de flutuação do grupo
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.1

      // Efeito de escala baseado no hover
      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          {/* Logo principal */}
          <boxGeometry args={[2.5, 2.5, 0.3]} />
          <meshStandardMaterial
            color="#EAB308"
            metalness={0.7}
            roughness={0.2}
            emissive="#FCD34D"
            emissiveIntensity={0.1}
          />

          {/* Texto do logo */}
          <Text
            position={[0, 0, 0.2]}
            fontSize={0.9}
            color="#1E3A8A"
            font="/fonts/Inter-Bold.woff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#FFFFFF"
          >
            CPM
          </Text>
        </mesh>

        {/* Elementos decorativos ao redor */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            position={[Math.cos((i / 8) * Math.PI * 2) * 3, Math.sin((i / 8) * Math.PI * 2) * 3, Math.sin(i) * 0.5]}
            castShadow
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#3B82F6"
              metalness={0.8}
              roughness={0.1}
              emissive="#60A5FA"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </Float>

      {/* Partículas brilhantes */}
      <Sparkles count={50} scale={[8, 8, 8]} size={3} speed={0.5} color="#EAB308" />
    </group>
  )
}

function DeveloperCredit() {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.25}
        color="#FFFFFF"
        font="/fonts/Inter-Medium.woff"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
        textAlign="center"
        outlineWidth={0.01}
        outlineColor="#1E3A8A"
      >
        Desenvolvido por Gabriel Vieira
        {"\n"}
        Colégio Privado Matola
      </Text>
    </Float>
  )
}

function CameraController() {
  const { camera } = useThree()

  useFrame((state) => {
    // Movimento suave da câmera
    camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.5
    camera.position.y = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2500)

    const hideTimer = setTimeout(() => {
      setVisible(false)
    }, 3500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="w-full h-full relative">
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 60 }}>
          <CameraController />

          {/* Iluminação melhorada */}
          <ambientLight intensity={0.3} color="#4F46E5" />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow color="#FBBF24" />
          <spotLight position={[-10, -10, 5]} angle={0.2} penumbra={1} intensity={1} color="#3B82F6" />
          <pointLight position={[0, 0, 10]} intensity={0.5} color="#EAB308" />

          <AnimatedLogo />
          <DeveloperCredit />

          {/* Ambiente 3D */}
          <Environment preset="city" />

          {/* Fog para profundidade */}
          <fog attach="fog" args={["#1E3A8A", 8, 20]} />
        </Canvas>

        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}
