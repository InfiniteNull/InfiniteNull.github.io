# Web Tools & Data Suite

> **Platform Web Terintegrasi: 9 Tools Fungsional (Data Analytics, Backend REST API, Database SQL & Web Utilities)**  
> *Portofolio oleh **Rizki Ananda, S.Kom** ([@InfiniteNull](https://github.com/InfiniteNull)) — S1 Informatika Universitas Potensi Utama, Praktisi IT, Network Administrator & VAPT.*

---

## Profil

* **Nama:** Rizki Ananda, S.Kom
* **GitHub:** [@InfiniteNull](https://github.com/InfiniteNull)
* **Pendidikan:** S1 Informatika — Universitas Potensi Utama
* **Spesialisasi:** IT Support, Network Administration, Keamanan Sistem (VAPT), Data Analytics & Web Development.
* **Sertifikasi:**
  * **Fundamental of Associate Network Administrator** (Komdigi RI, 2026)
  * **Junior Network Administrator** (BBPSDMP Kominfo Medan, 2023)
* **Pengalaman Kerja:**
  * **IT Researcher** — *ADZKIA KEDINASAN PUSAT* (Nov 2024 - Jun 2025 | Freelance | Medan)  
    *Merancang infrastruktur Nginx Media Server (Linux VM), pengujian 4 protokol streaming (RTMP, HLS, RTSP, HTTP), Network Security & Vulnerability Assessment (VAPT), serta eksplorasi prototipe Face Recognition & Chatbot.*
  * **IT Support** — *PT Bank Sinarmas, Tbk* (Des 2023 | Freelance / Vendor Outsourcing | KC Medan Mangkubumi)  
    *Proyek PC Deployment: perakitan desktop, instalasi OS, backup & migrasi data profil user secara aman, cable management, serta konfigurasi peripheral hingga terhubung ke domain internal bank.*
  * **Ketua Tim Proyek SHUNA AI** — *MSIB Batch 6 Kampus Merdeka di Skilvul* (Nilai: 81.8 — Machine Learning & NLP).
  * **Kepemimpinan Organisasi** — *HMPS Informatika Universitas Potensi Utama* (Reaktivasi & tata kelola internal).
* **Tools & Keahlian Teknis:** Burp Suite, OWASP ZAP, OSINT, Linux & Nginx, Python, Node.js, SQLite, JavaScript.

---

## Arsitektur & Gambaran Proyek

Proyek ini menggabungkan **9 modul aplikasi fungsional** ke dalam satu portal antarmuka terpadu (*Unified Suite*). Dibangun untuk mendemonstrasikan keahlian teknis pada:

1. **Data Analytics & Automation (Python):** Pemrosesan dataset dengan NLP Sentiment Analysis (Pandas, VADER) dan otomasi penarikan informasi (BeautifulSoup4).
2. **Backend RESTful API & Relational Database (Node.js & SQLite):** Sistem autentikasi (Bcrypt, JWT) dan manajemen data CRUD (Inventaris Aset & Sirkulasi Perpustakaan).
3. **Client-Side Utilities (JavaScript ES6+ & Tailwind CSS):** Antarmuka responsif, kompresi gambar berbasis Canvas, kalkulasi kurs real-time, pengujian API, dan uji kecepatan ketik.

---

## Tech Stack

| Bahasa / Teknologi | Komponen / Library | Peran dalam Sistem |
|---|---|---|
| **Python** | `Python 3.10+`, `Pandas`, `VADER NLP`, `BeautifulSoup4`, `FastAPI` | Data Ingestion, Sentiment Scoring, Web Scraping |
| **Node.js** | `Express.js`, `Bcrypt`, `JSON Web Token`, `Sharp` | Backend Service, Authentication, Image Processing |
| **SQL (SQLite)** | `SQLite3`, `Relational Database`, `Transactions` | Skema Tabel `users`, `products`, `books`, `borrowings` |
| **Frontend Web** | `JavaScript ES6+`, `HTML5 Canvas`, `Tailwind CSS`, `Chart.js` | Single Page Application, Chart Analytics, Responsivitas |
| **Infrastruktur & Keamanan** | `Nginx Media Server`, `Linux VM`, `Burp Suite`, `OWASP ZAP`, `VAPT` | Streaming Protocols, Vulnerability Assessment, Parameterized SQL Security |

---

## Struktur Direktori

```text
portfolio-hub/
├── index.html                  # Halaman Utama Dashboard Portofolio
├── styles.css                  # Custom styling & Dark Mode
├── app.js                      # Master Controller, Tool Registry, Modal Manager
├── js/                         # Modul Interaktif Setiap Tool
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
├── python-modules/             # Source Code Python
│   ├── analyzer.py                # Script Pandas & VADER Sentiment
│   ├── scraper.py                 # Script BeautifulSoup Web Scraping
│   └── requirements.txt           # Dependensi Python
├── backend-modules/            # Source Code Backend Node.js
│   └── package.json               # Dependensi Express, SQLite, Sharp, Bcrypt, JWT
├── PANDUAN_WAWANCARA.md        # Panduan Teknis & Pertanyaan Wawancara Rekayasa
└── README.md                   # Dokumentasi Utama Proyek
```

---

## Rincian 9 Tools Terintegrasi

| No | Nama Tool | Kategori | Fitur Utama |
|:---:|---|---|---|
| 1 | **AI Sentiment & Data Analyzer** | Data & AI (Python) | Upload file CSV, deteksi otomatis kolom ulasan, klasifikasi sentimen positif/netral/negatif, dan grafik Chart.js. |
| 2 | **Tech News & Feeds Scraper** | Data & AI (Python) | Ekstraksi otomatis artikel teknologi dan publikasi terkini dari platform berita publik. |
| 3 | **Auth & Security Service** | Backend & SQL (Node.js) | Registrasi dengan enkripsi password Bcrypt (Salt 10), Login, penerbitan token JWT, dan proteksi rute. |
| 4 | **Inventory & Warehouse CRUD** | Backend & SQL (Node.js) | Tambah barang, update stok, hapus barang, pencarian nama/kategori, dan indikator stok menipis. |
| 5 | **Library Management System** | Backend & SQL (Node.js) | Katalog buku, validasi ketersediaan eksemplar, transaksi peminjaman dan pengembalian buku relasional. |
| 6 | **Image Optimizer & Converter** | Utility (JavaScript) | Kompresi ukuran foto hingga 70%, resize lebar gambar proporsional, dan konversi ke WebP / PNG / JPG. |
| 7 | **API Health & Latency Checker** | Utility (JavaScript) | Pengujian responsivitas endpoint REST API (GET, POST, PUT, DELETE), waktu latensi (ms), dan viewer response JSON. |
| 8 | **Real-Time Currency Calculator** | Utility (JavaScript) | Konversi kurs mata uang dunia (USD, IDR, EUR, SGD, JPY, dll) dengan integrasi feed Open Exchange. |
| 9 | **Typing Speed & Accuracy Test** | Utility (JavaScript) | Uji kecepatan ketik dengan metrik standar WPM (Words Per Minute), persentase akurasi, dan timer 60 detik. |

---

## Live Demo & Deployment

Website resmi live di GitHub Pages:  
**[https://infinitenull.github.io/](https://infinitenull.github.io/)**

---

## Kontak & Tautan
* **Nama:** Rizki Ananda, S.Kom
* **GitHub:** [https://github.com/InfiniteNull](https://github.com/InfiniteNull)
* **Almamater:** S1 Informatika — Universitas Potensi Utama

