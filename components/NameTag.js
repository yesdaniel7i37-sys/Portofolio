"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { createRope, stepRope, badgePose, SEGMENTS } from "./ropePhysics";

const STRAP_TEXT = `${profile.name.toUpperCase()}   FRONT-END DEVELOPER   UI/UX   `.repeat(8);
const STEP = 1 / 120;
const CLIP = 34; // tinggi klip di atas kartu

export default function NameTag() {
  const badge = useRef(null), edge = useRef(null), main = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const s = useRef({ rope: null, acc: 0, last: 0, drag: null, moved: 0, reduce: false, restart: null });

  useEffect(() => {
    const b = badge.current, st = s.current;
    st.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;

    const layout = () => {
      const W = window.innerWidth, Hv = window.innerHeight, BH = b.offsetHeight;
      const wide = W >= 1000;
      const ax = wide ? Math.min(W - 150, W / 2 + 590 - 150) : W * 0.8;
      const len = Math.max(140, Math.min(300, Hv * 0.3));
      return { W, Hv, ax, ay: -40, len, stick: BH + CLIP };
    };
    const build = (drop) => {
      const L = layout();
      st.L = L;
      st.rope = createRope({ ax: L.ax, ay: L.ay, len: L.len, stick: L.stick, W: L.W, drop });
      if (!drop) for (let i = 0; i < 900; i++) stepRope(st.rope, STEP, bounds(L), null);
      b.style.opacity = 1;
    };
    const bounds = (L) => ({ l: 24, r: L.W - 24, b: L.Hv - 8 });
    st.restart = () => { setFlipped(false); build(!st.reduce); };
    build(!st.reduce);

    const onResize = () => {
      const old = st.L, L = layout();
      if (!st.rope || (old.W === L.W && old.Hv === L.Hv)) return;
      st.restart();
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      const r = st.rope, p = badgePose(r), BW = b.offsetWidth;
      b.style.transform = `translate(${p.x - BW / 2}px, ${p.y + CLIP}px) rotate(${p.a}rad)`;
      let d = `M${r.pts[0].x} ${r.pts[0].y}`;
      for (let i = 1; i <= SEGMENTS; i++) {
        const a = r.pts[i], c = r.pts[i + 1] && i < SEGMENTS ? r.pts[i + 1] : a;
        const mx = i < SEGMENTS ? (a.x + c.x) / 2 : a.x, my = i < SEGMENTS ? (a.y + c.y) / 2 : a.y;
        d += ` Q${a.x} ${a.y} ${mx} ${my}`;
      }
      edge.current?.setAttribute("d", d);
      main.current?.setAttribute("d", d);
    };

    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      if (!st.rope) return;
      if (!st.last) st.last = t;
      st.acc += Math.min(0.05, (t - st.last) / 1000); st.last = t;
      const bd = bounds(st.L);
      while (st.acc >= STEP) { stepRope(st.rope, STEP, bd, st.drag); st.acc -= STEP; }
      draw();
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  const down = (e) => {
    const st = s.current, p = badgePose(st.rope);
    const dx = e.clientX - p.x, dy = e.clientY - (p.y + CLIP * 0);
    const c = Math.cos(-p.a), sn = Math.sin(-p.a);
    st.drag = { lx: dx * c - dy * sn, ly: dx * sn + dy * c, a: p.a, tx: e.clientX, ty: e.clientY };
    st.moved = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    const st = s.current;
    if (!st.drag) return;
    st.moved += Math.hypot(e.clientX - st.drag.tx, e.clientY - st.drag.ty);
    st.drag.tx = e.clientX; st.drag.ty = e.clientY;
    st.drag.a = badgePose(st.rope).a;
  };
  const up = (e) => {
    const st = s.current;
    if (!st.drag) return;
    st.drag = null;
    if (e.type === "pointerup" && st.moved < 6) setFlipped((f) => !f);
  };
  const key = (e) => {
    const r = s.current.rope;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const k = e.key === "ArrowLeft" ? 1 : -1;
      for (let i = SEGMENTS; i <= SEGMENTS + 1; i++) r.pts[i].ox += 9 * k;
    }
  };

  return (
    <div className="lanyard-layer">
      <svg className="strap" aria-hidden="true">
        <path ref={edge} className="strap-edge" />
        <path ref={main} id="strap-main" className="strap-main" />
        <text className="strap-text" dy="3.3"><textPath href="#strap-main">{STRAP_TEXT}</textPath></text>
      </svg>
      <div
        ref={badge} className="tag" role="button" tabIndex={0} aria-pressed={flipped}
        aria-label="Nametag Yes Daniel. Klik untuk membalik, seret atau lempar dengan mouse, panah kiri dan kanan untuk mengayunkan."
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onKeyDown={key}
      >
        <span className="clip" aria-hidden="true" />
        <div className={flipped ? "tag-in is-flipped" : "tag-in"}>
          <div className="face front">
            <span className="slot" />
            <img src="/foto-yes-daniel.jpg" alt={`Foto ${profile.first}`} width="200" height="190" draggable={false} />
            <div className="tag-text">
              <strong>{profile.name}</strong>
              <span>Front-End Developer</span>
              <span>Web dan App Designer</span>
            </div>
          </div>
          <div className="face back">
            <span className="slot" />
            <p className="big">3,93</p>
            <p className="small">IPK dari 4,00, S1 Informatika, Universitas Gunadarma</p>
            <p className="small">React.js, Figma, Streamlit</p>
            <p className="small">{profile.location}</p>
          </div>
        </div>
      </div>
      <button type="button" className="ghost drop-btn" onClick={() => s.current.restart?.()}>Jatuhkan lagi</button>
    </div>
  );
}
