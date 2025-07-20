# Perbaikan Masalah Update Profil

## Masalah yang Ditemukan

1. **Validasi nomor telepon terlalu ketat**: Regex `/^(\+62|62|0)8[1-9][0-9]{6,9}$/` hanya menerima nomor yang dimulai dengan 8 dan digit kedua 1-9, padahal banyak nomor Indonesia yang dimulai dengan 08 dan digit kedua bisa 0-9.

2. **Komponen EditProfile tidak memiliki fitur upload foto**: Komponen EditProfile hanya mengupdate nama, email, dan no_hp, tapi tidak ada field untuk upload foto profil.

3. **ProfilePage memiliki fitur upload foto tapi tidak terintegrasi dengan baik**: ProfilePage memiliki fitur upload foto tapi ada masalah dengan validasi atau pengiriman data.

## Perbaikan yang Dilakukan

### 1. Perbaikan Validasi Nomor Telepon (Backend)

**File**: `backend/routes/auth.js`

**Sebelum**:
```javascript
const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
```

**Sesudah**:
```javascript
const phoneRegex = /^(\+62|62|0)?8[0-9]{8,11}$/;
```

**Perubahan**:
- Menghapus batasan digit kedua harus 1-9, sekarang bisa 0-9
- Menambah `?` setelah prefix untuk membuat prefix opsional
- Mengubah range digit dari 6-9 menjadi 8-11 untuk akurasi yang lebih baik
- Menambah pesan error yang lebih informatif

### 2. Penambahan Fitur Upload Foto di EditProfile (Frontend)

**File**: `frontend/src/components/EditProfile.jsx`

**Fitur yang ditambahkan**:
- State untuk `profileImage` dan `imagePreview`
- Fungsi `handleImageChange()` untuk menangani upload file
- Fungsi `handleRemoveImage()` untuk menghapus foto
- UI untuk upload dan preview foto profil
- Validasi file type dan size (maksimal 5MB)
- Integrasi dengan API backend

**Kode yang ditambahkan**:
```javascript
const [profileImage, setProfileImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar!');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setProfileImage(e.target.result);
    };
    reader.readAsDataURL(file);
    setError('');
  }
};
```

### 3. Perbaikan Pengiriman Data

**Sebelum**:
```javascript
body: JSON.stringify(formData)
```

**Sesudah**:
```javascript
body: JSON.stringify({
  ...formData,
  profile_image: profileImage
})
```

## Format Nomor Telepon yang Diterima

Sekarang sistem menerima format nomor telepon Indonesia berikut:
- `081234567890` (format standar)
- `6281234567890` (format internasional tanpa +)
- `+6281234567890` (format internasional dengan +)
- `81234567890` (format tanpa prefix)

## Format Foto Profil yang Diterima

Sistem menerima foto profil dalam format:
- URL gambar (http/https)
- Data URL (base64)
- Blob URL
- File upload (JPG, PNG, GIF, maksimal 5MB)

## Testing

Untuk memverifikasi perbaikan, gunakan script test:

```bash
node test-profile-update-fix.js
```

Script ini akan menguji:
1. Update profil dengan nomor telepon valid
2. Berbagai format nomor telepon
3. Nomor telepon tidak valid
4. Nomor telepon kosong
5. Upload foto profil

## Cara Penggunaan

### Update Profil di EditProfile Component

1. Buka halaman profil
2. Klik tombol "Edit" pada komponen EditProfile
3. Isi form dengan data yang ingin diupdate
4. Upload foto profil (opsional)
5. Klik "Simpan Perubahan"

### Update Profil di ProfilePage

1. Buka halaman profil
2. Klik tombol "Edit" pada informasi akun
3. Isi form dengan data yang ingin diupdate
4. Upload foto profil (opsional)
5. Klik "Simpan Perubahan"

## Catatan Penting

1. **Database**: Pastikan kolom `profile_image` sudah ada di tabel `users`
2. **Backend**: Pastikan backend berjalan di `http://localhost:5000`
3. **File Upload**: Foto profil disimpan sebagai data URL (base64) di database
4. **Validasi**: Sistem akan memvalidasi format nomor telepon dan ukuran file

## Troubleshooting

### Jika nomor telepon masih ditolak:
- Pastikan format sesuai dengan yang diterima
- Cek apakah ada spasi atau karakter khusus
- Gunakan format: `081234567890`

### Jika foto tidak tersimpan:
- Pastikan ukuran file tidak lebih dari 5MB
- Pastikan format file adalah gambar (JPG, PNG, GIF)
- Cek console browser untuk error

### Jika backend error:
- Pastikan database connection berfungsi
- Cek log server untuk detail error
- Pastikan semua dependency terinstall 