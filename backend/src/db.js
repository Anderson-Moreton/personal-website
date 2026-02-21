const mysql = require('mysql2/promise');

let pool;

/**
 * Initialize database connection safely
 * - Ensures database exists
 * - Creates pool only AFTER database is available
 */
async function initDatabase() {
  try {
    // 1 - Connect WITHOUT database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    // 2 - Ensure database exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );

    await connection.end();

    console.log('Database ensured');

    // 3 - Create pool WITH database
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('MySQL pool created');

  } catch (error) {
    console.error('Database bootstrap error:', error);
    process.exit(1); // 🔥 fail fast (important)
  }
}

// Initialize immediately
initDatabase();

module.exports = {
  getPool: () => {
    if (!pool) {
      throw new Error('Database pool not initialized');
    }
    return pool;
  }
};