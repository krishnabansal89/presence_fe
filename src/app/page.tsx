import EmailForm from "@/components/email-form";
import HeroImage from "@/components/hero-image";
import JsonLd from "@/components/json-ld";
import LaunchVideo from "@/components/launch-video";
import Reveal from "@/components/reveal";
import SiteNav from "@/components/site-nav";
import {
  ArrowIcon,
  BlocksIcon,
  CloudIcon,
  KeyIcon,
  MicIcon,
  ServerIcon,
  SlidersIcon,
  SparkIcon,
  TerminalIcon,
} from "@/components/icons";

const capabilities = [
  {
    label: "voice",
    title: "Full voice conversation.",
    body: "Talk to it the way you'd talk to anyone. It listens, understands, and talks back through a real speech pipeline.",
    Icon: MicIcon,
  },
  {
    label: "personality",
    title: "An open personality to tweak.",
    body: "The character is yours to shape. Adjust how it reacts, what it notices, and how it talks to you.",
    Icon: SlidersIcon,
  },
  {
    label: "mods",
    title: "A mods ecosystem.",
    body: "Control your Spotify, set focus sessions, wire it to your tools, and build whatever you imagine on top.",
    Icon: BlocksIcon,
  },
];

const aiPaths = [
  {
    title: "our cloud",
    body: "free for early adopters, low cost later. zero setup.",
    Icon: CloudIcon,
  },
  {
    title: "any free API",
    body: "point Sudo at a free tier. pay nothing.",
    Icon: KeyIcon,
  },
  {
    title: "self-host",
    body: "run a model on your own machine. pay nothing, permanently.",
    Icon: ServerIcon,
  },
];

const sdkLines = [
  { label: "behaviors", body: "react to events, drive moods and gestures" },
  { label: "integrations", body: "wire Sudo to your commits, your music, your terminal" },
  { label: "characters", body: "author and ship a whole new personality on the runtime" },
];

const founderPointers = [
  "twenty units, individually numbered.",
  "lifetime cloud AI, free for the life of the unit.",
  "a direct line to the founder, not a support queue.",
  "by application. tell us why you want in, we read every one.",
];

const videoChapters = [
  { num: "01", label: "face and moods" },
  { num: "02", label: "runs dry" },
  { num: "03", label: "notices you're there" },
  { num: "04", label: "remembers locally" },
  { num: "05", label: "talks back" },
];

const faqs = [
  {
    question: "Do I need to be a developer to use it?",
    answer:
      "No. Out of the box, Sudo works immediately. It talks, learns your routine, reacts, and keeps you company. The SDK is there for people who want to build on it. The default experience needs zero technical skill.",
  },
  {
    question: "Is Sudo open source?",
    answer:
      "The SDK is open, with docs and examples. The firmware and the personality engine are ours. What's open is what you build on; what's yours is your data and your AI endpoint. We're specific about this on purpose.",
  },
  {
    question: "How is this different from EMO?",
    answer:
      "Three ways. Price: we're meaningfully cheaper. AI: you can run Sudo on your own endpoint or a free API, EMO can't. Building: we ship a real SDK. You get control over the experience, even though the engine itself is ours.",
  },
  {
    question: "How is this different from Alexa or Google Home?",
    answer:
      "Those are utilities that live in someone else's cloud. Sudo is a creature that lives on your desk, with a personality that develops from how you treat it, and an SDK you can build on. It's not a voice assistant. It's a creature you can extend.",
  },
  {
    question: "What's the real monthly cost?",
    answer:
      "Zero, if you choose. Use a free API tier or self-host and you pay nothing. Use our cloud and it's free for early adopters, low cost later. We don't gate features behind a subscription.",
  },
  {
    question: "What about my data?",
    answer:
      "Memory is stored locally, and cloud calls send only the immediate context, not your history. If you self-host the AI, your interactions never leave your machine. You choose where the intelligence runs.",
  },
];

