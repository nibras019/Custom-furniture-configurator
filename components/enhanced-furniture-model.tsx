"use client"

import { useRef, useMemo, useEffect, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import { type Mesh, MeshStandardMaterial, type Group, Vector2 } from "three"
import { useWoodTexture, useFabricTexture, useLeatherTexture } from "./texture-loader"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"

interface EnhancedFurnitureModelProps {
  config: FurnitureConfig
  item: FurnitureItem
}

function FurnitureModelContent({ config, item }: EnhancedFurnitureModelProps) {
  const groupRef = useRef<Group>(null)
  const frameRefs = useRef<Mesh[]>([])
  const fabricRefs = useRef<Mesh[]>([])

  // Load textures
  const woodTexture = useWoodTexture(config.woodType)
  const fabricTexture = useFabricTexture(config.fabricType)
  const leatherTexture = useLeatherTexture()

  // Clear refs when item changes
  useEffect(() => {
    frameRefs.current = []
    fabricRefs.current = []
  }, [item])

  // Calculate scale with premium proportions
  const scale = useMemo(() => {
    const itemScales = {
      chair: { small: 0.85, medium: 1.0, large: 1.15 },
      sofa: { small: 0.8, medium: 1.0, large: 1.2 },
      table: { small: 0.82, medium: 1.0, large: 1.18 },
      bookshelf: { small: 0.88, medium: 1.0, large: 1.12 },
      ottoman: { small: 0.9, medium: 1.0, large: 1.1 },
    }

    return itemScales[item][config.size]
  }, [config.size, item])

  // Enhanced materials with textures and aging effects
  const premiumFrameMaterial = useMemo(() => {
    const material = new MeshStandardMaterial({
      color: config.frameColor,
      map: woodTexture,
      roughness: getWoodRoughness(config.woodType),
      metalness: getWoodMetalness(config.woodType),
      normalMap: woodTexture,
      normalScale: new Vector2(0.3, 0.3),
      envMapIntensity: 1.5,
      clearcoat: getWoodClearcoat(config.woodType),
      clearcoatRoughness: 0.1,
      // Subtle aging effect
      roughnessMap: woodTexture,
    })
    return material
  }, [config.frameColor, config.woodType, woodTexture])

  const premiumFabricMaterial = useMemo(() => {
    const isLeather = config.fabricType === "leather"
    const baseTexture = isLeather ? leatherTexture : fabricTexture

    const material = new MeshStandardMaterial({
      color: config.fabricColor,
      map: baseTexture,
      roughness: getFabricRoughness(config.fabricType),
      metalness: isLeather ? 0.05 : 0.0,
      normalMap: baseTexture,
      normalScale: new Vector2(getFabricNormalScale(config.fabricType), getFabricNormalScale(config.fabricType)),
      envMapIntensity: isLeather ? 1.2 : 0.6,
      clearcoat: isLeather ? 0.3 : 0.0,
      clearcoatRoughness: isLeather ? 0.2 : 0.0,
      bumpMap: baseTexture,
      bumpScale: getFabricBumpScale(config.fabricType),
    })
    return material
  }, [config.fabricColor, config.fabricType, fabricTexture, leatherTexture])

  // Metallic accent material for hardware
  const metallicAccentMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: "#c9b037", // Brass color
      roughness: 0.2,
      metalness: 0.9,
      envMapIntensity: 2.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    })
  }, [])

  // Update materials when they change
  useEffect(() => {
    frameRefs.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        mesh.material = premiumFrameMaterial
      }
    })
  }, [premiumFrameMaterial])

  useEffect(() => {
    fabricRefs.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        mesh.material = premiumFabricMaterial
      }
    })
  }, [premiumFabricMaterial])

  // Enhanced animation with breathing and subtle movement
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = Math.sin(time * 0.08) * 0.005
      groupRef.current.position.y = Math.sin(time * 0.1) * 0.001 - 0.5

      // Subtle scale breathing for organic feel
      const breathe = 1 + Math.sin(time * 0.15) * 0.001
      groupRef.current.scale.setScalar(scale * breathe)
    }
  })

  const addToFrameRefs = (ref: Mesh | null) => {
    if (ref && !frameRefs.current.includes(ref)) {
      frameRefs.current.push(ref)
    }
  }

  const addToFabricRefs = (ref: Mesh | null) => {
    if (ref && !fabricRefs.current.includes(ref)) {
      fabricRefs.current.push(ref)
    }
  }

  const addToMetallicRefs = (ref: Mesh | null) => {
    if (ref && ref.material) {
      ref.material = metallicAccentMaterial
    }
  }

  const renderUltraPremiumChair = () => (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Luxurious Seat Cushion with subtle curve */}
      <mesh position={[0, 0.1, 0.1]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[1.65, 0.28, 1.45]} />
        <primitive object={premiumFabricMaterial} />
      </mesh>

      {/* Seat frame with premium finish */}
      <mesh position={[0, -0.05, 0.1]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.7, 0.1, 1.5]} />
        <primitive object={premiumFrameMaterial} />
      </mesh>

      {/* Ergonomic backrest with premium padding */}
      <mesh position={[0, 0.95, -0.62]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[1.65, 1.35, 0.22]} />
        <primitive object={premiumFabricMaterial} />
      </mesh>

      {/* Backrest structural frame */}
      <mesh position={[0, 0.95, -0.75]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.72, 1.4, 0.08]} />
        <primitive object={premiumFrameMaterial} />
      </mesh>

      {/* Artisan-crafted legs with brass accents */}
      {[
        { pos: [-0.75, -0.42, 0.6], rotation: [0, 0, 0.015] },
        { pos: [0.75, -0.42, 0.6], rotation: [0, 0, -0.015] },
        { pos: [-0.75, -0.42, -0.6], rotation: [0, 0, 0.015] },
        { pos: [0.75, -0.42, -0.6], rotation: [0, 0, -0.015] },
      ].map((leg, index) => (
        <group key={`leg-group-${index}`}>
          {/* Main wooden leg */}
          <mesh
            position={leg.pos as [number, number, number]}
            rotation={leg.rotation as [number, number, number]}
            castShadow
            receiveShadow
            ref={addToFrameRefs}
          >
            <cylinderGeometry args={[0.045, 0.065, 0.88, 12]} />
            <primitive object={premiumFrameMaterial} />
          </mesh>

          {/* Brass foot cap */}
          <mesh position={[leg.pos[0], leg.pos[1] - 0.45, leg.pos[2]]} castShadow receiveShadow ref={addToMetallicRefs}>
            <cylinderGeometry args={[0.048, 0.048, 0.02, 12]} />
            <primitive object={metallicAccentMaterial} />
          </mesh>
        </group>
      ))}

      {/* Premium armrests with refined curves */}
      <mesh position={[-0.82, 0.38, 0.15]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[0.2, 0.14, 0.95]} />
        <primitive object={premiumFabricMaterial} />
      </mesh>

      <mesh position={[0.82, 0.38, 0.15]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[0.2, 0.14, 0.95]} />
        <primitive object={premiumFabricMaterial} />
      </mesh>

      {/* Armrest supports with brass details */}
      {[-0.82, 0.82].map((x, index) => (
        <group key={`armrest-support-${index}`}>
          <mesh position={[x, 0.2, 0.58]} castShadow receiveShadow ref={addToFrameRefs}>
            <cylinderGeometry args={[0.042, 0.052, 0.38, 10]} />
            <primitive object={premiumFrameMaterial} />
          </mesh>

          {/* Brass connector */}
          <mesh position={[x, 0.32, 0.58]} castShadow receiveShadow ref={addToMetallicRefs}>
            <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
            <primitive object={metallicAccentMaterial} />
          </mesh>
        </group>
      ))}

      {/* Structural cross braces */}
      <mesh position={[0, -0.22, 0.6]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.42, 0.08, 0.08]} />
        <primitive object={premiumFrameMaterial} />
      </mesh>

      <mesh position={[0, -0.22, -0.6]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.42, 0.08, 0.08]} />
        <primitive object={premiumFrameMaterial} />
      </mesh>

      {/* Side braces */}
      <mesh position={[-0.75, -0.22, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.08, 0.08, 1.12]} />
        <primitive object={premiumFrameMaterial} />
      </mesh>

      <mesh position={[0.75, -0.22, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.08, 0.08, 1.12]} />
        <primitive object={premiumFrameMaterial} />
      </mesh>
    </group>
  )

  const renderItem = () => {
    switch (item) {
      case "chair":
        return renderUltraPremiumChair()
      // For now, just the chair - other items would follow similar pattern
      default:
        return renderUltraPremiumChair()
    }
  }

  return renderItem()
}

