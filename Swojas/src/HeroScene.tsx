import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import type { Group, Mesh } from 'three'

type CoreProps = {
  reducedMotion: boolean
  accent: string
}

function EnergyCore({ reducedMotion, accent }: CoreProps) {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const pulseScale = useRef(0)
  const hovered = useRef(false)

  useFrame((state, delta) => {
    const target = state.pointer
    if (group.current && !reducedMotion) {
      const scale = group.current.scale.x
      const targetScale = hovered.current ? 1.035 : 1
      group.current.scale.setScalar(scale + (targetScale - scale) * Math.min(delta * 4, 1))
      group.current.rotation.y +=
        (target.x * 0.28 + state.clock.elapsedTime * 0.07 - group.current.rotation.y) *
        Math.min(delta, 0.05)
      group.current.rotation.x +=
        (-target.y * 0.16 - group.current.rotation.x) * Math.min(delta, 0.05)
    }
    if (core.current) {
      pulseScale.current = Math.max(0, pulseScale.current - delta * 1.6)
      core.current.scale.setScalar(1 + pulseScale.current)
    }
  })

  return (
    <group ref={group}>
      <mesh
        ref={core}
        onClick={() => {
          pulseScale.current = 0.45
        }}
        onPointerOver={(event) => {
          event.stopPropagation()
          hovered.current = true
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          hovered.current = false
          document.body.style.cursor = ''
        }}
      >
        <icosahedronGeometry args={[0.82, 5]} />
        <MeshDistortMaterial
          color="#262c40"
          emissive={accent}
          emissiveIntensity={0.22}
          metalness={0.94}
          roughness={0.18}
          transparent
          opacity={0.62}
          distort={0.13}
          speed={reducedMotion ? 0 : 0.8}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.84, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.5, 3]} />
        <meshStandardMaterial
          color="#bcefff"
          emissive="#48cfff"
          emissiveIntensity={1.9}
          metalness={0.55}
          roughness={0.24}
        />
      </mesh>
      <mesh rotation={[0.8, 0.15, -0.35]}>
        <torusGeometry args={[1.16, 0.012, 10, 120]} />
        <meshStandardMaterial
          color="#7a75ff"
          emissive="#715fff"
          emissiveIntensity={1.4}
          metalness={0.7}
        />
      </mesh>
      <mesh rotation={[-0.5, 0.5, 0.88]}>
        <torusGeometry args={[1.38, 0.008, 8, 120]} />
        <meshStandardMaterial color="#62e7ff" emissive="#32cfff" emissiveIntensity={1.15} />
      </mesh>
      <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.3} floatIntensity={0.25}>
        <mesh position={[1.22, 0.45, 0.1]}>
          <octahedronGeometry args={[0.11, 0]} />
          <meshStandardMaterial color="#d7c8ff" emissive="#8b5cf6" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[-1.12, -0.67, -0.12]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#a9f2ff" emissive="#00d9ff" emissiveIntensity={1.5} />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroScene({ reducedMotion, accent }: CoreProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      fallback={<div className="scene-fallback" aria-label="Decorative energy core" />}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 3]} intensity={26} color="#536dff" />
      <pointLight position={[-3, -1, 2]} intensity={12} color="#ac57ff" />
      <Stars
        radius={18}
        depth={4}
        count={reducedMotion ? 90 : 220}
        factor={1.2}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.25}
      />
      <EnergyCore reducedMotion={reducedMotion} accent={accent} />
    </Canvas>
  )
}
