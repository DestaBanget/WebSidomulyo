# 🚨 Solusi Masalah "Failed to Fetch" - WebSidomulyo

Panduan lengkap untuk mengatasi error "Failed to fetch" saat login/register.

## 🔍 Diagnosa Masalah

### **Langkah 1: Cek Backend Status**
```bash
# Test apakah backend berjalan
curl http://localhost:5000/api/health

# Expected response:
{
  "status": "OK",
  "message": "WebSidomulyo API is running",
  "timestamp": "2024-01-18T...",
  "environment": "development"
}
```

### **Langkah 2: Cek Browser Console**
1. Buka Developer Tools (F12)
2. Buka tab Console
3. Coba login dan lihat error messages
4. Cek tab Network untuk melihat request/response

## 🛠️ Solusi Step by Step

### **Step 1: Setup Database**
```bash
# Jalankan script setup database
setup-database.bat

# Atau manual
mysql -u root -p < database_simple.sql
```

### **Step 2: Setup Environment**
```bash
# Copy environment files
copy backend\env.default backend\.env
echo VITE_API_BASE_URL=http://localhost:5000/api > frontend\.env
```

### **Step 3: Install Dependencies**
```bash
# Install semua dependencies
npm run install:all
```

### **Step 4: Start Backend**
```bash
# Jalankan backend
cd backend
npm run dev

# Atau dari root
npm run dev:backend
```

### **Step 5: Test Backend**
```bash
# Test API endpoints
curl http://localhost:5000/api/health
curl http://localhost:5000/

# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### **Step 6: Start Frontend**
```bash
# Di terminal baru
cd frontend
npm run dev

# Atau dari root
npm run dev:frontend
```

## 🔧 Troubleshooting Spesifik

### **1. Backend Tidak Berjalan**
```bash
# Cek apakah port 5000 digunakan
netstat -ano | findstr :5000

# Kill process jika perlu
taskkill /PID <process_id> /F

# Atau ubah port di backend/.env
PORT=5001
```

### **2. Database Connection Error**
```bash
# Cek MySQL status
mysql -u root -p -e "SELECT 1;"

# Test database connection
mysql -u root -p -e "USE websidomulyo; SELECT * FROM users;"
```

### **3. CORS Error**
- Backend sudah dikonfigurasi untuk mengizinkan semua origin di development
- Jika masih error, cek browser console untuk detail

### **4. Environment Variables**
```bash
# Pastikan file .env ada
ls backend/.env
ls frontend/.env

# Cek isi file
cat backend/.env
cat frontend/.env
```

## 🎯 Quick Fix Script

### **Script Otomatis (Windows)**
```bash
# Jalankan script ini untuk setup lengkap
start-dev.bat
```

### **Script Manual**
```bash
# 1. Setup database
setup-database.bat

# 2. Setup environment
copy backend\env.default backend\.env
echo VITE_API_BASE_URL=http://localhost:5000/api > frontend\.env

# 3. Install dependencies
npm run install:all

# 4. Start servers
npm run dev
```

## 📋 Checklist Lengkap

### **Prerequisites:**
- [ ] Node.js terinstall (v16+)
- [ ] MySQL terinstall dan berjalan
- [ ] Git terinstall

### **Database:**
- [ ] Database `websidomulyo` dibuat
- [ ] Tabel-tabel ada (users, berita, surat, dll)
- [ ] Admin user ada (admin/password)

### **Backend:**
- [ ] File `backend/.env` ada dan benar
- [ ] Dependencies terinstall (`npm install` di folder backend)
- [ ] Backend berjalan di port 5000
- [ ] API health check berhasil

### **Frontend:**
- [ ] File `frontend/.env` ada
- [ ] `VITE_API_BASE_URL` benar
- [ ] Dependencies terinstall
- [ ] Frontend berjalan di port 5173

### **Network:**
- [ ] Tidak ada firewall blocking
- [ ] Tidak ada antivirus blocking
- [ ] CORS tidak error
- [ ] Browser console bersih

## 🐛 Common Error Messages & Solutions

### **"Failed to fetch"**
- **Penyebab**: Backend tidak berjalan atau tidak bisa diakses
- **Solusi**: Jalankan backend dengan `npm run dev:backend`

### **"Network Error"**
- **Penyebab**: Port 5000 digunakan aplikasi lain
- **Solusi**: Kill process atau ubah port di backend/.env

### **"CORS policy blocked"**
- **Penyebab**: CORS configuration salah
- **Solusi**: Backend sudah dikonfigurasi, restart backend

### **"Cannot connect to database"**
- **Penyebab**: MySQL tidak berjalan atau kredensial salah
- **Solusi**: Start MySQL dan cek kredensial di backend/.env

### **"Token invalid"**
- **Penyebab**: JWT_SECRET tidak set
- **Solusi**: Pastikan JWT_SECRET ada di backend/.env

## 🔍 Debugging Advanced

### **Enable Detailed Logging**
```javascript
// Di browser console
localStorage.clear(); // Clear old data
console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
```

### **Test API Endpoints**
```bash
# Health check
curl http://localhost:5000/api/health

# Login test
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# Register test
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123","nama":"Test User","email":"test@test.com"}'
```

### **Check Database**
```bash
# Test connection
mysql -u root -p -e "USE websidomulyo; SHOW TABLES;"

# Check users
mysql -u root -p -e "USE websidomulyo; SELECT * FROM users;"
```

## 🚀 Final Test

Setelah semua setup selesai:

1. **Backend test:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Frontend test:**
   - Buka http://localhost:5173
   - Coba login dengan admin/password
   - Cek browser console untuk error

3. **Full integration test:**
   - Register user baru
   - Login dengan user baru
   - Test fitur lainnya

## 📞 Jika Masih Bermasalah

1. **Restart semua services:**
   ```bash
   taskkill /F /IM node.exe
   # Restart MySQL
   # Restart backend: npm run dev:backend
   # Restart frontend: npm run dev:frontend
   ```

2. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R
   - Clear localStorage: localStorage.clear()
   - Disable browser extensions

3. **Check system resources:**
   - Memory usage
   - CPU usage
   - Disk space

---

**Remember:** Most "failed to fetch" errors are caused by backend not running or database not set up properly! 🔧 