// Direction A — Editorial Cream
// NYT-Magazine-leaning: Instrument Serif, cream stock, hairline rules,
// drop caps, italics, generous whitespace. Narrative tone.
// All copy from the ContentCore Post 3 brief.

const editorialPalette = {
  paper: "#f4ecd8",
  paperDeep: "#ede1c4",
  ink: "#1c1812",
  inkSoft: "#3a322a",
  rule: "rgba(28,24,18,0.18)",
  accent: "#6b3a1f", // burnt sienna for italic accents
};

// Base style for editorial slides
const eSlideBase = {
  background: editorialPalette.paper,
  color: editorialPalette.ink,
  padding: "20px 22px",
  fontFamily: '"DM Sans", sans-serif',
};

const eKicker = {
  fontFamily: '"DM Sans", sans-serif',
  fontSize: "9px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 600,
  color: editorialPalette.inkSoft,
  marginBottom: "10px",
};

const eRule = {
  height: "1px",
  background: editorialPalette.rule,
  margin: "10px 0",
};

const eSerif = {
  fontFamily: '"Instrument Serif", serif',
  fontWeight: 400,
  letterSpacing: "-0.012em",
  lineHeight: 1.02,
};

const eHandle = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: "7.5px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(28,24,18,0.5)",
};

// ─── Slide 1 ──────────────────────────────────────────────────────
function ESlide1() {
  return (
    <div className="slide" style={{ ...eSlideBase, padding: "26px 24px" }}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>
        01 / 10
      </div>
      <div style={{ ...eKicker, marginBottom: "14px" }}>
        Essay · The Logic
      </div>

      <h1
        style={{
          ...eSerif,
          fontSize: "44px",
          margin: "0 0 14px",
          letterSpacing: "-0.02em",
        }}
      >
        Engineers build
        <br />
        the <em style={{ color: editorialPalette.accent }}>worst</em> social
        <br />
        media content.
      </h1>

      <div style={eRule}></div>

      <p
        style={{
          ...eSerif,
          fontSize: "16px",
          lineHeight: 1.25,
          fontStyle: "italic",
          color: editorialPalette.inkSoft,
          margin: "10px 0 0",
        }}
      >
        I should know.
        <br />
        I'm a CS student.
        <br />
        And that's exactly
        <br />
        why I'm winning.
      </p>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>swipe →</span>
      </div>
    </div>
  );
}

// ─── Slide 2 ──────────────────────────────────────────────────────
function ESlide2() {
  return (
    <div className="slide" style={eSlideBase}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>02 / 10</div>
      <div style={eKicker}>The diagnosis</div>

      <p
        style={{
          ...eSerif,
          fontSize: "26px",
          lineHeight: 1.05,
          margin: "8px 0 0",
        }}
      >
        Engineers explain
        <br />
        <em style={{ color: editorialPalette.accent }}>how</em> the product
        <br />
        works.
      </p>

      <div style={{ ...eRule, margin: "16px 0" }}></div>

      <p
        style={{
          ...eSerif,
          fontSize: "26px",
          lineHeight: 1.05,
          margin: 0,
        }}
      >
        Buyers only
        <br />
        care <em style={{ color: editorialPalette.accent }}>what</em> changes
        <br />
        about their life
        <br />
        on Monday.
      </p>

      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 22,
          right: 22,
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "10px",
          lineHeight: 1.4,
          color: editorialPalette.inkSoft,
          fontStyle: "italic",
        }}
      >
        That gap — between how and what — is where every<br />
        feed of SaaS content quietly dies.
      </div>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>02</span>
      </div>
    </div>
  );
}

// ─── Slide 3 — Bad example ────────────────────────────────────────
function ESlide3() {
  return (
    <div className="slide" style={eSlideBase}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>03 / 10</div>
      <div style={eKicker}>Exhibit A · Real copy</div>

      <p
        style={{
          ...eSerif,
          fontSize: "20px",
          lineHeight: 1.1,
          margin: "4px 0 12px",
        }}
      >
        Here is how an engineer
        <br />
        announces a launch:
      </p>

      <div
        style={{
          background: editorialPalette.paperDeep,
          border: `1px solid ${editorialPalette.rule}`,
          padding: "12px 14px",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "10px",
          lineHeight: 1.45,
          color: editorialPalette.ink,
        }}
      >
        <span style={{ color: "rgba(28,24,18,0.45)" }}>"</span>Excited
        to ship <span style={{ background: "rgba(107,58,31,0.12)" }}>multi-tenant RBAC</span>{" "}
        with <span style={{ background: "rgba(107,58,31,0.12)" }}>scoped JWTs</span>{" "}
        and a refactored event bus for{" "}
        <span style={{ background: "rgba(107,58,31,0.12)" }}>sub-50ms p99
        latency</span>.<span style={{ color: "rgba(28,24,18,0.45)" }}>"</span>
      </div>

      <p
        style={{
          ...eSerif,
          fontSize: "14px",
          fontStyle: "italic",
          lineHeight: 1.25,
          color: editorialPalette.accent,
          margin: "16px 0 0",
        }}
      >
        Nobody, anywhere,
        <br />
        woke up wanting this.
      </p>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>03</span>
      </div>
    </div>
  );
}

