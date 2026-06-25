"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useIsClient } from "@/lib/use-is-client";
import SudoModel from "./sudo-model";

const PHASES = ["idle", "attentive", "calm"] as const;

/**
 * Scroll-driven Sudo for the Meet-Sudo section. Uses the real GLB model with
 * the live face engine (breathing, blinking, gaze wander). The canvas is
 * sticky; scroll progress drives the phase label (idle -> attentive -> calm)
 * while the face engine keeps the creature alive on its own.
 */
export default function AliveModel() {
  const [phase, setPhase] = useState<(typeof PHASES)[number]>("idle");
  const mounted = useIsClient();

  useEffect(() => {
    const section = document.getElementById("alive");
    if (!section) return;

    let frame = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, rect.height - vh);
      const scrolled = Math.min(Math.max(0, -rect.top), total);
      const p = scrolled / total;

      const idx = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
      setPhase((cur) => (cur === PHASES[idx] ? cur : PHASES[idx]));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="alive-3d" aria-label="Sudo reacting in 3D" role="img">
      <div className="alive-3d-stage">
        <div className="alive-3d-glow" aria-hidden />

        <span className="alive-live-pill">
          <span className="pulse-dot" />
          live · sudo.live
        </span>
        <span className="alive-phase-pill">{phase}</span>

        <div className="alive-3d-canvas" style={{ minHeight: 560 }}>
          {mounted ? (
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 1.35, 6.6], fov: 30 }}
              gl={{ alpha: true, antialias: true }}
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={0.5} />
              <hemisphereLight args={["#fff4ec", "#0b0b0b", 0.55]} />
              <directionalLight position={[5, 7, 6]} intensity={1.5} color="#fff4ec" />
              <directionalLight position={[-6, 2, -3]} intensity={0.5} color="#9bb6ff" />
              <directionalLight position={[0, -3, 3]} intensity={0.4} color="#f36458" />

              <group position={[0, 0, 0]}>
                <Suspense fallback={null}>
                  <SudoModel scale={0.9} />
                </Suspense>
                <ContactShadows
                  position={[0, -1.5, 0]}
                  opacity={0.55}
                  scale={8}
                  blur={2.8}
                  far={4}
                  color="#000000"
                />
              </group>
            </Canvas>
          ) : (
            <div className="hero-3d-placeholder" aria-hidden />
          )}
        </div>

        <p className="alive-caption">scroll to see it react</p>
      </div>
    </div>
  );
}
