"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { PremiumEnvironment } from "./premium-environment"
import type { FurnitureConfig } from "@/app/page"

interface MaterialPreviewProps {
  config: FurnitureConfig
  size?: "small" | "medium" | "large"
}

export function MaterialPreview({ config, size = "small" }: MaterialPreviewProps) {
  return (
    <div
      className={`${size === "small" ? "w-16 h-16" : size === "medium" ? "w-24 h-24" : "w-32 h-32"} rounded-xl overflow-hidden border border-gray-200 shadow-lg`}
    >
      <Canvas camera={{ position: [2, 1, 2], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Preview sphere for materials */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={config.frameColor} roughness={0.4} metalness={0.1} envMapIntensity={1.0} />
          </mesh>

          <PremiumEnvironment preset="studio" />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Suspense>
      </Canvas>
    </div>
  )
}
