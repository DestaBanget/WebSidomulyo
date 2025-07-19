-- Update data struktur organisasi sesuai dengan struktur yang benar
-- Hapus data lama terlebih dahulu
DELETE FROM struktur_organisasi;

-- Reset auto increment
ALTER TABLE struktur_organisasi AUTO_INCREMENT = 1;

-- Insert data baru sesuai struktur organisasi Sidomulyo
INSERT INTO struktur_organisasi (nama, jabatan, foto, tipe) VALUES
-- Kepala Desa
('Mulianto', 'Kepala Desa', NULL, 'kepala_desa'),

-- Sekretaris Desa
('Sunarsih', 'Sekretaris Desa', NULL, 'sekretaris'),

-- Kasi (Kepala Seksi)
('M. Agus Wahyudi Z', 'Kasi Pemerintahan', NULL, 'kasi'),
('Muhammad Rifai', 'Kasi Kesra', NULL, 'kasi'),
('Subur', 'Kasi Pelayanan', NULL, 'kasi'),

-- Kaur (Kepala Urusan)
('Wahyu Nur H', 'Kaur TU & Umum', NULL, 'kaur'),
('Titin Juharnani', 'Kaur Keuangan', NULL, 'kaur'),
('Rachmad Irvan N.I', 'Kaur Perencanaan', NULL, 'kaur'),

-- Kasun (Kepala Dusun)
('M. Jamhuri', 'Kasun Bareng', NULL, 'kasun'),
('Fathul Mu''in', 'Kasun Tebelo', NULL, 'kasun'),
('Eko Hendri S', 'Kasun Mangunrejo', NULL, 'kasun'),
('Saparu', 'Kasun Sumberkreco', NULL, 'kasun');

-- Verifikasi data
SELECT * FROM struktur_organisasi ORDER BY FIELD(tipe, 'kepala_desa', 'sekretaris', 'kasi', 'kaur', 'kasun'), nama; 