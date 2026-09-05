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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">IPv4 Subnetting Architecture & Bitwise Logic</h4>
        <p>Implements standard RFC 791 / RFC 4632 bitwise manipulation operations:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>IP to Integer:</strong> Converts dotted decimal string notation into a 32-bit unsigned integer.</li>
          <li><strong>Netmask & Wildcard:</strong> Shifts bits <code>(~0 << (32 - CIDR))</code> to construct subnet mask and bitwise inverse for wildcard.</li>
          <li><strong>Network & Broadcast Range:</strong> Executes <code>IP & Mask</code> (Network ID) and <code>Network | Wildcard</code> (Broadcast).</li>
          <li><strong>Usable Hosts:</strong> Computes $2^{(32 - CIDR)} - 2$ capacity for departmental IP allocation.</li>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Port Management & Firewall Hardening</h4>
        <p>Streamlines Layer 4 transport protocol (TCP/UDP) security rule configurations:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Universal Port Directory:</strong> Essential standard service ports database (SSH, HTTP/HTTPS, Database, RTSP, RTMP).</li>
          <li><strong>Multi-Platform CLI Generator:</strong> Generates exact syntax for Ubuntu UFW, CentOS/RHEL iptables, and Mikrotik RouterOS.</li>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Throughput Estimation & TCP/IP Overhead</h4>
        <p>Calculates real-world data transfer times by factoring in protocol headers and network latency efficiency (80% - 90%).</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Media Server Infrastructure Sizing</h4>
        <p>Designed based on practical experience architecting Nginx Media Servers on Linux Virtual Machines:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Egress Bandwidth:</strong> Total outbound bandwidth = (Video Bitrate + Audio) $\times$ Concurrent Viewers.</li>
          <li><strong>DVR/VOD Storage:</strong> Hourly and monthly storage estimations for continuous stream recording archives.</li>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Server Automation with Crontab</h4>
        <p>Visualizes standard Linux 5-field cron syntax (Minute, Hour, Day of Month, Month, Day of Week) and simulates the next 5 upcoming run times.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Modern Authentication & Security Architecture</h4>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Password Hashing:</strong> Passwords hashed with <em>Bcrypt salt rounds = 10</em> before database persistence.</li>
          <li><strong>JWT Stateless Session:</strong> Cryptographically signed bearer tokens for REST API authorization.</li>
          <li><strong>Relational Storage:</strong> Secure storage with unique username constraints on SQLite.</li>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Web Hardening & Vulnerability Mitigation</h4>
        <p>Analyzes HTTP response headers to defend against common web vectors including Clickjacking, Cross-Site Scripting (XSS), and SSL Stripping.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Cryptography & Integrity Verification</h4>
        <p>Leverages native Web Crypto API to calculate one-way cryptographic digests to guarantee files and payloads remain tamper-free.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Shannon Entropy & Brute-Force Modeling</h4>
        <p>Calculates character pool strength $E = L \times \log_2(N)$ and simulates offline cracking duration across CPU vs multi-GPU compute rigs.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Security Payload Analysis Toolkit</h4>
        <p>Facilitates binary stream inspections, Basic/Bearer authorization token decoding, and string sanitization against dangerous injections.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">JWT Token Structure Deconstruction</h4>
        <p>Parses 3 dot-delimited token segments (Header.Payload.Signature) to inspect role permissions and expiration timestamps.</p>
      </div>
    `
  },

  // ==========================================
  // KATEGORI 3: DATABASE & BACKEND (database)
  // ==========================================
  {
    id: "ai-data-analyzer",
    title: "NLP Sentiment & Data Analyzer",
    title_en: "NLP Sentiment & Data Analyzer",
    category: "database",
    techBadge: "Python • Pandas • VADER NLP",
    techColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    icon: "bar-chart-3",
    description: "Analisis dataset survei & ulasan teks dari file CSV menggunakan algoritma leksikon VADER NLP dan visualisasi Chart.js.",
    desc_en: "Processes survey & review datasets from CSV files using rule-based VADER NLP lexicon scoring and Chart.js visualization.",
    renderFn: "renderAiDataAnalyzer",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Arsitektur Pemrosesan Leksikon NLP & Vektorisasi Data</h4>
        <p>Modul analisis teks deterministik berbasis aturan (rule-based NLP) menggunakan kamus leksikon VADER untuk evaluasi sentimen terstruktur:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Text Normalization & Tokenization:</strong> Pembersihan string, penanganan intensitas tanda baca, dan filtering leksikon.</li>
          <li><strong>Compound Valence Scoring:</strong> Menghitung nilai compound polarity score dengan normalisasi matematis.</li>
          <li><strong>Data Aggregation:</strong> Agregasi distribusi rating dan visualisasi statistik via Chart.js.</li>
        </ul>
      </div>
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">NLP Lexicon Processing & Data Vectorization</h4>
        <p>Deterministic rule-based NLP text analysis engine using VADER lexicon scoring for structured sentiment evaluation:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Text Normalization & Tokenization:</strong> String cleaning, punctuation emphasis handling, and lexicon lookup.</li>
          <li><strong>Compound Valence Scoring:</strong> Calculates normalized compound polarity scores mathematically.</li>
          <li><strong>Data Aggregation:</strong> Rating distributions and statistical summaries visualized via Chart.js.</li>
        </ul>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">RESTful CRUD & SQL Database Architecture</h4>
        <p>Implements Create, Read, Update, and Delete operations with parameterized SQL queries to prevent SQL injection vulnerabilities.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Relational Database Transaction Integrity</h4>
        <p>Utilizes ACID transaction concepts on SQLite to guarantee consistent book copy stock deduction upon checkout.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">JSON to Relational Data Transformation</h4>
        <p>Automatically maps dynamic JSON primitives (String, Number, Boolean) to relational SQL column types (TEXT, INTEGER, REAL).</p>
      </div>
    `
  },
  {
    id: "log-analyzer",
    title: "Nginx Access Log Analyzer",
    title_en: "Nginx Access Log Analyzer",
    category: "database",
    techBadge: "Log Parsing • Status Codes • Top IPs",
    icon: "file-text",
    description: "Parsing dan agregasi statistik raw access logs server: breakdown status code 200/404/500, top visitor IP, dan deteksi request mencurigakan.",
    desc_en: "Parses server access logs to aggregate HTTP 2xx/4xx/5xx status code ratios, top visitor IPs, and suspicious request paths.",
    renderFn: "renderLogAnalyzer",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Log Processing & Anomaly Detection</h4>
        <p>Menggunakan pola Regular Expression standar Combined Log Format untuk mengagregasi ribuan baris log server Nginx secara efisien.</p>
      </div>
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Log Processing & Anomaly Detection</h4>
        <p>Uses regular expression pattern matching on Combined Log Format to aggregate thousands of server access entries efficiently.</p>
      </div>
    `
  },
  {
    id: "data-cleaner-studio",
    title: "Tabular Data Cleaner & Imputation Studio",
    title_en: "Tabular Data Cleaner & Imputation Studio",
    category: "database",
    techBadge: "Python Pandas • Data Wrangling • Imputation",
    techColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
    icon: "filter",
    description: "Pembersihan dataset kotor: penanganan missing values (imputasi mean/median/mode), deduplikasi, standardisasi teks/tanggal, dan export Python Pandas.",
    desc_en: "End-to-end data wrangling: handles missing values (imputation), row deduplication, text and ISO-8601 date formatting, and Pandas script export.",
    renderFn: "renderDataCleanerStudio",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Arsitektur Pipeline Data Wrangling & Preparation</h4>
        <p>Menerapkan standar pembersihan data tabular deterministik:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Deduplikasi Baris:</strong> Eliminasi record ganda menggunakan serialisasi hash kunci.</li>
          <li><strong>Imputasi Missing Values:</strong> Penanganan nilai kosong numerik menggunakan Median (robust terhadap outlier) dan Modus untuk data kategorikal.</li>
          <li><strong>Standardisasi ISO-8601:</strong> Penyeragaman format string tanggal ke format standar internasional <code>YYYY-MM-DD</code>.</li>
        </ul>
      </div>
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Data Wrangling & Preparation Pipeline Architecture</h4>
        <p>Applies standard deterministic tabular data cleaning operations:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Row Deduplication:</strong> Eliminates duplicate records using compound key hash serialization.</li>
          <li><strong>Missing Value Imputation:</strong> Handles missing numeric values with Median (outlier-robust) and Mode for categorical columns.</li>
          <li><strong>ISO-8601 Standardization:</strong> Normalizes heterogeneous date strings into universal <code>YYYY-MM-DD</code> format.</li>
        </ul>
      </div>
    `
  },
  {
    id: "data-qc-inspector",
    title: "Dataset Integration & Quality Control (QC) Inspector",
    title_en: "Dataset Integration & Quality Control (QC) Inspector",
    category: "database",
    techBadge: "Data Quality • Table Join • IQR Outlier • QC Audit",
    techColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
    icon: "clipboard-check",
    description: "Audit skor kesehatan data (Completeness & Validity), deteksi outlier statistik Tukey IQR, dan simulasi Relational Table Join (Inner/Left/Right/Full).",
    desc_en: "Data health audit, Tukey's IQR statistical outlier detection, and relational dataset join simulator with orphan record mismatch alerts.",
    renderFn: "renderDataQcInspector",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Integrasi Dataset & Quality Control (QC)</h4>
        <p>Evaluasi menyeluruh terhadap integritas relasional dan distribusi statistik data:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Tukey's Fences IQR:</strong> Menandai anomali numerik pada batas $Q_1 - 1.5 \\times \\text{IQR}$ dan $Q_3 + 1.5 \\times \\text{IQR}$.</li>
          <li><strong>Relational Merge & Join:</strong> Penggabungan dataset multidimensi dengan deteksi otomatis rekaman orphan / foreign key mismatch.</li>
        </ul>
      </div>
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Dataset Integration & Quality Control (QC)</h4>
        <p>Comprehensive evaluation of relational integrity and statistical data distributions:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Tukey's Fences IQR:</strong> Flags numeric anomalies outside $Q_1 - 1.5 \\times \\text{IQR}$ and $Q_3 + 1.5 \\times \\text{IQR}$.</li>
          <li><strong>Relational Merge & Join:</strong> Multi-table dataset integration with automated orphan record / foreign key mismatch alerts.</li>
        </ul>
      </div>
    `
  },
  {
    id: "kpi-monitoring-dashboard",
    title: "Laporan Berkala & KPI Monitoring Dashboard",
    title_en: "Periodic Report & KPI Monitoring Dashboard",
    category: "database",
    techBadge: "Operational Analytics • Variance • Time Series",
    techColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
    icon: "trending-up",
    description: "Monitoring laporan administrasi berkala (Harian, Mingguan, Bulanan): kalkulasi target vs realisasi, achievement rate %, varians, dan visualisasi chart.",
    desc_en: "Administrative and operational periodic report tracking (Daily, Weekly, Monthly) with target vs actual variance analysis and Chart.js visuals.",
    renderFn: "renderKpiMonitoringDashboard",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Administrasi & Monitoring Kinerja Operasional</h4>
        <p>Alat bantu rekapitulasi data harian/mingguan/bulanan untuk pelaporan manajemen eksekutif:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Analisis Varians:</strong> Menghitung deviasi $\\Delta = \\text{Realisasi} - \\text{Target}$ untuk evaluasi efisiensi operasional.</li>
          <li><strong>Achievement Rate:</strong> Persentase pemenuhan kuota target per divisi/cabang.</li>
        </ul>
      </div>
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Administrative & Operational Performance Tracking</h4>
        <p>Periodic reporting and data recapitulation tool for executive management visibility:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Variance Analysis:</strong> Calculates deviation $\\Delta = \\text{Actual} - \\text{Target}$ to assess operational efficiency.</li>
          <li><strong>Achievement Rate:</strong> Percentage of target quota fulfillment across divisions and branches.</li>
        </ul>
      </div>
    `
  },
  {
    id: "spreadsheet-formula-engine",
    title: "Spreadsheet Formula Simulator & Data Reshaper",
    title_en: "Spreadsheet Formula Simulator & Data Reshaper",
    category: "database",
    techBadge: "Excel XLOOKUP • Pivot Table • SQL GroupBy",
    techColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
    icon: "table",
    description: "Simulasi rumus formula data spreadsheet (XLOOKUP / VLOOKUP), pembuatan matriks Pivot Table GroupBy, dan konversi sintaks otomatis ke SQL dan Pandas.",
    desc_en: "Simulates spreadsheet data operations (XLOOKUP, VLOOKUP, INDEX-MATCH), pivot table grouping matrices, and instant SQL / Python Pandas conversion.",
    renderFn: "renderSpreadsheetFormulaEngine",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Pengolahan Data & Transformasi Formula</h4>
        <p>Menjembatani logika pengolahan data spreadsheet perkantoran dengan rekayasa data modern:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Pencarian Relasional:</strong> Simulasi XLOOKUP/VLOOKUP dengan pencocokan baris instan.</li>
          <li><strong>Reshaping & Agregasi:</strong> Pembentukan matriks Pivot Table dengan fungsi SUM, AVERAGE, COUNT, MAX, MIN.</li>
          <li><strong>Multi-Platform Mapping:</strong> Menerjemahkan formula Excel ke klausa SQL dan fungsi Pandas secara akurat.</li>
        </ul>
      </div>
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Spreadsheet Logic & Formula Engineering</h4>
        <p>Bridges office spreadsheet calculation workflows with modern data engineering:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Relational Lookup:</strong> Simulates XLOOKUP/VLOOKUP with instant row matching.</li>
          <li><strong>Reshaping & Aggregation:</strong> Pivot table matrices with SUM, AVERAGE, COUNT, MAX, and MIN functions.</li>
          <li><strong>Multi-Platform Mapping:</strong> Translates Excel formulas directly into SQL clauses and Pandas code snippets.</li>
        </ul>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Automated Web Scraping Engine</h4>
        <p>Dispatches HTTP requests with customized User-Agents and parses HTML DOM elements to present a clean news feed.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Real-Time REST API Health & Latency Testing</h4>
        <p>Utilizes browser Performance Navigation Timing APIs to measure Round Trip Time (RTT) latency and HTTP status responses.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Client-Side Canvas Image Processing</h4>
        <p>Uses HTML5 Canvas API for pixel re-sampling and modern WebP compression without server-side compute overhead.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Foreign Exchange Feed Integration</h4>
        <p>Fetches asynchronous currency exchange rates with LocalStorage caching strategies for instantaneous responsiveness.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Typing Benchmark Engine</h4>
        <p>Calculates real-time metrics adhering to standard formula: $\\text{WPM} = (\\text{Characters}/5) / \\text{Minutes}$.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">RAID Array Redundancy Calculations</h4>
        <p>Calculates raw vs usable storage capacity and disk fault tolerance according to enterprise banking and storage standards.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">PC Deployment & Hardware Power Sizing</h4>
        <p>Calculates total thermal design power (TDP) with a 40% safety headroom to maintain 80 PLUS power supply efficiency.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Regular Expression Evaluation Engine</h4>
        <p>Executes JavaScript RegExp patterns with global/case-insensitive flags and maps character index spans for visual match highlighting.</p>
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
    `,
    docs_en: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Lightweight Client-Side Markdown Parser</h4>
        <p>Parses Markdown syntax (Headings, Tables, Code Blocks, Checklists) into semantic HTML elements in real time.</p>
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
    card.className = "tool-card bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between cursor-pointer group";
    card.dataset.toolId = tool.id;

    card.innerHTML = `
      <div class="space-y-3.5">
        <div class="flex items-center justify-between">
          <div class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
            <i data-lucide="${tool.icon}" class="w-4 h-4"></i>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-medium border bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700">
            ${tool.techBadge}
          </span>
        </div>

        <div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            ${title}
          </h3>
          <p class="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            ${desc}
          </p>
        </div>
      </div>

      <div class="pt-3.5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span class="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center gap-1.5 transition-colors">
          ${openLabel} <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform"></i>
        </span>
        <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">MODULAR</span>
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
window.activeTool = null;

function openToolModal(tool) {
  activeTool = tool;
  window.activeTool = tool;
  const lang = window.currentLang || 'id';

  const toolModal = document.getElementById('toolModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTechBadge = document.getElementById('modalTechBadge');
  const modalIcon = document.getElementById('modalIcon');
  
  const modalDemoContent = document.getElementById('modalDemoContent') || document.getElementById('modalTabDemoContent');
  const modalDocsContent = document.getElementById('modalDocsContent') || document.getElementById('modalDocsBody');

  const title = (lang === 'en' && tool.title_en) ? tool.title_en : tool.title;
  const desc = (lang === 'en' && tool.desc_en) ? tool.desc_en : tool.description;
  const docs = (lang === 'en' && tool.docs_en) ? tool.docs_en : tool.docs;

  if (modalTitle) modalTitle.textContent = title;
  if (modalTechBadge) modalTechBadge.textContent = tool.techBadge;
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
  if (modalDemoContent) {
    if (typeof window[tool.renderFn] === 'function') {
      window[tool.renderFn](modalDemoContent);
    } else {
      modalDemoContent.innerHTML = `<div class="p-8 text-center text-xs text-slate-400">Modul '${title}' siap dijalankan.</div>`;
    }
  }

  // Load Source Code snippet
  loadCodeSnippet(tool.id);

  // Load Architecture documentation
  if (modalDocsContent) {
    modalDocsContent.innerHTML = docs || `<div class="p-8 text-center text-xs text-slate-400">Dokumentasi teknis lengkap tersedia pada file README.md repository.</div>`;
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}
window.openToolModal = openToolModal;

function closeToolModal() {
  const toolModal = document.getElementById('toolModal');
  const modalDemoContent = document.getElementById('modalDemoContent') || document.getElementById('modalTabDemoContent');

  if (toolModal) {
    toolModal.classList.add('hidden');
    toolModal.classList.remove('flex');
  }
  document.body.style.overflow = '';
  activeTool = null;
  window.activeTool = null;
  if (modalDemoContent) modalDemoContent.innerHTML = '';
}

function switchModalTab(tab) {
  const tabBtnDemo = document.getElementById('tabBtnDemo');
  const tabBtnCode = document.getElementById('tabBtnCode');
  const tabBtnDocs = document.getElementById('tabBtnDocs');

  const modalDemoContent = document.getElementById('modalDemoContent') || document.getElementById('modalTabDemoContent');
  const modalCodeContent = document.getElementById('modalCodeContent') || document.getElementById('modalTabCodeContent');
  const modalDocsContent = document.getElementById('modalDocsContent') || document.getElementById('modalDocsBody') || document.getElementById('modalTabDocsContent');

  // Reset tab button styles
  [tabBtnDemo, tabBtnCode, tabBtnDocs].forEach(btn => {
    if (!btn) return;
    btn.className = "modal-tab-btn px-4 py-2.5 text-xs font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition flex items-center gap-2";
  });

  // Hide all contents
  if (modalDemoContent) modalDemoContent.classList.add('hidden');
  if (modalCodeContent) modalCodeContent.classList.add('hidden');
  if (modalDocsContent) modalDocsContent.classList.add('hidden');

  const activeClass = "modal-tab-btn active px-4 py-2.5 text-xs font-semibold border-b-2 border-slate-900 dark:border-slate-100 text-slate-900 dark:text-white transition flex items-center gap-2";

  if (tab === 'demo') {
    if (tabBtnDemo) tabBtnDemo.className = activeClass;
    if (modalDemoContent) modalDemoContent.classList.remove('hidden');
  } else if (tab === 'code') {
    if (tabBtnCode) tabBtnCode.className = activeClass;
    if (modalCodeContent) modalCodeContent.classList.remove('hidden');
  } else if (tab === 'docs') {
    if (tabBtnDocs) tabBtnDocs.className = activeClass;
    if (modalDocsContent) modalDocsContent.classList.remove('hidden');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function loadCodeSnippet(toolId) {
  const modalCodeLang = document.getElementById('modalCodeLang');
  const modalCodeSnippet = document.getElementById('modalCodeSnippet');

  if (!window.TOOL_CODE_SNIPPETS || !window.TOOL_CODE_SNIPPETS[toolId]) {
    if (modalCodeLang) modalCodeLang.textContent = "Script / Module";
    if (modalCodeSnippet) modalCodeSnippet.textContent = "// Source code sedang dimuat atau tersedia pada repository...";
    return;
  }

  const snippet = window.TOOL_CODE_SNIPPETS[toolId];
  if (modalCodeLang) modalCodeLang.textContent = (snippet.language || "JavaScript") + " • " + (snippet.path || snippet.filename || "module.js");
  if (modalCodeSnippet) modalCodeSnippet.textContent = snippet.code;
}

// ==========================================
// TECHNICAL INTERVIEW GUIDE MODAL
// ==========================================
function openInterviewGuide() {
  const modal = document.getElementById('interviewModal');
  const content = document.getElementById('interviewModalContent');
  if (!modal || !content) return;

  const isEn = window.currentLang === 'en';

  content.innerHTML = isEn ? `
    <div class="space-y-6">
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-sky-500"></span>
          1. SIMRS Core Enterprise Architecture (Laravel 11 & Clean Architecture)
        </h4>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
          Architected based on Indonesian Ministry of Health standards (<strong>Permenkes No. 24 / 2022</strong>) and <strong>BPJS V-Claim 2.0 Bridging</strong> specifications:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <li><strong>SatuSehat FHIR R4:</strong> Generates valid interoperability bundles containing <code>Encounter</code>, <code>Condition</code>, <code>MedicationRequest</code>, and <code>Observation</code> resources.</li>
          <li><strong>SOAP Medical Records:</strong> ICD-10 diagnosis selector (40+ live records) with automatic BMI and Triage categorizations.</li>
          <li><strong>Hospital Operational Indicators:</strong> Full implementation of Barber-Johnson formulas (BOR, ALOS, TOI, BTO) with real-time recalculation.</li>
          <li><strong>Billing Ledger:</strong> Real-time cross-module synchronization aggregating administrative tariffs, doctor consultation fees, pharmacy prescriptions, and lab orders with official receipt generation.</li>
        </ul>
      </div>

      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-purple-500"></span>
          2. Dev & Data Engineering Suite (29 Interactive Tools)
        </h4>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
          Engineered for systems administration, networking, security assessments, and statistical data cleaning:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <li><strong>Networking:</strong> 32-bit bitwise IPv4 subnetting & VLSM calculations adhering to RFC 791/4632.</li>
          <li><strong>Data Cleaning & QC:</strong> Statistical outlier detection using $Q1 - 1.5 \times \text{IQR}$, Z-Score, Min-Max Normalization, and deterministic regex formula parsing.</li>
          <li><strong>System Security & Cryptography:</strong> Password entropy analysis ($E = L \times \log_2(N)$), SHA-256/MD5 hashing, JWT base64url decoding, and security headers audit.</li>
        </ul>
      </div>

      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          3. Real-world IT Support & Research Track Record
        </h4>
        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <li><strong>Nginx Media Server Research:</strong> Virtual Machine deployment benchmarking RTMP, HLS, RTSP, and HTTP protocols, firewall hardening, and VAPT assessment.</li>
          <li><strong>Banking PC Deployment (Bank Sinarmas):</strong> Full hardware setup, secure data profile migrations, domain onboarding, and peripheral configuration for banking operations.</li>
        </ul>
      </div>
    </div>
  ` : `
    <div class="space-y-6">
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-sky-500"></span>
          1. Arsitektur SIMRS Core Enterprise (Laravel 11 & Standar Kemenkes RI)
        </h4>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
          Dirancang berdasarkan regulasi <strong>Permenkes No. 24 Tahun 2022</strong> dan integrasi <strong>BPJS V-Claim 2.0</strong>:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <li><strong>SatuSehat FHIR R4:</strong> Generator bundle interoperabilitas resmi Kemenkes (resource <code>Encounter</code>, <code>Condition</code>, <code>MedicationRequest</code>, dan <code>Observation</code>).</li>
          <li><strong>RME SOAP & ICD-10:</strong> Pencarian live 40+ kode ICD-10 klinis, kalkulasi otomatis BMI, dan penentuan prioritas triage IGD.</li>
          <li><strong>Indikator Barber-Johnson:</strong> Formula matematis BOR, ALOS, TOI, BTO untuk evaluasi utilisasi tempat tidur rumah sakit.</li>
          <li><strong>Billing Ledger & Kwitansi:</strong> Rekonsiliasi kasir lintas modul (admisi, tindakan, farmasi, lab) dengan modal cetak kwitansi resmi.</li>
        </ul>
      </div>

      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-purple-500"></span>
          2. Dev & Data Engineering Suite (29 Interactive Tools)
        </h4>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
          Suite perkakas mandiri untuk administrasi sistem, jaringan, audit keamanan, dan analisis data:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <li><strong>Jaringan & Server:</strong> Kalkulator subnetting IPv4 bitwise 32-bit, VLSM generator, estimasi throughput jaringan, dan generator rules firewall (Linux UFW, iptables, Mikrotik).</li>
          <li><strong>Data Cleaner & QC:</strong> Deteksi pencilan statistik IQR ($Q1 - 1.5 \times \text{IQR}$), Z-Score, normalisasi Min-Max, dan spreadsheet formula parser.</li>
          <li><strong>Keamanan Sistem & VAPT:</strong> Analisis entropi password Shannon, kalkulator hash SHA-256/MD5, debugger JWT base64url, dan audit security headers HTTP.</li>
        </ul>
      </div>

      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          3. Pengalaman Lapangan IT Support & Riset Infrastruktur
        </h4>
        <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <li><strong>IT Researcher (Adzkia Kedinasan):</strong> Perancangan Nginx Media Server Linux VM, pengujian komparatif 4 protokol streaming (RTMP, HLS, RTSP, HTTP), dan pengujian VAPT.</li>
          <li><strong>IT Support Deployment (Bank Sinarmas):</strong> Perakitan hardware desktop, migrasi data profil user, instalasi OS, dan konfigurasi printer slip/scanner hingga terhubung ke domain internal bank.</li>
        </ul>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeInterviewGuide() {
  const modal = document.getElementById('interviewModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
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
// INTERACTIVE TERMINAL LOGIC
// ==========================================
window.runTerminalCmd = function(cmd) {
  const terminalInput = document.getElementById('terminalInput');
  if (terminalInput) {
    terminalInput.value = cmd;
    window.submitTerminal();
  }
};

window.submitTerminal = function() {
  const inputEl = document.getElementById('terminalInput');
  const outputEl = document.getElementById('terminalOutput');
  if (!inputEl || !outputEl) return;

  const rawCmd = inputEl.value.trim();
  if (!rawCmd) return;
  const cmd = rawCmd.toLowerCase();
  inputEl.value = '';

  if (cmd === 'clear' || cmd === 'cls') {
    outputEl.innerHTML = '';
    return;
  }

  let responseHtml = '';

  if (cmd === 'help') {
    responseHtml = `
      <div class="text-slate-300 pl-3 border-l-2 border-slate-600 text-[10px] sm:text-xs space-y-1">
        <div><strong>Available Commands:</strong></div>
        <div>• <span class="text-emerald-400">whoami</span>: Ringkasan profil pengembang</div>
        <div>• <span class="text-emerald-400">stack</span>: Tech stack backend, frontend, & sistem</div>
        <div>• <span class="text-emerald-400">projects</span>: Daftar sistem produksi utama</div>
        <div>• <span class="text-emerald-400">simrs</span>: Buka aplikasi SIMRS Core</div>
        <div>• <span class="text-emerald-400">devtools</span>: Buka workspace 29 Web Tools</div>
        <div>• <span class="text-emerald-400">contact</span>: Informasi kontak & GitHub</div>
        <div>• <span class="text-emerald-400">clear</span>: Bersihkan layar terminal</div>
      </div>
    `;
  } else if (cmd === 'whoami') {
    responseHtml = `
      <div class="text-slate-300 pl-3 border-l-2 border-emerald-500/50">
        <strong>Rizki Ananda, S.Kom</strong> (@InfiniteNull)<br>
        <span class="text-slate-400 text-[10px]">S1 Informatika • Universitas Potensi Utama</span><br>
        <span class="text-slate-400 text-[10px]">Track Record: IT Researcher (Adzkia Kedinasan), IT Support Deployment (Bank Sinarmas)</span>
      </div>
    `;
  } else if (cmd === 'stack') {
    responseHtml = `
      <div class="text-sky-300 pl-3 border-l-2 border-sky-500/50 text-[10px] sm:text-xs">
        {<br>
        &nbsp;&nbsp;"backend": ["Laravel 11", "PHP 8.2", "Python", "FastAPI"],<br>
        &nbsp;&nbsp;"frontend": ["JavaScript ES6+", "TailwindCSS", "HTML5"],<br>
        &nbsp;&nbsp;"systems": ["Linux Virtual Machine", "Nginx Media Server", "Mikrotik RouterOS", "SQLite/MySQL"],<br>
        &nbsp;&nbsp;"security": ["VAPT Assessment", "OWASP Standards", "Burp Suite", "OSINT"]<br>
        }
      </div>
    `;
  } else if (cmd === 'projects') {
    responseHtml = `
      <div class="text-slate-300 pl-3 border-l-2 border-purple-500/50 text-[10px] sm:text-xs space-y-1.5">
        <div>1. <strong class="text-sky-400">SIMRS Core Enterprise</strong>: Hospital MIS (Permenkes 24/2022, BPJS V-Claim 2.0, SatuSehat FHIR R4)</div>
        <div>2. <strong class="text-purple-400">Dev & Data Engineering Suite</strong>: 29 interactive utilities (IPv4 CIDR, Firewall CLI, Outlier QC, Hashes)</div>
        <div>3. <strong class="text-emerald-400">SHUNA AI Data Engine</strong>: NLP Sentiment Studio, Tabular Retention Predictor, Time-Series Anomaly Detector</div>
        <div class="pt-1"><a href="#projects" class="text-emerald-400 underline hover:text-emerald-300">➔ Scroll ke kartu proyek</a></div>
      </div>
    `;
  } else if (cmd === 'simrs') {
    window.location.hash = '#simrs';
    responseHtml = `<div class="text-emerald-400 pl-3 border-l-2 border-emerald-500/50">Navigating to SIMRS Core Enterprise...</div>`;
  } else if (cmd === 'devtools' || cmd === 'tools') {
    window.location.hash = '#devtools';
    responseHtml = `<div class="text-emerald-400 pl-3 border-l-2 border-emerald-500/50">Navigating to Dev & Data Suite (29 Tools)...</div>`;
  } else if (cmd === 'shuna' || cmd === 'shuna-ai' || cmd === 'ai' || cmd === 'nlp' || cmd === 'ml') {
    window.location.hash = '#shuna-ai';
    responseHtml = `<div class="text-emerald-400 pl-3 border-l-2 border-emerald-500/50">Navigating to SHUNA AI (NLP & ML Analytics Engine)...</div>`;
  } else if (cmd === 'contact' || cmd === 'github') {
    responseHtml = `
      <div class="text-slate-300 pl-3 border-l-2 border-sky-500/50 text-[10px] sm:text-xs">
        GitHub: <a href="https://github.com/InfiniteNull" target="_blank" class="text-sky-400 underline">github.com/InfiniteNull</a><br>
        Location: Medan, Indonesia
      </div>
    `;
  } else if (cmd === 'date') {
    responseHtml = `<div class="text-slate-300 pl-3 border-l-2 border-slate-500">${new Date().toString()}</div>`;
  } else {
    responseHtml = `
      <div class="text-rose-400 pl-3 border-l-2 border-rose-500/50 text-[10px] sm:text-xs">
        command not found: <code>${rawCmd}</code>. Ketik <span class="text-white font-bold cursor-pointer underline" onclick="window.runTerminalCmd('help')">help</span> untuk melihat daftar perintah.
      </div>
    `;
  }

  const newEntry = document.createElement('div');
  newEntry.className = 'space-y-1';
  newEntry.innerHTML = `
    <div><span class="text-emerald-400">guest@rizkiananda</span>:<span class="text-sky-400">~</span>$ <span class="text-white">${rawCmd}</span></div>
    ${responseHtml}
  `;

  outputEl.appendChild(newEntry);
  outputEl.scrollTop = outputEl.scrollHeight;
};

// ==========================================
// MASTER URL HASH ROUTER
// Routes: #home, #projects, #experience, #simrs, #devtools
// ==========================================
window.currentProject = 'home';

window.handleRoute = function() {
  const rawHash = (window.location.hash || '#home').toLowerCase();
  const cleanHash = rawHash.split('?')[0];

  const viewHome = document.getElementById('viewHome');
  const viewSimrs = document.getElementById('viewSimrs');
  const viewDevTools = document.getElementById('viewDevTools');
  const viewShunaAi = document.getElementById('viewShunaAi');

  if (cleanHash === '#simrs') {
    window.currentProject = 'simrs';
    if (viewHome) viewHome.classList.add('hidden');
    if (viewDevTools) viewDevTools.classList.add('hidden');
    if (viewShunaAi) viewShunaAi.classList.add('hidden');
    if (viewSimrs) viewSimrs.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });

    const root = document.getElementById('simrsSuiteRoot');
    if (root && typeof window.renderSimrsSuite === 'function') {
      window.renderSimrsSuite(root);
    }
  } else if (cleanHash === '#devtools') {
    window.currentProject = 'devtools';
    if (viewHome) viewHome.classList.add('hidden');
    if (viewSimrs) viewSimrs.classList.add('hidden');
    if (viewShunaAi) viewShunaAi.classList.add('hidden');
    if (viewDevTools) viewDevTools.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });

    renderToolsGrid();
  } else if (cleanHash === '#shuna-ai' || cleanHash === '#shuna' || cleanHash === '#ai') {
    window.currentProject = 'shuna-ai';
    if (viewHome) viewHome.classList.add('hidden');
    if (viewSimrs) viewSimrs.classList.add('hidden');
    if (viewDevTools) viewDevTools.classList.add('hidden');
    if (viewShunaAi) viewShunaAi.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });

    const root = document.getElementById('shunaAiRoot');
    if (root && typeof window.renderShunaAiSuite === 'function') {
      window.renderShunaAiSuite(root);
    }
  } else {
    // Default: Home Landing Page
    window.currentProject = 'home';
    if (viewSimrs) viewSimrs.classList.add('hidden');
    if (viewDevTools) viewDevTools.classList.add('hidden');
    if (viewShunaAi) viewShunaAi.classList.add('hidden');
    if (viewHome) viewHome.classList.remove('hidden');

    if (cleanHash === '#projects') {
      const el = document.getElementById('projects');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else if (cleanHash === '#experience') {
      const el = document.getElementById('experience');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else if (cleanHash === '#certifications') {
      const el = document.getElementById('certifications');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
};

window.addEventListener('hashchange', window.handleRoute);

// Backward-compatible switchProject function
window.switchProject = function(projectName) {
  if (projectName === 'simrs') {
    window.location.hash = '#simrs';
  } else if (projectName === 'devtools') {
    window.location.hash = '#devtools';
  } else if (projectName === 'shuna' || projectName === 'shuna-ai' || projectName === 'ai') {
    window.location.hash = '#shuna-ai';
  } else {
    window.location.hash = '#home';
  }
};

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

  // Search Input for DevTools
  const searchInput = document.getElementById('toolSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderToolsGrid();
    });
  }

  // Category Filters for DevTools
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
        const viewInterviewDocBtn = document.getElementById('viewInterviewDocBtn');
  const interviewModal = document.getElementById('interviewModal');

    
  // Technical Guide Modal
  if (viewInterviewDocBtn) viewInterviewDocBtn.addEventListener('click', openInterviewGuide);
  if (interviewModal) {
    interviewModal.addEventListener('click', (e) => {
      if (e.target === interviewModal) closeInterviewGuide();
    });
  }

  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);

  // Keyboard Shortcuts (Esc to close modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const toolModal = document.getElementById('toolModal');
            const interviewModal = document.getElementById('interviewModal');
      if (toolModal && !toolModal.classList.contains('hidden')) closeToolModal();
            if (interviewModal && !interviewModal.classList.contains('hidden')) closeInterviewGuide();
    }
  });

  // Execute Initial Route
  window.handleRoute();

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
