-- =====================================================
-- Database Setup WebSidomulyo - VERSI FIX BANGET
-- =====================================================
-- File ini berisi semua konfigurasi database yang sudah benar
-- untuk lembaga desa dengan struktur yang lengkap
-- Bisa digunakan saat hosting dan pindah laptop
-- =====================================================

-- Hapus database jika sudah ada (untuk fresh start)
DROP DATABASE IF EXISTS websidomulyo;

-- Buat database baru dengan encoding yang benar
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
-- Tabel Pengumuman
-- =====================================================
CREATE TABLE pengumuman (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  kategori VARCHAR(50),
  img VARCHAR(255),
  tanggal DATE,
  deskripsi TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
-- Tabel Lembaga (STRUKTUR BARU UNTUK LEMBAGA DESA)
-- =====================================================
CREATE TABLE lembaga_desa ( 
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_lembaga VARCHAR(255) NOT NULL UNIQUE,
  tentang TEXT,
  visi TEXT,
  misi TEXT,
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
-- Tabel Pengurus Lembaga
-- =====================================================
CREATE TABLE pengurus_lembaga (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lembaga_id INT NOT NULL,
  nama VARCHAR(100) NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  foto VARCHAR(255),
  no_hp VARCHAR(20),
  email VARCHAR(100),
  urutan INT DEFAULT 0,
  status ENUM('Aktif', 'Tidak Aktif') DEFAULT 'Aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (lembaga_id) REFERENCES lembaga_desa(id) ON DELETE CASCADE
);

-- =====================================================
-- Tabel Unit Kegiatan Lembaga
-- =====================================================
CREATE TABLE unit_kegiatan_lembaga (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lembaga_id INT NOT NULL,
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  icon VARCHAR(255),
  urutan INT DEFAULT 0,
  status ENUM('Aktif', 'Tidak Aktif') DEFAULT 'Aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (lembaga_id) REFERENCES lembaga_desa(id) ON DELETE CASCADE
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
  tipe ENUM('kepala_desa', 'sekretaris', 'kaur', 'kasi', 'kasun') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Dummy
INSERT INTO struktur_organisasi (nama, jabatan, foto, tipe) VALUES
('Mulianto', 'Kepala Desa', NULL, 'kepala_desa'),
('Sunarsih', 'Sekretaris Desa', NULL, 'sekretaris'),
('M. Agus Wahyudi Z', 'Kasi Pemerintahan', NULL, 'kasi'),
('Muhammad Rifai', 'Kasi Kesra', NULL, 'kasi'),
('Subur', 'Kasi Pelayanan', NULL, 'kasi'),
('Wahyu Nur H', 'Kaur TU & Umum', NULL, 'kaur'),
('Titin Juharnani', 'Kaur Keuangan', NULL, 'kaur'),
('Rachmad Irvan N.I', 'Kaur Perencanaan', NULL, 'kaur'),
('M. Jamhuri', 'Kasun Bareng', NULL, 'kasun'),
('Fathul Mu''in', 'Kasun Tebelo', NULL, 'kasun'),
('Eko Hendri S', 'Kasun Mangunrejo', NULL, 'kasun'),
('Saparu', 'Kasun Sumberkreco', NULL, 'kasun');


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
-- Insert Data Default - VERSI FIX BANGET
-- =====================================================

-- Insert admin user default
INSERT INTO users (username, password_hash, nama, email, role) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@sidomulyo.com', 'admin');

-- Insert lembaga desa dengan nama yang benar (sesuai dengan frontend)
INSERT INTO lembaga_desa (nama_lembaga, tentang, visi, misi, ketua, no_hp, alamat) VALUES
('BPD', 'Badan Permusyawaratan Desa (BPD) adalah lembaga yang melaksanakan fungsi pemerintahan yang anggotanya merupakan wakil dari penduduk desa berdasarkan keterwakilan wilayah dan ditetapkan secara demokratis.', 'Terwujudnya Badan Permusyawaratan Desa yang profesional, transparan, dan akuntabel dalam melaksanakan fungsi legislasi, anggaran, dan pengawasan untuk mewujudkan desa yang mandiri dan sejahtera.', '1. Melaksanakan fungsi legislasi dalam pembentukan peraturan desa\n2. Melaksanakan fungsi anggaran dalam penyusunan dan penetapan APBDes\n3. Melaksanakan fungsi pengawasan terhadap pelaksanaan peraturan desa dan APBDes\n4. Menampung dan menyalurkan aspirasi masyarakat desa', 'Budi Santoso', '081234567890', 'Kantor Desa Sidomulyo'),
('LPM', 'Lembaga Pemberdayaan Masyarakat (LPM) adalah lembaga yang dibentuk oleh masyarakat sesuai kebutuhan dan merupakan mitra pemerintah desa dalam memberdayakan masyarakat.', 'Terwujudnya masyarakat desa yang mandiri, berdaya saing, dan sejahtera melalui pemberdayaan yang berkelanjutan.', '1. Mendorong partisipasi masyarakat dalam pembangunan desa\n2. Mengembangkan potensi ekonomi masyarakat\n3. Meningkatkan kualitas sumber daya manusia\n4. Memperkuat kelembagaan masyarakat', 'Siti Aminah', '081234567891', 'Balai Desa Sidomulyo'),
('PKK', 'Pemberdayaan Kesejahteraan Keluarga (PKK) adalah organisasi kemasyarakatan yang memberdayakan wanita untuk turut berpartisipasi dalam pembangunan desa.', 'Terwujudnya keluarga yang sehat, cerdas, dan sejahtera menuju keluarga berkualitas.', '1. Meningkatkan kualitas hidup keluarga\n2. Mengembangkan program kesehatan keluarga\n3. Meningkatkan pendidikan dan keterampilan\n4. Mengembangkan ekonomi keluarga', 'Nurul Hidayah', '081234567892', 'Kantor PKK Desa Sidomulyo'),
('Karang Taruna', 'Karang Taruna adalah organisasi kepemudaan di Indonesia yang dibentuk oleh masyarakat sebagai wadah generasi muda untuk mengembangkan diri, tumbuh, dan berkembang atas dasar kesadaran dan tanggung jawab sosial.', 'Terwujudnya generasi muda yang beriman, bertaqwa, mandiri, dan berkualitas untuk membangun desa yang maju dan sejahtera.', '1. Mengembangkan kreativitas dan inovasi pemuda\n2. Meningkatkan keterampilan dan wawasan pemuda\n3. Mengembangkan kegiatan sosial kemasyarakatan\n4. Mendorong partisipasi pemuda dalam pembangunan', 'Joko Widodo', '081234567893', 'Sekretariat Karang Taruna'),
('Kelompok Tani', 'Kelompok Tani adalah kumpulan petani/peternak/pekebun yang dibentuk atas dasar kesamaan kepentingan, kesamaan kondisi lingkungan (sosial, ekonomi, sumberdaya) dan keakraban untuk meningkatkan dan mengembangkan usaha anggota.', 'Terwujudnya petani yang mandiri, sejahtera, dan berkelanjutan dalam pengelolaan pertanian modern.', '1. Meningkatkan produksi pertanian\n2. Mengembangkan teknologi pertanian modern\n3. Meningkatkan kesejahteraan petani\n4. Mengembangkan pemasaran hasil pertanian', 'Sukarno', '081234567894', 'Kantor Kelompok Tani'),
('Koperasi Wanita', 'Koperasi Wanita adalah koperasi yang anggotanya terdiri dari wanita yang bertujuan untuk meningkatkan kesejahteraan ekonomi anggotanya.', 'Terwujudnya koperasi wanita yang mandiri dan mampu meningkatkan kesejahteraan ekonomi anggotanya.', '1. Meningkatkan peran wanita dalam ekonomi\n2. Mengembangkan usaha produktif wanita\n3. Meningkatkan akses modal usaha\n4. Mengembangkan jaringan pemasaran', 'Sri Wahyuni', '081234567895', 'Kantor Koperasi Wanita'),
('Dharma Wanita', 'Dharma Wanita adalah organisasi yang beranggotakan istri dari pegawai negeri sipil yang bertujuan untuk meningkatkan kesejahteraan keluarga PNS.', 'Terwujudnya keluarga PNS yang harmonis, sejahtera, dan berkualitas.', '1. Meningkatkan kesejahteraan keluarga PNS\n2. Mengembangkan keterampilan wanita\n3. Meningkatkan pendidikan keluarga\n4. Mengembangkan kegiatan sosial', 'Dewi Sartika', '081234567896', 'Kantor Dharma Wanita'),
('LINMAS', 'LINMAS adalah Perlindungan Masyarakat yang berperan dalam menjaga keamanan dan ketertiban di desa.', 'Menjadi garda terdepan dalam perlindungan masyarakat dan penanggulangan bencana di desa.', '1. Meningkatkan kesiapsiagaan masyarakat terhadap bencana dan gangguan keamanan\n2. Mendorong partisipasi aktif warga dalam menjaga ketertiban\n3. Membangun sinergi dengan aparat keamanan dan lembaga desa lainnya.', 'Rudi Hartono', '081234567895', 'Jl. Linmas No. 34'),
('Bhabinkamtibmas', 'Bhabinkamtibmas adalah Bhayangkara Pembina Keamanan dan Ketertiban Masyarakat yang membina keamanan dan ketertiban di desa.', 'Menjadi mitra masyarakat dalam menciptakan lingkungan desa yang aman dan kondusif.', '1. Meningkatkan kesadaran hukum dan keamanan di masyarakat\n2. Membangun komunikasi yang baik antara polisi dan warga\n3. Mencegah terjadinya tindak kriminalitas di desa.', 'Ahmad Hidayat', '081234567893', 'Jl. Keamanan No. 89'),
('Babinsa', 'Babinsa adalah Bintara Pembina Desa yang membina pertahanan dan keamanan di desa.', 'Menjadi pelindung dan pembina masyarakat desa dalam bidang pertahanan dan keamanan.', '1. Meningkatkan kesadaran bela negara di masyarakat\n2. Membangun kemitraan dengan warga dalam menjaga keamanan\n3. Mendukung ketahanan dan kemandirian desa.', 'Surya Pratama', '081234567894', 'Jl. Babinsa No. 12'),
('Poskesdes', 'Poskesdes (Pos Kesehatan Desa) adalah fasilitas pelayanan kesehatan tingkat desa yang memberikan pelayanan kesehatan dasar bagi masyarakat.', 'Menjadi pusat pelayanan kesehatan masyarakat desa yang profesional dan terjangkau.', '1. Meningkatkan akses dan mutu pelayanan kesehatan di desa\n2. Mendorong perilaku hidup bersih dan sehat\n3. Mendukung program kesehatan pemerintah di tingkat desa.', 'dr. Sarah Putri', '081234567896', 'Jl. Kesehatan No. 56');

-- Insert sample berita
INSERT INTO berita (title, content, kategori, tanggal, created_by) VALUES
('Pembangunan Jalan Desa', 'Pembangunan jalan desa telah selesai dan siap digunakan oleh warga. Jalan ini menghubungkan beberapa dusun di desa Sidomulyo dan akan memudahkan akses transportasi warga.', 'Pembangunan', '2024-01-15', 1),
('Kegiatan Posyandu', 'Kegiatan posyandu rutin bulanan untuk balita dan lansia telah dilaksanakan dengan baik. Kegiatan ini diikuti oleh 50 balita dan 30 lansia.', 'Kesehatan', '2024-01-20', 1),
('Rapat Koordinasi RT/RW', 'Rapat koordinasi rutin untuk membahas program desa telah dilaksanakan. Rapat ini membahas tentang pembangunan infrastruktur dan pemberdayaan masyarakat.', 'Sosial', '2024-01-25', 1);

-- Insert sample pengumuman
INSERT INTO pengumuman (title, content, kategori, tanggal, deskripsi, created_by) VALUES
('Pemadaman Listrik Sementara', 'Akan ada pemadaman listrik di wilayah Dusun Barat pada 15 Januari 2025 pukul 09.00-15.00 WIB. Mohon warga mempersiapkan diri dan mengantisipasi kebutuhan listrik selama pemadaman berlangsung.', 'Penting', '2025-01-13', 'Akan ada pemadaman listrik di wilayah Dusun Barat pada 15 Januari 2025 pukul 09.00-15.00 WIB.', 1),
('Pendaftaran Bantuan Sosial Dibuka', 'Pendaftaran bantuan sosial untuk warga kurang mampu dibuka hingga 20 Januari 2025. Silakan datang ke kantor desa dengan membawa dokumen pendukung.', 'Informasi', '2025-01-12', 'Pendaftaran bantuan sosial untuk warga kurang mampu dibuka hingga 20 Januari 2025.', 1),
('Jadwal Posyandu Bulan Januari', 'Posyandu akan dilaksanakan pada 18 Januari 2025 di balai desa mulai pukul 08.00 WIB. Diharapkan seluruh ibu dan balita hadir tepat waktu.', 'Kesehatan', '2025-01-11', 'Posyandu akan dilaksanakan pada 18 Januari 2025 di balai desa mulai pukul 08.00 WIB.', 1);

-- Insert sample agenda
INSERT INTO agenda (title, deskripsi, tanggal, waktu, lokasi, status, created_by) VALUES
('Rapat Koordinasi Desa', 'Rapat koordinasi bulanan untuk membahas program pembangunan desa dan evaluasi kinerja perangkat desa dalam melayani masyarakat.', '2024-12-20', '09:00:00', 'Balai Desa Sidomulyo', 'Akan Datang', 1),
('Pelatihan UMKM', 'Pelatihan pengembangan usaha mikro kecil menengah untuk warga desa dengan fokus pada digital marketing dan pengelolaan keuangan.', '2024-12-25', '14:00:00', 'Aula Desa Sidomulyo', 'Akan Datang', 1),
('Gotong Royong', 'Kegiatan gotong royong membersihkan lingkungan desa dan perbaikan infrastruktur jalan kampung.', '2024-12-15', '07:00:00', 'Seluruh Desa Sidomulyo', 'Selesai', 1);

-- Insert sample statistik
INSERT INTO statistik (kategori, nilai, satuan, deskripsi, tahun) VALUES
('Total Penduduk', 2350, 'orang', 'Jumlah penduduk desa', 2024),
('Jumlah Keluarga', 670, 'KK', 'Jumlah kepala keluarga', 2024),
('Luas Wilayah', 1250, 'hektar', 'Luas wilayah desa', 2024),
('Jumlah RT', 15, 'RT', 'Jumlah Rukun Tetangga', 2024);

-- Insert default kontak desa
INSERT INTO kontak_desa (alamat, email, whatsapp, instagram, facebook) VALUES
('Desa Sidomulyo, Kec. Jabung, Kabupaten Malang, Jawa Timur', 'sidomulyo@desa.id', '081234567890', '@sidomulyo.desa', 'Desa Sidomulyo');

-- Insert sample struktur organisasi
INSERT INTO struktur_organisasi (nama, jabatan, tipe) VALUES
('Budi Santoso', 'Kepala Desa Sidomulyo', 'kepala_desa'),
('Siti Aminah', 'Sekretaris Desa', 'sekretaris'),
('Joko Widodo', 'Kasi Pemerintahan', 'kasi'),
('Nurul Hidayah', 'Kasi Kesejahteraan', 'kasi'),
('Sukarno', 'Kasi Pelayanan', 'kasi'),
('Ahmad Hidayat', 'Kaur Keuangan', 'kaur'),
('Sri Wahyuni', 'Kaur Umum', 'kaur'),
('Kasun Sidomulyo', 'Kepala Dusun Sidomulyo', 'kasun'),
('Kasun Krajan', 'Kepala Dusun Krajan', 'kasun'),
('Kasun Ngemplak', 'Kepala Dusun Ngemplak', 'kasun');

-- Insert sample tentang desa
INSERT INTO tentang_desa (judul, konten, jenis, urutan) VALUES
('Sejarah Desa', 'Desa Sidomulyo didirikan pada tahun 1920 oleh para pendatang dari berbagai daerah. Nama Sidomulyo diambil dari kata "Sido" yang berarti menjadi dan "Mulyo" yang berarti makmur, dengan harapan desa ini akan menjadi desa yang makmur dan sejahtera.', 'Sejarah', 1),
('Visi Desa', 'Terwujudnya Desa Sidomulyo yang mandiri, maju, dan sejahtera dengan masyarakat yang beriman, bertaqwa, dan berbudaya.', 'Visi', 2),
('Misi Desa', '1. Meningkatkan kualitas sumber daya manusia\n2. Mengembangkan perekonomian desa\n3. Meningkatkan infrastruktur desa\n4. Meningkatkan pelayanan publik', 'Misi', 3);

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

-- Index untuk tabel lembaga
CREATE INDEX idx_lembaga_nama ON lembaga_desa(nama_lembaga);

-- Index untuk tabel pengurus lembaga
CREATE INDEX idx_pengurus_lembaga_id ON pengurus_lembaga(lembaga_id);
CREATE INDEX idx_pengurus_status ON pengurus_lembaga(status);

-- Index untuk tabel unit kegiatan lembaga
CREATE INDEX idx_unit_lembaga_id ON unit_kegiatan_lembaga(lembaga_id);
CREATE INDEX idx_unit_status ON unit_kegiatan_lembaga(status);

-- Index untuk tabel struktur organisasi
CREATE INDEX idx_struktur_tipe ON struktur_organisasi(tipe);

-- Index untuk tabel tentang desa
CREATE INDEX idx_tentang_jenis ON tentang_desa(jenis);
CREATE INDEX idx_tentang_urutan ON tentang_desa(urutan);

-- Index untuk tabel pesan kontak
CREATE INDEX idx_pesan_status ON pesan_kontak(status);
CREATE INDEX idx_pesan_created_at ON pesan_kontak(created_at);

-- =====================================================
-- Views untuk kemudahan query
-- =====================================================

-- View untuk statistik penduduk
CREATE VIEW v_statistik_penduduk AS
SELECT kategori, nilai, satuan, deskripsi, tahun
FROM statistik
WHERE tahun = (SELECT MAX(tahun) FROM statistik);

-- View untuk agenda yang akan datang
CREATE VIEW v_agenda_akan_datang AS
SELECT id, title, deskripsi, tanggal, waktu, lokasi, status
FROM agenda
WHERE tanggal >= CURDATE() AND status = 'Akan Datang'
ORDER BY tanggal ASC, waktu ASC;

-- View untuk berita terbaru
CREATE VIEW v_berita_terbaru AS
SELECT id, title, content, kategori, img, tanggal
FROM berita
ORDER BY tanggal DESC, created_at DESC
LIMIT 10;

-- =====================================================
-- Stored Procedures untuk operasi umum
-- =====================================================

DELIMITER //

-- Procedure untuk mendapatkan data lembaga dengan pengurus dan unit kegiatan
CREATE PROCEDURE GetLembagaWithDetails(IN lembaga_name VARCHAR(255))
BEGIN
    SELECT 
        l.*,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', p.id,
                'nama', p.nama,
                'jabatan', p.jabatan,
                'foto', p.foto,
                'no_hp', p.no_hp,
                'email', p.email,
                'urutan', p.urutan,
                'status', p.status
            )
        ) as pengurus,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', u.id,
                'nama', u.nama,
                'deskripsi', u.deskripsi,
                'icon', u.icon,
                'urutan', u.urutan,
                'status', u.status
            )
        ) as unit_kegiatan
    FROM lembaga_desa l
    LEFT JOIN pengurus_lembaga p ON l.id = p.lembaga_id AND p.status = 'Aktif'
    LEFT JOIN unit_kegiatan_lembaga u ON l.id = u.lembaga_id AND u.status = 'Aktif'
    WHERE l.nama_lembaga = lembaga_name
    GROUP BY l.id;
