import Image from "next/image";

/**
 * Hero still — Sudo on a desk, used as a pinned full-bleed backdrop. It stays
 * fixed in the viewport while the hero text scrolls and later sections rise
 * up over it (see .hero-backdrop / .hero-cover in globals.css).
 */
export default function HeroImage() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Image
        src="/hero.png"
        alt="Sudo, a small desk creature, sitting on a virtual desk"
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
    </div>
  );
}
