"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Grid, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useIsClient } from "@/lib/use-is-client";
import SudoModel from "./sudo-model";

/**
 * Hero 3D — Sudo lit like a product shot. A warm coral key light from the
 * upper right, a bright cool rim behind to carve the silhouette out of the
 * dark canvas, a soft fill, and a coral underglow that ties it to the brand.
 * Image-based lighting (Lightformers) adds gentle reflections on the cream
 * plastic. Filmic tone mapping keeps highlights from blowing out.
 */
export default function HeroModel() {
  const mounted = useIsClient();

  return (
    <div className="hero-3d" aria-label="Sudo desk creature 3D model" role="img">
      <div className="hero-3d-spotlight" aria-hidden />
      <div className="hero-3d-canvas hero-3d-canvas-large">
        {mounted ? (
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 1.35, 6.6], fov: 30 }}
            gl={{
              alpha: true,
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 0.72,
            }}
            style={{ background: "transparent" }}
          >
            {/* Very low ambient. Product form should come from key/rim/shadow. */}
            <ambientLight intensity={0.06} color="#fff1e6" />
            <hemisphereLight args={["#fff4ec", "#080808", 0.18]} />

            {/* KEY — warm coral, upper right, the only shadow caster */}
            <directionalLight
              position={[5.5, 7, 4.5]}
              intensity={1.25}
              color="#ffe0ca"
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-bias={-0.0002}
              shadow-normalBias={0.02}
            >
              <orthographicCamera
                attach="shadow-camera"
                args={[-5, 5, 5, -5, 0.1, 25]}
              />
            </directionalLight>

            {/* RIM — cool, from behind, separates Sudo from the dark bg */}
            <directionalLight
              position={[-6, 4.5, -6]}
              intensity={1.3}
              color="#a9c2ff"
            />

            {/* FILL — soft, front-left, lifts the shadow side a touch */}
            <directionalLight
              position={[-4, 1.5, 5]}
              intensity={0.18}
              color="#d4dcff"
            />

            {/* coral underglow tying the model to the brand atmosphere */}
            <pointLight
              position={[0, -1.2, 3.2]}
              intensity={1.35}
              distance={5.5}
              decay={2}
              color="#f36458"
            />

            {/* image-based lighting for reflections on the cream plastic */}
            <Environment resolution={256} frames={1} environmentIntensity={0.18}>
              <Lightformer
                form="rect"
                intensity={0.55}
                color="#fff4ec"
                position={[0, 5, 3]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[8, 8, 1]}
              />
              <Lightformer
                form="rect"
                intensity={0.42}
                color="#f36458"
                position={[5, 1.5, 2]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[4, 6, 1]}
              />
              <Lightformer
                form="rect"
                intensity={0.5}
                color="#7fa0ff"
                position={[-5, 2, -2]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[5, 6, 1]}
              />
            </Environment>

            <group position={[0.25, -0.04, 0]} rotation={[0, -0.16, 0]}>
              {/* The actual 3D wireframe desk Sudo sits on. This is inside the
                  same scene as the model so contact shadow + perspective line up. */}
              <Grid
                position={[0, -1.48, 0]}
                args={[18, 18]}
                cellSize={0.36}
                cellThickness={1.15}
                cellColor="#8a5a50"
                sectionSize={1.8}
                sectionThickness={1.8}
                sectionColor="#f36458"
                fadeDistance={11}
                fadeStrength={0.9}
                followCamera={false}
                infiniteGrid={false}
              />

              {/* Real shadow receiver below the wireframe desk. ShadowMaterial is
                  transparent except for the cast shadow, so the grid remains visible. */}
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.505, 0]}
              >
                <planeGeometry args={[18, 18]} />
                <shadowMaterial color="#000000" opacity={0.32} />
              </mesh>

              <Suspense fallback={null}>
                <SudoModel scale={1.02} />
              </Suspense>

              <ContactShadows
                position={[0, -1.42, 0]}
                opacity={0.86}
                scale={11}
                blur={2.7}
                far={4.5}
                resolution={1024}
                color="#000000"
              />
            </group>
          </Canvas>
        ) : (
          <div className="hero-3d-placeholder" aria-hidden />
        )}
      </div>
    </div>
  );
}
