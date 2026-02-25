const pool = require('../config/db');

exports.updateInventory = async (req, res) => {
  const client = await pool.connect();

  try {
    const { change } = req.body;
    const productId = req.params.id;

    await client.query('BEGIN');

    const productResult = await client.query(
      'SELECT quantity FROM products WHERE id = $1',
      [productId]
    );

    if (productResult.rows.length === 0) {
      throw new Error('Product not found');
    }

    const currentQuantity = productResult.rows[0].quantity;
    const newQuantity = currentQuantity + change;

    if (newQuantity < 0) {
      throw new Error('Insufficient stock');
    }

    await client.query(
      'UPDATE products SET quantity = $1 WHERE id = $2',
      [newQuantity, productId]
    );

    await client.query(
      'INSERT INTO inventory_transactions (product_id, change_amount, type) VALUES ($1, $2, $3)',
      [
        productId,
        change,
        change > 0 ? 'ADD' : 'REMOVE'
      ]
    );

    await client.query('COMMIT');

    res.json({ message: 'Inventory updated', newQuantity });

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};