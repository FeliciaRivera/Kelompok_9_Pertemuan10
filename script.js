/*
  File          : script.js (logika & interaksi)
 
  Tugas         : Mini Project JavaScript & DOM (Praktikum Terbimbing)
  Mata Kuliah   : Pemrograman Antarmuka Pengguna — Pertemuan 10
  Kelompok      : 9
  Nama & NIM    : Deio Castello Sujati (825250002), Felicia Rivera (825250003), Muhammad Ubait Dhaifullah (825250012)
  Program Studi : Sistem Informasi
  Rumpun Topik  : Technology
  Judul         : PassGuard — Password Strength Checker & Generator
 
  Deskripsi:
    Aplikasi web untuk memeriksa kekuatan password secara langsung, menampilkan level kekuatan password
    (Weak / Medium / Strong) dan membuat password acak yang kuat.
*/

// 1. SELEKSI ELEMEN DOM  (getElementById & querySelectorAll)
const passwordInput    = document.getElementById('passwordInput');      // [INPUT] kolom password utama
const inputWrapper     = document.getElementById('inputWrapper');       // [DOM] border berubah warna
const meterBar         = document.getElementById('meterBar');           // [DOM] wadah meteran
const meterFill        = document.getElementById('meterFill');          // [DOM] isi meteran
const strengthBadge    = document.getElementById('strengthBadge');      // [DOM] teks Weak/Medium/Strong
const scoreText        = document.getElementById('scoreText');          // [DOM] teks skor
const lengthStat       = document.getElementById('lengthStat');         // [DOM] statistik panjang
const typeStat         = document.getElementById('typeStat');           // [DOM] statistik jenis karakter
const criteriaItems    = document.querySelectorAll('#criteriaList li'); // [DOM] NodeList checklist 
const feedbackBox      = document.getElementById('feedbackBox');        // [DOM] kotak saran
const checkerMsg       = document.getElementById('checkerMsg');         // [DOM] pesan kartu pemeriksa

const toggleVisibility = document.getElementById('toggleVisibility');   // [EVENT] tombol show/hide
const iconEye          = document.getElementById('iconEye');            // [DOM] ikon mata
const iconEyeOff       = document.getElementById('iconEyeOff');         // [DOM] ikon mata dicoret

const copyBtn          = document.getElementById('copyBtn');            // [EVENT] tombol copy
const copyText         = document.getElementById('copyText');           // [DOM] teks "Copy"/"Copied!"
const iconCopy         = document.getElementById('iconCopy');           // [DOM] ikon salin
const iconCheck        = document.getElementById('iconCheck');          // [DOM] ikon centang

const themeToggle      = document.getElementById('themeToggle');        // [EVENT] tombol tema
const iconMoon         = document.getElementById('iconMoon');           // [DOM] ikon bulan
const iconSun          = document.getElementById('iconSun');            // [DOM] ikon matahari

const generatorForm    = document.getElementById('generatorForm');      // [EVENT] form generator (submit)
const lengthSlider     = document.getElementById('lengthSlider');       // [INPUT] slider panjang
const lengthValue      = document.getElementById('lengthValue');        // [DOM] angka panjang slider
const optUpper         = document.getElementById('optUpper');           // [INPUT] opsi huruf besar
const optLower         = document.getElementById('optLower');           // [INPUT] opsi huruf kecil
const optNumber        = document.getElementById('optNumber');          // [INPUT] opsi angka
const optSymbol        = document.getElementById('optSymbol');          // [INPUT] opsi simbol
const generatorMsg     = document.getElementById('generatorMsg');       // [DOM] pesan generator
const historyList      = document.getElementById('historyList');        // [DOM] daftar riwayat
const clearHistoryBtn  = document.getElementById('clearHistoryBtn');    // [EVENT] hapus riwayat

// 2. KONSTANTA & DATA  (const, let, Object, Array)
const CHARSET = {                                    // [LOGIKA] Object: kumpulan karakter per jenis
  upper:  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower:  'abcdefghijklmnopqrstuvwxyz',
  number: '0123456789',
  symbol: '!@#$%^&*()-_=+[]{};:,.?/~'
};

const COMMON_PASSWORDS = [                           // [LOGIKA] Array: password yang paling sering dipakai/bocor
  'password', 'Password', '123456', '12345678', '123456789', 'qwerty',
  'abc123', 'password1', '111111', 'iloveyou', 'admin', 'welcome',
  'letmein', 'monkey', 'dragon', 'sayang', 'bismillah', 'indonesia'
];

