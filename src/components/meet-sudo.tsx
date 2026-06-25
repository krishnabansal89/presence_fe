"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Grid, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useIsClient } from "@/lib/use-is-client";
import SudoModel from "@/components/three/sudo-model";
import type { Mood } from "@/lib/sudo/face-engine";

type Fact = {
  num: string;
  label: string;
  body: string;
  mood: Mood;
};

const FACTS: Fact[] = [
  {
    num: "01",
    label: "It has a face, and moods.",
    body: "The face runs on an emotion engine, not a loop of canned clips. It blinks, looks around, and leans in when you're nearby.",
    mood: "curious",
  },
  {
    num: "02",
    label: "It runs dry.",
    body: "Sudo isn't a cheerful assistant. It's deadpan, a little judgmental, and it grows on you anyway.",
    mood: "smug",
  },
  {
    num: "03",
    label: "It notices you're there.",
    body: "Presence sensing and the wake word \"sudo.\" It clocks when you sit down, and when you've gone quiet at 2am.",
    mood: "skeptical",
  },
  {
    num: "04",
    label: "It remembers, on the device.",
    body: "Memory stays local. The longer it's on your desk, the more of it is specifically yours.",
    mood: "unimpressed",
  },
  {
    num: "05",
    label: "It talks.",
    body: "Full voice. Ask it something and it answers. No phone, no app sitting in the middle.",
    mood: "annoyed",
  },
];

const AUTO_CYCLE_MS = 3600;

/**
 * Meet Sudo — the real 3D model, interactive.
 *
 * The full GLB Sudo sits in a sticky canvas on the left. On the right,
 * compact fact cards. Hover a card and Sudo's expression changes to match
 * the fact's mood. When nothing is hovered, moods auto-cycle so the model
 * is never static. The head still follows the cursor with its organic delay.
 */
export default function MeetSudo() {
  const mounted = useIsClient();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [mood, setMood] = useState<Mood>("smug");
  const autoRef = useRef(0);

  // --- auto-cycle moods when nothing is hovered ---
  useEffect(() => {
    if (activeIdx !== null) return;

    const cycle = () => {
      const m = FACTS[autoRef.current % FACTS.length].mood;
      setMood(m);
      autoRef.current++;
    };

    cycle();
    const iv = setInterval(cycle, AUTO_CYCLE_MS);
    return () => clearInterval(iv);
  }, [activeIdx]);

  const activate = useCallback((idx: number) => {
    setActiveIdx(idx);
    setMood(FACTS[idx].mood);
  }, []);

  const deactivate = useCallback(() => {
    setActiveIdx(null);
  }, []);

  return (
    <div className="meet-sudo">
      {/* eyebrow + headline */}
      <div className="meet-sudo-head">
        <p className="mono-eyebrow text-mute">02 · meet sudo</p>
        <h2 className="editorial-headline mt-5 text-[clamp(2.2rem,5.5vw,4.25rem)] font-medium leading-[1.0] text-on-primary">
          It&apos;s a little bit alive. On purpose.
        </h2>
      </div>

      {/* 3D model + interactive facts */}
      <div className="meet-sudo-grid">
        {/* LEFT — real 3D Sudo, sticky */}
        <div className="meet-sudo-visual">
          <div className="meet-sudo-stage">
            <div className="meet-sudo-glow" aria-hidden />
            <span className="alive-live-pill">
              <span className="pulse-dot" />
              live
            </span>
            <div className="meet-sudo-mood-label">
              <span className="meet-sudo-mood-bracket">&lt;</span>
              {mood}
              <span className="meet-sudo-mood-bracket">/&gt;</span>
            </div>

            <div className="meet-sudo-canvas">
              {mounted ? (
                <Canvas
                  shadows
                  dpr={[1, 2]}
                  camera={{ position: [0, 1.2, 6.2], fov: 32 }}
                  gl={{
                    alpha: true,
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 0.72,
                  }}
                  style={{ background: "transparent" }}
                >
                  <ambientLight intensity={0.06} color="#fff1e6" />
                  <hemisphereLight args={["#fff4ec", "#080808", 0.18]} />
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
                  <directionalLight position={[-6, 4.5, -6]} intensity={1.3} color="#a9c2ff" />
                  <directionalLight position={[-4, 1.5, 5]} intensity={0.18} color="#d4dcff" />
                  <pointLight position={[0, -1.2, 3.2]} intensity={1.35} distance={5.5} decay={2} color="#f36458" />

                  <Environment resolution={256} frames={1} environmentIntensity={0.18}>
                    <Lightformer form="rect" intensity={0.55} color="#fff4ec" position={[0, 5, 3]} rotation={[-Math.PI / 2, 0, 0]} scale={[8, 8, 1]} />
                    <Lightformer form="rect" intensity={0.42} color="#f36458" position={[5, 1.5, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[4, 6, 1]} />
                    <Lightformer form="rect" intensity={0.5} color="#7fa0ff" position={[-5, 2, -2]} rotation={[0, Math.PI / 2, 0]} scale={[5, 6, 1]} />
                  </Environment>

                  <group position={[0, 0, 0]}>
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
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.505, 0]}>
                      <planeGeometry args={[18, 18]} />
                      <shadowMaterial color="#000000" opacity={0.32} />
                    </mesh>

                    <Suspense fallback={null}>
                      <SudoModel scale={0.92} mood={mood} />
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
        </div>

        {/* RIGHT — compact interactive fact cards */}
        <div className="meet-sudo-facts">
          {FACTS.map((fact, i) => (
            <button
              key={fact.num}
              className={`meet-fact-card${activeIdx === i ? " meet-fact-card-active" : ""}`}
              onMouseEnter={() => activate(i)}
              onMouseLeave={deactivate}
              onFocus={() => activate(i)}
              onBlur={deactivate}
              onClick={() => activate(i)}
              type="button"
            >
              <span className="meet-fact-num">{fact.num}</span>
              <div className="meet-fact-body">
                <p className="meet-fact-label">{fact.label}</p>
                <p className="meet-fact-text">{fact.body}</p>
              </div>
              <span className="meet-fact-mood">{fact.mood}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
