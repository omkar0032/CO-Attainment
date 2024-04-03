const express = require("express");
const { handleGetPattern, handleGetAcadamicYear, handleGetDepartment, handleGetDivision, handleGetSubject, deletePatternAndYear, insertPattern, fetchPatternAndYear, fetchSubjects, deleteSubject, addSubject } = require("../controllers/dropdownController");
const router = express.Router();

router.get("/pattern", handleGetPattern);
router.get("/pattrenname/:pattern", handleGetAcadamicYear);
router.get("/department", handleGetDepartment);
router.get("/division/:name", handleGetDivision);
router.get("/subject/:name", handleGetSubject);
router.get("/fetch_pattern_and_year", fetchPatternAndYear);
router.post("/delete_pattern_and_year/:PYear/:AYear", deletePatternAndYear);
router.post("/insert_pattern", insertPattern)
router.get("/fetch_subject/:tableName", fetchSubjects);
router.post("/delete_subject/:tableName/:subject", deleteSubject)
router.post("/add_subject/:tableName/:inputValue", addSubject)

module.exports = router;