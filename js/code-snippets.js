/**
 * code-snippets.js
 * Menyimpan source code asli Python, Node.js, SQL, dan JavaScript
 * untuk ditampilkan di fitur "Source Code Inspector" portofolio.
 */

window.TOOL_CODE_SNIPPETS = {
  "ai-data-analyzer": {
    filename: "analyzer.py (Python / Pandas & VADER)",
    language: "Python",
    path: "python-modules/analyzer.py",
    code: `# ================================================================
# MODUL PEMROSESAN DATA & NLP SENTIMEN (PYTHON)
# Menggunakan Pandas untuk data frame & VADER untuk pemrosesan teks NLP
# ================================================================

import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import io

analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    """Menganalisis compound polarity score teks ulasan"""
    if not isinstance(text, str):
        return "Neutral"
    scores = analyzer.polarity_scores(text)
    compound = scores['compound']
    if compound >= 0.05:
        return "Positive"
    elif compound <= -0.05:
        return "Negative"
    else:
        return "Neutral"

def process_file_data(file_content, filename):
    if filename.endswith('.csv'):
        df = pd.read_csv(io.BytesIO(file_content))
    elif filename.endswith('.xlsx'):
        df = pd.read_excel(io.BytesIO(file_content))
    else:
        raise ValueError("Format tidak didukung!")

    text_col = [c for c in df.columns if c.lower() in ['review', 'text', 'comment', 'ulasan', 'komentar']][0]
    df['Sentiment'] = df[text_col].apply(analyze_sentiment)
    summary = df['Sentiment'].value_counts().to_dict()
    return {"total": len(df), "distribution": summary}`
  },

  "news-scraper": {
    filename: "scraper.py (Python / BeautifulSoup4)",
    language: "Python",
    path: "python-modules/scraper.py",
    code: `# ================================================================
# MODUL TECH NEWS SCRAPER (PYTHON)
# Penarikan data feed berita menggunakan Requests & BeautifulSoup4
# ================================================================

import requests
from bs4 import BeautifulSoup
import json

def fetch_tech_news(limit=15):
    url = "https://news.ycombinator.com/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    response = requests.get(url, headers=headers, timeout=10)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch news: Status {response.status_code}")
        
    soup = BeautifulSoup(response.text, 'html.parser')
    articles = []
    
    rows = soup.select('tr.athing')
    for row in rows[:limit]:
        title_el = row.select_one('span.titleline > a')
        if not title_el:
            continue
            
        articles.append({
            "title": title_el.get_text(),
            "url": title_el.get('href'),
            "rank": row.select_one('.rank').get_text().replace('.', '')
        })
        
    return articles`
  },

  "auth-sandbox": {
    filename: "auth.js (Node.js / Express, Bcrypt & JWT)",
    language: "JavaScript (Node.js)",
    path: "backend-modules/routes/auth.js",
    code: `// ================================================================
// MODUL AUTENTIKASI & KEAMANAN (NODE.JS + BCRYPT + JWT)
// ================================================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'superSecretKey2026';

// 1. Endpoint Registrasi User (Bcrypt Password Hashing)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Salt rounds 10 standar industri OWASP
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
        const result = stmt.run(username, email, hashedPassword);
        
        res.status(201).json({ success: true, message: 'User berhasil didaftarkan', userId: result.lastInsertRowid });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. Endpoint Login & Penerbitan JWT Token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) return res.status(401).json({ error: 'Kredensial tidak valid' });
        
        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return res.status(401).json({ error: 'Kredensial tidak valid' });
        
        const token = jwt.sign(
            { id: user.id, email: user.email, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '8h' }
        );
        
        res.json({ success: true, token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;`
  },

  "inventory-sandbox": {
    filename: "inventory.js (Node.js / SQLite REST API)",
    language: "JavaScript (Node.js)",
    path: "backend-modules/routes/inventory.js",
    code: `// ================================================================
// MANAJEMEN INVENTARIS GUDANG (RESTful API CRUD)
// ================================================================

const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/products', (req, res) => {
    const products = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    res.json(products);
});

router.post('/products', (req, res) => {
    const { name, category, stock, price } = req.body;
    const stmt = db.prepare('INSERT INTO products (name, category, stock, price) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name, category, stock, price);
    res.status(201).json({ id: info.lastInsertRowid, name, category, stock, price });
});

router.put('/products/:id/stock', (req, res) => {
    const { id } = req.params;
    const { delta } = req.body;
    db.prepare('UPDATE products SET stock = MAX(0, stock + ?) WHERE id = ?').run(delta, id);
    res.json({ success: true });
});

router.delete('/products/:id', (req, res) => {
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

module.exports = router;`
  },

  "library-sandbox": {
    filename: "library.js (Node.js / SQL Transactions)",
    language: "JavaScript (Node.js)",
    path: "backend-modules/routes/library.js",
    code: `// ================================================================
// SISTEM PEMINJAMAN BUKU PERPUSTAKAAN (SQL TRANSAKSI)
// ================================================================

const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/borrow', (req, res) => {
    const { bookId, memberName } = req.body;
    
    // Gunakan transaksi ACID agar stok dan mutasi log konsisten
    const borrowTransaction = db.transaction((bId, member) => {
        const book = db.prepare('SELECT available_copies FROM books WHERE id = ?').get(bId);
        if (!book || book.available_copies <= 0) {
            throw new Error('Eksemplar buku tidak tersedia');
        }
        
        db.prepare('UPDATE books SET available_copies = available_copies - 1 WHERE id = ?').run(bId);
        db.prepare('INSERT INTO borrowings (book_id, member_name, borrow_date) VALUES (?, ?, datetime("now"))').run(bId, member);
    });

    try {
        borrowTransaction(bookId, memberName);
        res.json({ success: true, message: 'Buku berhasil dipinjam' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;`
  },

  "api-checker": {
    filename: "api-checker.js (Client-side Latency Ping)",
    language: "JavaScript ES6+",
    path: "js/api-checker.js",
    code: `// Mengukur Latensi Network & HTTP Status Real-Time
async function pingEndpoint(url, method = 'GET') {
    const start = performance.now();
    try {
        const res = await fetch(url, { method });
        const latency = Math.round(performance.now() - start);
        const data = await res.json();
        return { status: res.status, statusText: res.statusText, latency, data };
    } catch (err) {
        const latency = Math.round(performance.now() - start);
        return { error: err.message, latency };
    }
}`
  },

  "image-optimizer": {
    filename: "image-optimizer.js (HTML5 Canvas Compression)",
    language: "JavaScript ES6+",
    path: "js/image-optimizer.js",
    code: `// Kompresi Gambar Berbasis Canvas & Konversi WebP
function compressImage(file, quality = 0.7, maxWidth = 1200) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const scale = maxWidth / Math.max(img.width, maxWidth);
            const canvas = document.createElement('canvas');
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => resolve(blob), 'image/webp', quality);
        };
    });
}`
  },

  "currency-converter": {
    filename: "currency-converter.js (Live Exchange Feed)",
    language: "JavaScript ES6+",
    path: "js/currency-converter.js",
    code: `// Kalkulasi Kurs Valuta Asing dengan Caching Offline
async function getExchangeRates(base = 'USD') {
    const cacheKey = \`rates_\${base}\`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const res = await fetch(\`https://open.er-api.com/v6/latest/\${base}\`);
    const data = await res.json();
    localStorage.setItem(cacheKey, JSON.stringify(data.rates));
    return data.rates;
}`
  },

  "typing-test": {
    filename: "typing-test.js (WPM & Accuracy Engine)",
    language: "JavaScript ES6+",
    path: "js/typing-test.js",
    code: `// Engine Kalkulasi Words Per Minute (WPM) & Akurasi
function calculateTypingStats(typedChars, correctChars, elapsedSeconds) {
    const minutes = elapsedSeconds / 60;
    const words = typedChars / 5; // Standar 5 karakter = 1 kata
    const wpm = minutes > 0 ? Math.round(words / minutes) : 0;
    const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;
    return { wpm, accuracy };
}`
  },

  "subnet-calculator": {
    filename: "subnet-calculator.js (IPv4 & CIDR Subnetting)",
    language: "JavaScript ES6+",
    path: "js/subnet-calculator.js",
    code: `// Algoritma Perhitungan Subnet IPv4, Netmask & Host Range
function calculateIPv4Subnet(ipStr, cidr) {
    const ipNum = ipStr.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
    const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const wildcardNum = (~maskNum) >>> 0;
    const networkNum = (ipNum & maskNum) >>> 0;
    const broadcastNum = (networkNum | wildcardNum) >>> 0;
    const usableHosts = Math.pow(2, 32 - cidr) - 2;

    return { networkNum, broadcastNum, maskNum, wildcardNum, usableHosts };
}`
  },

  "firewall-generator": {
    filename: "firewall-generator.js (UFW & iptables Rules)",
    language: "JavaScript ES6+",
    path: "js/firewall-generator.js",
    code: `// Generator Command Firewall Linux UFW & iptables
function generateFirewallRules(port, proto, action, srcIp = "") {
    const isAllow = action === "allow";
    const ufwAct = isAllow ? "allow" : "deny";
    const iptAct = isAllow ? "ACCEPT" : "DROP";

    const ufw = srcIp ? \`sudo ufw \${ufwAct} from \${srcIp} to any port \${port} proto \${proto}\` : \`sudo ufw \${ufwAct} \${port}/\${proto}\`;
    const ipt = srcIp ? \`sudo iptables -A INPUT -s \${srcIp} -p \${proto} --dport \${port} -j \${iptAct}\` : \`sudo iptables -A INPUT -p \${proto} --dport \${port} -j \${iptAct}\`;
    return { ufw, ipt };
}`
  },

  "bandwidth-estimator": {
    filename: "bandwidth-estimator.js (Network Throughput)",
    language: "JavaScript ES6+",
    path: "js/bandwidth-estimator.js",
    code: `// Estimasi Durasi Transfer Data & Throughput Jaringan
function estimateTransferTime(bytes, bitsPerSec, efficiency = 0.9) {
    const effectiveBytesPerSec = (bitsPerSec * efficiency) / 8;
    const totalSeconds = bytes / effectiveBytesPerSec;
    return { totalSeconds, effectiveMBps: effectiveBytesPerSec / (1024 * 1024) };
}`
  },

  "streaming-calculator": {
    filename: "streaming-calculator.js (RTMP/HLS Bitrate)",
    language: "JavaScript ES6+",
    path: "js/streaming-calculator.js",
    code: `// Kalkulasi Kebutuhan Egress Bandwidth & Disk Storage Nginx
function calculateStreamingBandwidth(videoKbps, audioKbps, viewers, hours) {
    const totalKbps = videoKbps + audioKbps;
    const egressMbps = (totalKbps / 1000) * viewers;
    const storagePerHourGb = ((totalKbps * 1000 / 8) * 3600) / (1024 * 1024 * 1024);
    return { egressMbps, storagePerHourGb, monthlyGb: storagePerHourGb * hours * 30 };
}`
  },

  "cron-builder": {
    filename: "cron-builder.js (Cron Syntax Generator)",
    language: "JavaScript ES6+",
    path: "js/cron-builder.js",
    code: `// Visualizer & Parser Format Crontab Linux
function buildCrontab(min, hour, dom, month, dow, command) {
    const expression = \`\${min} \${hour} \${dom} \${month} \${dow}\`;
    const crontabLine = \`\${expression} \${command}\`;
    return { expression, crontabLine };
}`
  },

  "security-headers": {
    filename: "security-headers.js (HTTP Hardening Audit)",
    language: "JavaScript ES6+",
    path: "js/security-headers.js",
    code: `// Audit Keberadaan HTTP Security Headers Standar OWASP
function auditSecurityHeaders(rawHeaders) {
    const required = ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options'];
    const lower = rawHeaders.toLowerCase();
    const passed = required.filter(h => lower.includes(h));
    const score = Math.round((passed.length / required.length) * 100);
    return { score, passed, missing: required.filter(h => !passed.includes(h)) };
}`
  },

  "crypto-hash": {
    filename: "crypto-hash.js (Web Crypto API)",
    language: "JavaScript ES6+",
    path: "js/crypto-hash.js",
    code: `// Digest Hash Kriptografi SHA-256 / SHA-512 via Web Crypto
async function generateSha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
}`
  },

  "password-entropy": {
    filename: "password-entropy.js (Entropy & Brute-force)",
    language: "JavaScript ES6+",
    path: "js/password-entropy.js",
    code: `// Perhitungan Entropi Bit & Waktu Retak Password
function calculateEntropy(pwd) {
    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 33;
    const entropyBits = pwd.length > 0 && pool > 0 ? (pwd.length * Math.log2(pool)) : 0;
    return entropyBits;
}`
  },

  "payload-encoder": {
    filename: "payload-encoder.js (Payload Sanitizer)",
    language: "JavaScript ES6+",
    path: "js/payload-encoder.js",
    code: `// Multi-format Encoder & Decoder Sanitizer
function encodePayload(str) {
    return {
        base64: btoa(unescape(encodeURIComponent(str))),
        url: encodeURIComponent(str),
        hex: Array.from(str).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')
    };
}`
  },

  "jwt-debugger": {
    filename: "jwt-debugger.js (Token Claims Parser)",
    language: "JavaScript ES6+",
    path: "js/jwt-debugger.js",
    code: `// Parsing Payload & Header JSON Web Token (JWT)
function decodeJwt(token) {
    const parts = token.split('.');
    if (parts.length < 2) throw new Error("Invalid JWT token format");
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return { header, payload, isExpired: payload.exp && payload.exp < Date.now() / 1000 };
}`
  },

  "json-sql-converter": {
    filename: "json-sql-converter.js (Schema Generator)",
    language: "JavaScript ES6+",
    path: "js/json-sql-converter.js",
    code: `// Mengubah Objek JSON ke Query SQL INSERT & Skema Relasional
function jsonToSql(jsonData, tableName = 'my_table') {
    const cols = Object.keys(jsonData[0]);
    let sql = \`CREATE TABLE \${tableName} (\${cols.map(c => \`\${c} TEXT\`).join(', ')});\n\`;
    jsonData.forEach(row => {
        const vals = cols.map(c => \`'\${String(row[c]).replace(/'/g, "''")}'\`).join(', ');
        sql += \`INSERT INTO \${tableName} (\${cols.join(', ')}) VALUES (\${vals});\n\`;
    });
    return sql;
}`
  },

  "log-analyzer": {
    filename: "log-analyzer.js (Log Regex Parser)",
    language: "JavaScript ES6+",
    path: "js/log-analyzer.js",
    code: `// Parsing Nginx Access Log dengan Pola Regex Baku
function parseAccessLog(logLines) {
    const regex = /^(\\S+)\\s+\\S+\\s+\\S+\\s+\\[([^\\]]+)\\]\\s+"(\\S+)\\s+(\\S+)\\s*([^"]*)"\\s+(\\d{3})\\s+(\\S+)/;
    return logLines.map(line => {
        const m = line.match(regex);
        return m ? { ip: m[1], timestamp: m[2], method: m[3], path: m[4], status: parseInt(m[6], 10) } : null;
    }).filter(Boolean);
}`
  },

  "raid-calculator": {
    filename: "raid-calculator.js (RAID Array Engine)",
    language: "JavaScript ES6+",
    path: "js/raid-calculator.js",
    code: `// Kalkulasi Kapasitas Efektif & Redundansi RAID 0, 1, 5, 6, 10
function calculateRaidArray(type, disks, diskSizeTb) {
    if (type === "0") return { usable: disks * diskSizeTb, parity: 0 };
    if (type === "1") return { usable: diskSizeTb, parity: (disks - 1) * diskSizeTb };
    if (type === "5") return { usable: (disks - 1) * diskSizeTb, parity: diskSizeTb };
    if (type === "6") return { usable: (disks - 2) * diskSizeTb, parity: 2 * diskSizeTb };
    if (type === "10") return { usable: (disks / 2) * diskSizeTb, parity: (disks / 2) * diskSizeTb };
}`
  },

  "psu-calculator": {
    filename: "psu-calculator.js (Hardware Wattage)",
    language: "JavaScript ES6+",
    path: "js/psu-calculator.js",
    code: `// Estimasi Kebutuhan Daya Listrik Komponen PC & Headroom PSU
function calculatePsuWattage(cpuTdp, gpuTdp, ramSticks, nvmeCount, hddCount, fans) {
    const baseMobo = 35;
    const totalWatt = cpuTdp + gpuTdp + (ramSticks * 5) + (nvmeCount * 7) + (hddCount * 12) + (fans * 4) + baseMobo;
    const recommendedPsu = Math.ceil((totalWatt * 1.4) / 50) * 50;
    return { totalWatt, recommendedPsu };
}`
  },

  "regex-tester": {
    filename: "regex-tester.js (Regex Engine)",
    language: "JavaScript ES6+",
    path: "js/regex-tester.js",
    code: `// Engine Evaluasi Match & Capture Group Regex
function testRegex(patternStr, flags, testStr) {
    const regex = new RegExp(patternStr, flags.includes('g') ? flags : flags + 'g');
    const matches = [];
    let m;
    while ((m = regex.exec(testStr)) !== null) {
        matches.push({ val: m[0], index: m.index });
        if (regex.lastIndex === m.index) regex.lastIndex++;
    }
    return matches;
}`
  },

  "markdown-preview": {
    filename: "markdown-preview.js (Markdown Parser)",
    language: "JavaScript ES6+",
    path: "js/markdown-preview.js",
    code: `// Lightweight Client-Side Markdown Parser
function parseMarkdownToHtml(md) {
    return md
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\\*\\*([^\\*]+)\\*\\*/gim, '<strong>$1</strong>')
        .replace(/\\*([^\\*]+)\\*/gim, '<em>$1</em>')
        .replace(/\`([^\`]+)\`/gim, '<code>$1</code>');
}`
  }
};
