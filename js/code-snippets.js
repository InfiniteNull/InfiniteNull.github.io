/**
 * code-snippets.js
 * Menyimpan source code asli Python, Node.js, SQL, dan JavaScript
 * untuk ditampilkan di fitur "Source Code Inspector" portofolio.
 */

window.TOOL_CODE_SNIPPETS = {
  "ai-data-analyzer": {
    filename: "analyzer.py (Python / Pandas & VADER)",
    language: "Python",
    path: "backend-python/analyzer.py",
    code: `# ================================================================
# MODUL AI & SENTIMENT ANALYSIS (PYTHON)
# Menggunakan Pandas untuk data frame & VADER untuk pemrosesan NLP
# ================================================================

import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import io

# Inisialisasi model NLP VADER Sentiment
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
    """
    Membaca dataset CSV/Excel dan menghitung distribusi sentimen
    secara otomatis menggunakan vektorisasi Pandas.
    """
    # 1. Membaca file bytes ke DataFrame
    if filename.endswith('.csv'):
        df = pd.read_csv(io.BytesIO(file_content))
    elif filename.endswith('.xlsx'):
        df = pd.read_excel(io.BytesIO(file_content))
    else:
        raise ValueError("Format tidak didukung!")

    # 2. Deteksi otomatis kolom ulasan / teks
    text_col = None
    for col in df.columns:
        if col.lower() in ['review', 'text', 'comment', 'ulasan', 'komentar']:
            text_col = col
            break
    if not text_col:
        text_col = df.select_dtypes(include=['object']).columns[0]

    # 3. Klasifikasi sentimen secara efisien
    df['AI_Sentiment'] = df[text_col].apply(analyze_sentiment)

    # 4. Rekap statistik untuk Chart visualisasi
    stats = df['AI_Sentiment'].value_counts().to_dict()
    return {
        "total_rows": len(df),
        "sentiment_stats": stats,
        "sample_preview": df[[text_col, 'AI_Sentiment']].head(5).to_dict(orient='records')
    }`
  },

  "news-scraper": {
    filename: "scraper.py (Python / BeautifulSoup4)",
    language: "Python",
    path: "backend-python/scraper.py",
    code: `# ================================================================
# MODUL AUTOMATION & WEB SCRAPING (PYTHON)
# Menggunakan Requests & BeautifulSoup4 untuk ekstraksi data berita
# ================================================================

import requests
from bs4 import BeautifulSoup

def scrape_tech_news():
    url = "https://news.ycombinator.com/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    
    response = requests.get(url, headers=headers, timeout=10)
    if response.status_code != 200:
        raise Exception(f"Gagal mengambil target: Status {response.status_code}")
        
    soup = BeautifulSoup(response.text, 'html.parser')
    news_list = []
    
    # Ekstraksi baris artikel
    articles = soup.find_all('tr', class_='athing')
    for article in articles[:15]:
        title_tag = article.find('span', class_='titleline')
        anchor = title_tag.find('a') if title_tag else None
        
        title = anchor.text if anchor else "Tanpa Judul"
        link = anchor.get('href') if anchor else "#"
        
        # Ekstraksi skor poin dari row subtext
        subtext = article.find_next_sibling('tr')
        score_elem = subtext.find('span', class_='score') if subtext else None
        points = int(score_elem.text.split()[0]) if score_elem else 0
        
        news_list.append({
            "title": title,
            "link": link,
            "points": points
        })
        
    return news_list`
  },

  "auth-sandbox": {
    filename: "server.js (Node.js Express & SQLite)",
    language: "JavaScript (Node.js)",
    path: "backend-nodejs/auth/server.js",
    code: `// ================================================================
// REST API AUTENTIKASI & KEAMANAN (NODE.JS / EXPRESS / BCRYPT)
// ================================================================

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const app = express();

app.use(express.json());
const SECRET_KEY = process.env.JWT_SECRET || "secure_developer_jwt_secret_key";

// 1. ENDPOINT REGISTRASI (Dengan Password Hashing Salt 10)
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email dan password wajib diisi!" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hashedPassword], function(err) {
            if (err) {
                if (err.message.includes("UNIQUE")) {
                    return res.status(400).json({ error: "Email sudah terdaftar!" });
                }
                return res.status(500).json({ error: "Database error." });
            }
            res.status(201).json({ message: "Registrasi berhasil!", userId: this.lastID });
        });
    } catch (e) {
        res.status(500).json({ error: "Kesalahan enkripsi server." });
    }
});

// 2. ENDPOINT LOGIN & GENERATE JWT TOKEN
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (!user) return res.status(401).json({ error: "Akun tidak ditemukan." });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ error: "Password salah!" });

        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });
        res.json({ message: "Login sukses!", token });
    });
});`
  },

  "inventory-sandbox": {
    filename: "productController.js (Node.js & SQL CRUD)",
    language: "JavaScript / SQL",
    path: "backend-nodejs/inventory/controllers/productController.js",
    code: `// ================================================================
// CONTROLLER CRUD INVENTARIS BARANG (NODE.JS & SQLITE)
// ================================================================

const db = require('../config/database');

// [READ] Mengambil seluruh stok barang
exports.getAllProducts = (req, res) => {
    db.all('SELECT * FROM products ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Gagal mengambil data." });
        res.json({ status: "success", data: rows });
    });
};

// [CREATE] Menambah barang baru
exports.addProduct = (req, res) => {
    const { name, category, stock, price } = req.body;
    if (!name || !category || price === undefined) {
        return res.status(400).json({ error: "Data wajib diisi lengkap!" });
    }

    const query = 'INSERT INTO products (name, category, stock, price) VALUES (?, ?, ?, ?)';
    db.run(query, [name, category, stock || 0, price], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Barang disimpan!", id: this.lastID });
    });
};

// [UPDATE] Mengubah jumlah stok
exports.updateStock = (req, res) => {
    const { id } = req.params;
    const { stock } = req.body;
    db.run('UPDATE products SET stock = ? WHERE id = ?', [stock, id], function(err) {
        if (err || this.changes === 0) return res.status(404).json({ error: "Barang tidak ada" });
        res.json({ message: "Stok berhasil diperbarui!" });
    });
};

// [DELETE] Menghapus data barang
exports.deleteProduct = (req, res) => {
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
        if (err || this.changes === 0) return res.status(404).json({ error: "Gagal menghapus" });
        res.json({ message: "Barang berhasil dihapus!" });
    });
};`
  },

  "library-sandbox": {
    filename: "libraryController.js (Node.js & Transaksi SQL)",
    language: "JavaScript / SQL",
    path: "backend-nodejs/library/controllers/libraryController.js",
    code: `// ================================================================
// MANAJEMEN TRANSAKSI PEMINJAMAN BUKU (NODE.JS & DATABASE SQL)
// ================================================================

const db = require('../config/database');

// [TRANSACTION] Proses Peminjaman Buku dengan Validasi Stok
exports.borrowBook = (req, res) => {
    const { book_id, member_id } = req.body;

    // 1. Cek ketersediaan buku
    db.get('SELECT available_copies, title FROM books WHERE id = ?', [book_id], (err, book) => {
        if (!book || book.available_copies <= 0) {
            return res.status(400).json({ error: "Buku tidak tersedia atau stok habis!" });
        }

        // 2. Eksekusi transaksi atomik (Update stok & simpan log peminjaman)
        db.serialize(() => {
            db.run('UPDATE books SET available_copies = available_copies - 1 WHERE id = ?', [book_id]);
            db.run('INSERT INTO borrowings (book_id, member_id, status) VALUES (?, ?, "BORROWED")', 
                [book_id, member_id], 
                function(err) {
                    if (err) return res.status(500).json({ error: "Gagal transaksi." });
                    res.json({ message: \`Buku "\${book.title}" berhasil dipinjam!\` });
                }
            );
        });
    });
};`
  },

  "image-optimizer": {
    filename: "imageOptimizer.js (Node.js & Sharp)",
    language: "JavaScript / Node.js",
    path: "backend-nodejs/image-optimizer/index.js",
    code: `// ================================================================
// IMAGE OPTIMIZER & WEBP CONVERTER (NODE.JS & SHARP)
// ================================================================

const sharp = require('sharp');

async function optimizeImageBuffer(fileBuffer, { width, quality = 80, format = 'webp' }) {
    let pipeline = sharp(fileBuffer);
    
    // Resize jika parameter lebar disertakan
    if (width) {
        pipeline = pipeline.resize({ width: parseInt(width), withoutEnlargement: true });
    }
    
    // Format conversion & compression
    if (format === 'webp') {
        pipeline = pipeline.webp({ quality });
    } else if (format === 'jpeg' || format === 'jpg') {
        pipeline = pipeline.jpeg({ quality });
    } else if (format === 'png') {
        pipeline = pipeline.png({ quality });
    }
    
    return await pipeline.toBuffer();
}`
  },

  "api-checker": {
    filename: "api-checker.js (JavaScript ES6+ Fetch)",
    language: "JavaScript",
    path: "frontend/js/api-checker.js",
    code: `// ================================================================
// ASYNCHRONOUS API HEALTH CHECKER (MODERN JAVASCRIPT ES6+)
// ================================================================

async function pingEndpoint(url, method = 'GET') {
    const startTime = performance.now();
    try {
        const response = await fetch(url, {
            method: method,
            mode: 'cors',
            cache: 'no-cache'
        });
        const latency = Math.round(performance.now() - startTime);
        
        return {
            status: response.status,
            ok: response.ok,
            statusText: response.statusText,
            latencyMs: latency,
            type: response.type
        };
    } catch (err) {
        return {
            status: 0,
            ok: false,
            statusText: 'Connection Failed / CORS Blocked',
            latencyMs: Math.round(performance.now() - startTime),
            error: err.message
        };
    }
}`
  },

  "currency-converter": {
    filename: "currency-converter.js (JavaScript API Math)",
    language: "JavaScript",
    path: "frontend/js/currency-converter.js",
    code: `// ================================================================
// REAL-TIME CURRENCY EXCHANGE CALCULATOR (JAVASCRIPT)
// ================================================================

async function convertCurrency(amount, fromCur, toCur) {
    const API_URL = \`https://open.er-api.com/v6/latest/\${fromCur}\`;
    const res = await fetch(API_URL);
    const data = await res.json();
    
    if (data && data.rates && data.rates[toCur]) {
        const rate = data.rates[toCur];
        const result = amount * rate;
        return { rate, result, lastUpdated: data.time_last_update_utc };
    }
    throw new Error("Gagal mengambil data kurs terkini.");
}`
  },

  "typing-test": {
    filename: "typing-test.js (JavaScript Event Listener & Math)",
    language: "JavaScript",
    path: "frontend/js/typing-test.js",
    code: `// ================================================================
// TYPING SPEED & ACCURACY ENGINE (JAVASCRIPT)
// ================================================================

function calculateTypingStats(charCount, errorCount, timeElapsedSeconds) {
    const timeInMinutes = timeElapsedSeconds / 60;
    // Standar internasional: 1 kata dihitung 5 karakter (Words Per Minute)
    const wordsTyped = (charCount - errorCount) / 5;
    const wpm = timeInMinutes > 0 ? Math.max(0, Math.round(wordsTyped / timeInMinutes)) : 0;
    
    const accuracy = charCount > 0 
        ? Math.max(0, Math.round(((charCount - errorCount) / charCount) * 100)) 
        : 100;
        
    return { wpm, accuracy };
}`
  }
};
