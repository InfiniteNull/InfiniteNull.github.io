/**
 * subnet-calculator.js
 * Tool: IP Subnetting & VLSM Calculator
 * Menghitung Network ID, Broadcast, Netmask, Wildcard, Usable Host Range, dan Binary Representation.
 */

window.renderSubnetCalculator = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <!-- Input Section -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="network" class="w-4 h-4 text-sky-600"></i>
          <span>Kalkulator Subnet IPv4 & CIDR</span>
        </h4>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="sm:col-span-2 space-y-1">
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">IP Address</label>
            <input type="text" id="subnetIpInput" value="192.168.1.100" placeholder="e.g. 192.168.1.1 atau 10.0.0.1" class="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">CIDR Prefix</label>
            <select id="subnetCidrSelect" class="w-full px-3 py-2 text-xs font-mono font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none">
              <!-- Dynamically populated from /8 to /30 -->
            </select>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 pt-1">
          <button id="calcSubnetBtn" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm">
            <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
            <span>Hitung Subnet</span>
          </button>
          <div class="flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-500">
            <span>Preset Cepat:</span>
            <button class="preset-ip-btn px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:text-sky-600 font-mono" data-ip="192.168.10.1" data-cidr="24">/24 (Class C)</button>
            <button class="preset-ip-btn px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:text-sky-600 font-mono" data-ip="172.16.0.1" data-cidr="20">/20 (Class B)</button>
            <button class="preset-ip-btn px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:text-sky-600 font-mono" data-ip="10.20.30.1" data-cidr="16">/16 (Class A)</button>
            <button class="preset-ip-btn px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:text-sky-600 font-mono" data-ip="192.168.1.1" data-cidr="27">/27 (Subnetting)</button>
          </div>
        </div>
      </div>

      <!-- Result Card -->
      <div id="subnetResultCard" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500"></i>
            Hasil Kalkulasi Subnet
          </span>
          <span id="subnetClassBadge" class="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
            Class C • Private IP
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Network ID</span>
            <div id="resNetworkId" class="font-mono font-bold text-slate-900 dark:text-white text-sm">192.168.1.0</div>
          </div>
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Broadcast Address</span>
            <div id="resBroadcast" class="font-mono font-bold text-slate-900 dark:text-white text-sm">192.168.1.255</div>
          </div>
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Subnet Mask</span>
            <div id="resSubnetMask" class="font-mono font-bold text-slate-900 dark:text-white text-sm">255.255.255.0</div>
          </div>
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Wildcard Mask</span>
            <div id="resWildcard" class="font-mono font-bold text-slate-900 dark:text-white text-sm">0.0.0.255</div>
          </div>
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Usable Host Range</span>
            <div id="resHostRange" class="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">192.168.1.1 - 192.168.1.254</div>
          </div>
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Total Usable Hosts</span>
            <div id="resTotalHosts" class="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm">254 Hosts</div>
          </div>
        </div>

        <!-- Binary Representation -->
        <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Representasi Biner</span>
          <div class="bg-slate-950 text-slate-200 p-3 rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto border border-slate-800">
            <div class="flex justify-between gap-4"><span class="text-slate-400">IP Biner:</span> <span id="resIpBinary" class="text-sky-400">11000000.10101000.00000001.01100100</span></div>
            <div class="flex justify-between gap-4"><span class="text-slate-400">Mask Biner:</span> <span id="resMaskBinary" class="text-amber-400">11111111.11111111.11111111.00000000</span></div>
            <div class="flex justify-between gap-4"><span class="text-slate-400">Net Biner:</span> <span id="resNetBinary" class="text-emerald-400">11000000.10101000.00000001.00000000</span></div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const cidrSelect = container.querySelector('#subnetCidrSelect');
  for (let c = 8; c <= 30; c++) {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = `/${c} (Mask: ${cidrToMask(c)})`;
    if (c === 24) opt.selected = true;
    cidrSelect.appendChild(opt);
  }

  function ipToNum(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }

  function numToIp(num) {
    return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
  }

  function cidrToMask(cidr) {
    const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    return numToIp(mask);
  }

  function numToBinary(num) {
    return [
      ((num >>> 24) & 255).toString(2).padStart(8, '0'),
      ((num >>> 16) & 255).toString(2).padStart(8, '0'),
      ((num >>> 8) & 255).toString(2).padStart(8, '0'),
      (num & 255).toString(2).padStart(8, '0')
    ].join('.');
  }

  function calculateSubnet() {
    const ipStr = container.querySelector('#subnetIpInput').value.trim();
    const cidr = parseInt(container.querySelector('#subnetCidrSelect').value, 10);

    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ipStr)) {
      if (window.showToast) showToast("Format IPv4 tidak valid!", "error");
      return;
    }

    const ipNum = ipToNum(ipStr);
    const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const wildcardNum = (~maskNum) >>> 0;
    const networkNum = (ipNum & maskNum) >>> 0;
    const broadcastNum = (networkNum | wildcardNum) >>> 0;

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : totalHosts - 2;

    const firstHostNum = cidr >= 31 ? networkNum : networkNum + 1;
    const lastHostNum = cidr >= 31 ? broadcastNum : broadcastNum - 1;

    container.querySelector('#resNetworkId').textContent = `${numToIp(networkNum)} /${cidr}`;
    container.querySelector('#resBroadcast').textContent = numToIp(broadcastNum);
    container.querySelector('#resSubnetMask').textContent = numToIp(maskNum);
    container.querySelector('#resWildcard').textContent = numToIp(wildcardNum);
    container.querySelector('#resHostRange').textContent = `${numToIp(firstHostNum)} - ${numToIp(lastHostNum)}`;
    container.querySelector('#resTotalHosts').textContent = `${usableHosts.toLocaleString()} Usable (Total: ${totalHosts.toLocaleString()})`;

    container.querySelector('#resIpBinary').textContent = numToBinary(ipNum);
    container.querySelector('#resMaskBinary').textContent = numToBinary(maskNum);
    container.querySelector('#resNetBinary').textContent = numToBinary(networkNum);

    // IP Class detection
    const firstOctet = parseInt(ipStr.split('.')[0], 10);
    let ipClass = "Class A";
    if (firstOctet >= 128 && firstOctet <= 191) ipClass = "Class B";
    else if (firstOctet >= 192 && firstOctet <= 223) ipClass = "Class C";
    else if (firstOctet >= 224 && firstOctet <= 239) ipClass = "Class D (Multicast)";
    else if (firstOctet >= 240) ipClass = "Class E (Experimental)";

    const isPrivate = (firstOctet === 10) || 
                      (firstOctet === 172 && parseInt(ipStr.split('.')[1], 10) >= 16 && parseInt(ipStr.split('.')[1], 10) <= 31) || 
                      (firstOctet === 192 && parseInt(ipStr.split('.')[1], 10) === 168);

    container.querySelector('#subnetClassBadge').textContent = `${ipClass} • ${isPrivate ? 'Private IP' : 'Public IP'}`;

    if (window.showToast) showToast("Subnet berhasil dikalkulasi!", "success");
  }

  container.querySelector('#calcSubnetBtn').addEventListener('click', calculateSubnet);
  container.querySelectorAll('.preset-ip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelector('#subnetIpInput').value = btn.dataset.ip;
      container.querySelector('#subnetCidrSelect').value = btn.dataset.cidr;
      calculateSubnet();
    });
  });

  calculateSubnet();
};
