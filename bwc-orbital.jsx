// bwc-orbital.jsx — Radial orbital timeline (ported from shadcn TSX)
// 4 nodes representing the ContentCore system: Brief → Claude → Assembly → Post

function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = React.useState({});
  const [rotationAngle, setRotationAngle] = React.useState(0);
  const [autoRotate, setAutoRotate] = React.useState(true);
  const [pulseEffect, setPulseEffect] = React.useState({});
  const [activeNodeId, setActiveNodeId] = React.useState(null);
  const containerRef = React.useRef(null);
  const orbitRef = React.useRef(null);
  const nodeRefs = React.useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const item = timelineData.find((x) => x.id === id);
        const related = item ? item.relatedIds : [];
        const newPulse = {};
        related.forEach((rid) => (newPulse[rid] = true));
        setPulseEffect(newPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  React.useEffect(() => {
    let timer;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => +((prev + 0.25) % 360).toFixed(3));
      }, 50);
    }
    return () => timer && clearInterval(timer);
  }, [autoRotate]);

  const centerViewOnNode = (nodeId) => {
    if (!nodeRefs.current[nodeId]) return;
    const idx = timelineData.findIndex((x) => x.id === nodeId);
    const total = timelineData.length;
    const targetAngle = (idx / total) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calcPosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const item = timelineData.find((x) => x.id === activeNodeId);
    return item ? item.relatedIds.includes(itemId) : false;
  };

  const statusStyle = (status) => {
    switch (status) {
      case "completed":
        return "text-white bg-glow-500/30 border-glow-400";
      case "in-progress":
        return "text-glow-200 bg-glow-500/20 border-glow-400";
      case "pending":
        return "text-white/70 bg-white/5 border-white/20";
      default:
        return "text-white/70 bg-white/5 border-white/20";
    }
  };

  return (
    <div
      className="relative w-full h-[640px] flex items-center justify-center select-none"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Ambient glow halo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[480px] h-[480px] rounded-full bg-glow-500/10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center sun */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-glow-400 via-glow-500 to-indigo-700 anim-pulse flex items-center justify-center z-10 shadow-glow-lg">
            <div className="absolute w-24 h-24 rounded-full border border-glow-300/40 anim-ping opacity-70"></div>
            <div
              className="absolute w-32 h-32 rounded-full border border-glow-300/20 anim-ping opacity-50"
              style={{ animationDelay: "0.7s" }}
            ></div>
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center">
              <IconSparkle size={20} className="text-glow-500" strokeWidth={2.5} />
            </div>
          </div>

          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: 460, height: 460 }}
          ></div>
          <div
            className="absolute rounded-full border border-white/[0.04]"
            style={{ width: 600, height: 600 }}
          ></div>

          {timelineData.map((item, index) => {
            const pos = calcPosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy halo */}
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "anim-pulse" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(129,140,248,0.35) 0%, rgba(99,102,241,0) 70%)`,
                    width: `${item.energy * 0.6 + 50}px`,
                    height: `${item.energy * 0.6 + 50}px`,
                    left: `-${(item.energy * 0.6 + 50 - 44) / 2}px`,
                    top: `-${(item.energy * 0.6 + 50 - 44) / 2}px`,
                  }}
                ></div>

                {/* Node */}
                <div
                  className={`
                    relative w-11 h-11 rounded-full flex items-center justify-center
                    transition-all duration-300 transform
                    ${isExpanded
                      ? "bg-white text-glow-500 scale-150 shadow-glow"
                      : isRelated
                      ? "bg-glow-500/30 text-white border-glow-300 anim-pulse"
                      : "bg-ink-700/80 text-white border-white/20 backdrop-blur"
                    }
                    border-2
                  `}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </div>

                {/* Label */}
                <div
                  className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[11px] font-mono uppercase tracking-[0.18em]
                    transition-all duration-300
                    ${isExpanded ? "text-white scale-110" : "text-white/55"}
                  `}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <div
                    className="absolute top-24 left-1/2 -translate-x-1/2 w-72 rounded-xl bg-ink-700/85 backdrop-blur-xl border border-glow-400/40 shadow-glow-lg overflow-visible"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-glow-400/70"></div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${statusStyle(item.status)}`}
                        >
                          {item.status === "completed"
                            ? "Always on"
                            : item.status === "in-progress"
                            ? "Live"
                            : "Next"}
                        </span>
                        <span className="text-[10px] font-mono text-white/40">
                          {item.date}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-white/70 leading-relaxed">{item.content}</p>

                      {/* Energy meter */}
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-[10px] mb-1.5 text-white/60">
                          <span className="flex items-center">
                            <IconZap size={10} className="mr-1" />
                            Effort to you
                          </span>
                          <span className="font-mono">{100 - item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-glow-500 to-glow-300"
                            style={{ width: `${100 - item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Connected */}
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <IconLink size={10} className="text-white/50 mr-1.5" />
                            <h5 className="text-[10px] uppercase tracking-wider font-medium text-white/50">
                              Connected steps
                            </h5>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((rid) => {
                              const rel = timelineData.find((i) => i.id === rid);
                              if (!rel) return null;
                              return (
                                <button
                                  key={rid}
                                  className="flex items-center h-6 px-2 text-[10px] rounded border border-white/15 bg-white/[0.03] hover:bg-glow-500/20 hover:border-glow-400 text-white/80 hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(rid);
                                  }}
                                >
                                  {rel.title}
                                  <IconArrowRight size={9} className="ml-1 text-white/50" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Instruction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
        click any node to expand
      </div>
    </div>
  );
}

window.RadialOrbitalTimeline = RadialOrbitalTimeline;
