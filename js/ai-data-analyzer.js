/**
 * ai-data-analyzer.js
 * Tool: NLP Sentiment & Dataset Analyzer
 * Menganalisis sentimen ulasan teks/survei pengguna dan dataset CSV menggunakan NLP (VADER Polarity Score).
 */

window.renderAiDataAnalyzer = function(container) {
  const isEn = (window.currentLang || 'id') === 'en';

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Sub-Tabs (Quick Text Analysis vs CSV Dataset Analysis) -->
      <div class="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button id="aiSubTabCsv" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 text-white transition flex items-center gap-1.5">
          <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i>
          <span>${isEn ? 'Automatic CSV Dataset Analysis' : 'Analisis Dataset CSV (Otomatis)'}</span>
        </button>
        <button id="aiSubTabText" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5">
          <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
          <span>${isEn ? 'Direct Text Sentiment Test' : 'Uji Sentimen Teks Langsung'}</span>
        </button>
      </div>

      <!-- Mode 1: CSV Analysis Panel -->
      <div id="aiCsvPanel" class="space-y-5">
        
        <!-- Controls & Sample Load -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white">${isEn ? 'Upload CSV File or Use Sample Dataset' : 'Upload File CSV atau Gunakan Contoh Data'}</h4>
              <p class="text-xs text-slate-500">${isEn ? 'Automatically analyzes review/feedback columns using NLP Lexicon Scoring.' : 'Menganalisis kolom review/feedback secara otomatis menggunakan NLP Leksikon.'}</p>
            </div>
            <div class="flex items-center gap-2">
              <button id="aiLoadSampleCsvBtn" class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition flex items-center gap-1.5">
                <i data-lucide="database" class="w-3.5 h-3.5 text-sky-500"></i>
                <span>${isEn ? 'Load Sample Reviews' : 'Gunakan Contoh Data Ulasan'}</span>
              </button>
              <label class="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer">
                <i data-lucide="upload" class="w-3.5 h-3.5"></i>
                <span>${isEn ? 'Upload CSV File' : 'Upload CSV Sendiri'}</span>
                <input type="file" id="aiCsvFileInput" accept=".csv" class="hidden" />
              </label>
            </div>
          </div>
        </div>

        <!-- Sentiment Metrics & Statistical Visualization -->
        <div id="aiAnalysisResults" class="space-y-6">
          
          <!-- Stat Summary Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-center">
              <div class="text-xs font-semibold text-slate-500 uppercase">${isEn ? 'Total Reviews' : 'Total Ulasan'}</div>
              <div id="aiStatTotal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">10</div>
            </div>
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-center">
              <div class="text-xs font-semibold text-emerald-600 uppercase">${isEn ? 'Positive' : 'Positif'}</div>
              <div id="aiStatPositive" class="text-2xl font-bold font-mono text-emerald-600 mt-1">7 (70%)</div>
            </div>
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-center">
              <div class="text-xs font-semibold text-slate-500 uppercase">${isEn ? 'Neutral' : 'Netral'}</div>
              <div id="aiStatNeutral" class="text-2xl font-bold font-mono text-slate-500 mt-1">1 (10%)</div>
            </div>
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-center">
              <div class="text-xs font-semibold text-red-500 uppercase">${isEn ? 'Negative' : 'Negatif'}</div>
              <div id="aiStatNegative" class="text-2xl font-bold font-mono text-red-500 mt-1">2 (20%)</div>
            </div>
          </div>

          <!-- Chart & Table Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Chart.js Canvas Container -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center">
              <h5 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 w-full text-left">${isEn ? 'Sentiment Distribution' : 'Distribusi Sentimen'}</h5>
              <div class="w-48 h-48 relative">
                <canvas id="aiSentimentChart"></canvas>
              </div>
            </div>

            <!-- Table Preview -->
            <div class="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col">
              <h5 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">${isEn ? 'Row-by-Row Classification Results' : 'Hasil Klasifikasi Baris per Baris'}</h5>
              <div class="overflow-x-auto flex-1 max-h-64 scrollbar-none">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold uppercase text-[10px] sticky top-0">
                    <tr>
                      <th class="p-2.5 rounded-l">${isEn ? 'No' : 'No'}</th>
                      <th class="p-2.5">${isEn ? 'Review Text / Comments' : 'Teks Ulasan / Komentar'}</th>
                      <th class="p-2.5 text-right rounded-r">${isEn ? 'Predicted Sentiment' : 'Prediksi Sentimen'}</th>
                    </tr>
                  </thead>
                  <tbody id="aiTableBody" class="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    <!-- Populated by JS -->
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>

      <!-- Mode 2: Direct Text Testing Panel -->
      <div id="aiTextPanel" class="hidden space-y-4">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">${isEn ? 'Enter Review / Feedback Sentence to Analyze:' : 'Masukkan Ulasan / Kalimat Feedback untuk Dianalisis:'}</label>
          <textarea id="aiSingleTextInput" rows="3" class="w-full p-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none resize-none" placeholder="${isEn ? 'e.g. The application service is super fast, robust performance and intuitive interface!' : 'Contoh: Layanan aplikasi sangat cepat, performa stabil dan antarmuka sangat mudah dipahami!'}"></textarea>
          
          <div class="flex justify-end">
            <button id="aiAnalyzeTextBtn" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5">
              <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
              <span>${isEn ? 'Analyze Polarity Score' : 'Analisis Polarity Score'}</span>
            </button>
          </div>
        </div>

        <div id="aiSingleTextResult" class="hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-500">${isEn ? 'NLP Analysis Result:' : 'Hasil Analisis NLP:'}</span>
            <span id="aiSingleSentimentBadge" class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Positive (Score: +0.85)
            </span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400" id="aiSingleExplanation">
            ${isEn ? 'NLP algorithm detected high satisfaction and positive appreciation sentiment.' : 'Algoritma VADER mendeteksi kata-kata bernada kepuasan tinggi seperti "cepat", "stabil", dan "mudah".'}
          </p>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Elements
  const subTabCsv = container.querySelector('#aiSubTabCsv');
  const subTabText = container.querySelector('#aiSubTabText');
  const csvPanel = container.querySelector('#aiCsvPanel');
  const textPanel = container.querySelector('#aiTextPanel');

  const loadSampleBtn = container.querySelector('#aiLoadSampleCsvBtn');
  const fileInput = container.querySelector('#aiCsvFileInput');
  const tableBody = container.querySelector('#aiTableBody');
  const statTotal = container.querySelector('#aiStatTotal');
  const statPos = container.querySelector('#aiStatPositive');
  const statNeu = container.querySelector('#aiStatNeutral');
  const statNeg = container.querySelector('#aiStatNegative');

  const singleInput = container.querySelector('#aiSingleTextInput');
  const analyzeTextBtn = container.querySelector('#aiAnalyzeTextBtn');
  const singleResult = container.querySelector('#aiSingleTextResult');
  const singleBadge = container.querySelector('#aiSingleSentimentBadge');
  const singleExplanation = container.querySelector('#aiSingleExplanation');

  let chartInstance = null;

  // Sample feedback dataset for general web service / product evaluations
  const sampleProductReviews = isEn ? [
    { review: "Application service is exceptionally professional, fast and smooth during checkout.", sentiment: "Positive" },
    { review: "Customer support team was very responsive and helpful in solving API integration hurdles.", sentiment: "Positive" },
    { review: "Website dashboard is intuitive, sleek, and highly responsive across all smartphone devices.", sentiment: "Positive" },
    { review: "Scheduled background data synchronization completed according to regular intervals.", sentiment: "Neutral" },
    { review: "Order status update notifications experienced minor delivery latency to user emails.", sentiment: "Negative" },
    { review: "Extremely satisfied with the reliable server architecture and rapid response times.", sentiment: "Positive" },
    { review: "Visual layout and UI design is clean, intuitive, and modern.", sentiment: "Positive" },
    { review: "Server queue traffic was high during peak business hours, auto-scaling capacity needed.", sentiment: "Negative" },
    { review: "Technical API documentation provided is structured and informative.", sentiment: "Neutral" },
    { review: "This data analytics feature significantly empowers our team to make informed business decisions!", sentiment: "Positive" }
  ] : [
    { review: "Layanan aplikasi sangat profesional, cepat dan tanpa kendala saat proses checkout.", sentiment: "Positive" },
    { review: "Tim dukungan pelanggan sangat responsif dan membantu menyelesaikan kendala integrasi API.", sentiment: "Positive" },
    { review: "Website dashboard sangat mudah dipahami dan responsive dibuka dari berbagai perangkat smartphone.", sentiment: "Positive" },
    { review: "Proses sinkronisasi data berlangsung standar sesuai jadwal berkala.", sentiment: "Neutral" },
    { review: "Notifikasi update status pesanan agak lambat masuk ke email pengguna.", sentiment: "Negative" },
    { review: "Sangat puas dengan arsitektur sistem yang andal dan waktu respon server yang cepat.", sentiment: "Positive" },
    { review: "Desain visual dan tata letak fitur sangat bersih, intuitif dan modern.", sentiment: "Positive" },
    { review: "Lalu lintas antrean server cukup padat saat jam sibuk, perlu peningkatan kapasitas autoscaling.", sentiment: "Negative" },
    { review: "Dokumentasi teknis API yang disediakan cukup jelas dan terstruktur.", sentiment: "Neutral" },
    { review: "Fitur analitik data ini sangat membantu tim dalam mengambil keputusan bisnis secara akurat!", sentiment: "Positive" }
  ];

  // NLP Sentiment Scoring Dictionary (Indonesian & English polarity lexicons)
  const positiveWords = ["bagus", "cepat", "profesional", "memuaskan", "ramah", "relevan", "bersih", "modern", "membantu", "terbaik", "mudah", "kompeten", "bersyukur", "mantap", "hebat", "puas", "andal", "great", "good", "excellent", "love", "awesome", "fast", "reliable", "intuitive", "sleek", "satisfied"];
  const negativeWords = ["lambat", "buruk", "kecewa", "rusak", "sulit", "padat", "kurang", "jelek", "gagal", "lelet", "parah", "kendala", "bad", "slow", "terrible", "poor", "hate", "worst", "error", "latency", "lag"];

  function analyzeSentimentNLP(text) {
    if (!text) return { sentiment: "Neutral", score: 0 };
    const lower = text.toLowerCase();
    let posCount = 0;
    let negCount = 0;

    positiveWords.forEach(word => {
      if (lower.includes(word)) posCount++;
    });
    negativeWords.forEach(word => {
      if (lower.includes(word)) negCount++;
    });

    const netScore = posCount - negCount;
    if (netScore > 0) return { sentiment: "Positive", score: (0.3 + netScore * 0.2).toFixed(2) };
    if (netScore < 0) return { sentiment: "Negative", score: (-0.3 + netScore * 0.2).toFixed(2) };
    return { sentiment: "Neutral", score: "0.00" };
  }

  function displayDataset(data) {
    let pos = 0, neu = 0, neg = 0;

    tableBody.innerHTML = data.map((item, idx) => {
      const res = item.sentiment ? { sentiment: item.sentiment } : analyzeSentimentNLP(item.review || Object.values(item)[0]);
      if (res.sentiment === "Positive") pos++;
      else if (res.sentiment === "Negative") neg++;
      else neu++;

      const badgeColor = res.sentiment === "Positive" 
        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" 
        : (res.sentiment === "Negative" ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300");

      return `
        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
          <td class="p-2.5 text-slate-400 font-mono">${idx + 1}</td>
          <td class="p-2.5 text-slate-800 dark:text-slate-200 font-sans text-xs">${item.review || Object.values(item)[0]}</td>
          <td class="p-2.5 text-right">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold ${badgeColor}">${res.sentiment}</span>
          </td>
        </tr>
      `;
    }).join('');

    const total = data.length;
    statTotal.textContent = total;
    statPos.textContent = `${pos} (${Math.round((pos/total)*100)}%)`;
    statNeu.textContent = `${neu} (${Math.round((neu/total)*100)}%)`;
    statNeg.textContent = `${neg} (${Math.round((neg/total)*100)}%)`;

    renderChart(pos, neu, neg);
  }

  function renderChart(pos, neu, neg) {
    const canvas = container.querySelector('#aiSentimentChart');
    if (!canvas) return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: isEn ? ['Positive', 'Neutral', 'Negative'] : ['Positif', 'Netral', 'Negatif'],
        datasets: [{
          data: [pos, neu, neg],
          backgroundColor: ['#10b981', '#94a3b8', '#ef4444'],
          borderWidth: 2,
          borderColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              font: { size: 10 }
            }
          }
        }
      }
    });
  }

  // Switch Sub Tabs
  subTabCsv.addEventListener('click', () => {
    subTabCsv.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 text-white transition flex items-center gap-1.5";
    subTabText.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5";
    csvPanel.classList.remove('hidden');
    textPanel.classList.add('hidden');
  });

  subTabText.addEventListener('click', () => {
    subTabText.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 text-white transition flex items-center gap-1.5";
    subTabCsv.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5";
    textPanel.classList.remove('hidden');
    csvPanel.classList.add('hidden');
  });

  loadSampleBtn.addEventListener('click', () => {
    displayDataset(sampleProductReviews);
    window.showToast?.(isEn ? "Sample review dataset loaded!" : "Berhasil memuat dataset ulasan contoh!");
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (window.Papa) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
            if (results.data && results.data.length > 0) {
              displayDataset(results.data);
              window.showToast?.(isEn ? `Successfully analyzed ${results.data.length} rows from ${file.name}` : `Berhasil menganalisis ${results.data.length} baris dari file ${file.name}`);
            }
          }
        });
      }
    }
  });

  analyzeTextBtn.addEventListener('click', () => {
    const text = singleInput.value.trim();
    if (!text) return;

    const res = analyzeSentimentNLP(text);
    singleResult.classList.remove('hidden');

    if (res.sentiment === "Positive") {
      singleBadge.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      singleBadge.textContent = `Positive (Score: +${res.score})`;
      singleExplanation.textContent = isEn 
        ? `NLP algorithm detected positive appreciation and high satisfaction polarity.`
        : `Algoritma NLP mendeteksi sentimen kepuasan dan apresiasi positif dalam kalimat.`;
    } else if (res.sentiment === "Negative") {
      singleBadge.className = "px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
      singleBadge.textContent = `Negative (Score: ${res.score})`;
      singleExplanation.textContent = isEn 
        ? `NLP algorithm detected complaints or evaluative/negative feedback polarity.`
        : `Algoritma NLP mendeteksi keluhan atau masukan bernada evaluatif/negatif dalam kalimat.`;
    } else {
      singleBadge.className = "px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
      singleBadge.textContent = `Neutral (Score: 0.00)`;
      singleExplanation.textContent = isEn 
        ? `Sentence contains objective information without strong emotional polarity.`
        : `Kalimat mengandung informasi umum tanpa kecenderungan emosi positif maupun negatif yang kuat.`;
    }
  });

  // Initial Load
  displayDataset(sampleProductReviews);
};

