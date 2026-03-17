const express = require('express');
const router = express.Router();

// @route   GET /api/health
// @desc    Test basic server connection
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running'
  });
});

module.exports = router;
