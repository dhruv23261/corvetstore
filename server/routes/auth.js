const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { generateOtp, storeOtp, verifyOtp } = require('../auth/otpStore');
const router = express.Router();

// POST /api/auth/login — Email + Password login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await admin.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/send-otp — Phone OTP (simulated)
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 10) return res.status(400).json({ message: 'Valid phone number required' });

  const otp = generateOtp();
  storeOtp(phone, otp);
  console.log(`\n📱 OTP for ${phone}: ${otp}\n`);
  res.json({ message: 'OTP sent (check server console)' });
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ message: 'Phone and OTP required' });

  const valid = verifyOtp(phone, otp);
  if (!valid) return res.status(401).json({ message: 'Invalid or expired OTP' });

  let admin = await Admin.findOne({ phone });
  if (!admin) admin = await Admin.findOne({});
  if (!admin) return res.status(401).json({ message: 'No admin account found' });

  const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ message: 'Verified', token, admin: { id: admin._id, name: admin.name, email: admin.email } });
});

// GET /api/auth/me — Get current admin
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
