// config/database.js
const mysql = require("mysql2/promise");

// Pool for the main database
const pool = mysql.createPool({
  host: "localhost",
  database: "inhouse",
  user: "root",
  password: "",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Pool for the teachers database
const teachersPool = mysql.createPool({
  host: "localhost",
  database: "inhouse_teachers",
  user: "root",
  password: "",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  pool,
  teachersPool,
};
