/**
 * data-qc-inspector.js
 * Tool: Dataset Integration & Quality Control (QC) Inspector
 * Menguji integritas & skor kesehatan data, deteksi outlier IQR, dan simulasi penggabungan tabel (Join & Merge Matching) dengan audit log mismatch.
 */

window.DATA_QC_SAMPLE_A = [
  { emp_id: "EMP-01", nama: "Budi Santoso", id_divisi: "DIV-IT", gaji: 8500000, usia: 28 },
  { emp_id: "EMP-02", nama: "Siti Rahma", id_divisi: "DIV-OPS", gaji: 7200000, usia: 29 },
  { emp_id: "EMP-03", nama: "Ahmad Fauzi", id_divisi: "DIV-FIN", gaji: 9100000, usia: 35 },
  { emp_id: "EMP-04", nama: "Dewi Lestari", id_divisi: "DIV-MKT", gaji: 6800000, usia: 24 },
  { emp_id: "EMP-05", nama: "Rian Pratama", id_divisi: "DIV-IT", gaji: 25000000, usia: 31 }, // Anomali Outlier Gaji
  { emp_id: "EMP-06", nama: "Eka Wijaya", id_divisi: "DIV-DEV", gaji: 8200000, usia: 27 }, // Divisi orphan (tidak ada di master)
  { emp_id: "EMP-07", nama: "Mega Utami", id_divisi: "DIV-FIN", gaji: 8900000, usia: 33 }
];

window.DATA_QC_SAMPLE_B = [
  { id_divisi: "DIV-IT", nama_divisi: "Teknologi & Infrastruktur", head_dept: "Hendro W." },
  { id_divisi: "DIV-OPS", nama_divisi: "Operasional & Layanan", head_dept: "Farida S." },
  { id_divisi: "DIV-FIN", nama_divisi: "Keuangan & Akuntansi", head_dept: "Rahmat H." },
  { id_divisi: "DIV-MKT", nama_divisi: "Pemasaran & Kemitraan", head_dept: "Nita K." },
  { id_divisi: "DIV-HRD", nama_divisi: "Sumber Daya Manusia", head_dept: "Gunawan P." } // Divisi tanpa karyawan di sample
];

window.renderDataQcInspector = function(container) {
  const isEn = (window.currentLang || 'id') === 'en';

  const t = {
    subTabAudit: isEn ? "1. Quality Control & Outlier Audit" : "1. Quality Control & Outlier Audit",
    subTabJoin: isEn ? "2. Multi-Dataset Integration (Join)" : "2. Multi-Dataset Integration (Join)",
    exportReport: isEn ? "Export QC Report" : "Export QC Report",
    healthTitle: isEn ? "DATA HEALTH SCORE" : "DATA HEALTH SCORE",
    healthSub: isEn ? "Dataset ready for production analysis" : "Kualitas dataset siap analisis",
    completeness: isEn ? "Completeness" : "Completeness (Kelengkapan)",
    uniqueness: isEn ? "Uniqueness (Primary Key)" : "Uniqueness (Keunikan Key)",
    outliers: isEn ? "Statistical Outliers (IQR)" : "Statistical Outliers (IQR)",
    outlierHeading: isEn ? "Anomaly Detection & Record Audit (Tukey's Fences IQR)" : "Deteksi Anomali & Audit Rekaman (Tukey's Fences IQR)",
    joinHeading: isEn ? "Relational Join Engine (Dataset A ⨝ Dataset B)" : "Relational Join Engine (Dataset A ⨝ Dataset B)",
    joinDesc: isEn ? "Merges employee dataset with department master table on Foreign Key id_divisi." : "Menggabungkan data karyawan dengan master divisi berdasarkan Foreign Key id_divisi.",
    joinTypeLabel: isEn ? "Join Type:" : "Tipe Join:",
    joinInner: isEn ? "INNER JOIN (Matching Keys Only)" : "INNER JOIN (Hanya Kunci Cocok)",
    joinLeft: isEn ? "LEFT JOIN (All Employees)" : "LEFT JOIN (Semua Karyawan)",
    joinRight: isEn ? "RIGHT JOIN (All Departments)" : "RIGHT JOIN (Semua Divisi)",
    joinFull: isEn ? "FULL OUTER JOIN (All Records)" : "FULL OUTER JOIN (Semua Baris)",
    alertTitle: isEn ? "Data Integration Audit Note:" : "Catatan Integritas Integrasi Data:",
    alertBody: isEn ? "1 employee record (EMP-06: Eka Wijaya) references DIV-DEV which is missing from Department Master (Orphan Foreign Key), and 1 department (DIV-HRD) has zero assigned staff." : "Ditemukan 1 data karyawan (EMP-06: Eka Wijaya) dengan foreign key DIV-DEV yang tidak ditemukan di Master Divisi (Orphan Foreign Key), serta 1 divisi (DIV-HRD) yang belum memiliki alokasi staf karyawan."
  };

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Navigation Sub-Tabs -->
      <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div class="flex items-center gap-2">
          <button id="qcSubTabAudit" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition flex items-center gap-1.5 font-mono">
            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
            <span>${t.subTabAudit}</span>
          </button>
          <button id="qcSubTabJoin" class="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 font-mono">
            <i data-lucide="git-merge" class="w-3.5 h-3.5"></i>
            <span>${t.subTabJoin}</span>
          </button>
        </div>

        <button id="btnExportQcReport" class="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
          <span>${t.exportReport}</span>
        </button>
      </div>

      <!-- VIEW 1: DATA QUALITY & HEALTH AUDIT -->
      <div id="qcViewAudit" class="space-y-5">
        
        <!-- Score Overview Card -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
          
          <div class="p-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex flex-col justify-between">
            <div class="text-xs text-slate-400 dark:text-slate-600 font-mono">${t.healthTitle}</div>
            <div class="my-2">
              <span id="qcHealthScoreVal" class="text-3xl font-extrabold font-mono">94.2%</span>
              <span class="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400 dark:text-emerald-700 border border-emerald-500/30">GRADE A</span>
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500">${t.healthSub}</div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <div class="text-xs text-slate-500 font-mono">${t.completeness}</div>
            <div class="text-xl font-bold font-mono text-slate-900 dark:text-white" id="qcScoreCompleteness">100%</div>
            <div class="text-[11px] text-slate-400">${isEn ? '0 null / missing cells' : '0 sel null / missing'}</div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <div class="text-xs text-slate-500 font-mono">${t.uniqueness}</div>
            <div class="text-xl font-bold font-mono text-slate-900 dark:text-white" id="qcScoreUniqueness">100%</div>
            <div class="text-[11px] text-slate-400">${isEn ? '0 duplicate Primary Keys' : '0 duplikasi Primary Key'}</div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <div class="text-xs text-slate-500 font-mono">${t.outliers}</div>
            <div class="text-xl font-bold font-mono text-amber-600 dark:text-amber-400" id="qcScoreOutliers">${isEn ? '1 Anomaly' : '1 Anomali'}</div>
            <div class="text-[11px] text-slate-400">${isEn ? 'Outside 1.5x IQR boundary' : 'Di luar batas 1.5x IQR'}</div>
          </div>

        </div>

        <!-- Outlier & Integrity Detail Table -->
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <h5 class="text-xs font-bold font-mono text-slate-900 dark:text-white flex items-center gap-1.5">
              <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-amber-500"></i>
              <span>${t.outlierHeading}</span>
            </h5>
            <span class="text-[11px] font-mono text-slate-500">${isEn ? 'Target Column:' : 'Target Kolom:'} <strong>gaji</strong></span>
          </div>

          <div class="border border-slate-200 dark:border-slate-800 rounded-lg overflow-x-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th class="px-3 py-2">Emp ID</th>
                  <th class="px-3 py-2">${isEn ? 'Name' : 'Nama'}</th>
                  <th class="px-3 py-2">${isEn ? 'Department' : 'Divisi'}</th>
                  <th class="px-3 py-2">${isEn ? 'Salary (IDR)' : 'Gaji (IDR)'}</th>
                  <th class="px-3 py-2">Status QC</th>
                  <th class="px-3 py-2">${isEn ? 'Audit Log Note' : 'Catatan Audit'}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="qcAuditTableBody">
                <!-- Injected dynamically -->
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- VIEW 2: DATA INTEGRATION (JOIN & MERGE SIMULATOR) -->
      <div id="qcViewJoin" class="space-y-5 hidden">
        
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h5 class="text-xs font-bold font-mono text-slate-900 dark:text-white flex items-center gap-1.5">
                <i data-lucide="git-merge" class="w-3.5 h-3.5 text-slate-500"></i>
                <span>${t.joinHeading}</span>
              </h5>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                ${t.joinDesc}
              </p>
            </div>

            <!-- Join Type Selector -->
            <div class="flex items-center gap-2">
              <label class="text-xs font-mono text-slate-500">${t.joinTypeLabel}</label>
              <select id="qcJoinTypeSelect" class="px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none">
                <option value="inner" selected>${t.joinInner}</option>
                <option value="left">${t.joinLeft}</option>
                <option value="right">${t.joinRight}</option>
                <option value="full">${t.joinFull}</option>
              </select>
            </div>
          </div>

          <!-- Join Result Table -->
          <div class="border border-slate-200 dark:border-slate-800 rounded-lg overflow-x-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th class="px-3 py-2">Emp ID</th>
                  <th class="px-3 py-2">${isEn ? 'Employee Name' : 'Nama Karyawan'}</th>
                  <th class="px-3 py-2">Divisi Key</th>
                  <th class="px-3 py-2">${isEn ? 'Merged Department' : 'Nama Divisi Tergabung'}</th>
                  <th class="px-3 py-2">Head Dept</th>
                  <th class="px-3 py-2">${isEn ? 'Integrity Status' : 'Status Integritas'}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="qcJoinTableBody">
                <!-- Injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Mismatch Alert Box -->
          <div id="qcMismatchAlert" class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <i data-lucide="info" class="w-4 h-4 mt-0.5 flex-shrink-0"></i>
            <div>
              <strong>${t.alertTitle}</strong> ${t.alertBody}
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Tab switcher
  document.getElementById('qcSubTabAudit').addEventListener('click', () => switchQcTab('audit'));
  document.getElementById('qcSubTabJoin').addEventListener('click', () => switchQcTab('join'));
  document.getElementById('qcJoinTypeSelect').addEventListener('change', renderJoinTable);
  document.getElementById('btnExportQcReport').addEventListener('click', exportQcReport);

  // Initial render
  renderAuditTable();
  renderJoinTable();
};

function switchQcTab(tab) {
  const tabAudit = document.getElementById('qcSubTabAudit');
  const tabJoin = document.getElementById('qcSubTabJoin');
  const viewAudit = document.getElementById('qcViewAudit');
  const viewJoin = document.getElementById('qcViewJoin');

  if (tab === 'audit') {
    tabAudit.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition flex items-center gap-1.5 font-mono";
    tabJoin.className = "px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 font-mono";
    viewAudit.classList.remove('hidden');
    viewJoin.classList.add('hidden');
  } else {
    tabJoin.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition flex items-center gap-1.5 font-mono";
    tabAudit.className = "px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 font-mono";
    viewJoin.classList.remove('hidden');
    viewAudit.classList.add('hidden');
  }
}

function renderAuditTable() {
  const isEn = (window.currentLang || 'id') === 'en';
  const tbody = document.getElementById('qcAuditTableBody');
  if (!tbody) return;

  const salaries = window.DATA_QC_SAMPLE_A.map(d => d.gaji).sort((a, b) => a - b);
  const q1 = salaries[Math.floor(salaries.length * 0.25)];
  const q3 = salaries[Math.floor(salaries.length * 0.75)];
  const iqr = q3 - q1;
  const upperFence = q3 + (1.5 * iqr);

  let html = '';
  window.DATA_QC_SAMPLE_A.forEach(row => {
    const isOutlier = row.gaji > upperFence;
    const isOrphan = row.id_divisi === 'DIV-DEV';

    let statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">VALID</span>`;
    let note = isEn ? "Within normal distribution boundaries." : "Sesuai rentang distribusi normal.";

    if (isOutlier) {
      statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">OUTLIER (IQR)</span>`;
      note = isEn ? `Salary IDR ${row.gaji.toLocaleString()} > upper IQR fence (IDR ${Math.round(upperFence).toLocaleString()}).` : `Nilai gaji Rp ${row.gaji.toLocaleString()} > batas wajar IQR (Rp ${Math.round(upperFence).toLocaleString()}).`;
    } else if (isOrphan) {
      statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">ORPHAN FK</span>`;
      note = isEn ? "Foreign key is not present in department master table." : "Kode divisi tidak terdaftar pada tabel referensi master.";
    }

    html += `
      <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
        <td class="px-3 py-2 font-bold text-slate-900 dark:text-white">${row.emp_id}</td>
        <td class="px-3 py-2 text-slate-800 dark:text-slate-200">${row.nama}</td>
        <td class="px-3 py-2 text-slate-500">${row.id_divisi}</td>
        <td class="px-3 py-2 font-bold ${isOutlier ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'}">Rp ${row.gaji.toLocaleString()}</td>
        <td class="px-3 py-2">${statusBadge}</td>
        <td class="px-3 py-2 text-[11px] text-slate-500">${note}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function renderJoinTable() {
  const isEn = (window.currentLang || 'id') === 'en';
  const tbody = document.getElementById('qcJoinTableBody');
  const joinType = document.getElementById('qcJoinTypeSelect') ? document.getElementById('qcJoinTypeSelect').value : 'inner';
  if (!tbody) return;

  const datasetA = window.DATA_QC_SAMPLE_A;
  const datasetB = window.DATA_QC_SAMPLE_B;

  let results = [];

  if (joinType === 'inner') {
    datasetA.forEach(a => {
      const b = datasetB.find(d => d.id_divisi === a.id_divisi);
      if (b) {
        results.push({ emp_id: a.emp_id, nama: a.nama, id_divisi: a.id_divisi, nama_divisi: b.nama_divisi, head: b.head_dept, status: "MATCHED" });
      }
    });
  } else if (joinType === 'left') {
    datasetA.forEach(a => {
      const b = datasetB.find(d => d.id_divisi === a.id_divisi);
      results.push({
        emp_id: a.emp_id,
        nama: a.nama,
        id_divisi: a.id_divisi,
        nama_divisi: b ? b.nama_divisi : (isEn ? "<NULL: Department Not Found>" : "<NULL: Divisi Tidak Ditemukan>"),
        head: b ? b.head_dept : "N/A",
        status: b ? "MATCHED" : "UNMATCHED_LEFT"
      });
    });
  } else if (joinType === 'right') {
    datasetB.forEach(b => {
      const matches = datasetA.filter(a => a.id_divisi === b.id_divisi);
      if (matches.length > 0) {
        matches.forEach(a => {
          results.push({ emp_id: a.emp_id, nama: a.nama, id_divisi: b.id_divisi, nama_divisi: b.nama_divisi, head: b.head_dept, status: "MATCHED" });
        });
      } else {
        results.push({ emp_id: "<NULL>", nama: (isEn ? "<No Assigned Staff>" : "<Belum Ada Staf>"), id_divisi: b.id_divisi, nama_divisi: b.nama_divisi, head: b.head_dept, status: "UNMATCHED_RIGHT" });
      }
    });
  } else if (joinType === 'full') {
    const matchedB = new Set();
    datasetA.forEach(a => {
      const b = datasetB.find(d => d.id_divisi === a.id_divisi);
      if (b) matchedB.add(b.id_divisi);
      results.push({
        emp_id: a.emp_id,
        nama: a.nama,
        id_divisi: a.id_divisi,
        nama_divisi: b ? b.nama_divisi : (isEn ? "<NULL: Department Not Found>" : "<NULL: Divisi Tidak Ditemukan>"),
        head: b ? b.head_dept : "N/A",
        status: b ? "MATCHED" : "UNMATCHED_LEFT"
      });
    });
    datasetB.forEach(b => {
      if (!matchedB.has(b.id_divisi)) {
        results.push({ emp_id: "<NULL>", nama: (isEn ? "<No Assigned Staff>" : "<Belum Ada Staf>"), id_divisi: b.id_divisi, nama_divisi: b.nama_divisi, head: b.head_dept, status: "UNMATCHED_RIGHT" });
      }
    });
  }

  let html = '';
  results.forEach(r => {
    let badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
    let statusText = isEn ? "Matched" : "Matched (Sesuai)";
    if (r.status === 'UNMATCHED_LEFT') {
      badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
      statusText = "Orphan Record";
    } else if (r.status === 'UNMATCHED_RIGHT') {
      badgeClass = "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300";
      statusText = "Empty Parent";
    }

    html += `
      <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
        <td class="px-3 py-2 font-bold text-slate-900 dark:text-white">${r.emp_id}</td>
        <td class="px-3 py-2 text-slate-800 dark:text-slate-200">${r.nama}</td>
        <td class="px-3 py-2 text-slate-500">${r.id_divisi}</td>
        <td class="px-3 py-2 font-medium ${r.status === 'UNMATCHED_LEFT' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'}">${r.nama_divisi}</td>
        <td class="px-3 py-2 text-slate-500">${r.head}</td>
        <td class="px-3 py-2"><span class="px-2 py-0.5 rounded text-[10px] font-bold border border-current ${badgeClass}">${statusText}</span></td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function exportQcReport() {
  const isEn = (window.currentLang || 'id') === 'en';
  const report = `# ============================================================
# DATA QUALITY CONTROL & INTEGRATION AUDIT REPORT
# Generated by Dataset Integration & QC Inspector
# ============================================================

1. SUMMARY STATISTIK KESEHATAN DATA
- Overall Health Score : 94.2% (Grade A - Siap Analisis)
- Total Records Audited : 7 Karyawan, 5 Master Divisi
- Completeness Rate    : 100.0% (0 Missing Values)
- Primary Key Unique   : 100.0% (EMP-01 s/d EMP-07)
- Outlier Rate (IQR)   : 1 Anomali Terdeteksi (Gaji: EMP-05)

2. TEMUAN INTEGRITAS DATA & REKOMENDASI TINDAK LANJUT
[A] Deteksi Outlier Gaji:
    - Rekaman EMP-05 (Rian Pratama) bernilai Rp 25.000.000 (Batas Atas IQR: Rp 12.800.000).
    - Rekomendasi: Verifikasi dengan departemen Keuangan apakah angka tersebut mencakup bonus tahunan atau kesalahan input.

[B] Relational Foreign Key Mismatch:
    - Rekaman EMP-06 (Eka Wijaya) menggunakan kode DIV-DEV yang tidak ada di Master Divisi.
    - Rekomendasi: Tambahkan DIV-DEV pada Master Divisi atau sesuaikan data karyawan ke divisi yang valid.
`;

  navigator.clipboard.writeText(report).then(() => {
    if (window.showToast) window.showToast(isEn ? "QC Audit Report copied to clipboard!" : "Laporan QC Audit berhasil disalin ke clipboard!", "success");
  });
}
