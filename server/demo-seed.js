require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const HeroSlide = require('./models/HeroSlide');

async function seedDemo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. CLEAR COLLECTIONS
    await Product.deleteMany({});
    await Category.deleteMany({});
    await HeroSlide.deleteMany({});

    // 2. CREATE CATEGORIES
    const categories = await Category.insertMany([
      { name: 'Personalized Bottles', imageUrl: 'https://images.unsplash.com/photo-1602143307185-8a8d11d08779?auto=format&fit=crop&q=80&w=400', sequence: 1 },
      { name: 'Aesthetic Tumblers', imageUrl: 'https://images.unsplash.com/photo-1574633962383-7f3be9b161c3?auto=format&fit=crop&q=80&w=400', sequence: 2 },
      { name: 'Neon Signs', imageUrl: 'https://images.unsplash.com/photo-1623126311029-798835824c0d?auto=format&fit=crop&q=80&w=400', sequence: 3 },
      { name: 'Premium Planners', imageUrl: 'https://images.unsplash.com/photo-1544816153-12ad5d71331a?auto=format&fit=crop&q=80&w=400', sequence: 4 },
      { name: 'Luxury Gifting', imageUrl: 'https://images.unsplash.com/photo-1549463595-b46618bb1383?auto=format&fit=crop&q=80&w=400', sequence: 5 },
    ]);
    console.log('✅ Created 5 Categories');

    // 3. CREATE HERO BANNERS
    await HeroSlide.create({
      title: 'The Elite Sipper Series',
      subtitle: 'Luxury Hydration, Personally Yours.',
      cta: 'SHOP NOW',
      imageUrl: 'https://images.unsplash.com/photo-1523363344075-8149eb036573?auto=format&fit=crop&q=80&w=1200',
      bgGradient: 'from-[#E7D6CB] via-[#EFE3DA] to-[#F6EFE9]',
      sequence: 1
    });
    console.log('✅ Created Hero Banner');

    // 4. CREATE PRODUCTS
    await Product.insertMany([
      {
        name: 'Aura Personalized Sipper',
        price: 899,
        originalPrice: 1299,
        category: 'Personalized Bottles',
        imageUrl: 'https://images.unsplash.com/photo-1602143307185-8a8d11d08779?auto=format&fit=crop&q=80&w=600',
        badge: 'Bestseller',
        description: 'Premium stainless steel sipper with laser-etched customization. Keeps cold for 24 hours.',
        dimensions: '750ml, 10x3 inches',
        sequence: 1
      },
      {
        name: 'Midnight Matte Tumbler',
        price: 749,
        originalPrice: 999,
        category: 'Aesthetic Tumblers',
        imageUrl: 'https://images.unsplash.com/photo-1574633962383-7f3be9b161c3?auto=format&fit=crop&q=80&w=600',
        badge: 'New',
        description: 'Sleek matte finish tumbler with reusable straw. Perfect for coffee or smoothies.',
        dimensions: '500ml, 8.5x4 inches',
        sequence: 2
      },
      {
        name: 'Cosmic Neon Glow Sign',
        price: 1899,
        originalPrice: 2499,
        category: 'Neon Signs',
        imageUrl: 'https://images.unsplash.com/photo-1623126311029-798835824c0d?auto=format&fit=crop&q=80&w=600',
        badge: 'Trending',
        description: 'Customizable LED neon sign for home decor. Extremely energy efficient and durable.',
        dimensions: '12x12 inches',
        sequence: 3
      },
      {
        name: '2026 Floral Executive Planner',
        price: 499,
        originalPrice: 799,
        category: 'Premium Planners',
        imageUrl: 'https://images.unsplash.com/photo-1544816153-12ad5d71331a?auto=format&fit=crop&q=80&w=600',
        badge: 'Sale',
        description: 'Goal-oriented planner with premium 100gsm paper. Includes sticker set.',
        dimensions: 'A5 Size',
        sequence: 4
      },
      {
        name: 'The Royal Gifting Combo',
        price: 2999,
        originalPrice: 3999,
        category: 'Luxury Gifting',
        imageUrl: 'https://images.unsplash.com/photo-1549463595-b46618bb1383?auto=format&fit=crop&q=80&w=600',
        badge: 'Limited',
        description: 'Curated box including a personalized sipper, a candle, and a handcrafted chocolate set.',
        dimensions: '14x10x6 inches box',
        sequence: 5
      }
    ]);
    console.log('✅ Created 5 Demo Products');

    console.log('\n🌟 DEMO SEEDING COMPLETE!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedDemo();
