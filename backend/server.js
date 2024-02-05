const express = require('express');
const app = express();
const authMiddleware = require('./middlewares/authMiddleware.js');
const adminMiddleware = require('./middlewares/adminMiddleware.js');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.send('Hello Admin!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});