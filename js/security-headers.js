/**
 * security-headers.js
 * Tool: Security Headers & Web Hardening Analyzer
 * Menganalisis keberadaan HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) dan menghitung Security Grade.
 */

window.renderSecurityHeaders = function(container) {
  const DEFAULT_HEADERS = {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net; style-src 'self' 'unsafe-inline';",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
  };

  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="shield-alert" class="w-4 h-4 text-emerald-600"></i>
          <span>Analyzer & Validator HTTP Security Headers</span>
        </h4>
        
        <p class="text-xs text-slate-600 dark:text-slate-400">
          Uji konfigurasi security headers pada web server / response API Anda untuk mencegah serangan <strong>Clickjacking, XSS, MIME Sniffing, dan MITM</strong>.
        </p>

        <div class="flex flex-wrap items-center gap-2">
          <button id="presetSecureHeadersBtn" class="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition">
            Load Preset: Standar Hardening A+
          </button>
          <button id="presetVulnerableHeadersBtn" class="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs font-semibold hover:bg-red-100 transition">
            Load Preset: Server Rentan (Tanpa Proteksi)
          </button>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Raw HTTP Response Headers (Paste dari Burp Suite / Curl):</label>
          <textarea id="rawHeadersInput" rows="6" class="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
        </div>

        <button id="analyzeHeadersBtn" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
          <i data-lucide="scan" class="w-3.5 h-3.5"></i>
          <span>Analisis Keamanan Header</span>
        </button>
      </div>

      <!-- Audit Results -->
      <div id="headersResultCard" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Hasil Audit Keamanan Header</span>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400">Score Rating:</span>
            <span id="securityGradeBadge" class="px-3 py-1 rounded-lg text-sm font-bold font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              GRADE A+ (100/100)
            </span>
          </div>
        </div>

        <div class="space-y-3" id="headersChecklist">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const CHECKLIST_CRITERIA = [
    {
      name: "Strict-Transport-Security (HSTS)",
      key: "strict-transport-security",
      desc: "Memaksa browser hanya mengakses via HTTPS terenkripsi untuk mencegah Man-in-the-Middle (MITM) SSL stripping.",
      score: 20
    },
    {
      name: "Content-Security-Policy (CSP)",
      key: "content-security-policy",
      desc: "Membatasi sumber script dan objek untuk memitigasi serangan Cross-Site Scripting (XSS) dan data injection.",
      score: 25
    },
    {
      name: "X-Frame-Options",
      key: "x-frame-options",
      desc: "Mencegah website dimasukkan ke dalam iframe website lain (Mitigasi Clickjacking).",
      score: 15
    },
    {
      name: "X-Content-Type-Options",
      key: "x-content-type-options",
      desc: "Mencegah browser melakukan MIME-sniffing keluar dari Content-Type yang dideklarasikan.",
      score: 15
    },
    {
      name: "Referrer-Policy",
      key: "referrer-policy",
      desc: "Mengontrol seberapa banyak informasi referrer URL yang dikirimkan saat pengguna berpindah link.",
      score: 15
    },
    {
      name: "Permissions-Policy",
      key: "permissions-policy",
      desc: "Membatasi akses browser API sensitif (Kamera, Mikrofon, Geolocation, USB).",
      score: 10
    }
  ];

  function runAudit() {
    const raw = container.querySelector('#rawHeadersInput').value.trim();
    const lines = raw.split('\n');
    const parsed = {};

    lines.forEach(l => {
      const idx = l.indexOf(':');
      if (idx > -1) {
        const k = l.substring(0, idx).trim().toLowerCase();
        const v = l.substring(idx + 1).trim();
        parsed[k] = v;
      }
    });

    let totalScore = 0;
    const checklistDiv = container.querySelector('#headersChecklist');
    checklistDiv.innerHTML = "";

    CHECKLIST_CRITERIA.forEach(crit => {
      const val = parsed[crit.key];
      const isPresent = Boolean(val);
      if (isPresent) totalScore += crit.score;

      const item = document.createElement('div');
      item.className = `p-3 rounded-lg border ${isPresent ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20'} space-y-1.5 text-xs`;
      item.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 font-bold ${isPresent ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}">
            <i data-lucide="${isPresent ? 'check-circle' : 'alert-circle'}" class="w-4 h-4 shrink-0"></i>
            <span>${crit.name}</span>
          </div>
          <span class="font-mono text-[10px] px-2 py-0.5 rounded font-bold ${isPresent ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}">
            ${isPresent ? `+${crit.score} Poin (PASSED)` : '0 Poin (MISSING)'}
          </span>
        </div>
        <p class="text-[11px] text-slate-600 dark:text-slate-400">${crit.desc}</p>
        ${isPresent ? `<div class="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 break-all border border-slate-200 dark:border-slate-800">Value: ${val}</div>` : `<div class="text-[10px] text-red-500 font-medium">Rekomendasi: Tambahkan header ini pada konfigurasi Nginx / server Anda.</div>`}
      `;
      checklistDiv.appendChild(item);
    });

    if (window.lucide) lucide.createIcons();

    // Grade calculation
    let grade = "A+";
    let badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
    if (totalScore >= 90) { grade = "A+"; badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"; }
    else if (totalScore >= 75) { grade = "B"; badgeClass = "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"; }
    else if (totalScore >= 50) { grade = "C"; badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"; }
    else if (totalScore >= 30) { grade = "D"; badgeClass = "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300"; }
    else { grade = "F (High Risk)"; badgeClass = "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"; }

    const gradeBadge = container.querySelector('#securityGradeBadge');
    gradeBadge.textContent = `GRADE ${grade} (${totalScore}/100)`;
    gradeBadge.className = `px-3 py-1 rounded-lg text-sm font-bold font-mono ${badgeClass}`;
  }

  function loadSecure() {
    const raw = Object.entries(DEFAULT_HEADERS).map(([k, v]) => `${k}: ${v}`).join('\n') + `\nServer: nginx/1.24.0\nContent-Type: text/html; charset=UTF-8`;
    container.querySelector('#rawHeadersInput').value = raw;
    runAudit();
  }

  function loadVulnerable() {
    container.querySelector('#rawHeadersInput').value = `Server: Apache/2.4.41 (Ubuntu)\nX-Powered-By: PHP/7.4.3\nContent-Type: text/html; charset=UTF-8\nConnection: keep-alive`;
    runAudit();
  }

  container.querySelector('#presetSecureHeadersBtn').addEventListener('click', loadSecure);
  container.querySelector('#presetVulnerableHeadersBtn').addEventListener('click', loadVulnerable);
  container.querySelector('#analyzeHeadersBtn').addEventListener('click', runAudit);

  loadSecure();
};
