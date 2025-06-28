"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Lightformer } from "@react-three/drei"
import { ConfigPanel } from "@/components/config-panel"
import { DubaiFurnitureModel } from "@/components/dubai-furniture-model"
import { LoadingSpinner } from "@/components/loading-spinner"
import { PriceDisplay } from "@/components/price-display"
import { ContactForm } from "@/components/contact-form"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { MobileConfigDrawer } from "@/components/mobile-config-drawer"
import { useMediaQuery } from "@/hooks/use-media-query"

export interface FurnitureConfig {
  woodType: "oak" | "walnut" | "mahogany" | "cherry" | "teak"
  fabricType: "leather" | "velvet" | "cotton" | "linen" | "silk"
  frameColor: string
  fabricColor: string
  size: "small" | "medium" | "large"
}

export type FurnitureItem = "chair" | "sofa" | "table" | "bookshelf" | "stool"

const defaultConfig: FurnitureConfig = {
  woodType: "walnut",
  fabricType: "leather",
  frameColor: "#8B4513",
  fabricColor: "#2C1810",
  size: "medium",
}

export default function DubaiFurnitureShowroom() {
  const [config, setConfig] = useState<FurnitureConfig>(defaultConfig)
  const [selectedItem, setSelectedItem] = useState<FurnitureItem>("chair")
  const [showContact, setShowContact] = useState(false)
  const [activeTab, setActiveTab] = useState<"home" | "config" | "price" | "contact">("home")
  const [isCanvasHovered, setIsCanvasHovered] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Handle mobile orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"))
      }, 100)
    }

    window.addEventListener("orientationchange", handleOrientationChange)
    return () => window.removeEventListener("orientationchange", handleOrientationChange)
  }, [])

  // Handle scroll events to prevent canvas interference
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const isOverCanvas =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      // Only allow canvas zoom when specifically hovering over canvas AND holding Ctrl/Cmd
      if (isOverCanvas && (event.ctrlKey || event.metaKey)) {
        // Allow zoom on canvas
        return
      } else if (isOverCanvas && !event.ctrlKey && !event.metaKey) {
        // Prevent canvas zoom, allow page scroll
        event.preventDefault()
        event.stopPropagation()

        // Manually scroll the page
        const scrollAmount = event.deltaY
        window.scrollBy(0, scrollAmount)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Disable space bar and arrow key navigation when canvas is focused
      if (isCanvasHovered && (event.code === "Space" || event.code.startsWith("Arrow"))) {
        event.preventDefault()
      }
    }

    document.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("wheel", handleWheel)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isCanvasHovered])

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader
          selectedItem={selectedItem}
          onMenuClick={() => setActiveTab("config")}
          onContactClick={() => setShowContact(true)}
        />

        {/* Mobile 3D Viewer */}
        <div className="flex-1 relative">
          <div
            ref={canvasRef}
            className="w-full h-full"
            onMouseEnter={() => setIsCanvasHovered(true)}
            onMouseLeave={() => setIsCanvasHovered(false)}
          >
            <Canvas
              shadows="soft"
              camera={{ position: [0, 3, 8], fov: 45 }}
              className="bg-gradient-to-br from-slate-50 to-amber-50/30"
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: true,
              }}
              style={{ touchAction: "none" }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} color="#f8f9fa" />
                <directionalLight
                  position={[15, 20, 15]}
                  intensity={2.0}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-camera-far={50}
                  shadow-camera-left={-15}
                  shadow-camera-right={15}
                  shadow-camera-top={15}
                  shadow-camera-bottom={-15}
                  color="#ffffff"
                />
                <directionalLight position={[-10, 15, -10]} intensity={0.8} color="#f0f4f8" />
                <pointLight position={[0, 25, -15]} intensity={1.0} color="#fff8e1" />

                <DubaiFurnitureModel config={config} item={selectedItem} />

                <ContactShadows
                  position={[0, -2.5, 0]}
                  opacity={0.2}
                  scale={20}
                  blur={2.5}
                  far={8}
                  color="#1a1a1a"
                  resolution={1024}
                />

                <Environment resolution={1024} background={false}>
                  <Lightformer
                    intensity={2.0}
                    color="#ffffff"
                    position={[0, 12, -12]}
                    rotation={[Math.PI / 6, 0, 0]}
                    scale={[20, 8, 1]}
                    form="rect"
                  />
                  <Lightformer
                    intensity={1.0}
                    color="#f8f9fa"
                    position={[-10, 8, 5]}
                    rotation={[0, Math.PI / 4, 0]}
                    scale={[8, 8, 1]}
                    form="rect"
                  />
                </Environment>

                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={4}
                  maxDistance={15}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2.1}
                  autoRotate={false}
                  enableDamping={true}
                  dampingFactor={0.05}
                  zoomSpeed={0.5}
                  rotateSpeed={0.5}
                  panSpeed={0.5}
                  touches={{
                    ONE: 2, // TOUCH.ROTATE
                    TWO: 1, // TOUCH.DOLLY_PAN
                  }}
                  mouseButtons={{
                    LEFT: 2, // MOUSE.ROTATE
                    MIDDLE: 1, // MOUSE.DOLLY
                    RIGHT: 0, // MOUSE.PAN
                  }}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Mobile Quality Badges */}
          <div className="absolute bottom-20 left-4 right-4 flex justify-between pointer-events-none">
            <div className="bg-white/90 backdrop-blur-xl rounded-xl px-3 py-2 shadow-lg border border-gray-200/50">
              <div className="flex items-center space-x-2 text-emerald-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-medium">5 Year Warranty</span>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-xl px-3 py-2 shadow-lg border border-gray-200/50">
              <div className="flex items-center space-x-2 text-blue-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-medium">Free Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} config={config} item={selectedItem} />

        {/* Mobile Configuration Drawer */}
        <MobileConfigDrawer
          isOpen={activeTab === "config"}
          onClose={() => setActiveTab("home")}
          config={config}
          onConfigChange={setConfig}
          selectedItem={selectedItem}
        />

        {/* Mobile Contact Form */}
        {showContact && (
          <ContactForm onClose={() => setShowContact(false)} config={config} item={selectedItem} isMobile={true} />
        )}

        <Suspense fallback={<LoadingSpinner />}>
          <div />
        </Suspense>
      </div>
    )
  }

  // Tablet and Desktop Layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Desktop/Tablet Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  MAJLIS LUXURY
                </h1>
                <p className="text-sm text-gray-600 font-medium">Premium Furniture Collection</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowContact(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-4 lg:px-6 py-2 rounded-lg shadow-lg transition-all duration-200"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 3D Showcase */}
        <div className="flex-1 h-screen sticky top-0">
          <div
            ref={canvasRef}
            className="w-full h-full relative"
            onMouseEnter={() => setIsCanvasHovered(true)}
            onMouseLeave={() => setIsCanvasHovered(false)}
          >
            <Canvas
              shadows="soft"
              camera={{ position: [0, 4, 10], fov: 35 }}
              className="bg-gradient-to-br from-slate-50 to-amber-50/30"
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: true,
              }}
              style={{
                display: "block",
                outline: "none",
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} color="#f8f9fa" />
                <directionalLight
                  position={[20, 25, 20]}
                  intensity={2.2}
                  castShadow
                  shadow-mapSize-width={4096}
                  shadow-mapSize-height={4096}
                  shadow-camera-far={100}
                  shadow-camera-left={-20}
                  shadow-camera-right={20}
                  shadow-camera-top={20}
                  shadow-camera-bottom={-20}
                  color="#ffffff"
                />
                <directionalLight position={[-15, 20, -15]} intensity={1.0} color="#f0f4f8" />
                <pointLight position={[0, 30, -20]} intensity={1.2} color="#fff8e1" />

                <DubaiFurnitureModel config={config} item={selectedItem} />

                <ContactShadows
                  position={[0, -2.5, 0]}
                  opacity={0.25}
                  scale={30}
                  blur={3.5}
                  far={12}
                  color="#1a1a1a"
                  resolution={2048}
                />

                <Environment resolution={2048} background={false}>
                  <Lightformer
                    intensity={2.5}
                    color="#ffffff"
                    position={[0, 15, -15]}
                    rotation={[Math.PI / 6, 0, 0]}
                    scale={[25, 10, 1]}
                    form="rect"
                  />
                </Environment>

                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={5}
                  maxDistance={25}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2.2}
                  autoRotate={false}
                  enableDamping={true}
                  dampingFactor={0.02}
                  zoomSpeed={0.3}
                  rotateSpeed={0.3}
                  panSpeed={0.3}
                  enabled={isCanvasHovered}
                />
              </Suspense>
            </Canvas>

            {/* Canvas Instructions Overlay */}
            {isCanvasHovered && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg pointer-events-none">
                <div>Click + Drag: Rotate</div>
                <div>Ctrl + Scroll: Zoom</div>
                <div>Right Click + Drag: Pan</div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Panel - Scrollable */}
        <div
          className={`${isTablet ? "w-80" : "w-96"} bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 overflow-y-auto`}
        >
          <div className="min-h-screen">
            <ConfigPanel
              config={config}
              onConfigChange={setConfig}
              selectedItem={selectedItem}
              onItemChange={setSelectedItem}
            />
            <div className="border-t border-gray-100">
              <PriceDisplay config={config} item={selectedItem} />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      {showContact && (
        <ContactForm onClose={() => setShowContact(false)} config={config} item={selectedItem} isMobile={false} />
      )}
    </div>
  )
}
