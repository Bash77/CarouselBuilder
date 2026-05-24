// Direction C — Newsprint Op-Ed
// Heavy Cormorant Garamond headlines, datelines, two-column body text,
// drop caps, rule lines, paper texture. Punchy, declarative, op-ed tone.

const newsPalette = {
  paper: "#ece2c8",
  paperDeep: "#dfd2b1",
  ink: "#1a160e",
  inkSoft: "#3a3225",
  rule: "rgba(26,22,14,0.35)",
  ruleThin: "rgba(26,22,14,0.18)",
  red: "#8b2114", // op-ed red
  redInk: "#702010",
};

// Subtle paper noise via inline SVG (data URI fallback)
const paperBg = {
  background: newsPalette.paper,
  backgroundImage: `radial-gradient(rgba(60,40,10,0.06) 1px, transparent 1px), radial-gradient(rgba(60,40,10,0.04) 1px, transparent 1px)`,
  backgroundSize: "3px 3px, 7px 7px",
  backgroundPosition: "0 0, 1.5px 1.5px",
};

const nSlideBase = {
  ...paperBg,
  color: newsPalette.ink,
  padding: "16px 18px",
  fontFamily: '"DM Sans", sans-serif',
};

const nSerif = {
  fontFamily: '"Cormorant Garamond", serif',
  fontWeight: 700,
  letterSpacing: "-0.012em",
  lineHeight: 0.98,
};

const nBody = {
  fontFamily: '"Cormorant Garamond", serif',
  fontWeight: 500,
  fontSize: "10.5px",
  lineHeight: 1.35,
  color: newsPalette.ink,
};

const nMast = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: "7px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: newsPalette.inkSoft,
  fontWeight: 700,
};

// Masthead bar at top of every slide
function Masthead({ section, issue }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `2px solid ${newsPalette.ink}`,
      paddingBottom: "5px",
      marginBottom: "8px",
    }}>
      <span style={{ ...nMast, color: newsPalette.red }}>SAASFRAMES</span>
      <span style={{ ...nMast, fontSize: "6.5px", letterSpacing: "0.16em" }}>{section}</span>
      <span style={{ ...nMast, fontSize: "6.5px", letterSpacing: "0.16em" }}>{issue}</span>
    </div>
  );
}

// ─── Slide 1 — Hook (front page) ─────────────────────────────
function NSlide1() {
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>01 / 10</div>
      <Masthead section="OP-ED" issue="VOL. III · NO. 47" />

      <div style={{ ...nMast, color: newsPalette.red, fontSize: "8px", marginBottom: "4px" }}>
        OPINION · BY THE EDITORS
      </div>
      <h1 style={{ ...nSerif, fontSize: "32px", margin: "2px 0 8px" }}>
        Engineers build<br />
        the <span style={{ fontStyle: "italic", color: newsPalette.red }}>worst</span><br />
        social content<br />
        in tech.
      </h1>

      <div style={{ height: "1px", background: newsPalette.rule, margin: "8px 0" }} />

      <p style={{ ...nBody, fontStyle: "italic", fontSize: "11px", lineHeight: 1.3 }}>
        I should know. I'm a CS student. And
        that's precisely why I'm winning.
      </p>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>swipe →</span>
      </div>
    </div>
  );
}

// ─── Slide 2 — Diagnosis (two-column) ───────────────────────
function NSlide2() {
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>02</div>
      <Masthead section="THE DIAGNOSIS" issue="P. 02" />

      <h2 style={{ ...nSerif, fontSize: "20px", margin: "4px 0 8px" }}>
        How vs. What:<br />
        the only split<br />
        that matters.
      </h2>

      <div style={{ height: "1px", background: newsPalette.rule, marginBottom: "8px" }} />

      <div style={{ columnCount: 2, columnGap: "10px", columnRule: `1px solid ${newsPalette.ruleThin}` }}>
        <p style={{ ...nBody, fontSize: "9.5px", lineHeight: 1.35, margin: 0 }}>
          <span style={{
            float: "left", fontFamily: '"Cormorant Garamond", serif', fontWeight: 700,
            fontSize: "28px", lineHeight: "22px", padding: "2px 4px 0 0", color: newsPalette.red
          }}>E</span>
          ngineers describe how the product
          works under the hood — the schemas, the
          stack, the latencies.
          <br /><br />
          Buyers, with apologies, do not care.
          They want to know what changes about
          their Monday morning.
        </p>
      </div>

      <div style={{ ...nMast, fontSize: "6.5px", marginTop: "8px", textAlign: "center", color: newsPalette.red }}>
        — Continued on slide 3 —
      </div>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>02</span>
      </div>
    </div>
  );
}

