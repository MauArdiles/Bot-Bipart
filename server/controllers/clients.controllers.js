const { pool } = require("../db.js");

const cuitRecordatorio = async (req, res) => {
  const [result] = await pool.query(
    "SELECT * from clients WHERE  RECORDATORIO='SI'"
  );
  let contacto = "";
  for (let i = 0; i < result.length; i++) {
    contacto += result[i].cuit + "->" + result[i].contacto + "\n";
  }
  res.json(result);
};

const cuitMensaje = async (req, res) => {
  const [result] = await pool.query(
    "SELECT * from clients WHERE  MENSAJE='SI'"
  );
  let contacto = "";
  for (let i = 0; i < result.length; i++) {
    contacto += result[i].contacto + "\n";
  }
  res.json(result);
};

module.exports = {
  cuitRecordatorio: cuitRecordatorio,
  cuitMensaje: cuitMensaje,
};
