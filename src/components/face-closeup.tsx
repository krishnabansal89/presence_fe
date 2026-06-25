"use client";

import { useEffect, useRef, useState } from "react";
import { SudoFace, type Mood } from "@/lib/sudo/face-engine";

const MOODS: Mood[] = ["smug", "skeptical", "unimpressed", "curious", "annoyed"];

/**
 * Face-only close-up for the Meet-Sudo section. Runs the SudoFace engine on a
 * 2D canvas (no Three.js) framed tight on the screen surface. Cycles through
 * Sudo's dry expressions as the user scrolls past each fact on the right.
 */
export default function FaceCloseup() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceRef = useRef<SudoFace | null>(null);
  const [mood, setMood] = useState<Mood>("smug");

  // --- set up the face engine + rAF loop ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // fixed internal resolution; CSS scales it to the container
    canvas.width = 640;
    canvas.height = 488;

    const face = new SudoFace(canvas, { gazeAmount: 0.14, mood: "smug" });
    faceRef.current = face;

    // cursor gaze tracking
    const onMove = (cx: number, cy: number) => {
      const nx = (cx / window.innerWidth) * 2 - 1;
      const ny = (cy / window.innerHeight) * 2 - 1;
      face.lookAt(nx, ny, performance.now() / 1000);
    };
    const onPointer = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("touchmove", onTouch, { passive: true });

    // rAF loop
    let raf = 0;
    let last = performance.now() / 1000;
    const loop = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - last);
      last = now;
      face.update(now, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // --- scroll-driven mood cycling ---
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

      // map progress to 5 moods
      const idx = Math.min(MOODS.length - 1, Math.floor(p * MOODS.length));
      const m = MOODS[idx];
      setMood((cur) => (cur === m ? cur : m));
      faceRef.current?.setMood(m);
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
    <div className="alive-3d" aria-label="Sudo face close-up" role="img">
      <div className="alive-3d-stage">
        <div className="alive-3d-glow" aria-hidden />

        <span className="alive-live-pill">
          <span className="pulse-dot" />
          live · sudo.live
        </span>
        <span className="alive-phase-pill">{mood}</span>

        <div className="face-closeup-canvas">
          <canvas ref={canvasRef} />
        </div>

        <p className="alive-caption">scroll to see it react</p>
      </div>
    </div>
  );
}
