/**
 * json-sql-converter.js
 * Tool: JSON to SQL / CSV Converter
 * Mengonversi data JSON array menjadi perintah SQL INSERT INTO, skema CREATE TABLE, dan format CSV terstruktur.
 */

window.renderJsonSqlConverter = function(container) {
  const SAMPLE_JSON = JSON.stringify([
    { "id": 1, "nama_produk": "Laptop ThinkPad T480", "kategori": "Hardware", "stok": 12, "harga": 6500000 },
    { "id": 2, "nama_produk": "Mikrotik RB750Gr3", "kategori": "Networking", "stok": 8, "harga": 950000 },
    { "id": 3, "nama_produk": "Switch TP-Link 24 Port", "kategori": "Networking", "stok": 4, "harga": 1200000 },
    { "id": 4, "nama_produk": "SSD NVMe 512GB", "kategori": "Storage", "stok": 25, "harga": 600000 }
  ], null, 2);

  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="database" class="w-4 h-4 text-emerald-600"></i>
            <span>JSON ke SQL (INSERT & Schema) / CSV Converter</span>
          </h4>
          <div class="flex items-center gap-2">
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Nama Tabel:</label>
            <input type="text" id="targetTableName" value="products" class="w-32 px-2.5 py-1 text-xs font-mono rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none" />
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Input Data JSON (Array of Objects):</label>
            <button id="formatJsonBtn" class="text-sky-600 dark:text-sky-400 hover:underline">Format / Beautify</button>
          </div>
          <textarea id="jsonSourceInput" rows="6" class="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
        </div>
      </div>

      <!-- Output Tabs (SQL vs CSV) -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
            <button id="tabSqlBtn" class="px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm transition">Query SQL (INSERT & Schema)</button>
            <button id="tabCsvBtn" class="px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Data CSV</button>
          </div>
          <button id="copyConvertedBtn" class="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            <span>Salin Output</span>
          </button>
        </div>

        <div>
          <pre id="convertedOutput" class="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 max-h-72 leading-relaxed"></pre>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const jsonInput = container.querySelector('#jsonSourceInput');
  const tableInput = container.querySelector('#targetTableName');
  const outputPre = container.querySelector('#convertedOutput');

  let activeTab = "sql"; // "sql" or "csv"

  function inferSqlType(val) {
    if (typeof val === "number") return Number.isInteger(val) ? "INTEGER" : "REAL";
    if (typeof val === "boolean") return "INTEGER";
    return "TEXT";
  }

  function escapeSql(val) {
    if (val === null || val === undefined) return "NULL";
    if (typeof val === "number") return val;
    if (typeof val === "boolean") return val ? 1 : 0;
    return `'${String(val).replace(/'/g, "''")}'`;
  }

  function convert() {
    const raw = jsonInput.value.trim();
    const tableName = tableInput.value.trim() || "my_table";

    try {
      const data = JSON.parse(raw);
      if (!Array.isArray(data) || data.length === 0) {
        outputPre.textContent = "-- Error: JSON harus berupa array berisi objek (Array of Objects)\n-- Contoh: [{\"id\": 1, \"nama\": \"A\"}]";
        return;
      }

      // Collect columns
      const cols = [];
      const types = {};
      data.forEach(item => {
        Object.keys(item).forEach(k => {
          if (!cols.includes(k)) {
            cols.push(k);
            types[k] = inferSqlType(item[k]);
          }
        });
      });

      if (activeTab === "sql") {
        let sql = `-- Skema Pembuatan Tabel Relasional SQL\n`;
        sql += `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;
        sql += cols.map(c => `    ${c} ${types[c]}`).join(',\n');
        sql += `\n);\n\n-- Batch Insert Data Records\n`;

        data.forEach(row => {
          const vals = cols.map(c => escapeSql(row[c]));
          sql += `INSERT INTO ${tableName} (${cols.join(', ')}) VALUES (${vals.join(', ')});\n`;
        });

        outputPre.textContent = sql;
      } else {
        // CSV conversion
        let csv = cols.map(c => `"${c}"`).join(',') + '\n';
        data.forEach(row => {
          const rowVals = cols.map(c => {
            const v = row[c] !== undefined && row[c] !== null ? String(row[c]).replace(/"/g, '""') : '';
            return `"${v}"`;
          });
          csv += rowVals.join(',') + '\n';
        });

        outputPre.textContent = csv;
      }

    } catch(e) {
      outputPre.textContent = `-- JSON Parsing Error: ${e.message}`;
    }
  }

  container.querySelector('#tabSqlBtn').addEventListener('click', () => {
    activeTab = "sql";
    container.querySelector('#tabSqlBtn').className = "px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm transition";
    container.querySelector('#tabCsvBtn').className = "px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
    convert();
  });

  container.querySelector('#tabCsvBtn').addEventListener('click', () => {
    activeTab = "csv";
    container.querySelector('#tabCsvBtn').className = "px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm transition";
    container.querySelector('#tabSqlBtn').className = "px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
    convert();
  });

  container.querySelector('#formatJsonBtn').addEventListener('click', () => {
    try {
      jsonInput.value = JSON.stringify(JSON.parse(jsonInput.value), null, 2);
    } catch(e) {}
  });

  container.querySelector('#copyConvertedBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(outputPre.textContent).then(() => {
      if (window.showToast) showToast("Output berhasil disalin!", "success");
    });
  });

  jsonInput.addEventListener('input', convert);
  tableInput.addEventListener('input', convert);

  jsonInput.value = SAMPLE_JSON;
  convert();
};
