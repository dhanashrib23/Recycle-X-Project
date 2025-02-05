const mysql = require("mysql2");
const { db } = require("./constants");

const pool = mysql.createPool({
  host: db.LOCAL_HOST,
  user: db.USER_NAME,
  database: db.DB_NAME,
  password: db.PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool;