export default function Home() {
  const faqJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main id="top" className="site-shell min-h-screen bg-canvas text-on-primary">
      <JsonLd data={faqJsonLd} />
      <SiteNav />

      {/* ─────────────────────────── Hero ─────────────────────────── */}
      {/* pinned hero backdrop — stays fixed while text scrolls and the
          following sections rise up over it */}
      <div className="hero-backdrop">
        <div className="hero-image-layer">
          <HeroImage />
        </div>
        <div className="hero-scrim" aria-hidden />
        <div className="hero-shades" aria-hidden />
      </div>

      <section className="section-anchor hero relative z-0 flex items-center px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="hero-content relative z-10 mx-auto w-full max-w-[1640px]">
          <div className="hero-copy flex max-w-[44ch] flex-col items-start text-left">
            <Reveal>
              <span className="hero-eyebrow-chip">
                <span className="brand-dot" />
                a desk creature · by presence labs
              </span>
            </Reveal>

            <Reveal delay={160}>
              <h1 className="editorial-headline mt-6 text-[clamp(2.6rem,5.2vw,4.5rem)] font-medium leading-[0.94] text-on-primary">
                Meet Sudo.
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.55] text-ash">
                A small, open-source creature for your desk. It talks back, it has opinions, and it runs on whatever AI you point it at. Yours to shape. No subscription.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 w-full max-w-md">
                <EmailForm />
              </div>
            </Reveal>

            <Reveal delay={360}>
              <a className="button-ghost mt-5" href="#alive">
                see what it does
                <ArrowIcon style={{ height: 14, width: 14 }} />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="hero-scroll-cue" aria-hidden>
          <span />
          <small>scroll</small>
        </div>
      </section>

      <div className="hero-cover">
      {/* ──────────────────────── Thesis band ─────────────────────── */}
      <section className="marketing-section-dark px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1000px] py-20 text-center md:py-28">
          <Reveal>
            <p className="editorial-headline text-[clamp(1.8rem,4.5vw,3.25rem)] font-medium leading-[1.08] text-on-primary">
              Not a gadget. A creature you can <span className="thesis-accent">talk to</span>, <span className="thesis-accent">shape</span>, and call your own.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap justify-center gap-2.5">
              <span className="benefit-chip">talks back</span>
              <span className="benefit-chip">remembers you</span>
              <span className="benefit-chip">yours to shape</span>
              <span className="benefit-chip">no subscription</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── Meet Sudo ──────────────────────── */}
      <section id="alive" className="section-anchor marketing-section-dark px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-[1640px]">
          <Reveal>
            <div className="launch-section-head">
              <p className="mono-eyebrow text-mute">02 · meet sudo</p>
              <h2 className="editorial-headline mt-5 max-w-5xl text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[1.0] text-on-primary">
                The fastest way to explain it is to watch it move.
              </h2>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-ash">
                Face, voice, moods, memory, and the part where it quietly judges your setup. A video does that better than another wall of text.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} variant="scale">
            <div className="launch-video-shell">
              <LaunchVideo />
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="launch-chapters" aria-label="Launch video chapters">
              {videoChapters.map((chapter) => (
                <div className="launch-chapter" key={chapter.num}>
                  <span>{chapter.num}</span>
                  {chapter.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────── Capabilities ────────────────────── */}
      <section id="capabilities" className="section-anchor marketing-section-light px-4 py-20 text-ink sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-[1640px]">
          <SplitSection
            eyebrow="03 · capabilities"
            title="Talk to it. Shape it. Build on it."
            tone="light"
            intro="Three things make Sudo more than a gadget: a real voice pipeline, a personality you can open and tune, and a mods ecosystem that turns it into whatever you want next."
          >
            <div className="feature-rows">
              {capabilities.map((cap, i) => (
                <Reveal key={cap.label} delay={i * 110}>
                  <article className="feature-row">
                    <span className="ghost-num ghost-num-light" aria-hidden>
                      0{i + 1}
                    </span>
                    <div className="feature-row-head">
                      <span className="icon-tile icon-tile-light">
                        <cap.Icon />
                      </span>
                      <span className="feature-row-index">0{i + 1}</span>
                    </div>
                    <h3 className="feature-row-title feature-row-title-light">
                      {cap.title}
                    </h3>
                    <p className="feature-row-body feature-row-body-light">{cap.body}</p>
                    <p className="feature-row-tag feature-row-tag-brand">{cap.label}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </SplitSection>
        </div>
      </section>

      {/* ─────────────────── Run it / Build on it (merged) ────────── */}
      <section id="sdk" className="section-anchor marketing-section-dark px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-[1640px]">
          <SplitSection
            eyebrow="04 · run it, build on it"
            title="We built the hard part. You build everything on top."
            tone="dark"
            intro="Sudo isn't a black box with a face on it. The AI runs where you put it, the SDK is real, and the personality engine is the part we actually nailed."
          >
            <div className="flex flex-col gap-12">
              {/* Block 01 — Run it your way */}
              <Reveal>
                <div className="feature-row feature-row-dark">
                  <span className="ghost-num" aria-hidden>01</span>
                  <div className="feature-row-head">
                    <span className="icon-tile">
                      <ServerIcon />
                    </span>
                    <span className="feature-row-index">01</span>
                  </div>
                  <h3 className="feature-row-title feature-row-title-dark">
                    Run it your way.
                  </h3>
                  <p className="feature-row-body feature-row-body-dark">
                    Self-host the AI on your own machine, point it at a free API tier, or use our cloud. No subscription unless you want one. Your data stays where you put it.
                  </p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {aiPaths.map((path) => (
                      <div key={path.title} className="rounded-lg border border-hairline-soft bg-canvas-soft px-4 py-3">
                        <p className="font-mono text-[12px] text-brand">{path.title}</p>
                        <p className="mt-1 text-[13px] leading-[1.5] text-ash">{path.body}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[14px] text-ash">
                    Same device on all three paths. Nothing behind a paywall.
                  </p>
                </div>
              </Reveal>

              {/* Block 02 — Build on it */}
              <Reveal>
                <div className="feature-row feature-row-dark">
                  <span className="ghost-num" aria-hidden>02</span>
                  <div className="feature-row-head">
                    <span className="icon-tile">
                      <TerminalIcon />
                    </span>
                    <span className="feature-row-index">02</span>
                  </div>
                  <h3 className="feature-row-title feature-row-title-dark">
                    Build on it.
                  </h3>
                  <p className="feature-row-body feature-row-body-dark">
                    A real SDK with docs and examples. Write behaviors, wire it to your tools, and ship whole new characters on top of the runtime.
                  </p>
                  <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-hairline-soft bg-hairline-soft">
                    {sdkLines.map((line) => (
                      <div
                        className="grid gap-1 bg-canvas px-4 py-3 sm:grid-cols-[120px_1fr]"
                        key={line.label}
                      >
                        <span className="font-mono text-[12px] text-brand">{line.label}</span>
                        <span className="text-[13px] leading-[1.5] text-ash">{line.body}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Block 03 — The engine is ours */}
              <Reveal>
                <div className="feature-row feature-row-dark">
                  <span className="ghost-num" aria-hidden>03</span>
                  <div className="feature-row-head">
                    <span className="icon-tile">
                      <SparkIcon />
                    </span>
                    <span className="feature-row-index">03</span>
                  </div>
                  <h3 className="feature-row-title feature-row-title-dark">
                    The engine is ours.
                  </h3>
                  <p className="feature-row-body feature-row-body-dark">
                    The face runs on a circumplex emotion model. Every expression is a point in valence and arousal space, and the creature blends toward a live target frame by frame, with a liveness layer adding breathing, sway, and gaze drift on top. The SDK exposes that target plus the inputs and outputs. The engine stays ours. Everything you&apos;d build on it is yours.
                  </p>
                </div>
              </Reveal>

              {/* Code sample */}
              <Reveal variant="scale">
                <div className="studio-window">
                  <div className="studio-window-bar">
                    <span />
                    <span />
                    <span />
                    <p>sudo.behavior.ts</p>
                  </div>
                  <pre className="code-panel">
                    <code>
                      <span className="tk-c">{`// sudo.behavior.ts`}</span>{"\n"}
                      <span className="tk-c">{`// nudge Sudo toward "curious" when a build starts`}</span>{"\n"}
                      <span className="tk-d">sudo</span>
                      <span className="tk-p">.</span>
                      <span className="tk-f">on</span>
                      <span className="tk-p">(</span>
                      <span className="tk-s">{`"build:start"`}</span>
                      <span className="tk-p">, () =&gt; {"{"}</span>{"\n"}
                      {"  "}
                      <span className="tk-d">sudo</span>
                      <span className="tk-p">.</span>
                      <span className="tk-f">emotion</span>
                      <span className="tk-p">.</span>
                      <span className="tk-f">target</span>
                      <span className="tk-p">({"{"}</span>{" "}
                      <span className="tk-k">valence</span>
                      <span className="tk-p">:</span>{" "}
                      <span className="tk-n">0.3</span>
                      <span className="tk-p">,</span>{" "}
                      <span className="tk-k">arousal</span>
                      <span className="tk-p">:</span>{" "}
                      <span className="tk-n">0.7</span>{" "}
                      <span className="tk-p">{"}"});</span>{"\n"}
                      {"  "}
                      <span className="tk-d">sudo</span>
                      <span className="tk-p">.</span>
                      <span className="tk-f">gesture</span>
                      <span className="tk-p">(</span>
                      <span className="tk-s">{`"curious_tilt"`}</span>
                      <span className="tk-p">);</span>{"\n"}
                      <span className="tk-p">{"});"}</span>
                    </code>
                  </pre>
                </div>
              </Reveal>

              <Reveal>
                <p className="font-display text-[22px] font-medium leading-[1.15] tracking-[-0.02em] text-on-primary">
                  Nothing you build depends on us shipping it for you. That&apos;s the point of an SDK.
                </p>
              </Reveal>
            </div>
          </SplitSection>
        </div>
      </section>

      {/* ─────────────────────── Founder's Edition ────────────────── */}
      <section id="founders" className="section-anchor marketing-section-light px-4 py-20 text-ink sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-[1640px]">
          <SplitSection
            eyebrow="06 · founder's edition"
            title="Be in the first batch."
            tone="light"
            intro="The first run is twenty numbered units. The earliest way to get a Sudo, by application."
          >
            <Reveal variant="rise-lg">
              <div className="pricing-card-featured">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
                    by application
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand">
                    20 units
                  </span>
                </div>
                <p className="founder-number mt-6 text-on-primary">
                  01<span className="text-mute">/20</span>
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {founderPointers.map((ptr) => (
                    <li key={ptr} className="flex items-start gap-3 text-[15px] leading-[1.55] text-ash">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {ptr}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <EmailForm buttonLabel="Apply for early access" variant="dark" />
                </div>
              </div>
            </Reveal>
          </SplitSection>

          <Reveal delay={120}>
            <p className="mt-10 max-w-3xl font-mono text-[13px] leading-[1.7] text-mute">
              Retail pricing will be lower than Founder&apos;s Edition. We&apos;d rather say that now than burn the people who backed it first.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ────────────────────────────── FAQ ───────────────────────── */}
      <section id="faq" className="section-anchor marketing-section-paper px-4 py-20 text-ink sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-[1640px]">
          <SplitSection
            eyebrow="07 · faq"
            title="Questions that should have plain answers."
            tone="light"
            intro="No over-claiming. If something's ours, we say so. If something's open, we say exactly what that means."
          >
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 50}>
                  <details className="faq-card">
                    <summary>
                      <span className="faq-toggle">+</span>
                      {faq.question}
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </SplitSection>
        </div>
      </section>

      {/* ─────────────────────────── Footer CTA ───────────────────── */}
      <footer id="early-access" className="section-anchor marketing-section-dark px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-[1640px]">
          <SplitSection
            eyebrow="08 · footer cta"
            title="Sudo is dropping soon. Leave your email and watch it come together."
            tone="dark"
          >
            <div className="grid gap-6">
              <EmailForm />
              <div className="grid gap-3 font-mono text-[13px] text-ash sm:grid-cols-2">
                <a className="footer-link" href="https://x.com/presence_labs">Twitter / X</a>
                <a className="footer-link" href="https://www.instagram.com/presencelabs.in">Instagram</a>
                <a className="footer-link" href="https://www.youtube.com/@presencelabs">YouTube</a>
                <a className="footer-link" href="https://www.presencelabs.in">presencelabs.in</a>
              </div>
            </div>
          </SplitSection>

          <div className="mt-16 flex flex-col gap-4 border-t border-hairline-soft pt-6 font-mono text-[11px] leading-[1.5] text-mute sm:flex-row sm:items-center sm:justify-between">
            <p>building in public // presence labs</p>
            <div className="flex items-center gap-2">
              <span className="brand-dot" />
              <span className="font-display text-[15px] font-medium tracking-[-0.01em] text-on-primary">
                Presence Labs
              </span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
}

function SplitSection({
  eyebrow,
  title,
  tone,
  intro,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  tone: "dark" | "light";
  intro?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="split-section">
      <Reveal className="split-left">
        <p className="mono-eyebrow text-mute">{eyebrow}</p>
        <h2
          className={
            "split-title mt-5 " +
            (tone === "dark" ? "split-title-dark" : "split-title-light")
          }
        >
          {title}
        </h2>
        {intro && (
          <p
            className={
              "split-intro " +
              (tone === "dark" ? "split-intro-dark" : "split-intro-light")
            }
          >
            {intro}
          </p>
        )}
        {aside}
      </Reveal>
      <div className="split-right">{children}</div>
    </div>
  );
}
