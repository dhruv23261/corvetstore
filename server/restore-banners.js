require('dotenv').config();
const mongoose = require('mongoose');
const HeroSlide = require('./models/HeroSlide');

async function restoreBanners() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing demo banners
    await HeroSlide.deleteMany({});

    // Restore the "Flip it and Sip it" banner you like!
    await HeroSlide.insertMany([
      {
        title: 'Flip it and Sip it',
        subtitle: 'The Perfect Companion for Every Journey.',
        cta: 'EXPLORE COLLECTIONS',
        imageUrl: '/hero1.png',
        bgGradient: 'from-[#E7D6CB] via-[#EFE3DA] to-[#F6EFE9]',
        sequence: 1
      },
      {
        title: 'Curated Elegance',
        subtitle: 'Bespoke Designs for Modern Living.',
        cta: 'SHOP LUXURY',
        imageUrl: '/hero2.png',
        bgGradient: 'from-[#DCC8BC] via-[#E7D6CB] to-[#EFE3DA]',
        sequence: 2
      }
    ]);

    console.log('✅ "Flip it and Sip it" and the Premium Banners are back!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Restore failed:', err);
    process.exit(1);
  }
}

restoreBanners();
