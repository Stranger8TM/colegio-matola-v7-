"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera, Sparkles, Text, MeshDistortMaterial } from "@react-three/drei"
import { motion } from "framer-motion"
import type * as THREE from "three"

function AdminDashboard3D({ rotation = [0, 0, 0] }) {
  const modelRef = useRef<THREE.Group>(null!)
  const chartsRef = useRef<THREE.Group>(null!)
  const particlesRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }

    if (chartsRef.current) {
      chartsRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() * 0.8 + index) * 0.1
        child.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.4 + index) * 0.1
      })
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  const chartData = useMemo(
    () => [
      { height: 0.8, color: "#10B981", position: [-1.5, -0.3, 0.2] },
      { height: 1.2, color: "#3B82F6", position: [-0.75, -0.3, 0.2] },
      { height: 0.6, color: "#8B5CF6", position: [0, -0.3, 0.2] },
      { height: 1.0, color: "#F59E0B", position: [0.75, -0.3, 0.2] },
      { height: 0.9, color: "#EF4444", position: [1.5, -0.3, 0.2] },
    ],
    [],
  )

  return (
    <group ref={modelRef} rotation={rotation as any}>
      {/* Painel principal com material distorcido */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.5, 3, 0.3]} />
          <MeshDistortMaterial
            color="#1e3a8a"
            metalness={0.8}
            roughness={0.2}
            distort={0.1}
            speed={2}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Tela holográfica */}
        <mesh position={[0, 0, 0.2]} castShadow>
          <boxGeometry args={[4, 2.5, 0.05]} />
          <meshStandardMaterial
            color="#000000"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.8}
            emissive="#0066ff"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Gráficos de barras animados */}
        <group ref={chartsRef}>
          {chartData.map((bar, i) => (
            <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.1}>
              <mesh position={bar.position as any} castShadow>
                <boxGeometry args={[0.2, bar.height, 0.1]} />
                <meshStandardMaterial
                  color={bar.color}
                  emissive={bar.color}
                  emissiveIntensity={0.3}
                  metalness={0.6}
                  roughness={0.3}
                />
              </mesh>
            </Float>
          ))}
        </group>

        {/* Indicadores de status holográficos */}
        {[...Array(4)].map((_, i) => (
          <Float key={`status-${i}`} speed={2 + i * 0.3} rotationIntensity={0.4} floatIntensity={0.2}>
            <mesh position={[-1.5 + i * 1, 1, 0.3]} castShadow>
              <sphereGeometry args={[0.1, 12, 12]} />
              <meshStandardMaterial
                color={i === 0 ? "#10B981" : i === 1 ? "#F59E0B" : i === 2 ? "#3B82F6" : "#EF4444"}
                emissive={i === 0 ? "#059669" : i === 1 ? "#D97706" : i === 2 ? "#1D4ED8" : "#DC2626"}
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
        ))}

        {/* Texto holográfico */}
        <Text
          position={[0, 1.2, 0.3]}
          fontSize={0.25}
          color="#EAB308"
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#1e3a8a"
        >
          ADMIN DASHBOARD
        </Text>

        <Text
          position={[0, 0.8, 0.3]}
          fontSize={0.15}
          color="#60A5FA"
          font="/fonts/Inter-Medium.woff"
          anchorX="center"
          anchorY="middle"
        >
          Colégio Privado da Matola
        </Text>
      </Float>

      {/* Elementos orbitais */}
      {[...Array(8)].map((_, i) => (
        <Float key={`orbital-${i}`} speed={1.8 + i * 0.1} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 4,
              Math.sin((i / 8) * Math.PI * 2) * 3,
              Math.sin(i + Date.now() * 0.001) * 1,
            ]}
            castShadow
          >
            <octahedronGeometry args={[0.2]} />
            <meshStandardMaterial
              color="#3B82F6"
              metalness={0.9}
              roughness={0.1}
              emissive="#1D4ED8"
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}

      {/* Sistema de partículas de dados */}
      <group ref={particlesRef}>
        <Sparkles count={60} scale={[8, 8, 8]} size={3} speed={0.6} color="#EAB308" opacity={0.6} />
        <Sparkles count={40} scale={[6, 6, 6]} size={2} speed={0.4} color="#60A5FA" opacity={0.4} />
      </group>

      {/* Anéis de dados */}
      {[...Array(3)].map((_, i) => (
        <mesh key={`ring-${i}`} position={[0, 0, -2 - i]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3 + i * 0.5, 0.02, 8, 32]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#1D4ED8"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function DataStream() {
  const streamRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (streamRef.current) {
      streamRef.current.rotation.z = state.clock.getElapsedTime() * 0.1
      streamRef.current.children.forEach((child, index) => {
        child.position.z = Math.sin(state.clock.getElapsedTime() * 2 + index) * 2
      })
    }
  })

  return (
    <group ref={streamRef}>
      {[...Array(30)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh
            position={[
              Math.cos((i / 30) * Math.PI * 2) * 6,
              Math.sin((i / 30) * Math.PI * 2) * 6,
              Math.sin(i + Date.now() * 0.002) * 3,
            ]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#60A5FA"
              transparent
              opacity={0.7}
              emissive="#3B82F6"
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function Admin3DBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="fixed inset-0 z-[-1] opacity-20"
    >
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />

        {/* Iluminação cinematográfica */}
        <ambientLight intensity={0.2} color="#1E40AF" />
        <spotLight
          position={[15, 15, 15]}
          angle={0.2}
          penumbra={1}
          intensity={3}
          castShadow
          color="#EAB308"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight position={[-15, -15, 10]} angle={0.3} penumbra={1} intensity={2} color="#3B82F6" castShadow />
        <pointLight position={[0, 0, 15]} intensity={1.5} color="#10B981" />
        <pointLight position={[10, -10, 5]} intensity={1} color="#8B5CF6" />

        <AdminDashboard3D rotation={[0.1, 0, 0]} />
        <DataStream />

        {/* Ambiente HDR */}
        <Environment preset="city" />

        {/* Fog atmosférico */}
        <fog attach="fog" args={["#1E3A8A", 15, 35]} />
      </Canvas>
    </motion.div>
  )
}

export default Admin3DBackground
