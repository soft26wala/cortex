'use client'

import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/deadnaut/source/deadnaut.glb'

function CortexModel() {
  const { scene } = useGLTF(MODEL_PATH)
  const groupRef = useRef<THREE.Group>(null!)

  // Clone scene so materials/geometries are distinct
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const { pointer, clock } = state
    const elapsedTime = clock.getElapsedTime()

    // Smooth cursor/touch tracking with lerp
    const targetRotationY = pointer.x * 0.5
    const targetRotationX = -pointer.y * 0.3

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 3)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, delta * 3)

    // Breathing pulse scale animation
    const breath = 1 + Math.sin(elapsedTime * 2) * 0.02
    groupRef.current.scale.set(1.4 * breath, 1.4 * breath, 1.4 * breath)
  })

  return (
    <Float
      speed={2.5}
      rotationIntensity={0.3}
      floatIntensity={0.6}
    >
      <group ref={groupRef} position={[0, -0.2, 0]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  )
}

function NeuralParticles({ count = 140 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const colorA = new THREE.Color('#3b82f6')
    const colorB = new THREE.Color('#06b6d4')
    const colorC = new THREE.Color('#a855f7')

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12

      const mixedColor = colorA.clone()
        .lerp(colorB, Math.random())
        .lerp(colorC, Math.random() * 0.5)

      col[i * 3] = mixedColor.r
      col[i * 3 + 1] = mixedColor.g
      col[i * 3 + 2] = mixedColor.b
    }

    return [pos, col]
  }, [count])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05
      pointsRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
        <div
          className="absolute inset-2 rounded-full border-2 border-cyan-400/20 border-b-cyan-400 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-500/80 animate-pulse">
        Initializing 3D Core...
      </span>
    </div>
  )
}

export default function Hero3DCanvas() {
  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] flex items-center justify-center overflow-hidden">
      {/* Background Soft Glow Aura */}
      <div className="absolute inset-0 bg-radial from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 80 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Ambient & Cinematic Lighting */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.8} color="#60a5fa" />
          <directionalLight position={[-10, -5, -5]} intensity={1.5} color="#a855f7" />
          <pointLight position={[0, 4, 3]} intensity={3} color="#38bdf8" />

          {/* Neural Particle Network */}
          <NeuralParticles count={140} />

          {/* Core Interactive 3D Model */}
          <CortexModel />

          {/* Contact Shadows & Ambient Glow */}
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.65}
            scale={8}
            blur={2}
            far={3.5}
            color="#2563eb"
          />

          {/* Orbit Controls (constrained for subtle user pan/rotation) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.5}
            rotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

// Preload GLTF model for fast instant rendering
useGLTF.preload(MODEL_PATH)
