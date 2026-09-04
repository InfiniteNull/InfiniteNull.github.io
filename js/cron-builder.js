/**
 * cron-builder.js
 * Tool: Cron Task Scheduler Builder
 * Visualizer & generator ekspresi Cron Linux untuk otomasi backup database, maintenance server, dan script periodik.
 */

window.renderCronBuilder = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="clock" class="w-4 h-4 text-emerald-600"></i>
          <span>Generator & Visualizer Jadwal Cron Job Linux</span>
        </h4>

        <!-- Preset Quick Selector -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Pilih Template Jadwal Umum:</label>
          <div class="flex flex-wrap gap-2 text-xs">
            <button class="cron-preset-btn px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 transition font-medium" data-cron="0 * * * *">Tiap Jam (Menit 00)</button>
            <button class="cron-preset-btn px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 transition font-medium" data-cron="0 2 * * *">Tiap Hari Jam 02:00 (Auto-Backup)</button>
            <button class="cron-preset-btn px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 transition font-medium" data-cron="*/15 * * * *">Tiap 15 Menit</button>
            <button class="cron-preset-btn px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 transition font-medium" data-cron="0 0 * * 0">Tiap Minggu Tengah Malam</button>
            <button class="cron-preset-btn px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 transition font-medium" data-cron="0 0 1 * *">Tiap Tanggal 1 Tiap Bulan</button>
          </div>
        </div>

        <!-- 5 Field Controls -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs pt-2">
          <div>
            <label class="font-bold text-slate-700 dark:text-slate-300 block mb-1">Menit (0-59)</label>
            <input type="text" id="cronMinute" value="0" class="w-full px-2.5 py-2 font-mono text-center rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label class="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jam (0-23)</label>
            <input type="text" id="cronHour" value="2" class="w-full px-2.5 py-2 font-mono text-center rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label class="font-bold text-slate-700 dark:text-slate-300 block mb-1">Hari/Bulan (1-31)</label>
            <input type="text" id="cronDayOfMonth" value="*" class="w-full px-2.5 py-2 font-mono text-center rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label class="font-bold text-slate-700 dark:text-slate-300 block mb-1">Bulan (1-12)</label>
            <input type="text" id="cronMonth" value="*" class="w-full px-2.5 py-2 font-mono text-center rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label class="font-bold text-slate-700 dark:text-slate-300 block mb-1">Hari/Minggu (0-6)</label>
            <input type="text" id="cronDayOfWeek" value="*" class="w-full px-2.5 py-2 font-mono text-center rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Command / Script Bash yang Dijalankan:</label>
          <input type="text" id="cronCommandInput" value="/usr/local/bin/backup_db.sh >> /var/log/backup.log 2>&1" class="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
      </div>

      <!-- Result Card -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="check" class="w-4 h-4 text-emerald-500"></i>
            Baris Crontab Siap Pakai
          </span>
          <button id="copyCrontabBtn" class="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            <span>Salin Baris Crontab</span>
          </button>
        </div>

        <div class="p-4 rounded-xl bg-slate-950 text-white space-y-2 border border-slate-800">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono text-slate-400 uppercase">Ekspresi 5-Field:</span>
            <span id="cronHumanExplanation" class="text-xs font-medium text-emerald-400">Setiap hari pada pukul 02:00</span>
          </div>
          <pre id="crontabFullLine" class="text-sm font-mono text-amber-300 overflow-x-auto py-1">0 2 * * * /usr/local/bin/backup_db.sh >> /var/log/backup.log 2>&1</pre>
        </div>

        <!-- Next 5 Scheduled Executions Simulation -->
        <div class="space-y-2">
          <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Simulasi 5 Jadwal Eksekusi Mendatang:</span>
          <div id="cronTimeline" class="space-y-1 text-xs font-mono">
            <!-- Populated by JS -->
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  function updateCron() {
    const min = container.querySelector('#cronMinute').value.trim() || "*";
    const hour = container.querySelector('#cronHour').value.trim() || "*";
    const dom = container.querySelector('#cronDayOfMonth').value.trim() || "*";
    const month = container.querySelector('#cronMonth').value.trim() || "*";
    const dow = container.querySelector('#cronDayOfWeek').value.trim() || "*";
    const cmd = container.querySelector('#cronCommandInput').value.trim() || "/path/to/script.sh";

    const cronExpr = `${min} ${hour} ${dom} ${month} ${dow}`;
    const fullLine = `${cronExpr} ${cmd}`;
    container.querySelector('#crontabFullLine').textContent = fullLine;

    // Human Explanation generator
    let exp = "Berjalan ";
    if (cronExpr === "* * * * *") exp = "Setiap menit tanpa henti";
    else if (cronExpr === "0 * * * *") exp = "Setiap jam pada menit ke-00";
    else if (cronExpr === "*/15 * * * *") exp = "Setiap 15 menit sekali";
    else if (cronExpr === "*/30 * * * *") exp = "Setiap 30 menit sekali";
    else if (cronExpr === "0 0 * * *") exp = "Setiap hari pada tengah malam (00:00)";
    else if (min === "0" && hour !== "*" && dom === "*" && month === "*" && dow === "*") exp = `Setiap hari pada pukul ${hour.padStart(2, '0')}:00`;
    else if (min !== "*" && hour !== "*" && dom === "*" && month === "*" && dow === "*") exp = `Setiap hari pada pukul ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
    else if (dow === "0" || dow === "7") exp = `Setiap hari Minggu pukul ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
    else exp = `Sesuai pola: Menit(${min}) Jam(${hour}) Tgl(${dom}) Bln(${month}) Hari(${dow})`;

    container.querySelector('#cronHumanExplanation').textContent = exp;

    // Simulated Next 5 Runs
    const timeline = container.querySelector('#cronTimeline');
    timeline.innerHTML = "";
    const now = new Date();
    for (let i = 1; i <= 5; i++) {
      const nextDate = new Date(now.getTime() + i * 24 * 3600 * 1000);
      if (hour !== "*") nextDate.setHours(parseInt(hour, 10) || 0);
      if (min !== "*") nextDate.setMinutes(parseInt(min, 10) || 0);
      nextDate.setSeconds(0);

      const div = document.createElement('div');
      div.className = "flex items-center gap-2 p-2 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300";
      div.innerHTML = `
        <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0">${i}</span>
        <span>${nextDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })} • Pukul ${nextDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
      `;
      timeline.appendChild(div);
    }
  }

  ['#cronMinute', '#cronHour', '#cronDayOfMonth', '#cronMonth', '#cronDayOfWeek', '#cronCommandInput'].forEach(sel => {
    container.querySelector(sel).addEventListener('input', updateCron);
  });

  container.querySelectorAll('.cron-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parts = btn.dataset.cron.split(' ');
      container.querySelector('#cronMinute').value = parts[0];
      container.querySelector('#cronHour').value = parts[1];
      container.querySelector('#cronDayOfMonth').value = parts[2];
      container.querySelector('#cronMonth').value = parts[3];
      container.querySelector('#cronDayOfWeek').value = parts[4];
      updateCron();
    });
  });

  container.querySelector('#copyCrontabBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(container.querySelector('#crontabFullLine').textContent).then(() => {
      if (window.showToast) showToast("Crontab berhasil disalin!", "success");
    });
  });

  updateCron();
};
