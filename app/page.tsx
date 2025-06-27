"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Lightformer } from "@react-three/drei"
import { ConfigPanel } from "@/components/config-panel"
import { FurnitureModel } from "@/components/furniture-model"
import { ItemSelector } from "@/components/item-selector"
import { LoadingSpinner } from "@/components/loading-spinner"

export interface FurnitureConfig {
  woodType: "oak" | "walnut" | "mahogany" | "cherry" | "teak"
  fabricType: "leather" | "velvet" | "cotton" | "linen" | "silk"
  frameColor: string
  fabricColor: string
  size: "small" | "medium" | "large"
}

export type FurnitureItem = "chair" | "sofa" | "table" | "bookshelf" | "ottoman"

const defaultConfig: FurnitureConfig = {
  woodType: "walnut",
  fabricType: "leather",
  frameColor: "#8B4513",
  fabricColor: "#2C1810",
  size: "medium",
}

export default function FurnitureConfigurator() {
  const [config, setConfig] = useState<FurnitureConfig>(defaultConfig)
  const [selectedItem, setSelectedItem] = useState<FurnitureItem>("chair")

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                Luxe Furniture Atelier
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">Premium 3D Furniture Design Studio</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-6 py-3 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white text-sm font-semibold rounded-full shadow-lg">
                ✨ Artisan Collection
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Enhanced 3D Viewer */}
        <div className="flex-1 relative">
          <Canvas
            shadows="soft"
            camera={{ position: [0, 3, 8], fov: 40 }}
            className="bg-gradient-to-b from-gray-100 via-gray-150 to-gray-200"
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              {/* Enhanced Lighting Setup */}
              <ambientLight intensity={0.2} color="#f8f9fa" />

              {/* Key Light */}
              <directionalLight
                position={[15, 20, 15]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-camera-far={100}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
                shadow-bias={-0.0001}
                color="#ffffff"
              />

              {/* Fill Light */}
              <directionalLight
                position={[-10, 15, -10]}
                intensity={0.8}
                color="#f0f4f8"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />

              {/* Rim Light */}
              <pointLight position={[0, 25, -15]} intensity={1.2} color="#fff8e1" />

              {/* Accent Lights */}
              <spotLight
                position={[10, 15, 10]}
                angle={0.4}
                penumbra={0.8}
                intensity={0.6}
                castShadow
                color="#e3f2fd"
              />

              <spotLight position={[-10, 15, 10]} angle={0.4} penumbra={0.8} intensity={0.4} color="#fce4ec" />

              <FurnitureModel config={config} item={selectedItem} />

              {/* Enhanced Shadows */}
              <ContactShadows
                position={[0, -2.1, 0]}
                opacity={0.4}
                scale={20}
                blur={2.8}
                far={8}
                color="#1a1a1a"
                resolution={1024}
              />

              {/* Premium Environment */}
              <Environment resolution={1024} background={false}>
                <Lightformer
                  intensity={2}
                  color="white"
                  position={[0, 5, -9]}
                  rotation={[0, 0, Math.PI / 3]}
                  scale={[10, 10, 1]}
                />
                <Lightformer
                  intensity={1}
                  color="#f0f4f8"
                  position={[-5, 1, -1]}
                  rotation={[0, Math.PI / 2, 0]}
                  scale={[10, 2, 1]}
                />
                <Lightformer
                  intensity={1}
                  color="#fff8e1"
                  position={[10, 1, 0]}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={[10, 2, 1]}
                />
                <Lightformer intensity={0.5} color="#e8f5e8" position={[0, 1, 5]} scale={[10, 2, 1]} />
              </Environment>

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={4}
                maxDistance={20}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2.1}
                autoRotate={false}
                autoRotateSpeed={0.3}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>

          <Suspense fallback={<LoadingSpinner />}>
            <div />
          </Suspense>

          {/* Enhanced Item Selector */}
          <div className="absolute top-8 left-8">
            <ItemSelector selectedItem={selectedItem} onItemChange={setSelectedItem} />
          </div>

          {/* Premium Experience Badge */}
          <div className="absolute bottom-8 left-8">
            <div className="bg-black/30 backdrop-blur-xl text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-2xl border border-white/10">
              🎨 Premium 3D Experience
            </div>
          </div>

          {/* Quality Indicator */}
          <div className="absolute bottom-8 right-8">
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl text-emerald-100 px-4 py-2 rounded-xl text-xs font-medium border border-emerald-400/20">
              Ultra HD Rendering
            </div>
          </div>
        </div>

        {/* Enhanced Configuration Panel */}
        <div className="w-96 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/60">
          <div className="h-full overflow-hidden">
            <ConfigPanel config={config} onConfigChange={setConfig} selectedItem={selectedItem} />
          </div>
        </div>
      </div>
    </div>
  )
}
