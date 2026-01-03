const mysql = require('mysql2/promise');

// Create a connection pool to MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'app_user',
    password: 'app_password',
    database: 'personal_website',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;