END //

-- Procedure untuk mendapatkan semua lembaga
CREATE PROCEDURE GetAllLembaga()
BEGIN
    SELECT 
        l.*,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', p.id,
                'nama', p.nama,
                'jabatan', p.jabatan,
                'foto', p.foto,
                'no_hp', p.no_hp,
                'email', p.email,
                'urutan', p.urutan,
                'status', p.status
            )
        ) as pengurus,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', u.id,
                'nama', u.nama,
                'deskripsi', u.deskripsi,
                'icon', u.icon,
                'urutan', u.urutan,
                'status', u.status
            )
        ) as unit_kegiatan
    FROM lembaga_desa l
    LEFT JOIN pengurus_lembaga p ON l.id = p.lembaga_id AND p.status = 'Aktif'
    LEFT JOIN unit_kegiatan_lembaga u ON l.id = u.lembaga_id AND u.status = 'Aktif'
    GROUP BY l.id
    ORDER BY l.nama_lembaga;
END //

DELIMITER ;

-- =====================================================
-- Triggers untuk audit log (opsional)
-- =====================================================

-- Tabel audit log untuk users
CREATE TABLE users_audit_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
  old_data JSON,
  new_data JSON,
  changed_by INT,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger untuk audit log users
DELIMITER //
CREATE TRIGGER users_audit_trigger
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO users_audit_log (user_id, action, old_data, new_data, changed_by)
    VALUES (NEW.id, 'UPDATE', 
            JSON_OBJECT('username', OLD.username, 'email', OLD.email, 'role', OLD.role),
            JSON_OBJECT('username', NEW.username, 'email', NEW.email, 'role', NEW.role),
            NEW.id);
END //
DELIMITER ;

-- =====================================================
-- Konfigurasi Database Selesai
-- =====================================================
-- File ini sudah siap digunakan untuk:
-- 1. Hosting di server production
-- 2. Pindah ke laptop baru
-- 3. Setup database dari awal
-- 4. Backup dan restore database
-- ===================================================== 