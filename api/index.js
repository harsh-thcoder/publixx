// api/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("../routes/auth.routes"); // adjust path if needed

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

module.exports = app; // ✅ Vercel will handle this automatically
