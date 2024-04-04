const express = require("express");
const router = express.Router();
const { createAndLinkTable, uploadExcelTeachers, uploadMainTable, login, forgotPassword, verifyOTP, resendOTP, resetPassword, getSubjectsAndDivisions } = require("../controllers/teacherController");

router.post("/login",login);
module.exports = router;