import EmailForm from "@/components/email-form";
import { getEmailCount } from "./actions";

export default async function Home() {
  const count = await getEmailCount();
  const displayCount = count > 0 ? count.toString() : "20+";

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Central glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 50%, rgba(94, 234, 212, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 md:px-10 py-24 flex flex-col gap-10">

        {/* Eyebrow */}
        <p className="anim-fade-up font-mono text-[10px] tracking-[0.35em] text-teal-400/45 uppercase">
          Presence Labs · Early Access
        </p>

        {/* Headline */}
        <h1 className="anim-fade-up anim-delay-1 font-display text-[2.5rem] md:text-[3.75rem] font-semibold tracking-tight leading-[1.08] text-white">
          What if the things around you actually knew you were there.
        </h1>

        {/* Body copy */}
        <div className="anim-fade-up anim-delay-2 flex flex-col gap-5">
          <p className="text-slate-400 text-base md:text-[1.0625rem] leading-[1.75]">
            Presence Labs is building open-source AI creatures<br />
            that live on your desk, connect to your world,<br />
            and grow with you over time.
          </p>
          <p className="text-slate-600 text-sm md:text-[0.9375rem] tracking-wide">
            No subscriptions. No closed ecosystems. Yours completely.
          </p>
        </div>

        {/* Email form */}
        <div className="anim-fade-up anim-delay-3">
          <EmailForm />
        </div>

        {/* Counter */}
        <div className="anim-fade-up anim-delay-4 flex items-center gap-2.5 font-mono text-xs text-slate-600">
          <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-teal-400/50 shrink-0" />
          <span>— {displayCount} people already waiting</span>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </main>
  );
}
