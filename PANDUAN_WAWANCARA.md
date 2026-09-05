# BUKU SAKU & PANDUAN WAWANCARA TEKNIS PENGEMBANG
### *Panduan Menjawab Pertanyaan Arsitektur Portofolio Software, IT Infrastructure & Data Suite*
**Kandidat: Rizki Ananda, S.Kom (Universitas Potensi Utama | @InfiniteNull)**

Dokumen ini disiapkan khusus agar Anda (**Rizki Ananda, S.Kom**) dapat menjawab setiap pertanyaan wawancara teknis dari recruiter, hiring manager, atau lead engineer dengan percaya diri, sistematis, dan profesional berdasarkan rekam jejak nyata Anda.

---

## 1. Pertanyaan Pengantar: Penjelasan Diri & Portofolio

### Q: "Bisa ceritakan latar belakang profesional Anda dan apa yang Anda bangun pada website ini?"
> **Jawaban:**  
> *"Selamat pagi/siang Bapak/Ibu. Nama saya **Rizki Ananda**, lulusan **S1 Informatika (S.Kom) dari Universitas Potensi Utama** dengan fokus spesialisasi di bidang **IT Support, Administrasi Jaringan, Keamanan Sistem (VAPT), serta Analisis Data & Rekayasa Perangkat Lunak**.*  
> *Secara profesional, saya memiliki pengalaman kerja teknis di:*  
> 1. ***IT Researcher di ADZKIA KEDINASAN PUSAT MEDAN (Nov 2024 - Jun 2025):*** *Merancang, mengonfigurasi, dan menguji infrastruktur Nginx Media Server pada Linux VM, melakukan benchmark 4 protokol streaming video (RTMP, HLS, RTSP, HTTP), audit keamanan jaringan internal (VAPT), pembuatan aturan firewall, serta dokumentasi arsitektur server.*  
> 2. ***IT Support di PT Bank Sinarmas, Tbk (Des 2023):*** *Melaksanakan PC Deployment di KC Medan Mangkubumi, meliputi perakitan desktop, instalasi OS enterprise, backup & migrasi data profil user secara aman, cable management, hingga konfigurasi peripheral terhubung ke domain internal bank.*  
> 3. ***Ketua Tim Proyek Akhir (Kelompok 26) di MSIB Studi Independen Skilvul (Nilai 81.8):*** *Memimpin perancangan dan implementasi 95%+ kode mandiri proyek **SHUNA AI**, yaitu platform analitik data terpadu berbasis NLP TF-IDF, benchmark multi-model machine learning, simulator retensi siswa, dan peramalan time-series.*  
> *Kompetensi saya diperkuat oleh sertifikasi **Associate Network Administrator (Komdigi RI 2026)** dan **Junior Network Administrator (Kominfo 2023)**.*  
> *Seluruh keahlian ini saya wujudkan dalam website portofolio interaktif yang menaungi 3 proyek flagship: **SIMRS Core Enterprise (Hospital MIS Permenkes 24/2022)**, **Dev & Data Engineering Suite (29 Tools Interaktif)**, serta **SHUNA AI Data Engine**."*

---

## 2. Pertanyaan Mengenai Infrastruktur, Server & Protokol Streaming

### Q: "Bisa jelaskan pengalaman Anda dalam merancang Nginx Media Server dan protokol streaming di Adzkia Kedinasan?"
> **Jawaban:**  
> *"Di Adzkia Kedinasan Pusat, saya merancang dan menguji arsitektur Nginx Media Server pada Virtual Machine Linux:*  
> *1. Mengonfigurasi modul Nginx RTMP untuk menerima ingest video stream secara real-time.*  
> *2. Menguji empat protokol streaming: **RTMP** untuk low-latency transmission, **HLS** untuk kompatibilitas lintas browser modern, **RTSP** untuk feed kamera/CCTV, serta **HTTP** untuk delivery konten video terdistribusi.*  
> *3. Melakukan audit keamanan jaringan dan vulnerability assessment (VAPT) internal untuk memastikan server aman dari potensi eksploitasi."*

---

## 3. Pertanyaan Mengenai IT Support & PC Deployment Perbankan

### Q: "Bagaimana Anda menangani proyek PC Deployment di Bank Sinarmas dengan standar keamanan tinggi?"
> **Jawaban:**  
> *"Di Bank Sinarmas KC Medan Mangkubumi, integritas data dan kelancaran operasional adalah prioritas utama:*  
> *1. **Backup & Migrasi Data:** Memastikan seluruh data profil user, bookmark perbankan, dan sertifikat digital dibackup sebelum migrasi ke sistem operasi baru.*  
> *2. **Standarisasi Hardware & Kerapian:** Melakukan unboxing, instalasi OS enterprise, serta cable management yang rapi dan aman.*  
> *3. **Konfigurasi Peripheral & Domain:** Mengonfigurasi printer slip teller, scanner dokumen nasabah, dan memastikan PC terdaftar pada Active Directory Domain perbankan dengan hak akses yang tepat."*

---

## 4. Pertanyaan Mengenai Analisis Data & NLP (SHUNA AI — Kelompok 26 MSIB Skilvul)

