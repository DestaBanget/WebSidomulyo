# 🖼️ Image Loading Troubleshooting - WebSidomulyo

Panduan lengkap untuk mengatasi masalah gambar tidak terload di aplikasi WebSidomulyo.

## 🚨 Masalah "Gambar Tidak Terload"

### **Gejala:**
- Berita berhasil ditambahkan tapi gambar tidak muncul
- Gambar broken atau tidak terload
- URL gambar tidak valid
- Gambar tidak tersimpan dengan benar

### **Penyebab Umum:**
1. **URL gambar tidak lengkap** (relative vs absolute)
2. **Upload directory tidak ada**
3. **Static file serving tidak dikonfigurasi**
4. **File permissions tidak benar**
5. **Database menyimpan path relatif**

## 🔧 Solusi yang Telah Diterapkan

### **1. Image Helper Utility**
```javascript
// backend/utils/imageHelper.js
const saveImagePath = (req, filename) => {
  return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

const getImageUrl = (req, imagePath) => {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${req.protocol}://${req.get('host')}${imagePath}`;
};
```

### **2. Absolute URL Storage**
```javascript
// Sekarang menyimpan URL lengkap
const img = req.file ? saveImagePath(req, req.file.filename) : null;
// Hasil: http://localhost:5000/uploads/filename.jpg
```

### **3. URL Conversion pada Response**
```javascript
// Convert semua URL gambar ke absolute URL
const beritaWithImages = berita.map(item => ({
  ...item,
  img: item.img ? getImageUrl(req, item.img) : null
}));
```

## 🛠️ Testing Image Loading

### **1. Test Upload Directory**
```bash
# Cek apakah directory ada
ls -la backend/uploads/

# Buat directory jika tidak ada
mkdir -p backend/uploads/
chmod 755 backend/uploads/
```

### **2. Test Static File Serving**
```bash
# Test dengan curl
curl -I http://localhost:5000/uploads/

# Expected response: 200 OK
```

### **3. Test Image URL**
```bash
# Jika ada file test.jpg
curl -I http://localhost:5000/uploads/test.jpg

# Expected response: 200 OK dengan Content-Type: image/jpeg
```

### **4. Check Database URLs**
```sql
-- Cek URL gambar di database
SELECT id, title, img FROM berita WHERE img IS NOT NULL;

-- URL seharusnya: http://localhost:5000/uploads/filename.jpg
```

## 🔍 Debugging Steps

### **Step 1: Check Upload Directory**
```bash
# Windows
dir backend\uploads\

# Linux/Mac
ls -la backend/uploads/
```

### **Step 2: Check File Permissions**
```bash
# Linux/Mac
chmod 755 backend/uploads/
chmod 644 backend/uploads/*.jpg
```

### **Step 3: Check Server Configuration**
```javascript
// Di backend/server.js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

### **Step 4: Check Database URLs**
```sql
-- Cek URL yang tersimpan
SELECT id, title, img FROM berita WHERE img IS NOT NULL;

-- URL seharusnya absolute, bukan relative
-- ✅ http://localhost:5000/uploads/filename.jpg
-- ❌ /uploads/filename.jpg
```

### **Step 5: Check Browser Network Tab**
1. Buka Developer Tools (F12)
2. Buka tab Network
3. Refresh halaman
4. Cari request gambar yang gagal
5. Cek URL dan status response

## 🐛 Common Image Loading Errors

### **Error: "404 Not Found"**
- **Penyebab:** File tidak ada di uploads directory
- **Solusi:** Cek apakah file benar-benar terupload

### **Error: "403 Forbidden"**
- **Penyebab:** Permission directory tidak cukup
- **Solusi:** Set permission `chmod 755 backend/uploads/`

### **Error: "Broken Image"**
- **Penyebab:** URL gambar tidak valid
- **Solusi:** Cek URL di database dan pastikan absolute

### **Error: "CORS Error"**
- **Penyebab:** CORS policy memblokir
- **Solusi:** Backend sudah dikonfigurasi untuk mengizinkan

## 📋 Frontend Integration

### **Image Component Setup**
```jsx
// Component untuk menampilkan gambar
const ImageComponent = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  
  if (!src) return null;
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={() => setError(true)}
      style={{ display: error ? 'none' : 'block' }}
    />
  );
};
```

### **Image Loading with Fallback**
```jsx
const BeritaImage = ({ img, title }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!img || imageError) {
    return (
      <div className="image-placeholder">
        <span>No Image</span>
      </div>
    );
  }
  
  return (
    <img 
      src={img} 
      alt={title}
      onError={() => setImageError(true)}
      className="berita-image"
    />
  );
};
```

### **Image Upload Validation**
```javascript
const validateImage = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (file.size > maxSize) {
    throw new Error('File terlalu besar. Maksimal 5MB.');
  }
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type tidak didukung.');
  }
  
  return true;
};
```

## 🎯 Best Practices

### **1. Image Optimization**
```javascript
// Compress image sebelum upload
const compressImage = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, { type: file.type }));
      }, 'image/jpeg', 0.8);
    };
    
    img.src = URL.createObjectURL(file);
  });
};
```

### **2. Lazy Loading**
```jsx
const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="lazy-image-container">
      {!isLoaded && <div className="loading-spinner" />}
      <img 
        src={src} 
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
        className="lazy-image"
      />
    </div>
  );
};
```

### **3. Error Handling**
```javascript
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  event.target.style.display = 'none';
  event.target.nextElementSibling.style.display = 'block'; // Show fallback
};
```

## 🔧 Troubleshooting Commands

### **Check Upload Directory**
```bash
# Windows
dir backend\uploads\
test-upload.bat

# Linux/Mac
ls -la backend/uploads/
find backend/uploads/ -name "*.jpg" -o -name "*.png"
```

### **Test Image URLs**
```bash
# Test specific image
curl -I http://localhost:5000/uploads/test.jpg

# Test uploads directory
curl -I http://localhost:5000/uploads/
```

### **Check Database URLs**
```sql
-- Check image URLs
SELECT id, title, img FROM berita WHERE img IS NOT NULL;

-- Update relative URLs to absolute (if needed)
UPDATE berita 
SET img = CONCAT('http://localhost:5000', img) 
WHERE img LIKE '/uploads/%';
```

### **Restart Services**
```bash
# Restart backend
npm run dev:backend

# Check logs for errors
tail -f backend/logs/app.log
```

## 📞 Getting Help

Jika masalah gambar masih berlanjut:

1. **Cek upload directory** dan file permissions
2. **Test static file serving** dengan curl
3. **Verify database URLs** adalah absolute
4. **Check browser network tab** untuk error detail
5. **Test dengan file gambar yang berbeda**

## 🎯 Quick Fix Checklist

- [ ] Upload directory ada dan writable
- [ ] Static file serving dikonfigurasi
- [ ] Database menyimpan absolute URLs
- [ ] Frontend menggunakan URL yang benar
- [ ] File permissions benar
- [ ] Backend berjalan di port 5000
- [ ] CORS dikonfigurasi dengan benar

---

**Remember:** Always use absolute URLs for images in production! 🖼️ 