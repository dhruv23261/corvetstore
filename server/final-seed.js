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

async function uploadToCloudinary(filePath, folder, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: publicId,
      overwrite: true,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    });
    return result.secure_url;
  } catch (err) {
    console.error(`Failed to upload ${publicId}:`, err.message);
    return '';
  }
}

async function finalSeed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // We don't clear Hero Banners to keep the flip-sip ones, just products/categories
  await Product.deleteMany({});
  await Category.deleteMany({});
  console.log('🧹 Cleared existing Products and Categories');

  const brainPath = 'C:\\Users\\Dhruv\\.gemini\\antigravity\\brain\\7dbfe5f8-9700-42ef-a6d5-1cb0e669221b\\';
  
  const rawData = [
    { 
      name: 'Water Bottles', 
      catKey: 'cat_bottles', 
      localImg: brainPath + 'media__1774786363516.png',
      prodName: 'Floral Insulated Water Bottle Set',
      prodDesc: 'Premium triple-layered insulation keeps drinks cold for 24 hours. Features bespoke hand-drawn floral patterns on a matte finish.',
      price: 1299
    },
    { 
      name: 'Luxury Candles', 
      catKey: 'cat_candles', 
      localImg: brainPath + 'media__1774786376713.png',
      prodName: 'Artisan Scented Candle Collection',
      prodDesc: 'Hand-poured soy wax candles in Sandalwood, Lavender, and Eucalyptus. 40-hour burn time with a clean, soothing aroma.',
      price: 849
    },
    { 
      name: 'Gift Boxes', 
      catKey: 'cat_gifts', 
      localImg: brainPath + 'media__1774786390202.png',
      prodName: 'Signature Pink Keepsake Gift Box',
      prodDesc: 'Luxurious gift packaging with a high-grade satin bow. Perfect for bridesmaids, birthdays, or special surprises.',
      price: 499
    },
    { 
      name: 'Premium Tumblers', 
      catKey: 'cat_tumblers', 
      localImg: brainPath + 'media__1774786399766.png',
      prodName: 'Modern Pastel Tumbler Suite',
      prodDesc: 'BPA-free acrylic tumblers with matching reusable straws. Spill-resistant lids and double-walled for temperature maintenance.',
      price: 799
    },
    { 
      name: 'Home Decor', 
      catKey: 'cat_decor', 
      localImg: brainPath + 'media__1774786902636.jpg',
      prodName: 'Minimalist Ceramic Vase Set (Tray Included)',
      prodDesc: 'Set of 3 matte white ceramic vases on a metallic gold-finish display tray. Elevates any coffee table or workspace.',
      price: 1899
    }
  ];

  console.log('📸 Uploading and creating categories/products...');
  
  for (let i = 0; i < rawData.length; i++) {
    const d = rawData[i];
    const imgUrl = await uploadToCloudinary(d.localImg, 'corvet_final', d.catKey);
    
    // Create Category
    await Category.create({
      name: d.name,
      imageUrl: imgUrl,
      sequence: i + 1,
      active: true
    });

    // Create Product using SAME image
    await Product.create({
      name: d.prodName,
      price: d.price,
      originalPrice: Math.round(d.price * 1.3),
      category: d.name,
      imageUrl: imgUrl,
      images: [imgUrl, imgUrl, imgUrl],
      description: d.prodDesc,
      highlights: [
        'Premium high-grade materials',
        'Unique artist-designed patterns',
        '365-day durability guarantee',
        'Sustainably sourced and eco-friendly'
      ],
      specifications: [
        { label: 'Collection', value: 'Corvet 2026' },
        { label: 'Material', value: 'BPA-Free Eco Materials' },
        { label: 'Origin', value: 'Handmade/Imported' },
        { label: 'Warranty', value: '1 Year Manufacturer Warranty' }
      ],
      sequence: i + 1,
      active: true,
      badge: i === 0 ? 'Bestseller' : (i === 4 ? 'New' : '')
    });
    
    console.log(`✅ Categorized and Added: ${d.name}`);
  }

  console.log('🎉 Final setup complete! 5 Categories and 5 Products are live with your imagery.');
  process.exit(0);
}

finalSeed().catch(err => { console.error(err); process.exit(1); });
