/**
 * currency-converter.js
 * Tool: Live Currency Converter & Exchange Calculator
 * Mengonversi nilai mata uang dunia secara real-time dengan kurs API terbuka.
 */

window.renderCurrencyConverter = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        
        <!-- Input Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          
          <!-- Amount -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Jumlah Uang</label>
            <input type="number" id="currAmount" value="100" min="1" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:ring-2 focus:ring-sky-500 outline-none" />
          </div>

          <!-- From Currency -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Dari Mata Uang</label>
            <select id="currFrom" class="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none">
              <option value="USD" selected>USD - US Dollar ($)</option>
              <option value="IDR">IDR - Rupiah Indonesia (Rp)</option>
              <option value="EUR">EUR - Euro (€)</option>
              <option value="SGD">SGD - Singapore Dollar (S$)</option>
              <option value="JPY">JPY - Japanese Yen (¥)</option>
              <option value="MYR">MYR - Malaysian Ringgit (RM)</option>
              <option value="GBP">GBP - British Pound (£)</option>
              <option value="AUD">AUD - Australian Dollar (A$)</option>
            </select>
          </div>

          <!-- To Currency -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Ke Mata Uang</label>
            <select id="currTo" class="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none">
              <option value="IDR" selected>IDR - Rupiah Indonesia (Rp)</option>
              <option value="USD">USD - US Dollar ($)</option>
              <option value="EUR">EUR - Euro (€)</option>
              <option value="SGD">SGD - Singapore Dollar (S$)</option>
              <option value="JPY">JPY - Japanese Yen (¥)</option>
              <option value="MYR">MYR - Malaysian Ringgit (RM)</option>
              <option value="GBP">GBP - British Pound (£)</option>
              <option value="AUD">AUD - Australian Dollar (A$)</option>
            </select>
          </div>

        </div>

        <div class="flex items-center justify-between pt-2">
          <button id="currSwapBtn" class="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 transition">
            <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
            <span>Tukar Posisi Mata Uang</span>
          </button>
          
          <button id="currCalculateBtn" class="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5">
            <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
            <span>Hitung Konversi</span>
          </button>
        </div>

      </div>

      <!-- Result Display Card -->
      <div id="currResultCard" class="bg-gradient-to-br from-sky-50 to-slate-50 dark:from-slate-900 dark:to-slate-850 border border-sky-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div class="text-xs text-slate-500 dark:text-slate-400 mb-1" id="currConversionRateText">
          Kurs Acuan: 1 USD = Rp 16.250 (Estimasi)
        </div>
        <div class="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white" id="currResultValue">
          Rp 1.625.000,00
        </div>
        <div class="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
          <i data-lucide="check-circle" class="w-3 h-3 text-emerald-500"></i>
          <span id="currLastUpdate">Data rate terhubung ke open exchange feed</span>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const amountEl = container.querySelector('#currAmount');
  const fromEl = container.querySelector('#currFrom');
  const toEl = container.querySelector('#currTo');
  const swapBtn = container.querySelector('#currSwapBtn');
  const calcBtn = container.querySelector('#currCalculateBtn');
  const resultVal = container.querySelector('#currResultValue');
  const rateText = container.querySelector('#currConversionRateText');
  const lastUpdate = container.querySelector('#currLastUpdate');

  // Fallback exchange rate cache in case user is offline
  const fallbackRates = {
    USD: { IDR: 16250, EUR: 0.92, SGD: 1.35, JPY: 155.4, MYR: 4.70, GBP: 0.79, AUD: 1.52, USD: 1 },
    IDR: { USD: 0.0000615, EUR: 0.0000566, SGD: 0.000083, JPY: 0.00956, MYR: 0.000289, GBP: 0.0000486, AUD: 0.0000935, IDR: 1 },
    EUR: { IDR: 17650, USD: 1.087, SGD: 1.46, JPY: 168.8, MYR: 5.11, GBP: 0.86, AUD: 1.65, EUR: 1 },
    SGD: { IDR: 12050, USD: 0.74, EUR: 0.68, JPY: 115.1, MYR: 3.48, GBP: 0.585, AUD: 1.125, SGD: 1 }
  };

  async function calculate() {
    const amt = parseFloat(amountEl.value) || 0;
    const from = fromEl.value;
    const to = toEl.value;

    if (from === to) {
      resultVal.textContent = `${formatCurrency(amt, to)}`;
      rateText.textContent = `1 ${from} = 1 ${to}`;
      return;
    }

    calcBtn.disabled = true;
    calcBtn.textContent = 'Menghitung...';

    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const data = await res.json();
      if (data && data.rates && data.rates[to]) {
        const rate = data.rates[to];
        const total = amt * rate;
        resultVal.textContent = formatCurrency(total, to);
        rateText.textContent = `Kurs Terkini: 1 ${from} = ${formatRate(rate, to)}`;
        lastUpdate.textContent = `Diperbarui langsung dari Open Exchange: ${new Date(data.time_last_update_utc).toLocaleDateString()}`;
      } else {
        throw new Error("Rate not found");
      }
    } catch (e) {
      // Offline fallback calculation
      let rate = 1;
      if (fallbackRates[from] && fallbackRates[from][to]) {
        rate = fallbackRates[from][to];
      } else {
        rate = 1;
      }
      const total = amt * rate;
      resultVal.textContent = formatCurrency(total, to);
      rateText.textContent = `Kurs Acuan (Offline Cache): 1 ${from} ≈ ${formatRate(rate, to)}`;
      lastUpdate.textContent = `Mode Offline/Cache Lokal`;
    } finally {
      calcBtn.disabled = false;
      calcBtn.innerHTML = `<i data-lucide="calculator" class="w-3.5 h-3.5"></i><span>Hitung Konversi</span>`;
      if (window.lucide) lucide.createIcons();
    }
  }

  function formatCurrency(val, cur) {
    if (cur === 'IDR') return `Rp ${Math.round(val).toLocaleString('id-ID')}`;
    if (cur === 'USD') return `$ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (cur === 'EUR') return `€ ${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (cur === 'JPY') return `¥ ${Math.round(val).toLocaleString('ja-JP')}`;
    return `${cur} ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function formatRate(val, cur) {
    if (cur === 'IDR' || cur === 'JPY') return Math.round(val).toLocaleString('id-ID');
    return val.toLocaleString('en-US', { maximumFractionDigits: 4 });
  }

  swapBtn.addEventListener('click', () => {
    const temp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = temp;
    calculate();
  });

  calcBtn.addEventListener('click', calculate);
  amountEl.addEventListener('input', calculate);
  fromEl.addEventListener('change', calculate);
  toEl.addEventListener('change', calculate);

  // Initial run
  calculate();
};
