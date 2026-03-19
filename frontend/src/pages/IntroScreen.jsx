import React, { useState, useEffect, useRef } from "react";

// ── Color palette ─────────────────────────────────────────────────────────
const NEON = ["#FFE500","#FF2D6B","#00F5FF","#FF6B00","#00FF88","#7B2FFF","#FF9500","#FF3CAC"];

// ── Scatter positions for name assembly ───────────────────────────────────
const S_SCATTER = [
  [-312,-225,-66],[-477,279,-136],[316,-147,-69],
  [-358,-387,-79],[412,242,-177],[-257,374,-38],
];
const M_SCATTER = [
  [310,152,-133],[-249,-276,129],[-322,374,-117],
  [340,-285,115],[-360,-123,158],[295,240,-61],
];

// ── CSS injected once ─────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');

.intro-wrap {
  position: fixed; top:0; left:0; width:100vw; height:100vh; z-index: 99999; transform: translateZ(0);
  background: #000; overflow: hidden;
  font-family: 'Bebas Neue', sans-serif;
  cursor: default; user-select: none;
}

/* ── Scene transitions ── */
.scene { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.scene-enter { animation: sceneIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }
.scene-exit  { animation: sceneOut 0.4s cubic-bezier(0.7,0,1,1) both; pointer-events: none; }

@keyframes sceneIn  { from { opacity:0; transform:scale(0.96) } to { opacity:1; transform:scale(1) } }
@keyframes sceneOut { from { opacity:1; transform:scale(1) } to { opacity:0; transform:scale(1.04) } }

/* ── Letter drop bounce ── */
@keyframes dropBounce {
  0%   { transform: translateY(-110vh) rotate(-8deg); opacity:0; }
  55%  { transform: translateY(14px) rotate(1deg); opacity:1; }
  70%  { transform: translateY(-8px) rotate(-0.5deg); }
  82%  { transform: translateY(5px); }
  91%  { transform: translateY(-3px); }
  100% { transform: translateY(0) rotate(0); }
}

/* ── Slide overshoot ── */
@keyframes slideOvershoot {
  0%   { transform: translateX(110vw) skewX(-12deg); opacity:0; }
  60%  { transform: translateX(-28px) skewX(3deg); opacity:1; }
  75%  { transform: translateX(14px) skewX(-1deg); }
  88%  { transform: translateX(-7px); }
  100% { transform: translateX(0) skewX(0); }
}

/* ── Line sweep ── */
@keyframes lineSweep {
  from { width: 0; opacity:0; }
  10%  { opacity:1; }
  to   { width: 100%; opacity:1; }
}

/* ── 3D flip ── */
@keyframes flip3D {
  0%   { transform: perspective(600px) rotateY(90deg) scale(0.7); opacity:0; }
  55%  { transform: perspective(600px) rotateY(-12deg) scale(1.05); opacity:1; }
  75%  { transform: perspective(600px) rotateY(6deg); }
  100% { transform: perspective(600px) rotateY(0deg) scale(1); opacity:1; }
}

/* ── Scale punch ── */
@keyframes scalePunch {
  0%   { transform: scale(0.3); opacity:0; }
  60%  { transform: scale(1.18); opacity:1; }
  78%  { transform: scale(0.93); }
  100% { transform: scale(1); opacity:1; }
}

/* ── Typewriter cursor ── */
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* ── Scatter assemble ── */
@keyframes assemble {
  0%   { opacity:0; }
  15%  { opacity:1; }
  100% { transform: none !important; opacity:1; }
}

/* ── Float dots ── */
@keyframes floatDot {
  0%,100% { transform: translateY(0) translateX(0); }
  33%     { transform: translateY(-18px) translateX(8px); }
  66%     { transform: translateY(10px) translateX(-12px); }
}

/* ── CTA pulse ── */
@keyframes ctaPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
  50%     { box-shadow: 0 0 0 14px rgba(0,255,136,0); }
}
@keyframes ctaFadeIn {
  from { opacity:0; transform:translateY(20px) scale(0.9); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}

/* ── Top bar ── */
@keyframes topBar { from{width:0} to{width:100%} }

/* ── Skip button ── */
.skip-btn {
  position: fixed; top: 20px; right: 24px; z-index:10000;
  font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.12em;
  color: rgba(255,255,255,0.35); background:none; border:none; cursor:pointer;
  padding: 6px 10px; transition: color 0.2s;
  text-transform: uppercase;
}
.skip-btn:hover { color: rgba(255,255,255,0.8); }

/* ── Progress dots ── */
.prog-dots { position:fixed; bottom:32px; left:50%; transform:translateX(-50%); display:flex; gap:8px; z-index:10000; }
.prog-dot  { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.2); transition:all 0.3s; }
.prog-dot.active { background:#fff; transform:scale(1.3); }
`;

// ── FloatingDots ─────────────────────────────────────────────────────────
function FloatingDots() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 3,
    color: NEON[i % NEON.length],
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
  }));
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {dots.map((d, i) => (
        <div key={i} style={{
          position:"absolute", left:`${d.x}%`, top:`${d.y}%`,
          width:d.size, height:d.size, borderRadius:"50%",
          background:d.color, opacity:0.5,
          animation:`floatDot ${d.duration}s ${d.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// ── Scene 1: THE NAME ─────────────────────────────────────────────────────
function Scene1({ onNext }) {
  const letters = "UNIVERSAL".split("");
  return (
    <div className="scene scene-enter" style={{ background:"#000" }}>
      {/* Top color bar */}
      <div style={{
        position:"absolute", top:0, left:0, height:3,
        background:"linear-gradient(90deg,#FF2D6B,#FFE500,#00FF88,#00F5FF,#7B2FFF)",
        animation:"topBar 1.2s 0.2s cubic-bezier(0.16,1,0.3,1) both",
        width:0,
      }} />

      {/* UNIVERSAL — letter drop */}
      <div style={{ display:"flex", alignItems:"flex-end", gap:2, marginBottom:4 }}>
        {letters.map((l, i) => (
          <span key={i} style={{
            display:"inline-block",
            fontSize:"clamp(52px,10vw,100px)",
            lineHeight:1,
            color: NEON[i % NEON.length],
            animation:`dropBounce 0.9s ${i * 70}ms cubic-bezier(0.22,0.61,0.36,1) both`,
            textShadow:`0 0 30px ${NEON[i % NEON.length]}88`,
          }}>{l}</span>
        ))}
      </div>

      {/* TOOLBOX — slide overshoot */}
      <div style={{
        fontSize:"clamp(72px,16vw,150px)",
        color:"#fff",
        lineHeight:0.9,
        animation:"slideOvershoot 0.85s 680ms cubic-bezier(0.22,0.61,0.36,1) both",
        letterSpacing:"0.04em",
      }}>TOOLBOX</div>

      {/* Colored underline */}
      <div style={{
        height:3, marginTop:16,
        background:"linear-gradient(90deg,#FF2D6B,#FFE500,#00FF88,#00F5FF)",
        animation:"lineSweep 0.8s 1.5s ease both",
        width:0, minWidth:0, alignSelf:"stretch", maxWidth:600,
      }} />

      {/* Subtitle */}
      <div style={{
        fontFamily:"'DM Mono',monospace", fontSize:12, color:"rgba(255,255,255,0.35)",
        letterSpacing:"0.2em", textTransform:"uppercase", marginTop:20,
        animation:"ctaFadeIn 0.5s 2s both",
      }}>700 tools · Free forever</div>

      {/* Next */}
      <button onClick={onNext} style={{
        marginTop:40, fontFamily:"'DM Mono',monospace", fontSize:13,
        letterSpacing:"0.18em", textTransform:"uppercase",
        color:"#000", background:"#fff", border:"none", cursor:"pointer",
        padding:"12px 32px", borderRadius:2,
        animation:"ctaFadeIn 0.5s 2.3s both",
        transition:"all 0.15s",
      }}
        onMouseEnter={e=>{e.currentTarget.style.background="#FFE500";}}
        onMouseLeave={e=>{e.currentTarget.style.background="#fff";}}>
        Next →
      </button>
    </div>
  );
}

// ── Scene 2: THE NUMBER ───────────────────────────────────────────────────
function Scene2({ onNext }) {
  const [count, setCount] = useState("000");
  const [locked, setLocked] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [taglineText, setTaglineText] = useState("");
  const full = "Every tool a developer, designer & creator needs.";

  useEffect(() => {
    // Slot machine phase
    const slot = setInterval(() => {
      setCount(String(Math.floor(Math.random() * 1000)).padStart(3, "0"));
    }, 55);
    // Lock to 700
    setTimeout(() => {
      clearInterval(slot);
      setCount("700");
      setLocked(true);
    }, 1400);
    // Show TOOLS
    setTimeout(() => setShowTools(true), 1800);
    // Typewriter
    setTimeout(() => {
      setShowTagline(true);
      let i = 0;
      const t = setInterval(() => {
        i++;
        setTaglineText(full.slice(0, i));
        if (i >= full.length) clearInterval(t);
      }, 28);
    }, 2400);
    return () => clearInterval(slot);
  }, []);

  return (
    <div className="scene scene-enter" style={{ background:"#08001a" }}>
      {/* Purple glow behind number */}
      <div style={{
        position:"absolute", width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(123,47,255,0.25) 0%,transparent 70%)",
        pointerEvents:"none",
      }} />

      {/* 700 slot machine */}
      <div style={{
        fontSize:"clamp(90px,20vw,180px)", lineHeight:1,
        color:"#FFE500",
        fontFamily:"'Bebas Neue',sans-serif",
        letterSpacing:"0.06em",
        textShadow:"0 0 60px rgba(255,229,0,0.4)",
        animation: locked ? "scalePunch 0.5s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
        transition: locked ? "none" : "color 0.05s",
        minWidth:"3ch", textAlign:"center",
      }}>{count}</div>

      {/* TOOLS flip */}
      {showTools && (
        <div style={{
          fontSize:"clamp(48px,10vw,90px)", color:"#fff", lineHeight:0.9,
          animation:"flip3D 0.7s cubic-bezier(0.22,0.61,0.36,1) both",
          letterSpacing:"0.08em",
        }}>TOOLS</div>
      )}

      {/* Tagline typewriter */}
      {showTagline && (
        <div style={{
          fontFamily:"'DM Mono',monospace", fontSize:"clamp(11px,2vw,14px)",
          color:"#00FF88", letterSpacing:"0.04em", marginTop:20,
          maxWidth:480, textAlign:"center", padding:"0 24px",
          minHeight:24,
        }}>
          {taglineText}
          <span style={{ animation:"blink 1s infinite" }}>|</span>
        </div>
      )}

      <button onClick={onNext} style={{
        marginTop:44, fontFamily:"'DM Mono',monospace", fontSize:13,
        letterSpacing:"0.18em", textTransform:"uppercase",
        color:"#000", background:"#FFE500", border:"none", cursor:"pointer",
        padding:"12px 32px", borderRadius:2,
        animation:"ctaFadeIn 0.5s 3.2s both", opacity:0,
        transition:"all 0.15s",
      }}
        onMouseEnter={e=>{e.currentTarget.style.background="#fff";}}
        onMouseLeave={e=>{e.currentTarget.style.background="#FFE500";}}>
        Next →
      </button>
    </div>
  );
}

// ── Scene 3: THE BUILDER ──────────────────────────────────────────────────
function Scene3({ onDone }) {
  const [showBuiltBy, setShowBuiltBy] = useState(false);
  const [showSamuel, setShowSamuel] = useState(false);
  const [showMensah, setShowMensah] = useState(false);
  const [showHandle, setShowHandle] = useState(false);
  const [handleText, setHandleText] = useState("");
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowBuiltBy(true), 300);
    setTimeout(() => setShowSamuel(true), 700);
    setTimeout(() => setShowMensah(true), 1200);
    setTimeout(() => {
      setShowHandle(true);
      const t = "@alpha-1-design";
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setHandleText(t.slice(0, i));
        if (i >= t.length) clearInterval(iv);
      }, 50);
    }, 1900);
    setTimeout(() => setShowCTA(true), 2800);
  }, []);

  const ScatterWord = ({ word, scatter, color, fontSize, delay = 0 }) => (
    <div style={{ display:"flex", alignItems:"flex-end", gap:2, overflow:"visible" }}>
      {word.split("").map((l, i) => {
        const [sx, sy, sr] = scatter[i] || [0, 0, 0];
        return (
          <span key={i} style={{
            display:"inline-block",
            fontSize:`clamp(${fontSize * 0.6}px,${fontSize * 0.12}vw,${fontSize}px)`,
            color,
            textShadow:`0 0 30px ${color}66`,
            transform:`translate(${sx}px,${sy}px) rotate(${sr}deg)`,
            animation:`assemble 0.8s ${delay + i * 55}ms cubic-bezier(0.16,1,0.3,1) both`,
            animationFillMode:"both",
          }}>{l}</span>
        );
      })}
    </div>
  );

  return (
    <div className="scene scene-enter" style={{ background:"#000" }}>
      <FloatingDots />

      {/* BUILT BY */}
      {showBuiltBy && (
        <div style={{
          fontFamily:"'DM Mono',monospace", fontSize:12,
          color:"rgba(255,255,255,0.3)", letterSpacing:"0.22em",
          textTransform:"uppercase", marginBottom:16,
          animation:"ctaFadeIn 0.4s both",
        }}>Built by</div>
      )}

      {/* SAMUEL */}
      {showSamuel && (
        <ScatterWord word="SAMUEL" scatter={S_SCATTER} color="#fff" fontSize={110} delay={0} />
      )}

      {/* MENSAH */}
      {showMensah && (
        <ScatterWord word="MENSAH" scatter={M_SCATTER} color="#FF2D6B" fontSize={110} delay={0} />
      )}

      {/* Handle */}
      {showHandle && (
        <div style={{
          fontFamily:"'DM Mono',monospace", fontSize:16,
          color:"#00FF88", letterSpacing:"0.1em", marginTop:20,
          animation:"ctaFadeIn 0.4s both",
        }}>
          {handleText}
          <span style={{ animation:"blink 0.9s infinite" }}>_</span>
        </div>
      )}

      {/* CTA */}
      {showCTA && (
        <button onClick={onDone} style={{
          marginTop:48, fontFamily:"'DM Mono',monospace", fontSize:14,
          letterSpacing:"0.2em", textTransform:"uppercase",
          color:"#000", background:"#00FF88", border:"none", cursor:"pointer",
          padding:"14px 40px", borderRadius:2,
          animation:"ctaFadeIn 0.5s both, ctaPulse 2s 0.5s ease infinite",
          transition:"all 0.15s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}>
          → Explore
        </button>
      )}
    </div>
  );
}

// ── Main IntroScreen ──────────────────────────────────────────────────────
export default function IntroScreen({ onDone }) {
  const [scene, setScene] = useState(1);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Keyboard support
    const handler = (e) => {
      if (e.key === "Escape") handleSkip();
      if (e.key === "ArrowRight" || e.key === " ") handleNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [scene]);

  const handleNext = () => {
    if (scene < 3) setScene(s => s + 1);
    else handleDone();
  };

  const handleDone = () => {
    localStorage.setItem("utb_intro_seen", "1");
    onDone();
  };

  const handleSkip = () => {
    localStorage.setItem("utb_intro_seen", "1");
    onDone();
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="intro-wrap">
        {scene === 1 && <Scene1 onNext={handleNext} />}
        {scene === 2 && <Scene2 onNext={handleNext} />}
        {scene === 3 && <Scene3 onDone={handleDone} />}

        {/* Skip */}
        <button className="skip-btn" onClick={handleSkip}>Skip intro</button>

        {/* Progress dots */}
        <div className="prog-dots">
          {[1,2,3].map(n => (
            <div key={n} className={`prog-dot ${scene === n ? "active" : ""}`} />
          ))}
        </div>
      </div>
    </>
  );
}
