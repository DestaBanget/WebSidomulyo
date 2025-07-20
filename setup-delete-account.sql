-- Setup untuk fitur hapus akun
-- Menambahkan kolom user_id ke tabel pengaduan jika belum ada

USE websidomulyo;

-- Cek apakah kolom user_id sudah ada di tabel pengaduan
SET @column_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'websidomulyo'
  AND TABLE_NAME = 'pengaduan'
  AND COLUMN_NAME = 'user_id'
);

-- Jika kolom belum ada, tambahkan
SET @sql = IF(@column_exists = 0,
  'ALTER TABLE pengaduan ADD COLUMN user_id INT NULL AFTER id',
  'SELECT "Column user_id already exists in pengaduan table" as message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Cek apakah foreign key constraint sudah ada
SET @fk_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = 'websidomulyo'
  AND TABLE_NAME = 'pengaduan'
  AND CONSTRAINT_NAME = 'fk_pengaduan_user_id'
);

-- Jika foreign key belum ada, tambahkan
SET @sql_fk = IF(@fk_exists = 0,
  'ALTER TABLE pengaduan ADD CONSTRAINT fk_pengaduan_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL',
  'SELECT "Foreign key fk_pengaduan_user_id already exists" as message'
);

PREPARE stmt_fk FROM @sql_fk;
EXECUTE stmt_fk;
DEALLOCATE PREPARE stmt_fk;

-- Verifikasi struktur tabel
DESCRIBE pengaduan;
DESCRIBE users;

-- Tampilkan foreign key constraints
SELECT 
  TABLE_NAME,
  CONSTRAINT_NAME,
  COLUMN_NAME,
  REFERENCED_TABLE_NAME,
  REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'websidomulyo'
AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME, CONSTRAINT_NAME; 