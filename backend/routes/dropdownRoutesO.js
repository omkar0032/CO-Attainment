const express=require("express");
const { handleGetPattern, handleGetAcadamicYear, handleGetDepartment, handleGetDivision, handleGetSubject } = require("../controllers/dropdownControllerO");
const router=express.Router();

router.get("/pattern",handleGetPattern);
router.get("/pattrenname/:pattern",handleGetAcadamicYear);
router.get("/department",handleGetDepartment);
router.get("/division/:name",handleGetDivision);
router.get("/subject/:name",handleGetSubject);

module.exports=router;