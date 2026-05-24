// Direction B — Split System
// Each slide is split between a code/terminal panel (dark) and an
// editorial panel (cream). The split IS the concept — engineer ↔ buyer.
// Tone: demonstrative, technical-meets-prose.

const splitPalette = {
  paper: "#f1ead4",
  paperDeep: "#e6dcbe",
  ink: "#1c1812",
  cream: "#f5eedb",
  code: "#0d1117",
  codeAlt: "#161b22",
  border: "#222a35",
  green: "#7ee787",
  blue: "#79c0ff",
  magenta: "#f0883e",
  white: "#e6edf3",
  muted: "#8b949e",
  accent: "#c96442",
};

const sSlideBase = {
  background: splitPalette.paper,
  color: splitPalette.ink,
  fontFamily: '"DM Sans", sans-serif',
};

const sMono = { fontFamily: '"JetBrains Mono", monospace' };
const sSerif = {
  fontFamily: '"Instrument Serif", serif',
  fontWeight: 400,
  letterSpacing: "-0.01em",
};

// Code line component
function CodeLine({ children, num, color = splitPalette.white }) {
  return (
    <div style={{ display: "flex", gap: "8px", lineHeight: 1.55 }}>
      {num !== undefined && (
        <span style={{ color: splitPalette.muted, opacity: 0.5, width: "12px", textAlign: "right", flex: "0 0 auto" }}>
          {num}
        </span>
      )}
      <span style={{ color, flex: 1 }}>{children}</span>
    </div>
  );
}

