const pool = require('../config/db');

exports.createProduct = async (req, res) => {
  try {
    const { name, sku, price, quantity } = req.body;

    const newProduct = await pool.query(
      'INSERT INTO products (name, sku, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, sku, price, quantity]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};