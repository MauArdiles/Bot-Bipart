const { config } = require("dotenv");

config();

const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME || "clientes_db";

module.exports = {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
};
