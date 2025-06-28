"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { type Mesh, MeshStandardMaterial, type Group, DoubleSide } from "three"
import type { FurnitureConfig, FurnitureItem } from "@/app/page"

interface DubaiFurnitureModelProps {
  config: FurnitureConfig
  item: FurnitureItem
}

export function DubaiFurnitureModel({ config, item }: DubaiFurnitureModelProps) {
  const groupRef = useRef<Group>(null)
  const frameRefs = useRef<Mesh[]>([])
  const fabricRefs = useRef<Mesh[]>([])

  // Clear refs when item changes
  useEffect(() => {
    frameRefs.current = []
    fabricRefs.current = []
  }, [item])

  // Enhanced scale proportions for realistic sizing
  const scale = useMemo(() => {
    const itemScales = {
      chair: { small: 0.85, medium: 1.0, large: 1.15 },
      sofa: { small: 0.8, medium: 1.0, large: 1.2 },
      table: { small: 0.82, medium: 1.0, large: 1.18 },
      bookshelf: { small: 0.88, medium: 1.0, large: 1.12 },
      stool: { small: 0.9, medium: 1.0, large: 1.1 },
    }
    return itemScales[item][config.size]
  }, [config.size, item])

  // Premium Dubai materials with enhanced properties
  const luxuryFrameMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: config.frameColor,
      roughness: getDubaiWoodRoughness(config.woodType),
      metalness: getDubaiWoodMetalness(config.woodType),
      envMapIntensity: 2.5,
      clearcoat: getDubaiWoodClearcoat(config.woodType),
      clearcoatRoughness: 0.03,
      normalScale: [0.5, 0.5],
    })
  }, [config.frameColor, config.woodType])

  const luxuryFabricMaterial = useMemo(() => {
    const isLeather = config.fabricType === "leather"
    return new MeshStandardMaterial({
      color: config.fabricColor,
      roughness: getDubaiFabricRoughness(config.fabricType),
      metalness: isLeather ? 0.1 : 0.0,
      envMapIntensity: isLeather ? 2.0 : 1.2,
      clearcoat: isLeather ? 0.5 : 0.0,
      clearcoatRoughness: isLeather ? 0.1 : 0.0,
      bumpScale: getDubaiFabricBump(config.fabricType),
      side: DoubleSide,
    })
  }, [config.fabricColor, config.fabricType])

  // Premium gold accent material
  const goldAccentMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: "#FFD700",
      roughness: 0.08,
      metalness: 0.98,
      envMapIntensity: 3.5,
      clearcoat: 0.95,
      clearcoatRoughness: 0.02,
    })
  }, [])

  // Brass hardware material
  const brassHardwareMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: "#B8860B",
      roughness: 0.15,
      metalness: 0.9,
      envMapIntensity: 2.8,
      clearcoat: 0.8,
      clearcoatRoughness: 0.05,
    })
  }, [])

  // Update materials
  useEffect(() => {
    frameRefs.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        mesh.material = luxuryFrameMaterial
      }
    })
  }, [luxuryFrameMaterial])

  useEffect(() => {
    fabricRefs.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        mesh.material = luxuryFabricMaterial
      }
    })
  }, [luxuryFabricMaterial])

  // Subtle luxury showcase animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = Math.sin(time * 0.03) * 0.002
      groupRef.current.position.y = Math.sin(time * 0.05) * 0.001 - 0.5
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

  const addToGoldRefs = (ref: Mesh | null) => {
    if (ref && ref.material) {
      ref.material = goldAccentMaterial
    }
  }

  const addToBrassRefs = (ref: Mesh | null) => {
    if (ref && ref.material) {
      ref.material = brassHardwareMaterial
    }
  }

  // Authentic Majlis Sofa - Traditional Arabic seating
  const renderMajlisSofa = () => (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={[scale, scale, scale]}>
      {/* Low-profile base characteristic of majlis seating */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[4.2, 0.15, 2.0]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Main seating cushions - wider and lower for floor seating style */}
      {[-1.4, -0.35, 0.35, 1.4].map((x, index) => (
        <mesh key={`majlis-seat-${index}`} position={[x, 0.25, 0.1]} castShadow receiveShadow ref={addToFabricRefs}>
          <boxGeometry args={[0.85, 0.25, 1.8]} />
          <primitive object={luxuryFabricMaterial} />
        </mesh>
      ))}

      {/* Traditional low backrest with ornate design */}
      {[-1.4, -0.35, 0.35, 1.4].map((x, index) => (
        <mesh key={`majlis-back-${index}`} position={[x, 0.65, -0.85]} castShadow receiveShadow ref={addToFabricRefs}>
          <boxGeometry args={[0.85, 0.8, 0.25]} />
          <primitive object={luxuryFabricMaterial} />
        </mesh>
      ))}

      {/* Ornate wooden frame with Islamic geometric patterns */}
      <mesh position={[0, 0.65, -0.98]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[4.2, 0.85, 0.1]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Traditional carved side panels */}
      <mesh position={[-2.0, 0.45, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.15, 0.9, 2.0]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      <mesh position={[2.0, 0.45, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.15, 0.9, 2.0]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Decorative brass inlays on frame */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, index) => (
        <mesh key={`brass-inlay-${index}`} position={[x, 0.65, -0.93]} castShadow receiveShadow ref={addToBrassRefs}>
          <boxGeometry args={[0.6, 0.08, 0.02]} />
          <primitive object={brassHardwareMaterial} />
        </mesh>
      ))}

      {/* Traditional majlis legs - short and sturdy */}
      {[
        [-1.8, -0.35, 0.8],
        [1.8, -0.35, 0.8],
        [-1.8, -0.35, -0.8],
        [1.8, -0.35, -0.8],
      ].map((pos, index) => (
        <group key={`majlis-leg-${index}`}>
          <mesh position={pos as [number, number, number]} castShadow receiveShadow ref={addToFrameRefs}>
            <cylinderGeometry args={[0.08, 0.1, 0.6, 12]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>
          <mesh position={[pos[0], pos[1] - 0.32, pos[2]]} castShadow receiveShadow ref={addToBrassRefs}>
            <cylinderGeometry args={[0.085, 0.085, 0.04, 12]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>
        </group>
      ))}

      {/* Traditional throw pillows */}
      {[-1.0, 0, 1.0].map((x, index) => (
        <mesh key={`pillow-${index}`} position={[x, 0.45, -0.3]} castShadow receiveShadow ref={addToFabricRefs}>
          <boxGeometry args={[0.4, 0.15, 0.4]} />
          <primitive object={luxuryFabricMaterial} />
        </mesh>
      ))}

      {/* Decorative tassels on pillows */}
      {[-1.0, 0, 1.0].map((x, index) => (
        <mesh key={`tassel-${index}`} position={[x, 0.38, -0.1]} castShadow receiveShadow ref={addToGoldRefs}>
          <cylinderGeometry args={[0.01, 0.02, 0.08, 8]} />
          <primitive object={goldAccentMaterial} />
        </mesh>
      ))}
    </group>
  )

  // Realistic Heritage Coffee Table - Enhanced design
  const renderRealisticHeritageTable = () => (
    <group ref={groupRef} position={[0, -0.8, 0]} scale={[scale, scale, scale]}>
      {/* Main table top with realistic thickness and edge detail */}
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[3.5, 0.12, 2.0]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Rounded edge molding */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[3.4, 0.04, 1.9]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Decorative edge trim */}
      <mesh position={[0, 0.585, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[3.45, 0.01, 1.95]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Central ornate medallion with detailed pattern */}
      <mesh position={[0, 0.595, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <cylinderGeometry args={[0.35, 0.35, 0.015, 24]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Inner decorative rings */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <torusGeometry args={[0.25, 0.02, 8, 24]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[0, 0.6, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <torusGeometry args={[0.15, 0.015, 8, 24]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Radiating decorative spokes */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 12
        return (
          <mesh
            key={`spoke-${i}`}
            position={[Math.cos(angle) * 0.2, 0.595, Math.sin(angle) * 0.2]}
            rotation={[0, angle, 0]}
            castShadow
            receiveShadow
            ref={addToBrassRefs}
          >
            <boxGeometry args={[0.15, 0.01, 0.02]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>
        )
      })}

      {/* Corner decorative elements */}
      {[
        [-1.5, 0.595, -0.8],
        [1.5, 0.595, -0.8],
        [-1.5, 0.595, 0.8],
        [1.5, 0.595, 0.8],
      ].map((pos, index) => (
        <mesh
          key={`corner-ornament-${index}`}
          position={pos as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToBrassRefs}
        >
          <cylinderGeometry args={[0.08, 0.08, 0.01, 8]} />
          <primitive object={brassHardwareMaterial} />
        </mesh>
      ))}

      {/* Decorative border inlay */}
      <mesh position={[0, 0.595, -0.9]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[3.2, 0.01, 0.03]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[0, 0.595, 0.9]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[3.2, 0.01, 0.03]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[-1.65, 0.595, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[0.03, 0.01, 1.6]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[1.65, 0.595, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[0.03, 0.01, 1.6]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Realistic carved apron with depth */}
      <mesh position={[0, 0.35, 0.95]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[3.2, 0.3, 0.1]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      <mesh position={[0, 0.35, -0.95]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[3.2, 0.3, 0.1]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      <mesh position={[1.7, 0.35, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.1, 0.3, 1.8]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      <mesh position={[-1.7, 0.35, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.1, 0.3, 1.8]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Carved relief details on apron */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, index) => (
        <mesh key={`apron-carving-${index}`} position={[x, 0.35, 1.0]} castShadow receiveShadow ref={addToBrassRefs}>
          <boxGeometry args={[0.2, 0.1, 0.02]} />
          <primitive object={brassHardwareMaterial} />
        </mesh>
      ))}

      {/*0.1,0.02]} />
          <primitive object={brassHardwareMaterial} />
        </mesh>
      ))}

      {/* Realistic turned legs with detailed profiles */}
      {[
        [-1.4, -0.05, 0.8],
        [1.4, -0.05, 0.8],
        [-1.4, -0.05, -0.8],
        [1.4, -0.05, -0.8],
      ].map((pos, index) => (
        <group key={`realistic-leg-${index}`}>
          {/* Main leg shaft with realistic taper */}
          <mesh position={pos as [number, number, number]} castShadow receiveShadow ref={addToFrameRefs}>
            <cylinderGeometry args={[0.05, 0.08, 1.2, 24]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>

          {/* Upper decorative bulb */}
          <mesh position={[pos[0], pos[1] + 0.5, pos[2]]} castShadow receiveShadow ref={addToFrameRefs}>
            <sphereGeometry args={[0.09, 20, 20]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>

          {/* Mid section with rings */}
          <mesh position={[pos[0], pos[1] + 0.2, pos[2]]} castShadow receiveShadow ref={addToFrameRefs}>
            <cylinderGeometry args={[0.075, 0.075, 0.06, 24]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>

          <mesh position={[pos[0], pos[1], pos[2]]} castShadow receiveShadow ref={addToFrameRefs}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>

          {/* Lower decorative section */}
          <mesh position={[pos[0], pos[1] - 0.3, pos[2]]} castShadow receiveShadow ref={addToFrameRefs}>
            <sphereGeometry args={[0.07, 20, 20]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>

          {/* Brass accent rings */}
          <mesh position={[pos[0], pos[1] + 0.4, pos[2]]} castShadow receiveShadow ref={addToBrassRefs}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 24]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>

          <mesh position={[pos[0], pos[1] + 0.1, pos[2]]} castShadow receiveShadow ref={addToBrassRefs}>
            <cylinderGeometry args={[0.065, 0.065, 0.025, 24]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>

          <mesh position={[pos[0], pos[1] - 0.2, pos[2]]} castShadow receiveShadow ref={addToBrassRefs}>
            <cylinderGeometry args={[0.06, 0.06, 0.02, 24]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>

          {/* Ornate foot with brass cap */}
          <mesh position={[pos[0], pos[1] - 0.62, pos[2]]} castShadow receiveShadow ref={addToBrassRefs}>
            <cylinderGeometry args={[0.09, 0.09, 0.04, 24]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>

          {/* Decorative foot ring */}
          <mesh position={[pos[0], pos[1] - 0.64, pos[2]]} castShadow receiveShadow ref={addToGoldRefs}>
            <torusGeometry args={[0.08, 0.01, 8, 24]} />
            <primitive object={goldAccentMaterial} />
          </mesh>
        </group>
      ))}

      {/* Enhanced stretcher system with ornate center */}
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[2.4, 0.1, 0.1]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      <mesh position={[0, -0.25, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.4, 0.1, 0.1]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Central ornate medallion on stretcher */}
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Decorative rosettes at stretcher joints */}
      {[
        [-1.0, -0.25, 0],
        [1.0, -0.25, 0],
        [0, -0.25, -0.6],
        [0, -0.25, 0.6],
      ].map((pos, index) => (
        <mesh
          key={`stretcher-rosette-${index}`}
          position={pos as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToBrassRefs}
        >
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <primitive object={brassHardwareMaterial} />
        </mesh>
      ))}

      {/* Lower shelf with realistic proportions */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[2.8, 0.06, 1.6]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Shelf edge molding */}
      <mesh position={[0, -0.47, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[2.75, 0.02, 1.55]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Brass trim around lower shelf */}
      <mesh position={[0, -0.44, 0.78]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[2.8, 0.01, 0.02]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[0, -0.44, -0.78]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[2.8, 0.01, 0.02]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[1.38, -0.44, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[0.02, 0.01, 1.6]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[-1.38, -0.44, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[0.02, 0.01, 1.6]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Decorative inlay pattern on shelf */}
      <mesh position={[0, -0.435, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[2.2, 0.005, 0.03]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[0, -0.435, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[1.2, 0.005, 0.03]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Corner shelf supports */}
      {[
        [-1.2, -0.375, 0.6],
        [1.2, -0.375, 0.6],
        [-1.2, -0.375, -0.6],
        [1.2, -0.375, -0.6],
      ].map((pos, index) => (
        <mesh
          key={`shelf-support-${index}`}
          position={pos as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToBrassRefs}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.15, 12]} />
          <primitive object={brassHardwareMaterial} />
        </mesh>
      ))}
    </group>
  )

  // Executive Bookshelf - Professional luxury design
  const renderExecutiveBookshelf = () => (
    <group ref={groupRef} position={[0, -0.8, 0]} scale={[scale, scale, scale]}>
      {/* Solid back panel with executive finish */}
      <mesh position={[0, 1.2, -0.4]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[2.0, 2.4, 0.08]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Executive side panels with thickness */}
      <mesh position={[-0.96, 1.2, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.08, 2.4, 0.8]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      <mesh position={[0.96, 1.2, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.08, 2.4, 0.8]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Crown molding top */}
      <mesh position={[0, 2.38, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[2.16, 0.12, 0.88]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Decorative crown detail */}
      <mesh position={[0, 2.45, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[2.0, 0.04, 0.04]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Executive base with toe kick */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[2.0, 0.16, 0.8]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Adjustable shelves with executive edge banding */}
      {[0.7, 1.2, 1.7, 2.1].map((y, index) => (
        <group key={`exec-shelf-${index}`}>
          <mesh position={[0, y, 0]} castShadow receiveShadow ref={addToFrameRefs}>
            <boxGeometry args={[1.84, 0.08, 0.72]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>
          {/* Brass edge trim */}
          <mesh position={[0, y + 0.04, 0.36]} castShadow receiveShadow ref={addToBrassRefs}>
            <boxGeometry args={[1.8, 0.01, 0.02]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>
        </group>
      ))}

      {/* Executive shelf support pins */}
      {[0.7, 1.2, 1.7, 2.1].map((y) =>
        [-0.75, 0.75].map((x, xIndex) => (
          <mesh
            key={`exec-pin-${y}-${xIndex}`}
            position={[x, y - 0.04, 0.35]}
            castShadow
            receiveShadow
            ref={addToBrassRefs}
          >
            <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>
        )),
      )}

      {/* Executive cabinet doors (lower section) */}
      <mesh position={[-0.45, 0.35, 0.38]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.82, 0.5, 0.04]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      <mesh position={[0.45, 0.35, 0.38]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[0.82, 0.5, 0.04]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Executive door handles */}
      <mesh position={[-0.65, 0.35, 0.42]} castShadow receiveShadow ref={addToBrassRefs}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      <mesh position={[0.65, 0.35, 0.42]} castShadow receiveShadow ref={addToBrassRefs}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Executive lighting strip */}
      <mesh position={[0, 2.25, 0.3]} castShadow receiveShadow ref={addToBrassRefs}>
        <boxGeometry args={[1.8, 0.02, 0.04]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Executive base legs */}
      {[
        [-0.8, -0.05, 0.3],
        [0.8, -0.05, 0.3],
        [-0.8, -0.05, -0.3],
        [0.8, -0.05, -0.3],
      ].map((pos, index) => (
        <mesh
          key={`exec-base-${index}`}
          position={pos as [number, number, number]}
          castShadow
          receiveShadow
          ref={addToBrassRefs}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
          <primitive object={brassHardwareMaterial} />
        </mesh>
      ))}
    </group>
  )

  // Designer Stool - Modern minimalist design
  const renderDesignerStool = () => (
    <group ref={groupRef} position={[0, -0.8, 0]} scale={[scale, scale, scale]}>
      {/* Main seat cushion with modern proportions */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow ref={addToFabricRefs}>
        <cylinderGeometry args={[0.45, 0.45, 0.15, 32]} />
        <primitive object={luxuryFabricMaterial} />
      </mesh>

      {/* Seat base structure */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <cylinderGeometry args={[0.42, 0.42, 0.05, 32]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Modern tapered legs */}
      {[
        { pos: [-0.3, -0.15, 0.3], rotation: [0, 0, 0.05] },
        { pos: [0.3, -0.15, 0.3], rotation: [0, 0, -0.05] },
        { pos: [-0.3, -0.15, -0.3], rotation: [0, 0, 0.05] },
        { pos: [0.3, -0.15, -0.3], rotation: [0, 0, -0.05] },
      ].map((leg, index) => (
        <group key={`stool-leg-${index}`}>
          {/* Main leg with modern taper */}
          <mesh
            position={leg.pos as [number, number, number]}
            rotation={leg.rotation as [number, number, number]}
            castShadow
            receiveShadow
            ref={addToFrameRefs}
          >
            <cylinderGeometry args={[0.02, 0.035, 0.8, 16]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>

          {/* Brass foot cap */}
          <mesh position={[leg.pos[0], leg.pos[1] - 0.42, leg.pos[2]]} castShadow receiveShadow ref={addToBrassRefs}>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>

          {/* Mid-leg accent ring */}
          <mesh position={[leg.pos[0], leg.pos[1] + 0.1, leg.pos[2]]} castShadow receiveShadow ref={addToBrassRefs}>
            <cylinderGeometry args={[0.022, 0.022, 0.015, 16]} />
            <primitive object={brassHardwareMaterial} />
          </mesh>
        </group>
      ))}

      {/* Cross braces for stability */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <torusGeometry args={[0.35, 0.015, 8, 32]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Central support column */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow ref={addToFrameRefs}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Decorative brass accent on seat edge */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <torusGeometry args={[0.44, 0.01, 8, 32]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>

      {/* Modern footrest ring */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow ref={addToBrassRefs}>
        <torusGeometry args={[0.25, 0.02, 8, 32]} />
        <primitive object={brassHardwareMaterial} />
      </mesh>
    </group>
  )

  // Royal Armchair - Enhanced luxury design
  const renderRoyalArmchair = () => (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={[scale, scale, scale]}>
      {/* Luxurious seat with royal proportions */}
      <mesh position={[0, 0.18, 0.1]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[1.75, 0.32, 1.55]} />
        <primitive object={luxuryFabricMaterial} />
      </mesh>

      {/* Royal seat frame */}
      <mesh position={[0, 0.0, 0.1]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.8, 0.14, 1.6]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* High royal backrest */}
      <mesh position={[0, 1.05, -0.58]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[1.75, 1.5, 0.28]} />
        <primitive object={luxuryFabricMaterial} />
      </mesh>

      {/* Ornate backrest frame */}
      <mesh position={[0, 1.05, -0.72]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.8, 1.55, 0.12]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      {/* Royal crown detail on backrest */}
      <mesh position={[0, 1.7, -0.66]} castShadow receiveShadow ref={addToGoldRefs}>
        <boxGeometry args={[0.8, 0.15, 0.04]} />
        <primitive object={goldAccentMaterial} />
      </mesh>

      {/* Carved royal legs */}
      {[
        { pos: [-0.82, -0.38, 0.7], rotation: [0, 0, 0.02] },
        { pos: [0.82, -0.38, 0.7], rotation: [0, 0, -0.02] },
        { pos: [-0.82, -0.38, -0.7], rotation: [0, 0, 0.02] },
        { pos: [0.82, -0.38, -0.7], rotation: [0, 0, -0.02] },
      ].map((leg, index) => (
        <group key={`royal-leg-${index}`}>
          <mesh
            position={leg.pos as [number, number, number]}
            rotation={leg.rotation as [number, number, number]}
            castShadow
            receiveShadow
            ref={addToFrameRefs}
          >
            <cylinderGeometry args={[0.055, 0.075, 0.95, 16]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>
          <mesh position={[leg.pos[0], leg.pos[1] - 0.5, leg.pos[2]]} castShadow receiveShadow ref={addToGoldRefs}>
            <cylinderGeometry args={[0.058, 0.058, 0.04, 16]} />
            <primitive object={goldAccentMaterial} />
          </mesh>
        </group>
      ))}

      {/* Royal armrests with carved details */}
      <mesh position={[-0.88, 0.42, 0.15]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[0.24, 0.18, 1.05]} />
        <primitive object={luxuryFabricMaterial} />
      </mesh>

      <mesh position={[0.88, 0.42, 0.15]} castShadow receiveShadow ref={addToFabricRefs}>
        <boxGeometry args={[0.24, 0.18, 1.05]} />
        <primitive object={luxuryFabricMaterial} />
      </mesh>

      {/* Armrest supports with gold accents */}
      {[-0.88, 0.88].map((x, index) => (
        <group key={`royal-armrest-${index}`}>
          <mesh position={[x, 0.24, 0.65]} castShadow receiveShadow ref={addToFrameRefs}>
            <cylinderGeometry args={[0.048, 0.058, 0.42, 12]} />
            <primitive object={luxuryFrameMaterial} />
          </mesh>
          <mesh position={[x, 0.37, 0.65]} castShadow receiveShadow ref={addToGoldRefs}>
            <cylinderGeometry args={[0.032, 0.032, 0.1, 12]} />
            <primitive object={goldAccentMaterial} />
          </mesh>
        </group>
      ))}

      {/* Royal structural supports */}
      <mesh position={[0, -0.18, 0.7]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.5, 0.12, 0.12]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>

      <mesh position={[0, -0.18, -0.7]} castShadow receiveShadow ref={addToFrameRefs}>
        <boxGeometry args={[1.5, 0.12, 0.12]} />
        <primitive object={luxuryFrameMaterial} />
      </mesh>
    </group>
  )

  const renderItem = () => {
    switch (item) {
      case "chair":
        return renderRoyalArmchair()
      case "sofa":
        return renderMajlisSofa()
      case "table":
        return renderRealisticHeritageTable()
      case "bookshelf":
        return renderExecutiveBookshelf()
      case "stool":
        return renderDesignerStool()
      default:
        return renderRoyalArmchair()
    }
  }

  return renderItem()
}

// Enhanced Dubai luxury material properties
function getDubaiWoodRoughness(woodType: string): number {
  const roughnessMap = {
    oak: 0.55,
    walnut: 0.3,
    mahogany: 0.18,
    cherry: 0.22,
    teak: 0.12,
  }
  return roughnessMap[woodType as keyof typeof roughnessMap] || 0.35
}

function getDubaiWoodMetalness(woodType: string): number {
  const metalnessMap = {
    teak: 0.28,
    mahogany: 0.22,
    cherry: 0.18,
    walnut: 0.15,
    oak: 0.08,
  }
  return metalnessMap[woodType as keyof typeof metalnessMap] || 0.12
}

function getDubaiWoodClearcoat(woodType: string): number {
  const clearcoatMap = {
    teak: 0.85,
    mahogany: 0.75,
    cherry: 0.65,
    walnut: 0.55,
    oak: 0.35,
  }
  return clearcoatMap[woodType as keyof typeof clearcoatMap] || 0.5
}

function getDubaiFabricRoughness(fabricType: string): number {
  const roughnessMap = {
    leather: 0.28,
    silk: 0.04,
    velvet: 0.92,
    linen: 0.82,
    cotton: 0.72,
  }
  return roughnessMap[fabricType as keyof typeof roughnessMap] || 0.5
}

function getDubaiFabricBump(fabricType: string): number {
  const bumpMap = {
    velvet: 0.15,
    linen: 0.1,
    cotton: 0.06,
    leather: 0.04,
    silk: 0.012,
  }
  return bumpMap[fabricType as keyof typeof bumpMap] || 0.04
}