// ─── Slide 1 — Hook (full bleed split) ──────────────────────────
function SSlide1() {
  return (
    <div className="slide" style={{ ...sSlideBase, padding: 0, display: "flex", flexDirection: "column" }}>
      <div className="slide-number" style={{ color: splitPalette.muted }}>01 / 10</div>
      {/* Code half */}
      <div style={{ background: splitPalette.code, color: splitPalette.white, padding: "20px 18px 18px", flex: "0 0 46%", ...sMono, fontSize: "9px" }}>
        <div style={{ color: splitPalette.muted, marginBottom: "6px", fontSize: "7.5px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          engineer_writes.py
        </div>
        <CodeLine num={1} color={splitPalette.magenta}>def announce_launch():</CodeLine>
        <CodeLine num={2}>{"  return f\""}<span style={{color:splitPalette.green}}>Shipped multi-tenant</span></CodeLine>
        <CodeLine num={3}>{"  "}<span style={{color:splitPalette.green}}>RBAC w/ scoped JWTs and</span></CodeLine>
        <CodeLine num={4}>{"  "}<span style={{color:splitPalette.green}}>sub-50ms p99 latency.\""}</span></CodeLine>
      </div>
      {/* Editorial half */}
      <div style={{ flex: 1, padding: "16px 18px", background: splitPalette.cream, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ ...sMono, fontSize: "7.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: splitPalette.accent, marginBottom: "6px" }}>
            why engineers lose
          </div>
          <h1 style={{ ...sSerif, fontSize: "30px", lineHeight: 1.02, margin: 0 }}>
            They ship<br />
            <em style={{ color: splitPalette.accent }}>features</em>.
            <br />
            Buyers buy<br />
            <em style={{ color: splitPalette.accent }}>outcomes</em>.
          </h1>
        </div>
        <div className="slide-footer" style={{ position: "static", color: "rgba(28,24,18,0.55)", padding: 0, marginTop: "8px" }}>
          <span>@saasframes</span>
          <span>swipe →</span>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 2 — vertical split: how vs. what ────────────────────
function SSlide2() {
  return (
    <div className="slide" style={{ ...sSlideBase, padding: 0, display: "flex" }}>
      <div className="slide-number" style={{ color: splitPalette.muted, top: 10, right: 10 }}>02</div>
      {/* HOW — left, code */}
      <div style={{ flex: 1, background: splitPalette.code, color: splitPalette.white, padding: "18px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ ...sMono, fontSize: "7px", color: splitPalette.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>$ how</div>
          <div style={{ ...sMono, fontSize: "9px", lineHeight: 1.55, color: splitPalette.green }}>
            <div>// internal</div>
            <div style={{ color: splitPalette.white }}>auth.refactor(</div>
            <div style={{ color: splitPalette.blue, marginLeft: "8px" }}>tenants,</div>
            <div style={{ color: splitPalette.blue, marginLeft: "8px" }}>roles,</div>
            <div style={{ color: splitPalette.blue, marginLeft: "8px" }}>tokens</div>
            <div style={{ color: splitPalette.white }}>)</div>
          </div>
        </div>
        <div style={{ ...sMono, fontSize: "7px", color: splitPalette.muted, opacity: 0.7 }}>
          what engineers post
        </div>
      </div>
      {/* WHAT — right, editorial */}
      <div style={{ flex: 1, background: splitPalette.cream, padding: "18px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ ...sMono, fontSize: "7px", color: splitPalette.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>// what</div>
          <p style={{ ...sSerif, fontSize: "17px", lineHeight: 1.1, margin: 0 }}>
            "Your sales<br />
            team can <em style={{ color: splitPalette.accent }}>finally</em><br />
            stop sharing<br />
            one login."
          </p>
        </div>
        <div style={{ fontSize: "8px", color: "rgba(28,24,18,0.55)", lineHeight: 1.4 }}>
          what the buyer<br />actually pays for
        </div>
      </div>
      <div className="slide-footer" style={{ color: "rgba(28,24,18,0.55)", left: "auto", right: 12, width: "auto", justifyContent: "flex-end" }}>
        <span>@saasframes</span>
      </div>
    </div>
  );
}

// ─── Slide 3 — code dump (Exhibit A) ────────────────────────────
function SSlide3() {
  return (
    <div className="slide" style={{ background: splitPalette.code, color: splitPalette.white, padding: "18px 16px", ...sMono, fontSize: "8.5px" }}>
      <div className="slide-number" style={{ color: splitPalette.muted }}>03</div>
      <div style={{ color: splitPalette.muted, fontSize: "7px", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>
        Exhibit A · linkedin_post.txt
      </div>

      <div style={{ background: splitPalette.codeAlt, padding: "12px", border: `1px solid ${splitPalette.border}`, borderRadius: "4px", lineHeight: 1.55 }}>
        <span style={{ color: splitPalette.muted }}>{"// "}</span>
        <span style={{ color: splitPalette.muted }}>posted today</span>
        <br />
        <span style={{ color: splitPalette.white }}>"Excited to ship </span>
        <span style={{ color: splitPalette.magenta }}>multi-tenant RBAC</span>
        <span style={{ color: splitPalette.white }}> w/ </span>
        <span style={{ color: splitPalette.magenta }}>scoped JWTs</span>
        <span style={{ color: splitPalette.white }}> and a refactored event bus for </span>
        <span style={{ color: splitPalette.magenta }}>sub-50ms p99 latency</span>
        <span style={{ color: splitPalette.white }}>."</span>
      </div>

      <div style={{ marginTop: "14px", color: splitPalette.green, fontSize: "8.5px", lineHeight: 1.6 }}>
        <div>{"engagement = {"}</div>
        <div style={{ marginLeft: "8px" }}>likes: <span style={{color:splitPalette.blue}}>11</span>,</div>
        <div style={{ marginLeft: "8px" }}>shares: <span style={{color:splitPalette.blue}}>0</span>,</div>
        <div style={{ marginLeft: "8px" }}>buyers_understood: <span style={{color:"#ff7b72"}}>None</span></div>
        <div>{"}"}</div>
      </div>

      <div className="slide-footer" style={{ color: splitPalette.muted }}>
        <span>@saasframes</span>
        <span>03</span>
      </div>
    </div>
  );
}

// ─── Slide 4 — Editorial rewrite (Exhibit B) ────────────────────
function SSlide4() {
  return (
    <div className="slide" style={{ ...sSlideBase, padding: "24px 22px", background: splitPalette.cream }}>
      <div className="slide-number" style={{ color: "rgba(28,24,18,0.45)" }}>04</div>
      <div style={{ ...sMono, fontSize: "7.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: splitPalette.accent, marginBottom: "12px" }}>
        Exhibit B · same release, rewritten
      </div>

      <p style={{ ...sSerif, fontSize: "30px", lineHeight: 1.04, margin: "8px 0 16px" }}>
        "Your sales team
        <br />
        can finally stop
        <br />
        sharing <em style={{ color: splitPalette.accent }}>one login</em>."
      </p>

      <div style={{ height: "1px", background: "rgba(28,24,18,0.18)", margin: "10px 0" }}></div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "10px" }}>
        <div>
          <div style={{ ...sMono, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(28,24,18,0.55)", marginBottom: "3px" }}>code shipped</div>
          <div style={{ ...sSerif, fontSize: "20px" }}>same.</div>
        </div>
        <div>
          <div style={{ ...sMono, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(28,24,18,0.55)", marginBottom: "3px" }}>buyers reached</div>
          <div style={{ ...sSerif, fontSize: "20px", color: splitPalette.accent }}>40x.</div>
        </div>
      </div>

      <div className="slide-footer" style={{ color: "rgba(28,24,18,0.55)" }}>
        <span>@saasframes</span>
        <span>04</span>
      </div>
    </div>
  );
}

// ─── Slide 5 — The Pain (split panel) ───────────────────────────
function SSlide5() {
  return (
    <div className="slide" style={{ ...sSlideBase, padding: 0, display: "flex", flexDirection: "column" }}>
      <div className="slide-number" style={{ color: "rgba(28,24,18,0.45)" }}>05</div>
      <div style={{ flex: 1, padding: "20px 22px", background: splitPalette.cream }}>
        <div style={{ ...sMono, fontSize: "7.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: splitPalette.accent, marginBottom: "10px" }}>
          I. The Pain
        </div>
        <p style={{ ...sSerif, fontSize: "24px", lineHeight: 1.04, margin: 0 }}>
          You open the<br />
          composer. You<br />
          stare at the <em style={{color: splitPalette.accent}}>blank</em>.
        </p>
      </div>
      <div style={{ background: splitPalette.code, color: splitPalette.white, padding: "12px 16px", ...sMono, fontSize: "8.5px", lineHeight: 1.6 }}>
        <span style={{ color: splitPalette.muted }}>$</span> mediocre_post.publish()
        <br />
        <span style={{ color: splitPalette.muted }}>→</span> 11 likes
        <br />
        <span style={{ color: splitPalette.muted }}>$</span> sleep(<span style={{color:splitPalette.blue}}>14 days</span>)
      </div>
      <div className="slide-footer" style={{ color: splitPalette.muted }}>
        <span>@saasframes</span>
        <span>05</span>
      </div>
    </div>
  );
}

// ─── Slide 6 — Agitation: the gap ───────────────────────────────
function SSlide6() {
  return (
    <div className="slide" style={{ background: splitPalette.code, color: splitPalette.white, padding: "20px 18px", ...sMono, fontSize: "9px" }}>
      <div className="slide-number" style={{ color: splitPalette.muted }}>06</div>
      <div style={{ color: splitPalette.muted, fontSize: "7.5px", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>
        II. The compounding gap
      </div>

      <p style={{ ...sSerif, fontFamily: '"Instrument Serif", serif', fontSize: "22px", lineHeight: 1.06, color: splitPalette.cream, margin: "0 0 14px" }}>
        Your <em style={{color:splitPalette.accent}}>louder</em><br />competitor<br />ships less.
      </p>

      <div style={{ borderTop: `1px solid ${splitPalette.border}`, borderBottom: `1px solid ${splitPalette.border}`, padding: "10px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <div style={{ color: splitPalette.muted, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.12em" }}>you.posts</div>
            <div style={{ fontSize: "18px", color: splitPalette.white, marginTop: "2px" }}>2<span style={{color:splitPalette.muted,fontSize:"10px"}}>/mo</span></div>
            <div style={{ fontSize: "7.5px", color: splitPalette.muted, marginTop: "1px" }}>reach: 11</div>
          </div>
          <div>
            <div style={{ color: splitPalette.accent, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.12em" }}>them.posts</div>
            <div style={{ fontSize: "18px", color: splitPalette.green, marginTop: "2px" }}>22<span style={{color:splitPalette.muted,fontSize:"10px"}}>/mo</span></div>
            <div style={{ fontSize: "7.5px", color: splitPalette.muted, marginTop: "1px" }}>reach: 2,400</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "12px", fontSize: "8.5px", lineHeight: 1.55, color: splitPalette.cream, fontFamily: '"DM Sans", sans-serif' }}>
        Their product is worse.<br />
        <span style={{color:splitPalette.accent}}>Their copy isn't.</span>
      </div>

      <div className="slide-footer" style={{ color: splitPalette.muted }}>
        <span>@saasframes</span>
        <span>06</span>
      </div>
    </div>
  );
}

// ─── Slide 7 — The Outcome ──────────────────────────────────────
function SSlide7() {
  return (
    <div className="slide" style={{ ...sSlideBase, padding: "22px 22px", background: splitPalette.cream }}>
      <div className="slide-number" style={{ color: "rgba(28,24,18,0.45)" }}>07</div>
      <div style={{ ...sMono, fontSize: "7.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: splitPalette.accent, marginBottom: "12px" }}>
        III. What good content does
      </div>

      <p style={{ ...sSerif, fontSize: "21px", lineHeight: 1.06, margin: "4px 0 14px" }}>
        Explain the buyer's<br />
        problem <em style={{color:splitPalette.accent}}>so well</em><br />
        that your product<br />
        becomes the obvious<br />
        answer.
      </p>

      <div style={{
        ...sMono, fontSize: "8.5px", lineHeight: 1.55,
        background: splitPalette.code, color: splitPalette.green,
        padding: "8px 10px", borderRadius: "4px", marginTop: "8px"
      }}>
        <span style={{color:splitPalette.muted}}>→</span> not "buy this"<br />
        <span style={{color:splitPalette.muted}}>→</span> not "we shipped"<br />
        <span style={{color:splitPalette.blue}}>→</span> here is the door out.
      </div>

      <div className="slide-footer" style={{ color: "rgba(28,24,18,0.55)" }}>
        <span>@saasframes</span>
        <span>07</span>
      </div>
    </div>
  );
}

// ─── Slide 8 — The Formula (code) ───────────────────────────────
function SSlide8() {
  return (
    <div className="slide" style={{ background: splitPalette.code, color: splitPalette.white, padding: "18px 16px", ...sMono, fontSize: "9px" }}>
      <div className="slide-number" style={{ color: splitPalette.muted }}>08</div>
      <div style={{ color: splitPalette.muted, fontSize: "7.5px", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>
        IV. The four-beat loop
      </div>

      <div style={{ background: splitPalette.codeAlt, padding: "12px 12px", border: `1px solid ${splitPalette.border}`, borderRadius: "4px", lineHeight: 1.7 }}>
        <span style={{ color: splitPalette.magenta }}>function</span>{" "}
        <span style={{ color: splitPalette.blue }}>carousel</span>(product) {"{"}
        <div style={{ marginLeft: "10px" }}>
          <span style={{color:splitPalette.muted}}>// 1.</span> pain    = <span style={{color:splitPalette.green}}>"monday-hell"</span><br />
          <span style={{color:splitPalette.muted}}>// 2.</span> agitate = <span style={{color:splitPalette.green}}>"cost-of-still"</span><br />
          <span style={{color:splitPalette.muted}}>// 3.</span> outcome = <span style={{color:splitPalette.green}}>"new-monday"</span><br />
          <span style={{color:splitPalette.muted}}>// 4.</span> product = <span style={{color:splitPalette.green}}>"the-door"</span><br />
          <span style={{ color: splitPalette.magenta }}>return</span>{" "}
          <span style={{ color: splitPalette.blue }}>render</span>(...)
        </div>
        {"}"}
      </div>

      <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: "13px", marginTop: "12px", lineHeight: 1.25, color: splitPalette.cream, fontStyle: "italic" }}>
        Every slide I ship<br />
        passes through this.
      </div>

      <div className="slide-footer" style={{ color: splitPalette.muted }}>
        <span>@saasframes</span>
        <span>08</span>
      </div>
    </div>
  );
}

// ─── Slide 9 — The edge ─────────────────────────────────────────
function SSlide9() {
  return (
    <div className="slide" style={{ ...sSlideBase, padding: 0, display: "flex" }}>
      <div className="slide-number" style={{ color: "rgba(28,24,18,0.45)", top: 10, right: 10 }}>09</div>
      <div style={{ flex: 1, background: splitPalette.code, color: splitPalette.white, padding: "18px 14px" }}>
        <div style={{ ...sMono, fontSize: "7px", color: splitPalette.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>i speak</div>
        <p style={{ ...sSerif, fontSize: "22px", lineHeight: 1.05, color: splitPalette.cream, margin: 0 }}>
          founder.
        </p>
        <div style={{ ...sMono, fontSize: "8.5px", color: splitPalette.green, marginTop: "14px", lineHeight: 1.55 }}>
          {"// stack-trace fluent"}<br />
          {"// API-shape native"}<br />
          {"// ships nightly"}
        </div>
      </div>
      <div style={{ flex: 1, background: splitPalette.cream, padding: "18px 14px" }}>
        <div style={{ ...sMono, fontSize: "7px", color: splitPalette.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>i write</div>
        <p style={{ ...sSerif, fontSize: "22px", lineHeight: 1.05, margin: 0 }}>
          <em style={{ color: splitPalette.accent }}>buyer</em>.
        </p>
        <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "8.5px", color: "rgba(28,24,18,0.65)", marginTop: "14px", lineHeight: 1.5 }}>
          headlines that<br />
          land. drop-caps.<br />
          the rare middle.
        </div>
      </div>
      <div className="slide-footer" style={{ color: "rgba(28,24,18,0.55)", background: "rgba(245,238,219,0.85)", padding: "4px 12px", left: "50%", transform: "translateX(-50%)", width: "auto", borderRadius: "999px", bottom: 10 }}>
        <span style={{marginRight:"6px"}}>@saasframes</span>
      </div>
    </div>
  );
}

// ─── Slide 10 — CTA ─────────────────────────────────────────────
function SSlide10() {
  return (
    <div className="slide" style={{ background: splitPalette.code, color: splitPalette.white, padding: "22px 20px", ...sMono }}>
      <div className="slide-number" style={{ color: splitPalette.muted }}>10</div>
      <div style={{ fontSize: "7.5px", color: splitPalette.muted, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>
        ContentCore Studio
      </div>

      <p style={{ ...sSerif, fontFamily: '"Instrument Serif", serif', fontSize: "28px", lineHeight: 1.04, margin: "8px 0 14px", color: splitPalette.cream }}>
        Your product<br />
        deserves a better<br />
        <em style={{ color: splitPalette.accent }}>translator</em>.
      </p>

      <div style={{ background: splitPalette.codeAlt, padding: "10px 12px", borderRadius: "4px", fontSize: "8.5px", lineHeight: 1.65, border: `1px solid ${splitPalette.border}` }}>
        <span style={{color:splitPalette.muted}}>$</span> DM <span style={{color:splitPalette.green}}>"rebuild"</span><br />
        <span style={{color:splitPalette.muted}}>→</span> free sample carousel<br />
        <span style={{color:splitPalette.muted}}>→</span> built on your product<br />
        <span style={{color:splitPalette.muted}}>→</span> in 48h
      </div>

      <div className="slide-footer" style={{ color: splitPalette.muted }}>
        <span>@saasframes</span>
        <span>follow ↗</span>
      </div>
    </div>
  );
}

function SplitCarousel() {
  const slides = [SSlide1, SSlide2, SSlide3, SSlide4, SSlide5, SSlide6, SSlide7, SSlide8, SSlide9, SSlide10];
  return (
    <div className="carousel-row" style={{ background: "#ece7dc" }}>
      <div className="carousel-meta">
        <div className="kicker">Direction B</div>
        <h2>Split System</h2>
        <p>Code panel meets editorial cream on every slide. The visual split <em>is</em> the concept: engineer-on-the-left, buyer-on-the-right. Demonstrative, technical-meets-prose.</p>
        <div className="specs">
          10 slides · 1080×1350<br />
          dark + cream · 5 panel layouts
        </div>
      </div>
      {slides.map((S, i) => <S key={i} />)}
    </div>
  );
}

window.SplitCarousel = SplitCarousel;
