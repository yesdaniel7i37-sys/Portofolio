import { skills, training, languages } from "../../data/profile";
import NameTag from "../../components/NameTag";

export const metadata = { title: "Skill | Yes Daniel Sinaga" };

export default function Skill() {
  return (
    <main className="wrap sec top">
      <h1 className="page-title">Skill</h1>
      <div className="skill-body">
        <dl className="skills">
          {skills.map(([k, v]) => (<div key={k} className="card"><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <h2 className="mt">Pelatihan</h2>
        <ul className="train">
          {training.map(([n, w, d]) => (<li key={n}><strong>{n}</strong> <span>{w}</span><br />{d}</li>))}
        </ul>
        <p className="count">Bahasa: {languages.join(" dan ")}</p>
      </div>
      <NameTag />
    </main>
  );
}
