# 🎓 BUKU SAKU & PANDUAN WAWANCARA TEKNIS PENGEMBANG
### *Panduan Menjawab Pertanyaan Arsitektur untuk Portofolio Dev & Data Tools Suite*
**Kandidat: InfiniteNull, S.Kom (Universitas Potensi Utama)**

Dokumen ini disiapkan khusus agar Anda dapat menjawab setiap pertanyaan wawancara teknis dari recruiter, hiring manager, atau klien dengan percaya diri, sistematis, dan profesional berdasarkan pengalaman nyata Anda.

---

## 📌 1. Pertanyaan Pengantar: Penjelasan Diri & Proyek

### Q: "Bisa ceritakan latar belakang dan apa yang Anda bangun pada portofolio ini?"
> **Jawaban:**  
> *"Selamat pagi/siang. Saya adalah lulusan **S1 Informatika (S.Kom) dari Universitas Potensi Utama** dan seorang Praktisi IT serba bisa dengan fokus di bidang **IT Support, Administrasi Jaringan, Keamanan Sistem (VAPT), serta Analisis Data & Rekayasa Web**.*  
> *Saya memiliki pengalaman lapangan nyata sebagai **IT Support di Bengkel Mobil Lian** dalam pemeliharaan hardware, troubleshooting laptop/PC, dan maintenance LAN harian, serta sebagai **IT Researcher di Yayasan Amal Bakti Abdi** dalam mengevaluasi kebutuhan sistem operasional.*  
> *Di samping itu, kompetensi jaringan saya tersertifikasi secara nasional (**Associate Network Administrator Komdigi 2026** dan **Junior Network Administrator Kominfo 2023**), serta memiliki kepemimpinan teruji sebagai **Ketua Tim Proyek SHUNA AI di program MSIB Batch 6 Skilvul (Lulus Nilai 81.8)**.*  
> *Seluruh keahlian teknis ini saya integrasikan secara nyata ke dalam platform **Dev & Data Tools Suite** yang menggabungkan 9 modul fungsional open-source berbasis Python, Node.js, SQL, dan JavaScript modern."*

---

## 🐍 2. Pertanyaan Mengenai Python & AI / Data

### Q: "Bagaimana implementasi Python dan NLP pada proyek ini dan pengalaman Anda di SHUNA AI?"
> **Jawaban:**  
> *"Pada program MSIB Batch 6 Skilvul, saya memimpin tim Proyek SHUNA AI merancang aplikasi pelaporan cerdas berbasis Machine Learning & NLP.*  
> *Pengalaman tersebut saya terapkan di modul **AI Data Analyzer** pada website ini:*  
> *1. Menggunakan **Pandas** untuk membaca dan memanipulasi dataset ulasan/survei secara efisien.*  
> *2. Menerapkan algoritma **VADER Sentiment Analysis (NLP)** untuk menghitung nilai kepuasan (compound polarity score) dari teks ulasan pengguna secara otomatis.*  
> *3. Menghasilkan visualisasi statistik interaktif (Chart.js) untuk pengambilan keputusan bisnis berbasis data empiris.*  
> *Pada modul **News Scraper**, saya menggunakan **BeautifulSoup4** dan **Requests** untuk mengotomasi penarikan informasi berita teknologi dari web secara terstruktur."*

---

## 🟢 3. Pertanyaan Mengenai Backend, Keamanan (VAPT), & Database

### Q: "Bagaimana Anda menerapkan prinsip keamanan sistem (VAPT) dan arsitektur database?"
> **Jawaban:**  
> *"Berdasarkan pemahaman saya dalam Vulnerability Assessment & Penetration Testing (VAPT) menggunakan tools seperti **Burp Suite** dan **OWASP ZAP**:*  
> *1. **Autentikasi & Password:** Password pengguna tidak pernah disimpan dalam plain text, melainkan di-hash dengan **Bcrypt (10 salt rounds)**, serta sesi dikelola menggunakan **JWT (JSON Web Token)** yang stateless.*  
> *2. **SQL Injection Prevention:** Seluruh query ke basis data SQLite menggunakan parameterized queries (`?`) untuk mencegah injeksi kode berbahaya.*  
> *3. **Integritas Transaksi:** Pada sistem perpustakaan dan inventaris, transaksi peminjaman dirancang atomik untuk memastikan konsistensi pengurangan stok dan pencatatan riwayat."*

---

## 🌐 4. Pertanyaan Mengenai Jaringan & Infrastruktur

### Q: "Bagaimana sertifikasi Komdigi & Kominfo Anda mendukung peran software development?"
> **Jawaban:**  
> *"Sertifikasi **Associate Network Administrator (Komdigi RI 2026)** dan **Junior Network Administrator (Kominfo 2023)** memberi saya fondasi mendalam tentang bagaimana aplikasi beroperasi di atas infrastruktur jaringan nyata:*  
> *Perancangan skema IP Addressing, konfigurasi routing, pengelolaan server Linux dan web server Nginx, serta pemantauan latensi jaringan (seperti yang saya implementasikan pada tool **API Health & Latency Checker**).*  
> *Kombinasi ini membuat saya memahami full-cycle: mulai dari fisik jaringan, konfigurasi server, keamanan, hingga lapisan aplikasi pengguna."*

---

## 💡 5. Tips Sikap & Komunikasi Saat Wawancara:
1. **Percaya Diri & Terstruktur:** Ceritakan pengalaman nyata di Bengkel Mobil Lian, Yayasan Amal Bakti Abdi, dan proyek SHUNA AI dengan antusias.
2. **Tunjukkan Live Demo:** Buka website Anda di [https://infinitenull.github.io/](https://infinitenull.github.io/), klik tombol **Tentang Pengembang** dan buka tab **Source Code Asli** di setiap tool.
3. **Tekankan Karakter Serba Bisa (Versatile):** Perusahaan sangat menyukai kandidat yang tidak hanya bisa koding web, tapi juga paham troubleshooting PC, jaringan LAN, server Linux, keamanan VAPT, dan analisis data.

**Semoga sukses dalam pengembangan karier profesional Anda! 🚀**
