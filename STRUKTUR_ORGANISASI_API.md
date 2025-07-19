# API Struktur Organisasi - WebSidomulyo

## Overview
API untuk mengelola data struktur organisasi desa, termasuk kepala desa, sekretaris, kaur, kasi, dan kasun.

## Database Schema

### Tabel: struktur_organisasi
```sql
CREATE TABLE struktur_organisasi (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(100) NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  foto VARCHAR(255),
  tipe ENUM('kepala_desa', 'sekretaris', 'kaur', 'kasi', 'kasun') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Endpoints

### 1. GET /api/struktur
**Public endpoint** - Mengambil semua data struktur organisasi

**Response:**
```json
{
  "struktur": [
    {
      "id": 1,
      "nama": "Aghis Pratama, S.Pd",
      "jabatan": "Kepala Desa",
      "foto": "/uploads/foto-123.jpg",
      "tipe": "kepala_desa",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. GET /api/struktur/tipe/:tipe
**Public endpoint** - Mengambil struktur organisasi berdasarkan tipe

**Parameters:**
- `tipe`: kepala_desa, sekretaris, kaur, kasi, kasun

**Response:**
```json
{
  "struktur": [
    {
      "id": 1,
      "nama": "Aghis Pratama, S.Pd",
      "jabatan": "Kepala Desa",
      "foto": "/uploads/foto-123.jpg",
      "tipe": "kepala_desa"
    }
  ]
}
```

### 3. GET /api/struktur/:id
**Public endpoint** - Mengambil struktur organisasi berdasarkan ID

**Response:**
```json
{
  "struktur": {
    "id": 1,
    "nama": "Aghis Pratama, S.Pd",
    "jabatan": "Kepala Desa",
    "foto": "/uploads/foto-123.jpg",
    "tipe": "kepala_desa"
  }
}
```

### 4. POST /api/struktur
**Admin only** - Menambah struktur organisasi baru

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "nama": "Nama Lengkap",
  "jabatan": "Jabatan",
  "tipe": "kepala_desa"
}
```

**Response:**
```json
{
  "message": "Struktur organisasi berhasil ditambahkan",
  "struktur": {
    "id": 1,
    "nama": "Nama Lengkap",
    "jabatan": "Jabatan",
    "foto": null,
    "tipe": "kepala_desa"
  }
}
```

### 5. PUT /api/struktur/:id
**Admin only** - Mengupdate struktur organisasi

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "nama": "Nama Lengkap Updated",
  "jabatan": "Jabatan Updated",
  "tipe": "sekretaris"
}
```

**Response:**
```json
{
  "message": "Struktur organisasi berhasil diupdate",
  "struktur": {
    "id": 1,
    "nama": "Nama Lengkap Updated",
    "jabatan": "Jabatan Updated",
    "foto": "/uploads/foto-123.jpg",
    "tipe": "sekretaris"
  }
}
```

### 6. DELETE /api/struktur/:id
**Admin only** - Menghapus struktur organisasi

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Struktur organisasi berhasil dihapus"
}
```

### 7. GET /api/struktur/overview
**Admin only** - Mengambil overview statistik struktur organisasi

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "total": 11,
  "kepala_desa": 1,
  "sekretaris": 1,
  "kaur": 2,
  "kasi": 2,
  "kasun": 5
}
```

## Upload Foto

Untuk upload foto, gunakan `multipart/form-data` dengan field `img`:

```javascript
const formData = new FormData();
formData.append('nama', 'Nama Lengkap');
formData.append('jabatan', 'Jabatan');
formData.append('tipe', 'kepala_desa');
formData.append('img', fileInput.files[0]);

fetch('/api/struktur', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

## Validasi

### Tipe yang Diizinkan:
- `kepala_desa` - Kepala Desa
- `sekretaris` - Sekretaris Desa
- `kaur` - Kepala Urusan
- `kasi` - Kepala Seksi
- `kasun` - Kepala Dusun

### Validasi Input:
- `nama`: Wajib diisi, string
- `jabatan`: Wajib diisi, string
- `tipe`: Wajib diisi, harus salah satu dari enum yang diizinkan
- `foto`: Optional, file gambar (JPG, JPEG, PNG), maksimal 5MB

## Error Handling

### 400 Bad Request
```json
{
  "error": "Nama wajib diisi"
}
```

### 401 Unauthorized
```json
{
  "error": "Token tidak valid atau expired"
}
```

### 404 Not Found
```json
{
  "error": "Struktur organisasi tidak ditemukan"
}
```

### 409 Conflict
```json
{
  "error": "Struktur dengan tipe dan jabatan yang sama sudah ada"
}
```

### 500 Internal Server Error
```json
{
  "error": "Terjadi kesalahan server"
}
```

## Setup Database

Jalankan file SQL berikut untuk setup database:

```sql
-- Buat tabel struktur_organisasi
CREATE TABLE IF NOT EXISTS struktur_organisasi (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(100) NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  foto VARCHAR(255),
  tipe ENUM('kepala_desa', 'sekretaris', 'kaur', 'kasi', 'kasun') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tambahkan data default
INSERT INTO struktur_organisasi (nama, jabatan, tipe) VALUES
('Aghis Pratama, S.Pd', 'Kepala Desa', 'kepala_desa'),
('Siti Nurhaliza', 'Sekretaris Desa', 'sekretaris'),
('Budi Santoso', 'Kaur Keuangan', 'kaur'),
('Dewi Sartika', 'Kaur Umum', 'kaur'),
('Ahmad Hidayat', 'Kasi Pemerintahan', 'kasi'),
('Rina Marlina', 'Kasi Kesejahteraan Rakyat', 'kasi'),
('Kasun Bareng', 'Kepala Dusun Bareng', 'kasun'),
('Kasun Tebelo', 'Kepala Dusun Tebelo', 'kasun'),
('Kasun Mangunrejo', 'Kepala Dusun Mangunrejo', 'kasun'),
('Kasun Sumberkrecek', 'Kepala Dusun Sumberkrecek', 'kasun'),
('Kasun Krajan', 'Kepala Dusun Krajan', 'kasun');
```

## Testing

Jalankan script test untuk memverifikasi semua endpoint:

```bash
node test-struktur-endpoints.js
```

## Frontend Integration

Untuk mengintegrasikan dengan frontend, gunakan contoh berikut:

```javascript
// Fetch semua struktur
const response = await fetch('/api/struktur');
const data = await response.json();

// Update struktur (admin only)
const updateResponse = await fetch(`/api/struktur/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    nama: 'Nama Baru',
    jabatan: 'Jabatan Baru',
    tipe: 'kepala_desa'
  })
});
``` 