/**
 * payload-encoder.js
 * Tool: Security Payload Encoder / Decoder
 * Konversi instan multi-format untuk URL-Encode, Base64, Hexadecimal, HTML Entities, Binary, dan Unicode (alat bantu analisa VAPT & Pentest).
 */

window.renderPayloadEncoder = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="binary" class="w-4 h-4 text-sky-600"></i>
            <span>Multi-Format Security Payload Encoder & Decoder</span>
          </h4>
          <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
            <button id="modeEncodeBtn" class="px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-sky-600 dark:text-white shadow-sm transition">Encode</button>
            <button id="modeDecodeBtn" class="px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Decode</button>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Input String / Payload:</label>
            <div class="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span>Sample Payload:</span>
              <button class="sample-payload-btn px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:text-sky-600" data-text="<script>alert('VAPT-Test')</script>">XSS Tag</button>
              <button class="sample-payload-btn px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:text-sky-600" data-text="' OR 1=1 -- -">SQL Injection</button>
              <button class="sample-payload-btn px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:text-sky-600" data-text="admin:SuperSecret2026!">Basic Auth</button>
            </div>
          </div>
          <textarea id="payloadInput" rows="3" class="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"><script>alert('VAPT-Test')</script></textarea>
        </div>
      </div>

      <!-- Conversion Cards Grid -->
      <div class="space-y-3">
        <!-- Base64 -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-sky-600 dark:text-sky-400">1. Base64 (Standard Encoding)</span>
            <button class="copy-enc-btn text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" data-target="outBase64">
              <i data-lucide="copy" class="w-3 h-3"></i> Salin
            </button>
          </div>
          <div id="outBase64" class="p-2.5 rounded bg-slate-950 text-sky-300 font-mono text-xs break-all border border-slate-800"></div>
        </div>

        <!-- URL Encode / Percent Encoding -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-emerald-600 dark:text-emerald-400">2. URL / Percent Encoding (HTTP URI & Params)</span>
            <button class="copy-enc-btn text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" data-target="outUrl">
              <i data-lucide="copy" class="w-3 h-3"></i> Salin
            </button>
          </div>
          <div id="outUrl" class="p-2.5 rounded bg-slate-950 text-emerald-300 font-mono text-xs break-all border border-slate-800"></div>
        </div>

        <!-- Hexadecimal -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-amber-600 dark:text-amber-400">3. Hexadecimal (0x... Byte Stream)</span>
            <button class="copy-enc-btn text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" data-target="outHex">
              <i data-lucide="copy" class="w-3 h-3"></i> Salin
            </button>
          </div>
          <div id="outHex" class="p-2.5 rounded bg-slate-950 text-amber-300 font-mono text-xs break-all border border-slate-800"></div>
        </div>

        <!-- HTML Entities -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-purple-600 dark:text-purple-400">4. HTML Entity (XSS Sanitization Output)</span>
            <button class="copy-enc-btn text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" data-target="outHtml">
              <i data-lucide="copy" class="w-3 h-3"></i> Salin
            </button>
          </div>
          <div id="outHtml" class="p-2.5 rounded bg-slate-950 text-purple-300 font-mono text-xs break-all border border-slate-800"></div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  let mode = "encode"; // "encode" or "decode"

  const modeEncBtn = container.querySelector('#modeEncodeBtn');
  const modeDecBtn = container.querySelector('#modeDecodeBtn');
  const inputArea = container.querySelector('#payloadInput');

  modeEncBtn.addEventListener('click', () => {
    mode = "encode";
    modeEncBtn.className = "px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-sky-600 dark:text-white shadow-sm transition";
    modeDecBtn.className = "px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
    transform();
  });

  modeDecBtn.addEventListener('click', () => {
    mode = "decode";
    modeDecBtn.className = "px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-sky-600 dark:text-white shadow-sm transition";
    modeEncBtn.className = "px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
    transform();
  });

  function stringToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      hex += str.charCodeAt(i).toString(16).padStart(2, '0') + ' ';
    }
    return hex.trim();
  }

  function hexToString(hex) {
    hex = hex.replace(/[^0-9a-fA-F]/g, '');
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
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

  function unescapeHtml(str) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
  }

  function transform() {
    const text = inputArea.value;

    let b64 = "", url = "", hex = "", html = "";

    if (mode === "encode") {
      try { b64 = btoa(unescape(encodeURIComponent(text))); } catch(e) { b64 = "Encoding Error"; }
      url = encodeURIComponent(text);
      hex = stringToHex(text);
      html = escapeHtml(text);
    } else {
      try { b64 = decodeURIComponent(escape(atob(text))); } catch(e) { b64 = "(Bukan Base64 valid)"; }
      try { url = decodeURIComponent(text); } catch(e) { url = "(Bukan URL Encoded valid)"; }
      try { hex = hexToString(text); } catch(e) { hex = "(Bukan Hex valid)"; }
      html = unescapeHtml(text);
    }

    container.querySelector('#outBase64').textContent = b64 || "-";
    container.querySelector('#outUrl').textContent = url || "-";
    container.querySelector('#outHex').textContent = hex || "-";
    container.querySelector('#outHtml').textContent = html || "-";
  }

  inputArea.addEventListener('input', transform);

  container.querySelectorAll('.sample-payload-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      inputArea.value = btn.dataset.text;
      transform();
    });
  });

  container.querySelectorAll('.copy-enc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const text = container.querySelector(`#${targetId}`).textContent;
      navigator.clipboard.writeText(text).then(() => {
        if (window.showToast) showToast("Teks berhasil disalin!", "success");
      });
    });
  });

  transform();
};
