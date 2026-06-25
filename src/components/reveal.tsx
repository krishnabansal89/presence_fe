"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "rise" | "rise-lg" | "fade" | "scale" | "left" | "right";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** delay in ms before the reveal transition starts */
  delay?: number;
  /** entrance style — rise (default) for text/boxes, scale for media, etc. */
  variant?: RevealVariant;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const subscribeReduced = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Fades + lifts its children into view once when they enter the viewport.
 * When prefers-reduced-motion is set, content is shown immediately.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);

  const reduced = useSyncExternalStore(
    subscribeReduced,
    prefersReducedMotion,
    () => false
  );

  const shown = seen || reduced;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn("reveal", `reveal-${variant}`, shown && "reveal-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
