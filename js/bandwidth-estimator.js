/**
 * bandwidth-estimator.js
 * Tool: Bandwidth & Data Transfer Estimator
 * Menghitung estimasi durasi transfer data, migrasi server/backup, dan throughput aktual.
 */

window.renderBandwidthEstimator = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="gauge" class="w-4 h-4 text-sky-600"></i>
          <span>Kalkulator Estimasi Durasi Transfer & Migrasi Data</span>
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Data Size -->
          <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">1. Ukuran Data File / Backup</label>
            <div class="flex gap-2">
              <input type="number" id="bwDataSizeInput" value="50" min="0.1" step="any" class="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" />
              <select id="bwDataUnitSelect" class="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none">
                <option value="MB">MB (Megabytes)</option>
                <option value="GB" selected>GB (Gigabytes)</option>
                <option value="TB">TB (Terabytes)</option>
              </select>
            </div>
            <div class="flex flex-wrap gap-1 text-[10px] text-slate-500 pt-1">
              <span>Preset:</span>
              <button class="preset-size-btn px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 hover:text-sky-600" data-val="1" data-unit="GB">1 GB (ISO)</button>
              <button class="preset-size-btn px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 hover:text-sky-600" data-val="50" data-unit="GB">50 GB (DB Backup)</button>
              <button class="preset-size-btn px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 hover:text-sky-600" data-val="500" data-unit="GB">500 GB (VM Image)</button>
            </div>
          </div>

          <!-- Network Bandwidth -->
          <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">2. Kecepatan Koneksi / Bandwidth</label>
            <div class="flex gap-2">
              <input type="number" id="bwSpeedInput" value="100" min="0.1" step="any" class="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" />
              <select id="bwSpeedUnitSelect" class="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none">
                <option value="Kbps">Kbps (Kilobits/s)</option>
                <option value="Mbps" selected>Mbps (Megabits/s)</option>
                <option value="Gbps">Gbps (Gigabits/s)</option>
                <option value="MBps">MB/s (MegaBytes/s)</option>
              </select>
            </div>
            <div class="flex flex-wrap gap-1 text-[10px] text-slate-500 pt-1">
              <span>Preset:</span>
              <button class="preset-speed-btn px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 hover:text-sky-600" data-val="10" data-unit="Mbps">10 Mbps</button>
              <button class="preset-speed-btn px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 hover:text-sky-600" data-val="100" data-unit="Mbps">100 Mbps (Fast Ethernet)</button>
              <button class="preset-speed-btn px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 hover:text-sky-600" data-val="1" data-unit="Gbps">1 Gbps (LAN Gigabit)</button>
            </div>
          </div>
        </div>

        <!-- Overhead / Real-world efficiency -->
        <div class="flex items-center gap-3 pt-1">
          <label class="text-xs text-slate-600 dark:text-slate-400 font-medium">Efisiensi Jaringan Nyata (TCP/IP Overhead):</label>
          <select id="bwEfficiencySelect" class="px-2.5 py-1 text-xs font-semibold rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
            <option value="1.0">100% (Teoretis Murni)</option>
            <option value="0.9" selected>90% (Kondisi Jaringan Baik / Rekomendasi)</option>
            <option value="0.8">80% (Kondisi Jaringan Sibuk / Rata-rata)</option>
          </select>
        </div>
      </div>

      <!-- Result View -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="clock" class="w-4 h-4 text-emerald-500"></i>
            Estimasi Waktu Penyelesaian Transfer
          </span>
          <span id="transferRateBadge" class="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
            11.25 MB/detik
          </span>
        </div>

        <div class="p-4 rounded-xl bg-slate-950 text-white text-center space-y-1 border border-slate-800">
          <span class="text-xs text-slate-400">Waktu yang Dibutuhkan:</span>
          <div id="resDurationMain" class="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
            1 Jam 14 Menit 5 Detik
          </div>
          <div id="resTotalSeconds" class="text-xs text-slate-500 font-mono">Total: 4,444 detik</div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-400 text-[10px] block">Ukuran Total (Bytes)</span>
            <span id="resTotalBytes" class="font-mono font-bold text-slate-900 dark:text-white">53,687,091,200 B</span>
          </div>
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-400 text-[10px] block">Transfer per Menit</span>
            <span id="resPerMinute" class="font-mono font-bold text-slate-900 dark:text-white">675 MB/menit</span>
          </div>
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-400 text-[10px] block">Transfer per Jam</span>
            <span id="resPerHour" class="font-mono font-bold text-slate-900 dark:text-white">40.5 GB/jam</span>
          </div>
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-400 text-[10px] block">Transfer per Hari</span>
            <span id="resPerDay" class="font-mono font-bold text-slate-900 dark:text-white">972 GB/hari</span>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  function calculate() {
    const sizeVal = parseFloat(container.querySelector('#bwDataSizeInput').value) || 0;
    const sizeUnit = container.querySelector('#bwDataUnitSelect').value;
    const speedVal = parseFloat(container.querySelector('#bwSpeedInput').value) || 0;
    const speedUnit = container.querySelector('#bwSpeedUnitSelect').value;
    const efficiency = parseFloat(container.querySelector('#bwEfficiencySelect').value) || 0.9;

    let bytes = sizeVal;
    if (sizeUnit === "MB") bytes = sizeVal * 1024 * 1024;
    else if (sizeUnit === "GB") bytes = sizeVal * 1024 * 1024 * 1024;
    else if (sizeUnit === "TB") bytes = sizeVal * 1024 * 1024 * 1024 * 1024;

    let bitsPerSec = speedVal;
    if (speedUnit === "Kbps") bitsPerSec = speedVal * 1000;
    else if (speedUnit === "Mbps") bitsPerSec = speedVal * 1000 * 1000;
    else if (speedUnit === "Gbps") bitsPerSec = speedVal * 1000 * 1000 * 1000;
    else if (speedUnit === "MBps") bitsPerSec = speedVal * 8 * 1024 * 1024;

    const effectiveBitsPerSec = bitsPerSec * efficiency;
    const effectiveBytesPerSec = effectiveBitsPerSec / 8;

    const seconds = effectiveBytesPerSec > 0 ? (bytes / effectiveBytesPerSec) : 0;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    let durationText = "";
    if (h > 0) durationText += `${h} Jam `;
    if (m > 0 || h > 0) durationText += `${m} Menit `;
    durationText += `${s} Detik`;

    if (seconds === 0) durationText = "0 Detik";

    container.querySelector('#resDurationMain').textContent = durationText;
    container.querySelector('#resTotalSeconds').textContent = `Total: ${Math.round(seconds).toLocaleString()} detik`;
    container.querySelector('#transferRateBadge').textContent = `${(effectiveBytesPerSec / (1024 * 1024)).toFixed(2)} MB/detik`;
    container.querySelector('#resTotalBytes').textContent = `${bytes.toLocaleString()} Bytes`;
    container.querySelector('#resPerMinute').textContent = `${((effectiveBytesPerSec * 60) / (1024 * 1024)).toFixed(1)} MB/menit`;
    container.querySelector('#resPerHour').textContent = `${((effectiveBytesPerSec * 3600) / (1024 * 1024 * 1024)).toFixed(2)} GB/jam`;
    container.querySelector('#resPerDay').textContent = `${((effectiveBytesPerSec * 86400) / (1024 * 1024 * 1024)).toFixed(2)} GB/hari`;
  }

  container.querySelector('#bwDataSizeInput').addEventListener('input', calculate);
  container.querySelector('#bwDataUnitSelect').addEventListener('change', calculate);
  container.querySelector('#bwSpeedInput').addEventListener('input', calculate);
  container.querySelector('#bwSpeedUnitSelect').addEventListener('change', calculate);
  container.querySelector('#bwEfficiencySelect').addEventListener('change', calculate);

  container.querySelectorAll('.preset-size-btn').forEach(b => {
    b.addEventListener('click', () => {
      container.querySelector('#bwDataSizeInput').value = b.dataset.val;
      container.querySelector('#bwDataUnitSelect').value = b.dataset.unit;
      calculate();
    });
  });

  container.querySelectorAll('.preset-speed-btn').forEach(b => {
    b.addEventListener('click', () => {
      container.querySelector('#bwSpeedInput').value = b.dataset.val;
      container.querySelector('#bwSpeedUnitSelect').value = b.dataset.unit;
      calculate();
    });
  });

  calculate();
};
