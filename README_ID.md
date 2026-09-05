# Rizki Ananda, S.Kom — Portofolio Aplikasi Produksi & Rekayasa Perangkat Lunak

<div align="center">

[![Switch Language: English](https://img.shields.io/badge/Switch%20Language-English%20Version%20%F0%9F%87%AC%F0%9F%87%A7-334155?style=for-the-badge&logo=translate&logoColor=white)](README.md)
[![Bahasa: Indonesia](https://img.shields.io/badge/Bahasa-Bahasa%20Indonesia%20(Aktif)-0284c7?style=for-the-badge&logo=googletranslate&logoColor=white)](README_ID.md)
[![Live Demo Platform](https://img.shields.io/badge/Live%20Demo-infinitenull.github.io-059669?style=for-the-badge&logo=githubpages&logoColor=white)](https://infinitenull.github.io/)

</div>

> **Portofolio Terpadu: Infrastruktur IT, Rekayasa Perangkat Lunak & Data Intelligence**  
> *Dikembangkan oleh **Rizki Ananda, S.Kom** ([@InfiniteNull](https://github.com/InfiniteNull)) — Lulusan S1 Informatika Universitas Potensi Utama, Administrator Jaringan Tersertifikasi (Komdigi RI & Kominfo), Spesialis IT Support, serta Praktisi Full-Stack & Machine Learning.*

---

## 👨‍💻 Profil & Kredensial Pengembang

* **Nama:** Rizki Ananda, S.Kom
* **GitHub:** [@InfiniteNull](https://github.com/InfiniteNull)
* **Pendidikan:** S1 Informatika — Universitas Potensi Utama
* **Fokus Spesialisasi:** IT Support, Network Administration, Keamanan Sistem (VAPT), Analisis Data, dan Rekayasa Web Full-Stack.
* **Sertifikasi Kompetensi Nasional:**
  * **Associate Network Administrator** (Komdigi RI / BNSP, 2026) — Kompetensi perancangan skema pengalamatan IPv4/VLSM, dynamic routing, VLANs, dan konfigurasi jaringan enterprise terdistribusi.
  * **Junior Network Administrator** (BBPSDMP Kominfo Medan, 2023) — Kompetensi instalasi jaringan lokal (LAN), administrasi OS Linux / Nginx, dan pemeliharaan server data.
* **Pengalaman Kerja & Proyek Nyata:**
  * **IT Researcher (Freelance)** — *ADZKIA KEDINASAN PUSAT MEDAN* (Nov 2024 - Jun 2025)  
    *Merancang, mengonfigurasi, dan menguji infrastruktur Nginx Media Server pada Linux Virtual Machine pada 4 protokol streaming (RTMP, HLS, RTSP, HTTP). Melakukan audit keamanan jaringan internal (VAPT), firewall rule hardening, serta penyusunan dokumentasi arsitektur server.*
  * **IT Support (Vendor Outsourcing)** — *PT BANK SINARMAS, TBK (KC MEDAN MANGKUBUMI)* (Des 2023)  
    *Melaksanakan proyek PC Deployment enterprise: perakitan desktop, migrasi data profil user secara aman, instalasi OS, perapian kabel (cable management), hingga konfigurasi peripheral terhubung ke Active Directory Domain perbankan.*
  * **Ketua Tim Proyek & Core Architect (Kelompok 26)** — *SHUNA AI @ Program Studi Independen Bersertifikat (MSIB) Batch 6 Kampus Merdeka - Skilvul* (Nilai Akhir: 81.8)  
    *Memimpin Kelompok 26 pada program Studi Independen MSIB track Machine Learning, mengeksekusi 95%+ implementasi kode end-to-end untuk pipeline NLP, Scikit-Learn TF-IDF, pemodelan retensi tabular, dan analitik data.*
  * **Kepemimpinan Organisasi** — *HMPS Informatika Universitas Potensi Utama* (Tata kelola administrasi internal).
* **Tools & Keahlian Teknis:** Linux VM, Nginx, Python (Pandas, NumPy, Scikit-Learn, FastAPI), PHP (Laravel), MySQL, JavaScript ES6+, Node.js, SQLite, Tailwind CSS, Burp Suite, OWASP ZAP, OSINT.

---

## 🚀 3 Proyek Unggulan (Flagship Production Systems)

Platform portofolio ini menyajikan 3 sistem mandiri berstandar produksi yang dibangun dengan clean architecture:

### 1. SIMRS Core Enterprise — Hospital MIS (`#simrs`)
* **Akses Live:** Dapat diakses via hash `#simrs` pada antarmuka dashboard.
* **Arsitektur:** Sistem Informasi Manajemen Rumah Sakit (SIMRS) berstandar nasional yang selaras dengan regulasi Kementerian Kesehatan RI (**Permenkes No. 24 Tahun 2022**).
* **Fitur & Kemampuan Kunci:**
  * **Admisi & Bridging BPJS SEP:** Pendaftaran pasien otomatis dengan simulasi bridging BPJS Kesehatan V-Claim.
  * **Rekam Medis Elektronik (RME / EMR SOAP):** Form catatan klinis dokter interaktif dengan pencarian cepat 40+ kode diagnosa ICD-10.
  * **Alur Pelayanan Terintegrasi Real-time:** Admisi ➔ Dokter SOAP ➔ E-Order Lab LOINC ➔ E-Prescribing Farmasi ➔ Kasir Billing Reaktif berkwitansi resmi.
  * **Manajemen Bed Kamar Inap:** Matriks ranjang ranap dinamis dengan kalkulasi otomatis Bed Occupancy Rate (BOR) indikator efisiensi RS.
  * **Kepatuhan SatuSehat FHIR:** Struktur bundle data medis siap integrasi standar pertukaran data FHIR.
* **Tech Stack:** PHP 8.2, Laravel 11, MySQL, Tailwind CSS, JavaScript ES6+.
* **Repositori GitHub:** [`https://github.com/InfiniteNull/simrs-laravel`](https://github.com/InfiniteNull/simrs-laravel)

---

### 2. Dev & Data Engineering Suite — 29 Tools Interaktif (`#devtools`)
* **Akses Live:** Dapat diakses via hash `#devtools` pada antarmuka dashboard.
* **Arsitektur:** Portal komputasi modular berkinerja tinggi yang memuat 29 modul fungsional terbagi dalam 4 Pilar Utama:
  1. **Jaringan & Server (5 Tools):** Kalkulator subnetting IPv4/VLSM, generator firewall Linux/Mikrotik (UFW, iptables, Mikrotik), estimasi durasi transfer bandwidth & migrasi data, kalkulator bitrate & kapasitas disk streaming RTMP/HLS, dan scheduler crontab Linux visual.
  2. **Keamanan Sistem (6 Tools):** Sandbox autentikasi Bcrypt & JWT, audit OWASP HTTP Security Headers, verifier hash kriptografi (SHA-256 / SHA-512 / MD5 / HMAC), kalkulator entropi password & estimasi brute-force GPU, encoder/decoder payload multi-format, dan debugger klaim/signature JWT.
  3. **Data & Backend Engineering (9 Tools):** Tabular Data Cleaner & Imputation Studio (imputasi nilai hilang, deduplikasi, export script Pandas), Dataset Integration & Quality Control (QC) Inspector (deteksi outlier Tukey IQR, table join simulator), Dashboard KPI & Laporan Berkala, Spreadsheet Formula Simulator (XLOOKUP / VLOOKUP / Pivot Matrix), analisis sentimen NLP VADER, Inventory CRUD SQLite, Sistem Peminjaman Perpustakaan Relasional, konverter JSON ke SQL, dan parser access log Nginx.
  4. **Utilitas & Hardware (9 Tools):** Pinger latensi REST API, kompresi gambar Canvas (WebP converter), kalkulator kurs valuta asing live, uji kecepatan ketik 60 detik (WPM & akurasi), kalkulator kapasitas & redundansi RAID (RAID 0/1/5/6/10), kalkulator kebutuhan daya PSU PC Deployment, sandbox Regex tester, dan live Markdown-to-HTML editor.
* **Tech Stack:** JavaScript ES6+, Python, FastAPI, Node.js, SQLite, HTML5 / Canvas, Tailwind CSS.
* **Repositori GitHub:** [`https://github.com/InfiniteNull`](https://github.com/InfiniteNull)

---

### 3. SHUNA AI Data Engine — Machine Learning & NLP Analytics (`#shuna-ai`)
* **Akses Live:** Dapat diakses via hash `#shuna-ai` pada antarmuka dashboard.
* **Konteks & Asal Usul:** **Proyek Capstone / Proyek Akhir Kelompok 26** — Program Studi Independen Bersertifikat (MSIB) Batch 6 Kampus Merdeka di Skilvul (Machine Learning Track • Nilai Akhir: **81.8**). Dipimpin dan dieksekusi secara mandiri (95%+ implementasi kode end-to-end) oleh Rizki Ananda sebagai Ketua Tim & Core Architect.
* **Fitur & Kemampuan Kunci:**
  * **NLP & Indonesian Slang Studio:** Tokenisasi teks live, pembobotan fitur TF-IDF, kalkulasi polaritas compound score, dan fitur toggle Normalizer Slang / Bahasa Gaul & Typo Indonesia.
  * **Word Cloud Leksikal & N-Gram Bigrams:** Visualisasi proporsional berbasis bobot TF-IDF untuk sentimen positif, kata friksi negatif, dan pola frasa 2 kata.
  * **Multi-Model Benchmark Arena:** Komparasi inferensi langsung dari 4 model machine learning:
    * *Logistic Regression* (Akurasi: 93.5%, F1: 93.1%)
    * *Linear SVM* (Akurasi: 94.0%, F1: 93.8%)
    * *Multinomial Naive Bayes* (Akurasi: 91.2%, F1: 90.9%)
    * *Random Forest* (Akurasi: 92.4%, F1: 92.0%)
  * **Kurva ROC-AUC Dinamis & Slider Threshold Keputusan:** Simulasi operating point kurva ROC empiris (AUC = 0.962) dengan kalkulasi Confusion Matrix real-time (Precision, Recall, Specificity, F1) pada ambang batas $\tau \in [0.10, 0.90]$.
  * **Simulator Retensi & Risiko Dropout Tabular:** Klasifikasi biner multi-fitur berbasis Sigmoid Logistic Regression untuk memprediksi kelulusan siswa bootcamp.
  * **Time-Series Forecasting & Deteksi Anomali:** Peramalan Holt-Winters Exponential Smoothing vs 7-Day Moving Average dengan detektor lonjakan anomali rolling Z-score ($k=7, Z \ge 2.0$).
  * **Batch CSV Processing Engine:** Ingesti file CSV ulasan secara client-side di browser, batch inference sentimen & aspek instan, serta ekspor laporan CSV terstruktur.
* **Tech Stack:** Python 3.10, Scikit-Learn, Pandas, NumPy, FastAPI, JavaScript ES6+, Tailwind CSS.
* **Repositori GitHub:** [`https://github.com/InfiniteNull/SHUNA-AI`](https://github.com/InfiniteNull/SHUNA-AI)

---

## 📁 Struktur Direktori Repositori

```text
portfolio-hub/
├── index.html                  # Dashboard SPA Utama (View SIMRS, DevTools, dan SHUNA AI)
├── styles.css                  # Custom styling, dark mode & tema Slate/Zinc
├── app.js                      # Master Controller, router terminal CLI & manajemen modal
├── js/                         # Script Modular Setiap Modul & Workspace
│   ├── i18n.js                 # Engine Transkripsi Dwibahasa (ID / EN)
│   ├── simrs-app.js            # Engine Sistem Informasi Manajemen Rumah Sakit (SIMRS)
│   ├── shuna-ai-suite.js       # Suite Data Science & Machine Learning SHUNA AI
│   ├── data-cleaner-studio.js  # Studio Data Wrangling & Imputasi Tabular
│   ├── data-qc-inspector.js    # Quality Control Audit & Simulasi Table Join
│   ├── kpi-monitoring-dashboard.js # Dashboard Laporan Berkala & Tracking KPI
│   ├── spreadsheet-formula-engine.js # Simulator XLOOKUP & Matriks Pivot Table
│   ├── subnet-calculator.js    # Engine Subnetting IPv4 / CIDR / VLSM
│   ├── firewall-generator.js   # Generator Rule Firewall Linux UFW / iptables / Mikrotik
│   ├── bandwidth-estimator.js  # Estimasi Durasi Transfer & Throughput Data
│   ├── streaming-calculator.js # Kalkulator Bitrate RTMP/HLS & Kapasitas Disk
│   ├── cron-builder.js         # Generator Jadwal Crontab Linux Visual
│   ├── security-headers.js     # Audit HTTP Security Headers Standar OWASP
│   ├── crypto-hash.js          # Generator & Verifier SHA-256 / SHA-512 / MD5
│   ├── password-entropy.js     # Entropi Password & Estimasi Waktu Retak GPU
│   ├── payload-encoder.js      # Encoder / Decoder Base64, Hex, URL, Unicode
│   ├── jwt-debugger.js         # Inspector Claims & Verifier Signature JWT
│   ├── ai-data-analyzer.js     # Analisis Sentimen NLP & Grafik Chart.js
│   ├── inventory-sandbox.js    # CRUD Aset & Simulasi SQLite Database
│   ├── library-sandbox.js      # Transaksi Peminjaman Buku Relasional SQL
│   ├── json-sql-converter.js   # Generator JSON ke SQL INSERT & Skema
│   ├── log-analyzer.js         # Parser Regex Log Nginx & Top IP Aggregator
│   ├── news-scraper.js         # Scraper Berita Teknologi & Feed Live
│   ├── api-checker.js          # Pengujian Latensi & Status Endpoint API
│   ├── image-optimizer.js      # Kompresi Gambar Canvas & WebP Converter
│   ├── currency-converter.js   # Kalkulator Kurs Mata Uang & Cache Offline
│   ├── typing-test.js          # Uji Kecepatan Ketik WPM & Akurasi
│   ├── raid-calculator.js      # Kalkulator Kapasitas & Redundansi RAID
│   ├── psu-calculator.js       # Estimasi Konsumsi Daya Listrik PSU PC
│   ├── regex-tester.js         # Sandbox Uji Regular Expression Interaktif
│   └── markdown-preview.js     # Editor Markdown ke HTML Live Render
├── python-modules/             # Source Code Python Asli
│   ├── analyzer.py             # Script Pandas & VADER Sentiment
│   ├── auth_service.py         # Script Bcrypt Password Hashing & JWT
│   ├── library_system.py       # Script Manajemen Database SQLite Relasional
│   └── scraper.py              # Script BeautifulSoup Web Scraping
├── PANDUAN_WAWANCARA.md        # Panduan Pertanyaan Wawancara Rekayasa Teknis
├── README_ID.md                # Dokumentasi Versi Bahasa Indonesia
└── README.md                   # Dokumentasi Versi Bahasa Inggris
```

---

## 🌐 Live Platform Deployment

Platform portofolio aktif dan dapat diakses secara publik di GitHub Pages:  
👉 **[https://infinitenull.github.io/](https://infinitenull.github.io/)**

Pintasan Navigasi Langsung:
* **SIMRS Core Enterprise:** [https://infinitenull.github.io/#simrs](https://infinitenull.github.io/#simrs)
* **Dev & Data Engineering Suite (29 Tools):** [https://infinitenull.github.io/#devtools](https://infinitenull.github.io/#devtools)
* **SHUNA AI Data Engine:** [https://infinitenull.github.io/#shuna-ai](https://infinitenull.github.io/#shuna-ai)

---

## 📬 Kontak & Tautan

* **Pengembang:** Rizki Ananda, S.Kom
* **Profil GitHub:** [https://github.com/InfiniteNull](https://github.com/InfiniteNull)
* **Almamater:** S1 Informatika — Universitas Potensi Utama
* **Lisensi:** MIT License (Dirancang mandiri dengan clean code dan standar IT profesional).