const MAX_POINTS = 7;                                // [LOGIKA] 3 poin panjang + 4 poin jenis karakter
const MAX_HISTORY = 5;                               //  jumlah maksimal riwayat
let passwordHistory = [];                            //  Array riwayat (let karena isinya berubah)

// 3. FUNGSI LOGIKA: ANALISIS KEKUATAN PASSWORD  (function & return)

/**
 * Memeriksa setiap karakter password dengan perulangan for
 * dan operator perbandingan + logika AND.  [LOGIKA]
 */
function checkCriteria(pwd) {
  const result = {                                   // [LOGIKA] Object berisi Boolean
    length: pwd.length >= 8,                         // [LOGIKA] panjang minimal 8
    lower:  false,
    upper:  false,
    number: false,
    symbol: false
  };

  for (let i = 0; i < pwd.length; i++) {             // [LOGIKA] for: cek karakter satu per satu
    const ch = pwd[i];                               // [LOGIKA] akses karakter dengan indeks
    if (ch >= 'a' && ch <= 'z') {                    // [LOGIKA] huruf kecil?
      result.lower = true;
    } else if (ch >= 'A' && ch <= 'Z') {             // [LOGIKA] huruf besar?
      result.upper = true;
    } else if (ch >= '0' && ch <= '9') {             // [LOGIKA] angka?
      result.number = true;
    } else {                                         // [LOGIKA] selain itu = simbol
      result.symbol = true;
    }
  }
  return result;                                     // [LOGIKA] return Object
}

/** Menghitung berapa jenis karakter yang dipakai (0–4) dengan forEach.  [LOGIKA] */
function countCharTypes(criteria) {
  const types = [criteria.lower, criteria.upper, criteria.number, criteria.symbol]; // [LOGIKA] Array Boolean
  let count = 0;
  types.forEach(isUsed => {                          // [LOGIKA] forEach (modul: perulangan)
    if (isUsed) count++;                             // [LOGIKA] operator increment ++
  });
  return count;
}

/** Mengecek karakter yang sama berulang 3x berturut-turut (misal "aaa").  [LOGIKA] */
function hasRepeatedChars(pwd) {
  for (let i = 0; i < pwd.length - 2; i++) {         // [LOGIKA] for
    if (pwd[i] === pwd[i + 1] && pwd[i] === pwd[i + 2]) { // [LOGIKA] === dan AND
      return true;
    }
  }
  return false;
}

/** Mencari password di daftar password umum dengan perulangan while.  [LOGIKA] */
function isCommonPassword(pwd) {
  let found = false;
  let i = 0;
  while (i < COMMON_PASSWORDS.length && !found) {    // [LOGIKA] while
    if (COMMON_PASSWORDS[i] === pwd) {               // [LOGIKA] perbandingan ketat ===
      found = true;
    }
    i++;
  }
  return found;
}

/**
 * Fungsi utama penilaian password.  [LOGIKA]
 * Poin: panjang (>=8, >=12, >=16) + jumlah jenis karakter, dikurangi penalti.
 */
function analyzePassword(pwd) {
  const criteria  = checkCriteria(pwd);              // [LOGIKA] panggil fungsi
  const typeCount = countCharTypes(criteria);
  const isCommon  = isCommonPassword(pwd);
  const warnings  = [];                              // [LOGIKA] Array penampung saran
  let points = 0;                                    // [LOGIKA] let karena nilainya berubah

  // --- Poin dari panjang (if) ---
  if (pwd.length >= 8)  points++;
  if (pwd.length >= 12) points++;
  if (pwd.length >= 16) points++;

  // --- Poin dari variasi karakter ---
  points = points + typeCount;                       // [LOGIKA] operator aritmatika

  // --- Penalti & saran (push) ---
  if (hasRepeatedChars(pwd)) {
    points--;                                        // [LOGIKA] decrement --
    warnings.push('Hindari karakter yang berulang seperti "aaa" atau "111".');
  }
  if (!criteria.length) warnings.push('Tambahkan panjang password minimal 8 karakter (ideal 12 atau lebih).');
  if (!criteria.lower)  warnings.push('Tambahkan huruf kecil (a–z).');
  if (!criteria.upper)  warnings.push('Tambahkan huruf besar (A–Z).');
  if (!criteria.number) warnings.push('Tambahkan angka (0–9).');
  if (!criteria.symbol) warnings.push('Tambahkan simbol seperti ! @ # $.');

  // --- Skor 0–100 ---
  let score = Math.round((points / MAX_POINTS) * 100); // [LOGIKA] persentase poin
  if (score < 0) score = 0;                          // [LOGIKA] skor tidak boleh negatif
  if (isCommon) score = 5;                           // [LOGIKA] password umum = langsung sangat lemah

  // --- Tentukan level (if / else if / else) ---
  let level;
  if (isCommon || !criteria.length || score < 50) {  // [LOGIKA] operator OR || 
    level = 'weak';                                  // Merah
  } else if (score < 80) {
    level = 'medium';                                // Kuning
  } else {
    level = 'strong';                                // Hijau
  }

  return { criteria, typeCount, score, level, warnings, isCommon }; // [LOGIKA] return Object
}

