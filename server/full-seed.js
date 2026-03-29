require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Product = require('./models/Product');
const Category = require('./models/Category');
const HeroSlide = require('./models/HeroSlide');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an external image URL to Cloudinary and return the secure URL
async function uploadToCloudinary(url, folder, publicId) {
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder,
      public_id: publicId,
      overwrite: true,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    });
    return result.secure_url;
  } catch (err) {
    console.error(`Failed to upload ${publicId}:`, err.message);
    return url; // fallback to original URL
  }
}

async function fullSeed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB\n');

  // Clean slate
  await Product.deleteMany({});
  await Category.deleteMany({});
  await HeroSlide.deleteMany({});
  console.log('🧹 Cleared existing data\n');

  // ── HERO BANNERS ─────────────────────────────────────────────────────────
  console.log('📸 Uploading Hero Banners...');
  const hero1Url = await uploadToCloudinary(
    'https://images.unsplash.com/photo-1602143307185-8a8d11d08779?auto=format&fit=crop&w=1200&q=80',
    'corvet_hero', 'flip_sip_hero'
  );
  const hero2Url = await uploadToCloudinary(
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    'corvet_hero', 'gifting_hero'
  );

  await HeroSlide.insertMany([
    {
      title: 'Flip it and Sip it',
      subtitle: 'Your Way.',
      cta: 'SHOP NOW',
      imageUrl: hero1Url,
      bgGradient: 'from-[#E7D6CB] via-[#EFE3DA] to-[#F6EFE9]',
      sequence: 1,
      active: true
    },
    {
      title: 'Gift Someone Special',
      subtitle: 'Curated With Love.',
      cta: 'EXPLORE GIFTS',
      imageUrl: hero2Url,
      bgGradient: 'from-[#DCC8BC] via-[#E7D6CB] to-[#EFE3DA]',
      sequence: 2,
      active: true
    }
  ]);
  console.log('✅ Hero Banners created\n');

  // ── CATEGORIES ────────────────────────────────────────────────────────────
  console.log('📁 Uploading Categories...');
  const catImages = [
    { key: 'canvas_wall_art', url: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=300&q=80', name: 'Canvas Wall Art' },
    { key: 'tumblers',        url: 'https://images.unsplash.com/photo-1574633962383-7f3be9b161c3?auto=format&fit=crop&w=300&q=80', name: 'Tumblers' },
    { key: 'glassware',       url: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=300&q=80', name: 'Glassware' },
    { key: 'neon_lights',     url: 'https://images.unsplash.com/photo-1623126311029-798835824c0d?auto=format&fit=crop&w=300&q=80', name: 'Neon Lights' },
    { key: 'personalised_pb', url: 'https://images.unsplash.com/photo-1544816153-12ad5d71331a?auto=format&fit=crop&w=300&q=80', name: 'Personalised Photobook' },
  ];

  const uploadedCats = await Promise.all(catImages.map(async (c, i) => ({
    name: c.name,
    imageUrl: await uploadToCloudinary(c.url, 'corvet_categories', c.key),
    sequence: i + 1,
    active: true
  })));
  await Category.insertMany(uploadedCats);
  console.log('✅ 5 Categories created\n');

  // ── PRODUCTS ──────────────────────────────────────────────────────────────
  console.log('📦 Uploading Products...');
  const productData = [
    {
      name: 'Floral Sipper Bottle – Blush Pink',
      price: 899,
      originalPrice: 1299,
      category: 'Tumblers',
      badge: 'Bestseller',
      description: 'Premium stainless steel sipper with hand-painted floral design. Keeps drinks cold for 24 hours and hot for 12 hours. Perfect for gifting!',
      dimensions: '750ml · 10 × 3 inches · Stainless Steel',
      sequence: 1,
      imgUrl: 'https://images.unsplash.com/photo-1602143307185-8a8d11d08779?auto=format&fit=crop&w=600&q=80',
      imgKey: 'prod_sipper',
      additionalImgUrls: [
        'https://images.unsplash.com/photo-1602143307221-8276f57f620e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1602146200762-2f3b97042858?auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      name: 'Midnight Matte Tumbler',
      price: 749,
      originalPrice: 999,
      category: 'Tumblers',
      badge: 'New',
      description: 'Sleek double-walled tumbler in premium matte finish. Comes with reusable straw and lid. Microwave safe.',
      dimensions: '500ml · 8.5 × 4 inches · BPA Free',
      sequence: 2,
      imgUrl: 'https://images.unsplash.com/photo-1574633962383-7f3be9b161c3?auto=format&fit=crop&w=600&q=80',
      imgKey: 'prod_tumbler',
      additionalImgUrls: [
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      name: 'Cosmic Neon LED Sign',
      price: 1899,
      originalPrice: 2499,
      category: 'Neon Lights',
      badge: 'Trending',
      description: 'Fully customizable LED neon sign for home, café, or office decor. Ultra energy efficient with remote dimmer.',
      dimensions: '12 × 12 inches · Flexible LED · Indoor Use',
      sequence: 3,
      imgUrl: 'https://images.unsplash.com/photo-1623126311029-798835824c0d?auto=format&fit=crop&w=600&q=80',
      imgKey: 'prod_neon',
      additionalImgUrls: [
        'https://images.unsplash.com/photo-1555618570-157497d4b3e4?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      name: '2026 Floral Executive Planner',
      price: 499,
      originalPrice: 799,
      category: 'Personalised Photobook',
      badge: 'Sale',
      description: 'Goal-setting planner with 365-day layout, 120gsm premium paper, monthly tabs, and gratitude pages. Includes a bonus sticker pack.',
      dimensions: 'A5 · 300 Pages · Hardcover',
      sequence: 4,
      imgUrl: 'https://images.unsplash.com/photo-1544816153-12ad5d71331a?auto=format&fit=crop&w=600&q=80',
      imgKey: 'prod_planner',
      additionalImgUrls: [
        'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1512418490979-92798ccc1380?auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      name: 'Boho Style Glass Vase Set',
      price: 1199,
      originalPrice: 1599,
      category: 'Glassware',
      badge: 'Popular',
      description: 'Set of 3 hand-blown glass vases with geometric boho patterns. Ideal for dried flowers or as standalone décor pieces.',
      dimensions: 'Small: 6" · Medium: 9" · Large: 12"',
      sequence: 5,
      imgUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=600&q=80',
      imgKey: 'prod_glassware',
      additionalImgUrls: [
        'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80'
      ]
    },
  ];

  const productsToInsert = await Promise.all(productData.map(async (p) => {
    const imageUrl = await uploadToCloudinary(p.imgUrl, 'corvet_products', p.imgKey);
    const images = [imageUrl];
    if (p.additionalImgUrls) {
      for (let i = 0; i < p.additionalImgUrls.length; i++) {
        const altUrl = await uploadToCloudinary(p.additionalImgUrls[i], 'corvet_products', `${p.imgKey}_alt_${i}`);
        images.push(altUrl);
      }
    }
    return {
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      category: p.category,
      badge: p.badge,
      description: p.description,
      dimensions: p.dimensions,
      imageUrl,
      images,
      sequence: p.sequence,
    };
  }));

  await Product.insertMany(productsToInsert);
  console.log('✅ 5 Products created\n');

  console.log('🎉 FULL SEED COMPLETE! Your Corvet store is live.\n');
  process.exit(0);
}

fullSeed().catch(err => { console.error(err); process.exit(1); });
