require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const { authenticate, authorize } = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/products', productRoutes);


app.get('/', (req, res) => {
  res.send('Smart Inventory API Running');
});
app.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'You accessed a protected route',
    user: req.user
  });
});
app.get(
  '/admin-only',
  authenticate,
  authorize(['admin']),
  (req, res) => {
    res.json({ message: 'Admin access granted' });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
