# 🚀 Dev & Data Tools Suite | InfiniteNull, S.Kom

> **Platform Web Terintegrasi: 9 Tools Fungsional (Data Science, Backend RESTful API, Database SQL & Modern Web Utilities)**  
> *Portofolio teknis mandiri oleh **InfiniteNull, S.Kom** — Lulusan S1 Informatika Universitas Potensi Utama & Praktisi IT Serba Bisa.*

---

## 👨‍💻 Profil Pengembang

* **Nama / Handle:** InfiniteNull, S.Kom
* **Pendidikan:** S1 Informatika — Universitas Potensi Utama
* **Fokus Keahlian:** IT Support, Administrasi Jaringan, Keamanan Sistem (VAPT), Analisis Data (NLP/Python), & Full-Stack Web Development.
* **Sertifikasi Nasional:**
  * 📜 **Fundamental of Associate Network Administrator** (Komdigi RI, 2026)
  * 📜 **Junior Network Administrator** (BBPSDMP Kominfo Medan, 2023)
* **Pengalaman Lapangan & Kepemimpinan:**
  * **IT Support** @ *Bengkel Mobil Lian* (Hardware/Software, Troubleshooting, OS, LAN Maintenance).
  * **IT Researcher** @ *Yayasan Amal Bakti Abdi* (Evaluasi sistem & pengolahan data operasional).
  * **Ketua Tim Proyek SHUNA AI** @ *MSIB Batch 6 Kampus Merdeka di Skilvul* (Lulus Nilai 81.8 — Machine Learning & NLP).
  * **Kepemimpinan Organisasi** @ *HMPS Informatika* (Reaktivasi & tata kelola internal).
* **Security & Pentesting:** VAPT (Burp Suite, OWASP ZAP), OSINT, Linux Server & Nginx.

---

## 📌 Ringkasan Proyek & Arsitektur

Proyek ini menggabungkan **9 modul aplikasi fungsional** ke dalam satu portal antarmuka terpadu (*Unified Developer Suite*). Dibangun dengan pendekatan **Polyglot Architecture** untuk mendemonstrasikan keahlian pada 3 pilar utama:

1. 🐍 **Data Analytics & Automation (Python):** Pemrosesan dataset survei kepuasan dengan NLP Sentiment Analysis (Pandas, VADER) dan otomasi penarikan informasi berita (BeautifulSoup4).
2. 🟢 **Backend RESTful API & Relational Database (Node.js & SQLite):** Sistem autentikasi keamanan tinggi (Bcrypt, JWT) dan manajemen data CRUD (Inventaris Aset & Sirkulasi Perpustakaan).
3. ⚡ **Modern Client-Side Utilities (JavaScript ES6+ & Tailwind CSS):** Antarmuka responsif, kompresi gambar berbasis Canvas, kalkulasi kurs real-time, pengujian API, dan uji kecepatan ketik.

---

## 🛠️ Tech Stack & Bahasa Pemrograman

| Bahasa / Teknologi | Logo / Badges | Peran dalam Sistem |
|---|---|---|
| **Python** | `Python 3.10+` `Pandas` `VADER NLP` `BeautifulSoup4` `FastAPI` | Data Ingestion, Sentiment Scoring, Web Scraping |
| **Node.js** | `Express.js` `Bcrypt` `JSON Web Token` `Sharp` | Backend Service, Authentication, Image Processing |
| **SQL (SQLite)** | `SQLite3` `Relational Database` `Transactions` | Skema Tabel `users`, `products`, `books`, `borrowings` |
| **Frontend Web** | `JavaScript ES6+` `HTML5 Canvas` `Tailwind CSS` `Chart.js` | Single Page Application, Chart Analytics, Responsivitas |
| **Keamanan (Security)** | `Burp Suite` `OWASP ZAP` `VAPT` `OSINT` | Standar keamanan input, parameterized queries, token validation |

---

## 📂 Struktur Direktori (Clean Monorepo)

