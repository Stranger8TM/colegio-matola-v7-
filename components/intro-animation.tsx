"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, Text } from "@react-three/drei"
import type { Mesh, MeshStandardMaterial } from "three"
import { motion } from "framer-motion"

function Model() {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF("/assets/3d/duck.glb") as any

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1
    }
  })

  return (
    <group ref={group} dispose={null} position={[0, -1, 0]} scale={2}>
      {nodes && materials && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Duck.geometry}
          material={materials.default}
          position={[0, 0.5, 0]}
        />
      )}
    </group>
  )
}

function SchoolLogo() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 1.5, 0]}>
      <Text
        color="#ffffff"
        fontSize={0.5}
        maxWidth={2}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="/fonts/Inter_Bold.json"
      >
        Colégio Matola
      </Text>
    </mesh>
  )
}

function FloatingBook() {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + 0.5
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[1.5, 0.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.5, 0.05, 0.7]} />
      <meshStandardMaterial color={hovered ? "#ff9500" : "#1a5fb4"} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

function FloatingGlobe() {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 + 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[-1.5, 0.5, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial ref={materialRef} color="#3584e4" metalness={0.2} roughness={0.7} />
    </mesh>
  )
}

export default function IntroAnimation() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-screen bg-gradient-to-b from-blue-900 to-blue-700"
    >
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Model />
        <SchoolLogo />
        <FloatingBook />
        <FloatingGlobe />

        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
        <Environment preset="sunset" />
      </Canvas>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-900 bg-opacity-80 z-10">
          <div className="text-white text-2xl">Carregando...</div>
        </div>
      )}
    </motion.div>
  )
}
