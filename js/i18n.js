/**
 * i18n.js
 * Internationalization Engine (Indonesian <-> English)
 * Mengelola peralihan bahasa secara real-time pada Landing Page, SIMRS Core, DevTools Suite, Modal Workspace, dan Profil Pengembang.
 */

window.I18N_DICT = {
  id: {
    // Top Navbar
    navLinkHome: "Beranda",
    navLinkProjects: "Proyek Unggulan",
    navLinkExp: "Pengalaman",
    navLinkCert: "Sertifikasi",
    btnInterviewGuide: "Panduan Teknis",
    btnAboutDev: "Profil Pengembang",

    // Hero Section
    heroBadge: "Rizki Ananda, S.Kom • S1 Informatika",
    heroTitle: "Rizki Ananda",
    heroSubTitle: "Software & Web Developer",
    heroDesc: "Fokus pada pengembangan aplikasi web menggunakan Laravel, Python, dan JavaScript, mulai dari perancangan arsitektur backend hingga integrasi antarmuka yang fungsional dan responsif.",
    btnHeroViewProjects: "Lihat Proyek Unggulan ➔",
    btnHeroViewExp: "Pengalaman & Keahlian",
    
    // Featured Projects Section
    secHeadingProjects: "Proyek Unggulan (Featured Projects)",
    secSubProjects: "Pilih dan jelajahi aplikasi produksi mandiri di bawah ini:",
    
    // SIMRS Card
    simrsCardTitle: "SIMRS Core Enterprise",
    simrsCardSub: "Hospital MIS • Permenkes 24/2022",
    simrsCardStatus: "PRODUKSI",
    simrsCardDesc: "Sistem manajemen rumah sakit terintegrasi penuh: admisi & bridging BPJS SEP, rekam medis elektronik (RME SOAP) dengan pencarian 40+ ICD-10, E-Order Lab LOINC, E-Prescribing farmasi, kasir billing reaktif berkwitansi resmi, alokasi ranjang kamar inap (Bed Matrix), serta indikator efisiensi BOR.",
    simrsBullet1: "Bridging BPJS V-Claim & SatuSehat FHIR Bundle Permenkes 24/2022",
    simrsBullet2: "Alur Layanan Klinis Terkoneksi Real-time (Admisi ➔ SOAP ➔ Lab/Rx ➔ Kasir)",
    simrsBullet3: "Modal Manajemen Bed Ranap, Audio Antrean, & Kwitansi Resmi",
    simrsBtnOpen: "Buka SIMRS",

    // DevTools Card
    devtoolsCardTitle: "Dev & Data Engineering Suite",
    devtoolsCardSub: "29 Interactive Computational Tools",
    devtoolsCardStatus: "29 MODUL",
    devtoolsCardDesc: "Platform utilitas 29 modul komputasi interaktif: kalkulasi subnetting IPv4/VLSM, generator firewall Linux/Mikrotik, data cleaner & outlier QC inspector, formula engine spreadsheet (VLOOKUP/Regex), security audit (JWT/Hash/Entropy), serta kalkulator hardware server.",
    devtoolsBullet1: "Kalkulator Subnetting IPv4/VLSM & Firewall CLI Multi-Platform",
    devtoolsBullet2: "Data Cleaner Studio, Outlier Inspector, & Formula Parser",
    devtoolsBullet3: "Sistem Keamanan & Kriptografi (Entropy, JWT Debugger, Hashes)",
    devtoolsBtnOpen: "Jelajahi 29 Tools",

    // SHUNA AI Card
    shunaCardTitle: "SHUNA AI Data Engine",
    shunaCardSub: "NLP & Machine Learning Engine",
    shunaCardDesc: "Platform analitik data & machine learning: pipeline NLP klasifikasi sentimen (TF-IDF & slang normalizer), visualisasi word cloud leksikal, benchmark multi-model ROC-AUC, simulator prediksi retensi tabular (Sigmoid), time-series forecasting (Holt-Winters), serta deteksi lonjakan anomali Z-Score.",
    shunaBullet1: "Pipeline NLP Interaktif (Slang Normalizer ID, Stopwords, TF-IDF)",
    shunaBullet2: "Multi-Model Arena (LogReg, SVM, NB, RF) & Dynamic ROC-AUC Curve",
    shunaBullet3: "Word Cloud Leksikal, Simulator Retensi Tabular, & Batch CSV Engine",
    shunaBtnOpen: "Buka SHUNA AI",
    shunaBackLink: "Kembali ke Beranda",

    // Experience & Certifications Section
    secHeadingExp: "Pengalaman Kerja",
    secSubExp: "Rekam jejak praktis di bidang riset infrastruktur server dan operasional IT:",
    secHeadingCert: "Lisensi & Sertifikasi",
    secSubCert: "Kredensial kompetensi nasional di bidang administrasi jaringan dan infrastruktur:",
    
    job1Title: "IT Researcher (Freelance)",
    job1Company: "ADZKIA KEDINASAN PUSAT MEDAN",
    job1Meta: "Nov 2024 - Jun 2025",
    job1Desc: "Merancang, mengonfigurasi, dan menguji infrastruktur <strong>Nginx Media Server</strong> pada Linux VM, serta melakukan benchmark terhadap 4 protokol streaming video (<strong>RTMP, HLS, RTSP, HTTP</strong>). Melakukan audit keamanan jaringan &amp; <strong>vulnerability assessment (VAPT)</strong> pada sistem internal.",
    
    job2Title: "IT Support (Vendor Outsourcing)",
    job2Company: "PT BANK SINARMAS, TBK (KC MEDAN MANGKUBUMI)",
    job2Meta: "Des 2023",
    job2Desc: "Melaksanakan proyek peremajaan komputer (<strong>PC Deployment</strong>), instalasi hardware, backup dan migrasi data profil user secara aman, perapian kabel, serta konfigurasi peripheral printer slip dan scanner hingga terhubung ke domain perbankan.",

    cert1Title: "Associate Network Administrator",
    cert1Issuer: "BNSP / Komdigi RI (2026)",
    cert1Desc: "Standar kompetensi nasional perancangan skema pengalamatan IP Addressing, subnetting VLSM, konfigurasi perangkat router/switch, dan routing jaringan terdistribusi.",
    
    cert2Title: "Junior Network Administrator",
    cert2Issuer: "BBPSDMP Kominfo (2023)",
    cert2Desc: "Instalasi jaringan komputer lokal (LAN), manajemen sistem operasi Linux / Nginx, dan pemeliharaan server data.",

    verifiedLabel: "TERVERIFIKASI",

    // Technical Interview Guide Modal
    modalInterviewTitle: "Panduan Teknis & Arsitektur",
    modalInterviewSub: "Dokumentasi Standar Rekayasa & Pertanyaan Wawancara",

    // Terminal CLI
    terminalPromptTitle: "bash — infinitenull@terminal:~",
    terminalQuickLabel: "Akses:",
    terminalInputPlaceholder: "Ketik perintah (misal: help, whoami, stack, simrs, devtools, shuna)...",
    terminalHelpContent: `
      <div class="font-bold text-sky-400">Perintah Interaktif Tersedia (Quick Commands):</div>
      <div>• <span class="text-emerald-400 font-bold">whoami</span>: Ringkasan profil pengembang</div>
      <div>• <span class="text-emerald-400 font-bold">stack</span>: Tech stack backend, frontend, &amp; sistem</div>
      <div>• <span class="text-emerald-400 font-bold">projects</span>: Daftar 3 sistem produksi utama</div>
      <div>• <span class="text-emerald-400 font-bold">simrs</span>: Buka aplikasi SIMRS Core Enterprise</div>
      <div>• <span class="text-emerald-400 font-bold">devtools</span>: Buka workspace 29 Web Tools</div>
      <div>• <span class="text-emerald-400 font-bold">shuna</span>: Buka engine analitik SHUNA AI</div>
      <div>• <span class="text-emerald-400 font-bold">contact</span>: Informasi kontak &amp; GitHub</div>
      <div>• <span class="text-emerald-400 font-bold">clear</span>: Bersihkan layar terminal</div>
    `,

    // Footer
    footerTagline: "© 2026 Rizki Ananda, S.Kom (@InfiniteNull) • Handcrafted with Clean Code & Professional IT Standards.",
    footerBackToTop: "Ke Atas ↑"
  },

  en: {
    // Top Navbar
    navLinkHome: "Home",
    navLinkProjects: "Featured Projects",
    navLinkExp: "Experience",
    navLinkCert: "Certifications",
    btnInterviewGuide: "Technical Guide",
    btnAboutDev: "About Developer",

    // Hero Section
    heroBadge: "Rizki Ananda, S.Kom • Computer Science",
    heroTitle: "Rizki Ananda",
    heroSubTitle: "Software & Web Developer",
    heroDesc: "Focused on web application development using Laravel, Python, and JavaScript, from backend architecture design to responsive and functional user interfaces.",
    btnHeroViewProjects: "View Featured Projects ➔",
    btnHeroViewExp: "Experience & Skills",
    
    // Featured Projects Section
    secHeadingProjects: "Featured Projects",
    secSubProjects: "Select and explore standalone production applications below:",
    
    // SIMRS Card
    simrsCardTitle: "SIMRS Core Enterprise",
    simrsCardSub: "Hospital MIS • Permenkes 24/2022",
    simrsCardStatus: "PRODUCTION",
    simrsCardDesc: "Fully integrated hospital management system: admission & BPJS SEP bridging, electronic medical records (EMR SOAP) with searchable 40+ ICD-10 diagnoses, LOINC Lab E-Orders, Pharmacy E-Prescribing, reactive billing cashier with official receipts, Inpatient Bed Matrix, and BOR efficiency indicators.",
    simrsBullet1: "BPJS V-Claim Bridging & SatuSehat FHIR Bundle (Permenkes 24/2022)",
    simrsBullet2: "Real-Time Connected Clinical Workflow (Admission ➔ SOAP ➔ Lab/Rx ➔ Cashier)",
    simrsBullet3: "Inpatient Bed Matrix, Audio Queue Caller, & Official Receipts",
    simrsBtnOpen: "Launch SIMRS",

    // DevTools Card
    devtoolsCardTitle: "Dev & Data Engineering Suite",
    devtoolsCardSub: "29 Interactive Computational Tools",
    devtoolsCardStatus: "29 MODULES",
    devtoolsCardDesc: "Standalone platform of 29 interactive computational tools: IPv4/VLSM subnetting calculations, multi-platform Linux/Mikrotik firewall generators, data cleaning & outlier QC inspectors, spreadsheet formula engines (VLOOKUP/Regex), security audits (JWT/Hash/Entropy), and server hardware calculators.",
    devtoolsBullet1: "IPv4/VLSM Subnet Calculator & Multi-Platform Firewall CLI",
    devtoolsBullet2: "Data Cleaner Studio, Outlier Inspector, & Formula Parser",
    devtoolsBullet3: "Security & Cryptography Systems (Entropy, JWT Debugger, Hashes)",
    devtoolsBtnOpen: "Explore 29 Tools",

    // SHUNA AI Card
    shunaCardTitle: "SHUNA AI Data Engine",
    shunaCardSub: "NLP & Machine Learning Engine",
    shunaCardDesc: "Integrated data intelligence & machine learning platform: live NLP sentiment pipeline (TF-IDF & slang normalizer), lexical word cloud visualizer, multi-model ROC-AUC arena, tabular student retention predictive simulator (Sigmoid), Holt-Winters forecasting, and rolling Z-score spike anomaly detection.",
    shunaBullet1: "Interactive NLP Pipeline (Indonesian Slang Normalizer, Stopwords, TF-IDF)",
    shunaBullet2: "Multi-Model Arena (LogReg, SVM, NB, RF) & Dynamic ROC-AUC Curve",
    shunaBullet3: "Lexical Word Cloud, Tabular Retention Simulator, & Batch CSV Engine",
    shunaBtnOpen: "Launch SHUNA AI",
    shunaBackLink: "Back to Home",

    // Experience & Certifications Section
    secHeadingExp: "Work Experience",
    secSubExp: "Practical track record in server infrastructure research and IT operations:",
    secHeadingCert: "Licenses & Certifications",
    secSubCert: "National competency credentials in network administration and infrastructure:",
    
    job1Title: "IT Researcher (Freelance)",
    job1Company: "ADZKIA KEDINASAN PUSAT MEDAN",
    job1Meta: "Nov 2024 - Jun 2025",
    job1Desc: "Architected, configured, and benchmarked <strong>Nginx Media Server</strong> infrastructure on Linux VMs across 4 streaming protocols (<strong>RTMP, HLS, RTSP, HTTP</strong>). Conducted internal network security audits and <strong>vulnerability assessments (VAPT)</strong>.",
    
    job2Title: "IT Support (Vendor Outsourcing)",
    job2Company: "PT BANK SINARMAS, TBK (KC MEDAN MANGKUBUMI)",
    job2Meta: "Dec 2023",
    job2Desc: "Executed enterprise <strong>PC Deployment</strong>, hardware assembly, secure user profile data backup & migration, OS installation, and peripheral configuration (slip printers, document scanners) connected to banking domain.",

    cert1Title: "Associate Network Administrator",
    cert1Issuer: "BNSP / Komdigi RI (2026)",
    cert1Desc: "National competency standard for IP Addressing scheme design, VLSM subnetting, router/switch configuration, and distributed network routing.",
    
    cert2Title: "Junior Network Administrator",
    cert2Issuer: "BBPSDMP Kominfo (2023)",
    cert2Desc: "Local Area Network (LAN) installation, Linux / Nginx server administration, and data server maintenance.",

    verifiedLabel: "VERIFIED",

    // Technical Interview Guide Modal
    modalInterviewTitle: "Technical & Architecture Guide",
    modalInterviewSub: "Engineering Standards & Interview Readiness Documentation",

    // Terminal CLI
    terminalPromptTitle: "bash — infinitenull@terminal:~",
    terminalQuickLabel: "Quick:",
    terminalInputPlaceholder: "Type command (e.g. help, whoami, stack, simrs, devtools, shuna)...",
    terminalHelpContent: `
      <div class="font-bold text-sky-400">Available Interactive Commands:</div>
      <div>• <span class="text-emerald-400 font-bold">whoami</span>: Developer profile &amp; credentials summary</div>
      <div>• <span class="text-emerald-400 font-bold">stack</span>: Backend, frontend, &amp; infrastructure tech stack</div>
      <div>• <span class="text-emerald-400 font-bold">projects</span>: List of 3 flagship production systems</div>
      <div>• <span class="text-emerald-400 font-bold">simrs</span>: Open SIMRS Core Enterprise application</div>
      <div>• <span class="text-emerald-400 font-bold">devtools</span>: Open 29 Web Tools workspace</div>
      <div>• <span class="text-emerald-400 font-bold">shuna</span>: Open SHUNA AI analytics engine</div>
      <div>• <span class="text-emerald-400 font-bold">contact</span>: Contact information &amp; GitHub</div>
      <div>• <span class="text-emerald-400 font-bold">clear</span>: Clear terminal screen</div>
    `,

    // Footer
    footerTagline: "© 2026 Rizki Ananda, S.Kom (@InfiniteNull) • Handcrafted with Clean Code & Professional IT Standards.",
    footerBackToTop: "Back to Top ↑"
  }
};

