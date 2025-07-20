-- Migration: Menambah kolom profile_image ke tabel users
-- Tanggal: 2025-07-19

USE websidomulyo;

-- Tambah kolom profile_image ke tabel users
ALTER TABLE users 
ADD COLUMN profile_image VARCHAR(255) NULL 
AFTER no_hp;

-- Update komentar untuk dokumentasi
ALTER TABLE users 
MODIFY COLUMN profile_image VARCHAR(255) NULL COMMENT 'URL foto profil user';

-- Index untuk optimasi query
CREATE INDEX idx_users_profile_image ON users(profile_image);

-- Verifikasi perubahan
DESCRIBE users; 