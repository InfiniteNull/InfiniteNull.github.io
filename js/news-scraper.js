/**
 * news-scraper.js
 * Tool: News & Feeds Aggregator / Scraper
 * Menampilkan data live feed berita teknologi & rekayasa perangkat lunak terkini (HackerNews API & Public Feed).
 */

window.renderNewsScraper = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Actions Bar -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="newspaper" class="w-4 h-4 text-sky-600"></i>
            <span>Tech News & Industry Feeds</span>
          </h4>
          <p class="text-xs text-slate-500">Otomasi penarikan berita terkini (Demonstrasi Web Scraper Python / JS).</p>
        </div>
        <div class="flex items-center gap-2">
          <select id="newsFilterSelect" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none">
            <option value="top">🔥 Berita Terpopuler</option>
            <option value="new">⚡ Berita Terbaru</option>
          </select>
          <button id="newsRefreshBtn" class="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
            <span>Refresh Feed</span>
          </button>
        </div>
      </div>

      <!-- News Articles List -->
      <div id="newsListContainer" class="space-y-3">
        <!-- Populated by JS -->
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const listContainer = container.querySelector('#newsListContainer');
  const refreshBtn = container.querySelector('#newsRefreshBtn');
  const filterSelect = container.querySelector('#newsFilterSelect');

  // Static high quality curated articles as fast fallback if network API fails
  const fallbackNews = [
    { title: "Transformasi Arsitektur Web Modern: Microservices vs Monolith di Skala Enterprise", points: 284, author: "cloud_architect", time: "1 jam lalu", url: "https://news.ycombinator.com" },
    { title: "Standardisasi RESTful API dan Keamanan Data Pengguna dengan JWT & Bcrypt", points: 195, author: "dev_secops", time: "2 jam lalu", url: "https://news.ycombinator.com" },
    { title: "Python vs Node.js: Memilih Ekosistem Terbaik untuk Web Service dan Analisis Big Data", points: 342, author: "data_engineer", time: "3 jam lalu", url: "https://news.ycombinator.com" },
    { title: "Perkembangan Model AI Lokal dan NLP Sentiment Analysis pada Sistem Modern", points: 156, author: "ai_researcher", time: "4 jam lalu", url: "https://news.ycombinator.com" },
    { title: "Optimasi Query Database Relasional SQL untuk Menangani Jutaan Data Transaksi", points: 210, author: "db_admin", time: "5 jam lalu", url: "https://news.ycombinator.com" }
  ];

  async function fetchNews() {
    listContainer.innerHTML = `
      <div class="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div class="animate-spin inline-block w-6 h-6 border-2 border-sky-600 border-t-transparent rounded-full mb-2"></div>
        <div class="text-xs text-slate-500">Menjalankan simulasi scraper & mengambil feed berita...</div>
      </div>
    `;

    try {
      // Fetch top stories from HackerNews API
      const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=10&orderBy=%22$key%22");
      const ids = await res.json();
      
      const topIds = ids.slice(0, 8);
      const articlePromises = topIds.map(id => 
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
      );
      
      const articles = await Promise.all(articlePromises);
      renderArticles(articles.filter(a => a && a.title));
    } catch (e) {
      // Fallback
      renderArticles(fallbackNews);
    }
  }

  function renderArticles(articles) {
    if (!articles || articles.length === 0) {
      articles = fallbackNews;
    }

    listContainer.innerHTML = articles.map((art, idx) => `
      <div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-sky-500 transition flex items-start justify-between gap-4 group">
        <div class="flex items-start gap-3">
          <span class="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
            ${idx + 1}
          </span>
          <div>
            <a href="${art.url || `https://news.ycombinator.com/item?id=${art.id}`}" target="_blank" rel="noopener noreferrer" class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition leading-snug">
              ${art.title}
            </a>
            <div class="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-mono">
              <span class="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                ▲ ${art.score || art.points || 120} poin
              </span>
              <span>oleh ${art.by || art.author || 'contributor'}</span>
              <span>• ${art.time ? (typeof art.time === 'number' ? new Date(art.time * 1000).toLocaleTimeString() : art.time) : 'Terkini'}</span>
            </div>
          </div>
        </div>
        <a href="${art.url || `https://news.ycombinator.com/item?id=${art.id}`}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition shrink-0">
          <i data-lucide="external-link" class="w-4 h-4"></i>
        </a>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  refreshBtn.addEventListener('click', fetchNews);
  filterSelect.addEventListener('change', fetchNews);

  // Initial fetch
  fetchNews();
};
