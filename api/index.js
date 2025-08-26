const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("../routes/auth.routes"); // adjust path

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);

module.exports = app;
module.exports.handler = serverless(app);
