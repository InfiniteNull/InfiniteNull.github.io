/**
 * streaming-calculator.js
 * Tool: Video Streaming Bitrate & Storage Calculator
 * Menghitung kebutuhan bitrate video/audio streaming (RTMP, HLS, RTSP) dan estimasi penyimpanan disk server media.
 */

window.renderStreamingCalculator = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="video" class="w-4 h-4 text-rose-500"></i>
          <span>Kalkulator Bitrate & Kapasitas Media Server (RTMP / HLS / RTSP)</span>
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Preset Kualitas Video</label>
            <select id="streamPresetSelect" class="w-full px-3 py-2 font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              <option value="480p">480p SD (854x480 @ 30fps) - 1.2 Mbps</option>
              <option value="720p">720p HD (1280x720 @ 30fps) - 2.5 Mbps</option>
              <option value="1080p" selected>1080p Full HD (1920x1080 @ 30fps) - 4.5 Mbps</option>
              <option value="1080p60">1080p60 High (1920x1080 @ 60fps) - 6.0 Mbps</option>
              <option value="4k">4K Ultra HD (3840x2160 @ 30fps) - 15.0 Mbps</option>
              <option value="custom">Kustom (Atur Manual)</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Video Bitrate (Kbps)</label>
            <input type="number" id="streamVideoBitrate" value="4500" class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Audio Bitrate (AAC/Opus)</label>
            <select id="streamAudioBitrate" class="w-full px-3 py-2 font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              <option value="64">64 Kbps (Voice/Speech)</option>
              <option value="128" selected>128 Kbps (Standard Audio)</option>
              <option value="192">192 Kbps (High Quality)</option>
              <option value="320">320 Kbps (Studio Quality)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Jumlah Concurrent Viewers (Penonton Bersamaan)</label>
            <input type="number" id="streamViewersInput" value="50" min="1" class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Durasi Streaming Harian (Jam)</label>
            <input type="number" id="streamDurationHours" value="4" min="0.5" step="0.5" class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
        </div>
      </div>

      <!-- Result Card -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="server" class="w-4 h-4 text-sky-500"></i>
            Estimasi Kebutuhan Infrastruktur Nginx / Media Server
          </span>
          <span id="resTotalBitrateBadge" class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
            4.63 Mbps per Stream
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <!-- Total Bandwidth Outgoing -->
          <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-400 text-[11px]">Kebutuhan Bandwidth Server Outgoing</span>
            <div id="resServerEgress" class="text-lg font-bold font-mono text-rose-600 dark:text-rose-400">231.5 Mbps</div>
            <p class="text-[10px] text-slate-500">Total egress bandwidth untuk 50 viewers live.</p>
          </div>

          <!-- Storage per Hour -->
          <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-400 text-[11px]">Penyimpanan Rekaman (Per Jam)</span>
            <div id="resStoragePerHour" class="text-lg font-bold font-mono text-sky-600 dark:text-sky-400">2.08 GB / jam</div>
            <p class="text-[10px] text-slate-500">Ukuran file video MP4/FLV per jam streaming.</p>
          </div>

          <!-- Monthly Storage / Bandwidth -->
          <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-400 text-[11px]">Estimasi Storage 30 Hari (VOD/DVR)</span>
            <div id="resStorageMonthly" class="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">249.6 GB / bulan</div>
            <p class="text-[10px] text-slate-500">Total disk jika semua rekaman disimpan 30 hari.</p>
          </div>
        </div>

        <!-- Protocol Technical Matrix -->
        <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span class="font-bold text-slate-500 text-[11px] uppercase tracking-wider">Karakteristik 4 Protokol Streaming Utama</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
            <div class="p-2.5 rounded bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
              <span class="font-bold text-sky-600 dark:text-sky-400 block">RTMP (Port 1935)</span>
              <span class="text-slate-400">Latency: 1-3 detik. Sangat cocok untuk ingest stream ke server (OBS Studio).</span>
            </div>
            <div class="p-2.5 rounded bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
              <span class="font-bold text-emerald-600 dark:text-emerald-400 block">HLS (HTTP Live Stream)</span>
              <span class="text-slate-400">Latency: 6-15 detik. Kompatibel 100% dengan browser web HTML5 (.m3u8 & .ts chunks).</span>
            </div>
            <div class="p-2.5 rounded bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
              <span class="font-bold text-amber-600 dark:text-amber-400 block">RTSP (Port 554)</span>
              <span class="text-slate-400">Latency: Ultra-low (<1 detik). Standar IP Camera & CCTV Surveillance.</span>
            </div>
            <div class="p-2.5 rounded bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
              <span class="font-bold text-purple-600 dark:text-purple-400 block">HTTP-FLV</span>
              <span class="text-slate-400">Latency: 1-2 detik. Streaming berbasis chunked HTTP untuk browser web tanpa plugin.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  function calculateStreaming() {
    const videoKbps = parseFloat(container.querySelector('#streamVideoBitrate').value) || 0;
    const audioKbps = parseFloat(container.querySelector('#streamAudioBitrate').value) || 128;
    const viewers = parseInt(container.querySelector('#streamViewersInput').value, 10) || 1;
    const hoursPerDay = parseFloat(container.querySelector('#streamDurationHours').value) || 1;

    const totalKbps = videoKbps + audioKbps;
    const totalMbps = totalKbps / 1000;
    const serverEgressMbps = totalMbps * viewers;

    const bytesPerSecond = (totalKbps * 1000) / 8;
    const gigabytesPerHour = (bytesPerSecond * 3600) / (1024 * 1024 * 1024);
    const monthlyStorageGb = gigabytesPerHour * hoursPerDay * 30;

    container.querySelector('#resTotalBitrateBadge').textContent = `${totalMbps.toFixed(2)} Mbps per Stream`;
    container.querySelector('#resServerEgress').textContent = `${serverEgressMbps.toFixed(1)} Mbps`;
    container.querySelector('#resStoragePerHour').textContent = `${gigabytesPerHour.toFixed(2)} GB / jam`;
    container.querySelector('#resStorageMonthly').textContent = `${monthlyStorageGb.toFixed(1)} GB / bulan`;
  }

  container.querySelector('#streamPresetSelect').addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === "480p") container.querySelector('#streamVideoBitrate').value = 1200;
    else if (val === "720p") container.querySelector('#streamVideoBitrate').value = 2500;
    else if (val === "1080p") container.querySelector('#streamVideoBitrate').value = 4500;
    else if (val === "1080p60") container.querySelector('#streamVideoBitrate').value = 6000;
    else if (val === "4k") container.querySelector('#streamVideoBitrate').value = 15000;
    calculateStreaming();
  });

  container.querySelector('#streamVideoBitrate').addEventListener('input', calculateStreaming);
  container.querySelector('#streamAudioBitrate').addEventListener('change', calculateStreaming);
  container.querySelector('#streamViewersInput').addEventListener('input', calculateStreaming);
  container.querySelector('#streamDurationHours').addEventListener('input', calculateStreaming);

  calculateStreaming();
};
