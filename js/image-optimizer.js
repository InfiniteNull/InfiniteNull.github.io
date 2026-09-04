/**
 * image-optimizer.js
 * Tool: Image Compressor, Resizer & Converter
 * Mengompresi dan mengonversi format gambar (WebP/JPEG/PNG) langsung di browser (Canvas API / Sharp Backend logic).
 */

window.renderImageOptimizer = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Upload Dropzone -->
      <div id="imgDropzone" class="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 rounded-xl p-6 text-center cursor-pointer bg-white dark:bg-slate-900 transition">
        <input type="file" id="imgFileInput" accept="image/png, image/jpeg, image/webp" class="hidden" />
        <div class="flex flex-col items-center justify-center gap-2">
          <div class="w-12 h-12 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
            <i data-lucide="image-up" class="w-6 h-6"></i>
          </div>
          <p class="text-xs font-bold text-slate-800 dark:text-slate-200">
            Klik atau Tarik File Gambar ke Sini (PNG, JPG, WebP)
          </p>
          <p class="text-[11px] text-slate-400">Ukuran maksimal file: 10 MB</p>
        </div>
      </div>

      <!-- Controls & Settings (Hidden until image selected) -->
      <div id="imgSettingsCard" class="hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pengaturan Optimasi</h4>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Format Output -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Format Output</label>
            <select id="imgFormatSelect" class="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none">
              <option value="image/webp" selected>WebP (Paling Hemat Ukuran)</option>
              <option value="image/jpeg">JPEG / JPG</option>
              <option value="image/png">PNG</option>
            </select>
          </div>

          <!-- Quality Slider -->
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Kualitas Kompresi</label>
              <span id="imgQualityVal" class="text-xs font-mono font-bold text-sky-600">80%</span>
            </div>
            <input type="range" id="imgQualitySlider" min="10" max="100" value="80" class="w-full accent-sky-600" />
          </div>

          <!-- Max Width (Resize) -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Maksimal Lebar (px)</label>
            <input type="number" id="imgMaxWidthInput" placeholder="Auto (Asli)" class="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none font-mono" />
          </div>
        </div>

        <div class="pt-2 flex justify-end">
          <button id="imgProcessBtn" class="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5">
            <i data-lucide="zap" class="w-3.5 h-3.5"></i>
            <span>Proses Optimasi Gambar</span>
          </button>
        </div>
      </div>

      <!-- Preview Comparison Card -->
      <div id="imgResultCard" class="hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded text-xs font-bold font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" id="imgSavingsBadge">
              Hemat 65%
            </span>
            <span class="text-xs text-slate-500" id="imgDimensionsBadge">1920x1080 -> 1200x675</span>
          </div>
          <a id="imgDownloadBtn" download="optimized-image.webp" class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Download Gambar</span>
          </a>
        </div>

        <!-- Comparison Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <div class="text-xs font-semibold text-slate-500">Sebelum (Asli): <strong id="imgOriginalSize" class="text-slate-800 dark:text-slate-200 font-mono">-</strong></div>
            <div class="h-44 flex items-center justify-center overflow-hidden rounded bg-slate-200 dark:bg-slate-800">
              <img id="imgOriginalPreview" class="max-h-full max-w-full object-contain" />
            </div>
          </div>

          <div class="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <div class="text-xs font-semibold text-emerald-600">Setelah Optimasi: <strong id="imgOptimizedSize" class="font-mono">-</strong></div>
            <div class="h-44 flex items-center justify-center overflow-hidden rounded bg-slate-200 dark:bg-slate-800">
              <img id="imgOptimizedPreview" class="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const dropzone = container.querySelector('#imgDropzone');
  const fileInput = container.querySelector('#imgFileInput');
  const settingsCard = container.querySelector('#imgSettingsCard');
  const resultCard = container.querySelector('#imgResultCard');
  const qualitySlider = container.querySelector('#imgQualitySlider');
  const qualityVal = container.querySelector('#imgQualityVal');
  const formatSelect = container.querySelector('#imgFormatSelect');
  const maxWidthInput = container.querySelector('#imgMaxWidthInput');
  const processBtn = container.querySelector('#imgProcessBtn');
  const downloadBtn = container.querySelector('#imgDownloadBtn');

  const origPreview = container.querySelector('#imgOriginalPreview');
  const optPreview = container.querySelector('#imgOptimizedPreview');
  const origSizeEl = container.querySelector('#imgOriginalSize');
  const optSizeEl = container.querySelector('#imgOptimizedSize');
  const savingsBadge = container.querySelector('#imgSavingsBadge');
  const dimensionsBadge = container.querySelector('#imgDimensionsBadge');

  let currentFile = null;
  let currentImageBitmap = null;

  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('border-sky-500', 'bg-sky-50', 'dark:bg-sky-950/30');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('border-sky-500', 'bg-sky-50', 'dark:bg-sky-950/30');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('border-sky-500', 'bg-sky-50', 'dark:bg-sky-950/30');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  });

  qualitySlider.addEventListener('input', () => {
    qualityVal.textContent = `${qualitySlider.value}%`;
  });

  function handleFileSelected(file) {
    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar!');
      return;
    }
    currentFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      origPreview.src = e.target.result;
      origSizeEl.textContent = formatBytes(file.size);
      
      const img = new Image();
      img.onload = () => {
        currentImageBitmap = img;
        maxWidthInput.value = img.width > 1200 ? 1200 : img.width;
        settingsCard.classList.remove('hidden');
        processImage();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  processBtn.addEventListener('click', processImage);

  function processImage() {
    if (!currentImageBitmap) return;

    processBtn.disabled = true;
    processBtn.textContent = 'Memproses...';

    setTimeout(() => {
      const format = formatSelect.value;
      const quality = parseInt(qualitySlider.value) / 100;
      let targetWidth = parseInt(maxWidthInput.value) || currentImageBitmap.width;
      
      // Calculate aspect ratio
      const scale = targetWidth < currentImageBitmap.width ? targetWidth / currentImageBitmap.width : 1;
      const finalWidth = Math.round(currentImageBitmap.width * scale);
      const finalHeight = Math.round(currentImageBitmap.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(currentImageBitmap, 0, 0, finalWidth, finalHeight);

      canvas.toBlob((blob) => {
        const optUrl = URL.createObjectURL(blob);
        optPreview.src = optUrl;
        optSizeEl.textContent = formatBytes(blob.size);

        const savings = Math.max(0, Math.round(((currentFile.size - blob.size) / currentFile.size) * 100));
        savingsBadge.textContent = `Hemat ${savings}% (${formatBytes(currentFile.size - blob.size)})`;
        dimensionsBadge.textContent = `${currentImageBitmap.width}x${currentImageBitmap.height} → ${finalWidth}x${finalHeight}`;

        const ext = format === 'image/webp' ? 'webp' : (format === 'image/png' ? 'png' : 'jpg');
        downloadBtn.href = optUrl;
        downloadBtn.download = `optimized-${currentFile.name.split('.')[0]}.${ext}`;

        resultCard.classList.remove('hidden');
        processBtn.disabled = false;
        processBtn.innerHTML = `<i data-lucide="zap" class="w-3.5 h-3.5"></i><span>Proses Optimasi Gambar</span>`;
        if (window.lucide) lucide.createIcons();
      }, format, quality);
    }, 100);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};
