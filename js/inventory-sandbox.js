/**
 * inventory-sandbox.js
 * Tool: Inventory & Warehouse CRUD Sandbox
 * Pengelolaan basis data inventaris barang (Create, Read, Update Stok, Delete) dengan peringatan stok kritis.
 */

window.renderInventorySandbox = function(container) {
  let inventory = JSON.parse(localStorage.getItem('inventory_sandbox_items') || '[]');
  if (inventory.length === 0) {
    inventory = [
      { id: 1, name: "Laptop Kantor Core i7", category: "Elektronik", stock: 12, price: 14500000 },
      { id: 2, name: "Monitor 24 Inch IPS", category: "Elektronik", stock: 4, price: 2100000 },
      { id: 3, name: "Meja Kerja Ergonomis", category: "Furnitur", stock: 18, price: 1850000 },
      { id: 4, name: "Kertas HVS A4 80gr (Rim)", category: "ATK", stock: 2, price: 55000 },
      { id: 5, name: "Printer Laser Multifungsi", category: "Elektronik", stock: 6, price: 3400000 }
    ];
    localStorage.setItem('inventory_sandbox_items', JSON.stringify(inventory));
  }

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Action Bar & Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
          <div class="text-xs font-semibold text-slate-500 uppercase">Total Jenis Barang</div>
          <div id="invStatCount" class="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">5</div>
        </div>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
          <div class="text-xs font-semibold text-slate-500 uppercase">Total Nilai Aset</div>
          <div id="invStatValue" class="text-2xl font-bold font-mono text-emerald-600 mt-1">Rp 235 Jt</div>
        </div>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
          <div class="text-xs font-semibold text-amber-500 uppercase">Stok Kritis (&le; 3)</div>
          <div id="invStatLow" class="text-2xl font-bold font-mono text-amber-500 mt-1">1 Item</div>
        </div>
      </div>

      <!-- Add Product Form Card -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <i data-lucide="plus-circle" class="w-4 h-4 text-sky-600"></i>
          <span>Tambah Barang Baru (POST /api/products)</span>
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input type="text" id="invNameInput" placeholder="Nama Barang..." class="sm:col-span-2 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none" />
          
          <select id="invCatSelect" class="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none">
            <option value="Elektronik">Elektronik</option>
            <option value="ATK">ATK</option>
            <option value="Furnitur">Furnitur</option>
            <option value="Perlengkapan">Perlengkapan</option>
          </select>

          <input type="number" id="invPriceInput" placeholder="Harga (Rp)..." min="0" class="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none font-mono" />
        </div>

        <div class="flex items-center justify-between pt-1">
          <div class="flex items-center gap-2">
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Stok Awal:</label>
            <input type="number" id="invStockInput" value="10" min="0" class="w-20 px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono" />
          </div>
          <button id="invAddBtn" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Simpan ke Database</span>
          </button>
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Tabel Data Barang (SQLite: products)</h4>
          <input type="text" id="invSearchInput" placeholder="Cari nama barang..." class="px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none w-48" />
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold uppercase text-[10px]">
              <tr>
                <th class="p-3 rounded-l">ID</th>
                <th class="p-3">Nama Barang</th>
                <th class="p-3">Kategori</th>
                <th class="p-3">Harga Satuan</th>
                <th class="p-3">Stok</th>
                <th class="p-3 text-right rounded-r">Aksi (CRUD)</th>
              </tr>
            </thead>
            <tbody id="invTableBody" class="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              <!-- Populated by JS -->
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const nameInput = container.querySelector('#invNameInput');
  const catSelect = container.querySelector('#invCatSelect');
  const priceInput = container.querySelector('#invPriceInput');
  const stockInput = container.querySelector('#invStockInput');
  const addBtn = container.querySelector('#invAddBtn');
  const searchInput = container.querySelector('#invSearchInput');
  const tableBody = container.querySelector('#invTableBody');

  const statCount = container.querySelector('#invStatCount');
  const statVal = container.querySelector('#invStatValue');
  const statLow = container.querySelector('#invStatLow');

  function renderTable(filterText = '') {
    const filtered = inventory.filter(item => 
      item.name.toLowerCase().includes(filterText.toLowerCase()) || 
      item.category.toLowerCase().includes(filterText.toLowerCase())
    );

    tableBody.innerHTML = filtered.map(item => {
      const isCritical = item.stock <= 3;
      return `
        <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
          <td class="p-3 text-slate-400">#${item.id}</td>
          <td class="p-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
            ${item.name}
            ${isCritical ? '<span class="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-bold">Stok Rendah!</span>' : ''}
          </td>
          <td class="p-3 font-sans">
            <span class="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">${item.category}</span>
          </td>
          <td class="p-3">Rp ${item.price.toLocaleString('id-ID')}</td>
          <td class="p-3">
            <div class="flex items-center gap-1.5">
              <button class="inv-adjust-btn w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 flex items-center justify-center text-xs" data-id="${item.id}" data-delta="-1">-</button>
              <span class="font-bold w-8 text-center ${isCritical ? 'text-red-600' : 'text-slate-800 dark:text-slate-200'}">${item.stock}</span>
              <button class="inv-adjust-btn w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 flex items-center justify-center text-xs" data-id="${item.id}" data-delta="1">+</button>
            </div>
          </td>
          <td class="p-3 text-right">
            <button class="inv-del-btn p-1 text-slate-400 hover:text-red-600 rounded transition" data-id="${item.id}" title="Hapus Barang">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Update Stats
    statCount.textContent = inventory.length;
    const totalAsset = inventory.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
    statVal.textContent = totalAsset > 1000000 ? `Rp ${(totalAsset / 1000000).toFixed(1)} Jt` : `Rp ${totalAsset.toLocaleString('id-ID')}`;
    const lowCount = inventory.filter(i => i.stock <= 3).length;
    statLow.textContent = `${lowCount} Item`;

    if (window.lucide) lucide.createIcons();

    // Attach event listeners
    container.querySelectorAll('.inv-adjust-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const delta = parseInt(btn.dataset.delta);
        const item = inventory.find(i => i.id === id);
        if (item) {
          item.stock = Math.max(0, item.stock + delta);
          saveAndRender();
        }
      });
    });

    container.querySelectorAll('.inv-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        if (confirm("Apakah Anda yakin ingin menghapus barang ini dari database?")) {
          inventory = inventory.filter(i => i.id !== id);
          saveAndRender();
          window.showToast?.("Barang berhasil dihapus!");
        }
      });
    });
  }

  function saveAndRender() {
    localStorage.setItem('inventory_sandbox_items', JSON.stringify(inventory));
    renderTable(searchInput.value);
  }

  addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const category = catSelect.value;
    const price = parseFloat(priceInput.value) || 0;
    const stock = parseInt(stockInput.value) || 0;

    if (!name || price <= 0) {
      alert("Harap isi nama barang dan harga yang valid!");
      return;
    }

    const newItem = {
      id: inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1,
      name,
      category,
      price,
      stock
    };

    inventory.unshift(newItem);
    saveAndRender();
    nameInput.value = '';
    priceInput.value = '';
    stockInput.value = '10';
    window.showToast?.(`Barang "${name}" berhasil ditambahkan ke inventaris!`);
  });

  searchInput.addEventListener('input', () => {
    renderTable(searchInput.value);
  });

  // Initial render
  renderTable();
};
