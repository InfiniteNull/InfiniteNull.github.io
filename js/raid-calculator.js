/**
 * raid-calculator.js
 * Tool: RAID Storage & Capacity Calculator
 * Menghitung kapasitas efektif, redundancy fault tolerance, dan rasio efisiensi untuk RAID 0, 1, 5, 6, dan 10.
 */

window.renderRaidCalculator = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="hard-drive" class="w-4 h-4 text-sky-600"></i>
          <span>Kalkulator Kapasitas & Redundansi RAID Array (Server & Storage)</span>
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Tipe RAID</label>
            <select id="raidTypeSelect" class="w-full px-3 py-2 font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              <option value="0">RAID 0 (Striping - No Fault Tolerance)</option>
              <option value="1">RAID 1 (Mirroring - High Redundancy)</option>
              <option value="5" selected>RAID 5 (Single Parity - Balanced)</option>
              <option value="6">RAID 6 (Dual Parity - High Enterprise)</option>
              <option value="10">RAID 10 (1+0 Striping & Mirroring)</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Jumlah Disk Drive</label>
            <input type="number" id="raidDiskCountInput" value="4" min="2" max="24" class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Kapasitas Per Disk (TB)</label>
            <input type="number" id="raidDiskSizeInput" value="4" min="0.5" step="0.5" class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
        </div>
      </div>

      <!-- RAID Result Grid -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="layers" class="w-4 h-4 text-emerald-500"></i>
            Hasil Pembagian Kapasitas RAID Array
          </span>
          <span id="raidEfficiencyBadge" class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Efisiensi: 75%
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <!-- Usable -->
          <div class="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <span class="text-emerald-700 dark:text-emerald-400 font-bold block">Kapasitas Usable (Tersedia)</span>
            <div id="raidUsableSize" class="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">12.0 TB</div>
            <p class="text-[10px] text-slate-500">Kapasitas nyata yang bisa dipakai menyimpan file.</p>
          </div>

          <!-- Protection/Parity -->
          <div class="p-3.5 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 space-y-1">
            <span class="text-sky-700 dark:text-sky-400 font-bold block">Redundancy / Parity</span>
            <div id="raidParitySize" class="text-xl font-bold font-mono text-sky-600 dark:text-sky-400">4.0 TB</div>
            <p class="text-[10px] text-slate-500">Dialokasikan untuk data pemulihan jika disk rusak.</p>
          </div>

          <!-- Total Raw -->
          <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-500 block">Total Raw Space</span>
            <div id="raidRawSize" class="text-xl font-bold font-mono text-slate-900 dark:text-white">16.0 TB</div>
            <p class="text-[10px] text-slate-400">Total kapasitas fisik seluruh disk terpasang.</p>
          </div>

          <!-- Fault Tolerance -->
          <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-500 block">Fault Tolerance (Disk Rusak)</span>
            <div id="raidTolerance" class="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">1 Disk</div>
            <p class="text-[10px] text-slate-400">Jumlah disk yang boleh mati tanpa kehilangan data.</p>
          </div>
        </div>

        <!-- Technical Description -->
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed" id="raidDescriptionBox">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  function calculateRaid() {
    const type = container.querySelector('#raidTypeSelect').value;
    let disks = parseInt(container.querySelector('#raidDiskCountInput').value, 10) || 2;
    const diskSize = parseFloat(container.querySelector('#raidDiskSizeInput').value) || 1;

    // Minimum disk validation
    let minDisks = 2;
    if (type === "5") minDisks = 3;
    if (type === "6") minDisks = 4;
    if (type === "10") minDisks = 4;

    if (disks < minDisks) {
      disks = minDisks;
      container.querySelector('#raidDiskCountInput').value = minDisks;
    }

    if (type === "10" && disks % 2 !== 0) {
      disks += 1;
      container.querySelector('#raidDiskCountInput').value = disks;
    }

    let usable = 0;
    let parity = 0;
    let tolerance = "";
    let desc = "";

    const raw = disks * diskSize;

    if (type === "0") {
      usable = raw;
      parity = 0;
      tolerance = "0 Disk (No Redundancy)";
      desc = "<strong>RAID 0 (Striping):</strong> Memberikan performa baca/tulis tercepat karena data dipecah ke semua disk, namun tidak memiliki redundansi sama sekali. Jika 1 disk rusak, seluruh data akan hilang.";
    } else if (type === "1") {
      usable = diskSize;
      parity = (disks - 1) * diskSize;
      tolerance = `${disks - 1} Disk`;
      desc = "<strong>RAID 1 (Mirroring):</strong> Seluruh data diduplikasi secara identik ke disk lainnya. Sangat aman dan toleran kerusakan, namun memakan 50% atau lebih dari total kapasitas fisik.";
    } else if (type === "5") {
      usable = (disks - 1) * diskSize;
      parity = diskSize;
      tolerance = "1 Disk";
      desc = "<strong>RAID 5 (Block-level striping with distributed parity):</strong> Standar industri paling seimbang antara efisiensi kapasitas (hanya berkurang 1 disk untuk parity) dan keamanan data. Tetap aman jika 1 disk mati.";
    } else if (type === "6") {
      usable = (disks - 2) * diskSize;
      parity = 2 * diskSize;
      tolerance = "2 Disk";
      desc = "<strong>RAID 6 (Dual distributed parity):</strong> Menggunakan 2 disk untuk parity ganda. Sangat cocok untuk penyimpanan enterprise kritis di mana 2 disk rusak bersamaan masih tetap aman.";
    } else if (type === "10") {
      usable = (disks / 2) * diskSize;
      parity = (disks / 2) * diskSize;
      tolerance = "1 Disk per Mirror Pair";
      desc = "<strong>RAID 10 (1+0 Mirroring + Striping):</strong> Menggabungkan kecepatan striping dan keamanan mirroring. Menghasilkan performa database IOPS tinggi dengan toleransi kerusakan disk yang sangat tangguh.";
    }

    const effPct = Math.round((usable / raw) * 100);

    container.querySelector('#raidUsableSize').textContent = `${usable.toFixed(1)} TB`;
    container.querySelector('#raidParitySize').textContent = `${parity.toFixed(1)} TB`;
    container.querySelector('#raidRawSize').textContent = `${raw.toFixed(1)} TB`;
    container.querySelector('#raidTolerance').textContent = tolerance;
    container.querySelector('#raidEfficiencyBadge').textContent = `Efisiensi: ${effPct}%`;
    container.querySelector('#raidDescriptionBox').innerHTML = desc;
  }

  container.querySelector('#raidTypeSelect').addEventListener('change', calculateRaid);
  container.querySelector('#raidDiskCountInput').addEventListener('input', calculateRaid);
  container.querySelector('#raidDiskSizeInput').addEventListener('input', calculateRaid);

  calculateRaid();
};
