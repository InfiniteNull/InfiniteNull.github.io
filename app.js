/**
 * app.js - Master Orchestrator for Dev & Data Portfolio Suite
 * Mengelola kartu 9 tools, pencarian, filter kategori, navigasi modal, tema dark/light, dan toast.
 */

// Master Tools Registry Definition
const TOOLS_REGISTRY = [
  {
    id: "ai-data-analyzer",
    title: "AI Sentiment & Data Analyzer",
    category: "python",
    techBadge: "Python • Pandas • VADER NLP",
    techColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    icon: "brain-circuit",
    description: "Analisis otomatis data ulasan & survei dari file CSV/Excel menggunakan algoritma VADER Sentiment NLP dan visualisasi grafik.",
    renderFn: "renderAiDataAnalyzer",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Arsitektur & Logika Pemrosesan AI</h4>
        <p>Modul ini dirancang untuk memproses dataset umpan balik (feedback) publik dan survei kepuasan dengan pipeline berikut:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Data Ingestion:</strong> Membaca dataset CSV ke dalam memory buffer menggunakan library Pandas.</li>
          <li><strong>NLP Tokenization & Polarity:</strong> Menerapkan model VADER (Valence Aware Dictionary and sEntiment Reasoner) untuk menghitung <em>compound score</em> rentang -1.0 (sangat negatif) hingga +1.0 (sangat positif).</li>
          <li><strong>Categorization:</strong> Mengelompokkan hasil ke dalam kelas Positif (&ge; 0.05), Netral, dan Negatif (&le; -0.05).</li>
          <li><strong>Aggregation:</strong> Menghasilkan rekap statistik persentase dan visualisasi grafik diagram lingkaran (Chart.js).</li>
        </ul>
      </div>
    `
  },
  {
    id: "news-scraper",
    title: "Tech News & Feeds Scraper",
    category: "python",
    techBadge: "Python • BeautifulSoup4 • Requests",
    techColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    icon: "newspaper",
    description: "Otomasi scraping data berita industri teknologi dan publikasi terkini dari platform berita web secara real-time.",
    renderFn: "renderNewsScraper",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Arsitektur Web Scraping & Otomasi</h4>
        <p>Modul scraping ini memanfaatkan pipeline penarikan data terstruktur:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>HTTP Client:</strong> Mengirimkan GET request dengan kustom User-Agent header agar tidak dianggap bot berbahaya.</li>
          <li><strong>DOM Parsing (BeautifulSoup):</strong> Menelusuri pohon elemen HTML (tag baris artikel, link, skor popularitas, dan penulis).</li>
          <li><strong>Data Cleaning:</strong> Mengonversi format teks kotor menjadi struktur JSON bersih yang siap disajikan ke API frontend.</li>
        </ul>
      </div>
    `
  },
  {
    id: "auth-sandbox",
    title: "Auth & Security Service",
    category: "backend",
    techBadge: "Node.js • Express • Bcrypt • JWT",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "shield-check",
    description: "Sistem autentikasi aman dengan Bcrypt Password Hashing, JSON Web Token (JWT) bearer verification, dan database SQLite.",
    renderFn: "renderAuthSandbox",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Keamanan & Alur Autentikasi Modern</h4>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Password Hashing:</strong> Password pengguna tidak pernah disimpan dalam plain text, melainkan dienkripsi dengan <em>Bcrypt salt rounds = 10</em>.</li>
          <li><strong>JWT Stateless Session:</strong> Setelah login sukses, server menerbitkan token JWT bertanda tangan kriptografis untuk otorisasi endpoint tertutup.</li>
          <li><strong>Relational Storage:</strong> Data pengguna disimpan dalam tabel SQLite dengan constraint <code>UNIQUE(email)</code>.</li>
        </ul>
      </div>
    `
  },
  {
    id: "inventory-sandbox",
    title: "Inventory & Warehouse CRUD",
    category: "backend",
    techBadge: "Node.js • SQLite • RESTful API",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "boxes",
    description: "Pengelolaan aset dan inventaris barang gudang berbasis database SQL dengan fitur alert stok menipis dan filter kategori.",
    renderFn: "renderInventorySandbox",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Pola Arsitektur RESTful CRUD & Database</h4>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Standard Endpoints:</strong> Mengimplementasikan kaidah HTTP Method baku: <code>GET</code> (baca), <code>POST</code> (tambah), <code>PUT/PATCH</code> (edit stok), <code>DELETE</code> (hapus).</li>
          <li><strong>Controller & Service Pattern:</strong> Memisahkan logika rute URL dengan logika kueri database SQL agar kode mudah dirawat.</li>
          <li><strong>Business Logic:</strong> Menghitung total valuasi aset secara dinamis dan memberikan peringatan stok &le; 3.</li>
        </ul>
      </div>
    `
  },
  {
    id: "library-sandbox",
    title: "Library Management System",
    category: "backend",
    techBadge: "Node.js • SQLite • SQL Transactions",
    techColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "book-marked",
    description: "Sistem katalog perpustakaan dan pencatatan transaksi peminjaman buku dengan integritas relasi antar tabel database SQL.",
    renderFn: "renderLibrarySandbox",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Integritas Transaksi & Relasi Data</h4>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Atomicity Transaction:</strong> Memastikan saat buku dipinjam, pengurangan stok pada tabel <code>books</code> dan pencatatan log pada tabel <code>borrowings</code> terjadi secara bersamaan tanpa anomali.</li>
          <li><strong>Stok Validation:</strong> Mencegah peminjaman jika stok eksemplar buku bernilai 0.</li>
        </ul>
      </div>
    `
  },
  {
    id: "image-optimizer",
    title: "Image Optimizer & Converter",
    category: "utility",
    techBadge: "JavaScript • HTML5 Canvas • Sharp Engine",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "image",
    description: "Kompresi ukuran file foto dan konversi format ke WebP/JPEG/PNG secara instan tanpa mengorbankan kualitas visual.",
    renderFn: "renderImageOptimizer",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Teknologi Kompresi Citra</h4>
        <p>Mengurangi beban bandwidth dan mempercepat loading web:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Modern Format (WebP):</strong> Menggunakan algoritma kompresi prediktif yang 30-70% lebih kecil dibanding JPEG biasa.</li>
          <li><strong>Canvas Resizing:</strong> Mengubah resolusi piksel secara proporsional sesuai rasio aspek gambar asli.</li>
        </ul>
      </div>
    `
  },
  {
    id: "api-checker",
    title: "API Health & Latency Checker",
    category: "utility",
    techBadge: "JavaScript ES6+ • Asynchronous Fetch",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "activity",
    description: "Alat pengujian kesehatan endpoint API secara real-time dengan metrik latency (ms), HTTP status code, dan viewer JSON response.",
    renderFn: "renderApiChecker",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Pengujian Konektivitas & Latensi</h4>
        <p>Membantu developer memantau responsivitas microservice dan third-party API menggunakan <code>performance.now()</code> dan <code>fetch()</code> asynchronous.</p>
      </div>
    `
  },
  {
    id: "currency-converter",
    title: "Real-Time Currency Calculator",
    category: "utility",
    techBadge: "JavaScript • Open Exchange API",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "dollar-sign",
    description: "Kalkulator konversi nilai tukar mata uang global (IDR, USD, EUR, SGD, JPY, dll) dengan integrasi live feed kurs dunia.",
    renderFn: "renderCurrencyConverter",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Kalkulasi Kurs & Offline Resilience</h4>
        <p>Mengambil data kurs valuta asing terkini melalui open API dengan sistem fallback cache offline untuk menjaga aplikasi tetap berfungsi saat jaringan terputus.</p>
      </div>
    `
  },
  {
    id: "typing-test",
    title: "Typing Speed & Accuracy Test",
    category: "utility",
    techBadge: "JavaScript • DOM Event Engine",
    techColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "keyboard",
    description: "Alat uji kecepatan dan ketepatan ketik interaktif dengan penghitungan metrik standar WPM (Words Per Minute) dan akurasi %.",
    renderFn: "renderTypingTest",
    docs: `
      <div class="space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">Logika Penghitungan WPM & Akurasi</h4>
        <p>Menggunakan standar internasional: <code>WPM = ((Total Karakter Benar - Error) / 5) / Waktu (Menit)</code>.</p>
      </div>
    `
  }
];