export function EnhancedFurnitureModel(props: EnhancedFurnitureModelProps) {
  return (
    <Suspense fallback={null}>
      <FurnitureModelContent {...props} />
    </Suspense>
  )
}

// Enhanced material property functions
function getWoodRoughness(woodType: string): number {
  const roughnessMap = {
    oak: 0.75,
    walnut: 0.45,
    mahogany: 0.25,
    cherry: 0.35,
    teak: 0.2,
  }
  return roughnessMap[woodType as keyof typeof roughnessMap] || 0.6
}

function getWoodMetalness(woodType: string): number {
  const metalnessMap = {
    teak: 0.18,
    mahogany: 0.15,
    cherry: 0.12,
    walnut: 0.1,
    oak: 0.06,
  }
  return metalnessMap[woodType as keyof typeof metalnessMap] || 0.08
}

function getWoodClearcoat(woodType: string): number {
  const clearcoatMap = {
    teak: 0.6,
    mahogany: 0.5,
    cherry: 0.4,
    walnut: 0.35,
    oak: 0.25,
  }
  return clearcoatMap[woodType as keyof typeof clearcoatMap] || 0.3
}

function getFabricRoughness(fabricType: string): number {
  const roughnessMap = {
    leather: 0.35,
    silk: 0.08,
    velvet: 0.95,
    linen: 0.85,
    cotton: 0.75,
  }
  return roughnessMap[fabricType as keyof typeof roughnessMap] || 0.6
}

function getFabricBumpScale(fabricType: string): number {
  const bumpMap = {
    velvet: 0.08,
    linen: 0.05,
    cotton: 0.03,
    leather: 0.02,
    silk: 0.008,
  }
  return bumpMap[fabricType as keyof typeof bumpMap] || 0.02
}

function getFabricNormalScale(fabricType: string): number {
  const normalMap = {
    velvet: 0.6,
    linen: 0.4,
    leather: 0.3,
    cotton: 0.25,
    silk: 0.1,
  }
  return normalMap[fabricType as keyof typeof normalMap] || 0.3
}
