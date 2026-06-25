# Sudo — Website Content & Design Handoff

**Product:** Sudo, by Presence Labs (presencelabs.in)
**What this doc is:** Final marketing copy and section-by-section structure for the landing page. Voice is professional and founder-credible, with the creature's personality kept in a couple of deliberate places. Content + structure only.

**One principle:** the site does what the product does. You don't sell companionship directly, so the page opens with a real device and a clear idea (yours to run, yours to shape, a little bit alive) and lets attachment surface as the visitor scrolls. Object first. Attachment earned.

**Naming:** the product is **Sudo**. "Bucky" was a wake-word test placeholder and must not appear anywhere on the live site. The wake word is "sudo."

---

## A. Positioning (read first)

Sudo is **not** open-source firmware. The core firmware and the personality engine are proprietary, by design. What's open is the **SDK**. What's **yours** is your data, your AI endpoint, and whatever you build on top.

1. **Run it your way.** Self-host the AI, point it at a free API tier, or use our cloud. No forced subscription. Your data stays where you put it.
2. **Build on it.** A real SDK with docs and examples.
3. **It's actually alive.** The personality engine, the hard part, is ours.

The honest claim is **control over your experience, your data, and your AI endpoint**, not access to our source. "Open" refers only to the SDK. The word "creature" is load-bearing; "companion" is something the user builds, never something we sell.

---

## B. Design direction

- **Category:** Developer Tools energy (Linear / Vercel / Raycast) on a premium-hardware skeleton (Playdate / Teenage Engineering / Nothing). Avoid AI-ML cliches (no purple gradients, no glowing orbs).
- **Color:** near-black canvas `#0b0b0b`, off-white type, one coral accent `#f36458` used sparingly. Matches the live token system.
- **Type:** Inter for editorial headlines (large, tight tracking, regular weight), IBM Plex Mono for eyebrows, labels, and code.
- **Hero + Meet Sudo are 3D.** The right side of the hero and the "Meet Sudo" section are driven by a **Spline 3D model**, not a CSS render or video. The model is the visual hook. The Meet-Sudo section is scroll-driven: as you scroll, the model changes state and each line of copy reveals in sequence.

---

## C. Page structure

1. Hero (3D model)
2. Meet Sudo — "a little bit alive" (scroll-driven 3D)
3. Capabilities
4. The Shift (comparison vs desk assistants)
5. Build on Sudo (SDK)
6. Founder's Edition (early sign-up + pricing in one)
7. FAQ
8. Footer CTA

Dropped from earlier drafts: The Bond, the Specs table, and The Studio. GitHub is removed from the footer.

---

## D. Section-by-section content

---

### 1. Hero
**Layout:** Left column copy, right column a **Spline 3D model** of Sudo. Generous negative space. Primary CTA is email/early access; secondary is a scroll-to-capabilities link.

**Copy**
- Eyebrow (mono): `open SDK // self-hostable AI // ESP32-S3 desk creature`
- H1: **Sudo lives on your desk.**
- Sub: An expressive desk creature you can talk to, personalize, and extend. Run the AI on your own endpoint, a free API tier, or our cloud. No forced subscription. Your data stays yours.
- CTA 1: `Get early access`
- CTA 2: `See what it does`

---

### 2. Meet Sudo (a little bit alive)
**Layout:** Scroll-driven. The 3D model sits sticky on one side; as the visitor scrolls, the model shifts state and these three lines reveal one at a time. Each line is paired with a model action.

