const xlsx = require("xlsx");
const { pool } = require("../db.js");

const readFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se ha cargado ningún archivo");
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const row of data) {
      await pool.query(
        "INSERT INTO clients(cuit, cliente, vep, mensaje, recordatorio, contacto, alternativo, grupo) VALUES (?,?,?,?,?,?,?,?)",
        [
          row.CUIT,
          row.CLIENTE,
          row.VEP,
          row.MENSAJE,
          row.RECORDATORIO,
          row.CONTACTO,
          row.ALTERNATIVO,
          row.GRUPO,
        ]
      );
    }
    res.json("Datos ingresados correctamente");
  } catch (error) {
    res
      .status(500)
      .send(
        `Error al procesar el archivo Excel y escribir en la base de datos - ${error.message}`
      );
  }
};

const updateFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se ha cargado ningún archivo");
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const row of data) {
      await pool.query("UPDATE clients SET ? WHERE cuit = ?", [row, row.CUIT]);
    }

    res.json("Datos actualizados correctamente");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error al procesar el archivo Excel y actualizar la base de datos");
  }
};

module.exports = {
  readFile: readFile,
  updateFile: updateFile,
};