/** Mengambil label & class CSS sesuai level dengan switch-case.  [LOGIKA] */
function getLevelInfo(level) {
  let info;
  switch (level) {                                   // [LOGIKA] switch-case
    case 'weak':
      info = { label: 'Weak', cssClass: 'is-weak' };
      break;
    case 'medium':
      info = { label: 'Medium', cssClass: 'is-medium' };
      break;
    case 'strong':
      info = { label: 'Strong', cssClass: 'is-strong' };
      break;
    default:
      info = { label: 'Belum ada input', cssClass: '' };
  }
  return info;
}

// 4. FUNGSI DOM: MEMPERBARUI TAMPILAN

/** Menampilkan pesan pada elemen tertentu.  [DOM] */
function showMessage(element, text, isError) {
  element.textContent = text;                        // [DOM] ubah teks
  if (isError) {
    element.classList.add('message--error');         // [DOM] classList.add
  } else {
    element.classList.remove('message--error');      // [DOM] classList.remove
  }
  element.style.display = 'block';                   // [DOM] style.property 
}

/** Menyembunyikan pesan.  [DOM] */
function hideMessage(element) {
  element.style.display = 'none';                    // [DOM] style.display
}

/** Menghapus semua class level dari elemen indikator.  [DOM] */
function clearLevelClasses() {
  const targets = [inputWrapper, strengthBadge, meterBar];       // [LOGIKA] Array elemen
  targets.forEach(el => {                                         // [LOGIKA] forEach
    el.classList.remove('is-weak', 'is-medium', 'is-strong');     // [DOM] classList.remove
  });
}

/** Mengembalikan tampilan ke kondisi awal (input kosong).  [DOM] */
function resetIndicator() {
  clearLevelClasses();                                            // [DOM]
  meterFill.style.width = '0%';                                   // [DOM] meteran kosong
  meterBar.setAttribute('aria-valuenow', '0');                    // [DOM] setAttribute
  strengthBadge.textContent = getLevelInfo('').label;             // [DOM] teks indikator awal
  scoreText.textContent = 'Skor: 0 / 100';                        // [DOM]
  lengthStat.textContent = '0 karakter';                          // [DOM]
  typeStat.textContent = '0 / 4';                                 // [DOM]
  criteriaItems.forEach(li => li.classList.remove('met'));        // [DOM]
  feedbackBox.style.display = 'none';                             // [DOM] sembunyikan saran
}

