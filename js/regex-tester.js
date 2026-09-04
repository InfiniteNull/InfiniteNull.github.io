/**
 * regex-tester.js
 * Tool: Regex Tester & Validation Sandbox
 * Menguji pola Regular Expression secara visual dengan real-time match highlighting, capture groups, dan template pola umum.
 */

window.renderRegexTester = function(container) {
  const SAMPLE_TEXT = `Kontak teknis jaringan & server:
Email Admin: rizki.ananda@potensi-utama.ac.id
Email Support: helpdesk@bank-sinarmas.co.id
IP Router: 192.168.1.1, Server: 10.200.15.44
Tanggal rilis: 2026-09-04
Token: JWT_eyJhbGciOiJIUzI1NiJ9`;

  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="code-2" class="w-4 h-4 text-emerald-600"></i>
          <span>Interactive Regular Expression (Regex) Tester</span>
        </h4>

        <!-- Presets -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Pola Regex Umum (Quick Presets):</label>
          <div class="flex flex-wrap gap-2 text-xs">
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:text-emerald-600 font-mono" data-pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}">Email Address</button>
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:text-emerald-600 font-mono" data-pattern="\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b">IPv4 Address</button>
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:text-emerald-600 font-mono" data-pattern="\\d{4}-\\d{2}-\\d{2}">Format Tanggal (YYYY-MM-DD)</button>
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:text-emerald-600 font-mono" data-pattern="https?:\\/\\/[^\\s/$.?#].[^\\s]*">URL Web</button>
          </div>
        </div>

        <!-- Pattern and Flags Input -->
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="flex-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400 text-xs">/</span>
            <input type="text" id="regexPatternInput" value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" placeholder="Masukkan ekspresi regex..." class="w-full pl-6 pr-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-slate-400 text-xs">/</span>
          </div>
          <input type="text" id="regexFlagsInput" value="g" placeholder="Flags (g, i, m)" class="w-24 px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none text-center" />
        </div>

        <!-- Test Text Area -->
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Teks Pengujian (Test String):</label>
          <textarea id="regexTestText" rows="4" class="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
        </div>
      </div>

      <!-- Result View -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="eye" class="w-4 h-4 text-sky-500"></i>
            Visual Match Preview
          </span>
          <span id="regexMatchCount" class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            2 Matches Found
          </span>
        </div>

        <!-- Highlighted Box -->
        <div id="regexHighlightBox" class="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 whitespace-pre-wrap leading-relaxed">
          <!-- Populated by JS -->
        </div>

        <!-- Match Items List -->
        <div class="space-y-2 pt-1 text-xs font-mono" id="regexMatchList">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const patternInput = container.querySelector('#regexPatternInput');
  const flagsInput = container.querySelector('#regexFlagsInput');
  const textInput = container.querySelector('#regexTestText');
  const highlightBox = container.querySelector('#regexHighlightBox');
  const matchCount = container.querySelector('#regexMatchCount');
  const matchList = container.querySelector('#regexMatchList');

  function runRegex() {
    const patStr = patternInput.value;
    const flags = flagsInput.value;
    const text = textInput.value;

    if (!patStr) {
      highlightBox.textContent = text;
      matchCount.textContent = "0 Matches";
      matchList.innerHTML = "";
      return;
    }

    try {
      const regex = new RegExp(patStr, flags.includes('g') ? flags : flags + 'g');
      const matches = [];
      let match;

      while ((match = regex.exec(text)) !== null) {
        matches.push({
          val: match[0],
          index: match.index
        });
        if (regex.lastIndex === match.index) regex.lastIndex++; // Avoid infinite loops on zero-width match
      }

      matchCount.textContent = `${matches.length} Matches Found`;

      if (matches.length === 0) {
        highlightBox.textContent = text;
        matchList.innerHTML = `<span class="text-slate-400 font-sans">Tidak ditemukan kecocokan pola pada teks.</span>`;
        return;
      }

      // Build Highlighted HTML
      let lastIdx = 0;
      let html = "";
      matches.forEach(m => {
        html += escapeHtml(text.substring(lastIdx, m.index));
        html += `<mark class="bg-amber-400 text-slate-950 font-bold px-1 rounded">${escapeHtml(m.val)}</mark>`;
        lastIdx = m.index + m.val.length;
      });
      html += escapeHtml(text.substring(lastIdx));
      highlightBox.innerHTML = html;

      // Render Match List
      matchList.innerHTML = `<div class="font-bold text-slate-500 uppercase text-[11px]">Daftar Nilai yang Cocok:</div>`;
      matches.slice(0, 10).forEach((m, idx) => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800";
        item.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold">${idx + 1}</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-bold">${escapeHtml(m.val)}</span>
          </div>
          <span class="text-slate-400 text-[10px]">Index Posisi: ${m.index}</span>
        `;
        matchList.appendChild(item);
      });

    } catch(e) {
      matchCount.textContent = "Regex Error";
      matchCount.className = "px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
      highlightBox.textContent = `Pattern Error: ${e.message}`;
      matchList.innerHTML = "";
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    });
  }

  patternInput.addEventListener('input', runRegex);
  flagsInput.addEventListener('input', runRegex);
  textInput.addEventListener('input', runRegex);

  container.querySelectorAll('.regex-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      patternInput.value = btn.dataset.pattern;
      runRegex();
    });
  });

  textInput.value = SAMPLE_TEXT;
  runRegex();
};