// ─── Slide 4 — Rewritten ──────────────────────────────────────────
function ESlide4() {
  return (
    <div className="slide" style={eSlideBase}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>04 / 10</div>
      <div style={eKicker}>Exhibit B · Same launch, translated</div>

      <p
        style={{
          ...eSerif,
          fontSize: "30px",
          lineHeight: 1.04,
          margin: "8px 0 14px",
        }}
      >
        "Your sales team
        <br />
        can finally stop
        <br />
        sharing one login."
      </p>

      <div style={eRule}></div>

      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "10px",
          lineHeight: 1.5,
          color: editorialPalette.inkSoft,
          margin: "10px 0 0",
        }}
      >
        Same release. Same code. Same Tuesday.<br />
        One sentence is a feature ship. The other is a
        sale. The product didn't change — the{" "}
        <em style={{ color: editorialPalette.accent }}>translator</em> did.
      </p>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>04</span>
      </div>
    </div>
  );
}

// ─── Slide 5 — The Pain ──────────────────────────────────────────
function ESlide5() {
  return (
    <div className="slide" style={eSlideBase}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>05 / 10</div>
      <div style={eKicker}>I. The Pain</div>

      <p
        style={{
          ...eSerif,
          fontSize: "26px",
          lineHeight: 1.05,
          margin: "6px 0 14px",
        }}
      >
        You open Instagram.
        <br />
        You stare at the
        <br />
        blank composer.
      </p>

      <div style={eRule}></div>

      <p
        style={{
          ...eSerif,
          fontStyle: "italic",
          fontSize: "16px",
          lineHeight: 1.25,
          color: editorialPalette.inkSoft,
          margin: "12px 0 0",
        }}
      >
        You post something
        <br />
        mediocre. You get
        <br />
        eleven likes. You
        <br />
        give up for two weeks.
      </p>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>05</span>
      </div>
    </div>
  );
}

// ─── Slide 6 — Agitation ──────────────────────────────────────────
function ESlide6() {
  return (
    <div className="slide" style={eSlideBase}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>06 / 10</div>
      <div style={eKicker}>II. The cost of staying invisible</div>

      <p
        style={{
          ...eSerif,
          fontSize: "22px",
          lineHeight: 1.08,
          margin: "6px 0 12px",
        }}
      >
        Meanwhile, your
        <br />
        <em style={{ color: editorialPalette.accent }}>louder</em> competitor
        <br />
        posts every day.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          borderTop: `1px solid ${editorialPalette.rule}`,
          borderBottom: `1px solid ${editorialPalette.rule}`,
          padding: "10px 0",
          margin: "10px 0",
        }}
      >
        <div>
          <div style={{ ...eHandle, marginBottom: "3px" }}>You</div>
          <div style={{ ...eSerif, fontSize: "20px" }}>11<span style={{fontSize:"10px",opacity:0.5}}> likes</span></div>
        </div>
        <div>
          <div style={{ ...eHandle, marginBottom: "3px" }}>Them</div>
          <div style={{ ...eSerif, fontSize: "20px", color: editorialPalette.accent }}>2,400<span style={{fontSize:"10px",opacity:0.5,color:editorialPalette.inkSoft}}> reach</span></div>
        </div>
      </div>

      <p
        style={{
          ...eSerif,
          fontStyle: "italic",
          fontSize: "13px",
          lineHeight: 1.3,
          color: editorialPalette.inkSoft,
          margin: 0,
        }}
      >
        Their product is worse.
        <br />
        Their copy isn't.
      </p>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>06</span>
      </div>
    </div>
  );
}

// ─── Slide 7 — The Outcome ──────────────────────────────────────────
function ESlide7() {
  return (
    <div className="slide" style={eSlideBase}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>07 / 10</div>
      <div style={eKicker}>III. What good carousel content does</div>

      <p
        style={{
          ...eSerif,
          fontSize: "22px",
          lineHeight: 1.08,
          margin: "6px 0 14px",
        }}
      >
        It explains the
        <br />
        buyer's problem
        <br />
        <em style={{ color: editorialPalette.accent }}>so well</em> that the
        <br />
        product becomes
        <br />
        the obvious answer.
      </p>

      <div style={eRule}></div>

      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "9.5px",
          lineHeight: 1.5,
          color: editorialPalette.inkSoft,
          margin: "8px 0 0",
        }}
      >
        Not "buy this." Not "we just shipped." Just: <em style={{color:editorialPalette.accent}}>here
        is the world you live in, and here is the
        door out of it.</em>
      </p>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>07</span>
      </div>
    </div>
  );
}

