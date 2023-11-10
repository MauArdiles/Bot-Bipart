const { config } = require("dotenv");

config();

const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST || "db";
const DB_ROOT_PASSWORD = process.env.DB_ROOT_PASSWORD || "BipartPass";
const DB_USER = process.env.DB_USER || "bipart";
const DB_PASSWORD = process.env.DB_PASSWORD || "bipart";
const DB_NAME = process.env.DB_NAME || "Clientes_db";

const DB_LOCAL_PORT = process.env.DB_LOCAL_PORT || 3306;
const DB_DOCKER_PORT = process.env.DB_DOCKER_PORT || 3307;

module.exports = {
  PORT,
  DB_HOST,
  DB_LOCAL_PORT,
  DB_DOCKER_PORT,
  DB_ROOT_PASSWORD,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
};
