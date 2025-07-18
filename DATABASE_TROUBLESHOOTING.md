# 🗄️ Database Troubleshooting - WebSidomulyo

Panduan lengkap untuk mengatasi masalah database MySQL.

## 🚨 Error "Unknown column 'nilai' in 'field list'"

### **Penyebab:**
- Tabel `statistik` belum dibuat dengan benar
- Struktur tabel tidak sesuai dengan query INSERT
- Database setup tidak lengkap

### **Solusi:**

#### **1. Reset Database (Recommended)**
```bash
# Jalankan script reset database
reset-database.bat
```

#### **2. Manual Fix**
```sql
-- Cek struktur tabel
DESCRIBE statistik;

-- Jika tabel tidak ada atau salah, drop dan buat ulang
DROP TABLE IF EXISTS statistik;

CREATE TABLE statistik (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kategori VARCHAR(50) NOT NULL,
  nilai INT NOT NULL,
  satuan VARCHAR(20),
  deskripsi TEXT,
  tahun INT DEFAULT 2024,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO statistik (kategori, nilai, satuan, deskripsi, tahun) VALUES
('Total Penduduk', 2350, 'orang', 'Jumlah penduduk desa', 2024),
('Jumlah Keluarga', 670, 'KK', 'Jumlah kepala keluarga', 2024),
('Luas Wilayah', 1250, 'hektar', 'Luas wilayah desa', 2024),
('Jumlah RT', 15, 'RT', 'Jumlah Rukun Tetangga', 2024);
```

## 🔍 Diagnosa Masalah Database

### **1. Cek Koneksi MySQL**
```bash
# Test koneksi
mysql -u root -p -e "SELECT 1;"

# Cek versi MySQL
mysql --version
```

### **2. Cek Database Exists**
```sql
SHOW DATABASES;
USE websidomulyo;
SHOW TABLES;
```

### **3. Cek Struktur Tabel**
```sql
-- Cek semua tabel
DESCRIBE users;
DESCRIBE berita;
DESCRIBE surat;
DESCRIBE pengaduan;
DESCRIBE statistik;
DESCRIBE pariwisata;
DESCRIBE lembaga;
```

### **4. Cek Data**
```sql
-- Cek jumlah data di setiap tabel
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'berita', COUNT(*) FROM berita
UNION ALL
SELECT 'surat', COUNT(*) FROM surat
UNION ALL
SELECT 'pengaduan', COUNT(*) FROM pengaduan
UNION ALL
SELECT 'statistik', COUNT(*) FROM statistik
UNION ALL
SELECT 'pariwisata', COUNT(*) FROM pariwisata
UNION ALL
SELECT 'lembaga', COUNT(*) FROM lembaga;
```

## 🛠️ Solusi Step by Step

### **Step 1: Backup Data (Jika Ada)**
```bash
# Backup database jika ada data penting
mysqldump -u root -p websidomulyo > backup_websidomulyo.sql
```

### **Step 2: Drop Database**
```sql
DROP DATABASE IF EXISTS websidomulyo;
```

### **Step 3: Create Fresh Database**
```bash
# Gunakan file yang sudah diperbaiki
mysql -u root -p < database_fixed.sql
```

### **Step 4: Verify Setup**
```sql
USE websidomulyo;
SHOW TABLES;
SELECT COUNT(*) FROM users; -- Should be 1 (admin)
SELECT COUNT(*) FROM statistik; -- Should be 4
```

## 📋 File Database yang Tersedia

### **1. `database_fixed.sql` (RECOMMENDED)**
- ✅ **Sudah diperbaiki** - Tidak ada syntax error
- ✅ **INSERT IGNORE** - Aman dijalankan berulang
- ✅ **CREATE INDEX IF NOT EXISTS** - Tidak error jika index sudah ada
- ✅ **Kompatibel** - Bekerja di semua versi MySQL

