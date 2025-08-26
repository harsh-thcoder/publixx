// src/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth.routes");
const submissionRoutes = require("./routes/submission.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/submission", submissionRoutes);

module.exports = app; // ✅ don't use app.listen here
