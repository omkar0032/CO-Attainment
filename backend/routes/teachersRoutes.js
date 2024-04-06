// routes/teachersRoutes.js
const express = require("express");
const router = express.Router();
const {
  createAndLinkTable,
  uploadExcelTeachers,
  uploadMainTable,
  login,
  forgotPassword,
  verifyOTP,
  resendOTP,
  resetPassword,
  updateTeacherSubjects,
  fetchTeacherData,
} = require("../controllers/teacherController");

router.get("/create_LinkTable/:tableName", createAndLinkTable);
router.get("/teacherData/:tableName",fetchTeacherData);
router.post("/upload_teachers/:tableName", uploadExcelTeachers);
router.post("/upload_main_table", uploadMainTable);
// router.post("/login",login);
router.post("/forgot_password", forgotPassword);
router.post("/verify_otp", verifyOTP);
router.post("/resend_otp", resendOTP);
router.post("/reset_password", resetPassword);
router.post(
  "/teachers/update_teacher_subjects/:tableName",
  updateTeacherSubjects
);
module.exports = router;
