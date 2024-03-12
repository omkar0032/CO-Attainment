// routes/studentsRoutes.js
const express = require("express");
const router = express.Router();
const {
     saveData,fetchAverage
} = require("../controllers/average_data");

router.post("/saveData",saveData);
router.get("/fetchAverage",fetchAverage)

module.exports = router;