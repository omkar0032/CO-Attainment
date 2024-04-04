// index.js
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser({
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  signed: true,
}));

// Import routes
const studentsRoutes = require("./routes/studentsRoutes");
const teachersRoutes = require("./routes/teachersRoutes");
const targetRoutes=require("./routes/targetRoutes");
const dropdownRoutes=require("./routes/dropdownRoutes");
const authRoute=require("./routes/auth");
const {checkAuth}=require("./middleware/auth")


// Use routes
// app.use(checkAuth);
app.use(authRoute);
app.use(studentsRoutes);
app.use(teachersRoutes);
app.use(targetRoutes);
app.use(dropdownRoutes);

// app.use();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



