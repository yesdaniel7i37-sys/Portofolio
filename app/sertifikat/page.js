import CertGallery from "../../components/CertGallery";

export const metadata = {
  title: "Sertifikat | Yes Daniel Sinaga",
  description: "Kumpulan sertifikat Yes Daniel Sinaga: sertifikat kompetensi BNSP Insinyur Data Madya (Artificial Intelligence) serta pelatihan Universitas Gunadarma di bidang web, database, jaringan, dan sistem operasi server.",
};

export default function Sertifikat() {
  return (
    <main className="wrap sec top">
      <h1 className="page-title">Sertifikat</h1>
      <CertGallery />
    </main>
  );
}
