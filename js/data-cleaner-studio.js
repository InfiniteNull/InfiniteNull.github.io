/**
 * data-cleaner-studio.js
 * Tool: Tabular Data Cleaner & Imputation Studio (Data Wrangling & Preparation)
 * Melakukan pembersihan data mentah, penanganan missing values (imputasi), deduplikasi, standardisasi format teks/tanggal, dan export pipeline Python Pandas.
 */

window.DATA_CLEANER_SAMPLE = [
  { id: "101", nama: "  Budi Santoso ", email: "budi.s@example.com", kota: "jakarta", usia: "28", tgl_daftar: "2024/01/15", total_transaksi: "1500000" },
  { id: "102", nama: "Siti Rahma", email: "siti.rahma@domain.org", kota: "SURABAYA", usia: "", tgl_daftar: "18-02-2024", total_transaksi: "2450000" },
  { id: "103", nama: "Ahmad Fauzi", email: "ahmad.f@mail.com", kota: "medan", usia: "35", tgl_daftar: "2024-03-01", total_transaksi: "980000" },
  { id: "104", nama: "  Budi Santoso ", email: "budi.s@example.com", kota: "jakarta", usia: "28", tgl_daftar: "2024/01/15", total_transaksi: "1500000" }, // Duplikat
  { id: "105", nama: "Dewi Lestari", email: "dewi.l@example.com", kota: "bandung", usia: "24", tgl_daftar: "2024/04/10", total_transaksi: "null" },
  { id: "106", nama: "Rian Pratama ", email: "rian.p@domain.com", kota: "SURABAYA", usia: "31", tgl_daftar: "2024-05-12", total_transaksi: "3100000" },
  { id: "107", nama: "Eka Wijaya", email: "eka.w@mail.org", kota: "Jakarta", usia: "", tgl_daftar: "2024/06/20", total_transaksi: "1750000" }
];

let rawCleanerData = JSON.parse(JSON.stringify(window.DATA_CLEANER_SAMPLE));
let cleanedData = [];

