-- =====================================================
-- Database Setup WebSidomulyo - VERSI SIAP PAKAI
-- =====================================================

-- Hapus database jika sudah ada (untuk fresh start)
DROP DATABASE IF EXISTS websidomulyo;

-- Buat database baru
CREATE DATABASE websidomulyo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE websidomulyo;

-- =====================================================
-- Tabel Users
-- =====================================================
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  no_hp VARCHAR(20),
  role ENUM('admin', 'warga') DEFAULT 'warga',
  profile_image VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Berita
-- =====================================================
CREATE TABLE berita (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  kategori VARCHAR(50) NOT NULL,
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
CREATE TABLE surat (
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
  status ENUM('Menunggu', 'Diproses', 'Selesai', 'Ditolak') DEFAULT 'Menunggu',
  keterangan TEXT,
  tanggal_pengajuan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tanggal_selesai TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- Tabel Lampiran Surat
-- =====================================================
CREATE TABLE lampiran_surat (
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
CREATE TABLE pengaduan (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  no_hp VARCHAR(20) NOT NULL,
  alamat TEXT,
  judul VARCHAR(255) NOT NULL,
  uraian TEXT NOT NULL,
  lampiran VARCHAR(255),
  nik VARCHAR(16) NOT NULL,
  tanggal_pengaduan DATE NOT NULL,
  status ENUM('Baru', 'Diproses', 'Selesai', 'Ditolak') DEFAULT 'Baru',
  keterangan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- Tabel Statistik
-- =====================================================
CREATE TABLE statistik (
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
-- Tabel Pengumuman
-- =====================================================
CREATE TABLE pengumuman (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  kategori VARCHAR(50) NOT NULL,
  img VARCHAR(255),
  tanggal DATE NOT NULL,
  desc TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- Tabel Agenda
-- =====================================================
CREATE TABLE agenda (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  deskripsi TEXT NOT NULL,
  tanggal DATE NOT NULL,
  waktu TIME NOT NULL,
  lokasi VARCHAR(255) NOT NULL,
  status ENUM('Akan Datang', 'Sedang Berlangsung', 'Selesai', 'Dibatalkan') DEFAULT 'Akan Datang',
  img VARCHAR(255),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- Tabel Pariwisata
-- =====================================================
CREATE TABLE pariwisata (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(255) NOT NULL,
  deskripsi TEXT NOT NULL,
  lokasi VARCHAR(255),
  img VARCHAR(255),
  kategori VARCHAR(50),
  harga_tiket DECIMAL(10,2),
  jam_buka TIME,
  jam_tutup TIME,
  fasilitas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Lembaga
-- =====================================================
CREATE TABLE lembaga (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  ketua VARCHAR(100),
  no_hp VARCHAR(20),
  alamat TEXT,
  img VARCHAR(255),
  email VARCHAR(100),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Kontak Desa
-- =====================================================
CREATE TABLE kontak_desa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  alamat VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(30),
  instagram VARCHAR(100),
  facebook VARCHAR(100),
  youtube VARCHAR(100),
  twitter VARCHAR(100),
  telepon VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Struktur Organisasi
-- =====================================================
CREATE TABLE struktur_organisasi (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(100) NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  foto VARCHAR(255),
  no_hp VARCHAR(20),
  email VARCHAR(100),
  urutan INT DEFAULT 0,
  status ENUM('Aktif', 'Tidak Aktif') DEFAULT 'Aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Tentang Desa
-- =====================================================
CREATE TABLE tentang_desa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  judul VARCHAR(255) NOT NULL,
  konten TEXT NOT NULL,
  jenis ENUM('Sejarah', 'Visi', 'Misi', 'Geografis', 'Demografis', 'Lainnya') NOT NULL,
  urutan INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel Pesan Kontak
-- =====================================================
CREATE TABLE pesan_kontak (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subjek VARCHAR(255) NOT NULL,
  pesan TEXT NOT NULL,
  status ENUM('Baru', 'Dibaca', 'Dibalas') DEFAULT 'Baru',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Insert Data Default
-- =====================================================

-- Insert admin user default
INSERT INTO users (username, password_hash, nama, email, role) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator Desa', 'admin@sidomulyo.com', 'admin');

-- Insert sample berita
INSERT INTO berita (title, content, kategori, tanggal, created_by) VALUES
('Pembangunan Jalan Desa Selesai', 'Pembangunan jalan desa sepanjang 2 kilometer telah selesai dan siap digunakan oleh warga. Jalan ini menghubungkan Dusun Timur dengan Dusun Barat dan akan memudahkan akses transportasi warga.', 'Pembangunan', '2024-12-15', 1),
('Kegiatan Posyandu Rutin', 'Kegiatan posyandu rutin bulanan untuk balita dan lansia telah dilaksanakan dengan baik. Sebanyak 45 balita dan 23 lansia mengikuti kegiatan ini.', 'Kesehatan', '2024-12-20', 1),
('Rapat Koordinasi RT/RW', 'Rapat koordinasi rutin untuk membahas program desa dan evaluasi kinerja perangkat desa dalam melayani masyarakat telah dilaksanakan.', 'Sosial', '2024-12-25', 1),
('Pelatihan UMKM Desa', 'Pelatihan pengembangan usaha mikro kecil menengah untuk warga desa dengan fokus pada digital marketing dan pengelolaan keuangan telah berhasil dilaksanakan.', 'Ekonomi', '2024-12-28', 1),
('Gotong Royong Bersih Desa', 'Kegiatan gotong royong membersihkan lingkungan desa dan perbaikan infrastruktur jalan kampung telah dilaksanakan dengan partisipasi tinggi dari warga.', 'Sosial', '2024-12-30', 1);

-- Insert sample pengumuman
INSERT INTO pengumuman (title, content, kategori, tanggal, desc, created_by) VALUES
('Pemadaman Listrik Sementara', 'Akan ada pemadaman listrik di wilayah Dusun Barat pada 15 Januari 2025 pukul 09.00-15.00 WIB. Mohon warga mempersiapkan diri dan mengantisipasi kebutuhan listrik selama pemadaman berlangsung. Pemadaman ini dilakukan untuk perbaikan jaringan listrik.', 'Penting', '2025-01-13', 'Pemadaman listrik di Dusun Barat untuk perbaikan jaringan', 1),
('Pendaftaran Bantuan Sosial', 'Pendaftaran bantuan sosial untuk warga kurang mampu dibuka hingga 20 Januari 2025. Silakan datang ke kantor desa dengan membawa dokumen pendukung seperti KK, KTP, dan surat keterangan tidak mampu.', 'Informasi', '2025-01-12', 'Pendaftaran bantuan sosial untuk warga kurang mampu', 1),
('Jadwal Posyandu Bulan Januari', 'Posyandu akan dilaksanakan pada 18 Januari 2025 di balai desa mulai pukul 08.00 WIB. Diharapkan seluruh ibu dan balita hadir tepat waktu untuk pemeriksaan kesehatan rutin.', 'Kesehatan', '2025-01-11', 'Jadwal posyandu bulan Januari 2025', 1),
('Pelatihan Keterampilan Wanita', 'Pelatihan keterampilan untuk wanita desa seperti menjahit, memasak, dan kerajinan tangan akan dilaksanakan pada 25 Januari 2025. Pendaftaran dibuka hingga 20 Januari 2025.', 'Ekonomi', '2025-01-10', 'Pelatihan keterampilan untuk wanita desa', 1),
('Sosialisasi Program Desa', 'Sosialisasi program pembangunan desa dan pengenalan aplikasi digital untuk layanan warga akan dilaksanakan pada 22 Januari 2025 di balai desa.', 'Informasi', '2025-01-09', 'Sosialisasi program pembangunan desa', 1);

-- Insert sample agenda
INSERT INTO agenda (title, deskripsi, tanggal, waktu, lokasi, status, created_by) VALUES
('Rapat Koordinasi Desa', 'Rapat koordinasi bulanan untuk membahas program pembangunan desa dan evaluasi kinerja perangkat desa dalam melayani masyarakat. Acara ini akan dihadiri oleh seluruh perangkat desa dan tokoh masyarakat.', '2025-01-20', '09:00:00', 'Balai Desa Sidomulyo, Jl. Raya Sidomulyo No. 123', 'Akan Datang', 1),
('Pelatihan UMKM', 'Pelatihan pengembangan usaha mikro kecil menengah untuk warga desa dengan fokus pada digital marketing dan pengelolaan keuangan. Peserta akan mendapatkan sertifikat pelatihan.', '2025-01-25', '14:00:00', 'Aula Desa Sidomulyo, Kompleks Kantor Desa', 'Akan Datang', 1),
('Gotong Royong', 'Kegiatan gotong royong membersihkan lingkungan desa dan perbaikan infrastruktur jalan kampung. Semua warga diharapkan berpartisipasi untuk menjaga kebersihan desa.', '2025-01-15', '07:00:00', 'Seluruh Desa Sidomulyo, Mulai dari RT 01 hingga RT 15', 'Selesai', 1),
('Posyandu Lansia', 'Kegiatan posyandu untuk lansia dengan pemeriksaan kesehatan rutin dan pemberian vitamin. Diharapkan seluruh lansia hadir untuk pemeriksaan kesehatan berkala.', '2025-01-18', '08:00:00', 'Poskesdes Sidomulyo, Jl. Kesehatan No. 45', 'Sedang Berlangsung', 1),
('Sosialisasi Program Desa', 'Sosialisasi program pembangunan desa dan pengenalan aplikasi digital untuk layanan warga. Acara ini akan menjelaskan berbagai program pemerintah desa yang sedang berjalan.', '2025-01-22', '19:00:00', 'Masjid Al-Ikhlas, Jl. Masjid No. 67', 'Akan Datang', 1),
('Festival Kuliner Desa', 'Festival kuliner tradisional dan modern hasil kreasi warga desa Sidomulyo. Acara ini akan menampilkan berbagai makanan khas desa dan lomba masak antar RT.', '2025-01-28', '16:00:00', 'Lapangan Desa Sidomulyo, Jl. Lapangan No. 89', 'Akan Datang', 1),
('Pelatihan Kader Posyandu', 'Pelatihan kader posyandu untuk meningkatkan pelayanan kesehatan masyarakat desa. Peserta akan dilatih tentang cara memberikan pelayanan kesehatan yang baik.', '2025-01-30', '08:00:00', 'Balai Desa Sidomulyo, Ruang Rapat Utama', 'Akan Datang', 1);

-- Insert sample statistik
INSERT INTO statistik (kategori, nilai, satuan, deskripsi, tahun) VALUES
('Total Penduduk', 2350, 'orang', 'Jumlah penduduk desa Sidomulyo', 2024),
('Jumlah Keluarga', 670, 'KK', 'Jumlah kepala keluarga', 2024),
('Luas Wilayah', 1250, 'hektar', 'Luas wilayah desa Sidomulyo', 2024),
('Jumlah RT', 15, 'RT', 'Jumlah Rukun Tetangga', 2024),
('Jumlah RW', 3, 'RW', 'Jumlah Rukun Warga', 2024),
('Penduduk Laki-laki', 1200, 'orang', 'Jumlah penduduk laki-laki', 2024),
('Penduduk Perempuan', 1150, 'orang', 'Jumlah penduduk perempuan', 2024),
('Jumlah Balita', 180, 'orang', 'Jumlah anak balita', 2024),
('Jumlah Lansia', 95, 'orang', 'Jumlah penduduk lansia', 2024);

-- Insert sample pariwisata
INSERT INTO pariwisata (nama, deskripsi, lokasi, kategori, harga_tiket, jam_buka, jam_tutup, fasilitas) VALUES
('Wisata Alam Gunung Sidomulyo', 'Wisata alam dengan pemandangan gunung yang indah dan udara yang sejuk. Cocok untuk refreshing dan camping.', 'Dusun Sidomulyo', 'Wisata Alam', 15000.00, '06:00:00', '18:00:00', 'Parkir, Musholla, Toilet, Warung Makan'),
('Kolam Renang Desa', 'Kolam renang umum untuk warga desa dengan air yang bersih dan fasilitas yang lengkap.', 'Pusat Desa', 'Wisata Buatan', 10000.00, '08:00:00', '17:00:00', 'Kolam Renang, Ruang Ganti, Toilet, Kantin'),
('Taman Desa Sidomulyo', 'Taman desa yang asri dengan berbagai jenis tanaman dan tempat bersantai yang nyaman.', 'Pusat Desa', 'Wisata Buatan', 0.00, '06:00:00', '22:00:00', 'Taman, Gazebo, Tempat Bermain Anak'),
('Agrowisata Kebun Jeruk', 'Kebun jeruk yang luas dengan pemandangan yang indah. Pengunjung bisa memetik jeruk langsung dari pohon.', 'Dusun Timur', 'Agrowisata', 25000.00, '08:00:00', '16:00:00', 'Kebun Jeruk, Guide, Toilet, Warung');

-- Insert sample lembaga
INSERT INTO lembaga (nama, deskripsi, ketua, no_hp, alamat, email) VALUES
('BPD (Badan Permusyawaratan Desa)', 'Badan Permusyawaratan Desa yang bertugas membantu kepala desa dalam penyelenggaraan pemerintahan desa.', 'Budi Santoso', '081234567890', 'Jl. Raya Sidomulyo No. 123', 'bpd@sidomulyo.desa.id'),
('PKK (Pemberdayaan Kesejahteraan Keluarga)', 'Organisasi wanita desa yang bergerak di bidang pemberdayaan keluarga dan kesejahteraan masyarakat.', 'Siti Aminah', '081234567891', 'Jl. PKK No. 45', 'pkk@sidomulyo.desa.id'),
('Karang Taruna', 'Organisasi pemuda desa yang bergerak di bidang pembinaan generasi muda dan pemberdayaan masyarakat.', 'Joko Widodo', '081234567892', 'Jl. Karang Taruna No. 67', 'karangtaruna@sidomulyo.desa.id'),
('Bhabinkamtibmas', 'Bhayangkara Pembina Keamanan dan Ketertiban Masyarakat yang bertugas menjaga keamanan dan ketertiban desa.', 'Ahmad Hidayat', '081234567893', 'Jl. Keamanan No. 89', 'bhabinkamtibmas@sidomulyo.desa.id'),
('Babinsa', 'Bintara Pembina Desa yang bertugas membantu pemerintah desa dalam pembinaan wilayah.', 'Surya Pratama', '081234567894', 'Jl. Babinsa No. 12', 'babinsa@sidomulyo.desa.id'),
('LINMAS', 'Perlindungan Masyarakat yang bertugas membantu dalam penanggulangan bencana dan keamanan desa.', 'Rudi Hartono', '081234567895', 'Jl. Linmas No. 34', 'linmas@sidomulyo.desa.id'),
('Poskesdes', 'Pos Kesehatan Desa yang memberikan pelayanan kesehatan dasar kepada masyarakat desa.', 'dr. Sarah Putri', '081234567896', 'Jl. Kesehatan No. 56', 'poskesdes@sidomulyo.desa.id'),
('Koperasi Wanita', 'Koperasi yang bergerak di bidang pemberdayaan ekonomi wanita desa.', 'Nurul Hidayah', '081234567897', 'Jl. Koperasi No. 78', 'koperasi@sidomulyo.desa.id'),
('Kelompok Tani', 'Kelompok tani yang bergerak di bidang pertanian dan pemberdayaan petani desa.', 'Sukardi', '081234567898', 'Jl. Pertanian No. 90', 'tani@sidomulyo.desa.id'),
('Dharma Wanita', 'Organisasi istri PNS yang bergerak di bidang sosial dan pemberdayaan wanita.', 'Sri Wahyuni', '081234567899', 'Jl. Dharma Wanita No. 23', 'dharmawanita@sidomulyo.desa.id');

-- Insert default kontak desa
INSERT INTO kontak_desa (alamat, email, whatsapp, instagram, facebook, youtube, twitter, telepon) VALUES
('Desa Sidomulyo, Kec. Jabung, Kabupaten Malang, Jawa Timur 65154', 'sidomulyo@desa.id', '081234567890', '@sidomulyo.desa', 'Desa Sidomulyo', '@sidomulyo.desa', '@sidomulyo_desa', '0341-123456');

-- Insert sample struktur organisasi
INSERT INTO struktur_organisasi (nama, jabatan, no_hp, email, urutan, status) VALUES
('Sukardi, S.Pd', 'Kepala Desa', '081234567890', 'kepaladesa@sidomulyo.desa.id', 1, 'Aktif'),
('Budi Santoso', 'Sekretaris Desa', '081234567891', 'sekretaris@sidomulyo.desa.id', 2, 'Aktif'),
('Siti Aminah', 'Kaur Pemerintahan', '081234567892', 'pemerintahan@sidomulyo.desa.id', 3, 'Aktif'),
('Joko Widodo', 'Kaur Pembangunan', '081234567893', 'pembangunan@sidomulyo.desa.id', 4, 'Aktif'),
('Ahmad Hidayat', 'Kaur Keuangan', '081234567894', 'keuangan@sidomulyo.desa.id', 5, 'Aktif'),
('Sarah Putri', 'Kaur Kesejahteraan Rakyat', '081234567895', 'kesra@sidomulyo.desa.id', 6, 'Aktif'),
('Rudi Hartono', 'Kaur Umum', '081234567896', 'umum@sidomulyo.desa.id', 7, 'Aktif'),
('Nurul Hidayah', 'Kaur Pelayanan', '081234567897', 'pelayanan@sidomulyo.desa.id', 8, 'Aktif');

-- Insert sample tentang desa
INSERT INTO tentang_desa (judul, konten, jenis, urutan) VALUES
('Sejarah Desa Sidomulyo', 'Desa Sidomulyo didirikan pada tahun 1920 oleh sekelompok petani yang mencari lahan pertanian yang subur. Nama Sidomulyo berasal dari kata "Sido" yang berarti menjadi dan "Mulyo" yang berarti makmur, sehingga Sidomulyo berarti menjadi makmur. Desa ini awalnya hanya terdiri dari beberapa keluarga yang kemudian berkembang menjadi desa yang besar dan makmur seperti sekarang ini.', 'Sejarah', 1),
('Visi Desa Sidomulyo', 'Terwujudnya Desa Sidomulyo yang maju, mandiri, dan sejahtera dengan masyarakat yang beriman, berbudaya, dan berdaya saing tinggi dalam pembangunan yang berkelanjutan.', 'Visi', 2),
('Misi Desa Sidomulyo', '1. Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan\n2. Mengembangkan perekonomian desa berbasis pertanian dan UMKM\n3. Meningkatkan kualitas infrastruktur desa\n4. Mengembangkan potensi wisata desa\n5. Meningkatkan pelayanan publik yang berkualitas\n6. Mewujudkan tata kelola pemerintahan desa yang baik dan bersih', 'Misi', 3),
('Kondisi Geografis', 'Desa Sidomulyo terletak di Kecamatan Jabung, Kabupaten Malang, Jawa Timur. Luas wilayah desa adalah 1.250 hektar dengan ketinggian 450-600 meter di atas permukaan laut. Desa ini memiliki iklim tropis dengan curah hujan yang cukup tinggi. Topografi desa terdiri dari dataran rendah dan perbukitan yang cocok untuk pertanian.', 'Geografis', 4),
('Kondisi Demografis', 'Jumlah penduduk Desa Sidomulyo sebanyak 2.350 jiwa yang terdiri dari 1.200 laki-laki dan 1.150 perempuan. Jumlah kepala keluarga sebanyak 670 KK. Penduduk desa mayoritas bekerja sebagai petani, pedagang, dan pegawai. Tingkat pendidikan penduduk cukup beragam dari SD hingga perguruan tinggi.', 'Demografis', 5);

-- Insert sample pesan kontak
INSERT INTO pesan_kontak (nama, email, subjek, pesan, status) VALUES
('Ahmad Fauzi', 'ahmad@email.com', 'Informasi Surat Keterangan', 'Saya ingin menanyakan tentang prosedur pengajuan surat keterangan domisili. Mohon informasi lengkapnya.', 'Baru'),
('Siti Nurhaliza', 'siti@email.com', 'Pengaduan Jalan Rusak', 'Jalan di depan rumah saya sudah rusak parah dan sulit dilalui. Mohon segera diperbaiki.', 'Dibaca'),
('Budi Prasetyo', 'budi@email.com', 'Informasi Bantuan Sosial', 'Saya ingin menanyakan tentang bantuan sosial untuk warga kurang mampu. Apakah masih ada kuota?', 'Dibalas');

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
CREATE INDEX idx_pengaduan_user_id ON pengaduan(user_id);
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

-- Index untuk tabel pariwisata
CREATE INDEX idx_pariwisata_kategori ON pariwisata(kategori);

-- Index untuk tabel lembaga
CREATE INDEX idx_lembaga_nama ON lembaga(nama);

-- Index untuk tabel struktur_organisasi
CREATE INDEX idx_struktur_urutan ON struktur_organisasi(urutan);
CREATE INDEX idx_struktur_status ON struktur_organisasi(status);

-- Index untuk tabel tentang_desa
CREATE INDEX idx_tentang_jenis ON tentang_desa(jenis);
CREATE INDEX idx_tentang_urutan ON tentang_desa(urutan);

-- Index untuk tabel pesan_kontak
CREATE INDEX idx_pesan_status ON pesan_kontak(status);
CREATE INDEX idx_pesan_created_at ON pesan_kontak(created_at);

-- =====================================================
-- Views untuk kemudahan akses data
-- =====================================================

-- View untuk statistik penduduk
CREATE VIEW v_statistik_penduduk AS
SELECT 
    'Total Penduduk' as kategori,
    nilai as jumlah,
    satuan,
    deskripsi
FROM statistik 
WHERE kategori IN ('Total Penduduk', 'Jumlah Keluarga', 'Penduduk Laki-laki', 'Penduduk Perempuan', 'Jumlah Balita', 'Jumlah Lansia')
ORDER BY kategori;

-- View untuk agenda yang akan datang
CREATE VIEW v_agenda_akan_datang AS
SELECT 
    id,
    title,
    deskripsi,
    tanggal,
    waktu,
    lokasi,
    status
FROM agenda 
WHERE status = 'Akan Datang' AND tanggal >= CURDATE()
ORDER BY tanggal ASC, waktu ASC;

-- View untuk berita terbaru
CREATE VIEW v_berita_terbaru AS
SELECT 
    id,
    title,
    content,
    kategori,
    img,
    tanggal,
    created_at
FROM berita 
ORDER BY created_at DESC
LIMIT 10;

-- =====================================================
-- Stored Procedures untuk operasi umum
-- =====================================================

DELIMITER //

-- Procedure untuk mendapatkan statistik desa
CREATE PROCEDURE GetStatistikDesa()
BEGIN
    SELECT kategori, nilai, satuan, deskripsi, tahun
    FROM statistik
    ORDER BY kategori;
END //

-- Procedure untuk mendapatkan agenda bulan ini
CREATE PROCEDURE GetAgendaBulanIni()
BEGIN
    SELECT id, title, deskripsi, tanggal, waktu, lokasi, status
    FROM agenda
    WHERE MONTH(tanggal) = MONTH(CURDATE()) AND YEAR(tanggal) = YEAR(CURDATE())
    ORDER BY tanggal ASC, waktu ASC;
END //

-- Procedure untuk mendapatkan berita berdasarkan kategori
CREATE PROCEDURE GetBeritaByKategori(IN kategori_param VARCHAR(50))
BEGIN
    SELECT id, title, content, kategori, img, tanggal, created_at
    FROM berita
    WHERE kategori = kategori_param
    ORDER BY created_at DESC;
END //

-- Procedure untuk update status surat
CREATE PROCEDURE UpdateStatusSurat(IN surat_id INT, IN status_baru VARCHAR(20), IN keterangan_param TEXT)
BEGIN
    UPDATE surat 
    SET status = status_baru, 
        keterangan = keterangan_param,
        tanggal_selesai = CASE WHEN status_baru = 'Selesai' THEN NOW() ELSE tanggal_selesai END,
        updated_at = NOW()
    WHERE id = surat_id;
END //

DELIMITER ;

-- =====================================================
-- Triggers untuk audit trail
-- =====================================================

DELIMITER //

-- Trigger untuk log perubahan pada tabel users
CREATE TRIGGER users_audit_trigger
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO users_audit_log (user_id, action, old_values, new_values, changed_at)
    VALUES (NEW.id, 'UPDATE', 
            CONCAT('username:', OLD.username, ',email:', OLD.email, ',role:', OLD.role),
            CONCAT('username:', NEW.username, ',email:', NEW.email, ',role:', NEW.role),
            NOW());
END //

DELIMITER ;

-- =====================================================
-- Tabel Audit Log (opsional)
-- =====================================================

CREATE TABLE users_audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(20),
    old_values TEXT,
    new_values TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- Konfigurasi Database Selesai
-- =====================================================

-- Tampilkan pesan sukses
SELECT 'Database WebSidomulyo berhasil dibuat dan siap digunakan!' as status; 