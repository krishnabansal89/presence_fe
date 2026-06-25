/**
 * SudoFace — a procedural, framework-agnostic creature face.
 *
 * Draws two eyes + one mouth onto a 2D canvas with continuous live motion
 * (blink, breathing, idle wander) and reacts to a gaze target. No React, no
 * three.js in here — this is the same shape of logic the firmware face engine
 * uses, so it can stay the single source of truth for the creature's "face".
 *
 * Coordinate convention for gaze:
 *   lookAt(nx, ny) where nx, ny are in [-1, 1].
 *   +nx = look right, +ny = look down (matches screen-space cursor).
 */

const CREAM = "#EDE7DA";
const SCREEN_BG = "#080808";

export type Mood = "neutral" | "smug" | "skeptical" | "unimpressed" | "curious" | "annoyed";

type MoodParams = {
  eyeH: number;   // eye height multiplier
  smile: number;  // mouth curvature: + = smile, - = frown, 0 = flat
  mouthW: number; // mouth width multiplier
  smirk: number;  // asymmetric offset: + lifts right corner
};

const MOODS: Record<Mood, MoodParams> = {
  neutral:     { eyeH: 1.0,  smile: 1.0,  mouthW: 1.0,  smirk: 0 },
  smug:        { eyeH: 0.55, smile: 0.7,  mouthW: 0.8,  smirk: 0.18 },
  skeptical:   { eyeH: 0.68, smile: 0.08, mouthW: 0.9,  smirk: 0 },
  unimpressed: { eyeH: 0.78, smile: -0.1, mouthW: 0.78, smirk: 0 },
  curious:     { eyeH: 1.28, smile: 0.55, mouthW: 0.95, smirk: 0 },
  annoyed:     { eyeH: 0.58, smile: -0.5, mouthW: 0.72, smirk: 0 },
};

export type SudoFaceOptions = {
  gazeAmount?: number;
  mood?: Mood;
};

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function roundRect(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  c.beginPath();
  c.moveTo(x + rr, y);
  c.arcTo(x + w, y, x + w, y + h, rr);
  c.arcTo(x + w, y + h, x, y + h, rr);
  c.arcTo(x, y + h, x, y, rr);
  c.arcTo(x, y, x + w, y, rr);
  c.closePath();
}

export class SudoFace {
  private ctx: CanvasRenderingContext2D;
  private w: number;
  private h: number;

  // gaze: target (set by input) and smoothed current value, both in [-1,1]
  private gaze = { tx: 0, ty: 0, x: 0, y: 0 };
  private lastInput = -10;

  // blink state
  private blink = 1; // 1 = fully open, 0 = closed
  private nextBlink = 1.4;

  // idle wander target (used when no cursor input for a while)
  private wander = { x: 0, y: 0 };
  private nextWander = 2;

  private gazeAmount: number;
  private mood: Mood;
  private moodMix: { cur: MoodParams; tgt: MoodParams };

