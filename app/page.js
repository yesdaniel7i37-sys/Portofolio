import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import Contact from "../components/Contact";
import { profile, education } from "../data/profile";

export default function Home() {
  const items = [...profile.roles, ...profile.roles, ...profile.roles];
  return (
    <main>
      <Hero />
      <div className="marquee">
        <p className="sr">{profile.roles.join(", ")}</p>
        <div className="track" aria-hidden="true">
          {[0, 1].map((k) => (
            <div className="set" key={k}>
              {items.map((r, i) => (<span key={i}>{r}<i className="dot" /></span>))}
            </div>
          ))}
        </div>
      </div>

      <section className="wrap sec">
        <h2>Tentang</h2>
        <div className="about">
          <p>{profile.summary}</p>
          <div className="card">
            <strong>{education.school}</strong>
            <span>{education.degree}, {education.period}</span>
            <span className="gpa">{education.gpa}</span>
          </div>
        </div>
      </section>

      <TechStack />

      <Contact />
    </main>
  );
}
