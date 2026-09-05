/**
 * i18n.js
 * Internationalization Engine (Indonesian <-> English)
 * Mengelola peralihan bahasa secara real-time pada Landing Page, SIMRS Core, DevTools Suite, Modal Workspace, dan Profil Pengembang.
 */

window.I18N_DICT = {
  id: {
    // Top Navbar
    navLinkHome: "Beranda",
    navLinkProjects: "Proyek",
    navLinkExp: "Pengalaman",
    navLinkCert: "Sertifikasi",
    btnInterviewGuide: "Panduan Teknis",
    btnAboutDev: "Profil Pengembang",

    // Hero Section
    heroBadge: "Rizki Ananda, S.Kom • S1 Informatika",
    heroTitle: "Rizki Ananda",
    heroSubTitle: "Software & Web Developer",
        heroDesc: "Fokus pada pengembangan aplikasi web menggunakan Laravel, Python, dan JavaScript, dari perancangan backend hingga integrasi UI/UX.",
    btnHeroViewProjects: "Lihat Proyek ➔",
    btnHeroViewExp: "Pengalaman & Keahlian",
    
    // Featured Projects Section
    secHeadingProjects: "Proyek Unggulan (Featured Projects)",
    secSubProjects: "Pilih dan jelajahi aplikasi produksi mandiri di bawah ini:",
    
    // SIMRS Card
    simrsCardTitle: "SIMRS Core Enterprise",
    simrsCardSub: "Hospital Management Information System",
    simrsCardStatus: "PRODUKSI",
    simrsCardDesc: "Sistem manajemen rumah sakit terintegrasi penuh: admisi & bridging BPJS SEP, rekam medis elektronik (RME SOAP) dengan pencarian 40+ ICD-10, E-Order Lab LOINC, E-Prescribing farmasi, kasir billing reaktif berkwitansi resmi, alokasi ranjang kamar inap (Bed Matrix), serta indikator efisiensi BOR.",
    simrsBtnOpen: "Buka Aplikasi SIMRS",

    // DevTools Card
    devtoolsCardTitle: "Dev & Data Engineering Suite",
    devtoolsCardSub: "29 Interactive Computational Tools",
    devtoolsCardStatus: "29 MODUL",
    devtoolsCardDesc: "Platform utilitas mandiri 29 tools interaktif untuk kalkulasi subnetting IPv4, generator firewall Linux/Mikrotik, data cleaner & outlier QC inspector, spreadsheet formula engine (VLOOKUP/Regex), security audit (JWT/Hash/Entropy), dan kalkulator hardware server.",
    devtoolsBtnOpen: "Jelajahi 29 Tools",

    // SHUNA AI Card
    shunaCardTitle: "SHUNA AI Data Engine",
    shunaCardSub: "NLP & Machine Learning Engine",
    shunaCardDesc: "Sistem analitik data terpadu yang dirancang dan dibangun mandiri oleh pengembang (95%+ implementasi kode end-to-end) pada program MSIB Skilvul (Score 81.8): pipeline NLP sentimen & ekstraksi aspek, simulator prediksi retensi/dropout tabular (Sigmoid Logistic Regression), serta time-series forecasting (Holt-Winters) dan deteksi lonjakan anomali Z-Score.",
    shunaBtnOpen: "Buka SHUNA AI",
    shunaBackLink: "Kembali ke Beranda",

    // Experience & Certifications Section
    secHeadingExp: "Pengalaman Kerja",
    secSubExp: "Rekam jejak praktis di bidang riset infrastruktur server dan operasional IT:",
    secHeadingCert: "Lisensi & Sertifikasi",
    secSubCert: "Kredensial kompetensi nasional di bidang administrasi jaringan dan infrastruktur:",
    secSubExp: "Rekam jejak profesional, penelitian infrastruktur, dan lisensi kompetensi nasional:",
    
    job1Title: "IT Researcher (Freelance)",
    job1Company: "ADZKIA KEDINASAN PUSAT MEDAN",
    job1Meta: "Nov 2024 - Jun 2025",
    job1Desc: "Merancang, mengonfigurasi, dan menguji infrastruktur <strong>Nginx Media Server</strong> pada Linux VM, serta melakukan benchmark terhadap 4 protokol streaming video (<strong>RTMP, HLS, RTSP, HTTP</strong>). Melakukan audit keamanan jaringan & <strong>vulnerability assessment (VAPT)</strong> pada sistem internal.",
    
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

    // DevTools View UI
    devtoolsViewTitle: "Dev & Data Engineering Suite (29 Tools)",
    devtoolsViewDesc: "Platform utilitas mandiri untuk manajemen jaringan IPv4, hardening firewall, manipulasi & QC data, audit keamanan VAPT, serta utilitas hardware.",
    catAll: "Semua Tools (29)",
    catNetwork: "Jaringan & Server",
    catSecurity: "Keamanan Sistem",
    catDatabase: "Data & Backend",
    catUtility: "Utilitas & Hardware",
    searchPlaceholder: "Cari nama tool / teknologi...",
    emptyTitle: "Tidak ada tool yang cocok",
    emptyDesc: "Coba gunakan kata kunci pencarian lain atau ubah filter kategori.",
    openWorkspace: "Buka Workspace",

    // Tool Workspace Modal
    tabDemo: "Live Demo Interaktif",
    tabCode: "Source Code Asli",
    tabDocs: "Arsitektur & Penjelasan Teknis",
    copyCode: "Salin Kode",

    // Developer Profile Modal
    devRoleSub: "Universitas Potensi Utama • Praktisi IT",
    profileHeading: "Profil",
    profileBio: "Lulusan <strong>S1 Informatika (S.Kom) dari Universitas Potensi Utama</strong> dengan spesialisasi di bidang <strong>IT Support, Administrasi Jaringan, Keamanan Sistem (VAPT), serta Analisis Data & Rekayasa Web</strong>. Berpengalaman teknis dalam deployment infrastruktur server, protokol streaming, peremajaan PC perbankan, dan rekayasa perangkat lunak.",
    expHeading: "Pengalaman Kerja",
    certHeading: "Sertifikasi & Keahlian",

    // Footer
    footerBioText: "Lulusan S1 Informatika Universitas Potensi Utama. Praktisi IT Support, Network Administrator, VAPT Security, serta Analisis Data & Software Engineering.",
    footerTechHeading: "Kompetensi Inti",
    footerLinksHeading: "Tautan & Portofolio",
    footerLinksDesc: "Seluruh sistem dirancang mandiri dengan clean code dan dapat diakses interaktif.",
    footerTagline: "© 2026 Rizki Ananda, S.Kom (@InfiniteNull) • Handcrafted with Clean Code & Professional IT Standards."
  },

  en: {
    // Top Navbar
    navLinkHome: "Home",
    navLinkProjects: "Projects",
    navLinkExp: "Experience",
    navLinkCert: "Certifications",
    btnInterviewGuide: "Technical Guide",
    btnAboutDev: "About Developer",

    // Hero Section
    heroBadge: "Rizki Ananda, S.Kom • Computer Science",
    heroTitle: "Rizki Ananda",
    heroSubTitle: "Software & Web Developer",
        heroDesc: "Focused on web application development using Laravel, Python, and JavaScript, from backend architecture to UI/UX integration.",
    btnHeroViewProjects: "View Projects ➔",
    btnHeroViewExp: "Experience & Skills",
    
    // Featured Projects Section
    secHeadingProjects: "Featured Projects",
    secSubProjects: "Select and explore standalone production applications below:",
    
    // SIMRS Card
    simrsCardTitle: "SIMRS Core Enterprise",
    simrsCardSub: "Hospital Management Information System",
    simrsCardStatus: "PRODUCTION",
    simrsCardDesc: "Fully integrated hospital management system: admission & BPJS SEP bridging, electronic medical records (EMR SOAP) with searchable 40+ ICD-10 diagnoses, LOINC Lab E-Orders, Pharmacy E-Prescribing, reactive billing cashier with official receipts, Inpatient Bed Matrix, and BOR efficiency indicators.",
    simrsBtnOpen: "Launch SIMRS App",

    // DevTools Card
    devtoolsCardTitle: "Dev & Data Engineering Suite",
    devtoolsCardSub: "29 Interactive Computational Tools",
    devtoolsCardStatus: "29 MODULES",
    devtoolsCardDesc: "Standalone platform of 29 interactive tools for IPv4 subnetting calculations, multi-platform Linux/Mikrotik firewall generators, data cleaning & outlier QC inspectors, spreadsheet formula engines (VLOOKUP/Regex), security audits (JWT/Hash/Entropy), and server hardware calculators.",
    devtoolsBtnOpen: "Explore 29 Tools",

    // SHUNA AI Card
    shunaCardTitle: "SHUNA AI Data Engine",
    shunaCardSub: "NLP & Machine Learning Engine",
    shunaCardDesc: "Unified data intelligence suite independently engineered by the developer (95%+ solo end-to-end codebase execution) during MSIB Skilvul (Final Score 81.8): live NLP sentiment & aspect extraction pipeline, tabular retention & dropout predictor (Sigmoid Logistic Regression), plus Holt-Winters time-series forecasting and rolling Z-score anomaly detection.",
    shunaBtnOpen: "Open SHUNA AI",
    shunaBackLink: "Back to Home",

    // Experience & Certifications Section
    secHeadingExp: "Work Experience",
    secSubExp: "Practical track record in server infrastructure research and IT operations:",
    secHeadingCert: "Licenses & Certifications",
    secSubCert: "National competency credentials in network administration and server systems:",
    secSubExp: "Professional track record, infrastructure research, and national competency credentials:",
    
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

    // DevTools View UI
    devtoolsViewTitle: "Dev & Data Engineering Suite (29 Tools)",
    devtoolsViewDesc: "Standalone platform for IPv4 networking, firewall hardening, data wrangling & QC, VAPT security auditing, and hardware sizing utilities.",
    catAll: "All Tools (29)",
    catNetwork: "Networking & Server",
    catSecurity: "System Security",
    catDatabase: "Data & Backend",
    catUtility: "Utilities & Hardware",
    searchPlaceholder: "Search tools, tech stack, or keywords...",
    emptyTitle: "No tools found",
    emptyDesc: "Try another search keyword or switch category filters.",
    openWorkspace: "Open Workspace",

    // Tool Workspace Modal
    tabDemo: "Interactive Live Demo",
    tabCode: "Original Source Code",
    tabDocs: "Architecture & Technical Docs",
    copyCode: "Copy Code",

    // Developer Profile Modal
    devRoleSub: "Universitas Potensi Utama • IT Practitioner",
    profileHeading: "Profile",
    profileBio: "Computer Science Graduate (<strong>S1 Informatika / S.Kom from Universitas Potensi Utama</strong>) specializing in <strong>IT Support, Network Administration, System Security (VAPT), Data Analytics & Full-Stack Web Engineering</strong>. Hands-on experience in server infrastructure deployment, video streaming protocols, banking PC deployments, and deterministic software engineering.",
    expHeading: "Work Experience",
    certHeading: "Certifications & Expertise",

    // Footer
    footerBioText: "B.Sc. in Computer Science graduate from Universitas Potensi Utama. IT Support Practitioner, Network Administrator, VAPT Security, and Data Analytics & Software Engineering.",
    footerTechHeading: "Core Competencies",
    footerLinksHeading: "Links & Portfolio",
    footerLinksDesc: "All systems are handcrafted with clean code and interactively accessible.",
    footerTagline: "© 2026 Rizki Ananda, S.Kom (@InfiniteNull) • Handcrafted with Clean Code & Professional IT Standards."
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

  const btnInterviewGuideText = document.getElementById('btnInterviewGuideText');
  if (btnInterviewGuideText) btnInterviewGuideText.textContent = dict.btnInterviewGuide;

  const btnAboutDevText = document.getElementById('btnAboutDevText');
  if (btnAboutDevText) btnAboutDevText.textContent = dict.btnAboutDev;

  // 2. Hero Section
  const heroBadgeText = document.getElementById('heroBadgeText');
  if (heroBadgeText) heroBadgeText.textContent = dict.heroBadge;

  const heroTitleText = document.getElementById('heroTitleText');
  if (heroTitleText) heroTitleText.textContent = dict.heroTitle;

  const heroSubTitleText = document.getElementById('heroSubTitleText');
  if (heroSubTitleText && dict.heroSubTitle) heroSubTitleText.textContent = dict.heroSubTitle;


  const heroDescText = document.getElementById('heroDescText');
  if (heroDescText) heroDescText.textContent = dict.heroDesc;

  const btnHeroViewProjects = document.getElementById('btnHeroViewProjects');
  if (btnHeroViewProjects) {
    const span = btnHeroViewProjects.querySelector('span');
    if (span) span.textContent = dict.btnHeroViewProjects;
  }

  const btnHeroViewExp = document.getElementById('btnHeroViewExp');
  if (btnHeroViewExp) {
    const span = btnHeroViewExp.querySelector('span');
    if (span) span.textContent = dict.btnHeroViewExp;
  }

  // 3. Featured Projects
  const secHeadingProjects = document.getElementById('secHeadingProjects');
  if (secHeadingProjects) {
    const span = secHeadingProjects.querySelector('span');
    if (span) span.textContent = dict.secHeadingProjects;
  }

  const secSubProjects = document.getElementById('secSubProjects');
  if (secSubProjects) secSubProjects.textContent = dict.secSubProjects;

  const simrsCardTitle = document.getElementById('simrsCardTitle');
  if (simrsCardTitle) simrsCardTitle.textContent = dict.simrsCardTitle;

  const simrsCardSub = document.getElementById('simrsCardSub');
  if (simrsCardSub) simrsCardSub.textContent = dict.simrsCardSub;

  const simrsCardDesc = document.getElementById('simrsCardDesc');
  if (simrsCardDesc) simrsCardDesc.textContent = dict.simrsCardDesc;

  const simrsBtnOpen = document.getElementById('simrsBtnOpen');
  if (simrsBtnOpen) simrsBtnOpen.textContent = dict.simrsBtnOpen;

  const devtoolsCardTitle = document.getElementById('devtoolsCardTitle');
  if (devtoolsCardTitle) devtoolsCardTitle.textContent = dict.devtoolsCardTitle;

  const devtoolsCardSub = document.getElementById('devtoolsCardSub');
  if (devtoolsCardSub) devtoolsCardSub.textContent = dict.devtoolsCardSub;

  const devtoolsCardDesc = document.getElementById('devtoolsCardDesc');
  if (devtoolsCardDesc) devtoolsCardDesc.textContent = dict.devtoolsCardDesc;

  const devtoolsBtnOpen = document.getElementById('devtoolsBtnOpen');
  if (devtoolsBtnOpen) devtoolsBtnOpen.textContent = dict.devtoolsBtnOpen;

  // 4. Experience & Certifications
  const secHeadingExp = document.getElementById('secHeadingExp');
  if (secHeadingExp) secHeadingExp.textContent = dict.secHeadingExp;

  const secSubExp = document.getElementById('secSubExp');
  if (secSubExp) secSubExp.textContent = dict.secSubExp;

  // 5. Category Tabs
  const catAllBtn = document.querySelector('button[data-category="all"]');
  if (catAllBtn) catAllBtn.textContent = dict.catAll;

  const catNetBtn = document.querySelector('button[data-category="network"]');
  if (catNetBtn) catNetBtn.textContent = dict.catNetwork;

  const catSecBtn = document.querySelector('button[data-category="security"]');
  if (catSecBtn) catSecBtn.textContent = dict.catSecurity;

  const catDbBtn = document.querySelector('button[data-category="database"]');
  if (catDbBtn) catDbBtn.textContent = dict.catDatabase;

  const catUtilBtn = document.querySelector('button[data-category="utility"]');
  if (catUtilBtn) catUtilBtn.textContent = dict.catUtility;

  // 6. Search Placeholder
  const searchInput = document.getElementById('toolSearchInput');
  if (searchInput) searchInput.placeholder = dict.searchPlaceholder;

  // 7. Empty State
  const emptyStateTitle = document.getElementById('emptyStateTitle');
  if (emptyStateTitle) emptyStateTitle.textContent = dict.emptyTitle;

  const emptyStateDesc = document.getElementById('emptyStateDesc');
  if (emptyStateDesc) emptyStateDesc.textContent = dict.emptyDesc;

  // 8. Modal Tabs
  const tabDemoText = document.getElementById('tabDemoText');
  if (tabDemoText) tabDemoText.textContent = dict.tabDemo;

  const tabCodeText = document.getElementById('tabCodeText');
  if (tabCodeText) tabCodeText.textContent = dict.tabCode;

  const tabDocsText = document.getElementById('tabDocsText');
  if (tabDocsText) tabDocsText.textContent = dict.tabDocs;

  const copyCodeBtnText = document.getElementById('copyCodeBtnText') || document.getElementById('copyCodeText');
  if (copyCodeBtnText) copyCodeBtnText.textContent = dict.copyCode;

  // 9. Developer Profile Modal
  const devRoleSub = document.getElementById('devRoleSub');
  if (devRoleSub) devRoleSub.textContent = dict.devRoleSub;

  const profileHeading = document.getElementById('profileHeading');
  if (profileHeading) profileHeading.textContent = dict.profileHeading;

  const profileBio = document.getElementById('profileBio');
  if (profileBio) profileBio.innerHTML = dict.profileBio;

  const expHeading = document.getElementById('expHeading');
  if (expHeading) expHeading.textContent = dict.expHeading;

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

  const certHeading = document.getElementById('certHeading');
  if (certHeading) certHeading.textContent = dict.certHeading;

  const cert1Title = document.getElementById('cert1Title');
  if (cert1Title) cert1Title.textContent = dict.cert1Title;

  const cert1Desc = document.getElementById('cert1Desc');
  if (cert1Desc) cert1Desc.textContent = dict.cert1Desc;

  const cert2Title = document.getElementById('cert2Title');
  if (cert2Title) cert2Title.textContent = dict.cert2Title;

  const cert2Desc = document.getElementById('cert2Desc');
  if (cert2Desc) cert2Desc.textContent = dict.cert2Desc;

  // 10. Footer
  const footerBioText = document.getElementById('footerBioText');
  if (footerBioText) footerBioText.textContent = dict.footerBioText;

  const footerTechHeading = document.getElementById('footerTechHeading');
  if (footerTechHeading) footerTechHeading.textContent = dict.footerTechHeading;

  const footerLinksHeading = document.getElementById('footerLinksHeading');
  if (footerLinksHeading) footerLinksHeading.textContent = dict.footerLinksHeading;

  const footerLinksDesc = document.getElementById('footerLinksDesc');
  if (footerLinksDesc) footerLinksDesc.textContent = dict.footerLinksDesc;

  const footerTagline = document.getElementById('footerTagline');
  if (footerTagline) footerTagline.textContent = dict.footerTagline;

  // Re-render Tools Grid
  if (typeof window.renderToolsGrid === 'function') {
    window.renderToolsGrid();
  }

  // Re-render SIMRS if active
  if (window.currentProject === 'simrs' && typeof window.renderSimrsSuite === 'function') {
    const root = document.getElementById('simrsSuiteRoot');
    if (root) window.renderSimrsSuite(root);
  }

  // If a modal is open, refresh its content in the active language
  if (window.activeTool && typeof window.openToolModal === 'function') {
    window.openToolModal(window.activeTool);
  }

  if (window.showToast) {
    showToast(lang === 'id' ? "Bahasa diubah ke Bahasa Indonesia" : "Language switched to English", "info");
  }
};
