/**
 * markdown-preview.js
 * Tool: Markdown to HTML Live Preview Editor
 * Editor dokumen markdown interaktif dengan live rendering, konversi tabel, syntax code blocks, dan export HTML.
 */

window.renderMarkdownPreview = function(container) {
  const SAMPLE_MD = `# Laporan Hasil Audit Jaringan & Keamanan Sistem
**Auditor:** Rizki Ananda, S.Kom  
**Tanggal:** 04 September 2026

---

## 1. Ringkasan Temuan
Audit infrastruktur pada *Nginx Media Server* dan jaringan lokal menghasilkan beberapa rekomendasi utama:

* [x] Konfigurasi HTTP Security Headers (HSTS, CSP, X-Frame-Options)
* [x] Pembagian subnet IP via VLSM (/27 untuk Departemen IT)
* [ ] Implementasi failover link backup 100 Mbps

### Tabel Spesifikasi Port Layanan
| Protokol | Port | Status | Fungsi Utama |
|---|:---:|:---:|---|
| **SSH** | 22 | Open | Remote Management Server |
| **HTTPS** | 443 | Open | Enkripsi Web SSL/TLS |
| **RTMP** | 1935 | Open | Video Streaming Ingest |

> **Catatan Teknis:** Seluruh akses SSH harus dibatasi hanya dari IP internal terdaftar.

\`\`\`bash
# Perintah UFW Hardening
sudo ufw allow 443/tcp
sudo ufw allow 1935/tcp
sudo ufw enable
\`\`\`
`;

  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="file-code" class="w-4 h-4 text-emerald-600"></i>
            <span>Markdown Live Editor & HTML Generator</span>
          </h4>
          <div class="flex items-center gap-2">
            <button id="copyHtmlCodeBtn" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition shadow-sm">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Salin Hasil HTML</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Editor Pane -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <label class="font-bold text-slate-700 dark:text-slate-300">Markdown Editor (.md):</label>
              <span class="text-slate-400 font-mono text-[11px]" id="mdCharCount">0 Karakter</span>
            </div>
            <textarea id="mdSourceInput" rows="14" class="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"></textarea>
          </div>

          <!-- Preview Pane -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <label class="font-bold text-slate-700 dark:text-slate-300">Live HTML Preview:</label>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">Real-Time Render</span>
            </div>
            <div id="mdRenderedPreview" class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs overflow-y-auto max-h-[290px] prose dark:prose-invert max-w-none leading-relaxed space-y-3">
              <!-- Rendered by JS -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const mdInput = container.querySelector('#mdSourceInput');
  const previewDiv = container.querySelector('#mdRenderedPreview');
  const charCount = container.querySelector('#mdCharCount');

  // Lightweight Client-Side Markdown Parser
  function parseMarkdown(md) {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1.5">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2 pb-1 border-b border-slate-200 dark:border-slate-800">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-lg font-extrabold text-slate-900 dark:text-white mb-2">$1</h1>');

    // Blockquote
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="p-2.5 rounded border-l-4 border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-slate-700 dark:text-slate-300 italic text-[11px] my-2">$1</blockquote>');

    // Horizontal Rule
    html = html.replace(/^---$/gim, '<hr class="my-3 border-slate-200 dark:border-slate-800" />');

    // Checkboxes
    html = html.replace(/\* \[x\] (.*)/gim, '<div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium my-0.5"><span>☑</span> <span>$1</span></div>');
    html = html.replace(/\* \[ \] (.*)/gim, '<div class="flex items-center gap-1.5 text-slate-400 my-0.5"><span>☐</span> <span>$1</span></div>');

    // Code Blocks
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre class="bg-slate-900 text-slate-100 p-3 rounded font-mono text-[11px] overflow-x-auto my-2 border border-slate-800"><code>$2</code></pre>');

    // Inline Code
    html = html.replace(/`([^`]+)`/gim, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono text-[11px]">$1</code>');

    // Bold & Italic
    html = html.replace(/\*\*([^*]+)\*\*/gim, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
    html = html.replace(/\*([^*]+)\*/gim, '<em class="italic">$1</em>');

    // Tables
    const tableRegex = /\|(.+)\|[\r\n]+\|[-:| ]+\|[\r\n]+((?:\|.+\|[\r\n]*)+)/g;
    html = html.replace(tableRegex, function(match, header, rows) {
      const headers = header.split('|').map(h => h.trim()).filter(h => h.length > 0);
      const rowsArr = rows.trim().split('\n').map(r => r.split('|').map(c => c.trim()).filter(c => c.length > 0));

      let tbl = '<table class="w-full text-left text-[11px] border-collapse my-2 border border-slate-200 dark:border-slate-800">';
      tbl += '<thead class="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700"><tr>';
      headers.forEach(h => tbl += `<th class="p-2">${h}</th>`);
      tbl += '</tr></thead><tbody>';
      rowsArr.forEach(r => {
        tbl += '<tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">';
        r.forEach(c => tbl += `<td class="p-2">${c}</td>`);
        tbl += '</tr>';
      });
      tbl += '</tbody></table>';
      return tbl;
    });

    // Unordered lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');

    // Line breaks to paragraphs
    return html;
  }

  function render() {
    const raw = mdInput.value;
    charCount.textContent = `${raw.length.toLocaleString()} Karakter`;
    previewDiv.innerHTML = parseMarkdown(raw);
  }

  mdInput.addEventListener('input', render);

  container.querySelector('#copyHtmlCodeBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(previewDiv.innerHTML).then(() => {
      if (window.showToast) showToast("HTML berhasil disalin ke clipboard!", "success");
    });
  });

  mdInput.value = SAMPLE_MD;
  render();
};
