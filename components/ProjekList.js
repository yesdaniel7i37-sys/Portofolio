"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { experience, projects } from "../data/profile";

// Proyek lebih dulu (semua punya gambar), lalu pengalaman. Ubah urutannya di sini kalau perlu.
const items = [
  ...projects.map((p) => ({ ...p, kind: "Proyek" })),
  ...experience.map((p) => ({ ...p, kind: "Pengalaman" })),
];
const allTags = [...new Set(items.flatMap((i) => i.tags))];

export default function ProjekList() {
  const [tag, setTag] = useState(null);
  const [active, setActive] = useState(0);
  const [shots, setShots] = useState({});          // gambar mana yang tampil per proyek
  const [dx, setDx] = useState(0);                 // jarak geser saat ditarik (px)
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState(300);
  const stage = useRef(null);
  const drag = useRef({ x0: 0, moved: 0 });

  const list = tag ? items.filter((i) => i.tags.includes(tag)) : items;
  const cur = Math.min(active, list.length - 1);
  const go = useCallback((n) => setActive(Math.max(0, Math.min(list.length - 1, n))), [list.length]);

  useEffect(() => {
    const measure = () => {
      const el = stage.current?.querySelector(".slide");
      if (el) setStep(el.offsetWidth * 0.6);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const down = (e) => {
    if (e.target.closest("button") || (e.pointerType === "mouse" && e.button !== 0)) return;
    const d = drag.current;
    d.x0 = e.clientX; d.moved = 0;
    setDragging(true); setDx(0);
    const mv = (ev) => { d.moved = Math.max(d.moved, Math.abs(ev.clientX - d.x0)); setDx(ev.clientX - d.x0); };
    const up = (ev) => {
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      const delta = ev.type === "pointerup" ? ev.clientX - d.x0 : 0;
      let n = Math.round(-delta / step);
      if (n === 0 && Math.abs(delta) > 40) n = delta < 0 ? 1 : -1;
      n = Math.max(-2, Math.min(2, n));
      setDragging(false); setDx(0);
      if (n) go(cur + n);
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const key = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(list.length - 1); }
  };

  const p = list[cur];
  const shotIdx = p ? Math.min(shots[p.id] || 0, (p.images?.length || 1) - 1) : 0;

  return (
    <>
      <div className="chips" role="group" aria-label="Saring berdasarkan teknologi">
        <button type="button" className="chip" aria-pressed={tag === null} onClick={() => { setTag(null); setActive(0); }}>Semua</button>
        {allTags.map((t) => (
          <button key={t} type="button" className="chip" aria-pressed={tag === t} onClick={() => { setTag(tag === t ? null : t); setActive(0); }}>{t}</button>
        ))}
      </div>

      <section className="gallery" aria-roledescription="carousel" aria-label="Galeri projek">
        <div className="cf-wrap">
          <button type="button" className="cf-nav prev" onClick={() => go(cur - 1)} disabled={cur === 0} aria-label="Projek sebelumnya">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div
            ref={stage} className={dragging ? "cf is-drag" : "cf"} tabIndex={0}
            onPointerDown={down} onKeyDown={key}
            aria-label="Geser atau gunakan panah kiri dan kanan untuk berpindah projek"
          >
            {list.map((it, i) => {
              const off = i - cur + dx / step, a = Math.abs(off), sign = Math.sign(off);
              const idx = Math.min(shots[it.id] || 0, (it.images?.length || 1) - 1);
              const img = it.images?.[idx];
              const isCur = i === cur;
              const style = {
                transform: `translateX(calc(-50% + ${off * 60}%)) translateZ(${-a * 70}px) rotateY(${-sign * Math.min(a, 1) * 30}deg) scale(${Math.max(0.5, 1 - a * 0.15)})`,
                opacity: Math.max(0, 1 - a * 0.3),
                zIndex: 100 - Math.round(a * 10),
                filter: `brightness(${1 - Math.min(a, 2) * 0.22})`,
                visibility: a > 3.2 ? "hidden" : "visible",
              };
              const body = img ? (
                <img src={img.src} alt={isCur ? img.alt : ""} width={img.w} height={img.h} draggable={false} />
              ) : (
                <div className="cover-empty">
                  <strong>{it.title}</strong>
                  <span>{it.sub}</span>
                  {it.peran ? <b className="role-chip">{it.peran}</b> : null}
                  <em>{it.tags.join(" · ")}</em>
                </div>
              );
              return (
                <div
                  key={it.id} className={isCur ? "slide is-cur" : "slide"} style={style}
                  role="group" aria-roledescription="slide" aria-label={`${i + 1} dari ${list.length}: ${it.title}`} aria-hidden={isCur ? undefined : true}
                  onClick={() => { if (drag.current.moved < 6 && !isCur) go(i); }}
                >
                  {isCur && img ? (
                    <a href={img.src} target="_blank" rel="noopener noreferrer" aria-label={`Buka gambar penuh: ${img.caption}`}
                       onClick={(e) => { if (drag.current.moved >= 6) e.preventDefault(); }} onDragStart={(e) => e.preventDefault()}>
                      {body}
                    </a>
                  ) : body}
                </div>
              );
            })}
          </div>
          <button type="button" className="cf-nav next" onClick={() => go(cur + 1)} disabled={cur >= list.length - 1} aria-label="Projek berikutnya">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {p ? (
          <div className="detail" aria-live="polite">
            {p.images?.length > 1 ? (
              <div className="views" role="group" aria-label="Pilih tampilan">
                {p.images.map((im, k) => (
                  <button key={im.src} type="button" className="chip" aria-pressed={k === shotIdx} onClick={() => setShots((s) => ({ ...s, [p.id]: k }))}>{im.label}</button>
                ))}
              </div>
            ) : null}
            <p className="kind">{p.kind} · {p.period}</p>
            {p.peran ? <p className="role"><span>Peran</span>{p.peran}</p> : null}
            <h2 className="d-title">{p.title}</h2>
            <p className="d-sub">{p.sub}</p>
            {p.desc ? <p className="d-desc">{p.desc}</p> : null}
            <p className="tags">{p.tags.join(", ")}</p>
            {(() => {
              const links = p.links || (p.link ? [{ href: p.link, label: p.linkLabel || "Buka website" }] : []);
              return links.length ? (
                <div className="d-actions">
                  {links.map((l, k) => (
                    <a key={l.href} className={k === 0 ? "btn small" : "ghost"} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  ))}
                </div>
              ) : null;
            })()}
            {p.note ? <p className="d-note">{p.note}</p> : null}
            <details className="more">
              <summary>Rincian pekerjaan</summary>
              <ul>{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            </details>
            <p className="count">{cur + 1} / {list.length}</p>
          </div>
        ) : <p className="count">Belum ada projek dengan teknologi ini.</p>}
      </section>
    </>
  );
}
