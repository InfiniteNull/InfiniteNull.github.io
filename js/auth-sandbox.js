/**
 * auth-sandbox.js
 * Tool: Authentication & JWT Security Sandbox
 * Simulasi alur Register, Bcrypt Password Hashing, Login, dan JWT Token Verification.
 */

window.renderAuthSandbox = function(container) {
  // Simulated SQLite users storage
  let usersDb = JSON.parse(localStorage.getItem('auth_sandbox_users') || '[]');
  if (usersDb.length === 0) {
    usersDb = [
      { id: 1, email: "admin@devportfolio.io", hash: "$2b$10$e8wY8WkL5vKjXj89Q1N9e.9uQkI98s8v2P8j0W0v1A9s8d7f6g5h", role: "Superadmin" },
      { id: 2, email: "developer@portfolio.id", hash: "$2b$10$z9xY7WkL4vKjXj88Q1M8e.8uQkI88s7v1P7j9V9u0Z8r7e6d5c", role: "Software Engineer" }
    ];
    localStorage.setItem('auth_sandbox_users', JSON.stringify(usersDb));
  }

  let activeJwtToken = localStorage.getItem('auth_sandbox_jwt') || "";

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Sub-tabs: Register, Login, Protected Route -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Left: Form Sandbox -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
              <span>Simulasi Autentikasi API</span>
            </h4>
            <div class="flex gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
              <button id="authTabLogin" class="px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm transition">Login</button>
              <button id="authTabRegister" class="px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 transition">Register</button>
            </div>
          </div>

          <!-- Login / Register Form -->
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input type="email" id="authEmailInput" value="developer@portfolio.id" class="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none font-mono" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input type="password" id="authPasswordInput" value="devpass2026" class="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 outline-none font-mono" />
            </div>

            <div class="pt-2">
              <button id="authSubmitBtn" class="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5">
                <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
                <span id="authSubmitBtnText">Kirim Permintaan Login</span>
              </button>
            </div>
          </div>

          <!-- Quick Test Accounts -->
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800">
            <span class="text-[11px] font-semibold text-slate-500">Akun Pengujian Cepat:</span>
            <div class="mt-1.5 flex flex-wrap gap-2 text-[11px] font-mono">
              <button class="auth-fill-btn px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-100 transition" data-email="admin@devportfolio.io" data-pass="devpass2026">
                admin@devportfolio.io (devpass2026)
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Server Response & Token Inspector -->
        <div class="space-y-4">
          
          <!-- JWT Token Card -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">JSON Web Token (JWT)</span>
              <span id="authSessionStatus" class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Belum Terautentikasi
              </span>
            </div>
            
            <pre id="authJwtDisplay" class="bg-slate-900 text-emerald-400 p-3 rounded-lg text-[11px] font-mono break-all max-h-24 overflow-y-auto leading-relaxed border border-slate-800">${activeJwtToken || "// Belum ada token. Silakan klik Login untuk men-generate JWT token."}</pre>

            <button id="authTestProtectedBtn" class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5">
              <i data-lucide="lock" class="w-3.5 h-3.5"></i>
              <span>Akses Endpoint Terproteksi (/api/profile)</span>
            </button>
          </div>

          <!-- SQLite Schema & Response Log -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-2">
            <span class="text-xs font-semibold text-slate-500">Log Respons Server & Database SQL</span>
            <pre id="authServerLog" class="bg-slate-900 text-slate-200 p-3 rounded-lg text-[11px] font-mono max-h-36 overflow-y-auto leading-relaxed border border-slate-800">{
  "status": "ready",
  "database": "SQLite (users.db)",
  "schema": "CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT)"
}</pre>
          </div>

        </div>

      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  let mode = 'login'; // 'login' or 'register'

  const tabLogin = container.querySelector('#authTabLogin');
  const tabRegister = container.querySelector('#authTabRegister');
  const submitBtn = container.querySelector('#authSubmitBtn');
  const submitBtnText = container.querySelector('#authSubmitBtnText');
  const emailInput = container.querySelector('#authEmailInput');
  const passInput = container.querySelector('#authPasswordInput');
  const jwtDisplay = container.querySelector('#authJwtDisplay');
  const serverLog = container.querySelector('#authServerLog');
  const sessionStatus = container.querySelector('#authSessionStatus');
  const testProtectedBtn = container.querySelector('#authTestProtectedBtn');

  // Quick fill helper
  container.querySelectorAll('.auth-fill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      emailInput.value = btn.dataset.email;
      passInput.value = btn.dataset.pass;
    });
  });

  tabLogin.addEventListener('click', () => {
    mode = 'login';
    tabLogin.className = "px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm transition";
    tabRegister.className = "px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 transition";
    submitBtnText.textContent = "Kirim Permintaan Login";
  });

  tabRegister.addEventListener('click', () => {
    mode = 'register';
    tabRegister.className = "px-3 py-1 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm transition";
    tabLogin.className = "px-3 py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 transition";
    submitBtnText.textContent = "Daftarkan Akun Baru (Enkripsi Bcrypt)";
  });

  submitBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const pass = passInput.value.trim();

    if (!email || !pass) {
      alert("Harap isi email dan password!");
      return;
    }

    if (mode === 'register') {
      const exists = usersDb.find(u => u.email === email);
      if (exists) {
        serverLog.textContent = JSON.stringify({
          status: 400,
          error: "UNIQUE constraint failed: Email sudah terdaftar di users.db"
        }, null, 2);
        window.showToast?.("Error: Email sudah terdaftar!");
        return;
      }

      // Simulate Bcrypt hash
      const fakeHash = `$2b$10$` + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const newUser = { id: usersDb.length + 1, email, hash: fakeHash, role: "User" };
      usersDb.push(newUser);
      localStorage.setItem('auth_sandbox_users', JSON.stringify(usersDb));

      serverLog.textContent = JSON.stringify({
        status: 201,
        message: "User berhasil didaftarkan ke SQLite!",
        user: { id: newUser.id, email: newUser.email, password_hash: fakeHash }
      }, null, 2);
      window.showToast?.("Registrasi berhasil! Silakan pindah ke tab Login.");
    } else {
      // Login mode
      const user = usersDb.find(u => u.email === email);
      if (!user) {
        serverLog.textContent = JSON.stringify({
          status: 401,
          error: "Unauthorized: Email tidak ditemukan dalam basis data."
        }, null, 2);
        window.showToast?.("Login gagal: Akun tidak ditemukan!");
        return;
      }

      // Generate JWT Token
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role, exp: Date.now() + 7200000 }));
      const signature = btoa("jwt_secure_hmac_sha256_signature").substring(0, 16);
      const token = `${header}.${payload}.${signature}`;

      activeJwtToken = token;
      localStorage.setItem('auth_sandbox_jwt', token);
      jwtDisplay.textContent = token;

      sessionStatus.textContent = `Aktif (${user.email})`;
      sessionStatus.className = "px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";

      serverLog.textContent = JSON.stringify({
        status: 200,
        message: "Autentikasi Berhasil (Bcrypt verified)",
        token_type: "Bearer",
        token_preview: token.substring(0, 32) + "...",
        user: { id: user.id, email: user.email, role: user.role }
      }, null, 2);
      window.showToast?.("Login berhasil! Token JWT aktif.");
    }
  });

  testProtectedBtn.addEventListener('click', () => {
    if (!activeJwtToken) {
      serverLog.textContent = JSON.stringify({
        status: 403,
        error: "Forbidden: Token JWT tidak ditemukan pada Authorization Header."
      }, null, 2);
      window.showToast?.("Akses Ditolak: Harap login terlebih dahulu!");
      return;
    }

    serverLog.textContent = JSON.stringify({
      status: 200,
      endpoint: "GET /api/profile",
      headers: { "Authorization": `Bearer ${activeJwtToken.substring(0, 20)}...` },
      message: "Sukses mengakses data rahasia user",
      data: {
        username: "developer_core",
        role: "Software Engineer",
        access_level: "Full-Stack Development & API Sandbox",
        status_aktif: true,
        last_login: new Date().toISOString()
      }
    }, null, 2);
    window.showToast?.("Berhasil mengakses Protected Route!");
  });
};
