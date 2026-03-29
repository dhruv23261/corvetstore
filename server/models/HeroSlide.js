const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  cta: { type: String, default: 'SHOP NOW' },
  imageUrl: { type: String, required: true }, // Desktop image
  mobileImageUrl: { type: String, default: '' }, // Mobile-specific image
  bgGradient: { type: String, default: 'from-[#E7D6CB] via-[#EFE3DA] to-[#F6EFE9]' },
  sequence: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
