-- =====================================================
-- Database Setup untuk WebSidomulyo
-- =====================================================

-- Buat database
CREATE DATABASE IF NOT EXISTS websidomulyo;
USE websidomulyo;

-- =====================================================
-- Tabel Users
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  no_hp VARCHAR(20),
  role ENUM('admin', 'warga') DEFAULT 'warga',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Berita
-- =====================================================
CREATE TABLE IF NOT EXISTS berita (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  kategori ENUM('Pembangunan', 'Sosial', 'Agenda', 'Pendidikan', 'Lingkungan', 'Kesehatan', 'Pariwisata') NOT NULL,
  img VARCHAR(255),
  tanggal DATE NOT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- Tabel Surat
-- =====================================================
CREATE TABLE IF NOT EXISTS surat (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  nama VARCHAR(100) NOT NULL,
  nik VARCHAR(16) NOT NULL,
  jenis_kelamin ENUM('Laki-laki', 'Perempuan') NOT NULL,
  tempat_lahir VARCHAR(100) NOT NULL,
  tanggal_lahir DATE NOT NULL,
  pekerjaan VARCHAR(100),
  kewarganegaraan VARCHAR(50),
  agama VARCHAR(50) NOT NULL,
  no_hp VARCHAR(20) NOT NULL,
  alamat_ktp TEXT NOT NULL,
  alamat_sekarang TEXT NOT NULL,
  jenis_surat VARCHAR(100) NOT NULL,
  status ENUM('Menunggu', 'Diproses', 'Selesai') DEFAULT 'Menunggu',
  tanggal_pengajuan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- Tabel Lampiran Surat
-- =====================================================
CREATE TABLE IF NOT EXISTS lampiran_surat (
  id INT PRIMARY KEY AUTO_INCREMENT,
  surat_id INT NOT NULL,
  nama_file VARCHAR(255) NOT NULL,
  url_file VARCHAR(255) NOT NULL,
  jenis_persyaratan VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (surat_id) REFERENCES surat(id) ON DELETE CASCADE
);

-- =====================================================
-- Tabel Pengaduan
-- =====================================================
CREATE TABLE IF NOT EXISTS pengaduan (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  no_hp VARCHAR(20) NOT NULL,
  alamat TEXT,
  judul VARCHAR(255) NOT NULL,
  uraian TEXT NOT NULL,
  lampiran VARCHAR(255),
  status ENUM('Baru', 'Diproses', 'Selesai') DEFAULT 'Baru',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Statistik (untuk data statistik desa)
-- =====================================================
CREATE TABLE IF NOT EXISTS statistik (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kategori VARCHAR(50) NOT NULL,
  nilai INT NOT NULL,
  satuan VARCHAR(20),
  deskripsi TEXT,
  tahun INT DEFAULT 2024,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Pariwisata
-- =====================================================
CREATE TABLE IF NOT EXISTS pariwisata (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(255) NOT NULL,
  deskripsi TEXT NOT NULL,
  lokasi VARCHAR(255),
  img VARCHAR(255),
  kategori VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Lembaga
-- =====================================================
CREATE TABLE IF NOT EXISTS lembaga (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  ketua VARCHAR(100),
  no_hp VARCHAR(20),
  alamat TEXT,
  img VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Insert Data Default
-- =====================================================

-- Insert admin user default
-- Password: password (hashed dengan bcrypt)
INSERT INTO users (username, password_hash, nama, email, role) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@sidomulyo.com', 'admin')
ON DUPLICATE KEY UPDATE username = username;

-- Insert sample berita
INSERT INTO berita (title, content, kategori, tanggal, created_by) VALUES
('Pembangunan Jalan Desa', 'Pembangunan jalan desa telah selesai dan siap digunakan oleh warga.', 'Pembangunan', '2024-01-15', 1),
('Kegiatan Posyandu', 'Kegiatan posyandu rutin bulanan untuk balita dan lansia.', 'Kesehatan', '2024-01-20', 1),
('Rapat Koordinasi RT/RW', 'Rapat koordinasi rutin untuk membahas program desa.', 'Sosial', '2024-01-25', 1)
ON DUPLICATE KEY UPDATE title = title;

-- Insert sample statistik
INSERT INTO statistik (kategori, nilai, satuan, deskripsi, tahun) VALUES
('Total Penduduk', 2350, 'orang', 'Jumlah penduduk desa', 2024),
('Jumlah Keluarga', 670, 'KK', 'Jumlah kepala keluarga', 2024),
('Luas Wilayah', 1250, 'hektar', 'Luas wilayah desa', 2024),
('Jumlah RT', 15, 'RT', 'Jumlah Rukun Tetangga', 2024)
ON DUPLICATE KEY UPDATE nilai = nilai;

-- Insert sample pariwisata
INSERT INTO pariwisata (nama, deskripsi, lokasi, kategori) VALUES
('Wisata Alam Gunung', 'Wisata alam dengan pemandangan gunung yang indah', 'Dusun Sidomulyo', 'Wisata Alam'),
('Kolam Renang Desa', 'Kolam renang umum untuk warga desa', 'Pusat Desa', 'Wisata Buatan')
ON DUPLICATE KEY UPDATE nama = nama;

-- Insert sample lembaga
INSERT INTO lembaga (nama, deskripsi, ketua, no_hp) VALUES
('BPD', 'Badan Permusyawaratan Desa', 'Budi Santoso', '081234567890'),
('PKK', 'Pemberdayaan Kesejahteraan Keluarga', 'Siti Aminah', '081234567891'),
('Karang Taruna', 'Organisasi pemuda desa', 'Joko Widodo', '081234567892')
ON DUPLICATE KEY UPDATE nama = nama;

-- =====================================================
-- Indexes untuk optimasi performa
-- =====================================================

-- Index untuk tabel users
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Index untuk tabel berita
CREATE INDEX idx_berita_kategori ON berita(kategori);
CREATE INDEX idx_berita_tanggal ON berita(tanggal);
CREATE INDEX idx_berita_created_by ON berita(created_by);

-- Index untuk tabel surat
CREATE INDEX idx_surat_user_id ON surat(user_id);
CREATE INDEX idx_surat_status ON surat(status);
CREATE INDEX idx_surat_tanggal_pengajuan ON surat(tanggal_pengajuan);
CREATE INDEX idx_surat_jenis_surat ON surat(jenis_surat);

-- Index untuk tabel pengaduan
CREATE INDEX idx_pengaduan_status ON pengaduan(status);
CREATE INDEX idx_pengaduan_created_at ON pengaduan(created_at);

-- Index untuk tabel statistik
CREATE INDEX idx_statistik_kategori ON statistik(kategori);
CREATE INDEX idx_statistik_tahun ON statistik(tahun);

-- =====================================================
-- Views untuk kemudahan query
-- =====================================================

-- View untuk statistik surat per status
CREATE OR REPLACE VIEW v_statistik_surat AS
SELECT 
  status,
  COUNT(*) as jumlah,
  DATE_FORMAT(tanggal_pengajuan, '%Y-%m') as bulan
FROM surat 
GROUP BY status, DATE_FORMAT(tanggal_pengajuan, '%Y-%m');

-- View untuk statistik pengaduan per status
CREATE OR REPLACE VIEW v_statistik_pengaduan AS
SELECT 
  status,
  COUNT(*) as jumlah,
  DATE_FORMAT(created_at, '%Y-%m') as bulan
FROM pengaduan 
GROUP BY status, DATE_FORMAT(created_at, '%Y-%m');

-- =====================================================
-- Stored Procedures
-- =====================================================

-- Procedure untuk mendapatkan statistik dashboard
DELIMITER //
CREATE PROCEDURE GetDashboardStats()
BEGIN
  SELECT 
    (SELECT COUNT(*) FROM users WHERE role = 'warga') as total_warga,
    (SELECT COUNT(*) FROM surat WHERE status = 'Menunggu') as surat_menunggu,
    (SELECT COUNT(*) FROM surat WHERE status = 'Diproses') as surat_diproses,
    (SELECT COUNT(*) FROM surat WHERE status = 'Selesai') as surat_selesai,
    (SELECT COUNT(*) FROM pengaduan WHERE status = 'Baru') as pengaduan_baru,
    (SELECT COUNT(*) FROM berita) as total_berita;
END //
DELIMITER ;

-- =====================================================
-- Triggers untuk audit trail
-- =====================================================

-- Trigger untuk update timestamp
DELIMITER //
CREATE TRIGGER update_surat_timestamp 
BEFORE UPDATE ON surat
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;
//

CREATE TRIGGER update_pengaduan_timestamp 
BEFORE UPDATE ON pengaduan
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;
//
DELIMITER ;

-- =====================================================
-- Selesai Setup Database
-- =====================================================

SELECT 'Database WebSidomulyo berhasil dibuat!' as status;
SELECT 'Silakan jalankan aplikasi dengan npm run dev' as next_step; 