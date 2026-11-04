import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { profile } from "../data/profile";
import { siteUrl } from "../lib/site";

const title = `${profile.first} ${profile.last} | Front-End Developer`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.summary,
  keywords: ["Front-End Developer", "React.js", "Next.js", "UI/UX Designer", "Figma", "Portofolio", profile.name],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "id_ID", siteName: `${profile.first} ${profile.last}`,
    title, description: profile.pitch, url: "/",
  },
  twitter: { card: "summary_large_image", title, description: profile.pitch },
};
export const viewport = { themeColor: "#050816" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: profile.location, addressCountry: "ID" },
  alumniOf: "Universitas Gunadarma",
  sameAs: [profile.github],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
