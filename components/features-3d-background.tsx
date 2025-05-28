"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, PerspectiveCamera, Environment } from "@react-three/drei"
import type * as THREE from "three"

function FeatureIcon({
  position,
  color,
  geometry,
}: {
  position: [number, number, number]
  color: string
  geometry: "book" | "globe" | "users" | "award"
}) {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
      meshRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  const renderGeometry = () => {
    switch (geometry) {
      case "book":
        return (
          <group>
            <mesh castShadow>
              <boxGeometry args={[0.8, 1, 0.1]} />
              <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.06]} castShadow>
              <boxGeometry args={[0.6, 0.8, 0.02]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          </group>
        )
      case "globe":
        return (
          <mesh castShadow>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.1}
            />
          </mesh>
        )
      case "users":
        return (
          <group>
            {[...Array(3)].map((_, i) => (
              <mesh key={i} position={[(i - 1) * 0.3, 0, 0]} castShadow>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color={color} />
              </mesh>
            ))}
          </group>
        )
      case "award":
        return (
          <group>
            <mesh castShadow>
              <cylinderGeometry args={[0.4, 0.4, 0.1, 8]} />
              <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0.06]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.02, 6]} />
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
            </mesh>
          </group>
        )
      default:
        return (
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={0.8}>
        {renderGeometry()}
      </group>
    </Float>
  )
}

function ConnectingLines() {
  const linesRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group ref={linesRef}>
      {/* Linhas conectando os ícones */}
      <mesh position={[0, 0, -2]}>
        <cylinderGeometry args={[0.01, 0.01, 8, 8]} />
        <meshStandardMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, -2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 8, 8]} />
        <meshStandardMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

export default function Features3DBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-20">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 60 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />

        {/* Iluminação */}
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#EAB308" />

        {/* Ícones 3D das features */}
        <FeatureIcon position={[-3, 2, 0]} color="#EAB308" geometry="book" />
        <FeatureIcon position={[3, 2, 0]} color="#10B981" geometry="globe" />
        <FeatureIcon position={[-3, -2, 0]} color="#3B82F6" geometry="users" />
        <FeatureIcon position={[3, -2, 0]} color="#8B5CF6" geometry="award" />

        {/* Linhas conectoras */}
        <ConnectingLines />

        {/* Ambiente */}
        <Environment preset="studio" />

        {/* Fog */}
        <fog attach="fog" args={["#F8FAFC", 10, 20]} />
      </Canvas>
    </div>
  )
}
