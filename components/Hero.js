import Link from "next/link";
import { profile, education } from "../data/profile";

export default function Hero() {
  return (
    <section className="wrap hero2" aria-labelledby="hero-title">
      <div className="h-in">
        <p className="status"><i aria-hidden="true" />Terbuka untuk peluang kerja</p>
        <h1 id="hero-title"><span>{profile.first}</span><span>{profile.last}</span></h1>
        <p className="h-role">{profile.role}</p>
        <p className="h-pitch">{profile.pitch}</p>
        <div className="h-cta">
          <Link href="/projek" className="btn">Lihat projek</Link>
          <a className="ghost" href={profile.cv} download>Unduh CV</a>
          <a className="ghost" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <dl className="h-facts">
          <div><dt>Pendidikan</dt><dd>{education.school}</dd></div>
          <div><dt>IPK</dt><dd>3,93 / 4,00</dd></div>
          <div><dt>Lokasi</dt><dd>{profile.location}</dd></div>
        </dl>
      </div>
      <figure className="portrait">
        <img className="ph" src="/foto-yes-daniel.jpg" alt={`Foto ${profile.name}`} width="640" height="853" />
        <figcaption><strong>{profile.name}</strong><span>{education.degree}, {education.school}</span></figcaption>
      </figure>
    </section>
  );
}
