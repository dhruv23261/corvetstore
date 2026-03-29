const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  category: { type: String, required: true, trim: true },
  imageUrl: { type: String, default: '' },
  images: { type: [String], default: [] }, // at least 3 images for detailed view
  description: { type: String, default: '' },
  dimensions: { type: String, default: '' },
  badge: { type: String, default: '' },
  tags: { type: [String], default: [] },
  highlights: { type: [String], default: [] }, // Key points like "Stainless Steel", "BPA Free"
  specifications: [{
    label: String, // e.g. "Material"
    value: String // e.g. "Metal"
  }],
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  inStock: { type: Boolean, default: true },
  sequence: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
