/**
 * psu-calculator.js
 * Tool: PC Hardware Power Supply (PSU) & Wattage Calculator
 * Menghitung estimasi konsumsi daya total perangkat komputer untuk standarisasi PC Deployment kantor & workstation perbankan.
 */

window.renderPsuCalculator = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="cpu" class="w-4 h-4 text-emerald-600"></i>
          <span>Kalkulator Kebutuhan Daya PSU PC & Deployment Workstation</span>
        </h4>

        <!-- Hardware Components Picker -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <!-- CPU Class -->
          <div class="space-y-1">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Tipe Processor (CPU)</label>
            <select id="psuCpuSelect" class="w-full px-3 py-2 font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              <option value="65" selected>Office Intel Core i3 / i5 / AMD Ryzen 5 (65W TDP)</option>
              <option value="125">Performance Core i7 / Ryzen 7 (125W TDP)</option>
              <option value="250">Enthusiast Core i9 / Ryzen 9 / Threadripper (250W TDP)</option>
              <option value="35">Low Power Celeron / Pentium / Core T-Series (35W TDP)</option>
            </select>
          </div>

          <!-- GPU Class -->
          <div class="space-y-1">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Kartu Grafis (GPU)</label>
            <select id="psuGpuSelect" class="w-full px-3 py-2 font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              <option value="0" selected>Integrated Graphics (Intel UHD / Vega IGPU - 0W extra)</option>
              <option value="75">Entry Discrete GPU (GTX 1650 / RX 6400 - 75W)</option>
              <option value="170">Mid-Range Workstation (RTX 4060 / RTX 3060 - 170W)</option>
              <option value="285">High-End Rendering (RTX 4070 Ti / 4080 - 285W)</option>
              <option value="450">Ultra AI / ML Workstation (RTX 4090 - 450W)</option>
            </select>
          </div>

          <!-- Motherboard & RAM -->
          <div class="space-y-1">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Jumlah Keping RAM (DDR4 / DDR5)</label>
            <select id="psuRamSelect" class="w-full px-3 py-2 font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              <option value="5">1 Keping RAM (8GB / 16GB - 5W)</option>
              <option value="10" selected>2 Keping Dual Channel (16GB / 32GB - 10W)</option>
              <option value="20">4 Keping Quad Channel (64GB+ - 20W)</option>
            </select>
          </div>

          <!-- Storage Drives -->
          <div class="space-y-1">
            <label class="font-semibold text-slate-700 dark:text-slate-300">SSD M.2 NVMe (Jumlah)</label>
            <input type="number" id="psuSsdCount" value="1" min="0" max="6" class="w-full px-3 py-2 font-mono rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none" />
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Harddisk SATA 3.5" (Jumlah)</label>
            <input type="number" id="psuHddCount" value="1" min="0" max="8" class="w-full px-3 py-2 font-mono rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none" />
          </div>

          <!-- Fans & Peripherals -->
          <div class="space-y-1">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Jumlah Kipas Casing & LED</label>
            <input type="number" id="psuFansCount" value="2" min="0" max="10" class="w-full px-3 py-2 font-mono rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none" />
          </div>
        </div>
      </div>

      <!-- Result Card -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i>
            Rekomendasi Kapasitas Power Supply (PSU)
          </span>
          <span id="psuTierBadge" class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Standar PC Deployment Kantor
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Total Consumption -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <span class="text-slate-500 text-xs">Konsumsi Daya Maksimal (Load Penuh)</span>
            <div id="psuTotalWatt" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">142 Watts</div>
            <p class="text-[10px] text-slate-400">Total estimasi peak load seluruh komponen hardware.</p>
          </div>

          <!-- Recommended PSU -->
          <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <span class="text-emerald-700 dark:text-emerald-400 font-bold text-xs">Rekomendasi Minimum PSU</span>
            <div id="psuRecommendedWatt" class="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">350 - 450 Watts</div>
            <p class="text-[10px] text-slate-500">Termasuk safety headroom 30-40% untuk menjaga efisiensi.</p>
          </div>

          <!-- Efficiency Rating -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <span class="text-slate-500 text-xs">Sertifikasi Direkomendasikan</span>
            <div class="text-lg font-bold font-mono text-amber-500">80 PLUS Bronze / Gold</div>
            <p class="text-[10px] text-slate-400">Menjamin efisiensi daya &le; 85% untuk operasional 24/7.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  function calculatePsu() {
    const cpu = parseInt(container.querySelector('#psuCpuSelect').value, 10) || 65;
    const gpu = parseInt(container.querySelector('#psuGpuSelect').value, 10) || 0;
    const ram = parseInt(container.querySelector('#psuRamSelect').value, 10) || 10;
    const ssd = (parseInt(container.querySelector('#psuSsdCount').value, 10) || 0) * 7; // 7W per NVMe
    const hdd = (parseInt(container.querySelector('#psuHddCount').value, 10) || 0) * 12; // 12W per HDD
    const fans = (parseInt(container.querySelector('#psuFansCount').value, 10) || 0) * 4; // 4W per fan
    const mobo = 35; // Base motherboard wattage

    const total = cpu + gpu + ram + ssd + hdd + fans + mobo;
    const safePsu = Math.ceil((total * 1.4) / 50) * 50; // 40% headroom rounded to 50W

    container.querySelector('#psuTotalWatt').textContent = `${total} Watts`;
    container.querySelector('#psuRecommendedWatt').textContent = `${safePsu} - ${safePsu + 100} Watts`;

    const badge = container.querySelector('#psuTierBadge');
    if (total <= 180) {
      badge.textContent = "Standar Office Workstation (Hemat Daya)";
      badge.className = "px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
    } else if (total <= 350) {
      badge.textContent = "Mid-Range Technical Workstation";
      badge.className = "px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300";
    } else {
      badge.textContent = "Heavy-Duty AI / Rendering Workstation";
      badge.className = "px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300";
    }
  }

  container.querySelector('#psuCpuSelect').addEventListener('change', calculatePsu);
  container.querySelector('#psuGpuSelect').addEventListener('change', calculatePsu);
  container.querySelector('#psuRamSelect').addEventListener('change', calculatePsu);
  container.querySelector('#psuSsdCount').addEventListener('input', calculatePsu);
  container.querySelector('#psuHddCount').addEventListener('input', calculatePsu);
  container.querySelector('#psuFansCount').addEventListener('input', calculatePsu);

  calculatePsu();
};
