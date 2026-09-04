/**
 * firewall-generator.js
 * Tool: Port Directory & Firewall Rule Generator
 * Mencari port standar industri dan menghasilkan script firewall UFW, iptables, Mikrotik, dan Windows Netsh.
 */

window.renderFirewallGenerator = function(container) {
  const PORTS_DATA = [
    { port: 20, proto: "TCP", service: "FTP Data", desc: "File Transfer Protocol (Data Transfer)", category: "File Transfer" },
    { port: 21, proto: "TCP", service: "FTP Control", desc: "File Transfer Protocol (Command Control)", category: "File Transfer" },
    { port: 22, proto: "TCP", service: "SSH / SFTP", desc: "Secure Shell Remote Access & Secure Copy", category: "Management" },
    { port: 23, proto: "TCP", service: "Telnet", desc: "Unencrypted Text Communications", category: "Management" },
    { port: 25, proto: "TCP", service: "SMTP", desc: "Simple Mail Transfer Protocol", category: "Email" },
    { port: 53, proto: "UDP/TCP", service: "DNS", desc: "Domain Name System resolution", category: "Core Network" },
    { port: 67, proto: "UDP", service: "DHCP Server", desc: "Dynamic Host Configuration Protocol Server", category: "Core Network" },
    { port: 68, proto: "UDP", service: "DHCP Client", desc: "Dynamic Host Configuration Protocol Client", category: "Core Network" },
    { port: 80, proto: "TCP", service: "HTTP", desc: "HyperText Transfer Protocol (Web)", category: "Web" },
    { port: 110, proto: "TCP", service: "POP3", desc: "Post Office Protocol v3", category: "Email" },
    { port: 123, proto: "UDP", service: "NTP", desc: "Network Time Protocol Synchronization", category: "Core Network" },
    { port: 143, proto: "TCP", service: "IMAP", desc: "Internet Message Access Protocol", category: "Email" },
    { port: 443, proto: "TCP", service: "HTTPS", desc: "HTTP Secure (TLS/SSL Encrypted Web)", category: "Web" },
    { port: 445, proto: "TCP", service: "SMB", desc: "Server Message Block (Windows File Share)", category: "File Transfer" },
    { port: 554, proto: "TCP/UDP", service: "RTSP", desc: "Real Time Streaming Protocol (IP Camera/Media)", category: "Media & Streaming" },
    { port: 993, proto: "TCP", service: "IMAPS", desc: "IMAP Secure over TLS", category: "Email" },
    { port: 995, proto: "TCP", service: "POP3S", desc: "POP3 Secure over TLS", category: "Email" },
    { port: 1194, proto: "UDP", service: "OpenVPN", desc: "OpenVPN Tunneling Protocol", category: "VPN & Remote" },
    { port: 1935, proto: "TCP", service: "RTMP", desc: "Real-Time Messaging Protocol (Live Video Stream)", category: "Media & Streaming" },
    { port: 3306, proto: "TCP", service: "MySQL / MariaDB", desc: "MySQL Relational Database Service", category: "Database" },
    { port: 3389, proto: "TCP", service: "RDP", desc: "Remote Desktop Protocol (Windows Remote)", category: "Management" },
    { port: 5432, proto: "TCP", service: "PostgreSQL", desc: "PostgreSQL Object-Relational Database", category: "Database" },
    { port: 6379, proto: "TCP", service: "Redis", desc: "Redis In-Memory Key-Value Store", category: "Database" },
    { port: 8080, proto: "TCP", service: "HTTP Proxy / Dev", desc: "Alternative HTTP / Spring Boot / Node Dev", category: "Web" },
    { port: 27017, proto: "TCP", service: "MongoDB", desc: "MongoDB NoSQL Database Daemon", category: "Database" }
  ];

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Port Directory Search -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="shield" class="w-4 h-4 text-emerald-600"></i>
            <span>Direktori Port & Generator Rule Firewall</span>
          </h4>
          <div class="relative w-full sm:w-64">
            <i data-lucide="search" class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" id="portSearchInput" placeholder="Cari port, protokol, atau servis..." class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        <div class="max-h-52 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-lg">
          <table class="w-full text-left text-xs border-collapse">
            <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-semibold sticky top-0 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th class="p-2.5">Port</th>
                <th class="p-2.5">Protokol</th>
                <th class="p-2.5">Nama Servis</th>
                <th class="p-2.5 hidden sm:table-cell">Kategori</th>
                <th class="p-2.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody id="portsTableBody" class="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              <!-- Rendered by JS -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Firewall Rule Generator Box -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="terminal" class="w-4 h-4 text-sky-500"></i>
          Konfigurasi Aturan Firewall
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Target Port</label>
            <input type="number" id="targetPortInput" value="22" class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Protokol</label>
            <select id="targetProtoSelect" class="w-full px-3 py-2 font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
              <option value="both">TCP & UDP</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Aksi Rule</label>
            <select id="targetActionSelect" class="w-full px-3 py-2 font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              <option value="allow">ALLOW (Izinkan)</option>
              <option value="deny">DENY / DROP (Blokir)</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Source IP (Opsional)</label>
            <input type="text" id="targetSourceIpInput" placeholder="Any / 192.168.1.0/24" class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
        </div>

        <!-- Generated Syntax Tabs -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-600 dark:text-slate-400">Syntax Perintah CLI Siap Salin:</span>
            <button id="copyFirewallCmdBtn" class="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Salin Perintah</span>
            </button>
          </div>

          <div class="space-y-2">
            <div class="space-y-1">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">1. Linux UFW (Ubuntu / Debian)</span>
              <pre id="ufwCode" class="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">sudo ufw allow 22/tcp</pre>
            </div>
            <div class="space-y-1">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">2. Linux iptables (CentOS / RedHat / Generic Linux)</span>
              <pre id="iptablesCode" class="p-3 rounded-lg bg-slate-950 text-sky-400 font-mono text-xs overflow-x-auto border border-slate-800">sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT</pre>
            </div>
            <div class="space-y-1">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">3. Mikrotik RouterOS CLI</span>
              <pre id="mikrotikCode" class="p-3 rounded-lg bg-slate-950 text-amber-400 font-mono text-xs overflow-x-auto border border-slate-800">/ip firewall filter add chain=input protocol=tcp dst-port=22 action=accept</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const tbody = container.querySelector('#portsTableBody');

  function renderPortsTable(filter = "") {
    tbody.innerHTML = "";
    const q = filter.toLowerCase().trim();
    const filtered = PORTS_DATA.filter(p => 
      p.port.toString().includes(q) || 
      p.service.toLowerCase().includes(q) || 
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">Tidak ada port yang cocok.</td></tr>`;
      return;
    }

    filtered.forEach(p => {
      const tr = document.createElement('tr');
      tr.className = "hover:bg-slate-50 dark:hover:bg-slate-800/40 transition cursor-pointer";
      tr.innerHTML = `
        <td class="p-2.5 font-bold text-sky-600 dark:text-sky-400">${p.port}</td>
        <td class="p-2.5"><span class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">${p.proto}</span></td>
        <td class="p-2.5 font-sans font-medium text-slate-900 dark:text-white">${p.service}</td>
        <td class="p-2.5 font-sans text-slate-500 hidden sm:table-cell">${p.category}</td>
        <td class="p-2.5 text-right">
          <button class="select-port-btn px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white text-[11px] font-sans font-medium transition" data-port="${p.port}" data-proto="${p.proto.toLowerCase().includes('udp') ? 'udp' : 'tcp'}">
            Pilih
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.select-port-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        container.querySelector('#targetPortInput').value = btn.dataset.port;
        container.querySelector('#targetProtoSelect').value = btn.dataset.proto;
        updateRules();
      });
    });
  }

  function updateRules() {
    const port = container.querySelector('#targetPortInput').value.trim() || "80";
    const proto = container.querySelector('#targetProtoSelect').value;
    const action = container.querySelector('#targetActionSelect').value;
    const srcIp = container.querySelector('#targetSourceIpInput').value.trim();

    const isAllow = action === "allow";
    const ufwAction = isAllow ? "allow" : "deny";
    const iptAction = isAllow ? "ACCEPT" : "DROP";
    const mikrotikAction = isAllow ? "accept" : "drop";

    let ufw = "";
    let iptables = "";
    let mikrotik = "";

    if (srcIp) {
      ufw = `sudo ufw ${ufwAction} from ${srcIp} to any port ${port} proto ${proto}`;
      iptables = `sudo iptables -A INPUT -s ${srcIp} -p ${proto} --dport ${port} -j ${iptAction}`;
      mikrotik = `/ip firewall filter add chain=input src-address=${srcIp} protocol=${proto} dst-port=${port} action=${mikrotikAction}`;
    } else {
      ufw = `sudo ufw ${ufwAction} ${port}/${proto}`;
      iptables = `sudo iptables -A INPUT -p ${proto} --dport ${port} -j ${iptAction}`;
      mikrotik = `/ip firewall filter add chain=input protocol=${proto} dst-port=${port} action=${mikrotikAction}`;
    }

    container.querySelector('#ufwCode').textContent = ufw;
    container.querySelector('#iptablesCode').textContent = iptables;
    container.querySelector('#mikrotikCode').textContent = mikrotik;
  }

  container.querySelector('#portSearchInput').addEventListener('input', (e) => {
    renderPortsTable(e.target.value);
  });

  container.querySelector('#targetPortInput').addEventListener('input', updateRules);
  container.querySelector('#targetProtoSelect').addEventListener('change', updateRules);
  container.querySelector('#targetActionSelect').addEventListener('change', updateRules);
  container.querySelector('#targetSourceIpInput').addEventListener('input', updateRules);

  container.querySelector('#copyFirewallCmdBtn').addEventListener('click', () => {
    const textToCopy = `# UFW:\n${container.querySelector('#ufwCode').textContent}\n\n# iptables:\n${container.querySelector('#iptablesCode').textContent}\n\n# Mikrotik:\n${container.querySelector('#mikrotikCode').textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (window.showToast) showToast("Perintah firewall berhasil disalin ke clipboard!", "success");
    });
  });

  renderPortsTable();
  updateRules();
};
