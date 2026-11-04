"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { certificates, certCategories, certIssuer } from "../data/sertifikat";

const year = (c) => c.terbit.slice(0, 4);
const norm = (s) => s.toLowerCase();

export default function CertGallery() {
  const [kat, setKat] = useState("Semua");
  const [q, setQ] = useState("");
  const [order, setOrder] = useState("baru");
  const [openSlug, setOpenSlug] = useState(null);
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState("id");
  const [zoom, setZoom] = useState(false);
  const dlg = useRef(null);
  const lastFocus = useRef(null);

  const list = useMemo(() => {
    const t = norm(q.trim());
    const rows = certificates.filter((c) =>
      (kat === "Semua" || c.kategori === kat) &&
      (!t || norm([c.judul, c.judulEn, c.kategori, c.no, c.noReg || "", c.penerbit || "", c.waktu, ...c.materi.flat()].join(" ")).includes(t))
    );
    rows.sort((a, b) => (order === "baru" ? b.terbit.localeCompare(a.terbit) : a.terbit.localeCompare(b.terbit)));
    return rows;
  }, [kat, q, order]);

  const years = useMemo(() => {
    const g = [];
    list.forEach((c) => {
      const y = year(c);
      const last = g[g.length - 1];
      if (last && last.y === y) last.items.push(c); else g.push({ y, items: [c] });
    });
    return g;
  }, [list]);

  const idx = list.findIndex((c) => c.slug === openSlug);
  const cur = idx >= 0 ? list[idx] : null;

  const open = (c, e) => { lastFocus.current = e?.currentTarget || null; setOpenSlug(c.slug); setPage(1); setZoom(false); };
  const close = () => dlg.current?.close();
  const go = (d) => { if (!list.length) return; const n = list[(idx + d + list.length) % list.length]; setOpenSlug(n.slug); setPage(1); setZoom(false); };

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (cur && !d.open) { d.showModal(); document.documentElement.style.overflow = "hidden"; }
  }, [cur]);

  const onClosed = () => {
    setOpenSlug(null);
    document.documentElement.style.overflow = "";
    lastFocus.current?.focus?.();
  };
  useEffect(() => () => { document.documentElement.style.overflow = ""; }, []);

  const onKey = (e) => {
    if (e.target.closest?.("input,textarea")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  // efek miring mengikuti kursor (hanya mouse)
  const tilt = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(0)}%`);
    el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(0)}%`);
  };
  const untilt = (e) => { const s = e.currentTarget.style; s.setProperty("--rx", "0deg"); s.setProperty("--ry", "0deg"); };

  const counts = useMemo(() => Object.fromEntries(certCategories.map((k) => [k, certificates.filter((c) => c.kategori === k).length])), []);
  const reset = () => { setKat("Semua"); setQ(""); };

  return (
    <div className="cr">
      <p className="cr-lead">
        {certificates.length} sertifikat, termasuk sertifikat kompetensi BNSP dan pelatihan dari {certIssuer}, {year(certificates[certificates.length - 1])} sampai {year(certificates[0])}. Klik sertifikat untuk melihat dokumen, detail, dan mengunduh PDF-nya.
      </p>

      <div className="cr-bar">
        <div className="cr-chips" role="group" aria-label="Filter bidang">
          {["Semua", ...certCategories].map((k) => (
            <button key={k} type="button" className="chip" aria-pressed={kat === k} onClick={() => setKat(k)}>
              {k} <span className="cr-n">{k === "Semua" ? certificates.length : counts[k]}</span>
            </button>
          ))}
        </div>
        <div className="cr-tools">
          <label className="cr-search">
            <span className="sr">Cari sertifikat</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari sertifikat atau materi" />
          </label>
          <label className="cr-sort">
            <span className="sr">Urutkan</span>
            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="baru">Terbaru dulu</option>
              <option value="lama">Terlama dulu</option>
            </select>
          </label>
        </div>
      </div>

      <p className="sr" role="status" aria-live="polite">{list.length} sertifikat ditampilkan</p>

      {list.length === 0 ? (
        <div className="cr-empty">
          <p>Tidak ada sertifikat yang cocok dengan pencarian.</p>
          <button type="button" className="ghost" onClick={reset}>Tampilkan semua</button>
        </div>
      ) : (
        years.map((g) => (
          <section key={g.y} className="cr-year" aria-label={`Sertifikat tahun ${g.y}`}>
            <h2 className="cr-y">{g.y}<span>{g.items.length} sertifikat</span></h2>
            <ul className="cr-grid">
              {g.items.map((c) => (
                <li key={c.slug}>
                  <button type="button" className="cr-card" data-k={c.kategori} onClick={(e) => open(c, e)} aria-label={`Buka sertifikat ${c.judul}`}>
                    <span className="cr-thumb" onPointerMove={tilt} onPointerLeave={untilt}>
                      <img src={`/sertifikat/${c.slug}-1.webp`} alt="" width="910" height="1287" loading="lazy" draggable={false} />
                      <i className="cr-shine" aria-hidden="true" />
                    </span>
                    <span className="cr-meta">
                      <span className="cr-tag"><i aria-hidden="true" />{c.kategori}{c.level ? ` · ${c.level}` : ""}</span>
                      <strong>{c.judul}</strong>
                      <span className="cr-date">{c.waktu}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}

      <dialog ref={dlg} className="cr-dlg" onClose={onClosed} onKeyDown={onKey} onClick={(e) => { if (e.target === dlg.current) close(); }} aria-labelledby="cr-dt">
        {cur && (
          <div className="cr-dbox" data-k={cur.kategori}>
            <div className="cr-viewer">
              <div className="cr-vbar">
                <div className="cr-tabs" role="tablist" aria-label="Halaman dokumen">
                  <button role="tab" type="button" aria-selected={page === 1} onClick={() => setPage(1)}>Sertifikat</button>
                  {cur.halaman !== 1 && <button role="tab" type="button" aria-selected={page === 2} onClick={() => setPage(2)}>Daftar materi</button>}
                </div>
                <button type="button" className="cr-zoom" aria-pressed={zoom} onClick={() => setZoom(!zoom)}>{zoom ? "Perkecil" : "Perbesar"}</button>
              </div>
              <div className={zoom ? "cr-scroll is-zoom" : "cr-scroll"}>
                <img key={`${cur.slug}-${page}`} src={`/sertifikat/${cur.slug}-${page}.webp`} alt={page === 1 ? `Sertifikat ${cur.judul}` : `Daftar materi pelatihan ${cur.judul}`} width="910" height="1287" />
              </div>
            </div>

            <div className="cr-info">
              <button type="button" className="cr-x" onClick={close} aria-label="Tutup">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
              <p className="cr-tag"><i aria-hidden="true" />{cur.kategori}{cur.level ? ` · ${cur.level}` : ""}</p>
              <h2 id="cr-dt">{cur.judul}</h2>
              <p className="cr-en">{cur.judulEn}</p>
              <dl className="cr-dl">
                <div><dt>Pelaksanaan</dt><dd>{cur.waktu}</dd></div>
                <div><dt>Diterbitkan</dt><dd>{cur.terbitLabel}, Jakarta</dd></div>
                <div><dt>Nomor</dt><dd>{cur.no}</dd></div>
                {cur.noReg && <div><dt>No. Registrasi</dt><dd>{cur.noReg}</dd></div>}
                {cur.berlaku && <div><dt>Masa berlaku</dt><dd>{cur.berlaku}</dd></div>}
                <div><dt>Penerbit</dt><dd>{cur.penerbit || certIssuer}</dd></div>
              </dl>
              {cur.materi.length > 0 && (<>
              <div className="cr-mh">
                <h3>Materi pelatihan</h3>
                <div className="cr-lang" role="group" aria-label="Bahasa materi">
                  <button type="button" aria-pressed={lang === "id"} onClick={() => setLang("id")}>ID</button>
                  <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
                </div>
              </div>
              <ul className="cr-mat">
                {cur.materi.map((m, i) => (<li key={i}>{lang === "id" ? m[0] : m[1]}</li>))}
              </ul>
              </>)}
              <div className="cr-act">
                <a className="btn" href={`/sertifikat/${cur.slug}.pdf`} download>Unduh PDF</a>
                <a className="ghost" href={`/sertifikat/${cur.slug}.pdf`} target="_blank" rel="noopener noreferrer">Buka di tab baru</a>
              </div>
              <div className="cr-pn">
                <button type="button" className="ghost" onClick={() => go(-1)} aria-label="Sertifikat sebelumnya">Sebelumnya</button>
                <span aria-live="polite">{idx + 1} dari {list.length}</span>
                <button type="button" className="ghost" onClick={() => go(1)} aria-label="Sertifikat berikutnya">Berikutnya</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
