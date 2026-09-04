/**
 * simrs-laravel-suite.js - Sistem Informasi Manajemen Rumah Sakit (SIMRS)
 * Standar Arsitektur: Laravel 11 MVC + Service Layer + Clean Hospital Workflows
 * Modul: Admisi & BPJS SEP, RME SOAP, E-Order Lab, E-Prescribing Farmasi, Billing Kasir, Bed Matrix, PKS Asuransi, BOR
 */

(function () {
  'use strict';

  // In-Memory Hospital Relational Database
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
      { kode: 'VVIP-01', bangsal: 'Paviliun Garuda', kelas: 'VVIP', totalTT: 6, terisiTT: 5, tarif: 1500000, beds: [ { id: 'G-01', status: 'terisi', pasien: 'Bambang Sudarmono' }, { id: 'G-02', status: 'terisi', pasien: 'Iwan Setiawan' }, { id: 'G-03', status: 'terisi', pasien: 'Hj. Aminah' }, { id: 'G-04', status: 'terisi', pasien: 'Edy Rahmayadi' }, { id: 'G-05', status: 'terisi', pasien: 'dr. Johan' }, { id: 'G-06', status: 'kosong', pasien: '-' } ] },
      { kode: 'VIP-01', bangsal: 'Paviliun Cenderawasih', kelas: 'VIP', totalTT: 8, terisiTT: 6, tarif: 950000, beds: [ { id: 'C-01', status: 'terisi', pasien: 'Siti Nurhaliza' }, { id: 'C-02', status: 'terisi', pasien: 'Rudi Hermawan' }, { id: 'C-03', status: 'kosong', pasien: '-' }, { id: 'C-04', status: 'terisi', pasien: 'Dewi Lestari' }, { id: 'C-05', status: 'terisi', pasien: 'Ahmad Syafii' }, { id: 'C-06', status: 'sterilisasi', pasien: '-' }, { id: 'C-07', status: 'terisi', pasien: 'Megawati' }, { id: 'C-08', status: 'terisi', pasien: 'Gunawan' } ] },
      { kode: 'K1-MELATI', bangsal: 'Bangsal Melati (Kelas 1)', kelas: 'Kelas 1', totalTT: 10, terisiTT: 8, tarif: 500000, beds: [ { id: 'M-01', status: 'terisi', pasien: 'Syahrul' }, { id: 'M-02', status: 'terisi', pasien: 'Nurul' }, { id: 'M-03', status: 'terisi', pasien: 'Hendro' }, { id: 'M-04', status: 'kosong', pasien: '-' }, { id: 'M-05', status: 'terisi', pasien: 'Fadli' }, { id: 'M-06', status: 'terisi', pasien: 'Zulkifli' }, { id: 'M-07', status: 'kosong', pasien: '-' }, { id: 'M-08', status: 'terisi', pasien: 'Taufik' }, { id: 'M-09', status: 'terisi', pasien: 'Sri Mulyani' }, { id: 'M-10', status: 'terisi', pasien: 'Agus' } ] },
      { kode: 'ICU-CENTRAL', bangsal: 'Intensive Care Unit (ICU)', kelas: 'ICU', totalTT: 6, terisiTT: 4, tarif: 2000000, beds: [ { id: 'ICU-01', status: 'terisi', pasien: 'Kritis A' }, { id: 'ICU-02', status: 'terisi', pasien: 'Kritis B' }, { id: 'ICU-03', status: 'kosong', pasien: '-' }, { id: 'ICU-04', status: 'terisi', pasien: 'Kritis C' }, { id: 'ICU-05', status: 'terisi', pasien: 'Kritis D' }, { id: 'ICU-06', status: 'sterilisasi', pasien: '-' } ] }
    ],
    pasiens: [
      { noRm: 'RM-202609-0001', nik: '1271012304950001', nama: 'Bambang Sudarmono', jk: 'L', tglLahir: '1995-04-23', hp: '081265438899', alamat: 'Jl. Gatot Subroto No. 45, Medan', noBpjs: '0001928374651' },
      { noRm: 'RM-202609-0002', nik: '1271025508980003', nama: 'Siti Nurhaliza', jk: 'P', tglLahir: '1998-08-15', hp: '085277889900', alamat: 'Jl. Setia Budi No. 12B, Medan', noBpjs: '0002847591023' },
      { noRm: 'RM-202609-0003', nik: '1271031102920005', nama: 'Rudi Hermawan', jk: 'L', tglLahir: '1992-02-11', hp: '082166554433', alamat: 'Jl. Iskandar Muda No. 88, Medan', noBpjs: '-' }
    ],
    antreans: [
      { id: 1, nomorAntrean: 'P-001', kodeBooking: 'BK-20260905-01', noSep: 'SEP-1271R001-20260905-001', noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', dokter: 'dr. Hendra Wijaya, Sp.PD', poli: 'Poli Penyakit Dalam', tgl: '2026-09-05', jenis: 'Rawat Jalan', bayar: 'BPJS Kesehatan', status: 'selesai' },
      { id: 2, nomorAntrean: 'A-001', kodeBooking: 'BK-20260905-02', noSep: 'SEP-1271R001-20260905-002', noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', dokter: 'dr. Siti Rahmawati, Sp.A', poli: 'Poli Anak', tgl: '2026-09-05', jenis: 'Rawat Jalan', bayar: 'BPJS Kesehatan', status: 'sedang_dilayani' },
      { id: 3, nomorAntrean: 'B-001', kodeBooking: 'BK-20260905-03', noSep: '-', noRm: 'RM-202609-0003', nama: 'Rudi Hermawan', dokter: 'dr. Budi Santoso, Sp.B', poli: 'Poli Bedah', tgl: '2026-09-05', jenis: 'Rawat Jalan', bayar: 'Umum / Tunai', status: 'menunggu' }
    ],
    rekamMedisList: [
      {
        id: 1,
        noRm: 'RM-202609-0001',
        nama: 'Bambang Sudarmono',
        dokter: 'dr. Hendra Wijaya, Sp.PD',
        tglPeriksa: '2026-09-05 09:15',
        s: 'Keluhan pusing berputar sejak 3 hari, tengkuk tegang setelah jam kerja lembur. Riwayat hipertensi 2 tahun, pengobatan tidak teratur. Alergi obat: disangkal.',
        o: 'TD: 150/95 mmHg | HR: 84 x/mnt | RR: 20 x/mnt | T: 36.6 °C | SpO2: 99% | BB: 74 kg | TB: 168 cm',
        a_icd10: 'I10',
        a_diagnosis: 'Essential (primary) hypertension',
        p_tindakan: 'Pemeriksaan EKG 12 Lead dasar, Edukasi Diet Rendah Garam',
        tglKontrol: '2026-10-05'
      }
    ],
    labOrders: [
      { id: 1, noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', tes: 'Darah Lengkap (Hematologi Rutin)', loinc: '58410-2', hasil: 'Hb: 14.8 g/dL (N: 13.5-17.5), Leukosit: 7.200 /uL, Trombosit: 265.000 /uL', status: 'normal', tgl: '2026-09-05 09:30' },
      { id: 2, noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', tes: 'Glukosa Darah Sewaktu (GDS)', loinc: '2339-0', hasil: '118 mg/dL (N: < 140 mg/dL)', status: 'normal', tgl: '2026-09-05 09:35' },
      { id: 3, noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', tes: 'Widal Test (Typhoid)', loinc: '40958-1', hasil: 'Titer O: 1/320 (High), Titer H: 1/160', status: 'high', tgl: '2026-09-05 10:00' }
    ],
    prescriptions: [
      { id: 1, noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', obat: 'Amlodipine 10 mg tab', signa: 'S 1 dd tab 1 (pagi pc)', qty: 30, harga: 75000, status: 'diserahkan' },
      { id: 2, noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', obat: 'Candesartan 8 mg tab', signa: 'S 1 dd tab 1 (malam pc)', qty: 30, harga: 110000, status: 'diserahkan' },
      { id: 3, noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', obat: 'Cefixime 100 mg sirup', signa: 'S 2 dd cth 1 (pc)', qty: 1, harga: 45000, status: 'diracik' }
    ],
    billings: [
      {
        id: 1,
        invoice: 'INV/20260905/0001',
        noRm: 'RM-202609-0001',
        nama: 'Bambang Sudarmono',
        poli: 'Poli Penyakit Dalam',
        dokter: 150000,
        tindakan: 75000,
        obat: 185000,
        lab: 120000,
        kamar: 0,
        total: 530000,
        penjamin: 'BPJS Kesehatan',
        potongan: 530000,
        sisaBayar: 0,
        status: 'lunas',
        tgl: '2026-09-05 10:15'
      },
      {
        id: 2,
        invoice: 'INV/20260905/0002',
        noRm: 'RM-202609-0003',
        nama: 'Rudi Hermawan',
        poli: 'Poli Bedah',
        dokter: 150000,
        tindakan: 120000,
        obat: 95000,
        lab: 0,
        kamar: 0,
        total: 365000,
        penjamin: 'Umum / Tunai',
        potongan: 0,
        sisaBayar: 365000,
        status: 'pending',
        tgl: '2026-09-05 10:30'
      }
    ],
    pksList: [
      { id: 1, nomor: '001/PKS-RS/BPJS-KTR/2025', mitra: 'BPJS Kesehatan Kantor Cabang Utama', jenis: 'BPJS', mulai: '2025-01-01', akhir: '2026-12-31', pic: 'dr. Farida Hanum, M.Kes', kontak: '0811-9988-7766', status: 'aktif' },
      { id: 2, nomor: '089/PKS/ALLIANZ-MED/2025', mitra: 'PT Asuransi Allianz Life Indonesia', jenis: 'Asuransi Swasta', mulai: '2025-04-15', akhir: '2026-10-15', pic: 'Kevin Tan, AAIJ', kontak: '0812-3456-7890', status: 'aktif' },
      { id: 3, nomor: '045/PKS-CORP/PRU-HOSP/2024', mitra: 'PT Prudential Life Assurance', jenis: 'Asuransi Swasta', mulai: '2024-09-01', akhir: '2026-09-01', pic: 'Clara Novita, S.E.', kontak: '0813-8877-6655', status: 'evaluasi' }
    ],
    icd10: [
      { code: 'I10', name: 'Essential (primary) hypertension' },
      { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications' },
      { code: 'J06.9', name: 'Acute upper respiratory infection, unspecified (ISPA)' },
      { code: 'K29.7', name: 'Gastritis, unspecified' },
      { code: 'A09.9', name: 'Gastroenteritis and colitis of unspecified origin' },
      { code: 'M54.5', name: 'Low back pain' },
      { code: 'J45.9', name: 'Asthma, unspecified' },
      { code: 'I20.9', name: 'Angina pectoris, unspecified' }
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
      <div class="space-y-5">
        
        <!-- Header Section (Clean Technical Density) -->
        <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="space-y-1 max-w-3xl">
            <h2 class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="hospital" class="w-5 h-5 text-slate-700 dark:text-slate-300"></i>
              <span>SIMRS Core — Sistem Informasi Manajemen Rumah Sakit</span>
            </h2>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ${isEn 
                ? "Integrated hospital system covering admission & BPJS SEP bridging, electronic medical records (RME SOAP & ICD-10), E-Order Lab, E-Prescribing, billing cashier, bed management matrix, and inpatient indicators (BOR)."
                : "Sistem rumah sakit terintegrasi mencakup admisi & bridging BPJS SEP, rekam medis elektronik (RME SOAP & ICD-10), E-Order Lab, E-Resep Farmasi, Kasir Billing, visualisasi ranjang inap, dan indikator BOR."}
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <a href="https://github.com/InfiniteNull/simrs-laravel" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center gap-1.5 transition border border-slate-800 dark:border-slate-200 shadow-sm">
              <i data-lucide="github" class="w-3.5 h-3.5"></i>
              <span>GitHub Repo ↗</span>
            </a>
            <button id="btnOpenSimrsSop" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center gap-1.5 transition border border-slate-200 dark:border-slate-700">
              <i data-lucide="book-open" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>${isEn ? "SOP Guide" : "SOP & Alur"}</span>
            </button>
          </div>
        </div>

        <!-- Segmented Tab Navigation -->
        <div class="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px scrollbar-none" id="simrsSubTabs">
          <button data-tab="pendaftaran" class="simrs-tab-link ${currentTab === 'pendaftaran' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="clipboard-list" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "1. Admission & SEP" : "1. Admisi & BPJS SEP"}</span>
          </button>
          <button data-tab="rme" class="simrs-tab-link ${currentTab === 'rme' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="stethoscope" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "2. EMR SOAP" : "2. RME SOAP & Triage"}</span>
          </button>
          <button data-tab="lab" class="simrs-tab-link ${currentTab === 'lab' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "3. E-Order Lab" : "3. E-Order Lab"}</span>
          </button>
          <button data-tab="farmasi" class="simrs-tab-link ${currentTab === 'farmasi' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="pill" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "4. E-Prescribing" : "4. E-Resep Farmasi"}</span>
          </button>
          <button data-tab="billing" class="simrs-tab-link ${currentTab === 'billing' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="receipt" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "5. Cashier Billing" : "5. Kasir & Billing"}</span>
          </button>
          <button data-tab="bedmap" class="simrs-tab-link ${currentTab === 'bedmap' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "6. Bed Matrix Map" : "6. Denah Ranjang"}</span>
          </button>
          <button data-tab="bor" class="simrs-tab-link ${currentTab === 'bor' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="activity" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "7. BOR Indicators" : "7. Indikator BOR"}</span>
          </button>
          <button data-tab="code" class="simrs-tab-link ${currentTab === 'code' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="file-code" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "8. Laravel Source" : "8. Source Code"}</span>
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
    else if (currentTab === 'lab') renderLabTab(panel);
    else if (currentTab === 'farmasi') renderFarmasiTab(panel);
    else if (currentTab === 'billing') renderBillingTab(panel);
    else if (currentTab === 'bedmap') renderBedMapTab(panel);
    else if (currentTab === 'bor') renderBorTab(panel);
    else if (currentTab === 'code') renderCodeTab(panel);

    if (window.lucide) lucide.createIcons();
  }

  // =========================================================================
  // TAB 1: ADMISI & BPJS SEP BRIDGING
  // =========================================================================
  function renderPendaftaranTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Form Admisi & Bridging -->
        <div class="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "Admission & BPJS SEP Form" : "Admisi & Penerbitan SEP BPJS"}
            </h3>
            <span class="text-[10px] font-mono text-slate-500">Bridging V-Claim</span>
          </div>

          <form id="formAdmission" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">NIK (16 Digit) <span class="text-rose-500">*</span></label>
              <input type="text" id="admNik" maxlength="16" required placeholder="Contoh: 1271012304950001" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Pasien <span class="text-rose-500">*</span></label>
              <input type="text" id="admNama" required placeholder="Nama lengkap sesuai KTP" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Penjamin / Asuransi</label>
                <select id="admBayar" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                  <option value="BPJS Kesehatan">BPJS Kesehatan (V-Claim)</option>
                  <option value="Umum / Tunai">Umum / Tunai</option>
                  <option value="Allianz Life">Allianz Life</option>
                  <option value="Prudential">Prudential Assurance</option>
                </select>
              </div>
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">No Rujukan Faskes 1</label>
                <input type="text" id="admRujukan" placeholder="0123B0010926P0001" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Poliklinik Tujuan</label>
                <select id="admPoli" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                  ${DB.dokters.map(d => `<option value="${d.id}">${d.poli}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis Layanan</label>
                <select id="admJenis" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                  <option value="Rawat Jalan">Rawat Jalan</option>
                  <option value="Rawat Inap">Rawat Inap</option>
                  <option value="IGD 24 Jam">IGD 24 Jam</option>
                </select>
              </div>
            </div>

            <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 space-y-1">
              <div class="flex justify-between text-[11px]">
                <span>Sisa Kuota Dokter:</span>
                <span id="admQuotaText" class="font-mono font-bold text-slate-900 dark:text-white">12 / 30</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                <div id="admQuotaBar" class="bg-slate-900 dark:bg-slate-100 h-full transition-all duration-200" style="width: 40%"></div>
              </div>
            </div>

            <button type="submit" class="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm">
              ${isEn ? "Generate Queue & Issue SEP" : "Registrasi & Terbitkan SEP BPJS"}
            </button>
          </form>
        </div>

        <!-- Ticket / SEP Preview & Queue Table -->
        <div class="lg:col-span-7 space-y-4">
          
          <div id="cardIssuedTicket" class="hidden p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
              <span class="text-xs font-bold text-slate-900 dark:text-white">Surat Eligibilitas Peserta (SEP)</span>
              <span id="ticketSep" class="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">SEP-1271R001-20260905-99</span>
            </div>
            <div class="flex items-center gap-4 text-xs text-slate-700 dark:text-slate-300">
              <div class="text-center px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-500 font-mono">ANTREAN</span>
                <p id="ticketNum" class="text-2xl font-black font-mono text-slate-900 dark:text-white">P-019</p>
              </div>
              <div class="space-y-0.5">
                <p><span class="text-slate-500">Pasien:</span> <strong id="ticketName">-</strong> (<span id="ticketRm" class="font-mono">-</span>)</p>
                <p><span class="text-slate-500">Poliklinik:</span> <span id="ticketDoc">-</span></p>
                <p><span class="text-slate-500">Status SEP:</span> <span class="font-mono font-medium text-emerald-600 dark:text-emerald-400">TERVERIFIKASI BPJS V-CLAIM</span></p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ${isEn ? "Today's Patient Admissions" : "Daftar Registrasi Pasien Hari Ini"}
              </h4>
              <span class="text-xs font-mono text-slate-500">${DB.antreans.length} Kunjungan</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th class="py-2 px-2">Antrean</th>
                    <th class="py-2 px-2">No RM / Pasien</th>
                    <th class="py-2 px-2">Poli</th>
                    <th class="py-2 px-2">No SEP / Penjamin</th>
                    <th class="py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  ${DB.antreans.map(a => `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td class="py-2 px-2 font-mono font-bold text-slate-900 dark:text-white">${a.nomorAntrean}</td>
                      <td class="py-2 px-2">
                        <div class="font-semibold text-slate-900 dark:text-white">${a.nama}</div>
                        <div class="text-[10px] font-mono text-slate-500">${a.noRm}</div>
                      </td>
                      <td class="py-2 px-2">${a.poli}</td>
                      <td class="py-2 px-2">
                        <div class="font-mono text-[11px]">${a.bayar}</div>
                        <div class="text-[10px] font-mono text-slate-400">${a.noSep}</div>
                      </td>
                      <td class="py-2 px-2">
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
      const docId = parseInt(selPoli.value);
      const bayar = container.querySelector('#admBayar').value;
      const jenis = container.querySelector('#admJenis').value;

      const doc = DB.dokters.find(d => d.id === docId);
      doc.terisi += 1;

      let p = DB.pasiens.find(x => x.nik === nik);
      if (!p) {
        const rmNum = `RM-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(DB.pasiens.length + 1).padStart(4, '0')}`;
        p = { noRm: rmNum, nik, nama, jk: 'L', tglLahir: '1995-01-01', hp: '0812-xxxx-xxxx', alamat: 'Medan', noBpjs: '000192837465' };
        DB.pasiens.push(p);
      }

      const prefix = doc.spesialisasi.includes('Penyakit') ? 'P' : doc.spesialisasi.includes('Anak') ? 'A' : doc.spesialisasi.includes('Bedah') ? 'B' : doc.spesialisasi.includes('Jantung') ? 'J' : 'K';
      const qNum = `${prefix}-${String(doc.terisi).padStart(3, '0')}`;
      const bkCode = `BK-${Date.now().toString().slice(-8)}`;
      const sepCode = bayar.includes('BPJS') ? `SEP-1271R001-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(DB.antreans.length+1).padStart(3,'0')}` : '-';

      DB.antreans.unshift({
        id: DB.antreans.length + 1,
        nomorAntrean: qNum,
        kodeBooking: bkCode,
        noSep: sepCode,
        noRm: p.noRm,
        nama: p.nama,
        dokter: doc.nama,
        poli: doc.poli,
        tgl: new Date().toISOString().split('T')[0],
        jenis,
        bayar,
        status: 'menunggu'
      });

      renderPendaftaranTab(container);
      const ticketCard = container.querySelector('#cardIssuedTicket');
      if (ticketCard) {
        ticketCard.classList.remove('hidden');
        container.querySelector('#ticketSep').textContent = sepCode;
        container.querySelector('#ticketNum').textContent = qNum;
        container.querySelector('#ticketName').textContent = p.nama;
        container.querySelector('#ticketRm').textContent = p.noRm;
        container.querySelector('#ticketDoc').textContent = `${doc.poli} (${doc.nama})`;
      }

      if (window.showToast) showToast(isEn ? `Admission registered: ${qNum}` : `Registrasi selesai. No Antrean: ${qNum}`, 'success');
    });
  }

  // =========================================================================
  // TAB 2: REKAM MEDIS ELEKTRONIK (RME SOAP & TRIAGE)
  // =========================================================================
  function renderRmeTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "Clinical EMR SOAP Assessment" : "Pengisian Asesmen Medis SOAP"}
            </h3>
            <span class="text-[10px] font-mono text-slate-500">RME SOAP</span>
          </div>

          <form id="formRme" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Pasien Dari Antrean:</label>
              <select id="rmeSelectPatient" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.antreans.map(a => `<option value="${a.noRm}">${a.nomorAntrean} — ${a.nama} (${a.noRm})</option>`).join('')}
              </select>
            </div>

            <!-- Subjektif -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">S — Subjektif (Keluhan & Anamnesis)</label>
              <textarea id="inpS" rows="2" required class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">Nyeri ulu hati terasa panas perih sejak 2 hari, mual hilang timbul setelah makan pedas. Alergi obat disangkal.</textarea>
            </div>

            <!-- Objektif -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">O — Objektif (Tanda Vital & Fisik)</label>
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
              <label class="block font-bold text-slate-900 dark:text-white">A — Asesmen (Diagnosis ICD-10)</label>
              <select id="inpIcd" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.icd10.map(i => `<option value="${i.code}" ${i.code === 'K29.7' ? 'selected' : ''}>[${i.code}] ${i.name}</option>`).join('')}
              </select>
            </div>

            <!-- Plan -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">P — Plan (Tindakan & Rencana Edukasi)</label>
              <textarea id="inpP" rows="2" required class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">Pemeriksaan EKG 12 Lead dasar, edukasi pembatasan konsumsi makanan asam dan pedas, resepkan terapi obat di tab farmasi.</textarea>
            </div>

            <button type="submit" class="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm">
              ${isEn ? "Save Clinical Record" : "Simpan Asesmen RME"}
            </button>
          </form>
        </div>

        <!-- History List -->
        <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ${isEn ? "Electronic Medical Record History" : "Riwayat Rekam Medis (RME)"}
            </h4>
            <span class="text-xs font-mono text-slate-500">${DB.rekamMedisList.length} Asesmen</span>
          </div>

          <div class="space-y-2.5">
            ${DB.rekamMedisList.map(r => `
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div class="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-1">
                  <div>
                    <span class="font-bold text-slate-900 dark:text-white text-xs">${r.nama}</span>
                    <span class="text-[10px] font-mono text-slate-500 ml-1">(${r.noRm})</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    ICD-10: ${r.a_icd10}
                  </span>
                </div>

                <div class="text-[11px] text-slate-700 dark:text-slate-300 space-y-0.5">
                  <p><strong>Diagnosis:</strong> ${r.a_diagnosis}</p>
                  <p><strong>Objektif:</strong> <span class="font-mono text-slate-600 dark:text-slate-400">${r.o}</span></p>
                  <p><strong>Tindakan:</strong> ${r.p_tindakan}</p>
                </div>

                <div class="pt-1 text-[10px] text-slate-400 font-mono flex justify-between">
                  <span>Dokter: ${r.dokter}</span>
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
        p_tindakan: p,
        tglKontrol: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
      });

      const ant = DB.antreans.find(a => a.noRm === noRm);
      if (ant) ant.status = 'selesai';

      renderRmeTab(container);
      if (window.showToast) showToast(isEn ? "EMR record saved" : "Asesmen RME berhasil disimpan", "success");
    });
  }

  // =========================================================================
  // TAB 3: E-ORDER LABORATORIUM & HASIL
  // =========================================================================
  function renderLabTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <div class="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "Laboratory Test E-Order" : "Permintaan Uji Laboratorium"}
            </h3>
            <span class="text-[10px] font-mono text-slate-500">LOINC Code</span>
          </div>

          <form id="formLabOrder" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Pasien:</label>
              <select id="labSelectPatient" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.antreans.map(a => `<option value="${a.noRm}">${a.noRm} — ${a.nama}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Paket Pemeriksaan Diagnostik:</label>
              <select id="labSelectPackage" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                <option value="Darah Lengkap (Hematologi Rutin)|58410-2|Hb: 13.5-17.5 g/dL">Darah Lengkap (Hematologi Rutin) [58410-2]</option>
                <option value="Glukosa Darah Sewaktu (GDS)|2339-0|< 140 mg/dL">Glukosa Darah Sewaktu (GDS) [2339-0]</option>
                <option value="Fungsi Ginjal (Ureum & Kreatinin)|3094-0|Kreatinin: 0.7-1.3 mg/dL">Fungsi Ginjal (Ureum & Kreatinin) [3094-0]</option>
                <option value="Profil Lipid (Kolesterol Total, LDL, HDL, TG)|2093-3|Kolesterol: < 200 mg/dL">Profil Lipid (Kolesterol & Trigliserida) [2093-3]</option>
                <option value="Fungsi Hati (SGOT & SGPT)|1920-8|SGOT: < 35 U/L">Fungsi Hati (SGOT & SGPT) [1920-8]</option>
                <option value="Elektrolit Darah (Na, K, Cl)|2951-2|Natrium: 135-145 mEq/L">Elektrolit Darah (Na, K, Cl) [2951-2]</option>
              </select>
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Catatan Klinis / Indikasi:</label>
              <input type="text" id="labCatatan" placeholder="Evaluasi hipertensi / infeksi akut" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
            </div>

            <button type="submit" class="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm">
              ${isEn ? "Submit Lab Request" : "Kirim Permintaan ke Analis Lab"}
            </button>
          </form>
        </div>

        <div class="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ${isEn ? "Laboratory Results & Verification" : "Hasil Pemeriksaan Laboratorium"}
            </h4>
            <span class="text-xs font-mono text-slate-500">${DB.labOrders.length} Uji Tercatat</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th class="py-2 px-2">Pasien</th>
                  <th class="py-2 px-2">Pemeriksaan</th>
                  <th class="py-2 px-2">Nilai Hasil</th>
                  <th class="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                ${DB.labOrders.map(l => `
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td class="py-2.5 px-2">
                      <div class="font-semibold text-slate-900 dark:text-white">${l.nama}</div>
                      <div class="text-[10px] font-mono text-slate-500">${l.noRm}</div>
                    </td>
                    <td class="py-2.5 px-2">
                      <div>${l.tes}</div>
                      <div class="text-[10px] font-mono text-slate-400">LOINC: ${l.loinc}</div>
                    </td>
                    <td class="py-2.5 px-2 font-mono text-[11px]">${l.hasil}</td>
                    <td class="py-2.5 px-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                        l.status === 'normal' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                        'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                      }">
                        ${l.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    container.querySelector('#formLabOrder').addEventListener('submit', (e) => {
      e.preventDefault();
      const noRm = container.querySelector('#labSelectPatient').value;
      const pasien = DB.pasiens.find(p => p.noRm === noRm) || { nama: 'Pasien' };
      const rawPkg = container.querySelector('#labSelectPackage').value.split('|');
      const tesName = rawPkg[0];
      const loinc = rawPkg[1];
      const ref = rawPkg[2];

      DB.labOrders.unshift({
        id: DB.labOrders.length + 1,
        noRm,
        nama: pasien.nama,
        tes: tesName,
        loinc,
        hasil: `Hasil terverifikasi: Normal (${ref})`,
        status: 'normal',
        tgl: new Date().toISOString().replace('T', ' ').slice(0, 16)
      });

      renderLabTab(container);
      if (window.showToast) showToast(isEn ? "Lab request processed" : `Uji Lab ${tesName} berhasil diproses`, 'success');
    });
  }

  // =========================================================================
  // TAB 4: E-PRESCRIBING & FARMASI
  // =========================================================================
  function renderFarmasiTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <div class="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "E-Prescription Entry" : "Input Resep Obat Elektronik"}
            </h3>
            <span class="text-[10px] font-mono text-slate-500">Farmasi SIMRS</span>
          </div>

          <form id="formPrescription" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Pasien:</label>
              <select id="rxSelectPatient" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.antreans.map(a => `<option value="${a.noRm}">${a.noRm} — ${a.nama}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Obat & Sediaan:</label>
              <select id="rxSelectMed" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                <option value="Amlodipine 10 mg tab|2500|S 1 dd tab 1 (pagi pc)">Amlodipine 10 mg Tablet (@ Rp 2.500)</option>
                <option value="Candesartan 8 mg tab|3500|S 1 dd tab 1 (malam pc)">Candesartan 8 mg Tablet (@ Rp 3.500)</option>
                <option value="Metformin 500 mg tab|1500|S 3 dd tab 1 (dc bersama makan)">Metformin 500 mg Tablet (@ Rp 1.500)</option>
                <option value="Omeprazole 20 mg cap|4000|S 2 dd cap 1 (ac)">Omeprazole 20 mg Kapsul (@ Rp 4.000)</option>
                <option value="Cefixime 100 mg sirup|45000|S 2 dd cth 1 (pc)">Cefixime 100 mg Sirup 60 ml (@ Rp 45.000)</option>
                <option value="Paracetamol 500 mg tab|1000|S 3 dd tab 1 prn (demam/pusing)">Paracetamol 500 mg Tablet (@ Rp 1.000)</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Jumlah (Qty):</label>
                <input type="number" id="rxQty" value="30" min="1" max="100" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
              </div>
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Aturan Pakai (Signa):</label>
                <input type="text" id="rxSigna" value="S 1 dd tab 1 pc" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
              </div>
            </div>

            <button type="submit" class="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm">
              ${isEn ? "Add to Pharmacy Queue" : "Teruskan Resep ke Farmasi"}
            </button>
          </form>
        </div>

        <div class="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ${isEn ? "Dispensing & Prescription Status" : "Antrean Resep & Dispensing Obat"}
            </h4>
            <span class="text-xs font-mono text-slate-500">${DB.prescriptions.length} Resep Terbit</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th class="py-2 px-2">Pasien</th>
                  <th class="py-2 px-2">Obat & Dosis</th>
                  <th class="py-2 px-2">Qty</th>
                  <th class="py-2 px-2">Total Biaya</th>
                  <th class="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                ${DB.prescriptions.map(p => `
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td class="py-2.5 px-2">
                      <div class="font-semibold text-slate-900 dark:text-white">${p.nama}</div>
                      <div class="text-[10px] font-mono text-slate-500">${p.noRm}</div>
                    </td>
                    <td class="py-2.5 px-2">
                      <div class="font-semibold">${p.obat}</div>
                      <div class="text-[10px] font-mono text-slate-500">${p.signa}</div>
                    </td>
                    <td class="py-2.5 px-2 font-mono">${p.qty}</td>
                    <td class="py-2.5 px-2 font-mono">Rp ${p.harga.toLocaleString('id-ID')}</td>
                    <td class="py-2.5 px-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                        p.status === 'diserahkan' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                        'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      }">
                        ${p.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    const selMed = container.querySelector('#rxSelectMed');
    const inpSigna = container.querySelector('#rxSigna');
    selMed.addEventListener('change', () => {
      const parts = selMed.value.split('|');
      inpSigna.value = parts[2] || 'S 1 dd tab 1 pc';
    });

    container.querySelector('#formPrescription').addEventListener('submit', (e) => {
      e.preventDefault();
      const noRm = container.querySelector('#rxSelectPatient').value;
      const pasien = DB.pasiens.find(p => p.noRm === noRm) || { nama: 'Pasien' };
      const rawMed = selMed.value.split('|');
      const medName = rawMed[0];
      const price = parseFloat(rawMed[1]) || 2500;
      const qty = parseInt(container.querySelector('#rxQty').value) || 10;
      const signa = inpSigna.value;

      DB.prescriptions.unshift({
        id: DB.prescriptions.length + 1,
        noRm,
        nama: pasien.nama,
        obat: medName,
        signa,
        qty,
        harga: price * qty,
        status: 'diracik'
      });

      renderFarmasiTab(container);
      if (window.showToast) showToast(isEn ? "Prescription queued for pharmacy" : `Resep ${medName} berhasil dikirim ke Farmasi`, 'success');
    });
  }

  // =========================================================================
  // TAB 5: KASIR & BILLING PEMBAYARAN
  // =========================================================================
  function renderBillingTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="space-y-4">
        
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                ${isEn ? "Hospital Billing & Invoicing Cashier" : "Kasir & Rekonsiliasi Tagihan Rumah Sakit"}
              </h3>
              <p class="text-[11px] text-slate-500">Rincian biaya konsultasi, tindakan medis, farmasi, dan klaim penjamin</p>
            </div>

            <button id="btnGenerateNewInvoice" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center gap-1.5 transition">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>${isEn ? "Generate Invoice" : "Terbitkan Tagihan Baru"}</span>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th class="py-2 px-2.5">No Invoice</th>
                  <th class="py-2 px-2.5">Pasien / Poli</th>
                  <th class="py-2 px-2.5">Total Tagihan</th>
                  <th class="py-2 px-2.5">Penjamin / Asuransi</th>
                  <th class="py-2 px-2.5">Sisa Bayar Pasien</th>
                  <th class="py-2 px-2.5">Status</th>
                  <th class="py-2 px-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                ${DB.billings.map(b => `
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td class="py-2.5 px-2.5 font-mono font-bold text-slate-900 dark:text-white">${b.invoice}</td>
                    <td class="py-2.5 px-2.5">
                      <div class="font-semibold text-slate-900 dark:text-white">${b.nama}</div>
                      <div class="text-[10px] font-mono text-slate-500">${b.noRm} • ${b.poli}</div>
                    </td>
                    <td class="py-2.5 px-2.5 font-mono">Rp ${b.total.toLocaleString('id-ID')}</td>
                    <td class="py-2.5 px-2.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      <div>${b.penjamin}</div>
                      <div class="text-[10px] text-emerald-600 dark:text-emerald-400">Cover: Rp ${b.potongan.toLocaleString('id-ID')}</div>
                    </td>
                    <td class="py-2.5 px-2.5 font-mono font-bold text-slate-900 dark:text-white">Rp ${b.sisaBayar.toLocaleString('id-ID')}</td>
                    <td class="py-2.5 px-2.5">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                        b.status === 'lunas' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                        'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      }">
                        ${b.status.toUpperCase()}
                      </span>
                    </td>
                    <td class="py-2.5 px-2.5 text-right">
                      ${b.status === 'pending' ? `
                        <button onclick="window.simrsPayBilling(${b.id})" class="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-[11px] transition">
                          Pelunasan
                        </button>
                      ` : `
                        <button onclick="window.simrsPrintInvoice(${b.id})" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition border border-slate-200 dark:border-slate-700">
                          Kwitansi
                        </button>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    window.simrsPayBilling = function(id) {
      const b = DB.billings.find(x => x.id === id);
      if (!b) return;
      b.status = 'lunas';
      b.sisaBayar = 0;
      renderBillingTab(container);
      if (window.showToast) showToast(`Tagihan ${b.invoice} berhasil dilunasi!`, 'success');
    };

    window.simrsPrintInvoice = function(id) {
      const b = DB.billings.find(x => x.id === id);
      if (!b) return;
      alert(`KWITANSI PEMBAYARAN RESMI SIMRS\n\nNo Invoice: ${b.invoice}\nPasien: ${b.nama} (${b.noRm})\nTotal Tagihan: Rp ${b.total.toLocaleString('id-ID')}\nPenjamin: ${b.penjamin}\nStatus: LUNAS\n\nTerima kasih.`);
    };

    const btnGen = container.querySelector('#btnGenerateNewInvoice');
    if (btnGen) {
      btnGen.addEventListener('click', () => {
        const invNum = `INV/${new Date().toISOString().slice(0,10).replace(/-/g,'')}/${String(DB.billings.length + 1).padStart(4, '0')}`;
        DB.billings.unshift({
          id: DB.billings.length + 1,
          invoice: invNum,
          noRm: 'RM-202609-0002',
          nama: 'Siti Nurhaliza',
          poli: 'Poli Anak',
          dokter: 150000,
          tindakan: 50000,
          obat: 45000,
          lab: 120000,
          kamar: 0,
          total: 365000,
          penjamin: 'BPJS Kesehatan',
          potongan: 365000,
          sisaBayar: 0,
          status: 'lunas',
          tgl: new Date().toISOString().replace('T', ' ').slice(0, 16)
        });
        renderBillingTab(container);
        if (window.showToast) showToast(`Invoice ${invNum} diterbitkan!`, 'success');
      });
    }
  }

  // =========================================================================
  // TAB 6: DENAH RANJANG RAWAT INAP (BED MATRIX GRID)
  // =========================================================================
  function renderBedMapTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="space-y-4">
        
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                ${isEn ? "Inpatient Ward Bed Occupancy Matrix" : "Peta Alokasi Ranjang Rawat Inap"}
              </h3>
              <p class="text-[11px] text-slate-500">Visualisasi status kamar secara real-time (Kemenkes SIRS Online)</p>
            </div>

            <!-- Legend -->
            <div class="flex items-center gap-3 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-500 inline-block"></span> Kosong Siap Pakai</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-rose-500 inline-block"></span> Terisi Pasien</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-500 inline-block"></span> Sterilisasi / Dibersihkan</span>
            </div>
          </div>

          <!-- Ward Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${DB.kamars.map(k => `
              <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-bold text-slate-900 dark:text-white text-xs">${k.bangsal}</h4>
                    <span class="text-[10px] font-mono text-slate-500">Tarif: Rp ${k.tarif.toLocaleString('id-ID')} / hari</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    ${k.kelas}
                  </span>
                </div>

                <!-- Bed Blocks Grid -->
                <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  ${k.beds.map(b => `
                    <div onclick="window.simrsBedAction('${k.kode}', '${b.id}')" class="p-2 rounded border text-center cursor-pointer transition select-none ${
                      b.status === 'kosong' ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100' :
                      b.status === 'terisi' ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 hover:bg-rose-100' :
                      'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
                    }">
                      <div class="font-mono font-bold text-xs">${b.id}</div>
                      <div class="text-[9px] truncate font-medium mt-0.5">${b.status === 'terisi' ? b.pasien : b.status.toUpperCase()}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    window.simrsBedAction = function(wardCode, bedId) {
      const ward = DB.kamars.find(k => k.kode === wardCode);
      if (!ward) return;
      const bed = ward.beds.find(b => b.id === bedId);
      if (!bed) return;

      if (bed.status === 'kosong') {
        const name = prompt(`Admisi rawat inap ke Bed ${bedId}. Masukkan nama pasien:`, 'Pasien Baru');
        if (!name) return;
        bed.status = 'terisi';
        bed.pasien = name;
        ward.terisiTT += 1;
      } else if (bed.status === 'terisi') {
        if (confirm(`Discharge / Pasien ${bed.pasien} selesai rawat inap dari Bed ${bedId}?`)) {
          bed.status = 'sterilisasi';
          bed.pasien = '-';
          ward.terisiTT = Math.max(0, ward.terisiTT - 1);
        }
      } else {
        bed.status = 'kosong';
        bed.pasien = '-';
      }

      renderBedMapTab(container);
    };
  }

  // =========================================================================
  // TAB 7: INDIKATOR BARBER-JOHNSON & BOR
  // =========================================================================
  function renderBorTab(container) {
    const isEn = window.currentLang === 'en';

    const totalTT = DB.kamars.reduce((acc, k) => acc + k.totalTT, 0);
    const terisiTT = DB.kamars.reduce((acc, k) => acc + k.terisiTT, 0);
    const m = calculateHospitalBor(totalTT, terisiTT, 30, 420);

    container.innerHTML = `
      <div class="space-y-4">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>BOR (Bed Occupancy Rate)</span>
              <span class="font-mono">60-85%</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span id="txtBorVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.bor}%</span>
              <span id="txtBorBadge" class="px-2 py-0.5 rounded text-[10px] font-medium border ${m.statusClass}">${m.status}</span>
            </div>
            <p class="text-[10px] text-slate-500">Efisiensi hunian tempat tidur</p>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>ALOS (Length of Stay)</span>
              <span class="font-mono">3-6 Hari</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtAlosVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.alos}</span>
              <span class="text-xs text-slate-500">Hari</span>
            </div>
            <p class="text-[10px] text-slate-500">Rata-rata lama perawatan pasien</p>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>TOI (Turn Over Interval)</span>
              <span class="font-mono">1-3 Hari</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtToiVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.toi}</span>
              <span class="text-xs text-slate-500">Hari</span>
            </div>
            <p class="text-[10px] text-slate-500">Rata-rata hari ranjang kosong</p>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>BTO (Bed Turn Over)</span>
              <span class="font-mono">3-5x/bln</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtBtoVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.bto}</span>
              <span class="text-xs text-slate-500">Kali</span>
            </div>
            <p class="text-[10px] text-slate-500">Perputaran pemakaian bed</p>
          </div>
        </div>

        <!-- Simulator -->
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "Barber-Johnson Formula Sensitivity Simulator" : "Simulasi Sensitivitas Parameter Barber-Johnson"}
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div class="flex justify-between mb-1">
                <span>Total Tempat Tidur (A):</span>
                <span id="lblTt" class="font-mono font-bold">${totalTT} Bed</span>
              </div>
              <input type="range" id="rangeTt" min="20" max="150" value="${totalTT}" class="w-full accent-slate-900 dark:accent-slate-100 cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span>Tempat Tidur Terisi (O):</span>
                <span id="lblTerisi" class="font-mono font-bold">${terisiTT} Bed</span>
              </div>
              <input type="range" id="rangeTerisi" min="5" max="120" value="${terisiTT}" class="w-full accent-slate-900 dark:accent-slate-100 cursor-pointer" />
            </div>
          </div>
        </div>

      </div>
    `;

    const rTt = container.querySelector('#rangeTt');
    const rTerisi = container.querySelector('#rangeTerisi');

    function updateBorSim() {
      const tot = parseInt(rTt.value);
      const ter = Math.min(tot, parseInt(rTerisi.value));
      rTerisi.max = tot;

      container.querySelector('#lblTt').textContent = `${tot} Bed`;
      container.querySelector('#lblTerisi').textContent = `${ter} Bed`;

      const res = calculateHospitalBor(tot, ter, 30, 420);
      container.querySelector('#txtBorVal').textContent = `${res.bor}%`;
      container.querySelector('#txtBorBadge').textContent = res.status;
      container.querySelector('#txtBorBadge').className = `px-2 py-0.5 rounded text-[10px] font-medium border ${res.statusClass}`;
      container.querySelector('#txtAlosVal').textContent = res.alos;
      container.querySelector('#txtToiVal').textContent = res.toi;
      container.querySelector('#txtBtoVal').textContent = res.bto;
    }

    [rTt, rTerisi].forEach(el => el.addEventListener('input', updateBorSim));
  }

  // =========================================================================
  // TAB 8: LARAVEL ARCHITECTURE & CODE INSPECTOR
  // =========================================================================
  function renderCodeTab(container) {
    const isEn = window.currentLang === 'en';

    const files = {
      'BillingKasirController.php': `<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use App\Models\Pendaftaran;
use App\Services\BillingCalculatorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class BillingKasirController extends Controller
{
    public function __construct(
        protected BillingCalculatorService $billingService
    ) {}

    /**
     * Terbitkan Invoice Pembayaran & Rekonsiliasi Klaim BPJS.
     */
    public function generateInvoice(Pendaftaran $pendaftaran): RedirectResponse
    {
        $summary = $this->billingService->calculateTotalBilling($pendaftaran);

        $invoice = Billing::updateOrCreate(
            ['pendaftaran_id' => $pendaftaran->id],
            [
                'nomor_invoice' => 'INV/' . date('Ymd') . '/' . strtoupper(Str::random(6)),
                'biaya_konsultasi_dokter' => $summary['biaya_konsultasi_dokter'],
                'biaya_tindakan_medis' => $summary['biaya_tindakan_medis'],
                'biaya_obat_farmasi' => $summary['biaya_obat_farmasi'],
                'biaya_laboratorium' => $summary['biaya_laboratorium'],
                'biaya_kamar_rawat' => $summary['biaya_kamar_rawat'],
                'total_tagihan' => $summary['total_tagihan'],
                'potongan_asuransi_bpjs' => $summary['potongan_penjamin'],
                'sisa_bayar_pasien' => $summary['sisa_bayar_pasien'],
                'metode_pembayaran' => $pendaftaran->metode_pembayaran,
                'status_pembayaran' => $summary['status_lunas'] ? 'lunas' : 'pending',
                'waktu_pembayaran' => $summary['status_lunas'] ? now() : null,
            ]
        );

        return redirect()->route('billing.show', $invoice->id);
    }
}`,
      'LaboratoriumController.php': `<?php

namespace App\Http\Controllers;

use App\Models\Laboratorium;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LaboratoriumController extends Controller
{
    /**
     * Input Permintaan Uji Diagnostik (E-Order Lab).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pendaftaran_id' => ['required', 'exists:pendaftarans,id'],
            'nama_pemeriksaan' => ['required', 'string', 'max:255'],
            'kode_loinc' => ['required', 'string', 'max:20'],
            'nilai_rujukan' => ['required', 'string', 'max:50'],
            'satuan' => ['required', 'string', 'max:20'],
        ]);

        $validated['status_pemeriksaan'] = 'requested';
        Laboratorium::create($validated);

        return redirect()->back()->with('success', 'Permintaan laboratorium dikirim.');
    }
}`,
      'ResepFarmasiController.php': `<?php

namespace App\Http\Controllers;

use App\Models\Resep;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ResepFarmasiController extends Controller
{
    /**
     * Input Resep Elektronik (E-Prescribing).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pendaftaran_id' => ['required', 'exists:pendaftarans,id'],
            'nama_obat' => ['required', 'string', 'max:255'],
            'bentuk_sediaan' => ['required', 'string', 'max:50'],
            'jumlah' => ['required', 'integer', 'min:1'],
            'aturan_pakai_latin' => ['required', 'string', 'max:100'],
            'harga_satuan' => ['required', 'numeric', 'min:0'],
        ]);

        $validated['total_harga'] = $validated['jumlah'] * $validated['harga_satuan'];
        $validated['status_dispensing'] = 'antre';
        Resep::create($validated);

        return redirect()->back()->with('success', 'Resep diteruskan ke Farmasi.');
    }
}`,
      'BorCalculatorService.php': `<?php

namespace App\Services;

class BorCalculatorService
{
    /**
     * Perhitungan Indikator Barber-Johnson Rawat Inap (Depkes RI)
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
}`
    };

    let selected = 'BillingKasirController.php';

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
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
    const content = `
      <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
        <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium border border-slate-200 dark:border-slate-700">
          Standar Operasional Prosedur (SOP) Alur Pelayanan Rumah Sakit (SIMRS)
        </div>
        <div class="space-y-2">
          <p><strong>1. Admisi & Validasi BPJS:</strong> Pasien mendaftar, sistem memvalidasi NIK dan menerbitkan Nomor Antrean serta Surat Eligibilitas Peserta (SEP).</p>
          <p><strong>2. Pelayanan Poliklinik & RME SOAP:</strong> Dokter mencatat anamnesis (S), tanda vital (O), diagnosis ICD-10 (A), serta menerbitkan order lab dan e-resep farmasi (P).</p>
          <p><strong>3. Laboratorium & Farmasi:</strong> Analis memvalidasi hasil lab; Farmasi menelaah interaksi obat dan melakukan dispensing.</p>
          <p><strong>4. Kasir & Billing:</strong> Sistem menghitung akumulasi biaya layanan dan mengklaim tanggungan BPJS / asuransi swasta sebelum menerbitkan kwitansi resmi.</p>
          <p><strong>5. Rawat Inap & BOR:</strong> Alokasi ranjang kamar rawat inap dipantau secara visual dan indikator efisiensi dianalisis bulanan.</p>
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
