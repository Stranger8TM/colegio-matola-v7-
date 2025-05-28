"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera, Sparkles, Text } from "@react-three/drei"
import type * as THREE from "three"

function AdminDashboard3D({ rotation = [0, 0, 0] }) {
  const modelRef = useRef<THREE.Group>(null!)
  const chartsRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }

    if (chartsRef.current) {
      chartsRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() * 0.8 + index) * 0.1
      })
    }
  })

  return (
    <group ref={modelRef} rotation={rotation as any}>
      {/* Painel principal */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 2.5, 0.2]} />
          <meshStandardMaterial
            color="#1e3a8a"
            metalness={0.7}
            roughness={0.2}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Tela do dashboard */}
        <mesh position={[0, 0, 0.15]} castShadow>
          <boxGeometry args={[3.6, 2.1, 0.05]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Elementos da interface */}
        <group ref={chartsRef}>
          {/* Gráficos de barras animados */}
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[-1.5 + i * 0.6, -0.3, 0.2]} castShadow>
              <boxGeometry args={[0.15, 0.3 + Math.sin(i) * 0.2, 0.05]} />
              <meshStandardMaterial
                color={`hsl(${120 + i * 30}, 70%, 50%)`}
                emissive={`hsl(${120 + i * 30}, 70%, 30%)`}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}

          {/* Indicadores de status */}
          {[...Array(3)].map((_, i) => (
            <mesh key={`status-${i}`} position={[-1 + i * 1, 0.7, 0.2]} castShadow>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={i === 0 ? "#10B981" : i === 1 ? "#F59E0B" : "#EF4444"}
                emissive={i === 0 ? "#059669" : i === 1 ? "#D97706" : "#DC2626"}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>

        {/* Texto do título */}
        <Text
          position={[0, 0.8, 0.2]}
          fontSize={0.2}
          color="#EAB308"
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          ADMIN DASHBOARD
        </Text>
      </Float>

      {/* Elementos flutuantes ao redor */}
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh
            position={[Math.cos((i / 6) * Math.PI * 2) * 3, Math.sin((i / 6) * Math.PI * 2) * 2, Math.sin(i) * 0.5]}
            castShadow
          >
            <octahedronGeometry args={[0.15]} />
            <meshStandardMaterial
              color="#3B82F6"
              metalness={0.8}
              roughness={0.2}
              emissive="#1D4ED8"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Partículas de dados */}
      <Sparkles count={40} scale={[6, 6, 6]} size={2} speed={0.4} color="#EAB308" />
    </group>
  )
}

function DataStream() {
  const streamRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (streamRef.current) {
      streamRef.current.rotation.z = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={streamRef}>
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 20) * Math.PI * 2) * 5,
            Math.sin((i / 20) * Math.PI * 2) * 5,
            Math.sin(i + Date.now() * 0.001) * 2,
          ]}
        >
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial color="#60A5FA" transparent opacity={0.6} emissive="#3B82F6" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

export default function Admin3DBackground() {
  return (
    <div className="fixed inset-0 z-[-1] opacity-15">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 60 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />

        {/* Iluminação melhorada */}
        <ambientLight intensity={0.3} color="#1E40AF" />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow color="#EAB308" />
        <spotLight position={[-10, -10, 5]} angle={0.3} penumbra={1} intensity={1} color="#3B82F6" />
        <pointLight position={[0, 0, 10]} intensity={0.8} color="#10B981" />

        <AdminDashboard3D rotation={[0.1, 0, 0]} />
        <DataStream />

        {/* Ambiente */}
        <Environment preset="city" />

        {/* Fog para profundidade */}
        <fog attach="fog" args={["#1E3A8A", 12, 25]} />
      </Canvas>
    </div>
  )
}
