/**
 * simrs-laravel-suite.js - Interactive Enterprise Hospital Management Information System (SIMRS)
 * Standalone Simulation Suite for PT Abna / RS Layanan (13 Modules Syllabus)
 * Powered by Laravel 11 Clean MVC & Service Architecture
 */

(function () {
  // In-memory SIMRS Database
  const SIMRS_DB = {
    dokters: [
      { id: 1, nip: 'DR-19850112-001', nama: 'dr. Hendra Wijaya, Sp.PD', spesialisasi: 'Spesialis Penyakit Dalam', poli: 'Poli Penyakit Dalam', kuota: 30, terpakai: 18, jadwal: 'Senin - Kamis (08:00 - 13:00)' },
      { id: 2, nip: 'DR-19880422-002', nama: 'dr. Siti Rahmawati, Sp.A', spesialisasi: 'Spesialis Anak', poli: 'Poli Anak', kuota: 35, terpakai: 22, jadwal: 'Senin - Sabtu (09:00 - 14:00)' },
      { id: 3, nip: 'DR-19791105-003', nama: 'dr. Budi Santoso, Sp.B', spesialisasi: 'Spesialis Bedah Umum', poli: 'Poli Bedah', kuota: 20, terpakai: 14, jadwal: 'Selasa & Kamis (10:00 - 15:00)' },
      { id: 4, nip: 'DR-19820719-004', nama: 'dr. Maya Kusuma, Sp.JP', spesialisasi: 'Spesialis Jantung & Pembuluh Darah', poli: 'Poli Jantung', kuota: 25, terpakai: 19, jadwal: 'Senin, Rabu, Jumat (08:30 - 12:30)' },
      { id: 5, nip: 'DR-19901015-005', nama: 'dr. Ahmad Fauzi, Sp.M', spesialisasi: 'Spesialis Mata', poli: 'Poli Mata', kuota: 30, terpakai: 12, jadwal: 'Senin - Jumat (08:00 - 12:00)' },
      { id: 6, nip: 'DR-19860308-006', nama: 'dr. Anita Larasati, Sp.S', spesialisasi: 'Spesialis Saraf', poli: 'Poli Saraf', kuota: 25, terpakai: 15, jadwal: 'Rabu & Jumat (09:00 - 13:00)' }
    ],
    kamars: [
      { kode: 'VVIP-01', bangsal: 'Paviliun Garuda (VVIP)', kelas: 'vvip', totalTT: 5, terisiTT: 4, tarif: 1500000 },
      { kode: 'VIP-01', bangsal: 'Paviliun Cenderawasih (VIP)', kelas: 'vip', totalTT: 15, terisiTT: 12, tarif: 950000 },
      { kode: 'K1-01', bangsal: 'Bangsal Melati (Kelas 1)', kelas: 'kelas_1', totalTT: 25, terisiTT: 20, tarif: 500000 },
      { kode: 'K2-01', bangsal: 'Bangsal Mawar (Kelas 2)', kelas: 'kelas_2', totalTT: 30, terisiTT: 23, tarif: 300000 },
      { kode: 'K3-01', bangsal: 'Bangsal Anggrek (Kelas 3)', kelas: 'kelas_3', totalTT: 40, terisiTT: 31, tarif: 150000 },
      { kode: 'ICU-01', bangsal: 'Unit Perawatan Intensif (ICU)', kelas: 'icu', totalTT: 10, terisiTT: 7, tarif: 2000000 }
    ],
    pksList: [
      { id: 1, nomor: 'PKS/BPJS-KTR/2025/001', mitra: 'BPJS Kesehatan KC Utama', jenis: 'bpjs', mulai: '2025-01-01', akhir: '2026-12-31', pic: 'dr. Farida Hanum, M.Kes', kontak: '0811-9988-7766', status: 'aktif', layanan: ['Rawat Inap', 'Rawat Jalan', 'IGD 24 Jam', 'Farmasi Kronis'] },
      { id: 2, nomor: 'PKS/ALLIANZ-MED/2025/089', mitra: 'PT Asuransi Allianz Life Indonesia', jenis: 'swasta', mulai: '2025-04-15', akhir: '2026-10-15', pic: 'Kevin Tan, AAIJ', kontak: '0812-3456-7890', status: 'aktif', layanan: ['Cashless Rawat Inap', 'Executive MCU', 'Operasi Bedah'] },
      { id: 3, nomor: 'PKS/PRU-HOSP/2024/045', mitra: 'PT Prudential Life Assurance', jenis: 'swasta', mulai: '2024-09-01', akhir: '2026-09-01', pic: 'Clara Novita, S.E.', kontak: '0813-8877-6655', status: 'evaluasi', layanan: ['Rawat Inap VIP', 'Rawat Jalan Lanjutan'] },
      { id: 4, nomor: 'PKS/SINARMAS-MSIG/2025/112', mitra: 'PT Asuransi Sinarmas', jenis: 'swasta', mulai: '2025-06-01', akhir: '2027-06-01', pic: 'Ahmad Fauzi', kontak: '0852-1122-3344', status: 'aktif', layanan: ['Semua Layanan Rawat & MCU'] },
      { id: 5, nomor: 'PKS/BPJS-TK/2025/022', mitra: 'BPJS Ketenagakerjaan (Jaminan Kecelakaan Kerja)', jenis: 'bpjs', mulai: '2025-02-01', akhir: '2026-09-28', pic: 'Bambang Irawan', kontak: '0812-9900-1122', status: 'aktif', layanan: ['Trauma Center IGD', 'Rehabilitasi Medis'] }
    ],
    pasiens: [
      { noRm: 'RM-202609-0001', nik: '1271012304950001', nama: 'Bambang Sudarmono', jk: 'L', tglLahir: '1995-04-23', hp: '081265438899', alamat: 'Jl. Gatot Subroto No. 45, Medan', goldar: 'O' },
      { noRm: 'RM-202609-0002', nik: '1271025508980003', nama: 'Siti Nurhaliza', jk: 'P', tglLahir: '1998-08-15', hp: '085277889900', alamat: 'Jl. Setia Budi No. 12B, Medan', goldar: 'A' },
      { noRm: 'RM-202609-0003', nik: '1271031102920005', nama: 'Rudi Hermawan', jk: 'L', tglLahir: '1992-02-11', hp: '082166554433', alamat: 'Jl. Iskandar Muda No. 88, Medan', goldar: 'B' }
    ],
    antreans: [
      { id: 1, nomorAntrean: 'P-001', kodeBooking: 'BK-20260905-01', noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', dokter: 'dr. Hendra Wijaya, Sp.PD', poli: 'Poli Penyakit Dalam', tgl: '2026-09-05', jenis: 'rawat_jalan', bayar: 'BPJS Kesehatan', status: 'selesai' },
      { id: 2, nomorAntrean: 'A-001', kodeBooking: 'BK-20260905-02', noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', dokter: 'dr. Siti Rahmawati, Sp.A', poli: 'Poli Anak', tgl: '2026-09-05', jenis: 'rawat_jalan', bayar: 'Umum / Mandiri', status: 'sedang_dilayani' },
      { id: 3, nomorAntrean: 'B-001', kodeBooking: 'BK-20260905-03', noRm: 'RM-202609-0003', nama: 'Rudi Hermawan', dokter: 'dr. Budi Santoso, Sp.B', poli: 'Poli Bedah', tgl: '2026-09-05', jenis: 'rawat_jalan', bayar: 'Allianz Life', status: 'menunggu' }
    ],
    rekamMedisList: [
      {
        id: 1,
        noRm: 'RM-202609-0001',
        nama: 'Bambang Sudarmono',
        dokter: 'dr. Hendra Wijaya, Sp.PD',
        tglPeriksa: '2026-09-05',
        s: 'Kepala pusing berputar sejak 3 hari yang lalu, tengkuk terasa kaku dan tegang setelah lembur kerja.',
        o: 'TD: 150/95 mmHg | Nadi: 84 x/mnt | Suhu: 36.6 °C | RR: 20 x/mnt | BB: 74 kg | TB: 168 cm | SpO2: 99%',
        a_icd10: 'I10',
        a_diagnosis: 'Essential (primary) hypertension',
        p_tindakan: 'Pemeriksaan EKG dasar, Konseling Diet Rendah Garam (DASH Diet)',
        p_resep: '1. Amlodipine 10 mg tab No. XXX (1x1 pagi pc)\n2. Candesartan 8 mg tab No. XXX (1x1 malam pc)\n3. Paracetamol 500 mg tab No. X (3x1 prn sakit kepala)',
        p_edukasi: 'Batasi konsumsi garam dapur < 1 sdt/hari, kurangi kopi, rutin olahraga aerobik 30 menit.',
        tglKontrol: '2026-10-05'
      }
    ],
    icd10Database: [
      { code: 'I10', name: 'Essential (primary) hypertension' },
      { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications' },
      { code: 'J06.9', name: 'Acute upper respiratory infection, unspecified (ISPA)' },
      { code: 'K29.7', name: 'Gastritis, unspecified' },
      { code: 'A09', name: 'Infectious gastroenteritis and colitis, unspecified' },
      { code: 'M54.5', name: 'Low back pain' },
      { code: 'J45.9', name: 'Asthma, unspecified' },
      { code: 'I20.9', name: 'Angina pectoris, unspecified' },
      { code: 'H10.9', name: 'Conjunctivitis, unspecified' },
      { code: 'R50.9', name: 'Fever, unspecified' }
    ]
  };

  // State
  let currentSimrsSubTab = 'pendaftaran';

  // Helper calculation
  function calculateBor(totalTT, terisiTT, hariPeriode, pasienKeluar) {
    totalTT = Math.max(1, totalTT);
    pasienKeluar = Math.max(1, pasienKeluar);
    hariPeriode = Math.max(1, hariPeriode);
    const hariPerawatan = terisiTT * hariPeriode;
    const bor = ((hariPerawatan / (totalTT * hariPeriode)) * 100).toFixed(1);
    const alos = (hariPerawatan / pasienKeluar).toFixed(1);
    const toi = (((totalTT * hariPeriode) - hariPerawatan) / pasienKeluar).toFixed(1);
    const bto = (pasienKeluar / totalTT).toFixed(1);

    let status = 'Ideal (Efisien)';
    let badge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
    if (bor < 60) {
      status = 'Under-utilized (Rendah)';
      badge = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
    } else if (bor > 85) {
      status = 'Overcrowded (Kelebihan Beban)';
      badge = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300';
    }

    return { bor, alos, toi, bto, hariPerawatan, status, badge };
  }

  function getDaysRemaining(targetDateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Master Render Function
  window.renderSimrsSuite = function (container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- SIMRS Hero Header & GitHub Link Banner -->
        <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-800/40 shadow-xl relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 w-52 h-52 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div class="space-y-2 max-w-3xl">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  Laravel 11 • PHP 8.2+
                </span>
                <span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Clean MVC & Service Layer
                </span>
                <span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  RME SOAP & SatuSehat Ready
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <i data-lucide="hospital" class="w-7 h-7 text-sky-400"></i>
                <span>SIMRS Laravel — Hospital Information System</span>
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                ${isEn 
                  ? "Enterprise Hospital Management Information System built with Laravel 11, Clean Architecture, Electronic Medical Records (RME SOAP & ICD-10), Bed Occupancy Rate (BOR) Analytics, and Insurance Cooperation (PKS) Monitoring for PT Abna / Healthcare Providers." 
                  : "Sistem Informasi Manajemen Rumah Sakit (SIMRS) Terintegrasi berbasis Laravel 11, Clean Architecture, Rekam Medis Elektronik (RME SOAP & ICD-10 Kemenkes), Indikator Efisiensi Tempat Tidur (BOR/ALOS/TOI), dan Monitoring PKS Asuransi untuk PT Abna / RS Layanan."}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 shrink-0">
              <a href="https://github.com/InfiniteNull/simrs-laravel" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center gap-2 transition shadow-lg border border-slate-200">
                <i data-lucide="github" class="w-4 h-4 text-slate-900"></i>
                <span>${isEn ? "View Laravel Repo on GitHub ↗" : "Lihat Source Code di GitHub ↗"}</span>
              </a>
              <button id="btnSimrsManualBook" class="px-4 py-2.5 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 font-semibold text-xs flex items-center gap-2 transition border border-sky-500/40">
                <i data-lucide="book-marked" class="w-4 h-4 text-sky-300"></i>
                <span>${isEn ? "SIMRS Manual Book & SOP" : "Manual Book & SOP SIMRS"}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- SIMRS Navigation Sub-Tabs -->
        <div class="border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button data-simrs-tab="pendaftaran" class="simrs-subtab-btn ${currentSimrsSubTab === 'pendaftaran' ? 'active' : ''} px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0">
            <i data-lucide="clipboard-list" class="w-4 h-4"></i>
            <span>${isEn ? "1. Online Registration & Queue" : "1. Pendaftaran Online & Antrean"}</span>
          </button>
          <button data-simrs-tab="rme" class="simrs-subtab-btn ${currentSimrsSubTab === 'rme' ? 'active' : ''} px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0">
            <i data-lucide="stethoscope" class="w-4 h-4"></i>
            <span>${isEn ? "2. EMR SOAP & ICD-10" : "2. RME SOAP & ICD-10"}</span>
          </button>
          <button data-simrs-tab="pks" class="simrs-subtab-btn ${currentSimrsSubTab === 'pks' ? 'active' : ''} px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0">
            <i data-lucide="shield-check" class="w-4 h-4"></i>
            <span>${isEn ? "3. Insurance PKS Tracker" : "3. Monitoring PKS Asuransi"}</span>
          </button>
          <button data-simrs-tab="dashboard" class="simrs-subtab-btn ${currentSimrsSubTab === 'dashboard' ? 'active' : ''} px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0">
            <i data-lucide="activity" class="w-4 h-4"></i>
            <span>${isEn ? "4. BOR Analytics Dashboard" : "4. Dashboard BOR & Layanan"}</span>
          </button>
          <button data-simrs-tab="code" class="simrs-subtab-btn ${currentSimrsSubTab === 'code' ? 'active' : ''} px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0">
            <i data-lucide="code-2" class="w-4 h-4"></i>
            <span>${isEn ? "5. Laravel Clean Code & ERD" : "5. Arsitektur Laravel & ERD"}</span>
          </button>
        </div>

        <!-- SIMRS Sub-Tab Dynamic Content -->
        <div id="simrsTabContentContainer" class="min-h-[400px]">
          <!-- Injected via sub-tab renderers -->
        </div>

      </div>
    `;

    // Wire events
    container.querySelectorAll('.simrs-subtab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.dataset.simrsTab;
        if (!tab) return;
        currentSimrsSubTab = tab;
        container.querySelectorAll('.simrs-subtab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSimrsSubTabContent();
      });
    });

    const btnManualBook = container.querySelector('#btnSimrsManualBook');
    if (btnManualBook) {
      btnManualBook.addEventListener('click', showManualBookModal);
    }

    renderSimrsSubTabContent();
    if (window.lucide) lucide.createIcons();
  };

  // Sub-Tab Content Switcher
  function renderSimrsSubTabContent() {
    const container = document.getElementById('simrsTabContentContainer');
    if (!container) return;

    if (currentSimrsSubTab === 'pendaftaran') {
      renderPendaftaranModule(container);
    } else if (currentSimrsSubTab === 'rme') {
      renderRmeModule(container);
    } else if (currentSimrsSubTab === 'pks') {
      renderPksModule(container);
    } else if (currentSimrsSubTab === 'dashboard') {
      renderDashboardBorModule(container);
    } else if (currentSimrsSubTab === 'code') {
      renderLaravelCodeModule(container);
    }

    if (window.lucide) lucide.createIcons();
  }

  // =========================================================================
  // SUB-TAB 1: PENDAFTARAN ONLINE & ANTREAN POLIKLINIK
  // =========================================================================
  function renderPendaftaranModule(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left: Form Registrasi Pasien & Booking Antrean -->
        <div class="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="user-plus" class="w-4 h-4 text-sky-500"></i>
              <span>${isEn ? "Patient Online Admission Form" : "Form Registrasi & Booking Antrean"}</span>
            </h3>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300 font-semibold">
              ${isEn ? "Auto No RM & Queue" : "Auto No RM & Antrean"}
            </span>
          </div>

          <form id="formPendaftaranOnline" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                ${isEn ? "National Identity No (NIK 16 Digits)" : "Nomor Induk Kependudukan (NIK 16 Digit)"} <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="regNik" maxlength="16" placeholder="Contoh: 1271012304950002" required class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                ${isEn ? "Full Patient Name" : "Nama Lengkap Pasien"} <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="regNama" placeholder="Nama sesuai KTP" required class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ${isEn ? "Gender" : "Jenis Kelamin"}
                </label>
                <select id="regJk" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none">
                  <option value="L">${isEn ? "Male (Laki-laki)" : "Laki-laki (L)"}</option>
                  <option value="P">${isEn ? "Female (Perempuan)" : "Perempuan (P)"}</option>
                </select>
              </div>
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ${isEn ? "Date of Birth" : "Tanggal Lahir"}
                </label>
                <input type="date" id="regTglLahir" value="1996-05-12" required class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ${isEn ? "Specialist Clinic" : "Pilihan Poliklinik"}
                </label>
                <select id="regPoli" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none">
                  ${SIMRS_DB.dokters.map(d => `<option value="${d.id}">${d.poli} — ${d.nama}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ${isEn ? "Payment Method" : "Metode Pembayaran"}
                </label>
                <select id="regBayar" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none">
                  <option value="BPJS Kesehatan">BPJS Kesehatan</option>
                  <option value="Umum / Mandiri">Umum / Tunai</option>
                  <option value="Allianz Life">Asuransi Allianz</option>
                  <option value="Prudential">Asuransi Prudential</option>
                  <option value="Sinarmas">Asuransi Sinarmas</option>
                </select>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 space-y-1">
              <div class="flex items-center justify-between">
                <span>${isEn ? "Doctor Daily Quota:" : "Kuota Harian Dokter:"}</span>
                <span id="quotaDisplay" class="font-mono font-bold text-sky-600 dark:text-sky-400">12 / 30 Tersisa</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div id="quotaBar" class="bg-sky-500 h-full transition-all duration-300" style="width: 60%"></div>
              </div>
            </div>

            <button type="submit" class="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>${isEn ? "Submit Admission & Generate Ticket" : "Proses Pendaftaran & Terbitkan Antrean"}</span>
            </button>
          </form>
        </div>

        <!-- Right: Real-time Queue Table & Admission Ticket Preview -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Latest Generated Ticket Card (if any) -->
          <div id="ticketSuccessCard" class="hidden p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-white space-y-3">
            <div class="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800/80 pb-2">
              <div class="flex items-center gap-2">
                <i data-lucide="ticket" class="w-5 h-5 text-emerald-600 dark:text-emerald-400"></i>
                <span class="font-bold text-sm">${isEn ? "E-Ticket & Queue Verification" : "E-Tiket & Bukti Pendaftaran Online"}</span>
              </div>
              <span id="ticketBookingCode" class="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-emerald-300 dark:border-emerald-700">BK-20260905-99</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div class="text-center sm:text-left bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">${isEn ? "Queue Number" : "Nomor Antrean"}</span>
                <p id="ticketQueueNum" class="text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-0.5">P-019</p>
              </div>
              <div class="sm:col-span-2 space-y-1 text-xs">
                <p><strong>${isEn ? "Patient Name:" : "Nama Pasien:"}</strong> <span id="ticketPatientName" class="font-semibold">-</span></p>
                <p><strong>${isEn ? "Med Record No:" : "No Rekam Medis:"}</strong> <span id="ticketRmNum" class="font-mono font-semibold">-</span></p>
                <p><strong>${isEn ? "Clinic & Doctor:" : "Poli & Dokter:"}</strong> <span id="ticketDoctorName">-</span></p>
                <p><strong>${isEn ? "Est. Service Time:" : "Estimasi Pelayanan:"}</strong> <span class="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">09:30 - 10:00 WIB</span></p>
              </div>
            </div>
          </div>

          <!-- Queue List Table -->
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ${isEn ? "Today's Active Outpatient Queue" : "Daftar Antrean Pasien Hari Ini"}
              </h4>
              <span class="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
                Total: ${SIMRS_DB.antreans.length} Pasien
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th class="py-2.5 px-3">No Antrean</th>
                    <th class="py-2.5 px-3">No RM & Pasien</th>
                    <th class="py-2.5 px-3">Poli & Dokter</th>
                    <th class="py-2.5 px-3">Penjamin</th>
                    <th class="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody id="queueTableBody" class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  ${SIMRS_DB.antreans.map(a => `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td class="py-2.5 px-3 font-mono font-bold text-sky-600 dark:text-sky-400">${a.nomorAntrean}</td>
                      <td class="py-2.5 px-3">
                        <div class="font-semibold text-slate-900 dark:text-white">${a.nama}</div>
                        <div class="text-[10px] font-mono text-slate-500">${a.noRm}</div>
                      </td>
                      <td class="py-2.5 px-3">
                        <div>${a.poli}</div>
                        <div class="text-[10px] text-slate-500">${a.dokter}</div>
                      </td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">${a.bayar}</td>
                      <td class="py-2.5 px-3">
                        <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${
                          a.status === 'selesai' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          a.status === 'sedang_dilayani' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 animate-pulse' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }">
                          ${a.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    `;

    // Event for Poli selection to update quota
    const selPoli = container.querySelector('#regPoli');
    const quotaDisplay = container.querySelector('#quotaDisplay');
    const quotaBar = container.querySelector('#quotaBar');

    function updateQuota() {
      const doc = SIMRS_DB.dokters.find(d => d.id === parseInt(selPoli.value)) || SIMRS_DB.dokters[0];
      const sisa = Math.max(0, doc.kuota - doc.terpakai);
      const pct = Math.round((sisa / doc.kuota) * 100);
      quotaDisplay.textContent = `${sisa} / ${doc.kuota} Tersisa`;
      quotaBar.style.width = `${pct}%`;
    }
    selPoli.addEventListener('change', updateQuota);
    updateQuota();

    // Form Submission
    const form = container.querySelector('#formPendaftaranOnline');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nik = container.querySelector('#regNik').value.trim();
      const nama = container.querySelector('#regNama').value.trim();
      const jk = container.querySelector('#regJk').value;
      const tglLahir = container.querySelector('#regTglLahir').value;
      const docId = parseInt(selPoli.value);
      const bayar = container.querySelector('#regBayar').value;

      const doc = SIMRS_DB.dokters.find(d => d.id === docId);
      doc.terpakai += 1;

      // Patient registration or lookup
      let p = SIMRS_DB.pasiens.find(x => x.nik === nik);
      if (!p) {
        const rmNum = `RM-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(SIMRS_DB.pasiens.length + 1).padStart(4, '0')}`;
        p = { noRm: rmNum, nik, nama, jk, tglLahir, hp: '0812-xxxx-xxxx', alamat: 'Medan, Sumatera Utara', goldar: 'B' };
        SIMRS_DB.pasiens.push(p);
      }

      // Generate Queue
      const prefix = doc.spesialisasi.includes('Dalam') ? 'P' : doc.spesialisasi.includes('Anak') ? 'A' : doc.spesialisasi.includes('Bedah') ? 'B' : doc.spesialisasi.includes('Jantung') ? 'J' : 'K';
      const queueNum = `${prefix}-${String(doc.terpakai).padStart(3, '0')}`;
      const bkCode = `BK-${Date.now().toString().slice(-8)}`;

      const newAntrean = {
        id: SIMRS_DB.antreans.length + 1,
        nomorAntrean: queueNum,
        kodeBooking: bkCode,
        noRm: p.noRm,
        nama: p.nama,
        dokter: doc.nama,
        poli: doc.poli,
        tgl: new Date().toISOString().split('T')[0],
        jenis: 'rawat_jalan',
        bayar,
        status: 'menunggu'
      };

      SIMRS_DB.antreans.unshift(newAntrean);

      // Show ticket
      const ticketCard = container.querySelector('#ticketSuccessCard');
      ticketCard.classList.remove('hidden');
      container.querySelector('#ticketBookingCode').textContent = bkCode;
      container.querySelector('#ticketQueueNum').textContent = queueNum;
      container.querySelector('#ticketPatientName').textContent = p.nama;
      container.querySelector('#ticketRmNum').textContent = p.noRm;
      container.querySelector('#ticketDoctorName').textContent = `${doc.poli} (${doc.nama})`;

      updateQuota();
      renderPendaftaranModule(container); // Re-render table
      const newCard = container.querySelector('#ticketSuccessCard');
      if (newCard) newCard.classList.remove('hidden');

      if (window.showToast) {
        showToast(isEn ? `Admission successful! Queue: ${queueNum}` : `Pendaftaran berhasil! Nomor antrean Anda: ${queueNum}`, 'success');
      }
    });
  }

  // =========================================================================
  // SUB-TAB 2: REKAM MEDIS ELEKTRONIK (RME SOAP & ICD-10)
  // =========================================================================
  function renderRmeModule(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left: Form SOAP & ICD-10 Doctor Assessment -->
        <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="file-signature" class="w-4 h-4 text-emerald-500"></i>
              <span>${isEn ? "Physician EMR SOAP Assessment Entry" : "Form Pengisian Asesmen RME SOAP"}</span>
            </h3>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
              SatuSehat Kemenkes
            </span>
          </div>

          <form id="formRmeSoap" class="space-y-4 text-xs">
            
            <!-- Pilih Pasien -->
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                ${isEn ? "Select Patient (Medical Record / Queue)" : "Pilih Pasien Dari Antrean Hari Ini"}
              </label>
              <select id="rmePasienSelect" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none">
                ${SIMRS_DB.antreans.map(a => `<option value="${a.noRm}">${a.nomorAntrean} — ${a.nama} (${a.noRm})</option>`).join('')}
              </select>
            </div>

            <!-- S: Subjektif -->
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <label class="block font-bold text-sky-600 dark:text-sky-400">
                S — ${isEn ? "Subjective (Anamnesis & Chief Complaint)" : "Subjektif (Keluhan Utama Pasien & Anamnesis)"}
              </label>
              <textarea id="rmeS" rows="2" required placeholder="Keluhan utama, riwayat penyakit sekarang, riwayat alergi..." class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none">Nyeri ulu hati terasa perih dan terbakar sejak 2 hari, mual terutama setelah makan makanan pedas dan asam.</textarea>
            </div>

            <!-- O: Objektif -->
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <label class="block font-bold text-emerald-600 dark:text-emerald-400">
                O — ${isEn ? "Objective (Vital Signs & Physical Exam)" : "Objektif (Tanda-Tanda Vital & Pemeriksaan Fisik)"}
              </label>
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <span class="text-[10px] text-slate-500">TD (mmHg)</span>
                  <input type="text" id="rmeTd" value="120/80" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">Nadi (x/mnt)</span>
                  <input type="number" id="rmeNadi" value="78" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">Suhu (°C)</span>
                  <input type="text" id="rmeSuhu" value="36.5" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">RR (x/mnt)</span>
                  <input type="number" id="rmeRr" value="18" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">BB (kg)</span>
                  <input type="number" id="rmeBb" value="62" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">SpO2 (%)</span>
                  <input type="number" id="rmeSpo2" value="99" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs" />
                </div>
              </div>
            </div>

            <!-- A: Asesmen (ICD-10) -->
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <label class="block font-bold text-purple-600 dark:text-purple-400">
                A — ${isEn ? "Assessment (ICD-10 Clinical Diagnosis)" : "Asesmen (Diagnosis Klinis & ICD-10 Kemenkes)"}
              </label>
              <select id="rmeIcd10" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono focus:ring-1 focus:ring-purple-500 focus:outline-none">
                ${SIMRS_DB.icd10Database.map(icd => `<option value="${icd.code}" ${icd.code === 'K29.7' ? 'selected' : ''}>[${icd.code}] ${icd.name}</option>`).join('')}
              </select>
            </div>

            <!-- P: Plan -->
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <label class="block font-bold text-amber-600 dark:text-amber-400">
                P — ${isEn ? "Plan (Medical Therapy & Prescription)" : "Plan (Penatalaksanaan, Terapi Obat & Edukasi)"}
              </label>
              <textarea id="rmeP" rows="2" required placeholder="Resep obat, dosis, rencana kontrol..." class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none">1. Omeprazole 20 mg cap No. XIV (2x1 ac)\n2. Antasida Doen tab No. X (3x1 ac kunyah)\n3. Sukralfat suspensi 100 ml (3x1 C ac)</textarea>
            </div>

            <button type="submit" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md">
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>${isEn ? "Save Medical Record & Sync SatuSehat" : "Simpan Rekam Medis & Sinkron SatuSehat"}</span>
            </button>
          </form>
        </div>

        <!-- Right: Real-time Electronic Medical Record History List -->
        <div class="lg:col-span-6 space-y-4">
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ${isEn ? "Electronic Medical Record History" : "Riwayat Rekam Medis Pasien (RME)"}
              </h4>
              <span class="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
                ${SIMRS_DB.rekamMedisList.length} Asesmen Tersimpan
              </span>
            </div>

            <div id="rmeRecordHistoryList" class="space-y-3">
              ${SIMRS_DB.rekamMedisList.map(r => `
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="font-bold text-slate-900 dark:text-white text-xs">${r.nama}</span>
                      <span class="text-[11px] font-mono text-slate-500 ml-1.5">(${r.noRm})</span>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      ICD-10: ${r.a_icd10}
                    </span>
                  </div>

                  <div class="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                    <p><strong>Diagnosis:</strong> ${r.a_diagnosis}</p>
                    <p><strong>Objektif:</strong> <span class="font-mono">${r.o}</span></p>
                    <p><strong>Keluhan:</strong> ${r.s}</p>
                    <p><strong>Terapi/Resep:</strong> <span class="font-mono text-emerald-600 dark:text-emerald-400">${r.p_resep.replace(/\n/g, ' • ')}</span></p>
                  </div>

                  <div class="pt-2 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Dokter: ${r.dokter}</span>
                    <span>Tgl: ${r.tglPeriksa}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    `;

    // Handle RME Form Submit
    const form = container.querySelector('#formRmeSoap');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const noRm = container.querySelector('#rmePasienSelect').value;
      const pasien = SIMRS_DB.pasiens.find(p => p.noRm === noRm) || { nama: 'Pasien Rawat' };
      const s = container.querySelector('#rmeS').value;
      const td = container.querySelector('#rmeTd').value;
      const nadi = container.querySelector('#rmeNadi').value;
      const suhu = container.querySelector('#rmeSuhu').value;
      const rr = container.querySelector('#rmeRr').value;
      const bb = container.querySelector('#rmeBb').value;
      const spo2 = container.querySelector('#rmeSpo2').value;
      const icdCode = container.querySelector('#rmeIcd10').value;
      const icdObj = SIMRS_DB.icd10Database.find(i => i.code === icdCode) || { name: 'Diagnosis Klinis' };
      const p = container.querySelector('#rmeP').value;

      const newRecord = {
        id: SIMRS_DB.rekamMedisList.length + 1,
        noRm,
        nama: pasien.nama,
        dokter: 'dr. Hendra Wijaya, Sp.PD',
        tglPeriksa: new Date().toISOString().split('T')[0],
        s,
        o: `TD: ${td} mmHg | Nadi: ${nadi} x/mnt | Suhu: ${suhu} °C | RR: ${rr} x/mnt | BB: ${bb} kg | SpO2: ${spo2}%`,
        a_icd10: icdCode,
        a_diagnosis: icdObj.name,
        p_tindakan: 'Pemeriksaan Rutin Poli',
        p_resep: p,
        p_edukasi: 'Jaga pola makan sehat dan minum obat teratur.',
        tglKontrol: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
      };

      SIMRS_DB.rekamMedisList.unshift(newRecord);

      // Update antrean status
      const ant = SIMRS_DB.antreans.find(a => a.noRm === noRm);
      if (ant) ant.status = 'selesai';

      renderRmeModule(container);

      if (window.showToast) {
        showToast(isEn ? "EMR SOAP Assessment successfully recorded!" : "Asesmen Rekam Medis (RME SOAP) berhasil disimpan!", "success");
      }
    });
  }

  // =========================================================================
  // SUB-TAB 3: MONITORING MASA BERLAKU PKS ASURANSI
  // =========================================================================
  function renderPksModule(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-[10px] uppercase font-bold text-slate-500">${isEn ? "Total Partners" : "Total Mitra PKS"}</span>
            <p class="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">${SIMRS_DB.pksList.length}</p>
          </div>
          <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <span class="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">${isEn ? "Active Agreements" : "PKS Aktif (> 60 Hari)"}</span>
            <p class="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              ${SIMRS_DB.pksList.filter(p => getDaysRemaining(p.akhir) > 60).length}
            </p>
          </div>
          <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-sm">
            <span class="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">${isEn ? "Expiring Soon (<= 60 D)" : "Segera Berakhir (<= 60 Hari)"}</span>
            <p class="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1">
              ${SIMRS_DB.pksList.filter(p => { const d = getDaysRemaining(p.akhir); return d > 0 && d <= 60; }).length}
            </p>
          </div>
          <div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 shadow-sm">
            <span class="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">${isEn ? "Expired / Needs Addendum" : "Kadaluarsa / Perlu Addendum"}</span>
            <p class="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1">
              ${SIMRS_DB.pksList.filter(p => getDaysRemaining(p.akhir) <= 0).length}
            </p>
          </div>
        </div>

        <!-- PKS Table & Add Button -->
        <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="shield-alert" class="w-4 h-4 text-sky-500"></i>
                <span>${isEn ? "Insurance & Corporate Cooperation Agreement Directory" : "Direktori Perjanjian Kerjasama (PKS) Asuransi"}</span>
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">${isEn ? "Automated countdown and reminder system for hospital PKS contracts" : "Sistem pelacakan masa berlaku kontrak kerjasama dan peringatan perpanjangan addendum"}</p>
            </div>

            <button id="btnTambahPksModal" class="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 transition self-start sm:self-auto">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>${isEn ? "Add New PKS" : "Tambah PKS Baru"}</span>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th class="py-2.5 px-3">Nomor PKS</th>
                  <th class="py-2.5 px-3">Mitra Kerjasama</th>
                  <th class="py-2.5 px-3">Periode Kontrak</th>
                  <th class="py-2.5 px-3">Sisa Waktu</th>
                  <th class="py-2.5 px-3">Status</th>
                  <th class="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                ${SIMRS_DB.pksList.map(p => {
                  const sisaHari = getDaysRemaining(p.akhir);
                  let statusBadge = '';
                  let sisaText = '';

                  if (sisaHari <= 0) {
                    statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">KADALUARSA</span>';
                    sisaText = `<span class="font-mono text-rose-600 dark:text-rose-400 font-bold">Habis ${Math.abs(sisaHari)} hari lalu</span>`;
                  } else if (sisaHari <= 60) {
                    statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse">WARNING</span>';
                    sisaText = `<span class="font-mono text-amber-600 dark:text-amber-400 font-bold">${sisaHari} Hari Tersisa</span>`;
                  } else {
                    statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">AKTIF</span>';
                    sisaText = `<span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">${sisaHari} Hari Tersisa</span>`;
                  }

                  return `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td class="py-2.5 px-3 font-mono font-semibold text-slate-900 dark:text-white">${p.nomor}</td>
                      <td class="py-2.5 px-3">
                        <div class="font-bold text-slate-900 dark:text-white">${p.mitra}</div>
                        <div class="text-[10px] text-slate-500">PIC: ${p.pic} (${p.kontak})</div>
                      </td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">${p.mulai} s/d ${p.akhir}</td>
                      <td class="py-2.5 px-3">${sisaText}</td>
                      <td class="py-2.5 px-3">${statusBadge}</td>
                      <td class="py-2.5 px-3 text-right">
                        <button onclick="window.perpanjangPksDemo(${p.id})" class="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-[11px] text-slate-700 dark:text-slate-300 transition">
                          ${isEn ? "Extend / Addendum" : "Perpanjang"}
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    // Global helper for extend
    window.perpanjangPksDemo = function(id) {
      const p = SIMRS_DB.pksList.find(x => x.id === id);
      if (!p) return;
      const newDate = new Date();
      newDate.setFullYear(newDate.getFullYear() + 1);
      p.akhir = newDate.toISOString().split('T')[0];
      p.status = 'aktif';
      p.nomor = `${p.nomor}/ADD-${new Date().getFullYear()}`;
      renderPksModule(container);
      if (window.showToast) {
        showToast(`Addendum PKS ${p.mitra} berhasil diperpanjang 1 tahun ke depan!`, 'success');
      }
    };

    const btnTambah = container.querySelector('#btnTambahPksModal');
    if (btnTambah) {
      btnTambah.addEventListener('click', () => {
        const mitra = prompt('Masukkan Nama Perusahaan Asuransi / Mitra PKS Baru:');
        if (!mitra) return;
        const nomor = `PKS/NEW-${Date.now().toString().slice(-4)}/${new Date().getFullYear()}`;
        const tglMulai = new Date().toISOString().split('T')[0];
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 2);

        SIMRS_DB.pksList.push({
          id: SIMRS_DB.pksList.length + 1,
          nomor,
          mitra,
          jenis: 'swasta',
          mulai: tglMulai,
          akhir: nextYear.toISOString().split('T')[0],
          pic: 'Account Officer',
          kontak: '0812-9999-8888',
          status: 'aktif',
          layanan: ['Rawat Inap', 'Rawat Jalan']
        });

        renderPksModule(container);
        if (window.showToast) {
          showToast(`PKS Baru bersama ${mitra} berhasil ditambahkan!`, 'success');
        }
      });
    }
  }

  // =========================================================================
  // SUB-TAB 4: DASHBOARD BOR & INDIKATOR EFISIENSI RUMAH SAKIT
  // =========================================================================
  function renderDashboardBorModule(container) {
    const isEn = window.currentLang === 'en';

    // Current metrics
    const totalTT = SIMRS_DB.kamars.reduce((acc, k) => acc + k.totalTT, 0);
    const terisiTT = SIMRS_DB.kamars.reduce((acc, k) => acc + k.terisiTT, 0);
    const m = calculateBor(totalTT, terisiTT, 30, 420);

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Metrics Indicator Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>BOR (Bed Occupancy Rate)</span>
              <span class="text-[10px] font-mono">Ideal: 60-85%</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span id="borValueText" class="text-3xl font-black font-mono text-sky-600 dark:text-sky-400">${m.bor}%</span>
              <span id="borBadgeText" class="px-2 py-0.5 rounded text-[10px] font-bold border ${m.badge}">${m.status}</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">${isEn ? "Percentage of occupied inpatient beds" : "Persentase pemakaian tempat tidur rawat inap"}</p>
          </div>

          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>ALOS (Length of Stay)</span>
              <span class="text-[10px] font-mono">Ideal: 3-6 Hari</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span id="alosValueText" class="text-3xl font-black font-mono text-purple-600 dark:text-purple-400">${m.alos}</span>
              <span class="text-xs font-semibold text-slate-500">Hari</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">${isEn ? "Average duration a patient stays in hospital" : "Rata-rata lama rawat seorang pasien"}</p>
          </div>

          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>TOI (Turn Over Interval)</span>
              <span class="text-[10px] font-mono">Ideal: 1-3 Hari</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span id="toiValueText" class="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">${m.toi}</span>
              <span class="text-xs font-semibold text-slate-500">Hari</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">${isEn ? "Average days a bed remains unoccupied" : "Rata-rata hari tempat tidur kosong"}</p>
          </div>

          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>BTO (Bed Turn Over)</span>
              <span class="text-[10px] font-mono">Ideal: 3-5x /bln</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span id="btoValueText" class="text-3xl font-black font-mono text-amber-600 dark:text-amber-400">${m.bto}</span>
              <span class="text-xs font-semibold text-slate-500">Kali</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">${isEn ? "Frequency of bed usage per period" : "Frekuensi pemakaian tempat tidur"}</p>
          </div>

        </div>

        <!-- Interactive Simulator & Room Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Live Interactive BOR Simulator -->
          <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="sliders" class="w-4 h-4 text-sky-500"></i>
                <span>${isEn ? "Interactive BOR Formula Simulator" : "Simulasi Interaktif Rumus Depkes BOR"}</span>
              </h3>
              <span class="text-[11px] font-mono text-slate-500 font-semibold">Standar Kemenkes RI</span>
            </div>

            <div class="space-y-4 text-xs">
              <div>
                <div class="flex justify-between font-semibold mb-1">
                  <span>${isEn ? "Total Usable Beds (A):" : "Total Tempat Tidur Siap Pakai (A):"}</span>
                  <span id="simTotalTTVal" class="font-mono text-sky-600 dark:text-sky-400">${totalTT} Bed</span>
                </div>
                <input type="range" id="simTotalTT" min="50" max="300" value="${totalTT}" class="w-full accent-sky-600 cursor-pointer" />
              </div>

              <div>
                <div class="flex justify-between font-semibold mb-1">
                  <span>${isEn ? "Occupied Beds (O):" : "Tempat Tidur Terisi Pasien (O):"}</span>
                  <span id="simTerisiTTVal" class="font-mono text-emerald-600 dark:text-emerald-400">${terisiTT} Bed</span>
                </div>
                <input type="range" id="simTerisiTT" min="10" max="250" value="${terisiTT}" class="w-full accent-emerald-600 cursor-pointer" />
              </div>

              <div>
                <div class="flex justify-between font-semibold mb-1">
                  <span>${isEn ? "Analysis Period (t):" : "Jumlah Hari Periode Analisis (t):"}</span>
                  <span id="simHariVal" class="font-mono text-purple-600 dark:text-purple-400">30 Hari</span>
                </div>
                <input type="range" id="simHari" min="7" max="365" value="30" class="w-full accent-purple-600 cursor-pointer" />
              </div>

              <div>
                <div class="flex justify-between font-semibold mb-1">
                  <span>${isEn ? "Discharged Patients (D):" : "Total Pasien Keluar (Hidup + Mati) (D):"}</span>
                  <span id="simKeluarVal" class="font-mono text-amber-600 dark:text-amber-400">420 Orang</span>
                </div>
                <input type="range" id="simKeluar" min="50" max="1000" value="420" class="w-full accent-amber-600 cursor-pointer" />
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <p>$$\\text{BOR} = \\frac{\\text{Hari Perawatan}}{\\text{Total TT} \\times \\text{Hari Periode}} \\times 100\\%$$</p>
            </div>
          </div>

          <!-- Inpatient Wards Bed Breakdown Table -->
          <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="bed-double" class="w-4 h-4 text-emerald-500"></i>
                <span>${isEn ? "Hospital Wards Bed Availability" : "Ketersediaan Bed Kamar Rawat Inap"}</span>
              </h3>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th class="py-2 px-2">Bangsal / Ruang</th>
                    <th class="py-2 px-2">Kelas</th>
                    <th class="py-2 px-2 text-center">Kapasitas</th>
                    <th class="py-2 px-2 text-center">Terisi</th>
                    <th class="py-2 px-2 text-center">Kosong</th>
                    <th class="py-2 px-2 text-right">BOR</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  ${SIMRS_DB.kamars.map(k => {
                    const borBangsal = Math.round((k.terisiTT / k.totalTT) * 100);
                    return `
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        <td class="py-2.5 px-2 font-semibold text-slate-900 dark:text-white">${k.bangsal}</td>
                        <td class="py-2.5 px-2 font-mono uppercase text-[10px] text-slate-500">${k.kelas}</td>
                        <td class="py-2.5 px-2 text-center font-mono">${k.totalTT}</td>
                        <td class="py-2.5 px-2 text-center font-mono text-sky-600 dark:text-sky-400 font-bold">${k.terisiTT}</td>
                        <td class="py-2.5 px-2 text-center font-mono text-emerald-600 dark:text-emerald-400 font-bold">${k.totalTT - k.terisiTT}</td>
                        <td class="py-2.5 px-2 text-right font-mono font-bold">${borBangsal}%</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    `;

    // Slider Listeners
    const simTotalTT = container.querySelector('#simTotalTT');
    const simTerisiTT = container.querySelector('#simTerisiTT');
    const simHari = container.querySelector('#simHari');
    const simKeluar = container.querySelector('#simKeluar');

    function updateSimulation() {
      const tot = parseInt(simTotalTT.value);
      const ter = Math.min(tot, parseInt(simTerisiTT.value));
      simTerisiTT.max = tot;
      const h = parseInt(simHari.value);
      const kel = parseInt(simKeluar.value);

      container.querySelector('#simTotalTTVal').textContent = `${tot} Bed`;
      container.querySelector('#simTerisiTTVal').textContent = `${ter} Bed`;
      container.querySelector('#simHariVal').textContent = `${h} Hari`;
      container.querySelector('#simKeluarVal').textContent = `${kel} Orang`;

      const res = calculateBor(tot, ter, h, kel);
      container.querySelector('#borValueText').textContent = `${res.bor}%`;
      container.querySelector('#borBadgeText').textContent = res.status;
      container.querySelector('#borBadgeText').className = `px-2 py-0.5 rounded text-[10px] font-bold border ${res.badge}`;
      container.querySelector('#alosValueText').textContent = res.alos;
      container.querySelector('#toiValueText').textContent = res.toi;
      container.querySelector('#btoValueText').textContent = res.bto;
    }

    [simTotalTT, simTerisiTT, simHari, simKeluar].forEach(el => el.addEventListener('input', updateSimulation));
  }

  // =========================================================================
  // SUB-TAB 5: LARAVEL ARCHITECTURE & CLEAN CODE INSPECTOR
  // =========================================================================
  function renderLaravelCodeModule(container) {
    const isEn = window.currentLang === 'en';

    const codeFiles = {
      'PendaftaranPasienController.php': `<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Pendaftaran;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PendaftaranPasienController extends Controller
{
    /**
     * Simpan Data Pendaftaran Baru & Generate Nomor Antrean Otomatis.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nik' => ['required', 'string', 'size:16'],
            'nama_lengkap' => ['required', 'string', 'max:255'],
            'dokter_id' => ['required', 'exists:dokters,id'],
            'jenis_pelayanan' => ['required', 'in:rawat_jalan,rawat_inap,igd'],
            'metode_pembayaran' => ['required', 'in:bpjs,asuransi_swasta,umum'],
            'tanggal_kunjungan' => ['required', 'date', 'after_or_equal:today'],
        ]);

        // Cari atau buat pasien baru
        $pasien = Pasien::firstOrCreate(
            ['nik' => $validated['nik']],
            [
                'no_rkm_medis' => 'RM-' . date('Ym') . '-' . str_pad((string)(Pasien::count() + 1), 4, '0', STR_PAD_LEFT),
                'nama_lengkap' => $validated['nama_lengkap'],
            ]
        );

        $dokter = Dokter::findOrFail($validated['dokter_id']);
        $antreanCount = Pendaftaran::where('dokter_id', $dokter->id)
            ->whereDate('tanggal_kunjungan', $validated['tanggal_kunjungan'])
            ->count() + 1;

        $kodePoli = strtoupper(substr($dokter->spesialisasi, 0, 1));
        $nomorAntrean = $kodePoli . '-' . str_pad((string)$antreanCount, 3, '0', STR_PAD_LEFT);

        $pendaftaran = Pendaftaran::create([
            'nomor_antrean' => $nomorAntrean,
            'kode_booking' => 'BK-' . strtoupper(Str::random(8)),
            'pasien_id' => $pasien->id,
            'dokter_id' => $dokter->id,
            'tanggal_kunjungan' => $validated['tanggal_kunjungan'],
            'jenis_pelayanan' => $validated['jenis_pelayanan'],
            'metode_pembayaran' => $validated['metode_pembayaran'],
            'status_antrean' => 'menunggu',
        ]);

        return redirect()->route('pendaftaran.show', $pendaftaran->id)
            ->with('success', "Pendaftaran Berhasil! Nomor Antrean: {$nomorAntrean}");
    }
}`,
      'RekamMedisController.php': `<?php

namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use App\Models\RekamMedis;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RekamMedisController extends Controller
{
    /**
     * Simpan Asesmen Rekam Medis Elektronik (SOAP & ICD-10 SatuSehat).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pendaftaran_id' => ['required', 'exists:pendaftarans,id', 'unique:rekam_medis,pendaftaran_id'],
            'keluhan_utama' => ['required', 'string'],
            'tekanan_darah' => ['required', 'string', 'max:20'],
            'nadi' => ['required', 'integer'],
            'suhu' => ['required', 'numeric'],
            'pernapasan' => ['required', 'integer'],
            'berat_badan' => ['required', 'numeric'],
            'tinggi_badan' => ['required', 'numeric'],
            'kode_icd10' => ['required', 'string', 'max:10'],
            'nama_diagnosis' => ['required', 'string', 'max:255'],
            'resep_obat' => ['required', 'string'],
        ]);

        $rekamMedis = RekamMedis::create($validated);

        Pendaftaran::where('id', $validated['pendaftaran_id'])
            ->update(['status_antrean' => 'selesai']);

        return redirect()->route('rme.show', $rekamMedis->id)
            ->with('success', 'Rekam Medis Elektronik (SOAP) berhasil disinkronkan ke SatuSehat.');
    }
}`,
      'BorCalculatorService.php': `<?php

namespace App\Services;

class BorCalculatorService
{
    /**
     * Menghitung Indikator Efisiensi Rawat Inap (Depkes RI)
     */
    public function calculateMonthlyIndicators(
        int $totalTempatTidur,
        int $tempatTidurTerisi,
        int $jumlahHariPeriode = 30,
        int $pasienKeluar = 420
    ): array {
        $hariPerawatan = $tempatTidurTerisi * $jumlahHariPeriode;
        $bor = round(($hariPerawatan / ($totalTempatTidur * $jumlahHariPeriode)) * 100, 2);
        $alos = round($hariPerawatan / max(1, $pasienKeluar), 1);
        $toi = round((($totalTempatTidur * $jumlahHariPeriode) - $hariPerawatan) / max(1, $pasienKeluar), 1);
        $bto = round($pasienKeluar / max(1, $totalTempatTidur), 1);

        return [
            'total_tempat_tidur' => $totalTempatTidur,
            'tempat_tidur_terisi' => $tempatTidurTerisi,
            'bor_percentage' => $bor,
            'alos_days' => $alos,
            'toi_days' => $toi,
            'bto_times' => $bto,
        ];
    }
}`,
      'PksAsuransiController.php': `<?php

namespace App\Http\Controllers;

use App\Models\PksAsuransi;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PksAsuransiController extends Controller
{
    public function index()
    {
        return PksAsuransi::orderBy('tanggal_berakhir', 'asc')->get()->map(function ($pks) {
            $pks->sisa_hari = (int) Carbon::now()->diffInDays(Carbon::parse($pks->tanggal_berakhir), false);
            return $pks;
        });
    }
}`
    };

    let selectedFile = 'PendaftaranPasienController.php';

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="code" class="w-4 h-4 text-sky-500"></i>
              <span>${isEn ? "Laravel 11 MVC & Service Architecture Inspector" : "Arsitektur Kode Bersih Laravel 11 & Service Layer"}</span>
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              ${isEn ? "Inspect standard PSR-12 Laravel controllers, models, and domain services" : "Inspeksi file controller, migration, model Eloquent, dan service domain SIMRS asli"}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <a href="https://github.com/InfiniteNull/simrs-laravel" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center gap-1.5 transition">
              <i data-lucide="github" class="w-3.5 h-3.5"></i>
              <span>GitHub Repo ↗</span>
            </a>
            <button id="copyLaravelCodeBtn" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center gap-1.5 transition">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>${isEn ? "Copy" : "Salin"}</span>
            </button>
          </div>
        </div>

        <!-- File Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" id="laravelCodeFileTabs">
          ${Object.keys(codeFiles).map((file, idx) => `
            <button data-file="${file}" class="laravel-file-tab-btn ${idx === 0 ? 'active' : ''} px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition border">
              ${file}
            </button>
          `).join('')}
        </div>

        <!-- Code Block -->
        <pre class="bg-slate-950 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 shadow-inner max-h-[480px]"><code id="laravelCodeViewContent">${codeFiles[selectedFile]}</code></pre>

      </div>
    `;

    const codeView = container.querySelector('#laravelCodeViewContent');
    container.querySelectorAll('.laravel-file-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.laravel-file-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedFile = btn.dataset.file;
        codeView.textContent = codeFiles[selectedFile];
      });
    });

    container.querySelector('#copyLaravelCodeBtn').addEventListener('click', () => {
      navigator.clipboard.writeText(codeFiles[selectedFile]).then(() => {
        if (window.showToast) showToast(isEn ? "Laravel source code copied!" : "Kode sumber Laravel berhasil disalin!", "success");
      });
    });
  }

  // SOP / Manual Book Modal
  function showManualBookModal() {
    const isEn = window.currentLang === 'en';
    const modalContent = `
      <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
        <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200">
          <h4 class="font-bold text-sm mb-1">${isEn ? "SIMRS Standard Operating Procedure (SOP) & Manual Book" : "Manual Book & SOP Pengoperasian SIMRS (PT Abna / RS Layanan)"}</h4>
          <p>${isEn ? "Official guidance manual for hospital medical and administrative staff." : "Panduan operasional resmi untuk staf medis, rekam medis, dan administrasi rumah sakit."}</p>
        </div>

        <div class="space-y-3">
          <div>
            <h5 class="font-bold text-slate-900 dark:text-white mb-1">1. Alur Pelayanan Pendaftaran Pasien (Admisi)</h5>
            <p>Pasien baru diverifikasi NIK melalui form pendaftaran. Sistem otomatis menerbitkan Nomor Rekam Medis unik berformat <code>RM-YYYYMM-XXXX</code> dan kode antrean sesuai poli spesialis yang dituju.</p>
          </div>

          <div>
            <h5 class="font-bold text-slate-900 dark:text-white mb-1">2. Alur Pengisian Rekam Medis Elektronik (RME SOAP)</h5>
            <p>Dokter memeriksa tanda-tanda vital (TD, Nadi, Suhu, RR, SpO2), memasukkan anamnesis (S), menentukan kode diagnosis standar ICD-10 Kemenkes (A), serta menuliskan resep farmasi dan rencana kontrol lanjutan (P).</p>
          </div>

          <div>
            <h5 class="font-bold text-slate-900 dark:text-white mb-1">3. Pengawasan Masa Berlaku PKS Asuransi</h5>
            <p>Bagian Kerjasama Medis memantau kontrak PKS asuransi. Bila sisa hari $\le 60$ hari, sistem mengaktifkan alert kuning untuk segera menyusun draft perpanjangan addendum kontrak.</p>
          </div>

          <div>
            <h5 class="font-bold text-slate-900 dark:text-white mb-1">4. Evaluasi Indikator Efisiensi Tempat Tidur (BOR)</h5>
            <p>Manajemen rumah sakit mengevaluasi BOR bulanan dengan target ideal $60\% - 85\%$. Bila BOR $> 85\%$, direkomendasikan penambahan kapasitas tempat tidur atau percepatan discharge planning.</p>
          </div>
        </div>
      </div>
    `;

    // Show inside interviewModal or custom popup
    const interviewModal = document.getElementById('interviewModal');
    const content = document.getElementById('interviewModalContent');
    if (interviewModal && content) {
      content.innerHTML = modalContent;
      interviewModal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    } else {
      alert("Manual Book SIMRS: Silakan lihat tab Arsitektur Laravel & ERD.");
    }
  }

})();
