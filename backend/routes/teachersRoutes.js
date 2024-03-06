// routes/teachersRoutes.js
const express = require("express");
const router = express.Router();
const { createTableTeachers, uploadExcelTeachers } = require("../controllers/teacherController");

router.get("/createTable/teachersTable/:tableName", createTableTeachers);
router.post("/upload_teachers/:tableName",uploadExcelTeachers)
module.exports = router;
