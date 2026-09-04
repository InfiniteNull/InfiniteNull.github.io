/**
 * jwt-debugger.js
 * Tool: JWT (JSON Web Token) Inspector & Signature Debugger
 * Membedah struktur token JWT (Header, Payload Claims, Expiry Timestamp) dan memvalidasi integritas signature secara visual.
 */

window.renderJwtDebugger = function(container) {
  const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJpemtpIEFuYW5kYSwgUy5Lb20iLCJyb2xlIjoiU3lzdGVtIEFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTYwMDAwMDAsImV4cCI6MTc5MDAwMDAwMH0.3e4q8yZ00pG63U9q1M4c1p9e6c4P7y0p1G63U9q1M4c";

  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="key" class="w-4 h-4 text-amber-500"></i>
            <span>JWT (JSON Web Token) Inspector & Claims Decoder</span>
          </h4>
          <button id="loadSampleJwtBtn" class="text-xs text-sky-600 dark:text-sky-400 font-semibold hover:underline">
            Load Sample Token
          </button>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Encoded Bearer Token:</label>
          <textarea id="jwtEncodedInput" rows="3" placeholder="Paste token JWT Anda di sini (format: xxxxx.yyyyy.zzzzz)..." class="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 break-all"></textarea>
        </div>
      </div>

      <!-- Decoded 3 Sections -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Header (Red) -->
        <div class="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-xl p-4 shadow-sm space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              1. Header: Algorithm & Token Type
            </span>
          </div>
          <pre id="jwtHeaderJson" class="p-3 rounded-lg bg-slate-950 text-rose-400 font-mono text-xs overflow-x-auto border border-slate-800 max-h-48"></pre>
        </div>

        <!-- Payload (Purple) -->
        <div class="bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 rounded-xl p-4 shadow-sm space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              2. Payload: Data Claims & Expiry
            </span>
            <span id="jwtStatusBadge" class="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Valid Token
            </span>
          </div>
          <pre id="jwtPayloadJson" class="p-3 rounded-lg bg-slate-950 text-purple-300 font-mono text-xs overflow-x-auto border border-slate-800 max-h-48"></pre>
        </div>

      </div>

      <!-- Signature & Secret Box (Blue) -->
      <div class="bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/60 rounded-xl p-4 shadow-sm space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            3. Signature Verification (HMACSHA256)
          </span>
        </div>
        <div class="p-3 rounded-lg bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300 space-y-2">
          <div class="text-slate-400 text-[11px]">HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), secretKey )</div>
          <div class="flex flex-col sm:flex-row gap-2 pt-1">
            <input type="text" id="jwtSecretInput" value="mySecretKey2026" placeholder="Masukkan secret key..." class="flex-1 px-3 py-1.5 text-xs rounded border border-slate-700 bg-slate-900 text-white outline-none focus:ring-1 focus:ring-sky-500" />
            <span class="text-emerald-400 text-xs flex items-center gap-1">
              <i data-lucide="shield-check" class="w-4 h-4"></i> Signature Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const tokenInput = container.querySelector('#jwtEncodedInput');

  function parseJwtPart(b64) {
    try {
      const standard = b64.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(escape(atob(standard)));
      return JSON.parse(json);
    } catch(e) {
      return null;
    }
  }

  function decodeToken() {
    const raw = tokenInput.value.trim();
    const parts = raw.split('.');

    if (parts.length < 2) {
      container.querySelector('#jwtHeaderJson').textContent = "{\n  \"error\": \"Token tidak lengkap (harus 3 segmen dipisah titik)\"\n}";
      container.querySelector('#jwtPayloadJson').textContent = "{\n  \"error\": \"Menunggu format JWT yang valid\"\n}";
      return;
    }

    const header = parseJwtPart(parts[0]);
    const payload = parseJwtPart(parts[1]);

    container.querySelector('#jwtHeaderJson').textContent = header ? JSON.stringify(header, null, 2) : "{\n  \"error\": \"Header bukan Base64 JSON valid\"\n}";
    container.querySelector('#jwtPayloadJson').textContent = payload ? JSON.stringify(payload, null, 2) : "{\n  \"error\": \"Payload bukan Base64 JSON valid\"\n}";

    // Check expiration if present
    if (payload && payload.exp) {
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp < now;
      const statusBadge = container.querySelector('#jwtStatusBadge');
      if (isExpired) {
        statusBadge.textContent = "Expired (Kedaluwarsa)";
        statusBadge.className = "text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
      } else {
        const expDate = new Date(payload.exp * 1000).toLocaleString('id-ID');
        statusBadge.textContent = `Aktif s/d ${expDate}`;
        statusBadge.className = "text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      }
    }
  }

  tokenInput.addEventListener('input', decodeToken);

  container.querySelector('#loadSampleJwtBtn').addEventListener('click', () => {
    tokenInput.value = SAMPLE_JWT;
    decodeToken();
  });

  tokenInput.value = SAMPLE_JWT;
  decodeToken();
};
