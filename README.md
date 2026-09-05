# Rizki Ananda, S.Kom — Technical Portfolio & Production Systems Hub

<div align="center">

[![Language: English](https://img.shields.io/badge/Language-English-0284c7?style=flat-square)](README.md)
[![Ganti Bahasa: Indonesia](https://img.shields.io/badge/Language-Bahasa%20Indonesia-334155?style=flat-square)](README_ID.md)
[![Live Demo Platform](https://img.shields.io/badge/Live%20Demo-infinitenull.github.io-059669?style=flat-square)](https://infinitenull.github.io/)

</div>

> Technical portfolio platform and repository of standalone production applications, encompassing hospital management information systems (SIMRS), 29 interactive engineering and data utilities, and machine learning / NLP analytics engines.

---

## Developer Profile & Credentials

* **Name:** Rizki Ananda, S.Kom
* **GitHub:** [@InfiniteNull](https://github.com/InfiniteNull)
* **Education:** Bachelor of Computer Science (S1 Informatika) — Universitas Potensi Utama
* **Specializations:** IT Support, Network Administration, System Security (VAPT), Data Analytics, and Full-Stack Web Engineering.
* **National Competency Certifications:**
  * **Associate Network Administrator** (Komdigi RI / BNSP, 2026) — IPv4/VLSM addressing schemes, dynamic routing, VLANs, and enterprise network configuration.
  * **Junior Network Administrator** (BBPSDMP Kominfo Medan, 2023) — LAN installation, Linux/Nginx OS administration, and server maintenance.
* **Work Experience & Verified Projects:**
  * **IT Researcher (Freelance)** — *ADZKIA KEDINASAN PUSAT MEDAN* (Nov 2024 - Jun 2025)  
    *Configured and benchmarked Nginx Media Server on Linux VMs across 4 streaming protocols (RTMP, HLS, RTSP, HTTP). Performed internal network security audits (VAPT) and server documentation.*
  * **IT Support (Vendor Outsourcing)** — *PT BANK SINARMAS, TBK (KC MEDAN MANGKUBUMI)* (Dec 2023)  
    *Executed enterprise PC deployment: hardware assembly, secure user profile migration, OS installation, structured cable management, and domain onboarding.*
  * **Project Lead & Core Architect (Group 26)** — *SHUNA AI @ Certified Independent Study (MSIB) Batch 6 Kampus Merdeka - Skilvul* (Score: 81.8)  
    *Led Group 26 in the MSIB Machine Learning track; 95%+ solo codebase implementation covering NLP classification pipelines, Scikit-Learn TF-IDF vectorization, tabular retention modeling, and time-series forecasting.*
  * **Organizational Leadership** — *HMPS Informatika Universitas Potensi Utama* (Internal administrative governance).
* **Technical Toolkit:** Linux VM, Nginx, Python (Pandas, NumPy, Scikit-Learn, FastAPI), PHP (Laravel), MySQL, JavaScript ES6+, Node.js, SQLite, Tailwind CSS, Burp Suite, OWASP ZAP, OSINT.

---

## 3 Featured Flagship Projects

### 1. SIMRS Core Enterprise
* **Live Workspace:** [infinitenull.github.io/simrs-laravel/](https://infinitenull.github.io/simrs-laravel/)
* **Description:** Hospital Management Information System (HMIS) built with Laravel 11 and MySQL adhering to Indonesian Ministry of Health standards (**Permenkes No. 24 Tahun 2022**).
* **Key Capabilities:**
  * Patient admission and simulated BPJS Health V-Claim / SEP bridging.
  * Electronic Medical Records (EMR SOAP) with searchable directory of 40+ ICD-10 diagnostic codes.
  * Connected clinical workflows: Admission ➔ Doctor SOAP ➔ LOINC Lab Orders ➔ Pharmacy E-Prescribing ➔ Reactive Cashier Billing with official receipts.
  * Inpatient Bed Management (Bed Matrix) & real-time Bed Occupancy Rate (BOR) calculation.
  * SatuSehat FHIR JSON bundle standard alignment.
* **Tech Stack:** PHP 8.2, Laravel 11, MySQL, Tailwind CSS, JavaScript ES6+.
* **Repository:** [`InfiniteNull/simrs-laravel`](https://github.com/InfiniteNull/simrs-laravel)

---

### 2. Dev & Data Engineering Suite
* **Live Workspace:** [infinitenull.github.io/dev-tools/](https://infinitenull.github.io/dev-tools/)
* **Description:** Modular computational platform hosting 29 standalone tools across 4 core pillars:
  1. **Networking & Server (5 Tools):** IPv4 VLSM subnetting calculator, Linux/Mikrotik firewall rule builder, data transfer bandwidth duration estimator, RTMP/HLS bitrate & storage calculator, Linux crontab visual scheduler.
  2. **System Security (6 Tools):** Bcrypt & JWT authentication sandbox, OWASP HTTP Security Headers audit, cryptographic hash verifier (SHA-256/SHA-512/MD5), Shannon password entropy estimator, payload encoder/decoder, JWT signature debugger.
  3. **Data & Backend (9 Tools):** Tabular Data Cleaner & Imputation Studio (Pandas script export), Dataset Integration & QC Inspector (Tukey's IQR outlier detection, table joiner), Operational KPI Dashboard, Spreadsheet Formula Engine (XLOOKUP / VLOOKUP / Pivot Matrix), NLP Sentiment Analyzer, SQLite Inventory CRUD, Relational Library Borrowing System, JSON-to-SQL converter, Nginx access log parser.
  4. **Hardware & Utilities (9 Tools):** REST API latency pinger, Canvas WebP image compressor, real-time currency converter, 60s typing speed test (WPM), RAID storage calculator (0/1/5/6/10), PC PSU wattage estimator, Regex tester, live Markdown editor.
* **Tech Stack:** JavaScript ES6+, Python, FastAPI, Node.js, SQLite, HTML5 / Canvas, Tailwind CSS.
* **Repository:** [`InfiniteNull/dev-tools`](https://github.com/InfiniteNull/dev-tools)

---

### 3. SHUNA AI Data Engine
* **Live Workspace:** [infinitenull.github.io/SHUNA-AI/](https://infinitenull.github.io/SHUNA-AI/)
* **Origin & Context:** Capstone Project of Group 26 — Certified Independent Study (MSIB) Batch 6 @ Skilvul (Machine Learning Track • Final Score: 81.8).
* **Key Capabilities:**
  * Live NLP pipeline with Indonesian slang/informal typo normalizer and TF-IDF feature weighting.
  * Lexical word cloud visualizer and 2-word bigrams phrase extractor.
  * Multi-model benchmark arena (Logistic Regression 93.5%, Linear SVM 94.0%, Naive Bayes 91.2%, Random Forest 92.4%).
  * Dynamic ROC-AUC operating point curve (AUC = 0.962) with classification decision threshold slider $\tau \in [0.10, 0.90]$.
  * Tabular student retention and dropout risk simulator using Sigmoid Logistic Regression.
  * Holt-Winters exponential smoothing time-series forecaster and rolling Z-Score anomaly detector ($k=7$).
  * Client-side batch CSV file parsing, sentiment inference, and report exporter.
* **Tech Stack:** Python 3.10, Scikit-Learn, Pandas, NumPy, FastAPI, JavaScript ES6+, Tailwind CSS.
* **Repository:** [`InfiniteNull/SHUNA-AI`](https://github.com/InfiniteNull/SHUNA-AI)

---

## Directory Structure

```text
portfolio-hub/ (InfiniteNull.github.io)
├── index.html                  # Central Hub & Showcase Landing Page
├── styles.css                  # UI theme Slate/Zinc & dark mode engine
├── app.js                      # Master Controller, terminal CLI & guide modal
├── js/
│   └── i18n.js                 # Bilingual translation engine (ID / EN)
├── PANDUAN_WAWANCARA.md        # Technical interview preparation guide
├── README_ID.md                # Indonesian documentation
└── README.md                   # Primary English documentation
```

### Connected Standalone Repositories
* **[InfiniteNull/simrs-laravel](https://github.com/InfiniteNull/simrs-laravel)** — Hospital MIS application & BPJS V-Claim bridging.
* **[InfiniteNull/dev-tools](https://github.com/InfiniteNull/dev-tools)** — 29 Interactive computational tools suite.
* **[InfiniteNull/SHUNA-AI](https://github.com/InfiniteNull/SHUNA-AI)** — NLP sentiment pipeline & machine learning engine (MSIB Group 26).

---

## Deployment
The live platform is permanently hosted on GitHub Pages:  
**[https://infinitenull.github.io/](https://infinitenull.github.io/)**

## Contact
* **Developer:** Rizki Ananda, S.Kom ([@InfiniteNull](https://github.com/InfiniteNull))
* **Almamater:** S1 Informatika — Universitas Potensi Utama
* **License:** MIT License
