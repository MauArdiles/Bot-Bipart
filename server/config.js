const { config } = require("dotenv");

config();

const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3307;
const DB_USER = process.env.DB_USER || "bipart";
const DB_PASSWORD = process.env.DB_PASSWORD || "bipart";
const DB_NAME = process.env.DB_NAME || "Clientes_db";

module.exports = {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
};
