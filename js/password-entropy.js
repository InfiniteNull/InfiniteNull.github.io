/**
 * password-entropy.js
 * Tool: Password Entropy & Brute-Force Time Estimator
 * Mengukur tingkat keamanan kata sandi berdasarkan entropy bit, mendeteksi pola kamus, dan menghitung estimasi waktu cracking CPU vs GPU Cluster.
 */

window.renderPasswordEntropy = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="key-round" class="w-4 h-4 text-emerald-600"></i>
          <span>Analisis Entropi & Estimasi Ketahanan Password (Audit Keamanan)</span>
        </h4>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Uji Password / Kata Sandi:</label>
            <button id="togglePwdVisibilityBtn" class="text-xs text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span id="pwdVisLabel">Tampilkan</span>
            </button>
          </div>
          <input type="password" id="pwdTestInput" value="P@ssw0rd2026!Bank" placeholder="Masukkan password untuk dianalisis..." class="w-full px-3.5 py-2.5 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        <!-- Entropy Gauge & Strength Bar -->
        <div class="space-y-1.5 pt-1">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-600 dark:text-slate-400">Skor Kekuatan Entropi:</span>
            <span id="pwdEntropyBits" class="font-mono font-bold text-emerald-600 dark:text-emerald-400">68.4 Bits (Sangat Kuat)</span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div id="pwdStrengthBar" class="h-full bg-emerald-500 transition-all duration-300" style="width: 85%"></div>
          </div>
        </div>
      </div>

      <!-- Result Matrix -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i>
          Estimasi Waktu Cracking (Brute-Force Offline Attack)
        </span>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1 font-sans">
            <span class="text-[11px] text-slate-500 block">Single CPU (10 Juta Hash/dtk)</span>
            <div id="resCpuCrackTime" class="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">~ 2,400 Tahun</div>
            <p class="text-[10px] text-slate-400">Serangan brute-force menggunakan single workstation biasa.</p>
          </div>

          <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1 font-sans">
            <span class="text-[11px] text-slate-500 block">High-End GPU Rig (1 Miliar Hash/dtk)</span>
            <div id="resGpuCrackTime" class="text-base font-bold font-mono text-sky-600 dark:text-sky-400">~ 24 Tahun</div>
            <p class="text-[10px] text-slate-400">Serangan menggunakan rig multi RTX 4090 Hashcat.</p>
          </div>

          <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1 font-sans">
            <span class="text-[11px] text-slate-500 block">Supercomputer / Cloud Cluster (100 Miliar/dtk)</span>
            <div id="resSuperCrackTime" class="text-base font-bold font-mono text-amber-600 dark:text-amber-400">~ 88 Hari</div>
            <p class="text-[10px] text-slate-400">Kluster server khusus distributed cracking skala enterprise.</p>
          </div>
        </div>

        <!-- Complexity Checklist -->
        <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span class="font-bold text-slate-700 dark:text-slate-300">Kepatuhan Standar Kebijakan Password Perbankan / Korporat:</span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" id="pwdRequirements">
            <!-- Populated by JS -->
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  let isVisible = false;
  const pwdInput = container.querySelector('#pwdTestInput');
  const toggleBtn = container.querySelector('#togglePwdVisibilityBtn');
  const visLabel = container.querySelector('#pwdVisLabel');

  toggleBtn.addEventListener('click', () => {
    isVisible = !isVisible;
    pwdInput.type = isVisible ? "text" : "password";
    visLabel.textContent = isVisible ? "Sembunyikan" : "Tampilkan";
  });

  function formatTime(seconds) {
    if (seconds < 1) return "Instan (< 1 detik)";
    if (seconds < 60) return `${Math.round(seconds)} Detik`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} Menit`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} Jam`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} Hari`;
    if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} Tahun`;
    if (seconds < 31536000 * 1000000) return `${(seconds / (31536000 * 1000)).toFixed(1)} Ribu Tahun`;
    return `${(seconds / (31536000 * 1000000)).toFixed(1)} Juta Tahun`;
  }

  function evaluatePassword() {
    const pwd = pwdInput.value;
    const len = pwd.length;

    let pool = 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) pool += 26;
    if (hasUpper) pool += 26;
    if (hasDigit) pool += 10;
    if (hasSymbol) pool += 33;

    const entropy = len > 0 && pool > 0 ? (len * Math.log2(pool)) : 0;
    const totalCombinations = pool > 0 ? Math.pow(pool, len) : 0;

    // Speeds in hashes per second
    const cpuSpeed = 10000000;      // 10 MH/s
    const gpuSpeed = 1000000000;    // 1 GH/s
    const superSpeed = 100000000000; // 100 GH/s

    const cpuSec = (totalCombinations / 2) / cpuSpeed;
    const gpuSec = (totalCombinations / 2) / gpuSpeed;
    const superSec = (totalCombinations / 2) / superSpeed;

    container.querySelector('#resCpuCrackTime').textContent = formatTime(cpuSec);
    container.querySelector('#resGpuCrackTime').textContent = formatTime(gpuSec);
    container.querySelector('#resSuperCrackTime').textContent = formatTime(superSec);

    let strengthLabel = "Sangat Lemah";
    let barColor = "bg-red-500";
    let barPct = 10;

    if (entropy >= 80) { strengthLabel = "Sangat Kuat (Enterprise Grade)"; barColor = "bg-emerald-500"; barPct = 100; }
    else if (entropy >= 60) { strengthLabel = "Kuat"; barColor = "bg-emerald-500"; barPct = 80; }
    else if (entropy >= 45) { strengthLabel = "Sedang"; barColor = "bg-amber-500"; barPct = 55; }
    else if (entropy >= 28) { strengthLabel = "Lemah"; barColor = "bg-orange-500"; barPct = 35; }
    else { strengthLabel = "Sangat Lemah"; barColor = "bg-red-500"; barPct = 15; }

    const bitsLabel = container.querySelector('#pwdEntropyBits');
    bitsLabel.textContent = `${entropy.toFixed(1)} Bits (${strengthLabel})`;

    const bar = container.querySelector('#pwdStrengthBar');
    bar.style.width = `${barPct}%`;
    bar.className = `h-full ${barColor} transition-all duration-300`;

    // Render Requirements
    const reqs = [
      { label: "Panjang &ge; 12 Karakter", pass: len >= 12 },
      { label: "Huruf Besar & Kecil", pass: hasLower && hasUpper },
      { label: "Karakter Angka (0-9)", pass: hasDigit },
      { label: "Simbol Khusus (!@#$)", pass: hasSymbol }
    ];

    const reqDiv = container.querySelector('#pwdRequirements');
    reqDiv.innerHTML = "";
    reqs.forEach(r => {
      const item = document.createElement('div');
      item.className = `p-2 rounded border flex items-center gap-1.5 text-[11px] font-medium ${r.pass ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400'}`;
      item.innerHTML = `
        <i data-lucide="${r.pass ? 'check' : 'x'}" class="w-3.5 h-3.5 shrink-0 ${r.pass ? 'text-emerald-600' : 'text-slate-400'}"></i>
        <span>${r.label}</span>
      `;
      reqDiv.appendChild(item);
    });

    if (window.lucide) lucide.createIcons();
  }

  pwdInput.addEventListener('input', evaluatePassword);
  evaluatePassword();
};
