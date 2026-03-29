require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const HeroSlide = require('./models/HeroSlide');
const Order = require('./models/Order');
const Customer = require('./models/Customer');

async function clearDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Deleting everything except Admin users
    await Product.deleteMany({});
    await Category.deleteMany({});
    await HeroSlide.deleteMany({});
    await Order.deleteMany({});
    await Customer.deleteMany({});

    console.log('✅ Database cleared (Fake data removed).');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error clearing db:', err);
    process.exit(1);
  }
}

clearDB();
