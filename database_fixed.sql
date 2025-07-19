-- =====================================================
-- Database Setup WebSidomulyo - VERSI DIPERBAIKI
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Berita
-- =====================================================
CREATE TABLE IF NOT EXISTS berita (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  kategori VARCHAR(50) NOT NULL,
  img VARCHAR(255),
  tanggal DATE NOT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
  nik VARCHAR(16) NOT NULL, -- kolom baru
  tanggal_pengaduan DATE NOT NULL, -- kolom baru
  status ENUM('Baru', 'Diproses', 'Selesai') DEFAULT 'Baru',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Statistik
-- =====================================================
CREATE TABLE IF NOT EXISTS statistik (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kategori VARCHAR(50) NOT NULL,
  nilai INT NOT NULL,
  satuan VARCHAR(20),
  deskripsi TEXT,
  tahun INT DEFAULT 2024,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Pengumuman
-- =====================================================
CREATE TABLE IF NOT EXISTS pengumuman (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  kategori VARCHAR(50) NOT NULL,
  img VARCHAR(255),
  tanggal DATE NOT NULL,
  desc TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- Tabel Agenda
-- =====================================================
CREATE TABLE IF NOT EXISTS agenda (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  deskripsi TEXT NOT NULL,
  tanggal DATE NOT NULL,
  waktu TIME NOT NULL,
  lokasi VARCHAR(255) NOT NULL,
  status ENUM('Akan Datang', 'Sedang Berlangsung', 'Selesai') DEFAULT 'Akan Datang',
  img VARCHAR(255),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Kontak Desa
-- =====================================================
CREATE TABLE IF NOT EXISTS kontak_desa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  alamat VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(30),
  instagram VARCHAR(100),
  facebook VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Insert Data Default - VERSI AMAN
-- =====================================================

-- Insert admin user default (hanya jika belum ada)
INSERT IGNORE INTO users (username, password_hash, nama, email, role) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@sidomulyo.com', 'admin');

-- Insert sample berita (hanya jika belum ada)
INSERT IGNORE INTO berita (title, content, kategori, tanggal, created_by) VALUES
('Pembangunan Jalan Desa', 'Pembangunan jalan desa telah selesai dan siap digunakan oleh warga.', 'Pembangunan', '2024-01-15', 1),
('Kegiatan Posyandu', 'Kegiatan posyandu rutin bulanan untuk balita dan lansia.', 'Kesehatan', '2024-01-20', 1),
('Rapat Koordinasi RT/RW', 'Rapat koordinasi rutin untuk membahas program desa.', 'Sosial', '2024-01-25', 1);

-- Insert sample pengumuman (hanya jika belum ada)
INSERT IGNORE INTO pengumuman (title, content, kategori, tanggal, desc, created_by) VALUES
('Pemadaman Listrik Sementara', 'Akan ada pemadaman listrik di wilayah Dusun Barat pada 15 Januari 2025 pukul 09.00-15.00 WIB. Mohon warga mempersiapkan diri dan mengantisipasi kebutuhan listrik selama pemadaman berlangsung.', 'Penting', '2025-01-13', 'Akan ada pemadaman listrik di wilayah Dusun Barat pada 15 Januari 2025 pukul 09.00-15.00 WIB.', 1),
('Pendaftaran Bantuan Sosial Dibuka', 'Pendaftaran bantuan sosial untuk warga kurang mampu dibuka hingga 20 Januari 2025. Silakan datang ke kantor desa dengan membawa dokumen pendukung.', 'Informasi', '2025-01-12', 'Pendaftaran bantuan sosial untuk warga kurang mampu dibuka hingga 20 Januari 2025.', 1),
('Jadwal Posyandu Bulan Januari', 'Posyandu akan dilaksanakan pada 18 Januari 2025 di balai desa mulai pukul 08.00 WIB. Diharapkan seluruh ibu dan balita hadir tepat waktu.', 'Kesehatan', '2025-01-11', 'Posyandu akan dilaksanakan pada 18 Januari 2025 di balai desa mulai pukul 08.00 WIB.', 1);

-- Insert sample agenda (hanya jika belum ada)
INSERT IGNORE INTO agenda (title, deskripsi, tanggal, waktu, lokasi, status, created_by) VALUES
('Rapat Koordinasi Desa', 'Rapat koordinasi bulanan untuk membahas program pembangunan desa dan evaluasi kinerja perangkat desa dalam melayani masyarakat. Acara ini akan dihadiri oleh seluruh perangkat desa dan tokoh masyarakat.', '2024-12-20', '09:00:00', 'Balai Desa Sidomulyo, Jl. Raya Sidomulyo No. 123', 'Akan Datang', 1),
('Pelatihan UMKM', 'Pelatihan pengembangan usaha mikro kecil menengah untuk warga desa dengan fokus pada digital marketing dan pengelolaan keuangan. Peserta akan mendapatkan sertifikat pelatihan.', '2024-12-25', '14:00:00', 'Aula Desa Sidomulyo, Kompleks Kantor Desa', 'Akan Datang', 1),
('Gotong Royong', 'Kegiatan gotong royong membersihkan lingkungan desa dan perbaikan infrastruktur jalan kampung. Semua warga diharapkan berpartisipasi untuk menjaga kebersihan desa.', '2024-12-15', '07:00:00', 'Seluruh Desa Sidomulyo, Mulai dari RT 01 hingga RT 15', 'Selesai', 1),
('Posyandu Lansia', 'Kegiatan posyandu untuk lansia dengan pemeriksaan kesehatan rutin dan pemberian vitamin. Diharapkan seluruh lansia hadir untuk pemeriksaan kesehatan berkala.', '2024-12-18', '08:00:00', 'Poskesdes Sidomulyo, Jl. Kesehatan No. 45', 'Sedang Berlangsung', 1),
('Sosialisasi Program Desa', 'Sosialisasi program pembangunan desa dan pengenalan aplikasi digital untuk layanan warga. Acara ini akan menjelaskan berbagai program pemerintah desa yang sedang berjalan.', '2024-12-22', '19:00:00', 'Masjid Al-Ikhlas, Jl. Masjid No. 67', 'Akan Datang', 1),
('Festival Kuliner Desa', 'Festival kuliner tradisional dan modern hasil kreasi warga desa Sidomulyo. Acara ini akan menampilkan berbagai makanan khas desa dan lomba masak antar RT.', '2024-12-28', '16:00:00', 'Lapangan Desa Sidomulyo, Jl. Lapangan No. 89', 'Akan Datang', 1),
('Pelatihan Kader Posyandu', 'Pelatihan kader posyandu untuk meningkatkan pelayanan kesehatan masyarakat desa. Peserta akan dilatih tentang cara memberikan pelayanan kesehatan yang baik.', '2024-12-30', '08:00:00', 'Balai Desa Sidomulyo, Ruang Rapat Utama', 'Akan Datang', 1),
('Kerja Bakti Bersama', 'Kerja bakti membersihkan lingkungan desa bersama seluruh warga. Kegiatan ini bertujuan untuk menjaga kebersihan dan keindahan desa Sidomulyo.', '2024-12-10', '07:00:00', 'Seluruh Desa Sidomulyo, Fokus pada Jalan Utama dan Taman', 'Selesai', 1),
('Lomba Cerdas Cermat Antar RT', 'Lomba cerdas cermat antar RT dalam rangka memperingati HUT RI. Acara ini akan menguji pengetahuan warga tentang sejarah dan budaya Indonesia.', '2024-12-05', '08:00:00', 'Lapangan Desa Sidomulyo, Jl. Lapangan No. 89', 'Selesai', 1),
('Pelatihan Pertanian Modern', 'Pelatihan teknik pertanian modern untuk meningkatkan hasil panen warga desa. Peserta akan diajarkan cara menggunakan teknologi pertanian terkini.', '2024-12-27', '09:00:00', 'Kebun Percobaan Desa, Jl. Pertanian No. 12', 'Akan Datang', 1),
('Rapat RT/RW', 'Rapat koordinasi RT/RW untuk membahas program pembangunan tingkat RT dan koordinasi antar warga.', '2024-12-23', '19:30:00', 'Balai RT 01, Jl. RT 01 No. 5', 'Akan Datang', 1),
('Kegiatan Posyandu Balita', 'Kegiatan posyandu untuk balita dengan pemeriksaan tumbuh kembang dan pemberian makanan tambahan.', '2024-12-19', '08:00:00', 'Poskesdes Sidomulyo, Jl. Kesehatan No. 45', 'Akan Datang', 1),
('Pelatihan Keterampilan Wanita', 'Pelatihan keterampilan untuk wanita desa seperti menjahit, memasak, dan kerajinan tangan untuk meningkatkan ekonomi keluarga.', '2024-12-26', '13:00:00', 'Aula Desa Sidomulyo, Kompleks Kantor Desa', 'Akan Datang', 1),
('Sosialisasi Program Bantuan Sosial', 'Sosialisasi program bantuan sosial pemerintah untuk warga kurang mampu. Acara ini akan menjelaskan syarat dan prosedur pengajuan bantuan.', '2024-12-24', '14:00:00', 'Balai Desa Sidomulyo, Jl. Raya Sidomulyo No. 123', 'Akan Datang', 1),
('Kegiatan Olahraga Bersama', 'Kegiatan olahraga bersama warga desa untuk menjaga kesehatan dan kebugaran. Acara ini akan diisi dengan senam pagi dan permainan tradisional.', '2024-12-29', '06:00:00', 'Lapangan Desa Sidomulyo, Jl. Lapangan No. 89', 'Akan Datang', 1),
('Rapat Evaluasi Program Desa', 'Rapat evaluasi program pembangunan desa yang telah dilaksanakan selama tahun ini dan perencanaan untuk tahun depan.', '2024-12-31', '09:00:00', 'Balai Desa Sidomulyo, Ruang Rapat Utama', 'Akan Datang', 1);

-- Insert sample statistik (hanya jika belum ada)
INSERT IGNORE INTO statistik (kategori, nilai, satuan, deskripsi, tahun) VALUES
('Total Penduduk', 2350, 'orang', 'Jumlah penduduk desa', 2024),
('Jumlah Keluarga', 670, 'KK', 'Jumlah kepala keluarga', 2024),
('Luas Wilayah', 1250, 'hektar', 'Luas wilayah desa', 2024),
('Jumlah RT', 15, 'RT', 'Jumlah Rukun Tetangga', 2024);

-- Insert sample pariwisata (hanya jika belum ada)
INSERT IGNORE INTO pariwisata (nama, deskripsi, lokasi, kategori) VALUES
('Wisata Alam Gunung', 'Wisata alam dengan pemandangan gunung yang indah', 'Dusun Sidomulyo', 'Wisata Alam'),
('Kolam Renang Desa', 'Kolam renang umum untuk warga desa', 'Pusat Desa', 'Wisata Buatan');

-- Insert sample lembaga (hanya jika belum ada)
INSERT IGNORE INTO lembaga (nama, deskripsi, ketua, no_hp) VALUES
('BPD', 'Badan Permusyawaratan Desa', 'Budi Santoso', '081234567890'),
('PKK', 'Pemberdayaan Kesejahteraan Keluarga', 'Siti Aminah', '081234567891'),
('Karang Taruna', 'Organisasi pemuda desa', 'Joko Widodo', '081234567892');

-- Insert default kontak desa (hanya jika belum ada)
INSERT IGNORE INTO kontak_desa (id, alamat, email, whatsapp, instagram, facebook) VALUES
(1, 'Desa Sidomulyo, Kec. Jabung, Kabupaten Malang, Jawa Timur', 'sidomulyo@desa.id', '081234567890', '@sidomulyo.desa', 'Desa Sidomulyo');

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

-- Index untuk tabel pengumuman
CREATE INDEX idx_pengumuman_kategori ON pengumuman(kategori);
CREATE INDEX idx_pengumuman_tanggal ON pengumuman(tanggal);
CREATE INDEX idx_pengumuman_created_by ON pengumuman(created_by);

-- Index untuk tabel agenda
CREATE INDEX idx_agenda_tanggal ON agenda(tanggal);
CREATE INDEX idx_agenda_status ON agenda(status);
CREATE INDEX idx_agenda_created_by ON agenda(created_by);

-- Index untuk tabel statistik
CREATE INDEX idx_statistik_kategori ON statistik(kategori);
CREATE INDEX idx_statistik_tahun ON statistik(tahun);

-- =====================================================
-- Selesai Setup Database
-- =====================================================

SELECT 'Database WebSidomulyo berhasil dibuat!' as status;
SELECT 'Silakan jalankan aplikasi dengan npm run dev' as next_step; 