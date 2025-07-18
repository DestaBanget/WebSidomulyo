# 🚀 Panduan Integrasi Frontend-Backend WebSidomulyo

## 📋 Ringkasan Integrasi

Frontend dan backend WebSidomulyo telah berhasil diintegrasikan dengan fitur-fitur berikut:

### ✅ Fitur yang Sudah Terintegrasi

1. **🔐 Sistem Autentikasi**
   - Login/Register dengan JWT Token
   - Verifikasi token otomatis
   - Role-based access control (Admin/User)
   - Logout dengan cleanup token

2. **📰 Manajemen Berita**
   - CRUD operasi berita
   - Upload gambar berita
   - Pagination dan filtering
   - Kategori berita

3. **📄 Sistem Surat Online**
   - Form pengajuan surat dengan validasi
   - Upload dokumen pendukung
   - Tracking status surat
   - Admin panel untuk manajemen surat

4. **📢 Sistem Pengaduan**
   - Form pengaduan masyarakat
   - Upload lampiran
   - Admin panel untuk monitoring

5. **🔧 Konfigurasi API Terpusat**
   - Environment variables
   - Helper functions untuk API calls
   - Error handling terstandarisasi

## 🛠️ Struktur Integrasi

### Frontend (`/frontend`)

```
src/
├── config/
│   └── api.js                 # Konfigurasi API terpusat
├── contexts/
│   ├── AuthContext.jsx        # State management autentikasi
│   └── BeritaContext.jsx      # State management berita
├── components/
│   ├── LoginAdmin.jsx         # Modal login admin
│   ├── UserAuth.jsx           # Modal login/register user
│   ├── FormSurat.jsx          # Form pengajuan surat
│   └── PengaduanMasyarakat.jsx # Form pengaduan
└── pages/
    ├── AddBeritaPage.jsx      # Halaman tambah berita
    └── AdminSuratMasukPage.jsx # Halaman admin surat
```

### Backend (`/backend`)

```
├── server.js                  # Entry point server
├── config.js                  # Konfigurasi database
├── middleware/
│   ├── auth.js               # JWT authentication
│   └── upload.js             # File upload handling
└── routes/
    ├── auth.js               # Authentication routes
    ├── berita.js             # Berita management
    ├── surat.js              # Surat management
    └── pengaduan.js          # Pengaduan management
```

## 🔧 Cara Menjalankan

### 1. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder backend:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=websido123!
DB_NAME=websidomulyo
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Jalankan server:
```bash
npm run dev
```

### 2. Setup Frontend

```bash
cd frontend
npm install
```

Jalankan development server:
```bash
npm run dev
```

## 🔌 Endpoint API

### Authentication
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/change-password` - Ganti password

### Berita
- `GET /api/berita` - Get semua berita (public)
- `GET /api/berita/:id` - Get berita by ID
- `POST /api/berita` - Tambah berita (admin only)
- `PUT /api/berita/:id` - Update berita (admin only)
- `DELETE /api/berita/:id` - Hapus berita (admin only)

### Surat
- `GET /api/surat` - Get semua surat (admin only)
- `GET /api/surat/my-surat` - Get surat user (user only)
- `GET /api/surat/:id` - Get surat by ID
- `POST /api/surat` - Ajukan surat baru (user only)
- `PUT /api/surat/:id/status` - Update status surat (admin only)

### Pengaduan
- `GET /api/pengaduan` - Get semua pengaduan (admin only)
- `GET /api/pengaduan/:id` - Get pengaduan by ID (admin only)
- `POST /api/pengaduan` - Kirim pengaduan (public)
- `PUT /api/pengaduan/:id/status` - Update status pengaduan (admin only)

## 🔐 Sistem Autentikasi

### JWT Token Flow
1. User login/register → Server generate JWT token
2. Token disimpan di localStorage
3. Setiap API call include token di header Authorization
4. Server verify token untuk protected routes

### Role-based Access
- **Admin**: Akses penuh ke semua fitur
- **User**: Akses terbatas (ajukan surat, lihat berita)

## 📁 File Upload

### Konfigurasi
- Backend menggunakan Multer untuk handle file upload
- File disimpan di `/public/uploads/`
- Support format: JPG, PNG, PDF

### Implementasi
```javascript
// Frontend
const formData = new FormData();
formData.append('file', file);
formData.append('data', JSON.stringify(data));

// Backend
const upload = multer({ dest: 'public/uploads/' });
```

## 🎯 Fitur Utama

### 1. Form Surat Online
- ✅ Validasi form lengkap
- ✅ Upload dokumen pendukung
- ✅ Real-time status tracking
- ✅ Notifikasi sukses/error

### 2. Sistem Berita
- ✅ CRUD operasi lengkap
- ✅ Upload gambar berita
- ✅ Kategori dan filtering
- ✅ Pagination

### 3. Pengaduan Masyarakat
- ✅ Form pengaduan lengkap
- ✅ Upload lampiran
- ✅ Admin monitoring
- ✅ Status tracking

### 4. Admin Panel
- ✅ Dashboard surat masuk
- ✅ Update status surat
- ✅ Manajemen berita
- ✅ Monitoring pengaduan

## 🚨 Error Handling

### Frontend
- Loading states untuk semua operasi
- Error messages yang informatif
- Fallback ke data dummy jika API gagal
- Toast notifications untuk feedback

### Backend
- Validation menggunakan express-validator
- Proper HTTP status codes
- Detailed error messages
- Database error handling

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Password hashing dengan bcrypt
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation
- ✅ File upload security

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tailwind CSS styling
- ✅ Responsive components
- ✅ Touch-friendly interfaces

## 🚀 Deployment Ready

### Environment Variables
```env
# Backend
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret

# Frontend
VITE_API_BASE_URL=your_api_url
```

### Build Commands
```bash
# Backend
npm run build

# Frontend
npm run build
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  no_hp VARCHAR(20),
  role ENUM('admin', 'warga') DEFAULT 'warga',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Berita Table
```sql
CREATE TABLE berita (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  kategori VARCHAR(50) NOT NULL,
  img VARCHAR(255),
  tanggal DATE NOT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

### Surat Table
```sql
CREATE TABLE surat (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  nama VARCHAR(100) NOT NULL,
  nik VARCHAR(16) NOT NULL,
  jenis_kelamin ENUM('Laki-laki', 'Perempuan') NOT NULL,
  tempat_lahir VARCHAR(100) NOT NULL,
  tanggal_lahir DATE NOT NULL,
  pekerjaan VARCHAR(100),
  kewarganegaraan VARCHAR(50),
  agama VARCHAR(50) NOT NULL,
  no_hp VARCHAR(20) NOT NULL,
  alamat_ktp TEXT NOT NULL,
  alamat_sekarang TEXT NOT NULL,
  jenis_surat VARCHAR(100) NOT NULL,
  status ENUM('Menunggu', 'Diproses', 'Selesai') DEFAULT 'Menunggu',
  tanggal_pengajuan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🎉 Kesimpulan

Integrasi frontend-backend WebSidomulyo telah berhasil dilakukan dengan fitur-fitur lengkap:

- ✅ **Autentikasi terintegrasi** dengan JWT
- ✅ **CRUD operasi** untuk semua modul
- ✅ **File upload** untuk dokumen dan gambar
- ✅ **Real-time status tracking**
- ✅ **Admin panel** yang lengkap
- ✅ **Error handling** yang robust
- ✅ **Security features** yang komprehensif
- ✅ **Responsive design** untuk semua device

Sistem siap untuk deployment dan penggunaan produksi! 🚀 