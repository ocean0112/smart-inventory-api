const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smart_inventory',
  password: 'bcm4fbby',
  port: 5432,
});

module.exports = pool;