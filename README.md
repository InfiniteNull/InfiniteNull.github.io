# Web Tools & Engineering Suite

<div align="center">

[![Language: English](https://img.shields.io/badge/Language-English%20(Active)-0284c7?style=for-the-badge&logo=googletranslate&logoColor=white)](README.md)
[![Ganti Bahasa: Indonesia](https://img.shields.io/badge/Ganti%20Bahasa-Bahasa%20Indonesia%20%F0%9F%87%AE%F0%9F%87%A9-334155?style=for-the-badge&logo=translate&logoColor=white)](README_ID.md)
[![Live Demo Platform](https://img.shields.io/badge/Live%20Demo-infinitenull.github.io-059669?style=for-the-badge&logo=githubpages&logoColor=white)](https://infinitenull.github.io/)

</div>

> **Unified Developer & IT Infrastructure Suite (29 Interactive Production-Ready Tools)**  
> *Engineered by **Rizki Ananda, S.Kom** ([@InfiniteNull](https://github.com/InfiniteNull)) — Computer Science Graduate (S1 Informatika) from Universitas Potensi Utama, IT Specialist, Certified Network Administrator & Security Practitioner.*

---

## Developer Profile

* **Name:** Rizki Ananda, S.Kom
* **GitHub:** [@InfiniteNull](https://github.com/InfiniteNull)
* **Education:** Bachelor of Computer Science (S1 Informatika) — Universitas Potensi Utama
* **Specializations:** IT Support, Network Administration, System Security (VAPT), Data Analytics & Full-Stack Web Development.
* **Professional Certifications:**
  * **Associate Network Administrator** (Komdigi RI, 2026)
  * **Junior Network Administrator** (BBPSDMP Kominfo Medan, 2023)
* **Work & Project Experience:**
  * **IT Researcher** — *ADZKIA KEDINASAN PUSAT* (Nov 2024 - Jun 2025 | Freelance | Medan)  
    *Architected, configured, and benchmarked Nginx Media Server on Linux Virtual Machines across 4 streaming protocols (RTMP, HLS, RTSP, HTTP), conducted internal network security audits (VAPT), firewall rules enforcement, and server architectural documentation.*
  * **IT Support** — *PT Bank Sinarmas, Tbk* (Dec 2023 | Freelance / Outsourcing Vendor | KC Medan Mangkubumi)  
    *Executed enterprise PC deployment: hardware assembly, secure user data migration, OS configuration, structured cable management, and peripheral network domain onboarding.*
  * **SHUNA AI Project Lead** — *MSIB Batch 6 Kampus Merdeka @ Skilvul* (Score: 81.8 — NLP text classification pipelines & Python workflows).
  * **Organizational Leadership** — *HMPS Informatika Universitas Potensi Utama* (Internal administrative governance).
* **Technical Toolkit:** Burp Suite, OWASP ZAP, OSINT, Linux VM, Nginx, Python (Pandas, NumPy), Node.js, SQLite, JavaScript ES6+, Tailwind CSS.

---

## Overview & Architecture

This repository hosts a high-performance **29-Tool IT, Data Wrangling & Software Engineering Suite** built with a clean, modular client-side architecture and polyglot backend foundations. The tools are organized into **4 Core Pillars**:

1. **Networking & Server Infrastructure (5 Tools):** IPv4 VLSM subnetting, firewall command generation (UFW / iptables / Mikrotik), data transfer bandwidth calculation, streaming egress & disk estimation (RTMP/HLS), and Linux crontab scheduling.
2. **System Security & Hardening (6 Tools):** Bcrypt & JWT auth simulation, HTTP security headers analyzer (CSP/HSTS/CORS), cryptographic hash verifiers (SHA-256/SHA-512/MD5), password entropy estimators, multi-format payload encoders, and JWT signature debuggers.
3. **Data & Backend Engineering (9 Tools):**
   - **Tabular Data Cleaner & Imputation Studio:** Raw dirty data cleaning, deduplication, missing value imputation (mean/median/mode), date standardizing (ISO-8601), and Pandas code export.
   - **Dataset Integration & Quality Control (QC) Inspector:** Completeness & validity audits, Tukey's IQR statistical outlier detection, and relational dataset table join simulator.
   - **Periodic Report & KPI Monitoring Dashboard:** Operational tracking across daily/weekly/monthly periods, target vs actual variance analysis, and achievement rate calculations.
   - **Spreadsheet Formula Simulator & Data Reshaper:** XLOOKUP / VLOOKUP simulation, Pivot Table GroupBy matrix, and cross-platform SQL & Pandas conversion.
   - VADER NLP sentiment data ingestion, SQLite inventory asset CRUD, relational library transaction management, JSON-to-SQL batch converter, and Nginx access log analyzers.
4. **Hardware & Web Utilities (9 Tools):** REST API latency health pinger, canvas image optimizer, real-time currency exchange calculator, typing speed benchmark (WPM), RAID array capacity calculator (RAID 0/1/5/6/10), PC power supply (PSU) wattage estimators, Regex tester, and Markdown live preview editor.

---

## Directory Structure

```text
portfolio-hub/
├── index.html                  # Main SPA Dashboard & Workspace Modal Container
├── styles.css                  # Custom styling, animations & Dark/Light mode engine
├── app.js                      # Master Controller, 29-Tool Registry & Modal Manager
├── js/                         # Modular Interactive Tool Scripts
│   ├── data-cleaner-studio.js     # Data Wrangling & Imputation Studio
│   ├── data-qc-inspector.js       # Quality Control Audit & Relational Table Joiner
│   ├── kpi-monitoring-dashboard.js# Operational KPI & Periodic Report Dashboard
│   ├── spreadsheet-formula-engine.js# XLOOKUP Simulator & Pivot Reshaper
│   ├── subnet-calculator.js       # IPv4 / CIDR / VLSM Subnetting Engine
│   ├── firewall-generator.js      # Port Directory & Linux UFW / iptables Generator
│   ├── bandwidth-estimator.js     # Data Transfer & Migration Throughput Calculator
│   ├── streaming-calculator.js    # RTMP / HLS / RTSP Bitrate & Storage Estimator
│   ├── cron-builder.js            # Linux Crontab Expression Scheduler
│   ├── security-headers.js        # OWASP HTTP Security Headers Audit & Scorer
│   ├── crypto-hash.js             # Web Crypto API SHA-256 / SHA-512 / MD5 Verifier
│   ├── password-entropy.js        # Shannon Entropy & GPU Brute-Force Estimator
│   ├── payload-encoder.js         # Base64 / Hex / URL / Unicode Payload Sanitizer
│   ├── jwt-debugger.js            # JSON Web Token Claims & Signature Verifier
│   ├── ai-data-analyzer.js        # NLP Sentiment Analysis & Chart.js Visualizer
│   ├── inventory-sandbox.js       # CRUD Asset & SQLite Database Simulation
│   ├── library-sandbox.js         # Relational Database Borrowing & Circulation
│   ├── json-sql-converter.js      # Batch JSON to SQL DDL/DML Schema Transformer
│   ├── log-analyzer.js            # Nginx Web Server Access Log Metrics & Top IPs
│   ├── api-checker.js             # REST API Latency Pinger & Payload Inspector
│   ├── image-optimizer.js         # Canvas Image Resizer & WebP/PNG/JPG Converter
│   ├── currency-converter.js      # Real-Time Multi-Currency Forex Rate Calculator
│   ├── typing-test.js             # 60s Typing Benchmark (WPM & Accuracy Metric)
│   ├── news-scraper.js            # Curated Tech Feed & Automation Scraper
│   ├── raid-calculator.js         # Storage Array RAID 0/1/5/6/10 Capacity Calculator
│   ├── psu-calculator.js          # Hardware Wattage & Power Supply Estimator
│   ├── regex-tester.js            # Live Regular Expression Evaluator & Highlighter
│   └── markdown-preview.js        # Real-Time Semantic Markdown-to-HTML Live Engine
├── python-modules/             # Standalone Python CLI & Microservice Backends
│   ├── analyzer.py                # Pandas & VADER Sentiment NLP Pipeline
│   ├── auth_service.py            # Bcrypt Password Hashing & JWT Authentication
│   ├── library_system.py          # SQLite Relational Database Management Script
│   └── scraper.py                 # BeautifulSoup & Requests Web Scraper
└── README.md                   # Primary Repository Documentation
```

---

## Interactive Tools Inventory

| No | Tool Name | Pillar Category | Core Capabilities |
|:---:|---|---|---|
| 1 | **IP Subnetting & VLSM Calculator** | Networking & Server | Calculates Network ID, Broadcast, Subnet Mask, Host Range, and Binary representation. |
| 2 | **Port Directory & Firewall Rules** | Networking & Server | Standard port directory and instant command generator for UFW, iptables, and Mikrotik. |
| 3 | **Bandwidth & Data Transfer Estimator** | Networking & Server | Estimates data backup and server migration duration with TCP/IP overhead efficiency. |
| 4 | **Streaming Bitrate & Storage** | Networking & Server | Ingest/egress bandwidth and DVR disk storage calculator for RTMP, HLS, RTSP Nginx servers. |
| 5 | **Cron Task Scheduler Builder** | Networking & Server | Visual Linux crontab 5-field generator with simulation of upcoming 5 scheduled execution dates. |
| 6 | **Auth & Security Service** | System Security | User registration, Bcrypt hashing (Salt 10), JWT stateless session issuance, and SQLite persistence. |
| 7 | **Security Headers Analyzer** | System Security | Audits CSP, HSTS, X-Frame-Options, MIME-sniffing headers and outputs security grades (A+ to F). |
| 8 | **Crypto Hash & Integrity Verifier** | System Security | Computes SHA-256, SHA-512, SHA-1, MD5, and HMAC hashes with instant checksum verification. |
| 9 | **Password Entropy & Brute-Force** | System Security | Calculates Shannon entropy bits, password policy compliance, and cracking duration on CPU vs GPU. |
| 10 | **Security Payload Encoder / Decoder** | System Security | Multi-format conversions: Base64, Hexadecimal, URL-Encoding, HTML Entities, and Unicode. |
| 11 | **JWT Inspector & Claims Debugger** | System Security | Deconstructs Header, Payload claims, expiration timestamps, and HMACSHA256 signature verification. |
| 12 | **NLP Sentiment & Data Analyzer** | Data & Backend | Ingests CSV files, detects review columns, calculates VADER NLP scores, and renders Chart.js graphs. |
| 13 | **Inventory & Warehouse CRUD** | Data & Backend | Asset management with RESTful HTTP methods (GET, POST, PUT, DELETE) and low-stock alerts. |
| 14 | **Library Management System** | Data & Backend | Relational book catalog and borrowing transactions with SQLite ACID data integrity. |
| 15 | **JSON to SQL / CSV Converter** | Data & Backend | Converts raw JSON arrays into `CREATE TABLE` DDL, batch `INSERT INTO` DML, and structured CSV. |
| 16 | **Nginx Access Log Analyzer** | Data & Backend | Parses raw Nginx access logs to aggregate 2xx/4xx/5xx status rates, top IPs, and suspicious paths. |
| 17 | **Tabular Data Cleaner & Imputation Studio** | Data & Backend | Raw data cleaning, deduplication, missing value imputation, and Pandas Python script export. |
| 18 | **Dataset Integration & Quality Control (QC)** | Data & Backend | Data health scoring, Tukey's IQR outlier detection, and relational dataset join simulation. |
| 19 | **Periodic Report & KPI Monitoring Dashboard**| Data & Backend | Operational report tracking across daily/weekly/monthly views with variance analysis. |
| 20 | **Spreadsheet Formula Simulator & Data Reshaper**| Data & Backend | XLOOKUP / VLOOKUP simulation, Pivot Table GroupBy matrix, and cross-platform SQL/Pandas code. |
| 21 | **Tech News & Feeds Scraper** | Utilities & Hardware | Automated live feed scraper extracting top tech publications and news headlines. |
| 22 | **API Health & Latency Checker** | Utilities & Hardware | Real-time HTTP REST API endpoint pinger measuring latency (ms) with formatted JSON responses. |
| 23 | **Image Optimizer & Converter** | Utilities & Hardware | Client-side Canvas image resizer and WebP / PNG / JPG converter saving up to 70% file size. |
| 24 | **Real-Time Currency Calculator** | Utilities & Hardware | Live global exchange rates (USD, IDR, EUR, SGD, JPY) with offline LocalStorage caching. |
| 25 | **Typing Speed & Accuracy Test** | Utilities & Hardware | Typing test calculating Words Per Minute (WPM) and accuracy percentage over a 60-second timer. |
| 26 | **RAID Storage & Capacity Calculator** | Utilities & Hardware | Usable storage, parity overhead, and drive fault tolerance calculator for RAID 0, 1, 5, 6, and 10. |
| 27 | **PC Power Supply (PSU) Calculator** | Utilities & Hardware | Component wattage estimator (CPU, GPU, RAM, NVMe, HDD, Fans) for enterprise PC deployment. |
| 28 | **Regex Tester & Validator** | Utilities & Hardware | Real-time regular expression evaluator with visual match highlighting and common pattern presets. |
| 29 | **Markdown Live Editor & Preview** | Utilities & Hardware | Markdown editor with real-time semantic HTML rendering, tables, code blocks, and HTML copy. |

---

## Live Deployment

The live suite is permanently hosted and accessible on GitHub Pages:  
**[https://infinitenull.github.io/](https://infinitenull.github.io/)**

---

## Contact & Links
* **Developer:** Rizki Ananda, S.Kom
* **GitHub Profile:** [https://github.com/InfiniteNull](https://github.com/InfiniteNull)
* **Almamater:** S1 Informatika — Universitas Potensi Utama
