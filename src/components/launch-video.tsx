"use client";

import { useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/presencelabs.in";

/**
 * The launch film isn't cut yet, so "playing" it reveals a message in Sudo's
 * own voice instead — pointing early visitors to Instagram while the real clip
 * is still being put together.
 */
export default function LaunchVideo() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="launch-video-fallback" role="group" aria-label="Sudo launch film">
      <button
        type="button"
        className="launch-video-play"
        onClick={() => setRevealed(true)}
        aria-label="Play the launch film"
        aria-expanded={revealed}
      >
        <span />
      </button>

      <div className="max-w-xl">
        {!revealed ? (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
              launch film
            </p>
            <p className="mt-3 font-display text-[clamp(1.8rem,4vw,3.25rem)] font-medium leading-[1] tracking-[-0.04em] text-on-primary">
              Sudo in motion.
            </p>
            <p className="mt-4 text-[15px] leading-[1.6] text-ash">
              Face, voice, moods, memory — the whole thing in one pass. Hit play.
            </p>
          </>
        ) : (
          <div role="status" aria-live="polite">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
              <span className="pulse-dot" />
              sudo says
            </p>
            <p className="mt-4 font-display text-[clamp(1.35rem,2.6vw,1.95rem)] font-medium leading-[1.22] tracking-[-0.02em] text-on-primary">
              Oh, hey — you&apos;re here even earlier than my founder.
            </p>
            <p className="mt-3 text-[15px] leading-[1.6] text-ash">
              My video isn&apos;t up yet; my guy&apos;s still putting it together. Want to see how
              I actually look in the meantime? Come find me on Instagram. The real clip
              drops right here soon.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand/40 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-brand transition hover:bg-brand hover:text-ink"
            >
              see how I look on Instagram →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
