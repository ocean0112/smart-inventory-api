const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post(
  '/:id',
  authenticate,
  authorize(['admin', 'employee']),
  inventoryController.updateInventory
);

module.exports = router;