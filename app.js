/**
 * app.js - Master Orchestrator for Portfolio Hub (InfiniteNull.github.io)
 * Mengelola interaksi navigasi beranda, i18n switcher, tema dark/light, terminal CLI interaktif, dan modal panduan teknis.
 */

// State
window.currentLang = 'id';

// Toast Notification
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

  toast.className = `flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-xs font-semibold ${bgClass} transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto`;
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

// Theme Switcher
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

// Interactive Terminal Logic
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

  const isEn = window.currentLang === 'en';
  let responseHtml = '';

  if (cmd === 'help') {
    responseHtml = isEn ? `
      <div class="text-slate-300 pl-3 border-l-2 border-slate-600 text-[10px] sm:text-xs space-y-1">
        <div class="font-bold text-sky-400">Available Interactive Commands:</div>
        <div>• <span class="text-emerald-400 font-bold">whoami</span>: Developer profile & credentials summary</div>
        <div>• <span class="text-emerald-400 font-bold">stack</span>: Backend, frontend, & infrastructure tech stack</div>
        <div>• <span class="text-emerald-400 font-bold">projects</span>: List of 3 flagship production systems</div>
        <div>• <span class="text-emerald-400 font-bold">simrs</span>: Open SIMRS Core Enterprise (infinitenull.github.io/simrs-laravel/)</div>
        <div>• <span class="text-emerald-400 font-bold">devtools</span>: Open 29 Web Tools workspace (infinitenull.github.io/dev-tools/)</div>
        <div>• <span class="text-emerald-400 font-bold">shuna</span>: Open SHUNA AI engine (infinitenull.github.io/SHUNA-AI/)</div>
        <div>• <span class="text-emerald-400 font-bold">contact</span>: Contact information & GitHub</div>
        <div>• <span class="text-emerald-400 font-bold">clear</span>: Clear terminal screen</div>
      </div>
    ` : `
      <div class="text-slate-300 pl-3 border-l-2 border-slate-600 text-[10px] sm:text-xs space-y-1">
        <div class="font-bold text-sky-400">Perintah Interaktif Tersedia (Quick Commands):</div>
        <div>• <span class="text-emerald-400 font-bold">whoami</span>: Ringkasan profil pengembang</div>
        <div>• <span class="text-emerald-400 font-bold">stack</span>: Tech stack backend, frontend, & sistem</div>
        <div>• <span class="text-emerald-400 font-bold">projects</span>: Daftar 3 sistem produksi utama</div>
        <div>• <span class="text-emerald-400 font-bold">simrs</span>: Buka aplikasi SIMRS Core (infinitenull.github.io/simrs-laravel/)</div>
        <div>• <span class="text-emerald-400 font-bold">devtools</span>: Buka workspace 29 Web Tools (infinitenull.github.io/dev-tools/)</div>
        <div>• <span class="text-emerald-400 font-bold">shuna</span>: Buka engine SHUNA AI (infinitenull.github.io/SHUNA-AI/)</div>
        <div>• <span class="text-emerald-400 font-bold">contact</span>: Informasi kontak & GitHub</div>
        <div>• <span class="text-emerald-400 font-bold">clear</span>: Bersihkan layar terminal</div>
      </div>
    `;
  } else if (cmd === 'whoami') {
    responseHtml = isEn ? `
      <div class="text-slate-300 pl-3 border-l-2 border-emerald-500/50 text-[10px] sm:text-xs space-y-1">
        <strong>Rizki Ananda, S.Kom</strong> (@InfiniteNull)<br>
        <span class="text-slate-400">Bachelor of Computer Science • Universitas Potensi Utama</span><br>
        <span class="text-slate-400">Track Record: IT Researcher (Adzkia Kedinasan), IT Support PC Deployment (Bank Sinarmas), Lead Developer SHUNA AI (MSIB Skilvul Batch 6)</span>
      </div>
    ` : `
      <div class="text-slate-300 pl-3 border-l-2 border-emerald-500/50 text-[10px] sm:text-xs space-y-1">
        <strong>Rizki Ananda, S.Kom</strong> (@InfiniteNull)<br>
        <span class="text-slate-400">S1 Informatika • Universitas Potensi Utama</span><br>
        <span class="text-slate-400">Rekam Jejak: IT Researcher (Adzkia Kedinasan), IT Support PC Deployment (Bank Sinarmas), Lead Developer SHUNA AI (MSIB Skilvul Batch 6)</span>
      </div>
    `;
  } else if (cmd === 'stack') {
    responseHtml = `
      <div class="text-sky-300 pl-3 border-l-2 border-sky-500/50 text-[10px] sm:text-xs font-mono">
        {<br>
        &nbsp;&nbsp;"backend": ["PHP 8.2 (Laravel 11)", "Python 3.10+ (FastAPI, Flask)", "Node.js (Express)"],<br>
        &nbsp;&nbsp;"database": ["MySQL (3NF / InnoDB)", "SQLite (ACID transactions)", "Redis"],<br>
        &nbsp;&nbsp;"data_science": ["Pandas", "NumPy", "Scikit-Learn (TF-IDF, LogReg, SVM)", "Streamlit"],<br>
        &nbsp;&nbsp;"infrastructure": ["Linux VM", "Nginx (RTMP/HLS)", "UFW / iptables", "Mikrotik RouterOS"],<br>
        &nbsp;&nbsp;"security_vapt": ["Burp Suite", "OWASP ZAP", "HTTP Security Headers", "JWT / Bcrypt"]<br>
        }
      </div>
    `;
  } else if (cmd === 'projects') {
    responseHtml = isEn ? `
      <div class="text-slate-300 pl-3 border-l-2 border-slate-600 text-[10px] sm:text-xs space-y-1">
        <div>1. <strong class="text-sky-400">SIMRS Core Enterprise</strong>: Hospital MIS Permenkes 24/2022, BPJS V-Claim (<a href="https://infinitenull.github.io/simrs-laravel/" target="_blank" class="text-sky-300 underline">open ↗</a>)</div>
        <div>2. <strong class="text-purple-400">Dev & Data Engineering Suite</strong>: 29 Modular Network, Security & Data Tools (<a href="https://infinitenull.github.io/dev-tools/" target="_blank" class="text-purple-300 underline">open ↗</a>)</div>
        <div>3. <strong class="text-emerald-400">SHUNA AI Data Engine</strong>: NLP Sentiment, Multi-Model Arena, Tabular Retention (<a href="https://infinitenull.github.io/SHUNA-AI/" target="_blank" class="text-emerald-300 underline">open ↗</a>)</div>
      </div>
    ` : `
      <div class="text-slate-300 pl-3 border-l-2 border-slate-600 text-[10px] sm:text-xs space-y-1">
        <div>1. <strong class="text-sky-400">SIMRS Core Enterprise</strong>: Hospital MIS Permenkes 24/2022, BPJS V-Claim (<a href="https://infinitenull.github.io/simrs-laravel/" target="_blank" class="text-sky-300 underline">buka ↗</a>)</div>
        <div>2. <strong class="text-purple-400">Dev & Data Engineering Suite</strong>: 29 Modul Komputasi Jaringan, Keamanan, & Data (<a href="https://infinitenull.github.io/dev-tools/" target="_blank" class="text-purple-300 underline">buka ↗</a>)</div>
        <div>3. <strong class="text-emerald-400">SHUNA AI Data Engine</strong>: NLP Sentiment, Model Arena ROC-AUC, Retensi Tabular (<a href="https://infinitenull.github.io/SHUNA-AI/" target="_blank" class="text-emerald-300 underline">buka ↗</a>)</div>
      </div>
    `;
  } else if (cmd === 'simrs' || cmd === 'simrs-laravel') {
    window.open('https://infinitenull.github.io/simrs-laravel/', '_blank');
    responseHtml = `<div class="text-sky-400 pl-3 border-l-2 border-sky-500/50 text-[10px] sm:text-xs">${isEn ? 'Opening SIMRS Core Enterprise in new tab:' : 'Membuka SIMRS Core Enterprise di tab baru:'} <a href="https://infinitenull.github.io/simrs-laravel/" target="_blank" class="underline">https://infinitenull.github.io/simrs-laravel/</a> ↗</div>`;
  } else if (cmd === 'devtools' || cmd === 'tools') {
    window.open('https://infinitenull.github.io/dev-tools/', '_blank');
    responseHtml = `<div class="text-purple-400 pl-3 border-l-2 border-purple-500/50 text-[10px] sm:text-xs">${isEn ? 'Opening Dev & Data Engineering Suite in new tab:' : 'Membuka Dev & Data Engineering Suite di tab baru:'} <a href="https://infinitenull.github.io/dev-tools/" target="_blank" class="underline">https://infinitenull.github.io/dev-tools/</a> ↗</div>`;
  } else if (cmd === 'shuna' || cmd === 'shuna-ai' || cmd === 'ai' || cmd === 'nlp' || cmd === 'ml') {
    window.open('https://infinitenull.github.io/SHUNA-AI/', '_blank');
    responseHtml = `<div class="text-emerald-400 pl-3 border-l-2 border-emerald-500/50 text-[10px] sm:text-xs">${isEn ? 'Opening SHUNA AI Data Engine in new tab:' : 'Membuka SHUNA AI Data Engine di tab baru:'} <a href="https://infinitenull.github.io/SHUNA-AI/" target="_blank" class="underline">https://infinitenull.github.io/SHUNA-AI/</a> ↗</div>`;
  } else if (cmd === 'contact') {
    responseHtml = isEn ? `
      <div class="text-slate-300 pl-3 border-l-2 border-slate-600 text-[10px] sm:text-xs space-y-0.5">
        <div>GitHub: <a href="https://github.com/InfiniteNull" target="_blank" class="text-sky-400 underline">https://github.com/InfiniteNull</a></div>
        <div>Almamater: Bachelor of Computer Science — Universitas Potensi Utama</div>
        <div>Status: Open for Technical Opportunities (Software Engineer / Data Analyst / IT Support Specialist)</div>
      </div>
    ` : `
      <div class="text-slate-300 pl-3 border-l-2 border-slate-600 text-[10px] sm:text-xs space-y-0.5">
        <div>GitHub: <a href="https://github.com/InfiniteNull" target="_blank" class="text-sky-400 underline">https://github.com/InfiniteNull</a></div>
        <div>Almamater: S1 Informatika — Universitas Potensi Utama</div>
        <div>Status: Terbuka untuk Peluang Teknis (Software Engineer / Data Analyst / IT Support Specialist)</div>
      </div>
    `;
  } else {
    responseHtml = `<div class="text-rose-400 pl-3 border-l-2 border-rose-500/50 text-[10px] sm:text-xs">${isEn ? `Command '${rawCmd}' not recognized. Type <span class="text-white font-bold">help</span> to list commands.` : `Perintah '${rawCmd}' tidak dikenal. Ketik <span class="text-white font-bold">help</span> untuk melihat daftar perintah.`}</div>`;
  }

  const newEntry = document.createElement('div');
  newEntry.className = "space-y-1";
  newEntry.innerHTML = `
    <div class="text-slate-400 flex items-center gap-1.5">
      <span class="text-emerald-400 font-bold">$</span>
      <span>${rawCmd}</span>
    </div>
    ${responseHtml}
  `;

  outputEl.appendChild(newEntry);
  outputEl.scrollTop = outputEl.scrollHeight;
};

