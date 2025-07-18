const express = require('express');
const { body, validationResult } = require('express-validator');
const { promisePool } = require('../config');
const { auth, adminAuth } = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

const router = express.Router();

// Get all pengaduan (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM pengaduan';
    let countQuery = 'SELECT COUNT(*) as total FROM pengaduan';
    let params = [];
    let countParams = [];

    if (status) {
      query += ' WHERE status = ?';
      countQuery += ' WHERE status = ?';
      params.push(status);
      countParams.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [pengaduan] = await promisePool.query(query, params);
    const [countResult] = await promisePool.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      pengaduan,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get pengaduan error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Get pengaduan by ID (admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const [pengaduan] = await promisePool.query(
      'SELECT * FROM pengaduan WHERE id = ?',
      [id]
    );

    if (pengaduan.length === 0) {
      return res.status(404).json({ error: 'Pengaduan tidak ditemukan' });
    }

    res.json({ pengaduan: pengaduan[0] });
  } catch (error) {
    console.error('Get pengaduan by ID error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Create pengaduan (public)
router.post('/', uploadImage, [
  body('nama').notEmpty().withMessage('Nama wajib diisi'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('no_hp').notEmpty().withMessage('Nomor HP wajib diisi'),
  body('alamat').notEmpty().withMessage('Alamat wajib diisi'),
  body('judul').notEmpty().withMessage('Judul pengaduan wajib diisi'),
  body('uraian').notEmpty().withMessage('Uraian pengaduan wajib diisi')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nama, email, no_hp, alamat, judul, uraian } = req.body;
    const lampiran = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await promisePool.query(
      'INSERT INTO pengaduan (nama, email, no_hp, alamat, judul, uraian, lampiran) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nama, email, no_hp, alamat, judul, uraian, lampiran]
    );

    const [newPengaduan] = await promisePool.query(
      'SELECT * FROM pengaduan WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Pengaduan berhasil dikirim',
      pengaduan: newPengaduan[0]
    });
  } catch (error) {
    console.error('Create pengaduan error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Update pengaduan status (admin only)
router.put('/:id/status', adminAuth, [
  body('status').isIn(['Baru', 'Diproses', 'Selesai']).withMessage('Status tidak valid')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Check if pengaduan exists
    const [existingPengaduan] = await promisePool.query(
      'SELECT * FROM pengaduan WHERE id = ?',
      [id]
    );

    if (existingPengaduan.length === 0) {
      return res.status(404).json({ error: 'Pengaduan tidak ditemukan' });
    }

    await promisePool.query(
      'UPDATE pengaduan SET status = ? WHERE id = ?',
      [status, id]
    );

    const [updatedPengaduan] = await promisePool.query(
      'SELECT * FROM pengaduan WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Status pengaduan berhasil diupdate',
      pengaduan: updatedPengaduan[0]
    });
  } catch (error) {
    console.error('Update pengaduan status error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Delete pengaduan (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if pengaduan exists
    const [existingPengaduan] = await promisePool.query(
      'SELECT * FROM pengaduan WHERE id = ?',
      [id]
    );

    if (existingPengaduan.length === 0) {
      return res.status(404).json({ error: 'Pengaduan tidak ditemukan' });
    }

    await promisePool.query('DELETE FROM pengaduan WHERE id = ?', [id]);

    res.json({ message: 'Pengaduan berhasil dihapus' });
  } catch (error) {
    console.error('Delete pengaduan error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Get pengaduan statistics (admin only)
router.get('/stats/overview', adminAuth, async (req, res) => {
  try {
    const [totalPengaduan] = await promisePool.query('SELECT COUNT(*) as total FROM pengaduan');
    const [baru] = await promisePool.query("SELECT COUNT(*) as total FROM pengaduan WHERE status = 'Baru'");
    const [diproses] = await promisePool.query("SELECT COUNT(*) as total FROM pengaduan WHERE status = 'Diproses'");
    const [selesai] = await promisePool.query("SELECT COUNT(*) as total FROM pengaduan WHERE status = 'Selesai'");

    res.json({
      total: totalPengaduan[0].total,
      baru: baru[0].total,
      diproses: diproses[0].total,
      selesai: selesai[0].total
    });
  } catch (error) {
    console.error('Get pengaduan stats error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

module.exports = router; 