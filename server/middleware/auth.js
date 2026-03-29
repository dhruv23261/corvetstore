const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  // Since we only have admin users in this specific app, verifyToken is enough, 
  // but we keep the structure for compatibility.
  if (!req.admin) return res.status(401).json({ message: 'Unauthorized' });
  next();
};

module.exports = { verifyToken, isAdmin };
