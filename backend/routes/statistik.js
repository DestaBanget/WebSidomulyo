const express = require('express');
const { body, validationResult } = require('express-validator');
const { promisePool } = require('../config');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all statistik (public)
router.get('/', async (req, res) => {
  try {
    const { kategori } = req.query;

    let query = 'SELECT * FROM statistik';
    let params = [];

    if (kategori) {
      query += ' WHERE kategori = ?';
      params.push(kategori);
    }

    query += ' ORDER BY kategori, label';

    const [statistik] = await promisePool.query(query, params);

    // Group by kategori
    const groupedStatistik = statistik.reduce((acc, item) => {
      if (!acc[item.kategori]) {
        acc[item.kategori] = [];
      }
      acc[item.kategori].push(item);
      return acc;
    }, {});

    res.json({ statistik: groupedStatistik });
  } catch (error) {
    console.error('Get statistik error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Get statistik by kategori (public)
router.get('/kategori/:kategori', async (req, res) => {
  try {
    const { kategori } = req.params;

    const [statistik] = await promisePool.query(
      'SELECT * FROM statistik WHERE kategori = ? ORDER BY label',
      [kategori]
    );

    res.json({ statistik });
  } catch (error) {
    console.error('Get statistik by kategori error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Create statistik (admin only)
router.post('/', adminAuth, [
  body('kategori').notEmpty().withMessage('Kategori wajib diisi'),
  body('label').notEmpty().withMessage('Label wajib diisi'),
  body('value').isInt({ min: 0 }).withMessage('Value harus berupa angka positif'),
  body('color').optional().isHexColor().withMessage('Color harus berupa hex color')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { kategori, label, value, color } = req.body;

    // Check if statistik with same kategori and label already exists
    const [existingStatistik] = await promisePool.query(
      'SELECT id FROM statistik WHERE kategori = ? AND label = ?',
      [kategori, label]
    );

    if (existingStatistik.length > 0) {
      return res.status(400).json({ error: 'Statistik dengan kategori dan label yang sama sudah ada' });
    }

    const [result] = await promisePool.query(
      'INSERT INTO statistik (kategori, label, value, color) VALUES (?, ?, ?, ?)',
      [kategori, label, value, color]
    );

    const [newStatistik] = await promisePool.query(
      'SELECT * FROM statistik WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Statistik berhasil ditambahkan',
      statistik: newStatistik[0]
    });
  } catch (error) {
    console.error('Create statistik error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Update statistik (admin only)
router.put('/:id', adminAuth, [
  body('kategori').notEmpty().withMessage('Kategori wajib diisi'),
  body('label').notEmpty().withMessage('Label wajib diisi'),
  body('value').isInt({ min: 0 }).withMessage('Value harus berupa angka positif'),
  body('color').optional().isHexColor().withMessage('Color harus berupa hex color')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { kategori, label, value, color } = req.body;

    // Check if statistik exists
    const [existingStatistik] = await promisePool.query(
      'SELECT * FROM statistik WHERE id = ?',
      [id]
    );

    if (existingStatistik.length === 0) {
      return res.status(404).json({ error: 'Statistik tidak ditemukan' });
    }

    // Check if statistik with same kategori and label already exists (excluding current id)
    const [duplicateStatistik] = await promisePool.query(
      'SELECT id FROM statistik WHERE kategori = ? AND label = ? AND id != ?',
      [kategori, label, id]
    );

    if (duplicateStatistik.length > 0) {
      return res.status(400).json({ error: 'Statistik dengan kategori dan label yang sama sudah ada' });
    }

    await promisePool.query(
      'UPDATE statistik SET kategori = ?, label = ?, value = ?, color = ? WHERE id = ?',
      [kategori, label, value, color, id]
    );

    const [updatedStatistik] = await promisePool.query(
      'SELECT * FROM statistik WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Statistik berhasil diupdate',
      statistik: updatedStatistik[0]
    });
  } catch (error) {
    console.error('Update statistik error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Delete statistik (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if statistik exists
    const [existingStatistik] = await promisePool.query(
      'SELECT * FROM statistik WHERE id = ?',
      [id]
    );

    if (existingStatistik.length === 0) {
      return res.status(404).json({ error: 'Statistik tidak ditemukan' });
    }

    await promisePool.query('DELETE FROM statistik WHERE id = ?', [id]);

    res.json({ message: 'Statistik berhasil dihapus' });
  } catch (error) {
    console.error('Delete statistik error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Bulk update statistik (admin only)
router.put('/bulk/update', adminAuth, [
  body('statistik').isArray().withMessage('Statistik harus berupa array'),
  body('statistik.*.id').isInt().withMessage('ID harus berupa angka'),
  body('statistik.*.value').isInt({ min: 0 }).withMessage('Value harus berupa angka positif')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { statistik } = req.body;

    // Update multiple statistik
    for (const item of statistik) {
      await promisePool.query(
        'UPDATE statistik SET value = ? WHERE id = ?',
        [item.value, item.id]
      );
    }

    res.json({ message: 'Statistik berhasil diupdate secara massal' });
  } catch (error) {
    console.error('Bulk update statistik error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Get statistik overview (admin only)
router.get('/overview', adminAuth, async (req, res) => {
  try {
    const [totalStatistik] = await promisePool.query('SELECT COUNT(*) as total FROM statistik');
    const [kategoriCount] = await promisePool.query('SELECT COUNT(DISTINCT kategori) as total FROM statistik');

    res.json({
      total_items: totalStatistik[0].total,
      total_kategori: kategoriCount[0].total
    });
  } catch (error) {
    console.error('Get statistik overview error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

module.exports = router; 