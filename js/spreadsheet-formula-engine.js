/**
 * spreadsheet-formula-engine.js
 * Tool: Spreadsheet Formula Simulator & Data Reshaper (Excel / SQL / Pandas)
 * Mensimulasikan logika pengolahan data kantor: XLOOKUP/VLOOKUP matching, Pivot Table GroupBy, dan konversi syntax formula Excel ke SQL dan Python Pandas.
 */

window.SPREADSHEET_SAMPLE_PRODUCTS = [
  { sku: "PRD-101", nama: "Laptop ThinkPad E14", kategori: "Hardware", harga: 11500000, stok: 14, cabang: "Jakarta" },
  { sku: "PRD-102", nama: "Monitor Dell 24 Inch", kategori: "Peripheral", harga: 2200000, stok: 28, cabang: "Surabaya" },
  { sku: "PRD-103", nama: "Router MikroTik RB750", kategori: "Networking", harga: 750000, stok: 45, cabang: "Medan" },
  { sku: "PRD-104", nama: "Switch Cisco 24-Port", kategori: "Networking", harga: 4800000, stok: 9, cabang: "Jakarta" },
  { sku: "PRD-105", nama: "Keyboard Mechanical", kategori: "Peripheral", harga: 650000, stok: 32, cabang: "Medan" },
  { sku: "PRD-106", nama: "Server Rack 42U", kategori: "Hardware", harga: 18500000, stok: 3, cabang: "Jakarta" }
];

