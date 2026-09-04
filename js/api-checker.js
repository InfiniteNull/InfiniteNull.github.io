/**
 * api-checker.js
 * Tool: API Health & Status Checker
 * Menguji endpoint REST API secara real-time dengan status code, latency (ms), dan response preview.
 */

window.renderApiChecker = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <i data-lucide="radio" class="w-4 h-4 text-sky-600"></i>
          <span>Uji Endpoint Kustom</span>
        </h4>
        <div class="flex flex-col sm:flex-row gap-2">
          <select id="apiMethodSelect" class="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input type="url" id="apiUrlInput" value="https://jsonplaceholder.typicode.com/posts/1" placeholder="Masukkan URL API (contoh: https://api.github.com)" class="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none font-mono" />
          <button id="apiSendBtn" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition">
            <i data-lucide="send" class="w-3.5 h-3.5"></i>
            <span>Kirim Request</span>
          </button>
        </div>
      </div>

      <!-- Result Card -->
      <div id="apiResultCard" class="hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span id="apiStatusBadge" class="px-2.5 py-1 rounded text-xs font-bold font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              200 OK
            </span>
            <span id="apiLatencyBadge" class="px-2.5 py-1 rounded text-xs font-medium font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              ⚡ 124 ms
            </span>
          </div>
          <span class="text-xs text-slate-400 font-mono" id="apiTimestamp">Baru saja</span>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-semibold text-slate-600 dark:text-slate-400">Response Body (JSON)</span>
            <button id="copyApiResponseBtn" class="text-xs text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
              <i data-lucide="copy" class="w-3 h-3"></i> Salin
            </button>
          </div>
          <pre id="apiResponseBody" class="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs font-mono max-h-60 overflow-y-auto overflow-x-auto leading-relaxed border border-slate-800"></pre>
        </div>
      </div>

      <!-- Preset Popular Public APIs -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Daftar Contoh Endpoint Populer</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="apiPresetsContainer">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const presets = [
    { name: "JSONPlaceholder (Posts)", url: "https://jsonplaceholder.typicode.com/posts/1", method: "GET" },
    { name: "Reqres (Users List)", url: "https://reqres.in/api/users", method: "GET" },
    { name: "Open-Meteo (Weather)", url: "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&current_weather=true", method: "GET" },
    { name: "Cat Facts API", url: "https://catfact.ninja/fact", method: "GET" }
  ];

  const presetsContainer = container.querySelector('#apiPresetsContainer');
  presetsContainer.innerHTML = presets.map(p => `
    <div class="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between hover:border-sky-500 transition cursor-pointer preset-api-item" data-url="${p.url}" data-method="${p.method}">
      <div class="overflow-hidden pr-2">
        <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">${p.name}</div>
        <div class="text-[11px] font-mono text-slate-500 truncate">${p.url}</div>
      </div>
      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
        ${p.method}
      </span>
    </div>
  `).join('');

  // Event Listeners
  const urlInput = container.querySelector('#apiUrlInput');
  const methodSelect = container.querySelector('#apiMethodSelect');
  const sendBtn = container.querySelector('#apiSendBtn');
  const resultCard = container.querySelector('#apiResultCard');
  const statusBadge = container.querySelector('#apiStatusBadge');
  const latencyBadge = container.querySelector('#apiLatencyBadge');
  const responseBody = container.querySelector('#apiResponseBody');
  const timestamp = container.querySelector('#apiTimestamp');
  const copyBtn = container.querySelector('#copyApiResponseBtn');

  container.querySelectorAll('.preset-api-item').forEach(item => {
    item.addEventListener('click', () => {
      urlInput.value = item.dataset.url;
      methodSelect.value = item.dataset.method;
      executeRequest();
    });
  });

  sendBtn.addEventListener('click', executeRequest);

  async function executeRequest() {
    const url = urlInput.value.trim();
    const method = methodSelect.value;
    if (!url) return;

    sendBtn.disabled = true;
    sendBtn.innerHTML = `<span class="animate-spin mr-1">⏳</span> Memeriksa...`;

    const startTime = performance.now();
    try {
      const response = await fetch(url, { method });
      const latency = Math.round(performance.now() - startTime);
      
      let bodyText = "";
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const json = await response.json();
        bodyText = JSON.stringify(json, null, 2);
      } else {
        bodyText = await response.text();
      }

      resultCard.classList.remove('hidden');
      statusBadge.textContent = `${response.status} ${response.statusText || (response.ok ? 'OK' : 'Error')}`;
      if (response.ok) {
        statusBadge.className = "px-2.5 py-1 rounded text-xs font-bold font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      } else {
        statusBadge.className = "px-2.5 py-1 rounded text-xs font-bold font-mono bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
      }

      latencyBadge.textContent = `⚡ ${latency} ms`;
      responseBody.textContent = bodyText;
      timestamp.textContent = new Date().toLocaleTimeString();
    } catch (err) {
      const latency = Math.round(performance.now() - startTime);
      resultCard.classList.remove('hidden');
      statusBadge.textContent = `0 FAILED / CORS`;
      statusBadge.className = "px-2.5 py-1 rounded text-xs font-bold font-mono bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
      latencyBadge.textContent = `⚡ ${latency} ms`;
      responseBody.textContent = `Error: Request diblokir oleh browser (CORS policy) atau server tidak merespons.\nDetail: ${err.message}`;
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = `<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Kirim Request</span>`;
      if (window.lucide) lucide.createIcons();
    }
  }

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(responseBody.textContent);
    window.showToast?.('Response JSON berhasil disalin!');
  });
};
