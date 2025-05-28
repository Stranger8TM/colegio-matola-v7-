"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, PerspectiveCamera, Environment } from "@react-three/drei"
import type * as THREE from "three"

function PhotoFrame({
  position,
  rotation,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  const frameRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (frameRef.current) {
      frameRef.current.rotation.y += 0.005
      frameRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={frameRef} position={position} rotation={rotation}>
        {/* Moldura */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.8} />
        </mesh>

        {/* "Foto" */}
        <mesh position={[0, 0, 0.03]} castShadow>
          <boxGeometry args={[1, 0.6, 0.01]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>

        {/* Brilho da foto */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[1, 0.6, 0.005]} />
          <meshStandardMaterial color="#E5E7EB" transparent opacity={0.8} emissive="#F3F4F6" emissiveIntensity={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

function Camera3D({ position }: { position: [number, number, number] }) {
  const cameraRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (cameraRef.current) {
      cameraRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={cameraRef} position={position}>
        {/* Corpo da câmera */}
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.5, 0.6]} />
          <meshStandardMaterial color="#2D3748" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Lente */}
        <mesh position={[0, 0, 0.4]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#1A202C" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Flash */}
        <mesh position={[0.2, 0.15, 0.3]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FBBF24" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

export default function Gallery3DEffects() {
  return (
    <div className="absolute inset-0 z-0 opacity-20">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 60 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />

        {/* Iluminação */}
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-3, 3, 3]} intensity={0.5} color="#EAB308" />

        {/* Molduras flutuantes */}
        <PhotoFrame position={[-2, 1, -1]} rotation={[0, 0.3, 0]} />
        <PhotoFrame position={[2, -0.5, -2]} rotation={[0, -0.2, 0]} />
        <PhotoFrame position={[0, 1.5, -1.5]} rotation={[0, 0, 0.1]} />
        <PhotoFrame position={[-1.5, -1, -0.5]} rotation={[0, 0.4, -0.1]} />

        {/* Câmera 3D */}
        <Camera3D position={[1, 0.5, 1]} />

        {/* Ambiente */}
        <Environment preset="studio" />

        {/* Fog */}
        <fog attach="fog" args={["#F8FAFC", 8, 15]} />
      </Canvas>
    </div>
  )
}
