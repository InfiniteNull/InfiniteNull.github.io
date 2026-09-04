/**
 * kpi-monitoring-dashboard.js
 * Tool: Laporan Berkala & KPI Monitoring Dashboard (Administrasi & Monitoring Data)
 * Monitoring laporan operasional harian, mingguan, dan bulanan, tracking target vs realisasi, analisis varians, dan rekapitulasi data.
 */

window.KPI_DATA_DAILY = [
  { periode: "Senin", divisi: "IT Support", target: 20, realisasi: 22, unit: "Tiket Selesai" },
  { periode: "Selasa", divisi: "IT Support", target: 20, realisasi: 19, unit: "Tiket Selesai" },
  { periode: "Rabu", divisi: "IT Support", target: 20, realisasi: 25, unit: "Tiket Selesai" },
  { periode: "Kamis", divisi: "IT Support", target: 20, realisasi: 21, unit: "Tiket Selesai" },
  { periode: "Jumat", divisi: "IT Support", target: 20, realisasi: 18, unit: "Tiket Selesai" }
];

window.KPI_DATA_WEEKLY = [
  { periode: "Minggu 1", divisi: "Operasional", target: 150, realisasi: 142, unit: "Transaksi" },
  { periode: "Minggu 2", divisi: "Operasional", target: 150, realisasi: 158, unit: "Transaksi" },
  { periode: "Minggu 3", divisi: "Operasional", target: 160, realisasi: 165, unit: "Transaksi" },
  { periode: "Minggu 4", divisi: "Operasional", target: 160, realisasi: 148, unit: "Transaksi" }
];

window.KPI_DATA_MONTHLY = [
  { periode: "Januari", divisi: "Semua Divisi", target: 600, realisasi: 620, unit: "Penyelesaian Kasus" },
  { periode: "Februari", divisi: "Semua Divisi", target: 600, realisasi: 585, unit: "Penyelesaian Kasus" },
  { periode: "Maret", divisi: "Semua Divisi", target: 650, realisasi: 670, unit: "Penyelesaian Kasus" },
  { periode: "April", divisi: "Semua Divisi", target: 650, realisasi: 690, unit: "Penyelesaian Kasus" },
  { periode: "Mei", divisi: "Semua Divisi", target: 700, realisasi: 715, unit: "Penyelesaian Kasus" },
  { periode: "Juni", divisi: "Semua Divisi", target: 700, realisasi: 680, unit: "Penyelesaian Kasus" }
];

let kpiChartInstance = null;
let currentKpiPeriod = 'weekly';

