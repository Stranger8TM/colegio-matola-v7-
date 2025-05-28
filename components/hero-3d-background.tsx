"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera, Sparkles } from "@react-three/drei"
import type * as THREE from "three"

function FloatingGeometry({
  position,
  color,
  scale = 1,
}: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <dodecahedronGeometry args={[0.5]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.1} />
      </mesh>
    </Float>
  )
}

function AnimatedSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#EAB308" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
    </mesh>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#3B82F6" transparent opacity={0.6} />
    </points>
  )
}

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 60 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />

        {/* Iluminação */}
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />

        {/* Geometrias flutuantes */}
        <FloatingGeometry position={[-4, 2, -2]} color="#EAB308" scale={0.8} />
        <FloatingGeometry position={[4, -1, -3]} color="#3B82F6" scale={1.2} />
        <FloatingGeometry position={[2, 3, -1]} color="#10B981" scale={0.6} />
        <FloatingGeometry position={[-3, -2, -4]} color="#8B5CF6" scale={1} />

        {/* Esferas animadas */}
        <AnimatedSphere position={[3, 1, 2]} />
        <AnimatedSphere position={[-2, -1, 1]} />
        <AnimatedSphere position={[1, -3, 3]} />

        {/* Campo de partículas */}
        <ParticleField />

        {/* Sparkles */}
        <Sparkles count={30} scale={[15, 15, 15]} size={2} speed={0.3} color="#EAB308" />

        {/* Ambiente */}
        <Environment preset="dawn" />

        {/* Fog */}
        <fog attach="fog" args={["#1E40AF", 5, 25]} />
      </Canvas>
    </div>
  )
}
