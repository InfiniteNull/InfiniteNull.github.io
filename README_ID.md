# Web Tools & Engineering Suite

<div align="center">

[![Switch Language: English](https://img.shields.io/badge/Switch%20Language-English%20Version%20%F0%9F%87%AC%F0%9F%87%A7-334155?style=for-the-badge&logo=translate&logoColor=white)](README.md)
[![Bahasa: Indonesia](https://img.shields.io/badge/Bahasa-Bahasa%20Indonesia%20(Aktif)-0284c7?style=for-the-badge&logo=googletranslate&logoColor=white)](README_ID.md)
[![Live Demo Platform](https://img.shields.io/badge/Live%20Demo-infinitenull.github.io-059669?style=for-the-badge&logo=githubpages&logoColor=white)](https://infinitenull.github.io/)

</div>

> **Platform Web Terintegrasi: 29 Tools Rekayasa Perangkat Lunak, Data Wrangling & Infrastruktur IT**  
> *Dikembangkan oleh **Rizki Ananda, S.Kom** ([@InfiniteNull](https://github.com/InfiniteNull)) — Lulusan S1 Informatika Universitas Potensi Utama, Praktisi IT Support, Network Administrator & Keamanan Sistem.*

---

## Profil Pengembang

* **Nama:** Rizki Ananda, S.Kom
* **GitHub:** [@InfiniteNull](https://github.com/InfiniteNull)
* **Pendidikan:** S1 Informatika — Universitas Potensi Utama
* **Fokus Spesialisasi:** IT Support, Network Administration, Keamanan Sistem (VAPT), Data Analytics & Full-Stack Web Development.
* **Sertifikasi Nasional:**
  * **Associate Network Administrator** (Komdigi RI, 2026)
  * **Junior Network Administrator** (BBPSDMP Kominfo Medan, 2023)
* **Pengalaman Kerja & Proyek:**
  * **IT Researcher** — *ADZKIA KEDINASAN PUSAT* (Nov 2024 - Jun 2025 | Freelance | Medan)  
    *Merancang, mengonfigurasi, dan menguji infrastruktur Nginx Media Server (Linux VM), melakukan benchmark 4 protokol streaming (RTMP, HLS, RTSP, HTTP), audit keamanan jaringan (VAPT), pembuatan aturan firewall, serta dokumentasi arsitektur server.*
  * **IT Support** — *PT Bank Sinarmas, Tbk* (Des 2023 | Freelance / Vendor Outsourcing | KC Medan Mangkubumi)  
    *Melaksanakan proyek PC Deployment: perakitan desktop, instalasi OS, backup & migrasi profil user aman, cable management, hingga konfigurasi peripheral terhubung ke domain internal bank.*
  * **Ketua Tim Proyek SHUNA AI** — *MSIB Batch 6 Kampus Merdeka di Skilvul* (Nilai: 81.8 — Pipeline klasifikasi teks NLP & Python data workflow).
  * **Kepemimpinan Organisasi** — *HMPS Informatika Universitas Potensi Utama* (Reaktivasi & tata kelola internal).
* **Tools & Keahlian Teknis:** Burp Suite, OWASP ZAP, OSINT, Linux VM, Nginx, Python (Pandas, NumPy), Node.js, SQLite, JavaScript ES6+, Tailwind CSS.

---

## Gambaran & Arsitektur Sistem

Proyek ini menggabungkan **29 tools utilitas fungsional** ke dalam satu portal antarmuka terpadu (*Unified Suite*). Dibangun dengan arsitektur modular yang terbagi ke dalam **4 Pilar Utama**:

1. **Jaringan & Server (5 Tools):** Kalkulator subnet IPv4 & VLSM, generator command firewall (UFW / iptables / Mikrotik), estimasi durasi transfer bandwidth, kalkulasi bitrate streaming Nginx (RTMP/HLS), dan visualizer jadwal crontab Linux.
2. **Keamanan Sistem (6 Tools):** Simulasi autentikasi Bcrypt & JWT, analisis HTTP security headers (CSP/HSTS/CORS), generator hash kriptografis (SHA-256/SHA-512/MD5), kalkulator entropi password, encoder payload multi-format, dan debugger tanda tangan JWT.
3. **Data & Backend (9 Tools):** 
   - **Data Wrangling & Imputation Studio:** Pembersihan data mentah, deduplikasi, imputasi missing values (mean/median/mode), dan standardisasi tanggal/teks.
   - **Dataset Integration & Quality Control (QC):** Pengujian skor kesehatan data, deteksi outlier Tukey IQR, dan simulasi table join (Inner/Left/Right/Full).
   - **Laporan Berkala & KPI Monitoring Dashboard:** Rekapitulasi laporan operasional harian/mingguan/bulanan, variance analysis, dan tracking achievement rate %.
   - **Spreadsheet Formula & Data Reshaper:** Simulasi VLOOKUP/XLOOKUP, matriks Pivot Table GroupBy, dan konversi ke SQL/Pandas.
   - Analisis sentimen NLP VADER, manajemen inventaris gudang SQLite CRUD, sirkulasi peminjaman buku relasional, konverter batch JSON ke SQL `INSERT`, dan parser access log Nginx.
4. **Utilitas & Hardware (9 Tools):** Pengujian latensi REST API, kompresi foto Canvas WebP, kalkulator kurs valuta asing real-time, uji kecepatan ketik (WPM), kalkulator kapasitas RAID storage (RAID 0/1/5/6/10), kalkulator kebutuhan watt PSU PC Deployment, sandbox Regex tester, dan Markdown live preview editor.

---

## Struktur Direktori

```text
portfolio-hub/
├── index.html                  # Halaman Utama Dashboard & Kontainer Modal
├── styles.css                  # Custom styling, animasi & dark/light mode
├── app.js                      # Master Controller, Registry 29 Tools & i18n
├── js/                         # Modul JavaScript Setiap Tool
│   ├── data-cleaner-studio.js     # Studio Data Wrangling & Imputasi
│   ├── data-qc-inspector.js       # Quality Control Audit & Table Joiner
│   ├── kpi-monitoring-dashboard.js# Dashboard Laporan Berkala & Tracking KPI
│   ├── spreadsheet-formula-engine.js# Simulator XLOOKUP & Pivot GroupBy
│   ├── subnet-calculator.js       # Engine Subnetting IPv4 / CIDR / VLSM
│   ├── firewall-generator.js      # Direktori Port & Generator Rule Firewall
│   ├── bandwidth-estimator.js     # Estimasi Durasi Transfer & Throughput Data
│   ├── streaming-calculator.js    # Kalkulator Bitrate RTMP/HLS & Kapasitas Disk
│   ├── cron-builder.js            # Generator Jadwal Crontab Linux
│   ├── security-headers.js        # Audit HTTP Security Headers Standar OWASP
│   ├── crypto-hash.js             # Generator & Verifier SHA-256 / SHA-512 / MD5
│   ├── password-entropy.js        # Entropi Password & Estimasi Waktu Retak GPU
│   ├── payload-encoder.js         # Encoder / Decoder Base64, Hex, URL, Unicode
│   ├── jwt-debugger.js            # Inspector Claims & Verifier Signature JWT
│   ├── ai-data-analyzer.js        # Analisis Sentimen NLP & Grafik Chart.js
│   ├── inventory-sandbox.js       # CRUD Aset & Simulasi SQLite Database
│   ├── library-sandbox.js         # Transaksi Peminjaman Buku Relasional SQL
│   ├── json-sql-converter.js      # Generator JSON ke SQL INSERT & Skema
│   ├── log-analyzer.js            # Parser Regex Log Nginx & Top IP Aggregator
│   ├── news-scraper.js            # Scraper Berita Teknologi & Feed Live
│   ├── api-checker.js             # Pengujian Latensi & Status Endpoint API
│   ├── image-optimizer.js         # Kompresi Gambar Canvas & WebP Converter
│   ├── currency-converter.js      # Kalkulator Kurs Mata Uang & Cache Offline
│   ├── typing-test.js             # Uji Kecepatan Ketik WPM & Akurasi
│   ├── raid-calculator.js         # Kalkulator Kapasitas & Redundansi RAID
│   ├── psu-calculator.js          # Estimasi Konsumsi Daya Listrik PSU PC
│   ├── regex-tester.js            # Sandbox Uji Regular Expression Interaktif
│   ├── markdown-preview.js        # Editor Markdown ke HTML Live Render
│   └── code-snippets.js           # Database Source Code Asli Inspector
├── python-modules/             # Source Code Python Asli
│   ├── analyzer.py                # Script Pandas & VADER Sentiment
│   ├── scraper.py                 # Script BeautifulSoup Web Scraping
│   └── requirements.txt           # Dependensi Python
├── backend-modules/            # Source Code Backend Node.js Asli
│   └── package.json               # Dependensi Express, SQLite, Bcrypt, JWT
├── PANDUAN_WAWANCARA.md        # Panduan Pertanyaan Wawancara Rekayasa
├── README_ID.md                # Dokumentasi Versi Bahasa Indonesia
└── README.md                   # Dokumentasi Versi Bahasa Inggris
```

---

## Rincian 29 Tools Terintegrasi

| No | Nama Tool | Kategori | Fitur & Fungsi Utama |
|:---:|---|---|---|
| 1 | **IP Subnetting & VLSM Calculator** | Jaringan & Server | Menghitung Network ID, Broadcast, Subnet Mask, Host Range, dan biner. |
| 2 | **Port Directory & Firewall Rules** | Jaringan & Server | Direktori port dan generator command firewall Linux UFW, iptables, Mikrotik. |
| 3 | **Bandwidth & Data Transfer Estimator** | Jaringan & Server | Estimasi durasi backup data dan migrasi server dengan efisiensi overhead. |
| 4 | **Streaming Bitrate & Storage** | Jaringan & Server | Kalkulasi bandwidth egress dan storage rekaman RTMP, HLS, RTSP Nginx. |
| 5 | **Cron Task Scheduler Builder** | Jaringan & Server | Generator crontab 5-field visual dengan simulasi 5 jadwal eksekusi mendatang. |
| 6 | **Auth & Security Service** | Keamanan Sistem | Registrasi user, hashing Bcrypt (Salt 10), token JWT, dan SQLite. |
| 7 | **Security Headers Analyzer** | Keamanan Sistem | Audit header CSP, HSTS, X-Frame-Options, dan penilaian grade (A+ sampai F). |
| 8 | **Crypto Hash & Integrity Verifier** | Keamanan Sistem | Generator hash SHA-256, SHA-512, MD5, HMAC dan pencocokan integritas file. |
| 9 | **Password Entropy & Brute-Force** | Keamanan Sistem | Perhitungan entropi bit, kebijakan password, dan waktu cracking CPU vs GPU. |
| 10 | **Security Payload Encoder / Decoder** | Keamanan Sistem | Konversi format Base64, Hexadecimal, URL-Encode, HTML Entities, dan Unicode. |
| 11 | **JWT Inspector & Claims Debugger** | Keamanan Sistem | Dekonstruksi Header, Payload claims, expiry, dan verifikasi HMACSHA256. |
| 12 | **NLP Sentiment & Data Analyzer** | Data & Backend | Upload CSV, deteksi ulasan, skor NLP VADER, dan grafik Chart.js. |
| 13 | **Inventory & Warehouse CRUD** | Data & Backend | Manajemen inventaris barang dengan RESTful API dan notifikasi stok menipis. |
| 14 | **Library Management System** | Data & Backend | Katalog buku dan transaksi peminjaman dengan integritas ACID SQL. |
| 15 | **JSON to SQL / CSV Converter** | Data & Backend | Konversi JSON ke perintah `CREATE TABLE`, batch `INSERT`, dan CSV. |
| 16 | **Nginx Access Log Analyzer** | Data & Backend | Parsing access log server untuk statistik kode 2xx/4xx/5xx dan top IP pengunjung. |
| 17 | **Tabular Data Cleaner & Imputation Studio** | Data & Backend | Pembersihan data mentah, deduplikasi, imputasi missing values, dan export script Pandas. |
| 18 | **Dataset Integration & Quality Control (QC)** | Data & Backend | Audit skor kesehatan dataset, deteksi outlier Tukey IQR, dan simulasi table join. |
| 19 | **Laporan Berkala & KPI Monitoring Dashboard**| Data & Backend | Evaluasi laporan harian/mingguan/bulanan, tracking capaian target vs aktual. |
| 20 | **Spreadsheet Formula Simulator & Data Reshaper**| Data & Backend | Simulasi XLOOKUP/VLOOKUP, matriks Pivot Table GroupBy, dan konversi ke SQL/Pandas. |
| 21 | **Tech News & Feeds Scraper** | Utilitas & Hardware | Ekstraksi otomatis artikel teknologi dan headline berita terkini. |
| 22 | **API Health & Latency Checker** | Utilitas & Hardware | Pengujian endpoint REST API dan pengukuran waktu latensi RTT (ms). |
| 23 | **Image Optimizer & Converter** | Utilitas & Hardware | Kompresi gambar Canvas dan konversi WebP/JPG menghemat hingga 70% ukuran. |
| 24 | **Real-Time Currency Calculator** | Utilitas & Hardware | Konversi kurs mata uang dunia live dengan cache offline LocalStorage. |
| 25 | **Typing Speed & Accuracy Test** | Utilitas & Hardware | Uji kecepatan ketik dengan metrik WPM dan akurasi dengan timer 60 detik. |
| 26 | **RAID Storage & Capacity Calculator** | Utilitas & Hardware | Kalkulasi kapasitas usable, parity, dan fault tolerance RAID 0, 1, 5, 6, 10. |
| 27 | **PC Power Supply (PSU) Calculator** | Utilitas & Hardware | Estimasi konsumsi watt hardware PC untuk standarisasi PC Deployment kantor. |
| 28 | **Regex Tester & Validator** | Utilitas & Hardware | Evaluator pola RegExp dengan visual match highlight dan template umum. |
| 29 | **Markdown Live Editor & Preview** | Utilitas & Hardware | Editor markdown dengan live render HTML, tabel, code block, dan tombol salin. |

---

## Live Deployment

Website resmi aktif dan live di GitHub Pages:  
**[https://infinitenull.github.io/](https://infinitenull.github.io/)**

---

## Kontak & Tautan
* **Pengembang:** Rizki Ananda, S.Kom
* **Profil GitHub:** [https://github.com/InfiniteNull](https://github.com/InfiniteNull)
* **Almamater:** S1 Informatika — Universitas Potensi Utama
