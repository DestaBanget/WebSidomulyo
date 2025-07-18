# 🔧 Troubleshooting Guide - WebSidomulyo

Panduan lengkap untuk mengatasi masalah umum dalam aplikasi WebSidomulyo.

## 🚨 Masalah "Failed to Fetch"

### **Gejala:**
- Error "Failed to fetch" saat login/register
- Tidak bisa terhubung ke backend API
- Network error di browser console

### **Penyebab & Solusi:**

#### **1. Backend Tidak Berjalan**
```bash
# Cek apakah backend berjalan
curl http://localhost:5000/api/health

# Jika tidak ada response, jalankan backend
cd backend
npm run dev
```

#### **2. Port 5000 Sudah Digunakan**
```bash
# Cek port yang digunakan
netstat -ano | findstr :5000

# Kill process jika perlu
taskkill /PID <process_id> /F

# Atau ubah port di backend/.env
PORT=5001
```

#### **3. Database Tidak Terhubung**
```bash
# Pastikan MySQL berjalan
# Jalankan database_setup.sql di MySQL
mysql -u root -p < database_setup.sql
```

#### **4. CORS Error**
- Backend sudah diperbaiki untuk mengizinkan semua origin di development
- Jika masih error, cek browser console untuk detail

#### **5. Environment Variables Tidak Set**
```bash
# Pastikan file .env ada
ls backend/.env
ls frontend/.env

# Jika tidak ada, copy dari template
copy backend\env.default backend\.env
```

## 🔍 Debugging Steps

### **1. Cek Backend Status**
```bash
# Test API health
curl http://localhost:5000/api/health

# Expected response:
{
  "status": "OK",
  "message": "WebSidomulyo API is running",
  "timestamp": "2024-01-18T...",
  "environment": "development"
}
```

### **2. Cek Frontend Environment**
```bash
# Pastikan VITE_API_BASE_URL benar
cat frontend/.env
# Should contain: VITE_API_BASE_URL=http://localhost:5000/api
```

### **3. Cek Browser Console**
1. Buka Developer Tools (F12)
2. Buka tab Console
3. Coba login dan lihat error messages
4. Cek tab Network untuk melihat request/response

### **4. Cek Backend Logs**
```bash
# Jalankan backend dan lihat console output
cd backend
npm run dev
```

## 🛠️ Solusi Cepat

### **Script Otomatis**
```bash
# Windows
start-dev.bat

# Linux/Mac
chmod +x setup.sh
./setup.sh
```

### **Manual Setup**
```bash
# 1. Setup environment
copy backend\env.default backend\.env
echo VITE_API_BASE_URL=http://localhost:5000/api > frontend\.env

# 2. Install dependencies
npm run install:all

# 3. Setup database
# Jalankan database_setup.sql di MySQL

# 4. Start servers
npm run dev
```

## 📋 Checklist Troubleshooting

### **Backend Issues:**
- [ ] MySQL berjalan
- [ ] Database `websidomulyo` ada
- [ ] Tabel-tabel sudah dibuat
- [ ] File `.env` ada dan benar
- [ ] Port 5000 tidak digunakan
- [ ] Dependencies terinstall

### **Frontend Issues:**
- [ ] File `frontend/.env` ada
- [ ] `VITE_API_BASE_URL` benar
- [ ] Backend berjalan di port 5000
- [ ] Tidak ada CORS error
- [ ] Browser console bersih

### **Network Issues:**
- [ ] Firewall tidak memblokir port 5000
- [ ] Antivirus tidak memblokir
- [ ] Proxy settings benar
- [ ] DNS resolution normal

## 🐛 Common Error Messages

### **"Cannot connect to server"**
- Backend tidak berjalan
- Port 5000 digunakan aplikasi lain
- Firewall memblokir

### **"Database connection failed"**
- MySQL tidak berjalan
- Kredensial database salah
- Database tidak ada

### **"CORS policy blocked"**
- Backend CORS configuration salah
- Origin tidak diizinkan
- Pre-flight request gagal

### **"Token invalid"**
- JWT_SECRET tidak set
- Token expired
- Token format salah

## 🔧 Advanced Debugging

### **Enable Detailed Logging**
```javascript
// Di frontend/src/contexts/AuthContext.jsx
console.log('API URL:', API_BASE_URL);
console.log('Request payload:', { username, password });
console.log('Response:', response);
```

### **Test API Endpoints**
```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# Test health endpoint
curl http://localhost:5000/api/health
```

### **Check Database Connection**
```bash
# Test MySQL connection
mysql -u root -p -e "USE websidomulyo; SELECT * FROM users;"
```

## 📞 Getting Help

Jika masalah masih berlanjut:

1. **Cek logs** di console backend dan browser
2. **Screenshot error** dari browser console
3. **Cek network tab** di browser developer tools
4. **Test API endpoints** dengan curl/Postman
5. **Restart semua services** (MySQL, backend, frontend)

## 🎯 Quick Fixes

### **Reset Everything:**
```bash
# Stop all processes
taskkill /F /IM node.exe
taskkill /F /IM mysql.exe

# Restart MySQL
# Restart backend: npm run dev:backend
# Restart frontend: npm run dev:frontend
```

### **Clear Browser Cache:**
- Hard refresh: Ctrl+Shift+R
- Clear localStorage: localStorage.clear()
- Disable browser extensions

### **Check System Resources:**
- Memory usage
- CPU usage
- Disk space
- Network connectivity

---

**Remember:** Most issues are related to environment setup or services not running. Start with the basic checks first! 🔍 