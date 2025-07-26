# Perbaikan Kapitalisasi Judul Hero Dashboard

## Perubahan yang Dilakukan

### 1. Fungsi Title Case
Menambahkan fungsi `toTitleCase()` di komponen Hero untuk mengubah judul menjadi Title Case (huruf pertama setiap kata kapital):

```javascript
const toTitleCase = (text) => {
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
```

### 2. Judul yang Diperbaiki

**Sebelum:**
- "Selamat datang di desa sidomulyo"
- "Layanan surat online" 
- "Pengaduan masyarakat"

**Sesudah:**
- "Selamat Datang Di Desa Sidomulyo"
- "Layanan Surat Online"
- "Pengaduan Masyarakat"

### 3. Implementasi

Judul akan otomatis dikonversi menjadi Title Case saat ditampilkan di hero section, sehingga:
- Setiap kata dimulai dengan huruf kapital
- Format yang konsisten dan profesional
- Mudah dibaca dan menarik secara visual

## Hasil

Dashboard hero section sekarang menampilkan judul dengan kapitalisasi yang benar dan konsisten, memberikan tampilan yang lebih profesional dan mudah dibaca. 