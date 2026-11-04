// Semua isi website ada di file ini. Ubah teksnya, simpan, lalu push ke GitHub.
export const profile = {
  name: "Yes Daniel Sahat Parulian Sinaga",
  first: "Yes Daniel",
  last: "Sinaga",
  lines: ["Yes", "Daniel", "Sinaga"],
  roles: ["Front-End Developer", "Web Developer", "App Designer"],
  pitch: "Lulusan Informatika (IPK 3,93) yang fokus membangun antarmuka web dengan React.js dan merancang prototipe aplikasi di Figma.",
  role: "Front-End Developer dan UI/UX Designer",
  summary:
    "Lulusan Informatika Universitas Gunadarma (IPK 3,93/4,00) dengan pengalaman membangun antarmuka web responsif memakai React.js, HTML, CSS, dan JavaScript, serta merancang prototipe interaktif di Figma. Mencari peran di pengembangan front-end dan aplikasi web yang berfokus pada pengguna.",
  email: "yesdaniel60@gmail.com",
  location: "Bogor, Jawa Barat",
  cv: "/CV_Yes_Daniel_Sinaga.pdf",
  github: "https://github.com/yesdaniel7i37-sys",
  // Isi nomor WhatsApp dengan kode negara tanpa tanda +, contoh "6281234567890". Kosongkan kalau tidak dipakai.
  whatsapp: "",
};

export const experience = [
  {
    id: "elibrary", peran: "Frontend Developer", desc: "Website perpustakaan digital SMPN 147 Jakarta tempat siswa menemukan buku digital. Saya mengerjakan sisi antarmukanya sebagai front-end developer: halaman katalog, pencarian buku, dan tampilan responsif yang terhubung ke API back-end. Beranda menampilkan koleksi yang sedang hangat, buku terbaru, dan daftar paling banyak dibaca.", images: [{ src: "/projek/elibrary.webp", w: 1290, h: 913, alt: "Beranda E-Library SMPN 147 Jakarta dengan bagian Sedang Hangat, Terbaru, dan Paling Banyak Dibaca", caption: "Beranda e-library: Sedang Hangat, Terbaru, dan Paling Banyak Dibaca" }], title: "Front End Developer", sub: "E-Library SMPN 147 Jakarta", period: "Okt 2025 - Jan 2026",
    tags: ["React.js", "JavaScript", "HTML/CSS", "API"],
    bullets: [
      "Membangun antarmuka website e-library dengan React.js, HTML, CSS, dan JavaScript berdasarkan desain UI/UX yang diberikan.",
      "Membuat fitur pencarian buku serta halaman katalog buku terbaru dan terpopuler agar pengguna cepat menemukan buku digital.",
      "Menerapkan tata letak responsif untuk berbagai ukuran layar dan perangkat.",
      "Menghubungkan komponen front-end dengan API back-end dan menguji fungsinya di beberapa browser.",
      "Memperbaiki bug antarmuka dan berkoordinasi dengan tim desain dan back-end agar sesuai kebutuhan proyek.",
    ],
    link: "https://perpussmpn147.com/bukudigital", linkLabel: "Buka website",
  },
];