```text
portfolio-hub/
├── 📄 index.html                  # Halaman Utama Dashboard Portofolio
├── 🎨 styles.css                  # Custom styling & Dark Mode engine
├── ⚙️ app.js                      # Master Controller, Tool Registry, Modal Manager
├── 📁 js/                         # Modul Interaktif Setiap Tool
│   ├── ai-data-analyzer.js        # NLP Sentiment Analysis & Chart.js
│   ├── api-checker.js             # API Latency & Status Ping Checker
│   ├── auth-sandbox.js            # Simulasi Bcrypt & JWT Authorization
│   ├── currency-converter.js      # Real-time Currency Exchange & Offline Cache
│   ├── image-optimizer.js         # Canvas Image Compressor & WebP Converter
│   ├── inventory-sandbox.js       # CRUD Inventaris Barang & Low Stock Alert
│   ├── library-sandbox.js         # Transaksi Peminjaman Buku & Relasi SQL
│   ├── news-scraper.js            # Live HackerNews Feed Aggregator
│   ├── typing-test.js             # WPM & Accuracy Speed Test
│   └── code-snippets.js           # Database Source Code Inspector
├── 📁 python-modules/             # Source Code Python Asli
│   ├── analyzer.py                # Script Pandas & VADER Sentiment
│   ├── scraper.py                 # Script BeautifulSoup Web Scraping
│   └── requirements.txt           # Dependensi Python
├── 📁 backend-modules/            # Source Code Backend Node.js Asli
│   └── package.json               # Dependensi Express, SQLite, Sharp, Bcrypt, JWT
├── 📄 PANDUAN_WAWANCARA.md        # Panduan Teknis & Pertanyaan Wawancara Rekayasa
└── 📄 README.md                   # Dokumentasi Utama Proyek
```

---

## 🎯 Rincian 9 Tools Terintegrasi

| No | Nama Tool | Kategori | Fitur Utama |
|:---:|---|---|---|
| 1 | **AI Sentiment & Data Analyzer** | 🐍 Data & AI (Python) | Upload file CSV, deteksi otomatis kolom ulasan, klasifikasi sentimen positif/netral/negatif, dan grafik Chart.js. |
| 2 | **Tech News & Feeds Scraper** | 🐍 Data & AI (Python) | Ekstraksi otomatis artikel teknologi dan publikasi terkini dari platform berita publik. |
| 3 | **Auth & Security Service** | 🟢 Backend & SQL (Node.js) | Registrasi dengan enkripsi password Bcrypt (Salt 10), Login, penerbitan token JWT, dan proteksi rute. |
| 4 | **Inventory & Warehouse CRUD** | 🟢 Backend & SQL (Node.js) | Tambah barang, update stok, hapus barang, pencarian nama/kategori, dan indikator stok menipis. |
| 5 | **Library Management System** | 🟢 Backend & SQL (Node.js) | Katalog buku, validasi ketersediaan eksemplar, transaksi peminjaman dan pengembalian buku relasional. |
| 6 | **Image Optimizer & Converter** | ⚡ Utility (JavaScript) | Kompresi ukuran foto hingga 70%, resize lebar gambar proporsional, dan konversi ke WebP / PNG / JPG. |
| 7 | **API Health & Latency Checker** | ⚡ Utility (JavaScript) | Pengujian responsivitas endpoint REST API (GET, POST, PUT, DELETE), waktu latensi (ms), dan viewer response JSON. |
| 8 | **Real-Time Currency Calculator** | ⚡ Utility (JavaScript) | Konversi kurs mata uang dunia (USD, IDR, EUR, SGD, JPY, dll) dengan integrasi feed Open Exchange. |
| 9 | **Typing Speed & Accuracy Test** | ⚡ Utility (JavaScript) | Uji kecepatan ketik dengan metrik standar WPM (Words Per Minute), persentase akurasi, dan timer 60 detik. |

---

## 🚀 Cara Menjalankan Secara Lokal

### 1. Menjalankan Website Portofolio (Frontend):
Buka file `index.html` langsung di browser Chrome/Edge, atau menggunakan Live Server di VS Code.

### 2. Menjalankan Modul Python:
```bash
cd python-modules
pip install -r requirements.txt
python analyzer.py
```

### 3. Menjalankan Modul Backend Node.js:
```bash
cd backend-modules
npm install
npm start
```

---

## 🌐 Live Demo & Deployment

Website resmi aktif dan live di GitHub Pages:  
👉 **[https://infinitenull.github.io/](https://infinitenull.github.io/)**

---

## 📬 Kontak & Tautan
* **GitHub:** [https://github.com/InfiniteNull](https://github.com/InfiniteNull)
* **Kandidat:** InfiniteNull, S.Kom (S1 Informatika — Universitas Potensi Utama)
