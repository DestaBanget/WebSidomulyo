# API Tentang - WebSidomulyo

API untuk mengelola konten bagian "Tentang" di website Desa Sidomulyo. API ini memungkinkan admin untuk mengedit dan menyimpan berbagai informasi tentang desa.

## Base URL
```
http://localhost:5000/api/tentang
```

## Endpoints

### 1. Get Semua Data Tentang (Public)
**GET** `/api/tentang`

Mengambil semua data tentang desa.

**Response:**
```json
{
  "tentang": {
    "selayangPandang": {
      "id": 1,
      "judul": "Selayang Pandang",
      "konten": "Desa Sidomulyo adalah desa yang...",
      "gambar": null,
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "visiMisi": {
      "id": 2,
      "judul": "Visi & Misi",
      "visi": "Terwujudnya Desa Sidomulyo yang...",
      "misi": ["Misi 1", "Misi 2", "..."],
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "sejarah": { ... },
    "geografis": { ... },
    "demografis": { ... }
  }
}
```

### 2. Get Data Berdasarkan Section (Public)
**GET** `/api/tentang/:section`

Mengambil data berdasarkan section tertentu.

**Parameters:**
- `section` (string): Nama section (selayangPandang, visiMisi, sejarah, geografis, demografis)

**Response:**
```json
{
  "tentang": {
    "id": 1,
    "judul": "Selayang Pandang",
    "konten": "Desa Sidomulyo adalah desa yang...",
    "gambar": null,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Update Selayang Pandang (Admin Only)
**PUT** `/api/tentang/selayang-pandang`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "judul": "Selayang Pandang Desa Sidomulyo",
  "konten": "Desa Sidomulyo adalah desa yang terletak di...",
  "gambar": "https://example.com/gambar.jpg"
}
```

**Response:**
```json
{
  "message": "Selayang pandang berhasil diupdate",
  "tentang": {
    "id": 1,
    "judul": "Selayang Pandang Desa Sidomulyo",
    "konten": "Desa Sidomulyo adalah desa yang terletak di...",
    "gambar": "https://example.com/gambar.jpg",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 4. Update Visi & Misi (Admin Only)
**PUT** `/api/tentang/visi-misi`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "judul": "Visi & Misi Desa Sidomulyo",
  "visi": "Terwujudnya Desa Sidomulyo yang maju, mandiri, dan sejahtera",
  "misi": [
    "Meningkatkan kualitas pendidikan dan kesehatan masyarakat",
    "Mengembangkan perekonomian desa berbasis potensi lokal",
    "Membangun infrastruktur desa yang berkelanjutan"
  ]
}
```

**Response:**
```json
{
  "message": "Visi & Misi berhasil diupdate",
  "tentang": {
    "id": 2,
    "judul": "Visi & Misi Desa Sidomulyo",
    "visi": "Terwujudnya Desa Sidomulyo yang maju, mandiri, dan sejahtera",
    "misi": ["Misi 1", "Misi 2", "Misi 3"],
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 5. Update Sejarah (Admin Only)
**PUT** `/api/tentang/sejarah`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "judul": "Sejarah Desa Sidomulyo",
  "konten": "Sejarah Desa Sidomulyo dimulai pada tahun 1950...",
  "gambar": "https://example.com/sejarah.jpg"
}
```

### 6. Update Kondisi Geografis (Admin Only)
**PUT** `/api/tentang/geografis`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "judul": "Kondisi Geografis Desa Sidomulyo",
  "konten": "Desa Sidomulyo memiliki topografi yang bervariasi...",
  "batasUtara": "Desa Utara",
  "batasSelatan": "Desa Selatan",
  "batasBarat": "Desa Barat",
  "batasTimur": "Desa Timur",
  "luasWilayah": "500 hektar",
  "jumlahPenduduk": "2500 jiwa",
  "gambar": "https://example.com/geografis.jpg"
}
```

### 7. Update Kondisi Demografis (Admin Only)
**PUT** `/api/tentang/demografis`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "judul": "Kondisi Demografis Desa Sidomulyo",
  "konten": "Masyarakat Desa Sidomulyo terdiri dari berbagai suku...",
  "jumlahKK": "650 KK",
  "jumlahLakiLaki": "1200 jiwa",
  "jumlahPerempuan": "1300 jiwa",
  "agama": {
    "Islam": "85%",
    "Kristen": "10%",
    "Katolik": "3%",
    "Hindu": "1%",
    "Buddha": "1%"
  },
  "pendidikan": {
    "Tidak Sekolah": "5%",
    "SD": "30%",
    "SMP": "25%",
    "SMA": "25%",
    "D3/S1": "13%",
    "S2/S3": "2%"
  }
}
```

### 8. Get Overview (Admin Only)
**GET** `/api/tentang/admin/overview`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalSections": 5,
  "sections": [
    {
      "section": "selayangPandang",
      "judul": "Selayang Pandang",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    },
    {
      "section": "visiMisi",
      "judul": "Visi & Misi",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Judul wajib diisi",
      "path": "judul",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Token tidak valid atau expired"
}
```

### 404 Not Found
```json
{
  "error": "Section tidak ditemukan"
}
```

### 500 Internal Server Error
```json
{
  "error": "Terjadi kesalahan server"
}
```

## Data Structure

### Selayang Pandang
```json
{
  "id": 1,
  "judul": "string",
  "konten": "string",
  "gambar": "string|null",
  "updatedAt": "ISO date string"
}
```

### Visi & Misi
```json
{
  "id": 2,
  "judul": "string",
  "visi": "string",
  "misi": ["string"],
  "updatedAt": "ISO date string"
}
```

### Sejarah
```json
{
  "id": 3,
  "judul": "string",
  "konten": "string",
  "gambar": "string|null",
  "updatedAt": "ISO date string"
}
```

### Kondisi Geografis
```json
{
  "id": 4,
  "judul": "string",
  "konten": "string",
  "batasUtara": "string",
  "batasSelatan": "string",
  "batasBarat": "string",
  "batasTimur": "string",
  "luasWilayah": "string",
  "jumlahPenduduk": "string",
  "gambar": "string|null",
  "updatedAt": "ISO date string"
}
```

### Kondisi Demografis
```json
{
  "id": 5,
  "judul": "string",
  "konten": "string",
  "jumlahKK": "string",
  "jumlahLakiLaki": "string",
  "jumlahPerempuan": "string",
  "agama": {
    "Islam": "string",
    "Kristen": "string",
    "Katolik": "string",
    "Hindu": "string",
    "Buddha": "string"
  },
  "pendidikan": {
    "Tidak Sekolah": "string",
    "SD": "string",
    "SMP": "string",
    "SMA": "string",
    "D3/S1": "string",
    "S2/S3": "string"
  },
  "updatedAt": "ISO date string"
}
```

## Testing

Untuk menguji API, gunakan file `test-tentang-endpoint.js`:

```bash
node test-tentang-endpoint.js
```

Pastikan server backend sudah berjalan di port 5000 dan admin sudah terdaftar dengan email `admin@sidomulyo.com` dan password `admin123`.

## File Storage

Data tentang disimpan dalam file JSON di `backend/tentang.json`. File ini akan dibuat otomatis dengan data default jika belum ada.

## Security

- Semua endpoint update memerlukan autentikasi admin
- Validasi input menggunakan express-validator
- Rate limiting diterapkan untuk mencegah abuse
- CORS dikonfigurasi untuk keamanan 