window.renderKpiMonitoringDashboard = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Control Bar -->
      <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <i data-lucide="trending-up" class="w-4 h-4 text-slate-700 dark:text-slate-300"></i>
              <span>Dashboard Rekapitulasi & Monitoring KPI Operasional</span>
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Simulasi administrasi monitoring data kantor: evaluasi target vs realisasi, laju capaian (achievement rate), dan varians.
            </p>
          </div>

          <!-- Period Buttons -->
          <div class="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <button id="btnKpiDaily" class="px-2.5 py-1 rounded transition text-slate-600 dark:text-slate-400">Harian</button>
            <button id="btnKpiWeekly" class="px-2.5 py-1 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold transition">Mingguan</button>
            <button id="btnKpiMonthly" class="px-2.5 py-1 rounded transition text-slate-600 dark:text-slate-400">Bulanan</button>
          </div>
        </div>
      </div>

      <!-- KPI Summary Cards Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center" id="kpiSummaryCards">
        <!-- Injected dynamically -->
      </div>

      <!-- Chart and Table Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        <!-- Left: Interactive Chart (2 cols) -->
        <div class="lg:col-span-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <h5 class="text-xs font-bold font-mono text-slate-900 dark:text-white flex items-center gap-1.5">
              <i data-lucide="bar-chart-2" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>Grafik Perbandingan Target vs Realisasi</span>
            </h5>
            <span class="text-[11px] font-mono text-slate-400" id="kpiChartLegendLabel">Target vs Realisasi</span>
          </div>
          <div class="h-64 w-full">
            <canvas id="kpiMonitoringChart"></canvas>
          </div>
        </div>

        <!-- Right: Executive Summary & Variance Table (1 col) -->
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
          <div class="space-y-3">
            <h5 class="text-xs font-bold font-mono text-slate-900 dark:text-white flex items-center gap-1.5">
              <i data-lucide="file-check" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>Analisis Varians & Tindak Lanjut</span>
            </h5>
            
            <div id="kpiVarianceInsights" class="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <!-- Injected dynamically -->
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <button id="btnCopyKpiReport" class="w-full py-2 text-xs font-mono font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center gap-1.5">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Salin Ringkasan Laporan</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Detailed Breakdown Table -->
      <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <h5 class="text-xs font-bold font-mono text-slate-900 dark:text-white flex items-center gap-1.5">
          <i data-lucide="list" class="w-3.5 h-3.5 text-slate-500"></i>
          <span>Tabel Rekapitulasi Rinci Per Periode</span>
        </h5>

        <div class="border border-slate-200 dark:border-slate-800 rounded-lg overflow-x-auto">
          <table class="w-full text-left text-xs font-mono">
            <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th class="px-3 py-2">Periode</th>
                <th class="px-3 py-2">Unit / Divisi</th>
                <th class="px-3 py-2">Target</th>
                <th class="px-3 py-2">Realisasi</th>
                <th class="px-3 py-2">Capaian (%)</th>
                <th class="px-3 py-2">Varians</th>
                <th class="px-3 py-2">Evaluasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="kpiBreakdownTableBody">
              <!-- Injected dynamically -->
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Period Click listeners
  document.getElementById('btnKpiDaily').addEventListener('click', () => setKpiPeriod('daily'));
  document.getElementById('btnKpiWeekly').addEventListener('click', () => setKpiPeriod('weekly'));
  document.getElementById('btnKpiMonthly').addEventListener('click', () => setKpiPeriod('monthly'));
  document.getElementById('btnCopyKpiReport').addEventListener('click', copyKpiExecutiveReport);

  // Render default
  updateKpiView('weekly');
};

function setKpiPeriod(period) {
  currentKpiPeriod = period;

  const btnD = document.getElementById('btnKpiDaily');
  const btnW = document.getElementById('btnKpiWeekly');
  const btnM = document.getElementById('btnKpiMonthly');

  const activeClass = "px-2.5 py-1 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold transition";
  const inactiveClass = "px-2.5 py-1 rounded transition text-slate-600 dark:text-slate-400";

  btnD.className = period === 'daily' ? activeClass : inactiveClass;
  btnW.className = period === 'weekly' ? activeClass : inactiveClass;
  btnM.className = period === 'monthly' ? activeClass : inactiveClass;

  updateKpiView(period);
}

