const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  productController.createProduct
);

router.get('/', authenticate, productController.getProducts);

module.exports = router;