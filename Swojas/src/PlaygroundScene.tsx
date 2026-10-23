import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { Mesh } from 'three'

export type ExplorerShape = 'sphere' | 'torus' | 'octahedron'

function ExplorerObject({
  shape,
  accent,
  reducedMotion,
}: {
  shape: ExplorerShape
  accent: string
  reducedMotion: boolean
}) {
  const mesh = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (mesh.current && !reducedMotion) {
      mesh.current.rotation.x += delta * 0.18
      mesh.current.rotation.y += delta * 0.28
    }
  })

  const geometry =
    shape === 'torus' ? (
      <torusKnotGeometry args={[0.72, 0.22, 100, 14]} />
    ) : shape === 'octahedron' ? (
      <octahedronGeometry args={[0.94, 0]} />
    ) : (
      <icosahedronGeometry args={[0.9, 2]} />
    )

  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[2, 2, 3]} intensity={22} color={accent} />
      <mesh ref={mesh}>
        {geometry}
        <meshStandardMaterial
          color="#b5a6ff"
          emissive={accent}
          emissiveIntensity={0.34}
          metalness={0.66}
          roughness={0.24}
        />
      </mesh>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.45}
        enableDamping
      />
    </>
  )
}

export default function PlaygroundScene({
  shape,
  accent,
  reducedMotion,
}: {
  shape: ExplorerShape
  accent: string
  reducedMotion: boolean
}) {
  return (
    <Canvas
      dpr={[1, 1.3]}
      camera={{ position: [0, 0, 3.5], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      fallback={<div className="scene-fallback" aria-label="Decorative geometry" />}
    >
      <ExplorerObject shape={shape} accent={accent} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
