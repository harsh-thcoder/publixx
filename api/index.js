// api/index.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

module.exports = app; // Vercel can wrap this automatically
