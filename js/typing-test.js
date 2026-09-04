/**
 * typing-test.js
 * Tool: Interactive Typing Speed & Accuracy Test
 * Menguji kecepatan ketik kata per menit (WPM), akurasi %, dan timer 60 detik.
 */

window.renderTypingTest = function(container) {
  const samplePassages = [
    "Kementerian Ketenagakerjaan Republik Indonesia terus mendorong transformasi digital dalam pelayanan ketenagakerjaan nasional untuk meningkatkan efisiensi dan transparansi.",
    "Pengembangan aplikasi web modern memerlukan pemahaman yang solid terhadap arsitektur backend, manajemen basis data, serta kenyamanan antarmuka pengguna.",
    "Analisis data dan kecerdasan buatan memberikan wawasan mendalam bagi organisasi untuk mengambil keputusan strategis berbasis fakta dan bukti empiris."
  ];

  let selectedPassage = samplePassages[0];
  let timer = 60;
  let timerInterval = null;
  let isRunning = false;
  let charIndex = 0;
  let mistakes = 0;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Stats Top Bar -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center shadow-sm">
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Waktu Tersisa</div>
          <div class="text-2xl sm:text-3xl font-bold font-mono text-sky-600 dark:text-sky-400 mt-1" id="typingTimer">60s</div>
        </div>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center shadow-sm">
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Kecepatan (WPM)</div>
          <div class="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1" id="typingWpm">0</div>
        </div>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center shadow-sm">
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Akurasi</div>
          <div class="text-2xl sm:text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1" id="typingAccuracy">100%</div>
        </div>
      </div>

      <!-- Text Box to Type -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Ketik paragraf berikut secepat dan seakurat mungkin:</span>
          <button id="typingChangePassageBtn" class="text-sky-600 dark:text-sky-400 hover:underline text-xs flex items-center gap-1">
            <i data-lucide="refresh-cw" class="w-3 h-3"></i> Ganti Teks
          </button>
        </div>

        <div id="typingTextDisplay" class="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm sm:text-base leading-relaxed font-mono select-none">
          <!-- Populated by spans -->
        </div>

        <div class="relative">
          <textarea id="typingInputField" rows="3" placeholder="Klik di sini dan mulai mengetik untuk memulai timer..." class="w-full p-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-sky-500 outline-none resize-none"></textarea>
        </div>

        <div class="flex items-center justify-between pt-1">
          <span class="text-xs text-slate-400">Total Kesalahan: <strong id="typingMistakes" class="text-red-500 font-mono">0</strong></span>
          <button id="typingResetBtn" class="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            <span>Ulangi Tes</span>
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const textDisplay = container.querySelector('#typingTextDisplay');
  const inputField = container.querySelector('#typingInputField');
  const timerEl = container.querySelector('#typingTimer');
  const wpmEl = container.querySelector('#typingWpm');
  const accuracyEl = container.querySelector('#typingAccuracy');
  const mistakesEl = container.querySelector('#typingMistakes');
  const resetBtn = container.querySelector('#typingResetBtn');
  const changePassageBtn = container.querySelector('#typingChangePassageBtn');

  function initPassage() {
    textDisplay.innerHTML = "";
    selectedPassage.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.innerText = char;
      if (index === 0) span.classList.add("typing-char-current");
      textDisplay.appendChild(span);
    });
  }

  function resetTest() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    timer = 60;
    charIndex = 0;
    mistakes = 0;
    timerEl.textContent = "60s";
    wpmEl.textContent = "0";
    accuracyEl.textContent = "100%";
    mistakesEl.textContent = "0";
    inputField.value = "";
    inputField.disabled = false;
    initPassage();
  }

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timerInterval = setInterval(() => {
        if (timer > 0) {
          timer--;
          timerEl.textContent = `${timer}s`;
          updateStats();
        } else {
          clearInterval(timerInterval);
          inputField.disabled = true;
          window.showToast?.(`Waktu habis! Skor akhir Anda: ${wpmEl.textContent} WPM`);
        }
      }, 1000);
    }
  }

  function updateStats() {
    const timeSpent = 60 - timer;
    if (timeSpent > 0) {
      const wordsTyped = (charIndex - mistakes) / 5;
      const wpm = Math.max(0, Math.round((wordsTyped / timeSpent) * 60));
      wpmEl.textContent = wpm;
    }
    const accuracy = charIndex > 0 ? Math.max(0, Math.round(((charIndex - mistakes) / charIndex) * 100)) : 100;
    accuracyEl.textContent = `${accuracy}%`;
    mistakesEl.textContent = mistakes;
  }

  inputField.addEventListener('input', (e) => {
    startTimer();
    const characters = textDisplay.querySelectorAll("span");
    const typedChar = inputField.value.split("")[charIndex];

    if (charIndex < characters.length && timer > 0) {
      if (typedChar == null) {
        // Backspace
        if (charIndex > 0) {
          charIndex--;
          if (characters[charIndex].classList.contains("typing-char-incorrect")) {
            mistakes = Math.max(0, mistakes - 1);
          }
          characters[charIndex].classList.remove("typing-char-correct", "typing-char-incorrect");
        }
      } else {
        if (characters[charIndex].innerText === typedChar) {
          characters[charIndex].classList.add("typing-char-correct");
        } else {
          mistakes++;
          characters[charIndex].classList.add("typing-char-incorrect");
        }
        charIndex++;
      }

      characters.forEach(span => span.classList.remove("typing-char-current"));
      if (charIndex < characters.length) {
        characters[charIndex].classList.add("typing-char-current");
      } else {
        // Completed all characters
        clearInterval(timerInterval);
        inputField.disabled = true;
        updateStats();
        window.showToast?.(`Selamat! Anda menyelesaikan tes dengan ${wpmEl.textContent} WPM.`);
      }
      updateStats();
    }
  });

  resetBtn.addEventListener('click', resetTest);
  changePassageBtn.addEventListener('click', () => {
    const nextIndex = (samplePassages.indexOf(selectedPassage) + 1) % samplePassages.length;
    selectedPassage = samplePassages[nextIndex];
    resetTest();
  });

  initPassage();
};
