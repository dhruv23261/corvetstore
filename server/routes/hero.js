const express = require('express');
const router = express.Router();
const HeroSlide = require('../models/HeroSlide');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/hero — Public access
router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find({ active: true }).sort({ sequence: 1, createdAt: -1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hero slides' });
  }
});

// POST /api/hero — Admin only
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const newSlide = new HeroSlide(req.body);
    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(400).json({ message: 'Error creating hero slide' });
  }
});

// PUT /api/hero/:id — Admin only
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedSlide = await HeroSlide.findByIdAndUpdate(req.id || req.params.id, req.body, { new: true });
    res.json(updatedSlide);
  } catch (err) {
    res.status(400).json({ message: 'Error updating hero slide' });
  }
});

// DELETE /api/hero/:id — Admin only
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await HeroSlide.findByIdAndDelete(req.id || req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting hero slide' });
  }
});

module.exports = router;