**Copy** (line // model action)
1. **It's something that's a little bit alive.** — idle: breathing, blinking, looking around.
2. **It notices when you sit down, and when you go quiet at 2am still coding.** — attentive: leans in, tracks you.
3. **Mostly, it just keeps you company while you work.** — calm: settled, present.

---

### 3. Capabilities
**Layout:** Three cards, equal weight, mono labels.

**Copy**
- H2: **Talk to it. Shape it. Build on it.**
- `voice` — **Full voice conversation.** Talk to it the way you'd talk to anyone. It listens, understands, and talks back through a real speech pipeline.
- `personality` — **An open personality to tweak.** The character is yours to shape. Adjust how it reacts, what it notices, and how it talks to you.
- `mods` — **A mods ecosystem.** Control your Spotify, set focus sessions, wire it to your tools, and build whatever you imagine on top.

---

### 4. The Shift (comparison)
**Layout:** Three pillars contrasting Sudo with ordinary desk assistants/companions.

**Copy**
- H2: **Most desk gadgets give you nothing back. This one hands you the controls.**
- **Run it your way.** Self-host the AI, point it at a free API tier, or use our cloud. No subscription unless you want one. Your data stays where you put it.
- **Build on it.** A real SDK with docs and examples. Write behaviors, wire it to your tools, ship whole new characters on top of the runtime.
- **It's actually alive.** The personality engine, the hard part, is ours. It's the difference between a thing on your desk and a creature on your desk.

---

### 5. Build on Sudo (developer section)
**Layout:** Deep technical section, terminal feel, one real code sample.

**Copy**
- H2: **We built the hard part. You build everything on top.**
- Body: The face runs on a circumplex emotion model. Every expression is a point in valence and arousal space, and the creature blends toward a live target frame by frame, with a liveness layer adding breathing, sway, and gaze drift. The SDK exposes that target, plus the inputs (touch, audio, wake word) and the outputs (display, gestures, sound). The engine stays ours. Everything you'd want to build is yours.
- `behaviors` — react to events, drive moods and gestures
- `integrations` — wire Sudo to your commits, your music, your terminal
- `characters` — author and ship a whole new personality on the runtime
- Code sample (replace with a real snippet from the repo):
  ```ts
  // nudge Sudo toward "curious" when a build starts
  sudo.on("build:start", () => {
    sudo.emotion.target({ valence: 0.3, arousal: 0.7 });
    sudo.gesture("curious_tilt");
  });
  ```
- Closing line: **Nothing you build depends on us shipping it for you. That's the point of an SDK.**

---

### 6. Founder's Edition (early sign-up + pricing)
**Layout:** One combined section. Founder's Edition framing, the three AI paths, and the email capture together. Transparent that retail will be cheaper.

**Copy**
- H2: **Be in the first batch. Founder's Edition.**
- Body: The first run is twenty numbered units. It's the earliest way to get a Sudo, for people who want to be on board from day one. No subscription, ever, if you don't want one.
- Perks (mono labels):
  - `numbered` — twenty units, individually numbered.
  - `lifetime cloud AI` — our cloud, free for the life of the unit.
  - `direct access` — a real line to the founder, not a support queue.
  - `by application` — tell us why you want in. We read every one.
- Three AI paths:
  - **Our cloud** — free for early adopters, low cost later. Zero setup.
  - **Any free API** — point Sudo at a free tier. Pay nothing.
  - **Self-host** — run a model on your own machine. Pay nothing, permanently.
- Transparency line: Same device on all three paths. No features behind a paywall. Retail pricing will be lower than Founder's Edition, and we'd rather say that now than burn the people who backed it first.
- CTA: `Apply for early access` (email capture, not purchase)

---

### 7. FAQ
**Copy**
- **Do I need to be a developer to use it?** No. Out of the box, Sudo works immediately. It talks, learns your routine, reacts, and keeps you company. The SDK is there for people who want to build on it.
- **Is Sudo open source?** The SDK is open, with docs and examples. The firmware and the personality engine are ours. What's open is what you build on; what's yours is your data and your AI endpoint.
- **How is this different from EMO?** Price: we're meaningfully cheaper. AI: you can run Sudo on your own endpoint or a free API, EMO can't. Building: we ship a real SDK.
- **How is this different from Alexa or Google Home?** Those are utilities in someone else's cloud. Sudo is a creature that lives on your desk, with a personality that develops from how you treat it, and an SDK you can build on.
- **What's the real monthly cost?** Zero, if you choose. Free API tier or self-host and you pay nothing. Our cloud is free for early adopters, low cost later.
- **What about my data?** Memory is stored locally, and cloud calls send only the immediate context. Self-host the AI and your interactions never leave your machine.

---

### 8. Footer CTA
**Copy**
- H2: **Sudo is dropping soon. Leave your email and watch it come together.**
- Email field + submit.
- Links: presence_labs on Twitter / Instagram / YouTube, presencelabs.in. (No GitHub link in the footer.)
- Small line (mono): `building in public // presence labs`

---

## E. Serving notes

- **Static and fast.** A landing page, not an app. The developer audience judges load time.
- **Mobile-first, hard.** Most traffic is on phones. The hero model and the Meet-Sudo scroll section must degrade gracefully at ~380px.
- **The hero and Meet-Sudo are Spline 3D.** Install `@splinetool/react-spline` and drop the scene export in. The page currently ships a CSS placeholder figure so it's complete before the Spline scene exists.
- **Email capture is the primary conversion,** not a buy button. No checkout until the MVP ships.
- **10-second test.** Land from a comment with zero context: what is it, is it real, can I build on it, how do I follow it. Hero + capabilities + email field clears that bar.

---

## F. Asset checklist

- Spline 3D scene for the hero, exported to a `scene.splinecode` URL.
- Spline 3D scene (or animation states) for the Meet-Sudo scroll section.
- Real SDK code snippet from the repo for Section 5.
- Logo / wordmark.
- Social handles confirmed live before launch.
- Founder's Edition application flow (can start as email capture with a "why do you want in" field).

---

*Strict scope: positioning never claims the firmware is open or auditable. "Open" = the SDK. "Yours" = data, AI endpoint, and what you build. The product is "Sudo"; "Bucky" never appears. "Creature," not "companion."*