### Q: "Bagaimana peran Anda dan implementasi teknis pada proyek SHUNA AI di MSIB Studi Independen Skilvul?"
> **Jawaban:**  
> *"Pada program **Studi Independen Bersertifikat (MSIB) Batch 6 di Skilvul**, saya bertindak sebagai **Ketua Tim (Team Lead & Core Architect) untuk Kelompok 26** yang meraih **Nilai Akhir 81.8**.*  
> *Saya mengeksekusi lebih dari 95% implementasi kode teknis secara mandiri:*  
> *1. **Pipeline NLP & Indonesian Slang Normalizer:** Membangun normalisasi bahasa gaul/typo Indonesia, tokenisasi, stopword removal, dan ekstraksi fitur menggunakan pembobotan **TF-IDF (Term Frequency-Inverse Document Frequency)**.*  
> *2. **Benchmark Multi-Model:** Mengembangkan dan menguji komparasi performa antara Logistic Regression (Akurasi 93.5%), Linear SVM (94.0%), Multinomial Naive Bayes (91.2%), dan Random Forest (92.4%).*  
> *3. **Dynamic ROC-AUC & Threshold Slider:** Mengimplementasikan simulasi kurva ROC dinamis (AUC = 0.962) dengan kalkulasi Confusion Matrix pada berbagai nilai ambang batas keputusan $\tau$.*  
> *4. **Predictive Tabular Modeling & Time-Series Anomaly:** Membangun simulator retensi siswa berbasis Sigmoid Logistic Regression serta peramalan runtun waktu Holt-Winters yang dilengkapi deteksi lonjakan anomali Z-score."*

---

## 5. Pertanyaan Mengenai SIMRS Core Enterprise (Permenkes No. 24 Tahun 2022)

### Q: "Bisa jelaskan arsitektur dan kepatuhan standar pada sistem SIMRS Core Enterprise yang Anda bangun?"
> **Jawaban:**  
> *"SIMRS Core Enterprise dirancang berbasis framework **Laravel 11, PHP 8.2, dan MySQL** dengan orientasi kepatuhan penuh terhadap standar Kementerian Kesehatan RI (**Permenkes No. 24 Tahun 2022**):*  
> *1. **Bridging BPJS V-Claim & SEP:** Menangani alur verifikasi nomor rujukan dan penerbitan Surat Eligibilitas Peserta (SEP) secara reaktif.*  
> *2. **Rekam Medis Elektronik (RME SOAP):** Integrasi pencatatan Subjective, Objective, Assessment, Plan dengan direktori 40+ kode diagnosa ICD-10.*  
> *3. **Alur Pelayanan End-to-End:** Terkoneksi dari Admisi ➔ Dokter SOAP ➔ E-Order Lab LOINC ➔ E-Prescribing Farmasi ➔ Kasir Billing berkwitansi resmi.*  
> *4. **Inpatient Bed Management & BOR:** Manajemen ranjang rawat inap (Bed Matrix) yang menghitung persentase Bed Occupancy Rate (BOR) secara real-time.*  
> *5. **SatuSehat FHIR Standards:** Skema data dipetakan sesuai struktur bundle HL7/FHIR Kemenkes."*

---

## 6. Pertanyaan Mengenai Data Wrangling & Administrasi Pengolahan Data

### Q: "Bagaimana alur kerja Anda saat melakukan Data Wrangling dan Data Preparation pada data mentah yang kotor?"
> **Jawaban:**  
> *"Alur kerja saya mengikuti standar end-to-end data preparation:*  
> *1. **Data Inspection & Health Check:** Memeriksa struktur awal kolom, persentase nilai null, tipe data, dan duplikasi baris.*  
> *2. **Pembersihan & Imputasi:** Melakukan deduplikasi, mengisi missing values menggunakan **Median** untuk kolom numerik (karena lebih tahan terhadap outlier) dan **Modus/Konstanta** untuk kategori.*  
> *3. **Standardisasi Format:** Menyeragamkan string teks (trim whitespace, title case) serta mengonversi format tanggal yang bervariasi ke standar **ISO-8601 (`YYYY-MM-DD`)**.*  
> *4. **Quality Control & Outlier Check:** Menggunakan metode statistik **Tukey's IQR** ($1.5 \times \text{IQR}$) untuk menemukan nilai anomali dan memastikan relasi primary/foreign key tidak memiliki rekaman orphan.*  
> *5. **Export & Dokumentasi:** Mengekspor clean dataset dan menyusun script otomatisasi **Python Pandas** yang reusable."*

---

## 7. Pertanyaan Mengenai Spreadsheet Formula & Konversi Data

### Q: "Bagaimana penguasaan Anda terhadap fungsi formula Spreadsheet tingkat lanjut?"
> **Jawaban:**  
> *"Saya menguasai formula komputasi spreadsheet baik secara manual maupun otomatisasi skrip:*  
> *1. **Formula Pencarian:** Memahami mekanisme `VLOOKUP` (exact match `FALSE`), `HLOOKUP`, serta kombinasi modern `INDEX & MATCH` dan `XLOOKUP` untuk pencarian dua arah tanpa batasan posisi kolom.*  
> *2. **Agregasi & Logika Kondisional:** Mahir dalam `SUMIFS`, `COUNTIFS`, `AVERAGEIFS`, dan nested `IF/IFS` dengan handling error `IFERROR`.*  
> *3. **Pivot Table & Reshaping:** Memahami konsep Pivot Matrix (Rows, Columns, Values, Aggregation: SUM/AVG/COUNT) dan dapat mereplikasi logikanya ke dalam SQL `GROUP BY` maupun `pandas.pivot_table()`."*
