ALTER TABLE pengaduan ADD COLUMN user_id INT NULL AFTER id; ALTER TABLE pengaduan ADD CONSTRAINT fk_pengaduan_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