/** Menampilkan hasil analisis ke halaman.  [DOM] */
function renderResult(pwd, result) {
  const levelInfo = getLevelInfo(result.level);                   // [LOGIKA] label & class level

  // (a) Warna indikator: Merah / Kuning / Hijau
  clearLevelClasses();                                            // [DOM]
  inputWrapper.classList.add(levelInfo.cssClass);                 // [DOM] warna border input
  strengthBadge.classList.add(levelInfo.cssClass);                // [DOM] warna latar badge
  meterBar.classList.add(levelInfo.cssClass);                     // [DOM] warna meteran

  // (b) Teks indikator dinamis (template literal)
  strengthBadge.textContent = levelInfo.label;                    // [DOM] "Weak" / "Medium" / "Strong"
  scoreText.textContent = `Skor: ${result.score} / 100`;          // [DOM]

  // (c) Meteran memanjang / memendek
  meterFill.style.width = `${result.score}%`;                     // [DOM] style.width
  meterBar.setAttribute('aria-valuenow', result.score);           // [DOM] setAttribute

  // (d) Statistik
  lengthStat.textContent = `${pwd.length} karakter`;              // [DOM]
  typeStat.textContent = `${result.typeCount} / 4`;               // [DOM]

  // (e) Checklist kriteria
  criteriaItems.forEach(li => {                                   // [LOGIKA] loop NodeList
    const rule = li.getAttribute('data-rule');                    // [DOM] getAttribute
    if (result.criteria[rule]) {                                  // [LOGIKA]
      li.classList.add('met');                                    // [DOM] centang
    } else {
      li.classList.remove('met');                                 // [DOM] silang
    }
  });

  // (f) Kotak saran: createElement + appendChild
  feedbackBox.innerHTML = '';                                     // [DOM] innerHTML: kosongkan isi lama
  if (result.warnings.length === 0 && !result.isCommon) {         // [LOGIKA] tidak ada saran
    feedbackBox.style.display = 'none';                           // [DOM]
    return;
  }

  const title = document.createElement('strong');                 // [DOM] createElement
  title.textContent = result.isCommon
    ? 'Peringatan: password ini termasuk yang paling sering dipakai dan bocor.'
    : 'Saran agar password lebih kuat:';                          // [LOGIKA] ternary 
  feedbackBox.appendChild(title);                                 // [DOM] appendChild

  const list = document.createElement('ul');                      // [DOM] createElement
  result.warnings.forEach(text => {                               // [LOGIKA] forEach
    const item = document.createElement('li');                    // [DOM] createElement
    item.textContent = text;                                      // [DOM] textContent
    list.appendChild(item);                                       // [DOM] appendChild
  });
  feedbackBox.appendChild(list);                                  // [DOM]

  if (result.level === 'weak') {
    feedbackBox.classList.add('feedback--danger');                // [DOM] merah bila lemah
  } else {
    feedbackBox.classList.remove('feedback--danger');             // [DOM] kuning bila sedang
  }
  feedbackBox.style.display = 'block';                            // [DOM] tampilkan kotak saran
}

/** Penghubung: baca input -> analisis -> tampilkan.  [INPUT][LOGIKA][DOM] */
function handlePasswordInput() {
  const pwd = passwordInput.value;                                // [INPUT] ambil nilai yang diketik
  hideMessage(checkerMsg);                                        // [DOM]

  if (pwd === '') {                                               // [LOGIKA] ===
    resetIndicator();                                             // [DOM]
    return;
  }

  const result = analyzePassword(pwd);                            // [LOGIKA]
  renderResult(pwd, result);                                      // [DOM]
  console.log('Hasil analisis:', result.level, result.score);     // Debug di Console (modul: console.log)
}

// 5. FUNGSI LOGIKA: GENERATOR PASSWORD

/** Mengambil satu karakter acak dari sebuah string.  [LOGIKA] */
function randomChar(chars) {
  const index = Math.floor(Math.random() * chars.length);         // [LOGIKA] indeks acak 0..panjang-1
  return chars[index];
}

/** Mengecek apakah minimal satu opsi karakter dicentang.  [LOGIKA] */
function isAnyOptionChecked() {
  return optUpper.checked || optLower.checked || optNumber.checked || optSymbol.checked; // [LOGIKA] OR
}

/**
 * Membuat password acak.  [LOGIKA]
 * do...while : ulangi pembuatan sampai SEMUA jenis yang dicentang
 * benar-benar muncul, sehingga password yang dihasilkan selalu kuat.
 */
function generatePassword(length, options) {
  let pool = '';                                                  // [LOGIKA] gabungan karakter
  if (options.upper)  pool += CHARSET.upper;                      // [LOGIKA] concatenation string
  if (options.lower)  pool += CHARSET.lower;
  if (options.number) pool += CHARSET.number;
  if (options.symbol) pool += CHARSET.symbol;

  let password;
  let check;
  do {                                                            // [LOGIKA] do...while
    password = '';
    for (let i = 0; i < length; i++) {                            // [LOGIKA] for sebanyak panjang
      password += randomChar(pool);
    }
    check = checkCriteria(password);                              // [LOGIKA] pakai ulang fungsi pemeriksa
  } while (
    (options.upper  && !check.upper)  ||
    (options.lower  && !check.lower)  ||
    (options.number && !check.number) ||
    (options.symbol && !check.symbol)
  );

  return password;
}

