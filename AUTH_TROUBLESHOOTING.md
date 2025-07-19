# Troubleshooting Autentikasi WebSidomulyo

## Error: "Access denied. No token provided"

### Penyebab
Error ini terjadi karena:
1. User belum login sebagai admin
2. Token tidak tersimpan dengan benar di localStorage
3. Token tidak terkirim dengan benar saat request
4. Backend tidak berjalan atau tidak dapat diakses

### Solusi

#### 1. Pastikan Backend Berjalan
```bash
# Di terminal, jalankan:
cd backend
npm start
```

Backend harus berjalan di `http://localhost:5000`

#### 2. Login sebagai Admin
Gunakan kredensial default:
- **Username:** `admin`
- **Password:** `password`

#### 3. Langkah-langkah Login
1. Klik tombol "Login Admin" di halaman yang error
2. Masukkan kredensial admin
3. Klik "Masuk"
4. Setelah berhasil login, coba tambah konten lagi

#### 4. Periksa Database
Pastikan tabel `users` memiliki user admin:
```sql
SELECT * FROM users WHERE role = 'admin';
```

#### 5. Periksa Console Browser
1. Buka Developer Tools (F12)
2. Lihat tab Console
3. Cari error atau log yang terkait dengan autentikasi

#### 6. Clear LocalStorage (Jika Perlu)
   ```javascript
// Di console browser:
   localStorage.clear();
// Kemudian refresh halaman dan login ulang
```

### Debugging

#### Periksa Token di Browser
1. Buka Developer Tools (F12)
2. Tab Application > Local Storage
3. Periksa apakah ada key `token` dan `user`

#### Periksa Network Request
1. Buka Developer Tools (F12)
2. Tab Network
3. Coba submit form
4. Periksa request ke endpoint yang sesuai
5. Pastikan header `Authorization: Bearer <token>` terkirim

### Halaman yang Memerlukan Autentikasi Admin

#### 1. Agenda
- **URL:** `/admin/agenda/tambah`
- **Error:** "Access denied. No token provided"
- **Solusi:** Login sebagai admin

#### 2. Berita
- **URL:** `/admin/tambah-berita`
- **Error:** "Access denied. No token provided"
- **Solusi:** Login sebagai admin

#### 3. Pengumuman
- **URL:** `/admin/tambah-pengumuman`
- **Error:** "Access denied. No token provided"
- **Solusi:** Login sebagai admin

### Kredensial Default
- **Username:** admin
- **Password:** password
- **Role:** admin

### Jika Masih Bermasalah
1. Restart backend server
2. Clear browser cache dan localStorage
3. Pastikan database MySQL berjalan
4. Periksa file `.env` di folder backend
5. Pastikan JWT_SECRET sudah diset di environment variables

### Testing Endpoints
Jalankan script test untuk memverifikasi endpoint:

```bash
# Test agenda endpoint
node test-agenda-endpoint.js

# Test berita endpoint
node test-berita-endpoint.js

# Test pengumuman endpoint
node test-pengumuman-endpoint.js
```

### Perbaikan yang Telah Diterapkan

#### 1. AgendaContext.jsx
- ✅ Menghapus penggunaan `apiCall` yang bermasalah
- ✅ Menggunakan `fetch` langsung dengan token
- ✅ Menambahkan debugging dan error handling

#### 2. BeritaContext.jsx
- ✅ Menghapus penggunaan `uploadFile` yang bermasalah
- ✅ Menggunakan `fetch` langsung dengan token
- ✅ Menambahkan debugging dan error handling

#### 3. PengumumanContext.jsx
- ✅ Menghapus penggunaan `uploadFile` yang bermasalah
- ✅ Menggunakan `fetch` langsung dengan token
- ✅ Menambahkan debugging dan error handling

#### 4. AddAgendaPage.jsx
- ✅ Menambahkan validasi autentikasi
- ✅ Menampilkan informasi kredensial admin
- ✅ Menambahkan tombol login admin

#### 5. AddBeritaPage.jsx
- ✅ Menambahkan validasi autentikasi
- ✅ Menampilkan informasi kredensial admin
- ✅ Menambahkan tombol login admin

#### 6. AddPengumumanPage.jsx
- ✅ Menambahkan validasi autentikasi
- ✅ Menampilkan informasi kredensial admin
- ✅ Menambahkan tombol login admin 