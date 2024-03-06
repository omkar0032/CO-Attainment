// index.js
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Import routes
const studentsRoutes = require("./routes/studentsRoutes");
const teachersRoutes = require("./routes/teachersRoutes");

// Use routes
app.use(studentsRoutes);
app.use(teachersRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