window.renderSpreadsheetFormulaEngine = function(container) {
  const isEn = (window.currentLang || 'id') === 'en';

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Mode Selector -->
      <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <i data-lucide="table" class="w-4 h-4 text-slate-700 dark:text-slate-300"></i>
              <span>${isEn ? 'Spreadsheet Formula Simulator & Data Reshaper' : 'Simulator Formula Spreadsheet & Transformasi Data'}</span>
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              ${isEn ? 'Test relational data lookups (VLOOKUP/XLOOKUP), calculate Pivot Table GroupBy matrices, and compare multi-platform syntax.' : 'Uji pencarian data relasional (VLOOKUP/XLOOKUP), kalkulasi Pivot Table GroupBy, dan perbandingan sintaks multi-platform.'}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button id="btnModeLookup" class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition flex items-center gap-1.5">
              <i data-lucide="search" class="w-3.5 h-3.5"></i>
              <span>1. VLOOKUP / XLOOKUP</span>
            </button>
            <button id="btnModePivot" class="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5">
              <i data-lucide="layers" class="w-3.5 h-3.5"></i>
              <span>2. Pivot Table & GroupBy</span>
            </button>
          </div>
        </div>
      </div>

      <!-- VIEW 1: LOOKUP SIMULATOR -->
      <div id="viewLookup" class="space-y-5">
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label class="font-bold text-slate-800 dark:text-slate-200 block mb-1">${isEn ? 'Lookup Value (SKU Key):' : 'Lookup Value (Kunci SKU):'}</label>
              <select id="lookupSkuSelect" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
                <option value="PRD-101">PRD-101 (Laptop ThinkPad E14)</option>
                <option value="PRD-102">PRD-102 (Monitor Dell 24 Inch)</option>
                <option value="PRD-103" selected>PRD-103 (Router MikroTik RB750)</option>
                <option value="PRD-104">PRD-104 (Switch Cisco 24-Port)</option>
                <option value="PRD-105">PRD-105 (Keyboard Mechanical)</option>
                <option value="PRD-106">PRD-106 (Server Rack 42U)</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-800 dark:text-slate-200 block mb-1">${isEn ? 'Target Column (Return Column):' : 'Kolom Target (Return Column):'}</label>
              <select id="lookupTargetCol" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
                <option value="harga" selected>${isEn ? 'Unit Price (IDR)' : 'Harga Satuan (IDR)'}</option>
                <option value="stok">${isEn ? 'Stock Quantity Available' : 'Jumlah Stok Tersedia'}</option>
                <option value="kategori">${isEn ? 'Product Category' : 'Kategori Perangkat'}</option>
                <option value="cabang">${isEn ? 'Warehouse Branch Location' : 'Lokasi Cabang Gudang'}</option>
              </select>
            </div>

            <div class="flex items-end">
              <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 w-full">
                <div class="text-[11px] text-slate-500 font-mono">${isEn ? 'Lookup Match Result:' : 'Hasil Pencocokan:'}</div>
                <div class="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400" id="lookupResultVal">-</div>
              </div>
            </div>
          </div>

          <!-- Formula Code Box -->
          <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">${isEn ? 'Multi-Platform Formula Equivalents:' : 'Ekivalen Rumus Formula Multi-Platform:'}</span>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div class="p-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 space-y-1">
                <div class="text-[10px] text-slate-400">Microsoft Excel (XLOOKUP):</div>
                <div class="text-emerald-400 text-[11px] overflow-x-auto" id="formulaExcelXlookup">...</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 space-y-1">
                <div class="text-[10px] text-slate-400">SQL Query (SELECT WHERE):</div>
                <div class="text-sky-400 text-[11px] overflow-x-auto" id="formulaSql">...</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 space-y-1">
                <div class="text-[10px] text-slate-400">Python Pandas (.loc filter):</div>
                <div class="text-amber-400 text-[11px] overflow-x-auto" id="formulaPandas">...</div>
              </div>
            </div>
          </div>

          <!-- Reference Table with Highlight -->
          <div class="border border-slate-200 dark:border-slate-800 rounded-lg overflow-x-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th class="px-3 py-2">Col A: SKU</th>
                  <th class="px-3 py-2">${isEn ? 'Col B: Product Name' : 'Col B: Nama Produk'}</th>
                  <th class="px-3 py-2">${isEn ? 'Col C: Category' : 'Col C: Kategori'}</th>
                  <th class="px-3 py-2">${isEn ? 'Col D: Price (IDR)' : 'Col D: Harga (IDR)'}</th>
                  <th class="px-3 py-2">${isEn ? 'Col E: Stock' : 'Col E: Stok'}</th>
                  <th class="px-3 py-2">${isEn ? 'Col F: Branch' : 'Col F: Cabang'}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="lookupTableBody">
                <!-- Injected dynamically -->
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <!-- VIEW 2: PIVOT TABLE & GROUPBY -->
      <div id="viewPivot" class="space-y-5 hidden">
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label class="font-bold text-slate-800 dark:text-slate-200 block mb-1">${isEn ? 'Group By (Row Dimension):' : 'Group By (Dimensi Baris):'}</label>
              <select id="pivotGroupCol" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
                <option value="kategori" selected>${isEn ? 'Product Category' : 'Kategori Perangkat'}</option>
                <option value="cabang">${isEn ? 'Warehouse Branch Location' : 'Lokasi Cabang Gudang'}</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-800 dark:text-slate-200 block mb-1">${isEn ? 'Values (Metric Column):' : 'Values (Metrik Nilai):'}</label>
              <select id="pivotValCol" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
                <option value="harga" selected>${isEn ? 'Price Value' : 'Nilai Harga'}</option>
                <option value="stok">${isEn ? 'Stock Quantity' : 'Kuantitas Stok'}</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-800 dark:text-slate-200 block mb-1">${isEn ? 'Aggregation Function:' : 'Fungsi Agregasi:'}</label>
              <select id="pivotAggFunc" class="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none">
                <option value="SUM" selected>${isEn ? 'SUM (Total Sum)' : 'SUM (Total Akumulasi)'}</option>
                <option value="AVERAGE">${isEn ? 'AVERAGE (Mean)' : 'AVERAGE (Rata-rata)'}</option>
                <option value="COUNT">${isEn ? 'COUNT (Row Count)' : 'COUNT (Jumlah Baris)'}</option>
                <option value="MAX">${isEn ? 'MAX (Maximum Value)' : 'MAX (Nilai Tertinggi)'}</option>
                <option value="MIN">${isEn ? 'MIN (Minimum Value)' : 'MIN (Nilai Terendah)'}</option>
              </select>
            </div>
          </div>

          <!-- Pivot Matrix Result -->
          <div class="border border-slate-200 dark:border-slate-800 rounded-lg overflow-x-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th class="px-3 py-2" id="pivotThGroup">${isEn ? 'Category' : 'Kategori'}</th>
                  <th class="px-3 py-2">${isEn ? 'Record Count' : 'Jumlah Record'}</th>
                  <th class="px-3 py-2" id="pivotThMetric">${isEn ? 'Aggregated Result' : 'Hasil Agregasi'}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="pivotTableBody">
                <!-- Injected dynamically -->
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Mode buttons
  document.getElementById('btnModeLookup').addEventListener('click', () => switchEngineMode('lookup'));
  document.getElementById('btnModePivot').addEventListener('click', () => switchEngineMode('pivot'));

  // Lookup listeners
  document.getElementById('lookupSkuSelect').addEventListener('change', updateLookupResults);
  document.getElementById('lookupTargetCol').addEventListener('change', updateLookupResults);

  // Pivot listeners
  document.getElementById('pivotGroupCol').addEventListener('change', updatePivotResults);
  document.getElementById('pivotValCol').addEventListener('change', updatePivotResults);
  document.getElementById('pivotAggFunc').addEventListener('change', updatePivotResults);

  // Initial updates
  updateLookupResults();
  updatePivotResults();
};

function switchEngineMode(mode) {
  const btnLookup = document.getElementById('btnModeLookup');
  const btnPivot = document.getElementById('btnModePivot');
  const viewLookup = document.getElementById('viewLookup');
  const viewPivot = document.getElementById('viewPivot');

  if (mode === 'lookup') {
    btnLookup.className = "px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition flex items-center gap-1.5";
    btnPivot.className = "px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5";
    viewLookup.classList.remove('hidden');
    viewPivot.classList.add('hidden');
  } else {
    btnPivot.className = "px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition flex items-center gap-1.5";
    btnLookup.className = "px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5";
    viewPivot.classList.remove('hidden');
    viewLookup.classList.add('hidden');
  }
}

