const { MessageMedia } = require("whatsapp-web.js");
const Cliente = require("../ws-client/wsClient.js");
const { pool } = require("../db.js");
const fs = require("fs");
const path = require("path");
const qrCode = require("qrcode");

const cliente = new Cliente();

const envioMensaje = async (req, resp) => {
  try {
    const message = req.body.message;
    let msjEnviado = {};
    [resultado] = await pool.query(
      "SELECT contacto FROM clients WHERE mensaje = 'SI'"
    );
    resultado.forEach(async (fila) => {
      let { contacto } = fila;
      msjEnviado = await cliente.sendMessage(`${contacto}@c.us`, message);
    });
    resp.json("El mensaje se envió correctamente");
  } catch (error) {
    resp.send(error);
  }
};

const envioMsjMedia = async (req, resp) => {
  const directorio = "/app/VEPS";
  try {
    let files = fs.readdirSync(directorio);
    files.forEach(async (file) => {
      let cleanCuil = file.slice(0, 11);
      let pdfFile = path.join(directorio, file);
      let media = MessageMedia.fromFilePath(pdfFile);
      let [number] = await pool.query(
        "SELECT contacto FROM clients WHERE vep='si' && cuit=?",
        cleanCuil
      );
      number.forEach(async (row) => {
        let { contacto } = row;
        await cliente.sendMessage(`${contacto}@c.us`, media);
      });
    });
    resp.send("Sending message successfully");
  } catch (error) {
    console.error(error);
  }
};

const envioRecordatorio = async (req, resp) => {
  try {
    const message = req.body.message;
    let msjEnviado = {};
    [resultado] = await pool.query(
      "SELECT contacto FROM clients WHERE recordatorio = 'SI'"
    );
    resultado.forEach(async (fila) => {
      try {
        let { contacto } = fila;
        msjEnviado = await cliente.sendMessage(`${contacto}@c.us`, message);
      } catch (error) {
        console.log(error);
      }
    });
    resp.json("El mensaje se envió correctamente");
  } catch (error) {
    resp.send(error);
  }
};

const initializeClient = (req, resp) => {
  cliente.initialize();
  cliente.on("qr", (qr) => {
    const qrData = qr;
    qrCode
      .toDataURL(qrData)
      .then((dataUrl) => {
        resp.send(
          `<h1>Conexión con QR</h1>
          <h2>Escanear el QR para conectarse con WhatsApp</h2>
          <img src="${dataUrl}" alt="Código QR" />
          <p>El QR se actualizará cada 1 minuto</p>
          `
        );
      })
      .catch((error) => {
        resp.json(`Conection Failed: ${error.message}`);
      });
  });

  cliente.on("ready", () => {
    cliente.status = true;
    if (cliente.status === true) {
      console.log("Client ready");
    }
  });

  cliente.on("auth_failure", () => {
    cliente.status = false;
  });
};

module.exports = {
  envioMensaje: envioMensaje,
  envioMsjMedia: envioMsjMedia,
  envioRecordatorio: envioRecordatorio,
  initializeClient: initializeClient,
};
