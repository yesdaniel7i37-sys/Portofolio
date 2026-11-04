import { techStack } from "../data/profile";

const headIcons = {
  layout: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" /></svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="7" rx="2" /><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M7 6.5h.01M7 17.5h.01" /></svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
  ),
};

export default function TechStack() {
  return (
    <section className="ts" id="tech" aria-labelledby="ts-title">
      <div className="wrap">
        <header className="ts-head">
          <h2 id="ts-title">Tech <span>Stack</span></h2>
          <p>Keahlian teknis saya: front-end, desain UI/UX, aplikasi AI, serta database, jaringan, dan sistem operasi.</p>
          <i className="ts-bar" aria-hidden="true" />
        </header>
        <div className="ts-grid">
          {techStack.map((g) => (
            <article className="ts-card" key={g.title}>
              <div className="ts-card-head">
                <span className="ts-ico">{headIcons[g.icon]}</span>
                <h3>{g.title}</h3>
              </div>
              <ul className="ts-list">
                {g.items.map(([name, file]) => (
                  <li key={name} className="ts-item">
                    <img src={`/tech/${file}.svg`} alt="" width="24" height="24" loading="lazy" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
