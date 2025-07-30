const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10, // adjust as needed
  queueLimit: 0
});

module.exports = pool;
