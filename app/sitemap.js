import { siteUrl } from "../lib/site";

export default function sitemap() {
  const now = new Date();
  return ["", "/skill", "/projek", "/sertifikat"].map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
