/**
 * simrs-laravel-suite.js - Sistem Informasi Manajemen Rumah Sakit (SIMRS)
 * Standar Arsitektur: Laravel 11 MVC + Service Layer + Clean Hospital Workflows
 * Modul: Admisi & BPJS SEP, RME SOAP & Triage, E-Order Lab (LOINC), E-Prescribing,
 *        Kasir Billing & Kwitansi, Bed Matrix Grid, Indikator BOR, SatuSehat FHIR, Laravel Inspector.
 */

(function () {
  'use strict';

  // =========================================================================
  // IN-MEMORY RELATIONAL DATABASE & STATE MANAGEMENT
  // =========================================================================
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
      {
        kode: 'VVIP-01',
        bangsal: 'Paviliun Garuda',
        kelas: 'VVIP',
        totalTT: 6,
        terisiTT: 4,
        tarif: 1500000,
        beds: [
          { id: 'G-01', status: 'terisi', noRm: 'RM-202609-0001', pasien: 'Bambang Sudarmono', tglMasuk: '2026-09-03', days: 2 },
          { id: 'G-02', status: 'terisi', noRm: 'RM-202609-0004', pasien: 'Hj. Aminah Nasution', tglMasuk: '2026-09-02', days: 3 },
          { id: 'G-03', status: 'terisi', noRm: 'RM-202609-0005', pasien: 'Edy Rahmayadi', tglMasuk: '2026-09-04', days: 1 },
          { id: 'G-04', status: 'terisi', noRm: 'RM-202609-0006', pasien: 'dr. Johan Tarigan', tglMasuk: '2026-09-01', days: 4 },
          { id: 'G-05', status: 'kosong', noRm: '', pasien: '-', tglMasuk: '-', days: 0 },
          { id: 'G-06', status: 'kosong', noRm: '', pasien: '-', tglMasuk: '-', days: 0 }
        ]
      },
      {
        kode: 'VIP-01',
        bangsal: 'Paviliun Cenderawasih',
        kelas: 'VIP',
        totalTT: 8,
        terisiTT: 5,
        tarif: 950000,
        beds: [
          { id: 'C-01', status: 'terisi', noRm: 'RM-202609-0002', pasien: 'Siti Nurhaliza', tglMasuk: '2026-09-04', days: 1 },
          { id: 'C-02', status: 'terisi', noRm: 'RM-202609-0003', pasien: 'Rudi Hermawan', tglMasuk: '2026-09-03', days: 2 },
          { id: 'C-03', status: 'kosong', noRm: '', pasien: '-', tglMasuk: '-', days: 0 },
          { id: 'C-04', status: 'terisi', noRm: '', pasien: 'Dewi Lestari', tglMasuk: '2026-09-04', days: 1 },
          { id: 'C-05', status: 'terisi', noRm: '', pasien: 'Ahmad Syafii', tglMasuk: '2026-09-03', days: 2 },
          { id: 'C-06', status: 'sterilisasi', noRm: '', pasien: '-', tglMasuk: '-', days: 0 },
          { id: 'C-07', status: 'terisi', noRm: '', pasien: 'Gunawan Prasetyo', tglMasuk: '2026-09-02', days: 3 },
          { id: 'C-08', status: 'kosong', noRm: '', pasien: '-', tglMasuk: '-', days: 0 }
        ]
      },
      {
        kode: 'K1-MELATI',
        bangsal: 'Bangsal Melati',
        kelas: 'Kelas 1',
        totalTT: 10,
        terisiTT: 7,
        tarif: 500000,
        beds: [
          { id: 'M-01', status: 'terisi', noRm: '', pasien: 'Syahrul Efendi', tglMasuk: '2026-09-01', days: 4 },
          { id: 'M-02', status: 'terisi', noRm: '', pasien: 'Nurul Hidayah', tglMasuk: '2026-09-02', days: 3 },
          { id: 'M-03', status: 'terisi', noRm: '', pasien: 'Hendro Siswanto', tglMasuk: '2026-09-04', days: 1 },
          { id: 'M-04', status: 'kosong', noRm: '', pasien: '-', tglMasuk: '-', days: 0 },
          { id: 'M-05', status: 'terisi', noRm: '', pasien: 'Fadli Zon', tglMasuk: '2026-09-03', days: 2 },
          { id: 'M-06', status: 'terisi', noRm: '', pasien: 'Zulkifli Hasan', tglMasuk: '2026-09-02', days: 3 },
          { id: 'M-07', status: 'kosong', noRm: '', pasien: '-', tglMasuk: '-', days: 0 },
          { id: 'M-08', status: 'terisi', noRm: '', pasien: 'Taufik Hidayat', tglMasuk: '2026-09-03', days: 2 },
          { id: 'M-09', status: 'terisi', noRm: '', pasien: 'Sri Mulyani', tglMasuk: '2026-09-04', days: 1 },
          { id: 'M-10', status: 'sterilisasi', noRm: '', pasien: '-', tglMasuk: '-', days: 0 }
        ]
      },
      {
        kode: 'ICU-CENTRAL',
        bangsal: 'Intensive Care Unit (ICU)',
        kelas: 'ICU',
        totalTT: 6,
        terisiTT: 4,
        tarif: 2000000,
        beds: [
          { id: 'ICU-01', status: 'terisi', noRm: '', pasien: 'Pasien Kritis A (Post-Op)', tglMasuk: '2026-09-04', days: 1 },
          { id: 'ICU-02', status: 'terisi', noRm: '', pasien: 'Pasien Kritis B (STEMI)', tglMasuk: '2026-09-03', days: 2 },
          { id: 'ICU-03', status: 'kosong', noRm: '', pasien: '-', tglMasuk: '-', days: 0 },
          { id: 'ICU-04', status: 'terisi', noRm: '', pasien: 'Pasien Kritis C (Sepsis)', tglMasuk: '2026-09-01', days: 4 },
          { id: 'ICU-05', status: 'terisi', noRm: '', pasien: 'Pasien Kritis D (ARDS)', tglMasuk: '2026-09-02', days: 3 },
          { id: 'ICU-06', status: 'sterilisasi', noRm: '', pasien: '-', tglMasuk: '-', days: 0 }
        ]
      }
    ],
    pasiens: [
      { noRm: 'RM-202609-0001', nik: '1271012304950001', nama: 'Bambang Sudarmono', jk: 'L', tglLahir: '1995-04-23', hp: '081265438899', alamat: 'Jl. Gatot Subroto No. 45, Medan', noBpjs: '0001928374651', penjamin: 'BPJS Kesehatan' },
      { noRm: 'RM-202609-0002', nik: '1271025508980003', nama: 'Siti Nurhaliza', jk: 'P', tglLahir: '1998-08-15', hp: '085277889900', alamat: 'Jl. Setia Budi No. 12B, Medan', noBpjs: '0002847591023', penjamin: 'BPJS Kesehatan' },
      { noRm: 'RM-202609-0003', nik: '1271031102920005', nama: 'Rudi Hermawan', jk: 'L', tglLahir: '1992-02-11', hp: '082166554433', alamat: 'Jl. Iskandar Muda No. 88, Medan', noBpjs: '-', penjamin: 'Umum / Tunai' },
      { noRm: 'RM-202609-0004', nik: '1271044405800002', nama: 'Hj. Aminah Nasution', jk: 'P', tglLahir: '1980-05-14', hp: '081399887711', alamat: 'Jl. Ring Road No. 10, Medan', noBpjs: '0003928172635', penjamin: 'Allianz Life' },
      { noRm: 'RM-202609-0005', nik: '1271051212850004', nama: 'Edy Rahmayadi', jk: 'L', tglLahir: '1985-12-12', hp: '081288992233', alamat: 'Jl. Sudirman No. 1, Medan', noBpjs: '0004839201928', penjamin: 'Prudential' },
      { noRm: 'RM-202609-0006', nik: '1271060907780001', nama: 'dr. Johan Tarigan', jk: 'L', tglLahir: '1978-07-09', hp: '081122334455', alamat: 'Jl. Asia No. 23, Medan', noBpjs: '-', penjamin: 'Umum / Tunai' }
    ],
    antreans: [
      { id: 1, nomorAntrean: 'P-001', kodeBooking: 'BK-20260905-01', noSep: 'SEP-1271R001-20260905-001', noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', dokter: 'dr. Hendra Wijaya, Sp.PD', poli: 'Poli Penyakit Dalam', tgl: '2026-09-05', jenis: 'Rawat Inap', bayar: 'BPJS Kesehatan', status: 'selesai' },
      { id: 2, nomorAntrean: 'A-001', kodeBooking: 'BK-20260905-02', noSep: 'SEP-1271R001-20260905-002', noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', dokter: 'dr. Siti Rahmawati, Sp.A', poli: 'Poli Anak', tgl: '2026-09-05', jenis: 'Rawat Inap', bayar: 'BPJS Kesehatan', status: 'selesai' },
      { id: 3, nomorAntrean: 'B-001', kodeBooking: 'BK-20260905-03', noSep: '-', noRm: 'RM-202609-0003', nama: 'Rudi Hermawan', dokter: 'dr. Budi Santoso, Sp.B', poli: 'Poli Bedah', tgl: '2026-09-05', jenis: 'Rawat Jalan', bayar: 'Umum / Tunai', status: 'menunggu' }
    ],
    tindakanCatalog: [
      { id: 'T01', nama: 'Pemeriksaan EKG 12 Lead', tarif: 75000 },
      { id: 'T02', nama: 'Pasang Infus & Terapi Cairan', tarif: 50000 },
      { id: 'T03', nama: 'Terapi Nebulisasi Obat', tarif: 65000 },
      { id: 'T04', nama: 'Jahit Luka Ringan (Hecting 1-5 simpul)', tarif: 120000 },
      { id: 'T05', nama: 'Rontgen Thorax AP/PA', tarif: 180000 },
      { id: 'T06', nama: 'USG Abdomen 2 Dimensi', tarif: 250000 },
      { id: 'T07', nama: 'Pembersihan & Ganti Balut (Wound Dressing)', tarif: 45000 },
      { id: 'T08', nama: 'Injeksi Obat Intravena (IV Bolus)', tarif: 35000 }
    ],
    icd10: [
      { code: 'I10', name: 'Essential (primary) hypertension', ind: 'Hipertensi Esensial / Primer' },
      { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications', ind: 'Diabetes Melitus Tipe 2 Tanpa Komplikasi' },
      { code: 'J06.9', name: 'Acute upper respiratory infection, unspecified (ISPA)', ind: 'Infeksi Saluran Pernafasan Akut (ISPA)' },
      { code: 'K29.7', name: 'Gastritis, unspecified', ind: 'Gastritis / Sakit Maag Akut' },
      { code: 'A09.9', name: 'Gastroenteritis and colitis of unspecified origin (GEA)', ind: 'Diare Akut & Gastroenteritis (GEA)' },
      { code: 'M54.5', name: 'Low back pain', ind: 'Nyeri Punggung Bawah (LBP)' },
      { code: 'J45.9', name: 'Asthma, unspecified', ind: 'Asma Bronkial Eksaserbasi Akut' },
      { code: 'I20.9', name: 'Angina pectoris, unspecified', ind: 'Angina Pektoris / Penyakit Jantung Koroner' },
      { code: 'A01.0', name: 'Typhoid fever', ind: 'Demam Tifoid / Tipus' },
      { code: 'A90', name: 'Dengue fever (classical dengue)', ind: 'Demam Berdarah Dengue (DBD)' },
      { code: 'N18.9', name: 'Chronic kidney disease, unspecified', ind: 'Penyakit Ginjal Kronik (PGK)' },
      { code: 'K35.8', name: 'Acute appendicitis, other and unspecified', ind: 'Apendisitis Akut (Usus Buntu)' },
      { code: 'S06.0', name: 'Concussion (Mild head injury)', ind: 'Cedera Kepala Ringan (CKR)' },
      { code: 'H10.9', name: 'Conjunctivitis, unspecified', ind: 'Konjungtivitis Akut (Mata Merah)' },
      { code: 'G43.9', name: 'Migraine, unspecified', ind: 'Migrain Akut' },
      { code: 'G40.9', name: 'Epilepsy, unspecified', ind: 'Epilepsi / Kejang Berulang' },
      { code: 'O80', name: 'Single spontaneous delivery', ind: 'Persalinan Tunggal Spontan' },
      { code: 'L20.9', name: 'Atopic dermatitis, unspecified', ind: 'Dermatitis Atopik / Alergi Kulit' },
      { code: 'K21.9', name: 'Gastro-esophageal reflux disease without esophagitis (GERD)', ind: 'GERD / Refluks Asam Lambung' }
    ],
    rekamMedisList: [
      {
        id: 1,
        noRm: 'RM-202609-0001',
        nama: 'Bambang Sudarmono',
        dokter: 'dr. Hendra Wijaya, Sp.PD',
        tglPeriksa: '2026-09-05 09:15',
        s: 'Keluhan pusing berputar sejak 3 hari, tengkuk terasa tegang setelah jam kerja lembur. Riwayat hipertensi 2 tahun, kepatuhan minum obat tidak teratur. Alergi obat: disangkal.',
        o: 'TD: 150/95 mmHg | HR: 84 x/mnt | RR: 20 x/mnt | T: 36.6 °C | SpO2: 99% | BB: 74 kg | TB: 168 cm (BMI: 26.2 - Kelebihan Berat Badan)',
        tensiCat: 'Hipertensi Tingkat 1',
        a_icd10: 'I10',
        a_diagnosis: 'Essential (primary) hypertension',
        p_tindakan: ['Pemeriksaan EKG 12 Lead', 'Pasang Infus & Terapi Cairan'],
        tindakanBiaya: 125000,
        planNotes: 'Edukasi diet rendah natrium (<2000mg/hari), batasi kopi dan stres psikis, kontrol ulang dalam 30 hari.',
        tglKontrol: '2026-10-05'
      },
      {
        id: 2,
        noRm: 'RM-202609-0002',
        nama: 'Siti Nurhaliza',
        dokter: 'dr. Siti Rahmawati, Sp.A',
        tglPeriksa: '2026-09-05 09:45',
        s: 'Demam naik turun sejak 4 hari disertai mual, muntah 2x, dan nyeri perut kanan bawah. Lidah kotor dengan tepi hiperemis.',
        o: 'TD: 110/70 mmHg | HR: 96 x/mnt | RR: 22 x/mnt | T: 38.8 °C | SpO2: 98% | BB: 48 kg | TB: 155 cm (BMI: 20.0 - Normal)',
        tensiCat: 'Normal',
        a_icd10: 'A01.0',
        a_diagnosis: 'Typhoid fever',
        p_tindakan: ['Pasang Infus & Terapi Cairan', 'Injeksi Obat Intravena (IV Bolus)'],
        tindakanBiaya: 85000,
        planNotes: 'Bed rest total, diet lunak rendah serat, observasi suhu tubuh tiap 4 jam.',
        tglKontrol: '2026-09-12'
      }
    ],
    labOrders: [
      { id: 1, noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', tes: 'Darah Lengkap (Hematologi Rutin)', loinc: '58410-2', tarif: 120000, hasil: 'Hb: 14.8 g/dL (N: 13.5-17.5), Leukosit: 7.200 /uL, Trombosit: 265.000 /uL', status: 'normal', tgl: '2026-09-05 09:30' },
      { id: 2, noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', tes: 'Glukosa Darah Sewaktu (GDS)', loinc: '2339-0', tarif: 45000, hasil: '118 mg/dL (N: < 140 mg/dL)', status: 'normal', tgl: '2026-09-05 09:35' },
      { id: 3, noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', tes: 'Widal Test (Typhoid)', loinc: '40958-1', tarif: 85000, hasil: 'Titer O: 1/320 (High), Titer H: 1/160 (High)', status: 'high', tgl: '2026-09-05 10:00' },
      { id: 4, noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', tes: 'Darah Lengkap (Hematologi Rutin)', loinc: '58410-2', tarif: 120000, hasil: 'Hb: 12.1 g/dL, Leukosit: 3.800 /uL (Leukopenia), Trombosit: 195.000 /uL', status: 'high', tgl: '2026-09-05 10:05' }
    ],
    prescriptions: [
      { id: 1, noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', obat: 'Amlodipine 10 mg tab', signa: 'S 1 dd tab 1 (pagi pc)', qty: 30, harga: 75000, status: 'diserahkan' },
      { id: 2, noRm: 'RM-202609-0001', nama: 'Bambang Sudarmono', obat: 'Candesartan 8 mg tab', signa: 'S 1 dd tab 1 (malam pc)', qty: 30, harga: 110000, status: 'diserahkan' },
      { id: 3, noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', obat: 'Cefixime 100 mg cap', signa: 'S 2 dd cap 1 (pc)', qty: 10, harga: 60000, status: 'diserahkan' },
      { id: 4, noRm: 'RM-202609-0002', nama: 'Siti Nurhaliza', obat: 'Paracetamol 500 mg tab', signa: 'S 3 dd tab 1 prn (demam)', qty: 15, harga: 15000, status: 'diserahkan' }
    ],
    billings: [],
    pksList: [
      { id: 1, nomor: '001/PKS-RS/BPJS-KTR/2025', mitra: 'BPJS Kesehatan Kantor Cabang Utama', jenis: 'BPJS', mulai: '2025-01-01', akhir: '2026-12-31', pic: 'dr. Farida Hanum, M.Kes', kontak: '0811-9988-7766', status: 'aktif' },
      { id: 2, nomor: '089/PKS/ALLIANZ-MED/2025', mitra: 'PT Asuransi Allianz Life Indonesia', jenis: 'Asuransi Swasta', mulai: '2025-04-15', akhir: '2026-10-15', pic: 'Kevin Tan, AAIJ', kontak: '0812-3456-7890', status: 'aktif' },
      { id: 3, nomor: '045/PKS-CORP/PRU-HOSP/2024', mitra: 'PT Prudential Life Assurance', jenis: 'Asuransi Swasta', mulai: '2024-09-01', akhir: '2026-09-01', pic: 'Clara Novita, S.E.', kontak: '0813-8877-6655', status: 'evaluasi' }
    ]
  };

  let currentTab = 'pendaftaran';

  // =========================================================================
  // DYNAMIC BILLING & REVENUE LEDGER CALCULATOR
  // =========================================================================
  function syncPatientBilling(noRm) {
    const pasien = DB.pasiens.find(p => p.noRm === noRm);
    if (!pasien) return null;

    const antrean = DB.antreans.find(a => a.noRm === noRm) || { poli: 'Poli Spesialis', bayar: pasien.penjamin || 'Umum / Tunai', jenis: 'Rawat Jalan' };
    const rme = DB.rekamMedisList.find(r => r.noRm === noRm);

    // 1. Biaya Konsultasi Dokter
    const biayaDokter = antrean.jenis === 'IGD 24 Jam' ? 200000 : 150000;

    // 2. Biaya Tindakan Medis RME
    const biayaTindakan = rme ? (rme.tindakanBiaya || 0) : 0;

    // 3. Biaya Laboratorium LOINC
    const patientLab = DB.labOrders.filter(l => l.noRm === noRm);
    const biayaLab = patientLab.reduce((acc, l) => acc + (l.tarif || 0), 0);

    // 4. Biaya Farmasi Obat
    const patientRx = DB.prescriptions.filter(p => p.noRm === noRm);
    const biayaObat = patientRx.reduce((acc, p) => acc + (p.harga || 0), 0);

    // 5. Biaya Kamar Rawat Inap
    let biayaKamar = 0;
    let kamarInfo = null;
    DB.kamars.forEach(k => {
      const b = k.beds.find(bed => bed.noRm === noRm && bed.status === 'terisi');
      if (b) {
        biayaKamar = (b.days || 1) * k.tarif;
        kamarInfo = { bangsal: k.bangsal, kelas: k.kelas, tarif: k.tarif, days: b.days || 1, bedId: b.id };
      }
    });

    const total = biayaDokter + biayaTindakan + biayaLab + biayaObat + biayaKamar;

    // Coverage calculation
    let potongan = 0;
    const penjamin = antrean.bayar || pasien.penjamin;
    if (penjamin.includes('BPJS')) {
      potongan = total; // BPJS Full Cover
    } else if (penjamin.includes('Allianz') || penjamin.includes('Prudential')) {
      potongan = Math.round(total * 0.85); // 85% Covered
    } else {
      potongan = 0;
    }

    const sisaBayar = Math.max(0, total - potongan);

    let billing = DB.billings.find(b => b.noRm === noRm);
    if (!billing) {
      const invNum = `INV/${new Date().toISOString().slice(0, 10).replace(/-/g, '')}/${String(DB.billings.length + 1).padStart(4, '0')}`;
      billing = {
        id: DB.billings.length + 1,
        invoice: invNum,
        noRm: pasien.noRm,
        nama: pasien.nama,
        poli: antrean.poli,
        penjamin,
        biayaDokter,
        biayaTindakan,
        biayaLab,
        biayaObat,
        biayaKamar,
        kamarInfo,
        total,
        potongan,
        sisaBayar,
        status: sisaBayar === 0 ? 'lunas' : 'pending',
        tgl: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
      DB.billings.unshift(billing);
    } else {
      billing.biayaDokter = biayaDokter;
      billing.biayaTindakan = biayaTindakan;
      billing.biayaLab = biayaLab;
      billing.biayaObat = biayaObat;
      billing.biayaKamar = biayaKamar;
      billing.kamarInfo = kamarInfo;
      billing.total = total;
      billing.potongan = potongan;
      billing.sisaBayar = sisaBayar;
      if (sisaBayar === 0) billing.status = 'lunas';
    }

    return billing;
  }

  // Initialize initial billings
  DB.pasiens.forEach(p => syncPatientBilling(p.noRm));

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

  // =========================================================================
  // MASTER RENDER CONTAINER
  // =========================================================================
  window.renderSimrsSuite = function (container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="space-y-5">
        
        <!-- Header Banner -->
        <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="space-y-1 max-w-3xl">
            <h2 class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="hospital" class="w-5 h-5 text-slate-700 dark:text-slate-300"></i>
              <span>SIMRS Core — Sistem Informasi Manajemen Rumah Sakit</span>
            </h2>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ${isEn 
                ? "Enterprise hospital management platform featuring BPJS SEP bridging, RME SOAP with live ICD-10 search, LOINC diagnostics, Latin e-prescribing, reactive billing cashier with official receipts, bed occupancy grid, and Kemenkes SatuSehat FHIR JSON inspector."
                : "Sistem informasi manajemen rumah sakit terintegrasi mencakup admisi & bridging BPJS SEP, RME SOAP & pencarian ICD-10, diagnostik LOINC, e-resep latin, kasir billing reaktif berkwitansi resmi, alokasi ranjang kamar inap, dan inspektor FHIR Kemenkes SatuSehat."}
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <a href="https://github.com/InfiniteNull/simrs-laravel" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center gap-1.5 transition border border-slate-800 dark:border-slate-200 shadow-sm">
              <i data-lucide="github" class="w-3.5 h-3.5"></i>
              <span>GitHub Repo ↗</span>
            </a>
            <button id="btnOpenSimrsSop" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center gap-1.5 transition border border-slate-200 dark:border-slate-700">
              <i data-lucide="book-open" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>${isEn ? "Clinical SOP Guide" : "SOP & Alur Pelayanan"}</span>
            </button>
          </div>
        </div>

        <!-- Tab Navigation (9 Clean Segments) -->
        <div class="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px scrollbar-none" id="simrsSubTabs">
          <button data-tab="pendaftaran" class="simrs-tab-link ${currentTab === 'pendaftaran' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="clipboard-list" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "1. Admission & SEP" : "1. Admisi & BPJS SEP"}</span>
          </button>
          <button data-tab="rme" class="simrs-tab-link ${currentTab === 'rme' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="stethoscope" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "2. EMR SOAP & Triage" : "2. RME SOAP & Triage"}</span>
          </button>
          <button data-tab="lab" class="simrs-tab-link ${currentTab === 'lab' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "3. E-Order Lab (LOINC)" : "3. E-Order Lab (LOINC)"}</span>
          </button>
          <button data-tab="farmasi" class="simrs-tab-link ${currentTab === 'farmasi' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="pill" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "4. E-Prescribing" : "4. E-Resep Farmasi"}</span>
          </button>
          <button data-tab="billing" class="simrs-tab-link ${currentTab === 'billing' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="receipt" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "5. Cashier & Billing" : "5. Kasir & Kwitansi"}</span>
          </button>
          <button data-tab="bedmap" class="simrs-tab-link ${currentTab === 'bedmap' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "6. Bed Matrix Grid" : "6. Denah Ranjang"}</span>
          </button>
          <button data-tab="bor" class="simrs-tab-link ${currentTab === 'bor' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="activity" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "7. BOR Indicators" : "7. Indikator BOR"}</span>
          </button>
          <button data-tab="satusehat" class="simrs-tab-link ${currentTab === 'satusehat' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "8. SatuSehat FHIR" : "8. Bridging SatuSehat"}</span>
          </button>
          <button data-tab="code" class="simrs-tab-link ${currentTab === 'code' ? 'active' : ''} px-3.5 py-2 text-xs font-semibold rounded-t-lg transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="file-code" class="w-3.5 h-3.5"></i>
            <span>${isEn ? "9. Laravel Source" : "9. Source Code"}</span>
          </button>
        </div>

        <!-- Active Tab Container -->
        <div id="simrsTabPanel" class="min-h-[460px]"></div>

        <!-- Global In-App SIMRS Modal Container -->
        <div id="simrsInAppModal" class="fixed inset-0 z-50 hidden bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div id="simrsInAppModalCard" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-all">
            <!-- Populated dynamically -->
          </div>
        </div>

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
    else if (currentTab === 'satusehat') renderSatuSehatTab(panel);
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
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <i data-lucide="user-plus" class="w-4 h-4 text-slate-500"></i>
              <span>${isEn ? "Patient Admission & SEP Form" : "Admisi Pasien & Bridging SEP BPJS"}</span>
            </h3>
            <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">V-Claim 2.0 Live</span>
          </div>

          <form id="formAdmission" class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="font-medium text-slate-700 dark:text-slate-300">NIK KTP (16 Digit) <span class="text-rose-500">*</span></label>
                <button type="button" id="btnQuickLookupNik" class="text-[10px] text-sky-600 dark:text-sky-400 hover:underline">Lookup Demo NIK</button>
              </div>
              <input type="text" id="admNik" maxlength="16" required placeholder="Contoh: 1271012304950001" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap Pasien <span class="text-rose-500">*</span></label>
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
                <input type="text" id="admRujukan" value="0123B0010926P0001" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Poliklinik Tujuan</label>
                <select id="admPoli" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                  ${DB.dokters.map(d => `<option value="${d.id}">${d.poli} (${d.nama.split(',')[0]})</option>`).join('')}
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
                <span>Sisa Kuota Dokter Hari Ini:</span>
                <span id="admQuotaText" class="font-mono font-bold text-slate-900 dark:text-white">12 / 30</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                <div id="admQuotaBar" class="bg-slate-900 dark:bg-slate-100 h-full transition-all duration-200" style="width: 40%"></div>
              </div>
            </div>

            <button type="submit" class="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm flex items-center justify-center gap-1.5">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>${isEn ? "Generate Queue & Issue BPJS SEP" : "Registrasi & Terbitkan SEP BPJS"}</span>
            </button>
          </form>
        </div>

        <!-- Ticket / SEP Preview & Queue Table -->
        <div class="lg:col-span-7 space-y-4">
          
          <div id="cardIssuedTicket" class="hidden p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-xs font-bold text-slate-900 dark:text-white">Surat Eligibilitas Peserta (SEP) Terbit</span>
              </div>
              <span id="ticketSep" class="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">SEP-1271R001-20260905-99</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-700 dark:text-slate-300">
              <div class="text-center px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shrink-0">
                <span class="text-[10px] text-slate-500 font-mono">NOMOR ANTREAN</span>
                <p id="ticketNum" class="text-2xl font-black font-mono text-slate-900 dark:text-white">P-019</p>
              </div>
              <div class="space-y-0.5">
                <p><span class="text-slate-500">Pasien:</span> <strong id="ticketName">-</strong> (<span id="ticketRm" class="font-mono">-</span>)</p>
                <p><span class="text-slate-500">Poli/Dokter:</span> <span id="ticketDoc">-</span></p>
                <p><span class="text-slate-500">Status SEP:</span> <span class="font-mono font-medium text-emerald-600 dark:text-emerald-400">TERVERIFIKASI BPJS V-CLAIM 2.0</span></p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ${isEn ? "Today's Patient Admission Roster" : "Daftar Registrasi Pasien Hari Ini"}
              </h4>
              <span class="text-xs font-mono text-slate-500">${DB.antreans.length} Kunjungan</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th class="py-2 px-2">Antrean</th>
                    <th class="py-2 px-2">No RM / Pasien</th>
                    <th class="py-2 px-2">Poli & Jenis</th>
                    <th class="py-2 px-2">No SEP / Penjamin</th>
                    <th class="py-2 px-2">Status</th>
                    <th class="py-2 px-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  ${DB.antreans.map(a => `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td class="py-2.5 px-2 font-mono font-bold text-slate-900 dark:text-white">${a.nomorAntrean}</td>
                      <td class="py-2.5 px-2">
                        <div class="font-semibold text-slate-900 dark:text-white">${a.nama}</div>
                        <div class="text-[10px] font-mono text-slate-500">${a.noRm}</div>
                      </td>
                      <td class="py-2.5 px-2">
                        <div>${a.poli}</div>
                        <span class="text-[10px] px-1.5 py-0.2 rounded font-medium ${a.jenis === 'Rawat Inap' ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' : 'text-slate-500'}">${a.jenis}</span>
                      </td>
                      <td class="py-2.5 px-2">
                        <div class="font-mono text-[11px]">${a.bayar}</div>
                        <div class="text-[10px] font-mono text-slate-400">${a.noSep}</div>
                      </td>
                      <td class="py-2.5 px-2">
                        <span class="px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          a.status === 'selesai' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' :
                          a.status === 'sedang_dilayani' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-bold' :
                          'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                        }">
                          ${a.status.toUpperCase()}
                        </span>
                      </td>
                      <td class="py-2.5 px-2 text-right">
                        <button onclick="window.simrsOpenEhrModal('${a.noRm}')" class="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700 transition">
                          Rekam Medis
                        </button>
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
    const inpNik = container.querySelector('#admNik');
    const inpNama = container.querySelector('#admNama');

    function updateQuotaDisplay() {
      const doc = DB.dokters.find(d => d.id === parseInt(selPoli.value)) || DB.dokters[0];
      const sisa = Math.max(0, doc.kuota - doc.terisi);
      const pct = Math.round((doc.terisi / doc.kuota) * 100);
      quotaText.textContent = `${sisa} / ${doc.kuota} Tersisa`;
      quotaBar.style.width = `${pct}%`;
    }
    selPoli.addEventListener('change', updateQuotaDisplay);
    updateQuotaDisplay();

    container.querySelector('#btnQuickLookupNik').addEventListener('click', () => {
      inpNik.value = '1271044405800002';
      inpNama.value = 'Hj. Aminah Nasution';
      container.querySelector('#admBayar').value = 'Allianz Life';
    });

    container.querySelector('#formAdmission').addEventListener('submit', (e) => {
      e.preventDefault();
      const nik = inpNik.value.trim();
      const nama = inpNama.value.trim();
      const docId = parseInt(selPoli.value);
      const bayar = container.querySelector('#admBayar').value;
      const jenis = container.querySelector('#admJenis').value;

      const doc = DB.dokters.find(d => d.id === docId);
      doc.terisi += 1;

      let p = DB.pasiens.find(x => x.nik === nik);
      if (!p) {
        const rmNum = `RM-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(DB.pasiens.length + 1).padStart(4, '0')}`;
        p = { noRm: rmNum, nik, nama, jk: 'L', tglLahir: '1995-01-01', hp: '0812-xxxx-xxxx', alamat: 'Medan', noBpjs: bayar.includes('BPJS') ? '000192837465' : '-', penjamin: bayar };
        DB.pasiens.push(p);
      }

      const prefix = doc.spesialisasi.includes('Penyakit') ? 'P' : doc.spesialisasi.includes('Anak') ? 'A' : doc.spesialisasi.includes('Bedah') ? 'B' : doc.spesialisasi.includes('Jantung') ? 'J' : 'K';
      const qNum = `${prefix}-${String(doc.terisi).padStart(3, '0')}`;
      const bkCode = `BK-${Date.now().toString().slice(-8)}`;
      const sepCode = bayar.includes('BPJS') ? `SEP-1271R001-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(DB.antreans.length + 1).padStart(3, '0')}` : '-';

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

      syncPatientBilling(p.noRm);

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
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <i data-lucide="stethoscope" class="w-4 h-4 text-slate-500"></i>
              <span>${isEn ? "Clinical EMR SOAP Assessment" : "Pengisian Asesmen Medis SOAP & Tindakan"}</span>
            </h3>
            <span class="text-[10px] font-mono text-slate-500">Permenkes No. 24/2022</span>
          </div>

          <form id="formRme" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Pasien Dari Antrean Hari Ini:</label>
              <select id="rmeSelectPatient" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.antreans.map(a => `<option value="${a.noRm}">${a.nomorAntrean} — ${a.nama} (${a.noRm} • ${a.poli})</option>`).join('')}
              </select>
            </div>

            <!-- Subjektif -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">S — Subjektif (Keluhan Utama & Anamnesis)</label>
              <textarea id="inpS" rows="2" required class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">Nyeri ulu hati terasa panas perih sejak 2 hari, mual hilang timbul setelah makan pedas. Alergi obat disangkal.</textarea>
            </div>

            <!-- Objektif -->
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <label class="font-bold text-slate-900 dark:text-white">O — Objektif (Tanda Vital & Pemeriksaan Fisik)</label>
                <span id="txtBmiTriageBadge" class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">BMI: 22.2 (Normal)</span>
              </div>
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
                  <input type="number" id="inpBb" value="65" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500">TB (cm)</span>
                  <input type="number" id="inpTb" value="171" class="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs" />
                </div>
              </div>
            </div>

            <!-- Asesmen ICD-10 Searchable -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">A — Asesmen Diagnosis (ICD-10 Searchable)</label>
              <div class="relative">
                <input type="text" id="icdSearchInput" placeholder="Ketik kode (misal: I10, E11, K29) atau nama penyakit..." class="w-full px-3 py-1.5 rounded-t-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono focus:outline-none" />
                <select id="inpIcd" size="3" class="w-full px-2 py-1 rounded-b-lg border-x border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs focus:outline-none">
                  ${DB.icd10.map((i, idx) => `<option value="${i.code}" ${idx === 3 ? 'selected' : ''}>[${i.code}] ${i.name} (${i.ind})</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Tindakan Medis Poli -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">P — Tindakan Medis Dilakukan:</label>
              <div class="grid grid-cols-2 gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-h-32 overflow-y-auto" id="rmeTindakanContainer">
                ${DB.tindakanCatalog.map(t => `
                  <label class="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input type="checkbox" name="tindakan_item" value="${t.id}" data-nama="${t.nama}" data-tarif="${t.tarif}" class="rounded border-slate-300 text-slate-900 accent-slate-900 dark:accent-slate-100" />
                    <span>${t.nama} <span class="font-mono text-slate-400">(Rp ${t.tarif.toLocaleString('id-ID')})</span></span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Plan Notes -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-900 dark:text-white">Rencana Edukasi & Terapi Lanjutan:</label>
              <textarea id="inpP" rows="2" required class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">Edukasi pembatasan konsumsi makanan asam dan pedas, resepkan terapi obat di tab Farmasi.</textarea>
            </div>

            <button type="submit" class="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm flex items-center justify-center gap-1.5">
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>${isEn ? "Save Clinical Record & Sync Ledger" : "Simpan Asesmen RME & Sinkronisasi Biaya"}</span>
            </button>
          </form>
        </div>

        <!-- History List -->
        <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ${isEn ? "Electronic Medical Record History" : "Riwayat Rekam Medis Elektronik (RME)"}
            </h4>
            <span class="text-xs font-mono text-slate-500">${DB.rekamMedisList.length} Asesmen Tersimpan</span>
          </div>

          <div class="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
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
                  ${r.p_tindakan && r.p_tindakan.length ? `<p><strong>Tindakan:</strong> <span class="font-mono text-emerald-600 dark:text-emerald-400">${r.p_tindakan.join(', ')}</span></p>` : ''}
                  <p><strong>Catatan Plan:</strong> ${r.planNotes || '-'}</p>
                </div>

                <div class="pt-1 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60">
                  <span>Dokter: ${r.dokter}</span>
                  <span>${r.tglPeriksa}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    const inpBb = container.querySelector('#inpBb');
    const inpTb = container.querySelector('#inpTb');
    const inpTd = container.querySelector('#inpTd');
    const txtBmi = container.querySelector('#txtBmiTriageBadge');

    function updateTriage() {
      const bb = parseFloat(inpBb.value) || 60;
      const tbM = (parseFloat(inpTb.value) || 165) / 100;
      const bmi = (bb / (tbM * tbM)).toFixed(1);
      let bmiCat = 'Normal';
      if (bmi < 18.5) bmiCat = 'Kurang BB';
      else if (bmi >= 25 && bmi < 30) bmiCat = 'Kelebihan BB';
      else if (bmi >= 30) bmiCat = 'Obesitas';

      txtBmi.textContent = `BMI: ${bmi} (${bmiCat})`;
    }
    [inpBb, inpTb, inpTd].forEach(el => el.addEventListener('input', updateTriage));

    const searchIcd = container.querySelector('#icdSearchInput');
    const selIcd = container.querySelector('#inpIcd');

    searchIcd.addEventListener('input', () => {
      const q = searchIcd.value.toLowerCase().trim();
      const filtered = DB.icd10.filter(i => i.code.toLowerCase().includes(q) || i.name.toLowerCase().includes(q) || i.ind.toLowerCase().includes(q));
      selIcd.innerHTML = filtered.map(i => `<option value="${i.code}">[${i.code}] ${i.name} (${i.ind})</option>`).join('');
      if (filtered.length > 0) selIcd.selectedIndex = 0;
    });

    container.querySelector('#formRme').addEventListener('submit', (e) => {
      e.preventDefault();
      const noRm = container.querySelector('#rmeSelectPatient').value;
      const pasien = DB.pasiens.find(p => p.noRm === noRm) || { nama: 'Pasien' };
      const s = container.querySelector('#inpS').value;
      const td = inpTd.value;
      const hr = container.querySelector('#inpHr').value;
      const t = container.querySelector('#inpT').value;
      const rr = container.querySelector('#inpRr').value;
      const bb = inpBb.value;
      const tb = inpTb.value;
      const tbM = (parseFloat(tb) || 165) / 100;
      const bmi = (parseFloat(bb) / (tbM * tbM)).toFixed(1);

      const icdCode = selIcd.value;
      const icdObj = DB.icd10.find(i => i.code === icdCode) || { name: 'Diagnosis Klinis', ind: 'Diagnosis Klinis' };
      const planNotes = container.querySelector('#inpP').value;

      const checkedBoxes = container.querySelectorAll('input[name="tindakan_item"]:checked');
      const tindakanNames = [];
      let tindakanTotal = 0;
      checkedBoxes.forEach(cb => {
        tindakanNames.push(cb.dataset.nama);
        tindakanTotal += parseInt(cb.dataset.tarif);
      });

      DB.rekamMedisList.unshift({
        id: DB.rekamMedisList.length + 1,
        noRm,
        nama: pasien.nama,
        dokter: 'dr. Hendra Wijaya, Sp.PD',
        tglPeriksa: new Date().toISOString().replace('T', ' ').slice(0, 16),
        s,
        o: `TD: ${td} mmHg | HR: ${hr} x/mnt | T: ${t} °C | RR: ${rr} x/mnt | BB: ${bb} kg | TB: ${tb} cm (BMI: ${bmi})`,
        a_icd10: icdCode,
        a_diagnosis: `${icdObj.name} (${icdObj.ind})`,
        p_tindakan: tindakanNames,
        tindakanBiaya: tindakanTotal,
        planNotes,
        tglKontrol: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
      });

      const ant = DB.antreans.find(a => a.noRm === noRm);
      if (ant) ant.status = 'selesai';

      syncPatientBilling(noRm);

      renderRmeTab(container);
      if (window.showToast) showToast(isEn ? "EMR record & procedures saved" : "Asesmen RME & tindakan berhasil disimpan", "success");
    });
  }

  // =========================================================================
  // TAB 3: E-ORDER LABORATORIUM (LOINC DIAGNOSTICS)
  // =========================================================================
  function renderLabTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <div class="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <i data-lucide="flask-conical" class="w-4 h-4 text-slate-500"></i>
              <span>${isEn ? "Laboratory Diagnostic E-Order" : "Permintaan Uji Laboratorium (LOINC)"}</span>
            </h3>
            <span class="text-[10px] font-mono text-slate-500">LOINC Standard</span>
          </div>

          <form id="formLabOrder" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Pasien:</label>
              <select id="labSelectPatient" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.antreans.map(a => `<option value="${a.noRm}">${a.noRm} — ${a.nama} (${a.poli})</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Paket Pemeriksaan Diagnostik:</label>
              <select id="labSelectPackage" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                <option value="Darah Lengkap (Hematologi Rutin)|58410-2|Hb: 13.5-17.5 g/dL|120000">Darah Lengkap (Hematologi Rutin) [58410-2] — Rp 120.000</option>
                <option value="Glukosa Darah Sewaktu (GDS)|2339-0|< 140 mg/dL|45000">Glukosa Darah Sewaktu (GDS) [2339-0] — Rp 45.000</option>
                <option value="Fungsi Ginjal (Ureum & Kreatinin)|3094-0|Kreatinin: 0.7-1.3 mg/dL|110000">Fungsi Ginjal (Ureum & Kreatinin) [3094-0] — Rp 110.000</option>
                <option value="Profil Lipid (Kolesterol Total & TG)|2093-3|Kolesterol: < 200 mg/dL|160000">Profil Lipid (Kolesterol Total) [2093-3] — Rp 160.000</option>
                <option value="Fungsi Hati (SGOT & SGPT)|1920-8|SGOT: < 35 U/L|95000">Fungsi Hati (SGOT & SGPT) [1920-8] — Rp 95.000</option>
                <option value="Elektrolit Darah (Na, K, Cl)|2951-2|Natrium: 135-145 mEq/L|135000">Elektrolit Darah (Na, K, Cl) [2951-2] — Rp 135.000</option>
                <option value="Widal Test (Uji Tipus)|40958-1|Titer < 1/160|85000">Widal Test (Uji Tipus) [40958-1] — Rp 85.000</option>
                <option value="Urin Lengkap & Sedimen|24357-6|Leukosit: 0-2 /LPB|50000">Urin Lengkap & Sedimen [24357-6] — Rp 50.000</option>
              </select>
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Catatan Klinis / Indikasi:</label>
              <input type="text" id="labCatatan" value="Evaluasi klinis poliklinik rutin" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
            </div>

            <button type="submit" class="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm flex items-center justify-center gap-1.5">
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>${isEn ? "Submit Lab Request & Sync Ledger" : "Kirim Permintaan ke Analis Lab"}</span>
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
                  <th class="py-2 px-2">Pemeriksaan & LOINC</th>
                  <th class="py-2 px-2">Nilai Hasil</th>
                  <th class="py-2 px-2">Biaya</th>
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
                      <div class="font-medium">${l.tes}</div>
                      <div class="text-[10px] font-mono text-slate-400">LOINC: ${l.loinc}</div>
                    </td>
                    <td class="py-2.5 px-2 font-mono text-[11px]">${l.hasil}</td>
                    <td class="py-2.5 px-2 font-mono">Rp ${(l.tarif || 0).toLocaleString('id-ID')}</td>
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
      const tarif = parseInt(rawPkg[3]) || 50000;

      DB.labOrders.unshift({
        id: DB.labOrders.length + 1,
        noRm,
        nama: pasien.nama,
        tes: tesName,
        loinc,
        tarif,
        hasil: `Hasil terverifikasi: Normal (${ref})`,
        status: 'normal',
        tgl: new Date().toISOString().replace('T', ' ').slice(0, 16)
      });

      syncPatientBilling(noRm);

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
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <i data-lucide="pill" class="w-4 h-4 text-slate-500"></i>
              <span>${isEn ? "E-Prescription Entry (Signa Latin)" : "Input Resep Obat Elektronik (E-Prescribing)"}</span>
            </h3>
            <span class="text-[10px] font-mono text-slate-500">Farmasi SIMRS</span>
          </div>

          <form id="formPrescription" class="space-y-3 text-xs">
            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Pasien:</label>
              <select id="rxSelectPatient" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                ${DB.antreans.map(a => `<option value="${a.noRm}">${a.noRm} — ${a.nama} (${a.poli})</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Obat & Sediaan:</label>
              <select id="rxSelectMed" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none">
                <option value="Amlodipine 10 mg tab|2500|S 1 dd tab 1 (pagi pc)">Amlodipine 10 mg Tablet (@ Rp 2.500)</option>
                <option value="Candesartan 8 mg tab|3500|S 1 dd tab 1 (malam pc)">Candesartan 8 mg Tablet (@ Rp 3.500)</option>
                <option value="Metformin 500 mg tab|1500|S 3 dd tab 1 (dc bersama makan)">Metformin 500 mg Tablet (@ Rp 1.500)</option>
                <option value="Glimepiride 2 mg tab|2000|S 1 dd tab 1 (ac pagi)">Glimepiride 2 mg Tablet (@ Rp 2.000)</option>
                <option value="Omeprazole 20 mg cap|4000|S 2 dd cap 1 (ac 30 mnt)">Omeprazole 20 mg Kapsul (@ Rp 4.000)</option>
                <option value="Cefixime 100 mg cap|6000|S 2 dd cap 1 (pc)">Cefixime 100 mg Kapsul (@ Rp 6.000)</option>
                <option value="Paracetamol 500 mg tab|1000|S 3 dd tab 1 prn (demam/pusing)">Paracetamol 500 mg Tablet (@ Rp 1.000)</option>
                <option value="Ketorolac 30 mg inj|25000|S 3 dd amp 1 IV">Ketorolac 30 mg Injeksi Ampul (@ Rp 25.000)</option>
                <option value="Salbutamol Inhaler|85000|S 3 dd puff 2 prn">Salbutamol Inhaler 100 mcg (@ Rp 85.000)</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Jumlah (Qty):</label>
                <input type="number" id="rxQty" value="30" min="1" max="100" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
              </div>
              <div>
                <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">Aturan Pakai (Signa):</label>
                <input type="text" id="rxSigna" value="S 1 dd tab 1 (pagi pc)" class="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs focus:ring-1 focus:ring-slate-400 focus:outline-none" />
              </div>
            </div>

            <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <span class="text-slate-600 dark:text-slate-400">Estimasi Subtotal:</span>
              <span id="rxSubtotalText" class="font-mono font-bold text-slate-900 dark:text-white">Rp 75.000</span>
            </div>

            <button type="submit" class="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition shadow-sm flex items-center justify-center gap-1.5">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>${isEn ? "Add to Pharmacy Queue & Sync Ledger" : "Teruskan Resep ke Farmasi"}</span>
            </button>
          </form>
        </div>

        <div class="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ${isEn ? "Dispensing & Prescription Queue" : "Antrean Resep & Dispensing Obat Farmasi"}
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
                  <th class="py-2 px-2 text-right">Aksi</th>
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
                    <td class="py-2.5 px-2 text-right">
                      ${p.status === 'diracik' ? `
                        <button onclick="window.simrsDispenseRx(${p.id})" class="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-[10px] transition">
                          Serahkan
                        </button>
                      ` : `
                        <span class="text-[10px] text-emerald-600 font-mono font-semibold">Tuntas</span>
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

    const selMed = container.querySelector('#rxSelectMed');
    const inpSigna = container.querySelector('#rxSigna');
    const inpQty = container.querySelector('#rxQty');
    const subtotalText = container.querySelector('#rxSubtotalText');

    function updateRxSubtotal() {
      const parts = selMed.value.split('|');
      inpSigna.value = parts[2] || 'S 1 dd tab 1 pc';
      const price = parseInt(parts[1]) || 2500;
      const qty = parseInt(inpQty.value) || 1;
      subtotalText.textContent = `Rp ${(price * qty).toLocaleString('id-ID')}`;
    }

    selMed.addEventListener('change', updateRxSubtotal);
    inpQty.addEventListener('input', updateRxSubtotal);

    window.simrsDispenseRx = function(id) {
      const p = DB.prescriptions.find(x => x.id === id);
      if (p) {
        p.status = 'diserahkan';
        renderFarmasiTab(container);
        if (window.showToast) showToast(`Obat ${p.obat} telah diserahkan ke pasien`, 'success');
      }
    };

    container.querySelector('#formPrescription').addEventListener('submit', (e) => {
      e.preventDefault();
      const noRm = container.querySelector('#rxSelectPatient').value;
      const pasien = DB.pasiens.find(p => p.noRm === noRm) || { nama: 'Pasien' };
      const rawMed = selMed.value.split('|');
      const medName = rawMed[0];
      const price = parseFloat(rawMed[1]) || 2500;
      const qty = parseInt(inpQty.value) || 10;
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

      syncPatientBilling(noRm);

      renderFarmasiTab(container);
      if (window.showToast) showToast(isEn ? "Prescription queued for pharmacy" : `Resep ${medName} berhasil dikirim ke Farmasi`, 'success');
    });
  }

  // =========================================================================
  // TAB 5: KASIR & BILLING REKONSIALISASI
  // =========================================================================
  function renderBillingTab(container) {
    const isEn = window.currentLang === 'en';

    DB.pasiens.forEach(p => syncPatientBilling(p.noRm));

    container.innerHTML = `
      <div class="space-y-4">
        
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <i data-lucide="receipt" class="w-4 h-4 text-slate-500"></i>
                <span>${isEn ? "Hospital Revenue Ledger & Cashier Invoicing" : "Kasir & Rekonsiliasi Tagihan Pelayanan Pasien"}</span>
              </h3>
              <p class="text-[11px] text-slate-500">Agregasi otomatis biaya dokter, tindakan medis, laboratorium, resep farmasi, dan rawat inap</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th class="py-2.5 px-2.5">No Invoice</th>
                  <th class="py-2.5 px-2.5">Pasien & Poli</th>
                  <th class="py-2.5 px-2.5">Rincian Item (Dokter • Tindakan • Lab • Obat • Ranap)</th>
                  <th class="py-2.5 px-2.5">Total Tagihan</th>
                  <th class="py-2.5 px-2.5">Penjamin / Asuransi</th>
                  <th class="py-2.5 px-2.5">Sisa Bayar Pasien</th>
                  <th class="py-2.5 px-2.5">Status</th>
                  <th class="py-2.5 px-2.5 text-right">Aksi</th>
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
                    <td class="py-2.5 px-2.5 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                      <div>Dokter: Rp ${b.biayaDokter.toLocaleString('id-ID')} | Tindakan: Rp ${b.biayaTindakan.toLocaleString('id-ID')}</div>
                      <div>Lab: Rp ${b.biayaLab.toLocaleString('id-ID')} | Farmasi: Rp ${b.biayaObat.toLocaleString('id-ID')} ${b.biayaKamar > 0 ? `| Kamar: Rp ${b.biayaKamar.toLocaleString('id-ID')}` : ''}</div>
                    </td>
                    <td class="py-2.5 px-2.5 font-mono font-semibold">Rp ${b.total.toLocaleString('id-ID')}</td>
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
                    <td class="py-2.5 px-2.5 text-right space-x-1">
                      ${b.status === 'pending' ? `
                        <button onclick="window.simrsPayBilling(${b.id})" class="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-[11px] transition shadow-sm">
                          Pelunasan
                        </button>
                      ` : ''}
                      <button onclick="window.simrsOpenReceiptModal(${b.id})" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition border border-slate-200 dark:border-slate-700">
                        Kwitansi
                      </button>
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
      b.potongan = b.total;
      renderBillingTab(container);
      if (window.showToast) showToast(`Tagihan ${b.invoice} telah lunas!`, 'success');
    };

    window.simrsOpenReceiptModal = function(id) {
      const b = DB.billings.find(x => x.id === id);
      if (!b) return;

      const modal = document.getElementById('simrsInAppModal');
      const card = document.getElementById('simrsInAppModalCard');
      if (!modal || !card) return;

      card.innerHTML = `
        <div class="p-6 space-y-4 text-slate-900 dark:text-white">
          <!-- Receipt Header -->
          <div class="border-b border-slate-200 dark:border-slate-700 pb-3 flex items-start justify-between">
            <div class="space-y-0.5">
              <h3 class="font-bold text-sm tracking-tight">RUMAH SAKIT UMUM PUSAT SIMRS</h3>
              <p class="text-[10px] text-slate-500 font-mono">Jl. Pengayoman No. 100, Kota Medan • Telp: (061) 8899-7700</p>
              <p class="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 pt-1">BUKTI KWITANSI PEMBAYARAN RESMI</p>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-mono text-slate-500">NO INVOICE</span>
              <p class="text-xs font-mono font-bold text-slate-900 dark:text-white">${b.invoice}</p>
              <span class="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">LUNAS</span>
            </div>
          </div>

          <!-- Patient Meta -->
          <div class="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div>
              <p class="text-slate-500 text-[10px]">Nama Pasien:</p>
              <p class="font-bold">${b.nama} <span class="font-mono text-slate-500">(${b.noRm})</span></p>
            </div>
            <div>
              <p class="text-slate-500 text-[10px]">Poliklinik / Layanan:</p>
              <p class="font-semibold">${b.poli}</p>
            </div>
            <div>
              <p class="text-slate-500 text-[10px]">Penjamin / Asuransi:</p>
              <p class="font-semibold">${b.penjamin}</p>
            </div>
            <div>
              <p class="text-slate-500 text-[10px]">Tanggal Pembayaran:</p>
              <p class="font-mono">${b.tgl}</p>
            </div>
          </div>

          <!-- Line Items Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-700 font-mono text-[10px] text-slate-500">
                  <th class="py-1.5">Deskripsi Layanan</th>
                  <th class="py-1.5 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                <tr>
                  <td class="py-1.5">Jasa Konsultasi Dokter Spesialis</td>
                  <td class="py-1.5 text-right">Rp ${b.biayaDokter.toLocaleString('id-ID')}</td>
                </tr>
                <tr>
                  <td class="py-1.5">Tindakan Medis & Keperawatan</td>
                  <td class="py-1.5 text-right">Rp ${b.biayaTindakan.toLocaleString('id-ID')}</td>
                </tr>
                <tr>
                  <td class="py-1.5">Pemeriksaan Laboratorium Diagnostik (LOINC)</td>
                  <td class="py-1.5 text-right">Rp ${b.biayaLab.toLocaleString('id-ID')}</td>
                </tr>
                <tr>
                  <td class="py-1.5">Perbekalan Farmasi & Obat-obatan</td>
                  <td class="py-1.5 text-right">Rp ${b.biayaObat.toLocaleString('id-ID')}</td>
                </tr>
                ${b.biayaKamar > 0 ? `
                  <tr>
                    <td class="py-1.5">Akomodasi Kamar Rawat Inap (${b.kamarInfo ? `${b.kamarInfo.bangsal} - ${b.kamarInfo.days} hari` : 'Ranap'})</td>
                    <td class="py-1.5 text-right">Rp ${b.biayaKamar.toLocaleString('id-ID')}</td>
                  </tr>
                ` : ''}
              </tbody>
              <tfoot class="border-t-2 border-slate-200 dark:border-slate-700 font-mono font-bold text-xs">
                <tr>
                  <td class="pt-2">Subtotal Tagihan Bruto:</td>
                  <td class="pt-2 text-right">Rp ${b.total.toLocaleString('id-ID')}</td>
                </tr>
                <tr class="text-emerald-600 dark:text-emerald-400">
                  <td class="py-1">Klaim Ditanggung Penjamin (${b.penjamin}):</td>
                  <td class="py-1 text-right">- Rp ${b.potongan.toLocaleString('id-ID')}</td>
                </tr>
                <tr class="text-sm">
                  <td class="pt-1">Total Dibayar Pasien:</td>
                  <td class="pt-1 text-right">Rp ${b.sisaBayar.toLocaleString('id-ID')}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Footer Modal Actions -->
          <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div class="text-[10px] text-slate-400 font-mono">
              Petugas Kasir: Kasir SIMRS (Validasi Digital)
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.print()" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition">
                <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                <span>Cetak</span>
              </button>
              <button onclick="document.getElementById('simrsInAppModal').classList.add('hidden')" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-semibold transition">
                Tutup
              </button>
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    };
  }

  // =========================================================================
  // TAB 6: DENAH RANJANG RAWAT INAP (BED MATRIX GRID & MODAL)
  // =========================================================================
  function renderBedMapTab(container) {
    const isEn = window.currentLang === 'en';

    container.innerHTML = `
      <div class="space-y-4">
        
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <i data-lucide="layout-grid" class="w-4 h-4 text-slate-500"></i>
                <span>${isEn ? "Inpatient Ward Bed Occupancy Matrix" : "Peta Alokasi Ranjang Rawat Inap"}</span>
              </h3>
              <p class="text-[11px] text-slate-500">Klik ranjang untuk admisi pasien, pemulangan (discharge), atau sterilisasi kamar</p>
            </div>

            <!-- Legend -->
            <div class="flex items-center gap-3 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-500 inline-block"></span> Kosong Siap Pakai</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-rose-500 inline-block"></span> Terisi Pasien</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-500 inline-block"></span> Sterilisasi</span>
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
                    ${k.kelas} • ${k.terisiTT}/${k.totalTT} Terisi
                  </span>
                </div>

                <!-- Bed Blocks Grid -->
                <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  ${k.beds.map(b => `
                    <div onclick="window.simrsBedActionModal('${k.kode}', '${b.id}')" class="p-2 rounded border text-center cursor-pointer transition select-none ${
                      b.status === 'kosong' ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50' :
                      b.status === 'terisi' ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50' :
                      'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50'
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

    window.simrsBedActionModal = function(wardCode, bedId) {
      const ward = DB.kamars.find(k => k.kode === wardCode);
      if (!ward) return;
      const bed = ward.beds.find(b => b.id === bedId);
      if (!bed) return;

      const modal = document.getElementById('simrsInAppModal');
      const card = document.getElementById('simrsInAppModalCard');
      if (!modal || !card) return;

      if (bed.status === 'kosong') {
        card.innerHTML = `
          <div class="p-6 space-y-4 text-slate-900 dark:text-white">
            <div class="border-b border-slate-200 dark:border-slate-700 pb-2.5 flex items-center justify-between">
              <div>
                <h3 class="font-bold text-sm">Admisi Rawat Inap — Bed ${bed.id}</h3>
                <p class="text-xs text-slate-500">${ward.bangsal} (${ward.kelas}) • Tarif: Rp ${ward.tarif.toLocaleString('id-ID')}/hari</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800">KOSONG</span>
            </div>

            <div class="space-y-3 text-xs">
              <div>
                <label class="block font-medium mb-1">Pilih Pasien Yang Akan Masuk Ranap:</label>
                <select id="modalSelectBedPatient" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
                  ${DB.pasiens.map(p => `<option value="${p.noRm}">${p.nama} (${p.noRm} • ${p.penjamin})</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
              <button onclick="document.getElementById('simrsInAppModal').classList.add('hidden')" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold">Batal</button>
              <button id="btnConfirmAdmitBed" class="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold">Admisi Pasien ke Bed</button>
            </div>
          </div>
        `;

        modal.classList.remove('hidden');

        card.querySelector('#btnConfirmAdmitBed').addEventListener('click', () => {
          const noRm = card.querySelector('#modalSelectBedPatient').value;
          const p = DB.pasiens.find(x => x.noRm === noRm);
          bed.status = 'terisi';
          bed.noRm = p.noRm;
          bed.pasien = p.nama;
          bed.tglMasuk = new Date().toISOString().split('T')[0];
          bed.days = 1;
          ward.terisiTT += 1;

          syncPatientBilling(noRm);
          modal.classList.add('hidden');
          renderBedMapTab(container);
          if (window.showToast) showToast(`Pasien ${p.nama} berhasil dirawat inap di Bed ${bed.id}`, 'success');
        });
      } else if (bed.status === 'terisi') {
        card.innerHTML = `
          <div class="p-6 space-y-4 text-slate-900 dark:text-white">
            <div class="border-b border-slate-200 dark:border-slate-700 pb-2.5 flex items-center justify-between">
              <div>
                <h3 class="font-bold text-sm">Informasi Pasien Rawat Inap — Bed ${bed.id}</h3>
                <p class="text-xs text-slate-500">${ward.bangsal} (${ward.kelas})</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-100 text-rose-800">TERISI</span>
            </div>

            <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <p><strong>Pasien:</strong> ${bed.pasien} <span class="font-mono text-slate-500">(${bed.noRm || '-'})</span></p>
              <p><strong>Tanggal Masuk:</strong> <span class="font-mono">${bed.tglMasuk}</span> (${bed.days || 1} Hari Perawatan)</p>
              <p><strong>Akumulasi Tarif Kamar:</strong> <span class="font-mono font-bold text-slate-900 dark:text-white">Rp ${((bed.days || 1) * ward.tarif).toLocaleString('id-ID')}</span></p>
            </div>

            <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <button onclick="document.getElementById('simrsInAppModal').classList.add('hidden')" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold">Tutup</button>
              <button id="btnConfirmDischargeBed" class="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold">Pulangkan / Pindah ke Sterilisasi</button>
            </div>
          </div>
        `;

        modal.classList.remove('hidden');

        card.querySelector('#btnConfirmDischargeBed').addEventListener('click', () => {
          const oldNoRm = bed.noRm;
          bed.status = 'sterilisasi';
          bed.noRm = '';
          bed.pasien = '-';
          ward.terisiTT = Math.max(0, ward.terisiTT - 1);

          if (oldNoRm) syncPatientBilling(oldNoRm);
          modal.classList.add('hidden');
          renderBedMapTab(container);
          if (window.showToast) showToast(`Bed ${bed.id} telah dikosongkan dan masuk antrean sterilisasi`, 'success');
        });
      } else {
        card.innerHTML = `
          <div class="p-6 space-y-4 text-slate-900 dark:text-white">
            <div class="border-b border-slate-200 dark:border-slate-700 pb-2.5 flex items-center justify-between">
              <div>
                <h3 class="font-bold text-sm">Sterilisasi Ranjang — Bed ${bed.id}</h3>
                <p class="text-xs text-slate-500">${ward.bangsal}</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-100 text-amber-800">STERILISASI</span>
            </div>

            <p class="text-xs text-slate-600 dark:text-slate-400">Ranjang sedang dalam proses pembersihan cairan disinfektan dan penggantian sprei bersih (linen steril).</p>

            <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
              <button onclick="document.getElementById('simrsInAppModal').classList.add('hidden')" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold">Batal</button>
              <button id="btnConfirmCleanBed" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold">Tandai Bersih & Siap Pakai</button>
            </div>
          </div>
        `;

        modal.classList.remove('hidden');

        card.querySelector('#btnConfirmCleanBed').addEventListener('click', () => {
          bed.status = 'kosong';
          bed.noRm = '';
          bed.pasien = '-';
          modal.classList.add('hidden');
          renderBedMapTab(container);
          if (window.showToast) showToast(`Bed ${bed.id} siap digunakan untuk pasien baru`, 'success');
        });
      }
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
              <span class="font-mono">Standar: 60-85%</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span id="txtBorVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.bor}%</span>
              <span id="txtBorBadge" class="px-2 py-0.5 rounded text-[10px] font-medium border ${m.statusClass}">${m.status}</span>
            </div>
            <p class="text-[10px] text-slate-500">Tingkat efisiensi hunian tempat tidur</p>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>ALOS (Length of Stay)</span>
              <span class="font-mono">Standar: 3-6 Hari</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtAlosVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.alos}</span>
              <span class="text-xs text-slate-500">Hari</span>
            </div>
            <p class="text-[10px] text-slate-500">Rata-rata lama rawat pasien</p>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>TOI (Turn Over Interval)</span>
              <span class="font-mono">Standar: 1-3 Hari</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtToiVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.toi}</span>
              <span class="text-xs text-slate-500">Hari</span>
            </div>
            <p class="text-[10px] text-slate-500">Interval tenggang waktu ranjang kosong</p>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>BTO (Bed Turn Over)</span>
              <span class="font-mono">Standar: 3-5x/bln</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span id="txtBtoVal" class="text-2xl font-bold font-mono text-slate-900 dark:text-white">${m.bto}</span>
              <span class="text-xs text-slate-500">Kali</span>
            </div>
            <p class="text-[10px] text-slate-500">Perputaran pergantian pemakaian bed</p>
          </div>
        </div>

        <!-- Simulator Sensitivity -->
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ${isEn ? "Barber-Johnson Graphic Sensitivity Simulator" : "Simulasi Sensitivitas Parameter Efisiensi Barber-Johnson"}
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div class="flex justify-between mb-1">
                <span>Total Kapasitas Tempat Tidur (A):</span>
                <span id="lblTt" class="font-mono font-bold">${totalTT} Bed</span>
              </div>
              <input type="range" id="rangeTt" min="20" max="150" value="${totalTT}" class="w-full accent-slate-900 dark:accent-slate-100 cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span>Tempat Tidur Terisi Pasien (O):</span>
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
  // TAB 8: BRIDGING KEMENKES SATUSEHAT (FHIR HL7) & BPJS V-CLAIM
  // =========================================================================
  function renderSatuSehatTab(container) {
    const isEn = window.currentLang === 'en';

    const sampleEncounter = {
      resourceType: "Encounter",
      id: "ENC-20260905-001",
      identifier: [{ system: "http://sys-ids.kemkes.go.id/encounter/1000001", value: "P-001" }],
      status: "finished",
      class: { system: "http://terminology.hl7.org/CodeSystem/v3-ActCode", code: "AMB", display: "ambulatory" },
      subject: { reference: "Patient/P01234567890", display: "Bambang Sudarmono" },
      participant: [{ individual: { reference: "Practitioner/N10000001", display: "dr. Hendra Wijaya, Sp.PD" } }],
      diagnosis: [{ condition: { reference: "Condition/COND-20260905-001", display: "Essential (primary) hypertension [I10]" } }]
    };

    const sampleCondition = {
      resourceType: "Condition",
      id: "COND-20260905-001",
      clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }] },
      verificationStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-ver-status", code: "confirmed" }] },
      category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "encounter-diagnosis" }] }],
      code: { coding: [{ system: "http://hl7.org/fhir/sid/icd-10", code: "I10", display: "Essential (primary) hypertension" }] },
      subject: { reference: "Patient/P01234567890", display: "Bambang Sudarmono" }
    };

    const sampleObservation = {
      resourceType: "Observation",
      id: "OBS-20260905-001",
      status: "final",
      category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "vital-signs" }] }],
      code: { coding: [{ system: "http://loinc.org", code: "85354-9", display: "Blood pressure panel" }] },
      subject: { reference: "Patient/P01234567890", display: "Bambang Sudarmono" },
      component: [
        { code: { coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" }] }, valueQuantity: { value: 150, unit: "mm[Hg]" } },
        { code: { coding: [{ system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure" }] }, valueQuantity: { value: 95, unit: "mm[Hg]" } }
      ]
    };

    container.innerHTML = `
      <div class="space-y-4">
        
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <i data-lucide="share-2" class="w-4 h-4 text-slate-500"></i>
                <span>${isEn ? "Kemenkes SatuSehat FHIR & BPJS V-Claim Bridging Inspector" : "Inspektor Interoperabilitas SatuSehat (FHIR HL7) & BPJS V-Claim"}</span>
              </h3>
              <p class="text-[11px] text-slate-500">Standar Permenkes No. 24/2022 (Encounter, Condition, Observation, dan HMAC-SHA256 Signature)</p>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">FHIR R4 Ready</span>
          </div>

          <!-- Payload Tabs -->
          <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1 text-xs">
            <button id="btnFhirEncounter" class="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs">1. FHIR Encounter</button>
            <button id="btnFhirCondition" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs">2. FHIR Condition (ICD-10)</button>
            <button id="btnFhirObservation" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs">3. FHIR Observation (Vitals)</button>
          </div>

          <pre class="bg-slate-950 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 shadow-inner max-h-[380px]"><code id="fhirPayloadViewer">${JSON.stringify(sampleEncounter, null, 2)}</code></pre>
        </div>

      </div>
    `;

    const viewer = container.querySelector('#fhirPayloadViewer');
    const b1 = container.querySelector('#btnFhirEncounter');
    const b2 = container.querySelector('#btnFhirCondition');
    const b3 = container.querySelector('#btnFhirObservation');

    function setBtnActive(activeBtn) {
      [b1, b2, b3].forEach(b => {
        b.className = "px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs";
      });
      activeBtn.className = "px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs";
    }

    b1.addEventListener('click', () => {
      setBtnActive(b1);
      viewer.textContent = JSON.stringify(sampleEncounter, null, 2);
    });
    b2.addEventListener('click', () => {
      setBtnActive(b2);
      viewer.textContent = JSON.stringify(sampleCondition, null, 2);
    });
    b3.addEventListener('click', () => {
      setBtnActive(b3);
      viewer.textContent = JSON.stringify(sampleObservation, null, 2);
    });
  }

  // =========================================================================
  // TAB 9: LARAVEL ARCHITECTURE & CODE INSPECTOR
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
      'SatuSehatFhirService.php': `<?php

namespace App\Services;

use App\Models\Pendaftaran;
use App\Models\RekamMedis;

class SatuSehatFhirService
{
    /**
     * Generate FHIR Encounter Resource (Permenkes 24/2022)
     */
    public function createEncounterResource(Pendaftaran $pendaftaran): array
    {
        return [
            'resourceType' => 'Encounter',
            'status' => $pendaftaran->status === 'selesai' ? 'finished' : 'in-progress',
            'class' => [
                'system' => 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                'code' => $pendaftaran->jenis_layanan === 'Rawat Inap' ? 'IMP' : 'AMB',
            ],
            'subject' => ['reference' => 'Patient/' . $pendaftaran->pasien->ihs_number],
            'participant' => [['individual' => ['display' => $pendaftaran->dokter->nama_dokter]]],
            'period' => ['start' => $pendaftaran->waktu_daftar?->toIso8601String() ?? now()->toIso8601String()],
        ];
    }
}`,
      'LaboratoriumController.php': `<?php

namespace App\Http\Controllers;

use App\Models\Laboratorium;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LaboratoriumController extends Controller
{
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

        return redirect()->back()->with('success', 'Permintaan laboratorium LOINC terkirim.');
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

  // =========================================================================
  // GLOBAL EHR MODAL & CLINICAL SOP MODAL
  // =========================================================================
  window.simrsOpenEhrModal = function(noRm) {
    const pasien = DB.pasiens.find(p => p.noRm === noRm);
    if (!pasien) return;

    const rme = DB.rekamMedisList.find(r => r.noRm === noRm);
    const labs = DB.labOrders.filter(l => l.noRm === noRm);
    const rxs = DB.prescriptions.filter(p => p.noRm === noRm);
    const billing = DB.billings.find(b => b.noRm === noRm);

    const modal = document.getElementById('simrsInAppModal');
    const card = document.getElementById('simrsInAppModalCard');
    if (!modal || !card) return;

    card.innerHTML = `
      <div class="p-6 space-y-4 text-slate-900 dark:text-white">
        <div class="border-b border-slate-200 dark:border-slate-700 pb-3 flex items-start justify-between">
          <div>
            <h3 class="font-bold text-sm">Resume Rekam Medis Elektronik (EHR)</h3>
            <p class="text-xs text-slate-500">${pasien.nama} • <span class="font-mono">${pasien.noRm}</span> • NIK: <span class="font-mono">${pasien.nik}</span></p>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
            ${pasien.penjamin}
          </span>
        </div>

        <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-1 text-xs">
          <!-- SOAP Assessment -->
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 class="font-bold text-[11px] uppercase tracking-wider text-slate-500">Asesmen SOAP Dokter</h4>
            ${rme ? `
              <p><strong>Subjektif:</strong> ${rme.s}</p>
              <p><strong>Objektif:</strong> <span class="font-mono text-slate-600 dark:text-slate-300">${rme.o}</span></p>
              <p><strong>Diagnosis ICD-10:</strong> <span class="font-mono font-semibold text-emerald-600 dark:text-emerald-400">[${rme.a_icd10}] ${rme.a_diagnosis}</span></p>
              <p><strong>Tindakan:</strong> ${rme.p_tindakan ? rme.p_tindakan.join(', ') : '-'}</p>
            ` : '<p class="text-slate-400 italic">Belum ada asesmen SOAP tersimpan.</p>'}
          </div>

          <!-- Lab Tests -->
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 class="font-bold text-[11px] uppercase tracking-wider text-slate-500">Hasil Uji Laboratorium (LOINC)</h4>
            ${labs.length ? `
              <ul class="space-y-1">
                ${labs.map(l => `
                  <li class="font-mono text-[11px] flex justify-between">
                    <span>• ${l.tes} [${l.loinc}]: ${l.hasil}</span>
                    <span class="font-bold ${l.status === 'normal' ? 'text-emerald-600' : 'text-rose-600'}">${l.status.toUpperCase()}</span>
                  </li>
                `).join('')}
              </ul>
            ` : '<p class="text-slate-400 italic">Tidak ada order laboratorium tercatat.</p>'}
          </div>

          <!-- Prescriptions -->
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 class="font-bold text-[11px] uppercase tracking-wider text-slate-500">Terapi Resep Obat Farmasi</h4>
            ${rxs.length ? `
              <ul class="space-y-1">
                ${rxs.map(p => `
                  <li class="font-mono text-[11px] flex justify-between">
                    <span>• ${p.obat} (${p.signa}) - Qty: ${p.qty}</span>
                    <span class="text-slate-500">Rp ${p.harga.toLocaleString('id-ID')}</span>
                  </li>
                `).join('')}
              </ul>
            ` : '<p class="text-slate-400 italic">Tidak ada resep obat tercatat.</p>'}
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button onclick="document.getElementById('simrsInAppModal').classList.add('hidden')" class="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold">Tutup</button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };

  function openSopModal() {
    const modal = document.getElementById('simrsInAppModal');
    const card = document.getElementById('simrsInAppModalCard');
    if (!modal || !card) return;

    card.innerHTML = `
      <div class="p-6 space-y-4 text-slate-900 dark:text-white">
        <div class="border-b border-slate-200 dark:border-slate-700 pb-2.5">
          <h3 class="font-bold text-sm">Standar Operasional Prosedur (SOP) Alur SIMRS</h3>
          <p class="text-xs text-slate-500">Alur Pelayanan Rumah Sakit Berbasis Rekam Medis Elektronik Terintegrasi</p>
        </div>

        <div class="space-y-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300 max-h-[60vh] overflow-y-auto pr-1">
          <p><strong>1. Admisi & Validasi BPJS V-Claim:</strong> Pasien mendaftar dengan NIK 16 digit, sistem memvalidasi kepesertaan dan menerbitkan Surat Eligibilitas Peserta (SEP).</p>
          <p><strong>2. Pelayanan Poliklinik & RME SOAP:</strong> Dokter mencatat Anamnesis (S), Tanda Vital (O), menetapkan diagnosis ICD-10 (A), serta input tindakan medis (P).</p>
          <p><strong>3. E-Order Laboratorium:</strong> Analis memproses uji diagnostik berbasis kodefikasi LOINC standar internasional.</p>
          <p><strong>4. E-Prescribing Farmasi:</strong> Peresepan obat elektronik dengan signa Latin yang tersinkronisasi langsung ke antrean dispensing apotek.</p>
          <p><strong>5. Kasir Billing Reaktif:</strong> Seluruh biaya terkonsolidasi otomatis dengan pemotongan klaim penjamin dan pencetakan kwitansi resmi.</p>
          <p><strong>6. Alokasi Kamar Ranap & Indikator BOR:</strong> Pemantauan efisiensi pemanfaatan bed rawat inap berdasarkan grafik Barber-Johnson.</p>
        </div>

        <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button onclick="document.getElementById('simrsInAppModal').classList.add('hidden')" class="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold">Tutup</button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

})();
