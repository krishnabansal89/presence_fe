"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SudoFace } from "./face-engine";

/**
 * Creates an offscreen 2D canvas, runs the SudoFace engine on it every frame,
 * and exposes it as a live THREE.CanvasTexture plus the face instance (so the
 * caller can feed it a gaze target).
 *
 * `width`/`height` should roughly match the screen aspect (face_screen is
 * 8.4 x 6.4 in model units -> ~1.31).
 */
export function useFaceTexture(width = 640, height = 488) {
  const { texture, face } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const face = new SudoFace(canvas, { gazeAmount: 0.16 });
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    return { texture, face };
  }, [width, height]);

  const last = useRef(0);
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    const dt = Math.min(0.05, t - last.current);
    last.current = t;
    face.update(t, dt);
    // texture is created in useMemo; setting needsUpdate is the canonical way
    // to stream a CanvasTexture, but the immutability rule flags it.
    // eslint-disable-next-line react-hooks/immutability
    texture.needsUpdate = true;
  });

  return { texture, face };
}
