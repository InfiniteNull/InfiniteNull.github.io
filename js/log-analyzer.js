/**
 * log-analyzer.js
 * Tool: Nginx & Server Access Log Analyzer
 * Melakukan parsing dan agregasi statistik raw access logs server (status codes 200/404/500, top visitors, endpoints paling aktif, dan deteksi request mencurigakan).
 */

window.renderLogAnalyzer = function(container) {
  const SAMPLE_LOGS = `192.168.1.45 - - [04/Sep/2026:10:12:01 +0700] "GET /api/v1/auth/login HTTP/1.1" 200 452 "-" "Mozilla/5.0"
192.168.1.102 - - [04/Sep/2026:10:12:05 +0700] "GET /dashboard HTTP/1.1" 200 3412 "-" "Mozilla/5.0"
10.0.0.15 - - [04/Sep/2026:10:12:15 +0700] "POST /api/v1/inventory/items HTTP/1.1" 201 120 "-" "PostmanRuntime/7.28.4"
185.220.101.5 - - [04/Sep/2026:10:13:00 +0700] "GET /wp-login.php HTTP/1.1" 404 153 "-" "python-requests/2.26.0"
185.220.101.5 - - [04/Sep/2026:10:13:02 +0700] "GET /.env HTTP/1.1" 404 153 "-" "python-requests/2.26.0"
192.168.1.45 - - [04/Sep/2026:10:13:20 +0700] "GET /api/v1/books/list HTTP/1.1" 200 1845 "-" "Mozilla/5.0"
10.0.0.88 - - [04/Sep/2026:10:13:45 +0700] "POST /api/v1/upload HTTP/1.1" 500 89 "-" "Mozilla/5.0"
192.168.1.102 - - [04/Sep/2026:10:14:10 +0700] "GET /assets/main.css HTTP/1.1" 304 0 "-" "Mozilla/5.0"
10.0.0.15 - - [04/Sep/2026:10:14:30 +0700] "DELETE /api/v1/inventory/items/4 HTTP/1.1" 200 64 "-" "PostmanRuntime/7.28.4"
192.168.1.45 - - [04/Sep/2026:10:15:00 +0700] "GET /stream/live.m3u8 HTTP/1.1" 200 8200 "-" "VLC/3.0.18"`;

  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="file-text" class="w-4 h-4 text-sky-600"></i>
            <span>Nginx / Web Server Access Log Analyzer</span>
          </h4>
          <button id="loadSampleLogsBtn" class="text-xs text-sky-600 dark:text-sky-400 font-semibold hover:underline">
            Load Sample Nginx Log
          </button>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Raw Access Log (Combined / Common Nginx Log Format):</label>
          <textarea id="rawLogsInput" rows="5" placeholder="Paste access.log dari /var/log/nginx/access.log di sini..." class="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"></textarea>
        </div>
      </div>

      <!-- Aggregated Summary Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span class="text-slate-400 text-[11px] block">Total Requests</span>
          <div id="logTotalReq" class="text-xl font-bold font-mono text-slate-900 dark:text-white">10</div>
        </div>
        <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span class="text-emerald-500 text-[11px] block">2xx Success Rate</span>
          <div id="logSuccessRate" class="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">70%</div>
        </div>
        <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span class="text-amber-500 text-[11px] block">4xx Client Errors</span>
          <div id="log4xxCount" class="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">2 (20%)</div>
        </div>
        <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span class="text-rose-500 text-[11px] block">5xx Server Errors</span>
          <div id="log5xxCount" class="text-xl font-bold font-mono text-rose-600 dark:text-rose-400">1 (10%)</div>
        </div>
      </div>

      <!-- Top IPs & Endpoints Breakdown -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        <!-- Top IP Visitors -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <span class="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider block">Top IP Pengunjung</span>
          <div id="logTopIps" class="space-y-1.5 font-mono">
            <!-- Rendered by JS -->
          </div>
        </div>

        <!-- Top Request Paths -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <span class="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider block">Top Endpoint / URL Path</span>
          <div id="logTopPaths" class="space-y-1.5 font-mono">
            <!-- Rendered by JS -->
          </div>
        </div>

      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const logsInput = container.querySelector('#rawLogsInput');

  function analyzeLogs() {
    const raw = logsInput.value.trim();
    if (!raw) return;

    const lines = raw.split('\n').filter(l => l.trim().length > 0);
    const total = lines.length;

    let success2xx = 0;
    let err4xx = 0;
    let err5xx = 0;

    const ipCount = {};
    const pathCount = {};

    // Standard Combined Log Regex
    const logRegex = /^(\S+)\s+\S+\s+\S+\s+\[([^\]]+)\]\s+"(\S+)\s+(\S+)\s*([^"]*)"\s+(\d{3})\s+(\S+)/;

    lines.forEach(line => {
      const match = line.match(logRegex);
      if (match) {
        const ip = match[1];
        const method = match[3];
        const path = match[4];
        const status = parseInt(match[6], 10);

        ipCount[ip] = (ipCount[ip] || 0) + 1;
        pathCount[path] = (pathCount[path] || 0) + 1;

        if (status >= 200 && status < 300) success2xx++;
        else if (status >= 400 && status < 500) err4xx++;
        else if (status >= 500 && status < 600) err5xx++;
      } else {
        // Fallback simple parsing
        const parts = line.split(' ');
        if (parts.length >= 7) {
          const ip = parts[0];
          ipCount[ip] = (ipCount[ip] || 0) + 1;
        }
      }
    });

    container.querySelector('#logTotalReq').textContent = total.toLocaleString();
    container.querySelector('#logSuccessRate').textContent = `${Math.round((success2xx / total) * 100)}%`;
    container.querySelector('#log4xxCount').textContent = `${err4xx} (${Math.round((err4xx / total) * 100)}%)`;
    container.querySelector('#log5xxCount').textContent = `${err5xx} (${Math.round((err5xx / total) * 100)}%)`;

    // Render Top IPs
    const sortedIps = Object.entries(ipCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topIpsDiv = container.querySelector('#logTopIps');
    topIpsDiv.innerHTML = "";
    sortedIps.forEach(([ip, cnt]) => {
      const row = document.createElement('div');
      row.className = "flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800";
      row.innerHTML = `
        <span class="text-slate-800 dark:text-slate-200">${ip}</span>
        <span class="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-[10px]">${cnt} req (${Math.round((cnt/total)*100)}%)</span>
      `;
      topIpsDiv.appendChild(row);
    });

    // Render Top Paths
    const sortedPaths = Object.entries(pathCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topPathsDiv = container.querySelector('#logTopPaths');
    topPathsDiv.innerHTML = "";
    sortedPaths.forEach(([p, cnt]) => {
      const isSuspicious = p.includes('.env') || p.includes('wp-login') || p.includes('../');
      const row = document.createElement('div');
      row.className = `flex items-center justify-between p-2 rounded ${isSuspicious ? 'bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60' : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800'}`;
      row.innerHTML = `
        <span class="truncate max-w-[200px] text-slate-800 dark:text-slate-200 ${isSuspicious ? 'text-red-600 dark:text-red-400 font-bold' : ''}">${p}</span>
        <span class="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] shrink-0">${cnt} req</span>
      `;
      topPathsDiv.appendChild(row);
    });
  }

  logsInput.addEventListener('input', analyzeLogs);
  container.querySelector('#loadSampleLogsBtn').addEventListener('click', () => {
    logsInput.value = SAMPLE_LOGS;
    analyzeLogs();
  });

  logsInput.value = SAMPLE_LOGS;
  analyzeLogs();
};
