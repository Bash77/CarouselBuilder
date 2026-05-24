// bwc-sections.jsx — landing page sections for ContentCore Studio

// ── Carousel mockup: a "phone slide" with editorial content ─────────
function CarouselMockup({
  rotation = 0,
  zIndex = 1,
  scale = 1,
  tx = 0,
  ty = 0,
  variant = "primary",
  delay = "0s",
  blurred = false,
}) {
  const variants = {
    primary: {
      kicker: "01 · HOOK",
      title: "How our AI rebuilds",
      titleAccent: "SaaS marketing",
      subline: "A 10-slide breakdown · est. 2 min read",
      handle: "@contentcore",
      bg: "linear-gradient(160deg, #18182a 0%, #0e0e1a 100%)",
      glow: "rgba(99,102,241,0.5)",
    },
    left: {
      kicker: "04 · TRANSFORMATION",
      title: "ContentCore studio:",
      titleAccent: "the future of B2B content",
      subline: "AI-powered · founder-approved",
      handle: "@contentcore",
      bg: "linear-gradient(170deg, #1a1525 0%, #0d0a16 100%)",
      glow: "rgba(168,85,247,0.4)",
    },
    right: {
      kicker: "07 · THE LOGIC",
      title: "How we optimize",
      titleAccent: "every carousel",
      subline: "10–14 pieces / month, on autopilot",
      handle: "@contentcore",
      bg: "linear-gradient(160deg, #131c2a 0%, #0a0e1a 100%)",
      glow: "rgba(56,189,248,0.35)",
    },
    far: {
      kicker: "02 · THE PAIN",
      title: "Stop staring at",
      titleAccent: "the blank screen",
      subline: "11 likes. Then silence.",
      handle: "@contentcore",
      bg: "linear-gradient(170deg, #2a1818 0%, #170d0d 100%)",
      glow: "rgba(244,114,182,0.3)",
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <div
      className={blurred ? "drift-slow" : "drift-slow"}
      style={{
        position: "absolute",
        width: 270,
        height: 360,
        transform: `translate(${tx}px, ${ty}px) rotate(${rotation}deg) scale(${scale})`,
        zIndex,
        animationDelay: delay,
        ["--rot"]: `${rotation}deg`,
        filter: blurred ? "blur(2.5px) saturate(0.85)" : "none",
        transition: "filter .3s",
      }}
    >
      {/* glow halo */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${v.glow} 0%, transparent 60%)`,
          filter: "blur(28px)",
          opacity: 0.7,
          zIndex: -1,
        }}
      />

      {/* phone bezel */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 28,
          background: v.bg,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 30px 80px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
          padding: "18px 18px",
          color: "#f1f5f9",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* top row */}
        <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.18em] text-white/40">
          <span>{v.handle}</span>
          <span className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.04]">
            1/10
          </span>
        </div>

        {/* kicker */}
        <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-glow-300 mt-3 font-semibold">
          {v.kicker}
        </div>

        {/* headline */}
        <div className="font-display font-bold text-[22px] leading-[1.05] tracking-tight text-white">
          {v.title}
          <br />
          <span className="text-gradient">{v.titleAccent}</span>
        </div>

        {/* tag line */}
        <div className="text-[11px] text-white/55 italic font-display mt-1">{v.subline}</div>

        {/* spacer */}
        <div className="flex-1"></div>

        {/* footer: like / comment / share */}
        <div className="flex items-center gap-3 text-white/35 pt-2 border-t border-white/5">
          <IconHeart size={14} />
          <IconChat size={14} />
          <IconShare size={14} />
          <div className="flex-1"></div>
          <IconBookmark size={14} />
        </div>
      </div>
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-white/[0.04] bg-ink-900/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-glow-400 to-glow-500 flex items-center justify-center shadow-glow">
            <IconSparkle size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-base tracking-tight">
            ContentCore<span className="text-glow-400">.</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60 font-medium">
          <a href="#system" className="hover:text-white transition-colors">System</a>
          <a href="#stack" className="hover:text-white transition-colors">Stack</a>
          <a href="#proof" className="hover:text-white transition-colors">Proof</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <a
          href="#book"
          className="group inline-flex items-center gap-1.5 rounded-full bg-white text-ink-900 text-sm font-semibold px-4 py-2 hover:bg-glow-200 transition-colors"
        >
          Book audit
          <IconArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </nav>
  );
}

// ── Hero ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="relative pt-24 pb-32 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-6 relative z-10">
          {/* small badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-glow-400/30 bg-glow-500/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-glow-200 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-glow-300 anim-pulse"></span>
            Built with Claude · taking 3 clients for May
          </div>

          <h1 className="display text-5xl md:text-6xl lg:text-7xl">
            Stop staring at a <span className="text-glow">blank screen</span>.
            <br />
            <span className="text-gradient">Let AI build your</span>
            <br />
            <span className="text-gradient">SaaS content engine.</span>
          </h1>

          <p className="mt-7 text-lg text-white/65 max-w-xl leading-relaxed">
            We help seed-stage B2B SaaS founders show up consistently on Instagram
            and LinkedIn with premium AI-powered carousels and reels. You just
            click <span className="text-white font-semibold">approve</span> and post.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-glow-500 hover:bg-glow-400 text-white font-semibold px-6 py-3.5 shadow-glow transition-all hover:shadow-glow-lg"
            >
              Book a free content audit
              <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#system"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-white font-medium px-6 py-3.5 transition-colors"
            >
              See the system
            </a>
          </div>

          {/* social proof line */}
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12px] text-white/45 font-medium">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {["#7c3aed", "#0ea5e9", "#10b981", "#f59e0b"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-ink-900"
                    style={{ background: `linear-gradient(135deg, ${c}, ${c}99)` }}
                  ></div>
                ))}
              </div>
              <span className="ml-2">Trusted by 18 SaaS founders</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconStar size={14} className="text-glow-300" style={{ fill: "currentColor" }} />
              <span>4.9 · 12 founder testimonials</span>
            </div>
          </div>
        </div>

        {/* Right: floating carousel mockups */}
        <div className="lg:col-span-6 relative h-[520px] hidden lg:block">
          <CarouselMockup variant="far" rotation={-14} tx={-30} ty={-20} scale={0.78} zIndex={1} delay="0s" blurred />
          <CarouselMockup variant="left" rotation={-8} tx={40} ty={20} scale={0.88} zIndex={2} delay="0.6s" />
          <CarouselMockup variant="primary" rotation={2} tx={150} ty={60} scale={1} zIndex={3} delay="1.2s" />
          <CarouselMockup variant="right" rotation={10} tx={260} ty={20} scale={0.88} zIndex={2} delay="1.8s" />
        </div>
      </div>

      {/* scrim glow under hero */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[1100px] h-[400px] rounded-full bg-glow-500/15 blur-3xl"></div>
    </section>
  );
}

// ── Pain section ────────────────────────────────────────────────────
function PainSection() {
  return (
    <section className="relative px-6 lg:px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-glow-300 mb-5">
              The pain
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl mb-7">
              You ship code on the weekend.
              <br />
              You shouldn't be{" "}
              <span className="italic text-glow">struggling in Canva</span>.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
              You built an incredible product, but explaining it visually to your
              target market is exhausting. Meanwhile, your competitors are posting
              mediocre content and eating your lunch. You don't need a bloated
              marketing agency —
              <span className="text-white"> you need an automated system.</span>
            </p>
          </div>

          {/* Right: 3 pain cards */}
          <div className="lg:col-span-5 space-y-3">
            {[
              { stat: "11", label: "likes per post on a good week" },
              { stat: "2x", label: "your competitor's posting frequency" },
              { stat: "0", label: "marketing hires in your budget this quarter" },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-5 flex items-baseline gap-5 hover:border-glow-400/30 transition-colors"
              >
                <div className="font-display font-bold text-5xl text-gradient leading-none">
                  {p.stat}
                </div>
                <div className="text-sm text-white/55 leading-snug">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ────────────────────────────────────────────────────
function HowItWorksSection() {
  const timelineData = [
    {
      id: 1,
      title: "Brief",
      date: "Day 1",
      content:
        "You send us a Loom or fill a short form: what you build, who your ICP is, and the one thing you wish everyone understood about your product.",
      icon: IconBrief,
      relatedIds: [2],
      status: "completed",
      energy: 95,
    },
    {
      id: 2,
      title: "Claude Engine",
      date: "Day 2–3",
      content:
        "Your inputs feed our proprietary Claude workflow. It generates 30 days of carousel scripts, reel hooks, captions, and hashtags — all in your voice.",
      icon: IconBrain,
      relatedIds: [1, 3],
      status: "in-progress",
      energy: 88,
    },
    {
      id: 3,
      title: "Assembly",
      date: "Day 4–5",
      content:
        "Scripts drop into premium dark-mode visual templates. We polish every slide for narrative arc, hook strength, and brand voice before anything ships.",
      icon: IconLayout,
      relatedIds: [2, 4],
      status: "in-progress",
      energy: 80,
    },
    {
      id: 4,
      title: "You Post",
      date: "Every 2 weeks",
      content:
        "You receive a Google Drive folder: 10 carousels, captions, hashtags, posting schedule. You hit approve. Total founder time per cycle: 20 minutes.",
      icon: IconSend,
      relatedIds: [3],
      status: "pending",
      energy: 10,
    },
  ];

  return (
    <section id="system" className="relative px-6 lg:px-10 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-glow-300 mb-5">
            How it works
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto">
            One system,{" "}
            <span className="text-gradient">four orbits</span>.
            <br />
            Three to four hours of your time, total.
          </h2>
        </div>

        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}

// ── Tech Stack ──────────────────────────────────────────────────────
function TechStackSection() {
  const tools = [
    { name: "Claude", role: "Strategy & copy", glyph: "C", color: "#cc7f4f" },
    { name: "Canva AI", role: "Visual layouts", glyph: "Cv", color: "#06b6d4" },
    { name: "CapCut", role: "Reel editing", glyph: "C↗", color: "#000" },
    { name: "Notion", role: "Calendar delivery", glyph: "N", color: "#fff" },
    { name: "Opus Clip", role: "Reel auto-edits", glyph: "O", color: "#a78bfa" },
    { name: "Google Drive", role: "Delivery", glyph: "G", color: "#fbbf24" },
  ];

  return (
    <section id="stack" className="relative px-6 lg:px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-glow-300 mb-5">
            Tech stack
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-6xl">
            Our tools <span className="text-gradient">& technologies</span>
          </h2>
          <p className="mt-5 text-white/55 max-w-2xl mx-auto">
            A lean, AI-native stack. No bloated agency layers. Total monthly cost
            for us to run the entire system:{" "}
            <span className="text-white font-semibold">$13/mo</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {tools.map((t) => (
            <div
              key={t.name}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-5 flex flex-col items-center gap-3 hover:border-glow-400/40 hover:bg-glow-500/[0.05] transition-all"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-xl border border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${t.color}26 0%, ${t.color}05 100%)`,
                  color: t.color,
                  boxShadow: `0 0 30px -10px ${t.color}66`,
                }}
              >
                {t.glyph}
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm text-white">{t.name}</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mt-0.5">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Before / After ──────────────────────────────────────────────────
function BeforeAfterSection() {
  const [slider, setSlider] = React.useState(52);

  return (
    <section id="proof" className="relative px-6 lg:px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-glow-300 mb-5">
            The proof
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-6xl">
            From <span className="italic text-white/50">invisible side-project</span>
            <br />
            to <span className="text-gradient">industry authority</span> in 2 hours.
          </h2>
          <p className="mt-5 text-white/55 max-w-2xl mx-auto">
            Drag the slider. The same product. The same launch. Two completely
            different content engines.
          </p>
        </div>

        {/* Comparison */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-ink-700 shadow-card">
          {/* BEFORE — full layer */}
          <div className="absolute inset-0 p-10 flex flex-col justify-between"
               style={{ background: "linear-gradient(170deg, #111827 0%, #0a0a14 100%)" }}>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-red-300/70 mb-3">
                Before · the engineer post
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-white/85 max-w-xl leading-tight">
                "Excited to ship multi-tenant RBAC with scoped JWTs and sub-50ms
                p99 latency. 🚀"
              </div>
            </div>
            <div className="flex items-center gap-6 text-white/50 text-xs">
              <div><span className="font-semibold text-white">11</span> likes</div>
              <div><span className="font-semibold text-white">0</span> comments</div>
              <div><span className="font-semibold text-white">0</span> shares</div>
              <div className="ml-auto text-[10px] font-mono uppercase tracking-wider text-red-300/70">
                · invisible
              </div>
            </div>
          </div>

          {/* AFTER — clipped layer (reveals from LEFT as slider moves right) */}
          <div
            className="absolute inset-0 p-10 flex flex-col justify-between"
            style={{
              clipPath: `inset(0 ${100 - slider}% 0 0)`,
              background: "linear-gradient(170deg, #1a1530 0%, #0d0a18 100%)",
            }}
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-glow-300 mb-3">
                After · the ContentCore carousel
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-white max-w-xl leading-tight">
                "Your sales team can finally stop sharing one login."
                <span className="block text-glow-300 italic font-medium text-lg mt-2">
                  + 9 more slides showing the buyer's new Monday.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-white/70 text-xs">
              <div><span className="font-semibold text-white">2,431</span> likes</div>
              <div><span className="font-semibold text-white">68</span> comments</div>
              <div><span className="font-semibold text-white">412</span> shares</div>
              <div className="ml-auto text-[10px] font-mono uppercase tracking-wider text-glow-300">
                · authority
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-glow-300/80 pointer-events-none"
            style={{ left: `${slider}%`, boxShadow: "0 0 20px rgba(165,180,252,0.7)" }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-glow flex items-center justify-center"
            >
              <IconChevronRight size={14} className="text-ink-900" style={{ transform: "rotate(180deg)" }} />
              <IconChevronRight size={14} className="text-ink-900" />
            </div>
          </div>

          {/* Range input over the whole area */}
          <input
            type="range"
            min={5}
            max={95}
            value={slider}
            onChange={(e) => setSlider(parseInt(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            aria-label="Before / after slider"
          />
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      testimonial:
        "Three weeks in we hit 2.4k followers from 180. I literally just review and post — it's the cheapest senior hire I've ever made.",
      author: "Maya Iyer",
      role: "Founder · Linewise",
      result: "13× LinkedIn reach",
      color1: "#7c3aed",
      color2: "#3b82f6",
    },
    {
      id: 2,
      testimonial:
        "Our last agency wanted $4,800/mo and a 6-month commitment. ContentCore ships better carousels in 3 days. It's not a competition.",
      author: "Devin Park",
      role: "CMO · Outpost.dev",
      result: "Cut spend 73%",
      color1: "#0ea5e9",
      color2: "#10b981",
    },
    {
      id: 3,
      testimonial:
        "I was the bottleneck. Now I'm not. Two months in, three inbound demo requests directly cited posts we'd never have made without them.",
      author: "Jonas Reeve",
      role: "Founder · Tactify",
      result: "3 inbound demos / mo",
      color1: "#f59e0b",
      color2: "#ef4444",
    },
  ];

  return (
    <section className="relative px-6 lg:px-10 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-glow-300 mb-5">
            Founder reviews
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-6xl">
            They used to be <span className="italic text-white/50">invisible</span>.
            <br />
            Now they <span className="text-gradient">post every week</span>.
          </h2>
          <p className="mt-6 text-white/55 max-w-md leading-relaxed">
            Drag the top card to the left, or tap below, to flip through. Every
            quote is from a real seed-stage founder on the retainer.
          </p>
        </div>

        <div className="lg:col-span-7 flex justify-center">
          <ShuffleCards testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}

// ── Pricing ─────────────────────────────────────────────────────────
function PricingSection() {
  const tiers = [
    {
      name: "Starter Pack",
      sub: "One-time · prove the quality",
      price: "$400",
      cadence: "one-time",
      features: [
        "5 premium carousels",
        "Captions + hashtags",
        "48-hour turnaround",
        "Voice & brand match",
      ],
      cta: "Start here",
      featured: false,
    },
    {
      name: "Core Retainer",
      sub: "Most founders pick this",
      price: "$1,200",
      cadence: "/ month",
      features: [
        "8–10 carousels every month",
        "Captions, hashtags, calendar",
        "Bi-weekly delivery",
        "Slack channel for feedback",
        "Voice-of-founder reviews",
      ],
      cta: "Book a call",
      featured: true,
    },
  ];

  return (
    <section id="pricing" className="relative px-6 lg:px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-glow-300 mb-5">
            Pricing
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-6xl">
            Transparent. <span className="text-gradient">Like it should be.</span>
          </h2>
          <p className="mt-5 text-white/55 max-w-xl mx-auto">
            No "contact for pricing". You're a founder; your time is the most
            expensive line item. Read the number, decide in 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`
                relative rounded-3xl p-8 backdrop-blur transition-all
                ${t.featured
                  ? "border-2 border-glow-400/50 bg-gradient-to-b from-glow-500/15 to-glow-500/[0.02] shadow-glow"
                  : "border border-white/10 bg-white/[0.02] hover:border-white/20"
                }
              `}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-glow-400 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-900 font-bold">
                  Most picked
                </div>
              )}
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <div className="font-display font-bold text-2xl text-white">
                    {t.name}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mt-1">
                    {t.sub}
                  </div>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-7">
                <div className="font-display font-bold text-6xl text-white">
                  {t.price}
                </div>
                <div className="text-white/45 text-sm">{t.cadence}</div>
              </div>
              <ul className="space-y-2.5 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                    <IconCheck size={16} className="text-glow-300 mt-0.5 shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`
                  group inline-flex w-full items-center justify-center gap-2 rounded-full font-semibold py-3 transition-all
                  ${t.featured
                    ? "bg-white text-ink-900 hover:bg-glow-200"
                    : "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.07]"
                  }
                `}
              >
                {t.cta}
                <IconArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* small upsells */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {[
            ["Full Suite", "$2.5–3.5k/mo", "Carousels + reels + thought leadership"],
            ["Landing Sprint", "$800–1.2k", "Site in 72 hours via Framer/Webflow"],
            ["Maintenance", "$200/mo", "Updates, copy tweaks, new sections"],
          ].map(([n, p, d]) => (
            <div
              key={n}
              className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-white">{n}</div>
                <div className="text-[11px] text-white/40 mt-0.5">{d}</div>
              </div>
              <div className="font-mono text-[12px] text-glow-300">{p}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ───────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="book" className="relative px-6 lg:px-10 py-28">
      <div className="max-w-4xl mx-auto text-center">
        {/* big glow plate */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.35) 0%, transparent 60%)",
            filter: "blur(30px)",
          }}
        />
        <div className="relative">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-glow-300 mb-6">
            Final word
          </div>
          <h2 className="display text-5xl md:text-6xl lg:text-7xl mb-7">
            Ready to <span className="text-glow">automate</span>
            <br />
            your social presence?
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            One 20-minute call. We'll audit your current content, show you what
            your first month would look like, and quote you on the spot.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-glow-500 hover:bg-glow-400 text-white font-semibold px-7 py-4 shadow-glow-lg transition-all"
            >
              Let's talk
              <IconArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#stack"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] text-white font-medium px-6 py-4 hover:bg-white/[0.07] transition-colors"
            >
              See the stack again
            </a>
          </div>

          <div className="mt-10 text-[11px] font-mono uppercase tracking-[0.22em] text-white/35">
            DM "rebuild" on Instagram · @contentcore.studio
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] mt-12 px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-glow-400 to-glow-500 flex items-center justify-center">
            <IconSparkle size={12} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-white/70">ContentCore Studio</span>
          <span>· Built with Claude · 2026</span>
        </div>
        <div className="flex items-center gap-5 font-medium">
          <a href="#system" className="hover:text-white transition-colors">System</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#book" className="hover:text-white transition-colors">Book</a>
        </div>
      </div>
    </footer>
  );
}

window.Nav = Nav;
window.Hero = Hero;
window.PainSection = PainSection;
window.HowItWorksSection = HowItWorksSection;
window.TechStackSection = TechStackSection;
window.BeforeAfterSection = BeforeAfterSection;
window.TestimonialsSection = TestimonialsSection;
window.PricingSection = PricingSection;
window.FinalCTA = FinalCTA;
window.Footer = Footer;