function updateLookupResults() {
  const isEn = (window.currentLang || 'id') === 'en';
  const sku = document.getElementById('lookupSkuSelect') ? document.getElementById('lookupSkuSelect').value : 'PRD-103';
  const targetCol = document.getElementById('lookupTargetCol') ? document.getElementById('lookupTargetCol').value : 'harga';

  const product = window.SPREADSHEET_SAMPLE_PRODUCTS.find(p => p.sku === sku);
  const resultContainer = document.getElementById('lookupResultVal');

  let val = product ? product[targetCol] : "Not Found";
  if (targetCol === 'harga' && typeof val === 'number') {
    val = `Rp ${val.toLocaleString()}`;
  }

  if (resultContainer) resultContainer.textContent = val;

  // Update Formula Generator
  const targetColIndex = { nama: 2, kategori: 3, harga: 4, stok: 5, cabang: 6 }[targetCol] || 4;
  const targetColLetter = { nama: "B", kategori: "C", harga: "D", stok: "E", cabang: "F" }[targetCol] || "D";

  const formulaXlookup = document.getElementById('formulaExcelXlookup');
  if (formulaXlookup) {
    formulaXlookup.textContent = `=XLOOKUP("${sku}", A2:A7, ${targetColLetter}2:${targetColLetter}7, "N/A")`;
  }

  const formulaSql = document.getElementById('formulaSql');
  if (formulaSql) {
    formulaSql.textContent = `SELECT ${targetCol} FROM tb_products WHERE sku = '${sku}';`;
  }

  const formulaPandas = document.getElementById('formulaPandas');
  if (formulaPandas) {
    formulaPandas.textContent = `df.loc[df['sku'] == '${sku}', '${targetCol}'].values[0]`;
  }

  // Render Table with Highlight
  const tbody = document.getElementById('lookupTableBody');
  if (tbody) {
    let html = '';
    window.SPREADSHEET_SAMPLE_PRODUCTS.forEach(p => {
      const isSelected = p.sku === sku;
      html += `
        <tr class="${isSelected ? 'bg-emerald-50 dark:bg-emerald-950/40 font-semibold' : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'} transition">
          <td class="px-3 py-2 ${isSelected ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-slate-900 dark:text-white'}">${p.sku}</td>
          <td class="px-3 py-2 text-slate-700 dark:text-slate-300">${p.nama}</td>
          <td class="px-3 py-2 text-slate-500">${p.kategori}</td>
          <td class="px-3 py-2 font-mono ${isSelected && targetCol === 'harga' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300'}">Rp ${p.harga.toLocaleString()}</td>
          <td class="px-3 py-2 font-mono ${isSelected && targetCol === 'stok' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300'}">${p.stok}</td>
          <td class="px-3 py-2 text-slate-500 ${isSelected && targetCol === 'cabang' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}">${p.cabang}</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }
}

function updatePivotResults() {
  const isEn = (window.currentLang || 'id') === 'en';
  const groupCol = document.getElementById('pivotGroupCol') ? document.getElementById('pivotGroupCol').value : 'kategori';
  const valCol = document.getElementById('pivotValCol') ? document.getElementById('pivotValCol').value : 'harga';
  const aggFunc = document.getElementById('pivotAggFunc') ? document.getElementById('pivotAggFunc').value : 'SUM';

  const thGroup = document.getElementById('pivotThGroup');
  const thMetric = document.getElementById('pivotThMetric');
  if (thGroup) {
    thGroup.textContent = isEn ? (groupCol === 'kategori' ? 'CATEGORY' : 'BRANCH') : groupCol.toUpperCase();
  }
  if (thMetric) thMetric.textContent = `${aggFunc}(${valCol.toUpperCase()})`;

  const groups = {};
  window.SPREADSHEET_SAMPLE_PRODUCTS.forEach(p => {
    const key = p[groupCol];
    if (!groups[key]) groups[key] = [];
    groups[key].push(p[valCol]);
  });

  const tbody = document.getElementById('pivotTableBody');
  if (!tbody) return;

  let html = '';
  Object.keys(groups).forEach(grpKey => {
    const arr = groups[grpKey];
    let result = 0;

    if (aggFunc === 'SUM') {
      result = arr.reduce((a, b) => a + b, 0);
    } else if (aggFunc === 'AVERAGE') {
      result = Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100;
    } else if (aggFunc === 'COUNT') {
      result = arr.length;
    } else if (aggFunc === 'MAX') {
      result = Math.max(...arr);
    } else if (aggFunc === 'MIN') {
      result = Math.min(...arr);
    }

    let displayVal = result;
    if (valCol === 'harga' && (aggFunc === 'SUM' || aggFunc === 'AVERAGE' || aggFunc === 'MAX' || aggFunc === 'MIN')) {
      displayVal = `Rp ${Math.round(result).toLocaleString()}`;
    }

    html += `
      <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
        <td class="px-3 py-2 font-bold text-slate-900 dark:text-white">${grpKey}</td>
        <td class="px-3 py-2 font-mono text-slate-500">${arr.length} ${isEn ? 'rows' : 'baris'}</td>
        <td class="px-3 py-2 font-mono font-bold text-slate-900 dark:text-white">${displayVal}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

