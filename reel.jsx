// reel.jsx — ContentCore Studio · 8-scene animated Reel (9:16, 36s)
// Editorial Cream visual language — Instrument Serif + burnt sienna accents
// Stage native size: 1080 × 1920

const PAL = {
  paper: "#f4ecd8",
  paperDeep: "#ede1c4",
  ink: "#1a1612",
  inkSoft: "#3a322a",
  rule: "rgba(28,24,18,0.18)",
  ruleDark: "rgba(244,236,216,0.22)",
  accent: "#6b3a1f",
  accentBright: "#c96442",
  accentSoft: "#e9b88a",
};

const SERIF = '"Instrument Serif", serif';
const SANS = '"DM Sans", sans-serif';
const MONO = '"JetBrains Mono", monospace';

// Scene windows ───────────────────────────────────────────────────
const T = {
  hook:     [0,    4.0],
  pain:     [4.0,  9.0],
  why:      [9.0,  13.0],
  cost:     [13.0, 17.5],
  solution: [17.5, 22.5],
  what:     [22.5, 27.0],
  numbers:  [27.0, 31.5],
  cta:      [31.5, 36.0],
};
const DURATION = 36;

// ─── Helpers ─────────────────────────────────────────────────────

// Full-bleed colored scene background, gated to a time window.
// Cross-fades 0.3s at edges.
function SceneBg({ color, start, end, fadeIn = 0.35, fadeOut = 0.35 }) {
  const time = useTime();
  if (time < start - 0.3 || time > end + 0.3) return null;
  let opacity = 1;
  if (time < start) opacity = clamp((time - (start - fadeIn)) / fadeIn, 0, 1);
  else if (time > end - fadeOut) opacity = clamp(1 - (time - (end - fadeOut)) / fadeOut, 0, 1);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity,
        zIndex: 0,
      }}
    />
  );
}

// Mono kicker that holds for full scene, fades in/out
function Kicker({ text, x = 90, y = 110, color = PAL.inkSoft, start, end, dur = 0.4 }) {
  return (
    <Sprite start={start} end={end}>
      <TextSprite
        text={text}
        x={x}
        y={y}
        size={26}
        font={MONO}
        weight={700}
        color={color}
        letterSpacing="0.22em"
        entryDur={dur}
        exitDur={dur}
      />
    </Sprite>
  );
}

// Animated hairline rule — grows from left
function HairlineRule({ x, y, length, color = PAL.rule, start, end, growDur = 0.5, thickness = 1.5 }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const tIn = clamp(localTime / growDur, 0, 1);
        const w = length * Easing.easeOutCubic(tIn);
        const exitStart = Math.max(0, duration - 0.35);
        const op = localTime > exitStart
          ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1)
          : 1;
        return (
          <div
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: thickness,
              background: color,
              opacity: op,
            }}
          />
        );
      }}
    </Sprite>
  );
}

// Brand mark in corner — appears scene 5 onward
function BrandMark() {
  return (
    <Sprite start={T.solution[0] + 1.2} end={DURATION}>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 90,
          fontFamily: MONO,
          fontSize: 22,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(244,236,216,0.55)",
          fontWeight: 700,
        }}
      >
        @saasframes
      </div>
    </Sprite>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 1 — HOOK
