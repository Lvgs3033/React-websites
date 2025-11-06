import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { CelestialObject } from '../types';
import { useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface SceneProps {
  object1: CelestialObject | null;
  object2: CelestialObject | null;
}

function CelestialObjectMesh({ object, position }: { object: CelestialObject; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={object.color} />
      <pointLight position={[0, 0, 0]} intensity={1} distance={5} />
    </mesh>
  );
}

function Rocket() {
  const rocketRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
      rocketRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={rocketRef} position={[0, 0, -5]}>
      <mesh>
        <coneGeometry args={[0.5, 2, 32]} />
        <meshStandardMaterial color="#EDC7B7" />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1]} />
        <meshStandardMaterial color="#123C69" />
      </mesh>
    </group>
  );
}

export function Scene({ object1, object2 }: SceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[600px] rounded-lg overflow-hidden"
    >
      <Canvas className="w-full h-full">
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Rocket />
        {object1 && <CelestialObjectMesh object={object1} position={[-2, 0, 0]} />}
        {object2 && <CelestialObjectMesh object={object2} position={[2, 0, 0]} />}
      </Canvas>
    </motion.div>
  );
}