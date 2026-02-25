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
    const {
      page = 1,
      limit = 10,
      search = '',
      minQty = 0,
      sort = 'id'
    } = req.query;

    const offset = (page - 1) * limit;

    const validSortFields = ['id', 'price', 'quantity', 'name'];
    const sortField = validSortFields.includes(sort) ? sort : 'id';

    const query = `
      SELECT * FROM products
      WHERE name ILIKE $1
      AND quantity >= $2
      ORDER BY ${sortField}
      LIMIT $3 OFFSET $4
    `;

    const values = [
      `%${search}%`,
      minQty,
      limit,
      offset
    ];

    const result = await pool.query(query, values);

    res.json({
      page: Number(page),
      limit: Number(limit),
      results: result.rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};