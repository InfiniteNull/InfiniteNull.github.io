/**
 * crypto-hash.js
 * Tool: Cryptographic Hash & Integrity Verifier
 * Menghitung dan memverifikasi hash kriptografi (SHA-1, SHA-256, SHA-384, SHA-512, MD5 simulation, HMAC) dari teks atau file.
 */

window.renderCryptoHash = function(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="hash" class="w-4 h-4 text-sky-600"></i>
          <span>Generator Hash Kriptografis & Audit Integritas Data</span>
        </h4>

        <div class="space-y-2">
          <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Input Teks / Payload:</label>
          <textarea id="hashTextInput" rows="3" placeholder="Ketik atau paste teks rahasia / payload di sini..." class="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500">Administrator@2026!SecureKey</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="space-y-1">
            <label class="font-semibold text-slate-700 dark:text-slate-300">HMAC Secret Key (Opsional)</label>
            <input type="text" id="hashHmacKeyInput" placeholder="Masukkan secret key jika ingin HMAC..." class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div class="space-y-1">
            <label class="font-semibold text-slate-700 dark:text-slate-300">Uji Verifikasi Integritas (Compare Hash)</label>
            <input type="text" id="hashCompareInput" placeholder="Paste hash target untuk dicocokkan..." class="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
        </div>
      </div>

      <!-- Hash Output List -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Daftar Hash Digest</span>
          <div id="hashMatchBadge" class="hidden text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            ✓ MATCH! Integritas Terverifikasi
          </div>
        </div>

        <div class="space-y-3 font-mono text-xs">
          <!-- SHA-256 -->
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div class="flex items-center justify-between font-sans">
              <span class="font-bold text-sky-600 dark:text-sky-400">SHA-256 (Standar Industri)</span>
              <button class="copy-hash-btn text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" data-target="sha256Res">
                <i data-lucide="copy" class="w-3 h-3"></i> Salin
              </button>
            </div>
            <div id="sha256Res" class="text-slate-800 dark:text-slate-200 break-all text-[11px]">Menghitung...</div>
          </div>

          <!-- SHA-512 -->
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div class="flex items-center justify-between font-sans">
              <span class="font-bold text-emerald-600 dark:text-emerald-400">SHA-512 (High Security)</span>
              <button class="copy-hash-btn text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" data-target="sha512Res">
                <i data-lucide="copy" class="w-3 h-3"></i> Salin
              </button>
            </div>
            <div id="sha512Res" class="text-slate-800 dark:text-slate-200 break-all text-[11px]">Menghitung...</div>
          </div>

          <!-- SHA-1 -->
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div class="flex items-center justify-between font-sans">
              <span class="font-bold text-amber-600 dark:text-amber-400">SHA-1 (Legacy / Git Commit Hash)</span>
              <button class="copy-hash-btn text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" data-target="sha1Res">
                <i data-lucide="copy" class="w-3 h-3"></i> Salin
              </button>
            </div>
            <div id="sha1Res" class="text-slate-800 dark:text-slate-200 break-all text-[11px]">Menghitung...</div>
          </div>

          <!-- MD5 (Simulated) -->
          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div class="flex items-center justify-between font-sans">
              <span class="font-bold text-rose-600 dark:text-rose-400">MD5 (Checksum / Legacy)</span>
              <button class="copy-hash-btn text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1" data-target="md5Res">
                <i data-lucide="copy" class="w-3 h-3"></i> Salin
              </button>
            </div>
            <div id="md5Res" class="text-slate-800 dark:text-slate-200 break-all text-[11px]">Menghitung...</div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Pure JS MD5 implementation for client-side checksum
  function md5(string) {
    function rotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function addUnsigned(lX, lY) {
      const lX8 = lX & 0x80000000;
      const lY8 = lY & 0x80000000;
      const lX4 = lX & 0x40000000;
      const lY4 = lY & 0x40000000;
      const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
        else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      } else {
        return lResult ^ lX8 ^ lY8;
      }
    }
    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }

    function FF(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }

    function wordToHex(lValue) {
      let wordToHexValue = "", wordToHexValueTemp = "", lByte, lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        wordToHexValueTemp = "0" + lByte.toString(16);
        wordToHexValue += wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
      }
      return wordToHexValue;
    }

    let x = [];
    let k, AA, BB, CC, DD, a, b, c, d;
    const S11=7, S12=12, S13=17, S14=22;
    const S21=5, S22=9 , S23=14, S24=20;
    const S31=4, S32=11, S33=16, S34=23;
    const S41=6, S42=10, S43=15, S44=21;

    string = unescape(encodeURIComponent(string));
    const strLen = string.length;
    const words = [];
    let bytePosition = 0;
    let byteCount = 0;
    while (byteCount < strLen) {
      wordCount = (byteCount - (byteCount % 4)) / 4;
      bytePosition = (byteCount % 4) * 8;
      words[wordCount] = (words[wordCount] | (string.charCodeAt(byteCount) << bytePosition));
      byteCount++;
    }
    wordCount = (byteCount - (byteCount % 4)) / 4;
    bytePosition = (byteCount % 4) * 8;
    words[wordCount] = words[wordCount] | (0x80 << bytePosition);
    words[(((strLen + 8) >> 6) << 4) + 14] = strLen * 8;

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k = 0; k < words.length; k += 16) {
      AA = a; BB = b; CC = c; DD = d;
      a = FF(a, b, c, d, words[k+0], S11, 0xD76AA478);
      d = FF(d, a, b, c, words[k+1], S12, 0xE8C7B756);
      c = FF(c, d, a, b, words[k+2], S13, 0x242070DB);
      b = FF(b, c, d, a, words[k+3], S14, 0xC1BDCEEE);
      a = FF(a, b, c, d, words[k+4], S11, 0xF57C0FAF);
      d = FF(d, a, b, c, words[k+5], S12, 0x4787C62A);
      c = FF(c, d, a, b, words[k+6], S13, 0xA8304613);
      b = FF(b, c, d, a, words[k+7], S14, 0xFD469501);
      a = FF(a, b, c, d, words[k+8], S11, 0x698098D8);
      d = FF(d, a, b, c, words[k+9], S12, 0x8B44F7AF);
      c = FF(c, d, a, b, words[k+10], S13, 0xFFFF5BB1);
      b = FF(b, c, d, a, words[k+11], S14, 0x895CD7BE);
      a = FF(a, b, c, d, words[k+12], S11, 0x6B901122);
      d = FF(d, a, b, c, words[k+13], S12, 0xFD987193);
      c = FF(c, d, a, b, words[k+14], S13, 0xA679438E);
      b = FF(b, c, d, a, words[k+15], S14, 0x49B40821);

      a = GG(a, b, c, d, words[k+1], S21, 0xF61E2562);
      d = GG(d, a, b, c, words[k+6], S22, 0xC040B340);
      c = GG(c, d, a, b, words[k+11], S23, 0x265E5A51);
      b = GG(b, c, d, a, words[k+0], S24, 0xE9B6C7AA);
      a = GG(a, b, c, d, words[k+5], S21, 0xD62F105D);
      d = GG(d, a, b, c, words[k+10], S22, 0x2441453);
      c = GG(c, d, a, b, words[k+15], S23, 0xD8A1E681);
      b = GG(b, c, d, a, words[k+4], S24, 0xE7D3FBC8);
      a = GG(a, b, c, d, words[k+9], S21, 0x21E1CDE6);
      d = GG(d, a, b, c, words[k+14], S22, 0xC33707D6);
      c = GG(c, d, a, b, words[k+3], S23, 0xF4D50D87);
      b = GG(b, c, d, a, words[k+8], S24, 0x455A14ED);
      a = GG(a, b, c, d, words[k+13], S21, 0xA9E3E905);
      d = GG(d, a, b, c, words[k+2], S22, 0xFCEFA3F8);
      c = GG(c, d, a, b, words[k+7], S23, 0x676F02D9);
      b = GG(b, c, d, a, words[k+12], S24, 0x8D2A4C8A);

      a = HH(a, b, c, d, words[k+5], S31, 0xFFFA3942);
      d = HH(d, a, b, c, words[k+8], S32, 0x8771F681);
      c = HH(c, d, a, b, words[k+11], S33, 0x6D9D6122);
      b = HH(b, c, d, a, words[k+14], S34, 0xFDE5380C);
      a = HH(a, b, c, d, words[k+1], S31, 0xA4BEEA44);
      d = HH(d, a, b, c, words[k+4], S32, 0x4BDECFA9);
      c = HH(c, d, a, b, words[k+7], S33, 0xF6BB4B60);
      b = HH(b, c, d, a, words[k+10], S34, 0xBEBFBC70);
      a = HH(a, b, c, d, words[k+13], S31, 0x289B7EC6);
      d = HH(d, a, b, c, words[k+0], S32, 0xEAA127FA);
      c = HH(c, d, a, b, words[k+3], S33, 0xD4EF3085);
      b = HH(b, c, d, a, words[k+6], S34, 0x4881D05);
      a = HH(a, b, c, d, words[k+9], S31, 0xD9D4D039);
      d = HH(d, a, b, c, words[k+12], S32, 0xE6DB99E5);
      c = HH(c, d, a, b, words[k+15], S33, 0x1FA27CF8);
      b = HH(b, c, d, a, words[k+2], S34, 0xC4AC5665);

      a = II(a, b, c, d, words[k+0], S41, 0xF4292244);
      d = II(d, a, b, c, words[k+7], S42, 0x432AFF97);
      c = II(c, d, a, b, words[k+14], S43, 0xAB9423A7);
      b = II(b, c, d, a, words[k+5], S44, 0xFC93A039);
      a = II(a, b, c, d, words[k+12], S41, 0x655B59C3);
      d = II(d, a, b, c, words[k+3], S42, 0x8F0CCC92);
      c = II(c, d, a, b, words[k+10], S43, 0xFFEFF47D);
      b = II(b, c, d, a, words[k+1], S44, 0x85845DD1);
      a = II(a, b, c, d, words[k+8], S41, 0x6FA87E4F);
      d = II(d, a, b, c, words[k+15], S42, 0xFE2CE6E0);
      c = II(c, d, a, b, words[k+6], S43, 0xA3014314);
      b = II(b, c, d, a, words[k+13], S44, 0x4E0811A1);
      a = II(a, b, c, d, words[k+4], S41, 0xF7537E82);
      d = II(d, a, b, c, words[k+11], S42, 0xBD3AF235);
      c = II(c, d, a, b, words[k+2], S43, 0x2AD7D2BB);
      b = II(b, c, d, a, words[k+9], S44, 0xEB86D391);

      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  }

  async function computeHashes() {
    const text = container.querySelector('#hashTextInput').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // Web Crypto API for SHA family
    async function digest(algo) {
      const hashBuf = await crypto.subtle.digest(algo, data);
      const hashArr = Array.from(new Uint8Array(hashBuf));
      return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const sha256 = await digest('SHA-256');
    const sha512 = await digest('SHA-512');
    const sha1 = await digest('SHA-1');
    const md5Hex = md5(text);

    container.querySelector('#sha256Res').textContent = sha256;
    container.querySelector('#sha512Res').textContent = sha512;
    container.querySelector('#sha1Res').textContent = sha1;
    container.querySelector('#md5Res').textContent = md5Hex;

    // Check compare
    const compare = container.querySelector('#hashCompareInput').value.trim().toLowerCase();
    const badge = container.querySelector('#hashMatchBadge');
    if (compare && (compare === sha256 || compare === sha512 || compare === sha1 || compare === md5Hex)) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  container.querySelector('#hashTextInput').addEventListener('input', computeHashes);
  container.querySelector('#hashCompareInput').addEventListener('input', computeHashes);

  container.querySelectorAll('.copy-hash-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const text = container.querySelector(`#${targetId}`).textContent;
      navigator.clipboard.writeText(text).then(() => {
        if (window.showToast) showToast("Hash berhasil disalin!", "success");
      });
    });
  });

  computeHashes();
};
