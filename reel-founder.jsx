// reel-founder.jsx — ContentCore Studio · Founder Journey Reel (9:16, ~40s)
// "I'm a CS student. Six months ago I was applying to internships..."
// Same Editorial Cream brand language as reel.jsx.

const PAL = {
  paper: "#f4ecd8",
  paperDeep: "#ede1c4",
  ink: "#1a1612",
  inkSoft: "#3a322a",
  inkMute: "rgba(28,24,18,0.55)",
  rule: "rgba(28,24,18,0.18)",
  ruleDark: "rgba(244,236,216,0.22)",
  accent: "#6b3a1f",
  accentBright: "#c96442",
  accentSoft: "#e9b88a",
  terminal: "#1a1612",
};

const SERIF = '"Instrument Serif", serif';
const SANS = '"DM Sans", sans-serif';
const MONO = '"JetBrains Mono", monospace';

// Scene windows ───────────────────────────────────────────────────
const T = {
  diary:     [0,    4.5],
  pivot:     [4.5,  7.5],
  system:    [7.5,  11.5],
  build:     [11.5, 17.5],
  who:       [17.5, 22.5],
  transform: [22.5, 28.5],
  credo:     [28.5, 34.0],
  cta:       [34.0, 40.0],
};
const DURATION = 40;

// ─── Helpers ────────────────────────────────────────────────────

function SceneBg({ color, start, end, fadeIn = 0.35, fadeOut = 0.35 }) {
  const time = useTime();
  if (time < start - 0.3 || time > end + 0.3) return null;
  let opacity = 1;
  if (time < start) opacity = clamp((time - (start - fadeIn)) / fadeIn, 0, 1);
  else if (time > end - fadeOut) opacity = clamp(1 - (time - (end - fadeOut)) / fadeOut, 0, 1);
  return (
    <div style={{ position: "absolute", inset: 0, background: color, opacity, zIndex: 0 }} />
  );
}

function Kicker({ text, x = 90, y = 110, color = PAL.inkSoft, start, end, dur = 0.4 }) {
  return (
    <Sprite start={start} end={end}>
      <TextSprite text={text} x={x} y={y} size={26} font={MONO} weight={700}
        color={color} letterSpacing="0.22em" entryDur={dur} exitDur={dur} />
    </Sprite>
  );
}

function HairlineRule({ x, y, length, color = PAL.rule, start, end, growDur = 0.5, thickness = 1.5 }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const tIn = clamp(localTime / growDur, 0, 1);
        const w = length * Easing.easeOutCubic(tIn);
        const exitStart = Math.max(0, duration - 0.35);
        const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1) : 1;
        return (
          <div style={{ position: "absolute", left: x, top: y, width: w, height: thickness, background: color, opacity: op }} />
        );
      }}
    </Sprite>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 1 — Diary opener
