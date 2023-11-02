const { Router } = require("express");
const {
  cuitRecordatorio,
  cuitMensaje,
} = require("../controllers/clients.controllers.js");

const clientsRouter = Router();

clientsRouter.get("/msg-recordatorio", cuitRecordatorio);

clientsRouter.get("/msg", cuitMensaje);

module.exports = clientsRouter;