window.renderDataCleanerStudio = function(container) {
  rawCleanerData = JSON.parse(JSON.stringify(window.DATA_CLEANER_SAMPLE));
  
  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Control Header -->
      <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <i data-lucide="filter" class="w-4 h-4 text-slate-700 dark:text-slate-300"></i>
              <span>Pipeline Pembersihan & Imputasi Data Mentah</span>
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Simulasi alur Data Wrangling: deteksi null, imputasi rata-rata/modus, deduplikasi, dan standardisasi teks.
            </p>
          </div>
          
          <div class="flex items-center gap-2">
            <button id="btnResetCleanerData" class="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
              <span>Reset Sample</span>
            </button>
            <label class="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition flex items-center gap-1.5 cursor-pointer">
              <i data-lucide="upload" class="w-3.5 h-3.5"></i>
              <span>Upload CSV</span>
              <input type="file" id="cleanerCsvFileInput" accept=".csv" class="hidden" />
            </label>
          </div>
        </div>

        <!-- Pipeline Options Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          
          <!-- Option 1: Missing Values -->
          <div class="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
            <label class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <i data-lucide="help-circle" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>Missing Values</span>
            </label>
            <select id="optMissingStrategy" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
              <option value="impute_mean_mode" selected>Impute Mean (Num) / Mode (Cat)</option>
              <option value="drop_rows">Drop Rows with Null</option>
              <option value="fill_custom">Fill with "N/A" / 0</option>
              <option value="ignore">Biarkan Kosong (Raw)</option>
            </select>
          </div>

          <!-- Option 2: Deduplication -->
          <div class="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
            <label class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <i data-lucide="copy" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>Deduplikasi</span>
            </label>
            <select id="optDedupStrategy" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
              <option value="remove_exact" selected>Hapus Baris Duplikat Tepat</option>
              <option value="keep_all">Pertahankan Semua Duplikat</option>
            </select>
          </div>

          <!-- Option 3: Text Standardization -->
          <div class="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
            <label class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <i data-lucide="type" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>Format Teks & Spasi</span>
            </label>
            <select id="optTextFormat" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
              <option value="trim_titlecase" selected>Trim Space + Title Case</option>
              <option value="trim_lowercase">Trim Space + Lowercase</option>
              <option value="trim_uppercase">Trim Space + UPPERCASE</option>
              <option value="trim_only">Trim Whitespace Only</option>
            </select>
          </div>

          <!-- Option 4: Date Standardization -->
          <div class="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
            <label class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>Standardisasi Tanggal</span>
            </label>
            <select id="optDateFormat" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
              <option value="iso_8601" selected>ISO-8601 (YYYY-MM-DD)</option>
              <option value="dmy_slash">DD/MM/YYYY</option>
              <option value="raw">Biarkan Format Asli</option>
            </select>
          </div>

        </div>

        <div class="flex justify-end pt-2">
          <button id="btnExecuteCleanPipeline" class="px-5 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition flex items-center gap-2 shadow-sm font-mono">
            <i data-lucide="play" class="w-3.5 h-3.5"></i>
            <span>Eksekusi Pipeline Pembersihan</span>
          </button>
        </div>
      </div>

      <!-- Execution Stats Metrics -->
      <div id="cleanerMetricsGrid" class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <!-- Injected dynamically -->
      </div>

      <!-- Tables Comparison (Raw vs Clean) -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button id="tabViewClean" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition">
              Clean Dataset (Hasil)
            </button>
            <button id="tabViewRaw" class="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Raw Dirty Dataset (Mentah)
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button id="btnDownloadCleanCsv" class="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Download CSV</span>
            </button>
            <button id="btnCopyPandasCode" class="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5">
              <i data-lucide="code" class="w-3.5 h-3.5"></i>
              <span>Copy Pandas Script</span>
            </button>
          </div>
        </div>

        <div class="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto bg-white dark:bg-slate-900">
          <table class="w-full text-left text-xs font-mono" id="cleanerDataTable">
            <!-- Injected dynamically -->
          </table>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Setup Event Listeners
  document.getElementById('btnExecuteCleanPipeline').addEventListener('click', executeCleaningPipeline);
  document.getElementById('btnResetCleanerData').addEventListener('click', () => {
    rawCleanerData = JSON.parse(JSON.stringify(window.DATA_CLEANER_SAMPLE));
    executeCleaningPipeline();
    if (window.showToast) window.showToast("Sample data di-reset ke kondisi awal.", "info");
  });

  document.getElementById('tabViewClean').addEventListener('click', (e) => {
    e.target.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition";
    document.getElementById('tabViewRaw').className = "px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition";
    renderTable(cleanedData, true);
  });

  document.getElementById('tabViewRaw').addEventListener('click', (e) => {
    e.target.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition";
    document.getElementById('tabViewClean').className = "px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition";
    renderTable(rawCleanerData, false);
  });

  document.getElementById('btnDownloadCleanCsv').addEventListener('click', downloadCleanCsv);
  document.getElementById('btnCopyPandasCode').addEventListener('click', copyPandasScript);

  // File Upload listener
  document.getElementById('cleanerCsvFileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (window.Papa) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          if (results.data && results.data.length > 0) {
            rawCleanerData = results.data;
            executeCleaningPipeline();
            if (window.showToast) window.showToast(`Berhasil memuat ${results.data.length} baris data CSV!`, "success");
          }
        },
        error: function(err) {
          if (window.showToast) window.showToast("Gagal membaca file CSV: " + err.message, "error");
        }
      });
    }
  });

  // Initial Run
  executeCleaningPipeline();
};

function executeCleaningPipeline() {
  const missingStrategy = document.getElementById('optMissingStrategy') ? document.getElementById('optMissingStrategy').value : 'impute_mean_mode';
  const dedupStrategy = document.getElementById('optDedupStrategy') ? document.getElementById('optDedupStrategy').value : 'remove_exact';
  const textFormat = document.getElementById('optTextFormat') ? document.getElementById('optTextFormat').value : 'trim_titlecase';
  const dateFormat = document.getElementById('optDateFormat') ? document.getElementById('optDateFormat').value : 'iso_8601';

  let data = JSON.parse(JSON.stringify(rawCleanerData));
  let initialCount = data.length;
  let missingImputed = 0;
  let rowsDropped = 0;
  let duplicatesRemoved = 0;

  // 1. Deduplication
  if (dedupStrategy === 'remove_exact') {
    const seen = new Set();
    const unique = [];
    data.forEach(row => {
      const rowKey = JSON.stringify(row);
      if (!seen.has(rowKey)) {
        seen.add(rowKey);
        unique.push(row);
      } else {
        duplicatesRemoved++;
      }
    });
    data = unique;
  }

  // 2. Identify Numeric and Categorical columns for Imputation
  if (data.length > 0) {
    const keys = Object.keys(data[0]);
    const numStats = {};

    keys.forEach(key => {
      const vals = data.map(r => r[key]).filter(v => v !== null && v !== undefined && v !== '' && v !== 'null' && !isNaN(Number(v)));
      if (vals.length > 0 && vals.length >= data.length * 0.4) {
        const sum = vals.reduce((a, b) => a + Number(b), 0);
        numStats[key] = {
          mean: Math.round((sum / vals.length) * 100) / 100,
          isNumeric: true
        };
      }
    });

    // Process Missing Values & Format
    const processedData = [];
    
    data.forEach(row => {
      let hasNull = false;
      const cleanRow = {};

      keys.forEach(key => {
        let val = row[key];
        const isNullOrEmpty = val === null || val === undefined || val === '' || val === 'null' || String(val).trim().toLowerCase() === 'nan';

        if (isNullOrEmpty) {
          hasNull = true;
          if (missingStrategy === 'impute_mean_mode') {
            if (numStats[key] && numStats[key].isNumeric) {
              cleanRow[key] = String(numStats[key].mean);
              missingImputed++;
            } else {
              cleanRow[key] = "Belum Diketahui";
              missingImputed++;
            }
          } else if (missingStrategy === 'fill_custom') {
            cleanRow[key] = (numStats[key] && numStats[key].isNumeric) ? "0" : "N/A";
            missingImputed++;
          } else if (missingStrategy === 'ignore') {
            cleanRow[key] = "";
          }
        } else {
          // Clean & Standardize value
          let str = String(val).trim();

          // Text Formatting
          if (textFormat === 'trim_titlecase') {
            if (isNaN(Number(str))) {
              str = str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
            }
          } else if (textFormat === 'trim_lowercase') {
            if (isNaN(Number(str))) str = str.toLowerCase();
          } else if (textFormat === 'trim_uppercase') {
            if (isNaN(Number(str))) str = str.toUpperCase();
          }

          // Date Standardizing
          if (dateFormat === 'iso_8601' && (key.includes('tgl') || key.includes('date') || str.includes('/') || (str.includes('-') && str.length >= 8))) {
            const parsedDate = parseDateStandard(str);
            if (parsedDate) str = parsedDate;
          }

          cleanRow[key] = str;
        }
      });

      if (missingStrategy === 'drop_rows' && hasNull) {
        rowsDropped++;
      } else {
        processedData.push(cleanRow);
      }
    });

    data = processedData;
  }

  cleanedData = data;

  // Render Stats
  const metricsGrid = document.getElementById('cleanerMetricsGrid');
  if (metricsGrid) {
    metricsGrid.innerHTML = `
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="text-xs text-slate-500 dark:text-slate-400">Total Baris Mentah</div>
        <div class="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">${initialCount}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="text-xs text-slate-500 dark:text-slate-400">Baris Bersih Final</div>
        <div class="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">${cleanedData.length}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="text-xs text-slate-500 dark:text-slate-400">Null Diimputasi</div>
        <div class="text-lg font-bold font-mono text-sky-600 dark:text-sky-400 mt-1">${missingImputed}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="text-xs text-slate-500 dark:text-slate-400">Duplikat Tereliminasi</div>
        <div class="text-lg font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">${duplicatesRemoved}</div>
      </div>
    `;
  }

  // Render Table
  renderTable(cleanedData, true);
}

function parseDateStandard(dateStr) {
  try {
    let parts;
    if (dateStr.includes('/')) {
      parts = dateStr.split('/');
      if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      if (parts[2].length === 4) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    } else if (dateStr.includes('-')) {
      parts = dateStr.split('-');
      if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      if (parts[2].length === 4) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  } catch (e) {
    return dateStr;
  }
  return dateStr;
}

function renderTable(data, isClean) {
  const table = document.getElementById('cleanerDataTable');
  if (!table) return;

  if (!data || data.length === 0) {
    table.innerHTML = `<tr><td class="p-6 text-center text-slate-400">Tidak ada baris data.</td></tr>`;
    return;
  }

  const columns = Object.keys(data[0]);

  let html = `
    <thead>
      <tr class="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
        <th class="px-3.5 py-2.5 font-bold">#</th>
        ${columns.map(c => `<th class="px-3.5 py-2.5 font-bold uppercase tracking-wider">${c}</th>`).join('')}
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
  `;

  data.forEach((row, idx) => {
    html += `<tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
      <td class="px-3.5 py-2 text-slate-400">${idx + 1}</td>
      ${columns.map(col => {
        const val = row[col];
        const isNull = !isClean && (val === '' || val === null || val === 'null');
        return `<td class="px-3.5 py-2 ${isNull ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold' : 'text-slate-800 dark:text-slate-200'}">${val || (isNull ? '<span class="italic text-[10px]">&lt;NULL&gt;</span>' : '')}</td>`;
      }).join('')}
    </tr>`;
  });

  html += `</tbody>`;
  table.innerHTML = html;
}

function downloadCleanCsv() {
  if (!cleanedData || cleanedData.length === 0) return;
  if (!window.Papa) return;

  const csv = Papa.unparse(cleanedData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clean_dataset_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  if (window.showToast) window.showToast("Dataset bersih berhasil diunduh!", "success");
}

function copyPandasScript() {
  const script = `# ============================================================
# Python Pandas Data Cleaning Pipeline
# Dihasilkan Otomatis oleh Tabular Data Cleaner Studio
# ============================================================
import pandas as pd
import numpy as np

# 1. Load Dataset
df = pd.read_csv('raw_dataset.csv')
print(f"Initial Shape: {df.shape}")

# 2. Deduplikasi
df = df.drop_duplicates().reset_index(drop=True)

# 3. Handling Missing Values
for col in df.select_dtypes(include=[np.number]).columns:
    df[col] = df[col].fillna(df[col].median())

for col in df.select_dtypes(include=['object']).columns:
    # Text Trimming & Title Case
    df[col] = df[col].astype(str).str.strip().str.title()
    df[col] = df[col].replace('Nan', 'Belum Diketahui')

# 4. Standardisasi Tanggal (ISO-8601)
date_cols = [c for c in df.columns if 'tgl' in c.lower() or 'date' in c.lower()]
for col in date_cols:
    df[col] = pd.to_datetime(df[col], errors='coerce').dt.strftime('%Y-%m-%d')

# 5. Export Clean Dataset
df.to_csv('clean_dataset_processed.csv', index=False)
print("Data Cleaning Complete. Final Shape:", df.shape)
`;

  navigator.clipboard.writeText(script).then(() => {
    if (window.showToast) window.showToast("Kode script Python Pandas berhasil disalin!", "success");
  });
}
