/**
 * app.js - Master Orchestrator for Dev & Data Portfolio Suite
 * Mengelola kartu 22 tools, pencarian, filter kategori, navigasi modal workspace, tema dark/light, dan i18n switcher.
 */

// Master Tools Registry Definition (22 All-in-One IT & Engineering Tools with ID & EN support)
const TOOLS_REGISTRY = [
  // ==========================================
  // KATEGORI 1: JARINGAN & SERVER (network)
  // ==========================================
  {
    id: "subnet-calculator",
    title: "IP Subnetting & VLSM Calculator",
    title_en: "IP Subnetting & VLSM Calculator",
    category: "network",
    techBadge: "IPv4 • CIDR • VLSM • Binary",
    techColor: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    icon: "network",
    description: "Kalkulator subnet IPv4 otomatis: hitung Network ID, Broadcast, Subnet Mask, Host Range, dan representasi biner.",
    desc_en: "Automatic IPv4 subnet calculator: compute Network ID, Broadcast, Subnet Mask, Usable Host Range, and binary representation.",
    renderFn: "renderSubnetCalculator",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Arsitektur Perhitungan Subnetting IPv4</h4>
        <p>Modul ini menerapkan operasi manipulasi bit biner (bitwise operations) standar RFC 791 / RFC 4632:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>IP to Integer:</strong> Mengonversi notasi desimal bertitik (dotted decimal) menjadi 32-bit unsigned integer.</li>
          <li><strong>Netmask & Wildcard:</strong> Menggeser bit <code>(~0 << (32 - CIDR))</code> untuk membentuk mask dan inverse bit untuk wildcard.</li>
          <li><strong>Network & Broadcast Range:</strong> Melakukan operasi <code>IP & Mask</code> (Network ID) dan <code>Network | Wildcard</code> (Broadcast).</li>
          <li><strong>Usable Hosts:</strong> Menghitung kapasitas $2^{(32 - CIDR)} - 2$ untuk alokasi host per departemen.</li>
        </ul>
      </div>
    `
  },
  {
    id: "firewall-generator",
    title: "Port Directory & Firewall Rules",
    title_en: "Port Directory & Firewall Rules",
    category: "network",
    techBadge: "Linux UFW • iptables • Mikrotik",
    techColor: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    icon: "shield",
    description: "Direktori pencarian port standar industri dan generator instan syntax command firewall Linux UFW, iptables, dan Mikrotik.",
    desc_en: "Industry standard port directory and instant command generator for Linux UFW, iptables, and Mikrotik RouterOS firewall rules.",
    renderFn: "renderFirewallGenerator",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Manajemen Port & Hardening Firewall</h4>
        <p>Menyederhanakan pembuatan aturan firewall jaringan pada layer 4 transport (TCP/UDP):</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Universal Port Database:</strong> Basis data port esensial (SSH, HTTP/HTTPS, Database, RTSP, RTMP).</li>
          <li><strong>Multi-Platform CLI Generator:</strong> Menghasilkan syntax presisi untuk Ubuntu UFW, CentOS/RedHat iptables, dan Mikrotik RouterOS.</li>
        </ul>
      </div>
    `
  },
  {
    id: "bandwidth-estimator",
    title: "Bandwidth & Data Transfer Estimator",
    title_en: "Bandwidth & Data Transfer Estimator",
    category: "network",
    techBadge: "Network Throughput • Migration",
    techColor: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    icon: "gauge",
    description: "Kalkulator estimasi durasi transfer data, migrasi server, backup berkala, dan throughput jaringan riil.",
    desc_en: "Estimates data backup & server migration duration accounting for network throughput and TCP/IP protocol overhead.",
    renderFn: "renderBandwidthEstimator",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Estimasi Throughput & TCP/IP Overhead</h4>
        <p>Menghitung waktu transfer data riil dengan memperhitungkan faktor latensi dan overhead protokol (efisiensi 80% - 90%).</p>
      </div>
    `
  },
  {
    id: "streaming-calculator",
    title: "Streaming Bitrate & Storage",
    title_en: "Streaming Bitrate & Storage Calculator",
    category: "network",
    techBadge: "RTMP • HLS • RTSP • Nginx Media",
    techColor: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    icon: "video",
    description: "Kalkulasi kebutuhan bandwidth egress live streaming (RTMP/HLS/RTSP) dan estimasi kapasitas disk recording Nginx.",
    desc_en: "Calculates egress live streaming bandwidth (RTMP, HLS, RTSP) and DVR recording disk storage for Nginx Media Servers.",
    renderFn: "renderStreamingCalculator",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Kalkulasi Infrastruktur Media Server</h4>
        <p>Dirancang berdasarkan pengalaman merancang Nginx Media Server pada Linux Virtual Machine:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Bandwidth Egress:</strong> Total bandwidth keluar = (Bitrate Video + Audio) $\times$ Jumlah Concurrent Viewers.</li>
          <li><strong>Storage DVR/VOD:</strong> Estimasi penyimpanan per jam dan akumulasi bulanan untuk arsip rekaman video streaming.</li>
        </ul>
      </div>
    `
  },
  {
    id: "cron-builder",
    title: "Cron Task Scheduler Builder",
    title_en: "Cron Task Scheduler Builder",
    category: "network",
    techBadge: "Linux Crontab • Shell Script",
    techColor: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    icon: "clock",
    description: "Generator visual ekspresi cron Linux untuk otomasi backup database, pemeliharaan server, dan penjadwalan script.",
    desc_en: "Visual Linux crontab 5-field generator with upcoming execution timeline simulation for automated maintenance & backup scripts.",
    renderFn: "renderCronBuilder",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Otomasi Server dengan Crontab</h4>
        <p>Memvisualisasikan ekspresi 5-field standar cron Linux (Menit, Jam, Hari/Bulan, Bulan, Hari/Minggu) serta mensimulasikan timeline 5 jadwal eksekusi berikutnya.</p>
      </div>
    `
  },

  // ==========================================
  // KATEGORI 2: KEAMANAN SISTEM (security)
  // ==========================================
  {
    id: "auth-sandbox",
    title: "Auth & Security Service",
    title_en: "Auth & Security Service",
    category: "security",
    techBadge: "Node.js • Bcrypt • JWT • SQLite",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "shield-check",
    description: "Sistem autentikasi aman dengan Bcrypt Password Hashing (Salt 10), JSON Web Token (JWT) bearer verification, dan database SQLite.",
    desc_en: "Secure authentication sandbox simulating Bcrypt password hashing (Salt 10), stateless JWT session authorization, and SQLite storage.",
    renderFn: "renderAuthSandbox",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Keamanan & Alur Autentikasi Modern</h4>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Password Hashing:</strong> Password dienkripsi dengan <em>Bcrypt salt rounds = 10</em> sebelum disimpan.</li>
          <li><strong>JWT Stateless Session:</strong> Token terenkripsi untuk otorisasi endpoint REST API.</li>
          <li><strong>Relational Storage:</strong> Data pengguna disimpan dengan constraint unik pada SQLite.</li>
        </ul>
      </div>
    `
  },
  {
    id: "security-headers",
    title: "Security Headers Analyzer",
    title_en: "Security Headers Analyzer",
    category: "security",
    techBadge: "OWASP • HSTS • CSP • CORS",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "shield-alert",
    description: "Audit implementasi HTTP security headers (CSP, HSTS, X-Frame-Options, MIME Sniffing) dan penilaian skor grade keamanan.",
    desc_en: "Audits HTTP security headers (CSP, HSTS, X-Frame-Options, CORS) against OWASP guidelines with security grading (A+ to F).",
    renderFn: "renderSecurityHeaders",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Web Hardening & Vulnerability Mitigation</h4>
        <p>Menganalisis header respon web untuk mencegah serangan umum seperti Clickjacking, Cross-Site Scripting (XSS), dan SSL Stripping.</p>
      </div>
    `
  },
  {
    id: "crypto-hash",
    title: "Crypto Hash & Integrity Verifier",
    title_en: "Crypto Hash & Integrity Verifier",
    category: "security",
    techBadge: "SHA-256 • SHA-512 • MD5 • HMAC",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "hash",
    description: "Generator hash kriptografis standar industri (SHA-256, SHA-512, MD5, HMAC) dan verifikasi pencocokan integritas data.",
    desc_en: "Cryptographic hash digest generator (SHA-256, SHA-512, MD5, HMAC) with real-time text and file checksum integrity verification.",
    renderFn: "renderCryptoHash",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Kriptografi & Verifikasi Integritas</h4>
        <p>Memanfaatkan Web Crypto API native untuk menghitung one-way cryptographic digest guna memastikan file atau password tidak mengalami tampering.</p>
      </div>
    `
  },
  {
    id: "password-entropy",
    title: "Password Entropy & Brute-Force",
    title_en: "Password Entropy & Brute-Force",
    category: "security",
    techBadge: "Entropy Math • Security Audit",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "key-round",
    description: "Analisis kekuatan kata sandi berdasarkan entropy bit dan estimasi waktu peretasan brute-force CPU vs GPU Cluster.",
    desc_en: "Measures password strength via Shannon entropy bits and estimates offline brute-force cracking duration on single CPU vs GPU clusters.",
    renderFn: "renderPasswordEntropy",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Pengukuran Entropi Informasi (Shannon Entropy)</h4>
        <p>Menghitung kekuatan kombinasi karakter $E = L \times \log_2(N)$ serta mensimulasikan waktu cracking menggunakan rig GPU modern.</p>
      </div>
    `
  },
  {
    id: "payload-encoder",
    title: "Security Payload Encoder / Decoder",
    title_en: "Security Payload Encoder / Decoder",
    category: "security",
    techBadge: "Base64 • URL • Hex • Unicode",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "binary",
    description: "Konversi instan multi-format string untuk Base64, Hexadecimal, URL-Encoding, HTML Entities, dan sanitasi payload.",
    desc_en: "Instant multi-format string conversion for Base64, Hexadecimal, URL-Encoding, HTML Entities, and security payload sanitization.",
    renderFn: "renderPayloadEncoder",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Alat Bantu Analisis Payload Keamanan</h4>
        <p>Mempermudah analisis data biner, decode authorization token Basic/Bearer, dan sanitasi string input dari karakter berbahaya.</p>
      </div>
    `
  },
  {
    id: "jwt-debugger",
    title: "JWT Inspector & Claims Debugger",
    title_en: "JWT Inspector & Claims Debugger",
    category: "security",
    techBadge: "JWT • JSON Claims • Signature",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "key",
    description: "Dekonstruksi struktur token JWT (Header, Payload Claims, Expiration Date) dan verifikasi HMACSHA256 signature.",
    desc_en: "Deconstructs JSON Web Token (Header, Payload claims, expiration timestamps) and visualizes HMACSHA256 signature verification.",
    renderFn: "renderJwtDebugger",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Dekonstruksi Token JWT</h4>
        <p>Membedah 3 bagian token JWT terpisah titik (Header.Payload.Signature) untuk memeriksa hak akses role dan timestamp kedaluwarsa.</p>
      </div>
    `
  },

  // ==========================================
  // KATEGORI 3: DATABASE & BACKEND (database)
  // ==========================================
  {
    id: "ai-data-analyzer",
    title: "AI Sentiment & Data Analyzer",
    title_en: "AI Sentiment & Data Analyzer",
    category: "database",
    techBadge: "Python • Pandas • VADER NLP",
    techColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    icon: "brain-circuit",
    description: "Analisis otomatis dataset survei & ulasan dari file CSV menggunakan algoritma VADER Sentiment NLP dan visualisasi Chart.js.",
    desc_en: "Automated feedback & review dataset processing from CSV files using VADER Sentiment NLP scoring and Chart.js visualization.",
    renderFn: "renderAiDataAnalyzer",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Arsitektur Pemrosesan Data & NLP</h4>
        <p>Membaca dataset tabular CSV, mengekstraksi kolom teks, dan menghitung compound polarity score sentiment secara otomatis.</p>
      </div>
    `
  },
  {
    id: "inventory-sandbox",
    title: "Inventory & Warehouse CRUD",
    title_en: "Inventory & Warehouse CRUD",
    category: "database",
    techBadge: "Node.js • SQLite • REST API",
    techColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    icon: "boxes",
    description: "Pengelolaan aset dan inventaris barang gudang berbasis database SQL dengan fitur alert stok menipis dan filter kategori.",
    desc_en: "Asset and warehouse stock management sandbox with RESTful CRUD operations, low-stock warnings, and SQL database queries.",
    renderFn: "renderInventorySandbox",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Arsitektur RESTful CRUD & Database SQL</h4>
        <p>Mengimplementasikan operasi Create, Read, Update, Delete dengan query SQL parameterized untuk mencegah SQL Injection.</p>
      </div>
    `
  },
  {
    id: "library-sandbox",
    title: "Library Management System",
    title_en: "Library Management System",
    category: "database",
    techBadge: "Node.js • SQLite • SQL Transactions",
    techColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    icon: "book-marked",
    description: "Sistem sirkulasi peminjaman buku perpustakaan dengan integritas relasional antar tabel dan validasi stok eksemplar.",
    desc_en: "Relational book circulation and borrowing system ensuring ACID database transaction consistency across relational SQL tables.",
    renderFn: "renderLibrarySandbox",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Integritas Transaksi Database Relasional</h4>
        <p>Memanfaatkan konsep ACID transaction pada database SQLite untuk memastikan ketersediaan buku berkurang secara konsisten saat dipinjam.</p>
      </div>
    `
  },
  {
    id: "json-sql-converter",
    title: "JSON to SQL / CSV Converter",
    title_en: "JSON to SQL / CSV Converter",
    category: "database",
    techBadge: "SQL Schema • Batch INSERT • CSV",
    techColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    icon: "database",
    description: "Mengonversi data JSON array menjadi perintah SQL INSERT INTO, skema CREATE TABLE, dan format CSV terstruktur.",
    desc_en: "Converts raw JSON arrays into CREATE TABLE DDL schemas, batch SQL INSERT INTO queries, and structured CSV records.",
    renderFn: "renderJsonSqlConverter",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Transformasi Data JSON ke Relasional</h4>
        <p>Memetakan tipe data dinamis JSON (String, Number, Boolean) ke tipe data kolom SQL (TEXT, INTEGER, REAL) secara otomatis.</p>
      </div>
    `
  },
  {
    id: "log-analyzer",
    title: "Nginx Access Log Analyzer",
    title_en: "Nginx Access Log Analyzer",
    category: "database",
    techBadge: "Log Parsing • Status Codes • Top IPs",
    techColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    icon: "file-text",
    description: "Parsing dan agregasi statistik raw access logs server: breakdown status code 200/404/500, top visitor IP, dan deteksi request mencurigakan.",
    desc_en: "Parses server access logs to aggregate HTTP 2xx/4xx/5xx status code ratios, top visitor IPs, and suspicious request paths.",
    renderFn: "renderLogAnalyzer",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Log Processing & Anomaly Detection</h4>
        <p>Menggunakan pola Regular Expression standar Combined Log Format untuk mengagregasi ribuan baris log server Nginx secara efisien.</p>
      </div>
    `
  },

  // ==========================================
  // KATEGORI 4: UTILITAS & HARDWARE (utility)
  // ==========================================
  {
    id: "news-scraper",
    title: "Tech News & Feeds Scraper",
    title_en: "Tech News & Feeds Scraper",
    category: "utility",
    techBadge: "Python • BeautifulSoup4 • Feed",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "newspaper",
    description: "Otomasi scraping data berita industri teknologi dan publikasi terkini dari platform berita web secara real-time.",
    desc_en: "Automated real-time scraping aggregator extracting top tech industry publications and trending news headlines.",
    renderFn: "renderNewsScraper",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Otomasi Web Scraping</h4>
        <p>Mengirimkan HTTP request dengan custom User-Agent dan mem-parsing elemen HTML untuk menyajikan feed berita bersih.</p>
      </div>
    `
  },
  {
    id: "api-checker",
    title: "API Health & Latency Checker",
    title_en: "API Health & Latency Checker",
    category: "utility",
    techBadge: "HTTP Ping • Latency ms • JSON Viewer",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "radio",
    description: "Pengujian responsivitas endpoint REST API (GET, POST, PUT, DELETE), waktu latensi (ms), dan viewer response JSON.",
    desc_en: "Real-time HTTP REST API endpoint pinger measuring latency (ms), HTTP status codes, and formatting JSON responses.",
    renderFn: "renderApiChecker",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Pengujian REST API Real-Time</h4>
        <p>Memanfaatkan Performance Navigation Timing API browser untuk mengukur Round Trip Time (RTT) latensi koneksi API.</p>
      </div>
    `
  },
  {
    id: "image-optimizer",
    title: "Image Optimizer & Converter",
    title_en: "Image Optimizer & Converter",
    category: "utility",
    techBadge: "HTML5 Canvas • WebP • Compression",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "image",
    description: "Kompresi ukuran foto hingga 70%, resize lebar gambar proporsional, dan konversi ke WebP / PNG / JPG di sisi client.",
    desc_en: "Client-side Canvas image compression & resizer converting to modern WebP / PNG / JPG formats, saving up to 70% file size.",
    renderFn: "renderImageOptimizer",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Pemrosesan Gambar di Sisi Client</h4>
        <p>Menggunakan HTML5 Canvas API untuk melakukan re-sampling piksel dan kompresi format WebP modern tanpa membebani server.</p>
      </div>
    `
  },
  {
    id: "currency-converter",
    title: "Real-Time Currency Calculator",
    title_en: "Real-Time Currency Calculator",
    category: "utility",
    techBadge: "Exchange Rates • Offline Cache",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "coins",
    description: "Konversi kurs mata uang dunia (USD, IDR, EUR, SGD, JPY, dll) dengan integrasi feed Open Exchange dan cache lokal.",
    desc_en: "Live foreign exchange converter (USD, IDR, EUR, SGD, JPY) integrating open exchange rate APIs with offline cache fallback.",
    renderFn: "renderCurrencyConverter",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Integrasi Feed Nilai Tukar</h4>
        <p>Mengambil data kurs valuta asing secara asinkron dengan strategi cache LocalStorage untuk performa instan.</p>
      </div>
    `
  },
  {
    id: "typing-test",
    title: "Typing Speed & Accuracy Test",
    title_en: "Typing Speed & Accuracy Test",
    category: "utility",
    techBadge: "WPM • Accuracy % • Real-time Stats",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "keyboard",
    description: "Uji kecepatan ketik dengan metrik standar WPM (Words Per Minute), persentase akurasi, dan timer 60 detik.",
    desc_en: "Typing speed benchmark measuring Words Per Minute (WPM) and accuracy percentage with a real-time 60-second timer.",
    renderFn: "renderTypingTest",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Engine Pengukuran Kecepatan Ketik</h4>
        <p>Menghitung statistik pengetikan secara real-time berdasarkan rumus standar industri: $\\text{WPM} = (\\text{Karakter}/5) / \\text{Menit}$.</p>
      </div>
    `
  },
  {
    id: "raid-calculator",
    title: "RAID Storage & Capacity Calculator",
    title_en: "RAID Storage & Capacity Calculator",
    category: "utility",
    techBadge: "RAID 0/1/5/6/10 • Storage Server",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "hard-drive",
    description: "Kalkulasi kapasitas usable, alokasi parity redundancy, dan toleransi kerusakan disk untuk RAID 0, 1, 5, 6, dan 10.",
    desc_en: "Calculates usable capacity, parity redundancy overhead, and disk failure fault tolerance for RAID 0, 1, 5, 6, and 10 arrays.",
    renderFn: "renderRaidCalculator",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Kalkulasi Redundansi RAID Array</h4>
        <p>Menghitung efisiensi penyimpanan fisik dan fault tolerance disk untuk standarisasi server storage institusi dan perbankan.</p>
      </div>
    `
  },
  {
    id: "psu-calculator",
    title: "PC Power Supply (PSU) Calculator",
    title_en: "PC Power Supply (PSU) Calculator",
    category: "utility",
    techBadge: "Hardware Wattage • PC Deployment",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "cpu",
    description: "Kalkulator kebutuhan daya listrik hardware PC (CPU, GPU, RAM, Storage, Fans) untuk standarisasi PC Deployment kantor.",
    desc_en: "Calculates total PC component wattage (CPU, GPU, RAM, NVMe, HDD, Fans) and recommends 80 PLUS power supply sizing.",
    renderFn: "renderPsuCalculator",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Standarisasi PC Deployment & Hardware</h4>
        <p>Menghitung total daya beban penuh (TDP) dan menambahkan safety headroom 40% untuk menjaga efisiensi power supply 80 PLUS.</p>
      </div>
    `
  },
  {
    id: "regex-tester",
    title: "Regex Tester & Validator",
    title_en: "Regex Tester & Validator",
    category: "utility",
    techBadge: "RegExp • Match Highlighting • Forms",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "code-2",
    description: "Pengujian Regular Expression interaktif dengan visual highlighting, deteksi capture groups, dan template pola umum.",
    desc_en: "Interactive Regular Expression testing sandbox with visual match highlighting, capture group index tracking, and pattern presets.",
    renderFn: "renderRegexTester",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Engine Evaluasi Regular Expression</h4>
        <p>Mengeksekusi pola RegExp JavaScript dengan flags global/case-insensitive dan memvisualisasikan posisi index setiap kecocokan string.</p>
      </div>
    `
  },
  {
    id: "markdown-preview",
    title: "Markdown Live Editor & Preview",
    title_en: "Markdown Live Editor & Preview",
    category: "utility",
    techBadge: "Markdown • HTML Parser • Live Render",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "file-code",
    description: "Editor dokumen markdown instan dengan live preview, rendering tabel, code syntax highlighting, dan tombol salin HTML.",
    desc_en: "Real-time Markdown editor with instant semantic HTML preview rendering, tables, checklists, code blocks, and HTML copy.",
    renderFn: "renderMarkdownPreview",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Parser Markdown Ringan Sisi Client</h4>
        <p>Mengonversi sintaks Markdown standar (Heading, Table, Code Block, Checklist) ke elemen HTML semantik secara real-time.</p>
      </div>
    `
  }
];

// App State Management
let currentCategory = 'all';
let currentSearch = '';
let activeTool = null;

// Toast Notification Function
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  let bgClass = "bg-slate-900 text-white dark:bg-white dark:text-slate-900";
  let iconName = "info";

  if (type === 'success') {
    bgClass = "bg-emerald-600 text-white";
    iconName = "check-circle";
  } else if (type === 'error') {
    bgClass = "bg-red-600 text-white";
    iconName = "alert-circle";
  }

  toast.className = `flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-xs font-semibold ${bgClass} transition-all duration-300 transform translate-y-2 opacity-0`;
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
};

// ==========================================
// RENDER TOOLS GRID
// ==========================================
window.renderToolsGrid = function() {
  const toolsGrid = document.getElementById('toolsGrid');
  const emptyState = document.getElementById('emptyState');
  if (!toolsGrid) return;

  toolsGrid.innerHTML = '';
  const lang = window.currentLang || 'id';

  const filteredTools = TOOLS_REGISTRY.filter(tool => {
    const title = (lang === 'en' && tool.title_en) ? tool.title_en : tool.title;
    const desc = (lang === 'en' && tool.desc_en) ? tool.desc_en : tool.description;

    const matchesCategory = currentCategory === 'all' || tool.category === currentCategory;
    const matchesSearch = title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          desc.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          tool.techBadge.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredTools.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    toolsGrid.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  toolsGrid.classList.remove('hidden');

  filteredTools.forEach(tool => {
    const title = (lang === 'en' && tool.title_en) ? tool.title_en : tool.title;
    const desc = (lang === 'en' && tool.desc_en) ? tool.desc_en : tool.description;
    const openLabel = lang === 'en' ? 'Open Workspace' : 'Buka Workspace';

    const card = document.createElement('div');
    card.className = "tool-card bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 cursor-pointer group";
    card.dataset.toolId = tool.id;

    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:scale-105 transition-transform duration-200">
            <i data-lucide="${tool.icon}" class="w-5 h-5"></i>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tool.techColor}">
            ${tool.techBadge}
          </span>
        </div>

        <div>
          <h3 class="font-bold text-slate-900 dark:text-white text-base group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            ${title}
          </h3>
          <p class="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
            ${desc}
          </p>
        </div>
      </div>

      <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span class="text-[11px] font-semibold text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 flex items-center gap-1 transition-colors">
          ${openLabel} <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </span>
        <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
      </div>
    `;

    card.addEventListener('click', () => openToolModal(tool));
    toolsGrid.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
};

// ==========================================
// MODAL WORKSPACE MANAGEMENT
// ==========================================
function openToolModal(tool) {
  activeTool = tool;
  const lang = window.currentLang || 'id';

  const toolModal = document.getElementById('toolModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTechBadge = document.getElementById('modalTechBadge');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalIcon = document.getElementById('modalIcon');
  const modalTabDemoContent = document.getElementById('modalTabDemoContent');
  const modalDocsBody = document.getElementById('modalDocsBody');

  const title = (lang === 'en' && tool.title_en) ? tool.title_en : tool.title;
  const desc = (lang === 'en' && tool.desc_en) ? tool.desc_en : tool.description;

  if (modalTitle) modalTitle.textContent = title;
  if (modalTechBadge) modalTechBadge.textContent = tool.techBadge;
  if (modalSubtitle) modalSubtitle.textContent = desc;
  if (modalIcon) modalIcon.setAttribute('data-lucide', tool.icon);

  // Set default tab to demo
  switchModalTab('demo');

  // Show modal
  if (toolModal) {
    toolModal.classList.remove('hidden');
    toolModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  // Render Tool interactive content
  if (modalTabDemoContent) {
    if (typeof window[tool.renderFn] === 'function') {
      window[tool.renderFn](modalTabDemoContent);
    } else {
      modalTabDemoContent.innerHTML = `<div class="p-8 text-center text-xs text-slate-400">Modul '${title}' siap dijalankan.</div>`;
    }
  }

  // Load Source Code snippet
  loadCodeSnippet(tool.id);

  // Load Architecture documentation
  if (modalDocsBody) {
    modalDocsBody.innerHTML = tool.docs || `<div class="p-8 text-center text-xs text-slate-400">Dokumentasi teknis lengkap tersedia pada file README.md repository.</div>`;
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeToolModal() {
  const toolModal = document.getElementById('toolModal');
  const modalTabDemoContent = document.getElementById('modalTabDemoContent');

  if (toolModal) {
    toolModal.classList.add('hidden');
    toolModal.classList.remove('flex');
  }
  document.body.style.overflow = '';
  activeTool = null;
  if (modalTabDemoContent) modalTabDemoContent.innerHTML = '';
}

function switchModalTab(tab) {
  const tabBtnDemo = document.getElementById('tabBtnDemo');
  const tabBtnCode = document.getElementById('tabBtnCode');
  const tabBtnDocs = document.getElementById('tabBtnDocs');

  const modalTabDemoContent = document.getElementById('modalTabDemoContent');
  const modalTabCodeContent = document.getElementById('modalTabCodeContent');
  const modalTabDocsContent = document.getElementById('modalTabDocsContent');

  // Reset tab button styles
  [tabBtnDemo, tabBtnCode, tabBtnDocs].forEach(btn => {
    if (!btn) return;
    btn.className = "modal-tab-btn py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition flex items-center gap-1.5";
  });

  // Hide all contents
  if (modalTabDemoContent) modalTabDemoContent.classList.add('hidden');
  if (modalTabCodeContent) modalTabCodeContent.classList.add('hidden');
  if (modalTabDocsContent) modalTabDocsContent.classList.add('hidden');

  if (tab === 'demo') {
    if (tabBtnDemo) tabBtnDemo.className = "modal-tab-btn active py-3 border-b-2 border-sky-600 text-sky-600 dark:text-sky-400 font-semibold transition flex items-center gap-1.5";
    if (modalTabDemoContent) modalTabDemoContent.classList.remove('hidden');
  } else if (tab === 'code') {
    if (tabBtnCode) tabBtnCode.className = "modal-tab-btn active py-3 border-b-2 border-sky-600 text-sky-600 dark:text-sky-400 font-semibold transition flex items-center gap-1.5";
    if (modalTabCodeContent) modalTabCodeContent.classList.remove('hidden');
  } else if (tab === 'docs') {
    if (tabBtnDocs) tabBtnDocs.className = "modal-tab-btn active py-3 border-b-2 border-sky-600 text-sky-600 dark:text-sky-400 font-semibold transition flex items-center gap-1.5";
    if (modalTabDocsContent) modalTabDocsContent.classList.remove('hidden');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function loadCodeSnippet(toolId) {
  const codeLanguageLabel = document.getElementById('codeLanguageLabel');
  const codeFilePathLabel = document.getElementById('codeFilePathLabel');
  const modalCodeSnippet = document.getElementById('modalCodeSnippet');

  if (!window.TOOL_CODE_SNIPPETS || !window.TOOL_CODE_SNIPPETS[toolId]) {
    if (codeLanguageLabel) codeLanguageLabel.textContent = "Script";
    if (codeFilePathLabel) codeFilePathLabel.textContent = "Source Code Module";
    if (modalCodeSnippet) modalCodeSnippet.textContent = "// Source code sedang dimuat...";
    return;
  }

  const snippet = window.TOOL_CODE_SNIPPETS[toolId];
  if (codeLanguageLabel) codeLanguageLabel.textContent = snippet.language || "JavaScript";
  if (codeFilePathLabel) codeFilePathLabel.textContent = snippet.path || snippet.filename;
  if (modalCodeSnippet) modalCodeSnippet.textContent = snippet.code;
}

// ==========================================
// DEVELOPER PROFILE MODAL
// ==========================================
function openDevModal() {
  const aboutDevModal = document.getElementById('aboutDevModal');
  if (aboutDevModal) {
    aboutDevModal.classList.remove('hidden');
    aboutDevModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }
}

function closeDevModal() {
  const aboutDevModal = document.getElementById('aboutDevModal');
  if (aboutDevModal) {
    aboutDevModal.classList.add('hidden');
    aboutDevModal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// ==========================================
// THEME SWITCHER (DARK / LIGHT)
// ==========================================
function initTheme() {
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    if (themeIconSun) themeIconSun.classList.remove('hidden');
    if (themeIconMoon) themeIconMoon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    if (themeIconSun) themeIconSun.classList.add('hidden');
    if (themeIconMoon) themeIconMoon.classList.remove('hidden');
  }
}

function toggleTheme() {
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  if (isDark) {
    if (themeIconSun) themeIconSun.classList.remove('hidden');
    if (themeIconMoon) themeIconMoon.classList.add('hidden');
  } else {
    if (themeIconSun) themeIconSun.classList.add('hidden');
    if (themeIconMoon) themeIconMoon.classList.remove('hidden');
  }
}

// ==========================================
// EVENT LISTENERS & INITIALIZATION
// ==========================================
function initApp() {
  initTheme();
  
  // Apply saved language or default to ID
  const savedLang = localStorage.getItem('app_lang') || 'id';
  if (typeof window.setLanguage === 'function') {
    window.setLanguage(savedLang);
  } else {
    renderToolsGrid();
  }

  // Language Switcher Toggle Button
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = window.currentLang === 'id' ? 'en' : 'id';
      if (typeof window.setLanguage === 'function') {
        window.setLanguage(nextLang);
      }
    });
  }

  // Search Input
  const searchInput = document.getElementById('toolSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderToolsGrid();
    });
  }

  // Category Filters
  const categoryFilterContainer = document.getElementById('categoryFilterContainer');
  if (categoryFilterContainer) {
    categoryFilterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-filter-btn');
      if (!btn) return;

      categoryFilterContainer.querySelectorAll('.category-filter-btn').forEach(b => {
        b.classList.remove('active');
        b.classList.add('text-slate-600', 'dark:text-slate-400');
      });

      btn.classList.add('active');
      btn.classList.remove('text-slate-600', 'dark:text-slate-400');
      currentCategory = btn.dataset.category;
      renderToolsGrid();
    });
  }

  // Modal Close buttons
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const toolModal = document.getElementById('toolModal');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeToolModal);
  if (toolModal) {
    toolModal.addEventListener('click', (e) => {
      if (e.target === toolModal) closeToolModal();
    });
  }

  // Modal Tabs
  const tabBtnDemo = document.getElementById('tabBtnDemo');
  const tabBtnCode = document.getElementById('tabBtnCode');
  const tabBtnDocs = document.getElementById('tabBtnDocs');
  if (tabBtnDemo) tabBtnDemo.addEventListener('click', () => switchModalTab('demo'));
  if (tabBtnCode) tabBtnCode.addEventListener('click', () => switchModalTab('code'));
  if (tabBtnDocs) tabBtnDocs.addEventListener('click', () => switchModalTab('docs'));

  // Copy Code Button
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const modalCodeSnippet = document.getElementById('modalCodeSnippet');
      if (!modalCodeSnippet) return;
      navigator.clipboard.writeText(modalCodeSnippet.textContent).then(() => {
        showToast(window.currentLang === 'en' ? "Source code copied to clipboard!" : "Source code berhasil disalin ke clipboard!", "success");
      }).catch(() => {
        showToast("Gagal menyalin source code", "error");
      });
    });
  }

  // Developer Profile Modal
  const aboutDevBtn = document.getElementById('aboutDevBtn');
  const aboutDevModal = document.getElementById('aboutDevModal');
  const aboutDevModalCloseBtn = document.getElementById('aboutDevModalCloseBtn');
  const viewInterviewDocBtn = document.getElementById('viewInterviewDocBtn');

  if (aboutDevBtn) aboutDevBtn.addEventListener('click', openDevModal);
  if (viewInterviewDocBtn) viewInterviewDocBtn.addEventListener('click', openDevModal);
  if (aboutDevModalCloseBtn) aboutDevModalCloseBtn.addEventListener('click', closeDevModal);
  if (aboutDevModal) {
    aboutDevModal.addEventListener('click', (e) => {
      if (e.target === aboutDevModal) closeDevModal();
    });
  }

  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);

  // Keyboard Shortcuts (Esc to close modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const toolModal = document.getElementById('toolModal');
      const aboutDevModal = document.getElementById('aboutDevModal');
      if (toolModal && !toolModal.classList.contains('hidden')) closeToolModal();
      if (aboutDevModal && !aboutDevModal.classList.contains('hidden')) closeDevModal();
    }
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Ensure startup on DOM ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
