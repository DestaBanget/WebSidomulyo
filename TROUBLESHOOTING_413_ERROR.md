# Troubleshooting Error 413 Request Entity Too Large

## Masalah
Error 413 "Request Entity Too Large" terjadi saat mengirim surat dengan file yang besar dari mobile device.

## Solusi yang Telah Diterapkan

### 1. Backend Configuration (Node.js/Express)

#### ✅ Express Body Parser Limits
```javascript
// backend/server.js
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
```

#### ✅ Multer File Upload Limits
```javascript
// backend/middleware/upload.js
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB per file
    files: 50, // Maksimal 50 file
    fieldSize: 500 * 1024 * 1024 // 500MB field size
  },
  fileFilter: fileFilter
});
```

#### ✅ Timeout Configuration
```javascript
// backend/server.js
req.setTimeout(900000); // 15 minutes untuk upload
res.setTimeout(900000); // 15 minutes untuk upload
```

### 2. Server Configuration

#### Nginx Configuration (jika menggunakan nginx)
```nginx
# nginx.conf
client_max_body_size 500M;
client_body_timeout 900s;
client_header_timeout 900s;
send_timeout 900s;
```

#### Apache Configuration (jika menggunakan apache)
```apache
# .htaccess atau apache config
LimitRequestBody 524288000
TimeOut 900
```

### 3. Hosting Provider Configuration

#### Vercel (jika menggunakan Vercel)
```json
// vercel.json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 900
    }
  }
}
```

#### Railway (jika menggunakan Railway)
- Set environment variable: `NODE_OPTIONS="--max-old-space-size=4096"`

#### Heroku (jika menggunakan Heroku)
- Set environment variable: `NODE_OPTIONS="--max-old-space-size=4096"`

## Langkah Troubleshooting

### 1. Restart Server
```bash
# Windows
restart-server.bat

# Linux/Mac
cd backend
npm restart
```

### 2. Check Server Logs
```bash
# Monitor logs untuk melihat error
tail -f backend/logs/app.log
```

### 3. Test Upload dengan File Kecil
- Coba upload file < 1MB terlebih dahulu
- Jika berhasil, coba file yang lebih besar secara bertahap

### 4. Check Network Connection
- Pastikan koneksi internet stabil
- Coba dari jaringan yang berbeda

### 5. Browser/Device Test
- Coba dari browser desktop
- Coba dari device mobile yang berbeda
- Clear browser cache

## Monitoring dan Debugging

### Log Messages yang Dicari
```
📨 POST /api/surat - Content-Length: [size]
📤 Upload request detected - Content-Length: [size]
⚠️ Large request detected: [size]MB
```

### Error Messages
- `413 Payload too large` - Masih ada batasan di level server
- `LIMIT_FILE_SIZE` - File terlalu besar untuk multer
- `LIMIT_FILE_COUNT` - Terlalu banyak file

## Konfigurasi Tambahan

### Environment Variables
```bash
# .env
NODE_OPTIONS="--max-old-space-size=4096"
MAX_FILE_SIZE=524288000
UPLOAD_TIMEOUT=900000
```

### Package.json Scripts
```json
{
  "scripts": {
    "start": "node --max-old-space-size=4096 server.js",
    "dev": "nodemon --max-old-space-size=4096 server.js"
  }
}
```

## Jika Masih Error 413

### 1. Cek Hosting Provider Limits
- Vercel: 4.5MB default, perlu upgrade untuk lebih besar
- Railway: 100MB default
- Heroku: 30MB default

### 2. Implementasi Chunked Upload
- Split file besar menjadi chunks
- Upload secara bertahap
- Reassemble di server

### 3. Gunakan Cloud Storage
- Upload ke S3/Cloudinary
- Simpan URL di database
- Tidak ada batasan ukuran file

### 4. Compression
- Compress file sebelum upload
- Decompress di server
- Kurangi ukuran transfer

## Contact Support

Jika masalah masih berlanjut:
1. Screenshot error message
2. Log server error
3. File size yang dicoba upload
4. Device dan browser yang digunakan 