### **2. `database_simple.sql`**
- ✅ **Sederhana** - Mudah dipahami
- ✅ **Kompatibel** - Bekerja di semua versi MySQL
- ❌ **Basic INSERT** - Bisa error jika dijalankan berulang

### **3. `database_setup.sql`**
- ✅ **Lengkap** - Views, Stored Procedures, Triggers
- ❌ **Syntax Error** - `YEAR(CURRENT_DATE)` bermasalah
- ❌ **ON DUPLICATE KEY** - Bisa error jika struktur tidak sesuai

## 🔧 Script Otomatis

### **Setup Database Baru**
```bash
# Windows
setup-database.bat

# Linux/Mac
mysql -u root -p < database_fixed.sql
```

### **Reset Database (Hapus & Buat Ulang)**
```bash
# Windows
reset-database.bat

# Linux/Mac
mysql -u root -p -e "DROP DATABASE IF EXISTS websidomulyo;"
mysql -u root -p < database_fixed.sql
```

### **Verify Database**
```bash
# Test koneksi dan data
mysql -u root -p -e "
USE websidomulyo; 
SHOW TABLES; 
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'statistik', COUNT(*) FROM statistik;
"
```

## 🐛 Common Database Errors

### **Error 1054: Unknown column**
- **Penyebab**: Tabel belum dibuat atau struktur salah
- **Solusi**: Gunakan `database_fixed.sql`

### **Error 1049: Unknown database**
- **Penyebab**: Database belum dibuat
- **Solusi**: Jalankan `CREATE DATABASE websidomulyo;`

### **Error 1045: Access denied**
- **Penyebab**: Kredensial MySQL salah
- **Solusi**: Cek username/password MySQL

### **Error 2002: Can't connect to MySQL**
- **Penyebab**: MySQL service tidak berjalan
- **Solusi**: Start MySQL service

### **Error 1062: Duplicate entry**
- **Penyebab**: Data sudah ada
- **Solusi**: Gunakan `INSERT IGNORE` atau `ON DUPLICATE KEY UPDATE`

## 📊 Database Schema Overview

```sql
-- Tabel utama
users (id, username, password_hash, nama, email, no_hp, role, created_at)
berita (id, title, content, kategori, img, tanggal, created_by, created_at)
surat (id, user_id, nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, 
       pekerjaan, kewarganegaraan, agama, no_hp, alamat_ktp, alamat_sekarang, 
       jenis_surat, status, tanggal_pengajuan)
pengaduan (id, nama, email, no_hp, alamat, judul, uraian, lampiran, status, created_at)
statistik (id, kategori, nilai, satuan, deskripsi, tahun, created_at)
pariwisata (id, nama, deskripsi, lokasi, img, kategori, created_at)
lembaga (id, nama, deskripsi, ketua, no_hp, alamat, img, created_at)

-- Tabel pendukung
lampiran_surat (id, surat_id, nama_file, url_file, jenis_persyaratan, created_at)
```

## 🎯 Quick Fix Commands

### **Reset Database Lengkap**
```bash
# 1. Stop aplikasi
taskkill /F /IM node.exe

# 2. Reset database
reset-database.bat

# 3. Start aplikasi
npm run dev
```

### **Manual Fix**
```sql
-- 1. Drop database
DROP DATABASE IF EXISTS websidomulyo;

-- 2. Create fresh database
mysql -u root -p < database_fixed.sql

-- 3. Verify
USE websidomulyo;
SHOW TABLES;
SELECT COUNT(*) FROM users;
```

## 📞 Getting Help

Jika masalah masih berlanjut:

1. **Cek MySQL logs** untuk error detail
2. **Test koneksi** dengan `mysql -u root -p`
3. **Verify schema** dengan `DESCRIBE table_name`
4. **Check privileges** dengan `SHOW GRANTS;`
5. **Restart MySQL service** jika perlu

---

**Remember:** Always use `database_fixed.sql` for the most reliable setup! 🔧 