function updateKpiView(period) {
  let dataset = window.KPI_DATA_WEEKLY;
  if (period === 'daily') dataset = window.KPI_DATA_DAILY;
  if (period === 'monthly') dataset = window.KPI_DATA_MONTHLY;

  let totalTarget = 0;
  let totalActual = 0;

  dataset.forEach(row => {
    totalTarget += row.target;
    totalActual += row.realisasi;
  });

  const achievementRate = Math.round((totalActual / totalTarget) * 1000) / 10;
  const variance = totalActual - totalTarget;
  const isPositive = variance >= 0;

  // Render Summary Cards
  const cardsContainer = document.getElementById('kpiSummaryCards');
  if (cardsContainer) {
    cardsContainer.innerHTML = `
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="text-xs text-slate-500 dark:text-slate-400">Total Target</div>
        <div class="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">${totalTarget.toLocaleString()}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="text-xs text-slate-500 dark:text-slate-400">Total Realisasi</div>
        <div class="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">${totalActual.toLocaleString()}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="text-xs text-slate-500 dark:text-slate-400">Tingkat Capaian</div>
        <div class="text-lg font-bold font-mono ${achievementRate >= 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'} mt-1">${achievementRate}%</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="text-xs text-slate-500 dark:text-slate-400">Varians Bersih</div>
        <div class="text-lg font-bold font-mono ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'} mt-1">${isPositive ? '+' : ''}${variance}</div>
      </div>
    `;
  }

  // Render Table
  const tbody = document.getElementById('kpiBreakdownTableBody');
  if (tbody) {
    let html = '';
    dataset.forEach(row => {
      const rate = Math.round((row.realisasi / row.target) * 1000) / 10;
      const diff = row.realisasi - row.target;
      let evalBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">TARGET TERCAPAI</span>`;
      if (rate < 100) {
        evalBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">PERLU EVALUASI</span>`;
      }

      html += `
        <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
          <td class="px-3 py-2 font-bold text-slate-900 dark:text-white">${row.periode}</td>
          <td class="px-3 py-2 text-slate-600 dark:text-slate-400">${row.divisi}</td>
          <td class="px-3 py-2 font-mono text-slate-700 dark:text-slate-300">${row.target}</td>
          <td class="px-3 py-2 font-mono font-bold text-slate-900 dark:text-white">${row.realisasi}</td>
          <td class="px-3 py-2 font-mono font-bold ${rate >= 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">${rate}%</td>
          <td class="px-3 py-2 font-mono ${diff >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}">${diff >= 0 ? '+' : ''}${diff}</td>
          <td class="px-3 py-2">${evalBadge}</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  // Render Insights
  const insightsDiv = document.getElementById('kpiVarianceInsights');
  if (insightsDiv) {
    insightsDiv.innerHTML = `
      <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
        <strong class="text-slate-900 dark:text-white font-semibold">Status Monitoring:</strong>
        <p class="mt-1 text-[11px]">Rata-rata kinerja berada pada level <strong>${achievementRate}%</strong> dari total kuota yang ditetapkan.</p>
      </div>
      <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
        <strong class="text-slate-900 dark:text-white font-semibold">Rekomendasi Tindak Lanjut:</strong>
        <p class="mt-1 text-[11px]">${achievementRate >= 100 ? 'Pertahankan kapasitas alokasi sumber daya operasional dan pantau beban kerja tim.' : 'Lakukan penyesuaian alokasi tugas pada periode dengan varians negatif untuk mengejar target.'}</p>
      </div>
    `;
  }

  // Render Chart
  renderKpiChart(dataset);
}

function renderKpiChart(dataset) {
  const canvas = document.getElementById('kpiMonitoringChart');
  if (!canvas || !window.Chart) return;

  if (kpiChartInstance) {
    kpiChartInstance.destroy();
  }

  const isDark = document.documentElement.classList.contains('dark');
  const labels = dataset.map(d => d.periode);
  const targetData = dataset.map(d => d.target);
  const actualData = dataset.map(d => d.realisasi);

  kpiChartInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Target',
          data: targetData,
          backgroundColor: isDark ? 'rgba(100, 116, 139, 0.4)' : 'rgba(148, 163, 184, 0.4)',
          borderColor: isDark ? '#64748b' : '#94a3b8',
          borderWidth: 1,
          borderRadius: 4
        },
        {
          label: 'Realisasi Aktual',
          data: actualData,
          backgroundColor: isDark ? 'rgba(56, 189, 248, 0.7)' : 'rgba(2, 132, 199, 0.7)',
          borderColor: isDark ? '#38bdf8' : '#0284c7',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: isDark ? '#cbd5e1' : '#475569',
            font: { family: 'JetBrains Mono', size: 11 }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
          grid: { display: false }
        },
        y: {
          ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
          grid: { color: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.6)' }
        }
      }
    }
  });
}

function copyKpiExecutiveReport() {
  let dataset = window.KPI_DATA_WEEKLY;
  if (currentKpiPeriod === 'daily') dataset = window.KPI_DATA_DAILY;
  if (currentKpiPeriod === 'monthly') dataset = window.KPI_DATA_MONTHLY;

  let totalTarget = 0;
  let totalActual = 0;
  dataset.forEach(row => {
    totalTarget += row.target;
    totalActual += row.realisasi;
  });
  const rate = Math.round((totalActual / totalTarget) * 1000) / 10;

  const summary = `REKAPITULASI LAPORAN MONITORING OPERASIONAL (${currentKpiPeriod.toUpperCase()})
- Total Target       : ${totalTarget}
- Total Realisasi    : ${totalActual}
- Achievement Rate   : ${rate}%
- Varians Bersih     : ${totalActual - totalTarget >= 0 ? '+' : ''}${totalActual - totalTarget}
- Status Evaluasi    : ${rate >= 100 ? 'TARGET TERCAPAI' : 'PERLU EVALUASI'}

Dihasilkan secara otomatis oleh Laporan Berkala & KPI Monitoring Dashboard.`;

  navigator.clipboard.writeText(summary).then(() => {
    if (window.showToast) window.showToast("Ringkasan eksekutif laporan disalin!", "success");
  });
}