export const projects = [
  {
    id: "mango", peran: "AI Developer", desc: "Aplikasi web berbasis AI untuk mendeteksi penyakit daun mangga dari sebuah foto. Pengguna mengunggah gambar dari galeri atau memotret langsung, lalu model EfficientNetB0 mengklasifikasikannya ke salah satu dari delapan kondisi: Anthracnose, Bacterial Canker, Cutting Weevil, Die Back, Gall Midge, Healthy, Powdery Mildew, dan Sooty Mould.", images: [{ src: "/projek/mango-leaf.webp", w: 1400, h: 563, alt: "Tampilan aplikasi Deteksi Penyakit Daun Mangga dengan daftar delapan kelas dan unggah gambar", caption: "Aplikasi Streamlit: unggah foto daun, hasil analisis tampil di sebelah kanan" }], title: "Mango Leaf Disease Detection App", sub: "Proyek skripsi", period: "2026",
    tags: ["Python", "Streamlit", "AI"],
    bullets: [
      "Membuat aplikasi AI yang mengklasifikasikan delapan kondisi daun mangga dengan transfer learning arsitektur EfficientNetB0.",
      "Membangun aplikasi web interaktif dengan Streamlit: pengguna dapat mengunggah gambar atau memotret lewat kamera langsung.",
      "Mengintegrasikan model terlatih ke aplikasi agar klasifikasi gambar mudah diakses.",
    ],
    links: [
      { href: "https://mango-leaf-disease-classification-update.streamlit.app", label: "Coba aplikasi" },
      { href: "https://github.com/yesdaniel7i37-sys/mango-leaf-disease-classification", label: "Lihat di GitHub" },
    ],
    note: "Aplikasi ini di-host gratis di Streamlit, jadi bisa tertidur kalau lama tidak dibuka. Jika muncul layar \"Zzzz\", klik tombol biru \"Yes, get this app back up!\" dan tunggu sekitar satu menit.",
  },
  {
    id: "manga", peran: "UI/UX Designer", desc: "Konsep ulang aplikasi baca manga bernama Manga Plus yang dirancang di Figma. Mencakup layar masuk dan daftar (termasuk opsi Google, Facebook, dan Twitter), serta halaman detail judul dengan daftar chapter, jumlah penayangan, tombol favorit, dan tombol unduh.", images: [{ src: "/projek/manga-remake.webp", w: 1021, h: 520, alt: "Mockup dua layar ponsel: halaman detail Hunter x Hunter dan layar masuk Manga Plus", caption: "Halaman detail judul dan layar masuk Manga Plus" }], title: "Manga App Remake", sub: "Proyek desain UI/UX, prototipe Figma", period: "2025",
    tags: ["Figma", "UI/UX"],
    bullets: [
      "Merancang aplikasi baca manga multi-layar di Figma: onboarding, autentikasi, beranda, pencarian, favorit, pengaturan, dan unduhan.",
      "Membuat prototipe interaktif dengan sentuhan dan geser untuk memperlihatkan alur navigasi utama.",
      "Merancang pengaturan pembaca: mode baca horizontal dan vertikal, arah baca, dan resolusi.",
    ],
    link: "https://www.figma.com/proto/qxdssUnAezurBSRRG56P1p/Remake-Manga-Application?node-id=9-200&t=mhEi0UC45NAo2jhp-1", linkLabel: "Lihat prototipe Figma",
  },
  {
    id: "coffee", peran: "Fullstack Developer", desc: "Website kedai kopi dengan dua sisi. Pelanggan melihat menu dan memesan dari halaman utama, sedangkan pengelola memantau pesanan lewat panel admin: ringkasan total pesanan, pesanan baru, pesanan yang sedang diproses, dan pendapatan, lengkap dengan penyaring status dan pengubah status tiap pesanan. Ada juga chat AI, dengan database PostgreSQL di Neon dan deploy di Vercel.", images: [{ src: "/projek/coffee-user.webp", label: "Web pengguna", w: 1400, h: 571, alt: "Halaman utama website Coffee Nangkau dengan tulisan Mari Nikmati Secangkir Kopi", caption: "Web pengguna: halaman utama Coffee Nangkau" }, { src: "/projek/coffee-admin.webp", label: "Panel admin", w: 1091, h: 882, alt: "Panel Admin Coffee Nangkau berisi ringkasan pesanan dan daftar pesanan", caption: "Panel admin: kelola pesanan dan lihat pendapatan" }], title: "Coffee Nangkau", sub: "Website kedai kopi", period: "2026",
    tags: ["React.js", "Next.js", "PostgreSQL", "JavaScript"],
    bullets: [
      "Mengerjakan website kedai kopi ini secara fullstack: dari antarmuka pengguna dan panel admin di sisi front-end sampai pengolahan data pesanan di sisi back-end.",
      "Membangun halaman pelanggan dengan React.js dan Next.js: halaman utama, daftar menu, dan alur pemesanan kopi.",
      "Membuat panel admin untuk memantau pesanan lewat ringkasan total pesanan, pesanan baru, pesanan yang sedang diproses, dan pendapatan.",
      "Menambahkan penyaring status dan pengubah status pada tiap pesanan, supaya pengelola bisa menindaklanjuti pesanan langsung dari panel.",
      "Merancang dan menghubungkan database PostgreSQL di Neon untuk menyimpan data aplikasi, termasuk pesanan.",
      "Menambahkan fitur chat AI ke dalam website.",
      "Men-deploy aplikasi ke Vercel sehingga bisa dibuka publik lewat link.",
    ],
    link: "https://coffee-nangkau.vercel.app", linkLabel: "Buka website",
  },
];

