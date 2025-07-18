# 🚀 Quick Start Guide - WebSidomulyo

Panduan cepat untuk menjalankan aplikasi WebSidomulyo dalam 5 menit!

## ⚡ Langkah Cepat

### 1. **Setup Otomatis (Recommended)**
```bash
# Windows
setup.bat

# Linux/Mac
chmod +x setup.sh
./setup.sh
```

### 2. **Setup Manual**

#### Install Dependencies
```bash
npm run install:all
```

#### Setup Database
1. Buka MySQL client atau phpMyAdmin
2. Jalankan file `database_setup.sql`
3. Atau copy-paste isi file tersebut

#### Setup Environment
1. Copy `backend/env.example` ke `backend/.env`
2. Edit `backend/.env` dengan kredensial database Anda:
   ```env
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_secret_key
   ```

### 3. **Jalankan Aplikasi**
```bash
npm run dev
```

### 4. **Akses Aplikasi**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

### 5. **Login Default**
- **Admin:** username=`admin`, password=`password`

## 🔧 Troubleshooting

### **Error "Missing script: dev"**
```bash
# Pastikan Anda di root directory
cd WebSidomulyo
npm run dev
```

### **Database Connection Error**
1. Pastikan MySQL berjalan
2. Periksa kredensial di `backend/.env`
3. Pastikan database `websidomulyo` sudah dibuat

### **Port Already in Use**
```bash
# Cek port yang digunakan
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Kill process jika perlu
taskkill /PID <process_id> /F
```

### **Module Not Found**
```bash
# Reinstall dependencies
npm run install:all
```

## 📋 Checklist Setup

- [ ] Node.js terinstall (v16+)
- [ ] MySQL terinstall dan berjalan
- [ ] Dependencies terinstall (`npm run install:all`)
- [ ] Database dibuat dan tabel-tabel ada
- [ ] File `.env` dikonfigurasi
- [ ] Aplikasi berjalan (`npm run dev`)
- [ ] Bisa akses frontend di http://localhost:5173
- [ ] Bisa login dengan admin

## 🆘 Butuh Bantuan?

1. **Baca README.md** untuk panduan lengkap
2. **Cek file logs** di console
3. **Restart aplikasi** jika ada error
4. **Pastikan semua prerequisites** terinstall

---

**Happy Coding! 🎉** 