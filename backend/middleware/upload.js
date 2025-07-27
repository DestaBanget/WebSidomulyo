const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  const extAllowed = ['.jpg', '.jpeg', '.png', '.pdf'];
  const extname = extAllowed.includes(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.includes(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Hanya file gambar JPG, JPEG, PNG, atau PDF yang diperbolehkan!'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit untuk handle file besar
    files: 50, // Maksimal 50 file sekaligus
    fieldSize: 500 * 1024 * 1024 // 500MB untuk field size
  },
  fileFilter: fileFilter
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File terlalu besar. Maksimal 500MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Terlalu banyak file. Maksimal 50 file sekaligus.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: `Field '${err.field}' tidak diharapkan. Gunakan field 'files' untuk upload file.` });
    }
    return res.status(400).json({ error: 'Error upload file: ' + err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Specific upload configurations
const uploadImage = upload.single('foto'); // Changed to 'foto' to match frontend
const uploadDocument = upload.single('document');
const uploadMultiple = upload.array('files'); // Tidak ada batasan jumlah file

// Flexible upload middleware that accepts multiple field names
const uploadFlexible = (fieldNames = ['foto', 'img', 'image', 'file']) => {
  return (req, res, next) => {
    const uploadSingle = upload.single(fieldNames[0]);
    uploadSingle(req, res, (err) => {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
        // Try alternative field names
        for (let i = 1; i < fieldNames.length; i++) {
          const altUpload = upload.single(fieldNames[i]);
          altUpload(req, res, (altErr) => {
            if (!altErr || !(altErr instanceof multer.MulterError)) {
              return next();
            }
          });
        }
        return res.status(400).json({ 
          error: `Field upload tidak valid. Gunakan salah satu dari: ${fieldNames.join(', ')}` 
        });
      }
      next(err);
    });
  };
};

module.exports = {
  upload,
  uploadImage,
  uploadDocument,
  uploadMultiple,
  uploadFlexible,
  handleMulterError
}; 