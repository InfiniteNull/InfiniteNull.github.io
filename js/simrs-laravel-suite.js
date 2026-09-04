/**
 * simrs-laravel-suite.js - Sistem Informasi Manajemen Rumah Sakit (SIMRS)
 * Standar Arsitektur: Laravel 11 MVC + Service Layer + Permenkes No. 24/2022 (RME SatuSehat)
 * Didesain untuk kebutuhan operasional rumah sakit modern
 */

(function () {
  'use strict';

  // Master In-Memory Database (Realistic Hospital Data)
  const DB = {
    dokters: [
      { id: 1, nip: '198501122010011002', nama: 'dr. Hendra Wijaya, Sp.PD', spesialisasi: 'Penyakit Dalam', poli: 'Poli Penyakit Dalam', sip: '503/SIP/012/DPMPTSP/2023', kuota: 30, terisi: 18, jadwal: 'Senin - Kamis (08:00 - 13:00)' },
      { id: 2, nip: '198804222014022001', nama: 'dr. Siti Rahmawati, Sp.A', spesialisasi: 'Kesehatan Anak', poli: 'Poli Anak', sip: '503/SIP/045/DPMPTSP/2023', kuota: 35, terisi: 22, jadwal: 'Senin - Sabtu (09:00 - 14:00)' },
      { id: 3, nip: '197911052006041003', nama: 'dr. Budi Santoso, Sp.B', spesialisasi: 'Bedah Umum', poli: 'Poli Bedah', sip: '503/SIP/088/DPMPTSP/2022', kuota: 20, terisi: 14, jadwal: 'Selasa & Kamis (10:00 - 15:00)' },
      { id: 4, nip: '198207192009032004', nama: 'dr. Maya Kusuma, Sp.JP', spesialisasi: 'Jantung & Pembuluh Darah', poli: 'Poli Jantung', sip: '503/SIP/103/DPMPTSP/2024', kuota: 25, terisi: 19, jadwal: 'Senin, Rabu, Jumat (08:30 - 12:30)' },
      { id: 5, nip: '199010152018011005', nama: 'dr. Ahmad Fauzi, Sp.M', spesialisasi: 'Mata', poli: 'Poli Mata', sip: '503/SIP/142/DPMPTSP/2024', kuota: 30, terisi: 12, jadwal: 'Senin - Jumat (08:00 - 12:00)' },
      { id: 6, nip: '198603082012122002', nama: 'dr. Anita Larasati, Sp.S', spesialisasi: 'Neurologi / Saraf', poli: 'Poli Saraf', sip: '503/SIP/177/DPMPTSP/2023', kuota: 25, terisi: 15, jadwal: 'Rabu & Jumat (09:00 - 13:00)' }
    ],
    kamars: [
      { kode: 'VVIP-01', bangsal: 'Paviliun Garuda', kelas: 'VVIP', totalTT: 6, terisiTT: 5, tarif: 1500000 },
      { kode: 'VIP-01', bangsal: 'Paviliun Cenderawasih', kelas: 'VIP', totalTT: 16, terisiTT: 13, tarif: 950000 },
      { kode: 'K1-MELATI', bangsal: 'Bangsal Melati', kelas: 'Kelas 1', totalTT: 28, terisiTT: 22, tarif: 500000 },
      { kode: 'K2-MAWAR', bangsal: 'Bangsal Mawar', kelas: 'Kelas 2', totalTT: 36, terisiTT: 29, tarif: 300000 },
      { kode: 'K3-ANGGREK', bangsal: 'Bangsal Anggrek', kelas: 'Kelas 3', totalTT: 50, terisiTT: 42, tarif: 150000 },
      { kode: 'ICU-CENTRAL', bangsal: 'Intensive Care Unit (ICU)', kelas: 'ICU', totalTT: 12, terisiTT: 9, tarif: 2000000 }
    ],
    pksList: [
      { id: 1, nomor: '001/PKS-RS/BPJS-KTR/2025', mitra: 'BPJS Kesehatan Kantor Cabang Utama', jenis: 'BPJS', mulai: '2025-01-01', akhir: '2026-12-31', pic: 'dr. Farida Hanum, M.Kes', kontak: '0811-9988-7766', status: 'aktif', cakupan: 'Rawat Jalan, Rawat Inap, IGD, Farmasi PRB' },
      { id: 2, nomor: '089/PKS/ALLIANZ-MED/2025', mitra: 'PT Asuransi Allianz Life Indonesia', jenis: 'Asuransi Swasta', mulai: '2025-04-15', akhir: '2026-10-15', pic: 'Kevin Tan, AAIJ', kontak: '0812-3456-7890', status: 'aktif', cakupan: 'Rawat Inap Cashless, VIP Upgrade, Operasi' },
      { id: 3, nomor: '045/PKS-CORP/PRU-HOSP/2024', mitra: 'PT Prudential Life Assurance', jenis: 'Asuransi Swasta', mulai: '2024-09-01', akhir: '2026-09-01', pic: 'Clara Novita, S.E.', kontak: '0813-8877-6655', status: 'evaluasi', cakupan: 'Rawat Inap, Rawat Jalan Lanjutan' },
      { id: 4, nomor: '112/PKS/SINARMAS-MSIG/2025', mitra: 'PT Asuransi Sinarmas', jenis: 'Asuransi Swasta', mulai: '2025-06-01', akhir: '2027-06-01', pic: 'Ahmad Fauzi', kontak: '0852-1122-3344', status: 'aktif', cakupan: 'Semua Layanan Medis & Medical Checkup' },
      { id: 5, nomor: '022/PKS/BPJS-TK/2025', mitra: 'BPJS Ketenagakerjaan (Pusat Layanan Kecelakaan Kerja)', jenis: 'BPJS', mulai: '2025-02-01', akhir: '2026-09-28', pic: 'Bambang Irawan', kontak: '0812-9900-1122', status: 'aktif', cakupan: 'Trauma Center IGD, Operasi Orthopedi, Rehab Medik' }
    ],
    pasiens: [
      { noRm: 'RM-202609-0001', nik: '1271012304950001', nama: 'Bambang Sudarmono', jk: 'L', tglLahir: '1995-04-23', hp: '081265438899', alamat: 'Jl. Gatot Subroto No. 45, Medan', goldar: 'O' },
      { noRm: 'RM-202609-0002', nik: '1271025508980003', nama: 'Siti Nurhaliza', jk: 'P', tglLahir: '1998-08-15', hp: '085277889900', alamat: 'Jl. Setia Budi No. 12B, Medan', goldar: 'A' },
      { noRm: 'RM-202609-0003', nik: '1271031102920005', nama: 'Rudi Hermawan', jk: 'L', tglLahir: '1992-02-11', hp: '082166554433', alamat: 'Jl. Iskandar Muda No. 88, Medan', goldar: 'B' }
    ],
    antreans: [
      { id: 1, nomorAntrean: 'P-001', kodeBooking: 'BK-20260905-01', noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', dokter: 'dr. Hendra Wijaya, Sp.PD', poli: 'Poli Penyakit Dalam', tgl: '2026-09-05', jenis: 'Rawat Jalan', bayar: 'BPJS Kesehatan', status: 'selesai' },
      { id: 2, nomorAntrean: 'A-001', kodeBooking: 'BK-20260905-02', noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', dokter: 'dr. Siti Rahmawati, Sp.A', poli: 'Poli Anak', tgl: '2026-09-05', jenis: 'Rawat Jalan', bayar: 'Umum / Tunai', status: 'sedang_dilayani' },
      { id: 3, nomorAntrean: 'B-001', kodeBooking: 'BK-20260905-03', noRm: 'RM-202609-0003', nama: 'Rudi Hermawan', dokter: 'dr. Budi Santoso, Sp.B', poli: 'Poli Bedah', tgl: '2026-09-05', jenis: 'Rawat Jalan', bayar: 'Allianz Life', status: 'menunggu' }
    ],
    rekamMedisList: [
      {
        id: 1,
        noRm: 'RM-202609-0001',
        nama: 'Bambang Sudarmono',
        dokter: 'dr. Hendra Wijaya, Sp.PD',
        tglPeriksa: '2026-09-05 09:15',
        s: 'Keluhan pusing berputar sejak 3 hari, tengkuk tegang setelah jam kerja lembur. Riwayat hipertensi 2 tahun, pengobatan tidak teratur. Alergi obat: disangkal.',
        o: 'TD: 150/95 mmHg | HR: 84 x/mnt | RR: 20 x/mnt | T: 36.6 °C | SpO2: 99% | BB: 74 kg | TB: 168 cm (BMI: 26.2 - Overweight). Cor/Pulmo dalam batas normal.',
        a_icd10: 'I10',
        a_diagnosis: 'Essential (primary) hypertension',
        p_tindakan: 'Pemeriksaan EKG 12 Lead, Edukasi Diet Rendah Garam (DASH diet)',
        p_resep: 'R/ Amlodipine tab 10 mg No. XXX | S 1 dd tab 1 (pagi pc)\nR/ Candesartan tab 8 mg No. XXX | S 1 dd tab 1 (malam pc)\nR/ Paracetamol tab 500 mg No. X | S 3 dd tab 1 prn (jika pusing)',
        p_edukasi: 'Kurangi asupan garam natrium < 2000 mg/hari, batasi kopi, jalan santai 30 menit minimal 3x seminggu.',
        tglKontrol: '2026-10-05'
      }
    ],
    icd10: [
      { code: 'I10', name: 'Essential (primary) hypertension' },
      { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications' },
      { code: 'J06.9', name: 'Acute upper respiratory infection, unspecified (ISPA)' },
      { code: 'K29.7', name: 'Gastritis, unspecified' },
      { code: 'A09.9', name: 'Gastroenteritis and colitis of unspecified origin' },
      { code: 'M54.5', name: 'Low back pain' },
      { code: 'J45.9', name: 'Asthma, unspecified' },
      { code: 'I20.9', name: 'Angina pectoris, unspecified' },
      { code: 'K21.9', name: 'Gastro-esophageal reflux disease without esophagitis (GERD)' },
      { code: 'R50.9', name: 'Fever, unspecified' }
    ]
  };

  let currentTab = 'pendaftaran';

  function calculateHospitalBor(totalTT, terisiTT, hariPeriode, pasienKeluar) {
    totalTT = Math.max(1, totalTT);
    pasienKeluar = Math.max(1, pasienKeluar);
    hariPeriode = Math.max(1, hariPeriode);
    const hariPerawatan = terisiTT * hariPeriode;
    const bor = ((hariPerawatan / (totalTT * hariPeriode)) * 100).toFixed(1);
    const alos = (hariPerawatan / pasienKeluar).toFixed(1);
    const toi = (((totalTT * hariPeriode) - hariPerawatan) / pasienKeluar).toFixed(1);
    const bto = (pasienKeluar / totalTT).toFixed(1);

    let status = 'Efisien (60-85%)';
    let statusClass = 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800';
    if (bor < 60) {
      status = 'Rendah (<60%)';
      statusClass = 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800';
    } else if (bor > 85) {
      status = 'Kelebihan Beban (>85%)';
      statusClass = 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800';
    }

    return { bor, alos, toi, bto, hariPerawatan, status, statusClass };
  }

  function getDaysRemaining(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  }

  // Master Render
  window.renderSimrsSuite = function (container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Hospital Header Summary (Clean Technical Density) -->
        <div class="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div class="space-y-1.5 max-w-3xl">
              <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="hospital" class="w-5 h-5 text-slate-700 dark:text-slate-300"></i>
                <span>SIMRS Core — Sistem Informasi Manajemen Rumah Sakit</span>
              </h2>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                ${isEn 
                  ? "Standard hospital information management architecture covering patient admission, electronic medical records (RME SOAP & ICD-10), healthcare insurance (PKS) tracking, and inpatient Bed Occupancy Rate (BOR) indicators."
                  : "Arsitektur pengelolaan sistem rumah sakit mencakup admisi pendaftaran online, rekam medis elektronik (RME SOAP & ICD-10), pelacakan kontrak kerjasama asuransi (PKS), dan indikator rawat inap (BOR/ALOS/TOI/BTO)."}
              </p>
            </div>

            <div class="flex items-center gap-2.5 shrink-0">
              <a href="https://github.com/InfiniteNull/simrs-laravel" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center gap-2 transition shadow-sm border border-slate-800 dark:border-slate-200">
                <i data-lucide="github" class="w-4 h-4"></i>
                <span>${isEn ? "GitHub Repository ↗" : "Repositori GitHub ↗"}</span>
              </a>
              <button id="btnOpenSimrsSop" class="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center gap-1.5 transition border border-slate-200 dark:border-slate-700">
                <i data-lucide="book-open" class="w-3.5 h-3.5 text-slate-500"></i>
                <span>${isEn ? "SOP & Workflow" : "SOP & Alur SIMRS"}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Segmented Tab Navigation -->
        <div class="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px scrollbar-none" id="simrsSubTabs">
          <button data-tab="pendaftaran" class="simrs-tab-link ${currentTab === 'pendaftaran' ? 'active' : ''} px-4 py-2.5 text-xs font-semibold rounded-t-lg transition flex items-center gap-2">
            <i data-lucide="clipboard-list" class="w-4 h-4"></i>
            <span>${isEn ? "1. Admission & Queue" : "1. Pendaftaran & Antrean"}</span>
          </button>
          <button data-tab="rme" class="simrs-tab-link ${currentTab === 'rme' ? 'active' : ''} px-4 py-2.5 text-xs font-semibold rounded-t-lg transition flex items-center gap-2">
            <i data-lucide="stethoscope" class="w-4 h-4"></i>
            <span>${isEn ? "2. EMR SOAP & ICD-10" : "2. RME SOAP & ICD-10"}</span>
          </button>
          <button data-tab="pks" class="simrs-tab-link ${currentTab === 'pks' ? 'active' : ''} px-4 py-2.5 text-xs font-semibold rounded-t-lg transition flex items-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4"></i>
            <span>${isEn ? "3. Insurance PKS Tracking" : "3. Monitoring PKS Asuransi"}</span>
          </button>
          <button data-tab="bor" class="simrs-tab-link ${currentTab === 'bor' ? 'active' : ''} px-4 py-2.5 text-xs font-semibold rounded-t-lg transition flex items-center gap-2">
            <i data-lucide="activity" class="w-4 h-4"></i>
            <span>${isEn ? "4. BOR Inpatient Indicators" : "4. Indikator Rawat Inap (BOR)"}</span>
          </button>
          <button data-tab="code" class="simrs-tab-link ${currentTab === 'code' ? 'active' : ''} px-4 py-2.5 text-xs font-semibold rounded-t-lg transition flex items-center gap-2">
            <i data-lucide="file-code" class="w-4 h-4"></i>
            <span>${isEn ? "5. Laravel Source & Architecture" : "5. Arsitektur & Source Code"}</span>
          </button>
        </div>

        <!-- Active Tab Container -->
        <div id="simrsTabPanel" class="min-h-[420px]"></div>

      </div>
    `;

    // Tab switcher events
    container.querySelectorAll('.simrs-tab-link').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTab = btn.dataset.tab;
        container.querySelectorAll('.simrs-tab-link').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderActiveTab();
      });
    });

    const btnSop = container.querySelector('#btnOpenSimrsSop');
    if (btnSop) {
      btnSop.addEventListener('click', openSopModal);
    }

    renderActiveTab();
    if (window.lucide) lucide.createIcons();
  };

  function renderActiveTab() {
    const panel = document.getElementById('simrsTabPanel');
    if (!panel) return;

    if (currentTab === 'pendaftaran') renderPendaftaranTab(panel);
    else if (currentTab === 'rme') renderRmeTab(panel);
    else if (currentTab === 'pks') renderPksTab(panel);
    else if (currentTab === 'bor') renderBorTab(panel);
    else if (currentTab === 'code') renderCodeTab(panel);

    if (window.lucide) lucide.createIcons();
  }

  // =========================================================================
  // TAB 1: PENDAFTARAN & ANTREAN POLIKLINIK
  // =========================================================================
  function renderPendaftaranTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Registration Form -->
        <div class="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "Outpatient Admission Form" : "Form Admisi Rawat Jalan"}
            </h3>
            <span class="text-[10px] font-mono text-slate-500">Bridging SIMRS</span>
          </div>

          <form id="formAdmission" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">NIK (16 Digit) <span class="text-rose-500">*</span></label>
              <input type="text" id="admNik" maxlength="16" required placeholder="Contoh: 1271012304950001" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Pasien <span class="text-rose-500">*</span></label>
              <input type="text" id="admNama" required placeholder="Nama lengkap sesuai identitas" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis Kelamin</label>
                <select id="admJk" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Tanggal Lahir</label>
                <input type="date" id="admTglLahir" value="1995-04-23" required class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Poliklinik Tujuan</label>
                <select id="admPoli" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                  ${DB.dokters.map(d => `<option value="${d.id}">${d.poli} — ${d.nama}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Penjamin / Pembayaran</label>
                <select id="admBayar" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                  <option value="BPJS Kesehatan">BPJS Kesehatan (V-Claim)</option>
                  <option value="Umum / Tunai">Umum / Tunai</option>
                  <option value="Allianz Life">Allianz Life</option>
                  <option value="Prudential">Prudential Assurance</option>
                  <option value="Sinarmas">Asuransi Sinarmas</option>
                </select>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 space-y-1">
              <div class="flex justify-between text-[11px]">
                <span>Sisa Kuota Dokter Hari Ini:</span>
                <span id="admQuotaText" class="font-mono font-bold text-slate-900 dark:text-white">12 / 30</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div id="admQuotaBar" class="bg-slate-900 dark:bg-slate-100 h-full transition-all duration-200" style="width: 40%"></div>
              </div>
            </div>

            <button type="submit" class="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm">
              ${isEn ? "Generate Queue Ticket & Register" : "Terbitkan Tiket Antrean"}
            </button>
          </form>
        </div>

        <!-- Queue Table & Ticket -->
        <div class="lg:col-span-7 space-y-4">
          
          <div id="cardIssuedTicket" class="hidden p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
              <span class="text-xs font-bold text-slate-900 dark:text-white">Bukti Registrasi Admisi</span>
              <span id="ticketCode" class="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">BK-20260905-01</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-center px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-500 font-mono">NOMOR ANTREAN</span>
                <p id="ticketNum" class="text-2xl font-black font-mono text-slate-900 dark:text-white">P-019</p>
              </div>
              <div class="text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                <p><span class="text-slate-500">Pasien:</span> <strong id="ticketName">-</strong> (<span id="ticketRm" class="font-mono">-</span>)</p>
                <p><span class="text-slate-500">Dokter:</span> <span id="ticketDoc">-</span></p>
                <p><span class="text-slate-500">Estimasi Pelayanan:</span> <span class="font-mono font-medium">09:30 - 10:00 WIB</span></p>
              </div>
            </div>
          </div>

          <!-- Table Antrean -->
          <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ${isEn ? "Active In-Person & Online Queue" : "Daftar Antrean Pelayanan Hari Ini"}
              </h4>
              <span class="text-xs font-mono text-slate-500">${DB.antreans.length} Pasien Terdaftar</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th class="py-2 px-2.5">Antrean</th>
                    <th class="py-2 px-2.5">No RM / Nama Pasien</th>
                    <th class="py-2 px-2.5">Poli & Dokter</th>
                    <th class="py-2 px-2.5">Penjamin</th>
                    <th class="py-2 px-2.5">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  ${DB.antreans.map(a => `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td class="py-2.5 px-2.5 font-mono font-bold text-slate-900 dark:text-white">${a.nomorAntrean}</td>
                      <td class="py-2.5 px-2.5">
                        <div class="font-semibold text-slate-900 dark:text-white">${a.nama}</div>
                        <div class="text-[10px] font-mono text-slate-500">${a.noRm}</div>
                      </td>
                      <td class="py-2.5 px-2.5">
                        <div>${a.poli}</div>
                        <div class="text-[10px] text-slate-500">${a.dokter}</div>
                      </td>
                      <td class="py-2.5 px-2.5 font-mono text-[11px]">${a.bayar}</td>
                      <td class="py-2.5 px-2.5">
                        <span class="px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          a.status === 'selesai' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' :
                          a.status === 'sedang_dilayani' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-bold' :
                          'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
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

    const selPoli = container.querySelector('#admPoli');
    const quotaText = container.querySelector('#admQuotaText');
    const quotaBar = container.querySelector('#admQuotaBar');

    function updateQuotaDisplay() {
      const doc = DB.dokters.find(d => d.id === parseInt(selPoli.value)) || DB.dokters[0];
      const sisa = Math.max(0, doc.kuota - doc.terisi);
      const pct = Math.round((doc.terisi / doc.kuota) * 100);
      quotaText.textContent = `${sisa} / ${doc.kuota} Tersisa`;
      quotaBar.style.width = `${pct}%`;
    }
    selPoli.addEventListener('change', updateQuotaDisplay);
    updateQuotaDisplay();

    container.querySelector('#formAdmission').addEventListener('submit', (e) => {
      e.preventDefault();
      const nik = container.querySelector('#admNik').value.trim();
      const nama = container.querySelector('#admNama').value.trim();
      const jk = container.querySelector('#admJk').value;
      const tglLahir = container.querySelector('#admTglLahir').value;
      const docId = parseInt(selPoli.value);
      const bayar = container.querySelector('#admBayar').value;

      const doc = DB.dokters.find(d => d.id === docId);
      doc.terisi += 1;

      let p = DB.pasiens.find(x => x.nik === nik);
      if (!p) {
        const rmNum = `RM-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(DB.pasiens.length + 1).padStart(4, '0')}`;
        p = { noRm: rmNum, nik, nama, jk, tglLahir, hp: '0812-xxxx-xxxx', alamat: 'Medan', goldar: 'O' };
        DB.pasiens.push(p);
      }

      const prefix = doc.spesialisasi.includes('Penyakit') ? 'P' : doc.spesialisasi.includes('Anak') ? 'A' : doc.spesialisasi.includes('Bedah') ? 'B' : doc.spesialisasi.includes('Jantung') ? 'J' : 'K';
      const qNum = `${prefix}-${String(doc.terisi).padStart(3, '0')}`;
      const bkCode = `BK-${Date.now().toString().slice(-8)}`;

      DB.antreans.unshift({
        id: DB.antreans.length + 1,
        nomorAntrean: qNum,
        kodeBooking: bkCode,
        noRm: p.noRm,
        nama: p.nama,
        dokter: doc.nama,
        poli: doc.poli,
        tgl: new Date().toISOString().split('T')[0],
        jenis: 'Rawat Jalan',
        bayar,
        status: 'menunggu'
      });

      renderPendaftaranTab(container);
      const ticketCard = container.querySelector('#cardIssuedTicket');
      if (ticketCard) {
        ticketCard.classList.remove('hidden');
        container.querySelector('#ticketCode').textContent = bkCode;
        container.querySelector('#ticketNum').textContent = qNum;
        container.querySelector('#ticketName').textContent = p.nama;
        container.querySelector('#ticketRm').textContent = p.noRm;
        container.querySelector('#ticketDoc').textContent = `${doc.poli} (${doc.nama})`;
      }

      if (window.showToast) {
        showToast(isEn ? `Queue generated: ${qNum}` : `Nomor antrean berhasil diterbitkan: ${qNum}`, 'success');
      }
    });
  }

  // =========================================================================
  // TAB 2: REKAM MEDIS ELEKTRONIK (RME SOAP & ICD-10)
  // =========================================================================
  function renderRmeTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Form SOAP -->
        <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "Clinical EMR SOAP Assessment" : "Pengisian Asesmen Medis SOAP"}
            </h3>
            <span class="text-[10px] font-mono text-slate-500">RME SOAP</span>
          </div>

          <form id="formRme" class="space-y-3.5 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Pasien Dari Antrean:</label>
              <select id="rmeSelectPatient" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.antreans.map(a => `<option value="${a.noRm}">${a.nomorAntrean} — ${a.nama} (${a.noRm})</option>`).join('')}
              </select>
            </div>

            <!-- Subjektif -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">
                S — Subjektif (Anamnesis / Keluhan Utama / RPS)
              </label>
              <textarea id="inpS" rows="2" required class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">Nyeri ulu hati terasa panas perih sejak 2 hari, mual hilang timbul setelah makan pedas dan asam. Alergi obat disangkal.</textarea>
            </div>

            <!-- Objektif -->
            <div class="space-y-1.5">
              <label class="block font-bold text-slate-900 dark:text-white">
                O — Objektif (Tanda Vital & Pemeriksaan Fisik)
              </label>
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <span class="text-[10px] text-slate-500">TD (mmHg)</span>
                  <input type="text" id="inpTd" value="120/80" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">HR (x/mnt)</span>
                  <input type="number" id="inpHr" value="78" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">Suhu (°C)</span>
                  <input type="text" id="inpT" value="36.5" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">RR (x/mnt)</span>
                  <input type="number" id="inpRr" value="18" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">BB (kg)</span>
                  <input type="number" id="inpBb" value="62" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">SpO2 (%)</span>
                  <input type="number" id="inpSpo2" value="99" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs" />
                </div>
              </div>
            </div>

            <!-- Asesmen ICD-10 -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">
                A — Asesmen (Diagnosis ICD-10 Standar WHO)
              </label>
              <select id="inpIcd" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.icd10.map(i => `<option value="${i.code}" ${i.code === 'K29.7' ? 'selected' : ''}>[${i.code}] ${i.name}</option>`).join('')}
              </select>
            </div>

            <!-- Plan -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">
                P — Plan (Resep Farmasi, Tindakan, & Rencana Kontrol)
              </label>
              <textarea id="inpP" rows="2" required class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono focus:ring-1 focus:ring-slate-400 focus:outline-none">R/ Omeprazole cap 20 mg No. XIV | S 2 dd cap 1 (ac)
R/ Antasida Doen tab No. X | S 3 dd tab 1 (ac kunyah)
R/ Sukralfat suspensi 100 ml No. I | S 3 dd C 1 (ac)</textarea>
            </div>

            <button type="submit" class="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm">
              ${isEn ? "Save Clinical Record & Finalize" : "Simpan Asesmen RME & Sinkron SatuSehat"}
            </button>
          </form>
        </div>

        <!-- History List -->
        <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ${isEn ? "Electronic Medical Record Archive" : "Arsip Rekam Medis Elektronik (RME)"}
            </h4>
            <span class="text-xs font-mono text-slate-500">${DB.rekamMedisList.length} Entri</span>
          </div>

          <div class="space-y-3">
            ${DB.rekamMedisList.map(r => `
              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div class="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-1.5">
                  <div>
                    <span class="font-bold text-slate-900 dark:text-white text-xs">${r.nama}</span>
                    <span class="text-[10px] font-mono text-slate-500 ml-1">(${r.noRm})</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    ICD-10: ${r.a_icd10}
                  </span>
                </div>

                <div class="text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                  <p><strong>Diagnosis:</strong> ${r.a_diagnosis}</p>
                  <p><strong>Objektif:</strong> <span class="font-mono text-slate-600 dark:text-slate-400">${r.o}</span></p>
                  <p><strong>Terapi:</strong> <span class="font-mono whitespace-pre-line text-slate-800 dark:text-slate-200">${r.p_resep}</span></p>
                </div>

                <div class="pt-1 text-[10px] text-slate-400 font-mono flex justify-between">
                  <span>Pemeriksa: ${r.dokter}</span>
                  <span>${r.tglPeriksa}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    container.querySelector('#formRme').addEventListener('submit', (e) => {
      e.preventDefault();
      const noRm = container.querySelector('#rmeSelectPatient').value;
      const pasien = DB.pasiens.find(p => p.noRm === noRm) || { nama: 'Pasien' };
      const s = container.querySelector('#inpS').value;
      const td = container.querySelector('#inpTd').value;
      const hr = container.querySelector('#inpHr').value;
      const t = container.querySelector('#inpT').value;
      const rr = container.querySelector('#inpRr').value;
      const bb = container.querySelector('#inpBb').value;
      const spo2 = container.querySelector('#inpSpo2').value;
      const icdCode = container.querySelector('#inpIcd').value;
      const icdObj = DB.icd10.find(i => i.code === icdCode) || { name: 'Diagnosis Klinis' };
      const p = container.querySelector('#inpP').value;

      DB.rekamMedisList.unshift({
        id: DB.rekamMedisList.length + 1,
        noRm,
        nama: pasien.nama,
        dokter: 'dr. Hendra Wijaya, Sp.PD',
        tglPeriksa: new Date().toISOString().replace('T', ' ').slice(0, 16),
        s,
        o: `TD: ${td} mmHg | HR: ${hr} x/mnt | T: ${t} °C | RR: ${rr} x/mnt | BB: ${bb} kg | SpO2: ${spo2}%`,
        a_icd10: icdCode,
        a_diagnosis: icdObj.name,
        p_tindakan: 'Pemeriksaan Rutin Rawat Jalan',
        p_resep: p,
        p_edukasi: 'Edukasi kepatuhan minum obat dan diet sehat.',
        tglKontrol: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
      });

      const ant = DB.antreans.find(a => a.noRm === noRm);
      if (ant) ant.status = 'selesai';

      renderRmeTab(container);
      if (window.showToast) {
        showToast(isEn ? "EMR SOAP successfully recorded!" : "Rekam Medis (RME SOAP) berhasil disimpan!", "success");
      }
    });
  }

  // =========================================================================
  // TAB 3: MONITORING PKS ASURANSI
  // =========================================================================
  function renderPksTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="space-y-4">
        
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-[10px] font-mono text-slate-500 uppercase">Total Kontrak PKS</span>
            <p class="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">${DB.pksList.length}</p>
          </div>
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase">PKS Aktif (> 60 Hari)</span>
            <p class="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              ${DB.pksList.filter(p => getDaysRemaining(p.akhir) > 60).length}
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase">Warning (<= 60 Hari)</span>
            <p class="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5">
              ${DB.pksList.filter(p => { const d = getDaysRemaining(p.akhir); return d > 0 && d <= 60; }).length}
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase">Kadaluarsa / Addendum</span>
            <p class="text-xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-0.5">
              ${DB.pksList.filter(p => getDaysRemaining(p.akhir) <= 0).length}
            </p>
          </div>
        </div>

        <!-- PKS Table -->
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                ${isEn ? "Healthcare Insurance Partnership Agreements (PKS)" : "Perjanjian Kerjasama (PKS) Asuransi & Korporasi"}
              </h3>
              <p class="text-[11px] text-slate-500">Pelacakan masa berlaku kontrak kerjasama rumah sakit</p>
            </div>

            <button id="btnAddNewPks" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center gap-1.5 transition">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>${isEn ? "New Contract" : "Tambah PKS"}</span>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th class="py-2 px-2.5">Nomor PKS</th>
                  <th class="py-2 px-2.5">Mitra Kerjasama</th>
                  <th class="py-2 px-2.5">Periode Kontrak</th>
                  <th class="py-2 px-2.5">Sisa Waktu</th>
                  <th class="py-2 px-2.5">Status</th>
                  <th class="py-2 px-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                ${DB.pksList.map(p => {
                  const sisa = getDaysRemaining(p.akhir);
                  let statusHtml = '';
                  let sisaHtml = '';

                  if (sisa <= 0) {
                    statusHtml = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">EXPIRED</span>';
                    sisaHtml = `<span class="font-mono text-rose-600 dark:text-rose-400 font-semibold">Habis ${Math.abs(sisa)} hari lalu</span>`;
                  } else if (sisa <= 60) {
                    statusHtml = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">WARNING</span>';
                    sisaHtml = `<span class="font-mono text-amber-600 dark:text-amber-400 font-semibold">${sisa} Hari</span>`;
                  } else {
                    statusHtml = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">AKTIF</span>';
                    sisaHtml = `<span class="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">${sisa} Hari</span>`;
                  }

                  return `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td class="py-2.5 px-2.5 font-mono font-semibold text-slate-900 dark:text-white">${p.nomor}</td>
                      <td class="py-2.5 px-2.5">
                        <div class="font-semibold text-slate-900 dark:text-white">${p.mitra}</div>
                        <div class="text-[10px] text-slate-500">PIC: ${p.pic} (${p.kontak})</div>
                      </td>
                      <td class="py-2.5 px-2.5 font-mono text-[11px]">${p.mulai} s/d ${p.akhir}</td>
                      <td class="py-2.5 px-2.5">${sisaHtml}</td>
                      <td class="py-2.5 px-2.5">${statusHtml}</td>
                      <td class="py-2.5 px-2.5 text-right">
                        <button onclick="window.simrsExtendPks(${p.id})" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-medium text-[11px] text-slate-700 dark:text-slate-200 transition border border-slate-200 dark:border-slate-700">
                          Addendum
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

    window.simrsExtendPks = function(id) {
      const p = DB.pksList.find(x => x.id === id);
      if (!p) return;
      const nextY = new Date();
      nextY.setFullYear(nextY.getFullYear() + 1);
      p.akhir = nextY.toISOString().split('T')[0];
      p.status = 'aktif';
      p.nomor = `${p.nomor}/ADD-${new Date().getFullYear()}`;
      renderPksTab(container);
      if (window.showToast) {
        showToast(`Addendum PKS ${p.mitra} diperpanjang hingga ${p.akhir}`, 'success');
      }
    };

    const btnAdd = container.querySelector('#btnAddNewPks');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        const mitra = prompt('Masukkan Nama Perusahaan / Asuransi Mitra:');
        if (!mitra) return;
        const nomor = `PKS/${Date.now().toString().slice(-4)}/RS/${new Date().getFullYear()}`;
        const tglMulai = new Date().toISOString().split('T')[0];
        const nextDate = new Date();
        nextDate.setFullYear(nextDate.getFullYear() + 2);

        DB.pksList.push({
          id: DB.pksList.length + 1,
          nomor,
          mitra,
          jenis: 'Asuransi Swasta',
          mulai: tglMulai,
          akhir: nextDate.toISOString().split('T')[0],
          pic: 'Account Executive',
          kontak: '0812-xxxx-xxxx',
          status: 'aktif',
          cakupan: 'Rawat Inap & Rawat Jalan'
        });

        renderPksTab(container);
        if (window.showToast) showToast(`PKS ${mitra} berhasil ditambahkan!`, 'success');
      });
    }
  }

  // =========================================================================
  // TAB 4: INDIKATOR RAWAT INAP (BOR, ALOS, TOI, BTO)
  // =========================================================================
  function renderBorTab(container) {
    const isEn = window.currentLang === 'en';

    const totalTT = DB.kamars.reduce((acc, k) => acc + k.totalTT, 0);
    const terisiTT = DB.kamars.reduce((acc, k) => acc + k.terisiTT, 0);
    const m = calculateHospitalBor(totalTT, terisiTT, 30, 420);

    container.innerHTML = `
      <div class="space-y-4">
        
        <!-- Indicator Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>BOR (Bed Occupancy Rate)</span>
              <span class="font-mono">Standar: 60-85%</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span id="txtBorVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.bor}%</span>
              <span id="txtBorBadge" class="px-2 py-0.5 rounded text-[10px] font-medium border ${m.statusClass}">${m.status}</span>
            </div>
            <p class="text-[10px] text-slate-500">Persentase pemakaian tempat tidur rawat inap</p>
          </div>

          <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>ALOS (Length of Stay)</span>
              <span class="font-mono">Standar: 3-6 Hari</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtAlosVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.alos}</span>
              <span class="text-xs text-slate-500">Hari</span>
            </div>
            <p class="text-[10px] text-slate-500">Rata-rata lama perawatan pasien</p>
          </div>

          <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>TOI (Turn Over Interval)</span>
              <span class="font-mono">Standar: 1-3 Hari</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtToiVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.toi}</span>
              <span class="text-xs text-slate-500">Hari</span>
            </div>
            <p class="text-[10px] text-slate-500">Rata-rata hari tempat tidur kosong</p>
          </div>

          <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>BTO (Bed Turn Over)</span>
              <span class="font-mono">Standar: 3-5x/bln</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtBtoVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.bto}</span>
              <span class="text-xs text-slate-500">Kali</span>
            </div>
            <p class="text-[10px] text-slate-500">Frekuensi pemakaian tempat tidur</p>
          </div>

        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          <!-- Interactive Simulator -->
          <div class="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                ${isEn ? "Barber-Johnson Formula Simulator" : "Simulasi Parameter Barber-Johnson"}
              </h3>
              <p class="text-[11px] text-slate-500">Uji sensitivitas indikator efisiensi rawat inap</p>
            </div>

            <div class="space-y-3.5 text-xs">
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-slate-700 dark:text-slate-300">Tempat Tidur Siap Pakai (A):</span>
                  <span id="lblTt" class="font-mono font-bold text-slate-900 dark:text-white">${totalTT} Bed</span>
                </div>
                <input type="range" id="rangeTt" min="50" max="300" value="${totalTT}" class="w-full accent-slate-900 dark:accent-slate-100 cursor-pointer" />
              </div>

              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-slate-700 dark:text-slate-300">Tempat Tidur Terisi (O):</span>
                  <span id="lblTerisi" class="font-mono font-bold text-slate-900 dark:text-white">${terisiTT} Bed</span>
                </div>
                <input type="range" id="rangeTerisi" min="10" max="250" value="${terisiTT}" class="w-full accent-slate-900 dark:accent-slate-100 cursor-pointer" />
              </div>

              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-slate-700 dark:text-slate-300">Hari Periode Analisis (t):</span>
                  <span id="lblHari" class="font-mono font-bold text-slate-900 dark:text-white">30 Hari</span>
                </div>
                <input type="range" id="rangeHari" min="7" max="365" value="30" class="w-full accent-slate-900 dark:accent-slate-100 cursor-pointer" />
              </div>

              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-slate-700 dark:text-slate-300">Pasien Keluar Hidup/Mati (D):</span>
                  <span id="lblKeluar" class="font-mono font-bold text-slate-900 dark:text-white">420 Orang</span>
                </div>
                <input type="range" id="rangeKeluar" min="50" max="1000" value="420" class="w-full accent-slate-900 dark:accent-slate-100 cursor-pointer" />
              </div>
            </div>

            <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              $$\\text{BOR} = \\frac{\\text{HP}}{\\text{A} \\times \\text{t}} \\times 100\\% = \\frac{${m.hariPerawatan}}{${totalTT} \\times 30} \\times 100\\% = ${m.bor}\\%$$
            </div>
          </div>

          <!-- Ward Bed Table -->
          <div class="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div class="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                ${isEn ? "Ward Bed Occupancy & Tariff" : "Ketersediaan Bed Per Ruang Rawat"}
              </h3>
              <span class="text-xs font-mono text-slate-500">SIRS Online Kemenkes</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th class="py-2 px-2">Bangsal</th>
                    <th class="py-2 px-2">Kelas</th>
                    <th class="py-2 px-2 text-center">Total Bed</th>
                    <th class="py-2 px-2 text-center">Terisi</th>
                    <th class="py-2 px-2 text-center">Kosong</th>
                    <th class="py-2 px-2 text-right">BOR</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  ${DB.kamars.map(k => {
                    const borBangsal = Math.round((k.terisiTT / k.totalTT) * 100);
                    return `
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td class="py-2.5 px-2 font-semibold text-slate-900 dark:text-white">${k.bangsal}</td>
                        <td class="py-2.5 px-2 font-mono text-[11px] text-slate-500">${k.kelas}</td>
                        <td class="py-2.5 px-2 text-center font-mono">${k.totalTT}</td>
                        <td class="py-2.5 px-2 text-center font-mono font-semibold">${k.terisiTT}</td>
                        <td class="py-2.5 px-2 text-center font-mono text-emerald-600 dark:text-emerald-400 font-semibold">${k.totalTT - k.terisiTT}</td>
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

    const rTt = container.querySelector('#rangeTt');
    const rTerisi = container.querySelector('#rangeTerisi');
    const rHari = container.querySelector('#rangeHari');
    const rKeluar = container.querySelector('#rangeKeluar');

    function updateBorSim() {
      const tot = parseInt(rTt.value);
      const ter = Math.min(tot, parseInt(rTerisi.value));
      rTerisi.max = tot;
      const h = parseInt(rHari.value);
      const kel = parseInt(rKeluar.value);

      container.querySelector('#lblTt').textContent = `${tot} Bed`;
      container.querySelector('#lblTerisi').textContent = `${ter} Bed`;
      container.querySelector('#lblHari').textContent = `${h} Hari`;
      container.querySelector('#lblKeluar').textContent = `${kel} Orang`;

      const res = calculateHospitalBor(tot, ter, h, kel);
      container.querySelector('#txtBorVal').textContent = `${res.bor}%`;
      container.querySelector('#txtBorBadge').textContent = res.status;
      container.querySelector('#txtBorBadge').className = `px-2 py-0.5 rounded text-[10px] font-medium border ${res.statusClass}`;
      container.querySelector('#txtAlosVal').textContent = res.alos;
      container.querySelector('#txtToiVal').textContent = res.toi;
      container.querySelector('#txtBtoVal').textContent = res.bto;
    }

    [rTt, rTerisi, rHari, rKeluar].forEach(el => el.addEventListener('input', updateBorSim));
  }

  // =========================================================================
  // TAB 5: LARAVEL ARCHITECTURE & CODE INSPECTOR
  // =========================================================================
  function renderCodeTab(container) {
    const isEn = window.currentLang === 'en';

    const files = {
      'PendaftaranPasienController.php': `<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Pendaftaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PendaftaranPasienController extends Controller
{
    /**
     * Registrasi Admisi Pasien & Penerbitan Nomor Antrean Poli.
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
            ->with('success', "Nomor Antrean: {$nomorAntrean}");
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
     * Simpan Asesmen Rekam Medis Elektronik (RME SOAP Permenkes No. 24/2022).
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
            ->with('success', 'RME SOAP tersimpan & disinkronkan.');
    }
}`,
      'BorCalculatorService.php': `<?php

namespace App\Services;

class BorCalculatorService
{
    /**
     * Hitung Indikator Barber-Johnson Rawat Inap (Depkes RI)
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

class PksAsuransiController extends Controller
{
    /**
     * Monitoring Masa Berlaku PKS Asuransi & Perusahaan.
     */
    public function index()
    {
        return PksAsuransi::orderBy('tanggal_berakhir', 'asc')->get()->map(function ($pks) {
            $pks->sisa_hari = (int) Carbon::now()->diffInDays(Carbon::parse($pks->tanggal_berakhir), false);
            return $pks;
        });
    }
}`
    };

    let selected = 'PendaftaranPasienController.php';

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "Laravel 11 Backend Code Inspector" : "Inspeksi Kode Sumber Laravel 11 Backend"}
            </h3>
            <p class="text-[11px] text-slate-500">Standar PSR-12, Strict Types, Service Layer, & Form Request Validation</p>
          </div>

          <div class="flex items-center gap-2">
            <a href="https://github.com/InfiniteNull/simrs-laravel" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center gap-1.5 transition">
              <i data-lucide="github" class="w-3.5 h-3.5"></i>
              <span>GitHub ↗</span>
            </a>
            <button id="btnCopyLaravelCode" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center gap-1.5 transition border border-slate-200 dark:border-slate-700">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>${isEn ? "Copy" : "Salin"}</span>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          ${Object.keys(files).map((f, i) => `
            <button data-file="${f}" class="laravel-code-file-btn ${i === 0 ? 'active' : ''} px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition">
              ${f}
            </button>
          `).join('')}
        </div>

        <pre class="bg-slate-950 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 shadow-inner max-h-[460px]"><code id="codeViewerBox">${files[selected]}</code></pre>

      </div>
    `;

    const codeBox = container.querySelector('#codeViewerBox');
    container.querySelectorAll('.laravel-code-file-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.laravel-code-file-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selected = btn.dataset.file;
        codeBox.textContent = files[selected];
      });
    });

    container.querySelector('#btnCopyLaravelCode').addEventListener('click', () => {
      navigator.clipboard.writeText(files[selected]).then(() => {
        if (window.showToast) showToast(isEn ? "Code copied!" : "Kode berhasil disalin!", "success");
      });
    });
  }

  function openSopModal() {
    const isEn = window.currentLang === 'en';
    const content = `
      <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
        <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium border border-slate-200 dark:border-slate-700">
          Standar Operasional Prosedur (SOP) Sistem Informasi Manajemen Rumah Sakit (SIMRS)
        </div>
        <div class="space-y-2.5">
          <p><strong>1. Admisi & Registrasi:</strong> Pasien mendaftar secara mandiri/online atau onsite. Sistem memvalidasi NIK, menerbitkan No RM berformat <code>RM-YYYYMM-XXXX</code>, dan mengalokasikan kuota dokter spesialis.</p>
          <p><strong>2. Pelayanan Rekam Medis (RME):</strong> Dokter menginput asesmen SOAP sesuai Permenkes No. 24/2022. Kode diagnosis wajib mengacu pada ICD-10 WHO untuk keperluan klaim BPJS & integrasi SatuSehat.</p>
          <p><strong>3. Pengawasan PKS Asuransi:</strong> Kontrak kerjasama asuransi yang memiliki sisa masa berlaku $\le 60$ hari memicu notifikasi peringatan untuk proses addendum perpanjangan.</p>
          <p><strong>4. Evaluasi BOR (Barber-Johnson):</strong> BOR bulanan dianalisis dengan rentang standar ideal Kemenkes $60\% - 85\%$.</p>
        </div>
      </div>
    `;

    const interviewModal = document.getElementById('interviewModal');
    const modalContent = document.getElementById('interviewModalContent');
    if (interviewModal && modalContent) {
      modalContent.innerHTML = content;
      interviewModal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
  }

})();
