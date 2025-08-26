const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Publixx backend is running 🚀" });
});

module.exports = app;