// Content for the General Technical Showcase & Interview Guide Modal
const INTERVIEW_GUIDE_CONTENT = `
  <div class="space-y-6">
    
    <div class="p-4 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl">
      <h4 class="text-sm font-bold text-sky-900 dark:text-sky-200 mb-1">💡 Panduan Teknis & Pertanyaan Wawancara Arsitektur</h4>
      <p class="text-xs text-sky-700 dark:text-sky-300">Gunakan poin-poin di bawah ini saat menjelaskan arsitektur proyek kepada rekan teknis, recruiter, atau klien.</p>
    </div>

    <!-- Question 1 -->
    <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900">
      <h5 class="text-xs font-bold text-slate-900 dark:text-white mb-2">Q1: "Bisa jelaskan arsitektur dan kapabilitas sistem pada website portofolio ini?"</h5>
      <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong>Jawaban yang Disarankan:</strong><br>
        <em>"Website ini adalah **Dev & Data Tools Suite**, sebuah platform terintegrasi yang menggabungkan 9 tools fungsional dengan pendekatan **Polyglot Architecture**. Proyek ini mendemonstrasikan kapabilitas di 3 ranah utama: **Pertama**, pemrosesan dan analisis data AI berbasis **Python (Pandas & VADER NLP)**. **Kedua**, perancangan RESTful API backend dan database relasional berbasis **Node.js Express & SQLite (SQL)**. Serta **Ketiga**, pembuatan antarmuka web modern yang responsif dan interaktif berbasis **Modern JavaScript & Tailwind CSS**."</em>
      </p>
    </div>

    <!-- Question 2 -->
    <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900">
      <h5 class="text-xs font-bold text-slate-900 dark:text-white mb-2">Q2: "Bagaimana integrasi Python dalam workflow sistem ini?"</h5>
      <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong>Jawaban yang Disarankan:</strong><br>
        <em>"Python diimplementasikan khusus untuk domain data engineering dan automasi. Pada modul **AI Data Analyzer**, Pandas digunakan untuk membaca dan memanipulasi dataset secara efisien, sedangkan VADER NLP menghitung skor polaritas sentimen untuk mengkategorikan review publik/pengguna. Pada modul **News Scraper**, BeautifulSoup4 mengekstraksi data berita terkini secara terstruktur menjadi format JSON siap saji."</em>
      </p>
    </div>

    <!-- Question 3 -->
    <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900">
      <h5 class="text-xs font-bold text-slate-900 dark:text-white mb-2">Q3: "Bagaimana penerapan keamanan data dan arsitektur database?"</h5>
      <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong>Jawaban yang Disarankan:</strong><br>
        <em>"Untuk backend autentikasi, saya menggunakan Node.js Express dengan standar industri: enkripsi password menggunakan **Bcrypt (10 salt rounds)** dan sesi berbasis **JSON Web Token (JWT)** yang stateless. Di sisi database relasional (SQLite), parameterized query diterapkan untuk mencegah risiko SQL Injection serta menjaga integritas transaksi atomik saat memproses data inventaris dan peminjaman buku."</em>
      </p>
    </div>

  </div>
`;

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  const toolsGrid = document.getElementById('toolsGrid');
  const searchInput = document.getElementById('toolSearchInput');
  const filterBtns = document.querySelectorAll('.category-filter-btn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');

  // Modal Elements
  const toolModal = document.getElementById('toolModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalTechBadge = document.getElementById('modalTechBadge');
  const modalIconContainer = document.getElementById('modalIconContainer');
  const modalIcon = document.getElementById('modalIcon');

  const tabBtnDemo = document.getElementById('tabBtnDemo');
  const tabBtnCode = document.getElementById('tabBtnCode');
  const tabBtnDocs = document.getElementById('tabBtnDocs');
  const tabDemoContent = document.getElementById('modalTabDemoContent');
  const tabCodeContent = document.getElementById('modalTabCodeContent');
  const tabDocsContent = document.getElementById('modalTabDocsContent');
  const modalCodeSnippet = document.getElementById('modalCodeSnippet');
  const codeLanguageLabel = document.getElementById('codeLanguageLabel');
  const codeFilePathLabel = document.getElementById('codeFilePathLabel');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const modalDocsBody = document.getElementById('modalDocsBody');

  // Interview Modal
  const interviewModal = document.getElementById('interviewModal');
  const viewInterviewDocBtn = document.getElementById('viewInterviewDocBtn');
  const interviewModalCloseBtn = document.getElementById('interviewModalCloseBtn');
  const interviewModalContent = document.getElementById('interviewModalContent');

  let activeCategory = 'all';
  let activeTool = null;

  // Initialize Theme (Default to light or user preference)
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      themeIconSun.classList.remove('hidden');
      themeIconMoon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      themeIconSun.classList.add('hidden');
      themeIconMoon.classList.remove('hidden');
    }
    if (window.lucide) lucide.createIcons();
  }

  // Render Grid Cards
  function renderCards() {
    const query = (searchInput.value || '').toLowerCase().trim();
    
    const filteredTools = TOOLS_REGISTRY.filter(tool => {
      const matchCat = activeCategory === 'all' || tool.category === activeCategory;
      const matchSearch = tool.title.toLowerCase().includes(query) || 
                          tool.techBadge.toLowerCase().includes(query) ||
                          tool.description.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    if (filteredTools.length === 0) {
      toolsGrid.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <i data-lucide="search-x" class="w-8 h-8 mx-auto text-slate-400 mb-2"></i>
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tidak ada tool yang cocok dengan pencarian Anda.</p>
          <p class="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain atau pilih tab Semua Tools.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    toolsGrid.innerHTML = filteredTools.map(tool => `
      <div class="tool-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-sky-500/80 dark:hover:border-sky-500/80 cursor-pointer group" data-tool-id="${tool.id}">
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center group-hover:bg-sky-50 group-hover:text-sky-600 dark:group-hover:bg-sky-950 dark:group-hover:text-sky-400 transition">
              <i data-lucide="${tool.icon}" class="w-5 h-5"></i>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tool.techColor}">
              ${tool.techBadge.split('•')[0].trim()}
            </span>
          </div>

          <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition leading-snug">
            ${tool.title}
          </h3>

          <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            ${tool.description}
          </p>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span class="text-[11px] font-mono text-slate-400">${tool.techBadge}</span>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition">
            <span>Buka Tool</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </span>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();

    // Attach click events on cards
    document.querySelectorAll('.tool-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.toolId;
        openToolModal(id);
      });
    });
  }

  // Filter Buttons Handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-sky-600', 'text-white'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderCards();
    });
  });

  searchInput.addEventListener('input', renderCards);

  // Open Tool Modal
  function openToolModal(toolId) {
    const tool = TOOLS_REGISTRY.find(t => t.id === toolId);
    if (!tool) return;
    activeTool = tool;

    modalTitle.textContent = tool.title;
    modalSubtitle.textContent = tool.description;
    modalTechBadge.textContent = tool.techBadge;
    modalIcon.setAttribute('data-lucide', tool.icon);

    // Render Live Demo Container
    tabDemoContent.innerHTML = '';
    if (window[tool.renderFn]) {
      window[tool.renderFn](tabDemoContent);
    } else {
      tabDemoContent.innerHTML = `<p class="text-xs text-slate-500">Komponen demo sedang dipersiapkan...</p>`;
    }

    // Prepare Code Inspector Tab
    const snippetData = window.TOOL_CODE_SNIPPETS?.[tool.id] || {
      filename: "source-code.js",
      language: "JavaScript",
      path: `modules/${tool.id}.js`,
      code: `// Kode sumber untuk modul ${tool.title}`
    };

    codeLanguageLabel.textContent = snippetData.language;
    codeFilePathLabel.textContent = `/${snippetData.path}`;
    modalCodeSnippet.textContent = snippetData.code;

    // Prepare Docs Tab
    modalDocsBody.innerHTML = tool.docs || `<p>Dokumentasi teknis untuk modul ini.</p>`;

    // Switch to Demo Tab by default
    switchModalTab('demo');

    toolModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (window.lucide) lucide.createIcons();
  }

  function closeModal() {
    toolModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  toolModal.addEventListener('click', (e) => {
    if (e.target === toolModal) closeModal();
  });

  // Modal Tab Switchers
  tabBtnDemo.addEventListener('click', () => switchModalTab('demo'));
  tabBtnCode.addEventListener('click', () => switchModalTab('code'));
  tabBtnDocs.addEventListener('click', () => switchModalTab('docs'));

  function switchModalTab(tabName) {
    [tabBtnDemo, tabBtnCode, tabBtnDocs].forEach(btn => {
      btn.classList.remove('active', 'border-sky-600', 'text-sky-600', 'dark:text-sky-400');
      btn.classList.add('border-transparent', 'text-slate-500');
    });

    [tabDemoContent, tabCodeContent, tabDocsContent].forEach(p => p.classList.add('hidden'));

    if (tabName === 'demo') {
      tabBtnDemo.classList.add('active', 'border-sky-600', 'text-sky-600', 'dark:text-sky-400');
      tabBtnDemo.classList.remove('border-transparent', 'text-slate-500');
      tabDemoContent.classList.remove('hidden');
    } else if (tabName === 'code') {
      tabBtnCode.classList.add('active', 'border-sky-600', 'text-sky-600', 'dark:text-sky-400');
      tabBtnCode.classList.remove('border-transparent', 'text-slate-500');
      tabCodeContent.classList.remove('hidden');
    } else if (tabName === 'docs') {
      tabBtnDocs.classList.add('active', 'border-sky-600', 'text-sky-600', 'dark:text-sky-400');
      tabBtnDocs.classList.remove('border-transparent', 'text-slate-500');
      tabDocsContent.classList.remove('hidden');
    }
  }

  // Copy Code Button
  copyCodeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(modalCodeSnippet.textContent);
    showToast('Source code berhasil disalin ke clipboard!');
  });

  // Interview Modal Handler
  viewInterviewDocBtn.addEventListener('click', () => {
    interviewModalContent.innerHTML = INTERVIEW_GUIDE_CONTENT;
    interviewModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  });

  interviewModalCloseBtn.addEventListener('click', () => {
    interviewModal.classList.add('hidden');
    document.body.style.overflow = '';
  });

  interviewModal.addEventListener('click', (e) => {
    if (e.target === interviewModal) {
      interviewModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Developer Profile Modal Handler
  const aboutDevModal = document.getElementById('aboutDevModal');
  const aboutDevBtn = document.getElementById('aboutDevBtn');
  const aboutDevModalCloseBtn = document.getElementById('aboutDevModalCloseBtn');

  if (aboutDevBtn && aboutDevModal) {
    aboutDevBtn.addEventListener('click', () => {
      aboutDevModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    });

    if (aboutDevModalCloseBtn) {
      aboutDevModalCloseBtn.addEventListener('click', () => {
        aboutDevModal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    aboutDevModal.addEventListener('click', (e) => {
      if (e.target === aboutDevModal) {
        aboutDevModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  // Global Toast Notification Helper
  window.showToast = function(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-slate-700 dark:border-slate-200';
    toast.innerHTML = `<i data-lucide="info" class="w-4 h-4 text-sky-400 dark:text-sky-600"></i><span>${message}</span>`;
    container.appendChild(toast);

    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease-out';
      setTimeout(() => toast.remove(), 200);
    }, 2500);
  };

  // Initial render
  renderCards();
});
