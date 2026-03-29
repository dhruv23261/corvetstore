require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const HeroSlide = require('./models/HeroSlide');
const path = require('path');

async function uploadHero() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Local path to the uploaded image in brain directory
  const localImage = 'C:\\Users\\Dhruv\\.gemini\\antigravity\\brain\\7dbfe5f8-9700-42ef-a6d5-1cb0e669221b\\media__1774785622703.jpg';

  console.log('📸 Uploading provided Hero Banner to Cloudinary...');
  try {
    const result = await cloudinary.uploader.upload(localImage, {
      folder: 'corvet_hero',
      public_id: 'flip_and_sip_custom_hero',
      overwrite: true,
    });
    console.log('✅ Uploaded to:', result.secure_url);

    // Create or update hero slide
    await HeroSlide.findOneAndUpdate(
      { title: /Flip it and Sip it/i },
      { 
        imageUrl: result.secure_url,
        title: 'Flip it and Sip it Your Way',
        subtitle: 'Daily Hydration, Simplified.',
        active: true,
        sequence: 1
      },
      { upsert: true, new: true }
    );
    console.log('✅ Updated Hero Banner in Database');
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

uploadHero();
