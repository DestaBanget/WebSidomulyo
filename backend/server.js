const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const beritaRoutes = require('./routes/berita');
const suratRoutes = require('./routes/surat');
const pengaduanRoutes = require('./routes/pengaduan');
const statistikRoutes = require('./routes/statistik');
const pengumumanRoutes = require('./routes/pengumuman');
const lembagaRoutes = require('./routes/lembaga');
const strukturRoutes = require('./routes/struktur');
const pesanKontakRoutes = require('./routes/pesan_kontak');
const agendaRoutes = require('./routes/agenda');
const tentangRoutes = require('./routes/tentang');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const isDev = process.env.NODE_ENV !== 'production';

// Rate limiting (hanya untuk endpoint data, tidak ada limit untuk login/register)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 1000 : 200,
  message: {
    error: 'Terlalu banyak permintaan, silakan coba lagi beberapa saat lagi.'
  }
});

// Terapkan general limiter hanya untuk endpoint data (tidak termasuk surat)
app.use(['/api/berita', '/api/pengaduan', '/api/statistik', '/api/pengumuman', '/api/lembaga', '/api/struktur', '/api/tentang'], generalLimiter);
// Tidak ada rate limit untuk login/register dan surat - user bebas mencoba tanpa batasan

// CORS configuration - lebih permisif untuk development dan production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'https://web-sidomulyo-a9tz.vercel.app',
  'https://web-sidomulyo.vercel.app',
  'https://websidomulyo.vercel.app',
  'https://*.vercel.app', // Allow all Vercel subdomains
  'https://*.railway.app', // Allow all Railway subdomains
  'http://145.79.11.150:5000', // <--- Tambahkan IP backend di sini
  'https://www.desasidomulyo.org', // <--- Tambahkan domain utama
  'https://desasidomulyo.org',      // <--- Tambahkan domain tanpa www
  'https://backend.desasidomulyo.org', // Backend domain
  'https://api.desasidomulyo.org', // API domain
  'https://desasidomulyo.com', // Alternative domain
  'https://www.desasidomulyo.com' // Alternative domain with www
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) {
      console.log('✅ Allowing request with no origin (mobile app)');
      return callback(null, true);
    }
    
    // Allow all localhost origins
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      console.log('✅ Allowing localhost origin:', origin);
      return callback(null, true);
    }
    
    // Allow specific origins
    if (allowedOrigins.includes(origin)) {
      console.log('✅ Allowing specific origin:', origin);
      return callback(null, true);
    }
    
    // Allow Vercel domains (including subdomains)
    if (origin.includes('vercel.app')) {
      console.log('✅ Allowing Vercel domain:', origin);
      return callback(null, true);
    }
    
    // Allow Railway domains
    if (origin.includes('railway.app')) {
      console.log('✅ Allowing Railway domain:', origin);
      return callback(null, true);
    }
    
    // Allow desasidomulyo domains
    if (origin.includes('desasidomulyo')) {
      console.log('✅ Allowing Desa Sidomulyo domain:', origin);
      return callback(null, true);
    }
    
    // For production, be more restrictive but still allow common domains
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ CORS blocked origin:', origin);
      return callback(new Error('CORS not allowed for this origin'), false);
    }
    
    // For development, allow all
    console.log('✅ Allowing origin in development:', origin);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Length']
}));

// Handle OPTIONS requests specifically
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Content-Length');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.status(200).end();
});

// Tambahkan middleware untuk handle CORS preflight untuk upload
app.use('/api/surat', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Content-Length, User-Agent');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    res.status(200).end();
  } else {
    // Tambahkan header untuk handle large uploads
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    next();
  }
});

