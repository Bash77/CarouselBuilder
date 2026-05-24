// bwc-shuffle.jsx — Draggable testimonial shuffle cards (hand-rolled, no framer-motion)

function ShuffleCards({ testimonials }) {
  const [positions, setPositions] = React.useState(
    testimonials.map((_, i) => (i === 0 ? "front" : i === 1 ? "middle" : "back"))
  );

  // Pointer-drag state for the front card
  const [dragX, setDragX] = React.useState(0);
  const dragStartRef = React.useRef(null);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      next.unshift(next.pop());
      return next;
    });
    setDragX(0);
  };

  const onPointerDown = (e) => {
    dragStartRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (dragStartRef.current == null) return;
    setDragX(e.clientX - dragStartRef.current);
  };
  const onPointerUp = (e) => {
    if (dragStartRef.current == null) return;
    const dx = e.clientX - dragStartRef.current;
    dragStartRef.current = null;
    if (dx < -120) {
      handleShuffle();
    } else {
      setDragX(0);
    }
  };

  return (
    <div className="grid place-content-center w-full">
      <div className="relative h-[460px] w-[340px] -ml-[80px] md:-ml-[150px]">
        {testimonials.map((t, i) => {
          const pos = positions[i];
          const isFront = pos === "front";

          // Base transform per position
          let rot = pos === "front" ? -6 : pos === "middle" ? 0 : 6;
          let tx = pos === "front" ? 0 : pos === "middle" ? 110 : 220;
          let z = pos === "front" ? 3 : pos === "middle" ? 2 : 1;
          let scale = pos === "front" ? 1 : 0.98;

          if (isFront && dragX !== 0) {
            tx = dragX;
            rot = -6 + dragX * 0.04;
          }

          const transition = dragStartRef.current && isFront
            ? "none"
            : "transform 380ms cubic-bezier(0.4,0.0,0.2,1)";

          return (
            <div
              key={t.id}
              onPointerDown={isFront ? onPointerDown : undefined}
              onPointerMove={isFront ? onPointerMove : undefined}
              onPointerUp={isFront ? onPointerUp : undefined}
              onPointerCancel={isFront ? onPointerUp : undefined}
              className={`
                absolute left-0 top-0 h-[460px] w-[340px] grid place-content-center gap-5
                rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl
                shadow-card overflow-hidden
                ${isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}
              `}
              style={{
                zIndex: z,
                transform: `translateX(${tx}%) rotate(${rot}deg) scale(${scale})`,
                transition,
                touchAction: "none",
                userSelect: "none",
              }}
            >
              {/* corner halo */}
              <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-glow-500/15 blur-3xl"></div>

              {/* stars */}
              <div className="flex justify-center gap-0.5 text-glow-300">
                {[0,1,2,3,4].map((s) => (
                  <IconStar key={s} size={14} className="fill-current" strokeWidth={1.5} style={{ fill: "currentColor" }} />
                ))}
              </div>

              {/* quote */}
              <p className="text-center text-[15px] leading-snug font-display italic text-white/90 px-1">
                "{t.testimonial}"
              </p>

              {/* avatar */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-full border border-white/15"
                  style={{
                    background: `linear-gradient(135deg, ${t.color1} 0%, ${t.color2} 100%)`,
                    boxShadow: `0 0 30px -10px ${t.color1}`,
                  }}
                ></div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-glow-300/80 mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>

              {/* result chip */}
              <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-glow-400/30 bg-glow-500/15 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-glow-200">
                <IconZap size={11} />
                {t.result}
              </div>
            </div>
          );
        })}

        {/* Shuffle hint */}
        <button
          onClick={handleShuffle}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-glow-300 transition-colors flex items-center gap-1.5"
        >
          drag left or tap
          <IconChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

window.ShuffleCards = ShuffleCards;
