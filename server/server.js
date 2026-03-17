const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const healthRoutes = require('./routes/health');
app.use('/api/health', healthRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('AREN STORE API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
