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