const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/categories — Public access
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ active: true }).sort({ sequence: 1, createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// POST /api/categories — Admin only
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Error creating category' });
  }
});

// PUT /api/categories/:id — Admin only
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.id || req.params.id, req.body, { new: true });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: 'Error updating category' });
  }
});

// DELETE /api/categories/:id — Admin only
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.id || req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting category' });
  }
});

module.exports = router;
