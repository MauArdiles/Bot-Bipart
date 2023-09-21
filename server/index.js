const express = require("express");
const cors = require("cors");
/*---------------------------------------------------*/
const PORT = require("./config.js");
/*---------------------------------------------------*/
const clientsRouter = require("./routes/clients.routes.js");
const excelRoutes = require("./routes/excel.routes.js");
//const wsRoutes = require("./routes/ws.routes.js");
/*---------------------------------------------------*/

/*---------------------------------------------------*/
const app = express();

/*---------------------------------------------------*/
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*---------------------------------------------------*/
//();
app.use(clientsRouter);
app.use(excelRoutes);
//app.use(wsRoutes);
/*---------------------------------------------------*/

app.listen(PORT);
console.log(`Listening on port: ${PORT}`);