// ═════════════════════════════════════════════════════════════════
function SceneDiary() {
  const [s, e] = T.diary;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="DIARY · MAY 2026" start={s} end={e} />

      <Sprite start={s + 0.1} end={e}>
        <TextSprite text={"I'm a CS"} x={90} y={520} size={140} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.55} exitDur={0.4} />
      </Sprite>
      <Sprite start={s + 0.4} end={e}>
        <TextSprite text={"student."} x={90} y={670} size={140} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.55} exitDur={0.4} />
      </Sprite>

      <HairlineRule x={90} y={870} length={900} start={s + 1.2} end={e} />

      <Sprite start={s + 1.4} end={e}>
        <TextSprite text={"Six months ago,"} x={90} y={930} size={60} font={SERIF}
          color={PAL.inkSoft} letterSpacing="-0.01em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 1.8} end={e}>
        <TextSprite text={"applying to internships."} x={90} y={1020} size={60} font={SERIF}
          color={PAL.inkSoft} letterSpacing="-0.01em" entryDur={0.5} exitDur={0.35} />
      </Sprite>

      <Sprite start={s + 2.5} end={e}>
        <TextSprite text={"Getting"} x={90} y={1200} size={130} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 2.85} end={e}>
        <TextSprite text={"ghosted."} x={90} y={1350} size={180} font={SERIF}
          weight={400} color={PAL.accent} letterSpacing="-0.025em"
          entryDur={0.55} exitDur={0.4} entryEase={Easing.easeOutBack} />
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 2 — Pivot
// ═════════════════════════════════════════════════════════════════
function ScenePivot() {
  const [s, e] = T.pivot;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="—" start={s} end={e} />

      <Sprite start={s + 0.1} end={e}>
        <TextSprite text={"So"} x={90} y={720} size={150} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.45} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.35} end={e}>
        <TextSprite text={"I"} x={300} y={720} size={150} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.4} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.7} end={e}>
        <TextSprite text={"stopped."} x={90} y={900} size={260} font={SERIF}
          weight={400} color={PAL.accent} letterSpacing="-0.035em"
          entryDur={0.7} exitDur={0.4} entryEase={Easing.easeOutBack} />
      </Sprite>

      <HairlineRule x={90} y={1200} length={900} start={s + 1.4} end={e} thickness={2} />
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 3 — System
// ═════════════════════════════════════════════════════════════════
function SceneSystem() {
  const [s, e] = T.system;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="—  THE PIVOT" start={s} end={e} />

      <Sprite start={s + 0.1} end={e}>
        <TextSprite text={"Instead,"} x={90} y={560} size={120} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.5} end={e}>
        <TextSprite text={"I built"} x={90} y={700} size={140} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.95} end={e}>
        <TextSprite text={"a system."} x={90} y={870} size={200} font={SERIF}
          weight={400} color={PAL.accent} letterSpacing="-0.03em"
          entryDur={0.55} exitDur={0.4} entryEase={Easing.easeOutBack} />
      </Sprite>

      <HairlineRule x={90} y={1150} length={900} start={s + 1.4} end={e} />

      <Sprite start={s + 1.7} end={e}>
        <TextSprite text={"one prompt · one template · one workflow"}
          x={90} y={1210} size={32} font={MONO} color={PAL.inkSoft}
          letterSpacing="0.06em" entryDur={0.45} exitDur={0.3} />
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 4 — Build (Claude terminal → carousel stack)
// ═════════════════════════════════════════════════════════════════
function SceneBuild() {
  const [s, e] = T.build;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="04 · THE BUILD" start={s} end={e} />

      <Sprite start={s + 0.1} end={e}>
        <TextSprite text={"Two hours."} x={90} y={300} size={110} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.5} end={e}>
        <TextSprite text={"A full month of content."} x={90} y={420} size={56} font={SERIF}
          weight={400} color={PAL.accent} letterSpacing="-0.012em"
          entryDur={0.5} exitDur={0.35} />
      </Sprite>

      {/* Claude terminal panel */}
      <Sprite start={s + 0.9} end={e}>
        {({ localTime, duration }) => {
          const tIn = clamp(localTime / 0.5, 0, 1);
          const eased = Easing.easeOutCubic(tIn);
          const exitStart = duration - 0.35;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1) : tIn;

          const lines = [
            { t: 0.0,  text: "// brief.brand",        color: PAL.accentSoft },
            { t: 0.25, text: "claude.write({",         color: PAL.paper },
            { t: 0.55, text: "  hook: \"engineers",    color: "#9ec5ff" },
            { t: 0.85, text: "         build",         color: "#9ec5ff" },
            { t: 1.15, text: "         products,\",",  color: "#9ec5ff" },
            { t: 1.45, text: "  slides: 10,",          color: PAL.paper },
            { t: 1.75, text: "  captions: true,",      color: PAL.paper },
            { t: 2.05, text: "  hashtags: true",       color: PAL.paper },
            { t: 2.35, text: "})",                     color: PAL.paper },
            { t: 2.7,  text: "→ done.",                color: PAL.accentSoft },
          ];

          return (
            <div style={{
              position: "absolute",
              left: 90, top: 580, width: 900, height: 540,
              background: PAL.terminal,
              borderRadius: 18,
              padding: "32px 32px 28px",
              boxShadow: "0 30px 60px -25px rgba(28,24,18,0.45), 0 0 0 1.5px rgba(28,24,18,0.06)",
              opacity: op,
              transform: `translateY(${(1 - eased) * 28}px)`,
              fontFamily: MONO,
              fontSize: 30,
              lineHeight: 1.4,
              color: PAL.paper,
            }}>
              <div style={{
                fontSize: 20, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(244,236,216,0.5)", marginBottom: 18,
                display: "flex", justifyContent: "space-between",
              }}>
                <span>claude · contentcore.brief</span>
                <span style={{ color: PAL.accentSoft }}>●</span>
              </div>
              {lines.map((line, i) => {
                if (localTime < line.t + 0.5) return null;
                const ageT = clamp((localTime - line.t - 0.5) / 0.25, 0, 1);
                return (
                  <div key={i} style={{
                    color: line.color,
                    opacity: ageT,
                    transform: `translateY(${(1 - ageT) * 6}px)`,
                  }}>
                    {line.text}
                  </div>
                );
              })}
              {localTime > 3.3 && (
                <span style={{
                  display: "inline-block", width: 14, height: 30,
                  background: PAL.accentSoft, marginLeft: 4,
                  opacity: Math.floor(localTime * 2) % 2 ? 1 : 0.2,
                }} />
              )}
            </div>
          );
        }}
      </Sprite>

      {/* Arrow + carousel stack */}
      <Sprite start={s + 3.5} end={e}>
        {({ localTime, duration }) => {
          const tIn = clamp(localTime / 0.6, 0, 1);
          const exitStart = duration - 0.35;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1) : tIn;

          const cards = [
            { x: 0,  y: 0,  rot: -3, color: PAL.paperDeep, headline: "Pain" },
            { x: 24, y: 26, rot: 0,  color: PAL.paper,     headline: "Outcome" },
            { x: 48, y: 52, rot: 4,  color: PAL.accent,    headline: "CTA", invert: true },
          ];

          return (
            <div style={{
              position: "absolute",
              left: 90, top: 1240, width: 900,
              opacity: op,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 30 }}>
                <div style={{ fontFamily: SERIF, fontSize: 72, color: PAL.accent, lineHeight: 1 }}>→</div>
                <div style={{
                  fontFamily: MONO, fontSize: 22,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: PAL.ink, fontWeight: 700,
                }}>
                  carousels · captions · hashtags
                </div>
              </div>

              <div style={{ position: "relative", height: 380 }}>
                {cards.map((c, i) => {
                  const cardT = clamp((localTime - 0.4 - i * 0.18) / 0.5, 0, 1);
                  const eased = Easing.easeOutBack(cardT);
                  if (cardT <= 0) return null;
                  return (
                    <div key={i} style={{
                      position: "absolute",
                      left: 200 + c.x, top: c.y,
                      width: 280, height: 350,
                      background: c.color,
                      borderRadius: 12,
                      boxShadow: "0 18px 42px -18px rgba(28,24,18,0.28), 0 0 0 1px rgba(28,24,18,0.06)",
                      transform: `rotate(${c.rot * eased}deg) translateY(${(1 - eased) * 24}px) scale(${0.85 + 0.15 * eased})`,
                      transformOrigin: "center",
                      opacity: cardT,
                      padding: "24px 22px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}>
                      <div style={{
                        fontFamily: MONO, fontSize: 14, letterSpacing: "0.2em",
                        color: c.invert ? "rgba(244,236,216,0.55)" : PAL.inkSoft,
                      }}>
                        0{i + 1}
                      </div>
                      <div style={{
                        fontFamily: SERIF, fontSize: 60, lineHeight: 0.98,
                        color: c.invert ? PAL.paper : PAL.ink,
                        letterSpacing: "-0.02em",
                      }}>
                        {c.headline}
                        <span style={{ color: c.invert ? PAL.accentSoft : PAL.accent, fontStyle: "italic" }}>.</span>
                      </div>
                      <div style={{
                        fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em",
                        color: c.invert ? "rgba(244,236,216,0.55)" : PAL.inkSoft,
                        textTransform: "uppercase",
                      }}>
                        @saasframes
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 5 — Who I sell to
// ═════════════════════════════════════════════════════════════════
function SceneWho() {
  const [s, e] = T.who;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="05 · THE CLIENTS" start={s} end={e} />

      <Sprite start={s + 0.1} end={e}>
        <TextSprite text={"Now I sell"} x={90} y={500} size={120} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.45} end={e}>
        <TextSprite text={"that system"} x={90} y={640} size={120} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>

      <HairlineRule x={90} y={820} length={900} start={s + 1.0} end={e} />

      <Sprite start={s + 1.2} end={e}>
        <TextSprite text={"to founders"} x={90} y={900} size={130} font={SERIF}
          weight={400} color={PAL.accent} letterSpacing="-0.02em"
          entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 1.6} end={e}>
        <TextSprite text={"great at building."} x={90} y={1060} size={84} font={SERIF}
          color={PAL.ink} letterSpacing="-0.015em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 2.1} end={e}>
        <TextSprite text={"No time to show up online."} x={90} y={1190} size={50} font={SERIF}
          color={PAL.inkSoft} letterSpacing="-0.01em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 6 — Transformation (invisible → visible)
// ═════════════════════════════════════════════════════════════════
function SceneTransform() {
  const [s, e] = T.transform;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="06 · BEFORE / AFTER" start={s} end={e} />

      <Sprite start={s + 0.1} end={e}>
        <TextSprite text={"They used to be"} x={90} y={300} size={70} font={SERIF}
          color={PAL.inkSoft} letterSpacing="-0.015em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.4} end={e}>
        <TextSprite text={"invisible."} x={90} y={400} size={140} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.55} exitDur={0.35} />
      </Sprite>

      {/* Two profile grids */}
      <Sprite start={s + 0.9} end={e}>
        {({ localTime, duration }) => {
          const tIn = clamp(localTime / 0.6, 0, 1);
          const eased = Easing.easeOutCubic(tIn);
          const exitStart = duration - 0.35;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.35, 0, 1) : tIn;

          const afterColors = [
            PAL.paper, PAL.accent, PAL.paperDeep,
            PAL.accent, PAL.paper, PAL.ink,
            PAL.paperDeep, PAL.ink, PAL.accent,
          ];

          return (
            <div style={{
              position: "absolute",
              left: 90, top: 620, width: 900,
              opacity: op,
              transform: `translateY(${(1 - eased) * 20}px)`,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
            }}>
              {/* Before */}
              <div>
                <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: PAL.inkSoft, marginBottom: 14, fontWeight: 700 }}>
                  Before
                </div>
                <div style={{
                  width: "100%", aspectRatio: "1 / 1",
                  border: `2px solid ${PAL.rule}`,
                  borderRadius: 12,
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 4, padding: 6,
                  background: "rgba(28,24,18,0.02)",
                }}>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} style={{
                      background: "rgba(28,24,18,0.04)",
                      border: `1px dashed ${PAL.rule}`,
                      borderRadius: 4,
                    }} />
                  ))}
                </div>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 38,
                  color: PAL.inkSoft, marginTop: 14 }}>
                  blank.
                </div>
              </div>

              {/* After */}
              <div>
                <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: PAL.accent, marginBottom: 14, fontWeight: 700 }}>
                  After
                </div>
                <div style={{
                  width: "100%", aspectRatio: "1 / 1",
                  border: `2px solid ${PAL.accent}`,
                  borderRadius: 12,
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 4, padding: 6,
                }}>
                  {afterColors.map((color, i) => {
                    const cellT = clamp((localTime - 1.0 - i * 0.08) / 0.3, 0, 1);
                    return (
                      <div key={i} style={{
                        background: color,
                        borderRadius: 4,
                        opacity: cellT,
                        transform: `scale(${0.6 + 0.4 * Easing.easeOutBack(cellT)})`,
                      }} />
                    );
                  })}
                </div>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 38,
                  color: PAL.accent, marginTop: 14 }}>
                  every week.
                </div>
              </div>
            </div>
          );
        }}
      </Sprite>

      <HairlineRule x={90} y={1530} length={900} start={s + 3.6} end={e} />
      <Sprite start={s + 3.8} end={e}>
        <TextSprite text={"Without lifting"} x={90} y={1590} size={70} font={SERIF}
          color={PAL.ink} letterSpacing="-0.015em" entryDur={0.45} exitDur={0.3} />
      </Sprite>
      <Sprite start={s + 4.1} end={e}>
        <TextSprite text={"a finger."} x={90} y={1700} size={130} font={SERIF}
          weight={400} color={PAL.accent} letterSpacing="-0.025em"
          entryDur={0.5} exitDur={0.3} entryEase={Easing.easeOutBack} />
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 7 — Credo
// ═════════════════════════════════════════════════════════════════
function SceneCredo() {
  const [s, e] = T.credo;
  return (
    <>
      <SceneBg color={PAL.paper} start={s} end={e} />
      <Kicker text="07 · THE CREDO" start={s} end={e} />

      <Sprite start={s + 0.0} end={e}>
        <TextSprite text={"No degree."} x={90} y={500} size={140} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.45} end={e}>
        <TextSprite text={"No portfolio."} x={90} y={660} size={140} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 0.9} end={e}>
        <TextSprite text={"No permission."} x={90} y={820} size={140} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>

      <HairlineRule x={90} y={1020} length={900} start={s + 1.4} end={e} thickness={2} />

      <Sprite start={s + 1.6} end={e}>
        <TextSprite text={"Just"} x={90} y={1080} size={120} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.35} />
      </Sprite>
      <Sprite start={s + 2.0} end={e}>
        <TextSprite text={"shipped"} x={90} y={1230} size={180} font={SERIF}
          weight={400} color={PAL.accent} letterSpacing="-0.03em"
          entryDur={0.55} exitDur={0.4} entryEase={Easing.easeOutBack} />
      </Sprite>
      <Sprite start={s + 2.4} end={e}>
        <TextSprite text={"something real."} x={90} y={1410} size={130} font={SERIF}
          color={PAL.ink} letterSpacing="-0.02em" entryDur={0.5} exitDur={0.4} />
      </Sprite>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// SCENE 8 — CTA
