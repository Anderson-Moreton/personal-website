const mysql = require('mysql2/promise');

let pool;

/**
 * Initialize MySQL connection safely
 * - Waits for MySQL to be reachable
 * - Ensures database exists
 * - Creates a single shared pool
 */
async function initDatabase() {
  try {
    // Connect without selecting database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    // Ensure database exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );

    await connection.end();

    // Create pool WITH database selected
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log('MySQL pool initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1); // Fail fast
  }
}

// Initialize on startup
initDatabase();

/**
 * Export pool directly
 * All routes can safely use db.execute(...)
 */
module.exports = {
  execute: (...args) => pool.execute(...args),
};