// Middleware khusus untuk POST surat dengan file upload
app.use('/api/surat', (req, res, next) => {
  if (req.method === 'POST') {
    // Set timeout lebih lama untuk upload
    req.setTimeout(1800000); // 30 minutes
    res.setTimeout(1800000); // 30 minutes
    
    // Tambahkan keep-alive headers
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Keep-Alive', 'timeout=1800, max=1000');
    
    // Detect mobile device
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    const contentLength = req.headers['content-length'] || 'Unknown';
    const contentLengthMB = contentLength !== 'Unknown' ? (parseInt(contentLength) / (1024 * 1024)).toFixed(2) : 'Unknown';
    
    console.log(`📤 Upload request detected - Content-Length: ${contentLength} (${contentLengthMB}MB) - Mobile: ${isMobile ? 'Yes' : 'No'}`);
    
    // Log warning untuk mobile dengan file besar
    if (isMobile && contentLength !== 'Unknown' && parseInt(contentLength) > 1024 * 1024) {
      console.log(`⚠️ Mobile device detected with large file: ${contentLengthMB}MB`);
    }
    
    // Log untuk multiple file upload
    const fileCount = req.files ? req.files.length : 0;
    if (fileCount > 1) {
      console.log(`📦 Multiple file upload detected: ${fileCount} files`);
    }
  }
  next();
});

// Body parsing middleware - tingkatkan limit untuk handle base64 images dan file upload
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

// Tambahkan middleware untuk handle large payloads
app.use((req, res, next) => {
  // Set max payload size
  req.setMaxListeners(0);
  res.setMaxListeners(0);
  next();
});

// Tambahkan middleware untuk handle large requests
app.use((req, res, next) => {
  // Set timeout untuk request yang lama
  req.setTimeout(600000); // 10 minutes
  res.setTimeout(600000); // 10 minutes
  
  // Log request info untuk debugging
  console.log(`📨 ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No origin'} - Content-Length: ${req.headers['content-length'] || 'Unknown'}`);
  
  // Handle large payloads
  const contentLength = parseInt(req.headers['content-length'] || '0');
  if (contentLength > 500 * 1024 * 1024) { // 500MB
    console.log(`⚠️ Large request detected: ${(contentLength / 1024 / 1024).toFixed(2)}MB`);
  }
  
  next();
});

// Error handling untuk payload too large
app.use((err, req, res, next) => {
  console.error('Error caught in middleware:', err);
  
  // Detect mobile device
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = isMobile 
      ? 'File terlalu besar untuk mobile device. Coba kompres file atau gunakan file < 1MB.'
      : 'Ukuran file atau data terlalu besar. Maksimal 500MB.';
      
    return res.status(413).json({ 
      error: 'Payload terlalu besar',
      message: message,
      details: err.message,
      suggestion: isMobile ? 'Gunakan file yang lebih kecil atau kompres gambar' : 'Coba kompres file atau gunakan file yang lebih kecil',
      device: isMobile ? 'mobile' : 'desktop'
    });
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ 
      error: 'Field tidak valid',
      message: err.message
    });
  }
  if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
    const message = isMobile
      ? 'Koneksi timeout pada mobile device. Coba lagi dengan file yang lebih kecil.'
      : 'Koneksi timeout. Coba lagi atau gunakan file yang lebih kecil.';
      
    return res.status(408).json({
      error: 'Connection timeout',
      message: message,
      details: err.message,
      device: isMobile ? 'mobile' : 'desktop'
    });
  }
  next(err);
});

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/surat', suratRoutes);
app.use('/api/pengaduan', pengaduanRoutes);
app.use('/api/statistik', statistikRoutes);
app.use('/api/pengumuman', pengumumanRoutes);
app.use('/api/lembaga', lembagaRoutes);
app.use('/api/struktur', strukturRoutes);
app.use('/api/pesan-kontak', pesanKontakRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/tentang', tentangRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'WebSidomulyo API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uploadLimits: {
      maxFileSize: '500MB',
      maxFiles: 50,
      timeout: '30 minutes'
    }
  });
});

// Upload test endpoint
app.post('/api/test-upload', (req, res) => {
  res.json({
    message: 'Upload endpoint is accessible',
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'WebSidomulyo API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      berita: '/api/berita',
      surat: '/api/surat',
      pengaduan: '/api/pengaduan',
      tentang: '/api/tentang'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      'GET /api/health',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'GET /api/auth/me'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle specific errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation Error',
      message: err.message 
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Token tidak valid atau expired' 
    });
  }
  
  // Default error
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Terjadi kesalahan pada server'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 