// ─── Slide 3 — Exhibit A: bad copy ──────────────────────────
function NSlide3() {
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>03</div>
      <Masthead section="EXHIBIT A" issue="P. 03" />

      <div style={{ ...nMast, color: newsPalette.red, fontSize: "7px", marginBottom: "4px" }}>
        FOUND IN THE WILD
      </div>
      <h3 style={{ ...nSerif, fontWeight: 600, fontStyle: "italic", fontSize: "15px", margin: "0 0 8px", lineHeight: 1.05 }}>
        A launch post, as<br />
        written by engineering.
      </h3>

      <div style={{
        border: `1px solid ${newsPalette.rule}`,
        background: "rgba(26,22,14,0.04)",
        padding: "10px 11px",
        fontFamily: '"Cormorant Garamond", serif',
        fontStyle: "italic",
        fontSize: "11px",
        lineHeight: 1.3,
        position: "relative",
      }}>
        <span style={{ position: "absolute", top: -5, left: 6, background: newsPalette.paper, padding: "0 4px", ...nMast, fontSize: "6px" }}>verbatim</span>
        "Excited to ship <strong>multi-tenant RBAC</strong> with{" "}
        <strong>scoped JWTs</strong> and a refactored event bus for{" "}
        <strong>sub-50ms p99 latency</strong>."
      </div>

      <p style={{ ...nBody, fontSize: "10px", marginTop: "10px", fontStyle: "italic", color: newsPalette.redInk }}>
        Result: 11 likes. 0 buyers. 1 quiet retreat.
      </p>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>03</span>
      </div>
    </div>
  );
}

// ─── Slide 4 — Exhibit B: rewritten ─────────────────────────
function NSlide4() {
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>04</div>
      <Masthead section="EXHIBIT B" issue="P. 04" />

      <div style={{ ...nMast, color: newsPalette.red, fontSize: "7px", marginBottom: "4px" }}>
        SAME RELEASE, TRANSLATED
      </div>

      <h2 style={{ ...nSerif, fontSize: "26px", margin: "2px 0 10px", letterSpacing: "-0.015em" }}>
        "Your sales team<br />
        can finally stop<br />
        sharing <span style={{ fontStyle: "italic", color: newsPalette.red }}>one login</span>."
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "8px", alignItems: "stretch", borderTop: `1px solid ${newsPalette.rule}`, borderBottom: `1px solid ${newsPalette.rule}`, padding: "8px 0", marginTop: "4px" }}>
        <div>
          <div style={{ ...nMast, fontSize: "6.5px" }}>code shipped</div>
          <div style={{ ...nSerif, fontSize: "20px" }}>same.</div>
        </div>
        <div style={{ background: newsPalette.rule }} />
        <div>
          <div style={{ ...nMast, fontSize: "6.5px", color: newsPalette.red }}>reach earned</div>
          <div style={{ ...nSerif, fontSize: "20px", color: newsPalette.red }}>40×.</div>
        </div>
      </div>

      <p style={{ ...nBody, fontSize: "9.5px", marginTop: "8px", fontStyle: "italic" }}>
        The product didn't change. The translator did.
      </p>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>04</span>
      </div>
    </div>
  );
}

// ─── Slide 5 — The Pain ─────────────────────────────────────
function NSlide5() {
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>05</div>
      <Masthead section="I. THE PAIN" issue="P. 05" />

      <div style={{ ...nMast, color: newsPalette.red, fontSize: "7px", marginBottom: "4px" }}>
        A FOUNDER'S TUESDAY
      </div>
      <h2 style={{ ...nSerif, fontSize: "24px", margin: "2px 0 8px", fontWeight: 600 }}>
        You open the<br />
        composer. You<br />
        stare at the<br />
        <span style={{ fontStyle: "italic", color: newsPalette.red }}>blank</span>.
      </h2>

      <div style={{ height: "2px", background: newsPalette.ink, margin: "8px 0" }} />

      <p style={{ ...nBody, fontSize: "10px" }}>
        You post something mediocre. You get eleven likes.
        You give up — for two weeks. The cycle restarts on
        Thursday at 3pm. Always Thursday at 3pm.
      </p>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>05</span>
      </div>
    </div>
  );
}

