require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const HeroSlide = require('./models/HeroSlide');

async function uploadMobileHero() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Most recent provided image path
  const localImage = 'C:\\Users\\Dhruv\\.gemini\\antigravity\\brain\\7dbfe5f8-9700-42ef-a6d5-1cb0e669221b\\media__1774786052633.png';

  console.log('📸 Uploading provided Mobile Hero Banner to Cloudinary...');
  try {
    const result = await cloudinary.uploader.upload(localImage, {
      folder: 'corvet_hero_mobile',
      public_id: 'flip_sip_mobile_custom',
      overwrite: true,
    });
    console.log('✅ Uploaded to:', result.secure_url);

    // Update ALL currently active hero slides to use this as mobile fallback (main request)
    // Or just the "Flip it and Sip it" one specifically? 
    // The user said "use that both image... in desktop view and only this in mobile view".
    // I will set this for all slides to fulfill "ONLY this image when come in mobile view".
    await HeroSlide.updateMany({}, { mobileImageUrl: result.secure_url });
    console.log('✅ Updated all Hero Slides with Mobile Image in Database');
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

uploadMobileHero();
