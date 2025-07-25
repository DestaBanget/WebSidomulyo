const express = require('express');
const { body, validationResult } = require('express-validator');
const { promisePool } = require('../config');
const { auth, adminAuth } = require('../middleware/auth');
const { uploadImage, uploadFlexible } = require('../middleware/upload');

const router = express.Router();

// Get all lembaga (public)
router.get('/', async (req, res) => {
  try {
    const [lembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa ORDER BY nama_lembaga'
    );

    // Get pengurus for each lembaga
    for (let i = 0; i < lembaga.length; i++) {
      const [pengurus] = await promisePool.query(
        'SELECT * FROM pengurus_lembaga WHERE lembaga_id = ? ORDER BY id',
        [lembaga[i].id]
      );
      lembaga[i].pengurus = pengurus;

      // Get unit kegiatan for each lembaga
      const [unitKegiatan] = await promisePool.query(
        'SELECT * FROM unit_kegiatan_lembaga WHERE lembaga_id = ? ORDER BY id',
        [lembaga[i].id]
      );
      lembaga[i].unit_kegiatan = unitKegiatan;
    }

    res.json({ lembaga });
  } catch (error) {
    console.error('Get lembaga error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Get lembaga by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [lembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE id = ?',
      [id]
    );

    if (lembaga.length === 0) {
      return res.status(404).json({ error: 'Lembaga tidak ditemukan' });
    }

    const [pengurus] = await promisePool.query(
      'SELECT * FROM pengurus_lembaga WHERE lembaga_id = ? ORDER BY id',
      [id]
    );

    const [unitKegiatan] = await promisePool.query(
      'SELECT * FROM unit_kegiatan_lembaga WHERE lembaga_id = ? ORDER BY id',
      [id]
    );

    res.json({ 
      lembaga: { ...lembaga[0], pengurus, unit_kegiatan: unitKegiatan } 
    });
  } catch (error) {
    console.error('Get lembaga by ID error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Create lembaga (admin only)
router.post('/', adminAuth, [
  body('nama_lembaga').notEmpty().withMessage('Nama lembaga wajib diisi'),
  body('tentang').optional(),
  body('visi').optional(),
  body('misi').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nama_lembaga, tentang, visi, misi } = req.body;

    // Check if lembaga already exists
    const [existingLembaga] = await promisePool.query(
      'SELECT id FROM lembaga_desa WHERE nama_lembaga = ?',
      [nama_lembaga]
    );

    if (existingLembaga.length > 0) {
      return res.status(400).json({ error: 'Lembaga dengan nama yang sama sudah ada' });
    }

    const [result] = await promisePool.query(
      'INSERT INTO lembaga_desa (nama_lembaga, tentang, visi, misi) VALUES (?, ?, ?, ?)',
      [nama_lembaga, tentang, visi, misi]
    );

    const [newLembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Lembaga berhasil ditambahkan',
      lembaga: newLembaga[0]
    });
  } catch (error) {
    console.error('Create lembaga error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Update lembaga (admin only)
router.put('/:nama_lembaga', adminAuth, [
  body('tentang').optional(),
  body('visi').optional(),
  body('misi').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nama_lembaga } = req.params;
    const { tentang, visi, misi } = req.body;

    // Check if lembaga exists by nama_lembaga
    const [existingLembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE nama_lembaga = ?',
      [nama_lembaga]
    );

    if (existingLembaga.length === 0) {
      return res.status(404).json({ error: 'Lembaga tidak ditemukan' });
    }

    // Update lembaga - hanya update field yang diubah, bukan nama_lembaga
    await promisePool.query(
      'UPDATE lembaga_desa SET tentang = ?, visi = ?, misi = ? WHERE nama_lembaga = ?',
      [tentang, visi, misi, nama_lembaga]
    );

    const [updatedLembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE nama_lembaga = ?',
      [nama_lembaga]
    );

    res.json({
      message: 'Lembaga berhasil diupdate',
      lembaga: updatedLembaga[0]
    });
  } catch (error) {
    console.error('Update lembaga error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Update lembaga by ID (admin only)
router.put('/id/:id', adminAuth, [
  body('tentang').optional(),
  body('visi').optional(),
  body('misi').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { tentang, visi, misi } = req.body;

    // Check if lembaga exists by id
    const [existingLembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE id = ?',
      [id]
    );

    if (existingLembaga.length === 0) {
      return res.status(404).json({ error: 'Lembaga tidak ditemukan' });
    }

    // Update lembaga - hanya update field yang diubah, bukan id
    await promisePool.query(
      'UPDATE lembaga_desa SET tentang = ?, visi = ?, misi = ? WHERE id = ?',
      [tentang, visi, misi, id]
    );

    const [updatedLembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Lembaga berhasil diupdate',
      lembaga: updatedLembaga[0]
    });
  } catch (error) {
    console.error('Update lembaga by ID error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Delete lembaga (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if lembaga exists
    const [existingLembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE id = ?',
      [id]
    );

    if (existingLembaga.length === 0) {
      return res.status(404).json({ error: 'Lembaga tidak ditemukan' });
    }

    // Delete pengurus first (foreign key constraint)
    await promisePool.query('DELETE FROM pengurus_lembaga WHERE lembaga_id = ?', [id]);
    
    // Delete lembaga
    await promisePool.query('DELETE FROM lembaga_desa WHERE id = ?', [id]);

    res.json({ message: 'Lembaga berhasil dihapus' });
  } catch (error) {
    console.error('Delete lembaga error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Add pengurus to lembaga (admin only)
router.post('/:id/pengurus', adminAuth, uploadFlexible(['foto','photo','image','img','file']), [
  body('nama').notEmpty().withMessage('Nama pengurus wajib diisi'),
  body('jabatan').notEmpty().withMessage('Jabatan wajib diisi')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { nama, jabatan } = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if lembaga exists
    const [existingLembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE id = ?',
      [id]
    );

    if (existingLembaga.length === 0) {
      return res.status(404).json({ error: 'Lembaga tidak ditemukan' });
    }

    const [result] = await promisePool.query(
      'INSERT INTO pengurus_lembaga (lembaga_id, nama, jabatan, foto) VALUES (?, ?, ?, ?)',
      [id, nama, jabatan, foto]
    );

    const [newPengurus] = await promisePool.query(
      'SELECT * FROM pengurus_lembaga WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Pengurus berhasil ditambahkan',
      pengurus: newPengurus[0]
    });
  } catch (error) {
    console.error('Add pengurus error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Update pengurus (admin only)
router.put('/pengurus/:pengurusId', adminAuth, uploadFlexible(['foto','photo','image','img','file']), [
  body('nama').notEmpty().withMessage('Nama pengurus wajib diisi'),
  body('jabatan').notEmpty().withMessage('Jabatan wajib diisi')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pengurusId } = req.params;
    const { nama, jabatan } = req.body;

    // Check if pengurus exists
    const [existingPengurus] = await promisePool.query(
      'SELECT * FROM pengurus_lembaga WHERE id = ?',
      [pengurusId]
    );

    if (existingPengurus.length === 0) {
      return res.status(404).json({ error: 'Pengurus tidak ditemukan' });
    }

    let foto = existingPengurus[0].foto;
    if (req.file) {
      foto = `/uploads/${req.file.filename}`;
    }

    await promisePool.query(
      'UPDATE pengurus_lembaga SET nama = ?, jabatan = ?, foto = ? WHERE id = ?',
      [nama, jabatan, foto, pengurusId]
    );

    const [updatedPengurus] = await promisePool.query(
      'SELECT * FROM pengurus_lembaga WHERE id = ?',
      [pengurusId]
    );

    res.json({
      message: 'Pengurus berhasil diupdate',
      pengurus: updatedPengurus[0]
    });
  } catch (error) {
    console.error('Update pengurus error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Delete pengurus (admin only)
router.delete('/pengurus/:pengurusId', adminAuth, async (req, res) => {
  try {
    const { pengurusId } = req.params;

    // Check if pengurus exists
    const [existingPengurus] = await promisePool.query(
      'SELECT * FROM pengurus_lembaga WHERE id = ?',
      [pengurusId]
    );

    if (existingPengurus.length === 0) {
      return res.status(404).json({ error: 'Pengurus tidak ditemukan' });
    }

    await promisePool.query('DELETE FROM pengurus_lembaga WHERE id = ?', [pengurusId]);

    res.json({ message: 'Pengurus berhasil dihapus' });
  } catch (error) {
    console.error('Delete pengurus error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Add unit kegiatan to lembaga (admin only)
router.post('/:id/unit-kegiatan', adminAuth, uploadFlexible(['icon','foto','img','file']), [
  body('nama').notEmpty().withMessage('Nama unit kegiatan wajib diisi')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { nama } = req.body;
    const icon = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if lembaga exists
    const [existingLembaga] = await promisePool.query(
      'SELECT * FROM lembaga_desa WHERE id = ?',
      [id]
    );

    if (existingLembaga.length === 0) {
      return res.status(404).json({ error: 'Lembaga tidak ditemukan' });
    }

    const [result] = await promisePool.query(
      'INSERT INTO unit_kegiatan_lembaga (lembaga_id, nama, icon) VALUES (?, ?, ?)',
      [id, nama, icon]
    );

    const [newUnitKegiatan] = await promisePool.query(
      'SELECT * FROM unit_kegiatan_lembaga WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Unit kegiatan berhasil ditambahkan',
      unit_kegiatan: newUnitKegiatan[0]
    });
  } catch (error) {
    console.error('Add unit kegiatan error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Update unit kegiatan (admin only)
router.put('/unit-kegiatan/:unitId', adminAuth, uploadFlexible(['icon','foto','img','file']), [
  body('nama').notEmpty().withMessage('Nama unit kegiatan wajib diisi')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { unitId } = req.params;
    const { nama } = req.body;

    // Check if unit kegiatan exists
    const [existingUnitKegiatan] = await promisePool.query(
      'SELECT * FROM unit_kegiatan_lembaga WHERE id = ?',
      [unitId]
    );

    if (existingUnitKegiatan.length === 0) {
      return res.status(404).json({ error: 'Unit kegiatan tidak ditemukan' });
    }

    let icon = existingUnitKegiatan[0].icon;
    if (req.file) {
      icon = `/uploads/${req.file.filename}`;
    }

    await promisePool.query(
      'UPDATE unit_kegiatan_lembaga SET nama = ?, icon = ? WHERE id = ?',
      [nama, icon, unitId]
    );

    const [updatedUnitKegiatan] = await promisePool.query(
      'SELECT * FROM unit_kegiatan_lembaga WHERE id = ?',
      [unitId]
    );

    res.json({
      message: 'Unit kegiatan berhasil diupdate',
      unit_kegiatan: updatedUnitKegiatan[0]
    });
  } catch (error) {
    console.error('Update unit kegiatan error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Delete unit kegiatan (admin only)
router.delete('/unit-kegiatan/:unitId', adminAuth, async (req, res) => {
  try {
    const { unitId } = req.params;

    // Check if unit kegiatan exists
    const [existingUnitKegiatan] = await promisePool.query(
      'SELECT * FROM unit_kegiatan_lembaga WHERE id = ?',
      [unitId]
    );

    if (existingUnitKegiatan.length === 0) {
      return res.status(404).json({ error: 'Unit kegiatan tidak ditemukan' });
    }

    await promisePool.query('DELETE FROM unit_kegiatan_lembaga WHERE id = ?', [unitId]);

    res.json({ message: 'Unit kegiatan berhasil dihapus' });
  } catch (error) {
    console.error('Delete unit kegiatan error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

module.exports = router; 