// ─── Slide 6 — Agitation / chart ────────────────────────────
function NSlide6() {
  // Two ASCII-ish bar columns
  const months = ["JAN", "FEB", "MAR", "APR"];
  const you =   [2, 1, 2, 0];      // posts/month
  const them =  [22, 24, 26, 30];
  const max = 30;
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>06</div>
      <Masthead section="II. THE COST OF SILENCE" issue="P. 06" />

      <h2 style={{ ...nSerif, fontSize: "16px", margin: "2px 0 8px", fontWeight: 600 }}>
        Their product is worse.<br />
        <span style={{ fontStyle: "italic", color: newsPalette.red }}>Their copy isn't.</span>
      </h2>

      <div style={{ borderTop: `1px solid ${newsPalette.rule}`, borderBottom: `1px solid ${newsPalette.rule}`, padding: "8px 0", margin: "4px 0" }}>
        <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "72px" }}>
          {months.map((m, i) => (
            <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", height: "100%" }}>
              <div style={{ flex: 1, display: "flex", gap: "2px", alignItems: "flex-end", height: "100%", width: "100%", justifyContent: "center" }}>
                <div style={{ width: "8px", height: `${(you[i] / max) * 100}%`, background: newsPalette.inkSoft, opacity: 0.5, minHeight: "1px" }} />
                <div style={{ width: "8px", height: `${(them[i] / max) * 100}%`, background: newsPalette.red }} />
              </div>
              <div style={{ ...nMast, fontSize: "6.5px" }}>{m}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", fontSize: "8px", marginTop: "4px", ...nMast, fontWeight: 500 }}>
        <span><span style={{ display: "inline-block", width: "8px", height: "8px", background: newsPalette.inkSoft, opacity: 0.5, marginRight: "4px", verticalAlign: "middle" }} />you</span>
        <span><span style={{ display: "inline-block", width: "8px", height: "8px", background: newsPalette.red, marginRight: "4px", verticalAlign: "middle" }} />the louder competitor</span>
      </div>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>06</span>
      </div>
    </div>
  );
}

// ─── Slide 7 — The Outcome ──────────────────────────────────
function NSlide7() {
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>07</div>
      <Masthead section="III. THE OUTCOME" issue="P. 07" />

      <div style={{ ...nMast, color: newsPalette.red, fontSize: "7px", marginBottom: "4px" }}>
        WHAT GOOD CAROUSELS DO
      </div>

      <p style={{ ...nSerif, fontSize: "17px", fontWeight: 500, margin: "2px 0 10px", lineHeight: 1.1, fontStyle: "italic" }}>
        Explain the buyer's problem<br />
        so well that your product<br />
        becomes <span style={{ color: newsPalette.red, fontWeight: 700, fontStyle: "normal" }}>the obvious answer</span>.
      </p>

      <div style={{ height: "1px", background: newsPalette.rule, margin: "6px 0" }} />

      <ul style={{ ...nBody, fontSize: "10px", margin: 0, paddingLeft: "0", listStyle: "none" }}>
        <li style={{ marginBottom: "3px" }}>— Not "buy this."</li>
        <li style={{ marginBottom: "3px" }}>— Not "we shipped."</li>
        <li style={{ color: newsPalette.red, fontStyle: "italic" }}>— Here is the door out.</li>
      </ul>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>07</span>
      </div>
    </div>
  );
}