export const skills = [
  ["Pengembangan front-end", "React.js, desain web responsif, integrasi API, uji lintas browser, debugging"],
  ["Desain UI/UX dan aplikasi", "Figma, Canva, dasar Adobe Family, wireframing, prototipe interaktif, riset pengguna"],
  ["Bahasa pemrograman", "HTML5, CSS3, JavaScript, Python"],
  ["AI dan aplikasi web", "Streamlit, transfer learning, EfficientNetB0"],
  ["Database dan jaringan", "Advanced Database Systems, Cisco Packet Tracer, dasar jaringan"],
  ["Sistem operasi", "Linux CLI, dasar manajemen layanan, dasar firewall dan keamanan"],
  ["Kompetensi inti", "Pemecahan masalah, kerja sama tim, manajemen waktu, ketelitian"],
];

export const education = { school: "Universitas Gunadarma", degree: "S1 Informatika", period: "2022 - 2026", gpa: "IPK 3,93 / 4,00" };

export const training = [
  ["P2MW Series 6 UI/UX Design Workshop", "Sep 2024", "Proses desain UI/UX, prototipe, riset pengguna, dan analisis UI/UX platform Shopee."],
  ["LePKom Technical Training", "Okt 2022 - Agu 2025", "Dasar jaringan dan OS server, konfigurasi router dan switch Cisco, routing, VLAN, Linux CLI, dan dasar keamanan."],
  ["Building Website Using HTML5", "2026", "Praktik membuat website dasar dengan HTML dan CSS."],
  ["Advanced Database Systems (BNSP)", "2026", "Sertifikasi kompetensi basis data lanjut."],
];

export const languages = ["Indonesia", "Inggris"];

// Tech stack mengikuti bagian Technical Skills di CV. Ikon: /public/tech/<nama-file>.svg
export const techStack = [
  { title: "Programming & Front-End", icon: "layout", items: [["HTML5", "html5"], ["CSS3", "css3"], ["JavaScript", "javascript"], ["Python", "python"], ["React.js", "react"], ["Next.js", "nextjs"], ["Tailwind CSS", "tailwindcss"], ["Responsive Web Design", "responsive"]] },
  { title: "UI/UX Design & AI Apps", icon: "pen", items: [["Figma", "figma"], ["Canva", "canva"], ["Adobe Family (Basic)", "adobe"], ["Wireframing", "wireframing"], ["Interactive Prototyping", "prototyping"], ["Streamlit", "streamlit"], ["Transfer Learning", "transfer-learning"], ["EfficientNetB0", "efficientnet"]] },
  { title: "Database, Network & OS", icon: "server", items: [["Advanced Database Systems", "database-adv"], ["PostgreSQL", "postgresql"], ["Cisco Packet Tracer", "packet-tracer"], ["Networking Fundamentals", "networking"], ["Linux CLI", "linux"], ["Basic Firewall & Security", "security"], ["Basic Service Management", "services"]] },
];
