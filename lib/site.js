// Alamat website dipakai untuk pratinjau saat dibagikan dan sitemap.
// Di Vercel terisi otomatis. Kalau sudah punya domain sendiri, isi NEXT_PUBLIC_SITE_URL, contoh https://yesdaniel.my.id
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
