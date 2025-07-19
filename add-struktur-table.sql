-- Menambahkan tabel struktur_organisasi ke database
-- Jalankan file ini di database MySQL

USE websidomulyo;

-- Buat tabel struktur_organisasi
CREATE TABLE IF NOT EXISTS struktur_organisasi (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(100) NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  foto VARCHAR(255),
  tipe ENUM('kepala_desa', 'sekretaris', 'kaur', 'kasi', 'kasun') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tambahkan data struktur organisasi default
INSERT INTO struktur_organisasi (nama, jabatan, tipe) VALUES
('Aghis Pratama, S.Pd', 'Kepala Desa', 'kepala_desa'),
('Siti Nurhaliza', 'Sekretaris Desa', 'sekretaris'),
('Budi Santoso', 'Kaur Keuangan', 'kaur'),
('Dewi Sartika', 'Kaur Umum', 'kaur'),
('Ahmad Hidayat', 'Kasi Pemerintahan', 'kasi'),
('Rina Marlina', 'Kasi Kesejahteraan Rakyat', 'kasi'),
('Kasun Bareng', 'Kepala Dusun Bareng', 'kasun'),
('Kasun Tebelo', 'Kepala Dusun Tebelo', 'kasun'),
('Kasun Mangunrejo', 'Kepala Dusun Mangunrejo', 'kasun'),
('Kasun Sumberkrecek', 'Kepala Dusun Sumberkrecek', 'kasun'),
('Kasun Krajan', 'Kepala Dusun Krajan', 'kasun');

-- Tambahkan index untuk optimasi query
CREATE INDEX idx_struktur_tipe ON struktur_organisasi(tipe);
CREATE INDEX idx_struktur_jabatan ON struktur_organisasi(jabatan);

-- Tampilkan hasil
SELECT * FROM struktur_organisasi ORDER BY FIELD(tipe, 'kepala_desa', 'sekretaris', 'kaur', 'kasi', 'kasun'), nama; 