# Rizki Ananda, S.Kom — Production Applications & Engineering Portfolio

<div align="center">

[![Language: English](https://img.shields.io/badge/Language-English-0284c7?style=flat-square)](README.md)
[![Ganti Bahasa: Indonesia](https://img.shields.io/badge/Bahasa-Indonesia-334155?style=flat-square)](README_ID.md)
[![Live Demo Platform](https://img.shields.io/badge/Live%20Demo-infinitenull.github.io-059669?style=flat-square)](https://infinitenull.github.io/)

</div>

> Platform portofolio teknis dan repositori aplikasi produksi mandiri yang mencakup sistem informasi manajemen rumah sakit (SIMRS), 29 modul komputasi rekayasa perangkat lunak & data, serta engine analitik Machine Learning / NLP.

---

## Profil Pengembang & Kredensial

* **Nama:** Rizki Ananda, S.Kom
* **GitHub:** [@InfiniteNull](https://github.com/InfiniteNull)
* **Pendidikan:** S1 Informatika — Universitas Potensi Utama
* **Fokus Keahlian:** IT Support, Administrasi Jaringan, Keamanan Sistem (VAPT), Analisis Data, dan Full-Stack Web Engineering.
* **Sertifikasi Kompetensi:**
  * **Associate Network Administrator** (Komdigi RI / BNSP, 2026) — Perancangan skema pengalamatan IPv4/VLSM, dynamic routing, VLANs, dan konfigurasi jaringan enterprise.
  * **Junior Network Administrator** (BBPSDMP Kominfo Medan, 2023) — Instalasi LAN, administrasi sistem operasi Linux/Nginx, dan pemeliharaan server.
* **Pengalaman Kerja & Proyek Nyata:**
  * **IT Researcher (Freelance)** — *ADZKIA KEDINASAN PUSAT MEDAN* (Nov 2024 - Jun 2025)  
    *Merancang, mengonfigurasi, dan menguji Nginx Media Server pada Linux VM untuk 4 protokol streaming (RTMP, HLS, RTSP, HTTP). Melakukan audit keamanan jaringan internal (VAPT) dan dokumentasi arsitektur server.*
  * **IT Support (Vendor Outsourcing)** — *PT BANK SINARMAS, TBK (KC MEDAN MANGKUBUMI)* (Des 2023)  
    *Melaksanakan PC Deployment: perakitan hardware, migrasi profil user, instalasi OS, cable management, serta integrasi peripheral ke Active Directory Domain perbankan.*
  * **Lead Developer & Core Architect (Kelompok 26)** — *SHUNA AI @ MSIB Batch 6 Kampus Merdeka - Skilvul* (Nilai: 81.8)  
    *Memimpin Kelompok 26 pada program Studi Independen MSIB track Machine Learning; 95%+ implementasi kode mandiri untuk NLP text classification, Scikit-Learn TF-IDF, pemodelan retensi tabular, dan peramalan time-series.*
  * **Kepemimpinan Organisasi** — *HMPS Informatika Universitas Potensi Utama* (Tata kelola administrasi internal).
* **Toolkit Teknis:** Linux VM, Nginx, Python (Pandas, NumPy, Scikit-Learn, FastAPI), PHP (Laravel), MySQL, JavaScript ES6+, Node.js, SQLite, Tailwind CSS, Burp Suite, OWASP ZAP, OSINT.

---

## 3 Proyek Unggulan

### 1. SIMRS Core Enterprise (`#simrs`)
* **Live Workspace:** [infinitenull.github.io/#simrs](https://infinitenull.github.io/#simrs)
* **Deskripsi:** Sistem Informasi Manajemen Rumah Sakit (SIMRS) berbasis Laravel 11 dan MySQL yang selaras dengan **Permenkes No. 24 Tahun 2022**.
* **Fitur Kunci:**
  * Pendaftaran pasien & simulasi bridging BPJS Kesehatan V-Claim / SEP.
  * Rekam Medis Elektronik (RME SOAP) dengan pencarian 40+ kode diagnosa ICD-10.
  * Alur pelayanan terintegrasi: Admisi ➔ Dokter SOAP ➔ E-Order Lab LOINC ➔ E-Prescribing Farmasi ➔ Kasir Billing berkwitansi resmi.
  * Manajemen ranjang ranap (Bed Matrix) & kalkulasi Bed Occupancy Rate (BOR) real-time.
  * Standarisasi format SatuSehat FHIR JSON bundle.
* **Tech Stack:** PHP 8.2, Laravel 11, MySQL, Tailwind CSS, JavaScript ES6+.
* **Repositori:** [`InfiniteNull/simrs-laravel`](https://github.com/InfiniteNull/simrs-laravel)

---

### 2. Dev & Data Engineering Suite (`#devtools`)
* **Live Workspace:** [infinitenull.github.io/dev-tools/](https://infinitenull.github.io/dev-tools/)
* **Deskripsi:** Platform utilitas 29 modul komputasi mandiri yang terbagi dalam 4 pilar utama:
  1. **Jaringan & Server (5 Tools):** Kalkulator subnetting IPv4/VLSM, generator firewall Linux/Mikrotik, estimasi durasi transfer bandwidth, kalkulator bitrate & kapasitas disk streaming RTMP/HLS, visualizer crontab Linux.
  2. **Keamanan Sistem (6 Tools):** Sandbox autentikasi Bcrypt & JWT, audit HTTP Security Headers, verifier hash kriptografi (SHA-256/SHA-512/MD5), kalkulator entropi password, encoder/decoder payload, debugger JWT signature.
  3. **Data & Backend (9 Tools):** Tabular Data Cleaner & Imputation Studio (Pandas export), Dataset Integration & QC Inspector (Tukey's IQR outlier detection, table joiner), Dashboard KPI Laporan Berkala, Spreadsheet Formula Engine (XLOOKUP / VLOOKUP / Pivot Matrix), NLP Sentiment Analyzer, SQLite Inventory CRUD, Perpustakaan Relasional, JSON-to-SQL converter, Nginx access log parser.
  4. **Utilitas & Hardware (9 Tools):** REST API latency pinger, kompresi foto Canvas WebP, live currency converter, tes ketik WPM 60 detik, kalkulator RAID storage (0/1/5/6/10), kalkulator daya PSU PC, regex tester, live markdown editor.
* **Tech Stack:** JavaScript ES6+, Python, FastAPI, Node.js, SQLite, HTML5 / Canvas, Tailwind CSS.
* **Repositori:** [`InfiniteNull/dev-tools`](https://github.com/InfiniteNull/dev-tools)

---

### 3. SHUNA AI Data Engine (`#shuna-ai`)
* **Live Workspace:** [infinitenull.github.io/#shuna-ai](https://infinitenull.github.io/#shuna-ai)
* **Asal Usul:** Proyek Capstone Kelompok 26 — Studi Independen Bersertifikat (MSIB) Batch 6 @ Skilvul (Machine Learning Track • Nilai Akhir: 81.8).
* **Fitur Kunci:**
  * Pipeline NLP dengan normalisasi bahasa slang/informal Indonesia dan pembobotan TF-IDF.
  * Word cloud leksikal dan ekstraksi pola 2-word bigrams.
  * Multi-model benchmark arena (Logistic Regression 93.5%, Linear SVM 94.0%, Naive Bayes 91.2%, Random Forest 92.4%).
  * Kurva ROC-AUC dinamis (AUC = 0.962) dengan slider threshold keputusan $\tau \in [0.10, 0.90]$.
  * Simulator retensi siswa berbasis Sigmoid Logistic Regression.
  * Peramalan runtun waktu Holt-Winters dan deteksi anomali komplain rolling Z-Score ($k=7$).
  * Batch CSV ingestion, inference, dan ekspor laporan.
* **Tech Stack:** Python 3.10, Scikit-Learn, Pandas, NumPy, FastAPI, JavaScript ES6+, Tailwind CSS.
* **Repositori:** [`InfiniteNull/SHUNA-AI`](https://github.com/InfiniteNull/SHUNA-AI)

---

## Struktur Direktori Repositori

```text
portfolio-hub/
├── index.html                  # Dashboard SPA Utama (SIMRS, DevTools, SHUNA AI)
├── styles.css                  # UI theme Slate/Zinc & dark mode engine
├── app.js                      # Master Controller & router navigasi
├── js/                         # Script modular setiap modul
│   ├── i18n.js                 # Engine dwibahasa (ID / EN)
│   ├── simrs-app.js            # Engine SIMRS Hospital Management System
│   ├── shuna-ai-suite.js       # Suite Data Science & ML SHUNA AI
│   ├── data-cleaner-studio.js  # Tabular Data Wrangling Studio
│   ├── data-qc-inspector.js    # QC Audit & Table Join Simulator
│   ├── kpi-monitoring-dashboard.js # KPI & Periodic Report Dashboard
│   ├── spreadsheet-formula-engine.js # XLOOKUP & Pivot Reshaper
│   ├── subnet-calculator.js    # Subnetting IPv4 / CIDR / VLSM
│   ├── firewall-generator.js   # Linux / Mikrotik Firewall Builder
│   └── ...                     # Modul utilitas lainnya
├── python-modules/             # Source code Python backend
├── PANDUAN_WAWANCARA.md        # Panduan teknis wawancara
├── README_ID.md                # Dokumentasi Bahasa Indonesia
└── README.md                   # Dokumentasi Utama
```

---

## Deployment
Platform live dapat diakses di GitHub Pages:  
**[https://infinitenull.github.io/](https://infinitenull.github.io/)**

## Kontak
* **Pengembang:** Rizki Ananda, S.Kom ([@InfiniteNull](https://github.com/InfiniteNull))
* **Almamater:** S1 Informatika — Universitas Potensi Utama
* **Lisensi:** MIT License
