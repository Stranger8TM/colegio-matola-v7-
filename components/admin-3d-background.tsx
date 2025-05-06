"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function AdminModel({ rotation = [0, 0, 0] }) {
  const modelRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  // Criando um modelo 3D simples para representar um painel administrativo
  return (
    <group ref={modelRef} rotation={rotation as any}>
      {/* Base do painel */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Elementos decorativos */}
      <mesh position={[-1, 0.7, 0.15]} castShadow>
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.7, 0.15]} castShadow>
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.2} />
      </mesh>

      <mesh position={[1, 0.7, 0.15]} castShadow>
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Gráfico simulado */}
      <mesh position={[0, -0.5, 0.15]} castShadow>
        <boxGeometry args={[2.5, 0.8, 0.1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Barras de gráfico */}
      <mesh position={[-1, -0.5, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.4, 0.1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[-0.5, -0.5, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[0, -0.5, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[0.5, -0.5, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.7, 0.1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[1, -0.5, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.5, 0.1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
}

export default function Admin3DBackground() {
  return (
    <div className="fixed inset-0 z-[-1] opacity-20">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <AdminModel rotation={[0.1, 0, 0]} />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
