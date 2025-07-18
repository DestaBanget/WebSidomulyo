# 📁 Upload File Troubleshooting - WebSidomulyo

Panduan lengkap untuk mengatasi masalah upload file di aplikasi WebSidomulyo.

## 🚨 Error "MulterError: Unexpected field"

### **Penyebab:**
- Field name tidak sesuai antara frontend dan backend
- Frontend mengirim field `img` tetapi backend mengharapkan `image`
- Konfigurasi multer tidak fleksibel

### **Solusi yang Telah Diterapkan:**

#### **1. Middleware Upload Fleksibel**
```javascript
// Sekarang mendukung multiple field names
const uploadFlexible = (fieldNames = ['img', 'image', 'file']) => {
  // Menerima field: img, image, atau file
};
```

#### **2. Error Handling yang Lebih Baik**
```javascript
const handleMulterError = (err, req, res, next) => {
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ 
      error: `Field '${err.field}' tidak diharapkan. Gunakan field 'img' untuk upload gambar.` 
    });
  }
  // Handle error lainnya
};
```

## 🔧 Konfigurasi Upload

### **Field Names yang Didukung:**
- `img` (primary)
- `image` (alternative)
- `file` (alternative)

### **File Types yang Diizinkan:**
- **Images:** jpeg, jpg, png, gif
- **Documents:** pdf, doc, docx
- **Size Limit:** 5MB

### **Upload Directory:**
```
backend/uploads/
```

## 🛠️ Testing Upload

### **1. Test dengan cURL**
```bash
# Test upload berita dengan gambar
curl -X POST http://localhost:5000/api/berita \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Test Berita" \
  -F "content=Konten test berita" \
  -F "kategori=Pembangunan" \
  -F "tanggal=2024-01-18" \
  -F "img=@/path/to/image.jpg"
```

### **2. Test dengan Postman**
1. **Method:** POST
2. **URL:** `http://localhost:5000/api/berita`
3. **Headers:** 
   - `Authorization: Bearer YOUR_TOKEN`
4. **Body:** form-data
   - `title`: Test Berita
   - `content`: Konten test berita
   - `kategori`: Pembangunan
   - `tanggal`: 2024-01-18
   - `img`: [file upload]

## 🔍 Debugging Upload

### **1. Cek Upload Directory**
```bash
# Pastikan directory uploads ada
ls backend/uploads/

# Jika tidak ada, buat manual
mkdir -p backend/uploads
```

### **2. Cek File Permissions**
```bash
# Pastikan directory writable
chmod 755 backend/uploads/
```

### **3. Cek Multer Configuration**
```javascript
// Di backend/middleware/upload.js
console.log('Upload directory:', uploadDir);
console.log('File received:', req.file);
```

### **4. Cek Request Headers**
```javascript
// Di route handler
console.log('Content-Type:', req.headers['content-type']);
console.log('File field:', req.file);
```

## 🐛 Common Upload Errors

### **Error: "LIMIT_FILE_SIZE"**
- **Penyebab:** File terlalu besar (>5MB)
- **Solusi:** Kompres file atau kurangi ukuran

### **Error: "LIMIT_UNEXPECTED_FILE"**
- **Penyebab:** Field name tidak sesuai
- **Solusi:** Gunakan field `img`, `image`, atau `file`

### **Error: "Only image, PDF, and document files are allowed"**
- **Penyebab:** File type tidak diizinkan
- **Solusi:** Gunakan file type yang didukung

### **Error: "ENOENT: no such file or directory"**
- **Penyebab:** Upload directory tidak ada
- **Solusi:** Buat directory `backend/uploads/`

### **Error: "EACCES: permission denied"**
- **Penyebab:** Permission directory tidak cukup
- **Solusi:** Set permission `chmod 755 backend/uploads/`

## 📋 Frontend Integration

### **FormData Setup**
```javascript
const formData = new FormData();
formData.append('title', title);
formData.append('content', content);
formData.append('kategori', kategori);
formData.append('tanggal', tanggal);
formData.append('img', file); // Field name harus 'img'

const response = await fetch('/api/berita', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

### **File Input Setup**
```html
<input 
  type="file" 
  name="img" 
  accept="image/*,.pdf,.doc,.docx"
  onChange={(e) => setFile(e.target.files[0])}
/>
```

## 🎯 Best Practices

### **1. File Validation**
```javascript
// Di frontend
const validateFile = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  
  if (file.size > maxSize) {
    throw new Error('File terlalu besar. Maksimal 5MB.');
  }
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type tidak didukung.');
  }
};
```

### **2. Progress Indicator**
```javascript
const uploadWithProgress = async (formData, onProgress) => {
  const xhr = new XMLHttpRequest();
  
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      onProgress(percentComplete);
    }
  });
  
  return new Promise((resolve, reject) => {
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.open('POST', '/api/berita');
    xhr.send(formData);
  });
};
```

### **3. Error Handling**
```javascript
try {
  const response = await fetch('/api/berita', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload gagal');
  }
  
  const result = await response.json();
  console.log('Upload berhasil:', result);
} catch (error) {
  console.error('Upload error:', error.message);
  // Handle error di UI
}
```

## 🔧 Troubleshooting Commands

### **Check Upload Directory**
```bash
# Cek apakah directory ada
ls -la backend/uploads/

# Buat directory jika tidak ada
mkdir -p backend/uploads/
chmod 755 backend/uploads/
```

### **Test File Upload**
```bash
# Test dengan curl
curl -X POST http://localhost:5000/api/berita \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Test" \
  -F "content=Test content" \
  -F "kategori=Pembangunan" \
  -F "tanggal=2024-01-18" \
  -F "img=@test.jpg"
```

### **Check Server Logs**
```bash
# Cek backend logs untuk error detail
cd backend
npm run dev
```

## 📞 Getting Help

Jika masalah upload masih berlanjut:

1. **Cek browser console** untuk error detail
2. **Cek backend logs** untuk multer error
3. **Test dengan curl** untuk isolasi masalah
4. **Verify file permissions** di upload directory
5. **Check Content-Type** header di request

---

**Remember:** Always use field name `img` for image uploads! 📁 