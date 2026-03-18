const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalCustomers, orders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Customer.countDocuments(),
      Order.find(),
    ]);
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    res.json({ totalProducts, totalOrders, totalCustomers, revenue });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/recent-activity', authMiddleware, async (req, res) => {
  try {
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const activity = recentOrders.map(o => ({
      text: `Order ${o.orderNumber} — ${o.status}`,
      time: o.createdAt,
    }));
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
