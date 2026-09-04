/**
 * library-sandbox.js
 * Tool: Library Management & Transaction Sandbox
 * Pengelolaan katalog buku, data anggota, dan transaksi peminjaman relasional (Atomicity Transaksi SQL).
 */

window.renderLibrarySandbox = function(container) {
  let books = JSON.parse(localStorage.getItem('lib_sandbox_books') || '[]');
  if (books.length === 0) {
    books = [
      { id: 1, title: "Clean Architecture & Design Patterns", author: "Robert C. Martin", copies: 3 },
      { id: 2, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", copies: 5 },
      { id: 3, title: "Python for Data Analysis & NLP", author: "Wes McKinney", copies: 1 },
      { id: 4, title: "Modern Fullstack JavaScript Development", author: "David Flanagan", copies: 2 }
    ];
    localStorage.setItem('lib_sandbox_books', JSON.stringify(books));
  }

  let loans = JSON.parse(localStorage.getItem('lib_sandbox_loans') || '[]');
  if (loans.length === 0) {
    loans = [
      { id: 101, bookTitle: "Python for Data Analysis & NLP", borrower: "Budi Santoso (Software Engineer)", date: "28/08/2026", status: "DIPINJAM" }
    ];
    localStorage.setItem('lib_sandbox_loans', JSON.stringify(loans));
  }

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Grid: Borrow Form & Live Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Borrow Form -->
        <div class="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <i data-lucide="book-open" class="w-4 h-4 text-sky-600"></i>
            <span>Transaksi Peminjaman Buku (POST /api/borrow)</span>
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pilih Buku</label>
              <select id="libBookSelect" class="w-full px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none">
                <!-- Populated by JS -->
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Peminjam</label>
              <input type="text" id="libBorrowerInput" placeholder="Nama Anggota / Rekan..." value="Ahmad Rizky (Engineering Team)" class="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
          </div>

          <div class="flex justify-end">
            <button id="libBorrowBtn" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
              <span>Proses Transaksi Peminjaman</span>
            </button>
          </div>
        </div>

        <!-- Quick Summary -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-center">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Kapasitas Perpustakaan</div>
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span class="text-xs text-slate-600 dark:text-slate-400">Total Judul Buku</span>
            <span id="libStatTitles" class="text-sm font-bold font-mono text-slate-900 dark:text-white">4 Judul</span>
          </div>
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span class="text-xs text-slate-600 dark:text-slate-400">Total Eksemplar</span>
            <span id="libStatCopies" class="text-sm font-bold font-mono text-emerald-600">11 Buku</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-600 dark:text-slate-400">Sedang Dipinjam</span>
            <span id="libStatLoans" class="text-sm font-bold font-mono text-amber-500">1 Buku</span>
          </div>
        </div>

      </div>

      <!-- Books Catalog & Active Borrowing Table -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Books Catalog -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Katalog Buku Tersedia (Tabel: books)</h4>
          <div class="overflow-x-auto max-h-64 scrollbar-none">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold uppercase text-[10px]">
                <tr>
                  <th class="p-2.5">Judul Buku & Penulis</th>
                  <th class="p-2.5 text-right">Stok</th>
                </tr>
              </thead>
              <tbody id="libBooksTableBody" class="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <!-- Populated by JS -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Borrowing History / Return -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Daftar Peminjaman Aktif (Tabel: borrowings)</h4>
          <div class="overflow-x-auto max-h-64 scrollbar-none">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold uppercase text-[10px]">
                <tr>
                  <th class="p-2.5">Buku & Peminjam</th>
                  <th class="p-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody id="libLoansTableBody" class="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <!-- Populated by JS -->
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const bookSelect = container.querySelector('#libBookSelect');
  const borrowerInput = container.querySelector('#libBorrowerInput');
  const borrowBtn = container.querySelector('#libBorrowBtn');
  const booksTableBody = container.querySelector('#libBooksTableBody');
  const loansTableBody = container.querySelector('#libLoansTableBody');

  const statTitles = container.querySelector('#libStatTitles');
  const statCopies = container.querySelector('#libStatCopies');
  const statLoans = container.querySelector('#libStatLoans');

  function renderView() {
    // Render Select options
    bookSelect.innerHTML = books.map(b => `
      <option value="${b.id}" ${b.copies <= 0 ? 'disabled' : ''}>
        ${b.title} (${b.copies > 0 ? `Tersedia: ${b.copies}` : 'HABIS'})
      </option>
    `).join('');

    // Render Books Table
    booksTableBody.innerHTML = books.map(b => `
      <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
        <td class="p-2.5 font-sans">
          <div class="font-semibold text-slate-800 dark:text-slate-200 text-xs">${b.title}</div>
          <div class="text-[11px] text-slate-400">Penulis: ${b.author}</div>
        </td>
        <td class="p-2.5 text-right">
          <span class="px-2 py-0.5 rounded text-[11px] font-bold ${b.copies > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'}">
            ${b.copies} Sisa
          </span>
        </td>
      </tr>
    `).join('');

    // Render Loans Table
    if (loans.length === 0) {
      loansTableBody.innerHTML = `<tr><td colspan="2" class="p-4 text-center text-slate-400 font-sans text-xs">Tidak ada buku yang sedang dipinjam.</td></tr>`;
    } else {
      loansTableBody.innerHTML = loans.map(loan => `
        <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
          <td class="p-2.5 font-sans">
            <div class="font-semibold text-slate-800 dark:text-slate-200 text-xs">${loan.bookTitle}</div>
            <div class="text-[11px] text-slate-400">Peminjam: ${loan.borrower} • ${loan.date}</div>
          </td>
          <td class="p-2.5 text-right">
            <button class="lib-return-btn px-2.5 py-1 rounded bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-800 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 text-[11px] font-semibold transition" data-id="${loan.id}" data-title="${loan.bookTitle}">
              Kembalikan
            </button>
          </td>
        </tr>
      `).join('');
    }

    // Update Stats
    statTitles.textContent = `${books.length} Judul`;
    const totalAvailable = books.reduce((acc, curr) => acc + curr.copies, 0);
    statCopies.textContent = `${totalAvailable} Buku`;
    statLoans.textContent = `${loans.length} Buku`;

    // Attach return handlers
    container.querySelectorAll('.lib-return-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const loanId = parseInt(btn.dataset.id);
        const bookTitle = btn.dataset.title;

        // Transaction: Return book
        loans = loans.filter(l => l.id !== loanId);
        const targetBook = books.find(b => b.title === bookTitle);
        if (targetBook) {
          targetBook.copies++;
        }
        saveAndRender();
        window.showToast?.(`Buku "${bookTitle}" berhasil dikembalikan ke stok!`);
      });
    });
  }

  function saveAndRender() {
    localStorage.setItem('lib_sandbox_books', JSON.stringify(books));
    localStorage.setItem('lib_sandbox_loans', JSON.stringify(loans));
    renderView();
  }

  borrowBtn.addEventListener('click', () => {
    const bookId = parseInt(bookSelect.value);
    const borrower = borrowerInput.value.trim();

    if (!borrower) {
      alert("Harap isi nama peminjam!");
      return;
    }

    const targetBook = books.find(b => b.id === bookId);
    if (!targetBook || targetBook.copies <= 0) {
      alert("Maaf, stok buku ini sedang habis!");
      return;
    }

    // Atomicity Transaction: Decrement copy and record loan
    targetBook.copies--;
    loans.unshift({
      id: Date.now(),
      bookTitle: targetBook.title,
      borrower: borrower,
      date: new Date().toLocaleDateString('id-ID'),
      status: "DIPINJAM"
    });

    saveAndRender();
    window.showToast?.(`Sukses! Buku "${targetBook.title}" berhasil dipinjam oleh ${borrower}.`);
  });

  // Initial render
  renderView();
};
