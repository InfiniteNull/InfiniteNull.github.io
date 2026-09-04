# 🎓 BUKU SAKU & PANDUAN WAWANCARA TEKNIS PENGEMBANG
### *Panduan Menjawab Pertanyaan Arsitektur untuk Portofolio Dev & Data Tools Suite*

Dokumen ini disiapkan khusus agar Anda dapat menjawab setiap pertanyaan wawancara teknis dari recruiter, hiring manager, atau klien dengan percaya diri, sistematis, dan profesional.

---

## 📌 1. Pertanyaan Pengantar: Penjelasan Proyek

### Q: "Bisa ceritakan apa yang Anda bangun pada website portofolio ini?"
> **Jawaban:**  
> *"Selamat pagi/siang. Website ini adalah **Dev & Data Tools Suite**, sebuah platform web mandiri terintegrasi yang menggabungkan **9 tools fungsional**.*  
> *Proyek ini saya rancang dengan **arsitektur multi-bahasa (Polyglot Engineering)** untuk menunjukkan kompetensi di 3 aspek fundamental:*  
> 1. ***Data Analytics & Automation (Python):*** *Analisis sentimen ulasan pengguna menggunakan Pandas & NLP VADER, serta web scraping berita terkini dengan BeautifulSoup.*  
> 2. ***Backend & Relational Database (Node.js & SQLite):*** *Autentikasi aman menggunakan Bcrypt dan JWT, serta sistem CRUD inventaris barang dan sirkulasi buku perpustakaan.*  
> 3. ***Modern Frontend Web (JavaScript & Tailwind CSS):*** *Antarmuka yang responsif, cepat, memiliki mode gelap/terang, dan tools utilitas seperti kompresi gambar dan konversi mata uang.*  
> *Semua modul dibuat bersih, modular, dan siap digunakan secara nyata."*

---

## 🐍 2. Pertanyaan Mengenai Python & AI / Data

### Q: "Mengapa Anda menggunakan Python dan bagaimana cara kerja modul AI Data Analyzer?"
> **Jawaban:**  
> *"Python adalah standar industri untuk pengolahan data. Pada modul AI Data Analyzer:*  
> *1. Pengguna dapat mengunggah file data survei/ulasan (CSV/Excel).*  
> *2. Script Python menggunakan **Pandas** untuk membaca data ke dalam memori secara efisien.*  
> *3. Kami menerapkan algoritma **VADER Sentiment Analysis (NLP)** untuk menghitung nilai kepuasan (compound polarity score) dari setiap teks feedback.*  
> *4. Hasilnya dikelompokkan menjadi sentimen Positif, Netral, atau Negatif dan divisualisasikan dalam bentuk grafik diagram lingkaran.*  
> *Sistem ini dapat diaplikasikan langsung pada platform SaaS, e-commerce, atau instansi publik untuk menganalisis kepuasan pelanggan secara otomatis."*

---

## 🟢 3. Pertanyaan Mengenai Backend, Keamanan, & Database (Node.js & SQL)

### Q: "Bagaimana Anda mengelola autentikasi dan keamanan data pengguna?"
> **Jawaban:**  
> *"Untuk backend autentikasi, saya menggunakan **Node.js Express** dengan prinsip keamanan modern:*  
> *1. Password pengguna **tidak pernah disimpan dalam bentuk teks polos (plain text)**, melainkan di-hash menggunakan algoritma **Bcrypt** dengan salt 10 rounds.*  
> *2. Untuk sesi login, server menerbitkan **JSON Web Token (JWT)** yang berisi payload terenkripsi sehingga verifikasi akses ke rute terproteksi bersifat stateless dan aman.*  
> *3. Pada database SQLite, setiap kueri menggunakan **parameterized queries (`?`)** untuk mencegah celah keamanan **SQL Injection**."*

### Q: "Bagaimana Anda mengimplementasikan transaksi di database perpustakaan?"
> **Jawaban:**  
> *"Pada modul perpustakaan, terdapat transaksi peminjaman yang melibatkan relasi antar tabel:*  
> *Ketika anggota meminjam buku, sistem menjalankan transaksi atomik: stok eksemplar di tabel `books` dikurangi 1, dan record baru dicatat di tabel `borrowings`. Jika stok buku 0, transaksi otomatis dibatalkan untuk mencegah anomali data (race condition)."*

---

## ⚡ 4. Pertanyaan Mengenai Frontend & Desain UI/UX

### Q: "Mengapa Anda memilih Tailwind CSS dan bagaimana optimasi performa gambarnya?"
> **Jawaban:**  
> *"Saya menggunakan Tailwind CSS karena pendekatan utility-first memungkinkan pembangunan antarmuka yang sangat konsisten, bersih, dan fleksibel baik di layar smartphone maupun desktop tanpa beban file CSS yang besar.*  
> *Untuk optimasi gambar, kami menggunakan teknologi **HTML5 Canvas** untuk mengompresi ukuran file hingga 70% dan mengonversi format foto ke format modern **WebP**, sehingga menghemat bandwidth server dan mempercepat waktu muat halaman."*

---

## 💡 5. Tips Sikap & Komunikasi Saat Wawancara:
1. **Tenang & Percaya Diri:** Buka website ini langsung di layar Anda. Tunjukkan betapa cepatnya navigasi antar tool, coba fitur upload CSV ulasan, dan buka tab **Source Code Asli** agar penguji melihat potongan kode Python, SQL, dan Node.js yang tertata rapi.
2. **Fokus pada Problem Solving:** Jelaskan bahwa Anda membangun tools ini bukan hanya sekadar latihan, melainkan untuk menyelesaikan masalah nyata (kompresi aset gambar, monitoring latensi API, kalkulasi valuta asing, dan automasi data).

**Semoga sukses dalam pengembangan karier profesional sebagai Software Developer! 🚀**
