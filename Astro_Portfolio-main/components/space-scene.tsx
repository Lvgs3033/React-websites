"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, OrbitControls, useTexture } from "@react-three/drei"
import type * as THREE from "three"

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null)
  // Use a realistic Earth texture
  const texture = useTexture(
    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2074&auto=format&fit=crop",
  )

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

function Asteroid({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#888888" roughness={0.8} />
    </mesh>
  )
}

function AsteroidBelt() {
  const asteroids = []
  const radius = 8

  for (let i = 0; i < 100; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = radius + (Math.random() - 0.5) * 2
    const x = Math.cos(angle) * distance
    const z = Math.sin(angle) * distance
    const y = (Math.random() - 0.5) * 2

    asteroids.push(<Asteroid key={i} position={[x, y, z]} />)
  }

  return <>{asteroids}</>
}

function CameraController() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 2, 10)
  }, [camera])

  return null
}

export default function SpaceScene() {
  return (
    <div className="w-full h-screen absolute inset-0">
      <Canvas>
        <CameraController />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.2} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Planet />
        <AsteroidBelt />
      </Canvas>
    </div>
  )
}