// ─── Slide 8 — The Formula ──────────────────────────────────
function NSlide8() {
  const rows = [
    ["I.",   "Pain",      "Name the Monday-morning hell."],
    ["II.",  "Agitation", "Make standing still feel expensive."],
    ["III.", "Outcome",   "Show the new Monday."],
    ["IV.",  "Product",   "Hand them the door."],
  ];
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>08</div>
      <Masthead section="IV. THE METHOD" issue="P. 08" />

      <h3 style={{ ...nSerif, fontSize: "15px", margin: "2px 0 8px", fontStyle: "italic", fontWeight: 600 }}>
        The four-beat loop, in order.
      </h3>

      <div style={{ borderTop: `2px solid ${newsPalette.ink}` }}>
        {rows.map(([r, k, v]) => (
          <div key={k} style={{
            display: "grid",
            gridTemplateColumns: "22px 72px 1fr",
            gap: "6px",
            alignItems: "baseline",
            padding: "6px 0",
            borderBottom: `1px solid ${newsPalette.ruleThin}`,
          }}>
            <span style={{ ...nMast, fontSize: "7px", color: newsPalette.red }}>{r}</span>
            <span style={{ ...nSerif, fontSize: "14px", fontWeight: 700 }}>{k}</span>
            <span style={{ ...nBody, fontSize: "10px", fontStyle: "italic" }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>08</span>
      </div>
    </div>
  );
}

// ─── Slide 9 — The Edge ─────────────────────────────────────
function NSlide9() {
  return (
    <div className="slide" style={nSlideBase}>
      <div className="slide-number" style={{ color: newsPalette.inkSoft }}>09</div>
      <Masthead section="V. THE EDGE" issue="P. 09" />

      <div style={{ ...nMast, color: newsPalette.red, fontSize: "7px", marginBottom: "4px" }}>
        WHY THE MIDDLE WINS
      </div>

      <h2 style={{ ...nSerif, fontSize: "22px", margin: "2px 0 8px", lineHeight: 1.05 }}>
        I speak <span style={{ fontStyle: "italic" }}>founder</span>.<br />
        I write <span style={{ fontStyle: "italic", color: newsPalette.red }}>buyer</span>.
      </h2>

      <div style={{ height: "1px", background: newsPalette.rule, margin: "6px 0" }} />

      <p style={{ ...nBody, fontSize: "10px" }}>
        Most agencies have never seen a webhook.
        Most engineers have never written a hook
        line. The rare middle is the whole company.
      </p>

      <div className="slide-footer" style={{ color: newsPalette.inkSoft }}>
        <span>@saasframes</span>
        <span>09</span>
      </div>
    </div>
  );
}

// ─── Slide 10 — CTA (back cover) ────────────────────────────
function NSlide10() {
  return (
    <div className="slide" style={{
      ...nSlideBase,
      background: newsPalette.ink,
      color: newsPalette.paper,
      backgroundImage: `radial-gradient(rgba(255,240,210,0.06) 1px, transparent 1px)`,
      backgroundSize: "4px 4px",
    }}>
      <div className="slide-number" style={{ color: "rgba(236,226,200,0.5)" }}>10</div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `2px solid ${newsPalette.paper}`,
        paddingBottom: "5px",
        marginBottom: "8px",
      }}>
        <span style={{ ...nMast, color: "#e9b88a", fontSize: "7px" }}>SAASFRAMES</span>
        <span style={{ ...nMast, fontSize: "6.5px", color: "rgba(236,226,200,0.6)" }}>BACK COVER</span>
        <span style={{ ...nMast, fontSize: "6.5px", color: "rgba(236,226,200,0.6)" }}>P. 10</span>
      </div>

      <div style={{ ...nMast, color: "#e9b88a", fontSize: "7px", marginBottom: "2px" }}>
        CLASSIFIED · CONTENTCORE STUDIO
      </div>
      <h2 style={{ ...nSerif, fontSize: "26px", color: newsPalette.paper, margin: "4px 0 10px" }}>
        Your product<br />
        deserves a better<br />
        <span style={{ fontStyle: "italic", color: "#e9b88a" }}>translator</span>.
      </h2>

      <div style={{ height: "1px", background: "rgba(236,226,200,0.3)", margin: "6px 0" }} />

      <p style={{ ...nBody, fontSize: "10px", color: "rgba(236,226,200,0.85)" }}>
        DM <strong style={{ color: "#e9b88a", fontStyle: "italic" }}>"rebuild"</strong> —
        receive a free sample carousel built on
        your product, inside 48 hours.
      </p>

      <div className="slide-footer" style={{ color: "rgba(236,226,200,0.55)" }}>
        <span>@saasframes</span>
        <span>follow ↗</span>
      </div>
    </div>
  );
}

function NewsprintCarousel() {
  const slides = [NSlide1, NSlide2, NSlide3, NSlide4, NSlide5, NSlide6, NSlide7, NSlide8, NSlide9, NSlide10];
  return (
    <div className="carousel-row" style={{ background: "#e4d9bd" }}>
      <div className="carousel-meta">
        <div className="kicker">Direction C</div>
        <h2>Newsprint Op-Ed</h2>
        <p>Cormorant Garamond headlines, masthead bars, drop-caps, two-column setting, a bar chart drawn with ink. Punchy, declarative — the loudest of the three.</p>
        <div className="specs">
          10 slides · 1080×1350<br />
          serif · paper · op-ed red
        </div>
      </div>
      {slides.map((S, i) => <S key={i} />)}
    </div>
  );
}

window.NewsprintCarousel = NewsprintCarousel;