/** Handler submit form generator.  [EVENT][LOGIKA][DOM] */
function handleGenerate(event) {
  event.preventDefault();                                         // [EVENT] cegah reload halaman (modul submit)

  if (!isAnyOptionChecked()) {                                    // [LOGIKA] validasi
    showMessage(generatorMsg, 'Pilih minimal satu jenis karakter.', true); // [DOM]
    return;
  }

  const length = Number(lengthSlider.value);                      // [INPUT] nilai slider (String -> Number)
  const options = {                                               // [INPUT] baca checkbox ke Object
    upper:  optUpper.checked,
    lower:  optLower.checked,
    number: optNumber.checked,
    symbol: optSymbol.checked
  };

  const newPassword = generatePassword(length, options);          // [LOGIKA]

  passwordInput.value = newPassword;                              // [DOM] isi kolom input
  setVisibility(true);                                            // [DOM] tampilkan agar terlihat
  handlePasswordInput();                                          // [LOGIKA][DOM] langsung dianalisis
  addToHistory(newPassword);                                      //  simpan ke riwayat
  const level = analyzePassword(newPassword).level;                              // [LOGIKA] cek level hasil generate
  if (level === 'weak') {
    showMessage(generatorMsg, 'Password dibuat, tapi masih lemah. Centang lebih banyak jenis karakter atau tambah panjangnya.', true); // [DOM]
  } else {
    showMessage(generatorMsg, `Password ${length} karakter berhasil dibuat.`, false); // [DOM]
  }
}

// 6. FITUR PLUS POINT

/**  Show / Hide password: setAttribute + tukar ikon mata */
function setVisibility(show) {
  passwordInput.setAttribute('type', show ? 'text' : 'password'); // [DOM] ubah atribut type
  if (show) {
    iconEye.classList.add('hidden');                              // [DOM] sembunyikan ikon mata
    iconEyeOff.classList.remove('hidden');                        // [DOM] tampilkan ikon mata dicoret
  } else {
    iconEye.classList.remove('hidden');
    iconEyeOff.classList.add('hidden');
  }
  toggleVisibility.setAttribute('title', show ? 'Sembunyikan password' : 'Tampilkan password'); // [DOM]
}

/**  Copy to Clipboard: teks tombol menjadi "Copied!" selama 2 detik */
function handleCopy() {
  const pwd = passwordInput.value;                                // [INPUT]

  if (pwd === '') {                                               // [LOGIKA] tidak ada yang disalin
    showMessage(checkerMsg, 'Belum ada password untuk disalin.', true); // [DOM]
    return;
  }
  if (copyText.textContent === 'Copied!') return;                 // [LOGIKA] cegah klik ganda

  try {                                                           // [LOGIKA] try...catch
    navigator.clipboard.writeText(pwd);                           // salin ke clipboard (Clipboard API)

    copyText.textContent = 'Copied!';                             // [DOM] ubah teks tombol
    copyBtn.classList.add('copied');                              // [DOM] ubah warna tombol
    iconCopy.classList.add('hidden');                             // [DOM] tukar ikon
    iconCheck.classList.remove('hidden');

    setTimeout(() => {                                            // tunggu 2 detik (2000 ms)
      copyText.textContent = 'Copy';                              // [DOM] kembali normal
      copyBtn.classList.remove('copied');
      iconCopy.classList.remove('hidden');
      iconCheck.classList.add('hidden');
    }, 2000);
  } catch (error) {
    showMessage(checkerMsg, 'Browser tidak mengizinkan penyalinan otomatis. Salin manual dengan Ctrl+C.', true); // [DOM]
  }
}

/**  Riwayat: unshift & pop */
function addToHistory(pwd) {
  passwordHistory.unshift(pwd);                                   // [LOGIKA] tambah di depan
  if (passwordHistory.length > MAX_HISTORY) {                     // [LOGIKA] batasi jumlah
    passwordHistory.pop();                                        // [LOGIKA] buang yang paling lama
  }
  renderHistory();                                                // [DOM]
}

/**
 *  Menampilkan riwayat dengan createElement + appendChild,
 * lalu memasang event click memakai POLA YANG SAMA dengan listgroup.js di modul:
 * querySelectorAll -> forEach -> addEventListener -> preventDefault -> hapus 'active' -> this.classList.add('active')
 */