// ═════════════════════════════════════════════════════════════════
function SceneCTA() {
  const [s, e] = T.cta;
  return (
    <>
      <SceneBg color={PAL.ink} start={s} end={e} fadeIn={0.5} fadeOut={0.2} />
      <Kicker text="—  @SAASFRAMES" color="rgba(244,236,216,0.55)" start={s} end={e} />

      <Sprite start={s + 0.2} end={e}>
        <TextSprite text={"Building"} x={90} y={520} size={150} font={SERIF}
          color={PAL.paper} letterSpacing="-0.02em" entryDur={0.55} exitDur={0.4} />
      </Sprite>
      <Sprite start={s + 0.55} end={e}>
        <TextSprite text={"something?"} x={90} y={680} size={150} font={SERIF}
          color={PAL.paper} letterSpacing="-0.02em" entryDur={0.55} exitDur={0.4} />
      </Sprite>

      <HairlineRule x={90} y={900} length={900} start={s + 1.1} end={e} color={PAL.ruleDark} />

      <Sprite start={s + 1.3} end={e}>
        <TextSprite text={"Follow."} x={90} y={990} size={260} font={SERIF}
          weight={400} color={PAL.accentSoft} letterSpacing="-0.035em"
          entryDur={0.6} exitDur={0.4} entryEase={Easing.easeOutBack} />
      </Sprite>

      <Sprite start={s + 2.1} end={e}>
        <TextSprite text={"I show everything."} x={90} y={1340} size={60} font={SERIF}
          color={PAL.paper} letterSpacing="-0.012em"
          entryDur={0.5} exitDur={0.4} />
      </Sprite>

      <Sprite start={s + 2.7} end={e}>
        {({ localTime, duration }) => {
          const tIn = clamp(localTime / 0.5, 0, 1);
          const eased = Easing.easeOutCubic(tIn);
          const exitStart = duration - 0.3;
          const op = localTime > exitStart ? 1 - clamp((localTime - exitStart) / 0.3, 0, 1) : tIn;
          return (
            <div style={{
              position: "absolute",
              left: 90, top: 1520, width: 900,
              opacity: op,
              transform: `translateY(${(1 - eased) * 20}px)`,
              padding: "30px 36px",
              border: `2px solid ${PAL.accentSoft}`,
              borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{
                fontFamily: SERIF, fontSize: 70, color: PAL.paper,
                lineHeight: 1, letterSpacing: "-0.02em",
              }}>
                @saasframes
              </div>
              <div style={{
                fontFamily: MONO, fontSize: 24,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: PAL.accentSoft, fontWeight: 700,
              }}>
                IG · LI · YT
              </div>
            </div>
          );
        }}
      </Sprite>
    </>
  );
}

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
        <SceneDiary />
        <ScenePivot />
        <SceneSystem />
        <SceneBuild />
        <SceneWho />
        <SceneTransform />
        <SceneCredo />
        <SceneCTA />
      </Stage>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Reel />);