// ─── Slide 8 — The Formula ──────────────────────────────────────────
function ESlide8() {
  const rows = [
    ["Pain",      "Name the Monday-morning hell."],
    ["Agitation", "Make staying still feel expensive."],
    ["Outcome",   "Show the new Monday."],
    ["Product",   "Hand them the door."],
  ];
  return (
    <div className="slide" style={eSlideBase}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>08 / 10</div>
      <div style={eKicker}>The four-beat formula</div>

      <p style={{ ...eSerif, fontSize: "20px", lineHeight: 1.05, margin: "4px 0 12px" }}>
        Every carousel I ship
        <br />
        runs this loop:
      </p>

      <div style={{ borderTop: `1px solid ${editorialPalette.rule}` }}>
        {rows.map(([k, v], i) => (
          <div
            key={k}
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr",
              alignItems: "baseline",
              padding: "7px 0",
              borderBottom: `1px solid ${editorialPalette.rule}`,
              gap: "8px",
            }}
          >
            <div>
              <span style={{ ...eHandle, marginRight: "4px" }}>{`0${i + 1}`}</span>
              <span style={{ ...eSerif, fontSize: "14px", fontStyle: "italic", color: editorialPalette.accent }}>{k}</span>
            </div>
            <div style={{ ...eSerif, fontSize: "13px", lineHeight: 1.2 }}>{v}</div>
          </div>
        ))}
      </div>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>08</span>
      </div>
    </div>
  );
}

// ─── Slide 9 — The Edge ──────────────────────────────────────────
function ESlide9() {
  return (
    <div className="slide" style={eSlideBase}>
      <div className="slide-number" style={{ color: editorialPalette.inkSoft }}>09 / 10</div>
      <div style={eKicker}>Why I keep the edge</div>

      <p
        style={{
          ...eSerif,
          fontSize: "24px",
          lineHeight: 1.05,
          margin: "6px 0 12px",
        }}
      >
        I speak founder.
        <br />
        I write <em style={{ color: editorialPalette.accent }}>buyer</em>.
      </p>

      <div style={eRule}></div>

      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "10.5px",
          lineHeight: 1.5,
          color: editorialPalette.inkSoft,
          margin: "10px 0 0",
        }}
      >
        Most agencies don't know what a webhook is.
        <br />
        Most engineers can't write a hook line.<br /><br />
        I'm the rare middle. That's the whole company.
      </p>

      <div className="slide-footer" style={{ color: editorialPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>09</span>
      </div>
    </div>
  );
}

// ─── Slide 10 — CTA ──────────────────────────────────────────
function ESlide10() {
  return (
    <div
      className="slide"
      style={{
        ...eSlideBase,
        background: editorialPalette.ink,
        color: editorialPalette.paper,
        padding: "24px 22px",
      }}
    >
      <div className="slide-number" style={{ color: "rgba(244,236,216,0.5)" }}>10 / 10</div>
      <div style={{ ...eKicker, color: "rgba(244,236,216,0.6)" }}>
        ContentCore Studio
      </div>

      <p
        style={{
          ...eSerif,
          fontSize: "30px",
          lineHeight: 1.04,
          margin: "10px 0 12px",
          color: editorialPalette.paper,
        }}
      >
        Your product
        <br />
        deserves a better
        <br />
        <em style={{ color: "#e9b88a" }}>translator</em>.
      </p>

      <div style={{ ...eRule, background: "rgba(244,236,216,0.2)" }}></div>

      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "10px",
          lineHeight: 1.5,
          color: "rgba(244,236,216,0.75)",
          margin: "10px 0 0",
        }}
      >
        DM <span style={{color:"#e9b88a"}}>"rebuild"</span> for a free sample carousel built
        on <em>your</em> product.
        <br /><br />
        I do all the work. You approve and post.
      </p>

      <div
        className="slide-footer"
        style={{ color: "rgba(244,236,216,0.55)" }}
      >
        <span>@saasframes</span>
        <span>follow ↗</span>
      </div>
    </div>
  );
}

function EditorialCarousel() {
  const slides = [ESlide1, ESlide2, ESlide3, ESlide4, ESlide5, ESlide6, ESlide7, ESlide8, ESlide9, ESlide10];
  return (
    <div className="carousel-row" style={{ background: "#f0eee9" }}>
      <div className="carousel-meta">
        <div className="kicker">Direction A</div>
        <h2>Editorial Cream</h2>
        <p>NYT-Magazine quiet. Instrument Serif display, hairline rules, italic accents in burnt sienna. Narrative tone — every line reads like the start of a paragraph.</p>
        <div className="specs">
          10 slides · 1080×1350<br />
          serif · cream · 1 accent
        </div>
      </div>
      {slides.map((S, i) => <S key={i} />)}
    </div>
  );
}

window.EditorialCarousel = EditorialCarousel;
