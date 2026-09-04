# 🚀 Dev & Data Tools Suite | Personal Developer Portfolio

> **Platform Web Terintegrasi: 9 Tools Fungsional (Data Science, Backend RESTful API, Database SQL & Modern Web Utilities)**  
> *Dibuat sebagai portofolio teknis mandiri untuk mendemonstrasikan kapabilitas rekayasa perangkat lunak full-stack dan pengolahan data modern.*

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
Anda cukup membuka file `index.html` langsung di browser Chrome/Edge, atau menggunakan Live Server di VS Code.

### 2. Menjalankan Modul Python (Opsional untuk Backend Dev):
```bash
cd python-modules
pip install -r requirements.txt
python analyzer.py
```

### 3. Menjalankan Modul Backend Node.js (Opsional):
```bash
cd backend-modules
npm install
npm start
```

---

## 🌐 Cara Upload & Deploy ke GitHub Pages (100% Gratis & Instan)

1. Buat repositori baru di akun GitHub Anda (misal bernama `dev-portfolio-suite`).
2. Buka folder `portfolio-hub/` di terminal, lalu jalankan:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit dev portfolio & tools suite"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/dev-portfolio-suite.git
   git push -u origin main
   ```
3. Buka repositori di GitHub -> Menu **Settings** -> **Pages** -> Pada bagian *Branch*, pilih `main` dan klik **Save**.
4. Website Anda langsung online di `https://USERNAME-ANDA.github.io/dev-portfolio-suite/`!

---

## 👨‍💻 Profil Pembuat
* **Fokus:** Full-Stack Web Engineering & Data Analytics
* **Spesialisasi:** JavaScript (ES6+ / Node.js), Python (Pandas / NLP / Scraping), SQL & Relational Databases
