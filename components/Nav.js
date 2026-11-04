"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "../data/profile";

const links = [["/", "Home"], ["/skill", "Skill"], ["/projek", "Projek"], ["/sertifikat", "Sertifikat"]];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="bar">
      <div className="wrap bar-in">
        <Link href="/" className="brand">{profile.first} {profile.last}</Link>
        <nav aria-label="Navigasi utama" className="nav">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="bar-r">
          <a className="icon" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" /></svg>
          </a>
          <a className="icon" href={`mailto:${profile.email}`} aria-label="Email">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.4 2L12 12.6 19.6 7z" /></svg>
          </a>
          <Link href="/#kontak" className="btn small">Kontak</Link>
        </div>
      </div>
    </header>
  );
}