// "You built something great. Nobody knows it exists."
// ═════════════════════════════════════════════════════════════════
function SceneHook() {
  const [s, e] = T.hook;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="01 · THE HOOK" start={s} end={e} />
      <Sprite start={s + 0.0} end={e}>
        <TextSprite
          text={"You built"}
          x={90}
          y={620}
          size={140}
          font={SERIF}
          weight={400}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.55}
          exitDur={0.35}
          entryEase={Easing.easeOutQuart}
        />
      </Sprite>
      <Sprite start={s + 0.35} end={e}>
        <TextSprite
          text={"something great."}
          x={90}
          y={770}
          size={140}
          font={SERIF}
          weight={400}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.55}
          exitDur={0.35}
          entryEase={Easing.easeOutQuart}
        />
      </Sprite>
      <HairlineRule x={90} y={970} length={900} start={s + 1.1} end={e} />
      {/* Sienna italic punchline */}
      <Sprite start={s + 1.4} end={e}>
        <TextSprite
          text={"Nobody knows"}
          x={90}
          y={1030}
          size={120}
          font={SERIF}
          weight={400}
          color={PAL.accent}
          letterSpacing="-0.02em"
          entryDur={0.55}
          exitDur={0.35}
          entryEase={Easing.easeOutQuart}
        />
      </Sprite>
      <Sprite start={s + 1.9} end={e}>
        <TextSprite
          text={"it exists."}
          x={90}
          y={1170}
          size={170}
          font={SERIF}
          weight={400}
          color={PAL.accent}
          letterSpacing="-0.03em"
          entryDur={0.55}
          exitDur={0.35}
          entryEase={Easing.easeOutQuart}
        />
      </Sprite>
      {/* tiny italic tag */}
      <Sprite start={s + 2.7} end={e}>
        <TextSprite
          text={"A reel for SaaS founders."}
          x={90}
          y={1700}
          size={34}
          font={SERIF}
          weight={400}
          color={PAL.inkSoft}
          letterSpacing="0"
          entryDur={0.5}
          exitDur={0.3}
        />
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 2 — PAIN
// Cycle: open IG → blank → 11 likes → give up 14 days
// ═════════════════════════════════════════════════════════════════
function ScenePain() {
  const [s, e] = T.pain;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="02 · THE LOOP" start={s} end={e} />

      {/* Beat 1 — Open Instagram. */}
      <Sprite start={s + 0.0} end={s + 2.2}>
        <TextSprite
          text={"You open Instagram."}
          x={90}
          y={500}
          size={92}
          font={SERIF}
          color={PAL.ink}
          entryDur={0.5}
          exitDur={0.4}
        />
      </Sprite>
      {/* Composer rect — blank */}
      <Sprite start={s + 0.4} end={s + 2.2}>
        {({ localTime, duration }) => {
          const t = clamp(localTime / 0.4, 0, 1);
          const exitStart = duration - 0.4;
          const o = localTime > exitStart ? 1 - (localTime - exitStart) / 0.4 : t;
          return (
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 640,
                width: 900,
                height: 360,
                border: `2px solid ${PAL.rule}`,
                borderRadius: 18,
                opacity: o,
                background: "rgba(28,24,18,0.02)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  fontFamily: MONO,
                  fontSize: 24,
                  color: PAL.inkSoft,
                  opacity: 0.5,
                  letterSpacing: "0.05em",
                }}
              >
                What's on your mind?
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Beat 2 — Post mediocre */}
      <Sprite start={s + 2.0} end={s + 3.6}>
        <TextSprite
          text={"Post something mediocre."}
          x={90}
          y={500}
          size={92}
          font={SERIF}
          color={PAL.ink}
          entryDur={0.45}
          exitDur={0.35}
        />
      </Sprite>
      {/* Big 11 */}
      <Sprite start={s + 2.3} end={s + 3.6}>
        {({ localTime, duration }) => {
          const t = clamp(localTime / 0.55, 0, 1);
          const eased = Easing.easeOutBack(t);
          const exitStart = duration - 0.3;
          const op = localTime > exitStart ? 1 - (localTime - exitStart) / 0.3 : t;
          return (
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 640,
                width: 900,
                opacity: op,
                transform: `scale(${0.7 + 0.3 * eased})`,
                transformOrigin: "left top",
              }}
            >
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 360,
                  lineHeight: 0.85,
                  color: PAL.accent,
                  letterSpacing: "-0.04em",
                }}
              >
                11
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 32,
                  color: PAL.inkSoft,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginTop: -8,
                }}
              >
                likes.
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Beat 3 — Give up. 14 days. */}
      <Sprite start={s + 3.5} end={e}>
        <TextSprite
          text={"Give up. Wait 14 days."}
          x={90}
          y={500}
          size={92}
          font={SERIF}
          color={PAL.ink}
          entryDur={0.45}
          exitDur={0.45}
        />
      </Sprite>
      {/* 14-day dots */}
      <Sprite start={s + 3.7} end={e}>
        {({ localTime, duration }) => {
          const exitStart = duration - 0.4;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.4, 0, 1) : 1;
          return (
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 700,
                width: 900,
                opacity: op,
                display: "grid",
                gridTemplateColumns: "repeat(14, 1fr)",
                gap: 14,
              }}
            >
              {Array.from({ length: 14 }).map((_, i) => {
                const fill = clamp(localTime - 0.05 * i, 0, 0.35) / 0.35;
                return (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      height: 50,
                      borderRadius: 4,
                      background: fill > 0 ? PAL.accent : "transparent",
                      border: `1.5px solid ${PAL.accent}`,
                      opacity: fill > 0 ? fill : 0.35,
                    }}
                  />
                );
              })}
            </div>
          );
        }}
      </Sprite>
      <Sprite start={s + 4.1} end={e}>
        <TextSprite
          text={"…then repeat."}
          x={90}
          y={870}
          size={48}
          font={SERIF}
          weight={400}
          color={PAL.accent}
          letterSpacing="-0.01em"
          entryDur={0.45}
          exitDur={0.4}
        />
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 3 — WHY (engineers build products, not stories)
// ═════════════════════════════════════════════════════════════════
function SceneWhy() {
  const [s, e] = T.why;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="03 · THE TRAP" start={s} end={e} />
      <Sprite start={s + 0.1} end={e}>
        <TextSprite
          text={"Engineers build"}
          x={90}
          y={620}
          size={130}
          font={SERIF}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>
      <Sprite start={s + 0.5} end={e}>
        <TextSprite
          text={"products,"}
          x={90}
          y={760}
          size={130}
          font={SERIF}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>
      <Sprite start={s + 1.0} end={e}>
        <TextSprite
          text={"not"}
          x={90}
          y={900}
          size={130}
          font={SERIF}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.45}
          exitDur={0.35}
        />
      </Sprite>
      <Sprite start={s + 1.35} end={e}>
        <TextSprite
          text={"stories."}
          x={290}
          y={900}
          size={170}
          font={SERIF}
          weight={400}
          color={PAL.accent}
          letterSpacing="-0.025em"
          entryDur={0.6}
          exitDur={0.35}
          entryEase={Easing.easeOutBack}
        />
      </Sprite>
      <HairlineRule x={90} y={1090} length={900} start={s + 1.6} end={e} />
      {/* Bullets */}
      {[
        ["—", "Visuals take hours", 1.9],
        ["—", "Tone never lands", 2.25],
        ["—", "Consistency feels impossible", 2.6],
      ].map(([dash, text, t0], i) => (
        <Sprite key={i} start={s + t0} end={e}>
          <TextSprite
            text={`${dash}  ${text}`}
            x={90}
            y={1150 + i * 72}
            size={50}
            font={SERIF}
            weight={400}
            color={PAL.inkSoft}
            entryDur={0.4}
            exitDur={0.3}
          />
        </Sprite>
      ))}
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 4 — COST OF SILENCE
// Bar chart: your bar flat, theirs growing.
// ═════════════════════════════════════════════════════════════════
function SceneCost() {
  const [s, e] = T.cost;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="04 · THE COST" start={s} end={e} />
      <Sprite start={s + 0.0} end={e}>
        <TextSprite
          text={"Every day you"}
          x={90}
          y={420}
          size={110}
          font={SERIF}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>
      <Sprite start={s + 0.35} end={e}>
        <TextSprite
          text={"don't post"}
          x={90}
          y={540}
          size={110}
          font={SERIF}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>
      <Sprite start={s + 0.8} end={e}>
        <TextSprite
          text={"= a lead you"}
          x={90}
          y={680}
          size={110}
          font={SERIF}
          weight={400}
          color={PAL.accent}
          letterSpacing="-0.02em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>
      <Sprite start={s + 1.15} end={e}>
        <TextSprite
          text={"never got."}
          x={90}
          y={800}
          size={110}
          font={SERIF}
          weight={400}
          color={PAL.accent}
          letterSpacing="-0.02em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>

      {/* Bar comparison */}
      <Sprite start={s + 1.7} end={e}>
        {({ localTime, duration }) => {
          const grow = Easing.easeOutCubic(clamp(localTime / 1.6, 0, 1));
          const exitStart = duration - 0.4;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.4, 0, 1) : 1;
          return (
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 1050,
                width: 900,
                opacity: op,
              }}
            >
              <div style={{ display: "flex", gap: 50, alignItems: "flex-end", height: 540 }}>
                {/* You — flat */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
                    <div
                      style={{
                        width: 200,
                        height: `${10 * grow}%`,
                        background: PAL.inkSoft,
                        opacity: 0.35,
                        minHeight: 4,
                      }}
                    />
                  </div>
                  <div style={{ marginTop: 16, fontFamily: MONO, fontSize: 26, letterSpacing: "0.2em", textTransform: "uppercase", color: PAL.inkSoft }}>
                    you
                  </div>
                </div>
                {/* Them — growing */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
                    <div
                      style={{
                        width: 200,
                        height: `${90 * grow}%`,
                        background: PAL.accent,
                      }}
                    />
                  </div>
                  <div style={{ marginTop: 16, fontFamily: MONO, fontSize: 26, letterSpacing: "0.2em", textTransform: "uppercase", color: PAL.accent, fontWeight: 700 }}>
                    them
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 5 — SOLUTION (reveal)
// Background flips to ink. Cream serif. Wordmark.
// ═════════════════════════════════════════════════════════════════
function SceneSolution() {
  const [s, e] = T.solution;
  return (
    <>
      <SceneBg color={PAL.ink} start={s} end={e} fadeIn={0.5} fadeOut={0.3} />
      <Kicker text="05 · THE FIX" color="rgba(244,236,216,0.55)" start={s} end={e} />
      <Sprite start={s + 0.3} end={e}>
        <TextSprite
          text={"There's a"}
          x={90}
          y={500}
          size={130}
          font={SERIF}
          color={PAL.paper}
          letterSpacing="-0.02em"
          entryDur={0.55}
          exitDur={0.35}
        />
      </Sprite>
      <Sprite start={s + 0.7} end={e}>
        <TextSprite
          text={"better way."}
          x={90}
          y={650}
          size={170}
          font={SERIF}
          weight={400}
          color={PAL.accentSoft}
          letterSpacing="-0.025em"
          entryDur={0.55}
          exitDur={0.35}
          entryEase={Easing.easeOutBack}
        />
      </Sprite>
      <HairlineRule x={90} y={870} length={900} start={s + 1.4} end={e} color={PAL.ruleDark} />

      {/* Wordmark */}
      <Sprite start={s + 1.6} end={e}>
        {({ localTime, duration }) => {
          const t = clamp(localTime / 0.6, 0, 1);
          const eased = Easing.easeOutQuart(t);
          const exitStart = duration - 0.35;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1) : t;
          return (
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 950,
                opacity: op,
                transform: `translateY(${(1 - eased) * 20}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: PAL.accentSoft,
                  marginBottom: 8,
                  fontWeight: 700,
                }}
              >
                CONTENTCORE
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 200,
                  lineHeight: 0.9,
                  color: PAL.paper,
                  letterSpacing: "-0.03em",
                }}
              >
                Studio<span style={{ fontStyle: "italic", color: PAL.accentSoft }}>.</span>
              </div>
            </div>
          );
        }}
      </Sprite>
      <Sprite start={s + 2.6} end={e}>
        <TextSprite
          text={"AI-powered carousels & reels."}
          x={90}
          y={1320}
          size={48}
          font={SERIF}
          color="rgba(244,236,216,0.85)"
          letterSpacing="-0.01em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>
      <Sprite start={s + 3.0} end={e}>
        <TextSprite
          text={"Done for you."}
          x={90}
          y={1400}
          size={64}
          font={SERIF}
          weight={400}
          color={PAL.accentSoft}
          letterSpacing="-0.015em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 6 — WHAT YOU GET
// ═════════════════════════════════════════════════════════════════
function SceneWhat() {
  const [s, e] = T.what;
  const items = [
    ["10–14",  "pieces of content / month"],
    ["8–10",   "educational carousels"],
    ["2–4",    "short reels"],
    ["+",      "captions · hashtags · calendar"],
  ];
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="06 · WHAT YOU GET" start={s} end={e} />
      <Sprite start={s + 0.0} end={e}>
        <TextSprite
          text={"Every"}
          x={90}
          y={340}
          size={110}
          font={SERIF}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.45}
          exitDur={0.3}
        />
      </Sprite>
      <Sprite start={s + 0.25} end={e}>
        <TextSprite
          text={"two weeks."}
          x={90}
          y={460}
          size={150}
          font={SERIF}
          weight={400}
          color={PAL.accent}
          letterSpacing="-0.025em"
          entryDur={0.45}
          exitDur={0.3}
        />
      </Sprite>
      <HairlineRule x={90} y={640} length={900} start={s + 0.6} end={e} />
      {items.map(([num, label], i) => (
        <Sprite key={i} start={s + 0.9 + i * 0.35} end={e}>
          {({ localTime, duration }) => {
            const t = clamp(localTime / 0.45, 0, 1);
            const eased = Easing.easeOutCubic(t);
            const exitStart = duration - 0.35;
            const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1) : t;
            return (
              <div
                style={{
                  position: "absolute",
                  left: 90,
                  top: 720 + i * 220,
                  width: 900,
                  opacity: op,
                  transform: `translateY(${(1 - eased) * 24}px)`,
                  display: "grid",
                  gridTemplateColumns: "380px 1fr",
                  alignItems: "baseline",
                  gap: 30,
                  borderBottom: `1px solid ${PAL.rule}`,
                  paddingBottom: 28,
                }}
              >
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 130,
                    color: PAL.ink,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 44,
                    color: PAL.inkSoft,
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                  }}
                >
                  {label}
                </div>
              </div>
            );
          }}
        </Sprite>
      ))}
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 7 — THE NUMBERS
// $3,000–$10,000/mo agency vs $1,200/mo ContentCore
// ═════════════════════════════════════════════════════════════════
function SceneNumbers() {
  const [s, e] = T.numbers;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="07 · THE MATH" start={s} end={e} />
      <Sprite start={s + 0.0} end={e}>
        <TextSprite
          text={"The math is silly."}
          x={90}
          y={400}
          size={92}
          font={SERIF}
          weight={400}
          color={PAL.ink}
          letterSpacing="-0.02em"
          entryDur={0.5}
          exitDur={0.35}
        />
      </Sprite>
      <HairlineRule x={90} y={540} length={900} start={s + 0.45} end={e} />

      {/* Left column — Agency */}
      <Sprite start={s + 0.65} end={e}>
        {({ localTime, duration }) => {
          const t = clamp(localTime / 0.5, 0, 1);
          const eased = Easing.easeOutCubic(t);
          const exitStart = duration - 0.35;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1) : t;
          return (
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 620,
                width: 900,
                opacity: op,
                transform: `translateY(${(1 - eased) * 16}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 26,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: PAL.inkSoft,
                  marginBottom: 10,
                  fontWeight: 700,
                }}
              >
                A full agency
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 160,
                  color: PAL.ink,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  textDecoration: "line-through",
                  textDecorationColor: PAL.accent,
                  textDecorationThickness: 6,
                }}
              >
                $3,000+
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 40,
                  fontStyle: "italic",
                  color: PAL.inkSoft,
                  marginTop: 8,
                }}
              >
                up to $10,000 / month
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Right — ContentCore */}
      <Sprite start={s + 1.6} end={e}>
        {({ localTime, duration }) => {
          const t = clamp(localTime / 0.6, 0, 1);
          const eased = Easing.easeOutBack(t);
          const exitStart = duration - 0.35;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1) : clamp(localTime / 0.4, 0, 1);
          return (
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 1120,
                width: 900,
                opacity: op,
                transform: `translateY(${(1 - eased) * 24}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 26,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: PAL.accent,
                  marginBottom: 10,
                  fontWeight: 700,
                }}
              >
                ContentCore
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 220,
                  color: PAL.accent,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                $1,200<span style={{ fontStyle: "italic", fontSize: 80, color: PAL.inkSoft, letterSpacing: 0 }}>/mo</span>
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 40,
                  fontStyle: "italic",
                  color: PAL.inkSoft,
                  marginTop: 12,
                }}
              >
                You approve. You post. That's it.
              </div>
            </div>
          );
        }}
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 8 — CTA
// "Stop being invisible. Let's fix that."
// ═════════════════════════════════════════════════════════════════
function SceneCTA() {
  const [s, e] = T.cta;
  return (
    <>
      <SceneBg color={PAL.ink} start={s} end={e} fadeIn={0.5} fadeOut={0.2} />
      <Kicker text="08 · CONTENTCORE STUDIO" color="rgba(244,236,216,0.55)" start={s} end={e} />
      <Sprite start={s + 0.2} end={e}>
        <TextSprite
          text={"Stop being"}
          x={90}
          y={560}
          size={150}
          font={SERIF}
          color={PAL.paper}
          letterSpacing="-0.02em"
          entryDur={0.55}
          exitDur={0.4}
        />
      </Sprite>
      <Sprite start={s + 0.6} end={e}>
        <TextSprite
          text={"invisible."}
          x={90}
          y={720}
          size={220}
          font={SERIF}
          color={PAL.paper}
          letterSpacing="-0.03em"
          entryDur={0.55}
          exitDur={0.4}
        />
      </Sprite>
      <HairlineRule x={90} y={1000} length={900} start={s + 1.2} end={e} color={PAL.ruleDark} />
      <Sprite start={s + 1.4} end={e}>
        <TextSprite
          text={"Let's"}
          x={90}
          y={1080}
          size={150}
          font={SERIF}
          color={PAL.paper}
          letterSpacing="-0.02em"
          entryDur={0.55}
          exitDur={0.4}
          entryEase={Easing.easeOutBack}
        />
      </Sprite>
      <Sprite start={s + 1.7} end={e}>
        <TextSprite
          text={"fix that."}
          x={90}
          y={1230}
          size={200}
          font={SERIF}
          weight={400}
          color={PAL.accentSoft}
          letterSpacing="-0.03em"
          entryDur={0.55}
          exitDur={0.4}
          entryEase={Easing.easeOutBack}
        />
      </Sprite>

      {/* CTA bar */}
      <Sprite start={s + 2.3} end={e}>
        {({ localTime, duration }) => {
          const t = clamp(localTime / 0.5, 0, 1);
          const eased = Easing.easeOutCubic(t);
          const exitStart = duration - 0.3;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.3, 0, 1) : t;
          return (
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 1480,
                width: 900,
                opacity: op,
                transform: `translateY(${(1 - eased) * 20}px)`,
                padding: "32px 36px",
                border: `2px solid ${PAL.accentSoft}`,
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: PAL.accentSoft,
                  marginBottom: 14,
                  fontWeight: 700,
                }}
              >
                DM "rebuild"
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 54,
                  color: PAL.paper,
                  fontStyle: "italic",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Free sample carousel,<br />
                built on your product.
              </div>
            </div>
          );
        }}
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// Timestamp label updater — writes the playhead seconds onto the
// stage root via data-screen-label so comments can pin to a moment.
// ═════════════════════════════════════════════════════════════════
function TimestampLabel() {
  const time = useTime();
  React.useEffect(() => {
    const root = document.querySelector("[data-reel-root]");
    if (root) {
      const sec = Math.floor(time);
      root.setAttribute("data-screen-label", `${String(sec).padStart(2, "0")}s`);
    }
  }, [Math.floor(time)]);
  return null;
}

// ═════════════════════════════════════════════════════════════════
// Root reel
// ═════════════════════════════════════════════════════════════════
function Reel() {
  return (
    <div data-reel-root data-screen-label="00s">
      <Stage
        width={1080}
        height={1920}
        duration={DURATION}
        background={PAL.paper}
        scrubberTheme="dark"
      >
        <TimestampLabel />
        <SceneHook />
        <ScenePain />
        <SceneWhy />
        <SceneCost />
        <SceneSolution />
        <SceneWhat />
        <SceneNumbers />
        <SceneCTA />
        <BrandMark />
      </Stage>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Reel />);
