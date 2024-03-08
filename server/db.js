const { createPool } = require("mysql2/promise");
const {
  DB_HOST,
  DB_LOCAL_PORT,
  DB_DOCKER_PORT,
  DB_ROOT_PASSWORD,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
} = require("./config.js");

const pool = createPool({
  host: DB_HOST,
  port: DB_LOCAL_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };
