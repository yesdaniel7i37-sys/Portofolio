import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="wrap foot">
      <p>&copy; 2026 {profile.name}</p>
      <p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>{" "}
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>{" "}
        <a href={profile.cv} download>Unduh CV</a>
      </p>
    </footer>
  );
}
