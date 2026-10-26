# PassGuard — Password Strength Checker & Generator

Aplikasi web interaktif untuk memeriksa kekuatan password secara real-time dan membuat password acak yang kuat. Dibangun dengan HTML, CSS, dan JavaScript murni (tanpa library atau framework) sebagai Mini Project JavaScript & DOM.

## Informasi Tugas

| | |
|---|---|
| Mata Kuliah | Pemrograman Antarmuka Pengguna |
| Pertemuan | 10 — JavaScript & Document Object Model (DOM) |
| Tugas | Mini Project JavaScript & DOM (Praktikum Terbimbing) |
| Rumpun Topik | Technology |
| Kelompok | 9 |
| Program Studi | Sistem Informasi |

### Anggota Kelompok & Pembagian Tugas

| No | Nama | NIM | Peran | Kontribusi |
|---|---|---|---|---|
| 1 | Deio Castello Sujati | 825250002 | Struktur & Fondasi | Struktur HTML, CSS dasar (variabel warna, tema, layout, kartu, input, dan tombol), seleksi elemen DOM, dan data konstanta |
| 2 | Felicia Rivera | 825250003 | Logika Inti Pemeriksa Password | Logika penilaian kekuatan password (cek jenis karakter, skor, penalti, level Weak/Medium/Strong), fungsi DOM untuk menampilkan hasil analisis, serta CSS meteran, badge, checklist, dan kotak saran |
| 3 | Muhammad Ubait Dhaifullah | 825250012 | Generator, Interaksi & Responsif | Logika generator password, fitur show/hide, Copy to Clipboard, riwayat, seluruh event listener, inisialisasi, serta CSS generator dan responsif |

## Fitur

### Password Strength Checker
- Pemeriksaan kekuatan password secara real-time setiap kali pengguna mengetik.
- Indikator level **Weak / Medium / Strong** dengan warna Merah / Kuning / Hijau.
- Meteran (progress bar) yang memanjang dan memendek sesuai skor 0–100.
- Checklist kriteria: panjang minimal 8 karakter, huruf kecil, huruf besar, angka, dan simbol.
- Statistik panjang password dan jumlah jenis karakter yang dipakai.
- Kotak saran otomatis untuk membuat password lebih kuat.
- Deteksi password yang paling sering dipakai/bocor dan karakter yang berulang.
- Tombol tampilkan/sembunyikan password.
- Copy to Clipboard, teks tombol berubah menjadi "Copied!" selama 2 detik.
- Tekan `Esc` untuk mengosongkan kolom.

### Safe Password Generator
- Pengaturan panjang password 8–32 karakter melalui slider.
- Pilihan jenis karakter: huruf besar, huruf kecil, angka, dan simbol.
- Password yang dihasilkan dijamin memuat semua jenis karakter yang dipilih.
- Riwayat 5 password terakhir; klik salah satu untuk memakainya kembali.

### Lainnya
- Tema gelap dan terang.
- Tampilan responsif untuk desktop, tablet, dan HP.
- Seluruh proses berjalan di browser (client-side); password tidak dikirim ke mana pun.

## Materi yang Diterapkan

- **JavaScript dasar:** `let` dan `const`, tipe data (String, Number, Boolean, Object, Array), template literal, operator aritmatika, perbandingan, dan logika.
- **Kontrol alur:** `if / else if / else`, `switch-case`, operator ternary, dan `try...catch`.
- **Perulangan:** `for`, `while`, `do...while`, dan `forEach`.
- **Array:** `push`, `pop`, dan `unshift`.
- **Function:** parameter dan `return`.
- **Event handling:** `addEventListener`, event object, dan `preventDefault()`.
- **DOM:** `getElementById`, `querySelectorAll`, `textContent`, `innerHTML`, `setAttribute`, `getAttribute`, `classList`, `style`, `createElement`, dan `appendChild`.

---

© 2026 PassGuard — Kelompok 9, Pemrograman Antarmuka Pengguna.