// Global Current Language State
window.currentLang = localStorage.getItem('app_lang') || 'id';

// Function to switch language dynamically
window.setLanguage = function(lang) {
  if (lang !== 'id' && lang !== 'en') lang = 'id';
  window.currentLang = lang;
  localStorage.setItem('app_lang', lang);

  const dict = window.I18N_DICT[lang];
  if (!dict) return;

  // 1. Navbar
  const langLabel = document.getElementById('langLabel');
  if (langLabel) langLabel.textContent = lang === 'id' ? 'ID' : 'EN';

  const navLinkHome = document.getElementById('navLinkHome');
  if (navLinkHome) navLinkHome.textContent = dict.navLinkHome;

  const navLinkProjects = document.getElementById('navLinkProjects');
  if (navLinkProjects) navLinkProjects.textContent = dict.navLinkProjects;

  const navLinkExp = document.getElementById('navLinkExp');
  if (navLinkExp) navLinkExp.textContent = dict.navLinkExp;

  const navLinkCert = document.getElementById('navLinkCert');
  if (navLinkCert) navLinkCert.textContent = dict.navLinkCert;

  const btnInterviewGuide = document.getElementById('btnInterviewGuide');
  if (btnInterviewGuide) btnInterviewGuide.textContent = dict.btnInterviewGuide;

  // 2. Hero Section
  const heroBadge = document.getElementById('heroBadge');
  if (heroBadge) heroBadge.textContent = dict.heroBadge;

  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.textContent = dict.heroTitle;

  const heroSubTitle = document.getElementById('heroSubTitle');
  if (heroSubTitle) heroSubTitle.textContent = dict.heroSubTitle;

  const heroDesc = document.getElementById('heroDesc');
  if (heroDesc) heroDesc.textContent = dict.heroDesc;

  const btnHeroViewProjectsText = document.getElementById('btnHeroViewProjectsText');
  if (btnHeroViewProjectsText) btnHeroViewProjectsText.textContent = dict.btnHeroViewProjects;

  const btnHeroViewExpText = document.getElementById('btnHeroViewExpText');
  if (btnHeroViewExpText) btnHeroViewExpText.textContent = dict.btnHeroViewExp;

  // 3. Featured Projects
  const secHeadingProjects = document.getElementById('secHeadingProjects');
  if (secHeadingProjects) {
    const span = secHeadingProjects.querySelector('span');
    if (span) span.textContent = dict.secHeadingProjects;
  }

  const secSubProjects = document.getElementById('secSubProjects');
  if (secSubProjects) secSubProjects.textContent = dict.secSubProjects;

  // SIMRS Card
  const simrsCardTitle = document.getElementById('simrsCardTitle');
  if (simrsCardTitle) simrsCardTitle.textContent = dict.simrsCardTitle;

  const simrsCardSub = document.getElementById('simrsCardSub');
  if (simrsCardSub) simrsCardSub.textContent = dict.simrsCardSub;

  const simrsCardDesc = document.getElementById('simrsCardDesc');
  if (simrsCardDesc) simrsCardDesc.textContent = dict.simrsCardDesc;

  const simrsBullet1 = document.getElementById('simrsBullet1');
  if (simrsBullet1) simrsBullet1.textContent = dict.simrsBullet1;

  const simrsBullet2 = document.getElementById('simrsBullet2');
  if (simrsBullet2) simrsBullet2.textContent = dict.simrsBullet2;

  const simrsBullet3 = document.getElementById('simrsBullet3');
  if (simrsBullet3) simrsBullet3.textContent = dict.simrsBullet3;

  const simrsBtnOpen = document.getElementById('simrsBtnOpen');
  if (simrsBtnOpen) simrsBtnOpen.textContent = dict.simrsBtnOpen;

  // DevTools Card
  const devtoolsCardTitle = document.getElementById('devtoolsCardTitle');
  if (devtoolsCardTitle) devtoolsCardTitle.textContent = dict.devtoolsCardTitle;

  const devtoolsCardSub = document.getElementById('devtoolsCardSub');
  if (devtoolsCardSub) devtoolsCardSub.textContent = dict.devtoolsCardSub;

  const devtoolsCardDesc = document.getElementById('devtoolsCardDesc');
  if (devtoolsCardDesc) devtoolsCardDesc.textContent = dict.devtoolsCardDesc;

  const devtoolsBullet1 = document.getElementById('devtoolsBullet1');
  if (devtoolsBullet1) devtoolsBullet1.textContent = dict.devtoolsBullet1;

  const devtoolsBullet2 = document.getElementById('devtoolsBullet2');
  if (devtoolsBullet2) devtoolsBullet2.textContent = dict.devtoolsBullet2;

  const devtoolsBullet3 = document.getElementById('devtoolsBullet3');
  if (devtoolsBullet3) devtoolsBullet3.textContent = dict.devtoolsBullet3;

  const devtoolsBtnOpen = document.getElementById('devtoolsBtnOpen');
  if (devtoolsBtnOpen) devtoolsBtnOpen.textContent = dict.devtoolsBtnOpen;

  // SHUNA AI Card
  const shunaCardTitle = document.getElementById('shunaCardTitle');
  if (shunaCardTitle) shunaCardTitle.textContent = dict.shunaCardTitle;

  const shunaCardSub = document.getElementById('shunaCardSub');
  if (shunaCardSub) shunaCardSub.textContent = dict.shunaCardSub;

  const shunaCardDesc = document.getElementById('shunaCardDesc');
  if (shunaCardDesc) shunaCardDesc.textContent = dict.shunaCardDesc;

  const shunaBullet1 = document.getElementById('shunaBullet1');
  if (shunaBullet1) shunaBullet1.textContent = dict.shunaBullet1;

  const shunaBullet2 = document.getElementById('shunaBullet2');
  if (shunaBullet2) shunaBullet2.textContent = dict.shunaBullet2;

  const shunaBullet3 = document.getElementById('shunaBullet3');
  if (shunaBullet3) shunaBullet3.textContent = dict.shunaBullet3;

  const shunaBtnOpen = document.getElementById('shunaBtnOpen');
  if (shunaBtnOpen) shunaBtnOpen.textContent = dict.shunaBtnOpen;

  // 4. Experience Section
  const secHeadingExp = document.getElementById('secHeadingExp');
  if (secHeadingExp) {
    const span = secHeadingExp.querySelector('span');
    if (span) span.textContent = dict.secHeadingExp;
  }

  const secSubExp = document.getElementById('secSubExp');
  if (secSubExp) secSubExp.textContent = dict.secSubExp;

  const job1Title = document.getElementById('job1Title');
  if (job1Title) job1Title.textContent = dict.job1Title;

  const job1Company = document.getElementById('job1Company');
  if (job1Company) job1Company.textContent = dict.job1Company;

  const job1Meta = document.getElementById('job1Meta');
  if (job1Meta) job1Meta.textContent = dict.job1Meta;

  const job1Desc = document.getElementById('job1Desc');
  if (job1Desc) job1Desc.innerHTML = dict.job1Desc;

  const job2Title = document.getElementById('job2Title');
  if (job2Title) job2Title.textContent = dict.job2Title;

  const job2Company = document.getElementById('job2Company');
  if (job2Company) job2Company.textContent = dict.job2Company;

  const job2Meta = document.getElementById('job2Meta');
  if (job2Meta) job2Meta.textContent = dict.job2Meta;

  const job2Desc = document.getElementById('job2Desc');
  if (job2Desc) job2Desc.innerHTML = dict.job2Desc;

  // 5. Certifications Section
  const secHeadingCert = document.getElementById('secHeadingCert');
  if (secHeadingCert) {
    const span = secHeadingCert.querySelector('span');
    if (span) span.textContent = dict.secHeadingCert;
  }

  const secSubCert = document.getElementById('secSubCert');
  if (secSubCert) secSubCert.textContent = dict.secSubCert;

  const cert1Title = document.getElementById('cert1Title');
  if (cert1Title) cert1Title.textContent = dict.cert1Title;

  const cert1Desc = document.getElementById('cert1Desc');
  if (cert1Desc) cert1Desc.textContent = dict.cert1Desc;

  const cert1Verified = document.getElementById('cert1Verified');
  if (cert1Verified) cert1Verified.textContent = dict.verifiedLabel;

  const cert2Title = document.getElementById('cert2Title');
  if (cert2Title) cert2Title.textContent = dict.cert2Title;

  const cert2Desc = document.getElementById('cert2Desc');
  if (cert2Desc) cert2Desc.textContent = dict.cert2Desc;

  const cert2Verified = document.getElementById('cert2Verified');
  if (cert2Verified) cert2Verified.textContent = dict.verifiedLabel;

  // 6. Technical Interview Guide Modal
  const modalInterviewTitle = document.getElementById('modalInterviewTitle');
  if (modalInterviewTitle) modalInterviewTitle.textContent = dict.modalInterviewTitle;

  const modalInterviewSub = document.getElementById('modalInterviewSub');
  if (modalInterviewSub) modalInterviewSub.textContent = dict.modalInterviewSub;

  // 7. Terminal CLI
  const terminalPromptTitle = document.getElementById('terminalPromptTitle');
  if (terminalPromptTitle && dict.terminalPromptTitle) terminalPromptTitle.textContent = dict.terminalPromptTitle;

  const terminalQuickLabel = document.getElementById('terminalQuickLabel');
  if (terminalQuickLabel && dict.terminalQuickLabel) terminalQuickLabel.textContent = dict.terminalQuickLabel;

  const terminalInput = document.getElementById('terminalInput');
  if (terminalInput && dict.terminalInputPlaceholder) terminalInput.placeholder = dict.terminalInputPlaceholder;

  const terminalHelpBody = document.getElementById('terminalHelpBody');
  if (terminalHelpBody && dict.terminalHelpContent) terminalHelpBody.innerHTML = dict.terminalHelpContent;

  // 8. Footer
  const footerTagline = document.getElementById('footerTagline');
  if (footerTagline) footerTagline.textContent = dict.footerTagline;

  const footerBackToTop = document.getElementById('footerBackToTop');
  if (footerBackToTop) footerBackToTop.textContent = dict.footerBackToTop;
};
