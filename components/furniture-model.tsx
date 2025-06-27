"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { type Mesh, MeshStandardMaterial, type Group } from "three"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"

interface FurnitureModelProps {
  config: FurnitureConfig
  item: FurnitureItem
}

export function FurnitureModel({ config, item }: FurnitureModelProps) {
  const groupRef = useRef<Group>(null)
  const frameRefs = useRef<Mesh[]>([])
  const fabricRefs = useRef<Mesh[]>([])

  // Clear refs when item changes
  useEffect(() => {
    frameRefs.current = []
    fabricRefs.current = []
  }, [item])

  // Calculate scale based on size
  const scale = useMemo(() => {
    const baseScale = {
      chair: 1.0,
      sofa: 1.0,
      table: 1.0,
      bookshelf: 1.0,
      ottoman: 1.0,
    }[item]

    const sizeMultiplier = {
      small: 0.85,
      medium: 1.0,
      large: 1.15,
    }[config.size]

    return baseScale * sizeMultiplier
  }, [config.size, item])

  // Enhanced materials with premium properties
  const frameMaterial = useMemo(() => {
    const material = new MeshStandardMaterial({
      color: config.frameColor,
      roughness: getWoodRoughness(config.woodType),
      metalness: getWoodMetalness(config.woodType),
      envMapIntensity: 1.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
    })
    return material
  }, [config.frameColor, config.woodType])

  const fabricMaterial = useMemo(() => {
    const material = new MeshStandardMaterial({
      color: config.fabricColor,
      roughness: getFabricRoughness(config.fabricType),
      metalness: 0.0,
      envMapIntensity: 0.8,
      bumpScale: getFabricBumpScale(config.fabricType),
    })
    return material
  }, [config.fabricColor, config.fabricType])

  // Leather-specific material for premium look
  const leatherMaterial = useMemo(() => {
    if (config.fabricType !== "leather") return fabricMaterial

    return new MeshStandardMaterial({
      color: config.fabricColor,
      roughness: 0.4,
      metalness: 0.1,
      envMapIntensity: 1.0,
      clearcoat: 0.2,
      clearcoatRoughness: 0.3,
      bumpScale: 0.02,
    })
  }, [config.fabricColor, config.fabricType, fabricMaterial])

  // Update materials when they change
  useEffect(() => {
    frameRefs.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        mesh.material = frameMaterial
      }
    })
  }, [frameMaterial])

  useEffect(() => {
    fabricRefs.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        mesh.material = config.fabricType === "leather" ? leatherMaterial : fabricMaterial
      }
    })
  }, [fabricMaterial, leatherMaterial, config.fabricType])

  // Subtle premium animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.008
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.002 - 0.5
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

  const renderPremiumChair = () => (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.5, 0]}>
      {/* Main Seat Cushion with rounded edges */}
      <mesh position={[0, 0.05, 0.1]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[1.6, 0.25, 1.4]} />
        <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
      </mesh>

      {/* Seat Base Support */}
      <mesh position={[0, -0.1, 0.1]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.7, 0.08, 1.5]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Backrest with ergonomic curve */}
      <mesh position={[0, 0.9, -0.65]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[1.6, 1.3, 0.2]} />
        <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
      </mesh>

      {/* Backrest Frame */}
      <mesh position={[0, 0.9, -0.75]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.7, 1.4, 0.06]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Premium Legs with tapered design */}
      {[
        { pos: [-0.75, -0.45, 0.6], rotation: [0, 0, 0.02] },
        { pos: [0.75, -0.45, 0.6], rotation: [0, 0, -0.02] },
        { pos: [-0.75, -0.45, -0.6], rotation: [0, 0, 0.02] },
        { pos: [0.75, -0.45, -0.6], rotation: [0, 0, -0.02] },
      ].map((leg, index) => (
        <mesh
          key={`leg-${index}`}
          position={leg.pos as [number, number, number]}
          rotation={leg.rotation as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToFrameRefs}
        >
          <cylinderGeometry args={[0.04, 0.06, 0.85, 8]} />
          <primitive object={frameMaterial} />
        </mesh>
      ))}

      {/* Armrests with curved design */}
      <mesh position={[-0.8, 0.35, 0.15]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[0.18, 0.12, 0.9]} />
        <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
      </mesh>

      <mesh position={[0.8, 0.35, 0.15]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[0.18, 0.12, 0.9]} />
        <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
      </mesh>

      {/* Armrest Supports */}
      <mesh position={[-0.8, 0.18, 0.55]} castShadow receiveShadow ref={addToFrameRefs}>
        <cylinderGeometry args={[0.04, 0.05, 0.35, 8]} />
        <primitive object={frameMaterial} />
      </mesh>

      <mesh position={[0.8, 0.18, 0.55]} castShadow receiveShadow ref={addToFrameRefs}>
        <cylinderGeometry args={[0.04, 0.05, 0.35, 8]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Cross Supports for stability */}
      <mesh position={[0, -0.25, 0.6]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.4, 0.06, 0.06]} />
        <primitive object={frameMaterial} />
      </mesh>

      <mesh position={[0, -0.25, -0.6]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.4, 0.06, 0.06]} />
        <primitive object={frameMaterial} />
      </mesh>
    </group>
  )

  const renderLuxurySofa = () => (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.5, 0]}>
      {/* Main Seat Cushions */}
      {[-1.1, 0, 1.1].map((x, index) => (
        <mesh key={`seat-${index}`} position={[x, 0.1, 0.1]} castShadow receiveShadow ref={addToFabricRefs}>
          <boxGeometry args={[0.9, 0.3, 1.4]} />
          <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
        </mesh>
      ))}

      {/* Seat Base */}
      <mesh position={[0, -0.1, 0.1]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[3.4, 0.12, 1.6]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Backrest Cushions */}
      {[-1.1, 0, 1.1].map((x, index) => (
        <mesh key={`back-${index}`} position={[x, 0.85, -0.7]} castShadow receiveShadow ref={addToFabricRefs}>
          <boxGeometry args={[0.9, 1.2, 0.25]} />
          <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
        </mesh>
      ))}

      {/* Backrest Frame */}
      <mesh position={[0, 0.85, -0.82]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[3.4, 1.3, 0.08]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Curved Armrests */}
      <mesh position={[-1.6, 0.55, 0.1]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[0.25, 0.8, 1.4]} />
        <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
      </mesh>

      <mesh position={[1.6, 0.55, 0.1]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[0.25, 0.8, 1.4]} />
        <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
      </mesh>

      {/* Premium Legs */}
      {[
        [-1.4, -0.5, 0.6],
        [1.4, -0.5, 0.6],
        [-1.4, -0.5, -0.6],
        [1.4, -0.5, -0.6],
      ].map((pos, index) => (
        <mesh
          key={`sofa-leg-${index}`}
          position={pos as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToFrameRefs}
        >
          <cylinderGeometry args={[0.05, 0.07, 0.7, 8]} />
          <primitive object={frameMaterial} />
        </mesh>
      ))}

      {/* Decorative Piping */}
      <mesh position={[0, 0.25, 0.8]} castShadow receiveShadow ref={addToFrameRefs}>
        <cylinderGeometry args={[0.02, 0.02, 3.2, 8]} />
        <primitive object={frameMaterial} />
      </mesh>
    </group>
  )

  const renderElegantTable = () => (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.8, 0]}>
      {/* Table Top with beveled edges */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[2.2, 0.08, 1.3]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Table Top Bevel */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[2.1, 0.04, 1.2]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Elegant Curved Legs */}
      {[
        { pos: [-0.9, -0.15, 0.5], rotation: [0, 0, 0.05] },
        { pos: [0.9, -0.15, 0.5], rotation: [0, 0, -0.05] },
        { pos: [-0.9, -0.15, -0.5], rotation: [0, 0, 0.05] },
        { pos: [0.9, -0.15, -0.5], rotation: [0, 0, -0.05] },
      ].map((leg, index) => (
        <mesh
          key={`table-leg-${index}`}
          position={leg.pos as [number, number, number]}
          rotation={leg.rotation as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToFrameRefs}
        >
          <cylinderGeometry args={[0.03, 0.05, 1.15, 8]} />
          <primitive object={frameMaterial} />
        </mesh>
      ))}

      {/* Cross Braces for stability */}
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.6, 0.04, 0.04]} />
        <primitive object={frameMaterial} />
      </mesh>

      <mesh position={[0, -0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.8, 0.04, 0.04]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Decorative Center Support */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <cylinderGeometry args={[0.08, 0.06, 0.4, 8]} />
        <primitive object={frameMaterial} />
      </mesh>
    </group>
  )

  const renderModernBookshelf = () => (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.8, 0]}>
      {/* Back Panel */}
      <mesh position={[0, 1.1, -0.38]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.8, 2.2, 0.04]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Side Panels with thickness */}
      <mesh position={[-0.88, 1.1, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.04, 2.2, 0.8]} />
        <primitive object={frameMaterial} />
      </mesh>

      <mesh position={[0.88, 1.1, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.04, 2.2, 0.8]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Top and Bottom Panels */}
      <mesh position={[0, 2.18, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.8, 0.04, 0.8]} />
        <primitive object={frameMaterial} />
      </mesh>

      <mesh position={[0, 0.02, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.8, 0.04, 0.8]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Adjustable Shelves with proper thickness */}
      {[0.6, 1.1, 1.6].map((y, index) => (
        <mesh key={`shelf-${index}`} position={[0, y, 0]} castShadow receiveShadow ref={addToFrameRefs}>
          <boxGeometry args={[1.72, 0.06, 0.72]} />
          <primitive object={frameMaterial} />
        </mesh>
      ))}

      {/* Shelf Support Pins */}
      {[0.6, 1.1, 1.6].map((y) =>
        [-0.7, 0.7].map((x, xIndex) => (
          <mesh key={`pin-${y}-${xIndex}`} position={[x, y - 0.03, 0.35]} castShadow receiveShadow ref={addToFrameRefs}>
            <cylinderGeometry args={[0.008, 0.008, 0.04, 6]} />
            <primitive object={frameMaterial} />
          </mesh>
        )),
      )}

      {/* Base with slight elevation */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.9, 0.1, 0.85]} />
        <primitive object={frameMaterial} />
      </mesh>
    </group>
  )

  const renderPremiumOttoman = () => (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.8, 0]}>
      {/* Main Cushion with button tufting effect */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow ref={addToFabricRefs}>
        <cylinderGeometry args={[0.55, 0.55, 0.35, 16]} />
        <primitive object={config.fabricType === "leather" ? leatherMaterial : fabricMaterial} />
      </mesh>

      {/* Button Tufting Centers */}
      {[
        [0, 0.42, 0],
        [-0.2, 0.42, -0.2],
        [0.2, 0.42, -0.2],
        [-0.2, 0.42, 0.2],
        [0.2, 0.42, 0.2],
      ].map((pos, index) => (
        <mesh
          key={`tuft-${index}`}
          position={pos as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToFrameRefs}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <primitive object={frameMaterial} />
        </mesh>
      ))}

      {/* Base Structure */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <cylinderGeometry args={[0.5, 0.52, 0.1, 16]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Elegant Legs with brass finish */}
      {[
        { pos: [-0.35, -0.35, 0.35], rotation: [0, 0, 0.1] },
        { pos: [0.35, -0.35, 0.35], rotation: [0, 0, -0.1] },
        { pos: [-0.35, -0.35, -0.35], rotation: [0, 0, 0.1] },
        { pos: [0.35, -0.35, -0.35], rotation: [0, 0, -0.1] },
      ].map((leg, index) => (
        <mesh
          key={`ottoman-leg-${index}`}
          position={leg.pos as [number, number, number]}
          rotation={leg.rotation as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToFrameRefs}
        >
          <cylinderGeometry args={[0.015, 0.025, 0.6, 8]} />
          <primitive object={frameMaterial} />
        </mesh>
      ))}

      {/* Decorative Piping around base */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <torusGeometry args={[0.52, 0.015, 8, 32]} />
        <primitive object={frameMaterial} />
      </mesh>
    </group>
  )

  const renderItem = () => {
    switch (item) {
      case "chair":
        return renderPremiumChair()
      case "sofa":
        return renderLuxurySofa()
      case "table":
        return renderElegantTable()
      case "bookshelf":
        return renderModernBookshelf()
      case "ottoman":
        return renderPremiumOttoman()
      default:
        return renderPremiumChair()
    }
  }

  return renderItem()
}

function getWoodRoughness(woodType: string): number {
  switch (woodType) {
    case "oak":
      return 0.7
    case "walnut":
      return 0.5
    case "mahogany":
      return 0.3
    case "cherry":
      return 0.4
    case "teak":
      return 0.25
    default:
      return 0.6
  }
}

function getWoodMetalness(woodType: string): number {
  switch (woodType) {
    case "teak":
      return 0.15
    case "mahogany":
      return 0.12
    case "cherry":
      return 0.1
    case "walnut":
      return 0.08
    case "oak":
      return 0.05
    default:
      return 0.08
  }
}

function getFabricRoughness(fabricType: string): number {
  switch (fabricType) {
    case "leather":
      return 0.4
    case "silk":
      return 0.1
    case "velvet":
      return 0.9
    case "linen":
      return 0.8
    case "cotton":
      return 0.7
    default:
      return 0.6
  }
}

function getFabricBumpScale(fabricType: string): number {
  switch (fabricType) {
    case "velvet":
      return 0.05
    case "linen":
      return 0.03
    case "cotton":
      return 0.02
    case "leather":
      return 0.01
    case "silk":
      return 0.005
    default:
      return 0.02
  }
}
