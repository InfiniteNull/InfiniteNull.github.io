# Web Tools & Engineering Suite

🌐 **English** | [🇮🇩 Switch to Indonesian (Bahasa Indonesia)](README_ID.md)

> **Unified Developer & IT Infrastructure Suite (22 Interactive Production-Ready Tools)**  
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
    *Architected & tested Nginx Media Server on Linux Virtual Machines, benchmarked 4 video streaming protocols (RTMP, HLS, RTSP, HTTP), conducted network security vulnerability assessments, and developed face-recognition attendance & chatbot prototypes.*
  * **IT Support** — *PT Bank Sinarmas, Tbk* (Dec 2023 | Freelance / Outsourcing Vendor | KC Medan Mangkubumi)  
    *Executed enterprise PC deployment: hardware assembly, secure user data migration, OS configuration, structured cable management, and peripheral network domain onboarding.*
  * **SHUNA AI Project Lead** — *MSIB Batch 6 Kampus Merdeka @ Skilvul* (Score: 81.8 — Machine Learning & Natural Language Processing).
  * **Organizational Leadership** — *HMPS Informatika Universitas Potensi Utama* (Internal administrative governance).
* **Technical Toolkit:** Burp Suite, OWASP ZAP, OSINT, Linux VM, Nginx, Python, Node.js, SQLite, JavaScript ES6+, Tailwind CSS.

---

## Overview & Architecture

This repository hosts a high-performance **22-Tool IT & Software Engineering Suite** built with a clean, modular client-side architecture and polyglot backend foundations. The tools are organized into **4 Core Pillars**:

1. **Networking & Server Infrastructure (5 Tools):** IPv4 VLSM subnetting, firewall command generation (UFW / iptables / Mikrotik), data transfer bandwidth calculation, streaming egress & disk estimation (RTMP/HLS), and Linux crontab scheduling.
2. **System Security & Hardening (6 Tools):** Bcrypt & JWT auth simulation, HTTP security headers analyzer (CSP/HSTS/CORS), cryptographic hash verifiers (SHA-256/SHA-512/MD5), password entropy estimators, multi-format payload encoders, and JWT signature debuggers.
3. **Database & Backend Engineering (5 Tools):** VADER NLP sentiment data ingestion, SQLite inventory asset CRUD, relational library transaction management, JSON-to-SQL batch converter, and Nginx access log analyzers.
4. **Hardware & Web Utilities (6 Tools):** REST API latency health pinger, canvas image optimizer, real-time currency exchange calculator, typing speed benchmark (WPM), RAID array capacity calculator (RAID 0/1/5/6/10), and PC power supply (PSU) wattage estimators.

---

## Directory Structure

```text
portfolio-hub/
├── index.html                  # Main SPA Dashboard & Workspace Modal Container
├── styles.css                  # Custom styling, animations & Dark/Light mode engine
├── app.js                      # Master Controller, 22-Tool Registry & Modal Manager
├── js/                         # Modular Interactive Tool Scripts
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
│   ├── library-sandbox.js         # Relational SQL Borrowing & Transaction Engine
│   ├── json-sql-converter.js      # JSON Array to SQL INSERT & Schema Generator
│   ├── log-analyzer.js            # Nginx Access Log Regex Parser & Top IP Aggregator
│   ├── news-scraper.js            # Tech News Scraper & Feed Aggregator
│   ├── api-checker.js             # HTTP REST API Latency & Status Checker
│   ├── image-optimizer.js         # Canvas Image Compressor & WebP Converter
│   ├── currency-converter.js      # Real-Time Currency Exchange & Offline Cache
│   ├── typing-test.js             # WPM & Typing Accuracy Benchmark Engine
│   ├── raid-calculator.js         # RAID 0/1/5/6/10 Storage & Fault Tolerance Engine
│   ├── psu-calculator.js          # Hardware Component Wattage & PSU Estimator
│   ├── regex-tester.js            # Interactive RegExp Match & Group Highlight Sandbox
│   ├── markdown-preview.js        # Markdown to Semantic HTML Live Preview Editor
│   └── code-snippets.js           # Full Source Code Database for Code Inspector
├── python-modules/             # Standalone Python Source Modules
│   ├── analyzer.py                # Pandas & VADER Sentiment Script
│   ├── scraper.py                 # BeautifulSoup4 Web Scraper
│   └── requirements.txt           # Python Environment Dependencies
├── backend-modules/            # Standalone Node.js Backend Modules
│   └── package.json               # Express, SQLite3, Bcrypt, JWT Dependencies
├── PANDUAN_WAWANCARA.md        # Technical Interview Guide & Architecture Q&A
└── README.md                   # Primary Repository Documentation
```

---

## 22 Integrated Tools Catalog

| No | Tool Name | Category | Key Capabilities |
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
| 12 | **AI Sentiment & Data Analyzer** | Database & Backend | Ingests CSV files, detects review columns, calculates VADER NLP scores, and renders Chart.js graphs. |
| 13 | **Inventory & Warehouse CRUD** | Database & Backend | Asset management with RESTful HTTP methods (GET, POST, PUT, DELETE) and low-stock alerts. |
| 14 | **Library Management System** | Database & Backend | Relational book catalog and borrowing transactions with SQLite ACID data integrity. |
| 15 | **JSON to SQL / CSV Converter** | Database & Backend | Converts raw JSON arrays into `CREATE TABLE` DDL, batch `INSERT INTO` DML, and structured CSV. |
| 16 | **Nginx Access Log Analyzer** | Database & Backend | Parses raw Nginx access logs to aggregate 2xx/4xx/5xx status rates, top IPs, and suspicious paths. |
| 17 | **Tech News & Feeds Scraper** | Utilities & Hardware | Automated live feed scraper extracting top tech publications and news headlines. |
| 18 | **API Health & Latency Checker** | Utilities & Hardware | Real-time HTTP REST API endpoint pinger measuring latency (ms) with formatted JSON responses. |
| 19 | **Image Optimizer & Converter** | Utilities & Hardware | Client-side Canvas image resizer and WebP / PNG / JPG converter saving up to 70% file size. |
| 20 | **Real-Time Currency Calculator** | Utilities & Hardware | Live global exchange rates (USD, IDR, EUR, SGD, JPY) with offline LocalStorage caching. |
| 21 | **Typing Speed & Accuracy Test** | Utilities & Hardware | Typing test calculating Words Per Minute (WPM) and accuracy percentage over a 60-second timer. |
| 22 | **RAID Storage & Capacity Calculator** | Utilities & Hardware | Usable storage, parity overhead, and drive fault tolerance calculator for RAID 0, 1, 5, 6, and 10. |
| 23 | **PC Power Supply (PSU) Calculator** | Utilities & Hardware | Component wattage estimator (CPU, GPU, RAM, NVMe, HDD, Fans) for enterprise PC deployment. |
| 24 | **Regex Tester & Validator** | Utilities & Hardware | Real-time regular expression evaluator with visual match highlighting and common pattern presets. |
| 25 | **Markdown Live Editor & Preview** | Utilities & Hardware | Markdown editor with real-time semantic HTML rendering, tables, code blocks, and HTML copy. |

---

## Live Deployment

The live suite is permanently hosted and accessible on GitHub Pages:  
**[https://infinitenull.github.io/](https://infinitenull.github.io/)**

---

## Contact & Links
* **Developer:** Rizki Ananda, S.Kom
* **GitHub Profile:** [https://github.com/InfiniteNull](https://github.com/InfiniteNull)
* **Almamater:** S1 Informatika — Universitas Potensi Utama