// Technical Interview Guide Modal
window.openInterviewGuide = function() {
  const modal = document.getElementById('interviewModal');
  const body = document.getElementById('interviewGuideBody');
  if (!modal || !body) return;

  const isEn = window.currentLang === 'en';
  body.innerHTML = isEn ? `
    <div class="space-y-5">
      <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. SIMRS Core Enterprise Architecture (Permenkes 24/2022)</h4>
        <p class="text-xs text-slate-600 dark:text-slate-300">
          Built on <strong>Laravel 11, PHP 8.2, and MySQL</strong> adhering to Indonesian Ministry of Health standards:
          BPJS V-Claim SEP bridging, searchable 40+ ICD-10 clinical diagnoses in EMR SOAP, LOINC Lab orders, pharmacy e-prescriptions, Bed Matrix with real-time BOR efficiency indicators, and SatuSehat FHIR JSON bundle mapping.
        </p>
      </div>

      <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm">2. Dev & Data Engineering Suite (29 Tools)</h4>
        <p class="text-xs text-slate-600 dark:text-slate-300">
          High-performance modular utilities: 32-bit IPv4 bitwise subnetting & VLSM, Linux UFW/iptables/Mikrotik firewall generators, data imputation & Tukey's IQR outlier inspections, and security cryptography tools.
        </p>
      </div>

      <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm">3. SHUNA AI Data Engine (MSIB Skilvul Capstone Group 26 - Score 81.8)</h4>
        <p class="text-xs text-slate-600 dark:text-slate-300">
          NLP pipeline with Indonesian slang/typo normalizer, TF-IDF vectorization, multi-model benchmark arena (LogReg 93.5%, SVM 94.0%, NB 91.2%, RF 92.4%), ROC-AUC curve simulator (AUC = 0.962), and tabular Sigmoid retention classifier.
        </p>
      </div>
    </div>
  ` : `
    <div class="space-y-5">
      <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Arsitektur SIMRS Core Enterprise (Laravel 11 &amp; Standar Kemenkes RI)</h4>
        <p class="text-xs text-slate-600 dark:text-slate-300">
          Dirancang berdasarkan regulasi <strong>Permenkes No. 24 Tahun 2022</strong> dan integrasi <strong>BPJS V-Claim 2.0</strong>:
          Bridging SEP admisi, RME SOAP dengan pencarian 40+ diagnosa ICD-10, E-Order Lab LOINC, resep elektronik farmasi, kasir billing kwitansi resmi, alokasi Bed Matrix dengan perhitungan BOR real-time, dan standarisasi SatuSehat FHIR.
        </p>
      </div>

      <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm">2. Dev &amp; Data Engineering Suite (29 Modul Komputasi)</h4>
        <p class="text-xs text-slate-600 dark:text-slate-300">
          Platform utilitas perkakas mandiri untuk manajemen jaringan IPv4, hardening firewall Linux/Mikrotik, manipulasi data kotor (Data Cleaner &amp; Outlier QC Tukey IQR), spreadsheet formula engine (XLOOKUP / Pivot), dan audit keamanan VAPT.
        </p>
      </div>

      <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
        <h4 class="font-bold text-slate-900 dark:text-white text-sm">3. SHUNA AI Data Engine (Proyek Capstone Kelompok 26 MSIB Skilvul - Nilai 81.8)</h4>
        <p class="text-xs text-slate-600 dark:text-slate-300">
          Pipeline klasifikasi sentimen NLP teks ulasan dengan normalizer bahasa gaul/slang Indonesia, pembobotan TF-IDF, komparasi multi-model (LogReg, SVM, NB, RF), simulasi threshold kurva ROC-AUC, serta simulator retensi siswa tabular.
        </p>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
};

window.closeInterviewGuide = function() {
  const modal = document.getElementById('interviewModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

// Initialization
function initHub() {
  initTheme();

  // Apply saved language or default to ID
  const savedLang = localStorage.getItem('app_lang') || 'id';
  if (typeof window.setLanguage === 'function') {
    window.setLanguage(savedLang);
  }

  // Language Switcher Button
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = window.currentLang === 'id' ? 'en' : 'id';
      if (typeof window.setLanguage === 'function') {
        window.setLanguage(nextLang);
      }
    });
  }

  // Technical Guide Button
  const viewInterviewDocBtn = document.getElementById('viewInterviewDocBtn');
  if (viewInterviewDocBtn) viewInterviewDocBtn.addEventListener('click', window.openInterviewGuide);

  // Theme Toggle Button
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);

  // Modal Backdrop Click
  const interviewModal = document.getElementById('interviewModal');
  if (interviewModal) {
    interviewModal.addEventListener('click', (e) => {
      if (e.target === interviewModal) window.closeInterviewGuide();
    });
  }

  // Esc Key to Close Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const interviewModal = document.getElementById('interviewModal');
      if (interviewModal && !interviewModal.classList.contains('hidden')) window.closeInterviewGuide();
    }
  });

  if (window.lucide) lucide.createIcons();
}

// Startup
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHub);
} else {
  initHub();
}
