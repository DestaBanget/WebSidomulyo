# 🏠 WebSidomulyo - Website Desa Sidomulyo

Website resmi Desa Sidomulyo dengan fitur lengkap untuk pelayanan masyarakat.

## 🚀 Cara Menjalankan Aplikasi

### 📋 Prerequisites

Sebelum menjalankan aplikasi, pastikan Anda telah menginstall:

- **Node.js** (versi 16 atau lebih baru)
- **MySQL** (versi 8.0 atau lebih baru)
- **Git**

### 🔧 Setup Awal

1. **Clone repository**
   ```bash
   git clone https://github.com/DestaBanget/WebSidomulyo.git
   cd WebSidomulyo
   ```

2. **Install semua dependencies**
   ```bash
   npm run install:all
   ```

### 🗄️ Setup Database

#### **Cara 1: Otomatis (Recommended)**
```bash
# Windows
setup-database.bat

# Linux/Mac
mysql -u root -p < database_simple.sql
```

#### **Cara 2: Manual**
1. **Buka MySQL client atau phpMyAdmin**
2. **Jalankan file `database_simple.sql`** (versi yang sudah diperbaiki)
3. **Atau copy-paste isi file tersebut**

#### **Cara 3: Step by Step**
```sql
-- Buat database
CREATE DATABASE websidomulyo;
USE websidomulyo;

-- Jalankan semua CREATE TABLE dari database_simple.sql
-- File ini sudah diperbaiki dan kompatibel dengan semua versi MySQL
```

#### **Troubleshooting Database:**
- **Error "year is not valid"**: Gunakan `database_simple.sql` (sudah diperbaiki)
- **Error "Access denied"**: Pastikan user MySQL memiliki privilege CREATE
- **Error "Connection failed"**: Pastikan MySQL service berjalan

### ⚙️ Konfigurasi Environment

1. **Buat file `.env` di folder `backend`**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=websidomulyo
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   PORT=5000
   ```

2. **Buat file `.env` di folder `frontend` (opsional)**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=WebSidomulyo
   ```

### 🚀 Menjalankan Aplikasi

#### **Cara 1: Menjalankan Backend dan Frontend Bersamaan**
```bash
npm run dev
```
Ini akan menjalankan backend di port 5000 dan frontend di port 5173 secara bersamaan.

#### **Cara 2: Menjalankan Secara Terpisah**

**Backend:**
```bash
npm run dev:backend
# atau
cd backend
npm run dev
```

**Frontend:**
```bash
npm run dev:frontend
# atau
cd frontend
npm run dev
```

### 🌐 Akses Aplikasi

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **API Health Check:** http://localhost:5000/api/health

### 🔐 Login Default

- **Admin:**
  - Username: `admin`
  - Password: `password`

- **User (bisa register sendiri):**
  - Username: bebas
  - Password: `warga123`

## 📁 Struktur Project

```
WebSidomulyo/
├── backend/                 # Backend API (Node.js + Express)
│   ├── config.js           # Database configuration
│   ├── server.js           # Main server file
│   ├── middleware/         # Authentication & upload middleware
│   ├── routes/             # API routes
│   └── package.json
├── frontend/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── config/         # API configuration
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🛠️ Scripts yang Tersedia

- `npm run dev` - Jalankan backend dan frontend bersamaan
- `npm run dev:backend` - Jalankan backend saja
- `npm run dev:frontend` - Jalankan frontend saja
- `npm run install:all` - Install semua dependencies
- `npm run start` - Jalankan production build

## 🔧 Troubleshooting

### **Error "Missing script: dev"**
Pastikan Anda menjalankan script dari root directory, bukan dari subfolder.

### **Database Connection Error**
1. Pastikan MySQL berjalan
2. Periksa konfigurasi database di `backend/.env`
3. Pastikan database `websidomulyo` sudah dibuat

### **Port Already in Use**
Jika port 5000 atau 5173 sudah digunakan:
- Backend: ubah `PORT` di `backend/.env`
- Frontend: ubah port di `frontend/vite.config.js`

### **Module Not Found**
Jalankan `npm run install:all` untuk menginstall semua dependencies.

## 📞 Support

Jika mengalami masalah, silakan buat issue di repository GitHub atau hubungi tim development.

---

**WebSidomulyo** - Membangun Desa Digital untuk Masa Depan yang Lebih Baik! 🏘️✨ 