function renderHistory() {
  historyList.innerHTML = '';                                     // [DOM] kosongkan list

  if (passwordHistory.length === 0) {                             // [LOGIKA]
    const empty = document.createElement('li');                   // [DOM] createElement
    empty.classList.add('history__empty');                     // [DOM] classList.add
    empty.textContent = 'Belum ada password yang dibuat.';
    historyList.appendChild(empty);                               // [DOM] appendChild
    return;
  }

  passwordHistory.forEach((pwd, index) => {                       // [LOGIKA] forEach dengan index (modul)
    const li = document.createElement('li');                      // [DOM] createElement
    const link = document.createElement('a');                     // [DOM] createElement
    link.classList.add('history__item');                       // [DOM] classList.add
    link.setAttribute('href', '#');                               // [DOM] setAttribute
    link.setAttribute('title', 'Klik untuk memakai password ini');
    link.textContent = pwd;                                       // [DOM] textContent
    if (index === 0) link.classList.add('active');                // [DOM] item terbaru ditandai
    li.appendChild(link);                                         // [DOM] appendChild
    historyList.appendChild(li);
  });

  const historyItems = document.querySelectorAll('#historyList .history__item'); // [DOM] querySelectorAll
  historyItems.forEach(item => {                                  // [LOGIKA] forEach
    item.addEventListener('click', function (e) {                 // [EVENT] click
      e.preventDefault();                                         // [EVENT] cegah lompat ke "#"
      historyItems.forEach(i => i.classList.remove('active'));    // [DOM] hapus highlight lama
      this.classList.add('active');                               // [DOM] highlight item yang diklik

      passwordInput.value = this.textContent;                     // [DOM] isi input
      setVisibility(true);                                        // [DOM]
      handlePasswordInput();                                      // [LOGIKA][DOM] analisis ulang
    });
  });
}

// 7. EVENT LISTENER  (addEventListener)

// [EVENT] 'input' -> cek kekuatan password secara real-time setiap kali mengetik
passwordInput.addEventListener('input', handlePasswordInput);

// [EVENT] 'keydown' -> tekan Esc untuk mengosongkan kolom (event object: event.key)
passwordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {                                   // [LOGIKA]
    passwordInput.value = '';                                     // [DOM]
    handlePasswordInput();                                        // [DOM] reset tampilan
  }
});

// [EVENT] 'submit' -> tombol "Generate Safe Password" di dalam form
generatorForm.addEventListener('submit', handleGenerate);

// [EVENT] 'click' -> Copy to Clipboard
copyBtn.addEventListener('click', handleCopy);

// [EVENT] 'click' -> tampilkan / sembunyikan password
toggleVisibility.addEventListener('click', () => {
  const isHidden = passwordInput.getAttribute('type') === 'password'; // [DOM] getAttribute
  setVisibility(isHidden);                                            // [DOM]
});

// [EVENT] 'input' -> slider panjang: angka ikut berubah
lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;                   // [DOM] ubah teks angka
});

// [EVENT] 'click' pada checkbox -> cegah semua opsi tidak dicentang
const optionBoxes = [optUpper, optLower, optNumber, optSymbol];   // [LOGIKA] Array elemen
optionBoxes.forEach(box => {
  box.addEventListener('click', () => {
    if (!isAnyOptionChecked()) {                                  // [LOGIKA]
      box.checked = true;                                         // [DOM] centang kembali
      showMessage(generatorMsg, 'Minimal satu jenis karakter harus dipilih.', true); // [DOM]
    } else {
      hideMessage(generatorMsg);                                  // [DOM]
    }
  });
});

// [EVENT] 'click' -> hapus riwayat
clearHistoryBtn.addEventListener('click', () => {
  passwordHistory = [];                                           // [LOGIKA] kosongkan Array
  renderHistory();                                                // [DOM]
  hideMessage(generatorMsg);                                      // [DOM]
});

// [EVENT] 'click' -> ganti tema gelap / terang
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');                        // [DOM] classList.toggle
  iconMoon.classList.toggle('hidden');                            // [DOM] tukar ikon bulan
  iconSun.classList.toggle('hidden');                             // [DOM] tukar ikon matahari
});

// 8. INISIALISASI
resetIndicator();                                                             // [DOM] tampilan awal
document.getElementById('footerYear').textContent = new Date().getFullYear(); // [DOM] tahun otomatis di footer (Date)
console.log('PassGuard siap digunakan');                                      // Debug di Console (F12)