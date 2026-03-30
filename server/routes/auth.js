const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/email');
const router = express.Router();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: 'User already exists and is verified' });
      } else {
        // Just update their unverified account details instead of error
        user.name = name;
        user.phone = phone;
        user.password = password; // Will be re-hashed
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    if (!user) {
      user = await User.create({ name, email, phone, password, verificationToken: otp });
    } else {
      user.verificationToken = otp;
      await user.save();
    }
    
    // Send welcome email with OTP
    try {
      await sendEmail({
        email: user.email,
        subject: 'Verify your Cavort Store Account!',
        message: `Hi ${user.name},\n\nWelcome to Cavort! Please verify your account.\n\nYour OTP is: ${otp}\n\nCheers,\nThe Cavort Team`,
        html: `<h2>Welcome to Cavort Store!</h2><p>Hi ${user.name},</p><p>Please use the following OTP to verify your account:</p><h3>${otp}</h3><p>Cheers,<br>The Cavort Team</p>`
      });
    } catch (e) {
      console.error('Email failed:', e.message);
      // Optional: don't fail registration if email fails, but they can't verify unless they use real email
    }

    // Do NOT return a signToken here yet. Wait for OTP.
    res.status(201).json({ message: 'OTP sent to your email', email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// VERIFY OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User is already verified' });
    
    if (user.verificationToken !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Now issue the token
    const token = signToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN LOGIN
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const Admin = require('../models/Admin');
    const adminUser = await Admin.findOne({ email });
    if (!adminUser || !(await adminUser.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = signToken(adminUser._id);
    res.json({ token, admin: { id: adminUser._id, name: adminUser.name, email: adminUser.email, role: adminUser.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