  constructor(
    canvas: HTMLCanvasElement | OffscreenCanvas,
    opts: SudoFaceOptions = {},
  ) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.w = canvas.width;
    this.h = canvas.height;
    this.gazeAmount = opts.gazeAmount ?? 0.16;
    this.mood = opts.mood ?? "neutral";
    const m = MOODS[this.mood];
    this.moodMix = { cur: { ...m }, tgt: { ...m } };
  }

  /** point the eyes at a normalized target. +x = right, +y = down. */
  lookAt(nx: number, ny: number, t = this.lastInput) {
    this.gaze.tx = clamp(nx, -1, 1);
    this.gaze.ty = clamp(ny, -1, 1);
    this.lastInput = t;
  }

  /** set the current mood; the face eases toward the new expression */
  setMood(mood: Mood) {
    if (mood === this.mood) return;
    this.mood = mood;
    this.moodMix.tgt = { ...MOODS[mood] };
  }

  /** advance the simulation. t = elapsed seconds, dt = delta seconds. */
  update(t: number, dt: number) {
    const idle = t - this.lastInput > 2.2;

    // when idle, slowly wander the gaze so the creature feels alive
    if (idle) {
      if (t > this.nextWander) {
        this.wander.x = (Math.random() * 2 - 1) * 0.6;
        this.wander.y = (Math.random() * 2 - 1) * 0.4;
        this.nextWander = t + 1.6 + Math.random() * 2.4;
      }
      // gentle drift on top of the wander target
      this.gaze.tx = this.wander.x + Math.sin(t * 0.7) * 0.12;
      this.gaze.ty = this.wander.y + Math.sin(t * 0.5) * 0.08;
    }

    // smooth gaze toward target (frame-rate independent)
    const k = 1 - Math.pow(0.0015, dt);
    this.gaze.x = lerp(this.gaze.x, this.gaze.tx, k);
    this.gaze.y = lerp(this.gaze.y, this.gaze.ty, k);

    // ease mood parameters toward the target mood
    const mk = 1 - Math.pow(0.002, dt);
    this.moodMix.cur.eyeH   = lerp(this.moodMix.cur.eyeH,   this.moodMix.tgt.eyeH,   mk);
    this.moodMix.cur.smile  = lerp(this.moodMix.cur.smile,  this.moodMix.tgt.smile,  mk);
    this.moodMix.cur.mouthW = lerp(this.moodMix.cur.mouthW, this.moodMix.tgt.mouthW, mk);
    this.moodMix.cur.smirk  = lerp(this.moodMix.cur.smirk,  this.moodMix.tgt.smirk,  mk);

    // blink scheduler — quick close/open, randomized interval
    if (t > this.nextBlink) {
      const p = (t - this.nextBlink) / 0.15;
      if (p < 1) {
        this.blink = p < 0.5 ? 1 - p * 2 : (p - 0.5) * 2;
      } else {
        this.blink = 1;
        this.nextBlink = t + 2.2 + Math.random() * 3.6;
      }
    }

    this.draw(t);
  }

  private draw(t: number) {
    const c = this.ctx;
    const { w, h } = this;

    // --- screen background (subtle CRT-ish vignette) ---
    c.clearRect(0, 0, w, h);
    c.fillStyle = SCREEN_BG;
    c.fillRect(0, 0, w, h);
    const vg = c.createRadialGradient(
      w * 0.5,
      h * 0.5,
      h * 0.2,
      w * 0.5,
      h * 0.5,
      h * 0.75,
    );
    vg.addColorStop(0, "rgba(255,255,255,0.04)");
    vg.addColorStop(1, "rgba(0,0,0,0.0)");
    c.fillStyle = vg;
    c.fillRect(0, 0, w, h);

    // breathing + idle bob
    const breath = Math.sin(t * 1.1) * 0.5 + 0.5; // 0..1
    const bob = Math.sin(t * 0.9) * h * 0.012;

    // gaze offsets in pixels
    const gx = this.gaze.x * w * this.gazeAmount;
    const gy = this.gaze.y * h * this.gazeAmount + bob;

    // --- eyes: two rounded vertical bars that shift with gaze + blink ---
    const eyeW = w * 0.135;
    const eyeH = h * 0.32 * (0.92 + breath * 0.08) * this.blink * this.moodMix.cur.eyeH;
    const cy = h * 0.4;
    const eyeOffsetX = w * 0.17;

    c.fillStyle = CREAM;
    c.shadowColor = "rgba(237,231,218,0.45)";
    c.shadowBlur = w * 0.02;

    for (const dir of [-1, 1]) {
      const ex = w * 0.5 + dir * eyeOffsetX + gx;
      const ey = cy + gy;
      roundRect(c, ex - eyeW / 2, ey - eyeH / 2, eyeW, eyeH, eyeW * 0.48);
      c.fill();
    }

    // --- mouth: arc whose curvature comes from the mood ---
    const mp = this.moodMix.cur;
    const mouthW = w * (0.2 + breath * 0.03) * mp.mouthW;
    const mouthY = h * 0.66 + gy * 0.4;
    const smile = h * (0.045 + breath * 0.02) * mp.smile;
    const smirk = mp.smirk * mouthW * 0.5;
    c.shadowBlur = w * 0.012;
    c.lineWidth = h * 0.038;
    c.lineCap = "round";
    c.strokeStyle = CREAM;
    c.beginPath();
    c.moveTo(w * 0.5 - mouthW / 2 + gx * 0.5, mouthY - smirk);
    c.quadraticCurveTo(
      w * 0.5 + gx * 0.5,
      mouthY + smile,
      w * 0.5 + mouthW / 2 + gx * 0.5,
      mouthY + smirk,
    );
    c.stroke();

    c.shadowBlur = 0;
  }
}
