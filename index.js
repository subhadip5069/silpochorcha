const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const connectDB = require("./app/config/db");


require("dotenv").config();

const app = express();

connectDB();
app.use(flash());


 // Store instance in app for reuse

 app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set to `true` in production with HTTPS
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
// Middleware to make flash messages available in templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS
app.set("view engine", "ejs");
app.set("views", "views");

// Public folder
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/", require("./app/router/user/index"));
app.use("/admin", require("./app/router/admin/index"));


// Start server after database connections are established
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT} `);

});
