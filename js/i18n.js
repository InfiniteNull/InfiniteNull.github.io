/**
 * i18n.js
 * Internationalization Engine (Indonesian <-> English)
 * Mengelola peralihan bahasa secara real-time pada dashboard, kartu tools, modal workspace, dan profil pengembang.
 */

window.I18N_DICT = {
  id: {
    // Project Switcher
    projectSwitcherLabel: "Proyek:",
    labelProjectSimrs: "SIMRS Core",
    labelProjectDevTools: "Dev & Data Suite",

    // Header
    headerSubtitle: "IT Support • Network Admin • VAPT Security • Data Analytics & Web Suite",
    btnInterviewGuide: "Panduan Teknis",
    btnAboutDev: "Tentang Pengembang",
    
    // Hero
    heroBadge: "Rizki Ananda, S.Kom • Universitas Potensi Utama",
    heroTitle: "Web Tools & Data Suite",
    heroDesc: "Platform utilitas mandiri 29 tools interaktif untuk manajemen jaringan, audit keamanan sistem, database & data wrangling, serta utilitas IT harian.",
    
    // Categories
    catAll: "Semua Tools (29)",
    catNetwork: "Jaringan & Server",
    catSecurity: "Keamanan Sistem",
    catDatabase: "Data & Backend",
    catUtility: "Utilitas & Hardware",
    
    // Search & Empty State
    searchPlaceholder: "Cari nama tool / teknologi...",
    emptyTitle: "Tidak ada tool yang cocok",
    emptyDesc: "Coba gunakan kata kunci pencarian lain atau ubah filter kategori.",
    openWorkspace: "Buka Workspace",
    
    // Modal Workspace
    tabDemo: "Live Demo Interaktif",
    tabCode: "Source Code Asli",
    tabDocs: "Arsitektur & Penjelasan Teknis",
    copyCode: "Salin Kode",
    
    // Developer Profile Modal
    devRoleBadge: "Lulusan S1 Informatika",
    devRoleSub: "Universitas Potensi Utama • Praktisi IT",
    profileHeading: "Profil",
    profileBio: "Lulusan <strong>S1 Informatika (S.Kom) dari Universitas Potensi Utama</strong> dengan spesialisasi di bidang <strong>IT Support, Administrasi Jaringan, Keamanan Sistem (VAPT), serta Analisis Data & Rekayasa Web</strong>. Berpengalaman teknis dalam deployment infrastruktur server, protokol streaming, peremajaan PC perbankan, dan rekayasa perangkat lunak.",
    
    expHeading: "Pengalaman Kerja",
    job1Title: "IT Researcher",
    job1Company: "• ADZKIA KEDINASAN PUSAT",
    job1Meta: "Nov 2024 - Jun 2025 (Freelance) • Medan",
    job1Desc: "Bertanggung jawab dalam merancang, mengonfigurasi, dan menguji infrastruktur <strong>Nginx Media Server</strong> pada lingkungan Virtual Machine berbasis Linux, serta melakukan benchmark terhadap 4 protokol streaming video (<strong>RTMP, HLS, RTSP, dan HTTP</strong>). Melakukan pengujian keamanan jaringan dan <strong>vulnerability assessment (VAPT)</strong> pada sistem internal, audit konfigurasi firewall, serta dokumentasi arsitektur server.",
    
    job2Title: "IT Support (Vendor Outsourcing)",
    job2Company: "• PT Bank Sinarmas, Tbk",
    job2Meta: "Des 2023 (Freelance) • KC Medan Mangkubumi",
    job2Desc: "Bekerja secara independen di bawah naungan vendor IT outsourcing untuk melaksanakan proyek peremajaan perangkat komputer (<strong>PC Deployment</strong>) di Bank Sinarmas KC Medan Mangkubumi. Bertanggung jawab penuh melakukan unboxing, instalasi, dan perakitan PC desktop, melakukan backup dan migrasi data profil user secara aman, instalasi sistem operasi, serta perapian kabel (cable management). Selain itu, menangani konfigurasi perangkat peripheral seperti printer slip dan scanner dokumen hingga komputer siap terhubung ke domain jaringan internal bank.",
    
    leadShunaTitle: "Ketua Tim Proyek SHUNA AI",
    leadShunaScore: "Nilai: 81.8",
    leadShunaOrg: "MSIB Batch 6 Kampus Merdeka @ Skilvul",
    leadShunaDesc: "Memimpin tim dalam merancang alur data pipeline dan klasifikasi teks berbasis Natural Language Processing (NLP) menggunakan Python.",
    
    leadOrgTitle: "Kepemimpinan Organisasi",
    leadOrgSub: "HMPS Informatika • Univ. Potensi Utama",
    leadOrgDesc: "Memimpin reaktivasi dan tata kelola administrasi internal organisasi Himpunan Mahasiswa Program Studi Informatika.",
    
    certHeading: "Sertifikasi & Keahlian",
    cert1Title: "Associate Network Administrator (Komdigi RI, 2026)",
    cert1Desc: "Standar perancangan skema IP Addressing, konfigurasi router/switch, dan routing terdistribusi.",
    cert2Title: "Junior Network Administrator (BBPSDMP Kominfo, 2023)",
    cert2Desc: "Instalasi jaringan komputer dan pemeliharaan server Linux / Nginx.",
    
    skillSecurityTitle: "Keamanan Sistem & VAPT:",
    skillSecurityDesc: "Burp Suite, OWASP ZAP, Vulnerability Assessment, OSINT, Parameterized SQL Security.",
    skillProgTitle: "Bahasa Pemrograman & Backend:",
    skillProgDesc: "Python (Pandas, VADER, BS4, FastAPI), Node.js (Express, Sharp), C++, SQL (SQLite), JavaScript ES6+.",
    
    footerBioText: "Lulusan S1 Informatika Universitas Potensi Utama. Praktisi IT Support (Bank Sinarmas), IT Researcher (Adzkia Kedinasan), Network Administrator (Komdigi & Kominfo), VAPT Security, serta Analisis Data & Software Engineering.",
    footerTechHeading: "Kompetensi & Teknologi",
    footerTechList: `
      <li>• <strong>Infrastruktur & Media:</strong> Nginx Media Server (RTMP, HLS, RTSP), Linux VM</li>
      <li>• <strong>Data & NLP:</strong> Python (Pandas, VADER Lexicon, BeautifulSoup, FastAPI)</li>
      <li>• <strong>Backend & Jaringan:</strong> Node.js REST API, SQLite, IP Routing, PC Deployment</li>
      <li>• <strong>Keamanan:</strong> VAPT (Burp Suite, OWASP ZAP), OSINT, Bcrypt, JWT</li>
    `,
    footerLinksHeading: "Tautan & Portofolio",
    footerLinksDesc: "Seluruh 29 modul aplikasi dirancang secara modular dan dapat dicoba secara interaktif.",
    footerTagline: "© 2026 Rizki Ananda, S.Kom (@InfiniteNull) • Dibangun dengan Clean Code & Standar Profesional IT."
  },

  en: {
    // Project Switcher
    projectSwitcherLabel: "Project:",
    labelProjectSimrs: "SIMRS Core",
    labelProjectDevTools: "Dev & Data Suite",

    // Header
    headerSubtitle: "IT Support • Network Admin • VAPT Security • Data Analytics & Web Suite",
    btnInterviewGuide: "Technical Guide",
    btnAboutDev: "About Developer",
    
    // Hero
    heroBadge: "Rizki Ananda, S.Kom • Universitas Potensi Utama",
    heroTitle: "Web Tools & Engineering Suite",
    heroDesc: "A standalone platform of 29 interactive production-ready tools for network management, system security auditing, database & data wrangling, and daily IT utilities.",
    
    // Categories
    catAll: "All Tools (29)",
    catNetwork: "Networking & Server",
    catSecurity: "System Security",
    catDatabase: "Data & Backend",
    catUtility: "Utilities & Hardware",
    
    // Search & Empty State
    searchPlaceholder: "Search tools, tech stack, or keywords...",
    emptyTitle: "No tools found",
    emptyDesc: "Try another search keyword or switch category filters.",
    openWorkspace: "Open Workspace",
    
    // Modal Workspace
    tabDemo: "Interactive Live Demo",
    tabCode: "Original Source Code (Python / Node.js)",
    tabDocs: "Architecture & Technical Docs",
    copyCode: "Copy Code",
    
    // Developer Profile Modal
    devRoleBadge: "B.Sc. Computer Science Graduate",
    devRoleSub: "Universitas Potensi Utama • IT Practitioner",
    profileHeading: "Profile",
    profileBio: "Computer Science Graduate (<strong>S1 Informatika / S.Kom from Universitas Potensi Utama</strong>) specializing in <strong>IT Support, Network Administration, System Security (VAPT), Data Analytics & Full-Stack Web Engineering</strong>. Hands-on experience in server infrastructure deployment, video streaming protocols, banking PC deployments, and deterministic software engineering.",
    
    expHeading: "Work Experience",
    job1Title: "IT Researcher",
    job1Company: "• ADZKIA KEDINASAN PUSAT",
    job1Meta: "Nov 2024 - Jun 2025 (Freelance) • Medan",
    job1Desc: "Responsible for architecting, configuring, and benchmarking <strong>Nginx Media Server</strong> infrastructure on Linux Virtual Machines across 4 streaming protocols (<strong>RTMP, HLS, RTSP, and HTTP</strong>). Conducted internal network security audits and <strong>vulnerability assessments (VAPT)</strong>, firewall rules enforcement, and server architectural documentation.",
    
    job2Title: "IT Support (Vendor Outsourcing)",
    job2Company: "• PT Bank Sinarmas, Tbk",
    job2Meta: "Dec 2023 (Freelance) • KC Medan Mangkubumi",
    job2Desc: "Executed independent IT outsourcing operations for enterprise <strong>PC Deployment</strong> at Bank Sinarmas KC Medan Mangkubumi. Fully responsible for desktop unboxing, hardware assembly, secure user profile data backup & migration, OS installation, and structured cable management. Configured peripherals (slip printers, document scanners) until fully onboarded to internal banking domain.",
    
    leadShunaTitle: "SHUNA AI Project Lead",
    leadShunaScore: "Score: 81.8",
    leadShunaOrg: "MSIB Batch 6 Kampus Merdeka @ Skilvul",
    leadShunaDesc: "Led the engineering team in designing data processing pipelines and text classification workflows utilizing Natural Language Processing (NLP) with Python.",
    
    leadOrgTitle: "Organizational Leadership",
    leadOrgSub: "HMPS Informatika • Univ. Potensi Utama",
    leadOrgDesc: "Led the reactivation and internal administrative governance of the Informatics Student Association.",
    
    certHeading: "Certifications & Expertise",
    cert1Title: "Associate Network Administrator (Komdigi RI, 2026)",
    cert1Desc: "National standard for IP addressing schemes, router/switch configuration, and distributed routing.",
    cert2Title: "Junior Network Administrator (BBPSDMP Kominfo, 2023)",
    cert2Desc: "Computer network installation and Linux / Nginx server administration.",
    
    skillSecurityTitle: "System Security & VAPT:",
    skillSecurityDesc: "Burp Suite, OWASP ZAP, Vulnerability Assessment, OSINT, Parameterized SQL Security.",
    skillProgTitle: "Programming & Backend:",
    skillProgDesc: "Python (Pandas, VADER, BS4, FastAPI), Node.js (Express, Sharp), C++, SQL (SQLite), JavaScript ES6+.",
    
    // Footer section
    footerBioText: "B.Sc. in Computer Science graduate from Universitas Potensi Utama. IT Support Practitioner (Bank Sinarmas), IT Researcher (Adzkia Kedinasan), Certified Network Administrator (Komdigi & Kominfo), VAPT Security, and Data Analytics & Software Engineering.",
    footerTechHeading: "Competencies & Tech Stack",
    footerTechList: `
      <li>• <strong>Infrastructure & Media:</strong> Nginx Media Server (RTMP, HLS, RTSP), Linux VM</li>
      <li>• <strong>Data & NLP:</strong> Python (Pandas, VADER Lexicon, BeautifulSoup, FastAPI)</li>
      <li>• <strong>Backend & Networking:</strong> Node.js REST API, SQLite, IP Routing, PC Deployment</li>
      <li>• <strong>Security:</strong> VAPT (Burp Suite, OWASP ZAP), OSINT, Bcrypt, JWT</li>
    `,
    footerLinksHeading: "Links & Portfolio",
    footerLinksDesc: "All 29 modular application tools are designed for real-time interactive exploration.",
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

  // 1. Navbar Toggle Button
  const langLabel = document.getElementById('langLabel');
  if (langLabel) {
    langLabel.textContent = lang === 'id' ? 'ID' : 'EN';
  }

  // Project Switcher Elements
  const projectSwitcherLabel = document.getElementById('projectSwitcherLabel');
  if (projectSwitcherLabel) projectSwitcherLabel.textContent = dict.projectSwitcherLabel;

  const labelProjectSimrs = document.getElementById('labelProjectSimrs');
  if (labelProjectSimrs) labelProjectSimrs.textContent = dict.labelProjectSimrs;

  const labelProjectDevTools = document.getElementById('labelProjectDevTools');
  if (labelProjectDevTools) labelProjectDevTools.textContent = dict.labelProjectDevTools;

  // 2. Navigation Header & Buttons
  const headerSubtitle = document.getElementById('headerSubtitle');
  if (headerSubtitle) headerSubtitle.textContent = dict.headerSubtitle;

  const btnInterviewGuideText = document.getElementById('btnInterviewGuideText');
  if (btnInterviewGuideText) btnInterviewGuideText.textContent = dict.btnInterviewGuide;

  const btnAboutDevText = document.getElementById('btnAboutDevText');
  if (btnAboutDevText) btnAboutDevText.textContent = dict.btnAboutDev;

  // 3. Hero Section
  const heroBadgeText = document.getElementById('heroBadgeText');
  if (heroBadgeText) heroBadgeText.textContent = dict.heroBadge;

  const heroTitleText = document.getElementById('heroTitleText');
  if (heroTitleText) heroTitleText.textContent = dict.heroTitle;

  const heroDescText = document.getElementById('heroDescText');
  if (heroDescText) heroDescText.textContent = dict.heroDesc;

  // 4. Category Tabs
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

  // 5. Search Placeholder
  const searchInput = document.getElementById('toolSearchInput');
  if (searchInput) searchInput.placeholder = dict.searchPlaceholder;

  // 6. Empty State
  const emptyStateTitle = document.getElementById('emptyStateTitle');
  if (emptyStateTitle) emptyStateTitle.textContent = dict.emptyTitle;

  const emptyStateDesc = document.getElementById('emptyStateDesc');
  if (emptyStateDesc) emptyStateDesc.textContent = dict.emptyDesc;

  // 7. Modal Tabs
  const tabDemoText = document.getElementById('tabDemoText');
  if (tabDemoText) tabDemoText.textContent = dict.tabDemo;

  const tabCodeText = document.getElementById('tabCodeText');
  if (tabCodeText) tabCodeText.textContent = dict.tabCode;

  const tabDocsText = document.getElementById('tabDocsText');
  if (tabDocsText) tabDocsText.textContent = dict.tabDocs;

  const copyCodeBtnText = document.getElementById('copyCodeBtnText');
  if (copyCodeBtnText) copyCodeBtnText.textContent = dict.copyCode;

  // 8. Developer Profile Modal Elements
  const devRoleBadge = document.getElementById('devRoleBadge');
  if (devRoleBadge) devRoleBadge.textContent = dict.devRoleBadge;

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

  const leadShunaTitle = document.getElementById('leadShunaTitle');
  if (leadShunaTitle) leadShunaTitle.textContent = dict.leadShunaTitle;

  const leadShunaScore = document.getElementById('leadShunaScore');
  if (leadShunaScore) leadShunaScore.textContent = dict.leadShunaScore;

  const leadShunaDesc = document.getElementById('leadShunaDesc');
  if (leadShunaDesc) leadShunaDesc.textContent = dict.leadShunaDesc;

  const leadOrgTitle = document.getElementById('leadOrgTitle');
  if (leadOrgTitle) leadOrgTitle.textContent = dict.leadOrgTitle;

  const leadOrgSub = document.getElementById('leadOrgSub');
  if (leadOrgSub) leadOrgSub.textContent = dict.leadOrgSub;

  const leadOrgDesc = document.getElementById('leadOrgDesc');
  if (leadOrgDesc) leadOrgDesc.textContent = dict.leadOrgDesc;

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

  const skillSecurityTitle = document.getElementById('skillSecurityTitle');
  if (skillSecurityTitle) skillSecurityTitle.textContent = dict.skillSecurityTitle;

  const skillSecurityDesc = document.getElementById('skillSecurityDesc');
  if (skillSecurityDesc) skillSecurityDesc.textContent = dict.skillSecurityDesc;

  const skillProgTitle = document.getElementById('skillProgTitle');
  if (skillProgTitle) skillProgTitle.textContent = dict.skillProgTitle;

  const skillProgDesc = document.getElementById('skillProgDesc');
  if (skillProgDesc) skillProgDesc.textContent = dict.skillProgDesc;

  // 9. Footer Translations
  const footerBioText = document.getElementById('footerBioText');
  if (footerBioText) footerBioText.textContent = dict.footerBioText;

  const footerTechHeading = document.getElementById('footerTechHeading');
  if (footerTechHeading) footerTechHeading.textContent = dict.footerTechHeading;

  const footerTechList = document.getElementById('footerTechList');
  if (footerTechList) footerTechList.innerHTML = dict.footerTechList;

  const footerLinksHeading = document.getElementById('footerLinksHeading');
  if (footerLinksHeading) footerLinksHeading.textContent = dict.footerLinksHeading;

  const footerLinksDesc = document.getElementById('footerLinksDesc');
  if (footerLinksDesc) footerLinksDesc.textContent = dict.footerLinksDesc;

  const footerTagline = document.getElementById('footerTagline');
  if (footerTagline) footerTagline.textContent = dict.footerTagline;

  // Re-render Tools Grid to update titles & descriptions
  if (typeof window.renderToolsGrid === 'function') {
    window.renderToolsGrid();
  }

  // Re-render SIMRS Suite if active
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
