"use client";
import { useState } from "react";
import { profile } from "../data/profile";

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", trap: "" });
  const [note, setNote] = useState({ text: "", ok: false });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const mailto = () => {
    const subject = encodeURIComponent(`Pesan dari ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}${form.email.trim() ? `\n\nBalas ke: ${form.email.trim()}` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setNote({ text: "Aplikasi email Anda akan terbuka dengan pesan ini.", ok: true });
  };

  const send = async (e) => {
    e.preventDefault();
    if (form.trap) return;                                   // jebakan untuk bot
    if (!form.name.trim() || !form.message.trim()) { setNote({ text: "Isi nama dan pesan terlebih dahulu.", ok: false }); return; }
    if (form.email.trim() && !emailOk(form.email.trim())) { setNote({ text: "Format email belum benar.", ok: false }); return; }
    if (!FORM_ID) { mailto(); return; }
    setBusy(true); setNote({ text: "", ok: false });
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim() || undefined, message: form.message.trim(), _subject: `Pesan portofolio dari ${form.name.trim()}` }),
      });
      if (!res.ok) throw new Error("gagal");
      setForm({ name: "", email: "", message: "", trap: "" });
      setNote({ text: "Terima kasih, pesan Anda sudah terkirim. Saya akan membalas secepatnya.", ok: true });
    } catch {
      setNote({ text: "Pesan belum terkirim. Coba lagi, atau kirim lewat aplikasi email.", ok: false });
    } finally { setBusy(false); }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setNote({ text: "Email disalin.", ok: true }); }
    catch { setNote({ text: `Tidak bisa menyalin otomatis. Salin manual: ${profile.email}`, ok: false }); }
  };

  const wa = profile.whatsapp
    ? `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Halo Yes Daniel, saya melihat portofolio Anda.")}`
    : null;

  return (
    <section id="kontak" className="wrap sec">
      <h2>Kontak</h2>
      <p className="contact-lead">Punya pekerjaan, proyek, atau pertanyaan? Kirim pesan, saya balas secepatnya.</p>
      <form className="form" onSubmit={send} noValidate>
        <label htmlFor="n">Nama</label>
        <input id="n" value={form.name} onChange={set("name")} autoComplete="name" required />
        <label htmlFor="e">Email Anda <span className="opt">(opsional, agar saya bisa membalas)</span></label>
        <input id="e" type="email" inputMode="email" value={form.email} onChange={set("email")} autoComplete="email" />
        <label htmlFor="m">Pesan</label>
        <textarea id="m" rows="5" value={form.message} onChange={set("message")} required />
        <input className="trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.trap} onChange={set("trap")} />
        <div className="actions">
          <button type="submit" className="btn" disabled={busy}>{busy ? "Mengirim..." : FORM_ID ? "Kirim pesan" : "Kirim lewat email"}</button>
          {wa ? <a className="ghost" href={wa} target="_blank" rel="noopener noreferrer">Chat WhatsApp</a> : null}
          <button type="button" className="ghost" onClick={copy}>Salin alamat email</button>
        </div>
        <p className={note.text ? (note.ok ? "note ok" : "note err") : "note"} role="status">{note.text}</p>
      </form>
    </section>
  );
}
