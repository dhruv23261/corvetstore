require('dotenv').config();
// require("dotenv").config();

console.log("MONGO_URI VALUE 👉", process.env.MONGODB_URI);
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

const productImages = [
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Admin.deleteMany({});
  await Product.deleteMany({});
  await Customer.deleteMany({});
  await Order.deleteMany({});

  // Create admin
  await Admin.create({
    email: 'sandipsharm4321@gmail.com',
    password: '12102002',
    name: 'Sandip Sharma',
    phone: '+919999999999',
  });
  console.log('Admin created: sandipsharm4321@gmail.com / 12102002');

  // Create products
  const products = await Product.insertMany([
    { name: 'Floral Tumbler – Blush Pink', price: 899, originalPrice: 1199, category: 'Tumblers', badge: 'Bestseller', imageUrl: productImages[0] },
    { name: 'Aesthetic Water Bottle', price: 649, originalPrice: 899, category: 'Bottles', badge: 'New', imageUrl: productImages[1] },
    { name: 'Soy Wax Candle – Rose', price: 499, originalPrice: 699, category: 'Candles', imageUrl: productImages[2] },
    { name: 'Gift Hamper – Deluxe', price: 1499, originalPrice: 1999, category: 'Gifting', badge: 'Popular', imageUrl: productImages[3] },
    { name: 'Personalised Photo Album', price: 799, originalPrice: 999, category: 'Accessories', badge: 'New', imageUrl: productImages[4] },
    { name: 'Neon LED Light – Custom', price: 1299, originalPrice: 1799, category: 'Accessories', imageUrl: productImages[5] },
    { name: 'Borosilicate Glass Bottle', price: 549, originalPrice: 749, category: 'Bottles', badge: 'Sale', imageUrl: productImages[6] },
    { name: '2026 Planner – Floral', price: 399, originalPrice: 599, category: 'Accessories', badge: 'Hot', imageUrl: productImages[7] },
  ]);
  console.log(`${products.length} products created`);

  // Create customers
  const customers = await Customer.insertMany([
    { name: 'Rahul Sharma', phone: '+919876543210', email: 'rahul@example.com', totalOrders: 5, totalSpent: 6200 },
    { name: 'Priya Mehta', phone: '+919876543211', email: 'priya@example.com', totalOrders: 3, totalSpent: 2890 },
    { name: 'Amit Kumar', phone: '+919876543212', email: 'amit@example.com', totalOrders: 8, totalSpent: 12400 },
    { name: 'Sneha Reddy', phone: '+919876543213', email: 'sneha@example.com', totalOrders: 2, totalSpent: 1450 },
  ]);
  console.log(`${customers.length} customers created`);

  // Create orders
  await Order.insertMany([
    { orderNumber: '#1042', customer: { name: 'Rahul Sharma', phone: '+919876543210' }, items: [{ product: products[0]._id, name: products[0].name, price: products[0].price, quantity: 1 }], total: 1250, status: 'Processing' },
    { orderNumber: '#1041', customer: { name: 'Priya Mehta', phone: '+919876543211' }, items: [{ product: products[1]._id, name: products[1].name, price: products[1].price, quantity: 1 }], total: 890, status: 'Shipped' },
    { orderNumber: '#1040', customer: { name: 'Amit Kumar', phone: '+919876543212' }, items: [{ product: products[3]._id, name: products[3].name, price: products[3].price, quantity: 1 }], total: 2100, status: 'Delivered' },
    { orderNumber: '#1039', customer: { name: 'Sneha Reddy', phone: '+919876543213' }, items: [{ product: products[2]._id, name: products[2].name, price: products[2].price, quantity: 1 }], total: 450, status: 'Delivered' },
  ]);
  console.log('4 orders created');

  console.log('\nSeed complete!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
