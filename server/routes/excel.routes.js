const { Router } = require("express");
const multer = require("multer");
const { readFile, updateFile } = require("../controllers/excel.controllers.js");

const excelRoutes = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

excelRoutes.post("/upload-excel", upload.single("excelFile"), readFile);

excelRoutes.put("/updateDb", upload.single("updateFile"), updateFile);

module.exports = excelRoutes;
