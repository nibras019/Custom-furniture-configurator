"use client"

import { Environment, Lightformer, Sky } from "@react-three/drei"
import { Color } from "three"

interface PremiumEnvironmentProps {
  preset?: "studio" | "showroom" | "gallery" | "apartment"
}

export function PremiumEnvironment({ preset = "studio" }: PremiumEnvironmentProps) {
  const environmentConfigs = {
    studio: {
      background: new Color("#f8f9fa"),
      intensity: 1.0,
    },
    showroom: {
      background: new Color("#f5f5f5"),
      intensity: 1.2,
    },
    gallery: {
      background: new Color("#ffffff"),
      intensity: 0.8,
    },
    apartment: {
      background: new Color("#f0f2f5"),
      intensity: 1.1,
    },
  }

  const config = environmentConfigs[preset]

  return (
    <>
      {preset === "studio" && (
        <Environment resolution={2048} background={false}>
          {/* Key light from top-right */}
          <Lightformer
            intensity={3}
            color="#ffffff"
            position={[10, 10, 5]}
            rotation={[-Math.PI / 4, Math.PI / 4, 0]}
            scale={[8, 8, 1]}
            form="rect"
          />

          {/* Fill light from left */}
          <Lightformer
            intensity={1.5}
            color="#f8f9fa"
            position={[-8, 5, 2]}
            rotation={[0, Math.PI / 3, 0]}
            scale={[6, 6, 1]}
            form="rect"
          />

          {/* Rim light from behind */}
          <Lightformer
            intensity={2}
            color="#fff8e1"
            position={[0, 8, -10]}
            rotation={[Math.PI / 6, 0, 0]}
            scale={[10, 4, 1]}
            form="rect"
          />

          {/* Soft ambient from top */}
          <Lightformer
            intensity={0.8}
            color="#e3f2fd"
            position={[0, 15, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[15, 15, 1]}
            form="circle"
          />

          {/* Ground reflection */}
          <Lightformer
            intensity={0.4}
            color="#f5f5f5"
            position={[0, -5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[20, 20, 1]}
            form="rect"
          />
        </Environment>
      )}

      {preset === "showroom" && (
        <Environment resolution={2048} background={false}>
          {/* Showroom ceiling lights */}
          <Lightformer
            intensity={2.5}
            color="#ffffff"
            position={[0, 12, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[12, 12, 1]}
            form="rect"
          />

          {/* Wall wash lights */}
          <Lightformer
            intensity={1.2}
            color="#f0f4f8"
            position={[-10, 6, -8]}
            rotation={[0, Math.PI / 4, 0]}
            scale={[8, 8, 1]}
            form="rect"
          />

          <Lightformer
            intensity={1.2}
            color="#f0f4f8"
            position={[10, 6, -8]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={[8, 8, 1]}
            form="rect"
          />

          {/* Floor reflection */}
          <Lightformer
            intensity={0.6}
            color="#e8e8e8"
            position={[0, -2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[25, 25, 1]}
            form="rect"
          />
        </Environment>
      )}

      {preset === "gallery" && (
        <Environment resolution={2048} background={false}>
          {/* Gallery track lighting */}
          {[-4, 0, 4].map((x, index) => (
            <Lightformer
              key={`track-${index}`}
              intensity={1.8}
              color="#ffffff"
              position={[x, 8, 2]}
              rotation={[-Math.PI / 3, 0, 0]}
              scale={[3, 3, 1]}
              form="circle"
            />
          ))}

          {/* Wall illumination */}
          <Lightformer
            intensity={0.8}
            color="#f8f8f8"
            position={[0, 5, -12]}
            rotation={[0, 0, 0]}
            scale={[20, 8, 1]}
            form="rect"
          />

          {/* Soft overhead */}
          <Lightformer
            intensity={1.0}
            color="#fafafa"
            position={[0, 15, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[18, 18, 1]}
            form="rect"
          />
        </Environment>
      )}

      {preset === "apartment" && (
        <>
          <Sky sunPosition={[100, 20, 100]} />
          <Environment resolution={1024} background={false}>
            {/* Window light */}
            <Lightformer
              intensity={2.0}
              color="#fff8e1"
              position={[8, 6, 8]}
              rotation={[-Math.PI / 6, -Math.PI / 4, 0]}
              scale={[6, 8, 1]}
              form="rect"
            />

            {/* Room ambient */}
            <Lightformer
              intensity={0.6}
              color="#f5f5f5"
              position={[0, 8, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[12, 12, 1]}
              form="circle"
            />

            {/* Warm accent light */}
            <Lightformer
              intensity={0.8}
              color="#ffe0b3"
              position={[-6, 4, -6]}
              rotation={[0, Math.PI / 4, 0]}
              scale={[4, 4, 1]}
              form="circle"
            />
          </Environment>
        </>
      )}
    </>
  )
}
